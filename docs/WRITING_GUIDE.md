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
- Name chapters and sections by their central mathematical concept, purpose,
  or line of development. Prefer a short, established topic name over a list
  of the definitions, methods, or theorems appearing in the section. Use an
  enumerative title only when no accurate unifying title is available; do not
  force a vague umbrella term merely to avoid a list. Apply the naming process
  in §1.2 before finalising the table of contents.
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
- For **Fundamental Algebra and Analysis**, use **English chapter names** in
  the navigation and course chapter list. Name the volume groups **FAA I**
  and **FAA II**, without appended summaries of their contents.

### 1.2 Naming chapters and sections

**以对象或问题立名，以全节主线定范围，以惯用术语求简洁。**
A title identifies the mathematical subject a reader comes here to learn.
It need not list everything the section contains. Establishing the subject
and choosing its wording are separate decisions: a polished title cannot
repair a mistaken judgment about what is central.

**The standard**

- Follow the best FAA examples: `Tensor Product`, `Linear Equations`,
  `Yoneda Lemma`, `Orthogonal Projection`. A familiar object, problem,
  property, operation, or central theorem can organise many definitions,
  proofs, and applications. Do not copy every existing FAA heading.
- Choose the appropriate conceptual scope, not the most specific conclusion
  or the broadest field containing it. A method can be the subject when the
  section actually teaches that method; a named theorem can organise a whole
  section. Neither is automatically just a tool.
- Prefer a short, established noun phrase. Keep qualifiers that matter, such
  as finite/infinite or existence/computability; there is no fixed word limit.
  Chapter context can supply understood information: `Composition` works
  inside `Correspondence`.
- Prefer a coherent topic to a list. `A and B` is appropriate when their
  relationship is the subject. Avoid filler, slogans, and invented umbrella
  terms. Secondary details usually belong in the opening paragraph.

**Procedure: establish the subject before generating titles**

For a straightforward section with a confirmed subject and a suitable
standard name, use that name after checking its scope. For a new, disputed,
or mixed section, use the following process. Keep the working record concise;
do not insert it into the published notes or create paperwork for every
heading.

1. **Map the content without proposing a title.** Read the whole section and
   the neighbouring sections. Group the material into a few meaningful blocks
   (usually three to six), with a source location and a factual description
   of what each block does. Then identify its role: introduces language,
   develops an object/problem, provides a tool, or gives an application or
   supplementary observation. Explain the actual relationship: “defines the
   programs whose termination will be investigated” is evidence; “this is the
   main idea” is not. Mark a role as uncertain when necessary. A logical
   dependency alone does not establish teaching priority: the subject may
   lead to a final application without becoming subordinate to it.
2. **Determine the intended hierarchy from evidence.** The author's explicit
   direction, including later corrections, settles editorial intent. Otherwise
   use the source's stated aim, questions, and the development of definitions
   and results together with neighbouring material. Distinguish explicit
   intent from your inference. Existing headings, model-written introductions,
   and your own previous summaries are not independent proof of that intent.
   Do not select the first definition, last theorem, longest proof, or most
   frequent keyword by default; theorem/remark labels alone do not settle
   the issue either.
3. **State the scope before choosing words.** Record: “The subject is ___;
   the reader should learn ___; ___ serves as preparation/application/an
   additional remark.” Attach the decisive source location or author
   instruction. Do not invent an intention to fill the blanks. Keep this
   scope fixed while comparing names unless new evidence changes it. A
   supplementary observation can have a long proof and still be supplementary.
4. **Compare two or three plausible names when needed.** Use established
   terms supported by the material. For each candidate, identify the specific
   content it leads a reader to expect and the strongest concrete objection:
   does it promote a tool or remark into the subject, miss a central block,
   or promise a broader theory than is taught? Reject those failures first.
   Among the surviving candidates, prefer the one that distinguishes this
   section from its neighbours, then the shorter natural wording. Do not
   assign numerical scores that let brevity compensate for the wrong subject.
   If both names are accurate, say so and choose by established usage or
   economy; do not invent a flaw to justify the choice.
   Two synonyms are not a meaningful comparison; nor must you invent weak
   alternatives to a clearly suitable name.
5. **Read the resulting table of contents.** Does the title say what this
   section contributes beyond the chapter title and adjacent sections? If it
   could replace nearly every heading in the chapter, identify the missing
   distinction. Preserve an existing title that already works. Only after
   the subject and title are supported should the opening paragraph be aligned
   with them. Review affected navigation labels and incoming heading links.

A compact working record for an ambiguous case is enough:

```text
Content blocks and roles: ... [locations]
Subject and basis: ... [author-confirmed / source-stated / inferred]
Supporting or supplementary material: ...
Candidate A / B: ...
Reason for choosing: ... [scope objection, or usage/economy if both fit]
Chosen title, or unresolved scope question: ...
```

