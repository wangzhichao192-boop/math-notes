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
    <a id="def-big-o-and-little-o-along-a-filter"></a>

    Let $X$ be a set, $f : X \to V$ a map into a normed space, $g : X \to \mathbb{R}_{\geq 0}$, and $\mathcal{F}$ a filter on $X$.

    + $f(x) = O(g(x))$ along $\mathcal{F}$ means there exist $C > 0$ and
      $A \in \mathcal{F}$ with $\|f(x)\| \leq C\, g(x)$ for all $x \in A$.
    + $f(x) = o(g(x))$ along $\mathcal{F}$ means there exist
      $\varepsilon : X \to \mathbb{R}_{\geq 0}$ and $A \in \mathcal{F}$
      with $\lim_{\mathcal{F}} \varepsilon = 0$ and
      $\|f(x)\| \leq \varepsilon(x)\, g(x)$ for all $x \in A$.

!!! example "Example (Common filter specialisations)"
    <a id="ex-common-filter-specialisations"></a>

    + **Sequences**: $\mathcal{F}$ = cofinite filter on $\mathbb{N}$; write
      $x_n = O(b_n),\, n \to +\infty$.
    + **Neighbourhood filter** at $y_0 \in Y \subseteq X$: write
      $f(y) = O(g(y)),\, y \to y_0$.
    + **Tail filter** $[a, +\infty[$ on $\mathbb{R}$: write
      $f(y) = O(g(y)),\, y \to +\infty$.

!!! proposition "Proposition (Algebraic rules for Landau symbols)"
    <a id="prop-9-1-2"></a>
    <a id="prop-algebraic-rules-for-landau-symbols"></a>

    Along a filter $\mathcal{F}$:

    1. $f = o(g) \Rightarrow f = O(g)$.
    2. $f_1, f_2 = O(g) \Rightarrow f_1 + f_2 = O(g)$; same for $o$.
    3. $\lambda = O(g), f = O(h) \Rightarrow \lambda f = O(gh)$.
    4. $\lambda = O(g), f = o(h)$ or $\lambda = o(g), f = O(h)$
       $\Rightarrow \lambda f = o(gh)$.

??? proof "Proof"
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
    (4) Say $\lambda = O(g)$ and $f = o(h)$: pick $A_1, A_2 \in \mathcal{F}$, $C \geq 0$, and $\varepsilon$ with $|\lambda| \leq Cg$
    on $A_1$ and $\|f\| \leq \varepsilon h$ on $A_2$. Then on
    $A_1 \cap A_2$, $\|\lambda f\| \leq C \varepsilon\, gh$, and
    $\lim_{\mathcal{F}} C\varepsilon = 0$.

!!! notation "Landau symbols on a specified subset"
    <a id="notation-landau-symbols-on-a-specified-subset"></a>

    Without a filter, $f=O(g)$ on $Y$ means one constant works on all of $Y$. For an infinite $I\subseteq\mathbb N$, the sequence notation uses its tail filter: $x_n=O(b_n)$ means $\|x_n\|\leq Cb_n$ for every $n\in I$ beyond one threshold; little-o uses a sequence of factors tending to zero. The neighbourhood and infinity versions use the trace of the corresponding filter on the domain, so all estimates are asserted only for domain points.

## Differentiability

!!! definition "Definition (Differentiable map, differential)"
    <a id="def-9-2-1"></a>
    <a id="def-differentiable-map-differential"></a>

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
    <a id="prop-uniqueness-of-the-differential"></a>

    If $\varphi, \psi \in L(E, F)$ both satisfy
    $f(p + h) - f(p) - \varphi(h) = o(\|h\|)$ and similarly for $\psi$,
    then $\varphi = \psi$.

??? proof "Proof"
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
    <a id="ex-elementary-differentials"></a>

    + Constant map: $Df(x) = 0_F$.
    + Linear map $\varphi \in L(E, F)$: $D\varphi(x) = \varphi$.
    + Component map $f = (f_1, \ldots, f_n) : U \to F_1 \oplus \cdots \oplus F_n$: each $f_i$ is differentiable iff $f$ is, and
      $Df(p)(h) = (Df_1(p)(h), \ldots, Df_n(p)(h))$.
    + $E = K$: $f(p + h) - f(p) = h\, f'(p) + o(|h|)$, recovering the
      ordinary derivative.

!!! theorem "Theorem (Chain rule)"
    <a id="thm-9-2-3"></a>
    <a id="thm-chain-rule"></a>

    Let $U \subseteq E$, $V \subseteq F$ be open, $f : U \to F$ with
    $f(U) \subseteq V$, and $g : V \to G$. If $f$ is differentiable at $p$
    and $g$ is differentiable at $f(p)$, then $g \circ f$ is differentiable
    at $p$ and

    $$
    D(g \circ f)(p) = Dg(f(p)) \circ Df(p).
    $$

??? proof "Proof"
    Differentiable at $p$ gives
    $f(p + h) - f(p) - Df(p)(h) = o(\|h\|)$, so in particular
    $f(p + h) - f(p) = O(\|h\|)$. Differentiable at $f(p)$ gives
    $g(f(p + h)) - g(f(p)) - Dg(f(p))(f(p + h) - f(p)) = o(\|f(p + h) - f(p)\|) = o(\|h\|)$ (the second equality since
    $f(p + h) - f(p) = O(\|h\|)$). Then
    $Dg(f(p))(f(p + h) - f(p)) - Dg(f(p))(Df(p)(h)) = Dg(f(p))(f(p + h) - f(p) - Df(p)(h)) = O(o(\|h\|)) = o(\|h\|)$.
    Adding the two estimates:
    $g(f(p + h)) - g(f(p)) - Dg(f(p))(Df(p)(h)) = o(\|h\|)$.

!!! lemma "Lemma (Operator norm on arbitrarily small balls)"
    <a id="operator-norm-small-balls"></a>

    For $T\in L(E,F)$ and every $r>0$, the supremum of $\|Tx\|/\|x\|$ over $0<\|x\|<r$, or over $0<\|x\|\leq r$, equals $\|T\|$.

??? proof "Proof"
    Fix a scalar $a$ with $0<|a|<1$. Every nonzero $y$ can be moved into the smaller ball by multiplication by $a^N$. Linearity and homogeneity leave $\|T(a^Ny)\|/\|a^Ny\|$ equal to $\|Ty\|/\|y\|$. Thus restricting the supremum does not change it.

!!! proposition "Proposition (Differentiability implies continuity)"
    <a id="prop-differentiability-implies-continuity"></a>

    The defining estimate gives $f(p+h)-f(p)=O(\|h\|)$ and therefore continuity at $p$. For a scalar domain the differential is multiplication by $f'(p)$, and differentiability is equivalent to convergence of the punctured difference quotient to $f'(p)$.

## Multilinear Mappings

!!! definition "Definition (Multilinear map, norm)"
    <a id="def-9-3-1"></a>
    <a id="def-multilinear-map-norm"></a>

    Let $E_1, \ldots, E_n, F$ be $K$-modules. A map
    $\varphi : E_1 \times \cdots \times E_n \to F$ is **$n$-linear** if
    each slot, with the others fixed, is $K$-linear. The space of $n$-linear
    maps is $\mathrm{Hom}_K^{(n)}(E_1 \times \cdots \times E_n, F)$.

    For normed vector spaces, the bounded $n$-linear maps form
    $L^{(n)}(E_1, \ldots, E_n; F)$ with the norm

    $$
    \|\varphi\| = \sup_{\substack{x_i \in E_i \setminus \{0\} \\ i = 1, \ldots, n}}
    \frac{\|\varphi(x_1, \ldots, x_n)\|_F}{\|x_1\|_{E_1} \cdots \|x_n\|_{E_n}}.
    $$

!!! theorem "Theorem (Differential of a bounded multilinear map)"
    <a id="thm-9-3-2"></a>
    <a id="thm-differential-of-a-bounded-multilinear-map"></a>

    Every $\varphi \in L^{(n)}(E_1, \ldots, E_n; F)$ is differentiable at every
    $p = (p_1, \ldots, p_n) \in E_1 \times \cdots \times E_n$ with

    $$
    D\varphi(p)(h_1, \ldots, h_n) = \sum_{i=1}^{n}
    \varphi(p_1, \ldots, p_{i-1}, h_i, p_{i+1}, \ldots, p_n).
    $$

??? proof "Proof"
    Multilinearity expands $\varphi(p+h)$ as a finite sum over subsets of slots: put $h_i$ in the selected slots and $p_i$ in the others. The empty subset gives $\varphi(p)$, and the singleton subsets give the displayed candidate differential. Every remaining term contains at least two increments. Near $h=0$ the fixed and perturbed factors are bounded, so each such term has norm at most a fixed constant times $\|h\|^2$. Their finite sum is $o(\|h\|)$. The singleton expression is a bounded linear mapping of $h$, proving differentiability.

!!! definition "Definition (Symmetric, polarisation)"
    <a id="def-9-3-3"></a>
    <a id="def-symmetric-polarisation"></a>

    An $n$-linear $\varphi$ is **symmetric** if
    $\varphi(x_{\sigma(1)}, \ldots, x_{\sigma(n)}) = \varphi(x_1, \ldots, x_n)$
    for all $\sigma \in S_n$. A map $P : E \to F$ is a **homogeneous
    polynomial mapping of degree $n$** if it equals $\varphi(x, \ldots, x)$
    for some symmetric $\varphi$ (the **polarisation** of $P$).

!!! proposition "Proposition (Differential of a homogeneous polynomial)"
    <a id="prop-9-3-4"></a>
    <a id="prop-differential-of-a-homogeneous-polynomial"></a>

    Let $P : E \to F$ be a homogeneous polynomial mapping of degree $n$
    with bounded polarisation $\varphi$. Then $P$ is differentiable on $E$
    and

    $$
    DP(x)(h) = n\, \varphi(x, \ldots, x, h).
    $$

    In particular, on $E = K$ with $P(x) = x^n s$, $P'(x) = n\, x^{n-1} s$.

??? proof "Proof"
    Let $\Delta : E \to E^n$, $x \mapsto (x, \ldots, x)$. Then $P = \varphi \circ \Delta$. Both $\varphi$ ([Theorem](#thm-differential-of-a-bounded-multilinear-map)) and $\Delta$
    (differential $(\cdot, 0, \ldots, 0) + \cdots + (0, \ldots, 0, \cdot)$) are differentiable, so $P$ is. By the chain rule,
    $DP(x)(h) = D\varphi(\Delta(x))(D\Delta(x)(h)) = \sum_{i=1}^{n} \varphi(x, \ldots, h, \ldots, x) = n \varphi(x, \ldots, x, h)$ (by symmetry of $\varphi$).

!!! proposition "Proposition (Currying of bounded multilinear maps)"
    <a id="prop-9-3-5"></a>
    <a id="prop-currying-of-bounded-multilinear-maps"></a>

    The identification

    $$
    L^{(n)}(E_1, \ldots, E_n; F) \;\cong\;
    L(E_1, L^{(n-1)}(E_2, \ldots, E_n; F))
    $$

    sending $\varphi$ to $\big((x_1, \ldots, x_i) \mapsto (x_{i+1}, \ldots, x_n) \mapsto \varphi(x_1, \ldots, x_n)\big)$ is a $K$-linear isometry.

    In particular, when each $E_i$ is finite-dimensional,
    $L^{(n)}(E_1, \ldots, E_n; F) = \mathrm{Hom}_K^{(n)}(E_1 \times \cdots \times E_n, F)$.

??? proof "Proof"
    $K$-linearity of the map $\varphi \mapsto f(\varphi)$ is clear.
    For the isometry, compute $\|f(\varphi)\| = \sup \|f(\varphi)(x_1, \ldots, x_i)\| / (\|x_1\| \cdots \|x_n\|)$ and observe that
    $\|f(\varphi)(x_1, \ldots, x_i)\| = \sup_{(x_{i+1}, \ldots, x_n) \neq 0} \|\varphi(x_1, \ldots, x_n)\| / (\|x_{i+1}\| \cdots \|x_n\|)$. Iterating
    the supremum over all slots returns $\|\varphi\|$. Surjectivity: given
    $\psi \in L(E_1, L^{(n-1)}(E_2, \ldots, E_n; F))$, define
    $\varphi(x_1, \ldots, x_n) = \psi(x_1, \ldots, x_i)(x_{i+1}, \ldots, x_n)$.

!!! example "Example (Multilinear mappings over a ring)"
    <a id="ex-multilinear-mappings-over-a-ring"></a>

    Multiplication $K\times K\to K$, the form $(x,y)\mapsto\sum_i x_iy_i$ on $K^n$, and $(a_1,\ldots,a_n)\mapsto a_1\cdots a_n$ are respectively bilinear, bilinear and $n$-linear. These are algebraic definitions over a commutative unital ring; norms are added only for valued fields.

!!! proposition "Proposition (Currying in any number of slots)"
    <a id="prop-currying-in-any-number-of-slots"></a>

    For $1\leq i<n$, currying identifies $L^{(n)}(E_1,\ldots,E_n;F)$ isometrically with $L^{(i)}(E_1,\ldots,E_i;L^{(n-i)}(E_{i+1},\ldots,E_n;F))$. The inverse sends $\psi$ to $(x_1,\ldots,x_n)\mapsto\psi(x_1,\ldots,x_i)(x_{i+1},\ldots,x_n)$; this is multilinear and bounded with the same norm. Thus both directions of the identification preserve all slots. Induction using the boundedness of linear maps on finite-dimensional domains proves that every multilinear mapping on finite-dimensional factors is bounded.

## Convexity

!!! definition "Definition (Affine and convex combinations, hulls)"
    <a id="def-9-4-1"></a>
    <a id="def-affine-and-convex-combinations-hulls"></a>

    Let $S \subseteq E$ be non-empty. An element
    $a_1 s_1 + \cdots + a_n s_n$ with $a_i \in K$ and
    $a_1 + \cdots + a_n = 1$ is an **affine combination**; $\mathrm{Aff}(S)$
    is the set of all such, and is the smallest affine subspace containing
    $S$. If $a_i \in \mathbb{R}_{\geq 0}$, it is a **convex combination**;
    $\mathrm{Conv}(S)$ is the convex hull, with
    $S \subseteq \mathrm{Conv}(S) \subseteq \mathrm{Aff}(S)$.

!!! definition "Definition (Affine subspace)"
    <a id="def-9-4-2"></a>
    <a id="def-affine-subspace"></a>

    A non-empty $S \subseteq E$ is an **affine subspace** if
    $S = \mathrm{Aff}(S)$. Equivalently, $S = p + F$ for a vector subspace
    $F$ and $p \in S$; the **associated vector space** $S - p = F$ does not
    depend on the choice of $p$.

!!! definition "Definition (Convex set)"
    <a id="def-9-4-3"></a>
    <a id="def-convex-set"></a>

    A non-empty $C \subseteq E$ is **convex** if for every
    $(x, y) \in C^2$ and $\lambda \in [0, 1]$ one has
    $\lambda x + (1 - \lambda) y \in C$. Equivalently, $C$ is closed under
    all convex combinations.

!!! proposition "Proposition (Examples of affine subspaces)"
    <a id="prop-9-4-4"></a>

    <a id="prop-examples-of-affine-subspaces"></a>

    1. If $F$ is a vector subspace of $E$ and $p \in E$, then $p + F$ is
       affine.

    2. A nonempty solution set of a linear system $A x = b$ (with $A \in M_{m, p}(K)$, $b \in K^m$) is an affine subspace of $K^p$.

??? proof "Proof"
    For $\sum a_i=1$, $\sum a_i(p+x_i)=p+\sum a_ix_i\in p+F$. Conversely, for an affine $A$ and $p\in A$, any linear combination of vectors $x_i-p$ equals $\big(\sum b_ix_i+(1-\sum b_i)p\big)-p\in A-p$. Thus $A-p$ is a vector subspace, over every field, without dividing by two. If $q\in A$, then $q-p\in A-p$ and translation by this vector preserves that subspace, so $A-q=A-p$.

    For a nonempty solution set $Ax=b$, choose $x_0$ in it. Then $Ax=b$ exactly when $x-x_0\in\ker A$, so the set is $x_0+\ker A$. Equivalently, apply $A$ to an affine combination and use that its coefficients sum to one.

!!! proposition "Proposition (Affine and convex hulls)"
    <a id="affine-convex-hulls"></a>

    For nonempty $S$ and $p\in S$, $\operatorname{Aff}(S)=p+\operatorname{Span}_K(S-p)$. It is the least affine subspace containing $S$. The convex hull is the least convex set containing $S$; the empty set is allowed as a convex set and has empty convex hull. If affine subspaces are required to be nonempty, the empty hull is treated separately.

??? proof "Proof"
    An affine combination $\sum a_is_i$, with $\sum a_i=1$, differs from $p$ by $\sum a_i(s_i-p)$. Conversely, $p+\sum b_i(s_i-p)=\sum b_is_i+(1-\sum b_i)p$ is an affine combination. Every affine subspace containing $S$ contains these combinations, proving minimality.

    To derive closure under arbitrary convex combinations from closure under two-point combinations, induct on the number of terms. If the last coefficient equals one there is nothing to prove. Otherwise normalize the preceding coefficients by $1-a_n$, use induction, and combine the resulting point with $s_n$ with weights $1-a_n,a_n$. Flattening convex combinations proves that the convex hull is convex and proves its minimality.

!!! example "Example (Linear equations with vector-valued unknowns)"
    <a id="ex-linear-equations-with-vector-valued-unknowns"></a>

    For a real $m\times p$ matrix $A$ and $b\in E^m$, the solution set in $E^p$ of $Ax=b$ is closed under affine combinations, because $A\sum a_ix_i=(\sum a_i)b=b$. If it is nonempty, choosing one solution $x_0$ identifies it with $x_0+\ker A$. A system without solutions has empty solution set.

## Mean Value Theorems

!!! theorem "Theorem (Mean value inequality)"
    <a id="thm-9-5-1"></a>
    <a id="thm-mean-value-inequality"></a>

    Let $(F, \|\cdot\|_F)$ be a normed $\mathbb{R}$-vector space, $a < b$,
    and $f : [a, b] \to F$ continuous on $[a, b]$ and differentiable on
    $]a, b[$. Then

    $$
    \|f(b) - f(a)\|_F \leq (b - a)\, \sup_{t \in\, ]a, b[} \|f'(t)\|_F.
    $$

??? proof "Proof"
    Assume $M := \sup_{]a,b[} \|f'\| < \infty$ (otherwise the inequality
    is trivial). Take any $\mu > M$, set $m = (a + b)/2$, and define
    $J = \{x \in [m, b] : \forall t \in [m, x],\, \|f(t) - f(m)\| \leq \mu(t - m)\}$.
    $J$ is non-empty ($m \in J$), closed, and of the form $[m, c]$. If
    $c < b$, then $f$ is differentiable at $c$ and the inequality
    $\|f(c + h) - f(c)\| \leq \|f'(c)\| h + o(h) \leq \mu h$ holds for $h$
    small enough. Then for $h > 0$ small,
    $\|f(c + h) - f(m)\| \leq \|f(c + h) - f(c)\| + \|f(c) - f(m)\| \leq \mu h + \mu(c - m) = \mu(c + h - m)$, so
    $[m, c + h] \subseteq J$, contradicting the definition of $c$. Hence
    $c = b$ and $\|f(b) - f(m)\| \leq \mu(b - m)$. By symmetry
    $\|f(m) - f(a)\| \leq \mu(m - a)$. Triangle inequality and
    $\mu \to M$ give the result.

??? proof "Proof"
    Set $g(t)=f(x+t(y-x))$. Then $g(0)=f(x)$, $g(1)=f(y)$ and $g'(t)=Df(x+t(y-x))(y-x)$. The vector-valued interval mean value inequality applied to $g$ gives the segment bound. This also covers infinite-dimensional targets and does not require a scalar component decomposition.

!!! theorem "Theorem (Critical points of differentiable functions)"
    <a id="thm-9-5-2"></a>
    <a id="thm-critical-points-of-differentiable-functions"></a>

    If $p \in U$ is a local extremum of a differentiable
    $f : U \to \mathbb{R}$, then $Df(p) = 0$.

??? proof "Proof"
    A non-zero $Df(p)(h)$ would force the one-variable function
    $t \mapsto f(p + th) - f(p) = t\, Df(p)(h) + o(t)$ to change sign
    near $t = 0$, contradicting the extremum. Hence $Df(p)(h) = 0$ for
    all $h$, i.e. $Df(p) = 0$.

!!! theorem "Theorem (Rolle)"
    <a id="thm-9-5-3"></a>
    <a id="thm-rolle"></a>

    Let $f : [a, b] \to \mathbb{R}$ be continuous on $[a, b]$, differentiable
    on $]a, b[$, with $f(a) = f(b)$. There exists $t \in\, ]a, b[$ with
    $f'(t) = 0$.

??? proof "Proof"
    By the extreme value theorem $f$ attains its maximum and minimum on
    the compact $[a, b]$. If both extrema occur at the endpoints, then
    $f \equiv$ constant on $[a, b]$ (since $f(a) = f(b)$) and any
    $t \in ]a, b[$ works. Otherwise one extremum is attained in the
    open interval $]a, b[$, and [Theorem](#thm-critical-points-of-differentiable-functions) applies.

!!! theorem "Theorem (Lagrange mean value theorem)"
    <a id="thm-9-5-4"></a>
    <a id="thm-lagrange-mean-value-theorem"></a>

    Under the same hypotheses without the equality $f(a) = f(b)$, there is
    $\xi \in\, ]a, b[$ with $f(b) - f(a) = f'(\xi)(b - a)$.

??? proof "Proof"
    Put $C=(f(b)-f(a))/(b-a)$ and $g(t)=f(b)-f(t)-C(b-t)$. Then $g(a)=g(b)=0$. Rolle gives $-f'(\xi)+C=0$ for an interior $\xi$, which is the asserted formula.

!!! theorem "Theorem (Darboux)"
    <a id="thm-9-5-5"></a>
    <a id="thm-darboux"></a>

    The derivative $f'(I)$ of a differentiable $f : I \to \mathbb{R}$ on an
    open interval $I$ is itself an interval.

??? proof "Proof"
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
    <a id="thm-gronwall-inequality"></a>

    Let $f : [a, b] \to F$ and $g : [a, b] \to \mathbb{R}$ be differentiable
    on $]a, b[$ with $\|f'(t)\| \leq g'(t)$. Then

    $$
    \|f(b) - f(a)\|_F \leq g(b) - g(a).
    $$

??? proof "Proof"
    Set $m = (a + b)/2$, $J = \{t \in [m, b] : \forall s \in [m, t],\, \|f(s) - f(m)\| \leq g(s) - g(m) + \varepsilon(s - m)\}$ for $\varepsilon > 0$.
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

!!! definition "Definition (Local extrema)"
    <a id="local-extrema"></a>

    A real function has a local maximum at $p$ if $f(x)\leq f(p)$ throughout some neighbourhood of $p$ in its domain. Replace the inequality by $\geq$ for a local minimum. Either is a local extremum. The critical-point theorem applies when $p$ is an interior point of a real normed domain.

!!! corollary "Corollary (Mean value inequality on a segment)"
    <a id="segment-mean-value"></a>

    If $[x,y]\subseteq U$ and $f:U\to F$ is differentiable between real normed spaces, then

    $$
    \|f(y)-f(x)\|\leq\|y-x\|\sup_{0<t<1}\|Df(x+t(y-x))\|.
    $$

    Indeed $g(t)=f(x+t(y-x))$ has derivative $Df(x+t(y-x))(y-x)$; apply the interval inequality directly to this vector-valued curve. In particular a uniform derivative bound on a convex set gives a Lipschitz bound there.

## Higher Differentials

!!! definition "Definition (Higher differentials)"
    <a id="def-9-6-1"></a>
    <a id="def-higher-differentials"></a>

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
    <a id="def-symmetric-group-transpositions"></a>

    $S_X$ is the group of bijections of $X$ with composition; a **cycle**
    $(x_1\, \cdots\, x_n)$ sends $x_i \mapsto x_{i+1}$, $x_n \mapsto x_1$,
    and fixes other points. A **2-cycle** is a transposition; an
    **adjacent transposition** is $(i\; i+1)$.

!!! theorem "Theorem (Schwarz: $D^n f$ is symmetric)"
    <a id="thm-9-6-3"></a>
    <a id="thm-schwarz-is-symmetric"></a>

    For real normed spaces, if $f$ is $n$-times differentiable at $p$, then $D^n f(p)$ is symmetric:
    $D^n f(p)(h_{\sigma(1)}, \ldots, h_{\sigma(n)}) = D^n f(p)(h_1, \ldots, h_n)$ for all $\sigma \in S_n$.

??? proof "Proof"
    **Case $n = 2$.** Set
    $g_h(k) := f(p + h + k) - f(p + h) - f(p + k) + f(p) - D^2 f(p)(h, k)$.
    Its differential is
    $Dg_h(k)(\ell) = Df(p + h + k)(\ell) - Df(p + k)(\ell) - D^2 f(p)(h, \ell)$.
    Differentiable at $k = 0$ and
    $\|Df(p + h + k)(\ell) - Df(p)(\ell) - D^2 f(p)(h + k, \ell)\| \leq \varepsilon \|h + k\|$, likewise for $p + k$. By the mean value
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

!!! notation "Iterated differentials and differentiability classes"
    <a id="notation-iterated-differentials-and-differentiability-classes"></a>

    Set $D^0f=f$. Differentiability of order $n$ is defined recursively using $Df$ and the currying identification. In particular,

    $$
    D^nf(p)(h_1,\ldots,h_n)=D^i(D^{n-i}f)(p)(h_1,\ldots,h_i)(h_{i+1},\ldots,h_n).
    $$

    Being $n$ times differentiable and being of class $C^n$ are distinguished: $C^n$ additionally requires continuity of $D^nf$. A smooth mapping is of class $C^n$ for every finite $n$.

!!! proposition "Proposition (Orbits, cycles and adjacent transpositions)"
    <a id="permutation-cycle-decomposition"></a>

    A finite orbit of size $d$ under a permutation $\sigma$ is $\{x,\sigma x,\ldots,\sigma^{d-1}x\}$ with $\sigma^dx=x$. A permutation of a finite set is a product of its disjoint orbit cycles and consequently a product of transpositions. In $S_n$ it is a product of adjacent transpositions.

??? proof "Proof"
    Choose the least positive return time $l$. Before time $l$ the iterates are distinct. Division of any integer exponent by $l$ reduces it to a remainder between zero and $l-1$, so the orbit has exactly $l=d$ elements. Orbits partition the finite set, and their cycles commute because their supports are disjoint.

    The identity $(x_1\cdots x_d)=(x_1x_2)\circ(x_2x_3)\circ\cdots\circ(x_{d-1}x_d)$ expresses a cycle as transpositions. For $j<k$, move $j$ successively to $k-1$, transpose $k-1,k$, and undo the earlier moves. This writes $(jk)$ as $(j,j+1)\circ\cdots\circ(k-1,k)\circ\cdots\circ(j,j+1)$, proving the adjacent version.

!!! remark "Remark (Field hypothesis in the symmetry proof)"
    <a id="rem-field-hypothesis-in-the-symmetry-proof"></a>

    The source places Schwarz's theorem in the general valued-field discussion, but its displayed proof invokes the mean value inequality along real segments. The proof given here establishes the theorem for real normed spaces (and complex normed spaces by their underlying real spaces). The same argument does not establish that assertion over an arbitrary nonarchimedean field.

## Taylor's Formula

!!! theorem "Theorem (Taylor-Young)"
    <a id="thm-9-7-1"></a>
    <a id="thm-taylor-young"></a>

    Let $f : U \to F$ between real normed spaces be $n$-times differentiable at $p \in U$. Then

    $$
    f(x) = f(p) + \sum_{k=1}^{n} \frac{1}{k!}\, D^k f(p)(x - p, \ldots, x - p)
    + o(\|x - p\|^n),\quad x \to p.
    $$

??? proof "Proof"
    $n = 0$: $f(x) = f(p) + o(1)$ is continuity.
    $n = 1$: $f(x) = f(p) + Df(p)(x - p) + o(\|x - p\|)$ is differentiability.
    From $n-1$ to $n$: set
    $g(x) := f(x) - \sum_{k=0}^{n} \frac{1}{k!} D^k f(p)(x - p)^{\otimes k}$
    (the convention is $D^0 f(p) = f(p)$). Then $g$ is differentiable
    on a neighbourhood of $p$ and
    $Dg(x)(h) = Df(x)(h) - \sum_{k=1}^{n} \frac{1}{(k-1)!} D^k f(p)(x - p, \ldots, x - p, h) = Df(x)(h) - \sum_{\ell=0}^{n-1} \frac{1}{\ell!} D^{\ell + 1} f(p)(x - p, \ldots, x - p, h)$. By the induction
    hypothesis applied to $Df$ at $p$,
    $Df(x) = \sum_{\ell=0}^{n-1} \frac{1}{\ell!} D^{\ell + 1} f(p)(x - p, \ldots, x - p) + o(\|x - p\|^{n-1})$, so
    $Dg(x) = o(\|x - p\|^{n-1})$. With $g(p) = 0$, the mean value
    inequality gives $\|g(x)\| \leq \varepsilon \|x - p\| \cdot \|x - p\|^{n-1} = \varepsilon \|x - p\|^n$ for $\|x - p\|$ small.

!!! theorem "Theorem (Taylor-Lagrange with remainder)"
    <a id="thm-9-7-2"></a>
    <a id="thm-taylor-lagrange-with-remainder"></a>

    Let $f : [a, b] \to \mathbb{R}$ be $(n+1)$-times differentiable on
    $]a, b[$ with $f^{(k)}$ continuous on $[a, b]$ for $0 \leq k \leq n$.
    There is $\xi \in\, ]a, b[$ with

    $$
    f(b) = \sum_{k=0}^{n} \frac{(b - a)^k}{k!}\, f^{(k)}(a)
    + \frac{f^{(n+1)}(\xi)\, (b - a)^{n+1}}{(n+1)!}.
    $$

??? proof "Proof"
    Set $g(t) = \sum_{k=0}^{n} \frac{(b - t)^k}{k!} f^{(k)}(t) - C \frac{(b - t)^{n+1}}{(n+1)!}$. Compute
    $g'(t) = -\sum_{k=0}^{n} \frac{(b - t)^{k-1}}{(k - 1)!} f^{(k)}(t) + \sum_{k=0}^{n} \frac{(b - t)^k}{k!} f^{(k+1)}(t) + C \frac{(b - t)^n}{n!}$.
    The first two sums telescope: $g'(t) = \frac{(b - t)^n}{n!} f^{(n+1)}(t) + C \frac{(b - t)^n}{n!}$.
    Choose $C$ such that $g(a) = g(b)$. By Rolle, $\exists \xi \in ]a, b[$ with $g'(\xi) = 0$, giving $C = -f^{(n+1)}(\xi)$. Substituting
    back:
    $g(b) = f(b)$ and $g(a) = \sum_{k=0}^{n} \frac{(b - a)^k}{k!} f^{(k)}(a) + \frac{f^{(n+1)}(\xi)}{(n+1)!} (b - a)^{n+1}$. Setting $g(a) = g(b)$
    gives the formula.

!!! theorem "Theorem (Vector-valued Taylor remainder estimate)"
    <a id="thm-9-7-3"></a>
    <a id="thm-vector-valued-taylor-remainder-estimate"></a>

    Let $f : U \to F$ between real normed spaces be $(n+1)$-times differentiable, $p \in U$,
    $h \in E$ with $p + t h \in U$ for $t \in [0, 1]$. Setting
    $M = \sup_{t \in [0, 1]} \|D^{n+1} f(p + t h)\|$, we have

    $$
    \left\| f(p + h) - \sum_{k=0}^{n} \frac{1}{k!} D^k f(p)(h, \ldots, h)
    \right\|_F \leq \frac{M}{(n+1)!}\, \|h\|_E^{n+1}.
    $$

??? proof "Proof"
    Set $\phi(t) = f(p + th) + \sum_{k=1}^{n} \frac{(1 - t)^k}{k!} D^k f(p + th)(h, \ldots, h)$. Then $\phi(0) = \sum_{k=0}^{n} \frac{1}{k!} D^k f(p)(h, \ldots, h)$ and $\phi(1) = f(p + h)$.
    Differentiating and using the same telescoping as Taylor-Lagrange,
    $\phi'(t) = \frac{(1 - t)^n}{n!} D^{n+1} f(p + th)(h, \ldots, h)$.
    Hence $\|\phi'(t)\| \leq M \|h\|^{n+1} (1 - t)^n / n!$. By the Gronwall
    inequality,
    $\|\phi(1) - \phi(0)\| \leq M \|h\|^{n+1} \int_0^1 \frac{(1-t)^n}{n!}\, dt = \frac{M \|h\|^{n+1}}{(n+1)!}$.

## Banach Spaces

!!! proposition "Proposition (Absolute convergence implies convergence)"
    <a id="prop-9-8-1"></a>
    <a id="prop-absolute-convergence-implies-convergence"></a>

    Let $(E, \|\cdot\|)$ be a **Banach space** (complete normed space) and
    $(x_n) \in E^{\mathbb{N}}$. If $\sum_n \|x_n\| < +\infty$, then
    $\sum_n x_n$ converges in $E$.

??? proof "Proof"
    The partial sums $S_n = \sum_{k=0}^{n} x_k$ form a Cauchy sequence:
    for $n > m$, $\|S_n - S_m\| \leq \sum_{k=m+1}^{n} \|x_k\| \to 0$ as
    $m \to \infty$ by convergence of the numerical series. Completeness
    of $E$ implies $S_n$ converges.

!!! theorem "Theorem (Cauchy root test)"
    <a id="thm-9-8-2"></a>
    <a id="thm-cauchy-root-test"></a>

    Let $r = \limsup_n \|x_n\|^{1/n} \in [0, +\infty]$.

    + If $r < 1$, then $\sum_n x_n$ converges absolutely.
    + If $r > 1$, then $\sum_n x_n$ diverges.

??? proof "Proof"
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
    <a id="thm-d-alembert-ratio-test"></a>

    Let $(x_n) \in E^{\mathbb{N}}$.

    + If $\limsup_n \|x_{n+1}\| / \|x_n\| < 1$, then $\sum_n x_n$ converges
      absolutely.
    + If $\liminf_n \|x_{n+1}\| / \|x_n\| > 1$, then $\sum_n x_n$ diverges.

??? proof "Proof"
    (1) Pick $\alpha \in (\limsup, 1)$. Eventually
    $\|x_{n+1}\| \leq \alpha \|x_n\|$, so $\|x_n\| \leq \alpha^{n - N} \|x_N\|$ for $n \geq N$. The geometric series $\sum \alpha^{n-N}$
    dominates $\sum \|x_n\|$, which therefore converges.
    (2) Pick $\beta > 1$ with $\liminf > \beta$. Eventually
    $\|x_{n+1}\| \geq \beta \|x_n\|$, so $\|x_n\| \geq \beta^{n-N} \|x_N\| \to \infty$. In particular $x_n \not\to 0$, so the series diverges.

!!! theorem "Theorem (Completeness of $L^{(n)}$)"
    <a id="thm-9-8-4"></a>
    <a id="thm-completeness-of"></a>

    Let $(E_i, \|\cdot\|_i)$ be normed spaces over a complete valued field
    and $(F, \|\cdot\|_F)$ a Banach space. Then $L^{(n)}(E_1, \ldots, E_n; F)$
    is a Banach space.

??? proof "Proof"
    Let $(\varphi_k)$ be a Cauchy sequence in $L^{(n)}(E_1, \ldots, E_n; F)$.
    For any $(x_1, \ldots, x_n) \in \prod E_i$, $(\varphi_k(x_1, \ldots, x_n))$ is Cauchy in $F$ since
    $\|\varphi_k - \varphi_l\| \prod \|x_i\| \to 0$. By completeness
    $\varphi(x_1, \ldots, x_n) := \lim \varphi_k(x_1, \ldots, x_n)$ exists.
    $\varphi$ is $n$-linear by passing pointwise limits in the
    $K$-linearity equations. Boundedness:
    $\|\varphi(x_1, \ldots, x_n)\| = \lim \|\varphi_k(x_1, \ldots, x_n)\| \leq \limsup \|\varphi_k\| \prod \|x_i\|$, so
    $\varphi \in L^{(n)}$.
    Convergence: for $k$ large,
    $\|\varphi(x_1, \ldots, x_n) - \varphi_k(x_1, \ldots, x_n)\| = \lim_l \|\varphi_l - \varphi_k\| \prod \|x_i\| \leq \varepsilon_k \prod \|x_i\|$, so $\|\varphi - \varphi_k\| \leq \varepsilon_k \to 0$.

!!! proposition "Proposition (Summable successive distances)"
    <a id="summable-successive-distances"></a>

    In a metric space, if $\sum_n d(x_n,x_{n+1})<\infty$, then $(x_n)$ is Cauchy. In a complete space it converges, and its limit $x$ satisfies $d(x_n,x)\leq\sum_{k\geq n}d(x_k,x_{k+1})$.

??? proof "Proof"
    For $m>n$, repeated triangle inequalities give $d(x_n,x_m)\leq\sum_{k=n}^{m-1}d(x_k,x_{k+1})$. The tails tend to zero, proving the Cauchy property. Pass to the limit in $m$ for the final estimate.

!!! definition "Definition (Series and Banach space)"
    <a id="def-series-and-banach-space"></a>

    A Banach space is a complete normed vector space. The series $\sum_n x_n$ is the sequence of its finite partial sums; absolute convergence means convergence of $\sum_n\|x_n\|$. If the vector series converges, then $x_n\to0$, since each term is the difference of consecutive partial sums. No conclusion follows from a root or ratio bound equal to one. In the ratio test, the quoted ratios require nonzero denominators eventually; if the terms eventually vanish the series is already finite.

## Local Inversion and the Diffeomorphism Theorem

!!! definition "Definition (Contraction, fixed point)"
    <a id="def-9-9-1"></a>
    <a id="def-contraction-fixed-point"></a>

    A map $f : (X, d) \to (X, d)$ is a **contraction** if it is
    $\alpha$-Lipschitzian for some $\alpha \in (0, 1)$. A point $x$ with
    $f(x) = x$ is a **fixed point** of $f$.

!!! theorem "Theorem (Banach fixed point)"
    <a id="thm-9-9-2"></a>
    <a id="thm-banach-fixed-point"></a>

    A contraction on a non-empty complete metric space has a unique fixed
    point.

??? proof "Proof"
    **Uniqueness.** If $a, b$ are fixed points, $d(a, b) = d(f(a), f(b)) \leq \alpha d(a, b)$, so $d(a, b) = 0$.
    **Existence.** Start at any $x_0$ and iterate $x_{n+1} = f(x_n)$.
    $d(x_n, x_{n+1}) \leq \alpha^n d(x_0, x_1)$, so
    $\sum d(x_n, x_{n+1}) \leq d(x_0, x_1) / (1 - \alpha) < \infty$.
    By the same geometric series argument as [Proposition](#prop-absolute-convergence-implies-convergence), $(x_n)$ is
    Cauchy. Completeness gives a limit $a$. Continuity gives $f(a)=\lim_n f(x_n)=\lim_n x_{n+1}=a$.

!!! definition "Definition (C^n-diffeomorphism)"
    <a id="def-9-9-3"></a>
    <a id="def-c-n-diffeomorphism"></a>

    A bijection $f : U \to V$ between open subsets of normed spaces is a
    **$C^n$-diffeomorphism** ($n \in \mathbb{N} \cup \{\infty\}$) if both
    $f$ and $f^{-1}$ are of class $C^n$.

!!! theorem "Theorem (Local inverse / diffeomorphism)"
    <a id="thm-9-9-4"></a>
    <a id="thm-local-inverse-diffeomorphism"></a>

    Let $f : U \to F$ be of class $C^n$ on an open $U \subseteq E$ (with
    $E, F$ Banach over $\mathbb{R}$ and $n\geq1$), and $p \in U$ such that
    $Df(p) \in L(E, F)$ is invertible. Then there is an open neighbourhood
    $V$ of $p$ on which $f|_V : V \to f(V)$ is a $C^n$-diffeomorphism, and

    $$
    D(f|_V)^{-1}(y) = Df(f|_V^{-1}(y))^{-1}.
    $$

??? proof "Proof"
    Translate $p$ and $f(p)$ to zero and compose with $Df(p)^{-1}$. This reduces to a mapping $F$ with $F(0)=0$ and $DF(0)=I$. Choose $r>0$ such that the closed ball $\overline B(0,r)$ lies in the domain and $\|DF(x)-I\|\leq1/2$ throughout it. Write $\mu=F-I$. The mean value inequality makes $\mu$ one-half Lipschitz on this ball. Therefore $\|F(x)-F(z)\|\geq\|x-z\|/2$, giving injectivity and a two-Lipschitz inverse on its image.

    For $\|y\|<r/2$, the mapping $x\mapsto y-\mu(x)$ takes the complete closed ball into itself, since $\|y-\mu(x)\|\leq\|y\|+r/2<r$. It is a contraction, so it has a unique fixed point $x$, and that fixed-point equation is exactly $F(x)=y$. The lower Lipschitz bound gives $\|x\|\leq2\|y\|<r$. Thus $V=B(0,r)\cap F^{-1}(B(0,r/2))$ is open and $F:V\to B(0,r/2)$ is a bijection with continuous inverse $G$.

    Every $DF(x)$ on this neighbourhood is invertible by the Neumann series. If $y_0=F(x_0)$, then $y-y_0=DF(x_0)(x-x_0)+o(\|x-x_0\|)$. The inverse Lipschitz bound converts this remainder to $o(\|y-y_0\|)$, proving $DG(y_0)=DF(G(y_0))^{-1}$. This expression is continuous. Induct on differentiability class using smooth inversion and composition to obtain $G\in C^n$. Undo the initial affine changes.

!!! definition "Definition (Dense subset)"
    <a id="dense-subset"></a>

    A subset is dense when its closure is the whole space, equivalently when it meets every nonempty open set.

!!! theorem "Theorem (Baire category theorem)"
    <a id="baire-category"></a>

    In a complete metric space, a countable intersection of dense open sets is dense. Consequently, if a nonempty complete metric space is a countable union of closed sets, one of those closed sets has nonempty interior.

??? proof "Proof"
    Begin inside any prescribed nonempty open set. Density and openness successively supply nonempty closed balls $\overline B(x_n,r_n)$ contained in the preceding ball's interior and in the first $n$ dense open sets; choose $r_n\leq2^{-n}$ and also keep the first closed ball inside the prescribed open set. The centres are Cauchy. Completeness supplies a limit, and closedness places it in every chosen ball, hence in every dense open set and the initial open set. This proves density. If all the closed sets in the corollary had empty interior, their complements would be dense open sets with empty intersection, contradicting the theorem.

!!! theorem "Theorem (Banach equivalence of complete norms)"
    <a id="banach-equivalent-complete-norms"></a>

    Suppose two norms make $E$ Banach and $\|x\|_2\leq C\|x\|_1$. Over a complete nontrivially valued field, the reverse inequality holds with another finite constant.

??? proof "Proof"
    Apply Baire in the second norm to $E=\bigcup_{n\geq1}\overline{B_1(0,n)}^{\|\cdot\|_2}$. Some closure contains a ball. Translation and subtraction show that $B_2(0,r_0)$ is contained in $\overline{B_1(0,r_1)}^{\|\cdot\|_2}$ for positive $r_0,r_1$. Choose $a$ with $0<|a|<1$. Approximate each element of $B_2(0,r_0)$ by an element of $B_1(0,r_1)$ with error in $B_2(0,r_0|a|)$.

    Rescale and repeat: write $y=x_0+\cdots+x_n+y_n$ with $\|x_n\|_1<r_1|a|^n$ and $\|y_n\|_2<r_0|a|^{n+1}$. The series of $x_n$ converges in the first norm, with norm at most $r_1/(1-|a|)$. The assumed domination identifies its second-norm limit with $y$. Thus a second-norm ball is first-norm bounded. Scalar rescaling, as in the boundedness criterion, yields the reverse global inequality.

!!! theorem "Theorem (Bounded inverse and open mapping)"
    <a id="bounded-inverse-open-mapping"></a>

    A bounded linear bijection between Banach spaces over a complete nontrivially valued field has bounded inverse. A bounded surjective linear mapping is open.

??? proof "Proof"
    For a bijection $T$, the pulled-back norm $\|x\|'=\|Tx\|$ is complete and dominated by $\|T\|\|x\|$. Apply the complete-norm theorem.

    For a surjection, $W=\ker T$ is closed. The quotient $E/W$ is Banach: for a Cauchy sequence of classes, choose a subsequence with summable successive quotient distances, choose successive representatives with summable distances in $E$, and use completeness; the full Cauchy sequence then converges. The induced bijection $E/W\to F$ is bounded by taking the infimum over representatives, so its inverse is bounded. The quotient projection is open, since a class at quotient distance less than $r$ from $[x]$ has a representative in $B(x,r)$. Composing these two open mappings proves the result.

!!! proposition "Proposition (Composition of differentiable mappings of higher order)"
    <a id="prop-composition-of-differentiable-mappings-of-higher-order"></a>

    Composition preserves $n$-fold differentiability at the corresponding points and preserves class $C^n$. For the induction step use the bounded bilinear composition map $\Phi(A,B)=A\circ B$, with $\|A\circ B\|\leq\|A\|\|B\|$, and the identity $D(g\circ f)=\Phi(Dg\circ f,Df)$. A bounded bilinear map is smooth: its second differential is constant and all higher differentials vanish. Induction therefore proves both assertions.

!!! theorem "Theorem (Neumann series and smooth inversion)"
    <a id="neumann-smooth-inversion"></a>

    In the Banach algebra $L(E,E)$, $\|A\|<1$ implies $(I+A)^{-1}=\sum_{n\geq0}(-A)^n$. The group $GL(E)$ is open, and inversion is smooth, with

    $$
    D\iota(T)(H)=-T^{-1}HT^{-1}.
    $$

??? proof "Proof"
    The series converges absolutely in the complete operator space. Multiplying its finite sums on either side by $I+A$ leaves $I$ plus a remainder tending to zero, proving both inverse identities. If $T$ is invertible and $\|T^{-1}H\|<1$, factor $T+H=T(I+T^{-1}H)$, proving openness. The same series yields

    $$
    (T+H)^{-1}=T^{-1}-T^{-1}HT^{-1}+O(\|H\|^2).
    $$

    On a sufficiently small operator ball the tail is bounded by a geometric series times $\|H\|^2$. This proves the differential formula and continuity of inversion. Its differential is expressed using a bounded trilinear composition map and inversion itself; induction proves every higher differentiability class.

## Uniform Convergence

!!! definition "Definition (Pointwise and uniform convergence)"
    <a id="def-9-10-1"></a>
    <a id="def-pointwise-and-uniform-convergence"></a>

    A sequence $(f_n)$ of maps $X \to Y$ (where $Y$ is a metric space)
    **converges uniformly** to $f$ if
    $\lim_{n \to \infty} \sup_{x \in X} d(f_n(x), f(x)) = 0$.
    Pointwise convergence means $f_n(x)\to f(x)$ for each fixed $x$; no supremum is taken.

!!! theorem "Theorem (Uniform limit of continuous maps is continuous)"
    <a id="thm-9-10-2"></a>
    <a id="thm-uniform-limit-of-continuous-maps-is-continuous"></a>

    If each $f_n : X \to Y$ is continuous at $p$ and $f_n \to f$ uniformly,
    then $f$ is continuous at $p$. Likewise the uniform limit of uniformly
    continuous maps is uniformly continuous.

??? proof "Proof"
    Let $\varepsilon > 0$. By uniform convergence there is $n$ with
    $\sup_X d(f_n, f) < \varepsilon/3$. By continuity of $f_n$ at $p$ there
    is a neighbourhood $U$ of $p$ with $d(f_n(x), f_n(p)) < \varepsilon/3$
    for $x \in U$. Then for $x \in U$,
    $d(f(x), f(p)) \leq d(f(x), f_n(x)) + d(f_n(x), f_n(p)) + d(f_n(p), f(p)) < \varepsilon$. So $f^{-1}(B(f(p), \varepsilon)) \supseteq U$.
    The uniformly continuous case: take $n$ with $\sup d(f_n, f) < \varepsilon/3$. For $d(x, y) < \delta$ (the $\varepsilon/3$ modulus
    of $f_n$), $d(f(x), f(y)) < \varepsilon$ by the same triangle.

!!! theorem "Theorem (Differentiation under uniform convergence)"
    <a id="thm-9-10-3"></a>
    <a id="thm-differentiation-under-uniform-convergence"></a>

    Let $U \subseteq E$ be open, $(f_n)$ differentiable maps $U \to F$ with
    $f_n \to f$ uniformly and $Df_n \to g$ uniformly. If additionally a
    uniform $\delta$ controls the differentiability at $p$ (i.e.
    $\|f_n(x) - f_n(p) - Df_n(p)(x - p)\| \leq \delta(x)\|x - p\|$ with
    $\delta(x) \to 0$ as $x \to p$, uniformly in $n$), then $f$ is
    differentiable at $p$ with $Df(p) = g(p)$.

??? proof "Proof"
    For fixed $x$ near $p$, pass to the limit in $n$ in the uniformly controlled remainder inequality. Pointwise convergence of $f_n$ and $Df_n(p)$ suffices for this passage and gives $\|f(x)-f(p)-g(p)(x-p)\|\leq\delta(x)\|x-p\|$. Now let $x\to p$. Since $\delta(x)\to0$, the defining differentiability estimate holds. The order of these limits avoids dividing a fixed uniform error by a vanishing $\|x-p\|$.

!!! proposition "Proposition (Normal convergence of series)"
    <a id="prop-9-10-4"></a>
    <a id="prop-normal-convergence-of-series"></a>

    A series $\sum_n f_n$ of maps $U \to F$ (Banach) **converges normally**
    if $\sum_n \sup_{p \in U} \|f_n(p)\| < +\infty$. Normal convergence
    implies uniform convergence.

??? proof "Proof"
    The partial sums $g_n = \sum_{k=0}^{n} f_k$ are Cauchy in the
    sup-norm: for $m \geq n$,
    $\sup_x \|g_m(x) - g_n(x)\| \leq \sum_{k=n+1}^{m} \sup_x \|f_k(x)\| \to 0$ as $n \to \infty$. By completeness of the sup-metric
    space, $g_n$ converges uniformly to $g = \sum f_n$.

!!! proposition "Proposition (Convergence on path-connected open sets)"
    <a id="prop-9-10-5"></a>
    <a id="prop-convergence-on-path-connected-open-sets"></a>

    Over $\mathbb R$, let $U$ be path-connected, $F$ Banach, $(f_n)$ differentiable
    $U \to F$ with $Df_n$ uniformly convergent and $(f_n(p))$ convergent
    for some $p \in U$. Then $f_n$ converges pointwise on all of $U$ to a
    differentiable $f$ with $Df = \lim Df_n$.

??? proof "Proof"
    First, on a convex neighbourhood $V$ of $p$, the mean value
    inequality gives
    $\|(f_n - f_m)(x) - (f_n - f_m)(p)\| \leq \sup_{V} \|Df_n - Df_m\| \cdot \|x - p\|$. So $f_n(x)$ is Cauchy in the Banach space $F$,
    hence converges to $f(x)$. Apply the real pointwise differential convergence theorem to get differentiability.
    For the general case, let $x \in U$ and $\gamma : [0, 1] \to U$ be a
    path from $p$ to $x$. Define $I = \{t \in [0, 1] : f_n(\gamma(s)) \text{ converges for all } s \in [0, t]\}$. $I$ is an interval of the
    form $[0, c]$ or $[0, c[$ (closed by the convex case at the
    endpoint). If $I = [0, c[$, then the convergence extends to a small
    convex ball around $\gamma(c)$ by the same argument, contradicting
    the maximality. So $I = [0, 1]$ and $f_n(x)$ converges.

!!! notation "The uniform distance"
    <a id="notation-the-uniform-distance"></a>

    The expression $\sup_x d(f(x),g(x))$ is an extended metric on all mappings: it may be infinite. It is a finite metric on any class of mappings at uniformly finite distance from one fixed mapping. Uniform convergence is convergence for this distance.

!!! theorem "Theorem (Pointwise convergence and uniform convergence of real differentials)"
    <a id="real-differential-uniform-limit"></a>

    For real normed spaces, let differentiable $f_n:U\to F$ converge pointwise to $f$ and let $Df_n$ converge uniformly to $g$. Then $f$ is differentiable and $Df=g$.

??? proof "Proof"
    On a convex ball about $p$, the mean value inequality bounds $(f_n-f_m)(x)-(f_n-f_m)(p)$ by $\sup\|Df_n-Df_m\|\|x-p\|$. Let $m\to\infty$ to obtain a bound by $\varepsilon_n\|x-p\|$, where $\varepsilon_n=\sup\|Df_n-g\|\to0$. Subtract $g(p)(x-p)$ and insert the differentiability remainder of the fixed $f_n$. After division by $\|x-p\|$, the limsup as $x\to p$ is at most $2\varepsilon_n$. Let $n\to\infty$.

!!! proposition "Proposition (Termwise differentiation of normally convergent series)"
    <a id="series-differentiation-uniform"></a>

    Over a general complete nontrivially valued field, suppose $\sum f_n$ and $\sum Df_n$ converge uniformly, and that, from some index onwards,

    $$
    \|f_n(x)-f_n(p)-Df_n(p)(x-p)\|\leq\delta_n(x)\|x-p\|,
    \qquad\delta_n(p)=\lim_{x\to p}\delta_n(x)=0.
    $$

    If $\sum\delta_n$ converges uniformly, the sum is differentiable at $p$ and its differential is $\sum Df_n(p)$. Normal convergence is sufficient in each uniform-convergence hypothesis. Over $\mathbb R$, uniform convergence of the derivative series and pointwise convergence of the function series suffice; on a path-connected open set, convergence at one point suffices when the target is Banach.

??? proof "Proof"
    For partial sums, the total remainder is controlled by finitely many initial remainders plus the sum of the $\delta_n$. The uniformly convergent latter sum tends to zero at $p$, by the epsilon argument for uniform limits of functions continuous at that point. Apply the general uniform remainder criterion. In the real case apply the preceding pointwise theorem to partial sums; the one-point condition propagates through overlapping convex balls along a path, as in the convergence proposition.

## Power Series

!!! definition "Definition (Power series, convergence radius)"
    <a id="def-9-11-1"></a>
    <a id="def-power-series-convergence-radius"></a>

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
    <a id="prop-convergence-of-a-power-series"></a>

    Let $S = \sum_{n=0}^{\infty} (z - b)^n s_n$ have radius $R$.

    1. If $|a - b| < R$, then $S(a)$ converges absolutely.
    2. If $|a - b| > R$, then $S(a)$ diverges.
    3. For any $r < R$, $S$ converges normally on the open ball $B(b, r)$,
       and the sum is continuous on $B(b, R)$.

??? proof "Proof"
    (1) $\limsup_n \|(a - b)^n s_n\|^{1/n} = |a - b| \limsup \|s_n\|^{1/n} < 1$ by assumption, so the Cauchy root test gives absolute convergence.
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
    <a id="thm-termwise-differentiation-of-a-power-series"></a>

    On $B(b, R)$ the function $S$ is differentiable and

    $$
    S'(z) = \sum_{n=1}^{\infty} n\, (z - b)^{n-1} s_n.
    $$

??? proof "Proof"
    Apply the differentiation-under-uniform-convergence criterion. By
    [Lemma](#polynomial-first-order-remainder) (the binomial identity
    $z^n - z_0^n - n z_0^{n-1}(z - z_0) = (z - z_0)^2 \sum_{j=0}^{n-2} (n - 1 - j) z^j z_0^{n-2-j}$), for $z, z_0 \in B(b, r)$ with $r < R$,
    $\|(z - b)^n s_n - (z_0 - b)^n s_n - (z - z_0) n (z_0 - b)^{n-1} s_n\| \leq |z - z_0|^2 \cdot \frac{n(n-1)}{2} r^{n-2} \|s_n\|$.
    The series $\sum \frac{n(n-1)}{2} r^{n-2} \|s_n\|$ converges by the
    root test (limsup $r \|s_n\|^{1/n} < 1$). Hence the function
    $S(z) - S(z_0) - (z - z_0) \sum_{n \geq 1} n (z_0 - b)^{n-1} s_n$ is
    $o(|z - z_0|)$ uniformly in $n$, and [Theorem](#thm-differentiation-under-uniform-convergence) applies.

!!! theorem "Theorem (Mertens: Cauchy product)"
    <a id="thm-9-11-4"></a>
    <a id="thm-mertens-cauchy-product"></a>

    Let $\sum a_n$ and $\sum s_n$ converge to $b$ and $t$ respectively.

    1. If at least one converges absolutely, the Cauchy product
       $\sum_n (\sum_{k=0}^{n} a_k s_{n-k})$ converges to $b t$.
    2. If both converge absolutely, the Cauchy product converges absolutely.

??? proof "Proof"
    Suppose first that $\alpha=\sum|a_k|<\infty$. With $A_N=\sum_{k\leq N}a_k$ and $S_N=\sum_{k\leq N}s_k$, the product partial sum is $t_N=A_Nt+\sum_{k=0}^Na_k(S_{N-k}-t)$. Put $\varepsilon_l=\sup_{m\geq l}\|S_m-t\|$, which tends to zero, and $M=\sup_m\|S_m-t\|<\infty$. Split at $k=N-l$ to obtain

    $$
    \left\|\sum_{k=0}^Na_k(S_{N-k}-t)\right\|\leq\alpha\varepsilon_l+M\sum_{k>N-l}|a_k|.
    $$

    For fixed $l$, let $N\to\infty$, and then let $l\to\infty$. This proves $t_N\to bt$. When $\sum\|s_k\|$ is the absolutely convergent series, interchange the two factors in the finite triangular sum and use the same estimate with scalar partial sums.

    If both are absolutely convergent, the nonnegative partial sums satisfy

    $$
    \sum_{n=0}^N\left\|\sum_{k=0}^na_ks_{n-k}\right\|\leq\sum_{k+l\leq N}|a_k|\|s_l\|\leq\left(\sum_k|a_k|\right)\left(\sum_l\|s_l\|\right).
    $$

    Their monotonicity and boundedness prove absolute convergence.

!!! proposition "Proposition (Coefficient bounds and polynomial weights)"
    <a id="power-series-coefficient-bounds"></a>

    If $(r^n\|s_n\|)$ is bounded for $r>0$, the convergence radius is at least $r$. Replacing $s_n$ by $P(n1_K)s_n$, for any polynomial $P\in K[T]$, cannot decrease that radius.

??? proof "Proof"
    Take $n$th roots of the bounded sequence for the first assertion. For the second, the triangle inequality gives $|n1_K|\leq n$ and hence $|P(n1_K)|=O(n^d)$. For each $t>1$ this is eventually at most $t^n$. Thus the new root limsup is at most $t$ times the old one. Let $t\downarrow1$ and invert the bounds.

!!! lemma "Lemma (Polynomial first-order remainder)"
    <a id="polynomial-first-order-remainder"></a>

    For $n\geq2$,

    $$
    z^n-w^n-nw^{n-1}(z-w)=(z-w)^2\sum_{j=0}^{n-2}(n-1-j)z^jw^{n-2-j}.
    $$

??? proof "Proof"
    First factor $z^n-w^n=(z-w)\sum_{i=0}^{n-1}z^iw^{n-1-i}$. Subtract $nw^{n-1}(z-w)$ and factor each $z^i-w^i$ again. Interchanging the finite sums gives the coefficient $n-1-j$. For $n=1$ the remainder is zero.

!!! example "Example (Exponential and trigonometric power series)"
    <a id="exponential-trigonometric-series"></a>

    The complex series $\exp z=\sum_{n\geq0}z^n/n!$ has infinite radius by the ratio test and satisfies $(\exp(az))'=a\exp(az)$. Define $\cos z=(e^{iz}+e^{-iz})/2$, $\sin z=(e^{iz}-e^{-iz})/(2i)$, $\cosh z=(e^z+e^{-z})/2$, and $\sinh z=(e^z-e^{-z})/2$.

    Mertens' theorem and the binomial identity prove $\exp((a+b)z)=\exp(az)\exp(bz)$: the coefficient of degree $n$ in the Cauchy product is $\sum_{k=0}^n a^kb^{n-k}/(k!(n-k)!)=(a+b)^n/n!$.

## Directional Differentials

!!! definition "Definition (Directional derivative)"
    <a id="def-9-12-1"></a>
    <a id="def-directional-derivative"></a>

    Let $U \subseteq E$ be open, $f : U \to F$, $p \in U$, and
    $h \in E$. If

    $$
    \lim_{t \to 0} \frac{f(p + t h) - f(p)}{t}
    $$

    exists, it is the **directional derivative** of $f$ at $p$ along $h$,
    written $\partial_h f(p)$.

!!! remark "Remark (Relation to the Fréchet differential)"
    <a id="rem-relation-to-the-frechet-differential"></a>

    + If $f$ is Fréchet-differentiable at $p$, then $\partial_h f(p) = Df(p)(h)$ for every $h$.
    + The converse fails: existence of all directional derivatives does not
      imply Fréchet differentiability (the directional derivatives need not
      depend linearly on $h$).
    + The ordinary scalar derivative $f'(p)$ coincides with
      $Df(p)(h)$ when $E = K$, $h = 1$.

!!! definition "Definition (Partial differential)"
    <a id="partial-differential"></a>

    For $E=\prod_{i=1}^nE_i$ with the maximum norm, the partial differential $D_if(p)$ is the differential at $p_i$ of the mapping obtained by holding all other coordinates fixed. For $E_i=K$ write $\partial_if(p)=D_if(p)(1)$. A total differential restricts to these partial differentials and satisfies $Df(p)(h)=\sum_iD_if(p)(h_i)$.

!!! proposition "Proposition (Continuous partial differentials imply differentiability)"
    <a id="continuous-partials-differentiability"></a>

    Over $\mathbb R$, with finite-dimensional target $F$, existence and continuity of all partial differential mappings on an open set imply differentiability there, with the preceding sum formula.

??? proof "Proof"
    For a real-valued function telescope $f(p+h)-f(p)$ by changing coordinates successively. The scalar mean value theorem expresses the $i$th difference as $D_if(q_i(h))(h_i)$ for a point $q_i(h)$ between the corresponding successive coordinate values. Each $q_i(h)\to p$. Continuity of $D_if$ makes the difference from $\sum_iD_if(p)(h_i)$ bounded by $\sum_i\|D_if(q_i(h))-D_if(p)\|\|h_i\|=o(\|h\|)$. For finite-dimensional $F$, apply this to each coordinate and use equivalence of finite-dimensional norms.
