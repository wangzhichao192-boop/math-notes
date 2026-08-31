# Differential Calculus

This chapter is the core of **differential calculus in normed vector spaces**.
We work in a complete non-trivially valued field $(K, |\cdot|)$ and normed
vector spaces over it; the scalar case $K = \mathbb{R}$ gives back the classical
theory. The two main objects are the **Fréchet differential** (linear part of
$f(p + h) - f(p)$) and the **mean-value inequality** that bounds $f(y) - f(x)$
by the integral of $\|Df\|$.

## Landau Symbols

!!! definition "Definition (Big-O and little-o along a filter)"
    <a id="def-9-1-1"></a>
    Let $X$ be a set, $f : X \to V$ a map into a normed space, $g : X \to
    \mathbb{R}_{\geq 0}$, and $\mathcal{F}$ a filter on $X$.

    + $f(x) = O(g(x))$ along $\mathcal{F}$ means there exist $C > 0$ and
      $A \in \mathcal{F}$ with $\|f(x)\| \leq C\, g(x)$ for all $x \in A$.
    + $f(x) = o(g(x))$ along $\mathcal{F}$ means there exist
      $\varepsilon : X \to \mathbb{R}_{\geq 0}$ and $A \in \mathcal{F}$
      with $\lim_{\mathcal{F}} \varepsilon = 0$ and
      $\|f(x)\| \leq \varepsilon(x)\, g(x)$ for all $x \in A$.

