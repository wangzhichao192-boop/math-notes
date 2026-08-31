# Writing Guide — Math Notes Template

This page is a **template and gotcha reference** for writing math notes in
this site. Read it once before authoring a new chapter; follow the patterns
below and the self-check script will stay green.

---

## 1. File layout

```
docs/<subject>/
├── index.md        # course hub: course main line, chapter list, anchor links
├── <topic-1>.md    # one file per chapter/topic
├── <topic-2>.md
└── ...
```

- One `.md` file per chapter (matches the `mathematical-logic` precedent:
  `counting-to-infinity.md`, `first-order-logic.md`, …).
- Cross-references between chapters use the same anchor convention:

  ```
  See [Theorem 5.1.3](#thm-5-1-3) in [Groups](groups.md).
  ```

- The `index.md` is in **Chinese** with a Chinese 课程主线 admonition +
  a bulleted 笔记/教材 list; each chapter file uses **English** for math
  definitions (matching `mathematical-logic`).

---

## 2. Math syntax — what works, what doesn't

The site uses `pymdownx.arithmatex: generic: true` + the KaTeX
auto-render script in `docs/javascripts/katex.js`. Both must agree.

### 2.1 Inline math — **always safe**

```markdown
Let $\alpha, \beta$ be ordinals with $\alpha < \beta$.
```

This is wrapped in `<span class="arithmatex">\(...\)</span>` by arithmatex
**before** markdown runs, so `_`, `*`, `[`, `]` etc. inside the math are
not touched.

### 2.2 Block math — `$$...$$`

```markdown
Some text.

$$
f(x) = \sum_{i=1}^{n} x_i^2.
$$

More text.
```

Keep `$$` on their own lines. **Both surrounding blank lines are
mandatory**: a blank line *before* the opening `$$` and a blank line
*after* the closing `$$` (the block must be its own paragraph). If either
blank line is missing, `pymdownx.arithmatex` **silently leaves the
`$$...$$` as literal text** and the built page shows raw `$$` — it looks
garbled / 乱码. There is **no** blank line between the last math line and
the closing `$$`.

> **After building, self-check:** the page must contain **no** literal `$$`
> anymore. E.g. `grep '\$\$' site/<subject>/<page>/index.html` should print
> nothing. (The same symptom — raw `$$` left in the page — is how a missing
> blank line shows up.)

**Block math does not work inside list items.** A `$$...$$` nested under a
`+` / `-` bullet (6-space indent) is never converted — it stays literal.
Keep display formulas in their own paragraph (a plain paragraph inside an
admonition is fine); use inline `$...$` when a formula must live in a bullet.

### 2.3 Math inside admonitions — same syntax, no escaping

Admonitions and proofs use **exactly the same** `$...$` / `$$...$$`
syntax. `pymdownx.arithmatex` wraps the math before markdown runs, so
`_`, `^`, `{`, `}` need no escaping:

```markdown
!!! proposition "Image of a union"
    Let $f$ be a correspondence, $(A_i)_{i \in I}$ a family. Then

    $$
    f\Big(\bigcup_{i \in I} A_i\Big) = \bigcup_{i \in I} f(A_i).
    $$

    Moreover, if $I \neq \varnothing$, ...
```

Rules that must hold in **all** math:

- Single backslashes only: `\Gamma`, `\frac{a}{b}`, `x_1`. Never
  `\\Gamma`, `x\_1`, `\{`.
- Inline `$...$` stays on **one line** — no newline inside a dollar pair.
- No blank line between the last content line and the closing `$$`.
- Block `$$...$$` needs a blank line **before and after** it (see §2.2);
  a missing blank leaves literal `$$` in the built page.

### 2.5 Proofs use `??? proof "Proof"`

Collapsible proofs are `???` (instead of `!!!`) and the content follows the same math rules as everything else:

```markdown
??? proof "Proof"
    Using [Proposition 3.3.4](#prop-3-3-4) and ...

    $$
    f\Big(\bigcup_i A_i\Big) = \bigcup_i f(A_i).
    $$

    The intersection inclusion follows from ...
```

---

## 3. Admonition skeleton

**Title format** — every admonition needs a title in quotes, in one of
these two forms:

```markdown
!!! kind "Kind (Descriptive name)"   # preferred — kind name in parens
!!! kind "Descriptive name"          # OK — parens optional
!!! example "Example"                # bare kind name is also fine for examples
```

Examples:

```markdown
!!! definition "Definition (Composition law)"
!!! definition "Equinumerous sets"
!!! example "Example"                  # or "Example (Symmetric group)"
!!! theorem "Theorem (Cantor–Bernstein)"
!!! lemma "Lemma (Schur)"
!!! proposition "Proposition (Image of a union)"
```

Do **not** write:

