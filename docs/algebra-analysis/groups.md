# Groups

This chapter develops the algebraic theory of groups, from the bare axioms
through homomorphisms, quotients, and the first isomorphism theorem.

## Composition Laws and Semigroups

!!! definition "Definition (Composition law)"
    <a id="def-5-1-1"></a>
    A **composition law** on a set $X$ is a mapping
    $\ast : X \times X \to X$, $(x, y) \mapsto x \ast y$.

    + $\ast$ is **commutative** if $x \ast y = y \ast x$ for all $x, y$.
    + $\ast$ is **associative** if $(x \ast y) \ast z = x \ast (y \ast z)$ for all
      $x, y, z$. In this case we write
      $x_1 \ast x_2 \ast \cdots \ast x_n$ without ambiguity.
    + $(X, \ast)$ is a **semigroup** if $\ast$ is associative.

!!! example "Example (Left/right cancellativity)"
    The set $M_X$ of all mappings $X \to X$, with composition $\circ$, is an
    associative (but generally non-commutative) semigroup.

!!! definition "Definition (Left/right cancellativity)"
    <a id="def-5-1-2"></a>
    In a semigroup, an element $g$ is

    + **left cancellative** if $g \ast x = g \ast y \Rightarrow x = y$;
    + **right cancellative** if $x \ast g = y \ast g \Rightarrow x = y$.

!!! proposition "Proposition (Regrouping parenthesised products)"
    <a id="prop-5-1-3"></a>
    If $\ast$ is associative and $n \geq 2$, then for any $1 \leq i \leq n - 1$,
    $$
    x_1 \ast \cdots \ast x_n
      = x_1 \ast \cdots \ast (x_i \ast x_{i+1}) \ast \cdots \ast x_n.
    $$

## Monoids and Groups

!!! definition "Definition (Neutral element)"
    <a id="def-5-2-1"></a>
    A **neutral element** in $(X, \ast)$ is $e \in X$ with
    $e \ast x = x \ast e = x$ for all $x$. A neutral element is unique
    (when it exists).

!!! definition "Definition (Monoid, group, abelian group)"
    <a id="def-5-2-2"></a>
    + A **monoid** is a semigroup with a neutral element, denoted $1$ (or $0$
      in additive notation).
    + A **group** is a monoid in which every element is invertible.
    + A group is **abelian** if its composition law is commutative.

!!! example "Example ($(\mathbb{Z})"
    $(\mathbb{Z}, +)$ is an abelian group. The set $S_n$ of bijections
    $\{1, \ldots, n\} \to \{1, \ldots, n\}$ with composition is the
    **symmetric group** (non-abelian for $n \geq 3$).

!!! definition "Definition (Inverse)"
    <a id="def-5-2-3"></a>
    Let $(G, \ast)$ be a monoid with neutral $e$. An element $x$ is
    **invertible** if there is $y$ with $x \ast y = y \ast x = e$. In that
    case $y$ is unique and is written $x^{-1}$.

!!! proposition "Proposition (Right-invertible implies right-cancellative)"
    <a id="prop-5-2-4"></a>
    In a monoid, right-invertible implies right-cancellative, and symmetrically
    for left.

!!! proposition "Proposition (Inverses compose as a group homomorphism)"
    <a id="prop-5-2-5"></a>
    Let $G$ be a monoid.

    1. If $x$ is invertible, so is $x^{-1}$, and $(x^{-1})^{-1} = x$.
    2. If $x, y$ are invertible, so is $x \ast y$, and
       $(x \ast y)^{-1} = y^{-1} \ast x^{-1}$.

!!! notation "Notation (For a monoid $M$)"
    For a monoid $M$, $M^\times$ denotes the submonoid of invertible
    elements. For a group $G$, $G^\times = G$.

## Subgroups

