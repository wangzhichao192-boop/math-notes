# Differential Geometry of Regular Surfaces

This chapter develops the differential geometry of surfaces in
$\mathbb{R}^3$: regular surfaces, tangent spaces, the first and second
fundamental forms, Gaussian curvature, Gauss' Theorema Egregium, covariant
derivatives, parallel transport and geodesics, and the Gauss–Bonnet theorem.

## Regular Surfaces in $\mathbb{R}^3$

!!! definition "Definition (Regular surface)"
    <a id="def-5-1-1"></a>
    A subspace $S \subset \mathbb{R}^3$ is a **regular surface** if, for each
    $p \in S$, there is a neighborhood $V$ of $p$ in $S$, an open set $U$ of
    $\mathbb{R}^2$, and a homeomorphism

    $$
    \phi : U \to V \subset \mathbb{R}^3, \quad (u_1, u_2) \mapsto (\phi_1(u_1, u_2), \phi_2(u_1, u_2), \phi_3(u_1, u_2))
    $$

    such that the $\phi_i$ are smooth, i.e. have continuous derivatives of all
    orders. The map $\phi$ is called a **parametrization of $S$ near $p$**.

!!! example "Example (The sphere)"
    <a id="ex-5-1-3"></a>
    Given $r > 0$, the sphere

    $$
    S := \{(x, y, z) \in \mathbb{R}^3 : x^2 + y^2 + z^2 = r^2\}
    $$

    is a regular surface. Indeed, for $u_1 \in (-\pi, \pi)$, $u_2 \in (0, 2\pi)$,

    $$
    \phi(u_1, u_2) = (r \cos u_1 \cos u_2, r \sin u_1 \cos u_2, r \sin u_2)
    $$

    is a parametrization of $S$ near any $p \in S - \{(-1, 0, 0)\}$; a
    parametrization near $(-1, 0, 0)$ can be defined similarly.

## Tangent Vectors and Tangent Spaces

A parametrization is not an "intrinsic" property of a regular surface: for a
fixed regular surface $S$ and a point $p \in S$, there may be multiple choices
of parametrization of $S$ near $p$. One of the challenges is to find properties
independent of the choice of parametrization; tangent spaces are one of them.

!!! definition "Definition (Smooth curve)"
    <a id="def-5-2-1"></a>
    Let $I$ be an open interval. A **smooth curve on $S$** is a smooth
    (i.e. having continuous differentials of all orders) function

    $$
    \sigma : I \to S \subset \mathbb{R}^3.
    $$

    A **smooth curve through $p$** is a smooth curve $\sigma$ such that
    $p \in \operatorname{Im} \sigma$. If $\phi : U \to V$ is a local
    parametrization near $p$, a smooth curve through $p$ is of the form

    $$
    \sigma : I \to V, \quad t \mapsto \phi(u_1(t), u_2(t))
    $$

    where $u_i(t)$ are smooth functions; a smooth curve on $S$ does not depend
    on any parametrization.

!!! definition "Definition (Tangent vector, tangent line)"
    <a id="def-5-2-2"></a>
    Let $p \in S$. A **tangent vector of $S$ through $p$** is the derivative
    $\sigma'(t_0)$, where $\sigma$ is a smooth curve on $S$ with
    $\sigma(t_0) = p$. A **tangent line of $S$ through $p$** is the line
    $p + \mathbb{R}v$ where $v$ is a tangent vector of $S$ through $p$.

!!! definition "Definition (Tangent space, tangent plane)"
    <a id="def-5-2-3"></a>
    Let $p \in S$. The **tangent space of $S$ at $p$**, denoted by
    $T_p(S)$, is the set of all tangent vectors of $S$ through $p$. The
    **tangent plane of $S$ through $p$** is the set of all points $p + v$ where
    $v$ is a tangent vector.

If $\phi : U \to V$ is a parametrization of $S$ near $p$ with
$\phi(u_0) = p$, then the tangent space of $S$ through $p$ is the linear
subspace of $\mathbb{R}^3$ spanned by $\frac{\partial \phi}{\partial u_i}(u_0)$,
$i = 1, 2$.

## The First Fundamental Form, Length, and Area

