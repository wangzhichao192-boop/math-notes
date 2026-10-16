# Differential Geometry

This chapter builds the calculus of **differential forms** on an open subset
of a real vector space, then uses **mollification** to convert rough forms
into smooth ones, defines **vector fields** and the **Lie derivative**,
introduces **submanifolds** and the **tangent space**, and finishes with
**partitions of unity** and the **Stokes formula** — the master theorem
that recovers as corollaries the fundamental theorem of calculus, Green's
theorem, the classical Stokes theorem, and the divergence theorem.

## Differential Forms

!!! definition "Definition (Differential p-form)"
    <a id="def-dg-1-1"></a>
    <a id="def-differential-p-form"></a>

    Let $U \subseteq E$ be open in a finite-dimensional real vector space
    $E$, and $p \in \mathbb{N}$. A **$p$-form** on $U$ is a map
    $\alpha : U \to \Lambda^p(E^\vee)$. The space of $p$-forms of class
    $C^\ell$ is $\Omega^p_\ell(U)$; a $0$-form is just a function on $U$.
    The **wedge** $\alpha \wedge \beta$ of a $p$-form $\alpha$ and a
    $q$-form $\beta$ is the $(p + q)$-form $(\alpha \wedge \beta)(x) = \alpha(x) \wedge \beta(x)$.

!!! proposition "Proposition (Identification of tensor-hom)"
    <a id="prop-dg-1-2"></a>
    <a id="prop-identification-of-tensor-hom"></a>

    For a free $K$-module $V$ of finite rank and any $K$-module $W$,
    there is a $K$-linear isomorphism
    $V^\vee \otimes W \cong \mathrm{Hom}_K(V, W)$,
    $\varphi \otimes w \mapsto (x \mapsto \varphi(x) w)$. The inverse
    sends $f \in \mathrm{Hom}_K(V, W)$ to
    $\sum_i e_i^\vee \otimes f(e_i)$.

??? proof "Proof"
    The bilinear map $V^\vee \times W \to \mathrm{Hom}_K(V, W)$,
    $(\varphi, w) \mapsto (x \mapsto \varphi(x) w)$, is $K$-bilinear
    (in $\varphi$ and $w$), so by the universal property of the
    tensor product it induces a $K$-linear map
    $\Phi : V^\vee \otimes W \to \mathrm{Hom}_K(V, W)$ with
    $\Phi(\varphi \otimes w)(x) = \varphi(x) w$.
    For the inverse, let $(e_i)$ be a basis of $V$ and $(e_i^\vee)$ its
    dual. Define
    $\Psi : \mathrm{Hom}_K(V, W) \to V^\vee \otimes W$ by
    $\Psi(f) = \sum_i e_i^\vee \otimes f(e_i)$. Check
    $\Psi(\Phi(\varphi \otimes w)) = \sum_i e_i^\vee \otimes \varphi(e_i) w = (\sum_i \varphi(e_i) e_i^\vee) \otimes w = \varphi \otimes w$
    (using the dual-basis expansion of $\varphi$).
    Check $\Phi(\Psi(f))(x) = \Phi(\sum_i e_i^\vee \otimes f(e_i))(x) = \sum_i e_i^\vee(x) f(e_i) = f(\sum_i e_i^\vee(x) e_i) = f(x)$,
    so $\Phi \circ \Psi = \mathrm{id}$. Hence $\Phi$ is a $K$-linear
    isomorphism with inverse $\Psi$.

!!! definition "Definition (Exterior derivative)"
    <a id="def-dg-1-3"></a>
    <a id="def-exterior-derivative"></a>

    For a differentiable $p$-form $\alpha : U \to \Lambda^p(E^\vee)$,
    its **exterior derivative** $d\alpha$ is the $(p+1)$-form obtained
    by composing $D\alpha : U \to \mathrm{Hom}(E, \Lambda^p(E^\vee)) \cong E^\vee \otimes \Lambda^p(E^\vee)$ with the map
    $\varphi \otimes \beta \mapsto \varphi \wedge \beta$ into
    $\Lambda^{p+1}(E^\vee)$.

!!! proposition "Proposition (Leibniz rule for the exterior derivative)"
    <a id="prop-dg-1-4"></a>
    <a id="prop-leibniz-rule-for-the-exterior-derivative"></a>

    For a $p$-form $\alpha$ and a $q$-form $\beta$ of class $C^1$,

    $$
    d(\alpha \wedge \beta) \;=\; d\alpha \wedge \beta \;+\; (-1)^p \,
    \alpha \wedge d\beta.
    $$

??? proof "Proof"
    By linearity reduce to $\alpha=f\alpha_0$, $\beta=g\beta_0$ with constant forms. Then $d(\alpha\wedge\beta)=(g\,df+f\,dg)\wedge\alpha_0\wedge\beta_0$. The first summand is $d\alpha\wedge\beta$. Move the one-form $dg$ across the degree-$p$ form $\alpha_0$ in the second summand; this gives $(-1)^p\alpha\wedge d\beta$. Scalars introduce no signs.

!!! proposition "Proposition ($d^2 = 0$)"
    <a id="prop-dg-1-5"></a>
    <a id="prop-notation"></a>

    For every $C^2$ form $\alpha$ on $U$, $d(d\alpha) = 0$. In
    particular $d$ is a cochain complex differential on the
    de Rham complex $\Omega^\bullet(U)$.

??? proof "Proof"
    By linearity, reduce to $\alpha = f \beta$ with $\beta \in \Lambda^p(E^\vee)$ and $f$ a $C^2$-function. Then
    $d\alpha = df \wedge \beta$, so
    $d^2 \alpha = d(df) \wedge \beta$. The bilinear form $D^2 f(x)$
    on $E$ is symmetric, so under tensor-dual identification it is a symmetric tensor in $E^\vee\otimes E^\vee$. Its image under
    the antisymmetrisation map
    $\mathrm{alt}: E^\vee \otimes E^\vee \to \Lambda^2(E^\vee)$
    is therefore $0$ (the symmetric part of the image is
    $D^2 f(x)$ itself, and the antisymmetric part of a symmetric
    tensor is $0$). Hence $d(df)(x) = 0$ for all $x$, giving
    $d^2 \alpha = 0$.

!!! definition "Definition (Integral of an $n$-form)"
    <a id="def-dg-1-6"></a>
    <a id="def-integral-of-an-form"></a>

    Fix a non-zero $\xi \in \det(E)$ and let $\mu_\xi$ be the Haar measure
    on $E$ with $\mu_\xi(\{(a_1, \ldots, a_n) : 0 < a_i \leq 1\}) = 1$.
    For an $n$-form $\alpha : U \to \Lambda^n(E^\vee)$ with $\alpha(\xi)$
    integrable, the **integral** of $\alpha$ on $U$ is
    $\int_U \alpha := \int_U \alpha(x)(\xi)\, d\mu_\xi(x)$. It depends
    only on the orientation $\mathbb{R}_{>0} \cdot \xi$.

