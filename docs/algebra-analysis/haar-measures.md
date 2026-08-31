# Haar Measures

This chapter develops the **Haar measure** on a locally compact topological
group: a non-zero left-invariant Radon measure, unique up to a positive scalar.
The construction weaves together **topological groups**, **locally compact
Hausdorff spaces**, the Riesz-representation theorem for **Radon measures**,
and finally a normalisation argument (the averaging trick over compact
neighbourhoods) that produces the Haar measure. The change-of-variables
formula closes the chapter.

## Topological Groups

!!! definition "Definition (Topological group)"
    <a id="def-hm-1-1"></a>
    A **topological group** $(G, \ast, \mathcal{T})$ is a group equipped
    with a topology such that the map
    $\varphi : G \times G \to G$, $(x, y) \mapsto x \ast \iota(y)$
    is continuous. Equivalently (Prop. 5.2.5), both the multiplication
    $G \times G \to G$ and the inversion $G \to G$ are continuous.

!!! example "Example (Common topological groups)"
    + $(\mathbb{R}, +)$, $(\mathbb{C}, +)$, $(\mathbb{R}^\times, \cdot)$ with
      the standard topology.
    + $(K, +)$ and $(K^\times, \cdot)$ for a complete valued field $K$.
    + Any normed vector space $(V, +, \|\cdot\|)$ and any Banach
      space, with addition.
    + $\mathrm{GL}(V)$ for a Banach space $V$, with the operator norm
      and composition. Inversion is continuous by the open mapping
      theorem.

!!! definition "Definition (Continuous action)"
    <a id="def-hm-1-2"></a>
    A **left action** of a topological group $G$ on a topological space
    $X$ is a continuous map $\phi : G \times X \to X$ with
    $\phi(e, x) = x$ and $\phi(a \ast b, x) = \phi(a, \phi(b, x))$.
    For $a \in G$, the partial map $L_a : X \to X$, $x \mapsto
    \phi(a, x)$ is a homeomorphism (Prop. 5.2.3). Right actions are
    defined symmetrically.

!!! proposition "Proposition (Symmetric neighbourhoods)"
    <a id="prop-hm-1-3"></a>
    Let $G$ be a topological group with identity $e$ and $U$ an open
    neighbourhood of $e$.

    1. There is a symmetric open neighbourhood $V$ of $e$ (i.e. $V =
       \iota(V)$) with $V \ast V \subseteq U$.
    2. For $a \in U$, there is an open $V$ around $e$ with $a \ast V
       \subseteq U$ and $V \ast a \subseteq U$.
    3. For $b \in U$, there is an open $V \subseteq U$ around $e$ with
       $b \ast V \ast \iota(b) \subseteq U$.

??? proof "Proof (Symmetric neighbourhoods)"
    (1) The map $\phi : G \times G \to G$, $\phi(x, y) = x \ast \iota(y)$,
    is continuous (by the topological-group axiom) and satisfies
    $\phi(e, e) = e$. Hence $\phi^{-1}(U)$ is an open neighbourhood of
    $(e, e)$, and there exist open neighbourhoods $V_1, V_2$ of $e$ with
    $V_1 \times V_2 \subseteq \phi^{-1}(U)$. Set $W = V_1 \cap V_2$
    and $V = W \cap \iota(W)$. Then $V$ is open (intersection of opens)
    and symmetric ($V = \iota(V)$). For $x, y \in V$ we have
    $x \in W \subseteq V_1$ and $\iota(y) \in \iota(W) \subseteq V_2$
    (since $\iota$ is a homeomorphism and $\iota(W) \subseteq V_2$
    by $\iota(V_2) = \iota(\iota(V_2)) \supseteq W$ via the choice
    $V_2 \supseteq W$). So $(x, \iota(y)) \in V_1 \times V_2$ and
    $\phi(x, \iota(y)) = x \ast y \in U$, i.e. $V \ast V \subseteq U$.
    (2) Set $V = L_{\iota(a)}(U) \cap R_{\iota(a)}(U) \cap U$, an open
    neighbourhood of $e$ (since $a \in U$ implies
    $\iota(a) \ast a = e \in L_{\iota(a)}(U)$ and $a \ast \iota(a) = e
    \in R_{\iota(a)}(U)$). Then
    $a \ast V = L_a(V) \subseteq L_a(L_{\iota(a)}(U)) = U$, and
    $V \ast a = R_a(V) \subseteq R_a(R_{\iota(a)}(U)) = U$.
    (3) Similarly $V = R_b(L_{\iota(b)}(U)) \cap U$ is an open
    neighbourhood of $e$ (since $b \ast \iota(b) = e \in V$) and
    $b \ast V \ast \iota(b) = L_b R_b L_{\iota(b)} R_{\iota(b)}(U)
    \subseteq U$.