!!! definition "Definition (Subgroup)"
    <a id="def-5-3-1"></a>
    A **subgroup** of a group $G$ is a subset $H \subseteq G$ such that

    + the neutral element $e \in H$;
    + $H$ is closed under $\ast$;
    + $H$ is closed under taking inverses.

    Equivalently, $\varnothing \neq H \subseteq G$ and $\forall x, y \in H,\ x \ast y^{-1} \in H$.

!!! proposition "Proposition (Subgroup test)"
    <a id="prop-5-3-2"></a>
    Let $M$ be a monoid, and let $\varnothing \neq H \subseteq M^\times$ be a
    subset such that $\forall x, y \in H,\ x \ast y^{-1} \in H$. Then $H$ is a
    subgroup of $M^\times$.

??? proof "Proof (Setting $x = y$ gives $e \in H$)"
    Setting $x = y$ gives $e \in H$. For any $y \in H$,
    $e \ast y^{-1} = y^{-1} \in H$. For any $x, y \in H$,
    $x \ast \bigl((y^{-1})^{-1}\bigr) = x \ast y \in H$. Together these give the
    three subgroup axioms.

!!! proposition "Proposition (Intersection of subgroups)"
    <a id="prop-5-3-3"></a>
    The intersection of any non-empty family of subgroups is a subgroup.

## Group Homomorphisms

!!! definition "Definition (Group homomorphism)"
    <a id="def-5-4-1"></a>
    Let $(G, \ast)$ and $(H, \star)$ be groups. A mapping $f : G \to H$ is a
    **group homomorphism** if
    $$
    f(x \ast y) = f(x) \star f(y)
    \quad\text{for all } x, y \in G.
    $$
    A bijective homomorphism is a **group isomorphism**.

!!! remark "Remark (For a homomorphism $f : G \to H$)"
    For a homomorphism $f : G \to H$ between groups, the three axioms
    $f(xy) = f(x)f(y)$, $f(e_G) = e_H$, and $f(x^{-1}) = f(x)^{-1}$ are
    not independent: the first alone implies the other two.

!!! proposition "Proposition ($f : G \to H$ be a group)"
    <a id="prop-5-4-2"></a>
    Let $f : G \to H$ be a group homomorphism and $K \leq G$ a subgroup. Then
    $f(K)$ is a subgroup of $H$.

!!! proposition "Proposition (Image of a subgroup is a subgroup)"
    <a id="prop-5-4-3"></a>
    The composite of group homomorphisms is a group homomorphism. A bijective
    group homomorphism has a group-homomorphism inverse.

## Quotients

!!! definition "Definition (Compatible equivalence relation)"
    <a id="def-5-5-1"></a>
    Let $(X, \ast)$ be a semigroup and $\sim$ an equivalence relation on $X$
    that is **compatible** with $\ast$ (i.e. $x_1 \sim x_2$ and
    $y_1 \sim y_2$ imply $x_1 \ast y_1 \sim x_2 \ast y_2$). Then
    $\ast$ descends to a well-defined composition law on $X / \{\sim\}$, also
    denoted $\ast$, by
    $$
    [x] \ast [y] := [x \ast y].
    $$

!!! proposition "Proposition (Algebraic structure descends to quotient)"
    <a id="prop-5-5-2"></a>
    Compatibility of $\sim$ with $\ast$ transfers all of the following from
    $X$ to $X / \{\sim\}$: associativity, commutativity, existence of a neutral
    element, existence of inverses.

!!! definition "Definition (Kernel of a homomorphism)"
    <a id="def-5-5-3"></a>
    Let $f : G \to H$ be a group homomorphism. The **kernel** of $f$ is
    $\ker f := \{x \in G \mid f(x) = e_H\}$.

!!! proposition "Proposition (Kernel is a subgroup)"
    <a id="prop-5-5-4"></a>
    $\ker f$ is a subgroup of $G$. Moreover, for every $(a, x) \in G \times
    \ker f$ there exists $y \in \ker f$ with $a \ast x = y \ast a$.

!!! definition "Definition (Normal subgroup)"
    <a id="def-5-5-5"></a>
    A subgroup $H$ of a group $G$ is **normal** (written $H \trianglelefteq G$)
    if $\forall (a, x) \in G \times H,\ a \ast x \ast a^{-1} \in H$.