!!! notation "Regularity, support and coordinate forms"
    <a id="notation-regularity-support-and-coordinate-forms"></a>

    The support of a form is the closure in $U$ of its nonzero locus. Write $\Omega_c^p(U)$ for the continuous compactly supported $p$-forms and $\Omega^p(U)=\Omega_\infty^p(U)$. Wedges satisfy $\alpha\wedge\beta=(-1)^{pq}\beta\wedge\alpha$. Since wedge multiplication is multilinear on finite-dimensional spaces, it is smooth and preserves the common regularity of the factors. In linear coordinates $x_i$, every form has a unique expression $\alpha=\sum_{i_1<\cdots<i_p}f_{i_1\cdots i_p}\,dx_{i_1}\wedge\cdots\wedge dx_{i_p}$, and its continuity or $C^\ell$ regularity is equivalent to that of all its coefficients. In particular $df=Df$ and $d(f\eta)=df\wedge\eta$ for constant $\eta$.

!!! proposition "Proposition (Duals of tensor products and symmetric tensors)"
    <a id="tensor-duals-symmetric-tensors"></a>

    There is a canonical map $\Phi:V_1^\vee\otimes\cdots\otimes V_n^\vee\to(V_1\otimes\cdots\otimes V_n)^\vee$ sending $\phi_1\otimes\cdots\otimes\phi_n$ to the form $x_1\otimes\cdots\otimes x_n\mapsto\prod_i\phi_i(x_i)$. It is an isomorphism for finite free modules. Permuting tensor factors by $x_1\otimes\cdots\otimes x_n\mapsto x_{\sigma^{-1}(1)}\otimes\cdots\otimes x_{\sigma^{-1}(n)}$ defines permutation operators. A tensor fixed by them all is symmetric; this is a tensor in the tensor algebra, rather than a class in the symmetric algebra. A symmetric tensor of covectors gives a symmetric multilinear form; for finite free modules the converse holds. If $n\ge2$ and $2$ is a unit, a symmetric tensor has zero image in $\Lambda^n(V)$.

??? proof "Proof"
    Each product of forms is multilinear in the vectors, and its induced linear form is multilinear in the covectors, so the tensor universal property constructs $\Phi$. In finite bases $(e_{i,j})$, an inverse sends a form $\psi$ to

    $$
    \sum_{j_1,\ldots,j_n}\psi(e_{1,j_1}\otimes\cdots\otimes e_{n,j_n})\,
    e_{1,j_1}^\vee\otimes\cdots\otimes e_{n,j_n}^\vee.
    $$

    Applying $\Phi$ recovers $\psi$ on every basis tensor. Applying this inverse to a product of forms expands each covector in its dual basis and recovers the original pure tensor, so both composites are identity. Permuting a tensor permutes the arguments of its associated multilinear form; injectivity gives the converse under finite freeness. A transposition fixes a symmetric tensor but negates its exterior image. That image is therefore annihilated by $2$ and is zero when $2$ is invertible. The restriction $n\ge2$ is necessary; in degree one the exterior quotient is the identity.

!!! definition "Definition (Local integrability of a form)"
    <a id="local-integrability-forms"></a>

    A $p$-form $\alpha$ is locally integrable if $\alpha\wedge\beta$ is an integrable top-degree form for every $\beta\in\Omega_c^{n-p}(U)$. Denote these forms by $\Omega_{\mathrm{loc}}^p(U)$. For a basis with $\xi=e_1\wedge\cdots\wedge e_n$, the normalizing parallelotope is $\{\sum_i a_ie_i:0<a_i\le1\}$. Linear change of variables makes its measure depend only on $\xi$ and gives $\mu_{b\xi}=|b|^{-1}\mu_\xi$. Thus positive rescaling leaves the top-form integral unchanged, while negative rescaling reverses its sign.

## Mollification

!!! definition "Definition (Standard mollifier)"
    <a id="def-dg-2-1"></a>
    <a id="def-standard-mollifier"></a>

    The function $b : \mathbb{R} \to [0, 1]$,
    $b(t) = \exp\!\bigl(\tfrac{1}{t^2 - 1}\bigr)$ for $|t| < 1$ and
    $b(t) = 0$ otherwise, is $C^\infty$. The **standard mollifier** on
    $\mathbb{R}^n$ is
    $\rho(x) := c_n\prod_{i=1}^n b(x_i)$ with $c_n > 0$ chosen so that
    $\int_{\mathbb{R}^n} \rho\, d\mu = 1$, and $\rho_\varepsilon(x) := \varepsilon^{-n} \rho(x / \varepsilon)$ for $\varepsilon > 0$.

!!! proposition "Proposition (Mollification is smoothing)"
    <a id="prop-dg-2-2"></a>
    <a id="prop-mollification-is-smoothing"></a>

    For $f \in L^1_{\mathrm{loc}}(\mathbb{R}^n)$ the **mollified function**
    $f_\varepsilon := f \ast \rho_\varepsilon$ is $C^\infty$ on the
    $\varepsilon$-interior of the domain for the supremum norm (and hence on each fixed compact subset for sufficiently small $\varepsilon$), and $f_\varepsilon \to f$
    almost everywhere (and in $L^1_{\mathrm{loc}}$) as $\varepsilon \to 0$.

??? proof "Proof"
    **Smoothness.** Differentiation under the integral gives
    $\partial^\alpha f_\varepsilon = f \ast \partial^\alpha \rho_\varepsilon$. Since $\rho$ is $C^\infty$ with compact
    support, the integration near each fixed point involves $f$ only on one compact neighbourhood. The bounded kernel derivatives and local integrability supply domination for every derivative and its continuity. Thus $f_\varepsilon$ is smooth locally.
    **Convergence in $L^1_{\mathrm{loc}}$.** Multiply $f$ by a smooth cutoff equal to one on a compact neighbourhood of the set under consideration. The product lies in $L^1$, and for small $\varepsilon$ its convolution agrees there with that of $f$. The density and convolution contraction proof below then gives local convergence. Local integrability alone does not imply uniform continuity.
    **A.e. convergence.** By the Lebesgue differentiation theorem,
    for almost every $x$, $\lim_{r \to 0} \frac{1}{|B(0, r)|} \int_{B(x, r)} |f(y) - f(x)|\, dy = 0$. The average $\int f(y) \rho_\varepsilon(x - y)\, dy$ tends to $f(x)$ by the same
    bound $|f_\varepsilon(x)-f(x)|\le C\varepsilon^{-n}\int_{\|y-x\|_\infty\le\varepsilon}|f(y)-f(x)|\,dy$. The cube version of the Lebesgue differentiation theorem, or comparison with a containing Euclidean ball, makes this tend to zero at each Lebesgue point. This almost-everywhere extension is additional to the lecture's continuity-point and $L^1$ approximation results.

!!! definition "Definition (Local chart, smooth atlas)"
    <a id="def-dg-2-3"></a>
    <a id="def-local-chart-smooth-atlas"></a>

    A **chart** on a topological space $X$ is a homeomorphism
    $\varphi : U \to V \subseteq \mathbb{R}^n$ from an open $U \subseteq X$
    to an open subset of $\mathbb{R}^n$. A $C^\ell$-atlas is a family of
    charts covering $X$ with pairwise $C^\ell$-compatible overlaps; two
    atlases define the same $C^\ell$-structure iff their union is again
    an atlas.

!!! lemma "Lemma (Smooth bump function and its derivatives)"
    <a id="smooth-bump-derivatives"></a>

    The function $b(t)=\exp(1/(t^2-1))$ on $|t|<1$, zero elsewhere, is smooth, with every derivative zero at $\pm1$.

