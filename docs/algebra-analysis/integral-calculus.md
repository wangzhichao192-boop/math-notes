# Integral Calculus

This chapter develops the integral in three complementary directions:
**differential 1-forms** (change-of-variables for $\int g \circ f$), the
**Riesz-space approach** to Daniell–Lebesgue integration (extending an
integral operator $I : S \to \mathbb{R}$ from a small lattice to the full
$L^1$), and **semirings with $\sigma$-additive measures** (the
measure-theoretic foundation). The first half of the chapter is essentially
"generalised calculus in Banach spaces"; the second half is the modern
construction of the Lebesgue integral.

## Differential 1-Forms

!!! definition "Definition (Differential 1-form)"
    <a id="def-10-1-1"></a>
    Let $(K, |\cdot|)$ be a complete valued field, $(E, \|\cdot\|_E)$ a
    normed space over $K$, and $f : U \subseteq E \to F$ a differentiable
    map. The **differential 1-form** of $f$ is the map

    $$
    df : U \longrightarrow L(E, F), \quad p \longmapsto Df(p).
    $$

    When $F = K$ and $E = K^n$, $df(p) = \sum_{i=1}^{n} \frac{\partial f}
    {\partial x_i}(p)\, dx_i$.

!!! definition "Definition (Tensor product of 1-forms and maps)"
    <a id="def-10-1-2"></a>
    Let $(K', |\cdot|')$ be a complete valued extension of $(K, |\cdot|)$ and
    $(F, \|\cdot\|_F)$ a normed space over $K'$. For maps
    $\alpha : U \to L(E, K')$ and $s : U \to F$ define the
    **tensor product**

    $$
    \alpha \otimes s : U \longrightarrow L(E, F),
    \quad p \longmapsto \big(h \mapsto \alpha(p)(h)\, s(p)\big).
    $$

    The norm satisfies
    $\|\alpha(p)(h)\, s(p)\|_F \leq \|\alpha(p)\| \cdot \|s(p)\|_F \cdot \|h\|_E$.

!!! proposition "Proposition (Leibniz rule for forms)"
    <a id="prop-10-1-3"></a>
    Let $f : U \to K'$ and $g : U \to F$ be differentiable. Then

    $$
    d(f g) = f\, dg + df \otimes g.
    $$

    Special case $F = K'$: $d(f g) = f\, dg + g\, df$.

??? proof "Proof (Leibniz rule for forms)"
    Expand $D(fg)(p)(h)$ using the product rule in $F$: it equals
    $f(p) Dg(p)(h) + Df(p)(h) g(p)$, which by definition is
    $(p \mapsto f(p)\, dg(p) + df(p) \otimes g(p))$ evaluated at $h$.

!!! proposition "Proposition (Chain rule for forms)"
    <a id="prop-10-1-4"></a>
    Let $f : U \to V \subseteq K'$ and $g : V \to F$ be differentiable. Then

    $$
    d(g \circ f) = df \otimes (g' \circ f).
    $$

??? proof "Proof (Chain rule for forms)"
    By the chain rule for differentials (Thm 9-2-3),
    $D(g \circ f)(p)(h) = Dg(f(p))(Df(p)(h))
    = Df(p)(h) \cdot g'(f(p))$ (since $Dg(f(p))$ is scalar-valued
    multiplication by $g'(f(p))$ when $F$ is one-dimensional over $K'$).
    This is the evaluation of $df(p) \otimes (g' \circ f)(p)$ at $h$.

## Primitive Functions

!!! proposition "Proposition (Vanishing differential on path-connected open)"
    <a id="prop-10-2-1"></a>
    If $U \subseteq E$ is path-connected and $f : U \to F$ has $df = 0$, then
    $f$ is constant.

??? proof "Proof (Vanishing differential)"
    Let $p, q \in U$ and $\gamma : [0, 1] \to U$ a path with
    $\gamma(0) = p$, $\gamma(1) = q$. Then
    $\|f(p) - f(q)\| = \|f(\gamma(0)) - f(\gamma(1))\|$. Apply the
    scalar mean-value inequality to each component of $f \circ \gamma$ (or
    directly: by the chain rule,
    $\frac{d}{dt} f(\gamma(t)) = Df(\gamma(t))(\gamma'(t)) = 0$ whenever
    $\gamma$ is differentiable, so $f \circ \gamma$ is constant on $[0, 1]$).
    More elementarily, the mean-value inequality gives
    $\|f(p) - f(q)\| \leq \sup_{t \in [0, 1]} \|Df(\gamma(t))(\gamma'(t))\| = 0$.

!!! definition "Definition (Primitive)"
    <a id="def-10-2-2"></a>
    Let $I \subseteq \mathbb{R}$ be open and $\varphi : I \to F$. A
    **primitive** of $\varphi$ is a $\Phi : I \to F$ with $\Phi' = \varphi$.
    We write $\int \varphi(t)\, dt$ for an arbitrary primitive; by the
    proposition above, it equals $\Phi(t) + C$ for some constant $C$.

!!! proposition "Proposition (Integration by parts)"
    <a id="prop-10-2-2-prop"></a>
    If $g : I \to \mathbb{R}$ and $\varphi : I \to F$ have primitives
    $G, \Phi$, then

    $$
    \int G(t)\, d\Phi(t) + \int dG(t) \otimes \Phi(t) = G(t)\, \Phi(t) + C,
    $$

    or, in the scalar case $F = \mathbb{R}$ (or $\mathbb{C}$),

    $$
    \int G(t)\, d\Phi(t) + \int \Phi(t)\, dG(t) = G(t)\, \Phi(t) + C.
    $$

??? proof "Proof (Integration by parts)"
    Differentiate the product $G \Phi$: by the Leibniz rule (Prop 10-1-3),
    $d(G \Phi) = G\, d\Phi + dG \otimes \Phi$. Integrating gives
    $G \Phi = \int G\, d\Phi + \int dG \otimes \Phi + C$.

!!! example "Example (Substitution)"
    For $f : U \to V$ and $g : V \to F$ both differentiable,
    $\int df(t) \otimes g'(f(t)) = g(f(t)) + C$. For instance
    $\int \sin(t) \cos(t)\, dt = \tfrac{1}{2} \sin^2(t) + C$.

## Riesz Spaces

!!! definition "Definition (Riesz space on $\Omega$)"
    <a id="def-10-3-1"></a>
    Endow $\mathbb{R}^{\Omega}$ with the pointwise order. A vector subspace
    $S \subseteq \mathbb{R}^{\Omega}$ is a **Riesz space** if
    $\inf\{f, g\} \in S$ for every $f, g \in S$. Then automatically
    $\sup\{f, g\} = f + g - \inf\{f, g\} \in S$ and $|f| \in S$ for all
    $f \in S$.

!!! definition "Definition (Integral operator)"
    <a id="def-10-3-2"></a>
    An **integral operator** on a Riesz space $S$ is an $\mathbb{R}$-linear
    map $I : S \to \mathbb{R}$ such that

    1. **Monotonicity:** $f \leq g \Rightarrow I(f) \leq I(g)$.
    2. **Continuity from above at zero:** if $(f_n)$ is decreasing in $S$
       and converges pointwise to $0$, then $\lim I(f_n) = 0$.

!!! example "Example (Lebesgue–Stieltjes from an increasing right-continuous $\varphi$)"
    <a id="ex-10-3-3"></a>
    Let $S$ be generated by indicators $\mathbf{1}_{]a, b]}$ with $a \leq b$.
    Given an increasing right-continuous $\varphi : \mathbb{R} \to \mathbb{R}$,
    the map $I_{\varphi}(\sum \lambda_i \mathbf{1}_{]a_i, b_i]}) =
    \sum \lambda_i (\varphi(b_i) - \varphi(a_i))$ extends to an integral
    operator; the case $\varphi = \mathrm{id}$ recovers the Riemann integral.

