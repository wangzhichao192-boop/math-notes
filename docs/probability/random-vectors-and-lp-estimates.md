# Random Vectors and $L^p$ Estimates

This chapter develops the basic calculus of several random variables. We first
characterize independence through joint laws, then derive the change-of-variables
formula for transformed densities and apply it to Gaussian and exponential
examples. The chapter concludes with covariance matrices, multivariate normal
laws, and the principal convexity and $L^p$ inequalities used to control random
variables.

## Joint Laws and Independence

!!! definition "Definition (Joint distribution)"
    <a id="def-joint-distribution"></a>
    A finite collection of real-valued random variables
    $X_1,\ldots,X_n$ defines a **random vector**
    $X=(X_1,\ldots,X_n):\Omega\to\mathbb{R}^n$. Its **joint distribution** is
    the probability measure

    $$
    \mu_X(B):=\mathbb{P}(X\in B),
    \qquad B\in\mathcal{B}(\mathbb{R}^n).
    $$

    If there is a nonnegative measurable function $f_X$ such that

    $$
    \mathbb{P}(X\in B)=\int_B f_X(x)\,dx,
    $$

    then $f_X$ is the **joint density** of $X$.

!!! definition "Definition (Marginal distributions and densities)"
    <a id="def-marginal-distributions"></a>
    Let $(X,Y)$ have joint distribution $\mu_{X,Y}$. The **marginal
    distributions** of $X$ and $Y$ are obtained by projecting the joint law
    onto its coordinates:

    $$
    \mu_X(A)=\mu_{X,Y}(A\times\mathbb{R}),
    \qquad
    \mu_Y(B)=\mu_{X,Y}(\mathbb{R}\times B).
    $$

    If $(X,Y)$ is discrete with joint mass function $p_{X,Y}$, its marginal
    mass functions are

    $$
    p_X(x)=\sum_y p_{X,Y}(x,y),
    \qquad
    p_Y(y)=\sum_x p_{X,Y}(x,y).
    $$

    If $(X,Y)$ has joint density $f_{X,Y}$, its **marginal densities** are

    $$
    f_X(x)=\int_{\mathbb{R}}f_{X,Y}(x,y)\,dy,
    \qquad
    f_Y(y)=\int_{\mathbb{R}}f_{X,Y}(x,y)\,dx.
    $$

    Thus integrating or summing out one coordinate gives the distribution of
    the other coordinate.

!!! definition "Definition (Independence of a sequence)"
    <a id="def-independent-sequence"></a>
    A sequence of random variables $X_1,X_2,\ldots$ is **independent** if, for
    every $n\geq1$ and every choice of Borel sets
    $A_1,\ldots,A_n\subseteq\mathbb{R}$,

    $$
    \mathbb{P}(X_1\in A_1,\ldots,X_n\in A_n)
    =\prod_{i=1}^n\mathbb{P}(X_i\in A_i).
    $$

    Equivalently, every finite subcollection of the sequence is independent.

!!! proposition "Proposition (Factorization criteria for independence)"
    <a id="prop-independence-factorization"></a>
    Let $X$ and $Y$ be real-valued random variables.

    1. If $X$ and $Y$ are discrete, then they are independent if and only if
       their joint mass function factors as
       $p_{X,Y}(x,y)=p_X(x)p_Y(y)$ for all $x,y$.
    2. If $(X,Y)$ has joint density $f_{X,Y}$ and marginal densities $f_X,f_Y$,
       then $X$ and $Y$ are independent if and only if
       $f_{X,Y}(x,y)=f_X(x)f_Y(y)$ for almost every $(x,y)$.

??? proof "Proof"
    In the discrete case, independence applied to singleton events gives the
    factorization. Conversely, summing the factorized mass function over
    $x\in A$ and $y\in B$ gives

    $$
    \mathbb{P}(X\in A,Y\in B)
    =\mathbb{P}(X\in A)\mathbb{P}(Y\in B).
    $$

    The continuous case is analogous: factorization and Fubini's theorem give
    the product identity on every measurable rectangle. Conversely,
    independence says that the joint law and the product of the marginal laws
    agree on rectangles; hence they agree on all Borel sets. Their
    Radon–Nikodym densities are therefore equal almost everywhere.

## Transformations of Random Vectors

Transforming a random vector transports its probability law to a new
coordinate system. For random vectors with densities, the resulting density is
governed by the local area-scaling factor of the transformation, namely the
Jacobian determinant.