??? proof "Proof"
    For each integer $m\ge0$, the exponential series gives $e^x\ge x^{m+1}/(m+1)!$ for $x>0$, hence $0\le x^me^{-x}\le(m+1)!/x\to0$. Inductively, on $(-1,1)$,

    $$
    b^{(r)}(t)=\frac{F_r(t)}{(t^2-1)^{2r}}b(t),\qquad
    F_{r+1}=-2tF_r-4rt(t^2-1)F_r+(t^2-1)^2F_r'.
    $$

    Outside $[-1,1]$ each derivative is zero. With $x=(1-t^2)^{-1}$, every quotient of a derivative by $t-1$ or $t+1$ is bounded by a constant times a power of $x$ times $e^{-x}$ and tends to zero. Thus its derivative at each endpoint exists and equals zero, completing the induction.

!!! proposition "Proposition (Smooth localization)"
    <a id="smooth-localization"></a>

    If $K\subseteq U\subseteq E$ with $K$ compact and $U$ open, there is a smooth function $0\le\rho\le1$, equal to one on $K$, whose support is compact and contained in $U$. If $f\in C^\ell(U)$, extending $\rho f$ by zero gives a compactly supported $C^\ell$ function on $E$ agreeing with $f$ on $K$.

??? proof "Proof"
    In coordinates with the sup norm let $\chi(x)=C\prod_i b(x_i)$, with $C$ chosen so that its integral is one. Fubini computes $C$, and linear change of variables shows that $\chi_\epsilon(x)=\epsilon^{-n}\chi(x/\epsilon)$ also has integral one. The closed neighbourhood $K_\epsilon=\{x:d(x,K)\le\epsilon\}$ is compact: the distance is attained on $K$, and this set is closed and bounded. Some $\epsilon>0$ has $K_{2\epsilon}\subseteq U$; otherwise a sequence outside $U$ at distances tending to zero has a subsequence converging to a point of $K$, a contradiction. Set $\rho=\mathbf1_{K_\epsilon}*\chi_\epsilon$. Differentiation under the integral makes it smooth, positivity and normalization give $0\le\rho\le1$, and for $x\in K$ every contributing $x-y$ lies in $K_\epsilon$, giving value one. If $x\notin K_{2\epsilon}$ it vanishes. The extension statement follows since $\rho$ vanishes on a neighbourhood of every point outside its compact support.

!!! lemma "Lemma (Density of an integral's Riesz space)"
    <a id="riesz-space-density"></a>

    If $I$ is an integral operator on a Riesz space $S$, then $S$ is dense in $L^1(I)$ for the seminorm $I(|f|)$.

??? proof "Proof"
    It suffices to treat $f\ge0$. Choose $u\in S^\uparrow$ with $u\ge f$ and $I(u-f)<\epsilon/2$, and nonnegative $g_n\in S$ increasing to $u$. Put $f_n=\min(f,g_n)$. Then $0\le g_n-f_n\le u-f$, so $I(g_n-f_n)<\epsilon/2$, while $f-f_n\downarrow0$ and is dominated by $f$. Integral continuity gives $I(f-f_n)<\epsilon/2$ for some $n$. The triangle inequality then gives $I(|f-g_n|)<\epsilon$. Apply this separately to positive and negative parts for general $f$.

!!! proposition "Proposition (Approximation by convolution)"
    <a id="convolution-approximation"></a>

    For a nonnegative smooth compactly supported kernel $\chi$ with integral one and support in the unit ball, let $f_\epsilon=f*\chi_\epsilon$. If $f$ is continuous at $x_0$, then $f_\epsilon(x_0)\to f(x_0)$. If $f$ is uniformly continuous on an open $U$, convergence is uniform on every compact $K\subseteq U$. If $f\in L^1(E)$, then $\|f_\epsilon-f\|_1\to0$.

??? proof "Proof"
    Normalization and positivity give

    $$
    |f_\epsilon(x)-f(x)|\le\sup_{\|y\|\le\epsilon}|f(x-y)-f(x)|.
    $$

    This tends to zero at a continuity point; a compact neighbourhood of $K$ stays inside $U$, and uniform continuity proves the uniform version. For $f\in C_c(E)$ the convolutions with $\epsilon<1$ have supports in the fixed compact set $K_1$, and uniform convergence gives $L^1$ convergence. For general $f\in L^1$, choose $g\in C_c(E)$ with $\|f-g\|_1<\delta$ using density. Tonelli and translation invariance give $\|f_\epsilon-g_\epsilon\|_1\le\|f-g\|_1$. Thus $\|f_\epsilon-f\|_1\le2\delta+\|g_\epsilon-g\|_1$; let $\epsilon\downarrow0$ and then $\delta\downarrow0$. Cutoffs yield the local $L^1$ version.

!!! theorem "Theorem (Taylor formula with integral remainder)"
    <a id="taylor-integral-remainder"></a>

    For a real Banach space, $f\in C^{r+1}(U,\mathbb R)$, and a segment $a+th\in U$ for $0\le t\le1$,

    $$
    f(a+h)=\sum_{k=0}^r\frac{D^kf(a)(h,\ldots,h)}{k!}
    +\int_0^1\frac{(1-t)^r}{r!}D^{r+1}f(a+th)(h,\ldots,h)\,dt.
    $$

??? proof "Proof"
    For $g(t)=f(a+th)$, $g^{(k)}(t)=D^kf(a+th)(h,\ldots,h)$. The case $r=0$ is the fundamental theorem. Integration by parts in the remainder $R_r$ gives $R_r=g^{(r+1)}(0)/(r+1)!+R_{r+1}$, since the boundary contribution of $-(1-t)^{r+1}g^{(r+1)}(t)/(r+1)!$ at zero is $g^{(r+1)}(0)/(r+1)!$. Induction proves the formula.

!!! corollary "Corollary (Hadamard decomposition on a convex set)"
    <a id="hadamard-decomposition"></a>

    If $f\in C^\ell(U)$, $\ell\ge1$, and $U$ is convex, then for a basis $(e_i)$ and $a\in U$,

    $$
    f(x)=f(a)+\sum_i g_i(x)e_i^\vee(x-a),\qquad
    g_i(x)=\int_0^1Df(a+t(x-a))(e_i)\,dt.
    $$

    Each $g_i$ is $C^{\ell-1}$ and $g_i(a)=Df(a)(e_i)$; for smooth $f$ each $g_i$ is smooth.

??? proof "Proof"
    Use Taylor's formula with $r=0$, expand $x-a$ in the basis, and interchange the finite sum with the integral. Differentiation under the integral on compact parameter intervals proves the regularity.

!!! definition "Definition (Point derivation)"
    <a id="point-derivation"></a>

    For a commutative unital $k$-algebra $A$ and a unital algebra map $P:A\to k$, write $f(P)=P(f)$. A point derivation is a $k$-linear map $\partial:A\to k$ with $\partial(fg)=f(P)\partial g+g(P)\partial f$. These maps form $\operatorname{Der}_P(A)$. For evaluation at $P\in U$, $f\mapsto Df(P)(v)$ is such a derivation for each $v\in E$.

!!! proposition "Proposition (Point derivations and the cotangent quotient)"
    <a id="point-derivations-cotangent-quotient"></a>

    Put $I=\ker P$. Derivations vanish on $I^2$ and on scalar constants, and restriction gives an isomorphism $\operatorname{Der}_P(A)\cong\operatorname{Hom}_k(I/I^2,k)$.