??? proof "Proof (Well-definedness and integral-operator properties of $I_\varphi$)"
    Suppose $\sum_{i=1}^{n} \lambda_i \mathbf{1}_{]a_i, b_i]} = \sum_{j=1}^{m}
    \mu_j \mathbf{1}_{]c_j, d_j]}$. Refine both partitions to a common
    partition $\{]x_k, y_k]\}_k$ with the intervals pairwise disjoint.
    Each $]a_i, b_i]$ is a disjoint union of $]x_k, y_k]$'s (possibly
    empty), so $\sum_i \lambda_i = \sum_k \lambda_i^{(k)}$ where
    $\lambda_i^{(k)} = \lambda_i$ if $]x_k, y_k] \subseteq ]a_i, b_i]$ and
    $0$ otherwise. Then
    $\sum_i \lambda_i (\varphi(b_i) - \varphi(a_i)) = \sum_k
    \lambda_i^{(k)} (\varphi(y_k) - \varphi(x_k))$, and similarly for the
    $\mu_j$'s. By additivity of $\varphi$ on the right-continuous
    partition, the two totals coincide. Monotonicity and continuity from
    above are routine.

!!! proposition "Proposition (Monotone convergence ↔ vanishing at zero)"
    <a id="prop-10-3-4"></a>
    An $\mathbb{R}$-linear monotone $I : S \to \mathbb{R}$ is an integral
    operator iff for every increasing $(f_n) \in S^{\mathbb{N}}$
    converging pointwise to some $f \in S$, $\lim I(f_n) = I(f)$.

??? proof "Proof (Equivalence of the two convergence properties)"
    ($\Rightarrow$) Apply the hypothesis to $f - f_n$, which is decreasing
    to $0$: $\lim I(f - f_n) = 0$ gives $\lim I(f_n) = I(f)$.
    ($\Leftarrow$) Apply the hypothesis to $-f_n$, which is increasing
    to $0$: $\lim I(-f_n) = 0$, i.e. $\lim I(f_n) = 0$.

!!! definition "Definition ($S^{\uparrow}, S^{\downarrow}$)"
    <a id="def-10-3-5"></a>
    + $S^{\uparrow}$ = pointwise limits of increasing sequences in $S$.
    + $S^{\downarrow}$ = pointwise limits of decreasing sequences in $S$.

    Both are closed under positive scalar multiplication, finite
    $\inf$/$\sup$, and limits of monotone sequences. An integral operator
    $I$ extends uniquely to $S^{\uparrow}$ (by monotone convergence) and
    to $S^{\downarrow}$ via $I(f) = -I(-f)$.

??? proof "Proof (Independence of the choice of increasing sequence)"
    Suppose $f = \lim_n f_n = \lim_n g_n$ with both sequences increasing in
    $S$. Then $h_n = \sup\{f_1, \ldots, f_n, g_1, \ldots, g_n\}$ is
    increasing in $S$ with limit $f$ (pointwise sup of two increasing
    sequences bounded by $f$). By monotone convergence $I(h_n) \to I(f)$.
    But $f_k \leq h_n$ for $k \leq n$ gives $I(f_k) \leq I(h_n)$ in the
    limit, so $\lim I(f_k) \leq I(f)$. The other inequality is similar.

