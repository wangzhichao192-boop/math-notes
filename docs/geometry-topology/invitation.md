# Invitation

This chapter is a warm-up: three basic questions that motivate the whole
course — the (im)possibility of a continuous complex square root, the winding
number of a plane curve, and the angle defect of a polyhedron with its
Gauss–Bonnet formula.

## The Square Roots of a Complex Number

A positive real number $x$ has two distinct square roots, a positive one
$\sqrt{x}$ and a negative one $-\sqrt{x}$. A nonzero complex number
$z = x + iy$ always has two distinct square roots, and one may be tempted to
write them as $\pm \sqrt{z}$. But which one *should* $\sqrt{z}$ be? For
positive reals there is a canonical answer — take the positive root — but this
does not apply to complex numbers, since the two square roots of $z$ need not
be real.

Let us try to find a "coherent way" of assigning a value, i.e. a continuous
function $f : \mathbb{C} \to \mathbb{C}$ such that $f(z)^2 = z$. Focus on
$z \in S$, the unit circle centered at $0$. Writing
$z = \exp(2\pi i \theta) = \cos \theta + i \sin \theta$, De Moivre's theorem
gives

$$
\exp(2\pi i \theta) \cdot \exp(2\pi i \phi) = \exp(2\pi i(\theta + \phi)).
$$

