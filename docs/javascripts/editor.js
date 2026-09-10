/* Math Notes — a source-safe, Typora-style Markdown editor. */
(function () {
  "use strict";

  const SOURCE_ID = "mn-editor-source";
  const OPENING_STATUS_ID = "mn-typora-opening-status";
  const DRAFT_PREFIX = "mn-typora-draft:v1:";
  const PENDING_NAVIGATION_KEY = "mn-typora-pending-navigation";
  const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
  const EDITOR_ASSET_URL = new URL("codemirror.bundle.js?v=20260910-4", document.currentScript.src).href;
  const RESUME_KEY = "mn-typora-resume";

  const BLOCKS = [
    { id: "definition", label: "定义", detail: "概念与术语", marker: "!!!", title: "Definition (Name)", prefix: "def" },
    { id: "theorem", label: "定理", detail: "核心结论", marker: "!!!", title: "Theorem (Name)", prefix: "thm" },
    { id: "proposition", label: "命题", detail: "一般结论", marker: "!!!", title: "Proposition (Name)", prefix: "prop" },
    { id: "lemma", label: "引理", detail: "辅助结论", marker: "!!!", title: "Lemma (Name)", prefix: "lem" },
    { id: "corollary", label: "推论", detail: "直接推导", marker: "!!!", title: "Corollary (Name)", prefix: "cor" },
    { id: "proof", label: "证明", detail: "默认可折叠", marker: "???", title: "Proof", prefix: "prf" },
    { id: "example", label: "例子", detail: "具体说明", marker: "!!!", title: "Example (Name)", prefix: "ex" },
    { id: "remark", label: "注记", detail: "补充说明", marker: "!!!", title: "Remark", prefix: "rem" },
    { id: "display-math", label: "公式", detail: "独立公式", special: "math" },
    { id: "heading", label: "标题", detail: "二级标题", special: "heading" }
  ];

  const KIND_LABELS = {
    definition: "Definition", theorem: "Theorem", proposition: "Proposition",
    lemma: "Lemma", corollary: "Corollary", proof: "Proof",
    example: "Example", remark: "Remark"
  };

  let activeEditor = null;
  let currentPayload = null;
  let editorModulesPromise = null;
  let pageGeneration = 0;
  let openingGeneration = 0;
  let pendingNavigationTimer = 0;
  let deferredReload = false;
  window.MathNotesDeferReload = () => {
    if (!activeEditor && !openingGeneration) return false;
    deferredReload = true;
    return true;
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function suggestedSlug(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64);
  }

  async function manageRequest(payload, values) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let response;
    try {
      response = await fetch(payload.manageEndpoint, {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json", "X-Math-Notes-Editor": "1" },
        body: JSON.stringify(values)
      });
    } catch (_) {
      throw new Error("无法连接本地网站，或连接中断。请双击“启动数学笔记.command”后重试；填写内容已保留。若刚才已提交，请先刷新检查是否已创建。");
    } finally {
      clearTimeout(timeout);
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.message || "本地编辑服务尚未就绪，请重新启动数学笔记后重试。");
    }
    return result;
  }

  function queueNavigation(url) {
    const target = new URL(url, location.href).href;
    sessionStorage.setItem(PENDING_NAVIGATION_KEY, target);
    resumePendingNavigation();
  }

  async function resumePendingNavigation() {
    clearTimeout(pendingNavigationTimer);
    const target = sessionStorage.getItem(PENDING_NAVIGATION_KEY);
    if (!target) return;
    if (location.href.split("#")[0] === target.split("#")[0]) {
      sessionStorage.removeItem(PENDING_NAVIGATION_KEY);
      return;
    }
    try {
      const response = await fetch(target, { cache: "no-store" });
      if (response.ok) {
        sessionStorage.removeItem(PENDING_NAVIGATION_KEY);
        location.assign(target);
        return;
      }
    } catch (_) {
      // MkDocs briefly stops serving while rebuilding its navigation.
    }
    pendingNavigationTimer = setTimeout(resumePendingNavigation, 550);
  }

  function readPayload() {
    const element = document.getElementById(SOURCE_ID);
    if (!element) return null;
    try {
      const payload = JSON.parse(element.textContent);
      const bytes = Uint8Array.from(atob(payload.sourceB64), (character) => character.charCodeAt(0));
      payload.source = new TextDecoder("utf-8").decode(bytes);
      return payload;
    } catch (error) {
      console.warn("Math Notes editor could not read the page source.", error);
      return null;
    }
  }

  function loadEditorModules() {
    if (!editorModulesPromise) {
      editorModulesPromise = new Promise((resolve, reject) => {
        if (window.MathNotesCodeMirror) return resolve(window.MathNotesCodeMirror);
        const script = document.createElement("script");
        script.src = EDITOR_ASSET_URL;
        script.onload = () => window.MathNotesCodeMirror
          ? resolve(window.MathNotesCodeMirror)
          : reject(new Error("CodeMirror bundle did not initialize"));
        script.onerror = () => reject(new Error("CodeMirror bundle is unavailable"));
        document.head.appendChild(script);
      }).catch((error) => {
        editorModulesPromise = null;
        throw error;
      });
    }
    return editorModulesPromise;
  }

  function draftKey(path) {
    return DRAFT_PREFIX + path;
  }

  function readDraft(payload) {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey(payload.sourcePath)));
      return draft && typeof draft.source === "string" ? draft : null;
    } catch (_) {
      return null;
    }
  }

  function writeDraft(state) {
    if (!state?.view || state.destroyed) return false;
    clearTimeout(state.draftTimer);
    try {
      localStorage.setItem(draftKey(state.payload.sourcePath), JSON.stringify({
        source: state.view.state.doc.toString(),
        baseRevision: state.baseRevision,
        pendingSource: state.pendingSource,
        selection: state.view.state.selection.main.toJSON(),
        updatedAt: Date.now()
      }));
      if (!state.saving) setStatus(state, state.view.state.doc.toString() === state.savedSource ? "已保存到文件" : "草稿已保存 · ⌘/Ctrl S 写入文件", "saved");
      return true;
    } catch (_) {
      setStatus(state, "草稿空间不足，请先导出", "error");
      return false;
    }
  }

  function lineIsActive(state, from, to) {
    return state.selection.ranges.some((range) => range.from <= to && range.to >= from);
  }

  function rangeIsActive(state, from, to) {
    return state.selection.ranges.some((range) => range.from <= to && range.to >= from);
  }

  function findDisplayMath(source) {
    const ranges = [];
    // Keep whitespace matching on the delimiter lines. Using `\s` here also
    // consumes adjacent blank lines, which makes a formula at the end of an
    // admonition appear to sit outside that block.
    const expression = /^[ \t]*\$\$[ \t]*$\n([\s\S]*?)\n^[ \t]*\$\$[ \t]*$/gm;
    let match;
    while ((match = expression.exec(source))) {
      const contentOffset = match[0].indexOf("\n") + 1;
      const leadingWhitespace = match[1].length - match[1].trimStart().length;
      ranges.push({
        from: match.index,
        to: match.index + match[0].length,
        editFrom: match.index + contentOffset + leadingWhitespace,
        tex: match[1].trim(),
        display: true
      });
    }
    return ranges;
  }

  function displayNumber(anchor) {
    const match = /^(?:def|thm|prop|lem|cor|rem|ex|prf)-(\d+)-(\d+)-(\d+)$/.exec(anchor);
    return match ? `${match[1]}.${match[2]}.${match[3]}` : "";
  }

  function safeClass(kind) {
    return /^[a-z][\w-]*$/.test(kind) ? kind : "note";
  }

  function createVisualExtension(modules) {
    const { Decoration, WidgetType } = modules;
    let cachedDoc, cachedSyntax, cachedParsed, cachedMath;

    function activateAt(view, event, position) {
      if (typeof event.button === "number" && event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      view.dispatch({ selection: { anchor: position }, scrollIntoView: true });
      view.focus();
    }

    class MathWidget extends WidgetType {
      constructor(tex, display, from, editFrom, container = null, to = from) {
        super();
        this.tex = tex;
        this.display = display;
        this.from = from;
        this.editFrom = editFrom;
        this.container = container;
        this.to = to;
      }

      eq(other) {
        return other.tex === this.tex && other.display === this.display && other.from === this.from && other.to === this.to &&
          other.editFrom === this.editFrom &&
          other.container?.kind === this.container?.kind && other.container?.last === this.container?.last;
      }

      toDOM(view) {
        const node = document.createElement(this.display ? "div" : "span");
        node.className = this.display ? "mn-cm-math mn-cm-math--display" : "mn-cm-math mn-cm-math--inline";
        if (this.container) {
          node.classList.add("mn-cm-math--in-admonition", `mn-cm-${safeClass(this.container.kind)}`);
          if (this.container.last) node.classList.add("mn-cm-math--admonition-last");
        }
        node.dataset.mnEditPoint = String(this.editFrom);
        node.dataset.mnSourceTo = String(this.to);
        node.title = "点击编辑公式";
        try {
          if (window.katex) window.katex.render(this.tex, node, { throwOnError: false, displayMode: this.display });
          else node.textContent = this.tex;
        } catch (_) {
          node.textContent = this.tex;
        }
        const activate = (event) => activateAt(view, event, this.editFrom);
        node.addEventListener("mousedown", activate);
        return node;
      }

      ignoreEvent() {
        return true;
      }
    }

    class PrefixWidget extends WidgetType {
      constructor(text, kind, editFrom) {
        super();
        this.text = text;
        this.kind = kind;
        this.editFrom = editFrom;
      }

      eq(other) {
        return other.text === this.text && other.kind === this.kind && other.editFrom === this.editFrom;
      }

      toDOM(view) {
        const node = document.createElement("span");
        node.className = `mn-cm-admonition-prefix mn-cm-color-${safeClass(this.kind)}`;
        node.dataset.mnEditPoint = String(this.editFrom);
        node.textContent = this.text;
        const activate = (event) => activateAt(view, event, this.editFrom);
        node.addEventListener("mousedown", activate);
        return node;
      }

      ignoreEvent() { return true; }
    }

    class MathPreview extends MathWidget {
      toDOM(view) {
        const node = super.toDOM(view);
        node.classList.add("mn-cm-math-preview");
        node.removeAttribute("data-mn-edit-point");
        node.title = "公式实时预览";
        return node;
      }
    }

    class BulletWidget extends WidgetType {
      constructor(editFrom) {
        super();
        this.editFrom = editFrom;
      }

      eq(other) { return other.editFrom === this.editFrom; }

      toDOM(view) {
        const node = document.createElement("span");
        node.className = "mn-cm-list-bullet";
        node.dataset.mnEditPoint = String(this.editFrom);
        node.textContent = "•";
        const activate = (event) => activateAt(view, event, this.editFrom);
        node.addEventListener("mousedown", activate);
        return node;
      }

      ignoreEvent() { return true; }
    }

    function buildDecorations(state) {
      const source = state.doc.toString();
      const decorations = [];
      const replaced = [];
      const overlapsReplacement = (from, to) => replaced.some((range) => from < range.to && to > range.from);
      const addReplacement = (from, to, specification) => {
        if (from >= to || overlapsReplacement(from, to)) return;
        replaced.push({ from, to });
        decorations.push(Decoration.replace(specification).range(from, to));
      };

      if (cachedDoc !== state.doc) {
        cachedDoc = state.doc;
        cachedParsed = modules.parseAdmonitions(source, KIND_LABELS);
        cachedSyntax = modules.analyzeMarkdown(source, cachedParsed.blocks);
        const blocked = [...cachedSyntax.code, ...cachedSyntax.inline.filter(item => item.type === "InlineCode")];
        const displayMath = findDisplayMath(source).filter(range => !blocked.some(item => range.from < item.to && range.to > item.from));
        cachedMath = [...displayMath, ...modules.findInlineMath(source, [...blocked, ...displayMath])].sort((a, b) => a.from - b.from);
      }
      const parsed = cachedParsed;
      const math = cachedMath;
      math.forEach((range) => {
        if (rangeIsActive(state, range.from, range.to)) {
          decorations.push(Decoration.mark({ class: range.display ? "mn-cm-math-source mn-cm-math-source--display" : "mn-cm-math-source" }).range(range.from, range.to));
          if (range.display) decorations.push(Decoration.widget({
            widget: new MathPreview(range.tex, true, range.from, range.editFrom), block: true, side: 1
          }).range(range.to));
          return;
        }
        const parentBlock = range.display
          ? parsed.blocks.find((block) => range.from >= block.from && range.to <= block.to)
          : null;
        const container = parentBlock
          ? { kind: parentBlock.kind, last: range.to === parentBlock.to }
          : null;
        addReplacement(range.from, range.to, {
          widget: new MathWidget(range.tex, range.display, range.from, range.editFrom, container, range.to),
          block: range.display
        });
      });

      const admonitionLines = new Set();
      parsed.blocks.forEach((block) => {
        if (cachedSyntax.code.some(range => block.from >= range.from && block.from < range.to)) return;
        const kind = safeClass(block.kind);
        const headerFrom = block.offsets[block.startLine];
        const headerTo = headerFrom + block.lines[block.startLine].length;
        const headerActive = lineIsActive(state, headerFrom, headerTo);

        for (let lineIndex = block.startLine; lineIndex <= block.endLine; lineIndex += 1) {
          admonitionLines.add(lineIndex);
          const from = block.offsets[lineIndex];
          const to = from + block.lines[lineIndex].length;
          const position = lineIndex === block.startLine ? "first" : lineIndex === block.endLine ? "last" : "middle";
          decorations.push(Decoration.line({ attributes: { class: `mn-cm-admonition mn-cm-${kind} mn-cm-admonition--${position}` } }).range(from));

          if (lineIndex > block.startLine && !lineIsActive(state, from, to)) {
            const anchor = /^\s{4}<a id="[^"]+"><\/a>\s*$/.exec(block.lines[lineIndex]);
            if (anchor) {
              addReplacement(from, to, {});
              decorations.push(Decoration.line({ attributes: { class: "mn-cm-anchor-line" } }).range(from));
            } else if (block.lines[lineIndex].startsWith("    ")) {
              addReplacement(from, from + 4, {});
            }
          }
        }

        if (!headerActive) {
          const title = block.header[3];
          const number = displayNumber(block.anchor);
          if (title) {
            const titleFrom = headerFrom + block.lines[block.startLine].indexOf(`"${title}"`) + 1;
            addReplacement(headerFrom, titleFrom, { widget: new PrefixWidget(number ? `${number} ` : "", kind, titleFrom) });
            addReplacement(titleFrom + title.length, headerTo, {});
            decorations.push(Decoration.mark({
              class: "mn-cm-admonition-title",
              attributes: {
                "data-mn-edit-from": String(titleFrom),
                "data-mn-edit-to": String(titleFrom + title.length)
              }
            }).range(titleFrom, titleFrom + title.length));
          } else {
            addReplacement(headerFrom, headerTo, {
              widget: new PrefixWidget(`${number ? number + " " : ""}${KIND_LABELS[kind] || kind}`, kind, headerFrom)
            });
          }
        }
      });

      parsed.lines.forEach((line, lineIndex) => {
        const from = parsed.offsets[lineIndex];
        const to = from + line.length;
        const active = lineIsActive(state, from, to);
        decorations.push(Decoration.line({ attributes: {
          "data-mn-line-from": String(from),
          "data-mn-line-to": String(to)
        } }).range(from));
        if (cachedSyntax.code.some(range => from >= range.from && from <= range.to)) {
          decorations.push(Decoration.line({ attributes: { class: "mn-cm-code-line" } }).range(from));
          return;
        }
        if (!line.trim()) {
          decorations.push(Decoration.line({ attributes: { class: "mn-cm-blank-line" } }).range(from));
          return;
        }

        const heading = /^(#{1,4})\s+(.*)$/.exec(line);
        if (heading && !admonitionLines.has(lineIndex)) {
          decorations.push(Decoration.line({ attributes: { class: `mn-cm-heading mn-cm-heading-${heading[1].length}` } }).range(from));
          if (!active) {
            const textFrom = from + heading[1].length + 1;
            addReplacement(from, textFrom, {});
            decorations.push(Decoration.mark({
              attributes: {
                "data-mn-edit-from": String(textFrom),
                "data-mn-edit-to": String(to)
              }
            }).range(textFrom, to));
          }
        }
        const listItem = /^(\s{0,12})[+*-]\s+/.exec(line);
        if (listItem && !active) {
          const markerFrom = from + listItem[1].length;
          addReplacement(markerFrom, from + listItem[0].length, {
            widget: new BulletWidget(from + listItem[0].length)
          });
        }

        cachedSyntax.inline.filter(token => token.from >= from && token.to <= to).forEach(token => {
          const { contentFrom, contentTo } = token;
          if (contentFrom >= contentTo || overlapsReplacement(token.from, contentFrom) || overlapsReplacement(contentTo, token.to)) return;
          const tokenActive = rangeIsActive(state, token.from, token.to);
          if (!tokenActive) {
            addReplacement(token.from, contentFrom, {});
            addReplacement(contentTo, token.to, {});
          } else {
            decorations.push(Decoration.mark({ class: "mn-cm-format-source" }).range(token.from, contentFrom));
            decorations.push(Decoration.mark({ class: "mn-cm-format-source" }).range(contentTo, token.to));
          }
          decorations.push(Decoration.mark({
            class: ({ StrongEmphasis: "mn-cm-strong", Emphasis: "mn-cm-em", InlineCode: "mn-cm-code", Link: "mn-cm-link", Strikethrough: "mn-cm-strike" })[token.type],
            attributes: {
              "data-mn-edit-from": String(contentFrom),
              "data-mn-edit-to": String(contentTo)
            }
          }).range(contentFrom, contentTo));
        });
      });
      return Decoration.set(decorations, true);
    }

    return modules.EditorView.decorations.compute(["doc", "selection"], buildDecorations);
  }

  function suggestedAnchor(source, position, prefix) {
    const before = source.slice(0, position);
    const all = Array.from(source.matchAll(/id="(?:def|thm|prop|lem|cor|rem|ex|prf)-(\d+)-(\d+)-(\d+)"/g));
    const nearest = Array.from(before.matchAll(/id="(?:def|thm|prop|lem|cor|rem|ex|prf)-(\d+)-(\d+)-(\d+)"/g)).pop();
    const chapter = nearest?.[1] || all[0]?.[1] || "1";
    const section = String(Math.max(1, (before.match(/^##\s+/gm) || []).length));
    const used = all.filter((anchor) => anchor[1] === chapter && anchor[2] === section).map((anchor) => Number(anchor[3]));
    return `${prefix}-${chapter}-${section}-${used.length ? Math.max(...used) + 1 : 1}`;
  }

  function blockText(block, source, position) {
    if (block.special === "math") return { text: "$$\nformula\n$$", select: [3, 10] };
    if (block.special === "heading") return { text: "## Section title", select: [3, 16] };
    const anchor = suggestedAnchor(source, position, block.prefix);
    const body = block.id === "proof" ? "Write the proof here." : `Write the ${block.id} here.`;
    const text = `${block.marker} ${block.id} "${block.title}"\n    <a id="${anchor}"></a>\n    ${body}`;
    const name = text.indexOf("Name");
    const bodyStart = text.indexOf(body);
    return {
      text,
      select: name >= 0 ? [name, name + 4] : [bodyStart, bodyStart + body.length],
      nextSelect: name >= 0 ? [bodyStart, bodyStart + body.length] : null
    };
  }

  function makeBlockMenu(state) {
    const menu = document.createElement("div");
    menu.className = "mn-typora-menu";
    menu.hidden = true;
    menu.setAttribute("role", "menu");
    BLOCKS.forEach((block) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mn-typora-menu__item mn-typora-menu__item--${block.id}`;
      button.dataset.block = block.id;
      button.innerHTML = `<span>${escapeHtml(block.label)}</span><small>${escapeHtml(block.detail)}</small>`;
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => insertBlock(state, block));
      menu.appendChild(button);
    });
    state.shell.appendChild(menu);
    return menu;
  }

  function showMenu(state, mode, anchorElement) {
    state.menuMode = mode;
    state.menu.hidden = false;
    selectMenuItem(state, 0);
    state.menu.classList.toggle("mn-typora-menu--slash", mode === "slash");
    if (mode === "slash") {
      const coordinates = state.view.coordsAtPos(state.view.state.selection.main.head);
      if (coordinates) {
        state.menu.style.left = `${Math.min(coordinates.left, innerWidth - 290)}px`;
        state.menu.style.top = `${Math.min(coordinates.bottom + 8, innerHeight - 390)}px`;
      }
    } else {
      const rect = anchorElement.getBoundingClientRect();
      state.menu.style.left = `${rect.left}px`;
      state.menu.style.top = `${rect.bottom + 8}px`;
    }
  }

  function hideMenu(state) {
    if (state?.menu) state.menu.hidden = true;
  }

  function selectMenuItem(state, index) {
    const items = Array.from(state.menu.querySelectorAll("[data-block]:not([hidden])"));
    if (!items.length) return hideMenu(state);
    state.menuIndex = (index + items.length) % items.length;
    items.forEach((item, i) => item.setAttribute("aria-selected", String(i === state.menuIndex)));
  }

  function updateSlashMenu(state) {
    if (!state.menu || state.view.composing) return;
    const selection = state.view.state.selection.main;
    if (!selection.empty) return hideMenu(state);
    const line = state.view.state.doc.lineAt(selection.head);
    const before = line.text.slice(0, selection.head - line.from);
    const match = /^\s*\/([^\s]*)$/.exec(before);
    if (!match) {
      if (state.menuMode === "slash") hideMenu(state);
      return;
    }
    const query = match[1].toLowerCase();
    state.slashRange = { from: line.from, to: selection.head };
    state.menu.querySelectorAll("[data-block]").forEach((button) => {
      const block = BLOCKS.find((item) => item.id === button.dataset.block);
      button.hidden = Boolean(query) && !`${block.id}${block.label}`.toLowerCase().includes(query);
    });
    showMenu(state, "slash");
  }

  function insertBlock(state, block) {
    const doc = state.view.state.doc;
    const selection = state.view.state.selection.main;
    let from;
    let to;
    if (state.menuMode === "slash" && state.slashRange) {
      from = state.slashRange.from;
      to = state.slashRange.to;
    } else {
      const line = doc.lineAt(selection.head);
      from = line.to;
      to = line.to;
    }
    const result = blockText(block, doc.toString(), from);
    const prefix = from > 0 && doc.sliceString(from - 1, from) !== "\n" ? "\n\n" : "";
    const suffix = to < doc.length && doc.sliceString(to, to + 1) !== "\n" ? "\n" : "\n\n";
    const insertion = prefix + result.text + suffix;
    const selectFrom = from + prefix.length + result.select[0];
    state.view.dispatch({
      changes: { from, to, insert: insertion },
      selection: { anchor: selectFrom, head: from + prefix.length + result.select[1] },
      scrollIntoView: true
    });
    state.blockTabStop = result.nextSelect ? {
      headerFrom: from + prefix.length,
      headerTo: from + prefix.length + result.text.indexOf("\n"),
      from: from + prefix.length + result.nextSelect[0],
      to: from + prefix.length + result.nextSelect[1]
    } : null;
    hideMenu(state);
    state.view.focus();
  }

  function handleBlockEnter(state) {
    const selection = state.view.state.selection.main;
    if (!selection.empty) return false;
    const doc = state.view.state.doc;
    const line = doc.lineAt(selection.head);
    const parsed = state.modules.parseAdmonitions(doc.toString(), KIND_LABELS);
    const lineIndex = line.number - 1;
    const block = parsed.blocks.find((candidate) => lineIndex > candidate.startLine &&
      (lineIndex <= candidate.endLine || lineIndex === candidate.endLine + 1 && /^(?: {4}|\t)\s*$/.test(line.text)));
    if (!block) return false;
    const base = line.text.startsWith("    ") ? "    " : line.text.startsWith("\t") ? "\t" : "";
    if (!base || selection.head < line.from + base.length) return false;
    const content = line.text.slice(base.length);
    const item = /^(\s*)([-+*]|\d+[.)])(\s+)(?:\[([ xX])\]\s*)?(.*)$/.exec(content);
    if (item) {
      if (!item[5].trim()) {
        const nested = item[1];
        const replacement = nested ? nested.replace(/(?: {1,4}|\t)$/, "") + item[2] + " " : "";
        state.view.dispatch({
          changes: { from: line.from + base.length, to: line.to, insert: replacement },
          selection: { anchor: line.from + base.length + replacement.length },
          scrollIntoView: true, userEvent: "input"
        });
        return true;
      }
      const ordered = /^(\d+)([.)])$/.exec(item[2]);
      const marker = ordered ? `${Number(ordered[1]) + 1}${ordered[2]}` : item[2];
      const task = item[4] === undefined ? "" : "[ ] ";
      const insertion = `\n${base}${item[1]}${marker} ${task}`;
      state.view.dispatch({ changes: { from: selection.from, to: selection.to, insert: insertion },
        selection: { anchor: selection.from + insertion.length }, scrollIntoView: true, userEvent: "input" });
      return true;
    }
    if (!content.trim()) {
      state.view.dispatch({ changes: { from: line.from, to: line.to }, selection: { anchor: line.from },
        scrollIntoView: true, userEvent: "input" });
      return true;
    }
    const indentation = /^\s*/.exec(line.text)[0] || base;
    const insertion = `\n${indentation}`;
    state.view.dispatch({ changes: { from: selection.from, to: selection.to, insert: insertion },
      selection: { anchor: selection.from + insertion.length }, scrollIntoView: true, userEvent: "input" });
    return true;
  }

  function setStatus(state, message, kind) {
    if (!state?.status) return;
    state.status.textContent = message;
    state.status.dataset.kind = kind || "";
  }

  function toolbarMarkup(payload) {
    const pageButton = payload.courseSlug
      ? '<button type="button" class="mn-typora-button mn-typora-button--structure" data-action="create-page">＋ 新页面</button>'
      : "";
    return `
      <div class="mn-typora-toolbar__identity">
        <span class="mn-typora-toolbar__dot" aria-hidden="true"></span>
        <div><strong>编辑模式</strong><small>${escapeHtml(payload.sourcePath)}</small></div>
      </div>
      <div class="mn-typora-toolbar__actions">
        <span class="mn-typora-status" role="status">正在载入编辑器…</span>
        <button type="button" class="mn-typora-button mn-typora-button--add" data-action="add">＋ 添加块</button>
        ${pageButton}
        <button type="button" class="mn-typora-button mn-typora-button--structure" data-action="create-course">＋ 新课程</button>
        <button type="button" class="mn-typora-button mn-typora-button--structure" data-action="reorder-courses">课程排序</button>
        <button type="button" class="mn-typora-button" data-action="source">源码</button>
        <details class="mn-typora-more">
          <summary class="mn-typora-button">更多</summary>
          <div class="mn-typora-more__menu">
        <button type="button" class="mn-typora-button" data-action="bold">加粗 · ⌘/Ctrl B</button>
        <button type="button" class="mn-typora-button" data-action="italic">斜体 · ⌘/Ctrl I</button>
        <button type="button" class="mn-typora-button" data-action="math">行内公式 · ⌘/Ctrl ⇧M</button>
        <button type="button" class="mn-typora-button" data-action="export">导出</button>
          </div>
        </details>
        <button type="button" class="mn-typora-button mn-typora-button--save" data-action="save">保存</button>
        <button type="button" class="mn-typora-button mn-typora-button--done" data-action="done">完成</button>
      </div>`;
  }

  function closeStructureDialog(state) {
    if (!state?.structureDialog) return;
    state.structureDialog.hidden = true;
    state.view.focus();
  }

  function structureDialogMarkup(mode, payload) {
    const isCourse = mode === "course";
    const course = (payload.courses || []).find((item) => item.slug === payload.courseSlug);
    return `
      <div class="mn-structure-dialog__backdrop" data-structure-close></div>
      <section class="mn-structure-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="mn-structure-title">
        <button type="button" class="mn-structure-dialog__close" data-structure-close aria-label="关闭">×</button>
        <span class="mn-structure-dialog__eyebrow">站点结构</span>
        <h2 id="mn-structure-title">${isCourse ? "新建课程" : "新建课程页面"}</h2>
        <p>${isCourse
          ? "课程会同时出现在顶部导航和主页课程卡片中。"
          : `页面将加入“${escapeHtml(course?.title || payload.courseSlug)}”的导航与课程目录。`}</p>
        <form class="mn-structure-form">
          ${isCourse ? "" : `<input type="hidden" name="course" value="${escapeHtml(payload.courseSlug)}">`}
          <label>
            <span>${isCourse ? "课程名称" : "页面标题"}</span>
            <input name="title" required maxlength="${isCourse ? 80 : 100}" autocomplete="off" placeholder="${isCourse ? "例如：复分析" : "例如：Holomorphic Functions"}">
          </label>
          <label>
            <span>${isCourse ? "课程目录名" : "页面文件名"}</span>
            <input name="slug" required maxlength="64" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" autocomplete="off" spellcheck="false" placeholder="${isCourse ? "complex-analysis" : "holomorphic-functions"}">
            <small>使用小写英文字母、数字和短横线</small>
          </label>
          <label>
            <span>${isCourse ? "主页简介" : "页面简介"}</span>
            <textarea name="description" maxlength="240" rows="3" placeholder="一句话概括内容（可选）"></textarea>
          </label>
          <div class="mn-structure-form__error" role="alert" hidden></div>
          <div class="mn-structure-form__actions">
            <button type="button" class="mn-structure-cancel" data-structure-close>取消</button>
            <button type="submit" class="mn-structure-submit">${isCourse ? "创建课程" : "创建页面"}</button>
          </div>
        </form>
      </section>`;
  }

  function openStructureDialog(state, mode) {
    if (!state.payload.manageEndpoint) return;
    if (mode === "page" && !state.payload.courseSlug) {
      setStatus(state, "请先进入某个课程，再新建页面", "error");
      return;
    }
    if (!state.structureDialog) {
      const dialog = document.createElement("div");
      dialog.className = "mn-structure-dialog";
      dialog.hidden = true;
      dialog.addEventListener("click", (event) => {
        if (event.target.closest("[data-structure-close]")) closeStructureDialog(state);
      });
      state.shell.appendChild(dialog);
      state.structureDialog = dialog;
    }
    const dialog = state.structureDialog;
    if (mode === "order") {
      openCourseOrder(state, dialog);
      return;
    }
    dialog.innerHTML = structureDialogMarkup(mode, state.payload);
    dialog.hidden = false;
    const form = dialog.querySelector("form");
    const title = form.elements.title;
    const slug = form.elements.slug;
    const formKey = `mn-structure-form:${mode}:${state.payload.courseSlug || ""}`;
    try {
      const saved = JSON.parse(sessionStorage.getItem(formKey) || "{}");
      for (const name of ["title", "slug", "description"]) {
        if (typeof saved[name] === "string") form.elements[name].value = saved[name];
      }
    } catch (_) { /* The form remains usable if session storage is unavailable. */ }
    let slugWasEdited = Boolean(slug.value);
    slug.addEventListener("input", () => { slugWasEdited = true; });
    title.addEventListener("input", () => {
      if (!slugWasEdited) slug.value = suggestedSlug(title.value);
    });
    form.addEventListener("input", () => {
      try { sessionStorage.setItem(formKey, JSON.stringify(Object.fromEntries(new FormData(form)))); } catch (_) {}
    });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("[type=submit]");
      const error = form.querySelector(".mn-structure-form__error");
      submit.disabled = true;
      error.hidden = true;
      const values = Object.fromEntries(new FormData(form));
      try {
        writeDraft(state);
        await manageRequest(state.payload, { action: "status" });
        const result = await manageRequest(state.payload, {
          action: mode === "course" ? "createCourse" : "createPage", ...values
        });
        try { sessionStorage.removeItem(formKey); } catch (_) {}
        setStatus(state, mode === "course" ? "课程已创建，正在打开…" : "页面已创建，正在打开…", "saved");
        queueNavigation(result.url);
      } catch (requestError) {
        error.textContent = requestError.message || "创建失败，请稍后重试。";
        error.hidden = false;
        submit.disabled = false;
      }
    });
    requestAnimationFrame(() => title.focus());
  }

  async function openCourseOrder(state, dialog) {
    dialog.innerHTML = `
      <div class="mn-structure-dialog__backdrop" data-structure-close></div>
      <section class="mn-structure-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="mn-structure-title">
        <button type="button" class="mn-structure-dialog__close" data-structure-close aria-label="关闭">×</button>
        <span class="mn-structure-dialog__eyebrow">站点结构</span>
        <h2 id="mn-structure-title">课程排序</h2>
        <p>用箭头调整顺序，保存后同步顶部导航和主页课程卡片。</p>
        <div class="mn-course-order" aria-live="polite">正在读取课程…</div>
        <div class="mn-structure-form__error" role="alert" hidden></div>
        <div class="mn-structure-form__actions">
          <button type="button" class="mn-structure-cancel" data-structure-close>取消</button>
          <button type="button" class="mn-structure-submit" disabled>保存顺序</button>
        </div>
      </section>`;
    dialog.hidden = false;
    const list = dialog.querySelector(".mn-course-order");
    const error = dialog.querySelector(".mn-structure-form__error");
    const submit = dialog.querySelector(".mn-structure-submit");
    let courses, revision;
    const render = () => {
      list.innerHTML = courses.map((course, index) => `
        <div class="mn-course-order__row">
          <span class="mn-course-order__number">${index + 1}</span>
          <strong>${escapeHtml(course.title)}</strong>
          <button type="button" data-index="${index}" data-move="-1" ${index === 0 ? "disabled" : ""} aria-label="上移 ${escapeHtml(course.title)}">↑</button>
          <button type="button" data-index="${index}" data-move="1" ${index === courses.length - 1 ? "disabled" : ""} aria-label="下移 ${escapeHtml(course.title)}">↓</button>
        </div>`).join("");
    };
    try {
      const result = await manageRequest(state.payload, { action: "status" });
      courses = result.courses;
      revision = result.structureRevision;
      render();
      submit.disabled = courses.length < 2;
    } catch (requestError) {
      list.textContent = "课程列表暂时不可用";
      error.textContent = requestError.message;
      error.hidden = false;
      return;
    }
    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-move]");
      if (!button || button.disabled) return;
      const index = Number(button.dataset.index), next = index + Number(button.dataset.move);
      [courses[index], courses[next]] = [courses[next], courses[index]];
      render();
      list.querySelector(`[data-index="${next}"][data-move="${button.dataset.move}"]:not(:disabled)`)?.focus();
    });
    submit.addEventListener("click", async () => {
      submit.disabled = true;
      list.querySelectorAll("button").forEach(button => { button.disabled = true; });
      error.hidden = true;
      try {
        writeDraft(state);
        await manageRequest(state.payload, {
          action: "reorderCourses", order: courses.map(course => course.slug), baseRevision: revision
        });
        submit.textContent = "顺序已保存";
        setStatus(state, "课程顺序已保存，页面即将刷新", "saved");
        // The development server refreshes after rebuilding both navigation and cards.
        closeStructureDialog(state);
      } catch (requestError) {
        error.textContent = requestError.message;
        error.hidden = false;
        submit.disabled = false;
        render();
      }
    });
  }

  function downloadMarkdown(source, filename) {
    const blob = new Blob([source], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function saveSource(state) {
    if (state.saving) return false;
    const source = state.view.state.doc.toString();
    if (!LOCAL_HOSTS.has(location.hostname)) {
      downloadMarkdown(source, state.payload.sourcePath.split("/").pop());
      setStatus(state, "公开站点已导出 Markdown", "saved");
      return;
    }
    const button = state.toolbar.querySelector('[data-action="save"]');
    state.saving = true;
    state.pendingSource = source;
    writeDraft(state);
    sessionStorage.setItem(RESUME_KEY, state.payload.sourcePath);
    button.disabled = true;
    setStatus(state, "正在写入源文件…", "pending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(state.payload.saveEndpoint, {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json", "X-Math-Notes-Editor": "1" },
        body: JSON.stringify({ path: state.payload.sourcePath, source, baseRevision: state.baseRevision })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || `保存失败（${response.status}）`);
      state.baseRevision = result.revision;
      state.savedSource = source;
      state.pendingSource = null;
      writeDraft(state);
      setStatus(state, state.view.state.doc.toString() === source ? "已保存到文件" : "文件已保存 · 后续输入已保留为草稿", "saved");
      return true;
    } catch (error) {
      setStatus(state, error instanceof TypeError || error.name === "AbortError" ? "连接中断，草稿已保留，请检查本地网站后重试" : error.message, "error");
      return false;
    } finally {
      clearTimeout(timeout);
      state.saving = false;
      button.disabled = false;
    }
  }

  async function leaveEditor(state) {
    if (state.saving || state.leaving) return;
    if (!writeDraft(state)) return;
    if (state.view.state.doc.toString() !== state.savedSource) {
      state.leaving = true;
      const saved = await saveSource(state);
      state.leaving = false;
      if (!saved || state.destroyed) return;
      if (state.view.state.doc.toString() !== state.savedSource) {
        setStatus(state, "刚才保存期间还有新输入，已保留草稿；继续写或再次完成", "pending");
        state.view.focus();
        return;
      }
    }
    sessionStorage.removeItem(RESUME_KEY);
    hideMenu(state);
    clearTimeout(state.draftTimer);
    state.destroyed = true;
    state.view.destroy();
    state.article.innerHTML = state.originalHtml;
    document.body.classList.remove("mn-typora-editing");
    activeEditor = null;
    window.MathNotes?.renderMath?.(state.article);
    window.MathNotes?.numberBlocks?.(document.body);
    if (deferredReload || state.savedSource !== state.payload.source) location.reload();
  }

  function setOpeningStatus(visible) {
    document.getElementById(OPENING_STATUS_ID)?.remove();
    if (!visible) return;
    const status = document.createElement("div");
    status.id = OPENING_STATUS_ID;
    status.className = "mn-typora-opening-status";
    status.setAttribute("role", "status");
    status.innerHTML = '<span aria-hidden="true"></span><strong>正在打开编辑器…</strong>';
    document.body.appendChild(status);
  }

  async function enterEditor(payload, generation) {
    if (!LOCAL_HOSTS.has(location.hostname)) return;
    if (activeEditor || openingGeneration === generation) return;
    openingGeneration = generation;
    setOpeningStatus(true);
    let modules;
    try {
      modules = await loadEditorModules();
    } catch (error) {
      if (generation === pageGeneration) {
        setOpeningStatus(false);
        alert("编辑器组件加载失败，请检查网络后重试。Markdown 文件没有受到影响。");
      }
      if (openingGeneration === generation) openingGeneration = 0;
      console.error(error);
      return;
    }
    if (generation !== pageGeneration) {
      setOpeningStatus(false);
      if (openingGeneration === generation) openingGeneration = 0;
      return;
    }

    const article = document.querySelector(".md-content article.md-typeset");
    if (!article) {
      setOpeningStatus(false);
      if (openingGeneration === generation) openingGeneration = 0;
      return;
    }

    const draft = readDraft(payload);
    let source = payload.source;
    const draftCompatible = draft && (draft.baseRevision === payload.revision || draft.pendingSource === payload.source || draft.source === payload.source);
    if (draft && draft.source !== payload.source && (draftCompatible || confirm("发现基于旧版本的浏览器草稿。要恢复它吗？恢复后不会覆盖磁盘上的新版本，可先导出对照。"))) {
      source = draft.source;
    }

    const originalHtml = article.innerHTML;
    article.innerHTML = "";
    const shell = document.createElement("div");
    shell.className = "mn-typora-shell";
    const toolbar = document.createElement("div");
    toolbar.className = "mn-typora-toolbar";
    toolbar.innerHTML = toolbarMarkup(payload);
    const surface = document.createElement("div");
    surface.className = "mn-typora-surface";
    shell.append(toolbar, surface);
    article.appendChild(shell);
    document.body.classList.add("mn-typora-editing");
    setOpeningStatus(false);

    const visualCompartment = new modules.Compartment();
    const visualExtension = createVisualExtension(modules);
    const state = {
      article, shell, toolbar, surface, payload, originalHtml, modules,
      baseRevision: source === draft?.source && !draftCompatible ? draft.baseRevision : payload.revision,
      savedSource: payload.source, pendingSource: null,
      status: toolbar.querySelector(".mn-typora-status"), visualCompartment, visualExtension,
      visual: true, draftTimer: null, menu: null, menuMode: "toolbar", slashRange: null,
      blockTabStop: null,
      structureDialog: null, view: null
    };

    const updateListener = modules.EditorView.updateListener.of((update) => {
      if (state.blockTabStop && update.docChanged) {
        const stop = state.blockTabStop;
        state.blockTabStop = {
          headerFrom: update.changes.mapPos(stop.headerFrom, -1),
          headerTo: update.changes.mapPos(stop.headerTo, 1),
          from: update.changes.mapPos(stop.from, 1),
          to: update.changes.mapPos(stop.to, -1)
        };
      } else if (state.blockTabStop && update.selectionSet) {
        const selection = update.state.selection.main;
        if (selection.from < state.blockTabStop.headerFrom || selection.to > state.blockTabStop.headerTo) {
          state.blockTabStop = null;
        }
      }
      if (update.docChanged) {
        setStatus(state, "正在保存草稿…", "pending");
        clearTimeout(state.draftTimer);
        state.draftTimer = setTimeout(() => writeDraft(state), 350);
      }
      if (update.docChanged || update.selectionSet) updateSlashMenu(state);
    });
    const textOffsetAtPoint = (element, x, y, sourceText = "") => {
      const lineElement = element.closest(".cm-line") || element;
      const editFrom = element.dataset.mnEditFrom;
      const editTo = element.dataset.mnEditTo;
      const fragments = Array.from(lineElement.querySelectorAll("[data-mn-edit-from][data-mn-edit-to]"))
        .filter((fragment) => fragment.dataset.mnEditFrom === editFrom && fragment.dataset.mnEditTo === editTo);
      const textNodes = [];
      const seen = new Set();
      const collect = (node) => {
        if (node.nodeType === 3) {
          if (!seen.has(node)) {
            seen.add(node);
            textNodes.push(node);
          }
        }
        else Array.from(node.childNodes || []).forEach(collect);
      };
      (fragments.length ? fragments : [element]).forEach(collect);

      let searchFrom = 0;
      let closest = null;
      textNodes.forEach((node) => {
        const value = node.nodeValue || "";
        let textBase = searchFrom;
        if (sourceText) {
          const sourceIndex = sourceText.indexOf(value, searchFrom);
          if (sourceIndex >= 0) textBase = sourceIndex;
        }
        for (let index = 0; index < value.length; index += 1) {
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + 1);
          Array.from(range.getClientRects()).forEach((rect) => {
            const verticalDistance = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
            const horizontalDistance = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
            const score = verticalDistance * 10000 + horizontalDistance;
            const offset = textBase + index + (x > (rect.left + rect.right) / 2 ? 1 : 0);
            if (!closest || score < closest.score) closest = { score, offset };
          });
        }
        searchFrom = Math.max(searchFrom, textBase + value.length);
      });
      return closest?.offset ?? null;
    };
    const linePositionAtPoint = (lineElement, x, y, sourceText, lineFrom) => {
      let searchFrom = 0;
      let closest = null;
      const consider = (rect, position) => {
        const verticalDistance = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
        const horizontalDistance = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
        const score = verticalDistance * 10000 + horizontalDistance;
        if (!closest || score < closest.score) closest = { score, position };
      };
      const visit = (node) => {
        if (node.nodeType === 1) {
          if (node.matches?.("[data-mn-edit-point]")) {
            consider(node.getBoundingClientRect(), Number(node.dataset.mnEditPoint));
            searchFrom = Math.max(searchFrom, Number(node.dataset.mnSourceTo || node.dataset.mnEditPoint) - lineFrom);
            return;
          }
          if (node.dataset?.mnEditFrom) searchFrom = Math.max(searchFrom, Number(node.dataset.mnEditFrom) - lineFrom);
          Array.from(node.childNodes || []).forEach(visit);
          if (node.dataset?.mnEditTo) searchFrom = Math.max(searchFrom, Number(node.dataset.mnEditTo) - lineFrom);
          return;
        }
        if (node.nodeType !== 3) return;
        const value = node.nodeValue || "";
        if (!value) return;
        const sourceIndex = sourceText.indexOf(value, searchFrom);
        if (sourceIndex < 0) return;
        for (let index = 0; index < value.length; index += 1) {
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + 1);
          Array.from(range.getClientRects()).forEach((rect) => {
            const position = lineFrom + sourceIndex + index + (x > (rect.left + rect.right) / 2 ? 1 : 0);
            consider(rect, position);
          });
        }
        searchFrom = sourceIndex + value.length;
      };
      visit(lineElement);
      return Number.isInteger(closest?.position) ? closest.position : null;
    };
    const visualPositionAtEvent = (event, view) => {
      if (typeof event.button === "number" && event.button !== 0) return false;
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (!target) return null;

      const pointElement = target.closest("[data-mn-edit-point]");
      if (pointElement) return Number(pointElement.dataset.mnEditPoint);

      const rangeElement = target.closest("[data-mn-edit-from][data-mn-edit-to]");
      if (rangeElement) {
        const from = Number(rangeElement.dataset.mnEditFrom);
        const to = Number(rangeElement.dataset.mnEditTo);
        const sourceText = view.state.doc.sliceString(from, to);
        const textOffset = textOffsetAtPoint(rangeElement, event.clientX, event.clientY, sourceText);
        let position;
        if (textOffset != null) {
          position = from + Math.max(0, Math.min(to - from, textOffset));
        } else {
          const mapped = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
          if (mapped != null && mapped >= from && mapped <= to) position = mapped;
          else {
            const rect = rangeElement.getBoundingClientRect();
            const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) : 0;
            position = Math.round(from + (to - from) * ratio);
          }
        }
        return position;
      }

      const lineElement = target.closest(".cm-line[data-mn-line-from][data-mn-line-to]");
      if (!lineElement) return null;
      const lineFrom = Number(lineElement.dataset.mnLineFrom);
      const lineTo = Number(lineElement.dataset.mnLineTo);
      const sourceText = view.state.doc.sliceString(lineFrom, lineTo);
      let position = linePositionAtPoint(lineElement, event.clientX, event.clientY, sourceText, lineFrom);
      if (position == null) position = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
      if (position == null || position < lineFrom || position > lineTo) {
        const rect = lineElement.getBoundingClientRect();
        const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) : 0;
        position = Math.round(lineFrom + (lineTo - lineFrom) * ratio);
      }
      return position;
    };
    let pendingVisualPointer = null;
    const mouseSelection = modules.EditorView.mouseSelectionStyle.of((view, event) => {
      if (!state.visual || event.button !== 0) return null;
      const pending = pendingVisualPointer;
      pendingVisualPointer = null;
      const samePoint = pending && Math.abs(pending.x - event.clientX) <= 3 && Math.abs(pending.y - event.clientY) <= 3;
      let start = samePoint ? pending.position : visualPositionAtEvent(event, view);
      if (!Number.isInteger(start)) return null;
      let startSelection = view.state.selection;
      const clickRange = position => {
        if (event.detail >= 3) {
          const line = view.state.doc.lineAt(position);
          return modules.EditorSelection.range(line.from, line.to);
        }
        if (event.detail === 2) return view.state.wordAt(position) || modules.EditorSelection.cursor(position);
        return modules.EditorSelection.cursor(position);
      };
      return {
        get(current, extend, multiple) {
          // The initial coordinates belong to the pre-expansion layout. Subsequent
          // drag positions belong to the current layout; let CodeMirror own drag,
          // autoscroll, shift-click and selection lifetime.
          let head = current === event ? start : visualPositionAtEvent(current, view);
          if (!Number.isInteger(head)) head = view.posAtCoords({ x: current.clientX, y: current.clientY }) ?? start;
          const first = clickRange(start), last = clickRange(head);
          const range = extend ? startSelection.main.extend(last.from, last.to)
            : modules.EditorSelection.range(head < start ? first.to : first.from, head < start ? last.from : last.to);
          return multiple ? startSelection.addRange(range) : modules.EditorSelection.create([range]);
        },
        update(update) {
          if (update.docChanged) {
            start = update.changes.mapPos(start);
            startSelection = startSelection.map(update.changes);
          }
        }
      };
    });
    const interactionHandler = modules.EditorView.domEventHandlers({
      pointerdown(event, view) {
        const position = visualPositionAtEvent(event, view);
        pendingVisualPointer = Number.isInteger(position)
          ? { position, x: event.clientX, y: event.clientY }
          : null;
        return false;
      },
      keydown(event) {
        if (event.isComposing || state.view.composing || event.keyCode === 229) return false;
        const stop = state.blockTabStop;
        const selection = state.view.state.selection.main;
        if (stop && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey &&
            (event.key === "Enter" || event.key === "Tab") &&
            selection.from >= stop.headerFrom && selection.to <= stop.headerTo) {
          event.preventDefault();
          state.blockTabStop = null;
          state.view.dispatch({ selection: { anchor: stop.from, head: stop.to }, scrollIntoView: true });
          return true;
        }
        if (event.key === "Enter" && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey &&
            handleBlockEnter(state)) {
          event.preventDefault();
          return true;
        }
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
          event.preventDefault();
          saveSource(state);
          return true;
        }
        if (!state.menu.hidden && ["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.key)) {
          event.preventDefault();
          if (event.key === "Escape") hideMenu(state);
          else if (event.key === "Enter") {
            const item = state.menu.querySelector('[aria-selected="true"]:not([hidden])');
            if (item) insertBlock(state, BLOCKS.find(block => block.id === item.dataset.block));
          } else selectMenuItem(state, state.menuIndex + (event.key === "ArrowDown" ? 1 : -1));
          return true;
        }
        return false;
      }
    });

    state.view = new modules.EditorView({
      state: modules.EditorState.create({
        doc: source,
        selection: source === draft?.source && draft.selection ? {
          anchor: Math.min(source.length, Math.max(0, draft.selection.anchor || 0)),
          head: Math.min(source.length, Math.max(0, draft.selection.head ?? draft.selection.anchor ?? 0))
        } : undefined,
        extensions: [modules.basicSetup, modules.markdown(), modules.writingExtension, modules.EditorView.lineWrapping,
          modules.EditorView.contentAttributes.of({ "aria-label": "笔记编辑器", spellcheck: "false" }),
          visualCompartment.of([visualExtension]), updateListener, mouseSelection, modules.Prec.highest(interactionHandler)]
      }),
      parent: surface
    });
    state.menu = makeBlockMenu(state);
    activeEditor = state;
    sessionStorage.setItem(RESUME_KEY, payload.sourcePath);
    if (openingGeneration === generation) openingGeneration = 0;
    setStatus(state, source === payload.source ? "所有更改会自动保存为草稿" : "已恢复浏览器草稿", "saved");

    toolbar.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (!action) return;
      toolbar.querySelector(".mn-typora-more")?.removeAttribute("open");
      if (modules.writingCommands[action]) {
        modules.writingCommands[action](state.view);
        state.view.focus();
      }
      if (action === "add") {
        state.menu.querySelectorAll("[data-block]").forEach((item) => { item.hidden = false; });
        showMenu(state, "toolbar", event.target.closest("button"));
      }
      if (action === "create-course") openStructureDialog(state, "course");
      if (action === "create-page") openStructureDialog(state, "page");
      if (action === "reorder-courses") openStructureDialog(state, "order");
      if (action === "source") {
        state.visual = !state.visual;
        state.view.dispatch({ effects: visualCompartment.reconfigure(state.visual ? [visualExtension] : []) });
        event.target.textContent = state.visual ? "源码" : "所见即所得";
        setStatus(state, state.visual ? "已回到即时排版" : "正在显示完整 Markdown", "saved");
        state.view.focus();
      }
      if (action === "export") {
        downloadMarkdown(state.view.state.doc.toString(), payload.sourcePath.split("/").pop());
        setStatus(state, "Markdown 已导出", "saved");
      }
      if (action === "save") saveSource(state);
      if (action === "done") leaveEditor(state);
    });
    shell.addEventListener("mousedown", (event) => {
      if (!event.target.closest(".mn-typora-menu, [data-action=add]")) hideMenu(state);
    });
    state.view.focus();
  }

  function initialize() {
    resumePendingNavigation();
    const generation = ++pageGeneration;
    currentPayload = null;
    setOpeningStatus(false);
    if (activeEditor) {
      writeDraft(activeEditor);
      activeEditor.destroyed = true;
      activeEditor.view.destroy();
      activeEditor = null;
      document.body.classList.remove("mn-typora-editing");
    }
    const payload = readPayload();
    if (!payload || !LOCAL_HOSTS.has(location.hostname)) return;
    currentPayload = payload;
    if (sessionStorage.getItem(RESUME_KEY) === payload.sourcePath) enterEditor(payload, generation);
    const preload = () => {
      if (generation === pageGeneration) loadEditorModules().catch(() => {});
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(preload, { timeout: 1600 });
    else setTimeout(preload, 500);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeEditor?.structureDialog && !activeEditor.structureDialog.hidden) {
      event.preventDefault();
      closeStructureDialog(activeEditor);
      return;
    }
    const shortcut = (event.metaKey || event.ctrlKey) && event.shiftKey &&
      !event.altKey && event.key.toLowerCase() === "e";
    if (!shortcut || event.repeat || !currentPayload) return;
    event.preventDefault();
    if (activeEditor) leaveEditor(activeEditor);
    else enterEditor(currentPayload, pageGeneration);
  });

  document$.subscribe(initialize);
  window.addEventListener("pagehide", () => { if (activeEditor) writeDraft(activeEditor); });
  window.addEventListener("beforeunload", () => { if (activeEditor) writeDraft(activeEditor); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && activeEditor) writeDraft(activeEditor);
  });
})();
