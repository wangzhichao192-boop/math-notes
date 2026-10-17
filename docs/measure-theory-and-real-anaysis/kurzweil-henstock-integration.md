# Kurzweil–Henstock Integration

This chapter constructs the Kurzweil–Henstock integral from compact cells,
tagged divisions, and gauges. It establishes the integral's structural
properties, including subdivision, finite additivity, and stability under
uniform limits, before developing the fundamental theorem of calculus and
change-of-variables formulas. It concludes with the Saks–Henstock lemma,
Hake's theorem, and the extension of KH integration to general intervals.

## Cells, Divisions, and Partial Divisions

The interval geometry underlying gauge integration begins with cells and
their lengths. Full and partial divisions provide the framework for
subdividing a cell and adding the lengths of its pieces.

!!! definition "Definition (Cell)"
    <a id="def-1-5-1"></a>
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
    <a id="thm-1-5-2"></a>
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
    <a id="thm-1-5-3"></a>
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

    By [Theorem](#thm-1-5-2), the intersection of the $I_n$ is a
    singleton $\{x\}$. Since $I_0\subseteq I$, there is $m$ with $x=x_m$.
    But $x\in I_m$ while $x_m\notin I_m$, a contradiction.

!!! definition "Definition (Non-overlapping cells)"
    <a id="def-1-6-1"></a>
    Two cells $I_1$ and $I_2$ are **non-overlapping** if
    $\overline{I_1}\cap\overline{I_2}$ is either empty or a singleton.

!!! proposition "Proposition (Elementary interval geometry)"
    <a id="prop-1-6-2"></a>
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

!!! definition "Definition (Length of a bounded cell)"
    <a id="def-1-7-1"></a>
    If $I$ is a bounded cell, define its **length** by

    $$
    \lambda(I):=\sup I-\inf I.
    $$

    In particular, $\lambda([a,b])=b-a$.

!!! definition "Definition (Division and partial division)"
    <a id="def-1-7-2"></a>
    Let $I$ be a compact cell and let
    $\mathscr{C}(I)$ be the collection of compact cells contained in $I$.

    + A **division** of $I$ is a finite collection $\Delta\subseteq
      \mathscr{C}(I)$ of pairwise non-overlapping cells whose union is $I$.
    + A **partial division** of $I$ is a finite collection
      $\Delta\subseteq\mathscr{C}(I)$ of pairwise non-overlapping cells whose
      union is contained in $I$.

!!! lemma "Lemma (Ordering a finite division)"
    <a id="lem-1-7-3"></a>
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
    <a id="prop-1-7-4"></a>
    If $\{I_1,\ldots,I_N\}$ is a division of a compact cell $I$, then

    $$
    \lambda(I)=\sum_{n=1}^{N}\lambda(I_n).
    $$

??? proof "Proof"
    Order the cells as in [Lemma](#lem-1-7-3). Their lengths telescope:

    $$
    \sum_{n=1}^{N}\lambda(I_n)
    =\sum_{n=1}^{N}(\max I_n-\min I_n)
    =\max I-\min I.
    $$

!!! lemma "Lemma (Division induced on a subcell)"
    <a id="lem-1-11-3"></a>
    Let $I$ be a compact cell, let $\Delta$ be a division of $I$, and let
    $J\subseteq I$ be a compact cell. Define

    $$
    \Delta_J
    :=\{J\cap K:K\in\Delta,
    \ \operatorname{int}(J\cap K)\neq\varnothing\}.
    $$

    Then $\Delta_J$ is a division of $J$, and

    $$
    \lambda(J)
    =\sum_{\substack{K\in\Delta\\
    \operatorname{int}(J\cap K)\neq\varnothing}}
    \lambda(J\cap K).
    $$

??? proof "Proof"
    If $\operatorname{int}(J\cap K)\neq\varnothing$, then $J\cap K$ is a
    nondegenerate compact interval, hence a compact cell. Distinct members of
    $\Delta_J$ are non-overlapping because their parent cells in $\Delta$ are
    non-overlapping.

    Every $x\in\operatorname{int}(J)$ belongs to some $K\in\Delta$, and then
    $x\in J\cap K\in\Delta_J$. Thus

    $$
    \operatorname{int}(J)
    \subseteq\bigcup\Delta_J\subseteq J.
    $$

    The middle set is a finite union of compact sets and is therefore closed;
    it contains $\overline{\operatorname{int}(J)}=J$. Hence its union is
    exactly $J$. The length identity now follows from additivity of interval
    length, [Proposition](#prop-1-7-4).

!!! theorem "Theorem (Borel covering inequality)"
    <a id="thm-1-7-5"></a>
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

## Gauges, Tagged Divisions, and Riemann Sums

A gauge prescribes a local size at each tag. Gauge-fine tagged divisions
determine the Riemann sums used below; Cousin's lemma ensures that such
divisions exist, and subordinate divisions allow those sums to be regrouped
over a fixed subdivision.

!!! definition "Definition (Gauge)"
    <a id="def-1-8-1"></a>
    A **gauge** on a compact cell $I$ is a positive function

    $$
    \delta:I\longrightarrow\mathbb{R}_{>0}.
    $$

    If $\delta_1,\ldots,\delta_N$ are gauges on $I$, then their pointwise
    minimum $x\mapsto\min_j\delta_j(x)$ is again a gauge.

!!! definition "Definition (Tagged division)"
    <a id="def-1-8-2"></a>
    A **tagged division**, or **$P$-division**, of a compact cell $I$ is a
    finite set $\Pi\subseteq\mathscr{C}(I)\times I$ such that

    1. $x\in J$ for every $(J,x)\in\Pi$;
    2. distinct tagged cells in $\Pi$ have non-overlapping cell components;
    3. $\Delta_\Pi:=\{J:(J,x)\in\Pi\text{ for some }x\}$ is a division of
       $I$.

    A **partial $P$-division** is defined in the same way, with
    $\Delta_\Pi$ only required to be a partial division of $I$.
    In either case, its **body** is

    $$
    \operatorname{body}(\Pi)
    :=\bigcup_{(J,x)\in\Pi}J
    =\bigcup_{J\in\Delta_\Pi}J.
    $$

!!! definition "Definition (Gauge-fine division)"
    <a id="def-1-8-3"></a>
    Let $\delta$ be a gauge on $I$. A tagged division $\Pi$ is
    **$\delta$-fine** if every $(J,x)\in\Pi$ satisfies

    $$
    J\subseteq[x-\delta(x),x+\delta(x)].
    $$

!!! note "McShane-type divisions"
    A **$\delta$-fine $M$-division** has the same component-cell and covering
    requirements as a $\delta$-fine $P$-division, but its pairs $(J,x)$ are
    only required to satisfy $x\in I$ and

    $$
    J\subseteq[x-\delta(x),x+\delta(x)];
    $$

    the condition $x\in J$ is dropped. Thus the tag still controls the size
    of its cell, but need not lie inside that cell.

!!! lemma "Lemma (Multiplicity of a tag)"
    <a id="lem-1-8-4"></a>
    If $\Pi$ is a partial tagged division, then each $x$ occurs as the tag of
    at most two members of $\Pi$.

??? proof "Proof"
    If $(J_1,x),(J_2,x),(J_3,x)\in\Pi$, then $x$ belongs to three pairwise
    non-overlapping cells. This contradicts the elementary interval geometry
    in [Proposition](#prop-1-6-2).

!!! proposition "Proposition (Gauges bounded away from zero)"
    <a id="prop-1-8-5"></a>
    Let $I=[a,b]$ be a compact cell. If a gauge $\delta$ on $I$ satisfies
    $\delta(x)\geq\eta>0$ for every $x\in I$, then $I$ has a $\delta$-fine
    tagged division.

??? proof "Proof"
    Choose $N\in\mathbb{N}_{+}$ such that $(b-a)/N<\eta$, divide $I$ into
    $N$ equal compact cells, and choose an arbitrary tag in each cell. Every
    cell $J$ in the resulting tagged division has length less than $\eta$;
    hence, for its tag $x\in J$,

    $$
    J\subseteq[x-\eta,x+\eta]
    \subseteq[x-\delta(x),x+\delta(x)].
    $$

!!! lemma "Lemma (Gluing tagged divisions)"
    <a id="lem-1-8-6"></a>
    Let $\Delta$ be a division of a compact cell $I$. If, for each
    $K\in\Delta$, $\Pi_K$ is a tagged division of $K$, then

    $$
    \bigcup_{K\in\Delta}\Pi_K
    $$

    is a tagged division of $I$. If $\delta$ is a gauge on $I$ and each
    $\Pi_K$ is $\delta|_K$-fine, then the union is $\delta$-fine.

??? proof "Proof"
    The component cells cover each $K$, hence cover $I$. Cells belonging to
    the same $\Pi_K$ are non-overlapping; cells belonging to distinct members
    of $\Delta$ are non-overlapping because they lie in non-overlapping cells
    $K$. The assertion about fineness follows directly from the definition.

!!! theorem "Theorem (Cousin's lemma)"
    <a id="thm-1-8-7"></a>
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

!!! definition "Definition (Riemann sum)"
    <a id="def-1-9-1"></a>
    Let $I$ be a compact cell, let $f:I\to\mathbb{R}$, and let $\Pi$ be a
    partial tagged division of $I$. The **Riemann sum** of $f$ over $\Pi$ is

    $$
    S(\Pi,f):=\sum_{(J,x)\in\Pi}f(x)\lambda(J),
    $$

    with $S(\varnothing,f):=0$.

!!! proposition "Proposition (Elementary properties of Riemann sums)"
    <a id="prop-1-9-2"></a>
    Let $\Pi,\Pi_1,\Pi_2$ be partial tagged divisions of $I$, let
    $f,g:I\to\mathbb{R}$, and let $\alpha\in\mathbb{R}$.

    1. $S(\Pi,\alpha f+g)=\alpha S(\Pi,f)+S(\Pi,g)$.
    2. If $f\leq g$ on $I$, then $S(\Pi,f)\leq S(\Pi,g)$.
    3. If $\operatorname{body}(\Pi_1)\cap
       \operatorname{body}(\Pi_2)$ is empty or a singleton, then
       $\Pi_1\cup\Pi_2$ is a partial tagged division and

    $$
    S(\Pi_1\cup\Pi_2,f)=S(\Pi_1,f)+S(\Pi_2,f).
    $$

??? proof "Proof"
    The first two assertions follow term by term from the finite sum. Under
    the hypothesis in (3), component cells from the two divisions are
    non-overlapping, and the sum over their union separates into the two
    displayed sums.

!!! theorem "Theorem (Subordinate tagged divisions)"
    <a id="thm-1-11-4"></a>
    Let $\Delta$ be a division of a compact cell $I$. There is a gauge
    $\delta_\Delta$ on $I$ with the following property. For every
    $\delta_\Delta$-fine tagged division $\Pi$ of $I$, there are tagged
    divisions $\Pi_K$ of $K$, one for each $K\in\Delta$, such that, with

    $$
    \widetilde\Pi:=\bigcup_{K\in\Delta}\Pi_K,
    $$

    the following hold.

    1. $\widetilde\Pi$ is a tagged division of $I$.
    2. For every $f:I\to\mathbb{R}$, the Riemann sums satisfy the identity
       below.
    3. If $\eta$ is any gauge on $I$ and $\Pi$ is also $\eta$-fine, then
       $\widetilde\Pi$ is $\eta$-fine and each $\Pi_K$ is
       $\eta|_K$-fine.

    The identity in (2) is

    $$
    S(\Pi,f)=S(\widetilde\Pi,f)
    =\sum_{K\in\Delta}S(\Pi_K,f|_K).
    $$

??? proof "Proof"
    Let $F$ be the finite set of all endpoints of cells in $\Delta$. Since
    $I$ is nondegenerate, $F$ contains at least two points. Define

    $$
    \delta_\Delta(x):=
    \begin{cases}
    \operatorname{dist}(x,F),&x\notin F,\\
    \operatorname{dist}(x,F\setminus\{x\}),&x\in F.
    \end{cases}
    $$

    This is positive, so it is a gauge. Its key property is

    $$
    x\notin K\in\Delta
    \quad\Longrightarrow\quad
    \delta_\Delta(x)\leq\operatorname{dist}(x,K).
    \tag{1}
    $$

    Indeed, an endpoint of $K$ lies between $x$ and $K$ itself; if $x$ is
    that endpoint it belongs to $K$, while otherwise the relevant endpoint
    belongs to $F\setminus\{x\}$.

    Let $\Pi$ be $\delta_\Delta$-fine. For $K\in\Delta$, put

    $$
    \Pi_K:=\{(J\cap K,x):(J,x)\in\Pi,
    \ \operatorname{int}(J\cap K)\neq\varnothing\}.
    $$

    By [Lemma](#lem-1-11-3), the component cells of $\Pi_K$ form a
    division of $K$. It remains to check that every retained tag lies in its
    new cell. Suppose $(J\cap K,x)\in\Pi_K$ but $x\notin K$. Choose
    $y\in\operatorname{int}(J\cap K)$. Since
    $J\subseteq[x-\delta_\Delta(x),x+\delta_\Delta(x)]$ and $y$ is an
    interior point of $J$, one has

    $$
    |x-y|<\delta_\Delta(x).
    $$

    On the other hand, (1) gives
    $\delta_\Delta(x)\leq\operatorname{dist}(x,K)\leq|x-y|$, a
    contradiction. Thus $x\in J\cap K$, so $\Pi_K$ is a tagged division of
    $K$. The gluing lemma now shows that $\widetilde\Pi$ is a tagged division
    of $I$.

    For each $(J,x)\in\Pi$, [Lemma](#lem-1-11-3) applied to $J$ gives

    $$
    \lambda(J)
    =\sum_{\substack{K\in\Delta\\
    \operatorname{int}(J\cap K)\neq\varnothing}}
    \lambda(J\cap K).
    $$

    Therefore the finite sums may be regrouped as

    $$
    \begin{aligned}
    S(\Pi,f)
    &=\sum_{(J,x)\in\Pi}f(x)
      \sum_{\substack{K\in\Delta\\
      \operatorname{int}(J\cap K)\neq\varnothing}}
      \lambda(J\cap K)\\
    &=\sum_{K\in\Delta}S(\Pi_K,f|_K)
    =S(\widetilde\Pi,f).
    \end{aligned}
    $$

    Finally, if $\Pi$ is $\eta$-fine, every new component
    $J\cap K$ is contained in its original component $J$, hence in
    $[x-\eta(x),x+\eta(x)]$. This proves (3).

## Kurzweil–Henstock Integral and Basic Properties

The KH integral is defined by requiring gauge-fine Riemann sums to approach
a single value. Its basic properties include linearity, monotonicity,
invariance under countable modification, restriction to subcells, and
finite additivity.

!!! definition "Definition (Kurzweil–Henstock integral)"
    <a id="def-1-9-3"></a>
    Let $I$ be a compact cell. A function $f:I\to\mathbb{R}$ is
    **Kurzweil–Henstock integrable** on $I$ if there is $r\in\mathbb{R}$
    such that, for every $\varepsilon>0$, there is a gauge $\delta$ on $I$
    for which

    $$
    \left|S(\Pi,f)-r\right|<\varepsilon
    $$

    for every $\delta$-fine tagged division $\Pi$ of $I$. We then write

    $$
    \int_I f=r
    \qquad\text{or, when }I=[a,b],\qquad
    \int_a^b f(x)\,dx=r.
    $$

    The vector space of all such functions is denoted by $\operatorname{KH}(I)$.

!!! lemma "Lemma (Uniqueness of the integral)"
    <a id="lem-1-9-4"></a>
    The number $r$ in the definition of the Kurzweil–Henstock integral is
    unique.

??? proof "Proof"
    Suppose $r_1$ and $r_2$ both satisfy the definition. Given
    $\varepsilon>0$, choose gauges $\delta_1$ and $\delta_2$ such that every
    $\delta_k$-fine tagged division $\Pi$ satisfies
    $|S(\Pi,f)-r_k|<\varepsilon/2$. The pointwise minimum
    $\delta=\min\{\delta_1,\delta_2\}$ is a gauge. By
    [Cousin's lemma](#thm-1-8-7), it admits a $\delta$-fine tagged division
    $\Pi$, and therefore

    $$
    |r_1-r_2|
    \leq|r_1-S(\Pi,f)|+|S(\Pi,f)-r_2|
    <\varepsilon.
    $$

    Since $\varepsilon$ is arbitrary, $r_1=r_2$.

!!! example "Example (Constant functions)"
    <a id="ex-1-9-5"></a>
    If $f(x)=c$ on a compact cell $I$, then $f\in\operatorname{KH}(I)$ and

    $$
    \int_I f=c\lambda(I).
    $$

??? proof "Proof"
    For every tagged division $\Pi$ of $I$, additivity of interval length
    gives

    $$
    S(\Pi,f)
    =c\sum_{(J,x)\in\Pi}\lambda(J)
    =c\lambda(I).
    $$

!!! theorem "Theorem (Linearity and monotonicity)"
    <a id="thm-1-9-6"></a>
    The space $\operatorname{KH}(I)$ is a vector space, and the map

    $$
    \operatorname{KH}(I)\longrightarrow\mathbb{R},
    \qquad f\longmapsto\int_I f,
    $$

    is linear. Moreover, if $f_1,f_2\in\operatorname{KH}(I)$ and
    $f_1\leq f_2$ on $I$, then

    $$
    \int_I f_1\leq\int_I f_2.
    $$

??? proof "Proof"
    Let $f,g\in\operatorname{KH}(I)$ and $\alpha\in\mathbb{R}$. Given
    $\varepsilon>0$, choose gauges controlling the Riemann sums of $f$ and
    $g$ within $\varepsilon/(2(1+|\alpha|))$ and $\varepsilon/2$,
    respectively. Their pointwise minimum, together with linearity of
    Riemann sums, shows that $\alpha f+g$ is integrable and

    $$
    \int_I(\alpha f+g)=\alpha\int_I f+\int_I g.
    $$

    For monotonicity, choose gauges $\delta_1,\delta_2$ controlling the sums
    of $f_1,f_2$ within $\varepsilon$, and use Cousin's lemma for
    $\delta=\min\{\delta_1,\delta_2\}$. For a $\delta$-fine tagged division
    $\Pi$, [Proposition](#prop-1-9-2) gives $S(\Pi,f_1)\leq S(\Pi,f_2)$, whence

    $$
    \int_I f_1-\int_I f_2
    <2\varepsilon.
    $$

    Letting $\varepsilon\downarrow0$ proves the claim.

!!! theorem "Theorem (Cauchy criterion)"
    <a id="thm-1-9-7"></a>
    Let $I$ be a compact cell and $f:I\to\mathbb{R}$. The following are
    equivalent.

    1. $f\in\operatorname{KH}(I)$.
    2. For every $\varepsilon>0$, there is a gauge $\delta$ on $I$ such that
       any two $\delta$-fine tagged divisions $\Pi$ and $\widetilde\Pi$ of
       $I$ satisfy

    $$
    |S(\Pi,f)-S(\widetilde\Pi,f)|<\varepsilon.
    $$

??? proof "Proof"
    If $f$ is integrable, choose a gauge for which every fine Riemann sum is
    within $\varepsilon/2$ of $\int_I f$. The triangle inequality gives (2).

    Conversely, for every $n\in\mathbb{N}_{+}$ choose a gauge $\delta_n$
    corresponding to $\varepsilon=1/n$ in (2), and define

    $$
    \widehat\delta_n:=\min\{\delta_1,\ldots,\delta_n\}.
    $$

    By Cousin's lemma, choose a $\widehat\delta_n$-fine tagged division
    $\Pi_n$ of $I$, and put $r_n:=S(\Pi_n,f)$. If $p<q$, then both
    $\Pi_p$ and $\Pi_q$ are $\delta_p$-fine, so

    $$
    |r_p-r_q|<\frac1p.
    $$

    Thus $(r_n)$ is Cauchy and converges to some $r\in\mathbb{R}$.

    Given $\varepsilon>0$, choose $n_0$ so that $1/n_0<\varepsilon/2$ and
    $|r-r_n|<\varepsilon/2$ for $n\geq n_0$. If $\Pi$ is any
    $\delta_{n_0}$-fine tagged division and $n\geq n_0$, then $\Pi_n$ is also
    $\delta_{n_0}$-fine. Hence

    $$
    |r-S(\Pi,f)|
    \leq|r-r_n|+|S(\Pi_n,f)-S(\Pi,f)|
    <\frac{\varepsilon}{2}+\frac1{n_0}
    <\varepsilon.
    $$

    Therefore $f\in\operatorname{KH}(I)$ and $\int_I f=r$.

!!! corollary "Corollary (Restriction to a compact subcell)"
    <a id="cor-1-9-8"></a>
    If $J\subseteq I$ are compact cells and $f\in\operatorname{KH}(I)$,
    then $f|_J\in\operatorname{KH}(J)$.

??? proof "Proof"
    Apply the Cauchy criterion. Given $\varepsilon>0$, choose a gauge
    $\delta$ on $I$ satisfying condition (2) of
    [Theorem](#thm-1-9-7). The complement of the interior of $J$ in
    $I$ consists of at most two compact cells, after degenerate pieces are
    discarded. Use Cousin's lemma to fix a $\delta$-fine tagged division on
    each of these cells.

    If $\Pi$ and $\widetilde\Pi$ are arbitrary $\delta|_J$-fine tagged
    divisions of $J$, glue each of them to the fixed complementary divisions.
    By [Lemma](#lem-1-8-6), the results are $\delta$-fine tagged
    divisions of $I$. Their complementary Riemann sums cancel, so

    $$
    |S(\Pi,f|_J)-S(\widetilde\Pi,f|_J)|<\varepsilon.
    $$

    The Cauchy criterion on $J$ proves the result.

!!! proposition "Proposition (The Dirichlet function)"
    <a id="prop-1-10-1"></a>
    For every compact cell $I$, the restriction
    $\mathbf{1}_{\mathbb{Q}}|_I$ is Kurzweil–Henstock integrable and

    $$
    \int_I\mathbf{1}_{\mathbb{Q}}=0.
    $$

??? proof "Proof"
    Given $\varepsilon>0$, choose a bijection
    $q:\mathbb{N}_{+}\to\mathbb{Q}\cap I$ and define a gauge on $I$ by

    $$
    \delta(x):=
    \begin{cases}
    \dfrac{\varepsilon}{2^{n+2}},&x=q(n),\\
    1,&x\notin\mathbb{Q}.
    \end{cases}
    $$

    If $\Pi$ is a $\delta$-fine tagged division, only rational tags
    contribute to the Riemann sum. Each fixed tag occurs at most twice by
    [Lemma](#lem-1-8-4), and a cell tagged by $x$ has length at most
    $2\delta(x)$. Consequently,

    $$
    \begin{aligned}
    0\leq S(\Pi,\mathbf{1}_{\mathbb{Q}})
    &\leq 4\sum_{n=1}^{\infty}\delta(q(n))\\
    &=4\sum_{n=1}^{\infty}\frac{\varepsilon}{2^{n+2}}
    =\varepsilon.
    \end{aligned}
    $$

    This is precisely the defining estimate for integral zero.

!!! theorem "Theorem (Invariance under countable modification)"
    <a id="thm-1-10-2"></a>
    Let $I$ be a compact cell and let $f,g:I\to\mathbb{R}$. If
    $f\in\operatorname{KH}(I)$ and

    $$
    E:=\{x\in I:f(x)\neq g(x)\}
    $$

    is countable, then $g\in\operatorname{KH}(I)$ and

    $$
    \int_I g=\int_I f.
    $$

??? proof "Proof"
    The assertion is immediate when $E=\varnothing$. Otherwise choose an
    injection $m:E\to\mathbb{N}_{+}$. Given $\varepsilon>0$, choose a gauge
    $\delta_0$ such that every $\delta_0$-fine tagged division $\Pi$ satisfies

    $$
    \left|S(\Pi,f)-\int_I f\right|<\frac{\varepsilon}{2}.
    $$

    Put $d(x):=|f(x)-g(x)|$ and define a finer gauge by

    $$
    \delta(x):=
    \begin{cases}
    \min\left\{\delta_0(x),
    \dfrac{\varepsilon}{2^{m(x)+3}(1+d(x))}\right\},&x\in E,\\
    \delta_0(x),&x\notin E.
    \end{cases}
    $$

    For every $\delta$-fine tagged division $\Pi$, the multiplicity bound for
    tags and the estimate $\lambda(J)\leq2\delta(x)$ give

    $$
    \begin{aligned}
    |S(\Pi,g)-S(\Pi,f)|
    &\leq4\sum_{x\in E}d(x)\delta(x)\\
    &\leq4\sum_{n=1}^{\infty}\frac{\varepsilon}{2^{n+3}}
    =\frac{\varepsilon}{2}.
    \end{aligned}
    $$

    Since $\delta\leq\delta_0$, it follows that

    $$
    \left|S(\Pi,g)-\int_I f\right|<\varepsilon.
    $$

    Hence $g$ is integrable with the same integral as $f$.


!!! definition "Definition (Kurzweil–Henstock null set)"
    <a id="def-1-11-1"></a>
    A set $E\subseteq I$ is **Kurzweil–Henstock null** if, whenever
    $f,g:I\to\mathbb{R}$ satisfy $f\in\operatorname{KH}(I)$ and

    $$
    \{x\in I:f(x)\neq g(x)\}\subseteq E,
    $$

    then $g\in\operatorname{KH}(I)$ and $\int_I g=\int_I f$. The family of
    all such sets is denoted by $\mathcal E_{\mathrm{null},\mathrm{KH}}(I)$.

!!! corollary "Corollary (Countable sets are KH-null)"
    <a id="cor-1-11-2"></a>
    Every countable subset of $I$ belongs to
    $\mathcal E_{\mathrm{null},\mathrm{KH}}(I)$.

??? proof "Proof"
    This is exactly [Theorem](#thm-1-10-2), because every subset of a
    countable set is countable.

!!! theorem "Theorem (Finite additivity)"
    <a id="thm-1-11-5"></a>
    Let $\Delta=\{I_1,\ldots,I_N\}$ be a division of a compact cell $I$, and
    let $f:I\to\mathbb{R}$. The following are equivalent.

    1. $f\in\operatorname{KH}(I)$.
    2. $f|_{I_n}\in\operatorname{KH}(I_n)$ for every $1\leq n\leq N$.

    In this case,

    $$
    \int_I f=\sum_{n=1}^{N}\int_{I_n}f|_{I_n}.
    $$

??? proof "Proof"
    The implication (1) $\Rightarrow$ (2) is
    [Corollary](#cor-1-9-8).

    Conversely, suppose (2) holds and fix $\varepsilon>0$. Let
    $\delta_\Delta$ be the gauge from
    [Theorem](#thm-1-11-4). For each $n$, choose a gauge $\delta_n$
    on $I_n$ such that every $\delta_n$-fine tagged division $\Pi_n$ of
    $I_n$ satisfies

    $$
    \left|S(\Pi_n,f|_{I_n})-\int_{I_n}f|_{I_n}\right|
    <\frac{\varepsilon}{N}.
    $$

    Extend $\delta_n$ to a gauge $\widetilde\delta_n$ on $I$ by assigning
    arbitrary positive values outside $I_n$, and define

    $$
    \delta:=\min\{\delta_\Delta,
    \widetilde\delta_1,\ldots,\widetilde\delta_N\}.
    $$

    If $\Pi$ is a $\delta$-fine tagged division of $I$, [Theorem](#thm-1-11-4)
    supplies $\delta_n$-fine tagged divisions $\Pi_n$ of the $I_n$ and
    preserves the Riemann sum. Hence

    $$
    \begin{aligned}
    \left|S(\Pi,f)-\sum_{n=1}^{N}\int_{I_n}f|_{I_n}\right|
    &\leq\sum_{n=1}^{N}
    \left|S(\Pi_n,f|_{I_n})-\int_{I_n}f|_{I_n}\right|\\
    &<\varepsilon.
    \end{aligned}
    $$

    This proves both the integrability of $f$ and the stated formula.

!!! corollary "Corollary (Extension by zero)"
    <a id="cor-1-11-6"></a>
    Let $J\subseteq I$ be compact cells and let $f:J\to\mathbb{R}$. Define
    $\widetilde f:I\to\mathbb{R}$ by

    $$
    \widetilde f(x):=
    \begin{cases}
    f(x),&x\in J,\\
    0,&x\notin J.
    \end{cases}
    $$

    Then $f\in\operatorname{KH}(J)$ if and only if
    $\widetilde f\in\operatorname{KH}(I)$, and in that case

    $$
    \int_J f=\int_I\widetilde f.
    $$

??? proof "Proof"
    If $\widetilde f$ is integrable on $I$, its restriction to $J$ is
    integrable by [Corollary](#cor-1-9-8).

    Conversely, divide $I$ into $J$ and the at most two nondegenerate compact
    cells lying to its left and right. On each complementary cell,
    $\widetilde f$ differs from the zero function at most at the shared
    endpoint. Thus it is integrable there with integral zero by
    [Theorem](#thm-1-10-2). Finite additivity gives the result.

## Approximation of integration

Uniform approximation allows integrability to pass from an approximating
sequence to its limit. Step functions have explicitly computable integrals;
stability of KH-integrability under uniform limits then shows that every
regulated function is integrable.

!!! definition "Definition (Step and regulated functions)"
    <a id="def-1-12-1"></a>
    A function $f:I\to\mathbb{R}$ on a compact cell is a **step function** if
    there is a division $\Delta$ of $I$ such that $f$ is constant on
    $\operatorname{int}(J)$ for every $J\in\Delta$.

    A function $f:I\to\mathbb{R}$ is **regulated** if it is the uniform limit
    of a sequence of step functions.

!!! proposition "Proposition (Step functions are integrable)"
    <a id="prop-1-12-2"></a>
    Every step function on a compact cell $I$ is Kurzweil–Henstock
    integrable. More precisely, if $\Delta$ witnesses that $f$ is a step
    function and $c_J$ is the constant value of $f$ on
    $\operatorname{int}(J)$, then

    $$
    \int_I f=\sum_{J\in\Delta}c_J\lambda(J).
    $$

??? proof "Proof"
    For each $J\in\Delta$, the restriction $f|_J$ differs from the constant
    function $c_J$ only at the two endpoints of $J$. By invariance under
    countable modification,

    $$
    f|_J\in\operatorname{KH}(J),
    \qquad
    \int_J f|_J=c_J\lambda(J).
    $$

    The conclusion follows from [finite additivity](#thm-1-11-5).

!!! theorem "Theorem (Uniform limits of KH-integrable functions)"
    <a id="thm-1-12-3"></a>
    Let $(f_n)$ be a sequence in $\operatorname{KH}(I)$ that converges
    uniformly on $I$ to $f:I\to\mathbb{R}$. Then
    $f\in\operatorname{KH}(I)$.

??? proof "Proof"
    First observe that if $h:I\to\mathbb{R}$ is bounded and $\Pi$ is a
    tagged division of $I$, then

    $$
    |S(\Pi,h)|
    \leq\sum_{(J,x)\in\Pi}|h(x)|\lambda(J)
    \leq\|h\|_\infty\lambda(I),
    \tag{1}
    $$

    because the component cells of $\Pi$ form a division of $I$.

    We verify the Cauchy criterion for $f$. Given $\varepsilon>0$, choose
    $n$ so large that

    $$
    \|f-f_n\|_\infty<\frac{\varepsilon}{4\lambda(I)}.
    $$

    Since $f_n$ is integrable, its Cauchy criterion supplies a gauge $\delta$
    such that any two $\delta$-fine tagged divisions $\Pi$ and
    $\widetilde\Pi$ satisfy

    $$
    |S(\Pi,f_n)-S(\widetilde\Pi,f_n)|<\frac{\varepsilon}{2}.
    $$

    Applying (1) to $f-f_n$ on each division gives

    $$
    \begin{aligned}
    |S(\Pi,f)-S(\widetilde\Pi,f)|
    &\leq |S(\Pi,f-f_n)|
      +|S(\Pi,f_n)-S(\widetilde\Pi,f_n)|\\
    &\qquad +|S(\widetilde\Pi,f_n-f)|\\
    &<\frac{\varepsilon}{4}
      +\frac{\varepsilon}{2}
      +\frac{\varepsilon}{4}
    =\varepsilon.
    \end{aligned}
    $$

    Hence $f$ is Kurzweil–Henstock integrable by
    [Theorem](#thm-1-9-7).

!!! corollary "Corollary (Regulated functions are integrable)"
    <a id="cor-1-12-4"></a>
    Every regulated function on a compact cell is Kurzweil–Henstock
    integrable.

??? proof "Proof"
    A regulated function is, by definition, a uniform limit of step
    functions. Apply [Proposition](#prop-1-12-2) and [Theorem](#thm-1-12-3).

## The Fundamental Theorem of Calculus

!!! lemma "Lemma (Two-sided interval estimate for differentiability)"
    <a id="lem-two-sided-interval-estimate-for-differentiability"></a>
    <a id="lem-1-13-1"></a>
    Let $F:I\to\mathbb{R}$ be defined on a compact cell, let $x\in I$, and
    let $\alpha\in\mathbb{R}$. The following are equivalent.

    1. $F$ is differentiable at $x$ relative to $I$, with
       $F'(x)=\alpha$.
    2. For every $\varepsilon>0$, there is $\delta>0$ such that, whenever
       $y,z\in I$ satisfy

       $$
       y\leq x\leq z,
       \qquad
       \max\{|x-y|,|z-x|\}<\delta,
       $$

       one has

       $$
       |F(z)-F(y)-\alpha(z-y)|
       <\varepsilon|z-y|.
       $$

??? proof "Proof"
    Suppose first that $F'(x)=\alpha$. Given $\varepsilon>0$, choose
    $\delta>0$ so that, for $u\in I$ with $0<|u-x|<\delta$,

    $$
    |F(u)-F(x)-\alpha(u-x)|
    <\varepsilon|u-x|.
    $$

    For $y\leq x\leq z$ as in (2), decompose

    $$
    \begin{aligned}
    F(z)-F(y)-\alpha(z-y)
    &=\bigl(F(z)-F(x)-\alpha(z-x)\bigr)\\
    &\quad+\bigl(F(x)-F(y)-\alpha(x-y)\bigr).
    \end{aligned}
    $$

    The two terms are bounded in absolute value by
    $\varepsilon(z-x)$ and $\varepsilon(x-y)$, respectively. Their sum is
    $\varepsilon(z-y)$, proving (2); the cases $y=x$ or $z=x$ are included
    by interpreting the corresponding term as zero.

    Conversely, apply (2) with $(y,z)=(x,x+h)$ when $h>0$, and with
    $(y,z)=(x+h,x)$ when $h<0$. In both cases,

    $$
    |F(x+h)-F(x)-\alpha h|<\varepsilon|h|,
    $$

    which is the definition of differentiability at $x$ relative to $I$.

!!! example "Example (Why the points must straddle $x$)"
    <a id="ex-1-13-2"></a>
    Define $F:[-1,1]\to\mathbb{R}$ by

    $$
    F(x):=
    \begin{cases}
    x^2\sin(1/x^2),&x\neq0,\\
    0,&x=0.
    \end{cases}
    $$

    Then $F$ is differentiable everywhere and $F'(0)=0$, but the conclusion
    of [Lemma](#lem-two-sided-interval-estimate-for-differentiability) becomes false if $y$ and $z$ are allowed to lie on the
    same side of $x=0$.

??? proof "Proof"
    At the origin,

    $$
    \frac{F(h)-F(0)}{h}=h\sin(1/h^2)\longrightarrow0.
    $$

    For $x\neq0$,

    $$
    F'(x)=2x\sin(1/x^2)-\frac{2}{x}\cos(1/x^2).
    $$

    With

    $$
    \xi_n:=\frac{1}{\sqrt{(2n+1)\pi}},
    $$

    one has $\xi_n\downarrow0$ and

    $$
    F'(\xi_n)=\frac{2}{\xi_n}\longrightarrow+\infty.
    $$

    Since $F$ is differentiable at each $\xi_n$, there are arbitrarily short
    intervals $[y_n,z_n]$ containing $\xi_n$ and lying entirely to the right
    of $0$ whose secant slopes are as close to $F'(\xi_n)$ as desired. Thus
    $y_n,z_n\to0$ while

    $$
    \frac{|F(z_n)-F(y_n)|}{|z_n-y_n|}\longrightarrow+\infty.
    $$

    No estimate with $\alpha=F'(0)=0$ can therefore hold for arbitrary
    nearby $y,z$ unless they are required to lie on opposite sides of $0$
    (with equality allowed).

!!! theorem "Theorem (Fundamental theorem of calculus)"
    <a id="thm-1-13-3"></a>
    Let $I$ be a compact cell and let $F:I\to\mathbb{R}$ be differentiable
    everywhere relative to $I$. Then $F'\in\operatorname{KH}(I)$ and

    $$
    \int_I F'=F(\max I)-F(\min I).
    $$

??? proof "Proof"
    Write $a=\min I$ and $b=\max I$. Fix $\varepsilon>0$. For every
    $x\in I$, [Lemma](#lem-two-sided-interval-estimate-for-differentiability) supplies $\delta(x)>0$ such that, whenever
    $y\leq x\leq z$ and $|x-y|,|z-x|\leq\delta(x)$,

    $$
    |F(z)-F(y)-F'(x)(z-y)|
    <\frac{\varepsilon}{\lambda(I)}(z-y).
    $$

    Thus $\delta$ is a gauge on $I$. If $\Pi$ is a $\delta$-fine tagged
    division, then for each $(J,x)\in\Pi$ the endpoints of $J$ straddle $x$,
    so

    $$
    \left|F(\max J)-F(\min J)-F'(x)\lambda(J)\right|
    <\frac{\varepsilon}{\lambda(I)}\lambda(J).
    $$

    The increments of $F$ telescope over the component cells of $\Pi$:

    $$
    F(b)-F(a)
    =\sum_{(J,x)\in\Pi}
    \bigl(F(\max J)-F(\min J)\bigr).
    $$

    Consequently,

    $$
    \begin{aligned}
    |F(b)-F(a)-S(\Pi,F')|
    &\leq\sum_{(J,x)\in\Pi}
    \left|F(\max J)-F(\min J)-F'(x)\lambda(J)\right|\\
    &<\frac{\varepsilon}{\lambda(I)}
    \sum_{(J,x)\in\Pi}\lambda(J)
    =\varepsilon.
    \end{aligned}
    $$

    This is precisely the defining estimate for the stated integral.
!!! remark "Remark"
    Recall the usual Fundamental Theorem of Calculus: if $F \in C^1( [ a,b ] )$, then
    $$
    \int_a^b F'(x) \,dx =F(b)-F(a).
    $$
    The KH version is stronger: it only assumes that $F$ is differentiable everywhere. No continuity, boundness, or intergrability assumption on $F'$ is required in advance. The theorem itself guarantees that $F' \in \operatorname{KH}([a,b])$ and hence the equality holds.


!!! example "Example (An unbounded derivative)"
    <a id="ex-1-13-4"></a>
    For the function

    $$
    F(x)=
    \begin{cases}
    x^2\sin(1/x^2),&x\neq0,\\
    0,&x=0,
    \end{cases}
    \qquad -1\leq x\leq1,
    $$

    the derivative displayed in [Example](#ex-1-13-2) is unbounded near $0$.
    Nevertheless the fundamental theorem shows that $F'$ is
    Kurzweil–Henstock integrable and

    $$
    \int_{[-1,1]}F'=F(1)-F(-1)=0.
    $$

    This illustrates that the Kurzweil–Henstock integral recovers every
    everywhere-defined derivative, including derivatives that are unbounded.

!!! theorem "Theorem (Fundamental theorem with countably many exceptional points)"
    <a id="thm-1-13-5"></a>
    Let $I$ be a compact cell and let $F:I\to\mathbb{R}$ be continuous.
    Assume that

    $$
    D:=I\setminus\{x\in I:F\text{ is differentiable at }x\}
    $$

    is countable. Define the zero-filled derivative $f:I\to\mathbb{R}$ by

    $$
    f(x):=
    \begin{cases}
    F'(x),&x\notin D,\\
    0,&x\in D.
    \end{cases}
    $$

    Then $f\in\operatorname{KH}(I)$ and

    $$
    \int_I f=F(\max I)-F(\min I).
    $$

??? proof "Proof"
    If $D=\varnothing$, this is [Theorem](#thm-1-13-3). Otherwise choose an injection
    $m:D\to\mathbb{N}_{+}$. Fix $\varepsilon>0$ and put

    $$
    \rho:=\frac{\varepsilon}{\lambda(I)+4}.
    $$

    If $x\notin D$, use [Lemma](#lem-two-sided-interval-estimate-for-differentiability) to choose $\delta(x)>0$ so that every
    compact cell $J\subseteq I$ satisfying
    $x\in J\subseteq[x-\delta(x),x+\delta(x)]$ obeys

    $$
    \left|F(\max J)-F(\min J)-f(x)\lambda(J)\right|
    <\rho\lambda(J).
    \tag{1}
    $$

    If $x\in D$, continuity of $F$ at $x$ gives $\delta(x)>0$ such that

    $$
    |F(y)-F(x)|<\frac{\rho}{2^{m(x)}}
    \quad\text{whenever}\quad
    y\in I, |x-y|\leq\delta(x).
    \tag{2}
    $$

    Let $\Pi$ be a $\delta$-fine tagged division. Telescoping and the
    definition $f|_D=0$ give

    $$
    \begin{aligned}
    |F(\max I)-F(\min I)-S(\Pi,f)|
    &\leq
    \sum_{\substack{(J,x)\in\Pi\\x\notin D}}
    \left|F(\max J)-F(\min J)-f(x)\lambda(J)\right|\\
    &\quad+
    \sum_{\substack{(J,x)\in\Pi\\x\in D}}
    |F(\max J)-F(\min J)|.
    \end{aligned}
    $$

    The first sum is smaller than $\rho\lambda(I)$ by (1). If $x\in D$
    and $(J,x)\in\Pi$, both endpoints of $J$ lie within $\delta(x)$ of $x$,
    so (2) and the triangle inequality give

    $$
    |F(\max J)-F(\min J)|
    <\frac{2\rho}{2^{m(x)}}.
    $$

    By [Lemma](#lem-1-8-4), a fixed tag occurs in at most two members of $\Pi$.
    Since $m$ is injective, the exceptional contribution is at most

    $$
    \sum_{x\in D}2\cdot\frac{2\rho}{2^{m(x)}}
    \leq4\rho\sum_{n=1}^{\infty}2^{-n}=4\rho.
    $$

    Hence

    $$
    |F(\max I)-F(\min I)-S(\Pi,f)|
    <\rho\bigl(\lambda(I)+4\bigr)=\varepsilon,
    $$

    proving both integrability and the formula.

!!! definition "Definition (Exceptional sets for the fundamental theorem)"
    <a id="def-1-13-6"></a>
    Let $\mathcal E_{\mathrm{FTC}}(I)$ be the family of sets
    $E\in\mathcal E_{\mathrm{null},\mathrm{KH}}(I)$ with the following
    property: whenever $F:I\to\mathbb{R}$ is continuous and differentiable
    on $I\setminus E$, its zero-filled derivative is KH-integrable and

    $$
    \int_I F'=F(\max I)-F(\min I).
    $$

    [Theorem](#thm-1-13-5) and [Corollary](#cor-1-11-2) show that every countable subset of
    $I$ belongs to $\mathcal E_{\mathrm{FTC}}(I)$.

!!! corollary "Corollary (Cantor's constant-function theorem)"
    <a id="cor-1-13-7"></a>
    Let $F:I\to\mathbb{R}$ be continuous and differentiable except at
    countably many points. If $F'(x)=0$ wherever the derivative exists, then
    $F$ is constant.

??? proof "Proof"
    Write $I=[a,b]$. For any $x\in I$, apply [Theorem](#thm-1-13-5) to the restriction
    of $F$ to $[a,x]$ when $x>a$; the case $x=a$ is immediate. Its
    zero-filled derivative is identically zero, and therefore

    $$
    F(x)-F(a)=\int_{[a,x]}0=0.
    $$

    Thus $F(x)=F(a)$ for every $x\in I$.

## Change of Variables

The change-of-variables formula is first established for a monotone
reparametrisation. Finite additivity then extends it to continuous maps with
finitely many monotonicity pieces, where the Banach indicatrix records how
often the parametrisation covers each value.

!!! lemma "Lemma (Transporting tagged divisions)"
    <a id="lem-1-14-1"></a>
    Let $I$ and $\widetilde I$ be compact cells, and let
    $\phi:I\to\widetilde I$ be a continuous monotone bijection. If $\Pi$ is
    a tagged division of $I$, then

    $$
    \widetilde\Pi
    :=\{(\phi(J),\phi(x)):(J,x)\in\Pi\}
    $$

    is a tagged division of $\widetilde I$.

??? proof "Proof"
    The continuous image of a compact interval under a monotone map is the
    compact interval with the corresponding endpoint values, so every
    $\phi(J)$ is a compact cell. Injectivity ensures that images of
    non-overlapping component cells remain non-overlapping and that
    $\phi(x)\in\phi(J)$. Finally,

    $$
    \bigcup_{(J,x)\in\Pi}\phi(J)
    =\phi\left(\bigcup_{(J,x)\in\Pi}J\right)
    =\phi(I)=\widetilde I.
    $$

!!! theorem "Theorem (Monotone change of variables)"
    <a id="thm-1-14-2"></a>
    Let $I$ and $\widetilde I$ be compact cells, let
    $f\in\operatorname{KH}(\widetilde I)$, and let
    $\phi:I\to\widetilde I$ be a continuous monotone bijection.

    If $\phi$ is differentiable everywhere on $I$, then

    $$
    (f\circ\phi)|\phi'|\in\operatorname{KH}(I),
    \qquad
    \int_I(f\circ\phi)|\phi'|=\int_{\widetilde I}f.
    \tag{1}
    $$

    The same conclusion holds when $\phi$ fails to be differentiable at only
    countably many points, provided $\phi'$ is defined to be $0$ there.

??? proof "Proof — the everywhere-differentiable case"
    Fix $\varepsilon>0$. Choose a gauge $\widetilde\delta$ on
    $\widetilde I$ such that every $\widetilde\delta$-fine tagged division
    $\widetilde\Pi$ satisfies

    $$
    \left|\int_{\widetilde I}f-S(\widetilde\Pi,f)\right|
    <\frac{\varepsilon}{2}.
    \tag{2}
    $$

    Because $\phi$ is continuous on compact $I$, it is uniformly continuous.
    Hence there is a function
    $\eta:\mathbb{R}_{>0}\to\mathbb{R}_{>0}$ such that

    $$
    |u-v|\leq\eta(s)
    \quad\Longrightarrow\quad
    |\phi(u)-\phi(v)|\leq s
    \qquad(u,v\in I).
    $$

    Define

    $$
    \delta_1(x):=\eta\bigl(\widetilde\delta(\phi(x))\bigr).
    $$

    If $\Pi$ is $\delta_1$-fine, then the transported division from
    [Lemma](#lem-1-14-1) is $\widetilde\delta$-fine.

    For $x\in I$, set

    $$
    r(x):=
    \frac{\varepsilon}
    {2\bigl(1+\lambda(I)\bigr)\bigl(1+|f(\phi(x))|\bigr)}.
    $$

    Differentiability of $\phi$ and [Lemma](#lem-two-sided-interval-estimate-for-differentiability) give a second gauge
    $\delta_2$ such that, whenever
    $x\in J\subseteq[x-\delta_2(x),x+\delta_2(x)]$,

    $$
    \left|\lambda(\phi(J))-|\phi'(x)|\lambda(J)\right|
    <r(x)\lambda(J).
    \tag{3}
    $$

    The absolute values account for either orientation of $\phi$. Let
    $\delta=\min\{\delta_1,\delta_2\}$ and let $\Pi$ be a $\delta$-fine
    tagged division. Then

    $$
    \begin{aligned}
    &\left|\int_{\widetilde I}f
      -S\bigl(\Pi,(f\circ\phi)|\phi'|\bigr)\right|\\
    &\quad\leq
    \left|\int_{\widetilde I}f-S(\widetilde\Pi,f)\right|\\
    &\qquad+
    \sum_{(J,x)\in\Pi}|f(\phi(x))|
    \left|\lambda(\phi(J))-|\phi'(x)|\lambda(J)\right|\\
    &\quad<\frac{\varepsilon}{2}
      +\frac{\varepsilon}{2(1+\lambda(I))}
       \sum_{(J,x)\in\Pi}\lambda(J)
    <\varepsilon.
    \end{aligned}
    $$

    This proves (1).

??? proof "Proof — countably many exceptional points"
    Let $D$ be the exceptional set and choose an injection
    $m:D\to\mathbb N_+$. Retain the gauge $\delta_1$ above. At points
    $x\notin D$, choose $\delta_2(x)$ from (3), with its error budget reduced
    by a factor of $2$. At $x\in D$, continuity of $\phi$ supplies
    $\delta_2(x)>0$ such that

    $$
    |\phi(y)-\phi(x)|
    <\frac{\varepsilon}
    {2^{m(x)+4}\bigl(1+|f(\phi(x))|\bigr)}
    \quad\text{if}\quad |x-y|\leq\delta_2(x).
    \tag{4}
    $$

    Set $\delta=\min\{\delta_1,\delta_2\}$. For a $\delta$-fine tagged
    division, the terms tagged outside $D$ are estimated as before. If
    $(J,x)$ is tagged at $x\in D$, then $\phi'(x)=0$ by convention, while
    (4) gives

    $$
    \lambda(\phi(J))
    <\frac{2\varepsilon}
    {2^{m(x)+4}\bigl(1+|f(\phi(x))|\bigr)}.
    $$

    A tag occurs at most twice, so the total contribution of all exceptional
    tags is bounded by

    $$
    \sum_{x\in D}2|f(\phi(x))|
    \frac{2\varepsilon}
    {2^{m(x)+4}\bigl(1+|f(\phi(x))|\bigr)}
    \leq\frac{\varepsilon}{4}.
    $$

    Together with (2) and the reduced regular-point error, the total error is
    smaller than $\varepsilon$. Thus (1) remains valid.

!!! definition "Definition (Banach indicatrix)"
    <a id="def-1-14-3"></a>
    For a map $\phi:I\to\mathbb{R}$ and $y\in\mathbb{R}$, its
    **multiplicity function**, or **Banach indicatrix**, is

    $$
    N(\phi,y):=
    \begin{cases}
    \#\phi^{-1}(\{y\}),&\phi^{-1}(\{y\})\text{ is finite},\\
    +\infty,&\phi^{-1}(\{y\})\text{ is infinite}.
    \end{cases}
    $$

    If $\phi$ is injective, then
    $N(\phi,\cdot)=\mathbf 1_{\phi(I)}$.

    If $\Gamma$ is a finite division of $I$, then

    $$
    N(\phi,y)=\sum_{K\in\Gamma}N(\phi|_K,y)
    $$

    except possibly at the finitely many values attained at common endpoints
    of cells in $\Gamma$, where the right-hand side may count the same domain
    point twice.

!!! theorem "Theorem (Piecewise-monotone area formula)"
    <a id="thm-1-14-4"></a>
    Let $I$ and $\widetilde I$ be compact cells, and let
    $\phi:I\to\widetilde I$ be continuous and piecewise strictly monotone:
    there is a finite division $\Gamma$ of $I$ such that every restriction
    $\phi|_K$ is a monotone bijection from $K$ onto $\phi(K)$. Assume that
    $\phi$ is differentiable except at countably many points, with
    $\phi'=0$ at the exceptional points. If
    $f\in\operatorname{KH}(\widetilde I)$, then

    $$
    (f\circ\phi)|\phi'|\in\operatorname{KH}(I),
    \qquad
    fN(\phi,\cdot)\in\operatorname{KH}(\widetilde I),
    $$

    and

    $$
    \int_I(f\circ\phi)|\phi'|
    =\int_{\widetilde I}f(y)N(\phi,y)\,dy.
    \tag{5}
    $$

??? proof "Proof"
    For each $K\in\Gamma$, restriction to the compact cell $\phi(K)$ and
    [Theorem](#thm-1-14-2) give

    $$
    \int_K(f\circ\phi)|\phi'|
    =\int_{\phi(K)}f.
    \tag{6}
    $$

    Finite additivity therefore makes the left-hand integrand in (5)
    KH-integrable and gives

    $$
    \int_I(f\circ\phi)|\phi'|
    =\sum_{K\in\Gamma}\int_{\phi(K)}f.
    \tag{7}
    $$

    Away from the finite set of images of the partition endpoints, strict
    monotonicity on each piece yields

    $$
    N(\phi,y)=\sum_{K\in\Gamma}\mathbf 1_{\phi(K)}(y).
    $$

    Consequently $fN(\phi,\cdot)$ differs at only finitely many points from

    $$
    \sum_{K\in\Gamma}f\mathbf 1_{\phi(K)}.
    $$

    Each summand is the zero extension of $f|_{\phi(K)}$ and is integrable by
    [Corollary](#cor-1-11-6). Invariance under finite modification and (7) now give
    both the asserted integrability and formula (5).

!!! definition "Definition (Oriented integrals and oriented multiplicity)"
    <a id="def-1-14-5"></a>
    For $a,b$ in a compact interval on which $f$ is KH-integrable, define

    $$
    \int_a^b f:=
    \begin{cases}
    \displaystyle\int_{[a,b]}f,&a<b,\\
    0,&a=b,\\
    \displaystyle-\int_{[b,a]}f,&a>b.
    \end{cases}
    $$

    Let $\phi:I\to\mathbb{R}$ be continuous and piecewise strictly
    monotone. Its local orientation is

    $$
    \sigma(\phi,x):=
    \begin{cases}
    1,&\phi\text{ is strictly increasing near }x,\\
    -1,&\phi\text{ is strictly decreasing near }x,\\
    0,&\text{otherwise},
    \end{cases}
    $$

    where neighbourhoods are relative to $I$. The **oriented multiplicity**
    is

    $$
    N_{\mathrm{or}}(\phi,y)
    :=\sum_{x\in\phi^{-1}(\{y\})}\sigma(\phi,x).
    $$

!!! theorem "Theorem (Oriented change of variables)"
    <a id="thm-1-14-6"></a>
    Let $I=[a,b]$ and let $\widetilde I$ be a compact cell. Suppose that
    $\phi:I\to\widetilde I$ is continuous and piecewise strictly monotone,
    and differentiable except at countably many points. If
    $f\in\operatorname{KH}(\widetilde I)$, then, after setting $\phi'=0$ at
    the exceptional points,

    $$
    (f\circ\phi)\phi'\in\operatorname{KH}(I)
    $$

    and

    $$
    \int_a^b(f\circ\phi)(x)\phi'(x)\,dx
    =\int_{\phi(a)}^{\phi(b)}f(y)\,dy.
    \tag{8}
    $$

    Equivalently,

    $$
    \int_I(f\circ\phi)\phi'
    =\int_{\widetilde I}f(y)N_{\mathrm{or}}(\phi,y)\,dy.
    \tag{9}
    $$

??? proof "Proof"
    Order the cells of a monotonicity division as
    $K_j=[x_{j-1},x_j]$, where
    $a=x_0<\cdots<x_N=b$. On $K_j$, [Theorem](#thm-1-14-2) and the sign of
    $\phi'$ give

    $$
    \int_{x_{j-1}}^{x_j}(f\circ\phi)\phi'
    =\int_{\phi(x_{j-1})}^{\phi(x_j)}f.
    $$

    Finite additivity on the left and cancellation of successive oriented
    integrals on the right yield

    $$
    \sum_{j=1}^{N}
    \int_{\phi(x_{j-1})}^{\phi(x_j)}f
    =\int_{\phi(a)}^{\phi(b)}f,
    $$

    proving (8). Alternatively, summing the signed indicator of each image
    cell shows, away from finitely many endpoint values, that
    $N_{\mathrm{or}}(\phi,\cdot)$ is the oriented indicator from $\phi(a)$
    to $\phi(b)$. Finite-modification invariance gives (9).

!!! remark "Remark (Orientation matters)"
    <a id="rem-1-14-7"></a>
    If $\phi$ is decreasing, the unoriented formula reads

    $$
    \int_{[a,b]}(f\circ\phi)|\phi'|
    =\int_{[\phi(b),\phi(a)]}f.
    $$

    The signed formula instead has

    $$
    \int_a^b(f\circ\phi)\phi'
    =-\int_{[\phi(b),\phi(a)]}f
    =\int_{\phi(a)}^{\phi(b)}f.
    $$

    Thus oriented endpoint notation makes the same substitution law valid
    for increasing, decreasing, and piecewise-monotone maps.

## Integration on General Intervals

The Saks–Henstock lemma controls the error over a partial tagged division.
This local estimate is the key to Hake's theorem, which extends the integral
across an endpoint whenever the truncated integrals have a finite limit.
Together with the continuity of the indefinite integral, this yields a
primitive characterization of KH-integrability and a definition of the
integral on general intervals.

!!! definition "Definition ($\varepsilon$-adapted gauge)"
    <a id="def-epsilon-adapted-gauge"></a>
    Let $f\in\operatorname{KH}(I)$ and let $\varepsilon>0$. A gauge
    $\delta$ on $I$ is **$\varepsilon$-adapted to $f$** if every
    $\delta$-fine tagged division $\Pi$ of $I$ satisfies

    $$
    \left|\int_I f-S(\Pi,f)\right|\leq\varepsilon.
    $$

    The definition of the KH integral guarantees the existence of such a
    gauge for every $\varepsilon>0$.

!!! theorem "Theorem (Saks–Henstock lemma)"
    <a id="thm-saks-henstock"></a>
    Let $f\in\operatorname{KH}(I)$, let $\varepsilon>0$, and let $\delta$
    be an $\varepsilon$-adapted gauge for $f$. If $\Pi$ is a partial
    $\delta$-fine tagged division of $I$, then

    $$
    \left|
    \sum_{(J,x)\in\Pi}
    \left(\int_J f-f(x)\lambda(J)\right)
    \right|
    \leq\varepsilon,
    \tag{3}
    $$

    and

    $$
    \sum_{(J,x)\in\Pi}
    \left|\int_J f-f(x)\lambda(J)\right|
    \leq2\varepsilon.
    \tag{4}
    $$

??? proof "Proof"
    Complete the underlying partial division of $\Pi$ by compact cells
    $K_1,\ldots,K_m$ with disjoint interiors (the closures of its nonempty
    complementary gaps). Fix $\eta>0$. On each $K_j$, choose an
    $\eta$-adapted gauge for $f|_{K_j}$ and take its minimum with
    $\delta|_{K_j}$. Cousin's lemma supplies a fine tagged division
    $\Pi_j$ for this smaller gauge. Then

    $$
    \widehat\Pi:=\Pi\cup\Pi_1\cup\cdots\cup\Pi_m
    $$

    is a full $\delta$-fine tagged division of $I$. Finite additivity gives

    $$
    \int_I f-S(\widehat\Pi,f)
    =\sum_{(J,x)\in\Pi}
    \left(\int_J f-f(x)\lambda(J)\right)
    +\sum_{j=1}^m\left(\int_{K_j}f-S(\Pi_j,f|_{K_j})\right).
    $$

    The last sum has absolute value at most $m\eta$, and the left-hand
    side has absolute value less than $\varepsilon$. The expression in
    (3) is therefore at most $\varepsilon+m\eta$. Letting $\eta\downarrow0$
    proves (3). If there are no complementary gaps, adaptedness proves it
    directly.

    For (4), split $\Pi$ into the two partial divisions

    $$
    \begin{aligned}
    \Pi^+&:=\left\{(J,x)\in\Pi:
      \int_J f-f(x)\lambda(J)\geq0\right\},\\
    \Pi^-&:=\left\{(J,x)\in\Pi:
      \int_J f-f(x)\lambda(J)<0\right\}.
    \end{aligned}
    $$

    Applying (3) separately to $\Pi^+$ and $\Pi^-$ gives

    $$
    \sum_{(J,x)\in\Pi^+}
    \left|\int_J f-f(x)\lambda(J)\right|
    \leq\varepsilon
    $$

    and the same bound for $\Pi^-$. Adding the two estimates proves (4).

The lemma is stronger than the defining KH estimate: it controls any
selected finite family of gauge-fine tagged cells, even when those cells do
not cover the whole interval.

!!! theorem "Theorem (Hake's theorem)"
    <a id="thm-hake"></a>
    Let $I=[a,b]$ be a compact cell and let $f:I\to\mathbb R$. For
    $0<\eta<b-a$, write

    $$
    I_\eta:=[a+\eta,b].
    $$

    The following are equivalent:

    1. $f\in\operatorname{KH}(I)$;
    2. $f|_{I_\eta}\in\operatorname{KH}(I_\eta)$ for every
       $0<\eta<b-a$, and the finite limit

       $$
       \lim_{\eta\downarrow0}\int_{I_\eta}f
       $$

       exists.

    In that case,

    $$
    \int_I f
    =\lim_{\eta\downarrow0}\int_{I_\eta}f.
    \tag{5}
    $$

??? proof "Proof of (1) $\Rightarrow$ (2)"
    Restriction gives $f|_{I_\eta}\in\operatorname{KH}(I_\eta)$. Fix
    $\varepsilon>0$ and choose an $\varepsilon$-adapted gauge $\delta$ for
    $f$ on $I$. If

    $$
    0<\eta<\min\left\{\delta(a),
      \frac{\varepsilon}{1+|f(a)|}\right\},
    $$

    then the one-cell partial division $\{([a,a+\eta],a)\}$ is
    $\delta$-fine. The Saks–Henstock lemma yields

    $$
    \left|\int_{[a,a+\eta]}f-f(a)\eta\right|
    \leq\varepsilon.
    $$

    By finite additivity,

    $$
    \left|\int_I f-\int_{I_\eta}f\right|
    \leq\varepsilon+|f(a)|\eta
    <2\varepsilon.
    $$

    Hence the truncated integrals converge to $\int_I f$.

??? proof "Proof of (2) $\Rightarrow$ (1)"
    Put

    $$
    r:=\lim_{\eta\downarrow0}\int_{I_\eta}f.
    $$

    We construct a gauge that forces every Riemann sum to be close to $r$.
    Let

    $$
    a_n:=a+\frac{b-a}{2^n},
    \qquad
    J_n:=[a_{n+1},a_n]
    \quad(n\in\mathbb N).
    $$

    Each $f|_{J_n}$ is KH-integrable. Given $\varepsilon>0$, choose on
    $J_n$ a gauge $\delta_n$ that is
    $\varepsilon/2^{n+4}$-adapted to $f|_{J_n}$. Choose
    $\eta_0>0$ so small that

    $$
    \left|r-\int_{I_\eta}f\right|<\frac{\varepsilon}{4}
    \qquad(0<\eta\leq\eta_0).
    \tag{6}
    $$

    Define a gauge $\delta$ on $I$ as follows. At $a$, choose

    $$
    \delta(a)<\min\left\{\frac{\eta_0}{2},
      \frac{\varepsilon}{4(1+|f(a)|)}\right\}.
    $$

    If $x\in\operatorname{int}(J_n)$, choose

    $$
    \delta(x)<\min\{\delta_n(x),x-a_{n+1},a_n-x\}.
    $$

    At a common endpoint $a_n$ with $n\geq1$, choose $\delta(a_n)$ smaller
    than both adjacent gauges $\delta_{n-1}(a_n)$ and $\delta_n(a_n)$, and
    smaller than half the length of either adjacent dyadic cell. At $b=a_0$,
    choose $\delta(b)<\min\{\delta_0(b),(b-a)/2\}$.

    Let $\Pi$ be a $\delta$-fine tagged division of $I$. The component cell
    containing $a$ must be tagged by $a$: for every $x>a$, the construction
    gives $\delta(x)<x-a$. Write this first cell as $J_a=[a,a+\eta]$.
    Then $0<\eta<\eta_0/2$ and

    $$
    |f(a)|\lambda(J_a)<\frac{\varepsilon}{4}.
    \tag{7}
    $$

    Choose $N$ so that

    $$
    a+\eta\in(a_{N+2},a_{N+1}].
    $$

    Any cell of $\Pi\setminus\{(J_a,a)\}$ that crosses a dyadic boundary
    $a_n$ must be tagged by $a_n$. Cutting such a cell at $a_n$ and retaining
    the same tag therefore preserves gauge-fineness. After all these cuts,
    the part of the division in $J_n$ is a full $\delta_n$-fine division for
    $0\leq n\leq N$, while the part in $J_{N+1}$ is a partial
    $\delta_{N+1}$-fine division covering $[a+\eta,a_{N+1}]$.

    Apply the Saks–Henstock lemma on each dyadic cell. The total discrepancy
    between the resulting Riemann sums and the integral over
    $[a+\eta,b]$ is at most

    $$
    \sum_{n=0}^{N+1}\frac{\varepsilon}{2^{n+4}}
    <\frac{\varepsilon}{8}.
    \tag{8}
    $$

    Combining (6)–(8) gives

    $$
    |S(\Pi,f)-r|
    <\frac{\varepsilon}{4}
      +\frac{\varepsilon}{4}
      +\frac{\varepsilon}{8}
    <\varepsilon.
    $$

    Thus $f\in\operatorname{KH}(I)$ and $\int_I f=r$.

The Hake theorem is the mechanism that turns a locally defined primitive
into an integral on an interval with a potentially singular endpoint.

!!! proposition "Proposition (Continuity of the indefinite integral)"
    <a id="prop-continuity-indefinite-integral"></a>
    Let $a<b$, and suppose that $f$ is KH-integrable on every compact cell
    $[c,b]\subseteq(a,b]$ and that

    $$
    \lim_{c\downarrow a}\int_{[c,b]}f
    $$

    exists. Define $F:[a,b]\to\mathbb R$ by

    $$
    F(a):=0,
    \qquad
    F(x):=\int_{(a,x]}f
    \quad(a<x\leq b),
    $$

    where the integral at the left endpoint is understood through Hake's
    theorem. Then $F$ is continuous on $[a,b]$. If $f$ is continuous at
    $x\in(a,b)$, then $F$ is differentiable at $x$ and

    $$
    F'(x)=f(x).
    $$

??? proof "Proof"
    Fix $x\in[a,b]$ and $\varepsilon>0$. On a compact cell containing $x$,
    choose an $\varepsilon/2$-adapted gauge for $f$. Whenever $y$ is close
    enough to $x$, the one-cell tagged division with component
    $[\min\{x,y\},\max\{x,y\}]$ and tag $x$ is gauge-fine. The
    Saks–Henstock lemma then gives

    $$
    |F(y)-F(x)-f(x)(y-x)|\leq\frac{\varepsilon}{2}.
    $$

    Taking $y$ still closer so that
    $|f(x)|\,|y-x|<\varepsilon/2$ proves continuity. At the left endpoint,
    the same conclusion is exactly the limiting statement in Hake's
    theorem.

    If $f$ is continuous at an interior point $x$, then for small $h$,

    $$
    \frac{F(x+h)-F(x)}{h}
    =\frac1h\int_{[x,x+h]}f
    $$

    with the usual orientation when $h<0$. Monotonicity gives

    $$
    \left|
    \frac{F(x+h)-F(x)}{h}-f(x)
    \right|
    \leq\sup_{t\text{ between }x\text{ and }x+h}|f(t)-f(x)|,
    $$

    which tends to $0$ by continuity of $f$ at $x$.

!!! theorem "Theorem (Primitive characterization on a compact cell)"
    <a id="thm-primitive-characterization-compact-cell"></a>
    Let $I=[a,b]$ be a compact cell and let $f:I\to\mathbb R$. The following
    are equivalent:

    1. $f\in\operatorname{KH}(I)$;
    2. there is a continuous function $F:I\to\mathbb R$ such that, for every
       compact cell $J\subseteq\operatorname{int}(I)$,

       $$
       f|_J\in\operatorname{KH}(J)
       \quad\text{and}\quad
       \int_J f=F(\max J)-F(\min J).
       \tag{9}
       $$

    In this case,

    $$
    \int_I f=F(b)-F(a).
    $$

??? proof "Proof"
    Suppose first that $f\in\operatorname{KH}(I)$ and define

    $$
    F(x):=\int_{[a,x]}f,
    \qquad F(a):=0.
    $$

    The preceding proposition shows that $F$ is continuous. Restriction and
    finite additivity give (9).

    Conversely, assume that such an $F$ exists. Fix $c\in(a,b)$. For every
    $d\in(c,b)$, (9) gives

    $$
    \int_{[c,d]}f=F(d)-F(c).
    $$

    As $d\uparrow b$, the right-hand side tends to $F(b)-F(c)$. The
    right-endpoint version of Hake's theorem therefore extends the integral
    to $[c,b]$. Now let $c\downarrow a$. Its integral is
    $F(b)-F(c)$, which tends to $F(b)-F(a)$. Hake's theorem at the left
    endpoint gives $f\in\operatorname{KH}(I)$ and the asserted formula.

!!! definition "Definition (Admissible primitive)"
    <a id="def-admissible-primitive"></a>
    Let $I\subseteq\mathbb R$ be an interval. A function $F:I\to\mathbb R$
    is **admissible** if it is continuous on $\operatorname{int}(I)$ and the
    finite endpoint limits

    $$
    \lim_{x\to\inf I}F(x),
    \qquad
    \lim_{x\to\sup I}F(x)
    $$

    exist. These limits are taken with $x\in\operatorname{int}(I)$. At an
    infinite endpoint, the corresponding expression means the limit as
    $x\to-\infty$ or $x\to+\infty$.

!!! definition "Definition (KH-integrability on a general interval)"
    <a id="def-kh-general-interval"></a>
    Let $I\subseteq\mathbb R$ be an interval and let $f:I\to\mathbb R$. We
    say that $f$ is **Kurzweil–Henstock integrable on $I$** if there is an
    admissible function $F:I\to\mathbb R$ such that, for every compact cell
    $J\subseteq\operatorname{int}(I)$,

    $$
    f|_J\in\operatorname{KH}(J)
    \quad\text{and}\quad
    \int_J f=F(\max J)-F(\min J).
    $$

    In that case, define

    $$
    \int_I f:=\left(\lim_{x\to\sup I}F(x)\right)
      -\left(\lim_{x\to\inf I}F(x)\right)\in\mathbb R.
    \tag{10}
    $$

    The value in (10) is independent of the admissible primitive: any two
    such primitives differ by a constant on $\operatorname{int}(I)$. On a
    compact cell this definition agrees with the original gauge definition
    by the primitive characterization above.
