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
    <a id="def-differential-1-form"></a>

    Let $(K, |\cdot|)$ be a complete valued field, $(E, \|\cdot\|_E)$ a
    normed space over $K$, and $f : U \subseteq E \to F$ a differentiable
    map. The **differential 1-form** of $f$ is the map

    $$
    df : U \longrightarrow L(E, F), \quad p \longmapsto Df(p).
    $$

    When $F = K$ and $E = K^n$, $df(p) = \sum_{i=1}^{n} \frac{\partial f} {\partial x_i}(p)\, dx_i$.

!!! definition "Definition (Tensor product of 1-forms and maps)"
    <a id="def-10-1-2"></a>
    <a id="def-tensor-product-of-1-forms-and-maps"></a>

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
    <a id="prop-leibniz-rule-for-forms"></a>

    Let $f : U \to K'$ and $g : U \to F$ be differentiable. Then

    $$
    d(f g) = f\, dg + df \otimes g.
    $$

    Special case $F = K'$: $d(f g) = f\, dg + g\, df$.

??? proof "Proof"
    Expand $D(fg)(p)(h)$ using the product rule in $F$: it equals
    $f(p) Dg(p)(h) + Df(p)(h) g(p)$, which by definition is
    $(p \mapsto f(p)\, dg(p) + df(p) \otimes g(p))$ evaluated at $h$.