!!! definition "Definition (Daniell integrable)"
    <a id="def-10-3-6"></a>
    A function $f : \Omega \to \mathbb{R}$ is **Daniell integrable** if

    $$
    \underline{I}(f) := \sup_{\substack\{l \in S^{\downarrow} \\ l \leq f\}} I(l)
    = \inf_{\substack\{\mu \in S^{\uparrow} \\ \mu \geq f\}} I(\mu)
    =: \overline{I}(f) \in \mathbb{R}.
    $$

    The set $L^1(I)$ of all such $f$ carries a natural integral $I$ extending
    the original one. $L^1(I)$ is itself a Riesz space.

!!! theorem "Theorem (Beppo Levi)"
    <a id="thm-10-3-7"></a>
    If $(f_n)$ is a monotone sequence in $L^1(I)$ converging pointwise to
    $f : \Omega \to \mathbb{R}$, and $\lim I(f_n) \in \mathbb{R}$, then
    $f \in L^1(I)$ and $I(f) = \lim I(f_n)$.

??? proof "Proof (Beppo Levi)"
    Assume WLOG that $(f_n)$ is increasing and $f_0 = 0$. Fix
    $\varepsilon > 0$ and choose $\mu_n \in S^\uparrow$ with
    $f_n - f_{n-1} \leq \mu_n$ and
    $I(\mu_n) \leq I(f_n - f_{n-1}) + \varepsilon/2^n$. Then
    $f_n \leq \mu_1 + \cdots + \mu_n$ and
    $I(f_n) \geq I(\mu_1) + \cdots + I(\mu_n) - \varepsilon$. Letting
    $n \to \infty$ and using monotone convergence on $\mu = \lim \sum_{k}
    \mu_k \in S^\uparrow$, we get $I(f) \geq I(\mu) - \varepsilon \geq
    \overline{I}(f) - \varepsilon$. The reverse inequality
    $\underline{I}(f) \geq I(f) - \varepsilon$ comes from a similar
    estimate using $l_n \in S^\downarrow$ with $l_n \leq f_n$ and
    $I(l_n) \geq I(f_n) - \varepsilon$.

!!! theorem "Theorem (Daniell)"
    <a id="thm-10-3-8"></a>
    $L^1(I)$ is a Riesz space and $I : L^1(I) \to \mathbb{R}$ is an
    integral operator extending $I$ on $S$. In particular,
    $|f| \in L^1(I)$ whenever $f \in L^1(I)$.

??? proof "Proof (Daniell)"
    By the monotonicity of $I$ and the linearity of $I$, $L^1(I)$ is a
    vector subspace of $\mathbb{R}^\Omega$ and $I$ is $\mathbb{R}$-linear
    and monotone on it. Take $f_1, f_2 \in L^1(I)$ and $\varepsilon > 0$;
    pick $l_1, l_2 \in S^\downarrow$ and $\mu_1, \mu_2 \in S^\uparrow$
    with $l_i \leq f_i \leq \mu_i$ and
    $I(\mu_i - l_i) \leq \varepsilon / 2$. A case analysis on the
    relative position of $\mu_1, \mu_2$ at each $\omega$ shows
    $|\inf\{\mu_1, \mu_2\} - \inf\{l_1, l_2\}| \leq (\mu_1 - l_1) + (\mu_2 - l_2)$,
    hence $I(\inf\{\mu_1, \mu_2\} - \inf\{l_1, l_2\}) \leq \varepsilon$.
    So $\inf\{f_1, f_2\} \in L^1(I)$. Given an increasing $(f_n) \subset
    L^1(I)$ with $f_n \uparrow f$ and $\sup I(f_n) < \infty$, Beppo
    Levi gives $f \in L^1(I)$ and $I(f) = \lim I(f_n)$, showing $I$
    is an integral operator on $L^1(I)$.

!!! theorem "Theorem (Fatou)"
    <a id="thm-10-3-9"></a>
    Let $(f_n) \in L^1(I)^{\mathbb{N}}$ be bounded below by some
    $g \in L^1(I)$. Then $\liminf_n f_n \in L^1(I)$ and

    $$
    I\!\left( \liminf_n f_n \right) \leq \liminf_n I(f_n).
    $$

    When $\liminf I(f_n) < +\infty$ and the limit inferior takes finite
    values, $\liminf f_n \in L^1(I)$.

??? proof "Proof (Fatou)"
    Set $g_n = \inf_{k \geq 0} f_{n+k}$, an increasing sequence in
    $L^1(I)$ with pointwise limit $\liminf_n f_n$ and $g_n \geq g$.
    Each $g_n$ is in $L^1(I)$ by Daniell's theorem. The sequence
    $(I(g_n))$ is increasing (monotonicity of $I$) and bounded above by
    $\liminf I(f_n)$. So $I(g_n) \to I(\liminf f_n) \leq \liminf I(f_n)$
    by Beppo Levi. The "moreover" follows from the bounded-below
    hypothesis giving $I(g) > -\infty$, so the constant sequence $g$ is
    a witness to $\overline{I}(\liminf f_n) < \infty$.