??? proof "Proof"
    For $f,g\in I$ the Leibniz rule makes $\partial(fg)=0$, hence it kills their finite sums. Also $\partial1=\partial(1^2)=2\partial1$ implies $\partial1=0$ by subtraction, and $k$-linearity kills constants; no assumption on $2$ is needed for this step. For $\lambda:I/I^2\to k$ define $\partial_\lambda f=\lambda([f-f(P)])$. Modulo $I^2$,

    $$
    [fg-f(P)g(P)]=f(P)[g-g(P)]+g(P)[f-f(P)],
    $$

    so this is a derivation. Restricting it to $I$ recovers $\lambda$. Conversely applying this construction to a derivation gives $\partial(f-f(P))=\partial f$, proving both inverse identities.

!!! proposition "Proposition (Locality and coordinate cotangent space)"
    <a id="locality-coordinate-cotangent-space"></a>

    Point derivations on $C^\ell(U)$ are local at $P$: functions agreeing near $P$ have equal derivatives. For $\ell\ge1$, the map $E^*\to I/I^2$, $\phi\mapsto[\phi-\phi(P)]$, is injective. It is an isomorphism for smooth functions on a convex $U$.

??? proof "Proof"
    If $f$ vanishes near $P$, choose a smooth cutoff $\chi$ equal to one near $P$ and supported in that neighbourhood. Then $\chi f=0$, and $0=\partial(\chi f)=\partial f$ by $\chi(P)=1$ and $f(P)=0$. The map $[f]\mapsto Df(P)$ is well-defined because products of two functions vanishing at $P$ have zero differential there, and is a left inverse to the coordinate map, proving injectivity. For smooth $f$ with $f(P)=0$, Hadamard decomposition gives $f=\sum_i g_i(x)(x_i-x_i(P))$. Modulo $I^2$ replace each $g_i$ by $g_i(P)$, since the difference vanishes at $P$. Thus $[f]=[Df(P)(x-P)]$, proving surjectivity. In particular $I^2$ consists exactly of the functions with both value and differential zero at $P$ in this smooth convex case.

## Vector Fields

!!! definition "Definition (Vector field)"
    <a id="def-dg-3-1"></a>
    <a id="def-vector-field"></a>

    A (smooth) **vector field** on an open $U \subseteq \mathbb{R}^n$ is
    a $C^\infty$ map $X : U \to \mathbb{R}^n$. Equivalently, it is a
    derivation $C^\infty(U) \to C^\infty(U)$, $f \mapsto X(f)$ with
    $X(fg) = f X(g) + g X(f)$.

!!! definition "Definition (Lie derivative and Lie bracket)"
    <a id="def-dg-3-2"></a>
    <a id="def-lie-derivative-and-lie-bracket"></a>

    The bracket is $[X,Y]=DY\,X-DX\,Y$, characterized by its commutator action on scalar functions. The Lie derivative of a form is defined by the evaluation formula below. Interior multiplication inserts $X$ in its first argument.

!!! theorem "Theorem (Cartan's formula)"
    <a id="cartan-formula"></a>

    For $C^1$ fields and $C^1$ forms, $\mathcal L_X\omega=\iota_Xd\omega+d\iota_X\omega$.

??? proof "Proof"
    Write the right side as $\delta_X\omega$. On functions both $\delta_X$ and $\mathcal L_X$ give $X(f)$. For a one-form, reduction to $\omega=f\,dg$ with linear $g$ gives

    $$
    d\omega(X,Y)=X(f)Y(g)-Y(f)X(g)
    =X(\omega(Y))-Y(\omega(X))-\omega([X,Y]).
    $$

    Hence $\iota_Xd\omega(Y)+d\iota_X\omega(Y)=X(\omega(Y))-\omega([X,Y])$, proving equality in degree one. The graded Leibniz rules for $d$ and $\iota_X$ imply an ordinary Leibniz rule for $\delta_X$: for a one-form $\alpha$, expand $\iota_X(d\alpha\wedge\beta-\alpha\wedge d\beta)+d(\iota_X\alpha\wedge\beta-\alpha\wedge\iota_X\beta)$. The two terms with $d\alpha\wedge\iota_X\beta$ cancel, as do those with $\iota_X\alpha\wedge d\beta$, leaving $\delta_X\alpha\wedge\beta+\alpha\wedge\delta_X\beta$. Induction gives the rule for all degrees. Coordinate forms generate the form algebra over functions; equality on functions and one-forms, and the two Leibniz rules, prove equality everywhere. For smooth forms, $d^2=0$ also gives $\mathcal L_Xd=d\mathcal L_X$.

!!! proposition "Proposition (Coordinate action and bracket construction)"
    <a id="coordinate-vector-field-bracket"></a>

    Any vector field is a map $X:U\to E$, with $X(f)(x)=Df(x)X(x)$. It obeys the Leibniz rule, kills constants, and is determined by its actions on linear coordinates: $X=\sum_i X(x_i)e_i$. If $X\in C^m$ and $f\in C^{m+1}$, then $X(f)\in C^m$. For $C^1$ fields,

    $$
    [X,Y]=DY\,X-DX\,Y,
    \qquad [X,Y](h)=X(Y(h))-Y(X(h))\quad(h\in C^2).
    $$

    The bracket is bilinear and takes $C^m$ fields to $C^{m-1}$ fields.

??? proof "Proof"
    Applying the differential Leibniz rule to $X$ proves the product identity; evaluating on each $x_i$ recovers its coordinate functions. Expand $X,Y$ in constant vectors and scalar functions. For $X=fv,Y=gw$, the two iterated derivatives have second-derivative terms $fg\partial_v\partial_wh$ and $fg\partial_w\partial_vh$, which cancel by Schwarz's theorem. The remaining field is $f\partial_v(g)w-g\partial_w(f)v$, yielding the displayed formula after summing. Linear coordinates determine a field uniquely, proving uniqueness and the regularity claims.

!!! definition "Definition (Pushforward of a vector field)"
    <a id="vector-field-pushforward"></a>

    For a $C^1$ diffeomorphism $\psi:U\to U'$, put $(\psi_*X)(y)=D\psi(\psi^{-1}y)X(\psi^{-1}y)$. If $X$ is $C^m$ and $\psi$ is $C^{m+1}$, this is $C^m$. For a $C^2$ diffeomorphism and $C^1$ fields, $\psi_*[X,Y]=[\psi_*X,\psi_*Y]$.

??? proof "Proof"
    The chain rule gives $(\psi_*X)(h)\circ\psi=X(h\circ\psi)$. Apply it twice to $h\in C^2$, subtract the two orders, and use uniqueness of the bracket from its actions on functions. This gives the asserted equality; the regularity follows from the pushforward formula.

!!! proposition "Proposition (Exterior dual pairing and evaluation)"
    <a id="exterior-dual-pairing"></a>

    Evaluation of a wedge of covectors on vectors is the determinant of their pairings. This induces $\Lambda^p(V^\vee)\to(\Lambda^pV)^\vee$, an isomorphism when $V$ is finite free. In particular

    $$
    (\theta\wedge\beta)(X_0,\ldots,X_p)=\sum_{i=0}^p(-1)^i\theta(X_i)\beta(X_0,\ldots,\widehat X_i,\ldots,X_p).
    $$

