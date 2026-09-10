# Kurzweil-Henstock Integration

This chapter begins the geometric setup for Kurzweil-Henstock integration on
the real line. It develops the structure and length of intervals, finite
divisions by non-overlapping compact cells, tagged divisions controlled by a
gauge, and the existence of gauge-fine divisions.

## Cells and Compact Cells

!!! definition "Definition (Cell)"
    <a id="def-2-1-1"></a>
    A **cell** is a nondegenerate interval $I\subseteq\mathbb{R}$; that is,
    $I$ is neither empty nor a singleton. A cell is **compact** if it is closed
    and bounded, equivalently if $I=[a,b]$ for some $a<b$.

!!! notation "Notation (Interior, closure, boundary, and diameter)"
    For $A\subseteq\mathbb{R}$, write
    $\operatorname{int}(A)$, $\overline{A}$, and $\partial A$ for its interior,
    closure, and boundary. For a nonempty set $S\subseteq\mathbb{R}$, define

    $$
    \operatorname{diam}(S):=\sup\{|x-y|:x,y\in S\},
    $$

    with value $+\infty$ when $S$ is unbounded.

!!! theorem "Theorem (Nested compact cells)"
    <a id="thm-2-1-2"></a>
    Let $(I_n)_{n\in\mathbb{N}}$ be compact cells such that
    $I_{n+1}\subseteq I_n$ for every $n$ and
    $\operatorname{diam}(I_n)\to0$. Then

    $$
    \bigcap_{n\in\mathbb{N}}I_n
    $$

    is a singleton.

??? proof "Proof"
    Write $I_n=[a_n,b_n]$. The sequence $(a_n)$ is increasing and bounded
    above by $b_0$, while $(b_n)$ is decreasing and bounded below by $a_0$.
    Let $a=\sup_n a_n$ and $b=\inf_n b_n$. Since $a_n\leq b_n$ for every
    $n$, we have $a\leq b$, and

    $$
    0\leq b-a\leq b_n-a_n=\operatorname{diam}(I_n)\longrightarrow0.
    $$

    Thus $a=b=:x$. The inequalities $a_n\leq x\leq b_n$ show that
    $x\in I_n$ for every $n$. Conversely, any point in every $I_n$ lies
    between $a$ and $b$, hence equals $x$.

!!! theorem "Theorem (Every cell is uncountable)"
    <a id="thm-2-1-3"></a>
    Every cell $I\subseteq\mathbb{R}$ is uncountable.