!!! definition "Definition (First fundamental form)"
    <a id="def-5-3-1"></a>
    Let $S$ be a regular surface and $p \in S$. The **first fundamental form**
    of the tangent space $T_p(S)$ is the standard inner product of
    $\mathbb{R}^3$, regarded as a bilinear form, restricted to $T_p(S)$. It is
    usually denoted by $I_p$.

    Given a local parametrization $\phi(u_1, u_2)$ of $S$ near $p$, let

    $$
    v_i = \frac{\partial \phi}{\partial u_i}(p), \quad i = 1, 2.
    $$

    Then $v_1, v_2$ is a basis for $T_p(S)$. With respect to this basis the
    matrix of the first fundamental form is

    $$
    \begin{pmatrix} \langle v_1, v_1 \rangle & \langle v_1, v_2 \rangle \\ \langle v_2, v_1 \rangle & \langle v_2, v_2 \rangle \end{pmatrix}.
    $$

    For the rest of this section, whenever there is no risk of ambiguity, we
    set

    $$
    E = \langle v_1, v_1 \rangle, \quad F = \langle v_1, v_2 \rangle = \langle v_2, v_1 \rangle, \quad G = \langle v_2, v_2 \rangle.
    $$

The first fundamental form makes the length of a curve in $S$ and the area of
a "region" in $S$ into intrinsic properties, i.e. properties determined without
direct reference to the ambient space $\mathbb{R}^3$. Let
$\phi : U \to S$ be a local parametrization, $\sigma = (\sigma_1, \sigma_2) :
I \to U$ a smooth function with $I$ a closed interval; then
$\phi \cdot \sigma : I \to S$ is a smooth curve in $S$.

!!! proposition "Proposition (Length)"
    <a id="prop-5-3-5"></a>
    The length of the curve $\phi \cdot \sigma$ is

    $$
    \int_I \sqrt{ E\left( \frac{d\sigma_1}{dt} \right)^2 + 2F \frac{d\sigma_1}{dt}\frac{d\sigma_2}{dt} + G\left( \frac{d\sigma_2}{dt} \right)^2 } \, dt.
    $$

!!! proposition "Proposition (Area)"
    <a id="prop-5-3-6"></a>
    Suppose $U$ is a bounded open set in $\mathbb{R}^2$. Then the area of
    $\phi(U)$ is

    $$
    \int_U (EG - F^2)^{1/2} \, du_1 du_2.
    $$

The gist of these propositions is that, to calculate lengths and areas, it
suffices to know the fundamental form, which makes no reference to the way $S$
is placed in $\mathbb{R}^3$.

!!! definition "Definition (Riemann metric on an open set)"
    <a id="def-5-3-7"></a>
    Let $U$ be an open set in $\mathbb{R}^2$. A **Riemann metric on $U$** is a
    collection of real-valued functions $E, F, G$ on $U$ such that for
    $x \in U$ the matrix

    $$
    \begin{pmatrix} E & F \\ F & G \end{pmatrix}
    $$

    is positive definite.

!!! example "Example"
    <a id="ex-5-3-8"></a>
    Let $S$ be a regular surface with a local parametrization
    $\phi : U \to S$. The corresponding first fundamental form is a Riemann
    metric on $U$.

!!! example "Example (Upper half-plane model)"
    <a id="ex-5-3-9"></a>
    Let $H = \{(x, y) \in \mathbb{R}^2 : y > 0\}$, and let

    $$
    E = G = y^{-2}, \quad F = 0.
    $$

    These form a Riemann metric on $H$. This is the upper half-plane model for
    hyperbolic geometry.

!!! example "Example (Poincaré disk model)"
    <a id="ex-5-3-10"></a>
    Let $D = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 < 1\}$ be the unit disk, and
    let

    $$
    E = G = 4[1 - (x^2 + y^2)]^{-2}, \quad F = 0,
    $$

    which form a Riemann metric on $D$. This is the Poincaré disk model for
    hyperbolic geometry.

A natural question is whether an arbitrary Riemann metric on $U$ is the first
fundamental form of some regular surface; the answer is negative. Indeed, both
Riemann metrics above are not the first fundamental form of any
parametrization $\phi : H \to S$ or $\phi : D \to S$; this is a consequence of
a theorem by Hilbert ([DC16]).

## Cross Products in $\mathbb{R}^3$

!!! definition "Definition (Cross product)"
    <a id="def-5-4-1"></a>
    Let $u = (u_1, u_2, u_3)$, $v = (v_1, v_2, v_3) \in \mathbb{R}^3$. The
    **cross product** $u \times v$ is

    $$
    u \times v = (u_2 v_3 - u_3 v_2, u_3 v_1 - u_1 v_3, u_1 v_2 - u_2 v_1).
    $$

!!! remark "Remark"
    <a id="rem-5-4-2"></a>
    Let $e_1, e_2, e_3$ be the canonical basis of $\mathbb{R}^3$. Formally, one
    may write

    $$
    u \times v = \det \begin{pmatrix} e_1 & e_2 & e_3 \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{pmatrix}.
    $$

    The cross product is bilinear, skew-symmetric, and orthogonal to both
    factors: $\langle u \times v, u \rangle = \langle u \times v, v \rangle =
    0$.

