# Integer Partitions and $q$-Series

This chapter develops the partition-theoretic meaning of Gaussian coefficients and several classical partition identities. It preserves the finite-field and bijective proofs, worked examples, diagram decompositions, and the classroom question about the limit $q\to1$.

## Integer partitions and Gaussian coefficients

The remaining material in this lecture develops the partition-theoretic meaning of Gaussian coefficients and several classical partition identities. It is recorded here in full, including both the finite-field and word-bijection arguments.

!!! definition "Definition (Partition and its basic statistics)"
    <a id="def-5-1-1"></a>
    A **partition** of $n$ is a weakly decreasing sequence

    $$
    \lambda=(\lambda_1,\lambda_2,\ldots),
    \qquad
    \lambda_1\ge\lambda_2\ge\cdots\ge0,
    \qquad
    |\lambda|:=\sum_{i\ge1}\lambda_i=n,
    $$

    with only finitely many nonzero terms. The number of positive parts is denoted by $\ell(\lambda)$, and $\lambda_1$ is the largest part.

    Let $p_k(n)$ be the number of partitions of $n$ into exactly $k$ parts, and put

    $$
    p_{\le k}(n)=p_0(n)+p_1(n)+\cdots+p_k(n).
    $$

    Finally, let $p(j,k,n)$ be the number of partitions $\lambda\vdash n$ satisfying

    $$
    \lambda_1\le j,
    \qquad
    \ell(\lambda)\le k.
    $$

    Equivalently, the Ferrers diagram of $\lambda$ fits inside a $k\times j$ rectangle.

!!! proposition "Proposition (Gaussian polynomial for a rectangle)"
    <a id="prop-5-1-2"></a>
    For fixed $j,k\in\mathbb N$,

    $$
    \sum_{n\ge0}p(j,k,n)q^n
    =
    \binom{j+k}{j}_q
    =
    \binom{j+k}{k}_q.
    $$

??? proof "Proof 1: row-reduced echelon matrices"
    Put $m=j+k$ and first take $q$ to be a prime power. Recall that $\binom{m}{k}_q$ counts the $k$-dimensional subspaces of $\mathbb F_q^m$.

    Every such subspace has a unique ordered basis whose row matrix is in reduced row-echelon form. Suppose its pivot columns are

    $$
    1\le a_1<a_2<\cdots<a_k\le m.
    $$

    In row $i$, the entries that can be chosen freely lie to the right of the pivot, except in the later pivot columns. Hence the number of free entries in that row is

    $$
    \lambda_i=(m-a_i)-(k-i)=j-a_i+i.
    $$

    Since the pivot columns are strictly increasing,

    $$
    j\ge\lambda_1\ge\lambda_2\ge\cdots\ge\lambda_k\ge0.
    $$

    Thus $(\lambda_1,\ldots,\lambda_k)$ is a partition inside a $k\times j$ rectangle. Conversely, such a partition uniquely determines the pivot columns by

    $$
    a_i=j-\lambda_i+i.
    $$

    For fixed pivot columns there are $|\lambda|$ free entries, so there are $q^{|\lambda|}$ matrices. Summing over all allowable partitions gives

    $$
    \binom{j+k}{k}_q
    =
    \sum_{\substack{\lambda_1\le j\\\ell(\lambda)\le k}}q^{|\lambda|}.
    $$

    This holds for every prime power $q$. Since both sides are polynomials in $q$, agreement at infinitely many values of $q$ proves the polynomial identity.

    For the board parameters $j=3$, $k=4$, $m=7$ and pivot columns

    $$
    (a_1,a_2,a_3,a_4)=(1,3,4,6),
    $$

    the associated row lengths are

    $$
    (\lambda_1,\lambda_2,\lambda_3,\lambda_4)=(3,2,2,1).
    $$

