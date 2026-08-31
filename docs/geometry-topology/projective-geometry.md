# Projective Geometry

Classically, the projective space $\mathbb{P}^n_F$ is regarded as $F^n$
adjoining "a point at infinity" for each line through the origin. The idea is
to identify $F^n$ with one of the open sets $U_i$ of $\mathbb{P}^n_F$, say
$U_0$; then the complement

$$
\mathbb{P}^n_F - U_0 = \{[0 : x_1 : \cdots : x_n]\}
$$

is regarded as the "points at infinity". For $n = 1$ there is only one such
point.

!!! example "Example (The one-point compactification of $\mathbb{R}^n$)"
    <a id="ex-4-1-1"></a>
    Consider the set $X = \mathbb{R}^n \cup \{*\}$. Define a topology
    $\tau_X$ on $X$ by

    $$
    \tau_X := \tau_{\mathbb{R}^n} \cup \{U \cup \{*\} : \mathbb{R}^n - U \text{ is compact}\}.
    $$

    The space $(X, \tau_X)$ is called the **one-point compactification** of
    $\mathbb{R}^n$; it is homeomorphic to $S^n$. In particular,
    $\mathbb{P}^1_\mathbb{R} \cong S^1$ and $\mathbb{P}^1_\mathbb{C} \cong S^2$.

Consider the case $n = 2$. You may have heard the saying "two parallel lines
on a plane intersect at infinity"; in $\mathbb{P}^2_\mathbb{R}$ this can be made
mathematically rigorous. Let

$$
L' := \{(x_1, x_2) \in \mathbb{R}^2 : \alpha_0 + \alpha_1 x_1 + \alpha_2 x_2 = 0\}
    := \{[1 : x_1 : x_2] \in \mathbb{P}^2_\mathbb{R} : \alpha_0 + \alpha_1 x_1 + \alpha_2 x_2 = 0\}
$$

be a line in $\mathbb{R}^2$, identified with $U_0$, with $(\alpha_1, \alpha_2)
\neq (0, 0)$. For $\xi = (\xi_1, \xi_2) \in L'$ we have a homeomorphism

$$
\mathbb{R} \to L', \quad t \mapsto (\alpha_2 t, -\alpha_1 t) + \xi = [1 : \alpha_2 t + \xi_1 : -\alpha_1 t + \xi_2].
$$

Since $\mathbb{P}^2_\mathbb{R}$ is Hausdorff, we may discuss limits, and

$$
\lim_{t \to \infty} [1 : \alpha_2 t + \xi_1 : -\alpha_1 t + \xi_2]
= \lim_{t \to \infty} [t^{-1} : \alpha_2 + \xi_1 t^{-1} : -\alpha_1 + \xi_2 t^{-1}]
= [0 : \alpha_2 : -\alpha_1],
$$

which are to be regarded as "points on $L'$ at infinity".

!!! remark "Remark"
    <a id="rem-4-1-3"></a>
    Which of the points in $\mathbb{P}^2_F$ are "at infinity" depends on how
    you place the Euclidean plane $F^2$ in $\mathbb{P}^2_F$. For instance, if
    $U_1$ is chosen, then the "points at infinity" are of the form
    $[x_0 : 0 : x_2]$. The same goes for $\mathbb{P}^n_F$.

!!! definition "Definition (Line in the projective plane)"
    <a id="def-4-1-5"></a>
    A **line in the projective plane $\mathbb{P}^2_F$** is the subspace defined
    by

    $$
    L = \{[x_0 : x_1 : x_2] \in \mathbb{P}^2_F : \alpha_0 x_0 + \alpha_1 x_1 + \alpha_2 x_2 = 0\}
    $$

    for some $\alpha_i \in F$, $i = 0, 1, 2$, not all zero.

!!! remark "Remark"
    <a id="rem-4-1-6"></a>
    Many different choices of $(x_0, x_1, x_2)$ represent the same point
    $[x_0 : x_1 : x_2] \in \mathbb{P}^2_F$; however, whether the equation
    $\alpha_0 x_0 + \alpha_1 x_1 + \alpha_2 x_2 = 0$ is satisfied is independent
    of the choices.