## The Second Fundamental Form and the Gaussian Curvature

Intuitively, a plane in $\mathbb{R}^3$, a sphere, and a hyperbolic surface are
different in the sense that they are "bent" in different ways. In this section
we define the second fundamental form and the Gaussian curvature, which measure
the way regular surfaces are "bent" in $\mathbb{R}^3$.

!!! definition "Definition (Unit normal vector)"
    <a id="def-5-5-1"></a>
    Let $S$ be a regular surface in $\mathbb{R}^3$ and $p \in S$. Given a
    local parametrization $\phi : U \to S$ with $p \in \operatorname{Im} \phi$,
    let $\phi_i := \frac{\partial \phi}{\partial u_i}$. The **unit normal
    vector** at $p$ is

    $$
    n(p) := \phi_1 \times \phi_2 / |\phi_1 \times \phi_2|.
    $$

!!! remark "Remark"
    <a id="rem-5-5-2"></a>
    Regardless of the choice of the local parametrization, the normal vector
    $n(p)$ is always one of the two unit vectors orthogonal to the tangent
    plane of $p$; exactly which one depends on the choice of the local
    parametrization. For the rest of this section we consider $n(p)$ only with
    respect to a fixed local parametrization.

!!! definition "Definition (Gaussian map)"
    <a id="def-5-5-3"></a>
    Let $S$ be a regular surface in $\mathbb{R}^3$ with a local parametrization
    $\phi : U \to S$, and let $S^2$ denote the unit sphere in $\mathbb{R}^3$.
    The **Gaussian map**

    $$
    g : \phi(U) \to S^2
    $$

    is defined by $g(p) = n(p)$.

!!! definition "Definition (Tangent map of $g$)"
    <a id="def-5-5-4"></a>
    Let $v \in T_p(S)$, and let $\sigma$ be a smooth path with $\sigma(0) = p$
    and $\sigma'(0) = v$. The **tangent map of $g$**, denoted by $dg$, sends
    $v$ to

    $$
    \left. \frac{d}{dt} g(\sigma(t)) \right|_{t=0}.
    $$

    It is a well-defined linear endomorphism of $T_p(S)$.

!!! definition "Definition (Second fundamental form)"
    <a id="def-5-5-6"></a>
    The **second fundamental form of $S$ at $p$** is the bilinear form
    $II$ on $T_p(S)$ defined by

    $$
    II(v_1, v_2) = -I(dg(v_1), v_2).
    $$

    Let $L$ be the matrix of $II$ with respect to the basis
    $\phi_i$, $i = 1, 2$; then

    $$
    L = \begin{pmatrix} \langle n, \phi_{11} \rangle & \langle n, \phi_{12} \rangle \\ \langle n, \phi_{21} \rangle & \langle n, \phi_{22} \rangle \end{pmatrix},
    $$

    where $\phi_{ij} = \frac{\partial^2 \phi}{\partial u_i \partial u_j}$.
    In particular, $II$ is symmetric. Moreover, if $T$ is the matrix of $dg$
    with respect to the basis $\phi_i$ and $E$ the matrix of $I$, then
    $L = -T^t E$.

!!! definition "Definition (Gaussian curvature)"
    <a id="def-5-5-9"></a>
    The **Gaussian curvature of $S$ at $p$** is

    $$
    K(p) := \frac{\det L(p)}{\det E(p)}.
    $$

!!! theorem "Theorem"
    <a id="thm-5-5-10"></a>
    Let $\phi : U \to S$ be a local parametrization with $0 \in U$ and
    $\phi(0) = p$. Suppose $K(q) \neq 0$ in a small neighborhood of $p$. Let
    $\Omega$ be a small neighborhood of $0$, and let $A(\Omega)$, $A_1(\Omega)$
    and $A_2(\Omega)$ denote the areas of $\Omega$, $\phi(\Omega)$ and
    $g\phi(\Omega)$, respectively. Then

    $$
    \lim_{A(\Omega) \to 0} \frac{A_2(\Omega)}{A_1(\Omega)} = \left| \frac{\det L(p)}{\det E(p)} \right|.
    $$

??? proof "Proof"
    We have

    $$
    A_1(\Omega) = \int_\Omega (\det E)^{1/2} \, du_1 du_2,
    $$

    and $L = -T^t E$. Therefore

    $$
    A_2(\Omega) = \int_\Omega (\det(T^t E T))^{1/2} \, du_1 du_2 = \int_\Omega |\det T| \, du_1 du_2,
    $$

    and the theorem follows from the mean value theorem for integrals.

