# Set Theory

This chapter fixes the set-theoretic vocabulary used throughout the course:
elements, subsets, conditions, the quantifiers $\forall$ and $\exists$, the
sufficient / necessary distinction, unions, intersections, and the
Cartesian product.

## Roster Notation

!!! definition "Definition (Set, element, equality)"
    <a id="def-2-1-1"></a>

    + A **set** is a well-defined collection of distinct objects.
    + An object belonging to a set is called an **element** of the set.
    + Two sets $A$ and $B$ are **equal**, written $A = B$, if they have
      exactly the same elements.
    + If $A$ is a set and $x$ is an object, $x \in A$ means "$x$ is an
      element of $A$", and $x \notin A$ means the negation.

!!! example "Example (Set notation (roster))"
    <a id="ex-2-1-2"></a>
    $\{1, 2, 3\} = \{3, 2, 1\} = \{1, 1, 2, 3\}$. More generally, given an
    index set $I$ and objects $x_i$ for $i \in I$, we may form
    $\{x_i \mid i \in I\}$.

!!! example "Example (Set-builder examples)"
    <a id="ex-2-1-3"></a>
    $\{2k + 1 \mid k \in \mathbb{Z}\}$ is the set of all odd integers.

## Set-builder Notation

!!! definition "Definition (Condition on a set)"
    <a id="def-2-2-1"></a>
    Let $A$ be a set and let $P(\cdot)$ be a sentence assigning to every
    $x \in A$ a truth value. We say $P(\cdot)$ is a **condition** on $A$.

!!! definition "Definition (Set-builder notation)"
    <a id="def-2-2-2"></a>
    The set of $x \in A$ satisfying the condition $P(\cdot)$ is denoted

    $$
    \{x \in A \mid P(x)\}.
    $$

!!! example "Example (Set-builder example)"
    <a id="ex-2-2-3"></a>
    $\{x \in \mathbb{R} \mid x > 2\}$ is the open half-line $(2, +\infty)$.

## Subsets and Set Difference

!!! definition "Definition (Subset)"
    <a id="def-2-3-1"></a>
    $A$ is a **subset** of $B$, written $A \subseteq B$, if every element of
    $A$ is an element of $B$. We write $A \subsetneq B$ for proper
    inclusion.

!!! definition "Definition (Power set)"
    <a id="def-2-3-2"></a>
    The **power set** of $A$ is $\mathscr{P}(A) = \{B \mid B \subseteq A\}$.

!!! example "Example (Power-set example)"
    <a id="ex-2-3-3"></a>
    $\mathscr{P}(\varnothing) = \{\varnothing\}$,
    $\mathscr{P}(\mathscr{P}(\varnothing)) = \{\varnothing, \{\varnothing\}\}$.

!!! definition "Definition (set difference** of $B$ by $A$)"
    <a id="def-2-3-4"></a>
    The **set difference** of $B$ by $A$ is

    $$
    B \setminus A = \{x \in B \mid x \notin A\}.
    $$
    When $A \subseteq B$ this is the **complement** of $A$ in $B$.

!!! proposition "Proposition (Empty-set criterion for equality)"
    <a id="prop-2-3-5"></a>
    Let $A \subseteq B$ be sets. Then

    $$
    B \setminus A = \varnothing \iff A = B.
    $$

??? proof "Proof ($(\Rightarrow)$)"
    $(\Rightarrow)$ If $B \setminus A = \varnothing$, then no element of $B$
    lies outside $A$, so $B \subseteq A$. Combined with $A \subseteq B$ this
    gives $A = B$.
    $(\Leftarrow)$ Immediate from the definition of complement.

## Quantifiers

!!! definition "Definition (Universal and existential quantifiers)"
    <a id="def-2-4-1"></a>
    Let $A$ be a set and $P(\cdot)$ a condition on $A$.

    + $\forall x \in A,\, P(x)$ is the statement $\{x \in A \mid P(x)\} = A$.
    + $\exists x \in A,\, P(x)$ is the statement $\{x \in A \mid P(x)\} \neq \varnothing$.

!!! example "Example (Quantifier vacuous cases)"
    <a id="ex-2-4-2"></a>
    $\forall x \in \varnothing,\, P(x)$ is **true** (vacuously), while
    $\exists x \in \varnothing,\, P(x)$ is **false**.