!!! theorem "Theorem (Change of variables for a joint density)"
    <a id="thm-density-change-of-variables"></a>
    Let $A,B\subseteq\mathbb{R}^2$ be open sets and let
    $T:A\to B$ be a $C^1$ diffeomorphism. Suppose $(X,Y)$ takes values in $A$
    and has density $p$. Define

    $$
    (U,V)=T(X,Y)=\bigl(F(X,Y),G(X,Y)\bigr).
    $$

    Then $(U,V)$ has density

    $$
    q(u,v)
    =p\bigl(T^{-1}(u,v)\bigr)
    \left|\det D T^{-1}(u,v)\right|,
    \qquad (u,v)\in B,
    $$

    and $q(u,v)=0$ outside $B$. Writing
    $T^{-1}(u,v)=(x(u,v),y(u,v))$, the Jacobian is

    $$
    D T^{-1}(u,v)
    =
    \begin{pmatrix}
    \dfrac{\partial x}{\partial u} & \dfrac{\partial x}{\partial v}\\[4pt]
    \dfrac{\partial y}{\partial u} & \dfrac{\partial y}{\partial v}
    \end{pmatrix}.
    $$

??? proof "Proof"
    For every Borel set $C\subseteq B$,

    $$
    \begin{aligned}
    \mathbb{P}((U,V)\in C)
    &=\mathbb{P}((X,Y)\in T^{-1}(C))\\
    &=\int_{T^{-1}(C)}p(x,y)\,dx\,dy\\
    &=\int_C p\bigl(T^{-1}(u,v)\bigr)
      \left|\det D T^{-1}(u,v)\right|\,du\,dv.
    \end{aligned}
    $$

    The coefficient of $du\,dv$ in the last integral is the claimed density.

!!! remark "Remark (Non-injective transformations)"
    <a id="rem-noninjective-transformations"></a>
    If a regular value $(u,v)$ has finitely many inverse images
    $z_1,\ldots,z_m$, split the domain into injective branches. The density is
    the sum of the contributions from all branches:

    $$
    q(u,v)=\sum_{k=1}^m
    p(z_k)\left|\det D T^{-1}_k(u,v)\right|.
    $$

    This is essential for transformations such as $U=X^2$, whose positive
    values have the two inverse images $\sqrt{u}$ and $-\sqrt{u}$.

!!! example "Example (Polar form of two independent Gaussians)"
    <a id="ex-polar-gaussians"></a>
    Let $X,Y\sim\mathcal{N}(0,1)$ be independent and set

    $$
    R=\sqrt{X^2+Y^2},
    \qquad
    \Theta=\operatorname{atan2}(Y,X)\in[0,2\pi).
    $$

    The inverse transformation is $x=r\cos\theta$, $y=r\sin\theta$, with
    Jacobian determinant $r$. Since

    $$
    p(x,y)=\frac{1}{2\pi}e^{-(x^2+y^2)/2},
    $$

    the joint density of $(R,\Theta)$ is

    $$
    q(r,\theta)
    =\frac{1}{2\pi}r e^{-r^2/2}
      \mathbf{1}_{\{r>0,\ 0\leq\theta<2\pi\}}.
    $$

    It factors into the Rayleigh density
    $f_R(r)=r e^{-r^2/2}\mathbf{1}_{\{r>0\}}$ and the uniform density
    $f_\Theta(\theta)=(2\pi)^{-1}\mathbf{1}_{[0,2\pi)}(\theta)$. Thus
    $R$ and $\Theta$ are independent.

!!! example "Example (Sum and ratio of independent exponentials)"
    <a id="ex-exponential-sum-ratio"></a>
    Let $X,Y\sim\operatorname{Exp}(\lambda)$ be independent, and define

    $$
    U=X+Y,
    \qquad
    V=\frac{X}{Y}.
    $$

    Since $x,y>0$, the transformed support is $u>0$, $v>0$. Solving for
    $x$ and $y$ gives

    $$
    x=\frac{uv}{1+v},
    \qquad
    y=\frac{u}{1+v}.
    $$

    Moreover,

    $$
    \frac{\partial(x,y)}{\partial(u,v)}
    =
    \begin{pmatrix}
    \dfrac{v}{1+v} & \dfrac{u}{(1+v)^2}\\[5pt]
    \dfrac{1}{1+v} & -\dfrac{u}{(1+v)^2}
    \end{pmatrix},
    \qquad
    \left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|
    =\frac{u}{(1+v)^2}.
    $$

    Hence

    $$
    q(u,v)
    =\lambda^2e^{-\lambda u}\frac{u}{(1+v)^2}
      \mathbf{1}_{\{u>0,v>0\}}.
    $$

    The density factors. Therefore $U$ and $V$ are independent,
    $U\sim\operatorname{Gamma}(2,\lambda)$ with rate $\lambda$, and
    $f_V(v)=(1+v)^{-2}\mathbf{1}_{\{v>0\}}$.

