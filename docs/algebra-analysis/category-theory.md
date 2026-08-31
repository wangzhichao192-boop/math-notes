# Language of Category Theory

This chapter introduces the **language of categories, functors, and natural
transformations** — the lingua franca of modern algebra and algebraic geometry.
We work inside a chosen **universe** $\mathcal{U}$ to side-step the set-theoretic
paradoxes lurking in the category of *all* sets, and finish with the
**Yoneda lemma** (an object is determined by its maps to other objects) and
the notion of **representable functors**.

## Universes

!!! definition "Definition (Universe)"
    <a id="def-cat-1-1"></a>
    A set $\mathcal{U}$ is a **universe** if its elements are sets and

    1. $\varnothing \in \mathcal{U}$.
    2. $A \in \mathcal{U}$ and $B \in A \Rightarrow B \in \mathcal{U}$.
    3. $A \in \mathcal{U} \Rightarrow \mathscr{P}(A) \in \mathcal{U}$.
    4. $I \in \mathcal{U}$ and $(A_i)_{i \in I} \in \mathcal{U}^I
       \Rightarrow \bigcup_{i \in I} A_i \in \mathcal{U}$.

!!! axiom "Axiom (Universe axiom)"
    Every set belongs to some universe.

!!! proposition "Proposition (Closure properties of a universe)"
    <a id="prop-cat-1-2"></a>
    Let $\mathcal{U}$ be a universe.

    1. $A \in \mathcal{U}$ and $B \subseteq A \Rightarrow B \in \mathcal{U}$.
    2. $A \in \mathcal{U} \Rightarrow \{A\} \in \mathcal{U}$.
    3. $A, B \in \mathcal{U} \Rightarrow \{A, B\} \in \mathcal{U}$.
    4. The ordered pair $(A, B) := \{\{A\}, \{A, B\}\} \in \mathcal{U}$.
    5. $X, Y \in \mathcal{U} \Rightarrow X \times Y \in \mathcal{U}$.
    6. $X, Y \in \mathcal{U} \Rightarrow$ the set of all correspondences
       $X \to Y$ belongs to $\mathcal{U}$; in particular
       $Y^X \in \mathcal{U}$.
    7. $I \in \mathcal{U}$ non-empty and $(X_i)_{i \in I} \in \mathcal{U}^I
       \Rightarrow \prod_{i \in I} X_i \in \mathcal{U}$.

??? proof "Proof (Closure properties of a universe)"
    (1) By axiom (c), $\mathscr{P}(A) \in \mathcal{U}$. Since $B \in
    \mathscr{P}(A)$, axiom (b) gives $B \in \mathcal{U}$.
    (2) $\{A\} \subseteq \mathscr{P}(A) \in \mathcal{U}$ (by (c)),
    so (1) gives $\{A\} \in \mathcal{U}$.
    (3) By (c), $\mathscr{P}(\mathscr{P}(\varnothing)) =
    \{\varnothing, \{\varnothing\}\} \in \mathcal{U}$. By (2),
    $\{A\}, \{B\} \in \mathcal{U}$. By axiom (d),
    $\{A, B\} = \{A\} \cup \{B\} \in \mathcal{U}$.
    (4) By (2), $\{A\} \in \mathcal{U}$. By (3), $\{A, B\} \in \mathcal{U}$.
    Apply (3) to $\{A\}, \{A, B\} \in \mathcal{U}$:
    $\{\{A\}, \{A, B\}\} \in \mathcal{U}$.
    (5) For $x \in X$ and $y \in Y$, (b) gives $x, y \in \mathcal{U}$;
    (4) gives $(x, y) \in \mathcal{U}$; (2) gives $\{(x, y)\} \in
    \mathcal{U}$. Then $\{x\} \times Y = \bigcup_{y \in Y} \{(x, y)\}
    \in \mathcal{U}$ by (d) (applied to the family $y \mapsto
    \{(x, y)\}$ indexed by $Y \in \mathcal{U}$). Finally
    $X \times Y = \bigcup_{x \in X} (\{x\} \times Y) \in \mathcal{U}$.
    (6) A correspondence $X \to Y$ has the form
    $((X, Y), \Gamma)$ with $\Gamma \subseteq X \times Y$. By (5),
    $X \times Y \in \mathcal{U}$, so $\mathscr{P}(X \times Y) \in
    \mathcal{U}$ (c), and $\Gamma \in \mathcal{U}$ by (1). The set of
    all such $\Gamma$ is a union (over $\Gamma \in \mathscr{P}(X
    \times Y)$) of sets $\{((X, Y), \Gamma)\} \in \mathcal{U}$, so by
    (d) it is in $\mathcal{U}$.
    (7) $Y^X$ is a subset of the set of correspondences $X \to Y$ in
    $\mathcal{U}$ (6), so (1) gives $Y^X \in \mathcal{U}$.
    (8) The product $\prod_{i \in I} X_i$ is a subset of
    $X^I \in \mathcal{U}$ (7), so (1) gives the result.

