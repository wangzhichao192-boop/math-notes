# First-Order Equations

This chapter collects the principal methods for first-order equations. Exactness, separation, homogeneity, and integrating factors reduce explicit equations to quadrature. Differentiation and parametrization treat equations in which the derivative is specified only implicitly.

## Elementary Methods

An equation written in differential form,

$$
P(x,y)\,dx+Q(x,y)\,dy=0,
$$

is especially simple when its left-hand side is a total differential.

!!! definition "Definition (Exact equation)"
    <a id="def-exact-equation"></a>
    Let $P,Q\in C^1(D)$ on a plane domain $D$. The equation

    $$
    P\,dx+Q\,dy=0
    $$

    is **exact** on $D$ if there is a function $\Phi$ such that

    $$
    d\Phi=\Phi_x\,dx+\Phi_y\,dy=P\,dx+Q\,dy.
    $$

    Its integral curves are the level curves $\Phi(x,y)=C$.

!!! theorem "Theorem (Exactness criterion)"
    <a id="thm-exactness-criterion"></a>
    If $P\,dx+Q\,dy$ is exact, then $P_y=Q_x$. Conversely, if $D$ is simply connected and $P_y=Q_x$ throughout $D$, then the equation is exact on $D$.

??? proof "Proof"
    If $P=\Phi_x$ and $Q=\Phi_y$, equality of mixed partials gives $P_y=Q_x$. Conversely, fix $(x_0,y_0)\in D$ and define

    $$
    \Phi(x,y)=\int_\gamma P\,dx+Q\,dy,
    $$

    where $\gamma$ is any path from $(x_0,y_0)$ to $(x,y)$. Green's theorem and $Q_x-P_y=0$ show that the integral around every closed curve is zero. Simple connectedness makes the line integral path independent, and hence $d\Phi=P\,dx+Q\,dy$.

!!! example "Example (Exact and nonexact forms)"
    The equations

    $$
    y\,dx+x\,dy=0,
    \qquad
    x\,dx+y\,dy=0
    $$

    are exact, with potentials $xy$ and $(x^2+y^2)/2$. Their integral curves are $xy=C$ and $x^2+y^2=C$. By contrast, $y^2\,dx+x\,dy=0$ is not exact because $P_y=2y$ and $Q_x=1$.

    The condition $P_y=Q_x$ is not sufficient on an arbitrary domain. For example,

    $$
    -\frac{y}{x^2+y^2}\,dx+\frac{x}{x^2+y^2}\,dy
    $$

    has equal cross-partials on $\mathbb R^2\setminus\{0\}$, but its integral around the unit circle is $2\pi$; no single-valued potential exists on the punctured plane.

!!! definition "Definition (Separable equation)"
    <a id="def-separable-equation"></a>
    A first-order equation is **separable** if it can be written

    $$
    p(x)\,dx+q(y)\,dy=0,
    $$

    or equivalently $y'=g(x)h(y)$. On a region where $h(y)\neq0$ one integrates

    $$
    \frac{dy}{h(y)}=g(x)\,dx.
    $$

    Every root of $h$ must be checked separately, since division by $h(y)$ removes the corresponding constant solution.

!!! example "Example (Restoring equilibrium solutions)"
    For

    $$
    y'=(y-1)(y-2),
    $$

    separation on $y\neq1,2$ gives

    $$
    \log\left|\frac{y-2}{y-1}\right|=x+C.
    $$

    The constant solutions $y\equiv1$ and $y\equiv2$ must then be restored. They are not represented by the separated calculation.

!!! example "Example (Branching at an equilibrium)"
    The equation $y'=y^{1/3}$ has the zero solution. Away from $y=0$, separation gives

    $$
    \frac32 y^{2/3}=x-C.
    $$

    Through $(x_0,0)$ there are already three solutions: the zero solution and

    $$
    y_\pm(x)=
    \begin{cases}
    0,&x\le x_0,\\
    \displaystyle \pm\left(\frac23(x-x_0)\right)^{3/2},&x>x_0.
    \end{cases}
    $$

    Allowing the nonzero branch to start after any waiting time produces infinitely many solutions. Separation finds the nonconstant arcs, but it does not by itself settle uniqueness.

