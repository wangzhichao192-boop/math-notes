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
    Let $U \subseteq E$ be open in a finite-dimensional real vector space
    $E$, and $p \in \mathbb{N}$. A **$p$-form** on $U$ is a map
    $\alpha : U \to \Lambda^p(E^\vee)$. The space of $p$-forms of class
    $C^\ell$ is $\Omega^p_\ell(U)$; a $0$-form is just a function on $U$.
    The **wedge** $\alpha \wedge \beta$ of a $p$-form $\alpha$ and a
    $q$-form $\beta$ is the $(p + q)$-form $(\alpha \wedge \beta)(x) =
    \alpha(x) \wedge \beta(x)$.

!!! proposition "Proposition (Identification of tensor-hom)"
    <a id="prop-dg-1-2"></a>
    For a free $K$-module $V$ of finite rank and any $K$-module $W$,
    there is a $K$-linear isomorphism
    $V^\vee \otimes W \cong \mathrm{Hom}_K(V, W)$,
    $\varphi \otimes w \mapsto (x \mapsto \varphi(x) w)$. The inverse
    sends $f \in \mathrm{Hom}_K(V, W)$ to
    $\sum_i e_i^\vee \otimes f(e_i)$.

!!! definition "Definition (Exterior derivative)"
    <a id="def-dg-1-3"></a>
    For a differentiable $p$-form $\alpha : U \to \Lambda^p(E^\vee)$,
    its **exterior derivative** $d\alpha$ is the $(p+1)$-form obtained
    by composing $D\alpha : U \to \mathrm{Hom}(E, \Lambda^p(E^\vee))
    \cong E^\vee \otimes \Lambda^p(E^\vee)$ with the map
    $\varphi \otimes \beta \mapsto \varphi \wedge \beta$ into
    $\Lambda^{p+1}(E^\vee)$.

??? proof "Proof (Leibniz rule for $d$)"
    By multilinearity, reduce to $\alpha = f \alpha_0$,
    $\beta = g \beta_0$ with $f, g : U \to \mathbb{R}$ differentiable
    and $\alpha_0 \in \Lambda^p(E^\vee)$, $\beta_0 \in \Lambda^q(E^\vee)$.
    Then $\alpha \wedge \beta = f g\, \alpha_0 \wedge \beta_0$, and
    $d(\alpha \wedge \beta) = d(fg) \wedge \alpha_0 \wedge \beta_0$.
    By the ordinary Leibniz rule, $d(fg) = g\, df + f\, dg$. So
    $d(\alpha \wedge \beta) = g\, df \wedge \alpha_0 \wedge \beta_0 +
    f\, dg \wedge \alpha_0 \wedge \beta_0$. Move the factor $f$ through
    $g\, df \wedge \alpha_0 \wedge \beta_0$: the wedge is alternating, so
    moving $f$ past $\alpha_0$ (a $p$-form) contributes $(-1)^p$. Thus
    $g\, df \wedge \alpha_0 \wedge \beta_0 = (g\, \alpha_0) \wedge
    df \wedge \beta_0 = d\alpha \wedge \beta$ (up to signs from
    moving $g$ past $df$, which is a $1$-form and contributes no
    sign because $df \wedge g = g\, df$ as $1$-forms commute with
    scalars). The second term is
    $f\, dg \wedge \alpha_0 \wedge \beta_0 = (-1)^p \alpha \wedge d\beta$
    (move $f$ past the $p$-form $\alpha_0$ to recover $\alpha = f
    \alpha_0$).

??? proof "Proof ($d^2 = 0$)"
    By linearity, reduce to $\alpha = f \beta$ with $\beta \in
    \Lambda^p(E^\vee)$ and $f$ a $C^2$-function. Then
    $d\alpha = df \wedge \beta$, so
    $d^2 \alpha = d(df) \wedge \beta$. The bilinear form $D^2 f(x)$
    on $E$ is symmetric, so it lies in the symmetric component
    $S^2(E^\vee) \subseteq E^\vee \otimes E^\vee$. Its image under
    the antisymmetrisation map
    $\mathrm{alt}: E^\vee \otimes E^\vee \to \Lambda^2(E^\vee)$
    is therefore $0$ (the symmetric part of the image is
    $D^2 f(x)$ itself, and the antisymmetric part of a symmetric
    tensor is $0$). Hence $d(df)(x) = 0$ for all $x$, giving
    $d^2 \alpha = 0$.