A reasonable definition of $f$ seems to be
$f(\exp(2\pi i \theta)) = \exp(\pi i \theta)$, fixing an interval for
$\theta$, say $I = [0, 2\pi)$. We verify $f(1) = 1$. On the other hand, if
$w \in S$ is in the fourth quadrant and very close to $1$, say
$w = \exp(1.998\pi i)$, then $f(w) = \exp(0.999\pi i)$, which is very close to
$-1$ and quite far from $1$. So the $f$ thus defined is **not continuous at
$1$**: it "tears the circle apart" at $1$ and then "shrinks" it by half. See
[Figure 1](geometry-and-topology.pdf#page=6) in the lecture notes for an
illustration.

Adjusting the interval does not help globally: taking $I = [-\pi, \pi)$
resolves the problem locally at $\theta = 0$, but then one has to "tear the
circle apart" at $-1$. On a "global" scale the problem persists.

!!! remark "Remark"
    <a id="rem-1-1-2"></a>
    One runs into a similar problem when trying to define a continuous
    logarithm function $g : S \to \mathbb{R}$ such that
    $\exp(g(z)) = z$.

The map $z \mapsto z^2$ on $S$ stretches the unit circle and winds it around
itself twice; more generally $z \mapsto z^n$ winds the circle around itself
$n$ times. We look into this winding process more closely in the next section.

## Winding Numbers

We study how plane curves wind around a given point, beginning with the
simplest kind of curves.

!!! definition "Definition (Directed planar polyline)"
    <a id="def-1-2-1"></a>
    A **directed planar polyline**, or simply a **polyline**, is an ordered
    collection of directed line segments
    $L = (l_1, \dots, l_r)$ where the terminal point of $l_i$ is the initial
    point of $l_{i+1}$.

    All planar angles in this section are oriented so that counter-clockwise
    angles are positive.

!!! definition "Definition (Angle of a polyline around a point)"
    <a id="def-1-2-2"></a>
    Let $L = (l_1, \dots, l_r)$ be a polyline, with initial and terminal end
    points of $l_i$ given by $a_i$ and $a_{i+1}$ respectively. Let $p$ be a
    point of the plane and let $\theta_i$ be the angle $\angle a_i p a_{i+1}$.
    Then the sum

    $$
    \theta = \sum_{i} \theta_i
    $$

    is called the **angle of $L$ around $p$**. See
    [Figure 2](geometry-and-topology.pdf#page=7) in the lecture notes for an
    illustration.

!!! definition "Definition (Closed polyline)"
    <a id="def-1-2-3"></a>
    A polyline $L = (l_1, \dots, l_r)$ is **closed** if the initial point of
    $l_1$ is the terminal point of $l_r$. If $\theta$ is the angle of a closed
    polyline $L$ around a point $p$, the two sides of the angle $\theta$
    coincide, hence $\theta = 2\pi n$ for some integer $n$.

!!! remark "Remark"
    <a id="rem-1-2-4"></a>
    The "closeness" condition on $L$ leads to a strong restriction on the
    value of its angle around a point. In Section I.3 we will see the analog
    of this phenomenon in three dimensions.

!!! definition "Definition (Winding number)"
    <a id="def-1-2-5"></a>
    Let $L$ be a closed polyline and let $p$ be a point on the same plane, not
    on $L$. The **winding number of $L$ around $p$** is the integer $n$ such
    that the angle of $L$ around $p$ is $2\pi n$. It is denoted by $W(L, p)$.

!!! example "Example"
    <a id="ex-1-2-6"></a>
    Let $L = (l_1, \dots, l_r)$ be the successive edges of a polygon $C$, each
    $l_i$ assigned a direction so that they collectively form a counter-
    clockwise loop. Then $L$ is a closed polyline, and for a point $p$ inside
    $C$ one has $W(L, p) = 1$. Let $L_2 = (l_1, \dots, l_r, l_1, \dots, l_r)$,
    then $W(L_2, p) = 2$. If each $l_i$ is given the opposite direction, then
    $W(L, p) = -1$. For a point $q$ outside $C$, one has $W(L, q) = 0$. See
    [Figure 3](geometry-and-topology.pdf#page=7) in the lecture notes.

For the moment these statements are not proved; they are intuitively clear and
will be recovered in Chapter III through the fundamental group of the circle.
Indeed, we would like to extend the notion of winding number to more general
loops, such as the map

$$
\sigma : [0, 1] \to S, \quad t \mapsto \exp(2\pi i n t), \quad n \in \mathbb{Z},
$$

which winds the interval around the circle $n$ times. This will be the topic of
Chapter III.

## Angle Defect and the Gauss–Bonnet Formula for Polyhedra

We now consider polyhedra, the natural generalization of polygons to
three-dimensional space.

!!! definition "Definition (Polyhedron)"
    <a id="def-1-3-1"></a>
    A **polyhedron** $P$ is a collection of distinct polygons
    $F_1, \dots, F_r$ in $\mathbb{R}^3$, called the **faces** of $P$, subject
    to the following conditions:

    + **(P1)** If $i \neq j$, then $F_i \cap F_j$ is either $\varnothing$ or a
      common edge of $F_i$ and $F_j$.
    + **(P2)** If $E, E'$ are distinct edges of faces of $P$, then $E \cap E'$
      is either $\varnothing$ or a vertex of one of the faces.
    + **(P3)** For each edge $E$, there are exactly two faces $F, F'$ such that
      $E = F \cap F'$.

    The edges (or vertices) of the faces of $P$ are called the edges (or
    vertices) of $P$.

A polyhedron is among the simplest examples of "closed surfaces" in
$\mathbb{R}^3$. We define a quantity that measures how a polyhedron is "bent"
at a vertex. Let $F_1, \dots, F_r$ be distinct faces of $P$ such that the
$F_i \cup F_j = E_{ij}$ are distinct edges and $V = E_1 \cap E_2$ is a vertex;
let $\alpha_i$ be the inner angle of $F_i$ at $V$.

!!! definition "Definition (Angle defect)"
    <a id="def-1-3-2"></a>
    The **angle defect of $P$ at $V$** is

    $$
    2\pi - \sum_{i=1}^{r} \alpha_i.
    $$

    The sum of the angle defects of all vertices of $P$ is called the **total
    angle defect of $P$** and is denoted by $\sigma(P)$.

For the top of a mountain or the bottom of a basin the angle defect is
positive; near the source of a creek it is negative. See
[Figure 4](geometry-and-topology.pdf#page=8) in the lecture notes for typical
cases of angle defects. Computing the total angle
defect of a regular tetrahedron and a cube, one finds $4\pi$ in both cases —
a hint that something global is going on.

!!! definition "Definition (Euler characteristic)"
    <a id="def-1-3-4"></a>
    Let $P$ be a polyhedron, and let $v, e, f$ be the total numbers of the
    vertices, edges, and faces of $P$ respectively. The **Euler
    characteristic** of $P$, denoted $\chi(P)$, is defined as

    $$
    \chi(P) := v - e + f.
    $$

The polyhedron $T$ of [Figure 5](geometry-and-topology.pdf#page=9) (which
"blows up" into a torus, visually distinguishable from a sphere) has total
angle defect $\sigma(T) = 0$, so it
differs from all earlier examples. The pattern is known as

!!! theorem "Theorem (Gauss–Bonnet for polyhedra)"
    <a id="thm-1-3-7"></a>
    Let $P$ be a polyhedron. We have $\sigma(P) = 2\pi\chi(P)$.

!!! remark "Remark"
    <a id="rem-1-3-8"></a>
    The quantities $\sigma(P)$ and $2\pi\chi(P)$ appear to be of very
    different natures: $\sigma(P)$ is the sum of "locally" defined quantities,
    whereas $2\pi\chi(P)$ is obviously an integral multiple of $2\pi$, with no
    obvious decomposition into local pieces. Many deep theorems in geometry
    and topology unify two quantities about one geometric object, one
    continuous and local, the other discrete and global. Based on these
    examples we may conjecture that if two polyhedra $P$ and $Q$ can be
    "deformed into the same shape" (a sphere or a torus), then
    $\sigma(P) = \sigma(Q)$, or equivalently $\chi(P) = \chi(Q)$. Making this
    precise — defining the "total angle defect" or "Euler characteristic" of a
    sphere or torus without reference to a polyhedron — requires the modern
    machinery of geometry and topology developed in the rest of this course.