!!! definition "Definition (Homogeneous first-order equation)"
    <a id="def-homogeneous-first-order-equation"></a>
    Suppose $M$ and $N$ are homogeneous functions of the same degree:

    $$
    M(\lambda x,\lambda y)=\lambda^nM(x,y),
    \qquad
    N(\lambda x,\lambda y)=\lambda^nN(x,y).
    $$

    Then $M\,dx+N\,dy=0$ is a **homogeneous first-order equation**. On $x\neq0$, the substitution $y=ux$ and $dy=u\,dx+x\,du$ reduces it to a separable equation in $u$ and $x$.

    Indeed, homogeneity gives $M(x,ux)=x^nM(1,u)$ and $N(x,ux)=x^nN(1,u)$, so

    $$
    \bigl(M(1,u)+uN(1,u)\bigr)\,dx+xN(1,u)\,du=0.
    $$

!!! definition "Definition (First-order linear equation)"
    <a id="def-first-order-linear-equation"></a>
    A first-order linear equation has the normalized form

    $$
    y'+P(x)y=Q(x).
    $$

    It is **homogeneous** when $Q=0$.

On an interval where $P$ and $Q$ are continuous, fix $x_0$ and set

$$
\mu(x)=\exp\left(\int_{x_0}^{x}P(s)\,ds\right).
$$

Then $(\mu y)'=\mu Q$, and every solution is

$$
y(x)=\frac{1}{\mu(x)}
\left(C+\int_{x_0}^{x}\mu(s)Q(s)\,ds\right).
$$

!!! example "Example (Integrating factor)"
    For $y'+y=x^2$, multiplication by $e^x$ gives

    $$
    (e^xy)'=e^xx^2.
    $$

    Hence

    $$
    y=x^2-2x+2+Ce^{-x}.
    $$

!!! proposition "Proposition (Affine solution set)"
    <a id="prop-affine-solution-set"></a>
    If $y_p$ is one solution of $y'+Py=Q$, then every solution is $y_p+y_h$, where $y_h$ solves the homogeneous equation $y_h'+Py_h=0$. Thus the solution set of the nonhomogeneous equation is an affine translate of the one-dimensional homogeneous solution space.

    In particular, prescribing $y(x_0)=y_0$ fixes the constant $C$ and gives exactly one solution on the interval of continuity of $P$ and $Q$.

## Implicit Equations

The methods above require a usable equation for $y'$. An implicit equation may instead require differentiation or a parametrization of its solution surface.