!!! theorem "Theorem (Dominated convergence, Lebesgue)"
    <a id="thm-10-3-10"></a>
    Let $(f_n) \in L^1(I)^{\mathbb{N}}$ converge pointwise to $f : \Omega \to
    \mathbb{R}$ and satisfy $|f_n| \leq g$ for some $g \in L^1(I)$. Then
    $f \in L^1(I)$ and $I(f) = \lim I(f_n)$.

??? proof "Proof (Dominated convergence)"
    Apply Fatou to $f_n$ and to $-f_n$, both bounded below by $-g$:
    $I(\liminf f_n) \leq \liminf I(f_n)$ and
    $I(\liminf (-f_n)) \leq \liminf I(-f_n) = -\limsup I(f_n)$.
    Note $-I(g) \leq I(\liminf (-f_n))$. Combined:
    $-I(g) \leq -\limsup I(f_n)$, so
    $\limsup I(f_n) \leq I(g)$. Similarly $\liminf I(f_n) \geq -I(g)$.
    So $I(\liminf f_n) \leq \liminf I(f_n) \leq \limsup I(f_n) \leq
    I(\limsup f_n) = I(\liminf f_n)$ (pointwise). The inequalities are
    equalities, so the sequence $I(f_n)$ converges to the common value,
    and $\lim f_n \in L^1(I)$ by Beppo Levi.

## Convexity (Banach-space perspective)

!!! definition "Definition (Convex, concave functions)"
    <a id="def-10-4-1"></a>
    Let $U \subseteq E$ be convex. A map $f : U \to \mathbb{R}$ is
    **convex** if its epigraph
    $\Gamma_+(f) = \{(x, a) \in U \times \mathbb{R} : f(x) \leq a\}$ is
    convex in $E \times \mathbb{R}$. It is **concave** if its hypograph
    $\Gamma_-(f) = \{(x, a) : f(x) \geq a\}$ is convex.

!!! proposition "Proposition (Two-point criterion for convexity)"
    <a id="prop-10-4-2"></a>
    For a map $f : U \to \mathbb{R}$ on a convex $U \subseteq E$:

    + $f$ is convex iff $f(\lambda x + (1 - \lambda) y) \leq \lambda f(x)
      + (1 - \lambda) f(y)$ for every $x, y \in U$ and $\lambda \in [0, 1]$.
    + $f$ is concave iff the inequality is reversed.

??? proof "Proof (Two-point criterion)"
    (1 $\Rightarrow$ 2): $(x, f(x))$ and $(y, f(y))$ lie in $\Gamma_+(f)$,
    so their convex combination
    $(\lambda x + (1 - \lambda) y, \lambda f(x) + (1 - \lambda) f(y))$
    lies in $\Gamma_+(f)$, i.e. $f(\lambda x + (1 - \lambda) y) \leq
    \lambda f(x) + (1 - \lambda) f(y)$.
    (2 $\Rightarrow$ 1): Take $(x, a), (y, b) \in \Gamma_+(f)$. Then
    $\lambda a + (1 - \lambda) b \geq \lambda f(x) + (1 - \lambda) f(y)
    \geq f(\lambda x + (1 - \lambda) y)$, so
    $(\lambda x + (1 - \lambda) y, \lambda a + (1 - \lambda) b) \in
    \Gamma_+(f)$.

!!! proposition "Proposition (Convexity via tangent support)"
    <a id="prop-10-4-3"></a>
    Let $U$ be open and convex, $f : U \to \mathbb{R}$ differentiable.
    Then $f$ is convex iff for every $(p, x) \in U^2$,

    $$
    f(x) \geq f(p) + Df(p)(x - p).
    $$

    When $f$ is convex, equality
    $f(x) = \sup_{p \in U} (f(p) + Df(p)(x - p))$ holds.

??? proof "Proof (Convexity via tangent support)"
    (⇐) For $x, y \in U$ and $\lambda \in [0, 1]$, apply the inequality
    to $p = \lambda x + (1 - \lambda) y$ and to $x$ and $y$ in place of
    $x$: $f(x) \geq f(p) + Df(p)(x - p)$ and
    $f(y) \geq f(p) + Df(p)(y - p)$. Multiply by $\lambda$ and
    $1 - \lambda$ and add:
    $\lambda f(x) + (1 - \lambda) f(y) \geq f(p) + Df(p)(\lambda x
    + (1 - \lambda) y - p) = f(p)$. So $f$ is convex.
    (⇒) Apply the mean-value inequality to the function
    $g(t) = f(p + t(x - p))$: $f(x) - f(p) = g(1) - g(0) \geq
    \min_{t \in [0, 1]} g'(t) \cdot 1 = g'(0) = Df(p)(x - p)$
    (using $g' \geq g'(0)$ because $g$ is convex as a function of
    $t \in [0, 1]$).
    For the equality: $f \geq f(p) + Df(p)(x - p)$ from the inequality,
    and at $x = p$ equality holds; so $f$ is the supremum of the
    affine majorants $x \mapsto f(p) + Df(p)(x - p)$.

!!! theorem "Theorem (Cauchy–Schwarz for semidefinite forms)"
    <a id="thm-10-4-4"></a>
    Let $\varphi : E \times E \to \mathbb{R}$ be a symmetric bilinear form
    with $\varphi(x, x) \geq 0$ for all $x$ (**semidefinite**). Then for
    every $(x, y) \in E \times E$,

    $$
    \varphi(x, y)^2 \leq \varphi(x, x)\, \varphi(y, y),
    $$

    with equality iff $x + t y \in \ker \varphi$ for some $t$.

