# Local Theory

Explicit formulas are exceptional. The local theory instead asks whether an initial value problem has a solution, whether that solution is unique, and how far it can be continued. Compactness supplies existence; quantitative control in the dependent variable supplies uniqueness.

## Compactness

Peano's existence theorem is proved by constructing polygonal approximations. The approximations need not converge as a whole, so one first needs a criterion that produces a uniformly convergent subsequence.

!!! definition "Definition (Uniform boundedness)"
    <a id="def-uniform-boundedness"></a>
    A family $\{f_\alpha\}_{\alpha\in A}$ on a set $D$ is **uniformly bounded** if there is an $M>0$ such that

    $$
    |f_\alpha(x)|\le M
    $$

    for every $\alpha\in A$ and every $x\in D$.

!!! definition "Definition (Equicontinuity)"
    <a id="def-equicontinuity"></a>
    A family $\{f_\alpha\}_{\alpha\in A}$ on an interval $I$ is **equicontinuous** if, for every $\varepsilon>0$, there is a $\delta>0$ such that

    $$
    |x-y|<\delta
    \quad\Longrightarrow\quad
    |f_\alpha(x)-f_\alpha(y)|<\varepsilon
    $$

    for every $\alpha\in A$. The same $\delta$ must work for the entire family.

!!! theorem "Theorem (Arzelà–Ascoli)"
    <a id="thm-arzela-ascoli"></a>
    Every uniformly bounded and equicontinuous sequence of real-valued functions on a compact interval $[a,b]$ has a uniformly convergent subsequence.

??? proof "Proof"
    Choose a countable dense set $E=\{x_1,x_2,\ldots\}\subset[a,b]$. Uniform boundedness makes $\{f_n(x_1)\}$ a bounded numerical sequence, so it has a convergent subsequence. From that subsequence choose a further subsequence that converges at $x_2$. Continuing inductively gives nested subsequences. The diagonal sequence $g_k=f_{kk}$ converges at every $x_j\in E$.

    This pointwise limit extends continuously to all of $[a,b]$. Indeed, equicontinuity implies that values of every $g_k$ at two nearby points are uniformly close. Approximating an arbitrary $x$ by points of $E$ therefore makes $\{g_k(x)\}$ Cauchy.

    It remains to prove uniform convergence. Given $\varepsilon>0$, choose $\delta>0$ from equicontinuity so that

    $$
    |x-y|<\delta
    \quad\Longrightarrow\quad
    |g_k(x)-g_k(y)|<\frac{\varepsilon}{3}
    $$

    for every $k$. Choose finitely many points $x_{j_1},\ldots,x_{j_r}\in E$ whose $\delta$-neighbourhoods cover $[a,b]$. Since $g_k(x_{j_i})$ converges for each of these finitely many points, there is an $N$ such that

    $$
    |g_m(x_{j_i})-g_n(x_{j_i})|<\frac{\varepsilon}{3}
    $$

    whenever $m,n\ge N$ and $1\le i\le r$. For any $x\in[a,b]$, choose $x_{j_i}$ with $|x-x_{j_i}|<\delta$. Then

    $$
    \begin{aligned}
    |g_m(x)-g_n(x)|
    &\le |g_m(x)-g_m(x_{j_i})|\\
    &\quad+|g_m(x_{j_i})-g_n(x_{j_i})|\\
    &\quad+|g_n(x_{j_i})-g_n(x)|
    <\varepsilon.
    \end{aligned}
    $$

    Thus $\{g_k\}$ is uniformly Cauchy and hence uniformly convergent.



## Existence and Uniqueness

Consider the initial value problem

$$
y'=f(x,y),
\qquad
y(x_0)=y_0.
$$

Continuity of $f$ is enough for local existence. Uniqueness requires control of how rapidly $f$ changes in the $y$-direction.

!!! definition "Definition (Lipschitz condition)"
    <a id="def-lipschitz-condition"></a>
    The function $f$ is **Lipschitz in $y$** on a region $D$ if there is an $L>0$ such that

    $$
    |f(x,y_1)-f(x,y_2)|\le L|y_1-y_2|
    $$

    whenever $(x,y_1),(x,y_2)\in D$. If $f_y$ is continuous on a compact rectangle, the mean value theorem supplies such an $L$.

!!! theorem "Theorem (Picard)"
    <a id="thm-picard"></a>
    Let $f$ be continuous on

    $$
    D=\{(x,y):|x-x_0|\le a,\ |y-y_0|\le b\}
    $$

    and Lipschitz in $y$ on $D$. Put

    $$
    M=\max_D|f|,
    \qquad
    h=\min\left\{a,\frac{b}{M}\right\},
    $$

    with $h=a$ if $M=0$. Then the IVP has a unique solution on $|x-x_0|\le h$.

The bound $h\le b/M$ has a geometric meaning: a curve with $|y'|\le M$ moves vertically by at most $M|x-x_0|$, so it cannot leave the rectangle through its horizontal sides.