??? proof "Proof"
    The determinant is alternating and multilinear in both the vectors and covectors, so the two exterior universal properties produce the map. Wedges of dual basis covectors evaluate to one on their matching basis wedge and zero on the others, so it sends a basis to its dual basis and is an isomorphism. Expanding the determinant along its first row gives the formula.

!!! proposition "Proposition (Lie derivative from evaluations)"
    <a id="lie-derivative-evaluations"></a>

    For a $C^m$ field $X$ and $C^m$ $p$-form $\omega$, $m\ge1$, the unique $C^{m-1}$ form $\mathcal L_X\omega$ satisfies

    $$
    (\mathcal L_X\omega)(X_1,\ldots,X_p)
    =X(\omega(X_1,\ldots,X_p))-\sum_i\omega(X_1,\ldots,[X,X_i],\ldots,X_p).
    $$

    It obeys $\mathcal L_X(\alpha\wedge\beta)=\mathcal L_X\alpha\wedge\beta+\alpha\wedge\mathcal L_X\beta$.

??? proof "Proof"
    Replacing $X_j$ by $fX_j$ in the right side creates a term $X(f)\omega(X_1,\ldots,X_p)$ in its first summand. The same term occurs in its bracket summand because $[X,fX_j]=X(f)X_j+f[X,X_j]$, and cancels. Thus the expression is $C^1$-linear in every field argument. It is alternating: if two arguments coincide, the first summand vanishes and the two exceptional bracket summands cancel. The exterior pairing therefore gives a unique form; evaluating on constant coordinate fields proves $C^{m-1}$ regularity. For a function $f$ the product formula is the ordinary Leibniz rule. For a one-form factor, expand its wedge using the preceding alternating sum; differentiating each product and grouping the bracket replacements gives the two required terms. Any higher form is a sum of wedges of one-forms with scalar coefficients. Induct on the number of factors to obtain the general formula.

!!! definition "Definition (Interior product)"
    <a id="interior-product"></a>

    For a $p$-form with $p\ge1$, $(\iota_X\omega)(X_1,\ldots,X_{p-1})=\omega(X,X_1,\ldots,X_{p-1})$; for functions put $\iota_Xf=0$. It satisfies $\iota_X(\alpha\wedge\beta)=\iota_X\alpha\wedge\beta+(-1)^p\alpha\wedge\iota_X\beta$ when $\alpha$ has degree $p$.

??? proof "Proof"
    For $p=0$ the assertion is linearity. For $p=1$ the first term in the alternating wedge expansion evaluates the one-form on $X$; the other terms give the negative of its wedge with $\iota_X\beta$. For higher $p$, write $\alpha=\theta\wedge\eta$ and use the degree-one case and the induction hypothesis on $\eta$. The two applications introduce the sign $(-1)^p$, giving the formula.

!!! theorem "Theorem (Exterior derivative evaluated on fields)"
    <a id="exterior-derivative-fields"></a>

    For $C^1$ fields $X_0,\ldots,X_p$ and a $C^1$ form,

    $$
    d\omega(X_0,\ldots,X_p)
    =\sum_{i=0}^p(-1)^iX_i\bigl(\omega(X_0,\ldots,\widehat X_i,\ldots,X_p)\bigr)
    +\sum_{0\le i<j\le p}(-1)^{i+j}\omega([X_i,X_j],X_0,\ldots,\widehat X_i,\ldots,\widehat X_j,\ldots,X_p).
    $$

??? proof "Proof"
    Degree zero is the definition of $df$, and degree one was checked in Cartan's formula. For the induction step, Cartan gives $\iota_{X_0}d\omega=\mathcal L_{X_0}\omega-d\iota_{X_0}\omega$. Evaluate on $X_1,\ldots,X_p$. The Lie-derivative term gives the derivative with index zero and all brackets involving $X_0$; moving each bracket to the first position contributes $(-1)^j$. The induction formula for the second term gives derivatives with indices $1,\ldots,p$, with the minus sign changing $(-1)^{i-1}$ to $(-1)^i$. Its brackets first enter after $X_0$; moving them past $X_0$ cancels the additional minus sign and gives $(-1)^{i+j}$. Together these are exactly the displayed sums.

## Submanifolds and Tangent Space

!!! definition "Definition (Submanifold)"
    <a id="def-dg-4-1"></a>
    <a id="def-submanifold"></a>

    A subset $M \subseteq \mathbb{R}^n$ is an **$m$-dimensional
    submanifold** if every point $p \in M$ has a neighbourhood $U$ in
    $\mathbb{R}^n$ and a $C^\infty$-diffeomorphism $\varphi : U \to V \subseteq \mathbb{R}^n$ such that $\varphi(U \cap M) = V \cap (\mathbb{R}^m \times \{0\})$.

!!! definition "Definition (Tangent space)"
    <a id="def-dg-4-2"></a>
    <a id="def-tangent-space"></a>

    For a submanifold $M \subseteq \mathbb{R}^n$ and $p \in M$, the
    **tangent space** $T_p M$ is the set of derivatives
    $\gamma'(0)$ of $C^1$-curves $\gamma : (-\varepsilon, \varepsilon) \to M$ with $\gamma(0) = p$. Equivalently, $T_p M = \ker(d N_p)$
    where $N$ is a local defining function for $M$ near $p$.

!!! definition "Definition (Differential of a smooth map)"
    <a id="def-dg-4-3"></a>
    <a id="def-differential-of-a-smooth-map"></a>

    For a smooth map $F : M \to N$ between submanifolds and $p \in M$,
    the **differential** $dF_p : T_p M \to T_{F(p)} N$ is the linear map
    sending $\gamma'(0)$ to $(F\circ\gamma)'(0)$. In charts this is $D(F\psi)(x)D\psi(x)^{-1}$, so it is well-defined and linear.

!!! theorem "Theorem (Implicit function theorem)"
    <a id="implicit-function-theorem"></a>

    For real Banach spaces $E,F,G$ let $f\in C^r(U\times V,G)$ near $(x_0,y_0)$, with $f(x_0,y_0)=0$ and $D_yf(x_0,y_0)$ a bounded isomorphism. Then on smaller product neighbourhoods the zero set is uniquely the graph $y=\phi(x)$ of a $C^r$ map, and

    $$
    D\phi(x)=-D_yf(x,\phi(x))^{-1}D_xf(x,\phi(x)).
    $$

??? proof "Proof"
    Let $g(x,y)=(x,f(x,y))$. Its differential sends $(u,v)$ to $(u,D_xf(u)+D_yf(v))$ and has bounded inverse $(a,b)\mapsto(a,D_yf^{-1}(b-D_xf(a)))$. The inverse function theorem supplies a local $C^r$ inverse. Restrict that inverse to $(x,0)$, and then project to the second coordinate to get $\phi$. Shrink product neighbourhoods inside the inverse chart to ensure that every zero there lies on this graph. Differentiating $f(x,\phi(x))=0$ yields the derivative formula. For $f(x,y)=x^2+y^2-1$ near $(0,1)$, $D_yf=2$, so the graph is $\phi(x)=\sqrt{1-x^2}$ near zero and $\phi'(0)=0$.