The tangent map $dg$ is self-adjoint with respect to the first fundamental
form: $I(dg(v_1), v_2) = I(v_1, dg(v_2))$ for all $v_1, v_2 \in T_p(S)$.
Consequently $dg$ has two real eigenvalues, called the **principal curvatures**
of $S$ at $p$, denoted by $k_1(p)$ and $k_2(p)$.

!!! proposition "Proposition"
    <a id="prop-5-5-12"></a>
    We have $K(p) = k_1(p) k_2(p)$.

!!! example "Example (Visualizing curvature)"
    <a id="ex-5-5-17"></a>
    Let $\phi_1(u_1, u_2) = (u_1, u_2, u_1^2 + u_2^2)$ be a local
    parametrization of a regular surface $S_1$ near $0$. Then the Gaussian
    curvature of $S_1$ at $0$ is positive: the two coordinate curves "bent
    towards the same side" of the tangent plane, a characteristic of positive
    curvature. Let $\phi_2(u_1, u_2) = (u_1, u_2, u_1^2 - u_2^2)$; then the
    Gaussian curvature at $0$ is negative, and the two coordinate curves "bent
    towards different sides". Let $\phi_3(u_1, u_2) = (u_1, u_2, u_2)$; then
    the Gaussian curvature at $0$ is zero: one of the coordinate curves "does
    not bent" at all.

## Gauss' Theorema Egregium

The Gaussian curvature of a regular surface depends a priori on how the surface
is embedded in $\mathbb{R}^3$. Surprisingly, this is not the case: the Gaussian
curvature is determined by the first fundamental form, an "intrinsic" property
of the surface. This is one of the many great observations made by Gauss.

Let $S$ be a smooth surface in $\mathbb{R}^3$ parametrized by
$\phi = \phi(u_1, u_2)$. Let $E_{ij} = \langle \phi_i, \phi_j \rangle$; then
$E = (E_{ij})$ is the first fundamental form. Let
$L_{ij} = \langle n, \phi_{ij} \rangle = -\langle n_i, \phi_j \rangle$; then
$L = (L_{ij})$ is the second fundamental form, and the Gaussian curvature is
$K = \det L / \det E$.

!!! theorem "Theorem (Gauss, Theorema Egregium)"
    <a id="thm-5-6-1"></a>
    The Gaussian curvature is determined by the first fundamental form.

Define the **connection coefficients** (sometimes called Christoffel symbols)
$\Gamma^k_{ij} = \Gamma^k_{ij}(u_1, u_2)$ by

$$
\phi_{ij} = \sum_k \Gamma^k_{ij} \phi_k + L_{ij} n.
$$

!!! lemma "Lemma"
    <a id="lem-5-6-2"></a>
    The functions $\Gamma^k_{ij} = \Gamma^k_{ij}(u_1, u_2)$ are determined by
    $E$ and its derivatives.

??? proof "Proof"
    Since $\phi_{ij} = \phi_{ji}$, we have $\Gamma^k_{ij} = \Gamma^k_{ji}$.
    A routine computation shows

    $$
    \partial_k E_{ij} = \sum_l (\Gamma^l_{ik} E_{lj} + \Gamma^l_{jk} E_{il}),
    $$

    from which we deduce

    $$
    (\Gamma^1_{11} \ \Gamma^2_{11}) E = (2^{-1}\partial_1 E_{11}, \ \partial_1 E_{12} - 2^{-1}\partial_2 E_{11}),
    $$

    $$
    (\Gamma^1_{12} \ \Gamma^2_{12}) E = (2^{-1}\partial_2 E_{11}, \ 2^{-1}\partial_1 E_{22}),
    $$

    and

    $$
    (\Gamma^1_{22} \ \Gamma^2_{22}) E = (\partial_2 E_{12} - 2^{-1}\partial_1 E_{22}, \ 2^{-1}\partial_2 E_{22}).
    $$

    The lemma then follows.

