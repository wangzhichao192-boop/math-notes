/* Math Notes — a source-safe, Typora-style Markdown editor. */
(function () {
  "use strict";

  const SOURCE_ID = "mn-editor-source";
  const OPENING_STATUS_ID = "mn-typora-opening-status";
  const DRAFT_PREFIX = "mn-typora-draft:v1:";
  const PENDING_NAVIGATION_KEY = "mn-typora-pending-navigation";
  const EXIT_ANCHOR_KEY = "mn-typora-exit-anchor:v1";
  const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
  const EDITOR_ASSET_URL = new URL("codemirror.bundle.js?v=20260914-1", document.currentScript.src).href;
  const RESUME_KEY = "mn-typora-resume";

  const BLOCKS = [
    { id: "definition", label: "definition", marker: "!!!", title: "Definition (Name)", prefix: "def" },
    { id: "notation", label: "notation", marker: "!!!", title: "Notation (Name)", prefix: "not" },
    { id: "theorem", label: "theorem", marker: "!!!", title: "Theorem (Name)", prefix: "thm" },
    { id: "proposition", label: "proposition", marker: "!!!", title: "Proposition (Name)", prefix: "prop" },
    { id: "lemma", label: "lemma", marker: "!!!", title: "Lemma (Name)", prefix: "lem" },
    { id: "corollary", label: "corollary", marker: "!!!", title: "Corollary (Name)", prefix: "cor" },
    { id: "proof", label: "proof", marker: "???", title: "Proof", prefix: "prf" },
    { id: "idea", label: "idea", marker: "???", title: "Idea", prefix: "idea" },
    { id: "example", label: "example", marker: "!!!", title: "Example (Name)", prefix: "ex" },
    { id: "remark", label: "remark", marker: "!!!", title: "Remark", prefix: "rem" },
    { id: "display-math", label: "formula", symbol: "∑", special: "math" },
    { id: "heading", label: "heading", symbol: "H₂", special: "heading" }
  ];

  const KIND_LABELS = {
    definition: "Definition", notation: "Notation", theorem: "Theorem", proposition: "Proposition",
    lemma: "Lemma", corollary: "Corollary", proof: "Proof", idea: "Idea",
    example: "Example", remark: "Remark"
  };
  const NUMBERED_KINDS = new Set([
    "definition", "theorem", "proposition", "lemma", "corollary",
    "example", "remark"
  ]);

  let activeEditor = null;
  let activeOrganizer = null;
  let currentPayload = null;
  let editorModulesPromise = null;
  let pageGeneration = 0;
  let openingGeneration = 0;
  let pendingNavigationTimer = 0;
  let deferredReload = false;
  window.MathNotesDeferReload = () => {
    if (!activeEditor && !openingGeneration && !activeOrganizer) return false;
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

  function queueNavigation(url, forceReload = false) {
    const target = new URL(url, location.href).href;
    if (forceReload && location.href.split("#")[0] === target.split("#")[0]) {
      sessionStorage.removeItem(PENDING_NAVIGATION_KEY);
      setTimeout(() => location.assign(target), 700);
      return;
    }
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

  function normalizeAnchorText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function mapPositionBetweenSources(fromSource, toSource, position) {
    const from = String(fromSource || ""), to = String(toSource || "");
    const point = Math.max(0, Math.min(from.length, Number(position) || 0));
    let prefix = 0;
    const prefixLimit = Math.min(from.length, to.length);
    while (prefix < prefixLimit && from[prefix] === to[prefix]) prefix += 1;
    if (point <= prefix) return Math.min(point, to.length);

    let suffix = 0;
    while (suffix < from.length - prefix && suffix < to.length - prefix &&
           from[from.length - 1 - suffix] === to[to.length - 1 - suffix]) suffix += 1;
    if (point >= from.length - suffix) return Math.max(0, to.length - (from.length - point));

    const fromMiddle = Math.max(1, from.length - prefix - suffix);
    const toMiddle = Math.max(0, to.length - prefix - suffix);
    const progress = (point - prefix) / fromMiddle;
    return Math.round(prefix + toMiddle * Math.max(0, Math.min(1, progress)));
  }

  function sourceProbeAt(source, position) {
    const before = source.slice(0, position);
    const lineIndex = before.split("\n").length - 1;
    const lines = source.split("\n");
    const candidates = [];
    for (let distance = 0; distance <= 8; distance += 1) {
      [lineIndex - distance, lineIndex + distance].forEach((index) => {
        if (index < 0 || index >= lines.length || candidates.some(item => item.index === index)) return;
        const raw = lines[index].trim();
        if (!raw || /^(?:```|~~~|\$\$|\{#)/.test(raw)) return;
        const admonition = /^(?:!!!|\?\?\?)\s+[\w-]+(?:\s+"([^"]+)")?/.exec(raw);
        const anchorText = admonition ? (admonition[1] || "") : raw;
        if (!anchorText) return;
        const withoutLinks = anchorText
          .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
          .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
          .replace(/^#{1,6}\s+/, "")
          .replace(/^[-+*]\s+/, "")
          .replace(/^\d+[.)]\s+/, "");
        const segments = withoutLinks
          .split(/\${1,2}[^$]*\${1,2}/g)
          .map(part => normalizeAnchorText(part.replace(/[*_`~<>]/g, "").replace(/\\([\\`*_{}\[\]()#+.!-])/g, "$1")))
          .filter(part => part.length >= 8);
        segments.forEach(text => candidates.push({ index, distance, text }));
      });
    }
    candidates.sort((a, b) => a.distance - b.distance || b.text.length - a.text.length);
    return candidates[0]?.text.slice(0, 96) || "";
  }

  function editorVisualAnchorAt(state, viewportY) {
    const lines = Array.from(state.surface.querySelectorAll(".cm-line")).map(element => {
      const rectangle = element.getBoundingClientRect();
      let sourceText = "";
      try {
        const position = state.view.posAtDOM(element, 0);
        sourceText = state.view.state.doc.lineAt(position).text;
      } catch (_) {
        sourceText = renderedPlainText(element);
      }
      const admonition = /^(?:!!!|\?\?\?)\s+[\w-]+(?:\s+"([^"]+)")?/.exec(sourceText.trim());
      let text = (admonition ? (admonition[1] || "") : sourceText)
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\${1,2}[^$]*\${1,2}/g, " ")
        .replace(/^(?:!!!|\?\?\?)\s+[\w-]+\s+/, "")
        .replace(/^#{1,6}\s+/, "")
        .replace(/^[-+*]\s+/, "")
        .replace(/^\d+[.)]\s+/, "")
        .replace(/[*_`~<>]/g, "")
        .replace(/\\([\\`*_{}\[\]()#+.!-])/g, "$1");
      const visibleText = renderedPlainText(element);
      if (normalizeAnchorText(visibleText).length >= 8) text = visibleText;
      const distance = rectangle.top <= viewportY && rectangle.bottom >= viewportY
        ? 0
        : Math.min(Math.abs(rectangle.top - viewportY), Math.abs(rectangle.bottom - viewportY));
      return {
        element,
        rectangle,
        text: normalizeAnchorText(text),
        distance,
        centerDistance: Math.abs(rectangle.top + rectangle.height / 2 - viewportY)
      };
    }).filter(item => item.rectangle.height > 0 && item.text.length >= 8);
    lines.sort((a, b) => a.distance - b.distance || a.centerDistance - b.centerDistance || a.rectangle.height - b.rectangle.height);
    const surface = state.surface.getBoundingClientRect();
    const hitLines = [
      surface.left + surface.width / 2,
      surface.left + Math.min(48, surface.width / 4),
      surface.right - Math.min(48, surface.width / 4)
    ].map(x => document.elementFromPoint(x, viewportY)?.closest?.(".cm-line")).filter(Boolean);
    const line = lines.find(item => hitLines.includes(item.element)) || lines[0];
    if (!line) return null;
    const inset = Math.min(14, line.rectangle.height / 2);
    const targetY = Math.max(line.rectangle.top + inset, Math.min(line.rectangle.bottom - inset, viewportY));
    const progress = line.rectangle.height
      ? Math.max(0, Math.min(1, (targetY - line.rectangle.top) / line.rectangle.height))
      : 0.5;
    const length = Math.min(72, line.text.length);
    const center = Math.round(progress * line.text.length);
    const start = Math.max(0, Math.min(line.text.length - length, center - Math.round(length / 2)));
    return {
      viewportY: targetY,
      probe: line.text.slice(start, start + length).trim(),
      blockProgress: progress
    };
  }

  function captureEditorExitAnchor(state, targetSource = null) {
    if (!state?.view) return null;
    const currentSource = state.view.state.doc.toString();
    const finalSource = targetSource == null ? currentSource : String(targetSource);
    const selection = state.view.state.selection.main;
    const toolbarBottom = state.toolbar.getBoundingClientRect().bottom;
    const contentTop = Math.min(window.innerHeight - 80, Math.max(80, toolbarBottom + 18));
    let viewportY = Math.max(contentTop, Math.min(window.innerHeight - 70, window.innerHeight / 2));
    const surface = state.surface.getBoundingClientRect();
    let currentPosition = state.view.posAtCoords({
      x: Math.max(surface.left + 8, Math.min(surface.right - 8, (surface.left + surface.right) / 2)),
      y: viewportY
    }, false);
    if (!Number.isInteger(currentPosition)) currentPosition = selection.head;

    const position = mapPositionBetweenSources(currentSource, finalSource, currentPosition);
    const headings = state.modules.extractHeadings(finalSource);
    let heading = null, nextHeading = null;
    headings.forEach((candidate, index) => {
      if (candidate.from <= position) {
        heading = candidate;
        nextHeading = headings[index + 1] || null;
      }
    });
    const sectionFrom = heading?.contentFrom ?? 0;
    const sectionTo = nextHeading?.from ?? finalSource.length;
    const visualAnchor = editorVisualAnchorAt(state, viewportY);
    const anchor = {
      kind: "editor",
      sourcePath: state.payload.sourcePath,
      position,
      viewportY: visualAnchor?.viewportY ?? viewportY,
      probe: visualAnchor?.probe || sourceProbeAt(finalSource, position),
      blockProgress: visualAnchor?.blockProgress ?? 0.5,
      headingTitle: heading?.title || "",
      headingLevel: heading?.level || 0,
      sectionProgress: sectionTo > sectionFrom
        ? Math.max(0, Math.min(1, (position - sectionFrom) / (sectionTo - sectionFrom)))
        : 0,
      updatedAt: Date.now()
    };
    return anchor;
  }

  function rememberExitAnchor(anchor) {
    if (!anchor) return;
    try { sessionStorage.setItem(EXIT_ANCHOR_KEY, JSON.stringify(anchor)); } catch (_) {}
  }

  function readExitAnchor(payload) {
    try {
      const anchor = JSON.parse(sessionStorage.getItem(EXIT_ANCHOR_KEY));
      if (!anchor || anchor.sourcePath !== payload.sourcePath ||
          Date.now() - Number(anchor.updatedAt || 0) > 120000) {
        sessionStorage.removeItem(EXIT_ANCHOR_KEY);
        return null;
      }
      return anchor;
    } catch (_) {
      return null;
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

  function automaticBlockNumbers(source, blocks, chapterNumber) {
    const headings = Array.from(source.matchAll(/^##\s+/gm)).map((match) => match.index);
    const numbers = new Map();
    let headingIndex = 0;
    let section = 0;
    let blockNumber = 0;
    [...blocks].sort((left, right) => left.from - right.from).forEach((block) => {
      while (headingIndex < headings.length && headings[headingIndex] < block.from) {
        section += 1;
        blockNumber = 0;
        headingIndex += 1;
      }
      if (!NUMBERED_KINDS.has(block.kind)) return;
      if (section === 0) section = 1;
      blockNumber += 1;
      numbers.set(block.from, `${chapterNumber}.${section}.${blockNumber}`);
    });
    return numbers;
  }

  function safeClass(kind) {
    return /^[a-z][\w-]*$/.test(kind) ? kind : "note";
  }

  function createVisualExtension(modules, onAnalysis, chapterNumber = 1, payload = {}) {
    const { Decoration, WidgetType } = modules;
    let cachedDoc, cachedSyntax, cachedParsed, cachedMath, cachedNumbers, cachedImages;

    function diagramImages(source, blocked) {
      const images = [];
      const expression = /^([ \t]*)!\[([^\]\n]*)\]\(([^)\n]+)\)(?:\{([^}\n]*)\})?[ \t]*$/gm;
      let match;
      while ((match = expression.exec(source))) {
        const from = match.index, to = from + match[0].length;
        if (blocked.some(range => from < range.to && to > range.from)) continue;
        const attributes = match[4] || "";
        if (!/(?:^|\s)\.commutative-diagram(?:\s|$)/.test(attributes)) continue;
        const width = Number(/--mn-diagram-width:\s*([0-9.]+)rem/.exec(attributes)?.[1] || 14);
        images.push({
          from, to, source: match[0], alt: match[2], path: match[3].trim().replace(/^<|>$/g, ""),
          attributes, width: Math.max(5, Math.min(28, width))
        });
      }
      return images;
    }

    function imageUrl(path) {
      if (/^(?:[a-z]+:|\/\/|\/)/i.test(path)) return path;
      const sourceDirectory = String(payload.sourcePath || "").split("/").slice(0, -1).join("/");
      const logical = new URL(path, `https://math-notes.invalid/${sourceDirectory}/`).pathname.replace(/^\//, "");
      const mountPath = payload.mountPath || String(payload.saveEndpoint || "").replace(/[^/]*$/, "") || "/";
      return `${mountPath}${logical}`.replace(/\/{2,}/g, "/");
    }

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

    class DiagramWidget extends WidgetType {
      constructor(image) {
        super();
        this.image = image;
      }

      eq(other) {
        return other.image.source === this.image.source && other.image.from === this.image.from;
      }

      toDOM(view) {
        const figure = document.createElement("figure");
        figure.className = "mn-cm-diagram";
        figure.dataset.mnSourceFrom = String(this.image.from);
        figure.style.setProperty("--mn-diagram-width", `${this.image.width}rem`);

        const image = document.createElement("img");
        image.src = imageUrl(this.image.path);
        image.alt = this.image.alt;
        image.draggable = false;

        const controls = document.createElement("div");
        controls.className = "mn-cm-diagram__controls";
        controls.setAttribute("aria-label", "调整交换图大小");
        controls.addEventListener("pointerdown", event => event.stopPropagation());
        const resize = (delta) => {
          const width = Math.max(5, Math.min(28, this.image.width + delta));
          let replacement = this.image.source;
          if (/--mn-diagram-width:\s*[0-9.]+rem/.test(replacement)) {
            replacement = replacement.replace(/--mn-diagram-width:\s*[0-9.]+rem/, `--mn-diagram-width: ${width}rem`);
          } else if (/\}\s*$/.test(replacement)) {
            replacement = replacement.replace(/\}\s*$/, ` style="--mn-diagram-width: ${width}rem" }`);
          } else {
            replacement += `{ style="--mn-diagram-width: ${width}rem" }`;
          }
          view.dispatch({ changes: { from: this.image.from, to: this.image.to, insert: replacement } });
          view.focus();
        };
        [["−", -1, "缩小交换图"], ["+", 1, "放大交换图"]].forEach(([label, delta, title]) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = label;
          button.title = title;
          button.setAttribute("aria-label", title);
          button.addEventListener("mousedown", event => {
            event.preventDefault();
            event.stopPropagation();
          });
          button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            resize(delta);
          });
          controls.appendChild(button);
        });
        const size = document.createElement("span");
        size.textContent = `${this.image.width}rem`;
        size.title = "当前宽度";
        controls.insertBefore(size, controls.lastChild);
        figure.append(image, controls);
        return figure;
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
        cachedImages = diagramImages(source, cachedSyntax.code);
        cachedNumbers = automaticBlockNumbers(source, cachedParsed.blocks, chapterNumber);
        const blocked = [...cachedSyntax.code, ...cachedSyntax.inline.filter(item => item.type === "InlineCode")];
        const displayMath = findDisplayMath(source).filter(range => !blocked.some(item => range.from < item.to && range.to > item.from));
        cachedMath = [...displayMath, ...modules.findInlineMath(source, [...blocked, ...displayMath])].sort((a, b) => a.from - b.from);
        onAnalysis?.(cachedMath, state.doc);
      }
      const parsed = cachedParsed;
      const math = cachedMath;
      cachedImages.forEach((image) => {
        if (rangeIsActive(state, image.from, image.to)) return;
        addReplacement(image.from, image.to, { widget: new DiagramWidget(image), block: true });
      });
      math.forEach((range) => {
        if (rangeIsActive(state, range.from, range.to)) {
          decorations.push(Decoration.mark({ class: range.display ? "mn-cm-math-source mn-cm-math-source--display" : "mn-cm-math-source" }).range(range.from, range.to));
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
          const number = cachedNumbers.get(block.from) || "";
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
        if (listItem) {
          const markerFrom = from + listItem[1].length;
          const markerTo = from + listItem[0].length;
          const markerActive = state.selection.ranges.some(range => range.empty
            ? range.head >= markerFrom && range.head < markerTo
            : range.from < markerTo && range.to > markerFrom);
          if (!markerActive) addReplacement(markerFrom, markerTo, {
            widget: new BulletWidget(markerTo)
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

  function blockText(block, source, position) {
    if (block.special === "math") return { text: "$$\nformula\n$$", select: [3, 10] };
    if (block.special === "heading") {
      const level = block.level === 3 ? 3 : 2;
      const label = level === 3 ? "Subsection title" : "Section title";
      return { text: `${"#".repeat(level)} ${label}`, select: [level + 1, level + 1 + label.length] };
    }
    const body = block.id === "proof" ? "Write the proof here." : `Write the ${block.id} here.`;
    const text = `${block.marker} ${block.id} "${block.title}"\n    ${body}`;
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
      button.setAttribute("aria-label", block.label);
      button.innerHTML = `<span class="mn-typora-menu__icon${block.symbol ? " mn-typora-menu__icon--text" : ""}" aria-hidden="true">${escapeHtml(block.symbol || "")}</span><span class="mn-typora-menu__label">${escapeHtml(block.label)}</span>`;
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

  function handleDisplayMathEnter(state) {
    const selection = state.view.state.selection.main;
    if (!selection.empty) return false;
    const doc = state.view.state.doc;
    const line = doc.lineAt(selection.head);
    const match = /^([ \t]*)\$\$[ \t]*$/.exec(line.text);
    if (!match || selection.head < line.to) return false;
    const previousDelimiters = (doc.sliceString(0, line.from).match(/^[ \t]*\$\$[ \t]*$/gm) || []).length;
    if (previousDelimiters % 2 === 1) return false;
    const indentation = match[1];
    const insertion = `\n${indentation}\n${indentation}$$`;
    state.view.dispatch({
      changes: { from: selection.head, insert: insertion },
      selection: { anchor: selection.head + 1 + indentation.length },
      scrollIntoView: true,
      userEvent: "input"
    });
    return true;
  }

  function handleInlineMathVertical(state, forward) {
    const selection = state.view.state.selection.main;
    if (!selection.empty) return false;
    const activeMath = (state.mathRanges || []).find(range => !range.display &&
      selection.head >= range.from && selection.head <= range.to);
    const coordinates = state.view.coordsAtPos(selection.head, forward ? 1 : -1);
    if (!coordinates) return false;
    const y = forward
      ? coordinates.bottom + state.view.defaultLineHeight * 0.55
      : coordinates.top - state.view.defaultLineHeight * 0.55;
    const target = document.elementFromPoint(coordinates.left, y);
    const targetMath = target?.closest?.(".mn-cm-math--inline[data-mn-edit-point]");
    if (!activeMath && !targetMath) return false;
    let position;
    if (targetMath) {
      const contentFrom = Number(targetMath.dataset.mnEditPoint);
      const contentTo = Number(targetMath.dataset.mnSourceTo) - 1;
      const rect = targetMath.getBoundingClientRect();
      const ratio = rect.width > 0 ? Math.max(0, Math.min(1, (coordinates.left - rect.left) / rect.width)) : 0;
      position = Math.round(contentFrom + (contentTo - contentFrom) * ratio);
    } else {
      position = state.view.posAtCoords({ x: coordinates.left, y }, false);
    }
    if (!Number.isInteger(position) || position === selection.head) return false;
    state.view.dispatch({ selection: { anchor: position }, scrollIntoView: true, userEvent: "select" });
    return true;
  }

  function handleBlockListTab(state, backwards) {
    const selection = state.view.state.selection.main;
    if (!selection.empty) return false;
    const doc = state.view.state.doc;
    const line = doc.lineAt(selection.head);
    const parsed = state.modules.parseAdmonitions(doc.toString(), KIND_LABELS);
    const lineIndex = line.number - 1;
    const block = parsed.blocks.find(candidate => lineIndex > candidate.startLine && lineIndex <= candidate.endLine);
    if (!block) return false;
    const base = line.text.startsWith("    ") ? "    " : line.text.startsWith("\t") ? "\t" : "";
    if (!base || selection.head < line.from + base.length) return false;
    const item = /^(\s*)(?:[-+*]|\d+[.)])\s+/.exec(line.text.slice(base.length));
    if (!item) return false;
    // The block's four-space indent is structural, not a list nesting level.
    if (backwards && !item[1]) return true;
    return state.modules.indentWriting(state.view, backwards);
  }

  function setStatus(state, message, kind) {
    if (!state?.status) return;
    state.status.textContent = message;
    state.status.dataset.kind = kind || "";
  }

  function toolbarMarkup(payload) {
    return `
      <div class="mn-typora-toolbar__identity" title="${escapeHtml(payload.sourcePath)}">
        <span class="mn-typora-toolbar__dot" aria-hidden="true"></span>
        <div><strong>编辑本页</strong><small class="mn-typora-status" role="status">正在载入编辑器…</small></div>
      </div>
      <div class="mn-typora-toolbar__tools" role="group" aria-label="编辑工具">
        <button type="button" class="mn-typora-button mn-typora-button--add" data-action="section">＋ Section</button>
        <button type="button" class="mn-typora-button" data-action="subsection">＋ Subsection</button>
        <button type="button" class="mn-typora-button" data-action="add">＋ 内容块</button>
      </div>
      <details class="mn-typora-more">
        <summary class="mn-typora-button">更多</summary>
        <div class="mn-typora-more__menu">
        <button type="button" class="mn-typora-button" data-action="source">源码</button>
        <button type="button" class="mn-typora-button" data-action="bold">加粗 · ⌘/Ctrl B</button>
        <button type="button" class="mn-typora-button" data-action="italic">斜体 · ⌘/Ctrl I</button>
        <button type="button" class="mn-typora-button" data-action="math">行内公式 · ⌘/Ctrl ⇧M</button>
        <button type="button" class="mn-typora-button" data-action="export">导出</button>
        </div>
      </details>
      <div class="mn-typora-toolbar__session" role="group" aria-label="保存与退出">
        <button type="button" class="mn-typora-button mn-typora-button--cancel" data-action="cancel" title="放弃上次保存后的修改并退出">取消</button>
        <button type="button" class="mn-typora-button mn-typora-button--save" data-action="save">保存</button>
        <button type="button" class="mn-typora-button mn-typora-button--done" data-action="done">完成</button>
      </div>`;
  }

  function closeStructureDialog(state) {
    if (!state?.structureDialog) return;
    state.structureDialog.hidden = true;
    state.view.focus();
  }

  function ensureStructureDialog(state) {
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
    return state.structureDialog;
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
    const dialog = ensureStructureDialog(state);
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

  function cloneOutline(outline) {
    return JSON.parse(JSON.stringify(outline || []));
  }

  function organizerPageLocations(outline) {
    const locations = [];
    const visit = (items, parentChapter = null, part = null) => {
      items.forEach((item, index) => {
        if (item.type === "part") visit(item.children || [], null, item);
        else {
          locations.push({ item, items, index, parentChapter, part });
          (item.children || []).forEach((child, childIndex) => {
            locations.push({ item: child, items: item.children, index: childIndex, parentChapter: item, part });
          });
        }
      });
    };
    visit(outline);
    return locations;
  }

  function organizerLocation(outline, path) {
    return organizerPageLocations(outline).find((location) => location.item.path === path);
  }

  function closeOrganizer(suppressReload = false) {
    if (!activeOrganizer) return;
    const focusTarget = activeOrganizer.focusTarget;
    activeOrganizer.shell.remove();
    activeOrganizer = null;
    document.body.classList.remove("mn-organizer-open");
    const needsReload = deferredReload && !suppressReload;
    deferredReload = false;
    if (needsReload) {
      location.reload();
      return;
    }
    focusTarget?.focus?.();
  }

  function organizerShell(payload) {
    closeOrganizer();
    const shell = document.createElement("div");
    shell.className = "mn-organizer mn-structure-dialog";
    shell.innerHTML = `
      <div class="mn-structure-dialog__backdrop" data-organizer-close></div>
      <section class="mn-structure-dialog__panel mn-organizer__panel" role="dialog" aria-modal="true" aria-labelledby="mn-organizer-title">
        <button type="button" class="mn-structure-dialog__close" data-organizer-close aria-label="关闭">×</button>
        <div class="mn-organizer__loading">正在读取目录…</div>
      </section>`;
    document.body.appendChild(shell);
    document.body.classList.add("mn-organizer-open");
    const state = { payload, shell, focusTarget: document.activeElement, status: null };
    activeOrganizer = state;
    shell.addEventListener("click", (event) => {
      if (event.target.closest("[data-organizer-close]")) closeOrganizer();
    });
    return state;
  }

  function organizerError(state, message) {
    const error = state.shell.querySelector(".mn-organizer__error");
    if (!error) return;
    error.textContent = message;
    error.hidden = !message;
  }

  function pageRowMarkup(item, location) {
    const isSubchapter = Boolean(location.parentChapter);
    return `
      <div class="mn-outline-row mn-outline-row--${isSubchapter ? "subchapter" : "chapter"}" data-page-path="${escapeHtml(item.path)}">
        <span class="mn-outline-row__kind">${isSubchapter ? "Subchapter" : "Chapter"}</span>
        <strong>${escapeHtml(item.title)}</strong>
        ${item.children?.length ? `<span class="mn-outline-row__count">${item.children.length}</span>` : ""}
        <div class="mn-outline-row__actions">
          <button type="button" data-outline-action="up" title="上移" ${location.index === 0 ? "disabled" : ""}>↑</button>
          <button type="button" data-outline-action="down" title="下移" ${location.index === location.items.length - 1 ? "disabled" : ""}>↓</button>
          <button type="button" data-outline-action="move" title="调整层级或所属 Part">移动</button>
          <button type="button" data-outline-action="rename" title="重命名">改名</button>
          <button type="button" data-outline-action="delete" title="删除">删除</button>
        </div>
      </div>`;
  }

  function outlineMarkup(outline) {
    if (!outline.length) return '<div class="mn-organizer__empty">这门课程还没有 Chapter。</div>';
    return outline.map((item, index) => {
      if (item.type !== "part") {
        const location = { items: outline, index, parentChapter: null, part: null };
        return `<div class="mn-outline-chapter">${pageRowMarkup(item, location)}${(item.children || []).map((child, childIndex) =>
          pageRowMarkup(child, { items: item.children, index: childIndex, parentChapter: item, part: null })).join("")}</div>`;
      }
      return `
        <section class="mn-outline-part" data-part-index="${index}">
          <header class="mn-outline-part__header">
            <span>Part</span><strong>${escapeHtml(item.title)}</strong>
            <div class="mn-outline-row__actions">
              <button type="button" data-part-action="up" title="上移" ${index === 0 ? "disabled" : ""}>↑</button>
              <button type="button" data-part-action="down" title="下移" ${index === outline.length - 1 ? "disabled" : ""}>↓</button>
              <button type="button" data-part-action="rename">改名</button>
              <button type="button" data-part-action="delete" ${item.children?.length ? "disabled title=\"请先移出其中的 Chapter\"" : ""}>删除</button>
            </div>
          </header>
          <div class="mn-outline-part__children">${(item.children || []).map((chapter, chapterIndex) => `
            <div class="mn-outline-chapter">${pageRowMarkup(chapter, { items: item.children, index: chapterIndex, parentChapter: null, part: item })}${(chapter.children || []).map((child, childIndex) =>
              pageRowMarkup(child, { items: chapter.children, index: childIndex, parentChapter: chapter, part: item })).join("")}</div>`).join("") || '<span class="mn-outline-part__empty">暂无 Chapter</span>'}</div>
        </section>`;
    }).join("");
  }

  function organizerForm(state, mode, target = null) {
    const inspector = state.shell.querySelector(".mn-organizer__inspector");
    const parts = state.outline.filter((item) => item.type === "part");
    const chapters = organizerPageLocations(state.outline).filter((location) => !location.parentChapter);
    let title = "";
    let fields = "";
    let submit = "完成";
    if (mode === "part") {
      title = "新建 Part"; submit = "创建 Part";
      fields = '<label><span>Part 名称</span><input name="title" required maxlength="80" autocomplete="off" placeholder="例如：FAA III"></label>';
    } else if (mode === "chapter" || mode === "subchapter") {
      const isSubchapter = mode === "subchapter";
      title = `新建 ${isSubchapter ? "Subchapter" : "Chapter"}`;
      submit = `创建 ${isSubchapter ? "Subchapter" : "Chapter"}`;
      fields = `
        <label><span>页面标题</span><input name="title" required maxlength="100" autocomplete="off" placeholder="例如：Set Theory"></label>
        <label><span>页面文件名</span><input name="slug" required maxlength="64" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" autocomplete="off" spellcheck="false" placeholder="set-theory"><small>使用小写英文字母、数字和短横线</small></label>
        ${isSubchapter ? `<label><span>所属 Chapter</span><select name="parentPath" required>${chapters.map(({ item }) => `<option value="${escapeHtml(item.path)}">${escapeHtml(item.title)}</option>`).join("")}</select></label>` :
          `<label><span>所属 Part</span><select name="partTitle"><option value="">不放入 Part</option>${parts.map((part) => `<option value="${escapeHtml(part.title)}">${escapeHtml(part.title)}</option>`).join("")}</select></label>`}
        <label><span>页面简介</span><textarea name="description" maxlength="240" rows="3" placeholder="一句话概括内容（可选）"></textarea></label>`;
    } else if (mode === "rename-part") {
      title = "重命名 Part"; submit = "保存名称";
      fields = `<label><span>Part 名称</span><input name="title" required maxlength="80" autocomplete="off" value="${escapeHtml(target.title)}"></label>`;
    } else if (mode === "rename-page") {
      title = `重命名 ${target.type === "subchapter" ? "Subchapter" : "Chapter"}`; submit = "保存名称";
      fields = `<label><span>页面标题</span><input name="title" required maxlength="100" autocomplete="off" value="${escapeHtml(target.title)}"><small>页面地址保持不变</small></label>`;
    } else if (mode === "move-page") {
      title = `移动 ${target.title}`; submit = "应用位置";
      const otherChapters = chapters.filter(({ item }) => item.path !== target.path);
      fields = `
        <label><span>层级</span><select name="kind"><option value="chapter" ${target.type !== "subchapter" ? "selected" : ""}>Chapter</option><option value="subchapter" ${target.type === "subchapter" ? "selected" : ""}>Subchapter</option></select></label>
        <label data-move-chapter><span>所属 Part</span><select name="partTitle"><option value="">不放入 Part</option>${parts.map((part) => `<option value="${escapeHtml(part.title)}">${escapeHtml(part.title)}</option>`).join("")}</select></label>
        <label data-move-subchapter><span>所属 Chapter</span><select name="parentPath">${otherChapters.map(({ item }) => `<option value="${escapeHtml(item.path)}">${escapeHtml(item.title)}</option>`).join("")}</select></label>`;
    } else if (mode === "delete-page") {
      title = `删除 ${target.title}`; submit = "移到回收目录";
      fields = `<div class="mn-structure-warning"><strong>${escapeHtml(target.title)}</strong><span>页面源文件会移到项目内的回收目录。</span></div><label><span>输入页面名称确认</span><input name="confirmation" required autocomplete="off"></label>`;
    }
    inspector.innerHTML = `
      <div class="mn-organizer__inspector-head"><strong>${escapeHtml(title)}</strong><button type="button" data-inspector-close aria-label="关闭">×</button></div>
      <form class="mn-structure-form" data-organizer-form="${mode}">${fields}
        <div class="mn-structure-form__error" role="alert" hidden></div>
        <div class="mn-structure-form__actions"><button type="button" class="mn-structure-cancel" data-inspector-close>取消</button><button type="submit" class="mn-structure-submit">${submit}</button></div>
      </form>`;
    inspector.hidden = false;
    const form = inspector.querySelector("form");
    const firstInput = form.querySelector("input, select");
    if (mode === "chapter" || mode === "subchapter") {
      const titleInput = form.elements.title, slugInput = form.elements.slug;
      let slugEdited = false;
      slugInput.addEventListener("input", () => { slugEdited = true; });
      titleInput.addEventListener("input", () => { if (!slugEdited) slugInput.value = suggestedSlug(titleInput.value); });
    }
    if (mode === "move-page") {
      const refresh = () => {
        form.querySelector("[data-move-chapter]").hidden = form.elements.kind.value !== "chapter";
        form.querySelector("[data-move-subchapter]").hidden = form.elements.kind.value !== "subchapter";
      };
      form.elements.kind.addEventListener("change", refresh);
      refresh();
    }
    form.addEventListener("submit", (event) => submitOrganizerForm(event, state, mode, target));
    requestAnimationFrame(() => firstInput?.focus());
  }

  function moveOrganizerPage(state, target, values) {
    const source = organizerLocation(state.outline, target.path);
    if (!source) return;
    target.children = target.children || [];
    if (values.kind === "subchapter") {
      if (target.children.length) throw new Error("含有 Subchapter 的 Chapter 不能再降一级。");
      const parent = organizerLocation(state.outline, values.parentPath)?.item;
      if (!parent || parent.type === "subchapter") throw new Error("请选择所属 Chapter。");
      source.items.splice(source.index, 1);
      target.type = "subchapter";
      parent.children = parent.children || [];
      parent.children.push(target);
    } else {
      source.items.splice(source.index, 1);
      target.type = "chapter";
      const part = state.outline.find((item) => item.type === "part" && item.title === values.partTitle);
      (part ? part.children : state.outline).push(target);
    }
    state.dirty = true;
  }

  async function submitOrganizerForm(event, state, mode, target) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector("[type=submit]");
    const error = form.querySelector(".mn-structure-form__error");
    const values = Object.fromEntries(new FormData(form));
    submit.disabled = true;
    error.hidden = true;
    try {
      if (mode === "rename-part") {
        target.title = values.title.trim();
        state.dirty = true;
      } else if (mode === "move-page") {
        moveOrganizerPage(state, target, values);
      } else if (mode === "rename-page") {
        const result = await manageRequest(state.payload, {
          action: "renamePage", course: state.course.slug, path: target.path,
          title: values.title, baseRevision: state.revision
        });
        target.title = result.title;
        const fresh = await manageRequest(state.payload, { action: "status" });
        state.revision = fresh.structureRevision;
      } else if (mode === "delete-page") {
        if (target.children?.length) throw new Error("请先移动或删除它下面的 Subchapter。");
        await manageRequest(state.payload, {
          action: "deletePage", course: state.course.slug, path: target.path,
          confirmation: values.confirmation, baseRevision: state.revision
        });
        const location = organizerLocation(state.outline, target.path);
        location?.items.splice(location.index, 1);
        const fresh = await manageRequest(state.payload, { action: "status" });
        state.revision = fresh.structureRevision;
      } else {
        const action = mode === "part" ? "createPart" : "createPage";
        const result = await manageRequest(state.payload, {
          action, course: state.course.slug, kind: mode, baseRevision: state.revision, ...values
        });
        state.outline = cloneOutline(result.outline);
        state.revision = result.structureRevision;
      }
      state.shell.querySelector(".mn-organizer__inspector").hidden = true;
      renderCourseOrganizer(state);
    } catch (requestError) {
      error.textContent = requestError.message || "操作失败，请稍后重试。";
      error.hidden = false;
      submit.disabled = false;
    }
  }

  function renderCourseOrganizer(state) {
    const panel = state.shell.querySelector(".mn-organizer__panel");
    panel.innerHTML = `
      <button type="button" class="mn-structure-dialog__close" data-organizer-close aria-label="关闭">×</button>
      <header class="mn-organizer__header"><div><span class="mn-structure-dialog__eyebrow">课程目录</span><h2 id="mn-organizer-title">${escapeHtml(state.course.title)}</h2></div><kbd>⌘⌥O / Ctrl Alt O</kbd></header>
      <div class="mn-organizer__toolbar"><button type="button" data-organizer-new="part">＋ Part</button><button type="button" data-organizer-new="chapter">＋ Chapter</button><button type="button" data-organizer-new="subchapter" ${organizerPageLocations(state.outline).some((location) => !location.parentChapter) ? "" : "disabled"}>＋ Subchapter</button></div>
      <div class="mn-organizer__error" role="alert" hidden></div>
      <div class="mn-organizer__workspace"><main class="mn-organizer__outline">${outlineMarkup(state.outline)}</main><aside class="mn-organizer__inspector" hidden></aside></div>
      <footer class="mn-organizer__footer"><span>${state.dirty ? "目录顺序或层级尚未保存" : "Part 不可点击；Chapter 和 Subchapter 都是独立页面"}</span><button type="button" class="mn-structure-submit" data-organizer-save ${state.dirty ? "" : "disabled"}>保存目录</button></footer>`;
    panel.querySelector(".mn-organizer__toolbar").addEventListener("click", (event) => {
      const mode = event.target.closest("[data-organizer-new]")?.dataset.organizerNew;
      if (mode) organizerForm(state, mode);
    });
    panel.querySelector(".mn-organizer__outline").addEventListener("click", (event) => handleOutlineAction(event, state));
    panel.querySelector("[data-organizer-save]").addEventListener("click", () => saveOrganizerOutline(state));
    panel.querySelector(".mn-organizer__workspace").addEventListener("click", (event) => {
      if (event.target.closest("[data-inspector-close]")) panel.querySelector(".mn-organizer__inspector").hidden = true;
    });
  }

  function handleOutlineAction(event, state) {
    const pageButton = event.target.closest("[data-outline-action]");
    const partButton = event.target.closest("[data-part-action]");
    if (pageButton) {
      const path = pageButton.closest("[data-page-path]").dataset.pagePath;
      const location = organizerLocation(state.outline, path);
      if (!location) return;
      const action = pageButton.dataset.outlineAction;
      if (action === "up" || action === "down") {
        const next = location.index + (action === "up" ? -1 : 1);
        if (next < 0 || next >= location.items.length) return;
        [location.items[location.index], location.items[next]] = [location.items[next], location.items[location.index]];
        state.dirty = true;
        renderCourseOrganizer(state);
      } else if (action === "move") organizerForm(state, "move-page", location.item);
      else if (action === "rename") organizerForm(state, "rename-page", location.item);
      else if (action === "delete") organizerForm(state, "delete-page", location.item);
    } else if (partButton) {
      const index = Number(partButton.closest("[data-part-index]").dataset.partIndex);
      const part = state.outline[index];
      const action = partButton.dataset.partAction;
      if (action === "up" || action === "down") {
        const next = index + (action === "up" ? -1 : 1);
        if (next < 0 || next >= state.outline.length) return;
        [state.outline[index], state.outline[next]] = [state.outline[next], state.outline[index]];
        state.dirty = true;
        renderCourseOrganizer(state);
      } else if (action === "rename") organizerForm(state, "rename-part", part);
      else if (action === "delete" && !part.children?.length) {
        state.outline.splice(index, 1);
        state.dirty = true;
        renderCourseOrganizer(state);
      }
    }
  }

  async function saveOrganizerOutline(state) {
    const button = state.shell.querySelector("[data-organizer-save]");
    button.disabled = true;
    organizerError(state, "");
    try {
      const result = await manageRequest(state.payload, {
        action: "saveCourseOutline", course: state.course.slug,
        outline: state.outline, baseRevision: state.revision
      });
      state.outline = cloneOutline(result.outline);
      state.revision = result.structureRevision;
      state.dirty = false;
      renderCourseOrganizer(state);
    } catch (requestError) {
      organizerError(state, requestError.message);
      button.disabled = false;
    }
  }

  function siteOrganizerForm(state, mode, course = null) {
    const inspector = state.shell.querySelector(".mn-organizer__inspector");
    const isNew = mode === "new-course";
    const isRename = mode === "rename-course";
    const title = isNew ? "新建课程" : isRename ? "重命名课程" : "删除课程";
    let fields;
    if (isNew) {
      fields = `
        <label><span>课程名称</span><input name="title" required maxlength="80" autocomplete="off" placeholder="例如：复分析"></label>
        <label><span>课程目录名</span><input name="slug" required maxlength="64" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" autocomplete="off" spellcheck="false" placeholder="complex-analysis"><small>使用小写英文字母、数字和短横线</small></label>
        <label><span>主页简介</span><textarea name="description" maxlength="240" rows="3" placeholder="一句话概括内容（可选）"></textarea></label>`;
    } else if (isRename) {
      fields = `<label><span>课程名称</span><input name="title" required maxlength="80" autocomplete="off" value="${escapeHtml(course.title)}"><small>课程地址保持不变</small></label>`;
    } else {
      fields = `<div class="mn-structure-warning"><strong>${escapeHtml(course.title)}</strong><span>整门课程会从主页和导航移除，源文件会移到项目内的回收目录。</span></div><label><span>输入课程名称确认</span><input name="confirmation" required autocomplete="off"></label>`;
    }
    inspector.innerHTML = `
      <div class="mn-organizer__inspector-head"><strong>${title}</strong><button type="button" data-inspector-close aria-label="关闭">×</button></div>
      <form class="mn-structure-form">${fields}<div class="mn-structure-form__error" role="alert" hidden></div><div class="mn-structure-form__actions"><button type="button" class="mn-structure-cancel" data-inspector-close>取消</button><button type="submit" class="mn-structure-submit${mode === "delete-course" ? " mn-structure-submit--danger" : ""}">${isNew ? "创建课程" : isRename ? "保存名称" : "移到回收目录"}</button></div></form>`;
    inspector.hidden = false;
    const form = inspector.querySelector("form");
    if (isNew) {
      const titleInput = form.elements.title, slugInput = form.elements.slug;
      let slugEdited = false;
      slugInput.addEventListener("input", () => { slugEdited = true; });
      titleInput.addEventListener("input", () => { if (!slugEdited) slugInput.value = suggestedSlug(titleInput.value); });
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("[type=submit]");
      const error = form.querySelector(".mn-structure-form__error");
      const values = Object.fromEntries(new FormData(form));
      submit.disabled = true;
      error.hidden = true;
      try {
        const action = isNew ? "createCourse" : isRename ? "renameCourse" : "deleteCourse";
        const result = await manageRequest(state.payload, {
          action, course: course?.slug, path: course ? `${course.slug}/index.md` : undefined,
          baseRevision: state.revision, ...values
        });
        if (isNew) {
          queueNavigation(result.url);
          closeOrganizer(true);
          return;
        }
        const fresh = await manageRequest(state.payload, { action: "status" });
        state.courses = fresh.courses;
        state.revision = fresh.structureRevision;
        state.dirty = false;
        renderSiteOrganizer(state);
      } catch (requestError) {
        error.textContent = requestError.message || "操作失败，请稍后重试。";
        error.hidden = false;
        submit.disabled = false;
      }
    });
    requestAnimationFrame(() => form.querySelector("input")?.focus());
  }

  function renderSiteOrganizer(state) {
    const panel = state.shell.querySelector(".mn-organizer__panel");
    panel.innerHTML = `
      <button type="button" class="mn-structure-dialog__close" data-organizer-close aria-label="关闭">×</button>
      <header class="mn-organizer__header"><div><span class="mn-structure-dialog__eyebrow">网站结构</span><h2 id="mn-organizer-title">管理课程</h2></div><kbd>⌘⌥O / Ctrl Alt O</kbd></header>
      <div class="mn-organizer__toolbar"><button type="button" data-site-action="new-course">＋ 课程</button></div>
      <div class="mn-organizer__error" role="alert" hidden></div>
      <div class="mn-organizer__workspace"><main class="mn-organizer__outline mn-course-manager">${state.courses.map((course, index) => `
        <div class="mn-outline-row" data-course-slug="${escapeHtml(course.slug)}">
          <span class="mn-outline-row__kind">Course</span><strong>${escapeHtml(course.title)}</strong><span class="mn-outline-row__count">${course.pageCount || 0}</span>
          <div class="mn-outline-row__actions"><button type="button" data-course-action="up" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-course-action="down" ${index === state.courses.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-course-action="rename">改名</button><button type="button" data-course-action="delete">删除</button></div>
        </div>`).join("")}</main><aside class="mn-organizer__inspector" hidden></aside></div>
      <footer class="mn-organizer__footer"><span>${state.dirty ? "课程顺序尚未保存" : "课程管理只放在网站首页"}</span><button type="button" class="mn-structure-submit" data-site-save ${state.dirty ? "" : "disabled"}>保存顺序</button></footer>`;
    panel.querySelector("[data-site-action=new-course]").addEventListener("click", () => siteOrganizerForm(state, "new-course"));
    panel.querySelector(".mn-course-manager").addEventListener("click", (event) => {
      const button = event.target.closest("[data-course-action]");
      if (!button) return;
      const slug = button.closest("[data-course-slug]").dataset.courseSlug;
      const index = state.courses.findIndex((course) => course.slug === slug);
      const course = state.courses[index];
      const action = button.dataset.courseAction;
      if (action === "up" || action === "down") {
        const next = index + (action === "up" ? -1 : 1);
        if (next < 0 || next >= state.courses.length) return;
        [state.courses[index], state.courses[next]] = [state.courses[next], state.courses[index]];
        state.dirty = true;
        renderSiteOrganizer(state);
      } else if (action === "rename") siteOrganizerForm(state, "rename-course", course);
      else if (action === "delete") siteOrganizerForm(state, "delete-course", course);
    });
    panel.querySelector("[data-site-save]").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      button.disabled = true;
      organizerError(state, "");
      try {
        await manageRequest(state.payload, {
          action: "reorderCourses", order: state.courses.map((course) => course.slug),
          baseRevision: state.revision
        });
        const fresh = await manageRequest(state.payload, { action: "status" });
        state.courses = fresh.courses;
        state.revision = fresh.structureRevision;
        state.dirty = false;
        renderSiteOrganizer(state);
      } catch (requestError) {
        organizerError(state, requestError.message);
        button.disabled = false;
      }
    });
    panel.querySelector(".mn-organizer__workspace").addEventListener("click", (event) => {
      if (event.target.closest("[data-inspector-close]")) panel.querySelector(".mn-organizer__inspector").hidden = true;
    });
  }

  async function openOrganizer(payload) {
    if (!payload?.manageEndpoint || !LOCAL_HOSTS.has(location.hostname)) return;
    const state = organizerShell(payload);
    try {
      const status = await manageRequest(payload, { action: "status" });
      if (activeOrganizer !== state) return;
      state.status = status;
      state.revision = status.structureRevision;
      state.course = status.courses.find((course) => course.slug === payload.courseSlug);
      if (!state.course) {
        state.courses = status.courses;
        state.dirty = false;
        renderSiteOrganizer(state);
        return;
      }
      state.outline = cloneOutline(state.course.outline);
      state.dirty = false;
      renderCourseOrganizer(state);
    } catch (error) {
      state.shell.querySelector(".mn-organizer__panel").innerHTML = `<button type="button" class="mn-structure-dialog__close" data-organizer-close aria-label="关闭">×</button><div class="mn-organizer__loading mn-organizer__loading--error">${escapeHtml(error.message)}</div>`;
    }
  }

  function currentCourse(state, courses = state.payload.courses || []) {
    return courses.find(course => course.slug === state.payload.courseSlug);
  }

  async function saveBeforeStructureChange(state) {
    if (!writeDraft(state)) return false;
    if (state.view.state.doc.toString() === state.savedSource) return true;
    const saved = await saveSource(state);
    return saved && state.view.state.doc.toString() === state.savedSource;
  }

  function clearCurrentEditorDraft(state) {
    clearTimeout(state.draftTimer);
    try { localStorage.removeItem(draftKey(state.payload.sourcePath)); } catch (_) {}
    try { sessionStorage.removeItem(RESUME_KEY); } catch (_) {}
  }

  async function openRenameDialog(state, kind) {
    if (!state.payload.manageEndpoint || !state.payload.courseSlug) return;
    const isCourse = kind === "course";
    const course = currentCourse(state);
    const oldTitle = isCourse ? course?.title : state.payload.pageTitle;
    if (!oldTitle) {
      setStatus(state, "没有读到当前名称，请刷新后重试", "error");
      return;
    }
    const dialog = ensureStructureDialog(state);
    dialog.innerHTML = `
      <div class="mn-structure-dialog__backdrop" data-structure-close></div>
      <section class="mn-structure-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="mn-structure-title">
        <button type="button" class="mn-structure-dialog__close" data-structure-close aria-label="关闭">×</button>
        <span class="mn-structure-dialog__eyebrow">站点管理</span>
        <h2 id="mn-structure-title">重命名${isCourse ? "课程" : "页面"}</h2>
        <p>${isCourse
          ? "新名称会同步到顶部导航、主页课程卡片和课程首页；网页地址保持不变。"
          : "新名称会同步到导航、课程目录和页面标题；网页地址保持不变。"}</p>
        <form class="mn-structure-form">
          <label>
            <span>${isCourse ? "课程名称" : "页面名称"}</span>
            <input name="title" required maxlength="${isCourse ? 80 : 100}" autocomplete="off" value="${escapeHtml(oldTitle)}">
            <small>地址和已有链接不会改变</small>
          </label>
          <div class="mn-structure-form__error" role="alert" hidden></div>
          <div class="mn-structure-form__actions">
            <button type="button" class="mn-structure-cancel" data-structure-close>取消</button>
            <button type="submit" class="mn-structure-submit">保存名称</button>
          </div>
        </form>
      </section>`;
    dialog.hidden = false;
    const form = dialog.querySelector("form");
    const input = form.elements.title;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector("[type=submit]");
      const error = form.querySelector(".mn-structure-form__error");
      submit.disabled = true;
      error.hidden = true;
      try {
        if (!await saveBeforeStructureChange(state)) throw new Error("请先解决当前页面的保存问题，再重命名。");
        const status = await manageRequest(state.payload, { action: "status" });
        const result = await manageRequest(state.payload, {
          action: isCourse ? "renameCourse" : "renamePage",
          course: state.payload.courseSlug,
          path: state.payload.sourcePath,
          title: input.value,
          baseRevision: status.structureRevision
        });
        clearCurrentEditorDraft(state);
        setStatus(state, "名称已同步，正在刷新页面…", "saved");
        queueNavigation(result.url, true);
      } catch (requestError) {
        error.textContent = requestError.message || "重命名失败，请稍后重试。";
        error.hidden = false;
        submit.disabled = false;
      }
    });
    requestAnimationFrame(() => { input.focus(); input.select(); });
  }

  async function openDeleteDialog(state, kind) {
    if (!state.payload.manageEndpoint || !state.payload.courseSlug) return;
    const isCourse = kind === "course";
    let status;
    try {
      status = await manageRequest(state.payload, { action: "status" });
    } catch (requestError) {
      setStatus(state, requestError.message, "error");
      return;
    }
    const course = currentCourse(state, status.courses);
    const expected = isCourse ? course?.title : state.payload.pageTitle;
    if (!expected) {
      setStatus(state, "没有读到要删除的名称，请刷新后重试", "error");
      return;
    }
    const dialog = ensureStructureDialog(state);
    const impact = isCourse
      ? `会从主页和导航移除整门课程，其中包含 ${course.pageCount || 0} 个页面。`
      : "会从课程目录和导航移除这个页面。";
    dialog.innerHTML = `
      <div class="mn-structure-dialog__backdrop" data-structure-close></div>
      <section class="mn-structure-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="mn-structure-title">
        <button type="button" class="mn-structure-dialog__close" data-structure-close aria-label="关闭">×</button>
        <span class="mn-structure-dialog__eyebrow mn-structure-dialog__eyebrow--danger">谨慎操作</span>
        <h2 id="mn-structure-title">删除${isCourse ? "课程" : "页面"}</h2>
        <div class="mn-structure-warning">
          <strong>${escapeHtml(expected)}</strong>
          <span>${impact}源文件会移到项目内的回收目录，不会立即永久删除。</span>
        </div>
        <form class="mn-structure-form">
          <label>
            <span>输入“${escapeHtml(expected)}”确认</span>
            <input name="confirmation" required maxlength="${isCourse ? 80 : 100}" autocomplete="off" spellcheck="false">
          </label>
          <div class="mn-structure-form__error" role="alert" hidden></div>
          <div class="mn-structure-form__actions">
            <button type="button" class="mn-structure-cancel" data-structure-close>取消</button>
            <button type="submit" class="mn-structure-submit mn-structure-submit--danger" disabled>移到回收目录</button>
          </div>
        </form>
      </section>`;
    dialog.hidden = false;
    const form = dialog.querySelector("form");
    const confirmation = form.elements.confirmation;
    const submit = form.querySelector("[type=submit]");
    confirmation.addEventListener("input", () => { submit.disabled = confirmation.value !== expected; });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (confirmation.value !== expected) return;
      const error = form.querySelector(".mn-structure-form__error");
      submit.disabled = true;
      error.hidden = true;
      try {
        if (!await saveBeforeStructureChange(state)) throw new Error("请先解决当前页面的保存问题，再删除。");
        const fresh = await manageRequest(state.payload, { action: "status" });
        const result = await manageRequest(state.payload, {
          action: isCourse ? "deleteCourse" : "deletePage",
          course: state.payload.courseSlug,
          path: state.payload.sourcePath,
          confirmation: confirmation.value,
          baseRevision: fresh.structureRevision
        });
        clearCurrentEditorDraft(state);
        setStatus(state, "已移到回收目录，正在返回…", "saved");
        queueNavigation(result.url);
      } catch (requestError) {
        error.textContent = requestError.message || "删除失败，请稍后重试。";
        error.hidden = false;
        submit.disabled = confirmation.value !== expected;
      }
    });
    requestAnimationFrame(() => confirmation.focus());
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

  function probeRangeRect(element, probe) {
    const target = normalizeAnchorText(probe);
    if (!target) return null;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent?.closest(".katex-mathml, script, style")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    let normalized = "";
    const positions = [];
    let previousWasSpace = false;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const value = node.nodeValue || "";
      for (let offset = 0; offset < value.length; offset += 1) {
        const character = value[offset];
        if (/\s/.test(character)) {
          if (previousWasSpace || !normalized) continue;
          normalized += " ";
          positions.push({ node, offset });
          previousWasSpace = true;
        } else {
          normalized += character;
          positions.push({ node, offset });
          previousWasSpace = false;
        }
      }
    }
    const index = normalized.indexOf(target);
    if (index < 0 || !positions[index] || !positions[index + target.length - 1]) return null;
    const range = document.createRange();
    range.setStart(positions[index].node, positions[index].offset);
    const end = positions[index + target.length - 1];
    range.setEnd(end.node, Math.min((end.node.nodeValue || "").length, end.offset + 1));
    const rectangles = Array.from(range.getClientRects());
    return rectangles[Math.floor((rectangles.length - 1) / 2)] || range.getBoundingClientRect();
  }

  function renderedAnchorCandidates(article) {
    return Array.from(article.querySelectorAll(
      "h1, h2, h3, h4, p, li, pre, table, summary, .admonition-title"
    )).filter(element => {
      const rectangle = element.getBoundingClientRect();
      return rectangle.height > 0 && rectangle.width > 0;
    });
  }

  function renderedPlainText(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent?.closest(".katex, .arithmatex, .headerlink, .mn-cm-diagram__controls, script, style")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    let text = "";
    for (let node = walker.nextNode(); node; node = walker.nextNode()) text += ` ${node.nodeValue || ""}`;
    element.querySelectorAll?.("img[alt]").forEach(image => { text += ` ${image.alt}`; });
    return normalizeAnchorText(text);
  }

  function captureRenderedAnchor(payload, article) {
    if (!payload || !article) return null;
    const viewportY = Math.max(96, Math.min(window.innerHeight - 72, window.innerHeight / 2));
    const candidates = renderedAnchorCandidates(article);
    if (!candidates.length) return null;
    let blockIndex = -1;
    let bestDistance = Infinity;
    candidates.forEach((element, index) => {
      if (renderedPlainText(element).length < 8) return;
      const rectangle = element.getBoundingClientRect();
      const distance = rectangle.top <= viewportY && rectangle.bottom >= viewportY
        ? 0
        : Math.min(Math.abs(rectangle.top - viewportY), Math.abs(rectangle.bottom - viewportY));
      if (distance < bestDistance || (distance === 0 && rectangle.height < candidates[blockIndex]?.getBoundingClientRect().height)) {
        bestDistance = distance;
        blockIndex = index;
      }
    });
    if (blockIndex < 0) blockIndex = 0;
    const block = candidates[blockIndex];
    const blockRectangle = block.getBoundingClientRect();
    const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4"));
    let heading = null, nextHeading = null;
    headings.forEach((candidate, index) => {
      if (candidate.getBoundingClientRect().top <= viewportY) {
        heading = candidate;
        nextHeading = headings[index + 1] || null;
      }
    });
    const sectionTop = heading ? window.scrollY + heading.getBoundingClientRect().top : window.scrollY + article.getBoundingClientRect().top;
    const sectionBottom = nextHeading
      ? window.scrollY + nextHeading.getBoundingClientRect().top
      : window.scrollY + article.getBoundingClientRect().bottom;
    const documentY = window.scrollY + viewportY;
    const plainText = renderedPlainText(block);
    return {
      kind: "reading",
      sourcePath: payload.sourcePath,
      viewportY,
      probe: plainText.length >= 8 ? plainText.slice(0, 96) : "",
      blockIndex,
      blockTag: block.tagName,
      blockProgress: blockRectangle.height
        ? Math.max(0, Math.min(1, (viewportY - blockRectangle.top) / blockRectangle.height))
        : 0.5,
      headingTitle: heading ? normalizeAnchorText((heading.textContent || "").replace(/¶/g, "")) : "",
      headingLevel: heading ? Number(heading.tagName.slice(1)) : 0,
      sectionProgress: sectionBottom > sectionTop
        ? Math.max(0, Math.min(1, (documentY - sectionTop) / (sectionBottom - sectionTop)))
        : 0,
      updatedAt: Date.now()
    };
  }

  function renderedAnchorDocumentY(article, anchor) {
    if (Number.isInteger(anchor.blockIndex)) {
      const candidates = renderedAnchorCandidates(article);
      const block = candidates[anchor.blockIndex];
      if (block && (!anchor.blockTag || block.tagName === anchor.blockTag)) {
        const rectangle = block.getBoundingClientRect();
        return window.scrollY + rectangle.top +
          Math.max(0, Math.min(1, Number(anchor.blockProgress) || 0)) * rectangle.height;
      }
    }
    if (anchor.probe) {
      const candidates = Array.from(article.querySelectorAll("h1, h2, h3, h4, p, li, summary, .admonition-title"));
      const normalizedProbe = normalizeAnchorText(anchor.probe);
      const element = candidates.find(candidate => renderedPlainText(candidate).includes(normalizedProbe));
      if (element) {
        const probeRectangle = probeRangeRect(element, normalizedProbe);
        const rectangle = probeRectangle || element.getBoundingClientRect();
        const progress = probeRectangle ? 0.5 : Math.max(0, Math.min(1, Number(anchor.blockProgress) || 0.5));
        return window.scrollY + rectangle.top + rectangle.height * progress;
      }
    }

    if (anchor.headingTitle) {
      const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4"));
      const headingIndex = headings.findIndex(heading =>
        Number(heading.tagName.slice(1)) === Number(anchor.headingLevel) &&
        normalizeAnchorText((heading.textContent || "").replace(/¶/g, "")) === normalizeAnchorText(anchor.headingTitle));
      if (headingIndex >= 0) {
        const sectionTop = window.scrollY + headings[headingIndex].getBoundingClientRect().top;
        const sectionBottom = headingIndex + 1 < headings.length
          ? window.scrollY + headings[headingIndex + 1].getBoundingClientRect().top
          : window.scrollY + article.getBoundingClientRect().bottom;
        return sectionTop + Math.max(0, Math.min(1, Number(anchor.sectionProgress) || 0)) *
          Math.max(0, sectionBottom - sectionTop);
      }
    }
    return null;
  }

  function restoreRenderedAnchor(payload, article, explicitAnchor = null) {
    const anchor = explicitAnchor || readExitAnchor(payload);
    if (!anchor || !article) return;
    try { sessionStorage.removeItem(EXIT_ANCHOR_KEY); } catch (_) {}
    const startedAt = performance.now();
    let cancelled = false;
    const cancel = () => { cancelled = true; };
    const cancelEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
    cancelEvents.forEach(type => window.addEventListener(type, cancel, { once: true, passive: true, capture: true }));
    const cleanup = () => cancelEvents.forEach(type => window.removeEventListener(type, cancel, { capture: true }));
    setTimeout(cleanup, 950);
    const restore = () => {
      if (cancelled) return cleanup();
      const documentY = renderedAnchorDocumentY(article, anchor);
      if (!Number.isFinite(documentY)) return;
      const desired = Math.max(0, documentY - anchor.viewportY);
      const difference = desired - window.scrollY;
      if (Math.abs(difference) > 0.75) window.scrollTo(0, desired);
      if (performance.now() - startedAt < 900) requestAnimationFrame(restore);
      else cleanup();
    };
    requestAnimationFrame(restore);
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) requestAnimationFrame(restore);
        })
        .catch(() => {});
    }
  }

  function teardownEditor(state, anchor) {
    sessionStorage.removeItem(RESUME_KEY);
    hideMenu(state);
    clearTimeout(state.draftTimer);
    clearTimeout(state.outlineTimer);
    state.destroyed = true;
    unmountMathPopover(state);
    state.view.destroy();
    state.outline?.remove();
    state.article.innerHTML = state.originalHtml;
    document.body.classList.remove("mn-typora-editing");
    activeEditor = null;
    const needsReload = deferredReload || state.savedSource !== state.payload.source;
    if (needsReload) {
      rememberExitAnchor(anchor);
      location.reload();
      return;
    }
    window.MathNotes?.renderMath?.(state.article);
    window.MathNotes?.numberBlocks?.(document.body);
    restoreRenderedAnchor(state.payload, state.article, anchor);
  }

  async function leaveEditor(state) {
    if (state.saving || state.leaving) return;
    let exitAnchor = captureEditorExitAnchor(state);
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
      exitAnchor = captureEditorExitAnchor(state);
    }
    teardownEditor(state, exitAnchor);
  }

  function cancelEditor(state) {
    if (state.saving || state.leaving) return;
    const exitAnchor = captureEditorExitAnchor(state, state.savedSource);
    state.pendingSource = null;
    clearCurrentEditorDraft(state);
    teardownEditor(state, exitAnchor);
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

  function updateOutlineActive(state) {
    if (!state.outline) return;
    const position = state.view.state.selection.main.head;
    let active = null;
    for (const heading of state.outlineHeadings || []) {
      if (heading.from > position) break;
      active = heading;
    }
    state.outline.querySelectorAll("[data-outline-position]").forEach(button => {
      const selected = active && Number(button.dataset.outlinePosition) === active.from;
      button.classList.toggle("is-active", Boolean(selected));
      if (selected) button.setAttribute("aria-current", "location");
      else button.removeAttribute("aria-current");
    });
  }

  function renderEditorOutline(state) {
    if (!state.outline || state.destroyed) return;
    const headings = state.modules.extractHeadings(state.view.state.doc.toString());
    const pageHeading = headings.find(heading => heading.level === 1);
    const pageTitle = pageHeading?.title || state.payload.sourcePath.split("/").pop().replace(/\.md$/, "");
    const courseTitle = (state.payload.courses || []).find(course => course.slug === state.payload.courseSlug)?.title || "主页";
    state.outlineHeadings = headings.filter(heading => heading.level > 1);
    state.outline.innerHTML = `
      <header class="mn-editor-outline__header">
        <span>${escapeHtml(courseTitle)}</span>
        <strong>${escapeHtml(pageTitle)}</strong>
      </header>
      <nav class="mn-editor-outline__nav" aria-label="当前页面目录">
        <span class="mn-editor-outline__label">本页目录</span>
        ${state.outlineHeadings.length ? state.outlineHeadings.map(heading => `
          <button type="button" class="mn-editor-outline__item mn-editor-outline__item--${heading.level}"
                  data-outline-position="${heading.from}">${escapeHtml(heading.title)}</button>`).join("")
          : '<span class="mn-editor-outline__empty">输入二级标题后会显示在这里</span>'}
      </nav>`;
    updateOutlineActive(state);
  }

  function mountEditorOutline(state) {
    const sidebar = document.querySelector(".md-sidebar--primary");
    if (!sidebar) return;
    const outline = document.createElement("section");
    outline.className = "mn-editor-outline";
    outline.addEventListener("click", event => {
      const button = event.target.closest("[data-outline-position]");
      if (!button) return;
      const heading = (state.outlineHeadings || []).find(item => item.from === Number(button.dataset.outlinePosition));
      if (!heading) return;
      state.cursorUsed = true;
      state.view.dispatch({ selection: { anchor: heading.contentFrom }, scrollIntoView: true });
      state.view.focus();
      updateOutlineActive(state);
    });
    sidebar.appendChild(outline);
    state.outline = outline;
    renderEditorOutline(state);
  }

  function hideMathPopover(state) {
    if (!state.mathPopover) return;
    state.mathPopover.hidden = true;
    state.activeMathRange = null;
    state.mathPopoverSignature = "";
  }

  function positionMathPopover(state, range) {
    const popover = state.mathPopover;
    if (!popover || popover.hidden || state.destroyed) return;
    const start = state.view.coordsAtPos(range.from, 1);
    const end = state.view.coordsAtPos(range.to, -1);
    if (!start || !end) return hideMathPopover(state);

    const margin = 8;
    const gap = 10;
    const anchorX = Math.abs(start.top - end.top) < 4 ? (start.left + end.right) / 2 : end.left;
    const anchorTop = Math.min(start.top, end.top);
    const anchorBottom = Math.max(start.bottom, end.bottom);
    const width = popover.offsetWidth;
    const height = popover.offsetHeight;
    const maxLeft = Math.max(margin, window.innerWidth - width - margin);
    const left = Math.min(maxLeft, Math.max(margin, anchorX - width / 2));
    const fitsBelow = anchorBottom + gap + height <= window.innerHeight - margin;
    const top = fitsBelow
      ? anchorBottom + gap
      : Math.max(margin, anchorTop - gap - height);
    popover.classList.toggle("is-above", !fitsBelow);
    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
    popover.style.setProperty("--mn-math-arrow-x", `${Math.max(10, Math.min(width - 10, anchorX - left))}px`);
  }

  function updateMathPopover(state) {
    if (!state.mathPopover || !state.view || state.destroyed || !state.visual || !state.view.hasFocus) {
      hideMathPopover(state);
      return;
    }
    const selection = state.view.state.selection.main;
    const range = (state.mathRanges || []).find(item => selection.empty
      ? selection.head >= item.from && selection.head <= item.to
      : selection.from < item.to && selection.to > item.from);
    if (!range || !range.tex.trim()) {
      hideMathPopover(state);
      return;
    }

    const signature = `${range.from}:${range.to}:${range.display ? 1 : 0}:${range.tex}`;
    if (signature !== state.mathPopoverSignature) {
      const content = state.mathPopover.firstElementChild;
      try {
        if (window.katex) window.katex.render(range.tex, content, { throwOnError: false, displayMode: range.display });
        else content.textContent = range.tex;
      } catch (_) {
        content.textContent = range.tex;
      }
      state.mathPopoverSignature = signature;
    }
    state.activeMathRange = range;
    state.mathPopover.hidden = false;
    positionMathPopover(state, range);
  }

  function scheduleMathPopover(state) {
    if (state.mathPopoverFrame != null) cancelAnimationFrame(state.mathPopoverFrame);
    state.mathPopoverFrame = requestAnimationFrame(() => {
      state.mathPopoverFrame = null;
      updateMathPopover(state);
    });
  }

  function mountMathPopover(state) {
    const popover = document.createElement("div");
    popover.className = "mn-cm-math-popover";
    popover.hidden = true;
    popover.setAttribute("role", "status");
    popover.setAttribute("aria-label", "公式实时预览");
    popover.innerHTML = '<div class="mn-cm-math-popover__content"></div>';
    document.body.appendChild(popover);
    state.mathPopover = popover;
    state.mathPopoverListener = () => scheduleMathPopover(state);
    window.addEventListener("resize", state.mathPopoverListener);
    window.addEventListener("scroll", state.mathPopoverListener, true);
    updateMathPopover(state);
  }

  function unmountMathPopover(state) {
    if (state.mathPopoverFrame != null) cancelAnimationFrame(state.mathPopoverFrame);
    if (state.mathPopoverListener) {
      window.removeEventListener("resize", state.mathPopoverListener);
      window.removeEventListener("scroll", state.mathPopoverListener, true);
    }
    state.mathPopover?.remove();
    state.mathPopover = null;
  }

  function sourceLineAnchorText(rawLine) {
    const raw = String(rawLine || "").trim();
    const admonition = /^(?:!!!|\?\?\?)\s+[\w-]+(?:\s+"([^"]+)")?/.exec(raw);
    return normalizeAnchorText((admonition ? (admonition[1] || "") : raw)
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\${1,2}[^$]*\${1,2}/g, " ")
      .replace(/^#{1,6}\s+/, "")
      .replace(/^[-+*]\s+/, "")
      .replace(/^\d+[.)]\s+/, "")
      .replace(/[*_`~<>]/g, "")
      .replace(/\\([\\`*_{}\[\]()#+.!-])/g, "$1"));
  }

  function sourcePositionForRenderedAnchor(source, anchor) {
    const target = normalizeAnchorText(anchor?.probe);
    if (!target) return null;
    const lines = String(source || "").split("\n");
    let offset = 0;
    let best = null;
    lines.forEach(raw => {
      const clean = sourceLineAnchorText(raw);
      const matches = clean.length >= 8 && (target.includes(clean) || clean.includes(target));
      if (matches) {
        const score = Math.min(clean.length, target.length);
        if (!best || score > best.score) best = { offset, raw, score };
      }
      offset += raw.length + 1;
    });
    if (!best) return null;
    const progress = Math.max(0, Math.min(1, Number(anchor.blockProgress) || 0));
    return best.offset + Math.round(best.raw.length * progress);
  }

  function captureReadingAnchor(article, source, modules) {
    const visualAnchor = captureRenderedAnchor({ sourcePath: "" }, article);
    const visualPosition = sourcePositionForRenderedAnchor(source, visualAnchor);
    if (Number.isInteger(visualPosition)) {
      return {
        position: visualPosition,
        viewportY: visualAnchor.viewportY,
        probe: visualAnchor.probe,
        blockProgress: visualAnchor.blockProgress
      };
    }
    const sourceHeadings = modules.extractHeadings(source);
    const renderedHeadings = Array.from(article.querySelectorAll("h1, h2, h3, h4"));
    if (!sourceHeadings.length || !renderedHeadings.length) return null;

    const viewportY = Math.min(Math.max(window.innerHeight * 0.38, 120), window.innerHeight - 80);
    const documentY = window.scrollY + viewportY;
    const headingTops = renderedHeadings.map(heading => heading.getBoundingClientRect().top + window.scrollY);
    let renderedIndex = 0;
    headingTops.forEach((top, index) => {
      if (top <= documentY) renderedIndex = index;
    });

    const renderedHeading = renderedHeadings[renderedIndex];
    const renderedTitle = (renderedHeading.textContent || "").replace(/¶/g, "").trim();
    const renderedLevel = Number(renderedHeading.tagName.slice(1));
    let sourceIndex = sourceHeadings.findIndex(heading =>
      heading.level === renderedLevel && heading.title === renderedTitle);
    if (sourceIndex < 0 && renderedHeadings.length === sourceHeadings.length) sourceIndex = renderedIndex;
    if (sourceIndex < 0) return null;

    const sectionTop = headingTops[renderedIndex];
    const articleBottom = article.getBoundingClientRect().bottom + window.scrollY;
    const sectionBottom = headingTops[renderedIndex + 1] ?? articleBottom;
    const progress = sectionBottom > sectionTop
      ? Math.max(0, Math.min(1, (documentY - sectionTop) / (sectionBottom - sectionTop)))
      : 0;
    const sourceFrom = sourceHeadings[sourceIndex].contentFrom;
    const sourceTo = sourceHeadings[sourceIndex + 1]?.from ?? source.length;
    return {
      position: Math.round(sourceFrom + (sourceTo - sourceFrom) * progress),
      viewportY
    };
  }

  function restoreReadingAnchor(state, anchor) {
    if (!anchor) return;
    const position = Math.max(0, Math.min(state.view.state.doc.length, anchor.position));
    const line = state.view.state.doc.lineAt(position);
    const diagram = /!\[[^\]]*\]\([^)]*\).*\.commutative-diagram/.test(line.text);
    const selectionPosition = diagram ? Math.min(state.view.state.doc.length, line.to + 1) : position;
    state.view.dispatch({ selection: { anchor: selectionPosition }, scrollIntoView: true });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (state.destroyed) return;
      if (diagram) {
        const element = state.surface.querySelector(`.mn-cm-diagram[data-mn-source-from="${line.from}"]`);
        if (element) {
          const rectangle = element.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, Number(anchor.blockProgress) || 0.5));
          window.scrollBy(0, rectangle.top + rectangle.height * progress - anchor.viewportY);
          return;
        }
      }
      const coordinates = state.view.coordsAtPos(position, 1);
      if (coordinates) window.scrollBy(0, coordinates.top - anchor.viewportY);
    }));
  }

  async function enterEditor(payload, generation, preserveReadingPosition = false, explicitReadingAnchor = null) {
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
    const readingAnchor = explicitReadingAnchor || (preserveReadingPosition && source === payload.source
      ? captureReadingAnchor(article, source, modules)
      : null);

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
    let state;
    const visualExtension = createVisualExtension(modules, (ranges) => {
      if (!state) return;
      state.mathRanges = ranges;
      if (state.mathPopover) scheduleMathPopover(state);
    }, Number(payload.chapterNumber) || 1, payload);
    state = {
      article, shell, toolbar, surface, payload, originalHtml, modules,
      baseRevision: source === draft?.source && !draftCompatible ? draft.baseRevision : payload.revision,
      savedSource: payload.source, pendingSource: null,
      status: toolbar.querySelector(".mn-typora-status"), visualCompartment, visualExtension,
      visual: true, draftTimer: null, menu: null, menuMode: "toolbar", slashRange: null,
      blockTabStop: null,
      structureDialog: null, view: null, outline: null, outlineHeadings: [], outlineTimer: null,
      mathRanges: [], mathPopover: null, mathPopoverFrame: null, mathPopoverListener: null,
      mathPopoverSignature: "", activeMathRange: null,
      // A restored selection is only historical state. Until the user clicks
      // or types in this editing session, leaving should preserve the viewport
      // center rather than jump to that old caret.
      cursorUsed: false
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
        state.cursorUsed = true;
        setStatus(state, "正在保存草稿…", "pending");
        clearTimeout(state.draftTimer);
        state.draftTimer = setTimeout(() => writeDraft(state), 350);
        clearTimeout(state.outlineTimer);
        state.outlineTimer = setTimeout(() => renderEditorOutline(state), 80);
      }
      if (update.docChanged || update.selectionSet) updateSlashMenu(state);
      if (update.selectionSet) updateOutlineActive(state);
      if (update.docChanged || update.selectionSet || update.viewportChanged || update.focusChanged) updateMathPopover(state);
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
        if (Number.isInteger(position)) state.cursorUsed = true;
        pendingVisualPointer = Number.isInteger(position)
          ? { position, x: event.clientX, y: event.clientY }
          : null;
        return false;
      },
      keydown(event) {
        if (event.isComposing || state.view.composing || event.keyCode === 229) return false;
        if (!event.metaKey && !event.ctrlKey && !event.altKey && !["Shift", "Control", "Alt", "Meta"].includes(event.key)) {
          state.cursorUsed = true;
        }
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
            handleDisplayMathEnter(state)) {
          event.preventDefault();
          return true;
        }
        if (event.key === "Enter" && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey &&
            handleBlockEnter(state)) {
          event.preventDefault();
          return true;
        }
        if ((event.key === "ArrowUp" || event.key === "ArrowDown") &&
            !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey &&
            handleInlineMathVertical(state, event.key === "ArrowDown")) {
          event.preventDefault();
          return true;
        }
        if (event.key === "Tab" && !event.metaKey && !event.ctrlKey && !event.altKey &&
            handleBlockListTab(state, event.shiftKey)) {
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
        extensions: [modules.Prec.highest(interactionHandler), modules.basicSetup, modules.markdown(), modules.writingExtension, modules.EditorView.lineWrapping,
          modules.EditorView.contentAttributes.of({ "aria-label": "笔记编辑器", spellcheck: "false" }),
          visualCompartment.of([visualExtension]), updateListener, mouseSelection]
      }),
      parent: surface
    });
    state.menu = makeBlockMenu(state);
    mountEditorOutline(state);
    mountMathPopover(state);
    activeEditor = state;
    sessionStorage.setItem(RESUME_KEY, payload.sourcePath);
    if (openingGeneration === generation) openingGeneration = 0;
    setStatus(state, source === payload.source ? "所有更改会自动保存为草稿" : "已恢复浏览器草稿", "saved");

    toolbar.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (!action) return;
      toolbar.querySelectorAll(".mn-typora-more").forEach(menu => menu.removeAttribute("open"));
      if (modules.writingCommands[action]) {
        modules.writingCommands[action](state.view);
        state.view.focus();
      }
      if (action === "add") {
        state.menu.querySelectorAll("[data-block]").forEach((item) => { item.hidden = false; });
        showMenu(state, "toolbar", event.target.closest("button"));
      }
      if (action === "section") insertBlock(state, { special: "heading", level: 2 });
      if (action === "subsection") insertBlock(state, { special: "heading", level: 3 });
      if (action === "source") {
        state.visual = !state.visual;
        state.view.dispatch({ effects: visualCompartment.reconfigure(state.visual ? [visualExtension] : []) });
        event.target.textContent = state.visual ? "源码" : "所见即所得";
        setStatus(state, state.visual ? "已回到即时排版" : "正在显示完整 Markdown", "saved");
        state.view.focus();
        scheduleMathPopover(state);
      }
      if (action === "export") {
        downloadMarkdown(state.view.state.doc.toString(), payload.sourcePath.split("/").pop());
        setStatus(state, "Markdown 已导出", "saved");
      }
      if (action === "save") saveSource(state);
      if (action === "cancel") cancelEditor(state);
      if (action === "done") leaveEditor(state);
    });
    shell.addEventListener("mousedown", (event) => {
      if (!event.target.closest(".mn-typora-menu, [data-action=add]")) hideMenu(state);
    });
    state.view.focus();
    restoreReadingAnchor(state, readingAnchor);
    scheduleMathPopover(state);
  }

  function initialize() {
    resumePendingNavigation();
    closeOrganizer(true);
    const generation = ++pageGeneration;
    currentPayload = null;
    setOpeningStatus(false);
    if (activeEditor) {
      writeDraft(activeEditor);
      activeEditor.destroyed = true;
      clearTimeout(activeEditor.outlineTimer);
      unmountMathPopover(activeEditor);
      activeEditor.view.destroy();
      activeEditor.outline?.remove();
      activeEditor = null;
      document.body.classList.remove("mn-typora-editing");
    }
    const payload = readPayload();
    if (!payload || !LOCAL_HOSTS.has(location.hostname)) return;
    currentPayload = payload;
    const exitAnchor = readExitAnchor(payload);
    if (sessionStorage.getItem(RESUME_KEY) === payload.sourcePath) {
      if (exitAnchor) sessionStorage.removeItem(EXIT_ANCHOR_KEY);
      const editorAnchor = exitAnchor?.kind === "editor"
        ? { position: exitAnchor.position, viewportY: exitAnchor.viewportY }
        : null;
      enterEditor(payload, generation, false, editorAnchor);
    } else {
      restoreRenderedAnchor(payload, document.querySelector(".md-content article.md-typeset"), exitAnchor);
    }
    const preload = () => {
      if (generation === pageGeneration) loadEditorModules().catch(() => {});
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(preload, { timeout: 1600 });
    else setTimeout(preload, 500);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeOrganizer) {
      event.preventDefault();
      closeOrganizer();
      return;
    }
    if (event.key === "Escape" && activeEditor?.structureDialog && !activeEditor.structureDialog.hidden) {
      event.preventDefault();
      closeStructureDialog(activeEditor);
      return;
    }
    const organizerShortcut = (event.metaKey || event.ctrlKey) && event.altKey &&
      !event.shiftKey && event.key.toLowerCase() === "o";
    if (organizerShortcut && !event.repeat && currentPayload) {
      event.preventDefault();
      if (activeOrganizer) closeOrganizer();
      else if (activeEditor) setStatus(activeEditor, "请先完成本页编辑，再整理课程目录", "pending");
      else openOrganizer(currentPayload);
      return;
    }
    const shortcut = (event.metaKey || event.ctrlKey) && event.shiftKey &&
      !event.altKey && event.key.toLowerCase() === "e";
    if (!shortcut || event.repeat || !currentPayload) return;
    event.preventDefault();
    if (activeEditor) leaveEditor(activeEditor);
    else enterEditor(currentPayload, pageGeneration, true);
  });

  function rememberCurrentViewAnchor() {
    if (!currentPayload) return;
    const existing = readExitAnchor(currentPayload);
    if (existing && Date.now() - Number(existing.updatedAt || 0) < 2000) return;
    if (activeEditor) {
      rememberExitAnchor(captureEditorExitAnchor(activeEditor));
      writeDraft(activeEditor);
      return;
    }
    const article = document.querySelector(".md-content article.md-typeset");
    rememberExitAnchor(captureRenderedAnchor(currentPayload, article));
  }

  document$.subscribe(initialize);
  window.addEventListener("pagehide", rememberCurrentViewAnchor);
  window.addEventListener("beforeunload", rememberCurrentViewAnchor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && activeEditor) writeDraft(activeEditor);
  });
})();
