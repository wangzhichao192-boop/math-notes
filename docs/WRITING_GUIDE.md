# Writing Guide — Math Notes Template

This page is a **template and gotcha reference** for writing math notes in
this site. Read it once before authoring a new chapter; follow the patterns
below and the self-check script will stay green.

---

## 1. File layout

```
docs/<subject>/
├── index.md        # course hub: course main line, chapter list, anchor links
├── <topic-1>.md    # one file per book-scale chapter
├── <topic-2>.md
└── ...
```

### 1.1 Chapter and section granularity

- Treat the finished notes as a **concise academic book**, not as a transcript
  or a one-page-per-lesson archive.
- Each content `.md` file is one **chapter page**. The total number of chapter
  pages should be comparable to the chapter count of a normal concise academic
  book on the same material.
- A lesson or lecture is only a source boundary, not a structural rule. One
  short lesson may form only part of a chapter; several related lessons may be
  merged into one chapter; an unusually long lesson may be split across
  chapters when a well-edited academic book would do so.
- The supplied slides may stop in the middle of a mathematical unit simply
  because the class period ended. When the available source is incomplete,
  treat the current chapter and section structure as **provisional** rather
  than assuming that the last slide marks a chapter or section boundary.
- Do not choose an artificially narrow chapter or section title merely to fit
  the slides currently available, and do not write an opening overview as if
  the unit were already complete. Anticipate that later slides may extend the
  same unit and require a broader title, a different boundary, or a revised
  line of development.
- When new material completes or extends the same mathematical unit, merge it
  into the existing chapter or section when appropriate. Then reconsider and,
  if necessary, revise the chapter title, section titles, opening orienting
  paragraphs, course index, and navigation labels so that they describe the
  combined finished exposition rather than the history of separate uploads.
- Use one `#` heading for the page title. An independent course page is a
  **chapter**; when that page is nested beneath another chapter in the course
  navigation, it is a **subchapter**. A **part** is a non-clickable navigation
  label that groups chapters and never gets its own page.
- Within a chapter or subchapter page, each `##` heading is a genuine book
  **section**. A `###` heading is a **subsection**. The number of sections
  should resemble the section count of a normal academic chapter covering the
  same material.
- Choose chapter and section boundaries by mathematical scope, conceptual
  dependency, and reading length. Do not create a new chapter or section merely
  because the lecture date changes, the blackboard moves to a new panel, or a
  new definition or theorem begins.
- Merge headings that contain only a small amount of material into a broader
  coherent section. Use `###` subsections only when a substantial section has
  a genuine internal division; keep them sparse.
- The course `index.md` and `mkdocs.yml` navigation must list the resulting
  chapter pages, not the original lesson count.
- Cross-references between chapters use stable descriptive anchors:

  ```
  See the [first isomorphism theorem](groups.md#thm-first-isomorphism).
  ```

- The `index.md` is in **Chinese** with a Chinese 课程主线 admonition +
  a bulleted 笔记/教材 list; each chapter file uses **English** for math
  definitions (matching `mathematical-logic`).

---

## 2. Note-writing style

### 2.1 Source fidelity and the no-deletion rule

- Treat lecture-board photographs, scans, handouts, and the instructor's
  worked examples as the **minimum required corpus**, not as optional source
  material. The finished notes may add clarification and background, but must
  contain every mathematical definition, statement, construction, proof
  method, example, exercise, diagram, and in-class question visible in the
  supplied sources.
- **Add; do not subtract.** Never delete, replace, merge away, or materially
  compress source-backed content merely to make the notes shorter. Never
  remove existing note content without first telling the user exactly what is
  proposed and obtaining approval.
- A shorter proof is supplementary, not a replacement. If the instructor gives
  two proofs (for example, an algebraic proof and a bijective proof), preserve
  both in full and label them separately. Do not replace a board construction
  with a one-line generating-function or citation-only argument.
- Preserve the instructor's intermediate steps when they carry mathematical or
  examinable content: the sets and maps used in a bijection, the inverse map,
  checks of injectivity/surjectivity, coefficient extractions, boundary cases,
  and representative worked examples all belong in the notes.