??? proof "Proof (Cauchy–Schwarz for semidefinite forms)"
    If $\varphi(y, y) = 0$ then $y \in \ker \varphi$ by Lem 10-4-2; in
    particular $\varphi(x, y) = 0$ and the inequality is equality.
    If $\varphi(y, y) > 0$, the quadratic
    $t \mapsto \varphi(x + ty, x + ty) = \varphi(y, y) t^2 + 2
    \varphi(x, y) t + \varphi(x, x) \geq 0$ has discriminant
    $\leq 0$, i.e. $\varphi(x, y)^2 \leq \varphi(x, x) \varphi(y, y)$.
    Equality holds iff the discriminant is zero, i.e. the quadratic has
    a double root $t = -\varphi(x, y)/\varphi(y, y)$, meaning
    $x + ty \in \ker \varphi$.

!!! theorem "Theorem (Twice-differentiable convexity)"
    <a id="thm-10-4-5"></a>
    Let $f : U \to \mathbb{R}$ be twice differentiable on an open convex
    $U$. If $D^2 f(p)$ is semidefinite for every $p \in U$, then $f$ is
    convex.

??? proof "Proof (Twice-differentiable convexity)"
    Fix $p, x \in U$ and apply the one-dimensional Taylor–Lagrange
    expansion to $g(t) = f(p + t(x - p))$ at $t = 0$:
    $g(1) = g(0) + g'(0) + \frac{1}{2} g''(\xi)$ for some $\xi \in (0, 1)$
    (or the integral form
    $g(1) = g(0) + g'(0) + \int_0^1 (1 - t) g''(t)\, dt$).
    Now $g'(0) = Df(p)(x - p)$ and
    $g''(t) = D^2 f(p + t(x - p))(x - p, x - p) \geq 0$ by
    semidefiniteness. So $g(1) \geq g(0) + g'(0)$, i.e.
    $f(x) \geq f(p) + Df(p)(x - p)$, and the tangent-support
    criterion (Prop 10-4-3) gives convexity.

## Semirings

!!! definition "Definition (Semiring on $\Omega$)"
    <a id="def-10-5-1"></a>
    A family $\mathcal{C} \subseteq \mathscr{P}(\Omega)$ is a **semiring**
    if

    1. $\varnothing \in \mathcal{C}$;
    2. $A \cap B \in \mathcal{C}$ for every $A, B \in \mathcal{C}$;
    3. for every $A, B \in \mathcal{C}$, there exist pairwise disjoint
       $C_1, \ldots, C_n \in \mathcal{C}$ with $B \setminus A = C_1 \cup
       \cdots \cup C_n$.

    **Canonical example:** $\mathcal{C} = \{]a, b] : a \leq b\}$ on $\mathbb{R}$.

!!! proposition "Proposition (Closure properties of a semiring)"
    <a id="prop-10-5-2"></a>
    Let $\mathcal{C}$ be a semiring on $\Omega$.

    1. $B \setminus (A_1 \cup \cdots \cup A_n)$ (for $A_i, B \in
       \mathcal{C}$) is a disjoint union of finitely many sets in
       $\mathcal{C}$ (induction on $n$).
    2. Any finite subset $\Theta \subseteq \mathcal{C}$ has a finite
       disjoint refinement $\Phi \subseteq \mathcal{C}$ (each element of
       $\Theta$ is a disjoint union of elements of $\Phi$).
    3. The set $\mathcal{A} = \{A_1 \cup \cdots \cup A_n : A_i \in
       \mathcal{C}\}$ is closed under union, intersection, and set
       difference.

??? proof "Proof (Closure properties of a semiring)"
    (1) For $n = 0$ trivial. Suppose
    $B \setminus (A_1 \cup \cdots \cup A_{n-1}) = C_1 \cup \cdots \cup C_m$
    with the $C_i$ pairwise disjoint in $\mathcal{C}$. Then
    $B \setminus (A_1 \cup \cdots \cup A_n) = (C_1 \cup \cdots \cup C_m)
    \setminus A_n = \bigcup_i (C_i \setminus A_n)$, each $C_i \setminus A_n$
    is a disjoint union of finitely many elements of $\mathcal{C}$ (by
    (3) of the semiring axioms). Concatenate.
    (2) Index $\Theta = \{B_1, \ldots, B_n\}$. For each non-empty
    $J \subseteq \{1, \ldots, n\}$, the set
    $B_J := (\bigcap_{j \in J} B_j) \setminus (\bigcup_{j \notin J} B_j)$
    is in $\mathcal{A}$ by (3), so is a finite disjoint union of elements
    of $\mathcal{C}$. The $B_J$ are pairwise disjoint by construction,
    and every $B_i$ is the union of those $B_J$ with $i \in J$. Refining
    each $B_J$ into a disjoint union of $\mathcal{C}$-elements gives
    $\Phi$.
    (3) The refinement in (2) writes $A = A_1 \cup \cdots \cup A_n$ and
    $A' = A_1' \cup \cdots \cup A_m'$ as disjoint unions, then refines
    both to a common partition $\Phi$. Then $A \cup A'$, $A \cap A'$ and
    $A \setminus A'$ are all unions of the disjoint pieces in $\Phi$.

!!! proposition "Proposition (Step functions form a Riesz space)"
    <a id="prop-10-5-3"></a>
    The $\mathbb{R}$-vector space $S$ generated by $\{\mathbf{1}_A : A \in
    \mathcal{C}\}$ is a Riesz space: any pair $f, g \in S$ can be written
    as $\sum a_i \mathbf{1}_{C_i}$ and $\sum b_i \mathbf{1}_{C_i}$ with
    the $C_i$ pairwise disjoint, and
    $\inf\{f, g\} = \sum \min\{a_i, b_i\}\, \mathbf{1}_{C_i} \in S$.

