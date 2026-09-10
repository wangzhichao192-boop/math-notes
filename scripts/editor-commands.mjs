import { EditorSelection, Prec } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { syntaxTree, indentUnit } from "@codemirror/language";
import { indentMore, indentLess, isolateHistory } from "@codemirror/commands";
import { insertNewlineContinueMarkup } from "@codemirror/lang-markdown";

function inCode(state, pos) {
  for (let node = syntaxTree(state).resolveInner(pos, -1); node; node = node.parent) {
    if (/^(FencedCode|CodeBlock|InlineCode)$/.test(node.name)) return true;
  }
  return false;
}

// Keep indentation inside the quote: moving `>` itself can turn a quote into code.
const listPattern = /^((?:[ \t]*>[ \t]?)*)([ \t]*)([-+*]|\d+[.)])([ \t]+)(?:\[([ xX])\]([ \t]*))?/;
const quoteDepth = prefix => (prefix.match(/>/g) || []).length;
const indentWidth = indent => [...indent].reduce((width, char) => char === "\t" ? width + 4 - width % 4 : width + 1, 0);
const editable = view => !view.composing && !view.state.readOnly;

function parentList(state, line, current) {
  const depth = quoteDepth(current[1]), width = indentWidth(current[2]);
  for (let number = line.number - 1; number > 0; number--) {
    const text = state.doc.line(number).text;
    if (!text.trim()) continue;
    const candidate = listPattern.exec(text);
    if (candidate && quoteDepth(candidate[1]) === depth) {
      if (indentWidth(candidate[2]) < width) return candidate;
      continue;
    }
    const prefix = /^((?:[ \t]*>[ \t]?)*)([ \t]*)/.exec(text);
    if (quoteDepth(prefix[1]) < depth || indentWidth(prefix[2]) < width) break;
  }
  return null;
}

export function exitEmptyMarkup(view) {
  if (!editable(view)) return false;
  const { state, dispatch } = view;
  const range = state.selection.main;
  if (!range.empty || state.selection.ranges.length !== 1 || inCode(state, range.head)) return false;
  const line = state.doc.lineAt(range.head);
  const match = listPattern.exec(line.text);
  const emptyList = match && !line.text.slice(match[0].length).trim();
  const quote = /^(\s*(?:>\s*)*)>\s*$/.exec(line.text);
  if (!emptyList && !quote) return false;
  if (range.head < line.from + (emptyList ? match[0].length : line.text.trimEnd().length)) return false;
  // Exit one nesting level, without CodeMirror's extra loose-list blank line.
  let insert = quote ? quote[1] : "";
  if (emptyList) {
    insert = match[1];
    if (match[2].length) {
      const parent = parentList(state, line, match);
      if (parent) {
        const ordered = /^(\d+)([.)])$/.exec(parent[3]);
        const marker = ordered ? Number(ordered[1]) + 1 + ordered[2] : parent[3];
        insert = parent[1] + parent[2] + marker + " " + (parent[5] !== undefined ? "[ ] " : "");
      } else {
        insert += match[2].replace(/(?: {1,4}|\t)$/, "") + match[3] + " ";
      }
    }
  }
  dispatch(state.update({ changes: { from: line.from, to: line.to, insert },
    selection: { anchor: line.from + insert.length }, scrollIntoView: true,
    annotations: isolateHistory.of("full"), userEvent: "input" }));
  return true;
}

export function indentWriting(view, backwards = false) {
  if (!editable(view)) return false;
  const { state } = view;
  if (state.selection.ranges.every(range => inCode(state, range.head))) {
    return (backwards ? indentLess : indentMore)(view);
  }
  const lines = new Map();
  for (const range of state.selection.ranges) {
    const first = state.doc.lineAt(range.from);
    // A selection ending at the next line's start doesn't include that line.
    let last = state.doc.lineAt(range.to > range.from ? range.to - 1 : range.to);
    if (!listPattern.test(first.text)) return false;
    if (range.empty) {
      for (let node = syntaxTree(state).resolveInner(range.head, -1); node; node = node.parent) {
        if (node.name !== "ListItem") continue;
        if (state.doc.lineAt(node.from).number === first.number) last = state.doc.lineAt(node.to);
        break;
      }
    }
    for (let number = first.number; number <= last.number; number++) {
      const line = state.doc.line(number);
      if (!line.text.trim()) continue;
      const prefix = /^((?:[ \t]*>[ \t]?)*)([ \t]*)/.exec(line.text);
      lines.set(number, { line, prefix });
    }
  }
  const changes = [];
  for (const { line, prefix } of lines.values()) {
    const from = line.from + prefix[1].length;
    if (backwards) {
      const remove = /^(?:\t| {1,4})/.exec(prefix[2]);
      if (remove) changes.push({ from, to: from + remove[0].length });
    } else {
      changes.push({ from, insert: "    " });
    }
  }
  if (changes.length) view.dispatch(state.update({ changes, scrollIntoView: true,
    annotations: isolateHistory.of("full"), userEvent: "input.indent" }));
  return true;
}