!!! definition "Definition (Integral of an $n$-form)"
    <a id="def-dg-1-6"></a>
    Fix a non-zero $\xi \in \det(E)$ and let $\mu_\xi$ be the Haar measure
    on $E$ with $\mu_\xi(\{(a_1, \ldots, a_n) : 0 < a_i \leq 1\}) = 1$.
    For an $n$-form $\alpha : U \to \Lambda^n(E^\vee)$ with $\alpha(\xi)$
    integrable, the **integral** of $\alpha$ on $U$ is
    $\int_U \alpha := \int_U \alpha(x)(\xi)\, d\mu_\xi(x)$. It depends
    only on the orientation $\mathbb{R}_{>0} \cdot \xi$.

## Mollification

!!! definition "Definition (Standard mollifier)"
    <a id="def-dg-2-1"></a>
    The function $b : \mathbb{R} \to [0, 1]$,
    $b(t) = \exp\!\bigl(\tfrac{1}{t^2 - 1}\bigr)$ for $|t| < 1$ and
    $b(t) = 0$ otherwise, is $C^\infty$. The **standard mollifier** on
    $\mathbb{R}^n$ is
    $\rho(x) := c_n b(\|x\|)$ with $c_n > 0$ chosen so that
    $\int_{\mathbb{R}^n} \rho\, d\mu = 1$, and $\rho_\varepsilon(x) :=
    \varepsilon^{-n} \rho(x / \varepsilon)$ for $\varepsilon > 0$.

!!! proposition "Proposition (Mollification is smoothing)"
    <a id="prop-dg-2-2"></a>
    For $f \in L^1_{\mathrm{loc}}(\mathbb{R}^n)$ the **mollified function**
    $f_\varepsilon := f \ast \rho_\varepsilon$ is $C^\infty$ on the
    $\varepsilon$-interior of the domain, and $f_\varepsilon \to f$
    almost everywhere (and in $L^1_{\mathrm{loc}}$) as $\varepsilon \to 0$.

!!! definition "Definition (Local chart, smooth atlas)"
    <a id="def-dg-2-3"></a>
    A **chart** on a topological space $X$ is a homeomorphism
    $\varphi : U \to V \subseteq \mathbb{R}^n$ from an open $U \subseteq X$
    to an open subset of $\mathbb{R}^n$. A $C^\ell$-atlas is a family of
    charts covering $X$ with pairwise $C^\ell$-compatible overlaps; two
    atlases define the same $C^\ell$-structure iff their union is again
    an atlas.

## Vector Fields

!!! definition "Definition (Vector field)"
    <a id="def-dg-3-1"></a>
    A (smooth) **vector field** on an open $U \subseteq \mathbb{R}^n$ is
    a $C^\infty$ map $X : U \to \mathbb{R}^n$. Equivalently, it is a
    derivation $C^\infty(U) \to C^\infty(U)$, $f \mapsto X(f)$ with
    $X(fg) = f X(g) + g X(f)$.

!!! definition "Definition (Lie derivative, Lie bracket)"
    <a id="def-dg-3-2"></a>
    For a vector field $X$ and a differential form $\alpha$, the
    **Lie derivative** $\mathcal{L}_X \alpha$ is the unique derivation
    on forms that

    + commutes with $d$: $\mathcal{L}_X \circ d = d \circ \mathcal{L}_X$;
    + acts on functions by $\mathcal{L}_X f = X(f) = df(X)$;
    + is $\mathbb{R}$-linear and satisfies the Leibniz rule
      $\mathcal{L}_X(\alpha \wedge \beta) = \mathcal{L}_X \alpha \wedge
      \beta + \alpha \wedge \mathcal{L}_X \beta$.

    For two vector fields $X, Y$, the **Lie bracket** is
    $[X, Y] := \mathcal{L}_X Y$, derivable from the **Cartan
    formula** $\mathcal{L}_X = d \circ \iota_X + \iota_X \circ d$ where
    $\iota_X$ is the interior product.

??? proof "Proof (Cartan's formula)"
    Both sides are derivations of the graded algebra
    $\Omega^\bullet(U)$ commuting with $d$ (the latter is clear since
    $d^2 = 0$ on both sides). They agree on functions: $\mathcal{L}_X
    f = X(f)$ and $d(\iota_X f) + \iota_X(df) = 0 + X(f)$. Since any
    $p$-form is locally a sum of terms $f\, dx_{i_1} \wedge \cdots \wedge
    dx_{i_p}$, the derivation property forces equality on all
    $p$-forms. The consequence on $[X, Y]$ follows by applying
    $\mathcal{L}_X \mathcal{L}_Y - \mathcal{L}_Y \mathcal{L}_X$ to
    $f$, where $\mathcal{L}_X df = X(f)$, giving $\mathcal{L}_X Y(f) -
    \mathcal{L}_Y X(f) = [X, Y](f)$.