??? proof "Proof 2: a weight-preserving word bijection"
    Consider words in the multiset $M=\{1^j,2^k\}$. For the $i$th occurrence of $2$ from the left, let $\lambda_i$ be the number of $1$'s lying to its right. Then

    $$
    j\ge\lambda_1\ge\cdots\ge\lambda_k\ge0,
    $$

    so $\lambda$ is a partition inside a $k\times j$ rectangle. This construction is reversible: the weakly decreasing numbers $\lambda_i$ determine exactly how the $1$'s and $2$'s are interleaved.

    Moreover, every pair consisting of a $2$ followed later by a $1$ is both an inversion of the word and one cell of $\lambda$. Therefore

    $$
    \operatorname{inv}(w)=|\lambda|.
    $$

    The multiset inversion enumerator now gives

    $$
    \sum_{\substack{\lambda_1\le j\\\ell(\lambda)\le k}}q^{|\lambda|}
    =
    \sum_{w\in\mathfrak S_{\{1^j,2^k\}}}q^{\operatorname{inv}(w)}
    =
    \binom{j+k}{j}_q.
    $$

    For example, when $j=5$, $k=3$, the partition $\lambda=(4,3,1)$ corresponds to

    $$
    w=12121121,
    $$

    whose three $2$'s have respectively $4,3,1$ copies of $1$ to their right.

!!! example "Example (Coefficients of a Gaussian polynomial)"
    <a id="ex-5-1-3"></a>
    For a $3\times2$ rectangle,

    $$
    \binom52_q
    =
    1+q+2q^2+2q^3+2q^4+q^5+q^6.
    $$

    Hence

    $$
    [q^0]\binom52_q=1,
    \qquad
    [q^1]\binom52_q=1,
    \qquad
    [q^2]\binom52_q=2,
    \qquad
    [q^6]\binom52_q=1.
    $$

    In general,

    $$
    [q^n]\binom{j+k}{j}_q=p(j,k,n).
    $$

## Conjugation and unrestricted partition generating functions

!!! definition "Definition (Conjugate partition)"
    <a id="def-5-2-1"></a>
    Reflecting the Ferrers diagram of $\lambda$ across its main diagonal gives the **conjugate partition** $\lambda'$, where

    $$
    \lambda_i'=\#\{r:\lambda_r\ge i\}.
    $$

    Thus the number of parts of $\lambda'$ equal to $i$ is

    $$
    \lambda_i-\lambda_{i+1}.
    $$

    For example,

    $$
    \lambda=(4,3,1,1,1)
    \qquad\Longleftrightarrow\qquad
    \lambda'=(5,2,2,1).
    $$

!!! proposition "Proposition (Partitions with at most $k$ parts)"
    <a id="prop-5-2-2"></a>
    The generating function for partitions having at most $k$ parts is

    $$
    \sum_{n\ge0}p_{\le k}(n)q^n
    =
    \frac1{(1-q)(1-q^2)\cdots(1-q^k)}.
    $$

??? proof "Proof"
    Conjugation gives a bijection

    $$
    \{\lambda:\ell(\lambda)\le k\}
    \longleftrightarrow
    \{\mu:\mu_1\le k\}.
    $$

    A partition whose largest part is at most $k$ has multiplicity form

    $$
    \mu=(1^{m_1},2^{m_2},\ldots,k^{m_k}),
    \qquad
    m_1+2m_2+\cdots+km_k=n,
    $$

    with $m_i\in\mathbb N_0$. Therefore

    $$
    \begin{aligned}
    \sum_{n\ge0}p_{\le k}(n)q^n
    &=
    \sum_{m_1,\ldots,m_k\ge0}q^{m_1+2m_2+\cdots+km_k}\\
    &=
    \prod_{i=1}^k\left(\sum_{m_i\ge0}q^{im_i}\right)\\
    &=
    \prod_{i=1}^k\frac1{1-q^i}.
    \end{aligned}
    $$

!!! corollary "Corollary (Euler's product for all partitions)"
    <a id="cor-5-2-3"></a>
    If $p(n)$ denotes the number of all partitions of $n$, then

    $$
    \sum_{n\ge0}p(n)q^n
    =
    \prod_{i\ge1}\frac1{1-q^i}.
    $$

    This follows coefficientwise by letting $k\to\infty$: the coefficient of $q^n$ has already stabilized once $k\ge n$.

