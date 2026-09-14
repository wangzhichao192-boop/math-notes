# Basic Counting, Cycles, and Stirling Numbers

This chapter develops several basic counting constructions and then applies generating functions to the cycle structure of permutations. The central objects are compositions, multisets, cycle indices, and the Stirling numbers of the first kind.

## 1. Sets, multisets, and elementary identities

!!! proposition "Proposition (Subset expansion)"
    <a id="prop-2-1-1"></a>
    For $S=\{x_1,\ldots,x_n\}$,

    $$
    \prod_{i=1}^{n}(1+x_i)
    =
    \sum_{T\subseteq S}\prod_{x_i\in T}x_i.
    $$

    Setting every $x_i=x$ gives the binomial theorem

    $$
    (1+x)^n=\sum_{k=0}^{n}\binom{n}{k}x^k.
    $$

!!! remark "Remark (Weighted counting)"
    <a id="rem-2-1-2"></a>
    If a finite collection $\mathcal A$ contains exactly $f(n)$ objects of size $n$, then

    $$
    \sum_{A\in\mathcal A}x^{|A|}
    =
    \sum_{n\ge0}f(n)x^n.
    $$

    More generally, a weight $g(|A|)$ replaces $f(n)$ by $g(n)f(n)$.

!!! definition "Definition (Finite multiset)"
    <a id="def-2-1-3"></a>
    A finite multiset on $S$ is a function $v:S\to\mathbb N$ with finite support. The integer $v(x)$ is the multiplicity of $x$, and

    $$
    |M|=\sum_{x\in S}v(x).
    $$

    For $S=\{x_1,\ldots,x_n\}$, write $M=\{x_1^{a_1},\ldots,x_n^{a_n}\}$ when $a_i=v(x_i)$.

!!! proposition "Proposition (Combinations with repetition)"
    <a id="prop-2-1-4"></a>
    The number of $k$-element multisets on an $n$-element set is

    $$
    \left(\!\!\binom{n}{k}\!\!\right)
    =
    \binom{n+k-1}{k}
    =
    (-1)^k\binom{-n}{k}.
    $$

??? proof "Proof"
    A multiset corresponds to a solution of $a_1+\cdots+a_n=k$ in nonnegative integers. Its generating function is

    $$
    (1+x+x^2+\cdots)^n
    =
    (1-x)^{-n}
    =
    \sum_{k\ge0}(-1)^k\binom{-n}{k}x^k.
    $$

## 2. Compositions and multinomial coefficients

!!! definition "Definition (Weak composition)"
    <a id="def-2-2-1"></a>
    A weak composition of $n$ into $k$ parts is a solution of

    $$
    x_1+\cdots+x_k=n
    $$

    in nonnegative integers.

!!! proposition "Proposition (Stars and bars)"
    <a id="prop-2-2-2"></a>
    The number of weak compositions of $n$ into $k$ parts is

    $$
    \binom{n+k-1}{k-1}.
    $$

    The number of solutions to $x_1+\cdots+x_k\le n$ is $\binom{n+k}{k}$.

??? proof "Proof"
    Place $n$ indistinguishable stars in a row and choose the locations of $k-1$ bars among the $n+k-1$ positions. For the inequality, add the slack variable $x_{k+1}=n-(x_1+\cdots+x_k)$.

!!! definition "Definition (Composition)"
    <a id="def-2-2-3"></a>
    A composition of $n$ is a finite tuple $\alpha=(a_1,\ldots,a_r)$ of positive integers with $a_1+\cdots+a_r=n$. If $r=k$, it is a $k$-composition.

!!! proposition "Proposition (Number of compositions)"
    <a id="prop-2-2-4"></a>
    The number of $k$-compositions of $n$ is $\binom{n-1}{k-1}$.

??? proof "Proof"
    Map $\alpha=(a_1,\ldots,a_k)$ to its proper partial sums

    $$
    \{a_1,a_1+a_2,\ldots,a_1+\cdots+a_{k-1}\}\subseteq[n-1].
    $$

    This is a bijection with the $(k-1)$-subsets of $[n-1]$.

!!! definition "Definition (Multinomial coefficient)"
    <a id="def-2-2-5"></a>
    If $a_1+\cdots+a_m=n$, then

    $$
    \binom{n}{a_1,\ldots,a_m}
    =
    \frac{n!}{a_1!\cdots a_m!}.
    $$

    It counts assignments of the elements of $[n]$ to $m$ labeled classes of sizes $a_1,\ldots,a_m$.

## 3. Cycles and the fundamental bijection

Write $\mathfrak S_n$ for the symmetric group. A permutation may be written in cycle notation or in one-line notation.

!!! definition "Definition (Standard cycle form)"
    <a id="def-2-3-1"></a>
    Write the largest element first in each cycle and order the cycles by increasing largest element. This is the **standard cycle form**.

!!! definition "Definition (Fundamental bijection)"
    <a id="def-2-3-2"></a>
    Erasing the parentheses from the standard cycle form defines a bijection

    $$
    \widehat{\phantom w}:\mathfrak S_n\longrightarrow\mathfrak S_n.
    $$

    The inverse inserts a left parenthesis before every left-to-right maximum and closes each cycle immediately before the next one.

!!! example "Example (Recovering cycles)"
    <a id="ex-2-3-3"></a>
    The word $2416753$ has left-to-right maxima $2,4,6,7$, so it splits as

    $$
    (2)(41)(6)(753).
    $$

    Each cycle starts with its largest entry and the cycle maxima increase.

