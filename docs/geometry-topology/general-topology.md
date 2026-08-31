# General Topology

This chapter develops the basic language of topology: continuous maps between
Euclidean spaces, metric spaces, topological spaces, the standard ways of
building new topologies from old ones, and the key notions of connectedness,
Hausdorffness, and (quasi)compactness.

## Continuous Mappings Between Euclidean Spaces

!!! definition "Definition (Continuity)"
    <a id="def-2-1-1"></a>
    Let $U$ be a subset of $\mathbb{R}^m$ and $f : U \to \mathbb{R}^n$ a
    mapping. Then $f$ is **continuous at $x$** if for any $\epsilon > 0$ there
    is a $\delta > 0$ such that for each $y \in U$ satisfying
    $|y - x| < \delta$, there is $|f(y) - f(x)| < \epsilon$. We simply say that
    $f$ is **continuous** if $f$ is continuous at all points $x \in U$. We say
    $f$ is **discontinuous at $x$** if it is not continuous at $x$.

!!! remark "Remark"
    <a id="rem-2-1-2"></a>
    In general, the choice of $\delta$ depends on $x$ and $\epsilon$.

!!! example "Example (Constant function)"
    <a id="ex-2-1-3"></a>
    Let $f : \mathbb{R}^m \to \mathbb{R}^n$ be the constant function taking
    value $c \in \mathbb{R}^n$. Then $f$ is continuous at every $x$.

??? proof "Proof"
    For any $\epsilon > 0$, take $y \in \mathbb{R}^n$ such that
    $|y - x| < 1$; then

    $$
    |f(y) - f(x)| = |c - c| = 0 < \epsilon.
    $$

!!! example "Example (Scaling)"
    <a id="ex-2-1-4"></a>
    Let $k \in \mathbb{R}$ and consider $f : \mathbb{R}^n \to \mathbb{R}^n$,
    $f(x) = kx$. Then $f$ is continuous at every $x$.

??? proof "Proof"
    If $k = 0$, then $f$ is constant and we are done by the previous example.
    Otherwise, for $\epsilon > 0$, any $y$ with $|y - x| < \epsilon/|k|$
    satisfies

    $$
    |f(y) - f(x)| = |k||y - x| < \epsilon.
    $$

!!! example "Example (Squaring)"
    <a id="ex-2-1-5"></a>
    Let $f : \mathbb{R} \to \mathbb{R}$ be defined by $f(x) = x^2$. Then $f$
    is continuous at every $x \in \mathbb{R}$.

??? proof "Proof"
    For $\epsilon > 0$, let

    $$
    0 < \delta < \min\left\{1, \frac{\epsilon}{1 + 2|x|}\right\}.
    $$

    For $y \in \mathbb{R}$ with $|y - x| < \delta$, we have $|y| < |x| + 1$ and

    $$
    |f(y) - f(x)| = |y - x||y + x|
    \leq |y - x|(|y| + |x|)
    \leq |y - x|(1 + 2|x|)
    < \epsilon.
    $$

!!! remark "Remark"
    <a id="rem-2-1-6"></a>
    A direct way to say that $f : U \to \mathbb{R}^n$ is discontinuous at
    $x \in U$ is as follows: there exists $\epsilon > 0$ such that for any
    $\delta > 0$ there is a $y \in U$ satisfying $|y - x| < \delta$ and
    $|f(y) - f(x)| \geq \epsilon$.

!!! example "Example (Step function)"
    <a id="ex-2-1-7"></a>
    Define $f : \mathbb{R} \to \mathbb{R}$ by

    $$
    f(x) = \begin{cases} -1, & x < 0, \\ 1, & x \geq 0. \end{cases}
    $$

    Then $f$ is discontinuous at $0$.

??? proof "Proof"
    Fix your favorite $0 < \epsilon < 2$. For any $\delta > 0$, let
    $y = -\delta/2$. Then $|y - 0| < \delta$ and
    $|f(y) - f(0)| = 2 > \epsilon$.

## Metric Spaces and Continuous Maps

The distance between $x = (x_1, \dots, x_n)$ and $y = (y_1, \dots, y_n)$ in
$\mathbb{R}^n$ is defined as

$$
\rho(x, y) := \left[ \sum_{i=1}^{n} (x_i - y_i)^2 \right]^{1/2}.
$$

The function $\rho(-, -)$ satisfies three properties:

+ **D1**: $\rho(x, y) \geq 0$, and equality holds if and only if $x = y$;
+ **D2**: $\rho(x, y) = \rho(y, x)$;
+ **D3**: $\rho(x, z) \leq \rho(x, y) + \rho(y, z)$ (triangle inequality).

!!! definition "Definition (Metric space)"
    <a id="def-2-2-1"></a>
    A **metric** on a set $X$ is a function $\rho : X \times X \to
    \mathbb{R}_{\geq 0}$ satisfying D1–D3. The pair $(X, \rho)$ is called a
    **metric space**. When no ambiguity is possible, we simply say that $X$ is
    a metric space.

!!! definition "Definition (Open and closed balls)"
    <a id="def-2-2-3"></a>
    Let $X$ be a metric space, $x \in X$, and $r > 0$. The **open ball** and
    the **closed ball** centered at $x$ with radius $r$ are defined
    respectively as

    $$
    B(x, r) := \{y \in X : \rho(x, y) < r\}
    $$

    and

    $$
    \bar{B}(x, r) := \{y \in X : \rho(x, y) \leq r\}.
    $$

!!! definition "Definition (Open and closed sets)"
    <a id="def-2-2-4"></a>
    Let $X$ be a metric space. An **open set** in $X$ is a union of open balls.
    A **closed set** in $X$ is the complement of an open set.

!!! remark "Remark"
    <a id="rem-2-2-5"></a>
    The empty set and $X$ itself are both open and closed.

!!! proposition "Proposition"
    <a id="prop-2-2-6"></a>
    Let $X$ be a metric space. A subset $U$ of $X$ is an open set if and only
    if for each $x \in U$, there is an open ball $B(x, r)$ which is a subset of
    $U$.

!!! definition "Definition (Limit point, closure)"
    <a id="def-2-2-7"></a>
    Let $X$ be a metric space and $A$ a subset of $X$. A **limit point** of
    $A$ is a point $x \in X$ such that for any open set $U$ containing $x$,

    $$
    (U - \{x\}) \cap A \neq \varnothing.
    $$

    The **closure** of $A$, denoted by $\bar{A}$, is the collection of all
    points in $A$ and all limit points of $A$.

!!! proposition "Proposition"
    <a id="prop-2-2-8"></a>
    Let $X$ be a metric space and $A$ a subset of $X$.

    + $\bar{A}$ is a closed set.
    + If $V$ is a closed set in $X$, then $\bar{V} = V$.

## Topological Spaces

Let $\tau$ be the collection of all open sets of a metric space $X$. Then the
following properties hold:

+ **T1**: if $\{U_i\}_{i \in I}$ is a family of members of $\tau$, then
  $\bigcup_{i \in I} U_i \in \tau$;
+ **T2**: if $U, V \in \tau$, then $U \cap V \in \tau$;
+ **T3**: $\varnothing, X \in \tau$.

It turns out that even with only these properties, a lot can be done.

!!! definition "Definition (Topological space)"
    <a id="def-2-3-1"></a>
    Let $X$ be a set and $\tau$ a collection of subsets of $X$ satisfying
    T1–T3. Then $\tau$ is called a **topology** on $X$. A member of $\tau$ is
    called an **open set** of $X$; the complement of an open set is called a
    **closed set** of $X$. The pair $(X, \tau)$ is called a **topological
    space**. When no ambiguity is possible, we simply call $X$ a topological
    space. For $x \in X$, an open set of $X$ containing $x$ is called a
    **neighborhood** of $x$.

!!! proposition "Proposition"
    <a id="prop-2-3-4"></a>
    If $X$ is a metric space, then the metric determines a collection of open
    sets $\tau$ which is a topology on $X$.

!!! definition "Definition (Limit point, closure)"
    <a id="def-2-3-5"></a>
    Let $X$ be a topological space and $A \subset X$. A **limit point** of $A$
    in $X$ is a point $x \in X$ such that for any neighborhood $U$ of $x$, the
    set $U \cap A$ contains some points other than $x$. The **closure** of $A$
    in $X$, denoted by $\bar{A}$, is the subset of $X$ consisting of all points
    of $A$ and all limit points of $A$.

