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
    A subset $S \subseteq E$ of a real vector space is **convex** if it
    contains every convex combination of its elements. A function
    $f : U \to \mathbb{R}$ on a convex $U$ is **convex** if its
    epigraph $\Gamma_+(f) = \{(x, t) : f(x) \leq t\}$ is convex, and
    **concave** if $-f$ is convex. Equivalently,
    $f(\lambda x + (1 - \lambda) y) \leq \lambda f(x) + (1 - \lambda) f(y)$
    for $\lambda \in [0, 1]$.

!!! theorem "Theorem (Jensen)"
    <a id="thm-fs-1-2"></a>
    Let $f : U \to \mathbb{R}$ be a convex function on a convex $U$ and
    $\mu$ a probability measure on $U$ with finite support
    $\{x_1, \ldots, x_n\}$. Then

    $$
    f\!\left( \sum_{i=1}^{n} \mu(x_i) x_i \right) \leq \sum_{i=1}^{n}
    \mu(x_i)\, f(x_i).
    $$

??? proof "Proof (Jensen)"
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
    $f(s y + t x_n) \leq s f(y) + t f(x_n) \leq \sum_{i=1}^{n-1}
    \mu(x_i) f(x_i) + \mu(x_n) f(x_n)$.

!!! proposition "Proposition (Convexity from supremum of affine functions)"
    <a id="prop-fs-1-3"></a>
    If $(f_i)_{i \in I}$ is a family of convex functions on $U$ and
    $f(x) := \sup_i f_i(x)$ is finite-valued, then $f$ is convex.
    Equivalently, the pointwise supremum of affine functions is convex.

!!! proposition "Proposition (Twice-differentiable convexity)"
    <a id="prop-fs-1-4"></a>
    Let $U$ be convex open and $f : U \to \mathbb{R}$ twice
    differentiable. $f$ is convex iff $D^2 f(x)$ is semidefinite for
    every $x \in U$. In that case $f(x) \geq f(a) + Df(a)(x - a)$ for
    all $a, x \in U$, and $f = \sup_{a \in U} (f(a) + Df(a)(\cdot - a))$.

    **Proof.** Taylor expand $g(t) = f(a + t(x - a))$ to second order:
    $g(1) = g(0) + g'(0) + \tfrac{1}{2} g''(\theta)$ with $g''(\theta) =
    D^2 f(\cdot)(x - a, x - a) \geq 0$.

## Hölder Inequality

!!! definition "Definition ($L^p$ norm, $L^\infty$ norm)"
    <a id="def-fs-2-1"></a>
    For a measure space $(\Omega, \mathcal{A}, \nu)$ and $1 \leq p < \infty$,
    the $L^p$-norm is
    $\|f\|_{L^p} = \bigl( \int_\Omega |f|^p\, d\nu \bigr)^{1/p}$.
    The $L^\infty$-norm is
    $\|f\|_{L^\infty} = \inf\{\sup_{\omega \notin A} |f(\omega)| : \nu(A) = 0\}$.
    $L^p$ and $L^\infty$ are seminormed spaces modulo the negligible
    functions.

