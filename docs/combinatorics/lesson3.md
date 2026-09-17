# Permutation Statistics and Catalan Numbers

This chapter studies statistics on permutations and the generating polynomials that record them. Inversion tables produce the $q$-factorial, Foata's transformation relates inversions to the major index, and a first-return decomposition leads to the Catalan recurrence and generating function.

## 1. Inversions and inversion tables

!!! definition "Definition (Inversion)"
    <a id="def-3-1-1"></a>
    For $w=w_1\cdots w_n\in\mathfrak S_n$, an **inversion** is a pair $(i,j)$ with $i<j$ and $w_i>w_j$. The inversion number is

    $$
    \operatorname{inv}(w)
    =
    \#\{(i,j):1\le i<j\le n,\ w_i>w_j\}.
    $$

!!! definition "Definition (Inversion table)"
    <a id="def-3-1-2"></a>
    For each value $i\in[n]$, let $a_i$ be the number of entries larger than $i$ that occur to its left in $w$. The tuple $I(w)=(a_1,\ldots,a_n)$ is the inversion table of $w$. It satisfies $0\le a_i\le n-i$ and

    $$
    \operatorname{inv}(w)=a_1+\cdots+a_n.
    $$

!!! theorem "Theorem (Inversion-table bijection)"
    <a id="thm-3-1-3"></a>
    The map

    $$
    I:\mathfrak S_n
    \longrightarrow
    [0,n-1]\times[0,n-2]\times\cdots\times[0,0]
    $$

    is a bijection, where $[0,r]=\{0,1,\ldots,r\}$.

??? proof "Proof"
    Given $(a_1,\ldots,a_n)$, start with the one-letter word $n$. For $i=n-1,n-2,\ldots,1$, insert $i$ in the unique gap with exactly $a_i$ existing letters to its left. All existing letters are larger than $i$, so this produces the prescribed inversion table. The construction is unique.

    For the board example,

    $$
    (a_1,\ldots,a_9)=(1,5,2,0,4,2,0,1,0),
    $$

    successive insertion of $9,8,\ldots,1$ reconstructs

    $$
    w=417396285.
    $$

## 2. The $q$-factorial

!!! definition "Definition ($q$-integer and $q$-factorial)"
    <a id="def-3-2-1"></a>
    Define

    $$
    [m]_q=1+q+\cdots+q^{m-1}=\frac{1-q^m}{1-q},
    \qquad
    [n]_q!=\prod_{m=1}^{n}[m]_q.
    $$

    Since $[m]_q\to m$ as $q\to1$, one has

    $$
    \lim_{q\to1}[n]_q!=n!.
    $$

!!! theorem "Theorem (Inversion enumerator)"
    <a id="thm-3-2-2"></a>
    The inversion generating polynomial on $\mathfrak S_n$ is

    $$
    \sum_{w\in\mathfrak S_n}q^{\operatorname{inv}(w)}
    =
    [n]_q!.
    $$

