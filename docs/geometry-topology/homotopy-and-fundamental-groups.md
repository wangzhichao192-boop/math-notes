# Homotopy and Fundamental Groups

The notion of homeomorphism is often too rigid: the punctured plane
$\mathbb{C}^\times$ is not homeomorphic to the circle $S^1$, yet the two
"feel the same" when one studies, for instance, continuous square roots. This
chapter develops the notion of homotopy and the fundamental group, the first
algebraic invariant of a space, and computes $\pi_1(S^1) \cong \mathbb{Z}$.

Throughout this chapter, $I$ denotes the closed interval $[0, 1]$, and $\partial
I = \{0, 1\}$.

## Homotopy

!!! definition "Definition (Homotopy)"
    <a id="def-3-1-1"></a>
    Let $X, Y$ be topological spaces and $f, g : X \to Y$ maps. If there is a
    map

    $$
    F : X \times I \to Y
    $$

    such that $F(-, 0) = f$ and $F(-, 1) = g$, then $F$ is a **homotopy from
    $f$ to $g$**, and $f$ and $g$ are **homotopic** (through $F$), written
    $f \equiv_F g$, or $f \equiv g$ if $F$ is unspecified.

    Given base points $x_0 \in X$, $y_0 \in Y$, $F$ is a homotopy from $f$ to
    $g$ **relative to $x_0$**, and $f$ and $g$ are **homotopic relative to
    $x_0$**, if in addition

    $$
    f(x_0) = g(x_0) = y_0, \quad F(x_0, t) = y_0, \ \forall t \in I.
    $$

    In this case we write $f \equiv_F g : (X, x_0) \to (Y, y_0)$.

Homotopy (and homotopy relative to $x_0$) is an equivalence relation between
maps.

!!! definition "Definition (Homotopy equivalence, contractible)"
    <a id="def-3-1-3"></a>
    Two spaces $X$ and $Y$ are **homotopy equivalent** if there are maps
    $f : X \to Y$ and $g : Y \to X$ such that $gf \equiv I_X$ and
    $fg \equiv I_Y$. (There is a relative version with base points.) In the
    aforementioned cases, $f$ and $g$ are called **homotopy equivalences**
    (relative to a base point). A space is **contractible** if it is homotopy
    equivalent to a singleton; it is **strongly contractible** if the homotopy
    is relative to the base point.

For example, $\mathbb{R}^n$, closed disks, and open disks in $\mathbb{R}^n$
are strongly contractible; $\mathbb{C}^\times$ and $S^1$ are homotopy
equivalent relative to a base point, but not homeomorphic.

!!! definition "Definition (Relative homotopy)"
    <a id="def-3-1-6"></a>
    Let $X$ be a space with a subspace $A$, and $Y$ a space with a subspace
    $B$. A **relative homotopy** is a map

    $$
    F : X \times I \to Y
    $$

    such that $F(A \times I) \subset B$. We say $f, g : X \to Y$ are
    **homotopic relative to $A, B$** if $f = F(-, 0)$, $g = F(-, 1)$ for such
    an $F$, or simply that $f, g : (X, A) \to (Y, B)$ are homotopic.

## Fundamental Groups

This section requires basic terminologies of group theory.

!!! definition "Definition (Fundamental group, loops)"
    <a id="def-3-2-1"></a>
    Let $(X, x_0)$ be a space with base point. Let $\pi_1(X, x_0)$ be the set
    of relative homotopy classes of maps

    $$
    \sigma : (I, \partial I) \to (X, x_0).
    $$

    We also call such a map a **loop in $X$ based at $x_0$**. We write
    $\sigma \simeq \tau$ to indicate that $\sigma$ and $\tau$ are loops homotopic
    relative to $\partial I$ and a base point.

    Two loops based at $x_0$, $f, g : (I, \partial I) \to (X, x_0)$, may be
    **concatenated** to produce another loop based at $x_0$:

    $$
    \sigma * \tau : (I, \partial I) \to (X, x_0), \quad t \mapsto
    \begin{cases} \sigma(2t), & 0 \leq t \leq 1/2, \\ \tau(2t - 1), & 1/2 \leq t \leq 1. \end{cases}
    $$

