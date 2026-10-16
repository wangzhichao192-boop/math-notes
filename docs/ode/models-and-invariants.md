# \* Models and Invariants

This additional chapter collects three classical examples rather than advancing the main existence theory. Their common feature is a conserved quantity: a first integral for population dynamics, energy for autonomous oscillations, and the mechanical invariants of Newtonian gravitation.

## Predator–Prey

Let $x(t)$ be the population of a predator species and $y(t)$ the population of its prey. Assume that the prey is the predator's only food and is otherwise able to reproduce without restriction. The Volterra model is

$$
\dot x=x(by-a),
\qquad
\dot y=y(c-dx),
$$

where $a,b,c,d>0$. In the absence of prey, the predator decays at rate $a$; in the absence of predators, the prey grows at rate $c$. The interaction terms $bxy$ and $-dxy$ describe predation.

The positive equilibrium is

$$
(x_*,y_*)=\left(\frac{c}{d},\frac{a}{b}\right).
$$

!!! proposition "Proposition (Volterra first integral)"
    <a id="prop-volterra-first-integral"></a>
    Every positive solution remains on a level curve of

    $$
    H(x,y)=dx+by-c\log x-a\log y.
    $$

??? proof "Proof"
    Dividing the two differential equations gives

    $$
    \frac{dy}{dx}
    =\frac{y(c-dx)}{x(-a+by)}.
    $$

    Separation yields

    $$
    \left(b-\frac{a}{y}\right)dy
    =\left(\frac{c}{x}-d\right)dx,
    $$

    and hence

    $$
    by+dx-c\log x-a\log y=K.
    $$

    Equivalently, direct differentiation gives $dH/dt=0$.

The function $H$ is strictly convex on the positive quadrant and has its unique minimum at $(x_*,y_*)$. It tends to infinity at the boundary and at infinity. Thus every regular level curve surrounding the equilibrium is closed. Since the vector field does not vanish there, every positive non-equilibrium solution is periodic.

!!! proposition "Proposition (Mean populations)"
    <a id="prop-volterra-means"></a>
    If a positive solution has period $T$, then

    $$
    \frac1T\int_0^T x(t)\,dt=\frac{c}{d},
    \qquad
    \frac1T\int_0^T y(t)\,dt=\frac{a}{b}.
    $$

??? proof "Proof"
    Since

    $$
    \frac{d}{dt}\log x=-a+by,
    \qquad
    \frac{d}{dt}\log y=c-dx,
    $$

    integration over one period gives

    $$
    0=-aT+b\int_0^T y(t)\,dt,
    \qquad
    0=cT-d\int_0^T x(t)\,dt.
    $$

    The claimed averages follow. They do not depend on which closed orbit is chosen, although the period generally does.

!!! example "Example (A third predator)"
    Suppose a third predator removes both species at the same per-capita rate $\varepsilon>0$. The equations become

    $$
    \dot x=x(by-a-\varepsilon),
    \qquad
    \dot y=y(c-dx-\varepsilon).
    $$

    For a positive periodic orbit, the same logarithmic calculation gives

    $$
    \frac1T\int_0^T y(t)\,dt=\frac{a+\varepsilon}{b},
    \qquad
    \frac1T\int_0^T x(t)\,dt=\frac{c-\varepsilon}{d},
    $$

    provided $0<\varepsilon<c$. The average predator population decreases, while the average prey population increases. This counterintuitive effect is a consequence of weakening the predator population as well as the prey population.

## Oscillations

Consider the autonomous second-order equation

$$
x''+f(x)=0.
$$

Every zero $x_0$ of $f$ gives a constant solution $x(t)\equiv x_0$. Nonconstant solutions are controlled by an energy integral.