!!! theorem "Theorem (Quantifier duality)"
    <a id="thm-2-4-3"></a>
    Let $A$ be a set and $P(\cdot)$ a condition on $A$.

    + $\exists x \in A,\, \lnot P(x)$ has the opposite truth value of
      $\forall x \in A,\, P(x)$.
    + $\forall x \in A,\, \lnot P(x)$ has the opposite truth value of
      $\exists x \in A,\, P(x)$.

??? proof "Proof ($\{x \in A \mid \lnot P(x)\}$)"
    $\{x \in A \mid \lnot P(x)\}$ is the complement of $\{x \in A \mid P(x)\}$
    in $A$, and a set is empty iff its complement in $A$ equals $A$.

## Sufficient and Necessary Conditions

!!! definition "Definition (Sufficient and necessary conditions)"
    <a id="def-2-5-1"></a>
    Let $P(\cdot), Q(\cdot)$ be conditions on a set $A$.

    + $P$ is **sufficient** for $Q$ (and $Q$ is **necessary** for $P$) if
      $\{x \in A \mid P(x)\} \subseteq \{x \in A \mid Q(x)\}$.
    + $P$ and $Q$ are **equivalent** if the two sets are equal.

!!! proposition "Proposition (Sufficient / necessary reformulations)"
    <a id="prop-2-5-2"></a>
    With the notation above:

    + $P$ is sufficient for $Q$ iff $\forall x \in A,\, P(x) \Rightarrow Q(x)$.
    + $Q$ is necessary for $P$ iff $\forall x \in A,\, Q(x) \Rightarrow P(x)$.
    + $P$ and $Q$ are equivalent iff $\forall x \in A,\, P(x) \Leftrightarrow Q(x)$.

??? proof "Proof (Russell's paradox)"
    Direct unfolding of the subset / equality of solutions of two conditions.

!!! remark "Remark (Russell's paradox)"
    <a id="rem-2-5-3"></a>
    The condition $P(A) \equiv (A \notin A)$ on the class of all sets yields
    a contradiction: the "set of all sets" cannot itself be a set. We will
    revisit this when discussing universes in FAA II.

## Union

!!! definition "Definition (Union of a family)"
    <a id="def-2-6-1"></a>
    Let $I$ be a set and $(A_i)_{i \in I}$ a family of sets parametrized by
    $I$. The **union** $\bigcup_{i \in I} A_i$ is the set of all elements of
    the $A_i$'s:

    $$
    x \in \bigcup_{i \in I} A_i \iff \exists i \in I,\ x \in A_i.
    $$

!!! proposition "Proposition (Union is contained in any upper bound)"
    <a id="prop-2-6-2"></a>
    $\displaystyle \bigcup_{i \in I} A_i \subseteq B$ if and only if
    $\forall i \in I,\ A_i \subseteq B$.

!!! corollary "Corollary (Union of solutions is the solution set)"
    <a id="cor-2-6-3"></a>
    Let $P_i(\cdot)$ be conditions on $B$. Then

    $$
    \{x \in B \mid \exists i \in I,\, P_i(x)\} = \bigcup_{i \in I} \{x \in B \mid P_i(x)\}.
    $$

!!! proposition "Proposition (Union distributes over set difference)"
    <a id="prop-2-6-4"></a>
    $\displaystyle \Big(\bigcup_{i \in I} A_i\Big) \setminus B = \bigcup_{i \in I} (A_i \setminus B)$.

## Intersection

!!! definition "Definition (Intersection of a family)"
    <a id="def-2-7-1"></a>
    Let $I \neq \varnothing$ and $(A_i)_{i \in I}$ a family of sets. The
    **intersection** $\bigcap_{i \in I} A_i$ is the set of common elements:

    $$
    x \in \bigcap_{i \in I} A_i \iff \forall i \in I,\ x \in A_i.
    $$

!!! remark "Remark (Why the empty intersection is undefined)"
    <a id="rem-2-7-2"></a>
    The intersection of an empty family cannot be defined: it would have to
    contain every mathematical object, contradicting Russell.

!!! proposition "Proposition (Intersection is contained in any lower bound)"
    <a id="prop-2-7-3"></a>
    Let $I \neq \varnothing$, $(A_i)_{i \in I}$ a family and $B$ a set. Then
    $\displaystyle B \subseteq \bigcap_{i \in I} A_i$ iff
    $\forall i \in I,\ B \subseteq A_i$.

