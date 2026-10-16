# Fourier Series

This chapter develops the analytic side of Fourier analysis on the torus and
the real line. It begins with the **Jensen** and **Hölder** inequalities for
convex functions and $L^p$ norms, gives the Haar measure on the torus and
the convolution product, and then proves the **Fourier series expansion**
of $L^2$ functions together with **Plancherel** and **convergence
theorems**. The final section extends to the **Fourier transform** on
$\mathbb{R}$.

## Jensen Inequality

!!! definition "Definition (Convex, concave functions)"
    <a id="def-fs-1-1"></a>
    <a id="def-convex-concave-functions"></a>

    A subset $S \subseteq E$ of a real vector space is **convex** if it
    contains every convex combination of its elements. A function
    $f : U \to \mathbb{R}$ on a convex $U$ is **convex** if its
    epigraph $\Gamma_+(f) = \{(x, t) : f(x) \leq t\}$ is convex, and
    **concave** if $-f$ is convex. Equivalently,
    $f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$
    for $\lambda \in [0, 1]$.

!!! theorem "Theorem (Jensen)"
    <a id="thm-fs-1-2"></a>
    <a id="thm-jensen"></a>

    Let $f : U \to \mathbb{R}$ be a convex function on a convex $U$ and
    $\mu$ a probability measure on $U$ with finite support
    $\{x_1, \ldots, x_n\}$. Then

    $$
    f\!\left( \sum_{i=1}^{n} \mu(x_i) x_i \right) \leq \sum_{i=1}^{n}
    \mu(x_i)\, f(x_i).
    $$

??? proof "Proof"
    We may assume $f(x_i)$ is finite for all $i$ (otherwise the RHS is
    $+\infty$ and the inequality is trivial). By induction on $n$. For
    $n = 1$, the inequality is $f(x_1) \leq f(x_1)$. For $n = 2$ it is
    the defining two-point inequality. Assume it holds for $n - 1$
    points. For the $n$-point case, set
    $s = \mu(x_1) + \cdots + \mu(x_{n-1})$ and $t = \mu(x_n)$. If $s = 0$
    the inequality reduces to $n = 1$; otherwise the point
    $y = s^{-1} \sum_{i=1}^{n-1} \mu(x_i) x_i \in U$ (convexity) satisfies
    $f(y) \leq s^{-1} \sum_{i=1}^{n-1} \mu(x_i) f(x_i)$ by the induction
    hypothesis. Now $\sum_{i=1}^{n} \mu(x_i) x_i = s y + t x_n$ with
    $s + t = 1$ and $s, t \in [0, 1]$, so the two-point inequality gives
    $f(s y + t x_n) \leq s f(y) + t f(x_n) \leq \sum_{i=1}^{n-1} \mu(x_i) f(x_i) + \mu(x_n) f(x_n)$.

!!! proposition "Proposition (Convexity from supremum of affine functions)"
    <a id="prop-fs-1-3"></a>
    <a id="prop-convexity-from-supremum-of-affine-functions"></a>

    If $(f_i)_{i \in I}$ is a family of convex functions on $U$ and
    $f(x) := \sup_i f_i(x)$ is finite-valued, then $f$ is convex.
    In particular, the pointwise supremum of affine functions is convex.

!!! proposition "Proposition (Twice-differentiable convexity)"
    <a id="prop-fs-1-4"></a>
    <a id="prop-twice-differentiable-convexity"></a>

    Let $U$ be convex open and $f : U \to \mathbb{R}$ twice
    differentiable. $f$ is convex iff $D^2 f(x)$ is positive semidefinite for
    every $x \in U$. In that case $f(x) \geq f(a) + Df(a)(x - a)$ for
    all $a, x \in U$, and $f = \sup_{a \in U} (f(a) + Df(a)(\cdot - a))$.