!!! example "Example (An exponential variable and the sum)"
    <a id="ex-exponential-variable-sum"></a>
    Under the same assumptions, set $U=X$ and $V=X+Y$. Then
    $x=u$, $y=v-u$, and

    $$
    \frac{\partial(x,y)}{\partial(u,v)}
    =
    \begin{pmatrix}
    1&0\\
    -1&1
    \end{pmatrix},
    \qquad
    \left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|=1.
    $$

    The inequalities $x>0$ and $y>0$ become $0<u<v$, so

    $$
    q(u,v)=\lambda^2e^{-\lambda v}
    \mathbf{1}_{\{0<u<v\}}.
    $$

    Integrating over $u$ gives
    $f_V(v)=\lambda^2v e^{-\lambda v}\mathbf{1}_{\{v>0\}}$. Consequently,

    $$
    f_{U\mid V}(u\mid v)=\frac1v\mathbf{1}_{(0,v)}(u),
    $$

    so, conditional on the sum $V=v$, the first summand is uniform on
    $(0,v)$.

!!! example "Example (Square of a standard Gaussian)"
    <a id="ex-square-standard-gaussian"></a>
    Let $X\sim\mathcal{N}(0,1)$ and $U=X^2$. For $u\geq0$,

    $$
    \mathbb{P}(U>u)
    =\mathbb{P}(X>\sqrt{u})+\mathbb{P}(X<-\sqrt{u}).
    $$

    Differentiating the corresponding distribution function, or summing the
    two inverse-branch contributions, gives

    $$
    f_U(u)
    =\frac{1}{\sqrt{2\pi u}}e^{-u/2}\mathbf{1}_{\{u>0\}}.
    $$

    Thus $U$ has the chi-square distribution with one degree of freedom.

## Covariance and Multivariate Normal Laws

!!! definition "Definition (Covariance and covariance matrix)"
    <a id="def-covariance-matrix"></a>
    For square-integrable random variables $X$ and $Y$, their
    **covariance** is

    $$
    \operatorname{Cov}(X,Y)
    :=\mathbb{E}\bigl[(X-\mathbb{E}X)(Y-\mathbb{E}Y)\bigr]
    =\mathbb{E}[XY]-\mathbb{E}X\,\mathbb{E}Y.
    $$

    If $X=(X_1,\ldots,X_n)$ and $\mu_i=\mathbb{E}X_i$, the
    **covariance matrix** of $X$ is
    $\Sigma=(\Sigma_{ij})_{1\leq i,j\leq n}$, where

    $$
    \Sigma_{ij}
    :=\operatorname{Cov}(X_i,X_j)
    =\mathbb{E}\bigl[(X_i-\mu_i)(X_j-\mu_j)\bigr].
    $$

!!! proposition "Proposition (Variance of a sum)"
    <a id="prop-variance-sum-independent"></a>
    If $X_1,\ldots,X_n$ are square-integrable, then

    $$
    \operatorname{Var}\left(\sum_{i=1}^nX_i\right)
    =\sum_{i=1}^n\operatorname{Var}(X_i)
    +2\sum_{1\leq i<j\leq n}\operatorname{Cov}(X_i,X_j).
    $$

    In particular, if $X_1,\ldots,X_n$ are independent, then

    $$
    \operatorname{Var}\left(\sum_{i=1}^nX_i\right)
    =\sum_{i=1}^n\operatorname{Var}(X_i).
    $$

??? proof "Proof"
    Put $Y_i=X_i-\mathbb{E}X_i$. Expanding the square gives

    $$
    \mathbb{E}\left(\sum_{i=1}^nY_i\right)^2
    =\sum_{i=1}^n\mathbb{E}Y_i^2
    +2\sum_{i<j}\mathbb{E}[Y_iY_j],
    $$

    which is the first identity. If the variables are independent, then so
    are $Y_i$ and $Y_j$, and
    $\mathbb{E}[Y_iY_j]=\mathbb{E}Y_i\,\mathbb{E}Y_j=0$ for $i\neq j$.

!!! proposition "Proposition (Positivity of covariance matrices)"
    <a id="prop-covariance-positive-semidefinite"></a>
    Every covariance matrix is symmetric and positive semidefinite. More
    precisely, for every $a=(a_1,\ldots,a_n)^\mathsf{T}\in\mathbb{R}^n$,

    $$
    a^\mathsf{T}\Sigma a
    =\mathbb{E}\left[
      \left(\sum_{i=1}^n a_i(X_i-\mu_i)\right)^2
    \right]
    \geq0.
    $$

    It is positive definite if and only if no nonzero linear combination
    $\sum_i a_i(X_i-\mu_i)$ vanishes almost surely.