## Categories

!!! definition "Definition (Category)"
    <a id="def-cat-2-1"></a>
    A **$\mathcal{U}$-category** $\mathcal{C}$ is the data of

    1. a class $\mathrm{Obj}(\mathcal{C})$ (the objects);
    2. for every $(X, Y) \in \mathrm{Obj}(\mathcal{C})^2$, a set
       $\mathcal{C}(X, Y) \in \mathcal{U}$ of **morphisms** $X \to Y$;
    3. for every $(X, Y, Z)$, a composition
       $\mathcal{C}(X, Y) \times \mathcal{C}(Y, Z) \to \mathcal{C}(X, Z)$,
       written $f, g \mapsto g \circ f$ or $gf$,

    such that for every $X$ there is an identity $\mathrm{Id}_X \in
    \mathcal{C}(X, X)$ with $\mathrm{Id}_X \circ f = f$ and
    $g \circ \mathrm{Id}_X = g$, and composition is associative.
    $\mathcal{C}$ is **$\mathcal{U}$-small** if $\mathrm{Obj}(\mathcal{C}) \in
    \mathcal{U}$, and **finite** if both $\mathrm{Obj}(\mathcal{C})$ and the
    hom-sets are finite.

!!! example "Example (Common categories)"
    + $\mathcal{U}\text{-}\mathrm{Set}$: objects = sets in $\mathcal{U}$, morphisms
      = all set maps.
    + $\mathrm{Top}$: topological spaces + continuous maps.
    + $\mathrm{Gp}, \mathrm{Mon}, \mathrm{Ab}$: groups, monoids, abelian groups
      with homomorphisms.
    + $\mathrm{Ring}, \mathrm{CRing}$: (commutative) unitary rings.
    + $_K\mathrm{Mod}$: left $K$-modules for a unitary ring $K$.
    + $\mathrm{Alg}_K, \mathrm{CAlg}_K$: (commutative) $K$-algebras.

!!! proposition "Proposition (Uniqueness of identity)"
    <a id="prop-cat-2-2"></a>
    The identity morphism of an object $X$ is unique.

??? proof "Proof (Uniqueness of identity)"
    Let $\mathrm{Id}_X$ and $\mathrm{Id}'_X$ both be identity morphisms
    of $X$. By the identity axiom,
    $\mathrm{Id}_X = \mathrm{Id}_X \circ \mathrm{Id}'_X = \mathrm{Id}'_X$.

!!! definition "Definition (Inverse, isomorphism)"
    <a id="def-cat-2-3"></a>
    A morphism $f : X \to Y$ is

    + **left invertible** if $\exists\, g : Y \to X$ with $g \circ f =
      \mathrm{Id}_X$ (then $g$ is a *left inverse*);
    + **right invertible** if $\exists\, h : Y \to X$ with $f \circ h =
      \mathrm{Id}_Y$ (then $h$ is a *right inverse*);
    + an **isomorphism** if it is both; the unique common inverse is written
      $f^{-1}$. Two objects are **isomorphic** if some morphism between them
      is an isomorphism.

!!! proposition "Proposition (Composing isomorphisms)"
    <a id="prop-cat-2-4"></a>
    If $f : X \to Y$ and $g : Y \to Z$ are isomorphisms, so is
    $g \circ f$ and $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.

??? proof "Proof (Composing isomorphisms)"
    $(f^{-1} \circ g^{-1}) \circ (g \circ f) = f^{-1} \circ
    (g^{-1} \circ g) \circ f = f^{-1} \circ \mathrm{Id}_Y \circ f
    = f^{-1} \circ f = \mathrm{Id}_X$, and
    $(g \circ f) \circ (f^{-1} \circ g^{-1}) = g \circ
    (f \circ f^{-1}) \circ g^{-1} = g \circ \mathrm{Id}_Y \circ g^{-1}
    = g \circ g^{-1} = \mathrm{Id}_Z$. So $g \circ f$ is an
    isomorphism with inverse $f^{-1} \circ g^{-1}$.