!!! definition "Definition (Immersion and submersion)"
    <a id="immersion-submersion"></a>

    A differentiable map is an immersion if every differential is injective and a submersion if every differential is surjective.

!!! theorem "Theorem (Three local descriptions of a submanifold)"
    <a id="submanifold-three-descriptions"></a>

    A subset of an $n$-dimensional real vector space is a $C^\ell$ submanifold of dimension $d$ if and only if, near each point, it has any of these equivalent descriptions: a $C^\ell$ ambient diffeomorphism flattens it to a $d$-dimensional linear subspace; it is the zero set of a $C^\ell$ submersion to a space of dimension $n-d$; or it is the image of a $C^\ell$ immersion from an open subset of a $d$-dimensional space that is a homeomorphism onto the subspace with its relative topology.

??? proof "Proof"
    From a flattening map $f$, compose with the quotient by the flattened subspace $F$. Its derivative is surjective and its zero set is exactly the desired subset. From a submersion $g$ with $g(a)=0$, let $H=\ker Dg(a)$ and choose a complement $L$ on which $Dg(a)$ is an isomorphism. Apply the implicit function theorem to $g(a+x+y)$ on $H\times L$. Its zero set is locally $\varphi(x)=a+x+\psi(x)$, with $\psi(x)\in L$. The projection to $H$ is a continuous inverse on its image, and $D\varphi=\mathrm{Id}_H+D\psi$ is injective because its two components lie in complementary subspaces.

    Conversely translate $a$ to zero and let $F=\operatorname{im}D\varphi(0)$, with complement $F'$, projections $\pi,\pi'$. The map $\pi\varphi$ has invertible derivative, so after shrinking its domain it is a diffeomorphism. Put $h=\pi'\varphi(\pi\varphi)^{-1}$ and define the ambient map $f(x)=x-h(\pi x)$. Its inverse is $y\mapsto y+h(\pi y)$ because $h$ takes values in $F'$; both maps are $C^\ell$. On the parametrized set $f(\varphi(b))=\pi\varphi(b)\in F$. Conversely $f(x)\in F$ implies $\pi' x=h(\pi x)$ and hence $x=\varphi((\pi\varphi)^{-1}(\pi x))$. This proves the flattened description, including the inverse and both set inclusions.

!!! example "Example (Open subsets and hypersurfaces)"
    <a id="ex-open-subsets-and-hypersurfaces"></a>

    Every nonempty open subset of $E$ is a submanifold of dimension $\dim E$. If $f\in C^\ell(U,\mathbb R)$ and $Df\ne0$ at every point of its nonempty zero set, that zero set is a submanifold of codimension one, called a hypersurface. The derivative remains nonzero on suitable neighbourhoods, where $f$ is a submersion.

!!! theorem "Theorem (Tangent-space descriptions)"
    <a id="tangent-space-descriptions"></a>

    At $a$ in a $d$-dimensional submanifold, the curve-defined tangent space is a vector subspace of dimension $d$. For the three local descriptions above it is, respectively, $Df(a)^{-1}(F)$, $\ker Dg(a)$, and $D\varphi(\varphi^{-1}(a))(H)$.

??? proof "Proof"
    In a parametrization with $\varphi(0)=a$, each curve $t\mapsto\varphi(tv)$ yields the tangent vector $D\varphi(0)v$, so a $d$-dimensional subspace is contained in the curve-defined space. For every tangent curve, differentiation of $g\gamma=0$ puts its derivative in the $d$-dimensional kernel of $Dg(a)$. Thus both inclusions give equality and the parametrization formula. Differentiating $f\gamma$ puts all tangent vectors in $Df(a)^{-1}(F)$, also of dimension $d$, proving the remaining formula. Only a small interval around zero is needed, so all curves stay within the local descriptions.

!!! proposition "Proposition (Canonical charts and changes of coordinates)"
    <a id="canonical-charts"></a>

    A local parametrization $\psi:W\to M$ is called a local chart in the lecture convention. With an inner product on the ambient space and orthogonal projection $\pi:E\to T_aM$, the map $\pi(\psi(x)-a)$ has invertible differential at $\psi^{-1}(a)$. Its local inverse gives a canonical chart on an open neighbourhood of zero in $T_aM$. Changes between $C^\ell$ charts are $C^\ell$ diffeomorphisms. Therefore smoothness of a function on $M$ can be checked in one chart around each point.

??? proof "Proof"
    The derivative is $\pi D\psi$, and $D\psi$ is an isomorphism onto $T_aM$, where $\pi$ is identity. Apply local inversion and compose its inverse with $\psi$. The resulting chart is the inverse, on $M$, of $x\mapsto\pi(x-a)$, so it is independent of the auxiliary chart after shrinking. Comparing any two charts through this canonical chart proves the smoothness of transition maps in both directions. The chain rule then proves the assertion about testing regularity.

!!! definition "Definition (Fields, forms and differential on a submanifold)"
    <a id="submanifold-fields-forms"></a>

    A tangent field assigns $X(a)\in T_aM$. A $p$-form assigns $\omega_a\in\Lambda^p(T_aM)^*$. Regularity is checked in charts, equivalently by evaluating the form on regular local tangent fields. These forms are modules over the corresponding regular scalar functions. For $f:M\to\mathbb R$ differentiable,

    $$
    df(a)=D(f\psi)(\psi^{-1}a)\,D\psi(\psi^{-1}a)^{-1}.
    $$

    The inverse differential here is the inverse onto $T_aM$. One has $d(fg)=f\,dg+g\,df$ and $X(f)=df(X)$.

??? proof "Proof"
    If $\psi_1=\psi_2\eta$, then $D(f\psi_1)=D(f\psi_2)D\eta$ and $D\psi_1=D\psi_2D\eta$. Cancellation with the inverse gives the same $df$ in both charts. The product rule follows from that of functions on an open vector space. If $X\in C^m$ and $f\in C^{m+1}$, then $X(f)\in C^m$ for $m\le\ell-1$, since in a chart it equals $D(f\psi)(D\psi^{-1}(X\psi))$.

!!! proposition "Proposition (Transport, restriction and exterior calculus on submanifolds)"
    <a id="submanifold-exterior-calculus"></a>

    A chart transports fields by $\psi_*Y(\psi x)=D\psi(x)Y(x)$, with inverse $Y(x)=D\psi(x)^{-1}X(\psi x)$. Forms pull back by evaluation on these transported fields. An ambient form restricts to $M$ by restricting each covector to $T_aM$ and taking exterior powers. On $C^\ell$ submanifolds with $\ell\ge2$, brackets and exterior derivatives are given by the evaluation formulas above, and $d\psi^*\omega=\psi^*d\omega$.

??? proof "Proof"
    The chain rule gives $(\psi_*Y)(f)\circ\psi=Y(f\circ\psi)$. Applying it twice proves bracket compatibility on overlapping charts; thus local brackets agree and glue to a unique field. Use the bracket evaluation formula for $d\omega$ and the same chain rule to verify the pullback identity term by term. It proves that local derivatives agree on overlaps and defines the global derivative. Restrictions are precisely the maps $E^*\to(T_aM)^*$ induced by tangent inclusions; evaluation on tangent vectors verifies the stated interpretation. Field and form regularity transforms with these formulas; for finite $\ell$, transporting $C^m$ fields through a chart is ensured for $m\le\ell-1$, while smooth charts preserve all orders.