??? proof "Proof ($(\Rightarrow)$ For $x \in B \subseteq \bigcap_i A_i$)"
    $(\Rightarrow)$ For $x \in B \subseteq \bigcap_i A_i$ we have
    $x \in A_i$ for every $i$, so $B \subseteq A_i$ for every $i$.
    $(\Leftarrow)$ For $x \in B$ and every $i \in I$ we have $x \in A_i$;
    therefore $x \in \bigcap_i A_i$, so $B \subseteq \bigcap_i A_i$.

!!! corollary "Corollary (Intersection of solutions is the solution set)"
    <a id="cor-2-7-4"></a>
    Let $B$ a set, $I \neq \varnothing$ and $P_i(\cdot)$ conditions on $B$.
    Then

    $$
    \{x \in B \mid \forall i \in I,\, P_i(x)\} = \bigcap_{i \in I} \{x \in B \mid P_i(x)\}.
    $$

!!! proposition "Proposition (Intersection distributes over set difference)"
    <a id="prop-2-7-5"></a>
    Let $B$ be a set, $I \neq \varnothing$ and $(A_i)_{i \in I}$ a family.

    1. $\displaystyle B \cap \Big(\bigcup_{i \in I} A_i\Big) = \bigcup_{i \in I} (B \cap A_i)$.
    2. $\displaystyle B \cup \Big(\bigcap_{i \in I} A_i\Big) \subseteq \bigcap_{i \in I} (B \cup A_i)$,
       with equality when $B \subseteq \bigcap_i A_i$ or $I$ is a singleton.
    3. $\displaystyle B \setminus \Big(\bigcup_{i \in I} A_i\Big) = \bigcap_{i \in I} (B \setminus A_i)$.
    4. $\displaystyle B \setminus \Big(\bigcap_{i \in I} A_i\Big) = \bigcup_{i \in I} (B \setminus A_i)$.

??? proof "Proof ((1) and (3)–(4) follow from [Corollary 2.7.4](#cor-2-7-4) and)"
    (1) and (3)–(4) follow from [Corollary 2.7.4](#cor-2-7-4) and
    [Corollary 2.6.3](#cor-2-6-3) after passing to characteristic conditions.
    (2) is similar, with the additional observation that the reverse
    inclusion requires $\bigcap_i A_i \subseteq A_i$ for every $i$.

## Cartesian Product

!!! definition "Definition (Cartesian product)"
    <a id="def-2-8-1"></a>
    The **Cartesian product** of $A$ and $B$ is

    $$
    A \times B = \{(x, y) \mid x \in A,\, y \in B\}.
    $$
    Iterating, $A_1 \times \cdots \times A_n$ is the set of $n$-tuples
    $(x_1, \dots, x_n)$ with $x_i \in A_i$.

!!! proposition "Proposition (Kuratowski encoding of ordered pairs)"
    <a id="prop-2-8-2"></a>
    For any objects $x, y, x', y'$,

    $$
    \{\{x\}, \{x, y\}\} = \{\{x'\}, \{x', y'\}\}
    \iff x = x' \text{ and } y = y'.
    $$

??? proof "Proof ($(\Leftarrow)$ Trivial)"
    $(\Leftarrow)$ Trivial.
    $(\Rightarrow)$ If $x \neq x'$, then $\{x\} \neq \{x'\}$, so
    $\{x\} = \{x', y'\}$ and hence $x = x'$, contradiction. So $x = x'$.
    Suppose $y \neq y'$. Then $\{x, y\} \neq \{x, y'\}$. By the same argument
    (after observing $x = x'$), the only way $\{\{x\}, \{x, y\}\}$ and
    $\{\{x\}, \{x, y'\}\}$ can coincide is $\{x, y\} = \{x, y'\}$ and
    $\{x\} = \{x, y'\}$; the first forces $y = y'$, contradiction. So
    $y = y'$.

!!! remark "Remark (Kuratowski encoding is implemented by arithmatex)"
    <a id="rem-2-8-3"></a>
    Proposition 2.8.2 shows that ordered pairs can be defined purely in
    terms of sets, via the **Kuratowski encoding**
    $(x, y) := \{\{x\}, \{x, y\}\}$.