??? proof "Proof"
    **$(\Leftarrow)$** Fix $a, x \in U$ and set $g(t) = f(a + t(x - a))$
    for $t \in [0, 1]$. Then $g$ is twice differentiable with
    $g'(t) = Df(a + t(x - a))(x - a)$ and
    $g''(t) = D^2 f(a + t(x - a))(x - a, x - a) \geq 0$ (by
    semidefiniteness). By Taylor-Lagrange ([Theorem](differential-calculus.md#thm-taylor-lagrange-with-remainder) applied to the
    twice-differentiable scalar function $g$), there is $\theta \in (0, 1)$ with
    $g(1) = g(0) + g'(0) + \tfrac{1}{2} g''(\theta)$. Hence
    $f(x) = f(a) + Df(a)(x - a) + \tfrac{1}{2} g''(\theta) \geq f(a) + Df(a)(x - a)$. So each affine function
    $a \mapsto f(a) + Df(a)(x - a)$ is a lower bound for $f$.
    Therefore $f$ is the pointwise supremum of the affine functions
    that minorize it ([Proposition](#prop-convexity-from-supremum-of-affine-functions)), and the pointwise supremum of a
    family of convex (affine) functions is convex ([Proposition](#prop-convexity-from-supremum-of-affine-functions)).
    **$(\Rightarrow)$** For fixed $a,v$, convexity gives $f(a+tv)+f(a-tv)-2f(a)\ge0$ for small real $t$. Divide by $t^2$ and use the second-order expansions at $a$; the linear terms cancel and the limit is $D^2f(a)(v,v)\ge0$. This proves positive semidefiniteness. Negating $f$ gives the corresponding concavity assertion.

!!! definition "Definition (Convex hull and affine functions)"
    <a id="convex-hull-affine-functions"></a>

    A convex combination is $\sum_i\lambda_ix_i$ with $\lambda_i\ge0$ and $\sum_i\lambda_i=1$. Their set is $\operatorname{conv}(S)$, the convex hull. A set is convex exactly when it contains every segment between two of its points. The hypograph $\{(x,t):t\le f(x)\}$ characterizes concavity. An affine function is $f(x)=\phi(x)+C$ with $\phi$ linear; it is both convex and concave.

??? proof "Proof"
    Segment closure implies closure under all convex combinations by induction: split off the last weight, normalize the other weights if their sum is positive, and apply the induction hypothesis followed by the segment property. If that sum is zero only the last point remains. For affine functions direct linear expansion gives equality in the two-point convexity inequality. The exponential is convex because its second derivative is itself and is positive.

??? proof "Proof"
    Jensen's three equivalent forms are convexity of the epigraph, the inequality for all finite convex combinations, and the two-point inequality. For epigraph points $(x_i,t_i)$ with $t_i\ge f(x_i)$, Jensen puts $(\sum\lambda_ix_i,\sum\lambda_it_i)$ in the epigraph. Conversely apply epigraph convexity to $(x_i,f(x_i))$. The segment criterion on the epigraph equates this with the two-point condition. This supplies the lecture's epigraph proof alongside the induction proof above. For the supremum proposition, $f_i(tx+(1-t)y)\le tf_i(x)+(1-t)f_i(y)\le tf(x)+(1-t)f(y)$ for every $i$; taking the supremum proves convexity.

## Hölder Inequality and Lp Spaces

!!! definition "Definition ($L^p$ norm, $L^\infty$ norm)"
    <a id="def-fs-2-1"></a>
    <a id="def-norm-norm"></a>

    For a measure space $(\Omega, \mathcal{A}, \nu)$ and $1 \leq p < \infty$,
    the $L^p$-norm is
    $\|f\|_{L^p} = \bigl( \int_\Omega |f|^p\, d\nu \bigr)^{1/p}$.
    The $L^\infty$-norm is
    $\|f\|_{L^\infty} = \inf\{\sup_{\omega \notin A} |f(\omega)| : \nu(A) = 0\}$.
    $L^p$ and $L^\infty$ are seminormed spaces modulo the negligible
    functions.

!!! theorem "Theorem (Holder inequality)"
    <a id="holder-inequality"></a>

    If $1\le p_i\le\infty$ and $\sum_i1/p_i=1$, then $\|\prod_i f_i\|_1\le\prod_i\|f_i\|_{p_i}$ whenever the right-hand product is defined.

??? proof "Proof"
    A zero norm means a zero factor almost everywhere, so gives zero on the left whenever the product is defined. An infinite norm makes the inequality immediate. Normalize the remaining finite positive norms to one. For finite exponents, Jensen for the exponential gives, for positive numbers $x_i$,

    $$
    \prod_i x_i=\exp\left(\sum_i\frac{\log(x_i^{p_i})}{p_i}\right)
    \le\sum_i\frac{x_i^{p_i}}{p_i}.
    $$

    Continuity extends this to zero inputs. Substitute the normalized $|f_i|$ and integrate; the right side is $\sum_i1/p_i=1$. If an exponent is infinity, remove its factor using the almost-everywhere essential bound and induct on the number of factors; the remaining reciprocal exponents still sum to one. The case of a single factor has exponent one and is equality.

!!! corollary "Corollary (Minkowski)"
    <a id="cor-fs-2-3"></a>
    <a id="cor-minkowski"></a>

    $\|f + g\|_{L^p} \leq \|f\|_{L^p} + \|g\|_{L^p}$. The space $L^p$ is
    a normed vector space (modulo null functions) for every
    $p \in [1, \infty]$.

??? proof "Proof"
    For $p=1$ integrate $|f+g|\le|f|+|g|$; for infinity use the essential bounds on a common full-measure set. For $1<p<\infty$, first $|f+g|^p\le2^{p-1}(|f|^p+|g|^p)$ proves integrability. Holder applied to $|f|\,|f+g|^{p-1}$ and $|g|\,|f+g|^{p-1}$ then yields $\|f+g\|_p^p\le(\|f\|_p+\|g\|_p)\|f+g\|_p^{p-1}$. Divide if the final norm is nonzero; otherwise the inequality is immediate.

!!! theorem "Theorem (Completeness of $L^p$)"
    <a id="thm-fs-2-4"></a>
    <a id="thm-completeness-of"></a>

    $L^p(\Omega, \mathcal{A}, \nu)$ is a Banach space for
    $p \in [1, \infty]$.

??? proof "Proof"
    Let $(f_n)$ be a Cauchy sequence in $L^p$. Extract a subsequence
    $(f_{n_k})$ inductively: pick $n_{k+1}$ such that
    $\|f_{n_{k+1}} - f_{n_k}\|_{L^p} \leq 2^{-(k+1)}$ (possible since
    $(f_n)$ is Cauchy). Then $\sum_k \|f_{n_{k+1}} - f_{n_k}\|_{L^p} < \infty$. By [Lemma](#lp-summable-series), there is $A \in \mathcal{A}$ with
    $\nu(A) = 0$ such that $f_{n_k}(\omega)$ converges absolutely for
    all $\omega \notin A$. Set $f(\omega)$ to be the limit for
    $\omega \notin A$ and $f(\omega) = 0$ for $\omega \in A$. Then
    $|f| \leq \sum_k |f_{n_{k+1}} - f_{n_k}| + |f_{n_0}|$ (a.s.), so
    $f \in L^p$ (the dominating series is in $L^p$). For the
    convergence: for $m > n$ large,
    $\|f - f_{n_m}\|_{L^p} \leq \lim_k \sum_{j \geq m} \|f_{n_{j+1}} - f_{n_j}\|_{L^p} \leq \lim_k \sum_{j \geq m} 2^{-j} = 2^{1 - m} \to 0$
    as $m \to \infty$. So $f$ is the limit of the subsequence in
    $L^p$, hence also of the original Cauchy sequence.

!!! proposition "Proposition (Null functions, essential bound and finite-measure inclusion)"
    <a id="lp-null-essential-bound"></a>

    Write $\mathcal L^p$ for actual measurable functions and $L^p$ for their quotient by almost-everywhere equality. The displayed expressions are seminorms on the former and norms on the latter. The null space consists of functions vanishing almost everywhere. Also $|f|\le\|f\|_\infty$ almost everywhere. If $\nu(\Omega)<\infty$ and $1\le p<q\le\infty$,

    $$
    L^q\subseteq L^p,\qquad
    \|f\|_p\le\nu(\Omega)^{1/p-1/q}\|f\|_q.
    $$

??? proof "Proof"
    If the $p$-th power integral is zero, every level set $\{|f|>1/n\}$ is null, hence their countable union is null. The converse follows by integration. For the essential supremum choose null exceptional sets for bounds $\|f\|_\infty+1/n$ and take their countable union; outside it the sharp bound holds. Intersect the full-measure sets for two such bounds to prove the triangle inequality for $p=\infty$, and use Minkowski for finite $p$. Apply Holder to $|f|^p$ and $1$ with exponents $q/p$ and $q/(q-p)$ to get the finite-measure inclusion; take $p$-th roots. For $q=\infty$ integrate its almost-everywhere bound. If the measure is zero all norms are zero and the inclusion is immediate.

!!! lemma "Lemma (Absolutely summable series in Lp)"
    <a id="lp-summable-series"></a>

    If $\sum_n\|u_n\|_p=C<\infty$, their pointwise series is absolutely convergent off a null set, and its sum (set to zero on that set) belongs to $\mathcal L^p$. Its partial sums converge in the $L^p$ seminorm, with tail bound $\|\sum_{k>n}u_k\|_p\le\sum_{k>n}\|u_k\|_p$.

??? proof "Proof"
    Let $v_n=\sum_{k\le n}|u_k|$ and $v=\lim v_n$. Minkowski gives $\|v_n\|_p\le C$. For finite $p$, monotone convergence gives $\int v^p\le C^p$, so $v$ is finite off a null set. For $p=\infty$, outside the countable union of exceptional sets for the bounds $|u_k|\le\|u_k\|_\infty$, every partial sum and $v$ are bounded by $C$. Thus absolute convergence holds there and $|u|\le v$ gives the norm bound. Apply the same argument to each tail to obtain its bound and convergence. A convergent $L^p$ sequence has an almost-everywhere convergent subsequence by extracting one with summable norm differences. For $p=2$, Holder makes $\langle f,g\rangle=\int\overline f g\,d\nu$ well-defined; positivity and completeness make $L^2$ a Hilbert space.

## Haar Measure on the Torus

!!! definition "Definition (Torus as a quotient)"
    <a id="def-fs-3-1"></a>
    <a id="def-torus-as-a-quotient"></a>

    The **$n$-torus** is $\mathbb{T}^n = \mathbb{R}^n / \mathbb{Z}^n$ with
    the quotient topology. The Haar measure on the additive group
    $\mathbb{T}^n$ is the unique left-invariant Radon measure
    $\mu_{\mathbb{T}^n}$ with $\mu_{\mathbb{T}^n}(\mathbb{T}^n) = 1$; it
    pushes forward Lebesgue measure from $[0, 1)^n$ via the quotient
    map.

!!! definition "Definition (Characters)"
    <a id="def-fs-3-2"></a>
    <a id="def-characters"></a>

    A **character** of the torus $\mathbb{T}^n$ is a continuous group
    homomorphism $\chi : \mathbb{T}^n \to S^1$. Writing
    $e_n : \mathbb{T} \to S^1$, $t \mapsto e^{2\pi i n t}$ for
    $n \in \mathbb{Z}$, the characters are exactly
    $\chi_k(t) = e^{2\pi i \langle k, t \rangle}$ for $k \in \mathbb{Z}^n$.

!!! theorem "Theorem (Orthonormality of characters)"
    <a id="thm-fs-3-3"></a>
    <a id="thm-orthonormality-of-characters"></a>

    $\{\chi_k\}_{k \in \mathbb{Z}^n}$ is an orthonormal family in
    $L^2(\mathbb{T}^n, \mu_{\mathbb{T}^n})$:
    $\int_{\mathbb{T}^n} \chi_k \overline{\chi_\ell}\, d\mu = \delta_{k, \ell}$.

??? proof "Proof"
    Compute (using Fubini):
    $\int_{\mathbb{T}^n} \chi_k \overline{\chi_\ell}\, d\mu = \int_{[0, 1)^n} e^{2\pi i \langle k - \ell, t \rangle}\, dt = \prod_{j=1}^{n} \int_0^1 e^{2\pi i (k_j - \ell_j) t_j}\, dt_j$.
    Each factor is $1$ if $k_j = \ell_j$ and $0$ otherwise (the
    integral of $e^{2\pi i m t}$ over a period is $0$ for $m \in \mathbb{Z} \setminus \{0\}$). So the product is $1$ when
    $k = \ell$ and $0$ otherwise.

!!! proposition "Proposition (Hilbert basis criterion)"
    <a id="hilbert-basis-criterion"></a>

    An orthogonal family is a Hilbert basis when its linear span is dense, equivalently when its orthogonal complement is zero.

??? proof "Proof"
    Let $W$ be the closure of the span. Its orthogonal complement is the family's orthogonal complement. If $W=V$ this is zero. Conversely projection onto the closed subspace $W$ gives $x-P_Wx\in W^\perp$ for every $x$; if this is zero then $x\in W$, proving density.

!!! proposition "Proposition (General lattice torus and its measurable fundamental domain)"
    <a id="lattice-torus-fundamental-domain"></a>

    Let $(e_i)$ be a basis of a real space $E$, $M=\bigoplus_i\mathbb Ze_i$, $N=\bigoplus_i\mathbb Ze_i^\vee$, and $D=\{\sum_i t_ie_i:0\le t_i<1\}$. The restriction of $\pi:E\to T_M=E/M$ to $D$ is a measurable isomorphism, and normalized Haar measure satisfies

    $$
    \int_{T_M}h\,d\eta=\frac1{\operatorname{vol}(D)}\int_Dh(\pi x)\,d\operatorname{vol}(x).
    $$

    The characters $\phi_\alpha(\pi x)=e^{2\pi i\alpha(x)}$ are well-defined, obey $\phi_{\alpha+\beta}=\phi_\alpha\phi_\beta$, and are orthonormal for the normalized inner product $\operatorname{vol}(D)^{-1}\int_D\overline f g$.

??? proof "Proof"
    Subtracting the integer parts of the coordinates gives one representative in $D$, proving bijectivity. It is measurable as a restriction of a continuous map. For its inverse, a relatively open coordinate subset of $[0,1)$ splits into its part in $(0,1)$, whose image in $\mathbb R/\mathbb Z$ is open, and its possible point zero, whose image is closed. Thus basic coordinate rectangles have Borel images. A countable basis then proves measurability of the inverse.

    Define the measure by the stated pushforward. For a Borel set $A$, write $B=\pi^{-1}(A)\cap D$. Translating $B$ by a representative $x$ of $t\in T_M$ and cutting it into its intersections with the disjoint translates $m+D$ gives the representative of $A+t$ after translating each piece back by $-m$. Countable additivity and translation invariance yield $\operatorname{vol}(\pi^{-1}(A+t)\cap D)=\sum_m\operatorname{vol}((B+x)\cap(m+D))=\operatorname{vol}(B)$. Normalization and Haar uniqueness prove the integral formula. The lattice is closed and $T_M$ is compact, being the image of the closed unit parallelotope; it is second-countable and Hausdorff by the quotient results. Since $\alpha(M)\subseteq\mathbb Z$, the characters descend. Fubini computes their pairings as products of $\int_0^1e^{2\pi i k_it}\,dt$, one if every $k_i=0$ and zero otherwise.

## Convolution

!!! definition "Definition (Convolution)"
    <a id="def-fs-4-1"></a>
    <a id="def-convolution"></a>

    For $f, g \in L^1(\mathbb{T}^n)$ the **convolution** is

    $$
    (f \ast g)(x) = \int_{\mathbb{T}^n} f(x - y) g(y)\, d\mu_{\mathbb{T}^n}(y).
    $$

    It satisfies $\|f \ast g\|_{L^1} \leq \|f\|_{L^1} \|g\|_{L^1}$, so
    $L^1(\mathbb{T}^n)$ is a Banach algebra under convolution.

!!! theorem "Theorem (Convolution of $L^2$ and $L^1$)"
    <a id="thm-fs-4-2"></a>
    <a id="thm-convolution-of-and"></a>

    For $f \in L^1(\mathbb{T}^n)$ and $g \in L^2(\mathbb{T}^n)$, the
    convolution $f \ast g \in L^2(\mathbb{T}^n)$ with
    $\|f \ast g\|_{L^2} \leq \|f\|_{L^1} \|g\|_{L^2}$.

??? proof "Proof"
    By Cauchy–Schwarz in the inner integral,
    $|(f \ast g)(x)|^2 = |\int f(x - y) g(y)\, d\mu(y)|^2 \leq (\int |f(x - y)|\, d\mu(y)) \cdot (\int |f(x - y)| |g(y)|^2\, d\mu(y)) = \|f\|_{L^1} \cdot (|f| \ast |g|^2)(x)$.
    Integrate over $x$ and use Fubini (the integrand is in $L^1$):
    $\|f \ast g\|_{L^2}^2 \leq \|f\|_{L^1} \int (|f| \ast |g|^2)(x)\, dx = \|f\|_{L^1} \cdot \|f\|_{L^1} \cdot \|g\|_{L^2}^2 = \|f\|_{L^1}^2 \|g\|_{L^2}^2$. Take the square root.

!!! definition "Definition (Convolution on a group)"
    <a id="convolution-general-group"></a>

    Let $G$ be a sigma-compact locally compact Hausdorff group with a sigma-finite left and right invariant Haar measure. In additive notation, inversion preserves this measure. Define $(f*g)(x)=\int_G f(y)g(-y+x)\,d\eta(y)$ whenever this integral is absolutely convergent. Functions are convolvable when the exceptional set is null; assign value zero there. Substitution by inversion and translations gives the alternative expressions $\int f(-y)g(y+x)\,d\eta(y)$ and $\int f(x-y)g(y)\,d\eta(y)$. On an abelian group convolution is commutative.

!!! theorem "Theorem (Young's convolution inequality)"
    <a id="young-convolution-inequality"></a>

    If $1\le p,q,r\le\infty$ and $1/p+1/q=1+1/r$, then $f\in L^p$, $g\in L^q$ are convolvable and $\|f*g\|_r\le\|f\|_p\|g\|_q$.

??? proof "Proof"
    For $r=\infty$, Holder applied to $|f(y)g(-y+x)|$, together with inversion and translation invariance, bounds its integral by $\|f\|_p\|g\|_q$ for each $x$; the endpoints use the essential bound. For $p=q=r=1$, Tonelli makes its double integral $\|f\|_1\|g\|_1$, proving almost-everywhere integrability and the $L^1$ estimate.

    For $1<r<\infty$ and $p,q>1$, let $a=p/(p-1)$, $b=q/(q-1)$. Then $1/a+1/b+1/r=1$ and $p/b+p/r=q/a+q/r=1$. Factor the integrand into $|f|^{p/b}|g_x|^{q/a}(|f|^p|g_x|^q)^{1/r}$, where $g_x(y)=g(-y+x)$, and apply three-factor Holder:

    $$
    \left(\int|fg_x|\,d\eta\right)^r
    \le\|f\|_p^{pr/b}\|g\|_q^{qr/a}\int|f(y)|^p|g(-y+x)|^q\,d\eta(y).
    $$

    Integrating in $x$ and using Tonelli gives the bound $\|f\|_p^{pr/b+p}\|g\|_q^{qr/a+q}=\|f\|_p^r\|g\|_q^r$. Finiteness proves convolvability. If $p=1,q=r$, weighted Holder gives $(\int|fg_x|)^r\le\|f\|_1^{r-1}\int|f||g_x|^r$; integrate to get the same conclusion. If $q=1,p=r$, factor instead with weight $|g_x|$ and integrate, giving $\|g\|_1^{r-1}\int|f|^r|g_x|$. These are all endpoint cases. Zero-norm functions give a zero convolution class.

## Fourier Series

!!! definition "Definition (Fourier coefficients, partial sums)"
    <a id="def-fs-5-1"></a>
    <a id="def-fourier-coefficients-partial-sums"></a>

    For $f \in L^1(\mathbb{T}^n)$, the **$k$-th Fourier coefficient** is
    $\hat f(k) = \int_{\mathbb{T}^n} f(x)\, \overline{\chi_k(x)}\, d\mu_{\mathbb{T}^n}(x)$. The **$N$-th partial sum** of the
    Fourier series is
    $S_N f(x) = \sum_{\|k\|_\infty \leq N} \hat f(k) \chi_k(x)$.

!!! theorem "Theorem (Riemann–Lebesgue)"
    <a id="thm-fs-5-2"></a>
    <a id="thm-riemannlebesgue"></a>

    For $f \in L^1(\mathbb{T}^n)$, $\hat f(k) \to 0$ as $|k| \to \infty$.

??? proof "Proof"
    Approximate $f$ by smooth periodic functions in $L^1$: given
    $\varepsilon > 0$, choose $g$ smooth with $\|f - g\|_{L^1} < \varepsilon$.
    Then $|\hat f(k) - \hat g(k)| \leq \|f - g\|_{L^1} < \varepsilon$ for
    every $k$. It suffices to show $\hat g(k) \to 0$. For $g$ smooth,
    integrate by parts: $\hat g(k) = (2\pi i k_1)^{-1} \widehat{\partial_{x_1} g}(k)$ when $k_1 \neq 0$. So
    $|\hat g(k)| \leq (2\pi |k_1|)^{-1} \|\partial_{x_1} g\|_{L^1}$. The
    same applies in any direction, so
    $|\hat g(k)| = O(|k|^{-1}) \to 0$.

!!! theorem "Theorem (Plancherel)"
    <a id="thm-fs-5-3"></a>
    <a id="thm-plancherel"></a>

    For $f \in L^2(\mathbb{T}^n)$, $\sum_{k \in \mathbb{Z}^n} |\hat f(k)|^2 = \|f\|_{L^2}^2$ (Parseval) and $S_N f \to f$ in
    $L^2(\mathbb{T}^n)$.

??? proof "Proof"
    The characters are orthonormal, so $S_nf$ is the orthogonal projection onto $V_n$, their span for $\|k\|_\infty\le n$. For continuous $g$, the Fejer polynomial $\sigma_ng$ belongs to $V_n$. Best approximation gives $\|g-S_ng\|_2\le\|g-\sigma_ng\|_2\le\|g-\sigma_ng\|_\infty\to0$. For general $f\in L^2$, choose continuous $g$ with $\|f-g\|_2<\epsilon$ by Radon density. Projection is contractive, so $\|f-S_nf\|_2\le2\epsilon+\|g-S_ng\|_2$. Take a limsup and let $\epsilon\downarrow0$. Finally orthonormality gives $\|S_nf\|_2^2=\sum_{\|k\|_\infty\le n}|\hat f(k)|^2$; norm convergence proves Parseval. This also proves that the character family is a Hilbert basis, rather than assuming density of trigonometric polynomials.

!!! proposition "Proposition (Convergence for C1 periodic functions in one dimension)"
    <a id="prop-fs-5-4"></a>
    <a id="prop-convergence-for-c1-periodic-functions-in-one-dimension"></a>

    A $C^1$ periodic function on the circle has an absolutely and uniformly convergent Fourier series, with sum $f$. In higher dimensions, $C^1$ alone does not imply absolute convergence; the quadrant Dirichlet condition or higher regularity supplies appropriate convergence hypotheses.

??? proof "Proof"
    Integration by parts gives $\hat f(k)=(2\pi ik)^{-1}\widehat{f'}(k)$ for $k\ne0$. Bessel's inequality for $f'$ and Cauchy–Schwarz on the integer index set give $\sum_{k\ne0}|\hat f(k)|\le(2\pi)^{-1}(\sum_{k\ne0}k^{-2})^{1/2}(\sum_k|\widehat{f'}(k)|^2)^{1/2}<\infty$. The uniform sum equals $f$ because the same partial sums converge to $f$ in $L^2$ and both functions are continuous. This fixes the dimension-sensitive summability step.

!!! proposition "Proposition (Convolution coefficients and Dirichlet kernels)"
    <a id="fourier-convolution-dirichlet"></a>

    Use the coordinate sup norm $\|\alpha\|_\infty$ on $N$, write $c_\alpha(f)=\int\overline{\phi_\alpha}f\,d\eta$, and define

    $$
    \delta_n=\sum_{\|\alpha\|_\infty\le n}\phi_\alpha,\qquad
    S_nf=\delta_n*f,\qquad
    c_\alpha(f*g)=c_\alpha(f)c_\alpha(g).
    $$

    If $x=\sum_jt_je_j$ and $\phi_j=\phi_{e_j^\vee}$, then $\delta_n=\prod_j\delta_{n,j}$, where

    $$
    \delta_{n,j}(x)=\sum_{k=-n}^n\phi_j(x)^k
    =\begin{cases}2n+1&\phi_j(x)=1,\\
    \dfrac{\phi_j(x)^{n+1}-\phi_j(x)^{-n}}{\phi_j(x)-1}&\phi_j(x)\ne1,
    \end{cases}
    $$

    or $\delta_{n,j}(x)=\sin(\pi(2n+1)t_j)/\sin(\pi t_j)$ away from integer $t_j$. It is real and invariant under changing the sign of $t_j$.

??? proof "Proof"
    Tonelli gives an integrable majorant for the coefficient computation, so Fubini and $x=y+z$ split the integral into the two coefficients. Also $(\phi_\alpha*f)(x)=\phi_\alpha(x)c_\alpha(f)$; summing proves the partial-sum identity. Expand the finite product of the one-coordinate sums to get the rectangular frequency sum. Summing the geometric progression gives the quotient formula; pairing $k$ with $-k$ gives reality and sign symmetry. Multiplying numerator and denominator by suitable phases gives the sine formula. The exceptional condition is $\phi_j(x)=1$, which can hold for nonzero $x$.

!!! lemma "Lemma (Riemann-Lebesgue on the real line)"
    <a id="riemann-lebesgue-real-line"></a>

    For $f\in L^1(\mathbb R)$, $\int f(t)e^{i\lambda t}\,dt\to0$ as $|\lambda|\to\infty$.

??? proof "Proof"
    For $f=\mathbf1_{(a,b]}$, the integral is $(e^{i\lambda b}-e^{i\lambda a})/(i\lambda)$ and tends to zero. Finite linear combinations have the same property. These step functions are dense in $L^1$ by the integral-space density lemma. Choose such a $g$ with $\|f-g\|_1<\epsilon$; the two oscillatory integrals differ by at most $\epsilon$, independent of $\lambda$. Take a limsup and then let $\epsilon\downarrow0$. Real and imaginary parts give the complex case.

!!! theorem "Theorem (Dirichlet convergence with quadrant limits)"
    <a id="dirichlet-quadrant-convergence"></a>

    Put $P=\{\sum_jt_je_j:0<t_j<1/2\}$ and let $\tau_\Theta$ reverse coordinates indexed by $\Theta$. For a periodic representative of $f\in L^1(T_M)$,

    $$
    S_nf(x)=\frac1{2^d\operatorname{vol}(P)}\int_P
    \sum_{\Theta\subseteq\{1,\ldots,d\}}f(x+\tau_\Theta y)\delta_n(y)\,d\operatorname{vol}(y).
    $$

    Suppose the limits $f_\Theta(x)=\lim_{y\in P,\,y\to0}f(x+\tau_\Theta y)$ exist and $y\mapsto\bigl[\sum_\Theta(f(x+\tau_\Theta y)-f_\Theta(x))\bigr]/\prod_jt_j$ is integrable on $P$. Then $S_nf(x)\to2^{-d}\sum_\Theta f_\Theta(x)$.

??? proof "Proof"
    Use the centered fundamental parallelotope $[-1/2,1/2)^d$. Up to null coordinate faces, it is the disjoint union of the $2^d$ reflected copies of $P$. The Dirichlet kernel is invariant under every reflection, giving the first formula. Applied to the constant function one it gives $\int_P\delta_n\,d\operatorname{vol}=\operatorname{vol}(P)$. Subtract the proposed limit. The difference is the integral of

    $$
    H(y)\prod_j\sin(\pi(2n+1)t_j),\qquad
    H(y)=\frac{\sum_\Theta(f(x+\tau_\Theta y)-f_\Theta(x))}{\prod_j\sin(\pi t_j)},
    $$

    times the fixed normalizing constant. Each $t_j/\sin(\pi t_j)$ is bounded on $(0,1/2)$, so the hypothesis gives $H\in L^1(P)$. By Fubini, almost every one-variable section of $H$ is integrable. Apply Riemann-Lebesgue in its first coordinate and bound its integral by the corresponding integral of $|H|$. All remaining sine factors have modulus at most one. Dominated convergence in the remaining coordinates makes the whole integral tend to zero. In dimension one the constant-function calculation is $\int_0^{1/2}\sin(\pi(2n+1)t)/\sin(\pi t)\,dt=1/2$.

!!! definition "Definition (Fejer kernels and product means)"
    <a id="fejer-kernels"></a>

    Set $F_{n,j}=(n+1)^{-1}\sum_{k=0}^n\delta_{k,j}$ and $F_n=\prod_jF_{n,j}$. For noninteger $t_j$,

    $$
    F_{n,j}(x)=\frac{\sin^2(\pi(n+1)t_j)}{(n+1)\sin^2(\pi t_j)},
    \qquad F_{n,j}=n+1\text{ at integer }t_j.
    $$

    Each is nonnegative, has integral one in its coordinate, and $\int_{T_M}F_n\,d\eta=1$. The product means are $\sigma_nf=F_n*f$. In dimension one they equal $(n+1)^{-1}\sum_{k=0}^nS_kf$. In dimension $d>1$ they are the averages over all rectangular cutoffs $(k_1,\ldots,k_d)\in\{0,\ldots,n\}^d$, with denominator $(n+1)^d$.

??? proof "Proof"
    Sum the geometric expressions for $\delta_{k,j}$ to obtain, for $z=\phi_j(x)\ne1$, the expression $(z^{n+2}+z^{-n}-2z)/((n+1)(z-1)^2)$; rewriting with phases gives the sine square. At $z=1$ the average of $2k+1$ is $n+1$. Constant Fourier coefficient one proves normalization, and Fubini proves product normalization. In particular its integral over the positive half-coordinate is $1/2$. Expanding the product of the finite coordinate averages proves the rectangular-mean formula. The lecture's single-index average of cubic partial sums equals this product only in dimension one; the product-kernel proof below uses the rectangular average in higher dimensions.

!!! theorem "Theorem (Fejer uniform convergence)"
    <a id="fejer-uniform-convergence"></a>

    For continuous $f$ on $T_M$, $\sigma_nf\to f$ uniformly.

??? proof "Proof"
    Normalize coordinates so $\operatorname{vol}(D)=1$. Let $\epsilon_1(\delta)=\sup_{\|a-b\|_\infty\le\delta}|f(a)-f(b)|$, which tends to zero by uniform continuity on the compact torus, and $\epsilon_2(\delta)=\int_\delta^{1/2}\sin(\pi t)^{-2}\,dt<\infty$. Split $P$ into regions indexed by $\Psi$: coordinates in $\Psi$ are at least $\delta$, the others are smaller. On the small region the difference of any reflected translated value from $f(x)$ is at most $\epsilon_1(\delta)$, and total kernel mass is one. On every other region it is at most $2\|f\|_\infty$, while each large coordinate contributes kernel mass at most $\epsilon_2(\delta)/(n+1)$ and each small coordinate at most $1/2$. Thus

    $$
    \|\sigma_nf-f\|_\infty\le\epsilon_1(\delta)
    +2^{d+1}\|f\|_\infty\sum_{\varnothing\ne\Psi\subseteq\{1,\ldots,d\}}
    (1/2)^{d-|\Psi|}\bigl(\epsilon_2(\delta)/(n+1)\bigr)^{|\Psi|}.
    $$

    First let $n\to\infty$ and then $\delta\downarrow0$. This is the lecture's near-origin and complementary-region proof, with the higher-dimensional averaging convention made explicit.

!!! lemma "Lemma (Density of compactly supported continuous functions in Lp)"
    <a id="continuous-functions-lp-density"></a>

    For a Radon measure on a second-countable locally compact Hausdorff space, $C_c(X)$ is dense in $L^p(X)$ for $1\le p<\infty$.

??? proof "Proof"
    Increasing simple approximations to a nonnegative $f\in L^p$ converge in $L^p$ by dominated convergence of their error powers. The simple functions can be chosen with finite-measure positivity sets. For such a Borel set $A$, regularity gives compact $K\subseteq A\subseteq U$ open with $\mu(U\setminus K)<\epsilon$. Urysohn gives $0\le h\le1$, equal to one on $K$ and supported in $U$, so $\int|\mathbf1_A-h|^p\le\mu(U\setminus K)<\epsilon$. Approximate each of the finitely many indicators and sum. Decomposition into positive, negative, real and imaginary parts proves the general case.

## Fourier Series on the Real Line

!!! proposition "Proposition (Periodic series of period T)"
    <a id="periodic-fourier-series"></a>

    For $T>0$, $\phi_n(t)=e^{2\pi int/T}$ is an orthonormal basis with normalized inner product $T^{-1}\int_0^T\overline f g$. The coefficients are $c_n(f)=T^{-1}\int_0^Tf(t)e^{-2\pi int/T}\,dt$, and $S_Nf=\sum_{|n|\le N}c_n(f)\phi_n$ converges in $L^2$ for $f\in L^2$. For real $f$, $c_{-n}=\overline{c_n}$, and

    $$
    S_Nf(t)=a_0+\sum_{n=1}^N\bigl(a_n\cos(2\pi nt/T)+b_n\sin(2\pi nt/T)\bigr),
    $$

    where $a_0=T^{-1}\int_0^Tf$, $a_n=2T^{-1}\int_0^Tf(t)\cos(2\pi nt/T)\,dt$, and $b_n=2T^{-1}\int_0^Tf(t)\sin(2\pi nt/T)\,dt$.

??? proof "Proof"
    Apply the lattice-torus theory to $M=T\mathbb Z$ and $N=T^{-1}\mathbb Z$. Conjugating the coefficient integral gives $c_{-n}=\overline{c_n}$. Pair opposite indices: $c_n\phi_n+c_{-n}\phi_{-n}=2\operatorname{Re}(c_n\phi_n)=2\operatorname{Re}(c_n)\cos(2\pi nt/T)-2\operatorname{Im}(c_n)\sin(2\pi nt/T)$, yielding the formulas.

!!! proposition "Proposition (One-dimensional Dirichlet condition and differentiation)"
    <a id="periodic-dirichlet-differentiation"></a>

    If $f\in L^1(\mathbb R/T\mathbb Z)$ has both one-sided limits at $x$, and $[f(x+y)+f(x-y)-f(x+)-f(x-)]/y$ is integrable on $(0,T/2)$, then $S_Nf(x)\to(f(x+)+f(x-))/2$. For $C^1$ periodic $f$,

    $$
    c_n(f')=(2\pi in/T)c_n(f).
    $$

??? proof "Proof"
    Rescale the one-dimensional quadrant theorem. For the coefficient formula integrate by parts over $[0,T]$. The boundary term $T^{-1}[f(t)e^{-2\pi int/T}]_0^T$ vanishes by periodicity, and the derivative of the exponential contributes $2\pi in/T$ times the original coefficient.

!!! proposition "Proposition (Wirtinger inequality)"
    <a id="wirtinger-inequality"></a>

    For $C^1$, $T$-periodic complex $f$ and $m_f=T^{-1}\int_0^Tf$,

    $$
    \int_0^T|f-m_f|^2\,dt\le\frac{T^2}{4\pi^2}\int_0^T|f'|^2\,dt.
    $$

??? proof "Proof"
    Subtract the mean so $c_0(f)=0$. Parseval and the derivative formula give $T^{-1}\int|f'|^2=\sum_{n\ne0}(4\pi^2n^2/T^2)|c_n(f)|^2\ge(4\pi^2/T^2)\sum_{n\ne0}|c_n(f)|^2$. Apply Parseval again and multiply by $T$.

## Fourier Transform and Pontryagin Duality

!!! definition "Definition (Character group and compact-open topology)"
    <a id="pontryagin-dual"></a>

    For a locally compact Hausdorff abelian group, $\widehat G$ consists of continuous homomorphisms to $S^1$, with pointwise multiplication, trivial identity character and inverse $\chi^{-1}=\overline\chi$. Its compact-open topology has identity neighbourhoods $W(K,V)=\{\chi:\chi(K)\subseteq V\}$ for compact $K$ and identity neighbourhoods $V\subseteq S^1$. A group is Pontryagin self-dual if it is isomorphic to its dual as a topological group. For $f\in L^1(G)$, define $\widehat f(\chi)=\int_Gf(y)\overline{\chi(y)}\,d\mu(y)$.

??? proof "Proof"
    Finite intersections contain a neighbourhood with $K$ the union of the finitely many compact sets and $V$ the intersection of their target neighbourhoods. Small enough target arcs have product in any prescribed arc, proving continuity of group multiplication uniformly on $K$; inversion follows by conjugation. If $G$ is discrete its compact subsets are finite, so this is exactly the topology of pointwise convergence.

!!! example "Example (Self-duality of real spaces and the dual lattice)"
    <a id="real-space-self-duality"></a>

    The map $t\mapsto(s\mapsto e^{2\pi ist})$ is an isomorphism $\mathbb R\cong\widehat{\mathbb R}$. More generally $E^*\cong\widehat E$ for a finite-dimensional real space. The dual of $E/M$ is the discrete lattice $N$, and its Fourier transform consists of the Fourier coefficients.

??? proof "Proof"
    To classify a character of $\mathbb R$, choose a small interval where its values lie in an arc with a continuous real argument $a(s)\in(-1/4,1/4)$. The homomorphism law and smallness give local additivity of $a$: the possible integer difference is zero near the identity. Continuity and rational approximation give $a(s)=ts$ on a smaller interval. For arbitrary $s$, subdivide into sufficiently small equal pieces and use the homomorphism law to obtain $\chi(s)=e^{2\pi its}$. The parameter is unique since a nonzero $t$ does not give the trivial character.

    Every compact subset is contained in $[-M,M]$. For the arc $V_\epsilon=\{e^{2\pi iu}:|u|<\epsilon\}$ with $0<\epsilon<1/4$, $|t|<\epsilon/M$ implies $\chi_t([-M,M])\subseteq V_\epsilon$, proving continuity. Conversely, if that inclusion holds, the continuous real interval $[-M|t|,M|t|]$ cannot leave the component $(-\epsilon,\epsilon)$ of the inverse-image arcs while still staying in their union. Hence $M|t|<\epsilon$. Choose $M$ with $\epsilon/M<\delta$ to put $W([-M,M],V_\epsilon)$ inside the image of $(-\delta,\delta)$, proving continuity of the inverse.

    For $E$, restrict to each coordinate line and multiply the character values to obtain $e^{2\pi i\alpha(x)}$ for a unique linear form $\alpha$. Compact-coordinate bounds and the same inverse estimate prove the topological identification. A character descends to $E/M$ exactly when $\alpha(M)\subseteq\mathbb Z$, i.e. $\alpha\in N$. The dual topology is discrete: a nontrivial torus character is surjective onto $S^1$, so cannot have its whole compact domain mapped into a sufficiently small arc. Thus $W(T_M,V)=\{1\}$ for such an arc. Fourier coefficients are the resulting transform values. This illustrates the general fact that duals of compact abelian groups are discrete.

### Fourier transform on Euclidean space

!!! definition "Definition (Fourier transform on $\mathbb{R}^n$)"
    <a id="def-fs-6-1"></a>
    <a id="def-fourier-transform-on"></a>

    For $f \in L^1(\mathbb{R}^n)$ the **Fourier transform** is

    $$
    \hat f(\xi) = \int_{\mathbb{R}^n} f(x) e^{-2\pi i \langle x, \xi
    \rangle}\, dx, \qquad \xi \in \mathbb{R}^n.
    $$

    It extends uniquely to a unitary operator
    $\mathcal{F} : L^2(\mathbb{R}^n) \to L^2(\mathbb{R}^n)$.

!!! theorem "Theorem (Plancherel on $\mathbb{R}^n$)"
    <a id="thm-fs-6-2"></a>
    <a id="thm-plancherel-on"></a>

    For $f \in L^2(\mathbb{R}^n)$, $\int_{\mathbb{R}^n} |\hat f(\xi)|^2\, d\xi = \int_{\mathbb{R}^n} |f(x)|^2\, dx$.

??? proof "Proof"
    First work with Schwartz functions. Their transforms are Schwartz: differentiation in frequency inserts powers of $x$, and repeated integration by parts supplies arbitrarily rapid decay. The Gaussian calculation and inversion proof below give $g(x)=\int\hat g(\xi)e^{2\pi ix\cdot\xi}\,d\xi$. Insert this into $\int\overline f g$; absolute integrability of $f$ and $\hat g$ justifies Fubini and gives $\int\overline f g=\int\overline{\hat f}\hat g$. Thus the transform is an isometry on Schwartz space. Cutoffs and mollification show that this space is dense in $L^2$. It extends uniquely by completion to an isometry on $L^2$. Inversion on Schwartz functions gives $\mathcal F^2f(x)=f(-x)$, hence its range contains the dense Schwartz space; an isometry from a complete space has closed range, so the extension is onto and unitary. This proves the norm identity.

!!! theorem "Theorem (Fourier inversion)"
    <a id="thm-fs-6-3"></a>
    <a id="thm-fourier-inversion"></a>

    If $f \in L^1(\mathbb{R}^n)$ with $\hat f \in L^1(\mathbb{R}^n)$,
    then $f(x) = \int_{\mathbb{R}^n} \hat f(\xi) e^{2\pi i \langle x, \xi \rangle}\, d\xi$ for almost every $x$.

??? proof "Proof"
    The elementary Gaussian transform is $\widehat{e^{-\pi|x|^2}}(\xi)=e^{-\pi|\xi|^2}$. In dimension one differentiation under the integral and integration by parts give $h'(\xi)=-2\pi\xi h(\xi)$, while $h(0)=1$ follows from squaring the Gaussian integral and evaluating in polar coordinates. This solves the differential equation; products give all dimensions, and rescaling gives the formula for every Gaussian variance.

    For $\epsilon>0$ multiply $\hat f$ by $e^{-\pi\epsilon|\xi|^2}$. Fubini and the Gaussian formula identify its inverse integral with $f*G_\epsilon$, where $G_\epsilon(x)=\epsilon^{-n/2}e^{-\pi|x|^2/\epsilon}$. Tonelli gives normalization, and its mass outside every neighbourhood of zero tends to zero. Translation continuity in $L^1$ (first prove it for $C_c$ by uniform continuity, then use density) therefore gives $f*G_\epsilon\to f$ in $L^1$. On the other hand $\hat f\in L^1$ makes the inverse integrals converge uniformly, by dominated convergence, to the stated continuous inverse integral. An almost-everywhere convergent subsequence of the $L^1$ approximants identifies this inverse integral with $f$ almost everywhere. Schwartz functions have integrable transforms, proving the inversion fact used above without a circular appeal to Plancherel.

!!! theorem "Theorem (Convolution theorem)"
    <a id="thm-fs-6-4"></a>
    <a id="thm-convolution-theorem"></a>

    For $f, g \in L^1(\mathbb{R}^n)$ with $f \ast g \in L^1(\mathbb{R}^n)$,
    $\widehat{f \ast g} = \hat f \cdot \hat g$. For $f, g \in L^2(\mathbb{R}^n)$, $\widehat{f g} = \hat f \ast \hat g$ (where the
    convolution is interpreted via the Plancherel isomorphism).

??? proof "Proof"
    By Fubini: for $f, g \in L^1$, the iterated integral
    $\int (f \ast g)(x) e^{-2\pi i \langle x, \xi \rangle}\, dx = \iint f(y) g(x - y) e^{-2\pi i \langle x, \xi \rangle}\, dy\, dx$.
    Substitute $z = x - y$: this becomes
    $\iint f(y) g(z) e^{-2\pi i \langle y + z, \xi \rangle}\, dz\, dy = \hat f(\xi) \hat g(\xi)$.
    For Schwartz functions, insert the absolutely integrable inverse representation of one factor and use Fubini to obtain the product formula. For general $f,g\in L^2$, take Schwartz approximants $f_j,g_j$ in $L^2$. Holder gives $f_jg_j\to fg$ in $L^1$, so their transforms converge uniformly. Plancherel and Cauchy–Schwarz give $\|\hat f_j*\hat g_j-\hat f*\hat g\|_\infty\le\|\hat f_j-\hat f\|_2\|\hat g_j\|_2+\|\hat f\|_2\|\hat g_j-\hat g\|_2\to0$. Passing to the limit proves the formula.

!!! example "Example (Heat equation via Fourier transform)"
    <a id="ex-fs-6-5"></a>
    <a id="ex-heat-equation-via-fourier-transform"></a>

    The Cauchy problem $\partial_t u = \Delta u$, $u(\cdot, 0) = u_0$
    on $\mathbb{R}^n$, for integrable or square-integrable initial data and $t>0$, has the heat-kernel solution
    $u(x, t) = (G_t \ast u_0)(x)$ with
    $G_t(x) = (4\pi t)^{-n/2} e^{-|x|^2 / 4t}$ (the heat kernel).
    In Fourier variables, $\hat u(\xi, t) = e^{-4\pi^2 |\xi|^2 t} \hat u_0(\xi)$.

??? proof "Proof"
    Fourier transformation changes $\Delta$ to multiplication by $-4\pi^2|\xi|^2$, so the transformed heat equation is a scalar differential equation with solution $e^{-4\pi^2|\xi|^2t}\hat u_0(\xi)$. The Gaussian transform identifies its multiplier with the displayed heat kernel, and the convolution theorem gives the solution formula. For $t>0$, Gaussian derivative bounds permit differentiation under the convolution; directly $\partial_tG_t=\Delta G_t$. The approximate-identity argument gives convergence to $u_0$ in its $L^1$ or $L^2$ norm as $t\downarrow0$.