!!! definition "Definition (Opposite category)"
    <a id="def-cat-2-5"></a>
    The **opposite category** $\mathcal{C}^{\mathrm{op}}$ has the same
    objects as $\mathcal{C}$ and
    $\mathcal{C}^{\mathrm{op}}(X, Y) := \mathcal{C}(Y, X)$. Composition in
    $\mathcal{C}^{\mathrm{op}}$ is given by
    $\mathcal{C}(Y, X) \times \mathcal{C}(Z, Y) \to \mathcal{C}(Z, X)$ —
    equivalently, the same morphism viewed "with arrows reversed".

!!! definition "Definition (Commutative diagram)"
    <a id="def-cat-2-6"></a>
    A **diagram** in a category is a directed graph whose vertices are
    objects and edges are morphisms. A diagram is **commutative** if for
    every pair of vertices the morphisms obtained by composing along any
    two paths between them coincide. In particular, the diagram

    $$
    X \xrightarrow\{\,f\,\} Y \xrightarrow\{\,g\,\} Z
    $$

    is commutative iff $h = g \circ f$.

## Functors

!!! definition "Definition (Functor)"
    <a id="def-cat-3-1"></a>
    A **functor** $F : \mathcal{C} \to \mathcal{D}$ is the data of

    1. a map $F : \mathrm{Obj}(\mathcal{C}) \to \mathrm{Obj}(\mathcal{D})$;
    2. for every $(X, Y)$, a set map
       $F : \mathcal{C}(X, Y) \to \mathcal{D}(F(X), F(Y))$

    with $F(\mathrm{Id}_X) = \mathrm{Id}_{F(X)}$ and
    $F(g \circ f) = F(g) \circ F(f)$.

!!! example "Example (Standard functors)"
    + The identity functor $\mathrm{Id}_{\mathcal{C}} : \mathcal{C} \to
      \mathcal{C}$.
    + The composition of functors $G \circ F$.
    + The **covariant hom-functor** $h^X : \mathcal{C} \to \mathrm{Set}$,
      $Y \mapsto \mathcal{C}(X, Y)$, $f \mapsto f \circ (\cdot)$.
    + The **contravariant hom-functor** $h_X : \mathcal{C}^{\mathrm{op}} \to
      \mathrm{Set}$, $Y \mapsto \mathcal{C}(Y, X)$, $f \mapsto (\cdot) \circ f$.

!!! definition "Definition (Natural transformation)"
    <a id="def-cat-3-2"></a>
    A **natural transformation** $\varphi : F \Rightarrow G$ between two
    functors $F, G : \mathcal{C} \to \mathcal{D}$ is a family
    $(\varphi_X : F(X) \to G(X))_{X \in \mathrm{Obj}(\mathcal{C})}$ such
    that for every $f : X \to Y$ in $\mathcal{C}$ the diagram

    $$
    \begin{array}{ccc}
    F(X) & \xrightarrow{\varphi_X} & G(X) \\
    {}_{F(f)} \downarrow & & \downarrow _{G(f)} \\
    F(Y) & \xrightarrow{\varphi_Y} & G(Y)
    \end{array}
    $$

    is commutative, i.e. $G(f) \circ \varphi_X = \varphi_Y \circ F(f)$. A
    **natural isomorphism** is a natural transformation whose every
    component is an isomorphism.

!!! proposition "Proposition (Functor category)"
    <a id="prop-cat-3-3"></a>
    For $\mathcal{U}$-small $\mathcal{C}$ and $\mathcal{U}$-category
    $\mathcal{D}$, the set
    $\mathrm{Nat}(F, G) \subseteq \prod_{X} \mathcal{D}(F(X), G(X))$
    belongs to $\mathcal{U}$; the category
    $\mathrm{Fun}(\mathcal{C}, \mathcal{D})$ of functors $\mathcal{C} \to
    \mathcal{D}$ with natural transformations is itself a
    $\mathcal{U}$-category.