??? idea "Idea"
    Rewrite the ODE as an integral equation and repeatedly substitute the previous approximation into its right-hand side. The Lipschitz estimate produces factorial decay between successive approximations. Their uniform limit solves the equation, and Gronwall's inequality forces any two solutions with the same initial value to coincide.

!!! lemma "Lemma (Gronwall inequality)"
    <a id="lem-gronwall"></a>
    Let $u$ and $g$ be continuous and nonnegative on $[a,b]$. If $c\ge0$ and

    $$
    u(x)\le c+\int_a^x g(s)u(s)\,ds,
    $$

    then

    $$
    u(x)\le c\exp\left(\int_a^x g(s)\,ds\right).
    $$

??? proof "Proof"
    Set

    $$
    G(x)=\int_a^x g(s)u(s)\,ds.
    $$

    Then $G(a)=0$ and

    $$
    G'(x)=g(x)u(x)\le g(x)(c+G(x)).
    $$

    Multiplication by $\exp(-\int_a^x g)$ gives

    $$
    \left(e^{-\int_a^x g(s)\,ds}G(x)\right)'
    \le c g(x)e^{-\int_a^x g(s)\,ds}.
    $$

    Integrating from $a$ to $x$ yields

    $$
    G(x)\le c\left(e^{\int_a^x g(s)\,ds}-1\right).
    $$

    Since $u(x)\le c+G(x)$, the stated inequality follows.

??? proof "Proof of Picard's theorem"
    The ODE is equivalent to

    $$
    y(x)=y_0+\int_{x_0}^{x}f(s,y(s))\,ds.
    $$

    Define successive approximations by

    $$
    y_0(x)=y_0,
    \qquad
    y_{n+1}(x)=y_0+\int_{x_0}^{x}f(s,y_n(s))\,ds.
    $$

    Because $M h\le b$, every iterate remains in $D$. The first difference satisfies $|y_1-y_0|\le M|x-x_0|$. Inductively, the Lipschitz condition gives

    $$
    |y_{n+1}(x)-y_n(x)|
    \le \frac{M L^n|x-x_0|^{n+1}}{(n+1)!}.
    $$

    The majorant series converges, so $\sum_{n\ge0}(y_{n+1}-y_n)$ converges uniformly. Its limit $y$ is continuous. Uniform convergence and continuity of $f$ allow passage to the limit in the integral equation, proving that $y$ is a solution.

    If $y$ and $z$ are two solutions with the same initial value, then

    $$
    |y(x)-z(x)|
    \le L\int_{x_0}^{x}|y(s)-z(s)|\,ds
    $$

    for $x\ge x_0$. Gronwall's inequality with $c=0$ gives $y=z$. The argument to the left of $x_0$ is identical after reversing the interval.

Lipschitz continuity is sufficient but not necessary for uniqueness. The next result replaces the linear modulus $Lr$ by a more general one.

!!! theorem "Theorem (Osgood uniqueness criterion)"
    <a id="thm-osgood"></a>
    Suppose $f$ is continuous and there is a continuous function $\omega:(0,\infty)\to(0,\infty)$ such that

    $$
    |f(x,y_1)-f(x,y_2)|\le\omega(|y_1-y_2|)
    $$

    locally near the initial point. If

    $$
    \int_{0^+}\frac{dr}{\omega(r)}=\infty,
    $$

    then the IVP has at most one local solution.

??? proof "Proof"
    Suppose two solutions separate to the right of a last contact point $\bar x$. After interchanging them if necessary, let $r=y_1-y_2>0$ immediately to the right of $\bar x$. Then

    $$
    r'(x)\le |f(x,y_1)-f(x,y_2)|\le\omega(r(x)).
    $$

    For $\bar x<x_1<x$ this gives

    $$
    \int_{r(x_1)}^{r(x)}\frac{ds}{\omega(s)}\le x-x_1.
    $$

    Letting $x_1\downarrow\bar x$ forces the left-hand side to diverge because $r(x_1)\downarrow0$, while the right-hand side stays finite. This contradiction proves uniqueness. The argument on the left is analogous.

For $\omega(r)=Lr$, Osgood's divergent integral is exactly the Lipschitz case. By contrast, $\omega(r)=r^\alpha$ with $0<\alpha<1$ has a finite integral at zero, consistent with the branching solutions of $y'=y^{1/3}$.

!!! theorem "Theorem (Peano)"
    <a id="thm-peano"></a>
    Let $f$ be continuous on the rectangle

    $$
    D=\{(x,y):|x-x_0|\le a,\ |y-y_0|\le b\}.
    $$

    With $M=\max_D|f|$ and $h=\min\{a,b/M\}$, the IVP has at least one solution on $|x-x_0|\le h$.