!!! definition "Definition (Composition)"
    <a id="def-3-2-3"></a>
    Let $\alpha, \beta \in \pi_1(X, x_0)$. Let $\sigma \in \alpha$ and
    $\tau \in \beta$. Then the **composition** of $\alpha$ and $\beta$ is
    defined as

    $$
    \alpha\beta := [\sigma * \tau].
    $$

    It is independent of the choices of $\sigma$ and $\tau$.

!!! remark "Remark"
    <a id="rem-3-2-4"></a>
    The composition is well defined, i.e. independent of the choices of
    $\sigma$ and $\tau$.

Let $c_{x_0} \in \pi_1(X, x_0)$ be the class containing the constant loop based
at $x_0$. One checks that $\alpha c_{x_0} = c_{x_0}\alpha = \alpha$,
$(\alpha\beta)\gamma = \alpha(\beta\gamma)$, and that each $\alpha = [\sigma]$
has an inverse $\alpha^{-1} = [\sigma']$ where $\sigma'(t) = \sigma(1 - t)$.
Thus $\pi_1(X, x_0)$ forms a group.

!!! definition "Definition (Fundamental group)"
    <a id="def-3-2-8"></a>
    The group with underlying set $\pi_1(X, x_0)$ and the composition discussed
    above is called the **fundamental group of $X$ with base point $x_0$**. We
    will write $1$ for $c_{x_0}$ when no ambiguity is likely.

!!! definition "Definition (Path-connected)"
    <a id="def-3-2-10"></a>
    For $x, y \in X$, we say that $x$ and $y$ are **connected by a path**
    $\sigma$ if there is a map $\sigma : I \to X$ satisfying $\sigma(0) = x$
    and $\sigma(1) = y$; then we write $x \simeq y$. This is an equivalence
    relation. A **path component** of a space $X$ is an equivalence class with
    respect to this relation. The space $X$ is **path-connected** if it has
    only one path component.

!!! example "Example (Warsaw sine curve)"
    <a id="ex-3-2-12"></a>
    The Warsaw sine curve

    $$
    T = \{(x, \sin x) : x \in (0, 1)\} \cup \{(0, 0)\}
    $$

    is connected but not path-connected.

Suppose $x_0, x_1 \in X$ and $\sigma$ is a path in $X$ with $\sigma(x_i) = x_i$
for $i = 0, 1$. Then we have a function of sets

$$
\sigma_{\#} : \pi_1(X, x_1) \to \pi_1(X, x_0), \quad [\tau] \mapsto [\sigma \tau \sigma'],
$$

which is well defined and an isomorphism of groups. Therefore

!!! proposition "Proposition"
    <a id="prop-3-2-14"></a>
    Let $X$ be a path connected space. Up to group isomorphism,
    $\pi_1(X, x_0)$ is independent of the choice of $x_0$.

!!! definition "Definition (Induced homomorphism)"
    <a id="def-3-2-15"></a>
    Let $f : X \to Y$ be a map. The group homomorphism

    $$
    \pi_1(f) : \pi_1(X, x_0) \to \pi_1(Y, f(x_0)), \quad [\sigma] \mapsto [f\sigma]
    $$

    is called the **homomorphism induced by $f$**. Alternatively, we denote
    $\pi_1(f)$ by $f_*$.

!!! proposition "Proposition"
    <a id="prop-3-2-17"></a>
    Let $f, g : (X, x_0) \to (Y, y_0)$ be maps homotopic relative to the base
    point. Then $f_* = g_*$.

!!! proposition "Proposition (Functoriality)"
    <a id="prop-3-2-18"></a>
    Taking fundamental groups is a **functor** from the (homotopy) category of
    spaces to the category of groups.

    + For a space $X$ and a base point $x_0$, we have
      $I_{\pi_1(X,x_0)} = (I_X)_*$.
    + For maps $f : X \to Y$ and $g : Y \to Z$, we have
      $(gf)_* = g_* f_*$.

!!! remark "Remark"
    <a id="rem-3-2-19"></a>
    By Proposition 3.2.17 it makes sense to write $\alpha_*$ and
    $\alpha_*\beta_*$ for the induced homomorphisms, where $\alpha, \beta$
    are homotopy classes of maps relative to base points. In the terminology
    of category theory, Proposition 3.2.18 says that taking the fundamental
    group is a **functor** from the "(homotopy) category of spaces" to the
    "category of groups".

!!! corollary "Corollary"
    <a id="cor-3-2-20"></a>
    If $f : X \to Y$ is a homotopy equivalence relative to base points, then
    $f_*$ is an isomorphism.

!!! corollary "Corollary"
    <a id="cor-3-2-21"></a>
    If $X$ is strongly contractible, then $\pi_1(X, x_0) = 0$.

A path-connected space with trivial fundamental group is said to be **simply
connected**. There are many simply connected spaces which are not contractible;
for instance, the sphere $S^n$ with $n > 1$ is such a space. A rigorous proof
relies on the following

!!! lemma "Lemma"
    <a id="lem-3-2-22"></a>
    A path

    $$
    \sigma : (I, \partial I) \to (S^n, x)
    $$

    is (relatively) homotopic to a path $\sigma'$ which is not surjective.

!!! proposition "Proposition"
    <a id="prop-3-2-24"></a>
    Let $p_i : X_1 \times X_2 \to X_i$, $i = 1, 2$ be the projections. Then

    $$
    ((p_1)_*, (p_2)_*) : \pi_1(X_1 \times X_2, (x_1, x_2)) \to \pi_1(X_1, x_1) \times \pi_1(X_2, x_2)
    $$

    is an isomorphism.

!!! corollary "Corollary"
    <a id="cor-3-2-26"></a>
    If $f : X \to Y$ is a homotopy equivalence (not necessarily relative to
    base points), then $f_* : \pi_1(X, x_0) \to \pi_1(Y, f(x_0))$ is an
    isomorphism.

!!! corollary "Corollary"
    <a id="cor-3-2-27"></a>
    If $X$ is contractible, then $\pi_1(X, x_0) = 0$ for any $x_0 \in X$.

## The Fundamental Group of the Circle

Let $S^1$ be the unit circle in the complex plane with base point $1$. For each
$n \in \mathbb{Z}$, define the loop

$$
\sigma_n : (I, \partial I) \to (S^1, 1), \quad t \mapsto \exp(2\pi i n t).
$$

The primary objective of this section is to prove the following

!!! theorem "Theorem"
    <a id="thm-3-3-1"></a>
    The function

    $$
    \Phi : \mathbb{Z} \to \pi_1(S^1, 1), \quad n \mapsto [\sigma_n]
    $$

    is an isomorphism of groups.

!!! definition "Definition (Degree)"
    <a id="def-3-3-2"></a>
    For a map $f : S^1 \to S^1$, the **degree** of $f$ is the integer
    $\Phi^{-1}([f])$.

Intuitively, $\Phi^{-1}$ counts how many times the interval $I$ gets wrapped
around the circle (with an orientation) by a loop $\sigma$; the class $[\sigma]$
is completely determined by this number. The critical challenge is to formalize
this idea. Let $p : \mathbb{R} \to S^1$ be the map defined by
$p(t) = \exp 2\pi i t$. Then $p$ preserves base points whenever the base point
of $\mathbb{R}$ is an integer. The heart of the proof is the following lifting
lemma.

!!! lemma "Lemma (Lifting lemma)"
    <a id="lem-3-3-3"></a>
    Let $K$ be a connected quasi-compact topological space. For any map

    $$
    f : K \times I \to S^1
    $$

    and any $f' : K \to \mathbb{R}$ such that $pf'(x) = f(x, 0)$ for all
    $x \in K$, there is a unique map

    $$
    \tilde{f} : K \times I \to \mathbb{R}
    $$

    satisfying $f'(-) = \tilde{f}(-, 0)$ and $f = p\tilde{f}$.

!!! remark "Remark"
    <a id="rem-3-3-4"></a>
    The lifting lemma holds even without the connectedness or the
    quasi-compactness assumption on $K$.

??? proof "Proof"
    For $x \in S^1$, let $U_x := S^1 - \{-x\}$, a neighborhood of $x$. Given
    $y \in p^{-1}(-x) \cap [0, 1)$, we have
    $p^{-1}(U_x) = \mathbb{R} - \{y + n : n \in \mathbb{Z}\}$. Let
    $V_{xj} := (y + j, y + j + 1)$; the restriction of $p$ to $V_{xj}$ is an
    isomorphism onto $U_x$, with inverse denoted $q_{xj} : U_x \to V_{xj}$.

    **Case 1: $K = \{z\}$.** It suffices to show that for any map
    $f : (I, \partial I) \to (S^1, 1)$ and a fixed $n \in \mathbb{Z}$, there is a
    unique map $\tilde{f} : I \to \mathbb{R}$ satisfying $p\tilde{f} = f$ and
    $\tilde{f}(0) = n$. Suppose $[0, \epsilon) \subset f^{-1}(U_1)$. Then
    $n \in V_{1j}$ for some $j \in \mathbb{Z}$, and for $t \in [0, \epsilon)$ we
    set $\tilde{f}(t) = q_{1j}f(t)$, defining $\tilde{f}$ on $[0, \epsilon)$.

    Let $L$ denote the set of all $l \in (0, 1)$ such that there is a map
    $\tilde{f} : [0, l) \to \mathbb{R}$ satisfying $p\tilde{f} = f$ and
    $\tilde{f}(0) = n$. Then $L \neq \varnothing$. Suppose the supremum of $L$
    is $c < 1$. Let $[a, b)$ be a small interval such that $c \in [a, b)$ and
    $f([a, b)) \subset U_{f(c)}$. Since $a < c$, $\tilde{f}$ is defined on
    $[0, a]$; choose $j \in \mathbb{Z}$ with $\tilde{f}(a) \in V_{f(a)j}$. For
    $t \in [a, b)$ define $\tilde{f}(t) = q_{f(a)j}f(t)$. This defines
    $\tilde{f}$ on $[0, b)$, a contradiction. Hence $c = 1$, and existence is
    justified.

    For uniqueness, if $\tilde{f}_1, \tilde{f}_2$ satisfy $p\tilde{f}_1 =
    p\tilde{f}_2 = f$ and $\tilde{f}_1(0) = \tilde{f}_2(0)$, then
    $\tilde{f}_1(t) - \tilde{f}_2(t) = n \in \mathbb{Z}$; taking $t = 0$ gives
    $n = 0$.

    **Case 2: the general case.** For $z \in K$, $t \in I$, let
    $C_{z,t} = A_{z,t} \times B_{z,t}$ where $A_{z,t}$ is a neighborhood of $z$
    and $B_{z,t}$ a small open neighborhood of $t$ in $I$, such that
    $C_{z,t} \subset f^{-1}(U_{f(z,t)})$. Fix $t \in I$, $t \neq 1$. Since $K$
    is compact, there is a finite cover $\{C_{z_i,t} : 1 \leq i \leq m\}$ of
    $K \times \{t\}$. Let $W_t = \bigcap_{i=1}^m B_{z_i,t}$, an open interval
    (half open if $t = 0$ or $1$). For $1 \leq i \leq m$ there is $j \in
    \mathbb{Z}$ with $f'(z_i) \in V_{1j}$, and for $(z, t) \in C_{z_i,0}$ we set
    $\tilde{f}_i(z, t) = q_{1j}f(z, t)$. Then $p\tilde{f}_i(z, t) = f(z, t)$
    and $\tilde{f}_i(z, 0) = f'(z)$; by the uniqueness in Case 1,
    $\tilde{f}_{i_1}(z, t) = \tilde{f}_{i_2}(z, t)$ on
    $C_{z_{i_1}} \cap C_{z_{i_2}}$. Therefore we define $\tilde{f}(z, t)$ for
    $t \in W_0$ by $\tilde{f}(z, t) = \tilde{f}_i(z, t)$ on $C_{z_i,0}$. As in
    Case 1, let $L$ denote the set of all $l \in (0, 1)$ such that there is a
    map $\tilde{f} : K \times [0, l) \to \mathbb{R}$ satisfying $p\tilde{f} = f$
    and $\tilde{f}(x, 0) = f'(x)$. Then $L \neq \varnothing$ and the rest of the
    proof follows exactly as in Case 1.

!!! corollary "Corollary (Path lifting)"
    <a id="cor-3-3-5"></a>
    Let $\sigma : (I, \partial I) \to (S^1, 1)$ be a loop. Then there is a
    unique path $\tilde{\sigma} : (I, 0) \to (\mathbb{R}, 0)$ satisfying
    $p\tilde{\sigma} = \sigma$.

!!! corollary "Corollary (Homotopy lifting)"
    <a id="cor-3-3-6"></a>
    Let $\sigma_0, \sigma_1 : (I, \partial I) \to (S^1, 1)$ be loops and $F$ a
    homotopy from $\sigma_0$ to $\sigma_1$ relative to the base points. Then
    there is a homotopy $\tilde{F}$ from $\tilde{\sigma}_0$ to
    $\tilde{\sigma}_1$ such that $p\tilde{F} = F$ and $\tilde{F}(0, s) = 0$ for
    all $s \in I$.

!!! lemma "Lemma"
    <a id="lem-3-3-7"></a>
    Consider the loops $\sigma_0, \sigma_1 : (I, \partial I) \to (S^1, 1)$ and
    their lifts $\tilde{\sigma}_i$ with $p\tilde{\sigma}_i = \sigma_i$ and
    $\tilde{\sigma}_i(0) = 0$, $i = 0, 1$. Then $\sigma_0$ and $\sigma_1$ are
    homotopic relative to the end points if and only if
    $\tilde{\sigma}_0(1) = \tilde{\sigma}_1(1)$.

??? proof "Proof"
    Suppose we have a homotopy $F : I \times I \to S^1$ such that
    $F(t, i) = \sigma_i(t)$, $i = 0, 1$, and $F(0, s) = F(1, s) = 1$ for all
    $s \in I$. By the homotopy lifting corollary we have
    $\tilde{F} : I \times I \to \mathbb{R}$ such that
    $\tilde{F}(-, \epsilon) = \tilde{\sigma}_\epsilon$, $\epsilon = 0, 1$, and
    $\tilde{F}(1, s) \in \mathbb{Z}$. Hence $\tilde{F}(1, -)$ is constant and

    $$
    \tilde{\sigma}_0(1) = \tilde{F}(1, 0) = \tilde{F}(1, 1) = \tilde{\sigma}_1(1).
    $$

    Conversely, suppose $\tilde{\sigma}_0(1) = \tilde{\sigma}_1(1)$. Then

    $$
    F(t, s) := p((1 - s)\tilde{\sigma}_0(t) + s\tilde{\sigma}_1(t))
    $$

    is the required homotopy.

Since $p\tilde{\sigma}(1) = 1$, we have $\tilde{\sigma}(1) \in \mathbb{Z}$.
Therefore the lemma yields a function

$$
\Psi : \pi_1(S^1, 1) \to \mathbb{Z}, \quad [\sigma] \mapsto \tilde{\sigma}(1),
$$

which is the inverse of $\Phi$. This concludes the proof of the theorem.

!!! remark "Remark"
    <a id="rem-3-3-9"></a>
    We will omit the base points in the notation of fundamental groups whenever
    no risk of confusion is likely. The torus $T$ is homeomorphic to
    $S^1 \times S^1$, so by Proposition 3.2.24

    $$
    \pi_1(T) \cong \mathbb{Z} \times \mathbb{Z}.
    $$

    On the other hand $\pi_1(S^2) = 0$; hence $T$ and $S^2$ are not homotopy
    equivalent, and in particular not homeomorphic.

!!! remark "Remark (Winding numbers revisited)"
    <a id="rem-3-3-10"></a>
    We revisit the notions of powers of uni-modular complex numbers and winding
    numbers from Chapter I. As revealed in this section, the path

    $$
    I \to S^1, \quad t \mapsto \exp(2\pi i n t)
    $$

    represents the integer $n$ in $\pi_1(S^1, 1)$. For a polyline $L$ and a
    point $P \notin L$ in $\mathbb{R}^2$, we have $\mathbb{R}^2 - P \simeq S^1$,
    and the winding number of $L$ around $P$ is the class $[\sigma] \in
    \pi_1(\mathbb{R}^2 - P) \cong \mathbb{Z}$ of a path $\sigma$ traveling
    along $L$. These two quantities are unified as classes in $\pi_1(S^1)$ —
    remarkably, using only topological spaces and continuous maps, much less
    structure than the arithmetic of complex numbers or the linear structure
    of $\mathbb{R}^2$.

## nth Roots and the Logarithmic Function

Fix an integer $n > 0$; let the $n$-th power function be denoted by
$p_n : S^1 \to S^1$.

!!! proposition "Proposition"
    <a id="prop-3-4-1"></a>
    For $n \neq \pm 1$, the map $p_n$ has no continuous right or left inverse.
    In other words, there is no continuous $n$-th root of unity map from $S^1$
    to itself.

??? proof "Proof"
    If a continuous right inverse $\xi_n$ existed, passing to fundamental
    groups gives

    $$
    I_{\pi_1(S,1)} = (\xi_n p_n)_* = (\xi_n)_* (p_n)_* : \pi_1(S, 1) \to \pi_1(S, 1).
    $$

    Recall the isomorphisms $\Phi : \mathbb{Z} \to \pi_1(S^1, 1)$ and
    $\Psi : \pi_1(S^1, 1) \to \mathbb{Z}$. A routine computation shows that
    $\Psi(p_n)_* \Phi : \mathbb{Z} \to \mathbb{Z}$ is multiplication by $n$.
    Therefore $\Psi(\xi_n)_* \Phi$ would be a homomorphism taking $n$ to $1$,
    which does not exist. This yields a contradiction. The non-existence of a
    continuous left inverse is proved similarly.

!!! proposition "Proposition"
    <a id="prop-3-4-2"></a>
    The map $z \mapsto \exp(2\pi i z)$ does not have a continuous right inverse.
    In other words, there is no continuous logarithm function from $S^1$ to
    $\mathbb{R}$.

## The Fundamental Theorem of Algebra

!!! theorem "Theorem (The Fundamental Theorem of Algebra)"
    <a id="thm-3-5-1"></a>
    Every non-constant polynomial over $\mathbb{C}$ has a root.

??? proof "Proof"
    Let $p(z) = z^n + \sum_{k=1}^{n} a_k z^{n-k}$ be a non-constant polynomial.
    Suppose, for a contradiction, that $p(z)$ has no root. Then for $r \geq 0$
    define

    $$
    f_r : (I, \partial I) \to (S^1, 1), \quad f_r(s) = \frac{p(re^{2\pi i s})/p(r)}{|p(re^{2\pi i s})/p(r)|}.
    $$

    Then $f_r \simeq f_0$ relative to $\partial I$. Since $f_0 = c_1$ is the
    constant path,

    $$
    [f_r] = [f_0] = 1 \in \pi_1(S^1, 1).
    $$

    Fix an $r$ such that

    $$
    r > \max\{|a_1| + \cdots + |a_n|, 1\}.
    $$

    For $z \in \mathbb{C}$ with $|z| = r$,

    $$
    |z|^n = r^n = r \cdot r^{n-1} > (|a_1| + \cdots + |a_n|)r^{n-1} \geq \left|\sum_{k=1}^{n} a_k z^{n-k}\right|.
    $$

    Therefore, for $t \in I$, the polynomial

    $$
    p_t(z) = z^n + t \sum_{k=1}^{n} a_k z^{n-k}
    $$

    has no root of length $r$. Hence in the definition of $f_r$ we may replace
    $p(z)$ with $p_t(z)$ and obtain a homotopy (relative to $\partial I$) from
    $f_r$ to the map

    $$
    (I, \partial I) \to (S^1, 1), \quad s \mapsto \frac{p_0(re^{2\pi i s})/p_0(r)}{|p_0(re^{2\pi i s})/p_0(r)|} = e^{2\pi i n s}.
    $$

    Therefore $[f_r] = [\sigma_n] = \Phi(n) \in \pi_1(S^1, 1)$, a contradiction.