This is a record of evidence and the decision, not a request for a long
explanation. It should expose an unsupported subject judgment before a title
is accepted. A second review should check that judgment against the sources,
not merely endorse the first model's explanation.

**Calibration examples: the evidence determines the name**

The intentions below are supplied facts for each example, not intentions a
model may invent. The two halting/Ramsey rows deliberately use related
material with different teaching aims. This site's Ramsey section follows
**the first of those two rows**, as explicitly confirmed by the author.

| Evidence about the subject and supporting material | Suitable title | Tempting mistake |
|---|---|---|
| A module is constructed to represent multilinear maps; pure tensors, its universal property, and associativity develop that object. | `Tensor Product` | Listing those ingredients instead of naming their object. |
| Echelon forms and elementary matrices are introduced to solve linear systems; elimination may take the longest proof. | `Linear Equations` | `Elementary Matrices` promotes a tool because it occupies many lines. |
| The Yoneda bijection is established and then used to obtain the embedding. | `Yoneda Lemma` | Rejecting a theorem name merely because it does not name an object. |
| The author centres the discussion on program termination; noncomputable homogeneous sets are an additional remark. | `The Halting Problem` | `Computability of Homogeneous Sets` promotes the supplementary conclusion; `Effective Colourings` selects a local construction. |
| In a different section, the stated question is whether computable colourings admit computable infinite homogeneous sets; halting is recalled only for a reduction. | `Computability of Homogeneous Sets` | `The Halting Problem` promotes the proof tool. This is not the author's stated intent for the present section. |
| The stated aim is to learn how random choice proves existence; graphs and set systems illustrate the method. | `The Probabilistic Method` | `Random Graphs` covers only one example. A method is an appropriate title here. |
| The section compares direct images and preimages and develops their contrasting behaviour under set operations. | `Image and Preimage` | Banning “and” mechanically, or replacing the pair with the less informative `Mappings`. |

