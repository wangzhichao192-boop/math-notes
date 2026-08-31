# Binary Relations

A **binary relation** on a set $X$ is a correspondence $X \to X$, i.e. a
subset of $X \times X$. This chapter develops the elementary taxonomy of
binary relations and the partial-order notions that will return throughout
the rest of the course.

## Generalities

!!! definition "Definition (Binary relation)"
    <a id="def-4-1-1"></a>
    Let $X$ be a set. A **binary relation** on $X$ is a correspondence from
    $X$ to $X$. If $R$ is such a relation and $(x, y) \in \Gamma_R$, we write
    $x R y$.

!!! example "Example (identity** relation on $X$)"
    The **identity** relation on $X$ is the correspondence
    $\operatorname{Id}_X = (X, X, \{(x, x) \mid x \in X\})$; we denote it
    by "$=$".

!!! definition "Definition (Complement of a relation)"
    <a id="def-4-1-2"></a>
    The **complement** of a binary relation $R$ on $X$, written $\lnot R$
    or $R^c$, is defined by
    $$
    x \, \lnot R \, y \iff (x, y) \notin \Gamma_R.
    $$

## Equivalence Relations

!!! definition "Definition (Reflexive / symmetric / transitive)"
    <a id="def-4-2-1"></a>
    Let $R$ be a binary relation on $X$.

    + $R$ is **reflexive** if $\forall x \in X,\ x R x$.
    + $R$ is **symmetric** if $\forall (x, y) \in X^2,\ x R y \Rightarrow y R x$.
    + $R$ is **transitive** if $x R y \wedge y R z \Rightarrow x R z$.
    + $R$ is an **equivalence relation** if it is reflexive, symmetric, and
      transitive.

!!! definition "Definition (Equivalence class and quotient)"
    <a id="def-4-2-2"></a>
    Let $\sim$ be an equivalence relation on $X$. The **equivalence class**
    of $x \in X$ is
    $$
    [x] := \{y \in X \mid y \sim x\}.
    $$
    The quotient $X / \{\sim\} = \{[x] \mid x \in X\}$ is a partition of $X$:
    $X = \bigsqcup_{A \in X / \{\sim\}} A$.

!!! proposition "Proposition (Equivalence classes are disjoint or equal)"
    <a id="prop-4-2-3"></a>
    For every $(x, y) \in X^2$, either $[x] = [y]$ or $[x] \cap [y] = \varnothing$.

!!! proposition "Proposition (Quotient map from a function)"
    <a id="prop-4-2-4"></a>
    Let $f : X \to Y$ be a mapping and define $x \sim y \iff f(x) = f(y)$.
    Then there exists a unique $\tilde f : X / \{\sim\} \to Y$ with
    $\tilde f \circ \pi = f$, where $\pi : X \to X / \{\sim\}$ is the projection.

## Partial Orders

!!! definition "Definition (Partial order / total order)"
    <a id="def-4-3-1"></a>
    A binary relation $\leq$ on $X$ is a **partial order** if it is reflexive,
    antisymmetric ($x \leq y \wedge y \leq x \Rightarrow x = y$), and
    transitive. The pair $(X, \leq)$ is a **partially ordered set** (poset).
    It is a **total order** if in addition $\forall (x, y) \in X^2,\ x \leq y$
    or $y \leq x$.

!!! example "Example (Strict partial order)"
    $(\mathbb{R}, \leq)$ is totally ordered. $(\mathbb{N}, \mid)$ (divisibility)
    is partially ordered.

!!! definition "Definition (Strict partial order)"
    <a id="def-4-3-2"></a>
    The **strict partial order** associated with a partial order $\leq$ is
    $$
    x < y \iff x \leq y \wedge x \neq y.
    $$

## Monotonic Functions

!!! definition "Definition (Increasing / decreasing function)"
    <a id="def-4-4-1"></a>
    Let $f : I \to X$ be a function between posets.

    + $f$ is **increasing** (resp. **strictly increasing**) if
      $x < y \Rightarrow f(x) \leq f(y)$ (resp. $f(x) < f(y)$).
    + $f$ is **decreasing** (resp. **strictly decreasing**) if
      $x < y \Rightarrow f(x) \geq f(y)$ (resp. $f(x) > f(y)$).

    A **monotonic** function is either increasing or decreasing.

