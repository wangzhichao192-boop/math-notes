# Rings and Modules

This chapter combines the additive and multiplicative structures into
**rings** and then introduces the linear-algebraic notion of **modules**
(generalising vector spaces to scalars in a ring).

## Unitary Rings

!!! definition "Definition (Unitary ring)"
    <a id="def-6-1-1"></a>
    A **unitary ring** $(A, +, \cdot)$ is a set $A$ with two composition
    laws such that

    + $(A, +)$ is an abelian group (with neutral element $0$);
    + $(A, \cdot)$ is a monoid (with neutral element $1$);
    + multiplication distributes over addition:
      $a \cdot (b + c) = a \cdot b + a \cdot c$ and
      $(a + b) \cdot c = a \cdot c + b \cdot c$.

    The ring is **commutative** if $\cdot$ is commutative.

!!! example "Example (Unitary subring)"
    $(\mathbb{Z}, +, \cdot)$ is a commutative unitary ring. The trivial
    ring $(\{0\}, +, \cdot)$ is the zero ring.

!!! definition "Definition (Unitary subring)"
    <a id="def-6-1-2"></a>
    A **unitary subring** $B \subseteq A$ is a subset that is a subgroup of
    $(A, +)$ and a submonoid of $(A, \cdot)$ — equivalently, a non-empty
    subset closed under $+$ and $\cdot$ and containing $1$.

!!! definition "Definition (Ring homomorphism)"
    <a id="def-6-1-3"></a>
    A **ring homomorphism** $f : A \to B$ is a group homomorphism on the
    additive groups and a monoid homomorphism on the multiplicative
    monoids (so $f(1_A) = 1_B$).

!!! lemma "Lemma (Multiplication by zero and negatives)"
    <a id="lem-6-1-4"></a>
    In any unitary ring $A$:

    1. $0 \cdot a = a \cdot 0 = 0$ for every $a \in A$.
    2. $-(a b) = (-a) b = a (-b)$.

!!! proposition "Proposition (Canonical Z → A homomorphism)"
    <a id="prop-6-1-5"></a>
    For any unitary ring $A$ there exists a unique ring homomorphism
    $\mathbb{Z} \to A$, given by $n \mapsto n \cdot 1_A$.

!!! definition "Definition (Division ring, field)"
    <a id="def-6-1-6"></a>
    A **division ring** (or **skew field**) is a unitary ring $K$ in which
    every non-zero element is invertible. A **field** is a commutative
    division ring.

## Actions of Monoids

!!! definition "Definition (Action of a monoid)"
    <a id="def-6-2-1"></a>
    A **left action** of a monoid $G$ (with neutral $e$) on a set $X$ is a
    map $\phi : G \times X \to X$ with

    + $\phi(e, x) = x$;
    + $\phi(a \ast b, x) = \phi(a, \phi(b, x))$ for all $a, b \in G$.

    When $G$ is a group and $\phi$ is a left action, the relation
    $x \sim y \iff \exists g \in G,\ \phi(g, x) = y$ is an equivalence
    relation; its classes are the **orbits** of the action.

!!! remark "Remark (If $G$ is finite and $H \leq G$)"
    If $G$ is finite and $H \leq G$, then
    $\operatorname{card}(G) = \operatorname{card}(H) \cdot \operatorname{card}(H \backslash G)$,
    the classical **orbit-counting** identity.

## Modules and Vector Spaces

!!! definition "Definition (Left K-module, vector space)"
    <a id="def-6-3-1"></a>
    Let $K$ be a unitary ring and $(V, +)$ an abelian group. A
    **left $K$-module structure** on $V$ is a left action
    $\phi : K \times V \to V$ that is bilinear:

    + $\phi(a + b, x) = \phi(a, x) + \phi(b, x)$;
    + $\phi(a, x + y) = \phi(a, x) + \phi(a, y)$.

    A left $K$-module is $V$ together with such a structure. For
    commutative $K$, left and right module structures coincide, and we
    simply call $V$ a **$K$-module**. When $K$ is a field, a
    $K$-module is called a **vector space** over $K$.

!!! example "Example (+ Any abelian group $V$ carries a canonical)"
    + Any abelian group $V$ carries a canonical $\mathbb{Z}$-module
      structure: $n \cdot v$ is the $n$-fold sum $v + \cdots + v$
      (with sign for negative $n$).
    + $K$ itself is a left $K$-module via the multiplication $a \cdot x = ax$.

## Submodules and Homomorphisms

!!! definition "Definition (Left K-submodule)"
    <a id="def-6-4-1"></a>
    A **left $K$-submodule** of a left $K$-module $V$ is a subgroup
    $W \leq (V, +)$ that is closed under the action of $K$.

!!! definition "Definition (K-linear map)"
    <a id="def-6-4-2"></a>
    A **$K$-linear map** (or **homomorphism of $K$-modules**)
    $f : E \to F$ is a group homomorphism of the underlying abelian
    groups with $f(a x) = a f(x)$ for $a \in K$ and $x \in E$.
    Bijective $K$-linear maps are $K$-module isomorphisms.

!!! lemma "Lemma (Zero annihilates and is annihilated)"
    <a id="lem-6-4-3"></a>
    In a left $K$-module $V$:

    1. $a \cdot 0_V = 0_V$ for all $a \in K$;
    2. $0_K \cdot x = 0_V$ for all $x \in V$.

!!! theorem "Theorem (Kernel and image of a K-linear map)"
    <a id="thm-6-4-4"></a>
    Let $f : E \to F$ be a $K$-linear map.

    1. $\ker f$ is a left $K$-submodule of $E$.
    2. $\operatorname{Im} f$ is a left $K$-submodule of $F$.