## 4. Cycle type and the cycle index

!!! definition "Definition (Cycle type)"
    <a id="def-2-4-1"></a>
    For $w\in\mathfrak S_n$, let $C_i(w)$ be the number of cycles of length $i$. Then

    $$
    n=\sum_{i=1}^{n}iC_i(w).
    $$

    The tuple $(C_1(w),\ldots,C_n(w))$ is the **cycle type** of $w$, and $C(w)=\sum_iC_i(w)$ is its total number of cycles.

!!! proposition "Proposition (Permutations of a fixed cycle type)"
    <a id="prop-2-4-2"></a>
    If $n=\sum_i i c_i$, then

    $$
    \#\{w\in\mathfrak S_n:C_i(w)=c_i\text{ for all }i\}
    =
    \frac{n!}{\prod_{i=1}^{n}i^{c_i}c_i!}.
    $$

??? proof "Proof"
    Arrange the $n$ labels in a row and divide them into the prescribed cycle lengths. Each $i$-cycle has $i$ equivalent rotations, and the $c_i$ cycles of length $i$ may be permuted freely.

!!! definition "Definition (Cycle index)"
    <a id="def-2-4-3"></a>
    The cycle index of $\mathfrak S_n$ is

    $$
    Z_n(t_1,\ldots,t_n)
    =
    \frac1{n!}\sum_{w\in\mathfrak S_n}
    \prod_{i=1}^{n}t_i^{C_i(w)},
    $$

    with $Z_0=1$.

!!! example "Example (Small cycle indices)"
    <a id="ex-2-4-4"></a>
    The first three cycle indices are

    $$
    Z_1=t_1,
    \qquad
    Z_2=\frac12(t_1^2+t_2),
    $$

    $$
    Z_3=\frac16(t_1^3+3t_1t_2+2t_3).
    $$

!!! theorem "Theorem (Generating function for cycle indices)"
    <a id="thm-2-4-5"></a>
    In the formal power series ring $\mathbb C[t_1,t_2,\ldots][[x]]$,

    $$
    \sum_{n\ge0}Z_nx^n
    =
    \exp\left(\sum_{i\ge1}t_i\frac{x^i}{i}\right).
    $$

??? proof "Proof"
    By the formal exponential identities of [Proposition 1.4.5](lesson1.md#prop-1-4-5),

    $$
    \exp\left(\sum_{i\ge1}t_i\frac{x^i}{i}\right)
    =
    \prod_{i\ge1}\sum_{j\ge0}t_i^j\frac{x^{ij}}{i^j j!}.
    $$

    The coefficient of $t_1^{c_1}\cdots t_n^{c_n}x^n$ is $\prod_i(i^{c_i}c_i!)^{-1}$, which equals the number in [Proposition 2.4.2](#prop-2-4-2) divided by $n!$.

## 5. Applications of the cycle index

!!! example "Example (Permutations satisfying $w^6=1$)"
    <a id="ex-2-5-1"></a>
    Let $e_6(n)=\#\{w\in\mathfrak S_n:w^6=1\}$. This condition holds exactly when every cycle length divides $6$. Hence

    $$
    \sum_{n\ge0}e_6(n)\frac{x^n}{n!}
    =
    \exp\left(x+\frac{x^2}{2}+\frac{x^3}{3}+\frac{x^6}{6}\right).
    $$

!!! proposition "Proposition (Expected number of $k$-cycles)"
    <a id="prop-2-5-2"></a>
    In a uniformly random permutation of $[n]$, the expected number of $k$-cycles is $1/k$ for $n\ge k$ and $0$ otherwise.

??? proof "Proof"
    Differentiate the cycle-index generating function with respect to $t_k$ and then set every $t_i=1$. Since $\sum_{i\ge1}x^i/i=-\log(1-x)$,

    $$
    \sum_{n\ge0}\mathbb E[C_k]x^n
    =
    \frac{x^k}{k}\exp\left(\sum_{i\ge1}\frac{x^i}{i}\right)
    =
    \frac{x^k}{k(1-x)}.
    $$

## 6. Stirling numbers of the first kind

!!! definition "Definition (Stirling numbers of the first kind)"
    <a id="def-2-6-1"></a>
    The unsigned Stirling number of the first kind is

    $$
    c(n,k)=\#\{w\in\mathfrak S_n:C(w)=k\}.
    $$

    The signed version is $s(n,k)=(-1)^{n-k}c(n,k)$.

!!! proposition "Proposition (Stirling recurrence)"
    <a id="prop-2-6-2"></a>
    For $n,k\ge1$,

    $$
    c(n,k)=(n-1)c(n-1,k)+c(n-1,k-1),
    $$

    with $c(0,0)=1$ and $c(n,k)=0$ when $n<k$ or when $k=0<n$.

??? proof "Proof"
    Starting from a permutation of $[n-1]$, either insert $n$ into one of the $n-1$ directed edges of its cycles, preserving the number of cycles, or add $(n)$ as a new singleton cycle.

!!! theorem "Theorem (Cycle-counting polynomial)"
    <a id="thm-2-6-3"></a>
    For every $n\ge0$,

    $$
    \sum_{k=0}^{n}c(n,k)t^k
    =
    t(t+1)(t+2)\cdots(t+n-1).
    $$

??? proof "Proof"
    Let $F_n(t)=\sum_kc(n,k)t^k$. The recurrence gives

    $$
    F_n(t)=(t+n-1)F_{n-1}(t),
    \qquad F_0(t)=1.
    $$

    Iteration yields the product formula.