!!! proposition "Proposition (Composite of monotonic functions)"
    <a id="prop-4-4-2"></a>
    Let $f, g$ be functions between posets. If $f$ and $g$ are both
    increasing or both decreasing, then $g \circ f$ is increasing. If one
    is increasing and the other is decreasing, $g \circ f$ is decreasing.

!!! proposition "Proposition (Injective + monotonic = strictly monotonic)"
    <a id="prop-4-4-3"></a>
    An injective monotonic function between posets is strictly monotonic.

## Bounds and Suprema

!!! definition "Definition (Upper / lower bound)"
    <a id="def-4-5-1"></a>
    Let $(X, \leq)$ be a poset and $A \subseteq X$.

    + An **upper bound** of $A$ is $M \in X$ with $\forall a \in A,\ a \leq M$.
    + A **lower bound** of $A$ is $m \in X$ with $\forall a \in A,\ m \leq a$.

    Write $A^u$ for the set of upper bounds of $A$ in $X$, and $A^l$ for
    the lower bounds.

!!! definition "Definition (Greatest / least / supremum / infimum)"
    <a id="def-4-5-2"></a>
    + $M \in A$ is the **greatest element** of $A$ if $M$ is an upper bound
      of $A$; denote it $\max_{\leq} A$ (or $\max A$).
    + $m \in A$ is the **least element** of $A$ if $m$ is a lower bound of
      $A$; denote it $\min_{\leq} A$.
    + A **supremum** of $A$ in $X$ is the least element of $A^u$; write
      $\sup_{(X, \leq)} A$. An **infimum** is the greatest element of $A^l$;
      write $\inf_{(X, \leq)} A$.

!!! proposition "Proposition (sup and max coincide under inclusion)"
    <a id="prop-4-5-3"></a>
    Let $(X, \leq)$ be a poset and $A \subseteq Z \subseteq Y \subseteq X$.

    1. If $\max A$ exists, it is also the supremum of $A$ in $Y$.
    2. If $\sup_{(Y, \leq)} A$ exists and belongs to $Z$, it is also the
       supremum of $A$ in $Z$.

??? proof "Proof ((1) $\max A$)"
    (1) $\max A$ is an upper bound of $A$ in $X$, hence in $Y$. If
    $M \in A^u_Y$, then $\max A \leq M$ since $\max A \in A$. So
    $\max A = \min A^u_Y$.
    (2) Any upper bound of $A$ in $Z$ is an upper bound of $A$ in $Y$, so
    $\sup_Y A \leq M$. Since $\sup_Y A \in Z$, it is the least such.

## Intervals