!!! proposition "Proposition (Energy integral)"
    <a id="prop-autonomous-energy"></a>
    Let

    $$
    F(x)=\int_0^x f(s)\,ds.
    $$

    Along every solution,

    $$
    \frac12(x')^2+F(x)=C.
    $$

??? proof "Proof"
    Multiplication by $x'$ gives

    $$
    x'x''+f(x)x'=0,
    $$

    so

    $$
    \frac{d}{dt}\left(\frac12(x')^2+F(x)\right)=0.
    $$

Where $C-F(x)>0$, the energy identity reduces the equation to a quadrature:

$$
x'=\pm\sqrt{2(C-F(x))},
\qquad
\int\frac{dx}{\sqrt{2(C-F(x))}}=\pm t+C_1.
$$

!!! example "Example (Harmonic oscillator)"
    For $f(x)=a^2x$, the equation is

    $$
    x''+a^2x=0,
    $$

    and

    $$
    x(t)=C_1\cos(at)+C_2\sin(at).
    $$

    Every nonconstant solution has period $2\pi/a$, independent of its amplitude and initial phase.

!!! example "Example (Simple pendulum)"
    If $x(t)$ is the angular displacement of a pendulum, then after writing $a^2=g/\ell$ its equation is

    $$
    x''+a^2\sin x=0.
    $$

    One may take $F(x)=a^2(1-\cos x)$. If the pendulum is released from rest at amplitude $A$, where $0<A<\pi$, then $C=F(A)$ and symmetry gives

    $$
    \frac{T(A)}4
    =\int_0^A
    \frac{dx}{\sqrt{2a^2(\cos x-\cos A)}}.
    $$

    For $|x|\ll1$, the approximation $\sin x\approx x$ reduces the equation to the harmonic oscillator, so $T(A)\approx2\pi/a$.

    More precisely, with $k=\sin(A/2)$,

    $$
    T(A)=\frac4a\int_0^{\pi/2}
    \frac{d\theta}{\sqrt{1-k^2\sin^2\theta}}.
    $$

    Therefore

    $$
    T(A)=\frac{2\pi}{a}
    \left(1+\frac{A^2}{16}+O(A^4)\right)
    $$

    for small amplitude. The exact period increases with $A$ and tends to infinity as $A\to\pi^-$.

## Gravitation

Let $r_i=(x_i,y_i,z_i)\in\mathbb R^3$ be the position of the $i$th body and let $m_i>0$ be its mass. Choose units in which the gravitational constant is $1$. Away from collisions, Newton's law gives

$$
m_i\ddot r_i
=\sum_{j\ne i}m_im_j
\frac{r_j-r_i}{|r_j-r_i|^3},
\qquad 1\le i\le N.
$$

This is a system of $3N$ second-order equations. With velocities $q_i=\dot r_i$, it becomes the $6N$-dimensional first-order system

$$
\dot r_i=q_i,
\qquad
\dot q_i=\sum_{j\ne i}m_j
\frac{r_j-r_i}{|r_j-r_i|^3}.
$$

Define the positive gravitational potential

$$
U(r_1,\ldots,r_N)
=\sum_{i<j}\frac{m_im_j}{|r_i-r_j|}.
$$

Then $m_i\ddot r_i=\nabla_{r_i}U$.

!!! proposition "Proposition (Mechanical invariants)"
    <a id="prop-nbody-invariants"></a>
    Along every collision-free solution, the total momentum

    $$
    P=\sum_{i=1}^N m_i\dot r_i,
    $$

    the energy

    $$
    E=\frac12\sum_{i=1}^N m_i|\dot r_i|^2-U,
    $$

    and the total angular momentum

    $$
    L=\sum_{i=1}^N r_i\times m_i\dot r_i
    $$

    are constant.

??? proof "Proof"
    Each force between a pair of bodies is equal and opposite, so summing the equations gives $\dot P=0$. If

    $$
    T=\frac12\sum_{i=1}^N m_i|\dot r_i|^2,
    $$

    then

    $$
    \dot T
    =\sum_i\dot r_i\cdot\nabla_{r_i}U
    =\dot U,
    $$

    and hence $d(T-U)/dt=0$.

    For a single particle with momentum $p=m\dot r$, angular momentum $r\times p$, and torque $\tau=r\times F$,

    $$
    \frac{d}{dt}(r\times p)
    =\dot r\times p+r\times\dot p
    =r\times F=\tau.
    $$

    Gravitational forces are central, so the torques of every interacting pair cancel. Therefore $\dot L=0$.

In coordinates, the vanishing total torque includes

$$
\sum_{i=1}^N
\left(z_i\frac{\partial U}{\partial y_i}
-y_i\frac{\partial U}{\partial z_i}\right)=0
$$

and the two cyclic analogues. These are the three component equations behind conservation of total angular momentum.

!!! example "Example (Two-body reduction)"
    For two bodies, set

    $$
    M=m_1+m_2,
    \qquad
    R=\frac{m_1r_1+m_2r_2}{M},
    \qquad
    r=r_1-r_2.
    $$

    The center of mass and the relative position satisfy

    $$
    \ddot R=0,
    \qquad
    \ddot r=-M\frac{r}{|r|^3}.
    $$

    In the center-of-mass frame $R=0$,

    $$
    r_1=\frac{m_2}{M}r,
    \qquad
    r_2=-\frac{m_1}{M}r.
    $$

    Thus the two positions are recovered from one relative vector. Moreover, $r\times\dot r$ is constant. When this vector is nonzero, $r(t)$ lies in the plane through the origin perpendicular to it; when it is zero, the motion is radial and already lies on a line. After rotating coordinates one may therefore take $z_1=z_2=0$. The original six scalar second-order equations have reduced to one planar central-force problem.

!!! remark "Remark (Kepler's laws)"
    The two-body reduction is the starting point for deriving Kepler's three laws: bounded noncircular orbits are ellipses with the attracting body at a focus; equal areas are swept out in equal times; and the square of the orbital period is proportional to the cube of the semimajor axis.