## Submanifolds and Tangent Space

!!! definition "Definition (Submanifold)"
    <a id="def-dg-4-1"></a>
    A subset $M \subseteq \mathbb{R}^n$ is an **$m$-dimensional
    submanifold** if every point $p \in M$ has a neighbourhood $U$ in
    $\mathbb{R}^n$ and a $C^\infty$-diffeomorphism $\varphi : U \to
    V \subseteq \mathbb{R}^n$ such that $\varphi(U \cap M) = V \cap
    (\mathbb{R}^m \times \{0\})$.

!!! definition "Definition (Tangent space)"
    <a id="def-dg-4-2"></a>
    For a submanifold $M \subseteq \mathbb{R}^n$ and $p \in M$, the
    **tangent space** $T_p M$ is the set of derivatives
    $\gamma'(0)$ of $C^1$-curves $\gamma : (-\varepsilon, \varepsilon)
    \to M$ with $\gamma(0) = p$. Equivalently, $T_p M = \ker(d N_p)$
    where $N$ is a local defining function for $M$ near $p$.

!!! definition "Definition (Differential of a smooth map)"
    <a id="def-dg-4-3"></a>
    For a smooth map $F : M \to N$ between submanifolds and $p \in M$,
    the **differential** $dF_p : T_p M \to T_{F(p)} N$ is the linear map
    sending $[\gamma]$ to $[F \circ \gamma]$.

## Partition of Unity

!!! theorem "Theorem (Existence of partitions of unity)"
    <a id="thm-dg-5-1"></a>
    Let $M$ be a smooth manifold and $\{U_i\}_{i \in I}$ an open cover.
    There exists a **partition of unity** $(\rho_i)_{i \in I}$ subordinate
    to the cover, i.e. $\rho_i \in C^\infty_c(U_i)$, $\rho_i \geq 0$, and
    $\sum_i \rho_i = 1$ on every compact subset of $M$ (so the sum is
    locally finite).

    **Proof.** Embed $M$ in $\mathbb{R}^n$ via a Whitney embedding and
    use a single cover of $\mathbb{R}^n$ by unit balls; pull back the
    associated bump functions.

## Stokes Formula

!!! theorem "Theorem (Stokes formula)"
    <a id="thm-dg-6-1"></a>
    Let $M$ be a compact oriented $n$-dimensional smooth manifold with
    boundary $\partial M$, and let $\omega$ be a smooth $(n-1)$-form on
    a neighbourhood of $M$. Then

    $$
    \int_M d\omega = \int_{\partial M} \omega.
    $$

    **Reduction to a half-space.** Cover $M$ by charts $(U_i,
    \varphi_i)$ that pull back to a model either $(\mathbb{R}^n, \mathrm{id})$
    or $(\{x_n \geq 0\}, \mathrm{id})$. Use a partition of unity to
    decompose $\omega = \sum \rho_i \omega_i$; on each chart the formula
    reduces to the fundamental theorem of calculus, summed by the
    cocycle property of the de Rham differential.

??? proof "Proof (Stokes formula)"
    **Reduction to a half-space.** Cover $M$ by charts $(U_i,
    \varphi_i)$ that pull back to either $(\mathbb{R}^n, \mathrm{id})$
    or $(\{x_n \geq 0\}, \mathrm{id})$. By a partition of unity
    $(\rho_i)$ subordinate to the cover, write $\omega = \sum_i
    \rho_i \omega_i$ with $\omega_i$ supported in $U_i$. It suffices to
    prove $\int_{M \cap U_i} d(\rho_i \omega_i) = \int_{\partial M \cap
    U_i} \rho_i \omega_i$ for each $i$.
    **Model case $\mathbb{R}^n$.** When $U_i \cong \mathbb{R}^n$ (no
    boundary), $\partial M \cap U_i = \varnothing$ and
    $\int_{\mathbb{R}^n} d(\rho \omega) = \int_{\mathbb{R}^n} \sum_j
    \partial_{x_j} (\rho \omega)_j\, dx = 0$ (each $\partial_{x_j}$
    integrates to $0$ over $\mathbb{R}$ since $\rho$ has compact
    support).
    **Model case $\{x_n \geq 0\}$.** Here $\partial M \cap U_i \cong
    \{x_n = 0\} \cong \mathbb{R}^{n-1}$. By Fubini and the fundamental
    theorem of calculus in the $x_n$ variable,
    $\int_{\{x_n \geq 0\}} d(\rho \omega) = \int_{\mathbb{R}^{n-1}}
    \int_0^{+\infty} \partial_{x_n} (\rho \omega)_n\, dx_n\, d\vec x
    = -\int_{\mathbb{R}^{n-1}} (\rho \omega)_n(0, \vec x)\, d\vec x$,
    while the components $(\rho \omega)_j$ for $j < n$ contribute $0$
    by Fubini (they do not involve the $\partial_{x_n}$ differential).
    The boundary term equals $\int_{\partial M \cap U_i} \rho \omega$ by
    the orientation convention.