??? proof "Proof"
    By [Theorem 3.1.3](#thm-3-1-3),

    $$
    \sum_{w\in\mathfrak S_n}q^{\operatorname{inv}(w)}
    =
    \prod_{i=1}^{n}\left(\sum_{a_i=0}^{n-i}q^{a_i}\right)
    =
    \prod_{m=1}^{n}[m]_q.
    $$

!!! remark "Remark (Complete flags)"
    <a id="rem-3-2-3"></a>
    Ordinary $n!$ counts complete chains of subsets of $[n]$. If $q$ is a prime power, then $[n]_q!$ counts complete flags

    $$
    0=V_0\subsetneq V_1\subsetneq\cdots\subsetneq V_n=\mathbb F_q^n,
    \qquad \dim V_i=i.
    $$

    Thus $[n]_q!$ is a finite-field analogue of $n!$.

??? proof "Counting the flags"
    There are

    $$
    \frac{q^n-1}{q-1}=[n]_q
    $$

    choices for the line $V_1$. Once $V_i$ is fixed, choosing $V_{i+1}\supset V_i$ is equivalent to choosing a line in the quotient $\mathbb F_q^n/V_i$, which has dimension $n-i$. Hence there are $[n-i]_q$ choices. Multiplying over $i=0,1,\ldots,n-1$ gives

    $$
    [n]_q[n-1]_q\cdots[1]_q=[n]_q!.
    $$

!!! proposition "Proposition (Inversions of inverse permutations)"
    <a id="prop-3-2-4"></a>
    For every $w\in\mathfrak S_n$,

    $$
    \operatorname{inv}(w)=\operatorname{inv}(w^{-1}).
    $$

??? proof "Proof"
    Plot the points $(i,w_i)$. An inversion is a pair whose first coordinates increase while the second coordinates decrease. Reflection across the main diagonal replaces $w$ by $w^{-1}$ and preserves these pairs.

## 3. Descents

!!! definition "Definition (Descent set)"
    <a id="def-3-3-1"></a>
    An index $i\in[n-1]$ is a descent of $w$ if $w_i>w_{i+1}$. Write

    $$
    \operatorname{Des}(w)
    =
    \{i\in[n-1]:w_i>w_{i+1}\}.
    $$

!!! proposition "Proposition (Permitted descents)"
    <a id="prop-3-3-2"></a>
    For $S=\{s_1<\cdots<s_k\}\subseteq[n-1]$, let

    $$
    \alpha(S)
    =
    \#\{w\in\mathfrak S_n:\operatorname{Des}(w)\subseteq S\}.
    $$

    Then

    $$
    \alpha(S)
    =
    \binom{n}{s_1,\ s_2-s_1,\ \ldots,\ s_k-s_{k-1},\ n-s_k}.
    $$

??? proof "Proof"
    Such a permutation is increasing within the position blocks cut after $s_1,\ldots,s_k$. Once the values assigned to each block are chosen, their order inside the block is forced. The choices are counted by the displayed multinomial coefficient.

!!! remark "Remark (Exact descent sets)"
    <a id="rem-3-3-3"></a>
    Counts with $\operatorname{Des}(w)=S$ follow from $\alpha$ by inclusion-exclusion over subsets of $S$.

## 4. The major index

!!! definition "Definition (Major index)"
    <a id="def-3-4-1"></a>
    The major index of $w$ is

    $$
    \operatorname{maj}(w)
    =
    \sum_{i\in\operatorname{Des}(w)}i.
    $$

!!! theorem "Theorem (MacMahon equidistribution)"
    <a id="thm-3-4-2"></a>
    The statistics $\operatorname{inv}$ and $\operatorname{maj}$ are equidistributed on $\mathfrak S_n$. Therefore

    $$
    \sum_{w\in\mathfrak S_n}q^{\operatorname{maj}(w)}
    =
    \sum_{w\in\mathfrak S_n}q^{\operatorname{inv}(w)}
    =
    [n]_q!.
    $$

??? proof "Proof via Foata's transformation"
    Let $w=w_1\cdots w_n$ and $Y_k=w_1\cdots w_k$. Construct a word $\gamma_k$ on $\{w_1,\ldots,w_k\}$ so that its last letter is $w_k$ and

    $$
    \operatorname{inv}(\gamma_k)=\operatorname{maj}(Y_k).
    $$

    Begin with $\gamma_1=w_1$. Assume $\gamma_k$ is defined and put $x=w_{k+1}$.

    + If $w_k>x$, cut $\gamma_k$ after every letter greater than $x$.
    + If $w_k<x$, cut $\gamma_k$ after every letter smaller than $x$.

    In each block, move the last letter to the front, then append $x$; call the result $\gamma_{k+1}$. If $c_k$ letters of $\gamma_k$ exceed $x$, then in the descent case the rotations create $k-c_k$ inversions and appending $x$ creates $c_k$, for a net increase of $k$. In the ascent case the rotations remove $c_k$ inversions and appending $x$ restores them, for a net increase of $0$. These are exactly the changes in the major index.

    More explicitly, in the descent case $w_k>x$,

    $$
    \operatorname{maj}(Y_{k+1})
    =
    \operatorname{maj}(Y_k)+k
    $$

    and

    $$
    \operatorname{inv}(\gamma_{k+1})
    =
    \operatorname{inv}(\gamma_k)+(k-c_k)+c_k.
    $$

    In the ascent case $w_k<x$, no new descent is created; the rotations remove $c_k$ inversions and appending $x$ creates exactly $c_k$, so both statistics are unchanged. This proves the invariant by induction for every prefix $Y_k$.

    The construction is reversible. The last letter of $\gamma_{k+1}$ is $x$, and the first remaining letter determines which comparison case occurred; reversing the block rotations recovers $\gamma_k$. Thus $\Phi(w)=\gamma_n$ is a bijection satisfying $\operatorname{inv}(\Phi(w))=\operatorname{maj}(w)$.

    For the reverse step, remove $x$. If the first remaining letter is greater than $x$, cut according to letters greater than $x$ and move the first letter of each block back to the end. If it is smaller than $x$, do the same using letters smaller than $x$. The last letter of the recovered word is $w_k$, so repeating the procedure uniquely recovers $w$.

    The board example $w=683941725$ gives

    $$
    \begin{aligned}
    \gamma_1&=6,\\
    \gamma_2&=68,\\
    \gamma_3&=683,\\
    \gamma_4&=6839,\\
    \gamma_5&=68934,\\
    \gamma_6&=689341,\\
    \gamma_7&=6389417,\\
    \gamma_8&=63894712,\\
    \gamma_9&=364891725.
    \end{aligned}
    $$

    Thus $\Phi(683941725)=364891725$; direct calculation gives

    $$
    \operatorname{maj}(683941725)
    =
    \operatorname{inv}(364891725).
    $$

## 5. Dyck paths and Catalan numbers

!!! definition "Definition (Dyck path and Catalan number)"
    <a id="def-3-5-1"></a>
    A Dyck path of semilength $n$ is a path from $(0,0)$ to $(n,n)$ using north and east steps that never goes below $y=x$. Let $C_n$ be the number of such paths, with $C_0=1$.

!!! proposition "Proposition (Catalan recurrence)"
    <a id="prop-3-5-2"></a>
    For $n\ge0$,

    $$
    C_{n+1}=\sum_{i=0}^{n}C_iC_{n-i}.
    $$

??? proof "Proof"
    Encode north and east steps as opening and closing parentheses. Every nonempty Dyck path has a unique first-return decomposition $(P_1)P_2$. If $P_1$ has semilength $i$, then $P_2$ has semilength $n-i$.

!!! theorem "Theorem (Catalan generating function and closed form)"
    <a id="thm-3-5-3"></a>
    For $C(X)=\sum_{n\ge0}C_nX^n$,

    $$
    C(X)=1+XC(X)^2
    $$

    and hence

    $$
    C(X)=\frac{1-\sqrt{1-4X}}{2X}.
    $$

    Consequently,

    $$
    C_n=\frac1{n+1}\binom{2n}{n}.
    $$

    The first values are

    $$
    C_0,C_1,C_2,C_3,C_4,C_5
    =
    1,1,2,5,14,42.
    $$

??? proof "Proof"
    The recurrence gives $(C(X)-1)/X=C(X)^2$. Of the two quadratic roots, only the displayed one has constant term $1$. Expanding $(1-4X)^{1/2}$ by [Definition 1.4.6](lesson1.md#def-1-4-6) yields the coefficient formula.

    In detail,

    $$
    \begin{aligned}
    C_n
    &=[X^n]C(X)\\
    &=-\frac12[X^{n+1}](1-4X)^{1/2}\\
    &=-\frac12\binom{1/2}{n+1}(-4)^{n+1}\\
    &=\frac1{n+1}\binom{2n}{n}.
    \end{aligned}
    $$

## 6. Permutation plots and pattern avoidance

!!! definition "Definition (Permutation matrix)"
    <a id="def-3-6-1"></a>
    For $w\in\mathfrak S_n$, define $P_w$ by

    $$
    (P_w)_{ij}
    =
    \begin{cases}
    1,&w_i=j,\\
    0,&\text{otherwise}.
    \end{cases}
    $$

    A zero-one matrix is a permutation matrix exactly when each row and each column contains one entry equal to $1$.

    Equivalently, the $n$ points

    $$
    (1,w_1),(2,w_2),\ldots,(n,w_n)
    $$

    form the permutation plot. Reflecting this plot in the main diagonal gives the plot of $w^{-1}$.

!!! definition "Definition (321-avoidance)"
    <a id="def-3-6-2"></a>
    A permutation $w$ is 321-avoiding if there are no indices $i<j<k$ with $w_i>w_j>w_k$.

!!! theorem "Theorem (321-avoiding permutations)"
    <a id="thm-3-6-3"></a>
    The number of 321-avoiding permutations in $\mathfrak S_n$ is

    $$
    C_n=\frac1{n+1}\binom{2n}{n}.
    $$

    The next chapter develops a diagrammatic Catalan correspondence for the closely related class of 132-avoiding permutations.

## 7. Integer partitions and Gaussian coefficients

The remaining material in this lecture develops the partition-theoretic meaning of Gaussian coefficients and several classical partition identities. It is recorded here in full, including both the finite-field and word-bijection arguments.

!!! definition "Definition (Partition and its basic statistics)"
    <a id="def-3-7-1"></a>
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
    <a id="prop-3-7-2"></a>
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
    <a id="ex-3-7-3"></a>
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

## 8. Conjugation and unrestricted partition generating functions

!!! definition "Definition (Conjugate partition)"
    <a id="def-3-8-1"></a>
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
    <a id="prop-3-8-2"></a>
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
    <a id="cor-3-8-3"></a>
    If $p(n)$ denotes the number of all partitions of $n$, then

    $$
    \sum_{n\ge0}p(n)q^n
    =
    \prod_{i\ge1}\frac1{1-q^i}.
    $$

    This follows coefficientwise by letting $k\to\infty$: the coefficient of $q^n$ has already stabilized once $k\ge n$.

!!! proposition "Proposition (Generating function from allowed multiplicities)"
    <a id="prop-3-8-4"></a>
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

## 9. Two diagram identities

!!! proposition "Proposition (A row-column identity)"
    <a id="prop-3-9-1"></a>
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
    <a id="def-3-9-2"></a>
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

## 10. Self-conjugate partitions and odd diagonal hooks

!!! proposition "Proposition (Self-conjugate partitions)"
    <a id="prop-3-10-1"></a>
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

## 11. Euler's odd-distinct partition theorem

!!! theorem "Theorem (Odd parts and distinct parts)"
    <a id="thm-3-11-1"></a>
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

## 12. Three bivariate partition identities

For compactness, write

$$
(q;q)_k=(1-q)(1-q^2)\cdots(1-q^k),
\qquad
(q;q)_0=1.
$$

!!! proposition "Proposition (Parts marked by $x$)"
    <a id="prop-3-12-1"></a>
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

    Restrict to partitions having exactly $k$ parts and subtract $1$ from every part. This removes $k$ cells and leaves an arbitrary partition with at most $k$ parts. By [Proposition 3.8.2](#prop-3-8-2), their contribution is

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
    <a id="prop-3-12-2"></a>
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
    <a id="prop-3-12-3"></a>
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
    <a id="rem-3-12-4"></a>
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

<!-- Source audit: all mathematical content visible in the supplied lecture photographs is retained above. -->