## Partition of Unity

!!! theorem "Theorem (Existence of partitions of unity)"
    <a id="thm-dg-5-1"></a>
    <a id="thm-existence-of-partitions-of-unity"></a>

    An open cover $(U_i)$ of a second-countable $C^\ell$ submanifold admits a locally finite $C^\ell$ partition of unity subordinate to it: $0\le\chi_i\le1$, $\operatorname{Supp}(\chi_i)\subseteq U_i$, and $\sum_i\chi_i=1$. One may first use a refined index family with each support compact. After grouping by the original cover indices, individual supports need not be compact.

??? proof "Proof"
    Use the compact-exhaustion annuli construction below to obtain a locally finite family of relatively compact chart neighbourhoods $A_j$, with closures contained in larger chart neighbourhoods $B_j\subseteq U_{\lambda(j)}$, such that the family of these larger neighbourhoods is locally finite. In each chart choose a smooth bump equal to one on $\overline{A_j}$ and supported in $B_j$; extend by zero to obtain a $C^\ell$ function $g_j$ on $M$. The family of supports is locally finite and its positivity sets cover $M$, so $G=\sum_jg_j$ is a positive $C^\ell$ function. Put $\rho_j=g_j/G$. Each has compact support, and their sum is one. If indices of the original cover are required, put $\chi_i=\sum_{\lambda(j)=i}\rho_j$. Local finiteness preserves regularity and makes these supports closed unions of supports lying in $U_i$. The normalization gives the claimed sum.

    The lecture's compact-support assertion for each original index needs this qualification: for the one-set cover of a noncompact manifold, the only partition member is $1$, which has noncompact support. The refined construction above retains the compact support needed in the local integration argument.

!!! definition "Definition (Refinement, local finiteness and paracompactness)"
    <a id="paracompactness"></a>

    A cover refines another if each of its members lies in a member of the other. A family is locally finite if each point has a neighbourhood meeting only finitely many members. A space is paracompact if every open cover has a locally finite open refinement. Second-countable locally compact Hausdorff spaces are paracompact.

??? proof "Proof"
    Let $V_n$ be the relatively compact open exhaustion with $\overline V_n\subseteq V_{n+1}$. Set $K_n=\overline V_n\setminus V_{n-1}$ and $W_n=V_{n+1}\setminus\overline V_{n-2}$, taking negative indices empty. Each $K_n$ is compact and contained in $W_n$. For each point of $K_n$ shrink a neighbourhood to have compact closure in $W_n$ and in one member of the original cover; choose finitely many of these to cover $K_n$. They cover $X$ since the $K_n$ do. A neighbourhood inside some $V_N$ meets none of the chosen sets for $n\ge N+2$; only finitely many earlier sets exist. Thus the refinement, and its family of closures, are locally finite. This is the exhaustion-and-annuli construction used in the lectures.

!!! definition "Definition (Orientation field and oriented charts)"
    <a id="orientation-field"></a>

    An orientation field on a $d$-dimensional submanifold is a continuous $\theta:M\to\Lambda^dE$ with $\theta(a)\in\Lambda^dT_aM\setminus\{0\}$. A manifold is orientable if such a field exists, and oriented when one is chosen. Equivalently it is a nonzero continuous $d$-vector field with $T_aM=\{v:v\wedge\theta(a)=0\}$. In a connected chart the induced orientation of its domain is constant.

??? proof "Proof"
    Extend a basis $e_1,\ldots,e_d$ of $T_aM$ to one of $E$ and expand $\theta$ in increasing basis wedges. The equations $e_i\wedge\theta=0$ require every surviving summand to contain every $e_i$ with $i\le d$, so $\theta$ is a nonzero multiple of their wedge. Conversely a vector wedges to zero with that wedge exactly when it is in their span. This proves the equivalence without separately assuming decomposability. Pulling $\theta$ back through $\Lambda^dD\psi$ gives a continuous nonzero element of the one-dimensional determinant line of the domain. Its two positive-scalar orbits are the two components of the punctured line, so connectedness fixes one orbit throughout the chart.

!!! definition "Definition (Integration on an oriented submanifold)"
    <a id="integration-oriented-submanifold"></a>

    If a continuous compactly supported top form is supported in one connected chart, integrate its pullback using the induced orientation on the chart domain. In general choose an oriented chart cover and subordinate partition of unity $(\chi_i)$ and define $\int_M\omega=\sum_i\int_M\chi_i\omega$. Compact support and local finiteness make this a finite sum.

??? proof "Proof"
    Two consistently oriented charts have positive transition determinants relative to their induced orientations. The change-of-variables formula therefore gives the same integral on their overlap. With another partition $(\rho_j)$, insert $\sum_j\rho_j=1$ to get $\sum_i\int\chi_i\omega=\sum_{i,j}\int\chi_i\rho_j\omega=\sum_j\int\rho_j\omega$. All terms can be computed in either overlap chart; only finitely many meet the support. This proves independence from both charts and partitions.

## Stokes Formula

!!! definition "Definition (Half-space differentiability and intrinsic boundary)"
    <a id="half-space-boundary"></a>

    For an open subset $W$ of $\mathbb R_{\le0}\times F$, its boundary part is $W\cap(\{0\}\times F)$. A map on $W$ is $C^\ell$ if it extends locally to a $C^\ell$ map on an open subset of $\mathbb R\times F$; its differential is that of an extension. A half-space diffeomorphism extends locally to an ambient diffeomorphism. A $d$-dimensional submanifold with boundary has local homeomorphic immersion parametrizations by such half-spaces with $\dim F=d-1$. Its boundary is the image of their boundary parts; $T_aM$ is the full image of $D\psi$ even at a boundary point.

??? proof "Proof"
    One-sided derivatives of an extension in directions of $\mathbb R_{\le0}\times F$ are determined by the original map. Those directions span $\mathbb R\times F$, so the whole linear differential is independent of the extension. At an interior point every vector is the derivative of a small two-sided straight-line curve. At a boundary point, the first coordinate of a two-sided curve has a local maximum zero, so its derivative has first coordinate zero. This curve criterion characterizes interior points; diffeomorphisms and their inverses preserve it, hence preserve boundary parts. Transition maps therefore preserve the parametrized boundary, making the definition intrinsic. The chain rule expresses different chart differentials as composites with invertible transition differentials, proving independence of $T_aM$. Restricting a boundary chart to $\{0\}\times F$ gives a chart of $\partial M$, a $(d-1)$-dimensional submanifold without boundary. For dimension zero one uses discrete points with empty boundary.

!!! definition "Definition (Boundary orientation and calculus)"
    <a id="boundary-orientation-calculus"></a>

    In the half-space $t\le0$, $+\partial_t$ is outward. If $\xi=\partial_t\wedge\eta$ represents the orientation of $\mathbb R\times F$, then $\eta$ represents the induced orientation on the boundary. On an oriented submanifold with boundary this gives the outward-first boundary orientation. Fields and forms, their regularity and their differential are defined through extending half-space charts. Restriction of a form to the boundary is induced by $T_a\partial M\hookrightarrow T_aM$ and its dual quotient.