??? proof "Proof"
    It is enough to work on $[x_0,x_0+h]$; the other side is identical. Divide this interval into $n$ pieces with nodes $x_j=x_0+jh/n$. Starting at $y_n(x_0)=y_0$, define $y_n$ on $[x_j,x_{j+1}]$ to be the line of slope $f(x_j,y_n(x_j))$. Since every slope has absolute value at most $M$,

    $$
    |y_n(x)-y_0|\le M|x-x_0|\le Mh\le b.
    $$

    Thus all polygons remain in $D$. They are uniformly bounded and satisfy

    $$
    |y_n(x)-y_n(s)|\le M|x-s|,
    $$

    so they are equicontinuous. Arzelà–Ascoli gives a subsequence converging uniformly to a continuous function $y$.

    Let $\tau_n(s)$ be the left endpoint of the mesh interval containing $s$. The polygonal construction can be written

    $$
    y_n(x)=y_0+\int_{x_0}^{x}
    f\bigl(\tau_n(s),y_n(\tau_n(s))\bigr)\,ds.
    $$

    Now $|s-\tau_n(s)|\le h/n$ and $|y_n(s)-y_n(\tau_n(s))|\le Mh/n$. Uniform continuity of $f$ on $D$ therefore makes the integrand uniformly close to $f(s,y_n(s))$. Uniform convergence of $y_n$ then gives

    $$
    y(x)=y_0+\int_{x_0}^{x}f(s,y(s))\,ds.
    $$

    Hence $y$ solves the IVP.

Peano gives existence but says nothing about uniqueness. The equation $y'=y^{1/3}$ is the basic warning: its right-hand side is continuous, yet several integral curves pass through the same point.

## Extension of the Solution
By Picard and Peano, gives solution of $\begin{cases}  y' =f(x,y)\\ y_0 =y(x_0) \end{cases}$ on $[x_0, x_0+h]$ where $h$ is determined by property $of$ $f$.

Then it's natural to use $(x_0+h,y_{x_0+h})$ as new initial value, how far can we extend the solution?

We are interested in the largest domain where solution exists.
!!! example "Example (Finite-time escape)"
    For

    $$
    y'=1+y^2,
    \qquad
    y(0)=0,
    $$

    the solution is $y=\tan x$. Although the right-hand side is smooth on all of $\mathbb R^2$, the maximal interval is $(-\pi/2,\pi/2)$. The obstruction is not a singularity of $f$ but the escape $|y(x)|\to\infty$ in finite time.
!!! theorem "Theorem (Extension of solutions)"
    Let $G\subset\mathbb R^2$ be open and let $f:G\to\mathbb R$ be continuous.
    Suppose that $y$ is a solution of

    $$
    y'=f(x,y)
    $$

    on an interval $[x_0,\beta)$, where $\beta<\infty$.

    If the graph

    $$
    \{(x,y(x)):x_0\le x<\beta\}
    $$

    is contained in a bounded closed subset $G_1\subset G$, then $y$ can be extended
    beyond $\beta$.

    Equivalently, a maximal solution cannot terminate at a finite endpoint while
    its graph remains in a bounded closed subset of $G$.

??? proof "Proof"
    Since $G_1$ is bounded and closed, it is compact. Hence, by continuity of $f$,

    $$
    M:=\max_{G_1}|f|<\infty.
    $$

    As long as the graph of $y$ stays in $G_1$,

    $$
    |y'(x)|=|f(x,y(x))|\le M,
    $$

    so

    $$
    |y(x_2)-y(x_1)|\le M|x_2-x_1|.
    $$

    Therefore, if $\beta<\infty$ is the right endpoint of the interval of existence,
    the limit

    $$
    y_\beta:=\lim_{x\to\beta^-}y(x)
    $$

    exists. Since $G_1$ is closed,

    $$
    (\beta,y_\beta)\in G_1\subset G.
    $$

    Thus $(\beta,y_\beta)$ is still an interior point of the domain of $f$.
    By Peano's theorem, the IVP with initial value
    $y(\beta)=y_\beta$ has a local solution to the right of $\beta$.
    Gluing this solution to $y$ extends $y$ beyond $\beta$.

!!! example "Example (Comparison and blow-up)"
    Consider $y'=x^2+y^2$. Once $x\ge1$,

    $$
    y'\ge1+y^2.
    $$

    The comparison equation $z'=1+z^2$ has tangent solutions and blows up in finite forward time. Starting $z$ and $y$ from the same value at $x=1$, comparison shows that $y$ cannot exist for all positive time. Smoothness guarantees local uniqueness, not global existence.

!!! example "Example (Invariant strips)"
    Consider

    $$
    y'=(x^2+y^2+1)\sin(\pi y).
    $$

    Every horizontal line $y=k$, $k\in\mathbb Z$, is a solution. Uniqueness prevents any other integral curve from crossing these lines. Hence a solution starting with $k<y_0<k+1$ remains in that strip for all time. On every bounded $x$-interval its graph stays in a compact rectangle, so the continuation criterion extends it to all of $\mathbb R$.

    If $k$ is even, then $y'>0$ inside the strip and $y(x)$ increases. Its bounded limit as $x\to\infty$ must be $k+1$: any smaller limit would keep $\sin(\pi y)$ bounded away from zero while the factor $x^2+y^2+1$ grows. If $k$ is odd, the same argument shows that $y(x)$ decreases toward $k$.