!!! corollary "Corollary (Classical versions)"
    <a id="cor-dg-6-2"></a>
    1. **Fundamental theorem of calculus** ($M = [a, b] \subseteq
       \mathbb{R}$): $\int_a^b f'(x)\, dx = f(b) - f(a)$.
    2. **Green's theorem** ($M \subseteq \mathbb{R}^2$ with $\partial M$
       a positively oriented simple closed curve):
       $\int_M (\partial_x Q - \partial_y P)\, dx\, dy = \oint_{\partial M}
       P\, dx + Q\, dy$.
    3. **Classical Stokes** (a surface $M$ with boundary $\partial M$ in
       $\mathbb{R}^3$): $\int_M (\nabla \times F) \cdot dS = \oint_{\partial
       M} F \cdot dr$.
    4. **Divergence theorem** (a compact region $M$ in $\mathbb{R}^3$):
       $\int_M \nabla \cdot F\, dV = \oint_{\partial M} F \cdot n\, dS$.

??? proof "Proof (Classical versions via Stokes)"
    1. Apply Stokes to the $0$-form $f$ on $[a, b]$: $d f = f'(x) dx$ is
       a $1$-form, so $\int_{[a, b]} d f = \int_{\partial [a, b]} f$.
       The boundary $\partial [a, b] = \{b\} - \{a\}$ (with the
       induced orientation) gives $f(b) - f(a)$.
    2. Apply to the $1$-form $\omega = P\, dx + Q\, dy$. Then
       $d\omega = (\partial_x Q - \partial_y P) dx \wedge dy$ and
       $\int_{\partial M} P\, dx + Q\, dy = \int_M d\omega = \int_M
       (\partial_x Q - \partial_y P)\, dx\, dy$.
    3. For a vector field $F = (P, Q, R)$, the $1$-form
       $\omega = P\, dx + Q\, dy + R\, dz$ has
       $d\omega = (\partial_y R - \partial_z Q) dy \wedge dz
       + (\partial_z P - \partial_x R) dz \wedge dx
       + (\partial_x Q - \partial_y P) dx \wedge dy$, which is the
       component of $\nabla \times F$ normal to the surface (via the
       standard identification $\mathbb{R}^3 \cong \Lambda^2(\mathbb{R}^3)$).
       Stokes gives $\int_M d\omega = \int_{\partial M} \omega$.
    4. For the divergence theorem, apply Stokes to the $2$-form
       $\omega = P\, dy \wedge dz + Q\, dz \wedge dx + R\, dx \wedge dy$
       (the flux form): $d\omega = (\partial_x P + \partial_y Q +
       \partial_z R) dx \wedge dy \wedge dz = (\nabla \cdot F)
       dV$. Stokes gives $\int_M \nabla \cdot F\, dV = \int_{\partial
       M} \omega = \oint_{\partial M} F \cdot n\, dS$.

!!! example "Example (Poincaré lemma)"
    <a id="ex-dg-6-3"></a>
    On a star-shaped open $U \subseteq \mathbb{R}^n$, every closed
    $k$-form $\omega$ ($d\omega = 0$, $k \geq 1$) is exact: $\omega =
    d\eta$ with $\eta = \int_0^1 \iota_X \omega(tx)\, dt$, where
    $X(x) = x$ generates the radial flow. This gives the de Rham
    cohomology $H^k_{\mathrm{dR}}(\mathbb{R}^n) = 0$ for $k \geq 1$.