??? proof "Proof (Step functions form a Riesz space)"
    By Prop 10-5-2 (2), any two step functions
    $f = \sum \lambda_A \mathbf{1}_A$ and $g = \sum \mu_B \mathbf{1}_B$
    can be written on a common partition $\Phi = \{C_1, \ldots, C_n\}$ of
    pairwise-disjoint elements of $\mathcal{C}$ as
    $f = \sum a_i \mathbf{1}_{C_i}$, $g = \sum b_i \mathbf{1}_{C_i}$
    with $a_i = \sum_{A \supseteq C_i} \lambda_A$ and similarly for $b_i$.
    The min is computed pointwise, so
    $\inf\{f, g\} = \sum \min(a_i, b_i) \mathbf{1}_{C_i} \in S$.

## $\sigma$-Additive Functions

!!! definition "Definition (Additive, $\sigma$-additive)"
    <a id="def-10-6-1"></a>
    Let $\mathcal{C} \subseteq \mathscr{P}(\Omega)$ and
    $\mu : \mathcal{C} \to \mathbb{R}_{\geq 0}$.

    + $\mu$ is **additive** if $\mu(A_1 \cup \cdots \cup A_n) =
      \mu(A_1) + \cdots + \mu(A_n)$ whenever $A_1, \ldots, A_n \in
      \mathcal{C}$ are pairwise disjoint with union in $\mathcal{C}$.
      (Forces $\mu(\varnothing) = 0$.)
    + $\mu$ is **$\sigma$-additive** if for any countable family of
      pairwise disjoint $C_i \in \mathcal{C}$ with $\bigcup C_i \in
      \mathcal{C}$,

      $$
      \mu\!\left( \bigcup_i C_i \right) = \sum_i \mu(C_i)
      $$

      (the sum of an infinite series defined as the sup of its finite
      partial sums).

!!! proposition "Proposition (Extension to a Riesz integral operator)"
    <a id="prop-10-6-2"></a>
    Let $\mathcal{C}$ be a semiring, $\mu : \mathcal{C} \to \mathbb{R}_{\geq
    0}$ additive, and $S$ the $\mathbb{R}$-vector space generated by
    $\mathbf{1}_A$ ($A \in \mathcal{C}$).

    1. There is a unique $\mathbb{R}$-linear $I : S \to \mathbb{R}$ with
       $I(\mathbf{1}_A) = \mu(A)$.
    2. $\mu$ extends uniquely to an additive
       $\mu : \mathcal{A} \to \mathbb{R}_{\geq 0}$ on the algebra
       $\mathcal{A}$ generated by $\mathcal{C}$.

??? proof "Proof (Extension to a Riesz integral operator)"
    (1) $I$ is forced to be $I(\sum a_i \mathbf{1}_{A_i}) = \sum a_i
    \mu(A_i)$ if it exists. For well-definedness, suppose
    $\sum \lambda_A \mathbf{1}_A = \sum \mu_B \mathbf{1}_B$ in $S$. Take
    a common refinement $\{C_1, \ldots, C_n\}$ of $\{A\} \cup \{B\}$
    into pairwise-disjoint elements of $\mathcal{C}$ (Prop 10-5-2 (2)).
    On each $C_i$, the two functions are constant; summing gives
    $\sum_i (\sum_{A \supseteq C_i} \lambda_A) \mathbf{1}_{C_i}$ and
    similarly for the $\mu_B$'s. So the two sets of coefficients
    coincide, and therefore
    $\sum_A \lambda_A \mu(A) = \sum_i (\sum_{A \supseteq C_i} \lambda_A)
    \mu(C_i) = \sum_B \mu_B \mu(B)$.
    (2) Define $\mu(A) = I(\mathbf{1}_A)$ for $A \in \mathcal{A}$. If
    $A = B_1 \cup \cdots \cup B_m$ is a disjoint decomposition with
    $B_j \in \mathcal{C}$, then $I(\mathbf{1}_A) = \sum I(\mathbf{1}_{B_j})
    = \sum \mu(B_j)$; for any other decomposition the same value is
    obtained by refining.

!!! theorem "Theorem ($\sigma$-additivity characterisations)"
    <a id="thm-10-6-3"></a>
    For $\mu : \mathcal{C} \to \mathbb{R}_{\geq 0}$ additive, the
    following are equivalent:

    1. $\mu$ is $\sigma$-additive on $\mathcal{C}$.
    2. $\mu$ extends $\sigma$-additively to $\mathcal{A}$.
    3. **Continuity from above at $\varnothing$:** for any decreasing
       sequence $(A_n) \in \mathcal{A}^{\mathbb{N}}$ with $\bigcap A_n =
       \varnothing$, $\lim \mu(A_n) = 0$.
    4. $I : S \to \mathbb{R}$ is an integral operator on the Riesz space
       $S$.