!!! proposition "Proposition"
    <a id="prop-2-3-6"></a>
    Let $X$ and $A$ be as in the definition above. Then $\bar{A}$ is the
    intersection of all closed sets containing $A$ as a subset. In particular,
    $\bar{A}$ is a closed set, and if $A$ is closed, then $\bar{A} = A$.

??? proof "Proof"
    Let $\Phi$ be the collection of all closed subsets containing $A$, and let
    $\Gamma = \bigcap_{V \in \Phi} V$ be their intersection.

    First we show $\bar{A} \subset \Gamma$, i.e. $\bar{A} \subset V$ for every
    $V \in \Phi$. Since $X - V$ is an open set and $(X - V) \cap A =
    \varnothing$, any point $x \in X - V$ is not a limit point of $A$; in other
    words, any limit point of $A$ lies in $V$. Therefore $\bar{A} \subset V$.

    To show $\Gamma \subset \bar{A}$, fix $x \in X - \bar{A}$. Then there is an
    open set $U$ such that $U \cap A = \varnothing$ and $x \in U$. Taking
    $V = X - U$, we have $V \in \Phi$ and $x \notin V$, as required.

!!! definition "Definition (Continuity at a point)"
    <a id="def-2-3-7"></a>
    Let $X, Y$ be topological spaces and $x \in X$. A mapping $f : X \to Y$ is
    **continuous at $x$** if for any open set $V$ in $Y$ such that
    $f(x) \in V$, there is an open set $U$ in $X$ satisfying $x \in U$ and
    $U \subset f^{-1}(V)$. When $f$ is continuous at every $x \in X$, we simply
    say that $f$ is **continuous**. In this course, a continuous mapping is
    also called a **map**.

!!! proposition "Proposition"
    <a id="prop-2-3-9"></a>
    A mapping $f : X \to Y$ between topological spaces is continuous if and
    only if the following is true: if $V$ is an open set in $Y$, then
    $f^{-1}(V)$ is an open set in $X$.

!!! proposition "Proposition"
    <a id="prop-2-3-11"></a>
    Topological spaces and continuous maps form a "category".

    + For a topological space $X$, the identity function $I_X$ is continuous.
    + Let $f : X \to Y$ and $g : Y \to Z$ be mappings between topological
      spaces, and let $x \in X$. If $f$ is continuous at $x$ and $g$ is
      continuous at $f(x)$, then $gf$ is continuous at $x$. In particular, if
      $f$ and $g$ are continuous, then so is $gf : X \to Z$.

!!! definition "Definition (Homeomorphism)"
    <a id="def-2-3-13"></a>
    Let $X, Y$ be topological spaces and $f : X \to Y$ a map. Then $f$ is a
    **homeomorphism** if $f$ is a bijection and $f^{-1}$ is continuous.