function enclosingFormat(state, range, marker) {
  const type = { "**": "StrongEmphasis", "*": "Emphasis", "`": "InlineCode" }[marker];
  if (!type) return null;
  for (let node = syntaxTree(state).resolveInner(range.from, 1); node; node = node.parent) {
    if (node.name !== type || range.to > node.to) continue;
    const first = node.firstChild, last = node.lastChild;
    if (first && last && first !== last && range.from >= first.to && range.to <= last.from) {
      return { from: node.from, start: first.to, end: last.from, to: node.to };
    }
  }
  return null;
}

export function toggleWrap(marker, close = marker) {
  return view => {
    if (!editable(view)) return false;
    const { state, dispatch } = view;
    // One range at a time avoids overlapping deletions of the same enclosing mark.
    const enclosing = state.selection.ranges.length === 1
      ? enclosingFormat(state, state.selection.main, marker) : null;
    if (enclosing) {
      const changes = state.changes([{ from: enclosing.from, to: enclosing.start },
        { from: enclosing.end, to: enclosing.to }]);
      dispatch(state.update({ changes, selection: state.selection.map(changes),
        scrollIntoView: true, annotations: isolateHistory.of("full"), userEvent: "input.format" }));
      return true;
    }
    const changes = state.changeByRange(range => {
      const selected = state.sliceDoc(range.from, range.to);
      const outside = range.from >= marker.length &&
        state.sliceDoc(range.from - marker.length, range.from) === marker &&
        state.sliceDoc(range.to, range.to + close.length) === close;
      const inside = selected.length >= marker.length + close.length &&
        selected.startsWith(marker) && selected.endsWith(close);
      if (outside) return {
        changes: [{ from: range.from - marker.length, to: range.from }, { from: range.to, to: range.to + close.length }],
        range: EditorSelection.range(range.from - marker.length, range.to - marker.length)
      };
      if (inside) return {
        changes: { from: range.from, to: range.to, insert: selected.slice(marker.length, -close.length) },
        range: EditorSelection.range(range.from, range.to - marker.length - close.length)
      };
      // Markdown emphasis cannot begin/end with whitespace. Leave selection padding outside.
      const leading = /^\s*/.exec(selected)[0];
      const body = selected.slice(leading.length).trimEnd();
      const trailing = selected.slice(leading.length + body.length);
      let opening = marker, closing = close;
      if (marker === "`") {
        const longest = Math.max(0, ...(body.match(/`+/g) || []).map(part => part.length));
        opening = closing = "`".repeat(longest + 1);
        if (body.startsWith("`") || body.endsWith("`")) { opening += " "; closing = " " + closing; }
      }
      const start = range.from + leading.length + opening.length;
      return {
        changes: { from: range.from, to: range.to, insert: leading + opening + body + closing + trailing },
        range: range.anchor <= range.head ? EditorSelection.range(start, start + body.length)
          : EditorSelection.range(start + body.length, start)
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true,
      annotations: isolateHistory.of("full"), userEvent: "input.format" }));
    return true;
  };
}

export const writingCommands = {
  bold: toggleWrap("**"), italic: toggleWrap("*"), code: toggleWrap("`"), math: toggleWrap("$")
};

export const writingExtension = [indentUnit.of("    "), Prec.highest(keymap.of([
  { key: "Enter", run: exitEmptyMarkup },
  { key: "Enter", run: insertNewlineContinueMarkup },
  { key: "Tab", run: view => indentWriting(view) },
  { key: "Shift-Tab", run: view => indentWriting(view, true) },
  { key: "Mod-b", run: writingCommands.bold },
  { key: "Mod-i", run: writingCommands.italic },
  { key: "Mod-e", run: writingCommands.code },
  { key: "Mod-Shift-m", run: writingCommands.math }
]))];