- Before finishing, make a source-to-note audit. Check every board panel or
  source page against the draft and confirm that each item appears somewhere
  in the notes. If a symbol or line is unreadable, mark the uncertainty and ask
  the user; do not silently omit it or invent a replacement.
- Editorial restructuring is allowed only when it preserves all source
  content. Moving material, adding connective prose, or supplying an additional
  proof is fine; deleting source-backed material requires prior user approval.

- Write chapter content in **English**. Use **Chinese** for course home pages,
  navigation, and overview material.
- Aim for the style of a concise graduate-level mathematics textbook or set of
  course notes, rather than a chronological record of a lecture.
- At the beginning of a chapter or section, add a short orienting paragraph
  when useful, stating its subject, scope, motivation, or main line of
  development. Organise the rest by conceptual dependency.
- Make definitions precise, state all assumptions, and introduce notation
  before or when it is first used. Bold key terms.
- Keep the prose concise and information-dense. Avoid decorative language,
  lengthy historical background, and repetitive summaries.
- Keep proofs direct and compact: retain the essential construction and chain
  of reasoning, compress routine steps into a sentence when appropriate, and
  cite earlier results instead of proving them again.
- Follow abstract concepts with short examples, counterexamples, or remarks
  when they clarify boundaries, common confusions, or technical points. Avoid
  long pedagogical digressions.
- Display important formulas on their own lines; keep ordinary relations inline
  rather than breaking them out solely for visual effect.
- Use an objective, restrained tone. An occasional “we” may guide the chapter's
  development, but the prose should not sound conversational.
- Make each chapter reasonably self-contained while using numbering and
  cross-references to form a continuous body of notes across chapters.

---

## 3. Math syntax — what works, what doesn't

The site uses `pymdownx.arithmatex: generic: true` + the KaTeX
auto-render script in `docs/javascripts/katex.js`. Both must agree.

### 3.1 Inline math — **always safe**

```markdown
Let $\alpha, \beta$ be ordinals with $\alpha < \beta$.
```

This is wrapped in `<span class="arithmatex">\(...\)</span>` by arithmatex
**before** markdown runs, so `_`, `*`, `[`, `]` etc. inside the math are
not touched.

### 3.2 Block math — `$$...$$`

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

### 3.3 Math inside admonitions — same syntax, no escaping

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
- Block `$$...$$` needs a blank line **before and after** it (see §3.2);
  a missing blank leaves literal `$$` in the built page.

### 3.4 Proofs use `??? proof "Proof"`

Collapsible proofs are `???` (instead of `!!!`) and the content follows the same math rules as everything else:

```markdown
??? proof "Proof"
    Using the [image-of-a-union proposition](#prop-image-of-union) and ...

    $$
    f\Big(\bigcup_i A_i\Big) = \bigcup_i f(A_i).
    $$

    The intersection inclusion follows from ...
```

### 3.5 Ideas use `??? idea "Idea"`

Use an `idea` block for an optional proof strategy, heuristic, or conceptual
road map that helps the reader without forming part of the main exposition.
A proof strategy belongs in this block instead of an ordinary bold paragraph.
Use idea blocks sparingly: add one only when it gives a genuinely useful
conceptual shortcut that is not already clear from the proof itself.

Idea blocks are **always collapsed by default**. Use `???`, never `!!!` or
`???+`:

```markdown
??? idea "Idea"
    Rewrite the differential equation as an integral equation, construct
    successive approximations, and use the Lipschitz bound to prove uniform
    convergence.
```

The title is always `"Idea"`; there is no alternative title. The block is not
numbered. Do not attach an idea block mechanically to every proof. A complete
proof still uses `??? proof "Proof"`.

### 3.6 Notation uses `!!! notation "Notation (...)"`

Use a notation block to introduce symbols, naming conventions, or standing
notational agreements that do not constitute a mathematical definition or
result. Notation blocks are open by default and are **not numbered**, so they
do not consume a position in the shared theorem-style block counter.

```markdown
!!! notation "Notation (Powers in a monoid)"
    For a monoid $M$, write $M^\times$ for the submonoid of invertible
    elements and write $x^{\ast n}$ for the $n$-fold product of $x$.
```

---

## 4. Admonition skeleton

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
!!! notation "Notation (Powers in a monoid)"
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