!!! definition "Definition (Interval)"
    <a id="def-4-6-1"></a>
    Let $(X, \leq)$ be a poset. For $(a, b) \in X^2$, define
    $$
    [a, b] := \{x \in X \mid a \leq x \leq b\}.
    $$
    Similarly $[a, b[$, $]a, b]$, $]a, b[$.

!!! definition "Definition (Dense order)"
    <a id="def-4-6-2"></a>
    A poset $(X, \leq)$ is **dense** if for all $x < z$ in $X$, the open
    interval $]x, z[$ is non-empty.

## Well-ordered Sets

!!! definition "Definition (Well-ordered set)"
    <a id="def-4-7-1"></a>
    A poset $(X, \leq)$ is **well-ordered** if every non-empty subset of
    $X$ has a least element.

!!! axiom "Axiom: N is well-ordered"
    <a id="ax-4-7-2"></a>
    $(\mathbb{N}, \leq)$ is a well-ordered set.

!!! theorem "Theorem (Transfinite induction)"
    <a id="thm-4-7-3"></a>
    Let $(X, \leq)$ be a well-ordered set and $P(\cdot)$ a condition on
    $X$. If
    $$
    \forall x \in X,\ \bigl(\forall y \in X_{<x},\ P(y)\bigr) \Rightarrow P(x),
    $$
    then $\forall x \in X,\ P(x)$.

??? proof "Proof ($A = \{x \in X \mid \lnot P(x)\}$)"
    Let $A = \{x \in X \mid \lnot P(x)\}$. If $A \neq \varnothing$, let $x \in A$
    be its least element. Then $\forall y \in X_{<x},\ P(y)$ is true, which
    contradicts the assumption.

## Order-completeness

!!! definition "Definition (Order-complete poset)"
    <a id="def-4-8-1"></a>
    A poset $(X, \leq)$ is **order-complete** if every subset of $X$ has a
    supremum in $X$.

!!! axiom "Axiom: extended R is order-complete"
    <a id="ax-4-8-2"></a>
    The extended real line $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$
    with the order extending that of $\mathbb{R}$ is order-complete.

!!! theorem "Theorem (Knaster–Tarski fixed point)"
    <a id="thm-4-8-3"></a>
    Let $(X, \leq)$ be order-complete and $f : X \to X$ increasing. Then
    the set $F = \{x \in X \mid f(x) = x\}$ of fixed points of $f$ is
    itself order-complete. In particular $F \neq \varnothing$.

??? proof "Proof ($A \subseteq F$. Set $m := \inf \{y)"
    Let $A \subseteq F$. Set $m := \inf \{y \in A^u \mid f(y) \leq y\}$.
    A routine verification (every $a \in A$ is a lower bound, so
    $a \leq m$; $f$ increasing gives $f(m) \leq f(y) \leq y$ for every
    $y$ in the set, so $f(m)$ is also a lower bound, hence
    $f(m) \leq m$; and $m$ is a fixed point) shows that $m = \sup A$
    in $F$.

!!! theorem "Theorem (Cantor–Bernstein)"
    <a id="thm-4-8-4"></a>
    Let $X, Y$ be sets. If there exist injective mappings
    $f : X \to Y$ and $g : Y \to X$, then $X$ and $Y$ are equipotent
    (i.e. there is a bijection between them).

??? proof "Proof (Define $\Phi : \mathscr{P}(X) \to \mathscr{P}(X)$ by)"
    Define $\Phi : \mathscr{P}(X) \to \mathscr{P}(X)$ by
    $\Phi(A) = X \setminus g(Y \setminus f(A))$. Then $\Phi$ is
    increasing. By Knaster–Tarski there is $C$ with $\Phi(C) = C$. The
    map
    $$
    h(x) = \begin{cases} f(x) & x \in C \\ g^{-1}(x) & x \in X \setminus C \end{cases}
    $$
    is the required bijection.

## Recursive Construction

!!! definition "Definition (Initial segment)"
    <a id="def-4-9-1"></a>
    Let $(X, \leq)$ be a poset and $I \subseteq X$. Say $I$ is an
    **initial segment** if $\forall a \in I,\ X_{<a} \subseteq I$.

!!! theorem "Theorem (Recursive construction)"
    <a id="thm-4-9-2"></a>
    Let $(X, \leq)$ be a well-ordered set and $Y$ a set. Suppose that for
    every $x \in X$ and every mapping $h : X_{<x} \to Y$ we have fixed an
    element $\Phi(h) \in Y$. Then there exists a unique mapping
    $f : X \to Y$ with
    $$
    \forall x \in X,\quad f(x) = \Phi(f|_{X_{<x}}).
    $$

??? proof "Proof (Uniqueness follows from transfinite induction. For existence)"
    Uniqueness follows from transfinite induction. For existence, let
    $\mathcal{S}$ be the family of initial segments $S$ admitting a map
    $f_S : S \to Y$ satisfying the recursion; one shows that
    $S_0 = \bigcup_{S \in \mathcal{S}} S$ is in $\mathcal{S}$, and that the
    only obstruction to $S_0 = X$ would be a maximal element $a$ with
    $S_0 = X_{<a}$, which can be extended by setting
    $f(a) = \Phi(f)$.

## Cardinality Basics

!!! definition "Definition (Countable / finite set)"
    <a id="def-4-9-3"></a>
    A set $A$ is **countable** if there is an injective mapping $A \to \mathbb{N}$.
    It is **finite** if such an injection has bounded image.

!!! theorem "Theorem (N × N equipotent to N)"
    <a id="thm-4-9-4"></a>
    $\mathbb{N} \times \mathbb{N}$ is equipotent to $\mathbb{N}$.

??? proof "Proof (map $(a)"
    The map $(a, b) \mapsto 2^a(2b + 1)$ is an injection
    $\mathbb{N} \times \mathbb{N} \to \mathbb{N}$.

