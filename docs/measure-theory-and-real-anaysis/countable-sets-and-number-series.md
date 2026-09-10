# Countable Sets and Number Series

This chapter develops the elementary countability results needed later in
measure theory and introduces convergence and rearrangement of real series.
The main line runs from equivalent descriptions of countable sets through
Cantor's diagonal argument, and then from the Cauchy criterion to Riemann's
theorem on rearrangements.

## Countable Sets

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

## Function Spaces and Cantor's Argument

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

## Real Sequences and Series

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

## Rearrangements of Series

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
