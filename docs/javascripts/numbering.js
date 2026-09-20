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
  const REFERENCE_KIND = "(?:Definition|Theorem|Proposition|Lemma|Corollary|Remark|Example|Def|Thm|Prop|Lem|Cor|Rem|Ex)";
  const BARE_REFERENCE_LABEL = new RegExp(`^(${REFERENCE_KIND}\\.?)$`);
  const REFERENCE_LABEL = /^((?:Definition|Theorem|Proposition|Lemma|Corollary|Remark|Example|Def|Thm|Prop|Lem|Cor|Rem|Ex)\.?\s+)\d+(?:\.\d+){2}(.*)$/;
  const referencePageCache = new Map();

  function payloadChapterNumber(doc = document) {
    const payload = doc.getElementById("mn-editor-source");
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

  function chapterNumber(article, doc = document) {
    const navigationNumber = doc === document ? navigationChapterNumber() : null;
    return payloadChapterNumber(doc) || navigationNumber || legacyChapterNumber(article) || 1;
  }

  function blockKind(element) {
    return NUMBERED_KINDS.find((kind) => element.classList.contains(kind));
  }

  function updateReferenceLabel(link, number) {
    const label = link.textContent.trim();
    const bare = BARE_REFERENCE_LABEL.exec(label);
    if (bare) {
      link.textContent = `${bare[1]} ${number}`;
      return;
    }
    const numbered = REFERENCE_LABEL.exec(label);
    if (numbered) link.textContent = `${numbered[1]}${number}${numbered[2]}`;
  }

  function isNumberedReference(link) {
    const label = link.textContent.trim();
    return BARE_REFERENCE_LABEL.test(label) || REFERENCE_LABEL.test(label);
  }

  function pageKey(url) {
    const path = url.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
    return `${url.origin}${path}`;
  }

  function collectNumbers(article, chapter, decorate = false) {
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

      if (decorate) {
        element.dataset.mnNumber = number;
        const title = element.querySelector(":scope > .admonition-title, :scope > summary");
        if (title) {
          const span = document.createElement("span");
          span.className = "mn-thm-num";
          span.textContent = `${number} `;
          title.insertBefore(span, title.firstChild);
        }
      }

      element.querySelectorAll("a[id]").forEach((anchor) => {
        numberByAnchor.set(anchor.id, number);
      });
    });
    return numberByAnchor;
  }

  function updateLocalReferenceLabels(article, numberByAnchor) {
    article.querySelectorAll('a[href*="#"]').forEach((link) => {
      let url;
      try {
        url = new URL(link.getAttribute("href"), location.href);
      } catch (_) {
        return;
      }
      if (url.origin !== location.origin || pageKey(url) !== pageKey(new URL(location.href))) return;
      const number = numberByAnchor.get(decodeURIComponent(url.hash.slice(1)));
      if (number) updateReferenceLabel(link, number);
    });
  }

  function referenceNumbersForPage(url) {
    const key = pageKey(url);
    if (!referencePageCache.has(key)) {
      const target = new URL(url.href);
      target.hash = "";
      referencePageCache.set(key, fetch(target).then((response) => {
        if (!response.ok) throw new Error(`Reference page returned ${response.status}`);
        return response.text();
      }).then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const article = doc.querySelector(".md-content article.md-typeset");
        return article ? collectNumbers(article, chapterNumber(article, doc)) : new Map();
      }).catch(() => new Map()));
    }
    return referencePageCache.get(key);
  }

  function updateCrossPageReferenceLabels(article) {
    const current = pageKey(new URL(location.href));
    article.querySelectorAll('a[href*="#"]').forEach((link) => {
      if (!isNumberedReference(link)) return;
      let url;
      try {
        url = new URL(link.getAttribute("href"), location.href);
      } catch (_) {
        return;
      }
      if (!url.hash || url.origin !== location.origin || pageKey(url) === current) return;
      referenceNumbersForPage(url).then((numberByAnchor) => {
        const number = numberByAnchor.get(decodeURIComponent(url.hash.slice(1)));
        if (number) updateReferenceLabel(link, number);
      });
    });
  }

  window.MathNotes.numberBlocks = (root) => {
    const article = root.matches?.("article.md-typeset")
      ? root
      : root.querySelector?.(".md-content article.md-typeset");
    if (!article) return;

    article.querySelectorAll(".mn-thm-num").forEach((number) => number.remove());

    const numberByAnchor = collectNumbers(article, chapterNumber(article), true);

    updateLocalReferenceLabels(article, numberByAnchor);
    updateCrossPageReferenceLabels(article);
  };
})();

document$.subscribe(({ body }) => {
  window.MathNotes.numberBlocks(body);
});