??? proof "Proof"
    Symmetry follows from
    $(X_i-\mu_i)(X_j-\mu_j)=(X_j-\mu_j)(X_i-\mu_i)$. Expanding the quadratic
    form and using linearity of expectation yields

    $$
    \begin{aligned}
    a^\mathsf{T}\Sigma a
    &=\sum_{i,j=1}^n a_i\Sigma_{ij}a_j\\
    &=\mathbb{E}\left[
      \sum_{i,j=1}^n a_i a_j(X_i-\mu_i)(X_j-\mu_j)
      \right]\\
    &=\mathbb{E}\left[
      \left(\sum_{i=1}^n a_i(X_i-\mu_i)\right)^2
      \right]\geq0.
    \end{aligned}
    $$

    Equality holds exactly when the squared random variable is zero almost
    surely, which gives the final assertion.

!!! definition "Definition (Nondegenerate multivariate normal distribution)"
    <a id="def-multivariate-normal"></a>
    Let $\mu\in\mathbb{R}^n$ and let $\Sigma$ be a symmetric positive-definite
    $n\times n$ matrix. A random vector $X$ has the **multivariate normal
    distribution** with mean $\mu$ and covariance matrix $\Sigma$, written
    $X\sim\mathcal{N}(\mu,\Sigma)$, if it has density

    $$
    f(x)
    =\frac{1}{(2\pi)^{n/2}\sqrt{\det\Sigma}}
      \exp\left(
      -\frac12(x-\mu)^\mathsf{T}\Sigma^{-1}(x-\mu)
      \right),
    \qquad x\in\mathbb{R}^n.
    $$

!!! proposition "Proposition (Independence of Gaussian coordinates)"
    <a id="prop-gaussian-coordinate-independence"></a>
    Let $X\sim\mathcal{N}(\mu,\Sigma)$ be nondegenerate. Its coordinates
    $X_1,\ldots,X_n$ are independent if and only if $\Sigma$ is diagonal.
    When $\Sigma=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)$,

    $$
    f_X(x)
    =\prod_{i=1}^n
      \frac{1}{\sqrt{2\pi}\,\sigma_i}
      \exp\left(-\frac{(x_i-\mu_i)^2}{2\sigma_i^2}\right).
    $$

??? proof "Proof"
    If $\Sigma$ is diagonal, then
    $\det\Sigma=\prod_i\sigma_i^2$ and
    $(x-\mu)^\mathsf{T}\Sigma^{-1}(x-\mu)
    =\sum_i(x_i-\mu_i)^2/\sigma_i^2$. The joint density therefore factors
    into the product of the marginal Gaussian densities, so the coordinates
    are independent. Conversely, independence gives
    $\operatorname{Cov}(X_i,X_j)=0$ whenever $i\neq j$, hence $\Sigma$ is
    diagonal.

!!! proposition "Proposition (Normalization of the Gaussian density)"
    <a id="prop-multivariate-normal-normalization"></a>
    For every symmetric positive-definite matrix $\Sigma$,

    $$
    \int_{\mathbb{R}^n}
    \exp\left(-\frac12x^\mathsf{T}\Sigma^{-1}x\right)\,dx
    =(2\pi)^{n/2}\sqrt{\det\Sigma}.
    $$

??? proof "Proof"
    By the spectral theorem, there are an orthogonal matrix $A$ and positive
    numbers $\lambda_1,\ldots,\lambda_n$ such that

    $$
    \Sigma=A^\mathsf{T}DA,
    \qquad
    D=\operatorname{diag}(\lambda_1^2,\ldots,\lambda_n^2).
    $$

    Hence $\Sigma^{-1}=A^\mathsf{T}D^{-1}A$. With $y=Ax$, orthogonality gives
    $dy=dx$ and

    $$
    x^\mathsf{T}\Sigma^{-1}x
    =(Ax)^\mathsf{T}D^{-1}(Ax)
    =\sum_{j=1}^n\frac{y_j^2}{\lambda_j^2}.
    $$

    Fubini's theorem and the one-dimensional Gaussian integral now give

    $$
    \begin{aligned}
    \int_{\mathbb{R}^n}e^{-x^\mathsf{T}\Sigma^{-1}x/2}\,dx
    &=\prod_{j=1}^n
      \int_{\mathbb{R}}e^{-y_j^2/(2\lambda_j^2)}\,dy_j\\
    &=\prod_{j=1}^n\sqrt{2\pi}\,\lambda_j
      =(2\pi)^{n/2}\sqrt{\det\Sigma}.
    \end{aligned}
    $$

