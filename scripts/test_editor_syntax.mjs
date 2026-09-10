import assert from "node:assert/strict";
import test from "node:test";
import { analyzeMarkdown, extractHeadings, findInlineMath, parseAdmonitions } from "./editor-syntax.mjs";

function mathIn(source, admonitions = []) {
  const syntax = analyzeMarkdown(source, admonitions);
  return findInlineMath(source, [...syntax.code, ...syntax.inline.filter(token => token.type === "InlineCode")]);
}

test("admonitions keep the live indented blank line inside the block", () => {
  const source = '!!! definition "Test"\n    <a id="def-1-1-1"></a>\n    ```js\n    const x = 1;\n    \n\nOutside';
  const parsed = parseAdmonitions(source);
  assert.equal(parsed.blocks.length, 1);
  assert.equal(parsed.blocks[0].endLine, 4);
  assert.equal(parsed.lines[parsed.blocks[0].endLine], "    ");
  assert.equal(source.slice(parsed.blocks[0].to, parsed.blocks[0].to + 2), "\n\n");
});

test("unindented separator lines do not visually extend an admonition", () => {
  const source = '!!! proof "Proof"\n    Body.\n\n\nOutside';
  const block = parseAdmonitions(source).blocks[0];
  assert.equal(block.endLine, 1);
  assert.equal(source.slice(block.from, block.to), '!!! proof "Proof"\n    Body.');
});

test("editor outline follows real headings and ignores fenced code", () => {
  const source = '# Page **title**\n\n## First [part](first.md)\n### Detail {#detail}\n```md\n## not a heading\n```\n#### Last';
  assert.deepEqual(extractHeadings(source).map(({ level, title }) => ({ level, title })), [
    { level: 1, title: "Page title" },
    { level: 2, title: "First part" },
    { level: 3, title: "Detail" },
    { level: 4, title: "Last" }
  ]);
});

test("quoted and list-nested fences remain literal", () => {
  for (const source of [
    "> ```markdown\n> **literal** $code$\n> ```",
    "> > ~~~\n> > *literal* $code$\n> > ~~~",
    "- Example:\n\n    ```\n    **literal** $code$\n    ```"
  ]) {
    const syntax = analyzeMarkdown(source);
    assert.equal(syntax.code.length, 1, source);
    assert.deepEqual(syntax.inline, [], source);
    assert.deepEqual(mathIn(source), [], source);
  }
});

test("ordinary indented code is protected without suppressing admonition prose", () => {
  const codeSource = "Introduction.\n\n    **literal** $code$\n\n**real bold** $x$";
  const syntax = analyzeMarkdown(codeSource);
  assert.equal(syntax.code.length, 1);
  assert.equal(syntax.inline.length, 1);
  assert.equal(codeSource.slice(syntax.inline[0].contentFrom, syntax.inline[0].contentTo), "real bold");
  assert.deepEqual(mathIn(codeSource).map(range => range.tex), ["x"]);

  const source = '!!! definition "Name"\n    <a id="def-1-1-1"></a>\n    **bold** and $x$\n\n    ```\n    **literal** $code$\n    ```\n\n        **indented code** $also_code$';
  const blocks = [{ from: 0, to: source.length }];
  const parsed = analyzeMarkdown(source, blocks);
  assert.equal(parsed.code.length, 2);
  assert.equal(parsed.inline.length, 1);
  assert.equal(source.slice(parsed.inline[0].from, parsed.inline[0].to), "**bold**");
  assert.deepEqual(mathIn(source, blocks).map(range => range.tex), ["x"]);
});

test("multiline code spans keep their entire original source range", () => {
  const source = "Text `first\n$literal$ **literal**\nlast` and $x$";
  const parsed = analyzeMarkdown(source);
  assert.equal(parsed.inline.length, 1);
  assert.equal(parsed.inline[0].type, "InlineCode");
  assert.equal(source.slice(parsed.inline[0].from, parsed.inline[0].to), "`first\n$literal$ **literal**\nlast`");
  assert.deepEqual(mathIn(source).map(range => range.tex), ["x"]);
});

test("nested formatting and links retain precise source offsets after admonition dedenting", () => {
  const source = '# Course\n\n!!! theorem "Title"\n    [**bold *italic* text**](page.md)\n    `two\n    lines`\n\nAfter.';
  const from = source.indexOf("!!!"), to = source.indexOf("\n\nAfter.");
  const syntax = analyzeMarkdown(source, [{ from, to }]);
  assert.deepEqual(syntax.inline.map(token => token.type), ["Link", "StrongEmphasis", "Emphasis", "InlineCode"]);
  const italic = syntax.inline.find(token => token.type === "Emphasis");
  assert.equal(source.slice(italic.contentFrom, italic.contentTo), "italic");
  const code = syntax.inline.find(token => token.type === "InlineCode");
  assert.equal(source.slice(code.from, code.to), "`two\n    lines`");
});

test("inline math honors escaped opening and closing dollars", () => {
  const source = String.raw`\$not$ and $a\$b$ and $c\\$`;
  assert.deepEqual(findInlineMath(source).map(range => range.tex), [String.raw`a\$b`, String.raw`c\\`]);
  for (const range of findInlineMath(source)) {
    assert.equal(source.slice(range.from, range.to), `$${range.tex}$`);
    assert.equal(range.editFrom, range.from + 1);
  }
});

test("currency and display delimiters do not become inline formulas", () => {
  for (const source of ["cost $5 and $10", "$ x$", "$x $", "$$x$$", "$$\nx\n$$", "$x\ny$"]) {
    assert.deepEqual(findInlineMath(source), [], source);
  }
  assert.deepEqual(findInlineMath("$x$5 and $y$").map(range => range.tex), ["y"]);
  assert.deepEqual(findInlineMath("$5$ and $x$ $y$").map(range => range.tex), ["5", "x", "y"]);
});

test("math never consumes any overlapping code range", () => {
  for (const source of ["`x $inside` then outside$", "$outside `code` inside$", "`$literal$`", "`one\n$literal$\ntwo`"]) {
    assert.deepEqual(mathIn(source), [], source);
  }
  assert.deepEqual(mathIn("`$literal$` then $x$").map(range => range.tex), ["x"]);
  const source = "$abc$ then $x$";
  assert.deepEqual(findInlineMath(source, [{ from: 2, to: 3 }]).map(range => range.tex), ["x"]);
});
