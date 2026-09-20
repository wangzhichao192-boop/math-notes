# Kurzweil–Henstock Integral

This chapter develops the countability and series results needed for real
analysis, then builds the Kurzweil–Henstock integral from interval divisions
and gauges. After establishing its structural properties—including
subdivision, finite additivity, and stability under uniform limits—it develops
the fundamental theorem of calculus and change-of-variables formulas.

## Countability and Number Series

!!! notation "Notation (Standard sets and sequences)"
    We use
    $\mathbb{N}=\{0,1,2,\ldots\}$ and
    $\mathbb{N}_{+}=\{1,2,3,\ldots\}$. A **sequence** in a set $S$ is a map
    $s:\mathbb{N}\to S$, written $(s_n)_{n\in\mathbb{N}}$.

!!! definition "Definition (Finite, countable, and equinumerous sets)"
    <a id="def-1-1-1"></a>
    Let $S$ be a set.

    + $S$ is **finite** if there are $n\in\mathbb{N}$ and a bijection
      $\{0,\ldots,n-1\}\to S$.
    + $S$ is **countably infinite** if there is a bijection
      $\mathbb{N}\to S$.
    + $S$ is **countable** if it is finite or countably infinite, and
      **uncountable** otherwise.
    + Sets $S_1$ and $S_2$ are **equinumerous** if there is a bijection
      $S_1\to S_2$.

!!! theorem "Theorem ($\mathbb{N}\times\mathbb{N}$ is countably infinite)"
    <a id="thm-1-1-2"></a>
    The Cartesian product $\mathbb{N}\times\mathbb{N}$ is countably infinite.

??? proof "Proof"
    Enumerate the pairs along the finite diagonals

    $$
    D_m:=\{(p,q)\in\mathbb{N}^2:p+q=m\},
    \qquad m\in\mathbb{N}.
    $$

    Each $D_m$ has $m+1$ elements. Listing $D_0,D_1,D_2,\ldots$ in order,
    and listing each diagonal from $(m,0)$ to $(0,m)$, gives a bijection with
    $\mathbb{N}$. Equivalently, the Cantor pairing map

    $$
    \pi(p,q)=\frac{(p+q)(p+q+1)}{2}+q
    $$

    is a bijection $\mathbb{N}^2\to\mathbb{N}$.

!!! theorem "Theorem (Subsets of countable sets)"
    <a id="thm-1-1-3"></a>
    Every subset of a countable set is countable.

??? proof "Proof"
    It is enough to treat a subset $A\subseteq\mathbb{N}$. If $A$ is finite,
    there is nothing to prove. If $A$ is infinite, set $A_0=A$ and define
    recursively

    $$
    a_n:=\min A_n,
    \qquad
    A_{n+1}:=A_n\setminus\{a_n\}.
    $$

    Every $A_n$ is nonempty, since otherwise $A$ would be finite. The map
    $n\mapsto a_n$ is strictly increasing and hence injective. For any
    $a\in A$, only finitely many natural numbers are smaller than $a$; after
    those elements of $A$ have been removed, $a$ becomes the minimum of the
    remaining set. Thus the map is also surjective.

    For a subset $B$ of an arbitrary countable set $S$, transport $B$ along
    an injection $S\to\mathbb{N}$ and apply the preceding argument.

!!! theorem "Theorem (Equivalent criteria for countability)"
    <a id="thm-1-1-4"></a>
    For a nonempty set $S$, the following are equivalent:

    1. $S$ is countable;
    2. there is a surjection $\mathbb{N}\to S$;
    3. there is an injection $S\to\mathbb{N}$.

    The set $\mathbb{N}$ may be replaced throughout by any countably infinite
    set.