!!! remark "Remark"
    <a id="rem-4-1-7"></a>
    The equation for a projective line in $\mathbb{P}^2_F$ looks exactly like
    the equation of a 2-dimensional linear subspace of $F^3$. We call it the
    **linear subspace associated to the projective line**. Therefore we have
    linearly independent vectors $\xi = (\xi_0, \xi_1, \xi_2)$, $\eta =
    (\eta_0, \eta_1, \eta_2)$ such that the line has the parametrization

    $$
    L = \{[s\xi_0 + t\eta_0 : s\xi_1 + t\eta_1 : s\xi_2 + t\eta_2] : s, t \in F\}.
    $$

We say that several points on $\mathbb{P}^2_F$ are **collinear** if they lie on
a same line.

!!! theorem "Theorem (Desargues' Theorem)"
    <a id="thm-4-1-10"></a>
    Let $A_i, B_i, C \in \mathbb{P}^2_F$, $i = 1, 2, 3$, be such that
    $A_i, B_i, C$ are collinear and distinct for each $i$. Let $L_{ij}$ (resp.
    $M_{ij}$) be the line connecting $A_i$ and $A_j$ (resp. $B_i$ and $B_j$),
    and let $P_{ij}$ be the intersection point of $L_{ij}$ and $M_{ij}$. Then
    $P_{12}, P_{13}, P_{23}$ are collinear.

??? proof "Proof"
    Throughout this proof, we regard a point in $\mathbb{P}^2_F$ as a
    1-dimensional subspace of $F^3$. Suppose that $\gamma \in F^3$ generates
    $C$, and $\alpha_i' \in F^3$ generates $A_i$. Then there are $\lambda_i \in
    F$, not all zero for $i = 0, 1, 2$, such that $\beta_i = \lambda_i
    \alpha_i' + \gamma$ generates $B_i$. Let $\alpha_i = \lambda_i
    \alpha_i'$; then $\alpha_i$ generates $A_i$, and $\beta_i = \alpha_i +
    \gamma$. It follows that $P_{ij}$ is the intersection of the subspaces
    $F\{\alpha_i, \alpha_j\}$ and $F\{\alpha_i + \gamma, \alpha_j + \gamma\}$.
    A straightforward computation then shows that

    $$
    P_{ij} = F\{\alpha_i - \alpha_j\}.
    $$

    Therefore $P_{12}, P_{13}, P_{23}$ lie in the same 2-dimensional subspace
    of $F^3$, and the proof is concluded.

!!! remark "Remark"
    <a id="rem-4-1-11"></a>
    A high-school-level statement of Desargues' Theorem is more complicated
    because the cases where $L_{ij}$ and $M_{ij}$ are parallel have to be
    excluded, and a high-school-level proof requires hard work. In the setting
    of the projective plane, both the statement and the proof are remarkably
    simple.

!!! definition "Definition (Projective transformation)"
    <a id="def-4-1-12"></a>
    Let $A$ be an invertible $(n+1) \times (n+1)$ matrix. Then $A$ defines a
    function

    $$
    \phi_A : \mathbb{P}^n_F \to \mathbb{P}^n_F, \quad [x] \mapsto [(Ax^t)^t],
    $$

    which is called the **projective transformation** associated to the matrix
    $A$. Projective transformations are homeomorphisms.

The two-dimensional projective geometry admits a **duality** between points
and lines: roughly speaking, any statement about points and lines in
$\mathbb{P}^2_F$ remains true if we exchange the words "point" and "line", and
"lies on" and "contains".

!!! theorem "Theorem (Dual Desargues)"
    <a id="thm-4-1-15"></a>
    Let $t_i$, $i = 1, 2, 3$ be three points on a projective line
    $c \subset \mathbb{P}^2_F$. Let $a_i, b_i$ be lines containing $t_i$ such
    that $a_i, b_i$ and $c$ are distinct. Let $l_{ij}$ (resp. $m_{ij}$) be the
    intersection of $a_i$ and $a_j$ (resp. $b_i$ and $b_j$), and let $p_{ij}$
    be the line containing $l_{ij}$ and $m_{ij}$. Then $p_{12}, p_{13},
    p_{23}$ have a common point.