The site automatically prepends a `chapter.section.block` number to each
theorem-style title. Definitions, theorems, propositions, lemmas, corollaries,
examples, and remarks share one block counter. A new `##` heading resets the
block counter; notation blocks, proofs, ideas, and ordinary notes are not
numbered.

```markdown
!!! definition "Definition (Composition law)"
    <a id="def-composition-law"></a>
    A **composition law** on a set $X$ is a mapping
    $\ast : X \times X \to X$, $(x, y) \mapsto x \ast y$.

    + $Y \subseteq X$ is **closed** under $\ast$ if ...
    + $\ast$ is **commutative** if $x \ast y = y \ast x$ for all $x, y$.
    + $\ast$ is **associative** if $(x \ast y) \ast z = x \ast (y \ast z)$.

    + If $\ast$ is associative, then $(X, \ast)$ is a **semigroup**.

!!! remark "Remark"
    <a id="rem-nested-admonitions"></a>
    Nested admonitions are also fine. Use them sparingly.

??? proof "Proof"
    Optional collapsible proof.

??? idea "Idea"
    Optional strategy or conceptual road map.
```

An `<a id="...">` anchor is optional and is used only as a stable link target.
When needed, put it on its own line immediately after the admonition title and
use a descriptive name:

- `def-composition-law` for a definition
- `thm-cantor-bernstein` for a theorem
- `prop-image-of-union` for a proposition
- `lem-schur` for a lemma

**On-screen numbering** is position-driven. The chapter number is the page's
position in its course navigation (excluding `index.md`); the section number is
the position of the `##` heading in that chapter; and the block number is the
position of the theorem-style block in that section. Moving a chapter, section,
or block therefore renumbers it automatically. Anchors never control the
displayed number. Existing numeric anchors remain valid as legacy links.

**Cross-references** are ordinary Markdown links, but their source must not
contain a manually typed number. Write only the block type and a stable,
descriptive anchor; the site calculates and inserts the target block's current
number. This works both within one page and across pages:

- same page: `[Definition](#def-composition-law)`
- same course, another file:
  `[Theorem](set-theory.md#thm-cantor-bernstein)`
- another course:
  `[Lemma](../abstract-algebra/representations.md#lem-schur)`

For example, `[Lemma](#lem-schur)` may render as `Lemma 2.4.3`; if an earlier
block is inserted or deleted, the displayed number changes automatically while
the Markdown source and link target remain unchanged. Never write forms such
as `[Lemma 2.4.3](#lem-schur)` or plain `Lemma 2.4.3`.

Cross-file links keep the `.md` extension so mkdocs resolves them.

---

## 5. Other formatting gotchas

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

- **Cross-references** between files use a path with `.md`:
  `[the desired corollary](set-theory.md#cor-finite-unions)`. The trailing `.md` is
  needed for mkdocs to resolve the link.

---

## 6. Self-check — `scripts/check_math.js`

After authoring, always run:

```bash
cd scripts && npm install    # once, installs KaTeX locally
node scripts/check_math.js
```

This renders every `$...$` / `$$...$$` formula through KaTeX and prints
any parse error with file and line; exit code 0 = clean, 1 = errors.

Point it at one file with `node scripts/check_math.js docs/<subject>/<topic>.md`.

---

## 7. End-to-end workflow

```bash
# 1. Write the chapter
$EDITOR docs/<subject>/<topic>.md

# 2. Self-check
node scripts/check_math.js

# 3. Preview locally
mkdocs serve -a 127.0.0.1:8765   # http://127.0.0.1:8765/math-notes/
```
---

## 8. Quick reference card

| Want to write | Use |
|---|---|
| Inline math | `$x \in A$` |
| Block math (own paragraph, **not** inside a list) | `$$ ... $$` — blank line before **and** after; none before the closing `$$` |
| Definition / Theorem / Lemma / etc. | `!!! <kind> "Title"` then 4-space-indented body |
| Collapsible proof | `??? proof "Proof"` |
| Collapsible idea or proof strategy | `??? idea "Idea"` — use sparingly |
| Cross-reference | `[the definition](#def-composition-law)` same page · `[the theorem](groups.md#thm-first-isomorphism)` cross-file |
| Optional stable anchor | `<a id="def-composition-law"></a>` right after the admonition title |