??? proof "Proof (Hölder)"
    By induction on $n$. The case $n = 1$ is trivial. For the induction
    step, suppose $p_n < \infty$ (the case $p_n = \infty$ is similar
    and left to the reader). Apply the case $n = 2$ with
    $p_1'^{-1} + p_1^{-1} = 1$ (so $p_1' = (1 - p_n^{-1})^{-1} = $ the
    dual exponent of $p_1$ adjusted to absorb the other terms):
    $\|f_1 \cdots f_n\|_{L^1} \leq \|f_n\|_{L^{p_n}} \|f_1 \cdots
    f_{n-1}\|_{L^{p_1'}}$. By the induction hypothesis,
    $\|f_1 \cdots f_{n-1}\|_{L^{p_1'}} \leq \|f_1\|_{L^{p_1}} \cdots
    \|f_{n-1}\|_{L^{p_{n-1}}}$. Multiply.

    For the case $n = 2$: the inequality
    $|xy| \leq |x|^p / p + |y|^q / q$ for $p^{-1} + q^{-1} = 1$ comes
    from Young's inequality (a log-convexity argument: $e^{t/p + s/q}
    \leq t/p + s/q + 1$ for $t = p \ln |x|$, $s = q \ln |y|$ when
    $|x|^p = e^t$ and $|y|^q = e^s$; applied to the convex function
    $\exp$). Substituting $x = |f_1| / \|f_1\|_p$, $y = |f_2| /
    \|f_2\|_q$ and integrating gives $\|f_1 f_2\|_{L^1} \leq
    \|f_1\|_{L^p} \|f_2\|_{L^q}$.

!!! corollary "Corollary (Minkowski)"
    <a id="cor-fs-2-3"></a>
    $\|f + g\|_{L^p} \leq \|f\|_{L^p} + \|g\|_{L^p}$. The space $L^p$ is
    a normed vector space (modulo null functions) for every
    $p \in [1, \infty]$.

??? proof "Proof (Minkowski)"
    For $p > 1$, apply Hölder to $f \cdot (f + g)^{p-1}$ and to
    $g \cdot (f + g)^{p-1}$, then add the two inequalities. Divide by
    $\|f + g\|_{L^p}^{p-1}$.

!!! theorem "Theorem (Completeness of $L^p$)"
    <a id="thm-fs-2-4"></a>
    $L^p(\Omega, \mathcal{A}, \nu)$ is a Banach space for
    $p \in [1, \infty]$. The proof is a standard Cauchy-subsequence
    argument: extract $(f_{n_k})$ with
    $\sum_k \|f_{n_{k+1}} - f_{n_k}\|_{L^p} < \infty$, deduce the
    a.e.-pointwise convergence to a limit $f$ by Lemma 8.2.6, and
    conclude $\|f - f_n\|_{L^p} \to 0$ by dominated convergence.

## Haar Measure on the Torus

!!! definition "Definition (Torus as a quotient)"
    <a id="def-fs-3-1"></a>
    The **$n$-torus** is $\mathbb{T}^n = \mathbb{R}^n / \mathbb{Z}^n$ with
    the quotient topology. The Haar measure on the additive group
    $\mathbb{T}^n$ is the unique left-invariant Radon measure
    $\mu_{\mathbb{T}^n}$ with $\mu_{\mathbb{T}^n}(\mathbb{T}^n) = 1$; it
    pushes forward Lebesgue measure from $[0, 1)^n$ via the quotient
    map.

!!! definition "Definition (Characters)"
    <a id="def-fs-3-2"></a>
    A **character** of the torus $\mathbb{T}^n$ is a continuous group
    homomorphism $\chi : \mathbb{T}^n \to S^1$. Writing
    $e_n : \mathbb{T} \to S^1$, $t \mapsto e^{2\pi i n t}$ for
    $n \in \mathbb{Z}$, the characters are exactly
    $\chi_k(t) = e^{2\pi i \langle k, t \rangle}$ for $k \in \mathbb{Z}^n$.

!!! theorem "Theorem (Orthonormality of characters)"
    <a id="thm-fs-3-3"></a>
    $\{\chi_k\}_{k \in \mathbb{Z}^n}$ is an orthonormal family in
    $L^2(\mathbb{T}^n, \mu_{\mathbb{T}^n})$:
    $\int_{\mathbb{T}^n} \chi_k \overline{\chi_\ell}\, d\mu = \delta_{k, \ell}$.

## Convolution

!!! definition "Definition (Convolution)"
    <a id="def-fs-4-1"></a>
    For $f, g \in L^1(\mathbb{T}^n)$ the **convolution** is

    $$
    (f \ast g)(x) = \int_{\mathbb{T}^n} f(x - y) g(y)\, d\mu_{\mathbb{T}^n}(y).
    $$

    It satisfies $\|f \ast g\|_{L^1} \leq \|f\|_{L^1} \|g\|_{L^1}$, so
    $L^1(\mathbb{T}^n)$ is a Banach algebra under convolution.

!!! theorem "Theorem (Convolution of $L^2$ and $L^1$)"
    <a id="thm-fs-4-2"></a>
    For $f \in L^1(\mathbb{T}^n)$ and $g \in L^2(\mathbb{T}^n)$, the
    convolution $f \ast g \in L^2(\mathbb{T}^n)$ with
    $\|f \ast g\|_{L^2} \leq \|f\|_{L^1} \|g\|_{L^2}$.

    **Proof.** Apply Cauchy–Schwarz to
    $(f \ast g)(x) = \int f(x - y) g(y)\, d\mu(y)$, then
    Fubini.

## Fourier Series

!!! definition "Definition (Fourier coefficients, partial sums)"
    <a id="def-fs-5-1"></a>
    For $f \in L^1(\mathbb{T}^n)$, the **$k$-th Fourier coefficient** is
    $\hat f(k) = \int_{\mathbb{T}^n} f(x)\, \overline{\chi_k(x)}\,
    d\mu_{\mathbb{T}^n}(x)$. The **$N$-th partial sum** of the
    Fourier series is
    $S_N f(x) = \sum_{|k| \leq N} \hat f(k) \chi_k(x)$.

!!! theorem "Theorem (Riemann–Lebesgue)"
    <a id="thm-fs-5-2"></a>
    For $f \in L^1(\mathbb{T}^n)$, $\hat f(k) \to 0$ as $|k| \to \infty$.

??? proof "Proof (Riemann–Lebesgue)"
    Approximate $f$ by smooth periodic functions in $L^1$: given
    $\varepsilon > 0$, choose $g$ smooth with $\|f - g\|_{L^1} < \varepsilon$.
    Then $|\hat f(k) - \hat g(k)| \leq \|f - g\|_{L^1} < \varepsilon$ for
    every $k$. It suffices to show $\hat g(k) \to 0$. For $g$ smooth,
    integrate by parts: $\hat g(k) = (2\pi i k_1)^{-1}
    \widehat{\partial_{x_1} g}(k)$ when $k_1 \neq 0$. So
    $|\hat g(k)| \leq (2\pi |k_1|)^{-1} \|\partial_{x_1} g\|_{L^1}$. The
    same applies in any direction, so
    $|\hat g(k)| = O(|k|^{-1}) \to 0$.

!!! theorem "Theorem (Plancherel)"
    <a id="thm-fs-5-3"></a>
    For $f \in L^2(\mathbb{T}^n)$, $\sum_{k \in \mathbb{Z}^n} |\hat
    f(k)|^2 = \|f\|_{L^2}^2$ (Parseval) and $S_N f \to f$ in
    $L^2(\mathbb{T}^n)$.

??? proof "Proof (Plancherel)"
    The family $\{\chi_k\}_{k \in \mathbb{Z}^n}$ is orthonormal in
    $L^2(\mathbb{T}^n)$. By Bessel's inequality applied to the
    finite-dimensional subspace $V_N = \mathrm{span}\{\chi_k : |k| \leq
    N\}$,
    $\sum_{|k| \leq N} |\hat f(k)|^2 = \sum_{|k| \leq N} |\langle f,
    \chi_k \rangle|^2 \leq \|p_{V_N}(f)\|^2 \leq \|f\|_{L^2}^2$.
    Letting $N \to \infty$: $\sum_k |\hat f(k)|^2 \leq \|f\|_{L^2}^2$.
    For the reverse, $S_N f$ is the orthogonal projection of $f$ onto
    $V_N$, so $\|f - S_N f\|_{L^2}^2 = \|f\|_{L^2}^2 - \|S_N f\|_{L^2}^2
    = \|f\|_{L^2}^2 - \sum_{|k| \leq N} |\hat f(k)|^2$. The density of
    $\bigcup_N V_N$ in $L^2$ (every trigonometric polynomial is in
    some $V_N$) gives $\|f - S_N f\|_{L^2} \to 0$, so
    $\sum_k |\hat f(k)|^2 \geq \|f\|_{L^2}^2$. The convergence
    $S_N f \to f$ in $L^2$ is the same statement.

??? proof "Proof (Pointwise convergence for $C^1$ functions)"
    By integration by parts,
    $\hat f(k) = (2\pi i k_j)^{-1} \widehat{\partial_{x_j} f}(k)$ for any
    $j$ with $k_j \neq 0$. Hence
    $|\hat f(k)| \leq (2\pi |k_j|)^{-1} \|\partial_{x_j} f\|_{L^1}$ and
    by Cauchy–Schwarz across directions,
    $|\hat f(k)|^2 \leq \sum_{j=1}^{n} (2\pi k_j)^{-2}
    \|\partial_{x_j} f\|_{L^1}^2 \leq C \|k\|^{-2}$ for some constant
    $C$. So $\sum_k |\hat f(k)| < \infty$ (convergent series since
    $\sum_{|k| \geq 1} |k|^{-2} < \infty$). The Weierstrass M-test gives
    uniform convergence of $S_N f$ to $f$ on $\mathbb{T}^n$.

## Fourier Series on the Real Line

!!! definition "Definition (Fourier transform on $\mathbb{R}^n$)"
    <a id="def-fs-6-1"></a>
    For $f \in L^1(\mathbb{R}^n)$ the **Fourier transform** is

    $$
    \hat f(\xi) = \int_{\mathbb{R}^n} f(x) e^{-2\pi i \langle x, \xi
    \rangle}\, dx, \qquad \xi \in \mathbb{R}^n.
    $$

    It extends uniquely to a unitary operator
    $\mathcal{F} : L^2(\mathbb{R}^n) \to L^2(\mathbb{R}^n)$.

!!! theorem "Theorem (Plancherel on $\mathbb{R}^n$)"
    <a id="thm-fs-6-2"></a>
    For $f \in L^2(\mathbb{R}^n)$, $\int_{\mathbb{R}^n} |\hat f(\xi)|^2\,
    d\xi = \int_{\mathbb{R}^n} |f(x)|^2\, dx$.

??? proof "Proof (Plancherel on $\mathbb{R}^n$)"
    The map $\mathcal{F} : \mathcal{S}(\mathbb{R}^n) \to \mathcal{S}
    (\mathbb{R}^n)$ is a unitary isomorphism (a direct computation:
    $\mathcal{F}^2$ is reflection, $\mathcal{F}^4 = \mathrm{id}$, and
    $\langle \mathcal{F} f, \mathcal{F} g\rangle = \langle f, g\rangle$
    by Fubini after the substitution $\xi \to -\xi$). The Schwartz
    space $\mathcal{S}(\mathbb{R}^n)$ is dense in $L^2(\mathbb{R}^n)$,
    so $\mathcal{F}$ extends uniquely to a unitary operator
    $\mathcal{F} : L^2 \to L^2$. Unitarity is precisely
    $\|\hat f\|_{L^2} = \|f\|_{L^2}$.

!!! theorem "Theorem (Fourier inversion)"
    <a id="thm-fs-6-3"></a>
    If $f \in L^1(\mathbb{R}^n)$ with $\hat f \in L^1(\mathbb{R}^n)$,
    then $f(x) = \int_{\mathbb{R}^n} \hat f(\xi) e^{2\pi i \langle x,
    \xi \rangle}\, d\xi$ for almost every $x$.

??? proof "Proof (Fourier inversion)"
    Approximate $f$ by Schwartz functions in $L^1 \cap L^2$ (use
    mollification, which commutes with $\mathcal{F}$). For $g$ a
    Schwartz function, the inverse formula follows from the direct
    computation (use the inversion
    $\mathcal{F}^{-1} g = \mathcal{F} g(-\cdot)$, which holds for
    Schwartz functions by completing the square in the integral). For
    $f \in L^1$ with $\hat f \in L^1$, the right-hand side $\check f(x)
    := \int \hat f(\xi) e^{2\pi i \langle x, \xi \rangle}\, d\xi$ is
    continuous and equals $f$ a.e. (by the dominated convergence
    theorem applied to a sequence of Schwartz approximants).

!!! theorem "Theorem (Convolution theorem)"
    <a id="thm-fs-6-4"></a>
    For $f, g \in L^1(\mathbb{R}^n)$ with $f \ast g \in L^1(\mathbb{R}^n)$,
    $\widehat{f \ast g} = \hat f \cdot \hat g$. For $f, g \in
    L^2(\mathbb{R}^n)$, $\widehat{f g} = \hat f \ast \hat g$ (where the
    convolution is interpreted via the Plancherel isomorphism).

??? proof "Proof (Convolution theorem)"
    By Fubini: for $f, g \in L^1$, the iterated integral
    $\int (f \ast g)(x) e^{-2\pi i \langle x, \xi \rangle}\, dx
    = \iint f(y) g(x - y) e^{-2\pi i \langle x, \xi \rangle}\, dy\, dx$.
    Substitute $z = x - y$: this becomes
    $\iint f(y) g(z) e^{-2\pi i \langle y + z, \xi \rangle}\, dz\, dy
    = \hat f(\xi) \hat g(\xi)$.
    For $f, g \in L^2$, the Plancherel isomorphism identifies
    $L^2$ with itself; under this identification, the Fourier
    transform of a product corresponds to the convolution of the
    transforms (a standard computation using the inversion formula).

!!! example "Example (Heat equation via Fourier transform)"
    <a id="ex-fs-6-5"></a>
    The Cauchy problem $\partial_t u = \Delta u$, $u(\cdot, 0) = u_0$
    on $\mathbb{R}^n$ has solution
    $u(x, t) = (G_t \ast u_0)(x)$ with
    $G_t(x) = (4\pi t)^{-n/2} e^{-|x|^2 / 4t}$ (the heat kernel).
    In Fourier variables, $\hat u(\xi, t) = e^{-4\pi^2 |\xi|^2 t}
    \hat u_0(\xi)$.