??? proof "Proof (Functor category)"
    The product $\prod_{X \in \mathrm{Obj}(\mathcal{C})}
    \mathcal{D}(F(X), G(X))$ is a subset of the set of all functions on
    $\mathrm{Obj}(\mathcal{C})$ (by currying/uncurrying). Since
    $\mathrm{Obj}(\mathcal{C}) \in \mathcal{U}$ ($\mathcal{C}$ is
    $\mathcal{U}$-small) and $\mathcal{D}$ is a $\mathcal{U}$-category,
    each $\mathcal{D}(F(X), G(X)) \in \mathcal{U}$, so the product is
    in $\mathcal{U}$ (Prop 1.1.3 (8)) and hence so is the subset
    $\mathrm{Nat}(F, G)$. The category $\mathrm{Fun}(\mathcal{C},
    \mathcal{D})$ has $\mathrm{Nat}(F, G)$ as its hom-sets, all in
    $\mathcal{U}$, and inherits composition and identities from
    $\mathcal{D}$.

## Yoneda Lemma

!!! theorem "Theorem (Yoneda)"
    <a id="thm-cat-4-1"></a>
    Let $\mathcal{C}$ be a category, $F : \mathcal{C} \to \mathrm{Set}$ a
    functor, and $X \in \mathrm{Obj}(\mathcal{C})$. The map

    $$
    \beta : \mathrm{Nat}(h^X, F) \longrightarrow F(X), \quad
    \psi \longmapsto \psi_X(\mathrm{Id}_X)
    $$

    is a bijection. Its inverse sends $x \in F(X)$ to the natural
    transformation $\alpha(x) = (\alpha(x)_Y)_{Y}$, where

    $$
    \alpha(x)_Y : \mathcal{C}(X, Y) \longrightarrow F(Y), \quad
    f \longmapsto F(f)(x).
    $$

??? proof "Proof (Yoneda)"
    **Construction.** Given $x \in F(X)$, define
    $\alpha(x) = (\alpha(x)_Y)_Y$ with
    $\alpha(x)_Y : \mathcal{C}(X, Y) \to F(Y)$, $f \mapsto F(f)(x)$.
    **Naturality.** For any $u : A \to B$ in $\mathcal{C}$ and
    $f \in \mathcal{C}(X, A)$:
    $F(u) \circ \alpha(x)_A (f) = F(u)(F(f)(x)) = F(u \circ f)(x)
    = \alpha(x)_B(u \circ f) = \alpha(x)_B \circ h^X(u) (f)$.
    So the diagram commutes and $\alpha(x) \in \mathrm{Nat}(h^X, F)$.
    **$\alpha \circ \beta = \mathrm{id}$.** For $\psi \in \mathrm{Nat}(h^X,
    F)$ and $x := \beta(\psi) = \psi_X(\mathrm{Id}_X)$, the naturality
    of $\psi$ applied to $f : X \to Y$ gives
    $\psi_Y(f \circ \mathrm{Id}_X) = \psi_Y(f) = F(f)(\psi_X(\mathrm{Id}_X))
    = F(f)(x) = \alpha(x)_Y(f)$. Hence $\alpha(\beta(\psi)) = \psi$.
    **$\beta \circ \alpha = \mathrm{id}$.** For $x \in F(X)$,
    $\beta(\alpha(x)) = \alpha(x)_X(\mathrm{Id}_X) = F(\mathrm{Id}_X)(x)
    = \mathrm{Id}_{F(X)}(x) = x$.

!!! definition "Definition (Yoneda embedding)"
    <a id="def-cat-4-2"></a>
    For a morphism $f : X \to Y$, write $\upsilon(f) : h^Y \Rightarrow h^X$
    for the natural transformation corresponding to $f$ under the Yoneda
    bijection $\mathrm{Nat}(h^Y, h^X) \cong h^X(Y) = \mathcal{C}(X, Y)$. Its
    $W$-component sends $u \in \mathcal{C}(Y, W)$ to $u \circ f$.