??? proof "Proof"
    Positive rescaling of $\xi$ positively rescales $\eta$, so the induced orientation depends only on the orientation orbit. A transition preserving the half-space has positive derivative on its one-dimensional normal quotient: it sends interior points to interior points and is invertible. The sign of its full determinant therefore agrees with the sign of its tangential determinant. Consequently consistently oriented charts induce consistently oriented boundary charts. The tangent inclusion induces the stated quotient map of covectors and exterior powers; the chain rule makes field transport and form pullback independent of charts just as in the boundary-free case.

!!! theorem "Theorem (Stokes formula)"
    <a id="thm-dg-6-1"></a>
    <a id="thm-stokes-formula"></a>

    Let $M$ be an oriented submanifold with boundary and let $\omega$ be a compactly supported $C^1$ $(d-1)$-form. In the lecture's differentiable-chart setting,

    $$
    \int_Md\omega=\int_{\partial M}\omega|_{\partial M}.
    $$

    Compactness of $M$ is unnecessary. The intrinsic exterior-calculus construction given above directly applies with $C^2$ charts (in particular smooth charts); in the $C^1$ embedded version, the formula is read for forms with the required differentiable local pullbacks.

??? proof "Proof"
    A subordinate partition gives $\omega=\sum_i\chi_i\omega$ with only finitely many nonzero pieces on its compact support. By linearity and $\sum_i d\chi_i=0$, it suffices to prove the formula for one piece supported in one chart. Pull back to an open half-space chart, use compact support to extend by zero away from the chart, and choose oriented coordinates $x_1,\ldots,x_d$ with the half-space $x_1\le0$. Write

    $$
    \omega=\sum_{i=1}^d f_i\,dx_1\wedge\cdots\wedge\widehat{dx_i}\wedge\cdots\wedge dx_d,
    \qquad
    d\omega=\sum_{i=1}^d(-1)^{i-1}\partial_i f_i\,dx_1\wedge\cdots\wedge dx_d.
    $$

    In an interior chart every derivative integrates to zero by the fundamental theorem and compact support; Fubini gives $\int d\omega=0$, matching the empty boundary. In a boundary chart the terms $i\ge2$ still integrate to zero. The remaining term has coefficient sign positive and

    $$
    \int_{\mathbb R_{\le0}\times\mathbb R^{d-1}}\partial_1f_1\,dx
    =\int_{\mathbb R^{d-1}}f_1(0,x_2,\ldots,x_d)\,dx_2\cdots dx_d.
    $$

    On the boundary every summand containing $dx_1$ restricts to zero; the remaining form is $f_1\,dx_2\wedge\cdots\wedge dx_d$, with exactly the outward-first orientation. This proves the model equality and hence the global one.

!!! corollary "Corollary (Classical versions)"
    <a id="cor-dg-6-2"></a>

    <a id="cor-classical-versions"></a>

    1. **Fundamental theorem of calculus** ($M = [a, b] \subseteq \mathbb{R}$): $\int_a^b f'(x)\, dx = f(b) - f(a)$.

    2. **Green's theorem** ($M \subseteq \mathbb{R}^2$ with $\partial M$
       a positively oriented simple closed curve):
       $\int_M (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial M} P\, dx + Q\, dy$.

    3. **Classical Stokes** (a surface $M$ with boundary $\partial M$ in
       $\mathbb{R}^3$): $\int_M (\nabla \times F) \cdot dS = \oint_{\partial M} F \cdot dr$.

    4. **Divergence theorem** (a compact region $M$ in $\mathbb{R}^3$):
       $\int_M \nabla \cdot F\, dV = \oint_{\partial M} F \cdot n\, dS$.

??? proof "Proof"
    1. Apply Stokes to the $0$-form $f$ on $[a, b]$: $d f = f'(x) dx$ is
       a $1$-form, so $\int_{[a, b]} d f = \int_{\partial [a, b]} f$.
       The boundary $\partial [a, b] = \{b\} - \{a\}$ (with the
       induced orientation) gives $f(b) - f(a)$.

    2. Apply to the $1$-form $\omega = P\, dx + Q\, dy$. Then
       $d\omega = (\partial_x Q - \partial_y P) dx \wedge dy$ and
       $\int_{\partial M} P\, dx + Q\, dy = \int_M d\omega = \int_M (\partial_x Q - \partial_y P)\, dx\, dy$.

    3. For a vector field $F = (P, Q, R)$, the $1$-form
       $\omega = P\, dx + Q\, dy + R\, dz$ has
       $d\omega = (\partial_y R - \partial_z Q)\, dy \wedge dz + (\partial_z P - \partial_x R)\, dz \wedge dx + (\partial_x Q - \partial_y P)\, dx \wedge dy$, which is the
       component of $\nabla \times F$ normal to the surface (via the
       standard identification $\mathbb{R}^3 \cong \Lambda^2(\mathbb{R}^3)$).
       Stokes gives $\int_M d\omega = \int_{\partial M} \omega$.

    4. For the divergence theorem, apply Stokes to the $2$-form
       $\omega = P\, dy \wedge dz + Q\, dz \wedge dx + R\, dx \wedge dy$
       (the flux form): $d\omega = (\partial_x P + \partial_y Q + \partial_z R)\, dx \wedge dy \wedge dz = (\nabla \cdot F) dV$. Stokes gives $\int_M \nabla \cdot F\, dV = \int_{\partial M} \omega = \oint_{\partial M} F \cdot n\, dS$.

!!! example "Example (Poincare lemma and radial homotopy)"
    <a id="ex-dg-6-3"></a>
    <a id="ex-poincare-lemma-and-radial-homotopy"></a>

    On an open set star-shaped about zero, every closed smooth $k$-form with $k\ge1$ is exact. Define

    $$
    (H\omega)_x(v_1,\ldots,v_{k-1})=
    \int_0^1t^{k-1}\omega_{tx}(x,v_1,\ldots,v_{k-1})\,dt.
    $$

    Then $dH+Hd=\mathrm{Id}$ in positive degrees, so $\omega=dH\omega$ when $d\omega=0$.

??? proof "Proof"
    Pull a form back by the map $F(t,x)=tx$ on $[0,1]\times U$ and separate it into $dt\wedge\alpha_t+\beta_t$. The coefficient of $dt$ in $dF^*\omega$ is $\partial_t\beta_t-d_x\alpha_t$, while the tangential part is $d_x\beta_t$. Integrating the first relation gives $Hd\omega=F_1^*\omega-F_0^*\omega-dH\omega$. In positive degree the pullback by the constant map $F_0$ is zero, and $F_1$ is the identity. Direct evaluation of $\alpha_t$ gives the displayed $t^{k-1}$ formula. For a set star-shaped about another point translate the construction. In particular positive-degree de Rham cohomology of $\mathbb R^n$ vanishes.

!!! example "Example (A parametrized curve)"
    <a id="ex-a-parametrized-curve"></a>

    For an oriented curve $\psi:[a,b]\to\mathbb R^3$ and a differentiable scalar $f$,

    $$
    \int_Mdf=\int_a^bdf_{\psi(t)}(\psi'(t))\,dt
    =\int_a^b\frac{d}{dt}f(\psi(t))\,dt
    =f(\psi(b))-f(\psi(a)).
    $$

    The pullback of $df=\sum_i\partial_i f\,dx_i$ is $\sum_i\partial_i f(\psi(t))\psi_i'(t)\,dt$, and the boundary consists of the terminal point with positive sign and the initial point with negative sign.