!!! remark "Remark (Degenerate Gaussian laws)"
    <a id="rem-degenerate-gaussian"></a>
    A covariance matrix need not be positive definite. If it is singular, the
    corresponding Gaussian law is supported on a proper affine subspace of
    $\mathbb{R}^n$ and therefore has no density with respect to
    $n$-dimensional Lebesgue measure. The density formula above deliberately
    treats only the nondegenerate case.

## Convexity and $L^p$ Estimates

Convexity gives bounds on moments, while Hölder's and Minkowski's inequalities
control products and integrals in $L^p$ spaces.

### Convexity and moments

!!! definition "Definition (Convex and concave functions)"
    <a id="def-convex-functions"></a>
    Let $I\subseteq\mathbb{R}$ be an interval. A function
    $J:I\to\mathbb{R}$ is **convex** if, for every $x,y\in I$ and
    $t\in[0,1]$,

    $$
    J((1-t)x+ty)\leq(1-t)J(x)+tJ(y).
    $$

    Thus the graph lies below each chord joining two of its points.
    It is **strictly convex** if the inequality is strict whenever
    $x\ne y$ and $0<t<1$, and **concave** if $-J$ is convex.

!!! proposition "Proposition (Differentiable convexity criteria)"
    <a id="prop-convexity-derivatives"></a>
    For a differentiable function $J$ on an open interval $I$, convexity
    is equivalent to $J'$ being nondecreasing, and also to

    $$
    J(x)\geq J(a)+J'(a)(x-a),\qquad a,x\in I.
    $$

    If $J$ is twice differentiable, these conditions are equivalent to
    $J''\geq0$ on $I$.

??? proof "Proof"
    For $x<y<z$, the defining convexity inequality, with
    $t=(y-x)/(z-x)$, rearranges to

    $$
    \frac{J(y)-J(x)}{y-x}
    \leq\frac{J(z)-J(x)}{z-x}
    \leq\frac{J(z)-J(y)}{z-y}.
    $$

    Taking one-sided limits gives the tangent inequality and
    $J'(x)\leq J'(y)$ for $x<y$. Conversely, if $J'$ is nondecreasing,
    the mean value theorem gives the tangent inequality. Apply that
    inequality at $a=(1-t)x+ty$ to $x$ and $y$, multiply by $1-t$ and $t$,
    and add; the derivative terms cancel, proving convexity. Finally,
    for twice differentiable $J$, the mean value theorem and difference
    quotients show that $J'$ is nondecreasing exactly when $J''\geq0$.

!!! example "Example (Convexity without smoothness)"
    <a id="ex-convex-functions"></a>
    The functions $x\mapsto e^{\lambda x}$, for $\lambda\in\mathbb{R}$,
    and $x\mapsto x^2$ are convex by the second-derivative criterion.
    The function $x\mapsto|x|$ is convex by the triangle inequality,
    although it is not differentiable at $0$.

    More generally, $x\mapsto|x|^p$ is convex for $p\geq1$: for $p>1$
    its derivative $p\,\operatorname{sgn}(x)|x|^{p-1}$ (equal to $0$ at
    $x=0$) is nondecreasing. For $0<p<1$ it is not convex, since
    $(1/2)^p>1/2$, contrary to the midpoint inequality for $0$ and $1$.

!!! lemma "Lemma (Supporting lines)"
    <a id="lem-convex-supporting-line"></a>
    Let $J:I\to\mathbb{R}$ be convex and let $a$ be an interior point
    of $I$. There exists $m\in\mathbb{R}$ such that

    $$
    J(x)\geq J(a)+m(x-a),\qquad x\in I.
    $$

    The affine function on the right is a **supporting line** at $a$:
    it lies below the graph and meets it at $a$. If $J$ is differentiable
    at $a$, its slope is necessarily $m=J'(a)$.

