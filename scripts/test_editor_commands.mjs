import test from "node:test";
import assert from "node:assert/strict";
import { EditorState, EditorSelection } from "@codemirror/state";
import { markdown, markdownLanguage, insertNewlineContinueMarkup } from "@codemirror/lang-markdown";
import { history, undo, redo, insertNewlineAndIndent } from "@codemirror/commands";
import { exitEmptyMarkup, indentWriting, writingCommands, writingExtension } from "./editor-commands.mjs";

function editor(source, selection = { anchor: source.length }) {
  const view = {
    state: EditorState.create({ doc: source, selection,
      extensions: [markdown({ base: markdownLanguage }), history(), writingExtension] }),
    composing: false,
    dispatch(transaction) { view.state = transaction.state; }
  };
  return view;
}
const text = view => view.state.doc.toString();
const enter = view => exitEmptyMarkup(view) || insertNewlineContinueMarkup(view) || insertNewlineAndIndent(view);

test("ordinary typing and Enter preserve Chinese text and punctuation", () => {
  const view = editor("定义：设 X 为集合。");
  assert.equal(exitEmptyMarkup(view), false);
  enter(view);
  assert.equal(text(view), "定义：设 X 为集合。\n");
});

for (const [name, input, expected] of [
  ["bullet continuation", "- first", "- first\n- "],
  ["ordered continuation", "1. first", "1. first\n2. "],
  ["completed task starts an unchecked task", "- [x] done", "- [x] done\n- [ ] "],
  ["nested bullet continuation", "- parent\n    - child", "- parent\n    - child\n    - "],
  ["quote continuation", "> quoted text", "> quoted text\n> "],
  ["empty second bullet exits immediately", "- first\n- ", "- first\n"],
  ["empty numbered item exits immediately", "1. first\n2. ", "1. first\n"],
  ["empty task exits immediately", "- [ ] first\n- [ ] ", "- [ ] first\n"],
  ["empty quoted bullet keeps quote", "> - first\n> - ", "> - first\n> "],
  ["empty quoted task keeps quote", "> - [x] first\n> - [ ] ", "> - [x] first\n> "],
  ["nested empty bullet returns to parent", "- parent\n    - child\n    - ", "- parent\n    - child\n- "],
  ["nested empty item preserves ordered parent", "1. parent\n    - child\n    - ", "1. parent\n    - child\n2. "],
  ["quoted nested empty list preserves parent numbering", "> 1. parent\n>     - child\n>     - ", "> 1. parent\n>     - child\n> 2. "],
  ["nested empty task returns to parent task", "- [x] parent\n    - child\n    - ", "- [x] parent\n    - child\n- [ ] "],
  ["empty quote exits immediately", "> quoted\n> ", "> quoted\n"],
  ["nested quote exits one level", "> > quoted\n> > ", "> > quoted\n> "]
]) test(name, () => {
  const view = editor(input);
  assert.equal(enter(view), true);
  assert.equal(text(view), expected);
  assert.equal(view.state.selection.main.head, expected.length);
});

test("splitting a list item retains the text after the cursor", () => {
  const view = editor("- first second", { anchor: 7 });
  enter(view);
  assert.equal(text(view), "- first\n-  second");
});

test("inserting in an ordered list renumbers subsequent items", () => {
  const view = editor("1. first\n2. second\n3. third", { anchor: 8 });
  enter(view);
  assert.equal(text(view), "1. first\n2. \n3. second\n4. third");
});

test("list Tab and Shift-Tab round-trip with the caret", () => {
  const source = "- first\n- second";
  const view = editor(source);
  assert.equal(indentWriting(view), true);
  assert.equal(text(view), "- first\n    - second");
  assert.equal(view.state.selection.main.head, source.length + 4);
  assert.equal(indentWriting(view, true), true);
  assert.equal(text(view), source);
  assert.equal(view.state.selection.main.head, source.length);
});

test("quoted list Tab keeps the quote prefix outside indentation", () => {
  const source = "> - first\n> - second";
  const view = editor(source);
  indentWriting(view);
  assert.equal(text(view), "> - first\n>     - second");
  indentWriting(view, true);
  assert.equal(text(view), source);
});

test("indenting a parent list item moves its children with it", () => {
  const source = "- previous\n- parent\n    - child\n- next";
  const view = editor(source, { anchor: 19 });
  indentWriting(view);
  assert.equal(text(view), "- previous\n    - parent\n        - child\n- next");
  indentWriting(view, true);
  assert.equal(text(view), source);
});

