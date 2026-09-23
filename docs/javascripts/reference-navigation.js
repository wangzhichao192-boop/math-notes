/* In-page reference navigation.
 *
 * Markdown anchors live inside theorem-style blocks, so the browser's native
 * hash jump can leave the block title behind the sticky header.  Reference
 * links are handled here instead: the containing block is aligned below the
 * visible header and a short-lived return action points back to the source
 * block.  The return action is deliberately dismissed by the first viewport
 * movement after the jump.
 */
window.MathNotes = window.MathNotes || {};

(() => {
  const PENDING_KEY = "mn-reference-return:v1";
  const RESTORE_KEY = "mn-reference-restore:v1";
  const MAX_AGE = 30 * 60 * 1000;
  const TOP_GAP = 8;
  const VIEWPORT_KEYS = new Set([
    "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ",
  ]);

  let returnButton = null;
  let activeReturn = null;
  let scrollBaseline = null;
  let activationTimer = 0;
  let jumpToken = 0;

  function normalizedPage(url) {
    const parsed = new URL(url, location.href);
    const path = parsed.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
    return `${parsed.origin}${path}${parsed.search}`;
  }

  function readStored(key) {
    try {
      const value = JSON.parse(sessionStorage.getItem(key));
      if (!value || Date.now() - value.createdAt > MAX_AGE) {
        sessionStorage.removeItem(key);
        return null;
      }
      return value;
    } catch (_) {
      sessionStorage.removeItem(key);
      return null;
    }
  }

  function writeStored(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ ...value, createdAt: Date.now() }));
    } catch (_) {
      // Navigation still works when storage is unavailable; only Return is lost.
    }
  }

  function article() {
    return document.querySelector(".md-content article.md-typeset");
  }

  function sourceBlock(link) {
    return link.closest(".admonition, details")
      || link.closest("p, li, blockquote, pre, table, h1, h2, h3, h4, h5, h6")
      || link;
  }

  function targetBlock(anchor) {
    return anchor.closest(".admonition, details")
      || anchor.closest("h1, h2, h3, h4, h5, h6")
      || anchor;
  }

  function elementPath(element) {
    const root = article();
    if (!root || !root.contains(element)) return null;
    const path = [];
    let node = element;
    while (node && node !== root) {
      const parent = node.parentElement;
      if (!parent) return null;
      path.unshift(Array.prototype.indexOf.call(parent.children, node));
      node = parent;
    }
    return node === root ? path : null;
  }

  function elementFromPath(path) {
    let node = article();
    if (!node || !Array.isArray(path)) return null;
    for (const index of path) {
      if (!Number.isInteger(index) || index < 0 || index >= node.children.length) return null;
      node = node.children[index];
    }
    return node;
  }

  function locatorFor(element) {
    const ownId = element.id;
    const open = element.matches?.("details") ? element.open : null;
    if (ownId) return { id: ownId, path: elementPath(element), open };
    const anchor = element.querySelector?.("[id]");
    return {
      id: anchor?.id || null,
      path: elementPath(element),
      open,
    };
  }

  function resolveLocator(locator) {
    if (!locator) return null;
    let element = null;
    if (locator.id) {
      const anchor = document.getElementById(locator.id);
      if (anchor) element = targetBlock(anchor);
    }
    if (!element) element = elementFromPath(locator.path);
    if (element?.matches?.("details") && typeof locator.open === "boolean") {
      element.open = locator.open;
    }
    return element;
  }

  function anchorFromHash(hash = location.hash) {
    if (!hash || hash === "#") return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (_) {
      return document.getElementById(hash.slice(1));
    }
  }

  function visibleHeaderOffset() {
    let bottom = 0;
    document.querySelectorAll(".md-header, .md-tabs").forEach((element) => {
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden"
        || Number(style.opacity) < 0.1) return;
      const rect = element.getBoundingClientRect();
      if (rect.height > 0 && rect.bottom > 0 && rect.top < 160) {
        bottom = Math.max(bottom, Math.min(rect.bottom, window.innerHeight));
      }
    });
    const offset = Math.max(0, bottom) + TOP_GAP;
    document.documentElement.style.setProperty("--mn-anchor-offset", `${offset}px`);
    return offset;
  }

  function alignBelowHeader(element) {
    if (!element?.isConnected) return;
    const top = window.scrollY + element.getBoundingClientRect().top - visibleHeaderOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  }

  function removeReturn({ clearStored = true } = {}) {
    clearTimeout(activationTimer);
    activationTimer = 0;
    jumpToken += 1;
    activeReturn = null;
    scrollBaseline = null;
    returnButton?.remove();
    returnButton = null;
    document.body.classList.remove("mn-reference-active");
    if (clearStored) sessionStorage.removeItem(PENDING_KEY);
  }

  function ensureReturnButton() {
    if (returnButton?.isConnected) return returnButton;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mn-reference-return";
    button.setAttribute("aria-label", "返回引用处");
    button.title = "返回引用处";
    button.innerHTML = [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
      '<path d="M9.5 7 4.5 12l5 5M5 12h8.2a5.8 5.8 0 0 1 5.8 5.8"/>',
      "</svg>",
      "<span>返回</span>",
    ].join("");
    button.addEventListener("click", returnToSource);
    document.body.appendChild(button);
    returnButton = button;
    return button;
  }

  function showReturnAfterJump(payload) {
    const token = ++jumpToken;
    clearTimeout(activationTimer);
    // A reference return action replaces Material's overlapping back-to-top
    // chip while it is active, so the target can use the same compact top
    // position as ordinary page navigation.
    document.body.classList.add("mn-reference-active");

    // Re-align after the sticky header and rendered maths have settled.
    [0, 80, 220].forEach((delay) => {
      setTimeout(() => {
        if (token !== jumpToken) return;
        const anchor = anchorFromHash(new URL(payload.targetUrl).hash);
        if (anchor) alignBelowHeader(targetBlock(anchor));
      }, delay);
    });

    activationTimer = window.setTimeout(() => {
      if (token !== jumpToken) return;
      activeReturn = payload;
      scrollBaseline = { x: window.scrollX, y: window.scrollY };
      ensureReturnButton();
    }, 280);
  }

  function setAddress(url) {
    const next = new URL(url, location.href);
    history.pushState({ mnReferenceNavigation: true }, "", `${next.pathname}${next.search}${next.hash}`);
  }

  function returnToSource() {
    const payload = activeReturn;
    if (!payload) return;
    removeReturn();

    if (normalizedPage(payload.sourceUrl) === normalizedPage(location.href)) {
      setAddress(payload.sourceUrl);
      requestAnimationFrame(() => {
        const source = resolveLocator(payload.source);
        if (source) alignBelowHeader(source);
      });
      return;
    }

    writeStored(RESTORE_KEY, {
      sourceUrl: payload.sourceUrl,
      source: payload.source,
    });
    location.href = payload.sourceUrl;
  }

  function dismissIfViewportMoved() {
    if (!activeReturn || !scrollBaseline) return;
    if (Math.abs(window.scrollY - scrollBaseline.y) > 1
      || Math.abs(window.scrollX - scrollBaseline.x) > 1) {
      removeReturn();
    }
  }

  function onReferenceClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey
      || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.(".md-content article.md-typeset a[href]");
    if (!link || link.hasAttribute("download") || link.target) return;

    let destination;
    try {
      destination = new URL(link.href, location.href);
    } catch (_) {
      return;
    }
    if (destination.origin !== location.origin || !destination.hash) return;

    const source = sourceBlock(link);
    const payload = {
      sourceUrl: location.href,
      source: locatorFor(source),
      targetUrl: destination.href,
    };
    writeStored(PENDING_KEY, payload);

    if (normalizedPage(destination) !== normalizedPage(location.href)) return;

    const anchor = anchorFromHash(destination.hash);
    if (!anchor) return;
    event.preventDefault();
    setAddress(destination.href);
    showReturnAfterJump(payload);
  }

  function restoreSourceIfNeeded() {
    const restore = readStored(RESTORE_KEY);
    if (!restore || normalizedPage(restore.sourceUrl) !== normalizedPage(location.href)) return false;
    sessionStorage.removeItem(RESTORE_KEY);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const source = resolveLocator(restore.source);
      if (source) alignBelowHeader(source);
    }));
    return true;
  }

  function initialize() {
    removeReturn({ clearStored: false });
    visibleHeaderOffset();
    if (restoreSourceIfNeeded()) return;

    const pending = readStored(PENDING_KEY);
    if (!pending || normalizedPage(pending.targetUrl) !== normalizedPage(location.href)) return;
    // Material's navigation tracking may replace a block hash with the current
    // section hash.  The stored destination remains the authoritative anchor.
    const anchor = anchorFromHash(new URL(pending.targetUrl).hash);
    if (!anchor) {
      sessionStorage.removeItem(PENDING_KEY);
      return;
    }
    showReturnAfterJump(pending);
  }

  document.addEventListener("click", onReferenceClick, true);
  window.addEventListener("scroll", dismissIfViewportMoved, { passive: true });
  window.addEventListener("resize", dismissIfViewportMoved, { passive: true });
  window.addEventListener("popstate", () => removeReturn());
  window.addEventListener("keydown", (event) => {
    // The scroll event is authoritative. This merely avoids reviving a button
    // while a held navigation key is still moving the viewport.
    if (activeReturn && VIEWPORT_KEYS.has(event.key)) requestAnimationFrame(dismissIfViewportMoved);
  });

  window.MathNotes.referenceNavigation = { initialize, visibleHeaderOffset };
})();

document$.subscribe(() => {
  window.MathNotes.referenceNavigation.initialize();
});