!!! proposition "Proposition (Generating function from allowed multiplicities)"
    <a id="prop-5-2-4"></a>
    Let $S=(S_1,S_2,\ldots)$ with $S_i\subseteq\mathbb N_0$, and let $P(S)$ be the set of partitions in which the multiplicity $m_i$ of the part $i$ belongs to $S_i$. Then

    $$
    F(S,q)
    :=
    \sum_{\lambda\in P(S)}q^{|\lambda|}
    =
    \prod_{i\ge1}\left(\sum_{r\in S_i}q^{ir}\right).
    $$

??? proof "Proof"
    Choosing a multiplicity $m_i\in S_i$ contributes weight $q^{im_i}$. The choices for distinct part sizes are independent, so multiplication records every permitted sequence $(m_1,m_2,\ldots)$ exactly once. Equivalently, the coefficient of $q^n$ on both sides is the number of partitions of $n$ belonging to $P(S)$.

## Two diagram identities

!!! proposition "Proposition (A row-column identity)"
    <a id="prop-5-3-1"></a>
    For every partition $\lambda$,

    $$
    \sum_{i\ge1}(i-1)\lambda_i
    =
    \sum_{j\ge1}\binom{\lambda_j'}2.
    $$

??? proof "Proof"
    Put the number $i-1$ in every cell of row $i$ of the Ferrers diagram. Summing by rows gives the left-hand side. A column of height $h$ contributes

    $$
    0+1+\cdots+(h-1)=\binom h2,
    $$

    so summing by columns gives the right-hand side.

    For the board example $\lambda=(5,3,3,2)$, one has $\lambda'=(4,4,3,1,1)$, and both sides equal

    $$
    0\cdot5+1\cdot3+2\cdot3+3\cdot2
    =
    \binom42+\binom42+\binom32
    =15.
    $$

!!! definition "Definition (Durfee rank)"
    <a id="def-5-3-2"></a>
    The **Durfee rank** of $\lambda$ is

    $$
    \operatorname{rank}(\lambda)
    :=
    \max\{i:\lambda_i\ge i\}.
    $$

    It is the side length of the largest square contained in the Ferrers diagram. This square is the **Durfee square**. For example,

    $$
    \lambda=(7,5,3,3,2)
    \qquad\Longrightarrow\qquad
    \operatorname{rank}(\lambda)=3.
    $$

## Self-conjugate partitions and odd diagonal hooks

!!! proposition "Proposition (Self-conjugate partitions)"
    <a id="prop-5-4-1"></a>
    Let $c(n)$ be the number of self-conjugate partitions of $n$. Then

    $$
    \sum_{n\ge0}c(n)q^n
    =
    \prod_{i\ge1}(1+q^{2i-1}).
    $$

??? proof "Proof by diagonal hooks"
    If $\lambda=\lambda'$, take the hook based at each diagonal cell of its Ferrers diagram. Symmetry makes every diagonal hook length odd, and successive diagonal hooks have strictly decreasing lengths. The diagonal hooks are disjoint and cover the diagram, so their lengths form a partition of $|\lambda|$ into distinct odd parts.

    Conversely, from distinct odd parts $2a_1+1>\cdots>2a_r+1$, place $r$ diagonal cells and attach $a_i$ cells both to the right and below diagonal cell $i$. This uniquely reconstructs a self-conjugate Ferrers diagram. Hence self-conjugate partitions are in weight-preserving bijection with partitions into distinct odd parts, whose generating function is the displayed product.

    The board example

    $$
    \lambda=(5,4,4,3,1)=\lambda'
    $$

    has diagonal hook lengths $9,5,3$, and $9+5+3=17=|\lambda|$.

## Euler's odd-distinct partition theorem

!!! theorem "Theorem (Odd parts and distinct parts)"
    <a id="thm-5-5-1"></a>
    Let $d(n)$ be the number of partitions of $n$ into distinct parts, and let $o(n)$ be the number of partitions of $n$ into odd parts. Then

    $$
    d(n)=o(n)
    \qquad(n\ge0).
    $$

??? proof "Proof 1: generating functions"
    A distinct part $i$ is either absent or present once, whereas an odd part may occur with arbitrary multiplicity. Thus

    $$
    \begin{aligned}
    \sum_{n\ge0}d(n)q^n
    &=\prod_{i\ge1}(1+q^i)\\
    &=\prod_{i\ge1}\frac{1-q^{2i}}{1-q^i}\\
    &=\frac1{(1-q)(1-q^3)(1-q^5)\cdots}\\
    &=\sum_{n\ge0}o(n)q^n.
    \end{aligned}
    $$

    In the cancellation step, every even factor $1-q^{2i}$ in the numerator cancels the corresponding even-indexed factor in the denominator.

??? proof "Proof 2: Glaisher's binary bijection"
    Let $\lambda$ be a partition into odd parts, and suppose the odd part $2j-1$ occurs $a_j$ times. Write the binary expansion

    $$
    a_j=\sum_{r\ge0}\varepsilon_{j,r}2^r,
    \qquad
    \varepsilon_{j,r}\in\{0,1\}.
    $$

    Define $\mu$ to contain the part $(2j-1)2^r$ exactly when $\varepsilon_{j,r}=1$. Every positive integer has a unique expression as an odd number times a power of $2$, so the parts of $\mu$ are distinct. The construction preserves size because

    $$
    a_j(2j-1)
    =
    \sum_{r\ge0}\varepsilon_{j,r}(2j-1)2^r.
    $$

    Conversely, group the distinct parts of $\mu$ according to their odd factor and add the corresponding powers of $2$; uniqueness of binary expansion recovers every $a_j$. Hence the map is a bijection.

    The board example is

    $$
    \lambda=(9^5,5^{12},3^2,1^3)\vdash114.
    $$

    Since

    $$
    5=1+4,
    \qquad
    12=4+8,
    \qquad
    2=2,
    \qquad
    3=1+2,
    $$

    it maps to the distinct-part partition

    $$
    \mu=(40,36,20,9,6,2,1)\vdash114.
    $$

## Three bivariate partition identities

For compactness, write

$$
(q;q)_k=(1-q)(1-q^2)\cdots(1-q^k),
\qquad
(q;q)_0=1.
$$

!!! proposition "Proposition (Parts marked by $x$)"
    <a id="prop-5-6-1"></a>
    One has

    $$
    \frac1{\displaystyle\prod_{i\ge1}(1-xq^i)}
    =
    \sum_{k\ge0}\frac{x^kq^k}{(q;q)_k}.
    \tag{a}
    $$

??? proof "Proof 1: remove one cell from every row"
    The left-hand side is

    $$
    \sum_{\lambda}x^{\ell(\lambda)}q^{|\lambda|}.
    $$

    Restrict to partitions having exactly $k$ parts and subtract $1$ from every part. This removes $k$ cells and leaves an arbitrary partition with at most $k$ parts. By [Proposition 5.2.2](#prop-5-2-2), their contribution is

    $$
    x^kq^k\frac1{(q;q)_k}.
    $$

    Summing over $k\ge0$ proves (a).

??? proof "Proof 2: functional equation"
    Let

    $$
    F(x,q)=\frac1{\prod_{i\ge1}(1-xq^i)}.
    $$

    Then

    $$
    F(x,q)=\frac{F(xq,q)}{1-xq},
    \qquad
    F(0,q)=1.
    $$

    These conditions uniquely determine the formal power series in $x$. Indeed, repeated substitution gives

    $$
    F(x,q)
    =
    \frac{F(xq^N,q)}{(1-xq)(1-xq^2)\cdots(1-xq^N)}
    \xrightarrow[N\to\infty]{}
    \frac1{\prod_{i\ge1}(1-xq^i)}.
    $$

    The series on the right-hand side of (a) satisfies the same functional equation and initial value, so the two series are equal.

!!! proposition "Proposition (Durfee-square decomposition)"
    <a id="prop-5-6-2"></a>
    One has

    $$
    \frac1{\displaystyle\prod_{i\ge1}(1-xq^i)}
    =
    \sum_{k\ge0}
    \frac{x^kq^{k^2}}
    {(q;q)_k(1-xq)(1-xq^2)\cdots(1-xq^k)}.
    \tag{b}
    $$

??? proof "Proof"
    Again the left-hand side is $\sum_\lambda x^{\ell(\lambda)}q^{|\lambda|}$. If $\lambda$ has Durfee rank $k$, split its diagram into:

    1. the $k\times k$ Durfee square, contributing $x^kq^{k^2}$;
    2. the partition $\mu$ to the right of the square, which has at most $k$ parts and contributes

       $$
       \sum_{\ell(\mu)\le k}q^{|\mu|}=\frac1{(q;q)_k};
       $$

    3. the partition $\nu$ below the square, whose parts are at most $k$. Each row of $\nu$ adds one part to $\lambda$, so it contributes

       $$
       \sum_{\nu_1\le k}x^{\ell(\nu)}q^{|\nu|}
       =
       \frac1{(1-xq)(1-xq^2)\cdots(1-xq^k)}.
       $$

    The three pieces determine $\lambda$ uniquely. Multiplying their weights and summing over $k$ proves (b).

!!! proposition "Proposition (Distinct parts marked by $x$)"
    <a id="prop-5-6-3"></a>
    One has

    $$
    \prod_{i\ge1}(1+xq^i)
    =
    \sum_{k\ge0}
    \frac{x^kq^{\binom{k+1}{2}}}{(q;q)_k}.
    \tag{c}
    $$

??? proof "Proof"
    The coefficient $[x^kq^n]$ on the left counts partitions of $n$ into $k$ distinct parts. If

    $$
    \lambda_1>\lambda_2>\cdots>\lambda_k\ge1,
    $$

    define

    $$
    \mu=
    (\lambda_1-(k-1),\lambda_2-(k-2),\ldots,\lambda_{k-1}-1,\lambda_k).
    $$

    Then $\mu$ is a partition into exactly $k$ parts and

    $$
    |\lambda|=|\mu|+\binom{k}{2}.
    $$

    Removing one cell from each of the $k$ rows of $\mu$ leaves a partition with at most $k$ parts, so

    $$
    \sum_{\ell(\mu)=k}q^{|\mu|}
    =
    \frac{q^k}{(q;q)_k}.
    $$

    Consequently the contribution from partitions into $k$ distinct parts is

    $$
    x^kq^{\binom{k}{2}}\frac{q^k}{(q;q)_k}
    =
    \frac{x^kq^{\binom{k+1}{2}}}{(q;q)_k},
    $$

    and summing over $k$ proves (c).

!!! remark "Remark (The $q$-exponential and the question $q=1$)"
    <a id="rem-5-6-4"></a>
    Replacing $x$ by $x/q$ in (a) gives

    $$
    \frac1{\prod_{i\ge0}(1-xq^i)}
    =
    \sum_{k\ge0}\frac{x^k}{(q;q)_k}.
    $$

    Now replace $x$ by $(1-q)x$. Since

    $$
    [k]_q!=\frac{(q;q)_k}{(1-q)^k},
    $$

    one obtains the $q$-exponential identity

    $$
    \frac1{\prod_{i\ge0}\bigl(1-(1-q)xq^i\bigr)}
    =
    \sum_{k\ge0}\frac{x^k}{[k]_q!}.
    $$

    The board asks what happens at $q=1$. The meaningful statement is a **coefficientwise limit**:

    $$
    \lim_{q\to1}\sum_{k\ge0}\frac{x^k}{[k]_q!}
    =
    \sum_{k\ge0}\frac{x^k}{k!}
    =e^x.
    $$

    One should not substitute $q=1$ term by term into the infinite product before taking this limit.

<!-- Source audit: all mathematical content visible in IMG_0093–IMG_0096 is retained above. -->
