# Countability, Series, and the Kurzweil–Henstock Integral

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
    [Theorem 1.1.3](#thm-1-1-3), $g(S)$ and therefore $S$ are countable.

!!! theorem "Theorem (Finite products of countable sets)"
    <a id="thm-1-1-5"></a>
    Let $m\geq2$ and let $S_1,\ldots,S_m$ be countable sets. Then
    $\prod_{j=1}^{m}S_j$ is countable. If every $S_j$ is countably infinite,
    then the product is countably infinite.

??? proof "Proof"
    For $m=2$, choose injections $S_1\to\mathbb{N}$ and
    $S_2\to\mathbb{N}$. Their product embeds $S_1\times S_2$ into
    $\mathbb{N}^2$, which is countable by
    [Theorem 1.1.2](#thm-1-1-2). The general result follows by induction on
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
    [Theorem 1.1.4](#thm-1-1-4). It is infinite because it contains
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
    [Theorem 1.2.2](#thm-1-2-2).

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
    [Proposition 1.4.1](#prop-1-4-1).

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
    [Example 1.4.2](#ex-1-4-2), require at least one new positive term at every
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

    By [Theorem 1.5.2](#thm-1-5-2), the intersection of the $I_n$ is a
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
    Order the cells as in [Lemma 1.7.3](#lem-1-7-3). Their lengths telescope:

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

## Gauges and Kurzweil–Henstock Integration

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

!!! lemma "Lemma (Multiplicity of a tag)"
    <a id="lem-1-8-4"></a>
    If $\Pi$ is a partial tagged division, then each $x$ occurs as the tag of
    at most two members of $\Pi$.

??? proof "Proof"
    If $(J_1,x),(J_2,x),(J_3,x)\in\Pi$, then $x$ belongs to three pairwise
    non-overlapping cells. This contradicts the elementary interval geometry
    in [Proposition 1.6.2](#prop-1-6-2).

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
    $\Pi$, Proposition 1.9.2 gives $S(\Pi,f_1)\leq S(\Pi,f_2)$, whence

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
    [Theorem 1.9.7](#thm-1-9-7). The complement of the interior of $J$ in
    $I$ consists of at most two compact cells, after degenerate pieces are
    discarded. Use Cousin's lemma to fix a $\delta$-fine tagged division on
    each of these cells.

    If $\Pi$ and $\widetilde\Pi$ are arbitrary $\delta|_J$-fine tagged
    divisions of $J$, glue each of them to the fixed complementary divisions.
    By [Lemma 1.8.6](#lem-1-8-6), the results are $\delta$-fine tagged
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
    [Lemma 1.8.4](#lem-1-8-4), and a cell tagged by $x$ has length at most
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
