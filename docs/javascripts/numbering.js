/* Anchor-driven theorem numbering.
 *
 * For every admonition (div.admonition / details) that carries an anchor like
 * <a id="def-1-2-3"></a>, prepend the chapter-section-order number (1.2.3)
 * to its title. The displayed number therefore always matches the anchor, so
 * cross-references such as [Def 1.2.2](#def-1-2-2) line up with what readers
 * see on screen.
 *
 * Admonitions without such an anchor keep the CSS per-section counter fallback
 * (see extra.css). Runs on every page via Material's document$ event, so it
 * also works with navigation.instant.
 */
document$.subscribe(({ body }) => {
  const re = /^(def|thm|prop|lem|cor|rem|ex|prf)-(\d+)-(\d+)-(\d+)$/;
  body.querySelectorAll(".md-typeset .admonition, .md-typeset details[class]").forEach((el) => {
    const a = el.querySelector("a[id]");
    if (!a) return;
    const m = re.exec(a.id);
    if (!m) return;
    const title = el.querySelector(":scope > .admonition-title, :scope > summary");
    if (!title) return;
    const span = document.createElement("span");
    span.className = "mn-thm-num";
    span.textContent = `${m[2]}.${m[3]}.${m[4]} `;
    title.insertBefore(span, title.firstChild);
  });
});