??? proof "Proof (Yoneda is fully faithful)"
    (1) For any $W \in \mathrm{Obj}(\mathcal{C})$ and $u \in \mathcal{C}(X, W)$,
    $\upsilon(\mathrm{Id}_X)_W(u) = u \circ \mathrm{Id}_X = u$, so
    $\upsilon(\mathrm{Id}_X) = \mathrm{Id}_{h^X}$.
    (2) For $u \in \mathcal{C}(Z, W)$,
    $\upsilon(g \circ f)_W(u) = u \circ g \circ f = \upsilon(f)_W(u \circ g)
    = (\upsilon(f)_W \circ \upsilon(g)_W)(u)$.
    (3) If $f$ is an isomorphism, by (2) and (1)
    $\upsilon(f^{-1}) \circ \upsilon(f) = \upsilon(f \circ f^{-1})
    = \upsilon(\mathrm{Id}_Y) = \mathrm{Id}_{h^Y}$ and
    $\upsilon(f) \circ \upsilon(f^{-1}) = \mathrm{Id}_{h^X}$, so
    $\upsilon(f)$ is an isomorphism with inverse $\upsilon(f^{-1})$.
    Conversely, suppose $\upsilon(f)$ is an isomorphism with inverse
    $\upsilon(g)$ for some $g : Y \to X$. Then
    $\upsilon(g) \circ \upsilon(f) = \mathrm{Id}_{h^Y}$ gives
    $\upsilon(g \circ f) = \mathrm{Id}_{h^Y}$, i.e.
    $g \circ f = \mathrm{Id}_X$ (by Yoneda applied to $X$). Similarly
    $f \circ g = \mathrm{Id}_Y$.

    In particular, when $\mathcal{C}$ is small, the **Yoneda functor**
    $X \mapsto h^X$ embeds $\mathcal{C}^{\mathrm{op}}$ into
    $\widehat{\mathcal{C}} := \mathrm{Fun}(\mathcal{C}, \mathrm{Set})$.

## Representable Functors

!!! definition "Definition (Representable functor)"
    <a id="def-cat-5-1"></a>
    A functor $F : \mathcal{C} \to \mathrm{Set}$ is **representable** if it
    is naturally isomorphic to some $h^X = \mathcal{C}(X, \cdot)$. A choice
    of isomorphism $\varphi : h^X \Rightarrow F$ is a **representation**,
    and the element $u := \varphi_X(\mathrm{Id}_X) \in F(X)$ is the
    **universal object** of the representation.

!!! proposition "Proposition (Universal property)"
    <a id="prop-cat-5-2"></a>
    Let $\varphi : h^X \Rightarrow F$ represent $F$. For every object $Y$ and
    every $y \in F(Y)$ there is a unique $f : X \to Y$ with
    $F(f)(u) = y$, namely $f = \varphi_Y^{-1}(y)$. In particular the
    representing object $X$ is unique up to a unique isomorphism sending
    one universal object to the other.

??? proof "Proof (Universal property)"
    **Existence.** Set $f := \varphi_Y^{-1}(y) : X \to Y$ (well defined
    since $\varphi$ is an isomorphism). The naturality square
    $\varphi_Y \circ h^X(f) = F(f) \circ \varphi_X$ gives
    $F(f)(u) = F(f)(\varphi_X(\mathrm{Id}_X))
    = \varphi_Y(h^X(f)(\mathrm{Id}_X)) = \varphi_Y(f) = y$.
    **Uniqueness.** Suppose $f' : X \to Y$ also satisfies
    $F(f')(u) = y$. Then
    $F(f')(u) = F(f)(u) = y$, so
    $\varphi_Y(f') = \varphi_Y(f)$ by naturality (as in existence).
    Since $\varphi_Y$ is injective, $f' = f$.

!!! example "Example (Representable functors)"
    + The forgetful functor $U : \mathrm{Mon} \to \mathrm{Set}$ is
      represented by $(\mathbb{N}, +, 0)$: every $x \in M$ comes from a
      unique monoid homomorphism $\mathbb{N} \to M$ sending $1$ to $x$.
    + Similarly the forgetful functors $\mathrm{Gp} \to \mathrm{Set}$,
      $\mathrm{Ring} \to \mathrm{Set}$, $\mathrm{CRing} \to \mathrm{Set}$ are
      represented by $\mathbb{Z}$.
    + The "power" functor $W \mapsto W^I$ on $\mathrm{Mod}_K$ is
      represented by $K^{\oplus I}$ (the direct sum).
    + The "quotient" functor $W \mapsto \{f \in \mathrm{Hom}_K(V, W) :
      f|_{V'} = 0\}$ is represented by $V / V'$.
    + The "torsion" functor $A \mapsto A[n] := \{a : n a = 0\}$ on
      $\mathrm{Ab}$ is represented by $\mathbb{Z} / n\mathbb{Z}$.