!!! example "Example (Square and disk)"
    <a id="ex-2-3-14"></a>
    Let

    $$
    X = \{(x, y) \in \mathbb{R}^2 : -1 \leq x, y \leq 1\}
    $$

    be a square in $\mathbb{R}^2$, and let

    $$
    Y = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 \leq 1\}
    $$

    be a disk. Both $X$ and $Y$ inherit the distance function from
    $\mathbb{R}^2$ and are therefore metric spaces, whence topological spaces.
    The map $f : X \to Y$ sending $(x, y) \in X$ to the unique point of $Y$ of
    the form $(tx, ty)$ with $t > 0$ is a homeomorphism, as indicated by
    [the picture](geometry-and-topology.pdf#page=15) in the lecture notes. This
    illustrates that
    topology concerns properties invariant under "stretching and shrinking";
    for this reason topology is sometimes nicknamed "rubber sheet geometry".

!!! remark "Remark"
    <a id="rem-2-3-15"></a>
    Let $X' := X - (0,0)$ be the "punctured disk". Is there a homeomorphism
    $X \to X'$? It turns out that trying very hard does not help; the question
    is answered, in a rather indirect way, in Chapter III.

!!! definition "Definition (Coarser / finer topologies)"
    <a id="def-2-3-16"></a>
    Let $X$ be a set, and $\tau_1, \tau_2$ two topologies on $X$. If
    $\tau_1 \subset \tau_2$, then we say that the topology $\tau_1$ is
    **coarser** than $\tau_2$, or that $\tau_2$ is **finer** than $\tau_1$.

!!! example "Example (Trivial and discrete topologies)"
    <a id="ex-2-3-17"></a>
    A set $X$ always has two special topologies: the "coarsest" one, the
    **trivial topology** $\{X, \varnothing\}$, and the "finest" one, the
    **discrete topology**, consisting of all subsets of $X$.

!!! definition "Definition (Zariski topology)"
    <a id="def-2-3-20"></a>
    Let $F$ be a field (think of $F$ as one of $\mathbb{Q}$, $\mathbb{R}$ and
    $\mathbb{C}$), and $n$ a positive integer. A **Zariski closed set** in the
    $n$-fold Cartesian product $F^n$ is of the form

    $$
    V := \{(x_1, \dots, x_n) \in F^n : f_i(x_1, \dots, x_n) = 0,\ i \in I\}
    $$

    where $I$ is an index set and the $f_i$'s are polynomials in $n$ variables
    with coefficients in $F$. The **Zariski topology** $\tau_Z$ on $F^n$ is
    defined by

    $$
    \tau_Z := \{F^n - V : V \text{ is a Zariski closed set}\}.
    $$

    A member of $\tau_Z$ is called a **Zariski open set** in $F^n$. The Zariski
    topology plays a fundamental role in algebraic geometry.

!!! definition "Definition (Basis of a topology)"
    <a id="def-2-3-22"></a>
    Given a topological space $(X, \tau)$, a **basis** of $(X, \tau)$ is a
    subset $\mathcal{B} \subset \tau$ such that any $U \in \tau$ is a union of
    members in $\mathcal{B}$. In this case we say that $\tau$ is **generated
    by** $\mathcal{B}$.

!!! example "Example"
    <a id="ex-2-3-23"></a>
    The set of open balls in a metric space $X$ form a basis of the topology
    on $X$ associated to the metric.

!!! definition "Definition (Basis properties)"
    <a id="def-2-3-24"></a>
    Let $X$ be a set and $\mathcal{B}$ a set of subsets of $X$. Then
    $\mathcal{B}$ is said to have the **basis properties** if the following
    holds:

    + $X = \bigcup_{U \in \mathcal{B}} U$, and
    + if $U, V \in \mathcal{B}$, then for each point $x \in U \cap V$, there is
      a $W \in \mathcal{B}$ such that $x \in W$ and $W \subset U \cap V$.

!!! proposition "Proposition"
    <a id="prop-2-3-25"></a>
    Let $X$ and $\mathcal{B}$ be as above. Then $\mathcal{B}$ is a basis for a
    topology on $X$ if and only if $\mathcal{B}$ has the basis properties.

## Deriving New Topologies from Existing Ones

!!! definition "Definition (Subspace topology)"
    <a id="def-2-4-2"></a>
    Let $(X, \tau)$ be a topological space and $A$ a subset of $X$. The set

    $$
    \tau_A = \{U \cap A : U \in \tau\}
    $$

    is a topology on $A$. The pair $(A, \tau_A)$ is called the **subspace** of
    $X$ with underlying set $A$, and $\tau_A$ is the **subspace topology** on
    $A$.

When we consider "geometric objects" such as curves and surfaces in Euclidean
spaces, we most often regard them as subspaces of Euclidean spaces.

Given a collection of sets $\{X_i\}_{i \in I}$, we have the **disjoint union**

$$
\sqcup_{i \in I} X_i := \{(i, x_i) : i \in I,\ x_i \in X_i\},
$$

with canonical injective maps $\iota_i : X_i \to \sqcup_{i \in I} X_i$,
$x_i \mapsto (i, x_i)$, and the **Cartesian product**

$$
\prod_{i \in I} X_i := \left\{ f : I \to \sqcup_{i \in I} X_i : f(i) \in X_i \right\},
$$

with canonical surjective projections.

!!! definition "Definition (Disjoint union topology)"
    <a id="def-2-4-6"></a>
    Let $(X_i, \tau_i)$ be topological spaces. The **disjoint union topology**
    of $\sqcup_{i \in I} X_i$ is the topology generated by
    $\bigcup_{i \in I} \iota_i(\tau_i)$.

!!! definition "Definition (Product and box topologies)"
    <a id="def-2-4-8"></a>
    Let $\{X_i\}_{i \in I}$ be topological spaces.

    The topology on $\prod_{i \in I} X_i$ generated by

    $$
    \mathcal{B} = \left\{ \prod_{i \in I} U_i : U_i \in \tau_i,\ U_i = X_i \text{ for all but finitely many } i \in I \right\}
    $$

    is called the **product topology** of $\prod_{i \in I} X_i$. The topology
    on $\prod_{i \in I} X_i$ generated by

    $$
    \mathcal{B}' = \left\{ \prod_{i \in I} U_i : U_i \in \tau_i,\ i \in I \right\}
    $$

    is called the **box topology** of $\prod_{i \in I} X_i$.

    The two topologies agree when the index set $I$ is finite.

Let $X$ be a set and $R$ a subset of $X \times X$. We write $x \sim y$ for
$(x, y) \in R$, and call $R$ an **equivalence relation** on $X$ if it is
reflexive, symmetric, and transitive. The **equivalence classes** partition
$X$.

!!! definition "Definition (Quotient set)"
    <a id="def-2-4-14"></a>
    Given a set $X$ and an equivalence relation $R$ on $X$, the **quotient set**
    of $X$ under $R$, denoted $X/R$ (read "X modulo R"), is the set of
    equivalence classes in $X$ under $R$. The function $X \to X/R$ sending
    $x \in X$ to the equivalence class containing $x$ is called the **quotient
    function** under $R$; it is surjective.

!!! definition "Definition (Quotient topological space)"
    <a id="def-2-4-16"></a>
    Let $(X, \tau)$ be a topological space and $R$ an equivalence relation on
    (the underlying set of) $X$, with quotient function $q : X \to X/R$. The
    set

    $$
    \tau_R := \{U \subset X/R : q^{-1}(U) \in \tau\}
    $$

    is a topology on $X/R$; the topological space $(X/R, \tau_R)$ is called
    the **quotient topological space** under $R$.

!!! example "Example (The circle as a quotient)"
    <a id="ex-2-4-17"></a>
    Let $X = [0, 1]$ with the subspace topology as a subspace of
    $\mathbb{R}$. Define a relation $R$ on $X$ by $(t, s) \in R$ if and only if
    $t = s$, or $(t, s) = (0, 1)$, or $(t, s) = (1, 0)$. Then the quotient
    space $X/R$ is homeomorphic to the circle, regarded as a subset of
    $\mathbb{C}$ with the subspace topology.

!!! definition "Definition (Projective spaces)"
    <a id="def-2-4-19"></a>
    Let $F$ be either $\mathbb{R}$ or $\mathbb{C}$. Let $\sim$ be the relation
    on $F^{n+1} - \{0\}$ such that $x \sim y$ if and only if $y = \lambda x$
    for some $\lambda \in F - \{0\}$. The resulting quotient space, denoted by
    $\mathbb{P}^n_F$, is called the **projective space of dimension $n$ over
    $F$**. For a point $x = (x_0, x_1, \dots, x_n) \in F^{n+1}$, we usually
    denote its equivalence class in $\mathbb{P}^n_F$ by
    $[x_0 : x_1 : \cdots : x_n]$.

    For $0 \leq i \leq n$, let $U_i$ be the subset of $\mathbb{P}^n_F$ defined
    by

    $$
    U_i := \{[x_0 : \cdots : x_n] \in \mathbb{P}^n_F : x_i \neq 0\}.
    $$

    Each $U_i$ is open in $\mathbb{P}^n_F$, homeomorphic to $F^n$, and
    $\mathbb{P}^n_F = \bigcup_{i=0}^{n} U_i$.

## Connected and Totally Disconnected Spaces

!!! definition "Definition (Connected, connected components)"
    <a id="def-2-5-1"></a>
    A topological space $X$ is **connected** if there is no subspace $Y$ of $X$
    such that $Y$ is both open and closed and $Y \neq X$ and $Y \neq
    \varnothing$. A space is **disconnected** if it is not connected.

    For $x, y \in X$, write $x \sim y$ if there is a connected subspace of $X$
    containing both $x$ and $y$. This is an equivalence relation; its
    equivalence classes are called the **connected components** of $X$. In
    other words, a connected component of $X$ is a subspace $Y$ of $X$ which
    is connected and is both open and closed in $X$.

!!! definition "Definition (Totally disconnected)"
    <a id="def-2-5-3"></a>
    A space $X$ is **totally disconnected** if all subspaces are disconnected,
    except the singletons (i.e. subsets consisting of one point).

Discrete sets are totally disconnected. A more interesting class of examples is
built from inverse limits of finite sets. For a sequence of spaces $X_i$,
$i$ a nonnegative integer, and $x \in \prod_i X_i$, denote by $x(i)$ the
projection of $x$ on $X_i$.

!!! definition "Definition (Sequentially profinite set)"
    <a id="def-2-5-4"></a>
    Let $X_i$ be a finite set with discrete topology for $i$ a nonnegative
    integer, and let $f_{i+1} : X_{i+1} \to X_i$ be a mapping. Let

    $$
    X := \left\{ x \in \prod_i X_i : f_{i+1}(x(i+1)) = x(i) \right\}
    $$

    be a subspace of $\prod_i X_i$ with the product topology. A **sequentially
    profinite set** is a space homeomorphic to such an $X$ for some $X_i$ and
    $f_i$.

!!! example "Example (The one-point compactification of $\mathbb{N}$)"
    <a id="ex-2-5-5"></a>
    Let $X_0 = \{\infty\}$. For a positive integer $n$, let
    $X_n := \{1, \dots, n, \infty\}$ and define

    $$
    f_{n+1} : X_{n+1} \to X_n, \quad f_{n+1}(k) = \begin{cases} k, & k < n+1, \\ \infty, & \text{else.} \end{cases}
    $$

    The resulting sequentially profinite set is denoted by
    $\mathbb{N}_\infty$. The element $n^* \in \mathbb{N}_\infty$ is defined by

    $$
    n^*(i) = \begin{cases} n, & i \geq n, \\ \infty, & i < n, \end{cases}
    $$

    and the element $\infty^*$ by $\infty^*(i) = \infty$ for all $i$.

!!! example "Example (n-adic integers)"
    <a id="ex-2-5-7"></a>
    Let $n > 1$ be an integer, let $X_i := \mathbb{Z}/n^i$, and let

    $$
    f_i : X_i \to X_{i-1}, \quad a \pmod{n^i} \mapsto a \pmod{n^{i-1}}.
    $$

    The resulting sequentially profinite set is denoted by $\mathbb{Z}_n$. When
    $n$ is prime, a member of $\mathbb{Z}_n$ is called an **n-adic integer**.
    For $a, b \in \mathbb{Z}_n$, we define

    $$
    (a + b)(i) := a(i) + b(i), \qquad (a \cdot b)(i) = a(i)b(i),
    $$

    both continuous; n-adic numbers form a ring playing an important role in
    modern number theory. An element $a \in \mathbb{Z}_n$ may be written as an
    infinite sum

    $$
    a = \sum_{k=0}^{\infty} x_k n^k
    $$

    where $a(i) \equiv \sum_{k=0}^{i-1} x_k n^k \pmod{n^i}$. For instance, the
    multiplicative inverse of $1 - n$ is $\sum_{k=0}^{\infty} n^k$.

!!! proposition "Proposition"
    <a id="prop-2-5-11"></a>
    A sequentially profinite set is totally disconnected.

## Hausdorff Spaces and (Quasi)compact Spaces

!!! definition "Definition (Convergence of a sequence)"
    <a id="def-2-6-1"></a>
    Let $X$ be a topological space, $\{x_n\}_n$ a sequence in $X$, and $x \in
    X$. We say that $\{x_n\}_n$ **converges** to $x$ if for any open set $U$
    such that $x \in U$, there is an integer $N$ such that for all $n > N$,
    $x_n \in U$. We say that $\{x_n\}_n$ is **convergent** if it converges to a
    point.

In a general topological space a sequence may converge to more than one point.
This is one of the reasons to introduce the following terminology.

!!! definition "Definition (Hausdorff space)"
    <a id="def-2-6-3"></a>
    A topological space $X$ is **Hausdorff** if for any $x, y \in X$ with
    $x \neq y$ there are open sets $U, V$ satisfying $x \in U$, $y \in V$, and
    $U \cap V = \varnothing$.

!!! remark "Remark"
    <a id="rem-2-6-4"></a>
    The property of being Hausdorff is one of the separation axioms of
    topological spaces, conventionally denoted $T_i$ for $0 \leq i \leq 2$. A
    space $X$ is $T_0$, or **Kolmogorov**, if for any two distinct points of
    $X$, at least one of them has a neighborhood not containing the other; it
    is $T_1$ if for any two distinct points, each has a neighborhood not
    containing the other; it is $T_2$ if it is Hausdorff.

!!! proposition "Proposition"
    <a id="prop-2-6-8"></a>
    A sequence $\{x_n\}_n$ in a Hausdorff space converges to at most one point
    $x$, in which case we write $\lim_n x_n = x$.

!!! definition "Definition (Open cover, subcover)"
    <a id="def-2-6-10"></a>
    Let $X$ be a topological space. An **open cover** of $X$ is a collection of
    open sets of $X$, denoted by $\{U_i\}_{i \in I}$, satisfying
    $X = \bigcup_{i \in I} U_i$. A **subcover** of an open cover
    $\{U_i\}_{i \in I}$ of $X$ is a subset of $\{U_i\}_{i \in I}$ which is a
    cover of $X$. A **finite (sub)cover** is a (sub)cover that contains only
    finitely many members.

!!! definition "Definition (Quasi-compact, compact)"
    <a id="def-2-6-11"></a>
    A topological space $X$ is **quasi-compact** if every open cover of $X$ has
    a finite subcover. A topological space is **compact** if it is
    quasi-compact and Hausdorff.

!!! proposition "Proposition"
    <a id="prop-2-6-12"></a>
    Any quotient space of a quasi-compact space is quasi-compact.

!!! definition "Definition (Limit point compact)"
    <a id="def-2-6-15"></a>
    A topological space is **limit point compact** if any infinite subset $A$
    of $X$ has a limit point.

!!! proposition "Proposition"
    <a id="prop-2-6-16"></a>
    A quasi-compact space is limit point compact.

??? proof "Proof"
    Suppose $X$ is quasi-compact and $A$ is an infinite subset of $X$. We argue
    by contradiction: assume $A$ has no limit point. For any $x \in X$, if
    $x \notin A$, there is a neighborhood $U_x$ of $X$ such that
    $U_x \cap A = \varnothing$; if $x \in A$, there is a neighborhood $U_x$ of
    $x$ such that $U_x \cap A = \{x\}$. The collection
    $\mathcal{C} = \{U_x : x \in X\}$ is an open cover of $X$; since $X$ is
    quasi-compact, there is a finite subcover of $\mathcal{C}$. But any
    subcover contains only finitely many points of $A$, which is absurd.

The converse statement is false.

!!! example "Example"
    <a id="ex-2-6-17"></a>
    Let $\mathbb{N}$ be equipped with the discrete topology and $Y = \{y_1,
    y_2\}$ with the trivial topology. Then $\mathbb{N} \times Y$ is limit point
    compact but not quasi-compact.

!!! definition "Definition (Sequentially compact)"
    <a id="def-2-6-18"></a>
    A topological space $X$ is **sequentially compact** if every sequence in
    $X$ has a convergent subsequence.

!!! remark "Remark"
    <a id="rem-2-6-20"></a>
    The statement of Exercise II.6.19 does not hold without the Hausdorff
    condition.

!!! proposition "Proposition"
    <a id="prop-2-6-21"></a>
    A metric space is compact if and only if it is sequentially compact.

The proof of the proposition requires two intermediate results. The **diameter**
of a subset $A$ of a metric space is the supremum of the distances between two
points of $A$.

!!! lemma "Lemma (Lebesgue number)"
    <a id="lem-2-6-22"></a>
    Let $(X, \rho)$ be a sequentially compact metric space, and let
    $\mathcal{U} = \{U_i\}_{i \in I}$ be an open cover of $X$. Then there is a
    $\delta > 0$ such that for any subset $A$ of $X$ with diameter less than
    $\delta$, we have $A \subset U_i$ for some $i$.

??? proof "Proof"
    We argue by contradiction. Suppose such a $\delta$ does not exist. Then for
    any positive integer $n$, there is a subset $A_n$ of $X$, of diameter less
    than $n^{-1}$, not a subset of any $U_i$. Let $x_n \in A_n$. The sequence
    $\{x_n\}_n$ has a subsequence converging to some $x \in X$.

    Let $\epsilon > 0$ and $i \in I$ satisfy $B(x, \epsilon) \subset U_i$. For
    some sufficiently large integer $n$ we have $n^{-1} < \epsilon/2$ and
    $\rho(x_n, x) < \epsilon/2$. For any $a \in A_n$,

    $$
    \rho(a, x) \leq \rho(a, x_n) + \rho(x_n, x) \leq \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon.
    $$

    Therefore $A_n \subset B(x, \epsilon) \subset U_i$, a contradiction.

!!! lemma "Lemma"
    <a id="lem-2-6-23"></a>
    Let $(X, \rho)$ be a sequentially compact metric space and $\epsilon > 0$.
    Then there is a finite cover $\{B(x_i, \epsilon) : 1 \leq i \leq N\}$.

??? proof "Proof"
    We argue by contradiction. Suppose for some $\epsilon > 0$ such a cover
    does not exist. Then, by induction on $n$, we have a sequence $\{x_n\}_n$
    such that $x_n$ is not in $B(x_i, \epsilon)$ for any $i < n$. Therefore
    $\{x_n\}_n$ has no convergent subsequence, a contradiction.

??? proof "Proof (of Proposition 2.6.21)"
    By Proposition 2.6.16, a quasi-compact space is limit point compact; a
    limit point compact metric space is sequentially compact.

    Now suppose $X$ is a sequentially compact metric space and
    $\mathcal{U} = \{U_i\}_{i \in I}$ is an open cover of $X$. By the Lebesgue
    number lemma there is a $\delta > 0$ such that any ball of radius less
    than $\delta/2$ is a subset of some $U_i$. Take $\epsilon = \delta/3$. By
    the second lemma, the desired result follows.

!!! proposition "Proposition"
    <a id="prop-2-6-24"></a>
    A sequentially profinite set is compact.

??? proof "Proof"
    Let $X$ be a sequentially profinite set of the form given in
    Definition 2.5.4. First we show that $X$ is Hausdorff. If
    $x, y \in X$, $x \neq y$, then $x(n) \neq y(n)$ for some $n$. For
    $U(a) := \{x \in X : x(n) = a\}$, we have $x \in U(x(n))$, $y \in U(y(n))$,
    and $U(x(n)) \cap U(y(n)) = \varnothing$. Hence $X$ is Hausdorff.

    Next we show $X$ is quasi-compact. It suffices to show that an open cover

    $$
    \mathcal{U} := \{U(a_j) : j \in J,\ a_j \in X_i \text{ for some } i\}
    $$

    has a finite sub-cover. Let $Y_i$ be the subset of $X_i$ whose members are
    all $y \in X_i$ such that $U(y)$ is not a subset of any finite union of
    members of $\mathcal{U}$. Notice

    $$
    U(z) \subset U(f_{i+1}(z)).
    $$

    We argue by contradiction: suppose $\mathcal{U}$ does not have a finite
    sub-cover. Then $Y_i \neq \varnothing$ for all $i$. For $y \in Y_i$ and
    $U(a) \in \mathcal{U}$, since $U(y)$ is the union of all $U(z)$ for
    $z \in f_{i+1}^{-1}(y)$, there is at least one $U(z)$ that is not a finite
    union of members of $\mathcal{U}$; in other words, the mapping
    $f_{i+1} : Y_{i+1} \to Y_i$ is surjective.

    Let $y \in X$ such that $y(i) \in Y_i$ for all $i$. Then $y \in U(a)$ for
    some $U(a) \in \mathcal{U}$, so $y(j) = a$ for some $j$, and therefore
    $U(y(j)) = U(a)$. By the surjectivity of the $f_k$, there is some
    $k > i, j$ such that $y(k) \in Y_k$. Then $U(y(k)) \subset U(y(j)) = U(a)$,
    a contradiction.

!!! remark "Remark (Profinite sets)"
    <a id="rem-2-6-26"></a>
    Topological spaces which are totally disconnected and compact are called
    **profinite sets**. We have shown that sequentially profinite sets are
    profinite sets. Indeed, there is an alternative definition of profinite
    sets, identifying them as certain subspaces of products of finite sets,
    much like our definition of sequentially profinite sets. The on-going
    project **Condensed Mathematics** takes the concept of profinite sets as a
    fundamental role.

We end this chapter with the statement (without proof) of

!!! theorem "Theorem (Tychonoff)"
    <a id="thm-2-6-27"></a>
    The product of quasi-compact spaces (with the product topology) is
    quasi-compact.

As a consequence, compact spaces are not necessarily sequentially compact: e.g.
the product $X^J$ of $J$ copies of $\{0, 1\}$ (discrete) is compact by
Tychonoff's theorem but not sequentially compact in general.