!!! theorem "Theorem (Quotient group by a normal subgroup)"
    <a id="thm-5-5-6"></a>
    Let $H \trianglelefteq G$. Define $x \sim_H y \iff x \ast y^{-1} \in H$. Then

    1. $\sim_H$ is an equivalence relation, with
       $[x] = \{y \in G \mid y \ast x^{-1} \in H\} = H \ast x$.
    2. $\sim_H$ is compatible with the group operation; the quotient
       $G / H := G / \{\sim_H\}$ is a group.
    3. The projection $\pi : G \to G / H$ has kernel $H$.

??? proof "Proof ((1) Reflexive: $e \in H$. Symmetric: $x \ast)"
    (1) Reflexive: $e \in H$. Symmetric: $x \ast y^{-1} \in H \Rightarrow
    y \ast x^{-1} = (x \ast y^{-1})^{-1} \in H$. Transitive: if
    $x \ast y^{-1}, y \ast z^{-1} \in H$ then
    $x \ast z^{-1} = (x \ast y^{-1})(y \ast z^{-1}) \in H$.
    (2) Normality gives $x \ast H = H \ast x$ for all $x$, so the compatibility
    follows from the calculation in the proof of
    [Proposition 5.5.2](#prop-5-5-2).
    (3) $\ker \pi = [e_G] = H \ast e_G = H$.

!!! theorem "Theorem (First isomorphism theorem)"
    <a id="thm-5-5-7"></a>
    Let $f : G \to H$ be a group homomorphism and $K = \ker f$. Then

    1. $K$ is a normal subgroup of $G$.
    2. There is a unique injective homomorphism
       $\tilde f : G / K \to H$ with $\tilde f \circ \pi = f$, and
       $\tilde f(G / K) = f(G)$.

    In particular, $G / K \cong f(G)$.

??? proof "Proof ((1) The kernel)"
    (1) The kernel is a subgroup (Proposition above); normality follows from
    the standard identity $a x a^{-1} \in K$ for $x \in K$.
    (2) $f$ is constant on cosets of $K$ because $x \sim_K y \iff
    f(x) = f(y)$ (since $f(x \ast y^{-1}) = f(x) f(y)^{-1}$). Hence
    $\tilde f$ descends to the quotient; the same calculation as for
    [Proposition 5.5.2](#prop-5-5-2) shows it is a homomorphism; it is
    injective by construction.

## Universal Homomorphisms

!!! proposition "Proposition (Universal homomorphism into a monoid)"
    <a id="prop-5-6-1"></a>
    Let $(M, \ast)$ be a monoid and $x \in M$. There exists a unique monoid
    homomorphism $f : (\mathbb{N}, +) \to (M, \ast)$ with $f(1) = x$, given by
    $f(0) = e_M$ and $f(n+1) = f(n) \ast x$.

??? proof "Proof (Induction on $m$ shows $f(n + m) =)"
    Induction on $m$ shows $f(n + m) = f(n) \ast f(m)$. Uniqueness follows by
    the same induction: $g(1) = x$ forces $g(n+1) = g(n) \ast g(1) = g(n) \ast x$.

!!! notation "Notation (Under the universal homomorphism of the proposition)"
    Under the universal homomorphism of the proposition, write
    $x^{\ast n} := f(n)$, with $x^{\ast 0} = e_M$ and
    $x^{\ast(n+m)} = x^{\ast n} \ast x^{\ast m}$. In additive notation this
    becomes $n \cdot x$.

!!! proposition "Proposition ($(M)"
    <a id="prop-5-6-2"></a>
    Let $(M, \ast)$ be a monoid and $x \in M$. There exists a unique
    homomorphism $(\mathbb{Z}, +) \to (M, \ast)$ with $1 \mapsto x$, hence a
    homomorphism $(\mathbb{Z}^\times, +) \to (M^\times, \ast)$.