??? proof "Proof (of Theorema Egregium)"
    Regard vectors in $\mathbb{R}^3$ as column vectors. As before, let
    $T = (T_{ij})$ be the matrix of $dg$ with respect to the basis
    $\phi_i$, $i = 1, 2$. Then

    $$
    \begin{pmatrix} \partial_1 n & \partial_2 n \end{pmatrix} = \begin{pmatrix} \phi_1 & \phi_2 \end{pmatrix} T,
    $$

    and a straightforward computation shows

    $$
    -L = T^t E. \tag{*}
    $$

    For $i = 1, 2$, let

    $$
    \Gamma_i = \begin{pmatrix} \Gamma^1_{i1} & \Gamma^1_{i2} \\ \Gamma^2_{i1} & \Gamma^2_{i2} \end{pmatrix}, \quad L_i = \begin{pmatrix} L_{i1} & L_{i2} \end{pmatrix}, \quad T_i = \begin{pmatrix} T_{1i} \\ T_{2i} \end{pmatrix},
    $$

    and we have

    $$
    \partial_i \begin{pmatrix} \phi_1 & \phi_2 & n \end{pmatrix} = \begin{pmatrix} \phi_1 & \phi_2 & n \end{pmatrix} \begin{pmatrix} \Gamma_i & T_i \\ L_i & 0 \end{pmatrix}.
    $$

    By $\partial_1 \partial_2 = \partial_2 \partial_1$, we have

    $$
    \partial_1 \begin{pmatrix} \Gamma_2 & T_2 \\ L_2 & 0 \end{pmatrix} + \begin{pmatrix} \Gamma_2 & T_2 \\ L_2 & 0 \end{pmatrix} \begin{pmatrix} \Gamma_1 & T_1 \\ L_1 & 0 \end{pmatrix} = \partial_2 \begin{pmatrix} \Gamma_1 & T_1 \\ L_1 & 0 \end{pmatrix} + \begin{pmatrix} \Gamma_1 & T_1 \\ L_1 & 0 \end{pmatrix} \begin{pmatrix} \Gamma_2 & T_2 \\ L_2 & 0 \end{pmatrix}.
    $$

    Computing the upper-left block, we get

    $$
    \Gamma_2 \Gamma_1 + T_2 L_1 + \partial_2 \Gamma_1 = \Gamma_1 \Gamma_2 + T_1 L_2 + \partial_1 \Gamma_2,
    $$

    from which it follows that the matrix

    $$
    T_1 L_2 - T_2 L_1 = \begin{pmatrix} T_{11} & -T_{12} \\ T_{21} & -T_{22} \end{pmatrix} \begin{pmatrix} L_{21} & L_{22} \\ L_{11} & L_{12} \end{pmatrix} = \begin{pmatrix} 0 & -K \\ K & 0 \end{pmatrix} E
    $$

    is determined by the $\Gamma_i$, $i = 1, 2$; the last equality follows from
    (*). A straightforward computation shows that the $(2,1)$-entry minus the
    $(1,2)$-entry of the matrix above is $-\det T (E_{11} + E_{22})$, which by
    the lemma is $K(E_{11} + E_{22})$. Theorema Egregium follows.

## Covariant Derivatives, Parallel Transport and Geodesics

!!! definition "Definition (Vector field on a surface)"
    <a id="def-5-7-1"></a>
    Let $S$ be a regular surface and $\phi : U \to S$ a local parametrization.
    A **vector field on $S$** is a smooth map $\nu : \phi(U) \to
    \mathbb{R}^3$ such that $\nu(p) \in T_{\phi(p)}(S)$ for all
    $p \in \phi(U)$.

Let $u : I \to U$ be a smooth curve and $\sigma = \phi u : I \to \phi(U)$ a
smooth curve; let $\omega = \sigma'(t_0)$ and let $\nu$ be a vector field on
$\phi(U)$. Writing

$$
\nu(t) = \sum_{i=1}^{2} \nu_i(t)\phi_i(u(t)),
$$

a routine computation shows

$$
\nu'(t) = \sum_{i,j,k} (\nu_k' + \nu_i u_j' \Gamma^k_{ij}) \phi_k + \sum_{i,j} \nu_i u_j' L_{ij} n.
$$

!!! definition "Definition (Covariant derivative)"
    <a id="def-5-7-2"></a>
    The **covariant derivative of $\nu$ at $\omega$**, denoted by
    $\nabla_\omega(\nu)$, is defined as the projection of $\nu'(t_0)$ onto
    $T_{\phi(u(t_0))}(S)$:

    $$
    \nabla_\omega(\nu(t_0)) = \sum_{i,j,k} (\nu_k' + \nu_i u_j' \Gamma^k_{ij}) \phi_k(t_0).
    $$

!!! remark "Remark"
    <a id="rem-5-7-3"></a>
    $\nabla_\omega(\nu)$ is well defined (independent of the choice of
    $\sigma$) and linear in $\nu$ and $\omega$.

A vector field may be defined not only on an open set of $S$, but only along a
curve $\sigma : I \to S$.

!!! definition "Definition (Vector field along a curve)"
    <a id="def-5-7-4"></a>
    Let $\sigma : I \to S$ be a smooth curve on a regular surface $S$. A
    **vector field $\nu$ along $\sigma$** is a smooth map
    $\nu : \sigma(I) \to \mathbb{R}^3$ such that $\nu(t) \in T_{\sigma(t)}(S)$
    for all $t \in I$.