??? proof "Proof ((1) $f(ax) = a f(x) = a \cdot)"
    (1) $f(ax) = a f(x) = a \cdot 0_F = 0_F$ for $x \in \ker f$.
    (2) For $y = f(x) \in \operatorname{Im} f$ and $a \in K$, $ay = a f(x)
    = f(ax) \in \operatorname{Im} f$.

!!! proposition "Proposition (K-linearity criterion)"
    <a id="prop-6-4-5"></a>
    A map $f : E \to F$ between left $K$-modules is $K$-linear iff
    $f(x + a y) = f(x) + a f(y)$ for all $a \in K$ and $x, y \in E$.

??? proof "Proof (Setting $a = 1$ gives additivity; setting $x)"
    Setting $a = 1$ gives additivity; setting $x = 0$ gives scalar
    multiplicativity. Conversely, both properties together imply
    $K$-linearity.

## Universal Property and Direct Sums

!!! proposition "Proposition ($V$ be a left $K$-module and $x \in)"
    <a id="prop-6-5-1"></a>
    Let $V$ be a left $K$-module and $x \in V$. There exists a unique
    $K$-linear map $\phi_x : K \to V$ with $\phi_x(1) = x$, given by
    $\phi_x(a) = a x$.

!!! proposition "Proposition ($(V_i)_{i \in I}$ be a family of left)"
    <a id="prop-6-5-2"></a>
    Let $(V_i)_{i \in I}$ be a family of left $K$-modules.

    1. The **direct product** $\prod_{i \in I} V_i$ is a left $K$-module
       under component-wise action; for any $K$-module $W$ and family
       $(f_i : W \to V_i)_{i \in I}$ of $K$-linear maps, there is a unique
       $K$-linear $f : W \to \prod_i V_i$ with $\pi_i \circ f = f_i$ for
       each $i$.
    2. The **direct sum** $\bigoplus_{i \in I} V_i$ (the sub-$\prod$
       of families with finite support) is a left $K$-submodule of
       $\prod_i V_i$. For any $K$-module $W$ and family
       $(g_i : V_i \to W)_{i \in I}$ of $K$-linear maps, there is a
       unique $K$-linear $g : \bigoplus_i V_i \to W$ with
       $g \circ \lambda_i = g_i$ for each $i$ (where $\lambda_i$ embeds
       $V_i$ as the $i$-th summand).

??? proof "Proof ((1) Define $f(z) = (f_i(z))_{i \in I}$. It)"
    (1) Define $f(z) = (f_i(z))_{i \in I}$. It is $K$-linear because each
    $f_i$ is, and component-wise sums/scalars distribute.
    (2) The formula $g((x_i)_{i \in I}) = \sum_{i \in I} g_i(x_i)$ is
    well defined since the sum is finite; linearity follows term-by-term.

## Matrices

!!! definition "Definition (Column matrix)"
    <a id="def-6-6-1"></a>
    A **column matrix** with entries in a left $K$-module $V$, written
    $$
    \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}
    \quad (x_i \in V),
    $$
    is the $K$-linear map $K^n \to V$ sending
    $(a_1, \ldots, a_n) \mapsto a_1 x_1 + \cdots + a_n x_n$.

    An $n \times p$ **matrix** with coefficients in $K$ is a $K$-linear
    map $K^n \to K^p$. Composition of matrices corresponds to matrix
    multiplication:
    $$
    (AB)_{i, j} = \sum_{k=1}^{p} a_{i, k}\, b_{k, j}.
    $$

!!! definition "Definition (Row echelon form)"
    <a id="def-6-6-2"></a>
    A matrix $A$ is in **row echelon form** if the index
    $j(\vec a^{(i)})$ of the first non-zero entry of the $i$-th row is
    weakly increasing in $i$ (strictly as long as $\leq p$); it is in
    **reduced row echelon form** if in addition each pivot entry
    equals $1$ and is the only non-zero entry in its column.

!!! theorem "Theorem (Row reduction)"
    <a id="thm-6-6-3"></a>
    Suppose $A \in M_{n, p}(K)$ is in reduced row echelon form and
    $(b_1, \ldots, b_n) \in V^n$. Let
    $I(A) = \{i \in \{1, \ldots, n\} \mid \vec a^{(i)} \neq 0\}$ and
    $J_0(A) = \{1, \ldots, p\} \setminus \{j(\vec a^{(i)}) \mid i \in I(A)\}$.

    1. If there exists $i \in \{1, \ldots, n\} \setminus I(A)$ with
       $b_i \neq 0$, the system $A\, x = b$ has no solution.
    2. Otherwise, the solution set is parametrised by
       $(z_l)_{l \in J_0(A)} \in V^{J_0(A)}$ via
       $$
       x_k =
       \begin{cases}
       z_k, & k \in J_0(A), \\
       b_i - \displaystyle\sum_{l \in J_0(A)} a_{i, l}\, z_l,
         & k = j(\vec a^{(i)}).
       \end{cases}
       $$

!!! proposition "Proposition (Elementary row operations preserve solutions)"
    <a id="prop-6-6-4"></a>
    Let $S \in M_{m, n}(K)$ and $A \in M_{n, p}(K)$. Any solution of
    $A\, x = b$ is also a solution of $(S A)\, x = S\, b$. If $S$ has
    a left inverse (i.e. $T S = I_n$ for some $T \in M_{n, m}(K)$),
    the two systems have identical solution sets.

