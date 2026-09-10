import { markdownLanguage } from "@codemirror/lang-markdown";

export function parseAdmonitions(source, labels = {}) {
  const lines = source.split("\n"), offsets = [];
  let offset = 0;
  lines.forEach(line => {
    offsets.push(offset);
    offset += line.length + 1;
  });

  const blocks = [];
  for (let index = 0; index < lines.length; index += 1) {
    const header = /^(!!!|\?\?\?)\s+([a-z][\w-]*)(?:\s+"([^"]*)")?\s*$/.exec(lines[index]);
    if (!header) continue;
    let end = index, anchor = "";
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const line = lines[cursor];
      if (/^( {4}|\t)/.test(line) || line.trim() === "") {
        end = cursor;
        const anchorMatch = /<a id="([^"]+)"><\/a>/.exec(line);
        if (anchorMatch) anchor = anchorMatch[1];
        continue;
      }
      break;
    }
    // Empty unindented lines merely separate Markdown blocks. An indented
    // whitespace-only line, however, is the live caret line inside an
    // admonition (including an unfinished fenced code block), so keep it.
    while (end > index && lines[end] === "") end -= 1;
    blocks.push({
      startLine: index,
      endLine: end,
      from: offsets[index],
      to: offsets[end] + lines[end].length,
      kind: header[2],
      title: header[3] || labels[header[2]] || header[2],
      anchor,
      header,
      lines,
      offsets
    });
    index = end;
  }
  return { blocks, lines, offsets };
}

function plainHeadingTitle(source) {
  return source
    .replace(/\s+\{[^}]+\}\s*$/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\\([#`*_{}\[\]()])/g, "$1")
    .trim();
}

export function extractHeadings(source) {
  const headings = [];
  const lines = source.split("\n");
  let offset = 0, fence = null;
  lines.forEach(line => {
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) fence = { marker, length: fenceMatch[1].length };
      else if (marker === fence.marker && fenceMatch[1].length >= fence.length) fence = null;
    } else if (!fence) {
      const match = /^(#{1,4})[ \t]+(.+?)\s*#*\s*$/.exec(line);
      if (match) {
        const title = plainHeadingTitle(match[2]);
        if (title) headings.push({ level: match[1].length, title, from: offset, contentFrom: offset + match[1].length + 1 });
      }
    }
    offset += line.length + 1;
  });
  return headings;
}

// MkDocs admonitions are not CommonMark containers. Remove only their own
// indentation before parsing, then map every syntax position back to the file.
// Other indentation must survive so ordinary code blocks stay literal.
function markdownForParsing(source, admonitions) {
  const lines = source.split("\n"), mappedLines = [];
  const blocks = [...admonitions].sort((a, b) => a.from - b.from);
  let sourceOffset = 0, parsedOffset = 0, blockIndex = 0;
  const text = lines.map(line => {
    while (blocks[blockIndex] && blocks[blockIndex].to < sourceOffset) blockIndex += 1;
    const block = blocks[blockIndex];
    const inBlock = block && sourceOffset >= block.from && sourceOffset <= block.to;
    const removed = inBlock && sourceOffset > block.from
      ? line.startsWith("    ") ? 4 : line.startsWith("\t") ? 1 : 0
      : 0;
    let normalized = line.slice(removed);
    if (inBlock && (sourceOffset === block.from || /^<a\s+id=["'][^"']+["']><\/a>\s*$/.test(normalized))) {
      normalized = "";
    }
    mappedLines.push({ from: parsedOffset, originalFrom: sourceOffset + removed, length: normalized.length });
    sourceOffset += line.length + 1;
    parsedOffset += normalized.length + 1;
    return normalized;
  }).join("\n");
  const originalPosition = position => {
    let low = 0, high = mappedLines.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (mappedLines[middle].from <= position) low = middle;
      else high = middle - 1;
    }
    const line = mappedLines[low];
    return line.originalFrom + Math.min(line.length, position - line.from);
  };
  return { text, originalPosition };
}

// Parse once per document change, not once per arrow key / mouse movement.
// A whole-document tree preserves quoted/list code fences, code indentation,
// multiline code spans and nested inline formatting.
export function analyzeMarkdown(source, admonitions = []) {
  const code = [], inline = [];
  const { text, originalPosition: original } = markdownForParsing(source, admonitions);
  markdownLanguage.parser.parse(text).iterate({ enter(node) {
    if (node.name === "FencedCode" || node.name === "CodeBlock") {
      const from = original(node.from), to = original(node.to);
      code.push({ from: source.lastIndexOf("\n", Math.max(0, from - 1)) + 1, to });
      return false;
    }
    if (!/^(StrongEmphasis|Emphasis|InlineCode|Link|Strikethrough)$/.test(node.name)) return;
    const syntax = node.node;
    const first = syntax.firstChild, last = syntax.lastChild;
    if (!first || !last || first === last) return;
    let contentTo = last.from;
    if (node.name === "Link") {
      const closeLabel = syntax.getChildren("LinkMark")[1];
      if (!closeLabel) return;
      contentTo = closeLabel.from;
    }
    inline.push({ type: node.name, from: original(node.from), to: original(node.to),
      contentFrom: original(first.to), contentTo: original(contentTo) });
    if (node.name === "InlineCode") return false;
  }});
  return { code, inline };
}

function escapedAt(source, position) {
  let slashes = 0;
  for (let cursor = position - 1; cursor >= 0 && source[cursor] === "\\"; cursor -= 1) slashes += 1;
  return slashes % 2 === 1;
}

// Match single-dollar inline math without crossing code or display formulas.
// The whitespace/digit rules distinguish ordinary currency from delimiters.
export function findInlineMath(source, blocked = []) {
  const ranges = [];
  for (let from = 0; from < source.length; from += 1) {
    if (source[from] !== "$" || escapedAt(source, from) || source[from - 1] === "$" ||
        !source[from + 1] || /[\s$]/.test(source[from + 1])) continue;
    const containing = blocked.find(range => from >= range.from && from < range.to);
    if (containing) {
      from = containing.to - 1;
      continue;
    }
    for (let end = from + 1; end < source.length; end += 1) {
      if (source[end] === "\n" || source[end] === "\r") break;
      if (source[end] !== "$" || escapedAt(source, end)) continue;
      // An invalid dollar boundary ends this candidate; searching beyond it
      // could swallow an unrelated currency amount or another math fragment.
      if (source[end - 1] === "$" || source[end + 1] === "$" ||
          /\s/.test(source[end - 1]) || /\d/.test(source[end + 1] || "")) break;
      const to = end + 1;
      if (!blocked.some(range => from < range.to && to > range.from)) {
        ranges.push({ from, to, editFrom: from + 1, tex: source.slice(from + 1, end), display: false });
      }
      from = end;
      break;
    }
  }
  return ranges;
}