!!! definition "Definition (Covariant derivative along a curve)"
    <a id="def-5-7-5"></a>
    Let $\nu$ be a vector field along $\sigma$, written
    $\nu(t) = \sum_{i=1}^{2} \nu_i(t)\phi_i(u(t))$. The **covariant derivative
    of $\nu$ at $\sigma'(t_0)$**, denoted by $\nabla_{\sigma'(t_0)}(\nu)$, is
    defined by the same formula as above.

!!! remark "Remark"
    <a id="rem-5-7-6"></a>
    Notice the difference between the two definitions: in the former, $\nu$ is
    defined on an open set of $S$, and the formula is a consequence of a
    routine computation performed in $\mathbb{R}^3$; in the latter, $\nu$ is
    defined only along a curve, and the formula defines an "abstract" notion of
    covariant derivative.

!!! definition "Definition (Parallel transport)"
    <a id="def-5-7-7"></a>
    Let $\sigma : I \to S$ be a smooth curve on a regular surface $S$. A
    **parallel transport** of a tangent vector $\omega \in T_{\sigma(t_0)}(S)$
    along $\sigma$ is a vector field $\nu$ along $\sigma$ such that
    $\nabla_{\sigma'(t)}(\nu(t)) = 0$ for all $t \in I$. Two vectors in a
    parallel transport $\nu$ are said to be **parallel**.

!!! proposition "Proposition"
    <a id="prop-5-7-11"></a>
    Let $\sigma : I \to S$ be a smooth curve on a regular surface $S$, and let
    $\omega \in T_{\sigma(t_0)}(S)$. Then there exists a unique parallel
    transport of $\omega$ along $\sigma$.

??? proof "Proof"
    The existence and uniqueness of parallel transports is a consequence of
    the existence and uniqueness of solutions to the ordinary differential
    equation

    $$
    \sum_{i,j,k} (\nu_k' + \nu_i u_j' \Gamma^k_{ij}) \phi_k(t) = 0
    $$

    with initial condition $\nu(t_0) = \omega$.

!!! definition "Definition (Geodesic)"
    <a id="def-5-7-12"></a>
    A **geodesic** on a regular surface $S$ is a smooth curve
    $\sigma : I \to S$ such that $\sigma'(t)$ is parallel to itself along
    $\sigma$ for all $t \in I$. In other words,
    $\nabla_{\sigma'(t)}(\sigma'(t)) = 0$ for all $t \in I$.

!!! proposition "Proposition"
    <a id="prop-5-7-13"></a>
    Let $p \in S$ and $\omega \in T_p(S)$. Then there exists a unique geodesic
    $\sigma : [-\epsilon, \epsilon] \to S$ such that $\sigma(0) = p$ and
    $\sigma'(0) = \omega$ for small enough $\epsilon > 0$.

??? proof "Proof"
    By definition, the geodesic $\sigma$ with $\sigma(0) = p$ and
    $\sigma'(0) = \omega$ is characterized by the ordinary differential
    equation with the additional condition $\nu_k = u_k'$ for $k = 1, 2$:

    $$
    \sum_{i,j,k} (u_k'' + u_i' u_j' \Gamma^k_{ij}) \phi_k(t) = 0
    $$

    with the initial condition $\sigma'(0) = \omega$.

!!! example "Example (Parallel transport on a latitude of the sphere)"
    <a id="ex-5-7-14"></a>
    Let $\phi(u, v) = (\cos u \cos v, \sin u \cos v, \sin v)$ be a
    parametrization of the sphere, where $0 \leq u < 2\pi$ and
    $-\pi/2 < v < \pi/2$. Fix $v$ and consider the latitude curve
    $\sigma(t) = \phi(t, v)$. We find the parallel transport of a tangent
    vector

    $$
    \nu_0 = \alpha_0 \phi_u(0, v) + \beta_0 \phi_v(0, v) \in T_{\sigma(0)}(S^2)
    $$

    along $\sigma$. A routine computation shows that

    $$
    \phi_u = (-\sin u \cos v, \cos u \cos v, 0), \quad \phi_v = (-\cos u \sin v, -\sin u \sin v, \cos v)
    $$

    form an orthogonal basis of $T_p(S^2)$, and the connection coefficients
    are

    $$
    \Gamma^u_{uu} = 0, \quad \Gamma^v_{uu} = \sin v \cos v, \quad \Gamma^u_{uv} = -\sin v \cos v, \quad \Gamma^v_{uv} = 0.
    $$

    Writing the parallel transport as $\nu(t) = \alpha(t)\phi_u + \beta(t)
    \phi_v$, we have

    $$
    \nabla_{\sigma'(t)}(\nu) = (\alpha' - \beta \sin v \cos v)\phi_u + (\beta' + \alpha \sin v \cos v)\phi_v.
    $$

    Hence $\nu$ is a parallel transport of $\nu_0$ along $\sigma$ if and only
    if $\alpha, \beta$ solve

    $$
    \begin{pmatrix} \alpha' \\ \beta' \end{pmatrix} = \begin{pmatrix} 0 & -\sin v \cos v \\ \sin v \cos v & 0 \end{pmatrix} \begin{pmatrix} \alpha \\ \beta \end{pmatrix}.
    $$

    Solving the linear differential equation,

    $$
    \begin{pmatrix} \alpha(t) \\ \beta(t) \end{pmatrix} = \begin{pmatrix} R \cos(\sin v \cos v \, t + \theta) \\ R \sin(\sin v \cos v \, t + \theta) \end{pmatrix}
    $$

    where $R, \theta$ are constants determined by $\alpha_0$ and $\beta_0$.

!!! remark "Remark"
    <a id="rem-5-7-15"></a>
    The example above shows that the parallel transport of a tangent vector
    along a closed curve does not necessarily return to its original position.

The geodesics on the unit sphere are precisely the great circles.

!!! proposition "Proposition"
    <a id="prop-5-7-17"></a>
    Let $\omega, \nu$ be two parallel transports of tangent vectors along a
    curve $\sigma$ on a regular surface $S$. Then the inner product
    $\langle \omega(t), \nu(t) \rangle$ is constant with respect to $t$.

Another interpretation of the geodesics is given by the notion of geodesic
curvature.

!!! definition "Definition (Algebraic value of a curve)"
    <a id="def-5-7-19"></a>
    Let $\sigma : I \to S$ be a smooth curve on an oriented regular surface
    $S$. Let $\omega$ be a differentiable vector field along $\sigma$ with
    unit length. Then we have

    $$
    \nabla_{\sigma'(t)}(\omega) = \lambda(t) n \times \omega
    $$

    for some differentiable function $\lambda : I \to \mathbb{R}$. The function
    $\lambda$ is called the **algebraic value** of $\sigma$ and is denoted by
    $[\nabla_{\sigma'(t)}(\omega)]$.

!!! definition "Definition (Parametrized by arc length)"
    <a id="def-5-7-20"></a>
    Let $\sigma : I \to S$ be a smooth curve on a regular surface $S$. The
    curve $\sigma$ is said to be **parametrized by arc length** if
    $I(\sigma'(s), \sigma'(s)) = 1$ for all $t \in I$.

!!! definition "Definition (Geodesic curvature)"
    <a id="def-5-7-21"></a>
    Let $\sigma : I \to S$ be a smooth curve on an oriented regular surface $S$
    parametrized by arc length. The **geodesic curvature of $\sigma$ at $s$**
    is defined as

    $$
    \kappa_g(s) = [\nabla_{\sigma'(s)}(\sigma'(s))].
    $$

!!! lemma "Lemma"
    <a id="lem-5-7-22"></a>
    Let $\alpha, \beta$ be differentiable real-valued functions on
    $I = [t_0, t_1]$ with $\alpha^2 + \beta^2 = 1$, and let $\psi_0 \in
    \mathbb{R}$ such that $\alpha(0) = \cos \psi_0$ and $\beta(0) = \sin
    \psi_0$. Then the differentiable function $\psi : I \to \mathbb{R}$
    defined by

    $$
    \psi(t) = \psi_0 + \int_0^t (\alpha\beta' - \alpha'\beta)(\tau)\, d\tau
    $$

    satisfies $\alpha(t) = \cos \psi(t)$ and $\beta(t) = \sin \psi(t)$ for all
    $t \in I$, and $\psi(t_0) = \psi_0$.

??? proof "Proof"
    It suffices to show that

    $$
    (\alpha - \cos\psi)^2 + (\beta - \sin\psi)^2 = 2 - 2(\alpha\cos\psi + \beta\sin\psi)
    $$

    is constantly zero, i.e. that $A := \alpha\cos\psi + \beta\sin\psi \equiv 1$.
    By $\alpha^2 + \beta^2 = 1$ we have $\alpha'\alpha + \beta'\beta = 0$;
    therefore $A' = 0$, so $A$ is constant. Since $A(0) = 1$, we have
    $A(t) = 1$ for all $t \in I$.

!!! lemma "Lemma"
    <a id="lem-5-7-23"></a>
    Let $\nu$ and $\omega$ be two differentiable vector fields along a curve
    $\sigma : I \to S$ on an oriented regular surface $S$ with
    $I(\nu(t), \nu(t)) = I(\omega(t), \omega(t)) = 1$ for all $t \in I$. Let
    $\psi$ be a choice of angle from $\nu$ to $\omega$. Then

    $$
    [\nabla_{\sigma'(t)}(\omega)] - [\nabla_{\sigma'(t)}(\nu)] = \psi'.
    $$

??? proof "Proof"
    Let $\bar{\nu} = n \times \nu$, $\bar{\omega} = n \times \omega$. Then

    $$
    \omega = (\cos\psi)\nu + (\sin\psi)\bar{\nu}, \quad
    \bar{\omega} = \nu \times \omega = (\cos\psi)\bar{\nu} - (\sin\psi)\nu.
    $$

    Differentiating the first equation,

    $$
    \omega' = -(\sin\psi)\psi'\nu + (\cos\psi)\nu' + (\cos\psi)\psi'\bar{\nu} + (\sin\psi)\bar{\nu}'.
    $$

    Then

    $$
    \langle \omega', \bar{\omega} \rangle = \psi' + \langle \nu', \bar{\nu} \rangle,
    $$

    using $\langle \nu, \bar{\nu} \rangle = 0$. The lemma follows.

!!! corollary "Corollary"
    <a id="cor-5-7-24"></a>
    The geodesics are precisely the curves with zero geodesic curvature.

!!! example "Example (Plane curvature)"
    <a id="ex-5-7-26"></a>
    Fix an orientation on $\mathbb{R}^2$. Let
    $\sigma : I = [t_0, t_1] \to \mathbb{R}^2$ be a smooth plane curve
    parametrized by arc length, and let $\omega(s) \in \mathbb{R}^2$ be a unit
    vector such that $(\sigma'(s), \omega(s))$ form an orthogonal basis. Then
    the geodesic curvature of $\sigma$ is simply the curvature $\kappa(s)$ of
    $\sigma$ at $\sigma(s)$, characterized by

    $$
    \sigma''(s) = \kappa(s)\omega(s).
    $$

    Let $\theta(s)$ be the angle from a fixed direction to $\sigma'(s)$; then
    $\sigma'(s) = \cos\theta\, e_1 + \sin\theta\, e_2$ and
    $\kappa(s) = \theta'(s)$. When $\sigma$ is a simple closed curve,

    $$
    \int_\sigma \kappa(s)\, ds = 2\pi.
    $$

## Euler Characteristics and the Gauss–Bonnet Theorem

In this section we state, without proof, the Gauss–Bonnet theorem that
associates the Gaussian curvature of a regular surface (without boundary) to
its global topological properties.

Let $\phi : U \to S$ be a local parametrization of an oriented regular surface
$S$ with $U$ an open ball. Let $\alpha : I \to S$ be a piecewise smooth curve
on $S$, corresponding to a partition $s_0 < s_1 < \cdots < s_{k+1}$ of $I$,
over each piece parametrized by arc length; let $\alpha_i : [s_i, s_{i+1}] \to
S$ be the smooth pieces, and let $\theta_i$ be the angle from
$\alpha_i'(s_{i+1})$ to $\alpha_{i+1}'(s_{i+1})$.

!!! theorem "Theorem (Local Gauss–Bonnet)"
    <a id="thm-5-8-1"></a>
    If $s_0 = s_{k+1}$ and $R$ is the region with boundary $\alpha$ in $S$,
    then we have

    $$
    \sum_{i=0}^{k} \int_{s_i}^{s_{i+1}} \kappa_g(s)\, ds + \int\int_R K\, dA + \sum_i \theta_i = 2\pi.
    $$

Recall that we have defined the Euler characteristic of a polyhedron as
$V - E + F$, where $V, E, F$ denote the numbers of vertices, edges, and faces.

!!! definition "Definition (Euler characteristic of a surface)"
    <a id="def-5-8-2"></a>
    The **Euler characteristic of a regular surface $S$** is the Euler
    characteristic of a polyhedron which is homeomorphic to $S$. It is denoted
    by $\chi(S)$.

!!! remark "Remark"
    <a id="rem-5-8-3"></a>
    It is a nontrivial fact that this definition is intrinsic to $S$, but we
    will not prove it.

!!! theorem "Theorem (Gauss–Bonnet)"
    <a id="thm-5-8-5"></a>
    Let $S$ be a compact regular surface without boundary. Then we have

    $$
    \frac{1}{2\pi} \int_S K\, d\sigma = \chi(S),
    $$

    where, over a local parametrization, $d\sigma = (\det E)^{1/2} du_1 du_2$.