## Locally Compact Hausdorff Spaces

!!! definition "Definition (Locally compact, $\sigma$-compact)"
    <a id="def-hm-2-1"></a>
    A topological space $X$ is **locally compact** if every point has
    a compact neighbourhood. It is **$\sigma$-compact** if it is a
    countable union of compact subsets.

!!! theorem "Theorem (Urysohn's lemma for locally compact Hausdorff spaces)"
    <a id="thm-hm-2-2"></a>
    Let $X$ be a locally compact Hausdorff space, $K \subseteq U$ a
    compact subset inside an open set. There is a continuous function
    $f : X \to [0, 1]$ with $f|_K = 1$ and $\mathrm{supp}(f) \subseteq U$.

??? proof "Proof (Urysohn for locally compact Hausdorff)"
    Embed $K$ in a relatively compact open $V$ with $\bar V \subseteq U$:
    cover $K$ by relatively compact open neighbourhoods (use local
    compactness at each $x \in K$) and extract a finite subcover $V_1,
    \ldots, V_n$; set $V = V_1 \cup \cdots \cup V_n$, so $\bar V$ is
    compact and $\bar V \subseteq U$. Now apply the standard Urysohn
    lemma for normal spaces to the closed set $K$ inside the open set
    $V$ (the subspace $\bar V$ is compact Hausdorff, hence normal; the
    extension theorem applies). Get $f : \bar V \to [0, 1]$ with
    $f|_K = 1$ and $\mathrm{supp}(f) \subseteq V$. Extend $f$ by $0$
    outside $V$ to get $f : X \to [0, 1]$ with $\mathrm{supp}(f)
    \subseteq \bar V \subseteq U$ and $f|_K = 1$.

!!! definition "Definition (Locally compact group)"
    <a id="def-hm-2-3"></a>
    A **locally compact group** is a topological group that is
    locally compact and Hausdorff. Equivalently, the identity has a
    compact neighbourhood.

!!! proposition "Proposition (Quotient map and Hausdorff)"
    <a id="prop-hm-2-4"></a>
    Let $\pi : X \to Y$ be a surjective open continuous map. Then
    $Y$ is Hausdorff iff the graph of the corresponding equivalence
    relation is closed in $X \times X$. Combined with Prop. 5.1.4,
    $\pi \times \pi$ is also open when $\pi$ is open.

??? proof "Proof (Quotient map and Hausdorff)"
    Let $\Delta_Y = \{(y, y) : y \in Y\} \subseteq Y \times Y$ be the
    diagonal. The graph of the equivalence relation is
    $\Gamma = (\pi \times \pi)^{-1}(\Delta_Y)$, which is closed if
    $\Delta_Y$ is closed and $\pi \times \pi$ is continuous.
    Conversely, if $\pi \times \pi$ is open (which holds when
    $\pi$ is open, by Prop 5.1.4 (2) applied to the constant
    family) and $\Gamma$ is closed, then
    $(Y \times Y) \setminus \Delta_Y = (\pi \times \pi)(\Gamma^c)$ is
    open in $Y \times Y$, so $Y$ is Hausdorff.

## Radon Measure

!!! definition "Definition (Radon measure)"
    <a id="def-hm-3-1"></a>
    A **Radon measure** on a locally compact Hausdorff space $X$ is
    a positive linear functional
    $\mu : C_c(X) \to \mathbb{R}_{\geq 0}$ on the space of continuous
    real functions with compact support. (Such functionals are
    automatically continuous in the inductive-limit topology on
    $C_c(X)$.)