test("outdenting a quoted parent keeps its nested children together", () => {
  const source = "> - previous\n>     - parent\n>         - child";
  const view = editor(source, { anchor: 26 });
  indentWriting(view, true);
  assert.equal(text(view), "> - previous\n> - parent\n>     - child");
});

test("Tab at a list selection's next-line boundary does not indent that line", () => {
  const view = editor("- one\n- two\nparagraph", { anchor: 0, head: 12 });
  indentWriting(view);
  assert.equal(text(view), "    - one\n    - two\nparagraph");
});

test("ordinary paragraph Tab is left to the browser", () => {
  const view = editor("plain paragraph");
  assert.equal(indentWriting(view), false);
  assert.equal(indentWriting(view, true), false);
  assert.equal(text(view), "plain paragraph");
});

test("fenced code does not exit apparent Markdown list markup", () => {
  const source = "```text\n- \n```";
  const view = editor(source, { anchor: 10 });
  assert.equal(exitEmptyMarkup(view), false);
  assert.equal(text(view), source);
});

test("bold formats the selection, toggles it off, and undoes independently of typing", () => {
  const view = editor("hello", { anchor: 0, head: 5 });
  writingCommands.bold(view);
  assert.equal(text(view), "**hello**");
  assert.equal(view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to), "hello");
  writingCommands.bold(view);
  assert.equal(text(view), "hello");
  assert.equal(undo(view), true);
  assert.equal(text(view), "**hello**");
  assert.equal(undo(view), true);
  assert.equal(text(view), "hello");
  assert.equal(redo(view), true);
  assert.equal(text(view), "**hello**");
});

test("bold leaves leading and trailing selection spaces outside the markup", () => {
  const view = editor(" hello ", { anchor: 0, head: 7 });
  writingCommands.bold(view);
  assert.equal(text(view), " **hello** ");
});

test("bold can be switched off with the cursor inside an existing word", () => {
  const view = editor("**hello**", { anchor: 4 });
  writingCommands.bold(view);
  assert.equal(text(view), "hello");
  assert.equal(view.state.selection.main.head, 2);
});

test("empty bold pair puts the caret inside and a second toggle removes it", () => {
  const view = editor("hello ");
  writingCommands.bold(view);
  assert.equal(text(view), "hello ****");
  assert.equal(view.state.selection.main.head, 8);
  writingCommands.bold(view);
  assert.equal(text(view), "hello ");
});

test("formatting preserves a backwards selection", () => {
  const view = editor("hello", { anchor: 5, head: 0 });
  writingCommands.italic(view);
  assert.equal(text(view), "*hello*");
  assert.equal(view.state.selection.main.anchor, 6);
  assert.equal(view.state.selection.main.head, 1);
});

test("inline code uses a longer delimiter for text containing backticks", () => {
  const view = editor("a ` b", { anchor: 0, head: 5 });
  writingCommands.code(view);
  assert.equal(text(view), "``a ` b``");
  writingCommands.code(view);
  assert.equal(text(view), "a ` b");
});

test("inline math surrounds selected formula with dollars", () => {
  const view = editor("x^2", { anchor: 0, head: 3 });
  writingCommands.math(view);
  assert.equal(text(view), "$x^2$");
});

test("commands leave active IME composition untouched", () => {
  const view = editor("- ");
  view.composing = true;
  assert.equal(exitEmptyMarkup(view), false);
  assert.equal(indentWriting(view), false);
  assert.equal(writingCommands.bold(view), false);
  assert.equal(text(view), "- ");
});

test("read-only editors cannot be changed by writing commands", () => {
  const view = editor("- ");
  view.state = EditorState.create({ doc: "- ", selection: { anchor: 2 },
    extensions: [EditorState.readOnly.of(true), markdown(), writingExtension] });
  assert.equal(exitEmptyMarkup(view), false);
  assert.equal(indentWriting(view), false);
  assert.equal(writingCommands.bold(view), false);
  assert.equal(text(view), "- ");
});

test("separate selected words can both be formatted", () => {
  const view = editor("one two", EditorSelection.create([EditorSelection.range(0, 3), EditorSelection.range(4, 7)]));
  // EditorState requires the explicit facet for multiple selections.
  view.state = EditorState.create({ doc: "one two", selection: EditorSelection.create([
    EditorSelection.range(0, 3), EditorSelection.range(4, 7)]), extensions: [
    EditorState.allowMultipleSelections.of(true), markdown(), writingExtension] });
  writingCommands.bold(view);
  assert.equal(text(view), "**one** **two**");
});