??? proof "Proof"
    Suppose first that $S$ is countable. If $S$ is countably infinite, a
    bijection $\mathbb{N}\to S$ is already a surjection. If
    $S=\{s_0,\ldots,s_{r-1}\}$ is finite and nonempty, then
    $n\mapsto s_{n\bmod r}$ is a surjection $\mathbb{N}\to S$.

    Now let $f:\mathbb{N}\to S$ be surjective. For $x\in S$, the fibre
    $f^{-1}(\{x\})$ is a nonempty subset of $\mathbb{N}$, so define

    $$
    g(x):=\min f^{-1}(\{x\}).
    $$

    Distinct fibres are disjoint, hence $g:S\to\mathbb{N}$ is injective.
    Finally, if $g:S\to\mathbb{N}$ is injective, then $g$ is a bijection from
    $S$ onto the subset $g(S)\subseteq\mathbb{N}$. By
    [Theorem](#thm-1-1-3), $g(S)$ and therefore $S$ are countable.

!!! theorem "Theorem (Finite products of countable sets)"
    <a id="thm-1-1-5"></a>
    Let $m\geq2$ and let $S_1,\ldots,S_m$ be countable sets. Then
    $\prod_{j=1}^{m}S_j$ is countable. If every $S_j$ is countably infinite,
    then the product is countably infinite.

??? proof "Proof"
    For $m=2$, choose injections $S_1\to\mathbb{N}$ and
    $S_2\to\mathbb{N}$. Their product embeds $S_1\times S_2$ into
    $\mathbb{N}^2$, which is countable by
    [Theorem](#thm-1-1-2). The general result follows by induction on
    $m$.

    If every factor is nonempty and one factor is infinite, fixing one point
    in each of the other factors embeds that infinite factor into the product.
    Hence a finite product of countably infinite sets is both countable and
    infinite.

!!! example "Example ($\mathbb{Z}$ and $\mathbb{Q}$ are countable)"
    <a id="ex-1-1-6"></a>
    The map that alternates nonnegative and negative integers gives an
    enumeration of $\mathbb{Z}$. Since

    $$
    \mathbb{Z}\times\mathbb{N}_{+}\longrightarrow\mathbb{Q},
    \qquad (p,q)\longmapsto\frac{p}{q},
    $$

    is surjective, $\mathbb{Q}$ is countable by
    [Theorem](#thm-1-1-4). It is infinite because it contains
    $\mathbb{N}$, so it is countably infinite.

!!! theorem "Theorem (Countable unions of countable sets)"
    <a id="thm-1-1-7"></a>
    Let $J$ be countable and let $(S_j)_{j\in J}$ be a family of countable
    sets. Then $\bigcup_{j\in J}S_j$ is countable.

??? proof "Proof"
    Empty members do not affect the union, so restrict to
    $J_0:=\{j\in J:S_j\neq\varnothing\}$. For each $j\in J_0$, choose a
    surjection $e_j:\mathbb{N}\to S_j$. Since $J_0$ is countable, there is an
    injection $\iota:J_0\to\mathbb{N}$. The map

    $$
    E:\iota(J_0)\times\mathbb{N}\longrightarrow\bigcup_{j\in J}S_j,
    \qquad E(\iota(j),n)=e_j(n),
    $$

    is surjective. Its domain is a subset of $\mathbb{N}^2$ and is therefore
    countable. Composing an enumeration of the domain with $E$ gives a
    surjection from $\mathbb{N}$ onto the union, unless the union is empty, in
    which case it is finite.

!!! remark "Remark (Choice in the countable-union theorem)"
    <a id="rem-1-1-8"></a>
    The proof selects an enumeration for every nonempty $S_j$. In ZFC this is
    automatic; in ZF alone, the assertion that every countable union of
    countable sets is countable requires an appropriate countable choice
    principle.

!!! proposition "Proposition (Subsets and indicator functions)"
    <a id="prop-1-2-1"></a>
    For every set $S$, the map

    $$
    \mathcal{P}(S)\longrightarrow\{0,1\}^{S},
    \qquad A\longmapsto\mathbf{1}_A,
    $$

    is a bijection, where $\mathbf{1}_A(x)=1$ if $x\in A$ and $0$ otherwise.

!!! theorem "Theorem (Cantor's diagonal argument)"
    <a id="thm-1-2-2"></a>
    The sets $\mathcal{P}(\mathbb{N})$ and $\{0,1\}^{\mathbb{N}}$ are
    uncountable.

??? proof "Proof"
    By the preceding proposition it suffices to prove that
    $\{0,1\}^{\mathbb{N}}$ is uncountable. Suppose, for a contradiction, that
    there is a surjection

    $$
    \mathbb{N}\longrightarrow\{0,1\}^{\mathbb{N}},
    \qquad n\longmapsto f_n.
    $$

    Define $f:\mathbb{N}\to\{0,1\}$ by

    $$
    f(n):=1-f_n(n).
    $$

    For every $n$, the functions $f$ and $f_n$ differ at the input $n$.
    Hence $f\neq f_n$ for all $n$, contradicting surjectivity.

!!! corollary "Corollary ($\mathbb{N}^{\mathbb{N}}$ is uncountable)"
    <a id="cor-1-2-3"></a>
    The set of all sequences of natural numbers is uncountable.

??? proof "Proof"
    The inclusion $\{0,1\}\subseteq\mathbb{N}$ induces an injection
    $\{0,1\}^{\mathbb{N}}\to\mathbb{N}^{\mathbb{N}}$. If
    $\mathbb{N}^{\mathbb{N}}$ were countable, its subset
    $\{0,1\}^{\mathbb{N}}$ would be countable, contrary to
    [Theorem](#thm-1-2-2).

!!! definition "Definition (Cauchy sequence)"
    <a id="def-1-3-1"></a>
    A real sequence $(a_n)_{n\in\mathbb{N}}$ is **Cauchy** if, for every
    $\varepsilon>0$, there is $m\in\mathbb{N}$ such that

    $$
    p,q\geq m\quad\Longrightarrow\quad |a_p-a_q|<\varepsilon.
    $$

!!! theorem "Theorem (Completeness of $\mathbb{R}$)"
    <a id="thm-1-3-2"></a>
    A real sequence is convergent if and only if it is Cauchy.

!!! definition "Definition (Divergence to positive infinity)"
    <a id="def-1-3-3"></a>
    The notation $a_n\to+\infty$ means that, for every $M\in\mathbb{R}$,
    there is $m\in\mathbb{N}$ such that

    $$
    n\geq m\quad\Longrightarrow\quad a_n\geq M.
    $$

!!! definition "Definition (Series and partial sums)"
    <a id="def-1-3-4"></a>
    For a real sequence $(a_n)_{n\in\mathbb{N}}$, define the partial sums

    $$
    s_n:=\sum_{m=0}^{n}a_m.
    $$

    The series $\sum_{n=0}^{\infty}a_n$ **converges** if $(s_n)$ converges,
    and in that case

    $$
    \sum_{n=0}^{\infty}a_n:=\lim_{n\to\infty}s_n.
    $$

!!! definition "Definition (Absolute and commutative convergence)"
    <a id="def-1-3-5"></a>
    A real series $\sum_{n=0}^{\infty}a_n$ is

    + **absolutely convergent** if $\sum_{n=0}^{\infty}|a_n|$ converges;
    + **commutatively convergent** if, for every permutation
      $\varphi:\mathbb{N}\to\mathbb{N}$, the rearranged series
      $\sum_{n=0}^{\infty}a_{\varphi(n)}$ converges and has the same sum.

!!! proposition "Proposition (Absolute convergence implies convergence)"
    <a id="prop-1-3-6"></a>
    Every absolutely convergent real series is convergent.

??? proof "Proof"
    If $\sum |a_n|$ converges, then for every $\varepsilon>0$ there is $N$
    such that $q>p\geq N$ implies

    $$
    \left|\sum_{n=p+1}^{q}a_n\right|
    \leq\sum_{n=p+1}^{q}|a_n|<\varepsilon.
    $$

    Thus the sequence of partial sums of $\sum a_n$ is Cauchy, hence
    convergent by completeness of $\mathbb{R}$.

!!! theorem "Theorem (Alternating-series test)"
    <a id="thm-1-3-7"></a>
    Let $(a_n)_{n\in\mathbb{N}}$ be a decreasing sequence in
    $\mathbb{R}_{\geq0}$ with $a_n\to0$. Then
    $\sum_{n=0}^{\infty}(-1)^n a_n$ converges.

??? proof "Proof"
    Let $s_n=\sum_{k=0}^{n}(-1)^k a_k$. Since
    $s_{2m+2}-s_{2m}=a_{2m+2}-a_{2m+1}\leq0$, the even partial sums decrease.
    Similarly, $s_{2m+3}-s_{2m+1}=a_{2m+2}-a_{2m+3}\geq0$, so the odd partial
    sums increase. Moreover,

    $$
    s_{2m}-s_{2m+1}=a_{2m+1}\longrightarrow0.
    $$

    Every odd partial sum is at most every later even partial sum. Hence the
    two monotone subsequences converge to the same limit, and so does $(s_n)$.

!!! example "Example (Harmonic and alternating harmonic series)"
    <a id="ex-1-3-8"></a>
    The harmonic series diverges because

    $$
    \sum_{n=1}^{2^m}\frac1n
    \geq 1+\frac{m}{2}\longrightarrow+\infty.
    $$

    By the alternating-series test,
    $\sum_{n=1}^{\infty}(-1)^{n+1}/n$ converges. It is not absolutely
    convergent, since its series of absolute values is the harmonic series.

!!! proposition "Proposition (Absolute convergence is invariant under rearrangement)"
    <a id="prop-1-4-1"></a>
    If $\sum_{n=0}^{\infty}a_n$ converges absolutely and
    $\varphi:\mathbb{N}\to\mathbb{N}$ is a permutation, then
    $\sum_{n=0}^{\infty}a_{\varphi(n)}$ converges absolutely and

    $$
    \sum_{n=0}^{\infty}a_{\varphi(n)}
    =\sum_{n=0}^{\infty}a_n.
    $$

??? proof "Proof"
    Write $s=\sum_{n=0}^{\infty}a_n$. Given $\varepsilon>0$, choose $N$ so
    that $\sum_{n>N}|a_n|<\varepsilon$. Since $\varphi$ is surjective, there
    is $M$ such that
    $\{0,\ldots,N\}\subseteq\{\varphi(0),\ldots,\varphi(M)\}$. For every
    $m\geq M$, the difference between $s$ and the rearranged partial sum
    contains only terms whose indices exceed $N$. Consequently,

    $$
    \left|s-\sum_{k=0}^{m}a_{\varphi(k)}\right|
    \leq\sum_{n>N}|a_n|<\varepsilon.
    $$

    Applying the same argument to $|a_n|$ proves absolute convergence.

!!! example "Example (A rearrangement diverging to $+\infty$)"
    <a id="ex-1-4-2"></a>
    There is a permutation $\varphi$ of $\mathbb{N}_{+}$ such that

    $$
    \sum_{n=1}^{\infty}\frac{(-1)^{\varphi(n)+1}}{\varphi(n)}=+\infty.
    $$

??? proof "Construction"
    The positive subseries $1+1/3+1/5+\cdots$ diverges to $+\infty$, while
    the negative terms are $-1/2,-1/4,-1/6,\ldots$. At stage $r$, append
    unused positive terms in their original order until the partial sum is
    greater than $r$, making sure at least one new positive term is used, and
    then append the next unused negative term $-1/(2r)$. Every positive and
    every negative term is eventually used, so this defines a permutation.
    At the end of stage $r$, the partial sum is greater than
    $r-1/(2r)$; between successive negative terms it only increases. Hence
    the rearranged partial sums tend to $+\infty$.

!!! theorem "Theorem (Riemann's criterion for commutative convergence)"
    <a id="thm-1-4-3"></a>
    Let $\sum_{n=0}^{\infty}a_n$ be a convergent real series. The following
    are equivalent:

    1. the series is absolutely convergent;
    2. the series is commutatively convergent.

??? proof "Proof"
    The implication (1) $\Rightarrow$ (2) is
    [Proposition](#prop-1-4-1).

    For the converse, suppose that $\sum a_n$ converges but not absolutely.
    Let $a_n^+=\max\{a_n,0\}$ and $a_n^-:=\max\{-a_n,0\}$. Since
    $a_n=a_n^+-a_n^-$ and $|a_n|=a_n^++a_n^-$, convergence of $\sum a_n$
    together with divergence of $\sum|a_n|$ forces

    $$
    \sum_{n=0}^{\infty}a_n^+=+\infty,
    \qquad
    \sum_{n=0}^{\infty}a_n^-=+\infty.
    $$

    List the positive and nonpositive terms separately, preserving their
    original orders. Append positive terms until the partial sum exceeds $1$,
    then one unused nonpositive term; append further positive terms until it
    exceeds $2$, then the next nonpositive term; and continue. As in
    [Example](#ex-1-4-2), require at least one new positive term at every
    stage. Since $a_n\to0$, the partial sum after the single nonpositive term
    at stage $r$ is still greater than $r-o(1)$. The resulting rearrangement
    uses every term and diverges to $+\infty$, contradicting commutative
    convergence. Therefore the original series must converge absolutely.

## Cells, Length, and Divisions

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

## Gauges and K-H Integration

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

## Subdivisions and Finite Additivity

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
    2. For every $f:I\to\mathbb{R}$,

       $$
       S(\Pi,f)=S(\widetilde\Pi,f)
       =\sum_{K\in\Delta}S(\Pi_K,f|_K).
       $$

    3. If $\eta$ is any gauge on $I$ and $\Pi$ is also $\eta$-fine, then
       $\widetilde\Pi$ is $\eta$-fine and each $\Pi_K$ is
       $\eta|_K$-fine.

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

## Regulated Functions and Uniform Limits

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

## Differentiability Estimates

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

!!! note "Further directions"
    For $f\in\operatorname{KH}([a,b])$, the indefinite integral

    $$
    x\longmapsto\int_a^x f
    $$

    leads to the Saks–Henstock lemma and the Hake theorem. These results
    refine the control of sums over partial and $M$-divisions. The same
    fundamental-theorem framework also leads to integration by parts.