!!! theorem "Theorem (Riesz–Markov representation)"
    <a id="thm-hm-3-2"></a>
    For every Radon measure $\mu$ on a locally compact Hausdorff space
    $X$ there is a unique outer-regular Borel measure $\mu^\ast$ on $X$
    with the following properties:

    + $\mu^\ast(K) < \infty$ for every compact $K$ (local finiteness);
    + $\mu^\ast(U) = \sup\{\mu^\ast(K) : K \subseteq U, K \text{
      compact}\}$ for every open $U$ (inner regularity);
    + $\mu^\ast(E) = \inf\{\mu^\ast(U) : E \subseteq U, U \text{ open}\}$
      for every Borel set $E$ (outer regularity).

    Conversely, every such measure arises from a Radon measure on
    $C_c(X)$ via $\mu(f) = \int_X f\, d\mu^\ast$.

??? proof "Proof (Riesz–Markov, sketch)"
    **Existence.** Define an outer measure on all subsets of $X$ by
    $\mu^\ast(E) = \inf\{\sum_n \mu(f_n) : f_n \in C_c(X), f_n \geq 0,
    \sum_n f_n \geq \mathbf{1}_E\}$ (Carathéodory's outer measure
    associated to $\mu$). By Urysohn-type approximation, this outer
    measure is regular: for any open $U$, $\mu^\ast(U) = \sup_K \mu^\ast(K)$
    over compact $K \subseteq U$ (inner regularity), and for any
    Borel $E$, $\mu^\ast(E) = \inf_U \mu^\ast(U)$ over open $U \supseteq
    E$ (outer regularity). The resulting measure on the $\sigma$-algebra
    of Carathéodory-measurable sets contains the Borel $\sigma$-algebra.
    **Uniqueness.** If $\mu^\ast, \nu^\ast$ are two such measures agreeing
    on $C_c(X)$, then for every compact $K$ and open $U \supseteq K$,
    approximate $\mathbf{1}_K$ by functions in $C_c(U)$ via Urysohn to
    get $\mu^\ast(K) = \nu^\ast(K)$. The regularity extends the
    equality to all Borel sets.

!!! definition "Definition (Invariant functionals)"
    <a id="def-hm-3-3"></a>
    A Radon measure $\mu$ on a locally compact group $G$ is
    **left-invariant** if
    $\int_G f(g \ast x)\, d\mu(x) = \int_G f(x)\, d\mu(x)$ for every
    $f \in C_c(G)$ and $g \in G$. **Right-invariance** is defined
    symmetrically.

## Haar Measure

??? proof "Proof (Existence of Haar measure)"
    Fix $f_0 \in C_c(G)$ with $f_0 \geq 0$,
    $f_0 \not\equiv 0$. For $f \in C_c(G)$ define the linear functional
    $I_f : C_c(G) \to \mathbb{R}$ by
    $I_f(\varphi) := \int_G \varphi(x) f(x)\, dx / \int_G \varphi(x)
    f_0(x)\, dx$ (the denominator is non-zero by Urysohn's lemma
    applied to a non-trivial compact $K \subseteq \mathrm{supp}(f_0)$).
    Equivalently, $I_f$ is a Radon measure on $G$ via
    Riesz–Markov, depending linearly on $f$ and on the chosen $f_0$.
    The family $(I_f)_f$ is independent of $f_0$ (a change of $f_0$
    rescales by a constant), and the resulting measure $\mu := I_f$
    is left-invariant: for $g \in G$ and $\varphi \in C_c(G)$,
    $\int \varphi \cdot (f \circ L_g^{-1})\, d\mu = \int
    (\varphi \circ L_g) f\, d\mu$ (change of variables in the
    numerator) and similarly for $f_0$, so the ratio is unchanged.
    **Uniqueness.** If $\mu, \nu$ are left-invariant Radon measures,
    take $f \in C_c(G)$ with $\int f\, d\mu, \int f\, d\nu > 0$ and
    consider the constant
    $c = \int f\, d\mu / \int f\, d\nu$. For any $\varphi \in C_c(G)$
    and $g \in G$, the left-invariance gives
    $\int \varphi\, d\mu = \int (\varphi \circ L_g)\, d\mu$ and
    similarly for $\nu$. By a partition-of-unity argument
    (approximating $\mathbf{1}_K$ for arbitrary compact $K$), the
    ratio of the two measures is the same constant $c$ on every
    compact set, hence on every Borel set by outer regularity.