??? proof "Proof"
    The secant-slope inequalities in the preceding
    [Proposition](#prop-convexity-derivatives) use only convexity. They give

    $$
    L:=\sup_{y<a}\frac{J(a)-J(y)}{a-y}
    \leq
    R:=\inf_{x>a}\frac{J(x)-J(a)}{x-a},
    \qquad x,y\in I.
    $$

    Fixed points on either side of $a$ bound these slopes, so $L$ and $R$
    are finite. Choose $m\in[L,R]$. For $x>a$ the right secant slope is
    at least $m$; for $x<a$ the left secant slope is at most $m$.
    Rearranging gives the asserted inequality on both sides. If the
    derivative exists, letting $x\to a$ forces $m=J'(a)$.

!!! theorem "Theorem (Jensen's inequality)"
    <a id="thm-jensen-random-vectors"></a>
    Let $J:\mathbb{R}\to\mathbb{R}$ be convex. If $X$ and $J(X)$ are
    integrable, then

    $$
    J(\mathbb{E}X)\leq\mathbb{E}[J(X)].
    $$

??? proof "Proof"
    Set $a=\mathbb{E}X$. The slopes of the secant lines of a convex function
    satisfy

    $$
    \limsup_{y\uparrow a}\frac{J(y)-J(a)}{y-a}
    \leq
    \liminf_{x\downarrow a}\frac{J(x)-J(a)}{x-a}.
    $$

    By the [supporting-line lemma](#lem-convex-supporting-line), choose a
    finite number $m$ between these one-sided slopes. Then
    $J(x)\geq J(a)+m(x-a)$ for every $x\in\mathbb{R}$. Applying this supporting
    line inequality to $X$ and taking expectations gives

    $$
    \mathbb{E}[J(X)]
    \geq J(a)+m(\mathbb{E}X-a)
    =J(\mathbb{E}X).
    $$

!!! example "Example (Exponential and power moments)"
    <a id="ex-jensen-moments"></a>
    The function $x\mapsto e^{\lambda x}$ is convex for every
    $\lambda\in\mathbb{R}$, so

    $$
    \mathbb{E}e^{\lambda X}\geq e^{\lambda\mathbb{E}X}
    $$

    whenever both sides are defined. For $p\geq1$, the convexity of
    $x\mapsto|x|^p$ gives

    $$
    \mathbb{E}|X|^p\geq|\mathbb{E}X|^p,
    \qquad
    \mathbb{E}|X|\leq\bigl(\mathbb{E}|X|^p\bigr)^{1/p}.
    $$

    Equivalently, on a probability space,

    $$
    \int_\Omega |X|\,d\mathbb{P}
    \leq
    \left(\int_\Omega |X|^p\,d\mathbb{P}\right)^{1/p}.
    $$

!!! proposition "Proposition (Monotonicity of moments)"
    <a id="prop-moment-monotonicity"></a>
    Let $0<p\leq r<\infty$. If $\mathbb{E}|X|^r<\infty$, then
    $\mathbb{E}|X|^p<\infty$ and

    $$
    \bigl(\mathbb{E}|X|^p\bigr)^{1/p}
    \leq
    \bigl(\mathbb{E}|X|^r\bigr)^{1/r}.
    $$

??? proof "Proof"
    The case $p=r$ is immediate. If $p<r$, the bound
    $|X|^p\leq1+|X|^r$ first ensures integrability. Apply Jensen's inequality to the
    nonnegative random variable $Z=|X|^p$ and the convex function
    $t\mapsto|t|^{r/p}$:

    $$
    \bigl(\mathbb{E}|X|^p\bigr)^{r/p}
    \leq\mathbb{E}|X|^r.
    $$

    Taking the $r$-th root proves the claim.

### $L^p$ inequalities

The preceding moment bounds compare the sizes of a single random variable.
Norms provide the notation for estimating products and integrals; their
$p=\infty$ endpoint measures bounds outside null sets.

!!! definition "Definition ($L^p$ spaces and norms)"
    <a id="def-lp-spaces-and-norms"></a>
    Let $(\Omega,\mathcal{F},\mathbb{P})$ be a probability space and
    $1\leq p<\infty$. For a real-valued random variable $X$, set

    $$
    \lVert X\rVert_p:=\bigl(\mathbb{E}|X|^p\bigr)^{1/p}.
    $$

    The **space $L^p$** consists of the random variables with
    $\mathbb{E}|X|^p<\infty$, identifying variables that are equal almost
    surely. On this space, $\lVert\cdot\rVert_p$ is the **$L^p$ norm**.
    More generally, on a measure space $(S,\mathcal{S},\mu)$, replace
    expectation by integration and write
    $\lVert g\rVert_{L^p(\mu)}=(\int_S|g|^p\,d\mu)^{1/p}$.

!!! definition "Definition (Essential supremum and the $L^\infty$ norm)"
    <a id="def-essential-supremum-l-infinity"></a>
    The **essential supremum** of $|X|$ is

    $$
    \operatorname*{ess\,sup}|X|
    :=\inf\{M\geq0:\mathbb{P}(|X|>M)=0\}.
    $$

    The **$L^\infty$ norm** is
    $\lVert X\rVert_\infty:=\operatorname*{ess\,sup}|X|$.
    The space **$L^\infty$** consists of random variables for which this
    quantity is finite, identifying variables that are equal almost surely.

    More generally, for a measurable function $g$ on
    $(S,\mathcal{S},\mu)$,

    $$
    \lVert g\rVert_{L^\infty(\mu)}
    =\operatorname*{ess\,sup}_{x\in S}|g(x)|
    :=\inf\{M\geq0:\mu(\{x:|g(x)|>M\})=0\}.
    $$

    Thus the essential supremum is the smallest upper bound that holds
    almost everywhere; the infimum is $+\infty$ if there is no finite bound.
    For a finite infimum $K$, the bounds $|g|\leq K+1/n$ hold almost
    everywhere for every $n\geq1$; removing the union of their null
    exceptional sets gives $|g|\leq K$ almost everywhere.

!!! example "Example (Ignoring a null set)"
    <a id="ex-essential-supremum-null-set"></a>
    On $[0,1]$ with Lebesgue probability measure, let $X(0)=100$ and
    $X(\omega)=1$ for $\omega>0$. Then $\sup X=100$ but
    $\lVert X\rVert_\infty=1$: changing a value on a null set changes no
    integral. In particular, for integrable $Y$,
    $\mathbb{E}|XY|\leq\lVert X\rVert_\infty\mathbb{E}|Y|$.
    This is the endpoint case of [Hölder's inequality](#thm-holder-lp)
    used below; the same almost-everywhere bound handles $p=\infty$ in
    [Minkowski's inequality](#thm-minkowski-integral).

For $1\leq p\leq r<\infty$, [moment monotonicity](#prop-moment-monotonicity)
now reads $L^r\subseteq L^p$ and $\lVert X\rVert_p\leq\lVert X\rVert_r$.
The same bound holds for $r=\infty$, since
$|X|\leq\lVert X\rVert_\infty$ almost surely and $\mathbb{P}(\Omega)=1$.

!!! lemma "Lemma (Young's inequality)"
    <a id="lem-young-product"></a>
    Let $p,q\in(1,\infty)$ satisfy $1/p+1/q=1$. Then, for all $a,b\geq0$,

    $$
    ab\leq\frac{a^p}{p}+\frac{b^q}{q}.
    $$

??? proof "Proof"
    For fixed $a\geq0$, the derivative with respect to $b$ of
    $a^p/p+b^q/q-ab$ is $b^{q-1}-a$. Hence the minimum on $[0,\infty)$
    occurs at $b=a^{p-1}$, where it is zero, since $1/p+1/q=1$.

    Equivalently, the **convex conjugate** of $\phi(t)=t^p/p$ on
    $[0,\infty)$, defined by $\phi^*(s)=\sup_{t\geq0}(st-\phi(t))$,
    is $\phi^*(s)=s^q/q$ for $s\geq0$. The defining supremum gives
    $ab\leq\phi(a)+\phi^*(b)$.

!!! theorem "Theorem (Hölder's inequality)"
    <a id="thm-holder-lp"></a>
    Let $p,q\in[1,\infty]$ satisfy $1/p+1/q=1$, with
    $1/\infty:=0$, and let $X\in L^p$, $Y\in L^q$. Then

    $$
    \mathbb{E}|XY|
    \leq\lVert X\rVert_p\lVert Y\rVert_q.
    $$

    In particular,
    $|\mathbb{E}[XY]|\leq\lVert X\rVert_p\lVert Y\rVert_q$.

??? proof "Proof"
    If $(p,q)=(1,\infty)$, then

    $$
    \mathbb{E}|XY|
    \leq\lVert Y\rVert_\infty\mathbb{E}|X|
    =\lVert X\rVert_1\lVert Y\rVert_\infty.
    $$

    The case $(p,q)=(\infty,1)$ is symmetric. It remains to consider
    $p,q\in(1,\infty)$.

    Young's inequality remains valid after replacing $a$ and $b$ by
    $\lambda a$ and $b/\lambda$. Thus, for every $\lambda>0$,

    $$
    ab\leq
    \frac{\lambda^p a^p}{p}
    +\frac{b^q}{q\lambda^q}.
    $$

    Applying this pointwise to $a=|X|$, $b=|Y|$ and taking expectations gives

    $$
    \mathbb{E}|XY|
    \leq
    \frac{\lambda^p}{p}\lVert X\rVert_p^p
    +\frac{1}{q\lambda^q}\lVert Y\rVert_q^q.
    $$

    If both norms are nonzero, choose

    $$
    \lambda
    =\left(
      \frac{\lVert Y\rVert_q^q}{\lVert X\rVert_p^p}
      \right)^{1/(p+q)}.
    $$

    Since $pq=p+q$, substitution reduces the right-hand side to
    $(1/p+1/q)\lVert X\rVert_p\lVert Y\rVert_q$, which is the desired product.
    If either norm vanishes, the result is immediate.

    The same proof works on an arbitrary measure space with expectations
    replaced by integrals; this form is used in Minkowski's inequality.

!!! corollary "Corollary (Subconjugate exponents)"
    <a id="cor-subconjugate-holder"></a>
    If $p,q\in(1,\infty)$ satisfy $1/p+1/q\leq1$ and
    $X\in L^p$, $Y\in L^q$, then

    $$
    \mathbb{E}|XY|
    \leq\lVert X\rVert_p\lVert Y\rVert_q.
    $$

??? proof "Proof"
    Let $p'=p/(p-1)$. The assumption gives $p'\leq q$. Hölder's inequality
    with the conjugate pair $(p,p')$, followed by moment monotonicity, yields

    $$
    \mathbb{E}|XY|
    \leq\lVert X\rVert_p\lVert Y\rVert_{p'}
    \leq\lVert X\rVert_p\lVert Y\rVert_q.
    $$

!!! theorem "Theorem (Minkowski's integral inequality)"
    <a id="thm-minkowski-integral"></a>
    Let $(S,\mathcal{S},\mu)$ and $(T,\mathcal{T},\nu)$ be sigma-finite measure spaces,
    let $f:T\times S\to\mathbb{R}$ be measurable, and let
    $1\leq p\leq\infty$. Then

    $$
    \left\lVert\int_T |f(t,\cdot)|\,d\nu(t)\right\rVert_{L^p(\mu)}
    \leq
    \int_T\lVert f(t,\cdot)\rVert_{L^p(\mu)}\,d\nu(t).
    $$

??? proof "Proof"
    Set $H(x)=\int_T|f(t,x)|\,d\nu(t)$. For $p=1$, Tonelli's theorem gives
    equality after interchanging the two integrals. Suppose
    $1<p<\infty$ and let $q=p/(p-1)$. Write
    $A=\int_T\lVert f(t,\cdot)\rVert_p\,d\nu(t)$ and assume $A<\infty$;
    otherwise there is nothing to prove. If $0<\lVert H\rVert_p<\infty$,
    Tonelli's theorem and Hölder's inequality yield

    $$
    \begin{aligned}
    \lVert H\rVert_p^p
    &=\int_S H(x)^{p-1}\int_T|f(t,x)|\,d\nu(t)\,d\mu(x)\\
    &=\int_T\int_S |f(t,x)|H(x)^{p-1}\,d\mu(x)\,d\nu(t)\\
    &\leq\int_T\lVert f(t,\cdot)\rVert_p
       \lVert H^{p-1}\rVert_q\,d\nu(t)\\
    &=\lVert H\rVert_p^{p-1}
      \int_T\lVert f(t,\cdot)\rVert_p\,d\nu(t).
    \end{aligned}
    $$

    Division by $\lVert H\rVert_p^{p-1}$ proves the claim; the zero case is
    immediate. To avoid assuming in advance that $H\in L^p$, choose
    $E_m\uparrow S$ with $\mu(E_m)<\infty$ and set
    $H_m=\min(H,m)\mathbf{1}_{E_m}$. Since $H_m\leq H$, the same calculation
    gives

    $$
    \lVert H_m\rVert_p^p
    \leq\int_S H_m^{p-1}H\,d\mu
    \leq A\lVert H_m\rVert_p^{p-1}.
    $$

    Thus $\lVert H_m\rVert_p\leq A$, and monotone convergence yields
    $\lVert H\rVert_p\leq A$. Finally, for $p=\infty$, put
    $g(t)=\lVert f(t,\cdot)\rVert_\infty$. For each $t$ the set
    $\{x:|f(t,x)|>g(t)\}$ is $\mu$-null. Tonelli's theorem then gives
    $|f(t,x)|\leq g(t)$ for $\nu$-almost every $t$, for $\mu$-almost every
    $x$. Consequently,

    $$
    H(x)
    \leq\int_T\lVert f(t,\cdot)\rVert_\infty\,d\nu(t),
    $$

    and taking the essential supremum completes the proof.

!!! remark "Remark (Scaling and the conjugacy relation)"
    <a id="rem-holder-scaling"></a>
    For $f,g\in C_c^\infty(\mathbb{R}^d)$, define
    $f_\lambda(x)=f(\lambda x)$ and $g_\lambda(x)=g(\lambda x)$. Then

    $$
    \int_{\mathbb{R}^d}|f_\lambda g_\lambda|\,dx
    =\lambda^{-d}\int_{\mathbb{R}^d}|fg|\,dx,
    $$

    whereas

    $$
    \lVert f_\lambda\rVert_p\lVert g_\lambda\rVert_q
    =\lambda^{-d/p-d/q}\lVert f\rVert_p\lVert g\rVert_q.
    $$

    A scale-invariant product estimate therefore requires
    $1/p+1/q=1$, equivalently $pq=p+q$.
