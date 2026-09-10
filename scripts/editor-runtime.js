import { basicSetup } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import { Decoration, EditorView, WidgetType } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { Prec, EditorSelection } from "@codemirror/state";
import { writingExtension, writingCommands } from "./editor-commands.mjs";
import { analyzeMarkdown, extractHeadings, findInlineMath, parseAdmonitions } from "./editor-syntax.mjs";

window.MathNotesCodeMirror = {
  basicSetup,
  Compartment,
  Decoration,
  EditorState,
  EditorView,
  WidgetType,
  markdown, markdownLanguage, Prec, EditorSelection, writingExtension, writingCommands,
  analyzeMarkdown, extractHeadings, findInlineMath, parseAdmonitions
};
