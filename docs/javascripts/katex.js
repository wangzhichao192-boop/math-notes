window.MathNotes = window.MathNotes || {};

window.MathNotes.renderMath = (root) => {
  if (typeof renderMathInElement !== "function") return;
  renderMathInElement(root, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    throwOnError: false
  });
};

document$.subscribe(({ body }) => {
  window.MathNotes.renderMath(body);
});