!!! proposition "Proposition (Chain rule for forms)"
    <a id="prop-10-1-4"></a>
    <a id="prop-chain-rule-for-forms"></a>

    Let $f : U \to V \subseteq K'$ and $g : V \to F$ be differentiable. Then

    $$
    d(g \circ f) = df \otimes (g' \circ f).
    $$

??? proof "Proof"
    By the chain rule for differentials ([Theorem](differential-calculus.md#thm-chain-rule)),
    $D(g \circ f)(p)(h) = Dg(f(p))(Df(p)(h)) = Df(p)(h) \cdot g'(f(p))$ (since the differential from the one-dimensional domain $K'$ is the mapping $u\mapsto u g'(f(p))$).
    This is the evaluation of $df(p) \otimes (g' \circ f)(p)$ at $h$.

!!! definition "Definition (General and exact one-forms)"
    <a id="general-exact-one-forms"></a>

    On an open $U\subseteq E$, an $F$-valued one-form is any mapping $\alpha:U\to L(E,F)$; it need not be a differential. It is exact if $\alpha=df$ for some differentiable $f$. A complete valued extension $K'/K$ has the given absolute value on $K$ and is complete for its extending absolute value. In $\alpha\otimes s$, scalar multiplication requires $F$ to be a $K'$-space. The extension $\mathbb C/\mathbb R$ with $|x+iy|=\sqrt{x^2+y^2}$ is an example.

!!! example "Example (Coordinate and constant one-forms)"
    <a id="ex-coordinate-and-constant-one-forms"></a>

    For a bounded linear mapping $T$, $dT$ is the constant form with value $T$. On $K^n$, the coordinate projections give $dx_i$, and $df=\sum_i(\partial_if)dx_i$. For $f(t)=e^{wt}$, $w\in\mathbb C$, $df=we^{wt}\,dt$.

## Primitive Functions

!!! proposition "Proposition (Vanishing differential on path-connected open)"
    <a id="prop-10-2-1"></a>
    <a id="prop-vanishing-differential-on-path-connected-open"></a>

    Over $\mathbb R$, if $U \subseteq E$ is open and path-connected and $f : U \to F$ has $df = 0$, then
    $f$ is constant.

??? proof "Proof"
    The segment mean value inequality makes $f$ constant on every sufficiently small convex ball in $U$. Thus it is locally constant. Given a continuous path $\gamma$ in $U$, the set of parameters where $f(\gamma(t))=f(\gamma(0))$ is both open and closed in $[0,1]$: local constancy makes each value fibre open, including the complement. The interval is connected, so this set is all of $[0,1]$. Equivalently, propagate the constant through finitely many overlapping convex balls covering the path. This avoids assuming that an arbitrary continuous path is differentiable.

!!! definition "Definition (Primitive)"
    <a id="def-10-2-2"></a>
    <a id="def-primitive"></a>

    Let $I \subseteq \mathbb{R}$ be an open interval and $\varphi : I \to F$. A
    **primitive** of $\varphi$ is a $\Phi : I \to F$ with $\Phi' = \varphi$.
    We write $\int \varphi(t)\, dt$ for an arbitrary primitive; by the
    proposition above, it equals $\Phi(t) + C$ for some constant $C$.

!!! proposition "Proposition (Integration by parts)"
    <a id="prop-10-2-2-prop"></a>
    <a id="prop-integration-by-parts"></a>

    If $g : I \to \mathbb{R}$ and $\varphi : I \to F$ have primitives
    $G, \Phi$, then

    $$
    \int G(t)\, d\Phi(t) + \int dG(t) \otimes \Phi(t) = G(t)\, \Phi(t) + C,
    $$

    or, in the scalar case $F = \mathbb{R}$ (or $\mathbb{C}$),

    $$
    \int G(t)\, d\Phi(t) + \int \Phi(t)\, dG(t) = G(t)\, \Phi(t) + C.
    $$

??? proof "Proof"
    Differentiate the product $G \Phi$: by the Leibniz rule ([Proposition](#prop-leibniz-rule-for-forms)),
    $d(G \Phi) = G\, d\Phi + dG \otimes \Phi$. Integrating gives
    $G \Phi = \int G\, d\Phi + \int dG \otimes \Phi + C$.

!!! example "Example (Substitution)"
    <a id="ex-substitution"></a>

    For $f : U \to V$ and $g : V \to F$ both differentiable,
    $\int df(t) \otimes g'(f(t)) = g(f(t)) + C$. For instance
    $\int \sin(t) \cos(t)\, dt = \tfrac{1}{2} \sin^2(t) + C$.

!!! example "Example (Exponential primitives and integration by parts)"
    <a id="ex-exponential-primitives-and-integration-by-parts"></a>

    A primitive of $e^{wt}$ is $e^{wt}/w$ for $w\neq0$, and $t$ for $w=0$. The product rule gives $\int te^t\,dt=te^t-e^t+C$. In the vector-valued integration-by-parts formula, $G\,d\Phi=G\varphi\,dt$ and $dG\otimes\Phi=g\Phi\,dt$; this retains the scalar multiplication and one-form notation of the source.

## Riesz Spaces

!!! definition "Definition (Riesz space on $\Omega$)"
    <a id="def-10-3-1"></a>
    <a id="def-riesz-space-on"></a>

    Endow $\mathbb{R}^{\Omega}$ with the pointwise order. A vector subspace
    $S \subseteq \mathbb{R}^{\Omega}$ is a **Riesz space** if
    $\inf\{f, g\} \in S$ for every $f, g \in S$. Then automatically
    $\sup\{f, g\} = f + g - \inf\{f, g\} \in S$ and $|f| \in S$ for all
    $f \in S$.

!!! definition "Definition (Integral operator)"
    <a id="def-10-3-2"></a>
    <a id="def-integral-operator"></a>

    An **integral operator** on a Riesz space $S$ is an $\mathbb{R}$-linear
    map $I : S \to \mathbb{R}$ such that

    1. **Monotonicity:** $f \leq g \Rightarrow I(f) \leq I(g)$.
    2. **Continuity from above at zero:** if $(f_n)$ is decreasing in $S$
       and converges pointwise to $0$, then $\lim I(f_n) = 0$.

!!! example "Example (Lebesgue–Stieltjes from an increasing right-continuous $\varphi$)"
    <a id="ex-10-3-3"></a>
    <a id="ex-lebesguestieltjes-from-an-increasing-right-continuous"></a>

    Let $S$ be generated by indicators $\mathbf{1}_{]a, b]}$ with $a \leq b$.
    Given an increasing right-continuous $\varphi : \mathbb{R} \to \mathbb{R}$,
    the map $I_{\varphi}(\sum \lambda_i \mathbf{1}_{]a_i, b_i]}) = \sum \lambda_i (\varphi(b_i) - \varphi(a_i))$ extends to an integral
    operator; the case $\varphi = \mathrm{id}$ recovers the Riemann integral.

??? proof "Proof"
    Refine the finitely many intervals in two expressions of the same step function to common disjoint half-open intervals. On each nonempty piece, the two total coefficients are equal. Finite telescoping of $\varphi$'s endpoint increments therefore gives the same integral value for both expressions. Nonnegative increments prove positivity and monotonicity. Continuity from above follows from the compact inner approximations supplied by right continuity; its full proof is given in the Stieltjes premeasure proposition below.

!!! proposition "Proposition (Monotone convergence ↔ vanishing at zero)"
    <a id="prop-10-3-4"></a>
    <a id="prop-monotone-convergence-vanishing-at-zero"></a>

    An $\mathbb{R}$-linear monotone $I : S \to \mathbb{R}$ is an integral
    operator iff for every increasing $(f_n) \in S^{\mathbb{N}}$
    converging pointwise to some $f \in S$, $\lim I(f_n) = I(f)$.

??? proof "Proof"
    ($\Rightarrow$) Apply the hypothesis to $f - f_n$, which is decreasing
    to $0$: $\lim I(f - f_n) = 0$ gives $\lim I(f_n) = I(f)$.
    ($\Leftarrow$) Apply the hypothesis to $-f_n$, which is increasing
    to $0$: $\lim I(-f_n) = 0$, i.e. $\lim I(f_n) = 0$.

!!! definition "Definition ($S^{\uparrow}, S^{\downarrow}$)"
    <a id="def-10-3-5"></a>
    <a id="def-notation"></a>

    + $S^{\uparrow}$ = pointwise limits of increasing sequences in $S$.
    + $S^{\downarrow}$ = pointwise limits of decreasing sequences in $S$.

    Both are closed under positive scalar multiplication, finite
    $\inf$/$\sup$, and limits of monotone sequences. An integral operator
    $I$ extends uniquely to $S^{\uparrow}$ (by monotone convergence) and
    to $S^{\downarrow}$ via $I(f) = -I(-f)$.

??? proof "Proof"
    If $g\in S$ is below the increasing limit of $f_n\in S$, the sequence $\min(g,f_n)$ increases to $g$, so continuity of the original integral gives $I(g)\leq\lim I(f_n)$. For two representations $\lim f_n=\lim g_n$, apply this inequality to each fixed $f_k$ and the sequence $g_n$, then let $k\to\infty$. This gives $\lim I(f_n)\leq\lim I(g_n)$. Interchanging the sequences gives equality, without presupposing the extension being constructed.

!!! definition "Definition (Daniell integrable)"
    <a id="def-10-3-6"></a>
    <a id="def-daniell-integrable"></a>

    A function $f : \Omega \to \mathbb{R}$ is **Daniell integrable** if

    $$
    \underline{I}(f) := \sup_{\substack{l \in S^{\downarrow} \\ l \leq f}} I(l)
    = \inf_{\substack{\mu \in S^{\uparrow} \\ \mu \geq f}} I(\mu)
    =: \overline{I}(f) \in \mathbb{R}.
    $$

    The set $L^1(I)$ of all such $f$ carries a natural integral $I$ extending
    the original one. $L^1(I)$ is itself a Riesz space.

!!! theorem "Theorem (Beppo Levi)"
    <a id="thm-10-3-7"></a>
    <a id="thm-beppo-levi"></a>

    If $(f_n)$ is a monotone sequence in $L^1(I)$ converging pointwise to
    $f : \Omega \to \mathbb{R}$, and $\lim I(f_n) \in \mathbb{R}$, then
    $f \in L^1(I)$ and $I(f) = \lim I(f_n)$.

??? proof "Proof"
    For increasing $f_n$, subtract $f_0$ so the sequence starts at zero, and put $\alpha=\lim I(f_n)\in\mathbb R$. Choose $u_n\in S^\uparrow$ above $f_n-f_{n-1}$ with $I(u_n)\leq I(f_n-f_{n-1})+\varepsilon2^{-n}$. Choose these upper approximants nonnegative, by starting their increasing approximating sequences with their positive parts and using monotonicity of the extended integral. The increasing limit $u=\sum_{n\geq1}u_n$ belongs to $S^\uparrow$, dominates $f$, and has $I(u)\leq\alpha+\varepsilon$. Thus $\overline I(f)\leq\alpha+\varepsilon$.

    For each $n$ choose $l_n\in S^\downarrow$ below $f_n$ with $I(l_n)\geq I(f_n)-\varepsilon$. Since $l_n\leq f$, $\underline I(f)\geq\alpha-\varepsilon$. Let $\varepsilon\downarrow0$. The decreasing case follows by negation.

!!! theorem "Theorem (Daniell)"
    <a id="thm-10-3-8"></a>
    <a id="thm-daniell"></a>

    $L^1(I)$ is a Riesz space and $I : L^1(I) \to \mathbb{R}$ is an
    integral operator extending $I$ on $S$. In particular,
    $|f| \in L^1(I)$ whenever $f \in L^1(I)$.

??? proof "Proof"
    By the monotonicity of $I$ and the linearity of $I$, $L^1(I)$ is a
    vector subspace of $\mathbb{R}^\Omega$ and $I$ is $\mathbb{R}$-linear
    and monotone on it. Take $f_1, f_2 \in L^1(I)$ and $\varepsilon > 0$;
    pick $l_1, l_2 \in S^\downarrow$ and $\mu_1, \mu_2 \in S^\uparrow$
    with $l_i \leq f_i \leq \mu_i$ and
    $I(\mu_i - l_i) \leq \varepsilon / 2$. A case analysis on the
    relative position of $\mu_1, \mu_2$ at each $\omega$ shows
    $|\inf\{\mu_1, \mu_2\} - \inf\{l_1, l_2\}| \leq (\mu_1 - l_1) + (\mu_2 - l_2)$,
    hence $I(\inf\{\mu_1, \mu_2\} - \inf\{l_1, l_2\}) \leq \varepsilon$.
    So $\inf\{f_1, f_2\} \in L^1(I)$. Given an increasing $(f_n) \subset L^1(I)$ with $f_n \uparrow f$ and $\sup I(f_n) < \infty$, Beppo
    Levi gives $f \in L^1(I)$ and $I(f) = \lim I(f_n)$, showing $I$
    is an integral operator on $L^1(I)$.

!!! theorem "Theorem (Fatou)"
    <a id="thm-10-3-9"></a>
    <a id="thm-fatou"></a>

    Let $(f_n) \in L^1(I)^{\mathbb{N}}$ be bounded below by some
    $g \in L^1(I)$. Then $\liminf_n f_n \in L^1(I)^\uparrow$ and

    $$
    I\!\left( \liminf_n f_n \right) \leq \liminf_n I(f_n).
    $$

    When $\liminf I(f_n) < +\infty$ and the limit inferior takes finite
    values, $\liminf f_n \in L^1(I)$.

??? proof "Proof"
    Set $g_n=\inf_{k\geq n}f_k$. Each $g_n$ is a decreasing limit of finite minima, bounded between the integrable lower bound $g$ and $f_n$. Their integrals therefore have a finite limit, so Beppo Levi makes $g_n$ integrable. The $g_n$ increase to the liminf, placing it in $L^1(I)^\uparrow$. Monotone extension gives $I(\liminf f_n)=\lim I(g_n)\leq\liminf I(f_n)$. If the right side is finite and the liminf is finite-valued, its increasing approximants have bounded integral, and Beppo Levi makes it integrable.

!!! theorem "Theorem (Dominated convergence, Lebesgue)"
    <a id="thm-10-3-10"></a>
    <a id="thm-dominated-convergence-lebesgue"></a>

    Let $(f_n) \in L^1(I)^{\mathbb{N}}$ converge pointwise to $f : \Omega \to \mathbb{R}$ and satisfy $|f_n| \leq g$ for some $g \in L^1(I)$. Then
    $f \in L^1(I)$ and $I(f) = \lim I(f_n)$.

??? proof "Proof"
    Apply the corrected Fatou theorem to both $f_n$ and $-f_n$, using $-g$ as lower bound. Domination makes both integral liminfs finite and makes the pointwise limit finite, so Fatou also establishes integrability of $f$ and $-f$. The two inequalities give $I(f)\leq\liminf I(f_n)\leq\limsup I(f_n)\leq I(f)$. Hence all bounds coincide.

!!! proposition "Proposition (Comparison and the monotone extension)"
    <a id="riesz-monotone-extension"></a>

    If $g\in S$ and $f_n\in S$ increase with $g\leq\lim f_n$, then $I(g)\leq\lim I(f_n)$. Hence ordering the limits of two increasing sequences orders their integral limits. This makes the extension of $I$ to $S^\uparrow$ well defined. The extension is monotone, additive and positively homogeneous; by negation the same statements hold on $S^\downarrow$ wherever the extended-real expressions are defined.

??? proof "Proof"
    The sequence $\min(g,f_n)$ increases to $g$ and has integral at most $I(f_n)$, proving comparison. Apply comparison first to each term of one sequence against the other sequence's limit, and then pass to the limit in that first sequence. Apply the result in both directions for two representations of the same limit. Addition, positive multiplication and finite min or max commute with these monotone limits, proving the algebraic properties. For a comparison across $S^\uparrow$ and $S^\downarrow$, compare each increasing approximant with each decreasing approximant and take the two limits.

!!! proposition "Proposition (Diagonal construction for iterated monotone limits)"
    <a id="prop-diagonal-construction-for-iterated-monotone-limits"></a>

    If $f_n\in S^\uparrow$ increase to $f$, then $f\in S^\uparrow$ and $I(f)=\lim_n I(f_n)$. The decreasing version follows by negation.

??? proof "Proof"
    Write $f_k=\lim_m g_{k,m}$ with $g_{k,m}\in S$ increasing in $m$. Set $h_n=\max_{k\leq n}g_{k,n}$. Then $h_n$ increases, $h_n\leq f_n\leq f$, and its limit dominates every fixed $f_k$, hence equals $f$. The bounds $I(h_n)\leq I(f_n)\leq I(f)$ and $I(g_{k,n})\leq I(h_n)$ imply equality of the two integral limits.

!!! definition "Definition (Riemann comparison and lower and upper integrals)"
    <a id="riemann-daniell-comparison"></a>

    Riemann integrability relative to $S$ uses equality of the supremum of $I(l)$ for $l\in S$, $l\leq f$, and the infimum of $I(u)$ for $u\in S$, $u\geq f$. Daniell integrability instead permits $l\in S^\downarrow$ and $u\in S^\uparrow$ and requires a finite common value. Thus Riemann integrability with finite value implies Daniell integrability.

!!! lemma "Lemma (Algebra of lower and upper integrals)"
    <a id="lem-algebra-of-lower-and-upper-integrals"></a>

    Negation exchanges lower and upper integrals with a minus sign. Lower integrals are superadditive and upper integrals subadditive; both are positively homogeneous and monotone. Consequently $L^1(I)$ is a vector space and its integral is linear and monotone. A real-valued member of $S^\uparrow$ or $S^\downarrow$ with finite extended integral belongs to $L^1(I)$.

??? proof "Proof"
    Negation bijects lower approximants with upper approximants. Sums of lower approximants are lower approximants of the sum, and sums of upper approximants are upper approximants; take suprema or infima. Positive multiplication bijects the appropriate approximant families. Inclusion of approximant families proves monotonicity. For $f\in S^\uparrow$, its increasing $S$-approximants give lower-integral values approaching $I(f)$, while $f$ itself is an allowed upper approximant. This sandwiches both integrals at $I(f)$. Negation gives the decreasing version.

## Convexity (Banach-space perspective)

!!! definition "Definition (Convex, concave functions)"
    <a id="def-10-4-1"></a>
    <a id="def-convex-concave-functions"></a>

    Let $U \subseteq E$ be convex. A map $f : U \to \mathbb{R}$ is
    **convex** if its epigraph
    $\Gamma_+(f) = \{(x, a) \in U \times \mathbb{R} : f(x) \leq a\}$ is
    convex in $E \times \mathbb{R}$. It is **concave** if its hypograph
    $\Gamma_-(f) = \{(x, a) : f(x) \geq a\}$ is convex.

!!! proposition "Proposition (Two-point criterion for convexity)"
    <a id="prop-10-4-2"></a>
    <a id="prop-two-point-criterion-for-convexity"></a>

    For a map $f : U \to \mathbb{R}$ on a convex $U \subseteq E$:

    + $f$ is convex iff $f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$ for every $x, y \in U$ and $\lambda \in [0, 1]$.
    + $f$ is concave iff the inequality is reversed.

??? proof "Proof"
    (1 $\Rightarrow$ 2): $(x, f(x))$ and $(y, f(y))$ lie in $\Gamma_+(f)$,
    so their convex combination
    $(\lambda x + (1 - \lambda) y, \lambda f(x) + (1 - \lambda) f(y))$
    lies in $\Gamma_+(f)$, i.e. $f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$.
    (2 $\Rightarrow$ 1): Take $(x, a), (y, b) \in \Gamma_+(f)$. Then
    $\lambda a + (1 - \lambda) b \geq \lambda f(x) + (1 - \lambda) f(y) \geq f(\lambda x + (1 - \lambda) y)$, so
    $(\lambda x + (1 - \lambda) y, \lambda a + (1 - \lambda) b) \in \Gamma_+(f)$.

!!! proposition "Proposition (Convexity via tangent support)"
    <a id="prop-10-4-3"></a>
    <a id="prop-convexity-via-tangent-support"></a>

    Let $U$ be open and convex, $f : U \to \mathbb{R}$ differentiable.
    Then $f$ is convex iff for every $(p, x) \in U^2$,

    $$
    f(x) \geq f(p) + Df(p)(x - p).
    $$

    When $f$ is convex, equality
    $f(x) = \sup_{p \in U} (f(p) + Df(p)(x - p))$ holds.

??? proof "Proof"
    Convexity gives $f(p+t(x-p))-f(p)\leq t(f(x)-f(p))$ for $0<t\leq1$. Divide by $t$ and let $t\downarrow0$ to obtain the tangent inequality. Conversely, assuming it, take $p=\lambda x+(1-\lambda)y$, apply the inequality to $x$ and $y$, multiply by their weights and add. The differential terms cancel, giving convexity. For each $x$, taking $p=x$ gives equality with one tangent, so $f$ is the supremum of these affine minorants.

!!! theorem "Theorem (Cauchy–Schwarz for semidefinite forms)"
    <a id="thm-10-4-4"></a>
    <a id="thm-cauchyschwarz-for-semidefinite-forms"></a>

    Let $\varphi : E \times E \to \mathbb{R}$ be a symmetric bilinear form
    with $\varphi(x, x) \geq 0$ for all $x$ (**semidefinite**). Then for
    every $(x, y) \in E \times E$,

    $$
    \varphi(x, y)^2 \leq \varphi(x, x)\, \varphi(y, y),
    $$

    with equality exactly when the classes of $x,y$ in $E/\ker\varphi$ are linearly dependent. If $\varphi(y,y)>0$, this is equivalent to $x+ty\in\ker\varphi$ for some $t$; if $y\in\ker\varphi$, equality always holds.

??? proof "Proof"
    If $\varphi(y, y) = 0$ then $y \in \ker \varphi$ by the kernel and isotropic-cone proposition; in
    particular $\varphi(x, y) = 0$ and the inequality is equality.
    If $\varphi(y, y) > 0$, the quadratic
    $t \mapsto \varphi(x + ty, x + ty) = \varphi(y, y) t^2 + 2 \varphi(x, y) t + \varphi(x, x) \geq 0$ has discriminant
    $\leq 0$, i.e. $\varphi(x, y)^2 \leq \varphi(x, x) \varphi(y, y)$.
    Equality holds iff the discriminant is zero, i.e. the quadratic has
    a double root $t = -\varphi(x, y)/\varphi(y, y)$, meaning
    $x + ty \in \ker \varphi$.

!!! theorem "Theorem (Twice-differentiable convexity)"
    <a id="thm-10-4-5"></a>
    <a id="thm-twice-differentiable-convexity"></a>

    Let $f : U \to \mathbb{R}$ be twice differentiable on an open convex
    $U$. If $D^2 f(p)$ is semidefinite for every $p \in U$, then $f$ is
    convex.

??? proof "Proof"
    Fix $p, x \in U$ and apply the one-dimensional Taylor–Lagrange
    expansion to $g(t) = f(p + t(x - p))$ at $t = 0$:
    $g(1) = g(0) + g'(0) + \frac{1}{2} g''(\xi)$ for some $\xi \in (0, 1)$
    (or the integral form
    $g(1) = g(0) + g'(0) + \int_0^1 (1 - t) g''(t)\, dt$).
    Now $g'(0) = Df(p)(x - p)$ and
    $g''(t) = D^2 f(p + t(x - p))(x - p, x - p) \geq 0$ by
    semidefiniteness. So $g(1) \geq g(0) + g'(0)$, i.e.
    $f(x) \geq f(p) + Df(p)(x - p)$, and the tangent-support
    criterion ([Proposition](#prop-convexity-via-tangent-support)) gives convexity.

!!! proposition "Proposition (Suprema of affine functions)"
    <a id="prop-suprema-of-affine-functions"></a>

    A finite-valued pointwise supremum $f(x)=\sup_i(\ell_i(x)+c_i)$ of affine functions on a convex domain is convex. Indeed each affine function at $tx+(1-t)y$ is at most $tf(x)+(1-t)f(y)$; take the supremum. Concavity is convexity of $-f$.

!!! definition "Definition (Positive forms, kernel and isotropic cone)"
    <a id="positive-form-kernel"></a>

    A symmetric real bilinear form is positive semidefinite when $\varphi(x,x)\geq0$, and positive definite when this value is positive for every nonzero $x$. Its kernel is $\{x:\varphi(x,y)=0\text{ for all }y\}$ and its isotropic cone is $\{x:\varphi(x,x)=0\}$. For a semidefinite form these sets coincide.

??? proof "Proof"
    If $\varphi(y,y)=0$, positivity of $\varphi(x+ty,x+ty)=\varphi(x,x)+2t\varphi(x,y)$ for every real $t$ forces $\varphi(x,y)=0$. The reverse inclusion follows by substituting $x=y$. The standard dot product on $\mathbb R^n$ is positive definite.

## Semirings

!!! definition "Definition (Semiring on $\Omega$)"
    <a id="def-10-5-1"></a>
    <a id="def-semiring-on"></a>

    A family $\mathcal{C} \subseteq \mathscr{P}(\Omega)$ is a **semiring**
    if

    1. $\varnothing \in \mathcal{C}$;
    2. $A \cap B \in \mathcal{C}$ for every $A, B \in \mathcal{C}$;
    3. for every $A, B \in \mathcal{C}$, there exist pairwise disjoint
       $C_1, \ldots, C_n \in \mathcal{C}$ with $B \setminus A = C_1 \cup \cdots \cup C_n$.

    **Canonical example:** $\mathcal{C} = \{]a, b] : a \leq b\}$ on $\mathbb{R}$.

!!! proposition "Proposition (Closure properties of a semiring)"
    <a id="prop-10-5-2"></a>
    <a id="prop-closure-properties-of-a-semiring"></a>

    Let $\mathcal{C}$ be a semiring on $\Omega$.

    1. $B \setminus (A_1 \cup \cdots \cup A_n)$ (for $A_i, B \in \mathcal{C}$) is a disjoint union of finitely many sets in
       $\mathcal{C}$ (induction on $n$).
    2. Any finite subset $\Theta \subseteq \mathcal{C}$ has a finite
       disjoint refinement $\Phi \subseteq \mathcal{C}$ (each element of
       $\Theta$ is a disjoint union of elements of $\Phi$).
    3. The set $\mathcal{A} = \{A_1 \cup \cdots \cup A_n : A_i \in \mathcal{C}\}$ is closed under union, intersection, and set
       difference.

??? proof "Proof"
    (1) For $n = 0$ trivial. Suppose
    $B \setminus (A_1 \cup \cdots \cup A_{n-1}) = C_1 \cup \cdots \cup C_m$
    with the $C_i$ pairwise disjoint in $\mathcal{C}$. Then
    $B \setminus (A_1 \cup \cdots \cup A_n) = (C_1 \cup \cdots \cup C_m) \setminus A_n = \bigcup_i (C_i \setminus A_n)$, each $C_i \setminus A_n$
    is a disjoint union of finitely many elements of $\mathcal{C}$ (by
    (3) of the semiring axioms). Concatenate.
    (2) Index $\Theta = \{B_1, \ldots, B_n\}$. For each non-empty
    $J \subseteq \{1, \ldots, n\}$, the set
    $B_J := (\bigcap_{j \in J} B_j) \setminus (\bigcup_{j \notin J} B_j)$
    is in $\mathcal{A}$ by (1), so is a finite disjoint union of elements
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
    <a id="prop-step-functions-form-a-riesz-space"></a>

    The $\mathbb{R}$-vector space $S$ generated by $\{\mathbf{1}_A : A \in \mathcal{C}\}$ is a Riesz space: any pair $f, g \in S$ can be written
    as $\sum a_i \mathbf{1}_{C_i}$ and $\sum b_i \mathbf{1}_{C_i}$ with
    the $C_i$ pairwise disjoint, and
    $\inf\{f, g\} = \sum \min\{a_i, b_i\}\, \mathbf{1}_{C_i} \in S$.

??? proof "Proof"
    By [Proposition](#prop-closure-properties-of-a-semiring) (2), any two step functions
    $f = \sum \lambda_A \mathbf{1}_A$ and $g = \sum \mu_B \mathbf{1}_B$
    can be written on a common partition $\Phi = \{C_1, \ldots, C_n\}$ of
    pairwise-disjoint elements of $\mathcal{C}$ as
    $f = \sum a_i \mathbf{1}_{C_i}$, $g = \sum b_i \mathbf{1}_{C_i}$
    with $a_i = \sum_{A \supseteq C_i} \lambda_A$ and similarly for $b_i$.
    The min is computed pointwise, so
    $\inf\{f, g\} = \sum \min(a_i, b_i) \mathbf{1}_{C_i} \in S$.

!!! example "Example (Half-open intervals)"
    <a id="ex-half-open-intervals"></a>

    Intersecting $(a,b]$ and $(c,d]$ gives $(\max(a,c),\min(b,d)]$, or the empty set. Subtracting one from another leaves at most two intervals of the same form. This checks all semiring axioms explicitly.

## $\sigma$-Additive Functions

!!! definition "Definition (Additive, $\sigma$-additive)"
    <a id="def-10-6-1"></a>
    <a id="def-additive-additive"></a>

    Let $\mathcal{C} \subseteq \mathscr{P}(\Omega)$ and
    $\mu : \mathcal{C} \to \mathbb{R}_{\geq 0}$.

    + $\mu$ is **additive** if $\mu(A_1 \cup \cdots \cup A_n) = \mu(A_1) + \cdots + \mu(A_n)$ whenever $A_1, \ldots, A_n \in \mathcal{C}$ are pairwise disjoint with union in $\mathcal{C}$.
      (Forces $\mu(\varnothing) = 0$.)
    + $\mu$ is **$\sigma$-additive** if for any countable family of
      pairwise disjoint $C_i \in \mathcal{C}$ with $\bigcup C_i \in \mathcal{C}$,

    $$
    \mu\!\left( \bigcup_i C_i \right) = \sum_i \mu(C_i)
    $$

      (the sum of an infinite series defined as the sup of its finite
      partial sums).

!!! proposition "Proposition (Extension to a Riesz integral operator)"
    <a id="prop-10-6-2"></a>
    <a id="prop-extension-to-a-riesz-integral-operator"></a>

    Let $\mathcal{C}$ be a semiring, $\mu : \mathcal{C} \to \mathbb{R}_{\geq 0}$ additive, and $S$ the $\mathbb{R}$-vector space generated by
    $\mathbf{1}_A$ ($A \in \mathcal{C}$).

    1. There is a unique $\mathbb{R}$-linear $I : S \to \mathbb{R}$ with
       $I(\mathbf{1}_A) = \mu(A)$.
    2. $\mu$ extends uniquely to an additive
       $\mu : \mathcal{A} \to \mathbb{R}_{\geq 0}$ on the ring of finite unions
       $\mathcal{A}$ generated by $\mathcal{C}$.

??? proof "Proof"
    (1) $I$ is forced to be $I(\sum a_i \mathbf{1}_{A_i}) = \sum a_i \mu(A_i)$ if it exists. For well-definedness, suppose
    $\sum \lambda_A \mathbf{1}_A = \sum \mu_B \mathbf{1}_B$ in $S$. Take
    a common refinement $\{C_1, \ldots, C_n\}$ of $\{A\} \cup \{B\}$
    into pairwise-disjoint elements of $\mathcal{C}$ ([Proposition](#prop-closure-properties-of-a-semiring) (2)).
    On each $C_i$, the two functions are constant; summing gives
    $\sum_i (\sum_{A \supseteq C_i} \lambda_A) \mathbf{1}_{C_i}$ and
    similarly for the $\mu_B$'s. So the two sets of coefficients
    coincide, and therefore
    $\sum_A \lambda_A \mu(A) = \sum_i (\sum_{A \supseteq C_i} \lambda_A) \mu(C_i) = \sum_B \mu_B \mu(B)$.
    (2) Define $\mu(A) = I(\mathbf{1}_A)$ for $A \in \mathcal{A}$. If
    $A = B_1 \cup \cdots \cup B_m$ is a disjoint decomposition with
    $B_j \in \mathcal{C}$, then $I(\mathbf{1}_A) = \sum I(\mathbf{1}_{B_j}) = \sum \mu(B_j)$; for any other decomposition the same value is
    obtained by refining.

!!! theorem "Theorem ($\sigma$-additivity characterisations)"
    <a id="thm-10-6-3"></a>
    <a id="thm-additivity-characterisations"></a>

    For $\mu : \mathcal{C} \to \mathbb{R}_{\geq 0}$ additive, the
    following are equivalent:

    1. $\mu$ is $\sigma$-additive on $\mathcal{C}$.
    2. $\mu$ extends $\sigma$-additively to $\mathcal{A}$.
    3. **Continuity from above at $\varnothing$:** for any decreasing
       sequence $(A_n) \in \mathcal{A}^{\mathbb{N}}$ with $\bigcap A_n = \varnothing$, $\lim \mu(A_n) = 0$.
    4. $I : S \to \mathbb{R}$ is an integral operator on the Riesz space
       $S$.

??? proof "Proof"
    To pass from the semiring to its ring of finite unions, split the union and every summand into disjoint semiring pieces and intersect them. Sigma additivity on each piece of the union then sums to sigma additivity on the ring. For a decreasing $A_n$ with empty intersection, the differences $A_n\setminus A_{n+1}$ partition $A_0$; finite measure of $A_0$ and sigma additivity give $\mu(A_n)\to0$.

    To obtain continuity of the step-function integral, let $f_n\downarrow0$, let $B=\{f_0>0\}$ and $M=\sup f_0<\infty$. For each $\varepsilon>0$, the finite-level sets $A_n=\{f_n\geq\varepsilon\}$ lie in the ring and decrease to the empty set. The bound $0\leq f_n\leq\varepsilon1_B+M1_{A_n}$ implies $\limsup I(f_n)\leq\varepsilon\mu(B)$. Let $\varepsilon\downarrow0$. Finally, for disjoint semiring sets whose union belongs to the semiring, their indicator partial sums increase to the union indicator. Continuity of the integral gives sigma additivity, completing the cycle of implications.

!!! proposition "Proposition (Right-continuous Stieltjes data)"
    <a id="stieltjes-premeasure"></a>

    For an increasing right-continuous $\varphi$, the assignment $\mu_\varphi((a,b])=\varphi(b)-\varphi(a)$ is sigma additive and its step-function operator is an integral operator.

??? proof "Proof"
    Finite additivity telescopes over a common endpoint partition. For each finite disjoint union $A$ of half-open intervals and each $\varepsilon>0$, move every left endpoint slightly right, using right continuity, to produce $B$ with compact closure contained in $A$ and $\mu_\varphi(A\setminus B)<\varepsilon$.

    If $A_n\downarrow\varnothing$, choose such $B_n\subseteq A_n$ with losses less than $\varepsilon2^{-n-1}$. The finite intersections of the compact sets $\overline B_n$ eventually become empty: otherwise their nested intersection would be nonempty and would lie in every $A_n$. For that finite index $N$, each point of $A_N$ lies in some $A_j\setminus B_j$, $j\leq N$. Finite subadditivity gives $\mu_\varphi(A_N)<\varepsilon$. Continuity from above and the sigma-additivity criterion prove the assertion.

## Measurable Spaces

!!! definition "Definition (Measurable space, $\sigma$-algebra)"
    <a id="def-10-7-1"></a>
    <a id="def-measurable-space-algebra"></a>

    A **$\sigma$-algebra** on $\Omega$ is a non-empty
    $\mathcal{M} \subseteq \mathscr{P}(\Omega)$ closed under complement
    and countable unions. The pair $(\Omega, \mathcal{M})$ is a
    **measurable space**; elements of $\mathcal{M}$ are **measurable
    sets**.

!!! definition "Definition (Measurable map)"
    <a id="def-10-7-2"></a>
    <a id="def-measurable-map"></a>

    A map $f : (\Omega, \mathcal{M}) \to (\Omega', \mathcal{M}')$ is
    **measurable** if $f^{-1}(A') \in \mathcal{M}$ for every
    $A' \in \mathcal{M}'$.

!!! theorem "Theorem (Monotone class theorem)"
    <a id="thm-10-7-3"></a>
    <a id="thm-monotone-class-theorem"></a>

    Let $\mathcal{C}$ be a $\pi$-system on $\Omega$ (closed under finite
    intersections) containing $\Omega$, and let $\mathcal{H}$ be a
    $\lambda$-system containing $\mathcal{C}$. Then $\mathcal{H}$ contains
    the $\sigma$-algebra $\sigma(\mathcal{C})$ generated by $\mathcal{C}$.

??? proof "Proof"
    Let $D$ be the least lambda system containing the pi system $\mathcal C$. For fixed $A\in\mathcal C$, the family $D_A=\{B\in D:A\cap B\in D\}$ is a lambda system: it contains the whole space, nested differences use $A\setminus(A\cap B)$, and disjoint unions commute with intersection. It contains $\mathcal C$, so by minimality $D_A=D$. Now fix $B\in D$ and repeat with the family $\{A\in D:A\cap B\in D\}$, which contains $\mathcal C$ by the first step. Thus $D$ is intersection closed. A lambda system closed under intersections is a sigma algebra, by disjointifying arbitrary countable unions. Hence $D=\sigma(\mathcal C)\subseteq\mathcal H$.

!!! proposition "Proposition (Generating sigma algebras and measurable mappings)"
    <a id="generated-sigma-algebra"></a>

    Intersections of sigma algebras are sigma algebras; $\sigma(\mathcal C)$ is the least one containing $\mathcal C$. The Borel sigma algebra is generated by open sets. To prove $f$ measurable into a generated sigma algebra it suffices to test its generators, since $\{A:f^{-1}(A)\text{ is measurable}\}$ is a sigma algebra. Composites of measurable mappings are measurable, by the preimage identity. Indicators of measurable sets are measurable.

!!! proposition "Proposition (Intervals and Borel generators)"
    <a id="real-borel-generators"></a>

    In a subset $A$ of the extended real line, say $x\sim y$ if an interval contained in $A$ contains both. This is an equivalence relation and its classes are intervals. If $A$ is open in the order topology, its classes are open intervals; each contains a rational, so there are at most countably many. The Borel sigma algebra on $\mathbb R\cup\{+\infty\}$ is generated by the rays $(-\infty,q]$, $q\in\mathbb Q$.

??? proof "Proof"
    Reflexivity uses singleton intervals. Symmetry is immediate, and transitivity follows by uniting two intersecting intervals. Each point of an open set has an interval neighbourhood contained in it, so each class is open. Distinct classes contain distinct rationals. For the generator claim, $(-\infty,x)=\bigcup_{q<x}(-\infty,q]$ and $(-\infty,x]=\bigcap_{q>x}(-\infty,q]$ for finite $x$. Complements and intersections supply all interval types and endpoint rays. Every open set is a countable union of open intervals, hence is generated by these rays.

!!! definition "Definition (Initial measurable structure)"
    <a id="initial-measurable-structure"></a>

    Given $f_i:X\to E_i$, the sigma algebra $\sigma(f_i:i\in I)$ is generated by all $f_i^{-1}(A_i)$. A mapping $g$ into this measurable space is measurable exactly when every $f_i\circ g$ is measurable. Product sigma algebras arise by taking coordinate projections.

    For a finite product of topological spaces, the product of their Borel sigma algebras is contained in the product's Borel sigma algebra. Equality holds when the factors have countable topology bases: every open set is then a countable union of basis rectangles. In particular this applies to $\mathbb R^n$. Pairing measurable real mappings and composing with continuous addition or multiplication proves measurability of their sums and products.

!!! notation "Level sets and simple approximations"
    <a id="notation-level-sets-and-simple-approximations"></a>

    Write $\{P(f)\}=\{\omega:P(f(\omega))\}$. For a nonnegative extended-real measurable $f$, the functions $s_n=2^{-n}\lfloor2^n\min(f,n)\rfloor$ are measurable simple functions, increase to $f$, and are finite-valued. Equivalently, expand them over disjoint half-open dyadic level sets with an additional value $n$ on $\{f\geq n\}$.

!!! theorem "Theorem (Pointwise limits into metric spaces are measurable)"
    <a id="metric-measurable-pointwise-limit"></a>

    A pointwise limit of Borel-measurable mappings into a metric space is measurable.

??? proof "Proof"
    For a nonempty closed set $C$, the continuous distance function gives $f^{-1}(C)=\bigcap_{m\geq1}\bigcup_N\bigcap_{n\geq N}\{d(f_n,C)<1/m\}$. This is measurable. The empty closed set is immediate, and closed sets generate the Borel sigma algebra.

## Monotone Classes

!!! lemma "Lemma (Positive powers as suprema of tangents)"
    <a id="lem-positive-powers-as-suprema-of-tangents"></a>

    For $n\geq1$ and $x\geq0$, $x^n=\sup_{a\in\mathbb Q_{\geq0}}\max(na^{n-1}x-(n-1)a^n,0)$. Convexity gives the upper bound, and density of rational $a$ and continuity give equality.

!!! definition "Definition (Lambda family of functions)"
    <a id="lambda-family-functions"></a>

    A lambda family consists of bounded nonnegative functions, contains $1$, is closed under nonnegative linear combinations, under $g-f$ when $f\leq g$, and under pointwise increasing limits of uniformly bounded sequences. If it is closed under maxima, it is also closed under countable uniformly bounded suprema, by taking successive finite maxima.

!!! theorem "Theorem (Lattice form of the functional monotone class theorem)"
    <a id="functional-monotone-class-lattice"></a>

    A lambda family $H$ closed under minima contains every bounded nonnegative $\sigma(H)$-measurable function.

??? proof "Proof"
    It is closed under maxima and positive parts, and the tangent formula gives $f^n\in H$ for every $f\in H$. Let $\mathcal A=\{A:1_A\in H\}$. Complements and countable unions, computed by subtraction from $1$ and increasing finite maxima, make $\mathcal A$ a sigma algebra. The functions $1-\min(1,f/t)^n$ increase to $1_{\{f<t\}}$, so every $f\in H$ is $\mathcal A$-measurable. Hence $\sigma(H)\subseteq\mathcal A$; the converse follows since indicators in $H$ are measurable for $\sigma(H)$. Simple dyadic approximations and the lambda axioms now put every bounded nonnegative measurable function in $H$.

!!! theorem "Theorem (Multiplicative form of the functional monotone class theorem)"
    <a id="functional-monotone-class-multiplicative"></a>

    If $H$ is a lambda family containing a multiplicatively closed family $H_0$, then it contains every bounded nonnegative $\sigma(H_0)$-measurable function.

??? proof "Proof"
    Replace $H$ by the least lambda family containing $H_0$. For fixed $g\in H_0$, the functions $f$ with $fg\in H$ form a lambda family containing $H_0$; thus all $f\in H$ have this property. Repeat with fixed $f\in H$ to prove closure under all products.

    To recover minima, rescale so $|f-g|\leq1$. Put $u_0=0$ and $u_{n+1}=u_n+((f-g)^2-u_n^2)/2$. Inductively $0\leq u_n\leq|f-g|$, and the difference added is nonnegative and belongs to $H$: $(f-g)^2=f^2+g^2-2fg$ is formed by subtracting a smaller nonnegative function. The map $u\mapsto u-u^2/2$ is increasing on $[0,1]$, proving the upper bound. The increasing limit solves $u^2=(f-g)^2$, hence equals $|f-g|$. Thus $\min(f,g)=(f+g-|f-g|)/2\in H$. Apply the lattice theorem.

!!! theorem "Theorem (Monotone extensions and level-set indicators)"
    <a id="monotone-extension-level-sets"></a>

    Suppose $L$ is a Riesz space and $\min(f,g)\in L$ for $f\in L$, $g\in L^\uparrow$. Then $f\leq g$ in $L^\uparrow$ implies $g-f\in L^\uparrow$ when defined. The family $\mathcal A=\{A:1_A\in L^\uparrow\}$ is closed under differences and countable unions. For nonnegative $f\in L^\uparrow$ with $\{f>0\}\in\mathcal A$, all $\{0<f<t\}$ lie in $\mathcal A$. Conversely these level sets together with the support condition imply $f\in L^\uparrow$.

??? proof "Proof"
    If $g_n\in L$ increase to $g$, then $g_n-\min(g_n,f)\in L$ increase to $g-f$. This proves subtraction. Intersections of indicators are minima, differences use this subtraction, and countable unions use increasing finite maxima. On the support $B$, repeat the tangent-power construction and take the increasing limit of $1_B-\min(f/t,1_B)^n$ to obtain $1_{\{0<f<t\}}$. Conversely the dyadic approximations are finite nonnegative sums of indicators of differences of the given level sets, plus a truncated top level; their increasing limit is $f$.

    The hypothesis holds for $L=L^1(I)$: a minimum of an integrable function with an increasing limit is itself an increasing limit whose integrals are bounded above by the finite integral of the first function, so Beppo Levi makes the finite-valued minimum integrable.
## Measure Spaces

!!! definition "Definition (Measure space)"
    <a id="def-10-8-1"></a>
    <a id="def-measure-space"></a>

    A **measure** on $(\Omega, \mathcal{M})$ is a map
    $\mu : \mathcal{M} \to [0, +\infty]$ with $\mu(\varnothing) = 0$ and

    $$
    \mu\!\left( \bigsqcup_{n=0}^{\infty} A_n \right) = \sum_{n=0}^{\infty}
    \mu(A_n)
    $$

    for any countable disjoint family. The triple $(\Omega, \mathcal{M}, \mu)$ is a **measure space**. A measure is **finite** if
    $\mu(\Omega) < \infty$, a **probability** if it equals $1$.

!!! definition "Definition (Integration of non-negative functions)"
    <a id="def-10-8-2"></a>
    <a id="def-integration-of-non-negative-functions"></a>

    For $f : \Omega \to [0, +\infty]$ measurable, define

    $$
    \int f\, d\mu = \sup \left\{ \int s\, d\mu : s \text{ simple}, 0 \leq s
    \leq f \right\},
    $$

    where a **simple function** is $s = \sum_{i=1}^{n} a_i \mathbf{1}_{A_i}$
    with $a_i \geq 0$ and $A_i \in \mathcal{M}$ pairwise disjoint. A
    general measurable $f$ is integrable if
    $\int f^+\, d\mu < \infty$ and $\int f^-\, d\mu < \infty$, where
    $f^{\pm} = \max\{\pm f, 0\}$; then $\int f\, d\mu = \int f^+\, d\mu - \int f^-\, d\mu$.

!!! theorem "Theorem (Monotone / Fatou / Dominated convergence)"
    <a id="thm-10-8-3"></a>
    <a id="thm-monotone-fatou-dominated-convergence"></a>

    In the measure-theoretic setting the same three pillars hold:

    1. **Beppo Levi:** if $0 \leq f_n \uparrow f$ pointwise, then
       $\int f_n\, d\mu \to \int f\, d\mu$.
    2. **Fatou:** if $f_n \geq 0$, then
       $\int \liminf f_n\, d\mu \leq \liminf \int f_n\, d\mu$.
    3. **Lebesgue dominated convergence:** if $f_n \to f$ pointwise and
       $|f_n| \leq g$ for some integrable $g$, then
       $\int f_n\, d\mu \to \int f\, d\mu$.

??? proof "Proof"
    For monotone convergence, fix a nonnegative simple $s\leq f$ and $0<c<1$. The sets $E_n=\{f_n\geq cs\}$ increase to the space except possibly where $s=0$, which does not contribute. Continuity from below of measures on the finitely many levels of $s$ gives $\int f_n\geq c\int s1_{E_n}\to c\int s$. Take the supremum over simple $s$ and let $c\uparrow1$. The reverse inequality is monotonicity.

    For Fatou, use $g_n=\inf_{k\geq n}f_k\uparrow\liminf f_k$ and $\int g_n\leq\inf_{k\geq n}\int f_k$. For dominated convergence apply Fatou to $g+f_n$ and $g-f_n$, both nonnegative. The bounds sandwich the integral liminf and limsup at $\int f$; domination first ensures $f$ is integrable.

!!! proposition "Proposition (Finite-measure pieces and integrability)"
    <a id="finite-measure-integrability"></a>

    Measures are continuous from below: disjointify an increasing union by successive differences and use sigma additivity. The measurable sets of finite measure form a semiring, giving the original step-function integral. For each measurable $A$, $\int1_A\,d\mu=\mu(A)$, including infinity; this follows directly from the simple-function definition. The measurable members of the Daniell space for these finite-measure step functions are precisely the usual integrable functions.

    If $f\geq0$ is integrable and $t>0$, $\mu\{f\geq t\}\leq t^{-1}\int f<\infty$. If $0\leq f\leq g$ and $g$ is integrable, then $f$ is integrable. A measurable real $f$ is integrable exactly when $|f|$ is. These statements require $t>0$ and nonnegative domination; those hypotheses are missing in the source's printed formulation.

??? proof "Proof"
    The level-set bound follows from $t1_{\{f\geq t\}}\leq f$. Nonnegative domination follows by monotonicity of the upper integral and dyadic approximation. Since $f^+,f^-\leq|f|$ and $f=f^+-f^-$, integrability of $|f|$ implies that of $f$; the converse uses the Riesz property. Integrating on $A$ means integrating $1_Af$; $|1_Af|\leq|f|$ proves its integrability.

!!! definition "Definition (Sigma-finite measure and negligible set)"
    <a id="sigma-finite-negligible"></a>

    A measure is sigma finite if the space is a countable union of measurable sets of finite measure; the covering sequence may be made increasing. A subset is negligible if it is contained in a measurable set of measure zero. An assertion holds almost everywhere if its failure set is negligible. Integrable functions supported on a measurable null set have integral zero, by their positive and negative simple approximations.

!!! theorem "Theorem (Carathéodory extension from a semiring)"
    <a id="caratheodory-extension"></a>

    A finite-valued nonnegative sigma-additive function on a semiring covering the space by countably many members extends uniquely to a sigma-finite measure on its generated sigma algebra.

??? proof "Proof"
    Construct the step-function integral $I$, extend it by Daniell, and let $L=L^1(I)$. The covering sets show $1_\Omega\in L^\uparrow$. The preceding level-set theorem makes $\{A:1_A\in L^\uparrow\}$ a sigma algebra. Set $\mu(A)=I(1_A)$ in its nonnegative increasing extension. Disjoint indicator partial sums and monotone convergence give sigma additivity, and the construction agrees with the semiring values.

    For uniqueness, fix a finite-measure covering member. The bounded functions whose integrals for two candidate extensions agree form a lambda family; it contains products of semiring indicators restricted to that member. The multiplicative monotone class theorem yields equality on all generated measurable indicators there. Partition the countable covering into disjoint finite-measure pieces and use sigma additivity to obtain global equality. Taking increasing unions of the covering members also proves sigma finiteness.

!!! example "Example (Lebesgue–Stieltjes measure)"
    <a id="ex-lebesguestieltjes-measure"></a>

    Applying the extension theorem to $\mu_\varphi((a,b])=\varphi(b)-\varphi(a)$ on $\mathbb R$ gives its Borel Lebesgue–Stieltjes measure. Write $\int_a^b f\,d\varphi$ for integration on $(a,b]$. For $\varphi(t)=t$ this is $\int_a^b f(t)\,dt$. If the ambient interval has an included left endpoint, its mass must be specified separately; the half-open interval prescription alone does not specify that atom.

!!! theorem "Theorem (Continuity of parameter integrals)"
    <a id="parameter-integral-continuity"></a>

    Let $Y$ be metric, $f:X\times Y\to\mathbb R$ have measurable sections in $x$, and let $g\in L^1(X)$ dominate $|f(x,y)|$ almost everywhere for each $y$. If the sections in $y$ are continuous at $p$ outside one negligible set, then $y\mapsto\int_X f(x,y)\,d\mu$ is continuous at $p$.

??? proof "Proof"
    For any $y_n\to p$, remove the common exceptional set and the countable union of the domination exceptions for $p,y_0,y_1,\ldots$. The sections then converge pointwise and are bounded by $g$ outside a null set. Dominated convergence gives convergence of their integrals. Sequential continuity suffices because $Y$ is metric.

!!! corollary "Corollary (Indefinite integrals and atoms)"
    <a id="cor-indefinite-integrals-and-atoms"></a>

    If $f\in L^1([a,b],\mu)$, then $F(x)=\int_{(a,x]}f\,d\mu$ is continuous at every $x_0$ with $\mu\{x_0\}=0$. Indeed $1_{(a,x]}(t)$ is continuous as a function of $x$ at $x_0$ whenever $t\neq x_0$, and $|1_{(a,x]}f|\leq|f|$. The integrability assumption is required.

!!! theorem "Theorem (Fundamental theorem of calculus)"
    <a id="fundamental-theorem-calculus"></a>

    For Lebesgue-integrable Borel $f$ on $[a,b]$, set $F(x)=\int_a^x f(t)\,dt$. At an interior point where $f$ is continuous, $F'(x)=f(x)$. If $f$ is continuous on $[a,b]$ and $G$ is continuous there with $G'=f$ in its interior, then $\int_a^b f=G(b)-G(a)$. Moreover $\int_a^b f=f(\xi)(b-a)$ for an interior $\xi$.

??? proof "Proof"
    The difference $F(x+h)-F(x)-hf(x)$ has absolute value at most $|h|\sup_{|t-x|\leq|h|}|f(t)-f(x)|=o(|h|)$. Thus $F'=f$ at continuity points. In the continuous case $F-G$ has zero derivative and is constant; continuity supplies the endpoint identity. Apply the Lagrange mean value theorem to $F$ for the final assertion.

## Product Measure

!!! definition "Definition (Product $\sigma$-algebra, product measure)"
    <a id="def-10-9-1"></a>
    <a id="def-product-algebra-product-measure"></a>

    For measurable spaces $(\Omega_i, \mathcal{M}_i)$, $i = 1, 2$, the
    **product $\sigma$-algebra** is
    $\mathcal{M}_1 \otimes \mathcal{M}_2 = \sigma(\{A_1 \times A_2 : A_i \in \mathcal{M}_i\})$.

    Given $\sigma$-finite measures $\mu_1, \mu_2$, the **product measure**
    $\mu_1 \otimes \mu_2$ is the unique measure on $\mathcal{M}_1 \otimes \mathcal{M}_2$ with
    $(\mu_1 \otimes \mu_2)(A_1 \times A_2) = \mu_1(A_1)\, \mu_2(A_2)$.

!!! theorem "Theorem (Fubini–Tonelli)"
    <a id="thm-10-9-2"></a>
    <a id="thm-fubinitonelli"></a>

    Let $f : \Omega_1 \times \Omega_2 \to [0, +\infty]$ be measurable
    with respect to $\mathcal{M}_1 \otimes \mathcal{M}_2$. The function
    $x \mapsto f(x, y)$ is measurable for every $y$, and

    $$
    \int f\, d(\mu_1 \otimes \mu_2) = \int \!\left( \int f(x, y)\, d\mu_1(x)
    \right) d\mu_2(y) = \int \!\left( \int f(x, y)\, d\mu_2(y)
    \right) d\mu_1(x).
    $$

    For $\mu_1, \mu_2$ $\sigma$-finite, the same equality holds for
    integrable $f : \Omega_1 \times \Omega_2 \to \mathbb{R}$.

??? proof "Proof"
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

!!! proposition "Proposition (Sections and Tonelli's construction)"
    <a id="prop-sections-and-tonelli-s-construction"></a>

    Every section of a product-measurable function is measurable. For indicators, fix $x$ and observe that the sets with measurable $x$-section form a sigma algebra containing all rectangles; then use simple approximations. For sigma-finite factors, the inner integral of a nonnegative product-measurable function is measurable in the outer variable.

??? proof "Proof"
    First restrict to finite-measure pieces. The bounded nonnegative functions with measurable inner integral form a lambda family, contain all products of bounded measurable coordinate functions, and therefore contain all bounded product-measurable functions by the multiplicative monotone class theorem. Increasing truncations and increasing unions of finite-measure pieces give the general statement.

    On rectangles of finite-measure sides prescribe $\nu(A\times B)=\mu_X(A)\mu_Y(B)$. The iterated-integral formula for indicators and monotone convergence give sigma additivity on this semiring. Carathéodory supplies its unique sigma-finite extension. On finite pieces, equality of product and iterated integrals holds for coordinate products, then for all bounded measurable functions by the same monotone class argument. Monotone limits give Tonelli's formula and interchanging the factors gives both orders.

!!! theorem "Theorem (Fubini's integrability criterion)"
    <a id="fubini-integrability"></a>

    A real product-measurable $f$ is integrable exactly when $\int_X\int_Y|f(x,y)|\,d\mu_Y\,d\mu_X<\infty$. In this case its sections are integrable for almost every outer variable, and both iterated signed integrals equal its product integral. Apply Tonelli to $|f|,f^+,f^-$ and subtract the finite values.

!!! definition "Definition (Signed Stieltjes integrals and jumps)"
    <a id="signed-stieltjes-jumps"></a>

    If $\varphi$ is a difference of two right-continuous increasing functions on $[a,b]$, define $\int_a^b f\,d\varphi$ by the corresponding difference of Stieltjes integrals for bounded Borel $f$. It is independent of the decomposition: two decompositions give the same interval increments and thus the same signed measure. Put $\Delta\varphi(t)=\varphi(t)-\varphi(t-)$ for $t>a$.

!!! theorem "Theorem (Stieltjes integration by parts with jumps)"
    <a id="stieltjes-parts-jumps"></a>

    For two such functions,

    $$
    \int_a^b\varphi(t)\,d\psi(t)+\int_a^b\psi(t)\,d\varphi(t)
    =\varphi(b)\psi(b)-\varphi(a)\psi(a)+\sum_{a<t\leq b}\Delta\varphi(t)\Delta\psi(t).
    $$

??? proof "Proof"
    First take increasing functions. Subtract their initial values and write each as the measure of $(a,t]$. Fubini turns the two integrals into integrals of $1_{x\leq y}$ and $1_{y\leq x}$ against the product of their Stieltjes measures. Their sum is $1+1_{x=y}$, so the result is the rectangle mass plus the diagonal mass. The diagonal mass is the sum of the products of matching atoms, exactly the displayed jump sum. Add back the initial-value terms. Increasing functions have only countably many positive jumps, and the sum is finite on this bounded interval. Bilinearity extends the identity to differences of increasing functions.