The user's correction about the halting problem is a **confirmed scope
choice**, not merely a preferred wording. Its target is the
[final section of Ramsey Theory](combinatorics/ramsey-theory.md#def-computable-function);
the basis is the author's clarification on 2026-10-14 that this section
focuses on the halting problem and the noncomputability observation is extra.
Retain this decision in later rewrites unless
the author changes the aim or the mathematical unit changes. Do not turn it
into a new shortcut such as “always name the foundational problem” or “the
last result is never central.”

**When the subject remains uncertain**

A difficult title can indicate missing context or a grouping problem, but
neither follows just because a short name is hard to find. For example, the
Schur application and the infinite-Ramsey/compactness development in the
current `Ramsey and Compactness` section warrant a review of their relation.
Look for independently developed topics with no supported common purpose
before regrouping; preserve all source content (§2.1). Do not rewrite the
introduction or rearrange the mathematics just to justify a favourite title.

If two materially different subjects remain plausible, record both and the
missing evidence. Retain an adequate existing name, or use a conservative
provisional name supported by the source. Ask one focused question about
teaching intent only when that unresolved choice changes the title or
structure substantially. Do not ask about minor wording choices, re-ask an
author-confirmed decision, or label your inference as the author's intent.

### 1.3 Checking whether a model can apply the naming guide

This procedure makes the decision inspectable; it does not guarantee that
any particular model will infer mathematical structure correctly. More rules
cannot recover teaching intent absent from the source. Do not claim that a
model is reliable because it can repeat the motto or reproduce the examples.

When evaluating a model or revising this workflow, rather than during every
ordinary chapter edit:

- Use a small set of real sections whose intended subjects have been reviewed
  by the author. Keep some cases out of the prompt examples. Give the model
  the actual source and available intent, not a summary that already supplies
  the answer; hide the target titles when testing title generation.
- Include a long auxiliary proof, a final application, a method that really
  is the subject, a legitimate paired title, and incomplete context. Add a
  paired case in which similar mathematics has a different explicit teaching
  aim. The model should follow the aim, not memorise a topic-to-title mapping.
- Judge subject selection separately from wording. Check whether the chosen
  subject has evidence, whether the title preserves that subject and its
  scope, and only then whether it is concise. Accept equivalent good titles;
  exact string matching and the model's own “all checks passed” are inadequate.
- Check stability by expanding a supplementary remark or moving an example
  without changing its stated role: that alone should not change the subject.
  Conversely, an explicit change of teaching aim may require a different
  name. An author or informed reviewer should inspect failures; repeated
  runs of the target model are needed before claiming consistent performance.

If the model handles wording well but repeatedly misidentifies the subject,
have an author or a more capable reviewer settle the scope first and pass
that decision to the writer. For a disputed case, preserve a short editorial
note in this guide or an agreed persistent project record: section path or
stable anchor, confirmed subject, and the source of the decision. Include it
in later working context; do not make the next writer infer it again. Such
records are unnecessary for routine, unambiguous headings. Repeating
“summarise better” is not a substitute for this missing input.

---

## 2. Note-writing style

### 2.1 Source fidelity and the no-deletion rule

- Treat lecture-board photographs, scans, handouts, and the instructor's
  worked examples as the **minimum required corpus**, not as optional source
  material. The finished notes may add clarification and background, but must
  contain every mathematical definition, statement, construction, proof
  method, example, diagram, and in-class question visible in the supplied
  sources. **Exercise sets may be omitted** unless the user explicitly asks
  to include them; this exception does not permit omitting worked examples
  or proofs presented in the exposition.
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
- Keep a figure and its caption inside the block whose content they explain.
  Figures illustrating a proof or an informal argument belong inside its
  collapsible Proof or Idea block and must collapse with it. Figures explaining
  a definition or example belong inside that definition or example block.
  When correcting this placement, audit the other figures in the affected
  course rather than fixing only the screenshot the user pointed out.
- Display important formulas on their own lines; keep ordinary relations inline
  rather than breaking them out solely for visual effect.
- Use an objective, restrained tone. An occasional “we” may guide the chapter's
  development, but the prose should not sound conversational.
- Make each chapter reasonably self-contained while using numbering and
  cross-references to form a continuous body of notes across chapters.
- Different courses may repeat the definitions they need. A definition in
  another course does not replace a local definition; cross-course links
  may supplement it without making the course dependent on that exposition.

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

## 6. Checks proportionate to the change

- **Small editorial changes need no automated checks.** Renaming a heading,
  correcting spelling, or revising ordinary prose does not require a math
  check, site build, or preview when formulas, block structure, explicit link
  targets, and file paths are unaffected. Do not run checks mechanically after
  every edit.
- **For formula changes, check only the affected files** with
  `scripts/check_math.js`. A full-site build is unnecessary unless the change
  also affects how the math is embedded or rendered.
- **For new chapters, substantial restructuring, or rendering-sensitive
  edits, perform a full verification pass** after the work is complete. This
  includes all of the following:
  - Review the chapter's mathematical structure and its place in the course:
    chapter and section boundaries, titles, content grouping, prerequisite
    order, section granularity, and continuity with neighbouring chapters.
    Reconsider the arrangement if the review reveals an incoherent division
    or a misplaced result; a successful build does not establish that the
    exposition is well organised.
  - Audit source coverage, mathematical statements and proofs, notation, and
    cross-references throughout the revised chapter.
  - Run the full math self-check and a strict site build.
  - Inspect the rendered chapter, including its table of contents, numbering,
    formulas, lists, and admonitions.
- Outside these full-verification cases, broaden a check only when a check
  fails or there is evidence of a problem. After verification succeeds, repeat
  checks only if a subsequent edit affects what was checked. A user request
  to verify the result takes precedence over the small-change exemption.

When a math check is warranted, run:

```bash
cd scripts && npm install    # once, installs KaTeX locally
node scripts/check_math.js
```

This renders every `$...$` / `$$...$$` formula through KaTeX and prints
any parse error with file and line; exit code 0 = clean, 1 = errors.

For an isolated formula edit, check the affected file with
`node scripts/check_math.js docs/<subject>/<topic>.md`. For a full
verification pass, omit the file argument to check all notes.

---

## 7. End-to-end workflow

When drafting a new section or extending an existing one, include the naming
pass in §1.2: establish the subject from evidence before choosing its name,
then check the titles together in the table of contents. Carry forward any
author-confirmed scope decisions. Do this even when no build is required;
§1.3 concerns evaluating the workflow, not extra tests on every chapter edit.

```bash
# 1. Write the chapter
$EDITOR docs/<subject>/<topic>.md

# 2. For a new chapter, substantial restructuring, or complex formatting,
#    review mathematical structure, source coverage, and cross-references

# 3. Run the full math check and strict build
node scripts/check_math.js
mkdocs build --strict

# 4. Inspect the rendered chapter, including the table of contents
mkdocs serve -a 127.0.0.1:8765   # http://127.0.0.1:8765/math-notes/
```

For a small editorial edit, finish after step 1. For an isolated formula edit,
run the math check on the affected file. New chapters, substantial
restructuring, and complex formatting require the complete review and checks
in steps 2–4.
---

## 8. Quick reference card

| Want to write | Use |
|---|---|
| Chapter or section title | A short name for the central mathematical object or problem; apply the scope and table-of-contents checks in §1.2 |
| Inline math | `$x \in A$` |
| Block math (own paragraph, **not** inside a list) | `$$ ... $$` — blank line before **and** after; none before the closing `$$` |
| Definition / Theorem / Lemma / etc. | `!!! <kind> "Title"` then 4-space-indented body |
| Collapsible proof | `??? proof "Proof"` |
| Collapsible idea or proof strategy | `??? idea "Idea"` — use sparingly |
| Cross-reference | `[the definition](#def-composition-law)` same page · `[the theorem](groups.md#thm-first-isomorphism)` cross-file |
| Optional stable anchor | `<a id="def-composition-law"></a>` right after the admonition title |
