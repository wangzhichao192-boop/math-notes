# Sets, Cardinality, Choice, and Quotients

Abstract algebra begins with sets equipped with operations. This chapter
records the set-theoretic facts needed to construct those sets, compare their
sizes, and pass operations to quotients.

## Set Formation

!!! definition "Definition (Separation)"
    <a id="def-1-1-1"></a>
    Given a set $A$ and a condition $P(x)$, the **Axiom Schema of
    Separation** forms the subset

    $$
    \{x \in A \mid P(x)\}.
    $$

    It does not assert that an unrestricted collection
    $\{x \mid P(x)\}$ is a set.

!!! proposition "Proposition (Relative Russell set)"
    <a id="prop-1-1-2"></a>
    For every set $A$, the set

    $$
    R_A = \{x \in A \mid x \notin x\}
    $$

    exists and satisfies $R_A \notin A$.

??? proof "Proof"
    Separation gives the set $R_A$. If $R_A \in A$, then its defining
    condition gives

    $$
    R_A \in R_A \iff R_A \notin R_A,
    $$

    a contradiction. Hence $R_A \notin A$.

!!! corollary "Corollary (No universal set)"
    <a id="cor-1-1-3"></a>
    There is no set containing every set.

??? proof "Proof"
    A universal set $U$ would contain $R_U$, contrary to
    [Proposition 1.1.2](#prop-1-1-2).

!!! remark "Remark (ZF and ZFC)"
    <a id="rem-1-1-4"></a>
    We work in Zermelo--Fraenkel set theory (**ZF**). Its axioms justify
    standard constructions such as pairs, unions, power sets, natural
    numbers, definable subsets, and definable images. **ZFC** is ZF together
    with the Axiom of Choice. Russell's paradox is avoided by restricting
    set formation, not by the Axiom of Foundation or the Axiom of Choice.

## Maps and Cardinality

!!! definition "Definition (Map)"
    <a id="def-1-2-1"></a>
    A **map** $f : A \to B$ assigns to each $a \in A$ a unique element
    $f(a) \in B$. Its image is

    $$
    \operatorname{im}(f) = \{f(a) \mid a \in A\} \subseteq B.
    $$

    + It is **injective** if $f(a) = f(a')$ implies $a = a'$.
    + It is **surjective** if every $b \in B$ is $f(a)$ for some $a \in A$.
    + It is **bijective** if it is both injective and surjective.

!!! definition "Definition (Cardinal comparison)"
    <a id="def-1-2-2"></a>
    For sets $A$ and $B$:

    + $A \preccurlyeq B$ means that there is an injection $A \to B$.
    + $A \approx B$ means that there is a bijection $A \to B$.
    + $|A| = |B|$ means $A \approx B$.
    + $|A| < |B|$ means $A \preccurlyeq B$ but $A \not\approx B$.

!!! theorem "Theorem (Cantor--Schroeder--Bernstein)"
    <a id="thm-1-2-3"></a>
    If $A \preccurlyeq B$ and $B \preccurlyeq A$, then $A \approx B$.

!!! definition "Definition (Finite and countable sets)"
    <a id="def-1-2-4"></a>
    A set is **finite** if it is bijective with
    $\{0,\ldots,n-1\}$ for some $n \in \mathbb{N}$. It is
    **countably infinite** if it is bijective with $\mathbb{N}$, and
    **countable** if it is finite or countably infinite. Write
    $\aleph_0 = |\mathbb{N}|$.

!!! example "Example (Countable sets)"
    <a id="ex-1-2-5"></a>
    The sets $\mathbb{Z}$, $\mathbb{N}^2$, and $\mathbb{Q}$ are countable.
    For example, the Cantor pairing map

    $$
    \pi(m,n) = \frac{(m+n)(m+n+1)}{2} + n
    $$

    is a bijection $\mathbb{N}^2 \to \mathbb{N}$. Finite strings over a
    countable alphabet and finite unions of countable sets are also
    countable. In ZF, a countable union of countable sets need not be
    countable; choosing compatible enumerations may require Choice.

## Cantor's Theorem and the Continuum

!!! theorem "Theorem (Cantor)"
    <a id="thm-1-3-1"></a>
    For every set $A$, there is no surjection $A \to \mathscr{P}(A)$.
    Consequently,

    $$
    |A| < |\mathscr{P}(A)|.
    $$

??? proof "Proof"
    Let $f : A \to \mathscr{P}(A)$ and use Separation to form

    $$
    D_f = \{a \in A \mid a \notin f(a)\}.
    $$

    If $D_f = f(d)$ for some $d \in A$, then
    $d \in D_f \iff d \notin f(d) = D_f$, a contradiction. Thus $f$ is
    not surjective. Since $a \mapsto \{a\}$ is injective from $A$ to
    $\mathscr{P}(A)$, the strict inequality follows.

!!! remark "Remark (Russell versus Cantor)"
    <a id="rem-1-3-2"></a>
    Russell's expression $\{x \mid x \notin x\}$ is unbounded and therefore
    does not define a set. Cantor's diagonal set $D_f$ is a legitimate
    subset of the given set $A$; the contradiction disproves the
    surjectivity of $f$, not the existence of $D_f$.

!!! proposition "Proposition (Cardinality of the continuum)"
    <a id="prop-1-3-3"></a>
    Let $\mathfrak{c} = |\mathbb{R}|$. Then

    $$
    \mathfrak{c} = 2^{\aleph_0} = |\mathscr{P}(\mathbb{N})|.
    $$

??? proof "Proof"
    Characteristic functions identify $\mathscr{P}(\mathbb{N})$ with
    $\{0,1\}^{\mathbb{N}}$. The map

    $$
    S \longmapsto \sum_{n \in S} \frac{2}{3^{n+1}}
    $$

    injects $\mathscr{P}(\mathbb{N})$ into $[0,1]$. Conversely, the lower
    rational cut

    $$
    r \longmapsto \{q \in \mathbb{Q} \mid q < r\}
    $$

    injects $\mathbb{R}$ into $\mathscr{P}(\mathbb{Q})$. Since
    $\mathbb{Q} \approx \mathbb{N}$, their power sets are equipotent.
    Apply [Theorem 1.2.3](#thm-1-2-3).

## Choice and Maximal Objects

!!! axiom "Axiom (Choice)"
    <a id="ax-1-4-1"></a>
    For every indexed family $(X_i)_{i \in I}$ of nonempty sets, there is
    a **choice function** $c$ such that $c(i) \in X_i$ for every $i \in I$.
    Equivalently,

    $$
    \prod_{i \in I} X_i \neq \varnothing.
    $$

!!! definition "Definition (Chains and maximal elements)"
    <a id="def-1-4-2"></a>
    Let $(P,\leq)$ be a partially ordered set.

    + A **chain** is a subset whose elements are pairwise comparable.
    + An **upper bound** of $C \subseteq P$ is an element $u \in P$ such
      that $c \leq u$ for every $c \in C$.
    + An element $m \in P$ is **maximal** if $m \leq p$ implies $p=m$.
    + An element $g \in P$ is **greatest** if $p \leq g$ for every
      $p \in P$.

    A maximal element need not be greatest.

!!! theorem "Theorem (Zorn's lemma)"
    <a id="thm-1-4-3"></a>
    Let $(P,\leq)$ be a nonempty poset. If every chain in $P$ has an upper
    bound in $P$, then $P$ has a maximal element.

!!! theorem "Theorem (Equivalent forms of Choice over ZF)"
    <a id="thm-1-4-4"></a>
    Over ZF, the following statements are equivalent:

    + the Axiom of Choice;
    + every set can be well-ordered;
    + Zorn's lemma;
    + every surjection has a right inverse;
    + every product of nonempty sets is nonempty.

    Thus Zorn's lemma is the form of Choice most often used to construct
    maximal algebraic objects.

## The Continuum Hypothesis

!!! definition "Definition (Continuum Hypothesis)"
    <a id="def-1-5-1"></a>
    In ZFC, $\aleph_1$ denotes the least uncountable cardinal. The
    **Continuum Hypothesis** is

    $$
    \mathrm{CH}: \qquad 2^{\aleph_0} = \aleph_1.
    $$

!!! theorem "Theorem (Goedel--Cohen)"
    <a id="thm-1-5-2"></a>
    If ZFC is consistent, then neither $\mathrm{CH}$ nor
    $\lnot\mathrm{CH}$ is provable in ZFC.

!!! remark "Remark (Independence)"
    <a id="rem-1-5-3"></a>
    Independence does not make $\mathrm{CH}$ both true and false in one
    model. It means that, assuming consistency, there are models of ZFC in
    which $\mathrm{CH}$ holds and models in which it fails. Cantor's theorem,
    the Axiom of Choice, and $\mathrm{CH}$ therefore have three different
    logical statuses.

## Quotients

!!! definition "Definition (Equivalence relation and quotient)"
    <a id="def-1-6-1"></a>
    A relation $\sim$ on $X$ is an **equivalence relation** if it is
    reflexive, symmetric, and transitive. The class of $x \in X$ is

    $$
    [x] = \{y \in X \mid y \sim x\}.
    $$

    The **quotient set** and **quotient map** are

    $$
    X/{\sim} = \{[x] \mid x \in X\},
    \qquad
    q : X \to X/{\sim},\quad q(x)=[x].
    $$

!!! proposition "Proposition (Equivalence classes form a partition)"
    <a id="prop-1-6-2"></a>
    For $x,y \in X$,

    $$
    x \sim y \iff [x]=[y].
    $$

    Hence two equivalence classes are equal or disjoint, and every element
    of $X$ belongs to exactly one class.

??? proof "Proof"
    If $x \sim y$, transitivity and symmetry give $[x]=[y]$. Conversely,
    if $[x]=[y]$, then $x \in [x]=[y]$, so $x \sim y$. If two classes
    intersect, the same argument through a common element shows that they
    are equal.

!!! theorem "Theorem (Universal property of a quotient)"
    <a id="thm-1-6-3"></a>
    Let $f : X \to Y$. The following are equivalent:

    + $x \sim x'$ implies $f(x)=f(x')$;
    + there is a unique map $\bar f : X/{\sim} \to Y$ satisfying
      $f = \bar f \circ q$.

    When these conditions hold, $\bar f([x])=f(x)$.

??? proof "Proof"
    If $f$ is constant on classes, then $\bar f([x])=f(x)$ is independent
    of the representative. Conversely, any map factoring through $q$ is
    constant on classes. Since $q$ is surjective, the formula determines
    $\bar f$ uniquely.

!!! proposition "Proposition (Fibres as a quotient)"
    <a id="prop-1-6-4"></a>
    For a map $f : X \to Y$, define $x \sim_f x'$ if
    $f(x)=f(x')$. Then

    $$
    X/{\sim_f} \longrightarrow \operatorname{im}(f),
    \qquad [x] \longmapsto f(x)
    $$

    is a canonical bijection.

## Sections and Representatives

!!! definition "Definition (Section)"
    <a id="def-1-7-1"></a>
    A **section** or **right inverse** of a surjection $p : X \to Y$ is a
    map $s : Y \to X$ such that $p \circ s = \operatorname{id}_Y$.

!!! proposition "Proposition (Splitting surjections and Choice)"
    <a id="prop-1-7-2"></a>
    Over ZF, the Axiom of Choice is equivalent to the assertion that every
    surjection has a section.

??? proof "Proof"
    Given Choice and a surjection $p : X \to Y$, choose
    $s(y) \in p^{-1}(y)$ for every $y$. Then $p(s(y))=y$.

    Conversely, for a family $(X_i)_{i \in I}$ of nonempty sets, form the
    disjoint union

    $$
    X = \{(i,x) \mid i \in I,\ x \in X_i\}
    $$

    and the surjection $p : X \to I$, $p(i,x)=i$. A section has the form
    $s(i)=(i,c(i))$, where $c(i) \in X_i$; hence $c$ is a choice function.

!!! remark "Remark (Quotient versus section)"
    <a id="rem-1-7-3"></a>
    The quotient $X/{\sim}$ is canonical and exists in ZF. A section of
    its quotient map chooses one representative from every class. Such a
    section is extra, generally noncanonical data, and its existence for
    every quotient requires Choice.

## Descent of Operations

!!! definition "Definition (Binary operation)"
    <a id="def-1-8-1"></a>
    A **binary operation** on $X$ is a map

    $$
    \star : X \times X \to X,
    \qquad (x,y) \longmapsto x \star y.
    $$

!!! proposition "Proposition (Operation-descent criterion)"
    <a id="prop-1-8-2"></a>
    Let $\star$ be a binary operation on $X$ and let $\sim$ be an
    equivalence relation. There is a unique binary operation
    $\bar\star$ on $X/{\sim}$ satisfying

    $$
    [x] \mathbin{\bar\star} [y] = [x \star y]
    $$

    if and only if

    $$
    x \sim x',\ y \sim y'
    \quad\Longrightarrow\quad
    x \star y \sim x' \star y'.
    $$

??? proof "Proof"
    The compatibility condition says exactly that $[x \star y]$ does not
    change when either representative is replaced by an equivalent one;
    hence the displayed formula is well-defined. Conversely, if the
    quotient operation exists, then equivalent inputs have equal classes,
    so their products must also have equal classes. Uniqueness follows
    from the surjectivity of the quotient map.

!!! example "Example (An operation that does not descend)"
    <a id="ex-1-8-3"></a>
    On $\mathbb{Z}$ define $x \sim y$ by $|x|=|y|$. Although
    $1 \sim -1$ and $1 \sim 1$, we have

    $$
    1+1=2 \not\sim 0=(-1)+1.
    $$

    Thus addition does not descend to $\mathbb{Z}/{\sim}$.

!!! remark "Remark (What survives a quotient)"
    <a id="rem-1-8-4"></a>
    Every identity expressed solely through compatible operations descends
    to the quotient. Non-equational properties need not: in
    $\mathbb{Z}/6\mathbb{Z}$, the nonzero classes $[2]$ and $[3]$ have
    product $[0]$.
