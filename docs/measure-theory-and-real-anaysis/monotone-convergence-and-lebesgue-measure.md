# Monotone Convergence and Lebesgue Measure

This chapter begins the transition from the general Kurzweil–Henstock
integral to absolute integrability and, ultimately, to monotone convergence
and Lebesgue measure. The present notes contain the opening step of that
development: positive and negative parts, absolute KH-integrability, and an
example showing that ordinary KH-integrability need not be absolute.

Throughout, $I$ denotes a compact cell unless another interval is specified,
and $lambda(J)$ denotes the length of a compact cell $J$.

## Absolute Kurzweil–Henstock Integrability

!!! definition "Definition (Positive and negative parts)"
    <a id="def-positive-and-negative-parts"></a>
    Let $S$ be a set and let $f:S\to\mathbb R$. The **positive part** and
    **negative part** of $f$ are the nonnegative functions

    $$
    f^+(x):=\max\{f(x),0\},
    \qquad
    f^-(x):=-\min\{f(x),0\}.
    $$

    Pointwise on $S$,

    $$
    f=f^+-f^-,
    \qquad
    |f|=f^++f^-,
    $$

    and therefore

    $$
    f^+=\frac{|f|+f}{2},
    \qquad
    f^-=\frac{|f|-f}{2}.
    $$

    More generally, for real-valued functions $f$ and $g$ on the same set,

    $$
    \max\{f,g\}=\frac{f+g+|f-g|}{2},
    \qquad
    \min\{f,g\}=\frac{f+g-|f-g|}{2}.
    $$

!!! definition "Definition (Absolute KH-integrability)"
    <a id="def-absolute-kh-integrability"></a>
    Let $I$ be an interval and let $f:I\to\mathbb R$. We say that $f$ is
    **absolutely Kurzweil–Henstock integrable** on $I$, and write

    $$
    f\in\operatorname{AKH}(I),
    $$

    if both $f$ and $|f|$ belong to $\operatorname{KH}(I)$.

!!! proposition "Proposition (Characterization by positive and negative parts)"
    <a id="prop-akh-positive-negative-parts"></a>
    Let $I\subseteq\mathbb R$ be an interval and let $f:I\to\mathbb R$.
    The following are equivalent:

    1. $f\in\operatorname{AKH}(I)$;
    2. $f^+,f^-\in\operatorname{KH}(I)$.

??? proof "Proof"
    If $f$ and $|f|$ are KH-integrable, linearity and

    $$
    f^+=\frac{|f|+f}{2},
    \qquad
    f^-=\frac{|f|-f}{2}
    $$

    show that $f^+$ and $f^-$ are KH-integrable. Conversely, if $f^+$ and
    $f^-$ are KH-integrable, then

    $$
    f=f^+-f^-,
    \qquad
    |f|=f^++f^-
    $$

    are KH-integrable by linearity. Hence $f\in\operatorname{AKH}(I)$.

The word *absolute* is essential: a derivative may be KH-integrable without
its absolute value being KH-integrable.

!!! example "Example (A KH-integrable derivative that is not absolutely integrable)"
    <a id="ex-derivative-not-absolutely-kh-integrable"></a>
    Define $F:[-1,1]\to\mathbb R$ by

    $$
    F(x):=
    \begin{cases}
    x^2\sin(1/x^2),&x\neq0,\\
    0,&x=0.
    \end{cases}
    $$

    Then $F$ is differentiable everywhere, $F'(0)=0$, and

    $$
    F'(x)=2x\sin(1/x^2)-\frac{2}{x}\cos(1/x^2)
    \qquad(x\neq0).
    $$

    The [fundamental theorem of calculus](kurzweil-henstock-integration.md#thm-1-13-3)
    gives

    $$
    F'\in\operatorname{KH}([-1,1]),
    \qquad
    \int_{[-1,1]}F'=F(1)-F(-1)=0.
    $$

    Nevertheless, $|F'|\notin\operatorname{KH}([-1,1])$.

??? proof "Proof of non-absolute integrability"
    Write

    $$
    g(x):=2x\sin(1/x^2),
    \qquad
    h(x):=\frac{2}{x}\cos(1/x^2),
    $$

    so that $F'=g-h$ away from the origin. For $n\geq1$, put

    $$
    A_n:=2\pi n-\frac{\pi}{3},
    \qquad
    B_n:=2\pi n+\frac{\pi}{3},
    $$

    and define the pairwise disjoint compact cells

    $$
    I_n:=
    \left[\frac{1}{\sqrt{B_n}},\frac{1}{\sqrt{A_n}}\right]
    \subseteq(0,1].
    $$

    If $x\in I_n$, then $1/x^2\in[A_n,B_n]$ and hence
    $\cos(1/x^2)\geq1/2$. Consequently,

    $$
    h(x)\geq\frac1x\geq\sqrt{A_n},
    \qquad
    |g(x)|\leq2.
    $$

    For all sufficiently large $n$, $h(x)\geq4$ on $I_n$, and therefore

    $$
    |F'(x)|=|g(x)-h(x)|
    \geq h(x)-|g(x)|
    \geq\frac12\sqrt{A_n}.
    \tag{1}
    $$

    The mean value theorem applied to $u\mapsto u^{-1/2}$ gives

    $$
    \lambda(I_n)
    =\frac1{\sqrt{A_n}}-\frac1{\sqrt{B_n}}
    \geq\frac{\pi}{3B_n^{3/2}}.
    \tag{2}
    $$

    Since $A_n\geq(5\pi/3)n$ and $B_n\leq(7\pi/3)n$, (1) and (2) yield a
    constant $c>0$ such that

    $$
    \int_{I_n}|F'|
    \geq\frac12\sqrt{A_n}\,\lambda(I_n)
    \geq\frac{c}{n}
    $$

    for all sufficiently large $n$. If $|F'|$ were KH-integrable on
    $[-1,1]$, restriction, finite additivity, and monotonicity would imply

    $$
    \int_{[-1,1]}|F'|
    \geq\sum_{n=n_0}^{N}\int_{I_n}|F'|
    \geq c\sum_{n=n_0}^{N}\frac1n
    $$

    for every $N$. The right-hand side is unbounded, a contradiction. Thus
    $F'$ is KH-integrable but not absolutely KH-integrable.