??? proof "Proof"
    We first record the construction suppressed in the board argument. If
    $J$ is a cell and $x\in\mathbb{R}$, choose $u<v$ in $J$. The two compact
    cells

    $$
    \left[u,u+\frac{v-u}{3}\right]
    \quad\text{and}\quad
    \left[v-\frac{v-u}{3},v\right]
    $$

    are disjoint and contained in $J$, so at least one of them does not
    contain $x$.

    Suppose for a contradiction that $I=\{x_n:n\in\mathbb{N}\}$. Choose a
    compact cell $I_0\subseteq I$ with $x_0\notin I_0$. Having chosen
    $I_n=[a_n,b_n]$, take one of its two outer thirds that does not contain
    $x_{n+1}$ and call it $I_{n+1}$. Then

    $$
    I_{n+1}\subseteq I_n,
    \qquad
    x_n\notin I_n,
    \qquad
    \operatorname{diam}(I_n)
    \leq3^{-n}\operatorname{diam}(I_0).
    $$

    By [Theorem 2.1.2](#thm-2-1-2), the intersection of the $I_n$ is a
    singleton $\{x\}$. Since $I_0\subseteq I$, there is $m$ with $x=x_m$.
    But $x\in I_m$ while $x_m\notin I_m$, a contradiction.

## Basic Properties of Cells

!!! definition "Definition (Non-overlapping cells)"
    <a id="def-2-2-1"></a>
    Two cells $I_1$ and $I_2$ are **non-overlapping** if
    $\overline{I_1}\cap\overline{I_2}$ is either empty or a singleton.

!!! proposition "Proposition (Elementary interval geometry)"
    <a id="prop-2-2-2"></a>
    The following properties hold.

    1. For every cell $I$,
       $\operatorname{int}(\overline I)\subseteq I
       \subseteq\overline{\operatorname{int}(I)}$.
    2. If $I_1$ and $I_2$ are non-overlapping closed cells, then
       $\operatorname{int}(I_1)\cap I_2=\varnothing$ and
       $I_1\cap\operatorname{int}(I_2)=\varnothing$.
    3. If $I_1$ and $I_2$ are cells with $I_1\cap I_2\neq\varnothing$, then
       $I_1\cup I_2$ is a cell.
    4. For non-overlapping closed cells $I_1,I_2$, the following are
       equivalent: $I_1\cup I_2$ is a cell; $I_1\cap I_2$ is a singleton;
       $I_1\cap I_2=\{x\}$ with
       $x\in\operatorname{int}(I_1\cup I_2)$; and
       $I_1\cap I_2\neq\varnothing$.
    5. If $I_1,I_2,I_3$ are pairwise non-overlapping cells, then
       $I_1\cap I_2\cap I_3=\varnothing$.
    6. If $I_1$ and $I_2$ are disjoint cells, then their closures are
       non-overlapping.

??? proof "Proof"
    Every cell has two endpoints in the extended real line and contains all
    points strictly between them. This immediately gives (1) and (3).

    For (2), if an interior point of $I_1$ belonged to $I_2$, then a one-sided
    interval around that point would lie in both closures, contradicting
    non-overlap. For (4), write $I_1=[a,b]$ and $I_2=[c,d]$ after possibly
    exchanging the cells. Non-overlap and nonempty intersection force
    $b=c$; then $I_1\cup I_2=[a,d]$ and the contact point lies in $(a,d)$.
    Conversely, the union of two separated closed intervals is not an
    interval, so a cell union forces them to meet.

    For (5), three nondegenerate intervals containing the same point cannot
    have pairwise disjoint interiors: at least two extend to the same side of
    that point. For (6), if the two closures met in two distinct points, the
    open interval between those points would lie in both cells by (1),
    contradicting disjointness.

## Length and Divisions

!!! definition "Definition (Length of a bounded cell)"
    <a id="def-2-3-1"></a>
    If $I$ is a bounded cell, define its **length** by

    $$
    \lambda(I):=\sup I-\inf I.
    $$

    In particular, $\lambda([a,b])=b-a$.

!!! definition "Definition (Division and partial division)"
    <a id="def-2-3-2"></a>
    Let $I$ be a compact cell and let
    $\mathscr{C}(I)$ be the collection of compact cells contained in $I$.

    + A **division** of $I$ is a finite collection $\Delta\subseteq
      \mathscr{C}(I)$ of pairwise non-overlapping cells whose union is $I$.
    + A **partial division** of $I$ is a finite collection
      $\Delta\subseteq\mathscr{C}(I)$ of pairwise non-overlapping cells whose
      union is contained in $I$.

!!! lemma "Lemma (Ordering a finite division)"
    <a id="lem-2-3-3"></a>
    Let $I$ be a compact cell and let
    $\Delta=\{I_1,\ldots,I_N\}$ be a division of $I$. The cells can be
    relabelled so that

    $$
    \min I_1=\min I,
    \qquad
    \max I_n=\min I_{n+1}\quad(1\leq n<N),
    \qquad
    \max I_N=\max I.
    $$

??? proof "Proof"
    Write each cell as $I_j=[a_j,b_j]$ and relabel so that
    $a_1<\cdots<a_N$. The left endpoint of $I$ must belong to one of the
    cells, and non-overlap forces that cell to be $I_1$ with
    $a_1=\min I$. Similarly, $b_N=\max I$.

    Non-overlap gives $b_n\leq a_{n+1}$. If the inequality were strict, every
    point in $(b_n,a_{n+1})$ would be missing from the union, contrary to
    $\bigcup_j I_j=I$. Hence $b_n=a_{n+1}$ for every $n<N$.

!!! proposition "Proposition (Additivity of interval length)"
    <a id="prop-2-3-4"></a>
    If $\{I_1,\ldots,I_N\}$ is a division of a compact cell $I$, then

    $$
    \lambda(I)=\sum_{n=1}^{N}\lambda(I_n).
    $$

??? proof "Proof"
    Order the cells as in [Lemma 2.3.3](#lem-2-3-3). Their lengths telescope:

    $$
    \sum_{n=1}^{N}\lambda(I_n)
    =\sum_{n=1}^{N}(\max I_n-\min I_n)
    =\max I-min I.
    $$

!!! theorem "Theorem (Borel covering inequality)"
    <a id="thm-2-3-5"></a>
    Let $I$ be a compact cell and let $(I_n)_{n\geq1}$ be a sequence of cells
    such that $I\subseteq\bigcup_{n=1}^{\infty}I_n$. Then

    $$
    \lambda(I)\leq\sum_{n=1}^{\infty}\lambda(I_n),
    $$

    where an unbounded cell is understood to have infinite length.

??? proof "Proof"
    The conclusion is immediate if some $I_n$ is unbounded, so assume all
    cells are bounded. Fix $\varepsilon>0$. Enlarge each $I_n$ slightly to a
    bounded open interval $G_n\supseteq I_n$ satisfying

    $$
    \lambda(G_n)<\lambda(I_n)+\frac{\varepsilon}{2^n}.
    $$

    The $G_n$ form an open cover of the compact interval $I$, so a finite
    subfamily $G_{n_1},\ldots,G_{n_m}$ covers $I$.

    For completeness, a finite interval cover obeys
    $\lambda(I)\leq\sum_{j=1}^{m}\lambda(G_{n_j})$: discard redundant
    intervals and order the remaining ones from left to right. Consecutive
    intervals must overlap, for otherwise the cover would leave a gap.
    Writing them as $(a_j,b_j)$, this gives
    $a_{j+1}<b_j$ and hence

    $$
    \lambda(I)
    <b_m-a_1
    \leq\sum_{j=1}^{m}(b_j-a_j).
    $$

    Therefore

    $$
    \lambda(I)
    \leq\sum_{j=1}^{m}\lambda(G_{n_j})
    <\sum_{n=1}^{\infty}\lambda(I_n)+\varepsilon.
    $$

    Letting $\varepsilon\downarrow0$ proves the claim.

## Gauges and Tagged Divisions

!!! definition "Definition (Gauge)"
    <a id="def-2-4-1"></a>
    A **gauge** on a compact cell $I$ is a positive function

    $$
    \delta:I\longrightarrow\mathbb{R}_{>0}.
    $$

    If $\delta_1,\ldots,\delta_N$ are gauges on $I$, then their pointwise
    minimum $x\mapsto\min_j\delta_j(x)$ is again a gauge.

!!! definition "Definition (Tagged division)"
    <a id="def-2-4-2"></a>
    A **tagged division**, or **$P$-division**, of a compact cell $I$ is a
    finite set $\Pi\subseteq\mathscr{C}(I)\times I$ such that

    1. $x\in J$ for every $(J,x)\in\Pi$;
    2. distinct tagged cells in $\Pi$ have non-overlapping cell components;
    3. $\Delta_\Pi:=\{J:(J,x)\in\Pi\text{ for some }x\}$ is a division of
       $I$.

    A **partial $P$-division** is defined in the same way, with
    $\Delta_\Pi$ only required to be a partial division of $I$.

!!! definition "Definition (Gauge-fine division)"
    <a id="def-2-4-3"></a>
    Let $\delta$ be a gauge on $I$. A tagged division $\Pi$ is
    **$\delta$-fine** if every $(J,x)\in\Pi$ satisfies

    $$
    J\subseteq[x-\delta(x),x+\delta(x)].
    $$

!!! theorem "Theorem (Cousin's lemma)"
    <a id="thm-2-4-4"></a>
    Every gauge $\delta$ on a compact cell $I$ admits a $\delta$-fine tagged
    division of $I$.

??? proof "Proof"
    Write $I=[a,b]$. Let $E$ consist of $a$ together with all
    $y\in(a,b]$ for which $[a,y]$ has a $\delta$-fine tagged division, and set
    $c:=\sup E$. We prove that $c=b$.

    Suppose that $c<b$. Choose $y\in E$ so close to $c$ that
    $c-\delta(c)<y\leq c$, and choose
    $z\in(c,b]$ with $z<c+\delta(c)$. A $\delta$-fine division of $[a,y]$,
    followed by the tagged cell $([y,z],c)$, is a $\delta$-fine division of
    $[a,z]$: the tag $c$ lies in $[y,z]$, and

    $$
    [y,z]\subseteq[c-\delta(c),c+\delta(c)].
    $$

    Hence $z\in E$, contradicting $z>c=\sup E$. Therefore $c=b$.

    Finally, choose $y\in E$ with $b-\delta(b)<y\leq b$. If $y=b$, then
    $b\in E$. Otherwise, append the tagged cell $([y,b],b)$ to a
    $\delta$-fine division of $[a,y]$; this proves again that $b\in E$.
    Thus $I=[a,b]$ has a $\delta$-fine tagged division.