```markdown
!!! definition ""                        # BAD: empty title removes the title bar
!!! definition "A composition law on a set X is a mapping"   # BAD: full sentence
```

The CSS counter auto-prepends a number to the title via `::before`, so
the title bar shows e.g. `1. Definition (Composition law)`. The
admonition kinds are also configured as proper counter contexts (one
counter per `## section`, reset at each new `## heading`).

```markdown
!!! definition "Definition (Composition law)"
    <a id="def-5-1-1"></a>
    A **composition law** on a set $X$ is a mapping
    $\ast : X \times X \to X$, $(x, y) \mapsto x \ast y$.

    + $Y \subseteq X$ is **closed** under $\ast$ if ...
    + $\ast$ is **commutative** if $x \ast y = y \ast x$ for all $x, y$.
    + $\ast$ is **associative** if $(x \ast y) \ast z = x \ast (y \ast z)$.

    + If $\ast$ is associative, then $(X, \ast)$ is a **semigroup**.

!!! remark "Remark"
    <a id="rem-5-1-2"></a>
    Nested admonitions are also fine. Use them sparingly.

??? proof "Proof"
    <a id="prf-5-1-3"></a>
    Optional collapsible proof.
```

The `<a id="...">` anchor goes on its own line right after the
admonition title. Anchor naming convention used in this repo:

- `def-<chapter>-<section>-<n>` for definitions
- `thm-<chapter>-<section>-<n>` for theorems
- `prop-<chapter>-<section>-<n>` for propositions
- `lem-<chapter>-<section>-<n>` for lemmas
- `cor-<chapter>-<section>-<n>` for corollaries
- `rem-<chapter>-<section>-<n>` for remarks
- `ex-<chapter>-<section>-<n>` for examples

**On-screen numbering** is driven by the anchor: `docs/javascripts/numbering.js`
reads `<a id="def-1-2-3"></a>` and displays the admonition as "1.2.3 Definition
…". The anchor is the single source of truth for the number — keep it
canonical, and if you ever renumber, update the anchor (and every reference to
it).

**Cross-references** are ordinary markdown anchor links, and the number you
type is exactly what readers see on screen:

- same page: `[Def 1.2.2](#def-1-2-2)`
- same course, another file: `[Def 1.2.2](general-topology.md#def-1-2-2)`
- another course: `[Cor 2.6.3](../algebra-analysis/set-theory.md#cor-2-6-3)`

Cross-file links keep the `.md` extension so mkdocs resolves them.

> Files **without** anchors (e.g. `probability/random-variables.md` and
> several `mathematical-logic/` pages) fall back to the CSS per-section
> counter and cannot be cross-referenced this way — add anchors if you want
> them numbered and linkable.

---

## 4. Other formatting gotchas

- **No `# Heading` inside an admonition body** — markdown doesn't process
  headings inside admonitions cleanly. Use `**Bold title**` for emphasis
  instead.
- **Lists inside admonitions** need **4-space indent** for the bullet
  itself, plus 4 more for the content:

  ```markdown
  !!! note
      + First item
      + Second item
  ```

  (The `+` bullet is the project convention; `1.` also works.)

- **Cross-references** between files use absolute path with `.md`:
  `[Corollary 2.6.3](set-theory.md#cor-2-6-3)`. The trailing `.md` is
  needed for mkdocs to resolve the link.

---

## 5. Self-check — `scripts/check_math.js`

After authoring, always run:

```bash
cd scripts && npm install    # once, installs KaTeX locally
node scripts/check_math.js
```

This renders every `$...$` / `$$...$$` formula through KaTeX and prints
any parse error with file and line; exit code 0 = clean, 1 = errors.

Point it at one file with `node scripts/check_math.js docs/<subject>/<topic>.md`.

---

## 6. End-to-end workflow

```bash
# 1. Write the chapter
$EDITOR docs/<subject>/<topic>.md

# 2. Self-check
node scripts/check_math.js

# 3. Preview locally
mkdocs serve   # http://127.0.0.1:8000
```
---

## 7. Quick reference card

| Want to write | Use |
|---|---|
| Inline math | `$x \in A$` |
| Block math (own paragraph, **not** inside a list) | `$$ ... $$` — blank line before **and** after; none before the closing `$$` |
| Definition / Theorem / Lemma / etc. | `!!! <kind> "Title"` then 4-space-indented body |
| Collapsible proof | `??? proof "Proof"` |
| Cross-reference | `[Def 1.2.2](#def-1-2-2)` same page · `[Def 1.2.2](general-topology.md#def-1-2-2)` cross-file · `[Cor 2.6.3](../algebra-analysis/set-theory.md#cor-2-6-3)` another course |
| Numbered anchor | `<a id="def-1-2-3"></a>` right after admonition title |

