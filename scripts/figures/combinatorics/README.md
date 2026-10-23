# Combinatorics figures

All 32 course diagrams use pre-rendered SVG paths for mathematical and prose labels. They work in an HTML `<img>`, offline, and in print without MathJax, web fonts, or system-font fallback.

## Edit and regenerate

1. Edit geometry and ordinary labels in `source/<name>.svg`.
2. Edit the `LABELS` mapping in `render.py` for mathematical labels. Use `$...$` MathText syntax, explicit subscripts/superscripts, and `\mathrm{meta}` for the external-set tag.
3. `sets-transfinite-recursion.svg` uses the two-column layout in `recursion.py`. Its original editable SVG remains in `source/` as a record of every explanatory note.
4. From the project root run `python3 scripts/figures/combinatorics/render.py`. Dependencies: Matplotlib and lxml. The program writes the rendered images to `docs/assets/combinatorics/` and an audit to this directory.
5. Review the PNG/SVG output at lecture-page size, then rebuild the MkDocs site and export any offline readers. Editing the output SVG paths directly is unnecessary.

Source files preserve the graph vertices, edges, arrow directions, colour meanings, and examples. Layout adjustments improve spacing. `render-audit.json` records original labels and their typeset versions; the recursion image is then replaced by its dedicated layout. Generated path labels retain accessibility descriptions. Original notation and explanatory notes are retained, while raw placeholders such as `C_e`, `meta`, and flattened nested subscripts are typeset correctly.

Rendering: Matplotlib 3.10.9, MathText/STIX, DejaVu Sans. See `licenses/` for font notices. The lecture and diagram content follows the project's CC BY-SA 4.0 licence.