!!! definition "Definition (Implicit differential equation)"
    <a id="def-implicit-equation"></a>
    A **first-order implicit differential equation** is an equation

    $$
    F(x,y,y')=0
    $$

    in which $y'$ has not been solved explicitly as a function of $(x,y)$. For example,

    $$
    \cos(\sin y')=y'
    $$

    is implicit because isolating $y'$ is itself a nontrivial problem.

Write $p=y'$. Two useful approaches are differentiation and parametrization.

**Differentiation method.** Suppose the equation can be written as

$$
y=f(x,p).
$$

Differentiating with respect to $x$ gives

$$
p=f_x(x,p)+f_p(x,p)\frac{dp}{dx},
$$

so $x$ and $p$ satisfy

$$
f_p(x,p)\frac{dp}{dx}=p-f_x(x,p).
$$

Solving this equation for $p$ and substituting back into $y=f(x,p)$ produces solutions of the original equation. Any factor divided out during the calculation must be checked separately.

!!! example "Example (Clairaut equation)"
    <a id="ex-clairaut-equation"></a>
    Consider

    $$
    y=xp+f(p),
    \qquad p=y'.
    $$

    Differentiation gives

    $$
    p=p+\bigl(x+f'(p)\bigr)p',
    $$

    and hence

    $$
    \bigl(x+f'(p)\bigr)p'=0.
    $$

    The branch $p'=0$ gives the one-parameter family of straight lines

    $$
    y=cx+f(c).
    $$

    The other branch is the parametrized curve

    $$
    x=-f'(p),
    \qquad
    y=f(p)-pf'(p).
    $$

    If $f''(p)\neq0$, this curve is the envelope of the line family. At the point corresponding to $p=c$, it is tangent to the line $y=cx+f(c)$.

!!! example "Example (Differentiation and a lost branch)"
    Solve

    $$
    8(y')^3=27y.
    $$

    With $p=y'$, differentiation gives

    $$
    24p^2p'=27p.
    $$

    The factor $p$ produces the constant solution $y=0$. On the branch $p\neq0$,

    $$
    \frac{dx}{dp}=\frac{8p}{9},
    $$

    and therefore

    $$
    x=\frac49p^2+C,
    \qquad
    y=\frac8{27}p^3.
    $$

    Eliminating $p$ gives the equivalent relation

    $$
    y^{2/3}=x-C.
    $$

!!! example "Example (Several solution branches)"
    Consider

    $$
    y^2\bigl((y')^2+1\bigr)=1.
    $$

    With $p=y'$, differentiation yields

    $$
    2yp\bigl(p^2+1+yp'\bigr)=0.
    $$

    Since the original equation excludes $y=0$, the branch $p=0$ gives

    $$
    y\equiv1,
    \qquad
    y\equiv-1.
    $$

    On a nonconstant branch,

    $$
    p^2+1+yp'=0,
    $$

    so

    $$
    (yp)'=-1.
    $$

    Thus $yp=C-x$. Substitution into the original equation gives

    $$
    (x-C)^2+y^2=1.
    $$

    The nonconstant solutions are therefore arcs of unit circles on intervals where they can be represented as graphs.

**Parametrization.** The equation $F(x,y,p)=0$ describes a surface in $(x,y,p)$-space. Suppose it has a parametrization

$$
x=x(u,v),
\qquad
y=y(u,v),
\qquad
p=p(u,v).
$$

The condition $p=dy/dx$ is equivalent to the differential relation

$$
dy=p\,dx.
$$

Consequently,

$$
y_u\,du+y_v\,dv
=p(u,v)\bigl(x_u\,du+x_v\,dv\bigr).
$$

This is a first-order equation for $u$ and $v$. If it gives $v=v(u,C)$, then

$$
x=x\bigl(u,v(u,C)\bigr),
\qquad
y=y\bigl(u,v(u,C)\bigr)
$$

is a parametrized family of solutions.

!!! example "Example (Using the slope as parameter)"
    For

    $$
    x=(y')^3+y',
    $$

    set $p=y'$. Then

    $$
    x=p^3+p,
    \qquad
    dx=(3p^2+1)\,dp.
    $$

    Since $dy=p\,dx$,

    $$
    dy=p(3p^2+1)\,dp.
    $$

    Integration gives

    $$
    x=p^3+p,
    \qquad
    y=\frac34p^4+\frac12p^2+C.
    $$

!!! example "Example (Two-parameter surface)"
    Consider

    $$
    2xy'-y=y'\log(yy').
    $$

    Put $p=y'$. The logarithm requires $yp>0$, and the equation becomes

    $$
    x=\frac{y}{2p}+\frac12\log(yp).
    $$

    Treating $y$ and $p$ as parameters and imposing $dy=p\,dx$ gives

    $$
    \left(\frac1p-\frac1y\right)dy
    =\left(\frac1p-\frac{y}{p^2}\right)dp.
    $$

    If $p\neq y$, this reduces to

    $$
    \frac{dy}{y}=-\frac{dp}{p},
    $$

    so $yp=C>0$. Substitution gives the family

    $$
    y^2=2Cx-C\log C.
    $$

    The divided-out branch $p=y$ must be restored. It gives

    $$
    y=\pm e^{x-1/2}.
    $$