!!! remark "Remark (The Grassmannian $G_{2,3}$)"
    <a id="rem-4-1-17"></a>
    Let $G_{2,3}$ be the set of all 2-dimensional linear subspaces of $F^3$.
    Then there is a bijection $\phi : G_{2,3} \to \mathbb{P}^2_F$ sending a
    2-dimensional linear subspace to its orthogonal complement, so $G_{2,3}$
    is given a topology making it homeomorphic to $\mathbb{P}^2_F$. More
    generally, for $0 < m < n$ one constructs a topology on $G_{m,n}$, the set
    of all $m$-dimensional linear subspaces of $F^n$, with
    $G_{1,n} \cong \mathbb{P}^{n-1}_F$.

## Projection from a Point, the Cross-ratio

Let $L, M$ be different lines on the Euclidean plane, and let $p$ be a point
not on $L$ or $M$. For $a \in L$ such that the line $L(p, a)$ is not parallel
to $M$, the line $L(p, a)$ intersects $M$ at a point denoted by
$\phi(a)$. This defines a map $\phi : L - (?) \to M$ where $(?)$ is either
$\varnothing$ or a one-point set. In general $\phi$ does not preserve distance;
we introduce a quantity that is preserved by $\phi$. See
[Figure 1](geometry-and-topology.pdf#page=42) in the lecture notes.

!!! definition "Definition (The cross-ratio, Euclidean)"
    <a id="def-4-2-1"></a>
    Let $v \neq 0$ be a vector in $\mathbb{R}^2$, $p \in \mathbb{R}^2$, and let

    $$
    L = \{p + tv : t \in \mathbb{R}\}
    $$

    be a line on the Euclidean plane. Let $a_i = p + t_i v$, $1 \leq i \leq 4$,
    be 4 distinct points on $L$. The **cross-ratio** of $a_1, \dots, a_4$ (in
    that order) is defined by

    $$
    (a_1, a_2, a_3, a_4) := \frac{(t_3 - t_1)(t_4 - t_2)}{(t_4 - t_1)(t_3 - t_2)}.
    $$

    The value is independent of the choice of $p$ and $v$.

To make things nicer and more general, we work with $F$ instead of
$\mathbb{R}$ and with the projective plane instead of the Euclidean plane.

!!! definition "Definition (Projection from a point)"
    <a id="def-4-2-3"></a>
    Let $L \subset \mathbb{P}^2_F$ be the projective line

    $$
    L = \{[s\xi_0 + t\eta_0 : s\xi_1 + t\eta_1 : s\xi_2 + t\eta_2] : s, t \in F\}.
    $$

    Let $L' \subset \mathbb{P}^2_F$ be a projective line with associated linear
    subspace $H$, and let $\omega \in F^3 - H$. Let $\tilde{\phi}$ be the
    linear projection

    $$
    \tilde{\phi} : F^3 = (\omega) \oplus H \to H.
    $$

    Finally, let $p = [\omega] \in \mathbb{P}^2_F$, and define the **projection
    of $L$ onto $L'$ from $p$** as

    $$
    \phi : L \to L', \quad [x] \mapsto [\tilde{\phi}(x)].
    $$

!!! proposition "Proposition"
    <a id="prop-4-2-5"></a>
    Let $L, L' \subset \mathbb{P}^2_F$ be projective lines and let
    $a_i$, $1 \leq i \leq 4$, be 4 distinct points on $L \cap U_0$. Let
    $p \in U_0 - L - L'$, and let $\phi : L \to L'$ be the projection from $p$.
    Then

    $$
    (a_1, a_2, a_3, a_4) = (\phi(a_1), \phi(a_2), \phi(a_3), \phi(a_4)).
    $$

??? proof "Proof"
    Let the notations be as in the definition of the projection. Write

    $$
    a_i = [s_i\xi_0 + t_i\eta_0 : s_i\xi_1 + t_i\eta_1 : s_i\xi_2 + t_i\eta_2], \quad 1 \leq i \leq 4.
    $$

    Let $\xi' = \tilde{\phi}(\xi)$, $\eta' = \tilde{\phi}(\eta)$. Then

    $$
    \phi(a_i) = [s_i\xi_0' + t_i\eta_0' : s_i\xi_1' + t_i\eta_1' : s_i\xi_2' + t_i\eta_2'].
    $$

    Identify $F^2$ with $U_0$. For $1 \leq i, j \leq 4$, $i \neq j$, we have

    $$
    a_j^{\#}a_i^{\flat} = \left( \frac{s_i\xi_1 + t_i\eta_1}{s_i\xi_0 + t_i\eta_0} - \frac{s_j\xi_1 + t_j\eta_1}{s_j\xi_0 + t_j\eta_0}, \frac{s_i\xi_2 + t_i\eta_2}{s_i\xi_0 + t_i\eta_0} - \frac{s_j\xi_2 + t_j\eta_2}{s_j\xi_0 + t_j\eta_0} \right).
    $$

    A routine computation shows

    $$
    a_j^{\#}a_i^{\flat} = (s_i\xi_0 + t_i\eta_0)^{-1}(s_j\xi_0 + t_j\eta_0)^{-1}(s_i t_j - s_j t_i)(\xi_1\eta_0 - \xi_0\eta_1, \xi_2\eta_0 - \xi_0\eta_2).
    $$

    Upon computing the cross-ratio, many of the factors cancel out, and we have

    $$
    (a_1, a_2, a_3, a_4) = (s_1 t_3 - s_3 t_1)(s_2 t_4 - s_4 t_2)(s_1 t_4 - s_4 t_1)^{-1}(s_2 t_3 - s_3 t_2)^{-1}.
    $$

    Comparing the two expressions for $a_i$ and $\phi(a_i)$, computing
    $(\phi(a_1), \dots, \phi(a_4))$ is a repetition of the above computation
    with $\xi, \eta$ replaced by $\xi', \eta'$. But as shown above, $\xi, \eta$
    cancel out, so the two cross-ratios are equal.

!!! definition "Definition (The cross-ratio, projective)"
    <a id="def-4-2-6"></a>
    Let

    $$
    L = \{[s\xi_0 + t\eta_0, s\xi_1 + t\eta_1, s\xi_2 + t\eta_2] : s, t \in F\}
    $$

    be a projective line in $\mathbb{P}^2_F$, and let

    $$
    a_i = [s_i\xi_0 + t_i\eta_0, s_i\xi_1 + t_i\eta_1, s_i\xi_2 + t_i\eta_2], \quad 1 \leq i \leq 4
    $$

    be distinct points on $L$. Then the **cross-ratio** of $a_1, \dots, a_4$
    is

    $$
    (a_1, a_2, a_3, a_4) = (s_1 t_3 - s_3 t_1)(s_2 t_4 - s_4 t_2)(s_1 t_4 - s_4 t_1)^{-1}(s_2 t_3 - s_3 t_2)^{-1}.
    $$

!!! remark "Remark"
    <a id="rem-4-2-7"></a>
    The projective definition of the cross-ratio makes no reference to the
    metric in the Euclidean plane. The cross-ratio is invariant under
    projective transformations. Moreover, if $a_1, \dots, a_4$ and $b_1$ lie
    on the same projective line and are pairwise distinct except possibly
    $a_1$ and $b_1$, then $a_1 = b_1$ if and only if

    $$
    (a_1, a_2, a_3, a_4) = (b_1, a_2, a_3, a_4).
    $$

!!! definition "Definition (The cross-ratio of lines)"
    <a id="def-4-2-10"></a>
    Let $L_i$, $1 \leq i \leq 4$ be projective lines in $\mathbb{P}^2_F$ with a
    common point $P$. Let $M \in \mathbb{P}^2_F$ be any projective line not
    containing $P$, and let $A_i$ be the common point of $L_i$ and $M$. Then
    the **cross-ratio of the lines** is defined as

    $$
    (L_1, L_2, L_3, L_4) := (A_1, A_2, A_3, A_4),
    $$

    independent of the choice of $M$.

Loosely speaking, any quantity unchanged by projective transformations is
called a **projective invariant**. Projective geometry dates back to the
Italian Renaissance painters, who cared much about depicting the 3-dimensional
world on a 2-dimensional canvas in a visually convincing fashion; see [GSS22].

## Homogeneous Polynomials, Projective Varieties, Conic Sections

The study of the zero locus of a set of polynomials is one of the central
topics in classical and modern mathematics.

!!! definition "Definition (Affine variety)"
    <a id="def-4-3-1"></a>
    Let $\{p_i\}_{i \in I}$ be a set of polynomials over $F$ in variables
    $x_1, \dots, x_n$. The **zero locus** of $\{p_i\}_{i \in I}$ is defined as

    $$
    V(\{p_i\}_{i \in I}) := \{(x_1, \dots, x_n) : p_i(x_1, \dots, x_n) = 0,\ \forall i \in I\}.
    $$

    The zero locus of a set of polynomials is called an **affine variety**.
    For instance, points, lines, and quadratic curves in $F^2$ are affine
    varieties.

!!! definition "Definition (Homogeneous polynomial)"
    <a id="def-4-3-2"></a>
    A **homogeneous polynomial of degree $d$** over $F$ in variables
    $x_0, \dots, x_n$ is a polynomial

    $$
    P(x_0, \dots, x_n) = \sum_{i_0, \dots, i_n} a_{i_0, \dots, i_n} x_0^{i_0} \cdots x_n^{i_n}
    $$

    where $a_{i_0, \dots, i_n} \in F$ and $i_0 + \cdots + i_n = d$.

!!! definition "Definition (Projective variety)"
    <a id="def-4-3-3"></a>
    Let $\{P_i\}_{i \in I}$ be a collection of homogeneous polynomials over $F$
    in variables $x_0, \dots, x_n$. The **zero locus** of $\{P_i\}_{i \in I}$
    is the subspace of $\mathbb{P}^n_F$ defined by

    $$
    V(\{P_i\}_{i \in I}) := \{[x_0 : \cdots : x_n] : P_i(x_0, \dots, x_n) = 0,\ \forall i \in I\}.
    $$

    A **projective variety** is the zero locus of a set of homogeneous
    polynomials in $\mathbb{P}^n_F$. Points and projective lines in
    $\mathbb{P}^2_F$ are projective varieties.

!!! remark "Remark"
    <a id="rem-4-3-4"></a>
    For $V(\{P_i\}_{i \in I})$ to be well defined, it is essential that the
    $P_i$ are not arbitrary, but homogeneous polynomials in $x_0, \dots,
    x_n$.

Let $P(x_0, \dots, x_n)$ be a homogeneous polynomial of degree $d$. Then there
is a unique polynomial $\hat{P}(y_1, \dots, y_n)$ such that

$$
P(x_0, \dots, x_n) = x_0^d \hat{P}\left( \frac{x_1}{x_0}, \dots, \frac{x_n}{x_0} \right).
$$

Conversely, given a polynomial $p(y_1, \dots, y_n)$ of degree $d$, there is an
associated homogeneous polynomial of degree $d$,

$$
\bar{p}(x_0, \dots, x_n) := x_0^d p\left( \frac{x_1}{x_0}, \dots, \frac{x_n}{x_0} \right).
$$

!!! definition "Definition (Projective completion)"
    <a id="def-4-3-6"></a>
    Let $V \subset F^n$ be the zero locus of $\{p_i\}_{i \in I}$. The
    **projective completion** (relative to $U_0$) of $V$ is the zero locus of
    $\{\bar{p}_i\}_{i \in I}$.

!!! example "Example"
    <a id="ex-4-3-7"></a>
    A projective line is the projective completion of a usual line.

!!! definition "Definition (Conic, non-degenerate)"
    <a id="def-4-3-8"></a>
    Let $Q \in F[x_0, x_1, x_2]$ be a nonzero homogeneous polynomial of degree
    $2$. Then $V(Q) \subset \mathbb{P}^2_F$ is called the **conic associated to
    $Q$**. Let $\vec{x} = (x_0, x_1, x_2)$, and write

    $$
    Q(x_0, x_1, x_2) = \sum_i q_{ii} x_i^2 + 2 \sum_{i < j} q_{ij} x_i x_j.
    $$

    Then we have a bilinear form $\bar{Q} = (q_{ij})$ such that
    $Q(x_0, x_1, x_2) = \bar{Q}(\vec{x}, \vec{x})$.

!!! definition "Definition"
    <a id="def-4-3-9"></a>
    A conic $V(Q)$ is **non-degenerate** if the bilinear form $\bar{Q}$ is
    non-degenerate.

The classification theorems of bilinear forms immediately yield

!!! theorem "Theorem (Classification of conics)"
    <a id="thm-4-3-10"></a>
    For $F = \mathbb{C}$, there is a projective transformation from a conic
    $S$ to one of the following:

    + $V(x_0^2 + x_1^2 + x_2^2)$;
    + $V(x_0^2 + x_1^2)$;
    + $V(x_0^2)$.

    For $F = \mathbb{R}$, there is a projective transformation from a conic
    $S$ to one of the following:

    + $V(x_0^2 + x_1^2 + x_2^2) = \varnothing$;
    + $V(x_0^2 + x_1^2 - x_2^2)$;
    + $V(x_0^2 + x_1^2)$;
    + $V(x_0^2 - x_1^2)$;
    + $V(x_0^2)$.

!!! remark "Remark"
    <a id="rem-4-3-13"></a>
    Over $\mathbb{R}$, the projective completions of ellipses, parabolas, and
    hyperbolas are all projectively equivalent to a non-degenerate conic: the
    three types of real quadratic curves are the conic sections, cross-sections
    of the cone by planes in three different positions. It is likely that the
    ancient Greek mathematician **Menaechmus** (?380–320 BC) identified the
    three types of real quadratic curves as conic sections, a remarkable
    achievement at the time. See [Figure 2](geometry-and-topology.pdf#page=44)
    in the lecture notes for the three types of real quadratic curves as
    cross-sections of the cone.

We define the tangent line of a conic $S$ at a point $p \in S$. Imagine a
curve on $S$ near $p$, i.e. a continuous map $\sigma : (-\epsilon,
\epsilon) \to S$, $\sigma(0) = p$. Since $p \in U_i$ for some $i$, taking
$\epsilon$ small enough the image of $\sigma$ lies in $U_i \cong F^2$, and we
assume $\sigma$ is differentiable. Now suppose $S = V(Q)$; then
$\bar{Q}(\sigma(t), \sigma(t)) = 0$. Taking derivatives and applying the
matrix product rule,

$$
0 = \frac{d}{dt} \bar{Q}(\sigma(t), \sigma(t)) = 2\bar{Q}\left( \frac{d\sigma}{dt}, \sigma(t) \right),
$$

which justifies the following

!!! definition "Definition (Tangent line of a conic)"
    <a id="def-4-3-14"></a>
    Let $S = V(Q)$ be a conic and $p \in S$. Then the **tangent line of $S$ at
    $p$** is the projective line

    $$
    T_p(S) = \{x \in \mathbb{P}^2_F : \bar{Q}(x, p) = 0\}.
    $$

For a line $L$ and a non-degenerate conic $S$ in $\mathbb{P}^2_F$, there are at
most two common points of $L$ and $S$; if $F = \mathbb{C}$, then either $L$
and $S$ intersect at two points, or $L$ is a tangent line of $S$.

!!! theorem "Theorem (Steiner)"
    <a id="thm-4-3-16"></a>
    Let $S \subset \mathbb{P}^2_F$ be a non-degenerate conic. Let
    $A_i \in S$, $1 \leq i \leq 4$, be distinct points, and let
    $P \in \mathbb{P}^2_F$. Then the cross-ratio

    $$
    (P A_1, \dots, P A_4)
    $$

    is independent of the choice of $P$. If $P = A_i$, then $P A_i$ means the
    tangent line of $S$ at $P$.

??? proof "Proof"
    By the projective invariance of the cross-ratio, we may proceed after
    applying a projective transformation to everything. By Exercise IV.1.14,
    there is a projective transformation $\phi$ with $\phi(A_1) =
    [1, 0, 0]$, $\phi(A_2) = [0, 1, 0]$, $\phi(A_3) = [0, 0, 1]$,
    $\phi(A_4) = [1, 1, 1]$. We may therefore assume without loss of
    generality that $A_1 = [1, 0, 0]$, $A_2 = [0, 1, 0]$, $A_3 = [0, 0, 1]$,
    $A_4 = [1, 1, 1]$, and that the equation of $\phi(S)$ is of the form

    $$
    (1 - k)x_0 x_1 - x_1 x_2 + k x_0 x_2 = 0
    $$

    for some $k \in F$. Let $P = [p_0, p_1, p_2]$, and let $B_i$, $i = 3, 4$,
    be the intersection of the projective line $A_1 A_2$ and $P A_i$. Doing a
    little linear algebra, we obtain

    $$
    B_3 = [p_0, p_1, 0], \quad B_4 = [p_0 - p_2, p_1 - p_2, 0].
    $$

    A straightforward computation leads to

    $$
    (P A_1, \dots, P A_4) = (A_1, A_2, B_3, B_4) = \frac{p_1 p_2 - p_0 p_1}{p_0 p_2 - p_0 p_1}.
    $$

    Since $P$ satisfies the equation of $\phi(S)$ with $x_i$ replaced by
    $p_i$, we have

    $$
    (P A_1, \dots, P A_4) = \frac{p_1 p_2 - p_0 p_1}{p_0 p_2 - p_0 p_1} = \frac{(1 - k)p_0 p_1 + k p_0 p_2 - p_0 p_1}{p_0 p_2 - p_0 p_1} = k,
    $$

    which does not depend on $P$.

!!! theorem "Theorem (Pascal)"
    <a id="thm-4-3-17"></a>
    Let $S$ be a non-degenerate conic, and let $K$ be a hexagram with vertices
    $A_i, B_i$, $1 \leq i \leq 3$, on $S$, with edges $A_i B_j$ for $i \neq j$.
    Let

    $$
    P = A_1 B_2 \cap A_2 B_1, \quad Q = A_2 B_3 \cap A_3 B_2, \quad R = A_1 B_3 \cap A_3 B_1.
    $$

    Then $P, Q, R$ are collinear.

    See [Figure 3](geometry-and-topology.pdf#page=45) in the lecture notes for
    the hexagram configuration.

??? proof "Proof"
    Let $R' = P Q \cap A_1 B_3$. It suffices to show $R = R'$.

    We consider the cross-ratio $(P Q, A_3 B_2, A_2 B_3, Q A_1)$. Let
    $D = A_1 B_2 \cap A_2 B_3$. By intersecting the 4 lines with $A_1 B_2$,

    $$
    (P Q, A_3 B_2, A_2 B_3, Q A_1) = (P, B_2, D, A_1).
    $$

    By connecting the 4 points $P, B_2, D, A_1$ to $A_2$,

    $$
    (P, B_2, D, A_1) = (A_2 B_1, A_2 B_2, A_2 B_3, A_2 A_1).
    $$

    By Steiner's Theorem,

    $$
    (A_2 B_1, A_2 B_2, A_2 B_3, A_2 A_1) = (A_3 B_1, A_3 B_2, A_3 B_3, A_3 A_1).
    $$

    Let $C := A_3 B_2 \cap A_1 B_3$. Intersecting the lines
    $A_3 B_1, A_3 B_2, A_3 B_3, A_3 A_1$ with $A_1 B_3$, we obtain

    $$
    (A_3 B_1, A_3 B_2, A_3 B_3, A_3 A_1) = (R, C, B_3, A_1).
    $$

    Combining the equations,

    $$
    (P Q, A_3 B_2, A_2 B_3, Q A_1) = (R, C, B_3, A_1).
    $$

    Intersecting $P Q, A_3 B_2, A_2 B_3, Q A_1$ with $A_1 B_3$, we obtain

    $$
    (P Q, A_3 B_2, A_2 B_3, Q A_1) = (R', C, B_3, A_1).
    $$

    Hence $(R, C, B_3, A_1) = (R', C, B_3, A_1)$, and it follows that
    $R = R'$.