!!! example "Example (Common filter specialisations)"
    + **Sequences**: $\mathcal{F}$ = cofinite filter on $\mathbb{N}$; write
      $x_n = O(b_n),\, n \to +\infty$.
    + **Neighbourhood filter** at $y_0 \in Y \subseteq X$: write
      $f(y) = O(g(y)),\, y \to y_0$.
    + **Tail filter** $[a, +\infty[$ on $\mathbb{R}$: write
      $f(y) = O(g(y)),\, y \to +\infty$.

!!! proposition "Proposition (Algebraic rules for Landau symbols)"
    <a id="prop-9-1-2"></a>
    Along a filter $\mathcal{F}$:

    1. $f = o(g) \Rightarrow f = O(g)$.
    2. $f_1, f_2 = O(g) \Rightarrow f_1 + f_2 = O(g)$; same for $o$.
    3. $\lambda = O(g), f = O(h) \Rightarrow \lambda f = O(gh)$.
    4. $\lambda = O(g), f = o(h)$ or $\lambda = o(g), f = O(h)$
       $\Rightarrow \lambda f = o(gh)$.

??? proof "Proof (of Prop. 9-1-2)"
    (1) $f = o(g)$ gives $\varepsilon$ and $A \in \mathcal{F}$ with
    $\|f(x)\| \leq \varepsilon(x) g(x)$ on $A$. Since
    $\lim_{\mathcal{F}} \varepsilon = 0$, there is $B \in \mathcal{F}$ on
    which $\varepsilon(x) \leq 1$, so on $A \cap B$ we have
    $\|f(x)\| \leq g(x) = O(g)$.
    (2) Take the intersection of the two witnessing sets and add the
    constants (or $\varepsilon$ functions).
    (3) Choose $A_1, A_2 \in \mathcal{F}$ with $|\lambda| \leq C_1 g$ and
    $\|f\| \leq C_2 h$. On $A_1 \cap A_2$,
    $\|\lambda f\| \leq C_1 C_2\, gh$.
    (4) Say $\lambda = O(g)$ and $f = o(h)$: pick $A_1, A_2 \in
    \mathcal{F}$, $C \geq 0$, and $\varepsilon$ with $|\lambda| \leq Cg$
    on $A_1$ and $\|f\| \leq \varepsilon h$ on $A_2$. Then on
    $A_1 \cap A_2$, $\|\lambda f\| \leq C \varepsilon\, gh$, and
    $\lim_{\mathcal{F}} C\varepsilon = 0$.

## Differentiability

!!! definition "Definition (Differentiable map, differential)"
    <a id="def-9-2-1"></a>
    Let $U \subseteq E$ with $p \in U^\circ$ and $f : U \to F$. The map $f$
    is **differentiable at $p$** if there exists $\varphi \in L(E, F)$ (the
    space of bounded $K$-linear maps $E \to F$) such that

    $$
    f(p + h) - f(p) - \varphi(h) = o(\|h\|_E),\quad h \to 0_E.
    $$

    Such $\varphi$ is unique and is called the **differential** of $f$ at $p$,
    denoted $Df(p) \in L(E, F)$. When $E = K$, we set
    $f'(p) := Df(p)(1) \in F$.

!!! proposition "Proposition (Uniqueness of the differential)"
    <a id="prop-9-2-2"></a>
    If $\varphi, \psi \in L(E, F)$ both satisfy
    $f(p + h) - f(p) - \varphi(h) = o(\|h\|)$ and similarly for $\psi$,
    then $\varphi = \psi$.

??? proof "Proof (Uniqueness of the differential)"
    Subtracting the two expressions,
    $(\varphi - \psi)(h) = o(\|h\|)$, $h \to 0$: there are
    $\varepsilon : B(0_E, r) \to \mathbb{R}_{\geq 0}$ with
    $\lim_{h \to 0} \varepsilon(h) = 0$ and
    $\|(\varphi - \psi)(h)\| \leq \varepsilon(h) \|h\|$ on $B(0_E, r)$.
    For any $x \in E \setminus \{0\}$ and $N$ large enough that
    $|a|^N \|x\| < r$ with $|a| < 1$,
    $\|(\varphi - \psi)(a^N x)\| \leq \varepsilon(a^N x)\, |a|^N \|x\|$.
    Divide by $|a|^N \|x\|$ and use the linearity of $\varphi - \psi$ to get
    $\frac{\|(\varphi - \psi)(x)\|}{\|x\|} \leq \varepsilon(a^N x)$. Let
    $N \to \infty$ to obtain $\|\varphi - \psi\| = 0$, i.e. $\varphi = \psi$.

!!! example "Example (Elementary differentials)"
    + Constant map: $Df(x) = 0_F$.
    + Linear map $\varphi \in L(E, F)$: $D\varphi(x) = \varphi$.
    + Component map $f = (f_1, \ldots, f_n) : U \to F_1 \oplus \cdots \oplus
      F_n$: each $f_i$ is differentiable iff $f$ is, and
      $Df(p)(h) = (Df_1(p)(h), \ldots, Df_n(p)(h))$.
    + $E = K$: $f(p + h) - f(p) = h\, f'(p) + o(|h|)$, recovering the
      ordinary derivative.

!!! theorem "Theorem (Chain rule)"
    <a id="thm-9-2-3"></a>
    Let $U \subseteq E$, $V \subseteq F$ be open, $f : U \to F$ with
    $f(U) \subseteq V$, and $g : V \to G$. If $f$ is differentiable at $p$
    and $g$ is differentiable at $f(p)$, then $g \circ f$ is differentiable
    at $p$ and

    $$
    D(g \circ f)(p) = Dg(f(p)) \circ Df(p).
    $$

??? proof "Proof (Chain rule)"
    Differentiable at $p$ gives
    $f(p + h) - f(p) - Df(p)(h) = o(\|h\|)$, so in particular
    $f(p + h) - f(p) = O(\|h\|)$. Differentiable at $f(p)$ gives
    $g(f(p + h)) - g(f(p)) - Dg(f(p))(f(p + h) - f(p))
    = o(\|f(p + h) - f(p)\|) = o(\|h\|)$ (the second equality since
    $f(p + h) - f(p) = O(\|h\|)$). Then
    $Dg(f(p))(f(p + h) - f(p)) - Dg(f(p))(Df(p)(h))
    = Dg(f(p))(f(p + h) - f(p) - Df(p)(h)) = O(o(\|h\|)) = o(\|h\|)$.
    Adding the two estimates:
    $g(f(p + h)) - g(f(p)) - Dg(f(p))(Df(p)(h)) = o(\|h\|)$.

## Multilinear Mappings

!!! definition "Definition (Multilinear map, norm)"
    <a id="def-9-3-1"></a>
    Let $E_1, \ldots, E_n, F$ be $K$-modules. A map
    $\varphi : E_1 \times \cdots \times E_n \to F$ is **$n$-linear** if
    each slot, with the others fixed, is $K$-linear. The space of $n$-linear
    maps is $\mathrm{Hom}_K^{(n)}(E_1 \times \cdots \times E_n, F)$.

    For normed vector spaces, the bounded $n$-linear maps form
    $L^{(n)}(E_1, \ldots, E_n; F)$ with the norm

    $$
    \|\varphi\| = \sup_{\substack\{x_i \in E_i \setminus \{0\} \\ i = 1, \ldots, n\}}
    \frac{\|\varphi(x_1, \ldots, x_n)\|_F}{\|x_1\|_{E_1} \cdots \|x_n\|_{E_n}}.
    $$

!!! theorem "Theorem (Differential of a bounded multilinear map)"
    <a id="thm-9-3-2"></a>
    Every $\varphi \in L^{(n)}(E_1, \ldots, E_n; F)$ is differentiable at every
    $p = (p_1, \ldots, p_n) \in E_1 \times \cdots \times E_n$ with

    $$
    D\varphi(p)(h_1, \ldots, h_n) = \sum_{i=1}^{n}
    \varphi(p_1, \ldots, p_{i-1}, h_i, p_{i+1}, \ldots, p_n).
    $$

??? proof "Proof (Differential of a bounded multilinear map)"
    Write
    $\varphi(p + h) - \varphi(p) = \sum_{i=1}^{n}
    \varphi(p_1, \ldots, p_{i-1}, p_i + h_i - p_i, p_{i+1} + h_{i+1}, \ldots, p_n + h_n)
    - \varphi(p_1, \ldots, p_i, p_{i+1} + h_{i+1}, \ldots, p_n + h_n)$.
    Each summand is a telescoping sum
    $\sum_{j=1}^{i} [\varphi(p_1 + h_1, \ldots, p_{j-1} + h_{j-1}, h_j, p_{j+1} + h_{j+1}, \ldots, p_i + h_i, \ldots, p_n + h_n)
    - \varphi(p_1 + h_1, \ldots, p_j, h_j, p_{j+1} + h_{j+1}, \ldots)]$.
    Bound the norm of each bracket by
    $\|\varphi\| \cdot \|h_1\| \cdots \|h_{j-1}\| \cdot \|h_j\| \cdot \|h_{j+1}\| \cdots \|h_i\|
    \cdot \|h_{i+1}\| \cdots \|h_n\| \leq \|\varphi\| \cdot \|h\|^2$.
    Hence every summand in the outer sum is $O(\|h\|^2) = o(\|h\|)$,
    and the candidate linear map is
    $\sum_i \varphi(p_1, \ldots, h_i, \ldots, p_n)$.

!!! definition "Definition (Symmetric, polarisation)"
    <a id="def-9-3-3"></a>
    An $n$-linear $\varphi$ is **symmetric** if
    $\varphi(x_{\sigma(1)}, \ldots, x_{\sigma(n)}) = \varphi(x_1, \ldots, x_n)$
    for all $\sigma \in S_n$. A map $P : E \to F$ is a **homogeneous
    polynomial mapping of degree $n$** if it equals $\varphi(x, \ldots, x)$
    for some symmetric $\varphi$ (the **polarisation** of $P$).

!!! proposition "Proposition (Differential of a homogeneous polynomial)"
    <a id="prop-9-3-4"></a>
    Let $P : E \to F$ be a homogeneous polynomial mapping of degree $n$
    with bounded polarisation $\varphi$. Then $P$ is differentiable on $E$
    and

    $$
    DP(x)(h) = n\, \varphi(x, \ldots, x, h).
    $$

    In particular, on $E = K$ with $P(x) = x^n s$, $P'(x) = n\, x^{n-1} s$.

??? proof "Proof (Differential of a homogeneous polynomial)"
    Let $\Delta : E \to E^n$, $x \mapsto (x, \ldots, x)$. Then $P =
    \varphi \circ \Delta$. Both $\varphi$ (Thm 9-3-2) and $\Delta$
    (differential $(\cdot, 0, \ldots, 0) + \cdots + (0, \ldots, 0,
    \cdot)$) are differentiable, so $P$ is. By the chain rule,
    $DP(x)(h) = D\varphi(\Delta(x))(D\Delta(x)(h))
    = \sum_{i=1}^{n} \varphi(x, \ldots, h, \ldots, x) = n \varphi(x,
    \ldots, x, h)$ (by symmetry of $\varphi$).

!!! proposition "Proposition (Currying of bounded multilinear maps)"
    <a id="prop-9-3-5"></a>
    The identification

    $$
    L^{(n)}(E_1, \ldots, E_n; F) \;\cong\;
    L(E_1, L^{(n-1)}(E_2, \ldots, E_n; F))
    $$

    sending $\varphi$ to $\big((x_1, \ldots, x_i) \mapsto (x_{i+1}, \ldots, x_n)
    \mapsto \varphi(x_1, \ldots, x_n)\big)$ is a $K$-linear isometry.

    In particular, when each $E_i$ is finite-dimensional,
    $L^{(n)}(E_1, \ldots, E_n; F) = \mathrm{Hom}_K^{(n)}(E_1 \times \cdots
    \times E_n, F)$.

??? proof "Proof (Currying)"
    $K$-linearity of the map $\varphi \mapsto f(\varphi)$ is clear.
    For the isometry, compute $\|f(\varphi)\| = \sup \|f(\varphi)(x_1, \ldots, x_i)\|
    / (\|x_1\| \cdots \|x_n\|)$ and observe that
    $\|f(\varphi)(x_1, \ldots, x_i)\| = \sup_{(x_{i+1}, \ldots, x_n) \neq 0}
    \|\varphi(x_1, \ldots, x_n)\| / (\|x_{i+1}\| \cdots \|x_n\|)$. Iterating
    the supremum over all slots returns $\|\varphi\|$. Surjectivity: given
    $\psi \in L(E_1, L^{(n-1)}(E_2, \ldots, E_n; F))$, define
    $\varphi(x_1, \ldots, x_n) = \psi(x_1, \ldots, x_i)(x_{i+1}, \ldots, x_n)$.

## Convexity

!!! definition "Definition (Affine and convex combinations, hulls)"
    <a id="def-9-4-1"></a>
    Let $S \subseteq E$ be non-empty. An element
    $a_1 s_1 + \cdots + a_n s_n$ with $a_i \in K$ and
    $a_1 + \cdots + a_n = 1$ is an **affine combination**; $\mathrm{Aff}(S)$
    is the set of all such, and is the smallest affine subspace containing
    $S$. If $a_i \in \mathbb{R}_{\geq 0}$, it is a **convex combination**;
    $\mathrm{Conv}(S)$ is the convex hull, with
    $S \subseteq \mathrm{Conv}(S) \subseteq \mathrm{Aff}(S)$.

!!! definition "Definition (Affine subspace)"
    <a id="def-9-4-2"></a>
    A non-empty $S \subseteq E$ is an **affine subspace** if
    $S = \mathrm{Aff}(S)$. Equivalently, $S = p + F$ for a vector subspace
    $F$ and $p \in S$; the **associated vector space** $S - p = F$ does not
    depend on the choice of $p$.

!!! definition "Definition (Convex set)"
    <a id="def-9-4-3"></a>
    A non-empty $C \subseteq E$ is **convex** if for every
    $(x, y) \in C^2$ and $\lambda \in [0, 1]$ one has
    $\lambda x + (1 - \lambda) y \in C$. Equivalently, $C$ is closed under
    all convex combinations.

!!! proposition "Proposition (Examples of affine subspaces)"
    <a id="prop-9-4-4"></a>

    1. If $F$ is a vector subspace of $E$ and $p \in E$, then $p + F$ is
       affine.

    2. The solution set of a linear system $A x = b$ (with $A \in
       M_{m, p}(K)$, $b \in K^m$) is an affine subspace of $K^p$.

??? proof "Proof (Examples of affine subspaces)"
    (1) For any $(x_i, a_i)$ with $\sum a_i = 1$,
    $\sum a_i (p + x_i) = p \sum a_i + \sum a_i x_i = p + \sum a_i x_i \in
    p + F$. So $p + F$ is affine. Conversely, if $A$ is affine and
    $p, q \in A$, then $\frac{1}{2}(p + q) \in A$ and the vector
    $\frac{1}{2}(p - q) = p - \frac{1}{2}(p + q) \in A - p$; by induction
    $A - p$ is a vector subspace.
    (2) If $A x^{(i)} = b$ and $\sum a_i = 1$, then
    $A (\sum a_i x^{(i)}) = \sum a_i b = b$. So the solution set is
    closed under affine combinations.

## Mean Value Theorems

!!! theorem "Theorem (Mean value inequality)"
    <a id="thm-9-5-1"></a>
    Let $(F, \|\cdot\|_F)$ be a normed $\mathbb{R}$-vector space, $a < b$,
    and $f : [a, b] \to F$ continuous on $[a, b]$ and differentiable on
    $]a, b[$. Then

    $$
    \|f(b) - f(a)\|_F \leq (b - a)\, \sup_{t \in\, ]a, b[} \|f'(t)\|_F.
    $$

??? proof "Proof (Mean value inequality)"
    Assume $M := \sup_{]a,b[} \|f'\| < \infty$ (otherwise the inequality
    is trivial). Take any $\mu > M$, set $m = (a + b)/2$, and define
    $J = \{x \in [m, b] : \forall t \in [m, x],\, \|f(t) - f(m)\| \leq \mu(t - m)\}$.
    $J$ is non-empty ($m \in J$), closed, and of the form $[m, c]$. If
    $c < b$, then $f$ is differentiable at $c$ and the inequality
    $\|f(c + h) - f(c)\| \leq \|f'(c)\| h + o(h) \leq \mu h$ holds for $h$
    small enough. Then for $h > 0$ small,
    $\|f(c + h) - f(m)\| \leq \|f(c + h) - f(c)\| + \|f(c) - f(m)\|
    \leq \mu h + \mu(c - m) = \mu(c + h - m)$, so
    $[m, c + h] \subseteq J$, contradicting the definition of $c$. Hence
    $c = b$ and $\|f(b) - f(m)\| \leq \mu(b - m)$. By symmetry
    $\|f(m) - f(a)\| \leq \mu(m - a)$. Triangle inequality and
    $\mu \to M$ give the result.

??? proof "Proof (Vector-valued mean-value inequality)"
    Let $U \subseteq E$ be open, $(x, y) \in U^2$ with $[x, y] \subseteq U$,
    and $f : U \to F$ differentiable. Set $g(t) = f(tx + (1 - t)y)$ on
    $[0, 1]$. Then $g(0) = f(x)$, $g(1) = f(y)$, and
    $g'(t) = Df(g(t))(x - y)$. Apply the scalar mean-value inequality
    to each component: $\|f(x) - f(y)\| \leq \sup_{t \in (0, 1)} \|g'(t)\|
    = \sup_{z \in ]x, y[} \|Df(z)\| \cdot \|x - y\|_E$.

!!! theorem "Theorem (Critical points of differentiable functions)"
    <a id="thm-9-5-2"></a>
    If $p \in U$ is a local extremum of a differentiable
    $f : U \to \mathbb{R}$, then $Df(p) = 0$.

??? proof "Proof (Critical points)"
    A non-zero $Df(p)(h)$ would force the one-variable function
    $t \mapsto f(p + th) - f(p) = t\, Df(p)(h) + o(t)$ to change sign
    near $t = 0$, contradicting the extremum. Hence $Df(p)(h) = 0$ for
    all $h$, i.e. $Df(p) = 0$.

!!! theorem "Theorem (Rolle)"
    <a id="thm-9-5-3"></a>
    Let $f : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$, differentiable
    on $]a, b[$, with $f(a) = f(b)$. There exists $t \in\, ]a, b[$ with
    $f'(t) = 0$.

??? proof "Proof (Rolle)"
    By the extreme value theorem $f$ attains its maximum and minimum on
    the compact $[a, b]$. If both extrema occur at the endpoints, then
    $f \equiv$ constant on $[a, b]$ (since $f(a) = f(b)$) and any
    $t \in ]a, b[$ works. Otherwise one extremum is attained in the
    open interval $]a, b[$, and Thm 9-5-2 applies.

!!! theorem "Theorem (Lagrange mean value theorem)"
    <a id="thm-9-5-4"></a>
    Under the same hypotheses without the equality $f(a) = f(b)$, there is
    $\xi \in\, ]a, b[$ with $f(b) - f(a) = f'(\xi)(b - a)$.

??? proof "Proof (Lagrange)"
    Define $g(t) = f(b) - f(t) - C(b - t)$ with
    $C = -(f(b) - f(a))/(b - a)$. Then $g(a) = f(b) - f(a) - C(b - a)
    = 0 = g(b)$. By Rolle, $\exists \xi \in ]a, b[$ with
    $g'(\xi) = -f'(\xi) + C = 0$, i.e. $f'(\xi) = C = (f(b) - f(a))/(b - a)$.

!!! theorem "Theorem (Darboux)"
    <a id="thm-9-5-5"></a>
    The derivative $f'(I)$ of a differentiable $f : I \to \mathbb{R}$ on an
    open interval $I$ is itself an interval.

??? proof "Proof (Darboux)"
    For $a, b \in I$ with $a < b$, the function
    $g(t) := (f(t) - f(a))/(t - a)$ for $t \neq a$ and $g(a) := f'(a)$
    is continuous on $[a, b]$, so $g([a, b])$ is an interval. By the
    mean value theorem, $g([a, b]) \subseteq f'(I)$. The same argument
    applied to $h(t) := (f(t) - f(b))/(t - b)$ for $t \neq b$ and
    $h(b) := f'(b)$ gives $h([a, b]) \subseteq f'(I)$. Since
    $(f(b) - f(a))/(b - a)$ lies in both intervals, their union contains
    the whole interval between $f'(a)$ and $f'(b)$.

!!! theorem "Theorem (Gronwall inequality)"
    <a id="thm-9-5-6"></a>
    Let $f : [a, b] \to F$ and $g : [a, b] \to \mathbb{R}$ be differentiable
    on $]a, b[$ with $\|f'(t)\| \leq g'(t)$. Then

    $$
    \|f(b) - f(a)\|_F \leq g(b) - g(a).
    $$

??? proof "Proof (Gronwall)"
    Set $m = (a + b)/2$, $J = \{t \in [m, b] : \forall s \in [m, t],\,
    \|f(s) - f(m)\| \leq g(s) - g(m) + \varepsilon(s - m)\}$ for $\varepsilon > 0$.
    $J$ is closed in $[m, b]$, non-empty, hence $[m, c]$. If $c < b$, then by
    differentiability at $c$, for $h > 0$ small,
    $\|f(c + h) - f(c)\| \leq \|f'(c)\| h + \varepsilon h/2 \leq g'(c) h + \varepsilon h/2$
    and $g(c + h) - g(c) \geq g'(c) h - \varepsilon h/2$, hence
    $\|f(c + h) - f(c)\| \leq g(c + h) - g(c) + \varepsilon h$. Combining with the
    bound on $[m, c]$ via triangle inequality extends $J$ past $c$, a
    contradiction. Hence $c = b$ and
    $\|f(b) - f(m)\| \leq g(b) - g(m) + \varepsilon(b - m)$. By symmetry
    on $[a, m]$ and the triangle inequality,
    $\|f(b) - f(a)\| \leq g(b) - g(a) + \varepsilon(b - a)$. Let
    $\varepsilon \to 0$.

## Higher Differentials

!!! definition "Definition (Higher differentials)"
    <a id="def-9-6-1"></a>
    Let $f : U \subseteq E \to F$ and $p \in U$. By induction, $f$ is
    **$n$-times differentiable** at $p$ if it is differentiable on a
    neighbourhood of $p$ and $Df$ is $(n-1)$-times differentiable at $p$.
    The $n$-th differential

    $$
    D^n f(p) \in L^{(n)}(E, \ldots, E; F)
    $$

    sends $(h_1, \ldots, h_n)$ to
    $D^{n-1}(Df)(p)(h_1, \ldots, h_{n-1})(h_n)$. When $E = K$, we write
    $f^{(n)}(p) = D^n f(p)(1, \ldots, 1)$.

!!! definition "Definition (Symmetric group, transpositions)"
    <a id="def-9-6-2"></a>
    $S_X$ is the group of bijections of $X$ with composition; a **cycle**
    $(x_1\, \cdots\, x_n)$ sends $x_i \mapsto x_{i+1}$, $x_n \mapsto x_1$,
    and fixes other points. A **2-cycle** is a transposition; an
    **adjacent transposition** is $(i\; i+1)$.

!!! theorem "Theorem (Schwarz: $D^n f$ is symmetric)"
    <a id="thm-9-6-3"></a>
    If $f$ is $n$-times differentiable at $p$, then $D^n f(p)$ is symmetric:
    $D^n f(p)(h_{\sigma(1)}, \ldots, h_{\sigma(n)}) = D^n f(p)(h_1, \ldots,
    h_n)$ for all $\sigma \in S_n$.

??? proof "Proof (Schwarz)"
    **Case $n = 2$.** Set
    $g_h(k) := f(p + h + k) - f(p + h) - f(p + k) + f(p) - D^2 f(p)(h, k)$.
    Its differential is
    $Dg_h(k)(\ell) = Df(p + h + k)(\ell) - Df(p + k)(\ell) - D^2 f(p)(h, \ell)$.
    Differentiable at $k = 0$ and
    $\|Df(p + h + k)(\ell) - Df(p)(\ell) - D^2 f(p)(h + k, \ell)\|
    \leq \varepsilon \|h + k\|$, likewise for $p + k$. By the mean value
    inequality on $g_h$ (with $g_h(0) = 0$),
    $\|g_h(k)\| \leq 3\varepsilon \max\{\|h\|, \|k\|\}^2$. Swapping
    $h$ and $k$ gives the same with $D^2 f(p)(k, h)$, so
    $\|D^2 f(p)(h, k) - D^2 f(p)(k, h)\| \leq 6\varepsilon \max^2$. Plug
    in $h \to th$, $k \to tk$ to scale, divide by $t^2$ and let
    $t \to 0$ to obtain $D^2 f(p)(h, k) = D^2 f(p)(k, h)$.
    **Induction.** Any $\sigma \in S_n$ is a product of adjacent
    transpositions. If $\sigma$ moves only $\{1, \ldots, n-1\}$ or only
    $\{n-1, n\}$, the induction hypothesis (or the $n=2$ case applied to
    $D^{n-2} f$ when $\sigma = (n-1, n)$) gives the result. The general
    case follows by composition.

## Taylor's Formula

!!! theorem "Theorem (Taylor-Young)"
    <a id="thm-9-7-1"></a>
    Let $f : U \to F$ be $n$-times differentiable at $p \in U$. Then

    $$
    f(x) = f(p) + \sum_{k=1}^{n} \frac{1}{k!}\, D^k f(p)(x - p, \ldots, x - p)
    + o(\|x - p\|^n),\quad x \to p.
    $$

??? proof "Proof (Taylor-Young, induction)"
    $n = 0$: $f(x) = f(p) + o(1)$ is continuity.
    $n = 1$: $f(x) = f(p) + Df(p)(x - p) + o(\|x - p\|)$ is differentiability.
    From $n-1$ to $n$: set
    $g(x) := f(x) - \sum_{k=0}^{n} \frac{1}{k!} D^k f(p)(x - p)^{\otimes k}$
    (the convention is $D^0 f(p) = f(p)$). Then $g$ is differentiable
    on a neighbourhood of $p$ and
    $Dg(x)(h) = Df(x)(h) - \sum_{k=1}^{n} \frac{1}{(k-1)!} D^k f(p)(x - p,
    \ldots, x - p, h) = Df(x)(h) - \sum_{\ell=0}^{n-1} \frac{1}{\ell!}
    D^{\ell + 1} f(p)(x - p, \ldots, x - p, h)$. By the induction
    hypothesis applied to $Df$ at $p$,
    $Df(x) = \sum_{\ell=0}^{n-1} \frac{1}{\ell!} D^{\ell + 1} f(p)(x - p,
    \ldots, x - p) + o(\|x - p\|^{n-1})$, so
    $Dg(x) = o(\|x - p\|^{n-1})$. With $g(p) = 0$, the mean value
    inequality gives $\|g(x)\| \leq \varepsilon \|x - p\| \cdot \|x - p\|^{n-1}
    = \varepsilon \|x - p\|^n$ for $\|x - p\|$ small.

!!! theorem "Theorem (Taylor-Lagrange with remainder)"
    <a id="thm-9-7-2"></a>
    Let $f : [a, b] \to \mathbb{R}$ be $(n+1)$-times differentiable on
    $]a, b[$ with $f^{(k)}$ continuous on $[a, b]$ for $3 \leq k \leq n$.
    There is $\xi \in\, ]a, b[$ with

    $$
    f(b) - f(a) = \sum_{k=0}^{n} \frac{(b - a)^k}{k!}\, f^{(k)}(a)
    + \frac{f^{(n+1)}(\xi)\, (b - a)^{n+1}}{(n+1)!}.
    $$

??? proof "Proof (Taylor-Lagrange)"
    Set $g(t) = \sum_{k=0}^{n} \frac{(b - t)^k}{k!} f^{(k)}(t) - C
    \frac{(b - t)^{n+1}}{(n+1)!}$. Compute
    $g'(t) = -\sum_{k=0}^{n} \frac{(b - t)^{k-1}}{(k - 1)!} f^{(k)}(t)
    + \sum_{k=0}^{n} \frac{(b - t)^k}{k!} f^{(k+1)}(t) + C \frac{(b - t)^n}{n!}$.
    The first two sums telescope: $g'(t) = \frac{(b - t)^n}{n!}
    f^{(n+1)}(t) + C \frac{(b - t)^n}{n!}$.
    Choose $C$ such that $g(a) = g(b)$. By Rolle, $\exists \xi \in
    ]a, b[$ with $g'(\xi) = 0$, giving $C = -f^{(n+1)}(\xi)$. Substituting
    back:
    $g(b) = f(b)$ and $g(a) = \sum_{k=0}^{n} \frac{(b - a)^k}{k!} f^{(k)}(a)
    + \frac{f^{(n+1)}(\xi)}{(n+1)!} (b - a)^{n+1}$. Setting $g(a) = g(b)$
    gives the formula.

!!! theorem "Theorem (Vector-valued Taylor with integral remainder)"
    <a id="thm-9-7-3"></a>
    Let $f : U \to F$ be $(n+1)$-times differentiable, $p \in U$,
    $h \in E$ with $p + t h \in U$ for $t \in [0, 1]$. Setting
    $M = \sup_{t \in [0, 1]} \|D^{n+1} f(p + t h)\|$, we have

    $$
    \left\| f(p + h) - \sum_{k=0}^{n} \frac{1}{k!} D^k f(p)(h, \ldots, h)
    \right\|_F \leq \frac{M}{(n+1)!}\, \|h\|_E^{n+1}.
    $$

??? proof "Proof (Vector-valued Taylor)"
    Set $\phi(t) = f(p + th) + \sum_{k=1}^{n} \frac{(1 - t)^k}{k!}
    D^k f(p + th)(h, \ldots, h)$. Then $\phi(0) = \sum_{k=0}^{n}
    \frac{1}{k!} D^k f(p)(h, \ldots, h)$ and $\phi(1) = f(p + h)$.
    Differentiating and using the same telescoping as Taylor-Lagrange,
    $\phi'(t) = \frac{(1 - t)^n}{n!} D^{n+1} f(p + th)(h, \ldots, h)$.
    Hence $\|\phi'(t)\| \leq M \|h\|^{n+1} (1 - t)^n / n!$. By the Gronwall
    inequality,
    $\|\phi(1) - \phi(0)\| \leq M \|h\|^{n+1} \int_0^1 \frac{(1-t)^n}{n!}\, dt
    = \frac{M \|h\|^{n+1}}{(n+1)!}$.

## Banach Spaces

!!! proposition "Proposition (Absolute convergence implies convergence)"
    <a id="prop-9-8-1"></a>
    Let $(E, \|\cdot\|)$ be a **Banach space** (complete normed space) and
    $(x_n) \in E^{\mathbb{N}}$. If $\sum_n \|x_n\| < +\infty$, then
    $\sum_n x_n$ converges in $E$.

??? proof "Proof (Absolute convergence)"
    The partial sums $S_n = \sum_{k=0}^{n} x_k$ form a Cauchy sequence:
    for $n > m$, $\|S_n - S_m\| \leq \sum_{k=m+1}^{n} \|x_k\| \to 0$ as
    $m \to \infty$ by convergence of the numerical series. Completeness
    of $E$ implies $S_n$ converges.

!!! theorem "Theorem (Cauchy root test)"
    <a id="thm-9-8-2"></a>
    Let $r = \limsup_n \|x_n\|^{1/n} \in [0, +\infty]$.

    + If $r < 1$, then $\sum_n x_n$ converges absolutely.
    + If $r > 1$, then $\sum_n x_n$ diverges.

??? proof "Proof (Cauchy root test)"
    If $r < 1$, pick $\alpha \in (r, 1)$. By definition of $\limsup$,
    eventually $\|x_n\|^{1/n} \leq \alpha$, i.e. $\|x_n\| \leq \alpha^n$.
    The geometric series $\sum \alpha^n$ converges, so $\sum \|x_n\|$
    converges.
    If $r > 1$, pick $\beta \in (1, r)$. By definition of $\limsup$
    (which is the largest limit point), there is a subsequence
    $(n_k)$ with $\|x_{n_k}\|^{1/n_k} \to r$, so eventually
    $\|x_{n_k}\| \geq \beta^{n_k} \to \infty$. Hence $x_n \not\to 0$
    and the series diverges.

!!! theorem "Theorem (D'Alembert ratio test)"
    <a id="thm-9-8-3"></a>
    Let $(x_n) \in E^{\mathbb{N}}$.

    + If $\limsup_n \|x_{n+1}\| / \|x_n\| < 1$, then $\sum_n x_n$ converges
      absolutely.
    + If $\liminf_n \|x_{n+1}\| / \|x_n\| > 1$, then $\sum_n x_n$ diverges.

??? proof "Proof (D'Alembert ratio test)"
    (1) Pick $\alpha \in (\limsup, 1)$. Eventually
    $\|x_{n+1}\| \leq \alpha \|x_n\|$, so $\|x_n\| \leq \alpha^{n - N}
    \|x_N\|$ for $n \geq N$. The geometric series $\sum \alpha^{n-N}$
    dominates $\sum \|x_n\|$, which therefore converges.
    (2) Pick $\beta > 1$ with $\liminf > \beta$. Eventually
    $\|x_{n+1}\| \geq \beta \|x_n\|$, so $\|x_n\| \geq \beta^{n-N} \|x_N\|
    \to \infty$. In particular $x_n \not\to 0$, so the series diverges.

!!! theorem "Theorem (Completeness of $L^{(n)}$)"
    <a id="thm-9-8-4"></a>
    Let $(E_i, \|\cdot\|_i)$ be normed spaces over a complete valued field
    and $(F, \|\cdot\|_F)$ a Banach space. Then $L^{(n)}(E_1, \ldots, E_n; F)$
    is a Banach space.

??? proof "Proof (Completeness of $L^{(n)}$)"
    Let $(\varphi_k)$ be a Cauchy sequence in $L^{(n)}(E_1, \ldots, E_n; F)$.
    For any $(x_1, \ldots, x_n) \in \prod E_i$, $(\varphi_k(x_1, \ldots,
    x_n))$ is Cauchy in $F$ since
    $\|\varphi_k - \varphi_l\| \prod \|x_i\| \to 0$. By completeness
    $\varphi(x_1, \ldots, x_n) := \lim \varphi_k(x_1, \ldots, x_n)$ exists.
    $\varphi$ is $n$-linear by passing pointwise limits in the
    $K$-linearity equations. Boundedness:
    $\|\varphi(x_1, \ldots, x_n)\| = \lim \|\varphi_k(x_1, \ldots, x_n)\|
    \leq \limsup \|\varphi_k\| \prod \|x_i\|$, so
    $\varphi \in L^{(n)}$.
    Convergence: for $k$ large,
    $\|\varphi(x_1, \ldots, x_n) - \varphi_k(x_1, \ldots, x_n)\|
    = \lim_l \|\varphi_l - \varphi_k\| \prod \|x_i\|
    \leq \varepsilon_k \prod \|x_i\|$, so $\|\varphi - \varphi_k\| \leq
    \varepsilon_k \to 0$.

## Local Inversion and the Diffeomorphism Theorem

!!! definition "Definition (Contraction, fixed point)"
    <a id="def-9-9-1"></a>
    A map $f : (X, d) \to (X, d)$ is a **contraction** if it is
    $\alpha$-Lipschitzian for some $\alpha \in (0, 1)$. A point $x$ with
    $f(x) = x$ is a **fixed point** of $f$.

!!! theorem "Theorem (Banach fixed point)"
    <a id="thm-9-9-2"></a>
    A contraction on a non-empty complete metric space has a unique fixed
    point.

??? proof "Proof (Banach fixed point)"
    **Uniqueness.** If $a, b$ are fixed points, $d(a, b) = d(f(a), f(b))
    \leq \alpha d(a, b)$, so $d(a, b) = 0$.
    **Existence.** Start at any $x_0$ and iterate $x_{n+1} = f(x_n)$.
    $d(x_n, x_{n+1}) \leq \alpha^n d(x_0, x_1)$, so
    $\sum d(x_n, x_{n+1}) \leq d(x_0, x_1) / (1 - \alpha) < \infty$.
    By the same geometric series argument as Prop 9-8-1, $(x_n)$ is
    Cauchy. Completeness gives a limit $a$. Then $d(a, f(a)) \leq
    d(x_n, f(x_n)) + d(f(x_n), f(x_{n+1})) + \cdots = 0$ in the limit,
    so $f(a) = a$.

!!! definition "Definition (C^n-diffeomorphism)"
    <a id="def-9-9-3"></a>
    A bijection $f : U \to V$ between open subsets of normed spaces is a
    **$C^n$-diffeomorphism** ($n \in \mathbb{N} \cup \{\infty\}$) if both
    $f$ and $f^{-1}$ are of class $C^n$.

!!! theorem "Theorem (Local inverse / diffeomorphism)"
    <a id="thm-9-9-4"></a>
    Let $f : U \to F$ be of class $C^n$ on an open $U \subseteq E$ (with
    $E, F$ Banach over $\mathbb{R}$), and $p \in U$ such that
    $Df(p) \in L(E, F)$ is invertible. Then there is an open neighbourhood
    $V$ of $p$ on which $f|_V : V \to f(V)$ is a $C^n$-diffeomorphism, and

    $$
    D(f|_V)^{-1}(y) = Df(f|_V^{-1}(y))^{-1}.
    $$

??? proof "Proof (Local inverse)"
    Reduce to $E = F$, $p = 0$, $Df(0) = \mathrm{Id}_E$ by setting
    $\tilde f(x) = Df(p)^{-1}(f(p + x) - f(p))$. Then
    $\mu := \tilde f - \mathrm{Id}$ satisfies $D\mu(0) = 0$, so by
    continuity of $D \tilde f$ at $0$, for $\|x\| \leq r$ we have
    $\|D\mu(x)\| \leq 1/2$, hence $\mu$ is $1/2$-Lipschitz on $B(0, r)$.
    For $x, y \in B(0, r)$:
    $\|\tilde f(x) - \tilde f(y)\| \geq \|x - y\| - \|\mu(x) - \mu(y)\|
    \geq \|x - y\|/2$, so $\tilde f$ is injective. For $a \in B(0, 2r)$
    the map $\nu(x) = a - \mu(x)$ maps $B(0, r)$ into $B(0, r)$:
    $\|\nu(x)\| \leq \|a\| + \|\mu(x)\| \leq 2r/2 + r/2 = 3r/2$? Wait,
    $\nu(x) = a - \mu(x)$: if $\|a\| \leq 2r$ and $x \in B(0, r)$, then
    $\|\mu(x)\| \leq \|D\mu\| \cdot \|x\| \leq r/2$, so
    $\|\nu(x)\| \leq 2r + r/2$... let me redo: choose $r' < r$ such that
    for $a \in B(0, 2r')$ and $x \in B(0, r)$, $\|a - \mu(x)\| < r$;
    this works since $\|a - \mu(x)\| \leq \|a\| + \|\mu(x)\| \leq 2r' + r/2$.
    With $r' = r/2$ this gives $2r/2 + r/2 = 3r/2 > r$. So use
    $r' = r/4$: $\|a\| + \|\mu(x)\| \leq r/2 + r/2 = r$. Then $\nu$ is a
    contraction on $B(0, r)$ and by Banach's fixed point theorem admits
    a unique fixed point $g(a)$ with $\nu(g(a)) = a$, i.e.
    $\tilde f(g(a)) = a$. Continuity of $g$ comes from the implicit
    function behaviour; $C^n$-smoothness from a Neumann series argument
    for $D\tilde f^{-1}(y) = \sum_{k \geq 0} (\mathrm{Id} - D\tilde f(z))^k$.

## Uniform Convergence

!!! definition "Definition (Pointwise and uniform convergence)"
    <a id="def-9-10-1"></a>
    A sequence $(f_n)$ of maps $X \to Y$ (where $Y$ is a metric space)
    **converges uniformly** to $f$ if
    $\lim_{n \to \infty} \sup_{x \in X} d(f_n(x), f(x)) = 0$.
    Pointwise convergence requires the supremum only for each fixed $x$
    separately.

!!! theorem "Theorem (Uniform limit of continuous maps is continuous)"
    <a id="thm-9-10-2"></a>
    If each $f_n : X \to Y$ is continuous at $p$ and $f_n \to f$ uniformly,
    then $f$ is continuous at $p$. Likewise the uniform limit of uniformly
    continuous maps is uniformly continuous.

??? proof "Proof (Uniform limit preserves continuity)"
    Let $\varepsilon > 0$. By uniform convergence there is $n$ with
    $\sup_X d(f_n, f) < \varepsilon/3$. By continuity of $f_n$ at $p$ there
    is a neighbourhood $U$ of $p$ with $d(f_n(x), f_n(p)) < \varepsilon/3$
    for $x \in U$. Then for $x \in U$,
    $d(f(x), f(p)) \leq d(f(x), f_n(x)) + d(f_n(x), f_n(p)) + d(f_n(p), f(p))
    < \varepsilon$. So $f^{-1}(B(f(p), \varepsilon)) \supseteq U$.
    The uniformly continuous case: take $n$ with $\sup d(f_n, f) <
    \varepsilon/3$. For $d(x, y) < \delta$ (the $\varepsilon/3$ modulus
    of $f_n$), $d(f(x), f(y)) < \varepsilon$ by the same triangle.

!!! theorem "Theorem (Differentiation under uniform convergence)"
    <a id="thm-9-10-3"></a>
    Let $U \subseteq E$ be open, $(f_n)$ differentiable maps $U \to F$ with
    $f_n \to f$ uniformly and $Df_n \to g$ uniformly. If additionally a
    uniform $\delta$ controls the differentiability at $p$ (i.e.
    $\|f_n(x) - f_n(p) - Df_n(p)(x - p)\| \leq \delta(x)\|x - p\|$ with
    $\delta(x) \to 0$ as $x \to p$, uniformly in $n$), then $f$ is
    differentiable at $p$ with $Df(p) = g(p)$.

??? proof "Proof (Differentiation under uniform convergence)"
    For $x$ near $p$ and $n$ large,
    $\|f(x) - f(p) - g(p)(x - p)\| \leq \|(f(x) - f_n(x)) - (f(p) - f_n(p))\|
    + \|f_n(x) - f_n(p) - Df_n(p)(x - p)\|
    + \|Df_n(p)(x - p) - g(p)(x - p)\|$
    $\leq 2 d_n + \delta(x)\|x - p\| + \varepsilon_n \|x - p\|$.
    Divide by $\|x - p\|$ and let $x \to p$ (so $\delta(x) \to 0$), then
    $n \to \infty$ (so $d_n, \varepsilon_n \to 0$).

!!! proposition "Proposition (Normal convergence of series)"
    <a id="prop-9-10-4"></a>
    A series $\sum_n f_n$ of maps $U \to F$ (Banach) **converges normally**
    if $\sum_n \sup_{p \in U} \|f_n(p)\| < +\infty$. Normal convergence
    implies uniform convergence.

??? proof "Proof (Normal ⟹ uniform convergence)"
    The partial sums $g_n = \sum_{k=0}^{n} f_k$ are Cauchy in the
    sup-norm: for $m \geq n$,
    $\sup_x \|g_m(x) - g_n(x)\| \leq \sum_{k=n+1}^{m} \sup_x \|f_k(x)\|
    \to 0$ as $n \to \infty$. By completeness of the sup-metric
    space, $g_n$ converges uniformly to $g = \sum f_n$.

!!! proposition "Proposition (Convergence on path-connected open sets)"
    <a id="prop-9-10-5"></a>
    Let $U$ be path-connected, $F$ Banach, $(f_n)$ differentiable
    $U \to F$ with $Df_n$ uniformly convergent and $(f_n(p))$ convergent
    for some $p \in U$. Then $f_n$ converges pointwise on all of $U$ to a
    differentiable $f$ with $Df = \lim Df_n$.

??? proof "Proof (Convergence on path-connected)"
    First, on a convex neighbourhood $V$ of $p$, the mean value
    inequality gives
    $\|(f_n - f_m)(x) - (f_n - f_m)(p)\| \leq \sup_{V} \|Df_n - Df_m\|
    \cdot \|x - p\|$. So $f_n(x)$ is Cauchy in the Banach space $F$,
    hence converges to $f(x)$. Apply Thm 9-10-3 to get differentiability.
    For the general case, let $x \in U$ and $\gamma : [0, 1] \to U$ be a
    path from $p$ to $x$. Define $I = \{t \in [0, 1] : f_n(\gamma(s))
    \text{ converges for all } s \in [0, t]\}$. $I$ is an interval of the
    form $[0, c]$ or $[0, c[$ (closed by the convex case at the
    endpoint). If $I = [0, c[$, then the convergence extends to a small
    convex ball around $\gamma(c)$ by the same argument, contradicting
    the maximality. So $I = [0, 1]$ and $f_n(x)$ converges.

## Power Series

!!! definition "Definition (Power series, convergence radius)"
    <a id="def-9-11-1"></a>
    A **power series** centred at $b$ with coefficients $(s_n) \in E^N$ is
    the family of polynomial maps
    $S_n(z) = \sum_{l=0}^{n} (z - b)^l s_l$ together with the limit
    function $S(z) = \sum_{n=0}^{\infty} (z - b)^n s_n$ where defined. The
    **convergence radius** is

    $$
    R(S) = \left( \limsup_{n \to \infty} \|s_n\|^{1/n} \right)^{-1}
    \in [0, +\infty].
    $$

!!! proposition "Proposition (Convergence of a power series)"
    <a id="prop-9-11-2"></a>
    Let $S = \sum_{n=0}^{\infty} (z - b)^n s_n$ have radius $R$.

    1. If $|a - b| < R$, then $S(a)$ converges absolutely.
    2. If $|a - b| > R$, then $S(a)$ diverges.
    3. For any $r < R$, $S$ converges normally on the open ball $B(b, r)$,
       and the sum is continuous on $B(b, R)$.

??? proof "Proof (Convergence of a power series)"
    (1) $\limsup_n \|(a - b)^n s_n\|^{1/n} = |a - b| \limsup \|s_n\|^{1/n}
    < 1$ by assumption, so the Cauchy root test gives absolute convergence.
    (2) Same calculation gives $\limsup > 1$, so the terms do not tend
    to zero.
    (3) For $|a - b| < r < R$,
    $\|(a - b)^n s_n\| \leq r^n \|s_n\|$ and
    $\limsup r \|s_n\|^{1/n} < 1$, so $\sum r^n \|s_n\| < \infty$ by
    the root test. This is normal convergence on $B(b, r)$. The
    resulting function is continuous on each $B(b, r)$ (uniform limit of
    polynomials), hence on $B(b, R) = \bigcup_{r < R} B(b, r)$.

!!! theorem "Theorem (Termwise differentiation of a power series)"
    <a id="thm-9-11-3"></a>
    On $B(b, R)$ the function $S$ is differentiable and

    $$
    S'(z) = \sum_{n=1}^{\infty} n\, (z - b)^{n-1} s_n.
    $$

??? proof "Proof (Termwise differentiation)"
    Apply the differentiation-under-uniform-convergence criterion. By
    Lemma 9.11.6 (the binomial identity
    $z^n - z_0^n - n z_0^{n-1}(z - z_0) = (z - z_0)^2 \sum_{j=0}^{n-2}
    (n - 1 - j) z^j z_0^{n-2-j}$), for $z, z_0 \in B(b, r)$ with $r < R$,
    $\|(z - b)^n s_n - (z_0 - b)^n s_n - (z - z_0) n (z_0 - b)^{n-1} s_n\|
    \leq (z - z_0)^2 \cdot \frac{n(n-1)}{2} r^{n-2} \|s_n\|$.
    The series $\sum \frac{n(n-1)}{2} r^{n-2} \|s_n\|$ converges by the
    root test (limsup $r \|s_n\|^{1/n} < 1$). Hence the function
    $S(z) - S(z_0) - (z - z_0) \sum_{n \geq 1} n (z_0 - b)^{n-1} s_n$ is
    $o(|z - z_0|)$ uniformly in $n$, and Thm 9-10-3 applies.

!!! theorem "Theorem (Mertens: Cauchy product)"
    <a id="thm-9-11-4"></a>
    Let $\sum a_n$ and $\sum s_n$ converge to $b$ and $t$ respectively.

    1. If at least one converges absolutely, the Cauchy product
       $\sum_n (\sum_{k=0}^{n} a_k s_{n-k})$ converges to $b t$.
    2. If both converge absolutely, the Cauchy product converges absolutely.

??? proof "Proof (Mertens)"
    (1) Let $A_N = \sum_{k=0}^{N} a_k$, $S_N = \sum_{k=0}^{N} s_k$. The
    partial sum of the Cauchy product is
    $t_N := \sum_{n=0}^{N} \sum_{k=0}^{n} a_k s_{n-k}
    = \sum_{(k, l) : k + l \leq N} a_k s_l = A_N t + \sum_{k=0}^{N}
    a_k (S_{N - k} - t)$.
    So $t_N - bt = (A_N - b) t + \sum_{k=0}^{N} a_k (S_{N - k} - t)$.
    Suppose $\sum |a_n| < \infty$ (the other case is symmetric). For
    any $\varepsilon > 0$, choose $l$ large enough that
    $\sup_{m \leq l} \|S_m - t\| < \varepsilon$ (Cauchy in $F$). Split
    the sum: $\sum_{k=0}^{N} a_k (S_{N - k} - t) = \sum_{k=N - l}^{N}
    a_k (\ldots) + \sum_{k=0}^{N - l - 1} a_k (S_{N - k} - t)$. The first
    sum has norm at most $\varepsilon \sum |a_k|$ for $k \geq N - l$, but
    in fact it is bounded by $2 \sup \|S_m - t\| \cdot \alpha < 2\varepsilon \alpha$
    where $\alpha = \sum |a_k|$. The second sum is bounded by
    $\varepsilon \alpha$. Letting $N \to \infty$, the $\varepsilon$ can
    be made arbitrarily small. So $t_N \to bt$.
    (2) $\|t_N\| \leq \sum_{k=0}^{N} |a_k| \sum_{l=0}^{N} \|s_l\|
    \leq \alpha \beta$ (independent of $N$), so the partial sums are
    bounded; together with $\|t_N - t_M\| \to 0$ for $M > N$ by
    rearranging the sum as a Riemann sum against the sequence $a_n s_m$,
    one gets Cauchy, hence absolute, convergence.

## Directional Differentials

!!! definition "Definition (Directional derivative)"
    <a id="def-9-12-1"></a>
    Let $U \subseteq E$ be open, $f : U \to F$, $p \in U$, and
    $h \in E$. If

    $$
    \lim_{t \to 0} \frac{f(p + t h) - f(p)}{t}
    $$

    exists, it is the **directional derivative** of $f$ at $p$ along $h$,
    written $\partial_h f(p)$.

!!! remark "Remark (Relation to the Fréchet differential)"
    + If $f$ is Fréchet-differentiable at $p$, then $\partial_h f(p) =
      Df(p)(h)$ for every $h$.
    + The converse fails: existence of all directional derivatives does not
      imply Fréchet differentiability (the directional derivatives need not
      depend linearly on $h$).
    + The one-sided derivative $f'(p)$ along $h$ coincides with
      $Df(p)(h)$ when $E = K$, $h = 1$.