??? proof "Proof (Equivalence of the $\sigma$-additivity conditions)"
    (1 $\Rightarrow$ 2): If $(A_n) \subset \mathcal{A}$ is a disjoint
    sequence with $A = \bigcup A_n \in \mathcal{A}$, then
    $\mu(A) = I(\mathbf{1}_A) = I(\sum \mathbf{1}_{A_n})$ (well defined
    because $S$ is a vector space). Since $\sum_{k=0}^{N} \mathbf{1}_{A_k}
    \uparrow \mathbf{1}_A$ pointwise and $I$ is monotone,
    $I(\mathbf{1}_{A_k \text{ summed}}) \to I(\mathbf{1}_A)$.
    (2 $\Rightarrow$ 3): Given $(A_n)$ decreasing with $\bigcap A_n =
    \varnothing$, set $B_n = A_n \setminus A_{n+1} \in \mathcal{A}$; the
    $B_n$ are disjoint and $A_0 = \bigsqcup_n B_n \cup \bigcap A_n =
    \bigsqcup_n B_n$. By $\sigma$-additivity
    $\mu(A_0) = \sum \mu(B_n) = \lim_N \mu(A_0 \setminus A_{N+1})
    = \lim_N (\mu(A_0) - \mu(A_{N+1}))$, so $\mu(A_n) \to 0$.
    (3 $\Rightarrow$ 1): For a disjoint sequence $(C_n) \subset
    \mathcal{C}$ with $\bigcup C_n \in \mathcal{C}$, set $A_n = \bigcup_{k
    \geq n} C_k$. Then $(A_n)$ is decreasing, $\bigcap A_n = \varnothing$
    (any point belongs to at most one $C_k$), and
    $\bigcup_{k=0}^{n-1} C_k = A_0 \setminus A_n$. By additivity
    $\mu(\bigcup_{k=0}^{n-1} C_k) = \mu(A_0) - \mu(A_n)$, and continuity
    from above gives $\mu(A_n) \to 0$, so the partial sums converge to
    $\mu(A_0) = \mu(\bigcup C_n)$.
    (3 $\Leftrightarrow$ 4): The proof of Prop 10-3-4 shows the two
    convergence conditions (vanishing at zero and monotone convergence)
    are equivalent. Continuity from above at $\varnothing$ is exactly
    vanishing at zero for $I$ on the step functions.

## Measurable Spaces

!!! definition "Definition (Measurable space, $\sigma$-algebra)"
    <a id="def-10-7-1"></a>
    A **$\sigma$-algebra** on $\Omega$ is a non-empty
    $\mathcal{M} \subseteq \mathscr{P}(\Omega)$ closed under complement
    and countable unions. The pair $(\Omega, \mathcal{M})$ is a
    **measurable space**; elements of $\mathcal{M}$ are **measurable
    sets**.

