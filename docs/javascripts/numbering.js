/* Position-driven theorem numbering.
 *
 * A content page is one chapter. Its chapter number is injected from the
 * MkDocs navigation by hooks/editor.py; every `##` heading starts the next
 * section; and all theorem-style blocks in that section share one counter.
 * Thus moving or inserting a block automatically updates the displayed
 * chapter.section.block number. Anchors remain stable link targets and do not
 * control numbering.
 */
window.MathNotes = window.MathNotes || {};

(() => {
  const NUMBERED_KINDS = [
    "definition", "theorem", "proposition", "lemma", "corollary",
    "example", "remark"
  ];
  const REFERENCE_LABEL = /^((?:Definition|Theorem|Proposition|Lemma|Corollary|Remark|Example|Def|Thm|Prop|Lem|Cor|Rem|Ex)\.?\s+)\d+(?:\.\d+){2}(.*)$/;

  function payloadChapterNumber() {
    const payload = document.getElementById("mn-editor-source");
    if (!payload) return null;
    try {
      const number = Number(JSON.parse(payload.textContent).chapterNumber);
      return Number.isInteger(number) && number > 0 ? number : null;
    } catch (_) {
      return null;
    }
  }

  function navigationChapterNumber() {
    const currentPath = location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
    const active = Array.from(document.querySelectorAll(".md-nav--primary a.md-nav__link--active[href]"))
      .find((link) => {
        const path = new URL(link.href, location.href).pathname
          .replace(/index\.html$/, "").replace(/\/+$/, "/");
        return path === currentPath;
      });
    const item = active?.closest("li.md-nav__item");
    const list = item?.parentElement;
    if (!item || !list?.matches("ul.md-nav__list")) return null;
    const chapters = Array.from(list.children).filter((child) => child.matches("li.md-nav__item"));
    const index = chapters.indexOf(item);
    return index >= 0 ? index + 1 : null;
  }

  function legacyChapterNumber(article) {
    const anchor = Array.from(article.querySelectorAll("a[id]"))
      .map((item) => /^(?:def|thm|prop|lem|cor|rem|ex|prf)-(\d+)-\d+-\d+$/.exec(item.id))
      .find(Boolean);
    return anchor ? Number(anchor[1]) : null;
  }

  function chapterNumber(article) {
    return payloadChapterNumber() || navigationChapterNumber() || legacyChapterNumber(article) || 1;
  }

  function blockKind(element) {
    return NUMBERED_KINDS.find((kind) => element.classList.contains(kind));
  }

  function updateLocalReferenceLabels(article, numberByAnchor) {
    article.querySelectorAll('a[href^="#"]').forEach((link) => {
      let target;
      try {
        target = decodeURIComponent(link.getAttribute("href").slice(1));
      } catch (_) {
        return;
      }
      const number = numberByAnchor.get(target);
      const match = REFERENCE_LABEL.exec(link.textContent.trim());
      if (number && match) link.textContent = `${match[1]}${number}${match[2]}`;
    });
  }

  window.MathNotes.numberBlocks = (root) => {
    const article = root.matches?.("article.md-typeset")
      ? root
      : root.querySelector?.(".md-content article.md-typeset");
    if (!article) return;

    article.querySelectorAll(".mn-thm-num").forEach((number) => number.remove());

    const chapter = chapterNumber(article);
    const numberByAnchor = new Map();
    let section = 0;
    let block = 0;

    article.querySelectorAll("h2, .admonition, details[class]").forEach((element) => {
      if (element.matches("h2")) {
        if (!element.closest(".admonition, details")) {
          section += 1;
          block = 0;
        }
        return;
      }

      const kind = blockKind(element);
      if (!kind) return;
      if (section === 0) section = 1;
      block += 1;
      const number = `${chapter}.${section}.${block}`;
      element.dataset.mnNumber = number;

      const title = element.querySelector(":scope > .admonition-title, :scope > summary");
      if (title) {
        const span = document.createElement("span");
        span.className = "mn-thm-num";
        span.textContent = `${number} `;
        title.insertBefore(span, title.firstChild);
      }

      element.querySelectorAll("a[id]").forEach((anchor) => {
        numberByAnchor.set(anchor.id, number);
      });
    });

    updateLocalReferenceLabels(article, numberByAnchor);
  };
})();

document$.subscribe(({ body }) => {
  window.MathNotes.numberBlocks(body);
});