!!! theorem "Theorem (Haar measure on a second-countable group is $\sigma$-finite)"
    <a id="thm-hm-4-2"></a>
    If $G$ is a locally compact group that is second-countable, the
    Haar measure is $\sigma$-finite. The Riesz representation theorem
    then identifies $C_c(G)^\vee$ with the space of finite Radon
    measures.

??? proof "Proof (Haar on a second-countable group is $\sigma$-finite)"
    Second-countable $\Rightarrow$ Lindelöf $\Rightarrow$ $G = \bigcup_n
    K_n$ for an increasing sequence of compact sets. The Haar
    measure $\mu$ is finite on every compact $K_n$ (by local
    compactness and the fact that any compact set can be covered by
    finitely many translates of a fixed compact neighbourhood of the
    identity, all of which have finite measure). So $\mu = \sum_n
    \mu|_{K_n}$ is a sum of finite measures, i.e. $\sigma$-finite.
    By the Riesz–Markov theorem, the dual of $C_c(G)$ is identified
    with finite Radon measures, and the Haar measure corresponds to
    a single such measure.

!!! definition "Definition (Modular function)"
    <a id="def-hm-4-3"></a>
    For a locally compact group $G$ with left Haar measure $\mu$, the
    **modular function** $\Delta : G \to \mathbb{R}_{>0}$ is defined
    by $\mu(E g) = \Delta(g)\, \mu(E)$ for all Borel $E$ and $g \in G$.
    It is a continuous group homomorphism; the Haar measure is
    bi-invariant iff $\Delta$ is trivial.

## Change of Variables

!!! theorem "Theorem (Change of variables for Haar measure)"
    <a id="thm-hm-5-1"></a>
    Let $G$ be a locally compact group with left Haar measure $\mu$,
    and let $\phi : G \to G$ be a homeomorphism. Then there is a
    unique constant $J(\phi) > 0$ (the **Jacobian** of $\phi$) such
    that for every non-negative Borel function $f$ on $G$,

    $$
    \int_G f(\phi(x))\, d\mu(x) = J(\phi) \int_G f(y)\, d\mu(y).
    $$

    For the left translation $L_g$, $J(L_g) = 1$ (left-invariance).

??? proof "Proof (Change of variables)"
    The map $\phi_* \mu$ defined by $(\phi_* \mu)(E) = \mu(\phi^{-1}(E))$
    is a non-zero Radon measure on $G$ (homeomorphisms preserve
    Borel sets and local compactness). For $g \in G$ and Borel $E$,
    $(\phi_* \mu)(g E) = \mu(\phi^{-1}(g E)) = \mu(\phi^{-1}(g)
    \phi^{-1}(E))$. By uniqueness of the Haar measure up to a scalar,
    $\phi_* \mu = J(\phi)\, \mu$ for some constant $J(\phi) > 0$.
    For $L_g$ this gives $J(L_g) = 1$ since $L_g$ leaves $\mu$
    invariant. The change-of-variables formula is the rewriting
    $\int f\, d(\phi_* \mu) = \int (f \circ \phi)\, d\mu$.
    For a $C^1$-diffeomorphism $\phi$ of a connected Lie group $G$,
    the Jacobian is

    $$
    J(\phi) = \frac{|\det(\mathrm{Ad}(\phi) \circ D\phi)|}{|\det(D\phi)|}
    $$

    in a coordinate chart, with $\mathrm{Ad}(\phi) = D\phi \circ
    D(\phi^{-1}) \circ D\phi^{-1}$. In particular, for an open
    subset $U \subseteq G$ and a $C^1$-diffeomorphism $\phi : U \to
    \phi(U)$,

    $$
    \int_{\phi(U)} f(y)\, d\mu(y) = \int_U f(\phi(x))\, |J(\phi)(x)|\, d\mu(x).
    $$

!!! example "Example (Haar measure on $\mathbb{R}^n$, $K^\times$)"
    + On $(\mathbb{R}^n, +)$, the Haar measure is Lebesgue measure
      $dx$, recovered from the requirement
      $\int f(x + a)\, dx = \int f(x)\, dx$.
    + On $(\mathbb{R}^\times, \cdot)$, the left Haar measure is
      $\frac{dx}{|x|}$.
    + On $\mathrm{GL}_n(\mathbb{R})$, the left Haar measure is
      $\frac{dX}{|\det X|^n}$.