!!! definition "Definition (Measurable map)"
    <a id="def-10-7-2"></a>
    A map $f : (\Omega, \mathcal{M}) \to (\Omega', \mathcal{M}')$ is
    **measurable** if $f^{-1}(A') \in \mathcal{M}$ for every
    $A' \in \mathcal{M}'$.

!!! theorem "Theorem (Monotone class theorem)"
    <a id="thm-10-7-3"></a>
    Let $\mathcal{C}$ be a $\pi$-system on $\Omega$ (closed under finite
    intersections) containing $\Omega$, and let $\mathcal{H}$ be a
    $\lambda$-system containing $\mathcal{C}$. Then $\mathcal{H}$ contains
    the $\sigma$-algebra $\sigma(\mathcal{C})$ generated by $\mathcal{C}$.

??? proof "Proof (Monotone class theorem)"
    Fix $A \in \mathcal{C}$ and let $\mathcal{H}_A = \{B \in \mathcal{H} :
    A \cap B \in \mathcal{H}, A^c \cap B \in \mathcal{H}\}$. Check that
    $\mathcal{H}_A$ is a $\lambda$-system containing $\mathcal{C}$: the
    $\pi$-property of $\mathcal{C}$ gives closure under intersection.
    So $\mathcal{C} \subseteq \mathcal{H}_A$, hence
    $\mathcal{H}_A = \mathcal{H}$. For any $B \in \mathcal{H}$,
    $A \cap B \in \mathcal{H}$ and $A^c \cap B \in \mathcal{H}$.

    Now let $\mathcal{H}' = \{B \subseteq \Omega : B \in \mathcal{H}\}$.
    For fixed $B \in \mathcal{C}$, the family $\mathcal{L}_B = \{A :
    A \cap B \in \mathcal{H}\}$ is a $\lambda$-system (closure under
    complement uses $A^c \cap B = B \setminus (A \cap B) \in \mathcal{H}$,
    which holds because $\mathcal{H}$ is a $\lambda$-system and $A \cap B
    \in \mathcal{H}$). It contains $\mathcal{C}$, so $\mathcal{L}_B
    \supseteq \sigma(\mathcal{C})$. So for any $A \in \sigma(\mathcal{C})$
    and $B \in \mathcal{C}$, $A \cap B \in \mathcal{H}$. By the symmetric
    argument (now varying $B$ in $\sigma(\mathcal{C})$ with $A \in
    \mathcal{C}$), $A \cap B \in \mathcal{H}$ for all $A, B \in
    \sigma(\mathcal{C})$. So $\mathcal{H} \supseteq \sigma(\mathcal{C})$.

## Measure Spaces

!!! definition "Definition (Measure space)"
    <a id="def-10-8-1"></a>
    A **measure** on $(\Omega, \mathcal{M})$ is a map
    $\mu : \mathcal{M} \to [0, +\infty]$ with $\mu(\varnothing) = 0$ and

    $$
    \mu\!\left( \bigsqcup_{n=0}^{\infty} A_n \right) = \sum_{n=0}^{\infty}
    \mu(A_n)
    $$

    for any countable disjoint family. The triple $(\Omega, \mathcal{M},
    \mu)$ is a **measure space**. A measure is **finite** if
    $\mu(\Omega) < \infty$, a **probability** if it equals $1$.

!!! definition "Definition (Integration of non-negative functions)"
    <a id="def-10-8-2"></a>
    For $f : \Omega \to [0, +\infty]$ measurable, define

    $$
    \int f\, d\mu = \sup \left\{ \int s\, d\mu : s \text{ simple}, 0 \leq s
    \leq f \right\},
    $$

    where a **simple function** is $s = \sum_{i=1}^{n} a_i \mathbf{1}_{A_i}$
    with $a_i \geq 0$ and $A_i \in \mathcal{M}$ pairwise disjoint. A
    general measurable $f$ is integrable if
    $\int f^+\, d\mu < \infty$ and $\int f^-\, d\mu < \infty$, where
    $f^{\pm} = \max\{\pm f, 0\}$; then $\int f\, d\mu = \int f^+\, d\mu -
    \int f^-\, d\mu$.

!!! theorem "Theorem (Monotone / Fatou / Dominated convergence)"
    <a id="thm-10-8-3"></a>
    In the measure-theoretic setting the same three pillars hold:

    1. **Beppo Levi:** if $0 \leq f_n \uparrow f$ pointwise, then
       $\int f_n\, d\mu \to \int f\, d\mu$.
    2. **Fatou:** if $f_n \geq 0$, then
       $\int \liminf f_n\, d\mu \leq \liminf \int f_n\, d\mu$.
    3. **Lebesgue dominated convergence:** if $f_n \to f$ pointwise and
       $|f_n| \leq g$ for some integrable $g$, then
       $\int f_n\, d\mu \to \int f\, d\mu$.

??? proof "Proof (Monotone / Fatou / Dominated convergence)"
    (1) $\int f_n \leq \int f_{n+1} \leq \int f$ by monotonicity, and any
    simple $s \leq f$ is dominated by some $f_n$, so $\int f = \sup
    \int f_n$.
    (2) Let $g_n = \inf_{k \geq 0} f_{n+k}$, increasing with limit
    $\liminf f_n$. By (1) and $g_n \leq f_{n+k}$,
    $\int g_n \leq \int f_{n+k}$ for all $k$, so $\int g_n \leq
    \liminf \int f_{n+k}$ (in $k$). Letting $n \to \infty$ and using (1)
    again: $\int \liminf f_n = \lim \int g_n \leq \lim \liminf_{k} \int
    f_{n+k} = \liminf \int f_n$.
    (3) Apply (2) to $f_n$ and to $g - f_n \geq 0$:
    $\int \liminf f_n \leq \liminf \int f_n$ and
    $\int \liminf (g - f_n) \leq \liminf \int (g - f_n) = \int g -
    \limsup \int f_n$. Now $\liminf (g - f_n) = g - \limsup f_n = g - f$
    (pointwise), so $\int (g - f) \leq \int g - \limsup \int f_n$, giving
    $\limsup \int f_n \leq \int f$. Combined with the first inequality,
    $\int f = \lim \int f_n$.

## Product Measure

!!! definition "Definition (Product $\sigma$-algebra, product measure)"
    <a id="def-10-9-1"></a>
    For measurable spaces $(\Omega_i, \mathcal{M}_i)$, $i = 1, 2$, the
    **product $\sigma$-algebra** is
    $\mathcal{M}_1 \otimes \mathcal{M}_2 = \sigma(\{A_1 \times A_2 :
    A_i \in \mathcal{M}_i\})$.

    Given $\sigma$-finite measures $\mu_1, \mu_2$, the **product measure**
    $\mu_1 \otimes \mu_2$ is the unique measure on $\mathcal{M}_1 \otimes
    \mathcal{M}_2$ with
    $(\mu_1 \otimes \mu_2)(A_1 \times A_2) = \mu_1(A_1)\, \mu_2(A_2)$.

!!! theorem "Theorem (Fubini–Tonelli)"
    <a id="thm-10-9-2"></a>
    Let $f : \Omega_1 \times \Omega_2 \to [0, +\infty]$ be measurable
    with respect to $\mathcal{M}_1 \otimes \mathcal{M}_2$. The function
    $x \mapsto f(x, y)$ is measurable for almost every $y$, and

    $$
    \int f\, d(\mu_1 \otimes \mu_2) = \int \!\left( \int f(x, y)\, d\mu_1(x)
    \right) d\mu_2(y) = \int \!\left( \int f(x, y)\, d\mu_2(y)
    \right) d\mu_1(x).
    $$

    For $\mu_1, \mu_2$ $\sigma$-finite, the same equality holds for
    integrable $f : \Omega_1 \times \Omega_2 \to \mathbb{R}$.

??? proof "Proof (Fubini–Tonelli, sketch)"
    The collection of non-negative measurable $f$ satisfying
    $\int f = \int \int f$ is monotone closed and contains the
    rectangles, hence contains the indicator of every set in
    $\mathcal{M}_1 \otimes \mathcal{M}_2$ by Dynkin's theorem (a
    $\pi$-$\lambda$ argument). The general non-negative case follows
    by the monotone class theorem: linear combinations of
    characteristic functions give simple functions, then the
    supremum definition of the integral. For integrable real $f$ with
    $\sigma$-finite measures, write $f = f^+ - f^-$ and apply Tonelli
    to each.

