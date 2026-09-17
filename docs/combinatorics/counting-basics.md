# Counting Basics

Enumerative combinatorics asks for the cardinalities of finite families and for algebraic structures that encode them. This chapter introduces formal power series, their coefficientwise topology, and the ordinary and exponential generating functions used throughout the subject.

## Generating Functions

Let $(S_n)_{n\ge 0}$ be a family of finite sets and write $a_n=|S_n|$. An enumeration may take the form of a closed formula, a recurrence, a finite or infinite sum or product, or a generating function.

!!! example "Example (Subsets)"
    <a id="ex-1-1-1"></a>
    For $S_n=\mathcal P([n])$, each element of $[n]$ may be present or absent, hence $|S_n|=2^n$.

!!! proposition "Proposition (Subsets with no consecutive elements)"
    <a id="prop-1-1-2"></a>
    Let $S_n$ be the set of subsets of $[n]$ containing no two consecutive integers, and set $a_n=|S_n|$. Then $a_0=1$, $a_1=2$, and

    $$
    a_n=a_{n-1}+a_{n-2}\qquad(n\ge 2).
    $$

??? proof "Proof"
    Partition $S_n$ according to whether $n$ is absent or present. The first class is in bijection with $S_{n-1}$. In the second class, $n-1$ is absent, and deleting $n$ gives an element of $S_{n-2}$. Thus

    $$
    S_n\simeq S_{n-1}\sqcup S_{n-2}.
    $$

### Formal Power Series

!!! definition "Definition (Formal power series)"
    <a id="def-1-2-1"></a>
    The ring of formal power series over $\mathbb C$ is

    $$
    \mathbb C[[X]]
    =
    \left\{\sum_{n\ge 0}a_nX^n:a_n\in\mathbb C\right\}.
    $$

    Here $X$ is a formal indeterminate; no numerical value or analytic convergence is assumed. For

    $$
    f=\sum_{n\ge0}a_nX^n,
    \qquad
    g=\sum_{n\ge0}b_nX^n,
    $$

    addition is coefficientwise, and multiplication is the Cauchy product

    $$
    f+g=\sum_{n\ge0}(a_n+b_n)X^n,
    \qquad
    fg=\sum_{n\ge0}\left(\sum_{j=0}^{n}a_jb_{n-j}\right)X^n.
    $$

!!! definition "Definition (Coefficient extraction)"
    <a id="def-1-2-2"></a>
    If $f(X)=\sum_{n\ge0}a_nX^n$, write $[X^n]f(X)=a_n$.

!!! definition "Definition (Ordinary and exponential generating functions)"
    <a id="def-1-2-3"></a>
    The **ordinary generating function** of $(a_n)_{n\ge0}$ is

    $$
    A(X)=\sum_{n\ge0}a_nX^n.
    $$

    Its **exponential generating function** is

    $$
    \widehat A(X)=\sum_{n\ge0}a_n\frac{X^n}{n!}.
    $$

!!! proposition "Proposition (Products of exponential generating functions)"
    <a id="prop-1-2-4"></a>
    If $\widehat A(X)=\sum_{n\ge0}a_nX^n/n!$ and $\widehat B(X)=\sum_{n\ge0}b_nX^n/n!$, then

    $$
    \widehat A(X)\widehat B(X)
    =
    \sum_{n\ge0}\left(\sum_{j=0}^{n}\binom{n}{j}a_jb_{n-j}\right)\frac{X^n}{n!}.
    $$

??? proof "Proof"
    In the Cauchy product, the coefficient of $X^n$ is

    $$
    \sum_{j=0}^{n}\frac{a_j}{j!}\frac{b_{n-j}}{(n-j)!}
    =
    \frac1{n!}\sum_{j=0}^{n}\binom{n}{j}a_jb_{n-j}.
    $$

## Formal Convergence

!!! definition "Definition (Valuation and norm)"
    <a id="def-1-3-1"></a>
    For nonzero $f(X)=\sum_{n\ge0}a_nX^n$, define

    $$
    \operatorname{val}(f)=\min\{n:a_n\ne0\},
    $$

    and set $\operatorname{val}(0)=+\infty$. The associated norm is

    $$
    |f|=2^{-\operatorname{val}(f)},
    \qquad |0|=0.
    $$

!!! proposition "Proposition (Ultrametric inequality)"
    <a id="prop-1-3-2"></a>
    For $f,g\in\mathbb C[[X]]$,

    $$
    |f+g|\le\max\{|f|,|g|\}.
    $$

    Equivalently,

    $$
    \operatorname{val}(f+g)
    \ge
    \min\{\operatorname{val}(f),\operatorname{val}(g)\}.
    $$

??? proof "Proof"
    Below degree $\min\{\operatorname{val}(f),\operatorname{val}(g)\}$, both series have zero coefficients, so their sum does as well. Equality holds unless the first nonzero coefficients cancel. Applying the decreasing function $r\mapsto2^{-r}$ gives the norm inequality.

!!! remark "Remark (Coefficientwise meaning of convergence)"
    <a id="rem-1-3-3"></a>
    The metric $d(f,g)=|f-g|$ makes $\mathbb C[[X]]$ complete. A sequence $f_N$ converges to $f$ precisely when, for every fixed $k$, the coefficient $[X^k]f_N$ eventually equals $[X^k]f$. In particular, $|f-g|<2^{-N}$ exactly when the coefficients through degree $N$ agree.

    The open ball of radius $2^{-N}$ about $f$ is therefore

    $$
    B(f,2^{-N})
    =
    \{g\in\mathbb C[[X]]:g-f\in X^{N+1}\mathbb C[[X]]\}.
    $$

    Every point of an ultrametric ball is a center: if $h\in B(f,2^{-N})$, then $B(h,2^{-N})=B(f,2^{-N})$. This follows immediately from the ultrametric inequality in both directions.

!!! example "Example (The scalar embedding is not continuous)"
    <a id="ex-1-3-4"></a>
    Although $1/n\to0$ in the usual topology on $\mathbb C$, every nonzero constant series has norm $1$. Hence the embedding $\mathbb C\to\mathbb C[[X]]$, $z\mapsto z$, is not continuous.

!!! example "Example (Cantor space)"
    <a id="ex-1-3-5"></a>
    The space $\mathbb F_2[[X]]$ is the space of infinite binary strings. Two strings are close when they share a long initial segment, so $\mathbb F_2[[X]]$ is homeomorphic to Cantor space.

!!! proposition "Proposition (Convergence criteria)"
    <a id="prop-1-3-6"></a>
    Let $f_n,g_n\in\mathbb C[[X]]$, with $g_n\in X\mathbb C[[X]]$.

    + The series $\sum_{n\ge0}f_n$ converges if and only if $f_n\to0$, equivalently $\operatorname{val}(f_n)\to+\infty$.
    + The product $\prod_{n\ge0}(1+g_n)$ converges if and only if $\operatorname{val}(g_n)\to+\infty$.

??? proof "Proof"
    For partial sums $S_N=\sum_{n=0}^{N}f_n$, the ultrametric inequality gives

    $$
    |S_M-S_N|
    \le
    \max_{N<j\le M}|f_j|.
    $$

    This proves sufficiency; necessity follows from $f_N=S_N-S_{N-1}$. For partial products $P_N=\prod_{n=0}^{N}(1+g_n)$, each $P_N$ has norm $1$, and expansion gives

    $$
    |P_M-P_N|
    \le
    \max_{N<j\le M}|g_j|.
    $$

    Conversely, $P_N-P_{N-1}=P_{N-1}g_N$, so convergence forces $|g_N|\to0$.

## Formal Calculus

!!! definition "Definition (Composition)"
    <a id="def-1-4-1"></a>
    If $f(X)=\sum_{n\ge0}a_nX^n$ and $g(X)\in X\mathbb C[[X]]$, define

    $$
    (f\circ g)(X)=f(g(X))=\sum_{n\ge0}a_ng(X)^n.
    $$

    This is well-defined because $\operatorname{val}(g^n)\to+\infty$. The condition $g(0)=0$ is essential when $f$ has infinitely many nonzero coefficients.

    For example, $\sum_{n\ge0}(X+1)^n/n!$ is not defined as an element of $\mathbb C[[X]]$: every summand contributes to the constant coefficient, so that coefficient is not a finite algebraic sum. Formal composition is therefore controlled by valuation, not by analytic convergence.

!!! proposition "Proposition (Units)"
    <a id="prop-1-4-2"></a>
    A series $f(X)=a_0+a_1X+\cdots$ is invertible in $\mathbb C[[X]]$ if and only if $a_0\ne0$.

??? proof "Proof"
    Necessity follows by taking constant terms in $fg=1$. Conversely, write $f=a_0(1+h)$ with $h\in X\mathbb C[[X]]$. Then

    $$
    f^{-1}=\frac1{a_0}\sum_{n\ge0}(-h)^n.
    $$

!!! example "Example (Geometric series)"
    <a id="ex-1-4-3"></a>
    In $\mathbb C[[X]]$,

    $$
    \frac1{1-X}=1+X+X^2+\cdots.
    $$

    This is a coefficientwise identity and does not require an analytic hypothesis such as $|X|<1$.

!!! definition "Definition (Formal exponential and logarithm)"
    <a id="def-1-4-4"></a>
    For $f\in X\mathbb C[[X]]$, define

    $$
    \exp(f)=\sum_{n\ge0}\frac{f^n}{n!},
    \qquad
    \log(1+f)=\sum_{n\ge1}(-1)^{n-1}\frac{f^n}{n}.
    $$

!!! proposition "Proposition (Exponential and logarithmic identities)"
    <a id="prop-1-4-5"></a>
    For $f,g\in X\mathbb C[[X]]$ and $F,G\in1+X\mathbb C[[X]]$,

    $$
    \exp(f+g)=\exp(f)\exp(g),
    \qquad
    \log(FG)=\log F+\log G,
    $$

    and

    $$
    \log(\exp f)=f,
    \qquad
    \exp(\log(1+f))=1+f.
    $$

??? proof "Proof"
    Each identity is valid for polynomials after truncation modulo $X^{N+1}$, because only finitely many terms contribute in the quotient $\mathbb C[[X]]/(X^{N+1})$. The ordinary polynomial identities therefore hold modulo $X^{N+1}$ for every $N$, and hence hold coefficientwise in $\mathbb C[[X]]$.

    In particular, the familiar calculation

    $$
    \left(\sum_{n\ge0}\frac{X^n}{n!}\right)
    \left(\sum_{n\ge0}\frac{(-1)^nX^n}{n!}\right)
    =1
    $$

    is a formal identity; it does not appeal to numerical convergence of $e^Xe^{-X}$.

!!! definition "Definition (Generalized powers)"
    <a id="def-1-4-6"></a>
    For $f\in X\mathbb C[[X]]$ and $\lambda\in\mathbb C$, define

    $$
    (1+f)^\lambda
    =
    \sum_{n\ge0}\binom{\lambda}{n}f^n,
    \qquad
    \binom{\lambda}{n}
    =
    \frac{\lambda(\lambda-1)\cdots(\lambda-n+1)}{n!}.
    $$

    Vandermonde's identity yields $(1+f)^{\lambda+\mu}=(1+f)^\lambda(1+f)^\mu$.

??? proof "Proof of the exponent law"
    Since $f\in X\mathbb C[[X]]$, every coefficient in the following Cauchy product is a finite sum. Vandermonde's identity gives

    $$
    \begin{aligned}
    (1+f)^\lambda(1+f)^\mu
    &=
    \sum_{r,s\ge0}
    \binom{\lambda}{r}\binom{\mu}{s}f^{r+s}\\
    &=
    \sum_{n\ge0}
    \left(\sum_{r=0}^{n}
    \binom{\lambda}{r}\binom{\mu}{n-r}\right)f^n\\
    &=
    \sum_{n\ge0}\binom{\lambda+\mu}{n}f^n\\
    &=(1+f)^{\lambda+\mu}.
    \end{aligned}
    $$

!!! definition "Definition (Formal derivative)"
    <a id="def-1-4-7"></a>
    For $f(X)=\sum_{n\ge0}a_nX^n$, define

    $$
    f'(X)=\sum_{n\ge0}(n+1)a_{n+1}X^n.
    $$

    Formal differentiation satisfies linearity, the product rule, and the chain rule $(f\circ g)'=g'(f'\circ g)$ whenever the composition is defined.

??? proof "Verification of the formal rules"
    Linearity is coefficientwise. For the product rule, the coefficient of $X^{n-1}$ in $(fg)'$ is

    $$
    n\sum_{i=0}^{n}a_ib_{n-i}
    =
    \sum_{i=0}^{n}ia_ib_{n-i}
    +
    \sum_{i=0}^{n}(n-i)a_ib_{n-i},
    $$

    which is the same coefficient in $f'g+fg'$. The chain rule first follows for monomials $f=X^m$ from the product rule, then for polynomials by linearity, and finally for formal series coefficientwise because $g(0)=0$ makes every fixed coefficient depend on only finitely many terms of $f$.

### Logarithmic Differentiation

!!! proposition "Proposition (Formal logarithmic antiderivative)"
    <a id="prop-1-4-8"></a>
    Let $f\in1+X\mathbb C[[X]]$. There is a unique $g\in X\mathbb C[[X]]$ satisfying

    $$
    g'(X)=\frac{f'(X)}{f(X)},
    \qquad
    g(0)=0,
    $$

    namely $g=\log f$. Equivalently, $f=\exp g$.

??? proof "Proof"
    Termwise differentiation of the logarithmic series gives $(\log f)'=f'/f$. Conversely, if $g$ satisfies the differential equation, the product and chain rules give

    $$
    (fe^{-g})'
    =
    f'e^{-g}-fg'e^{-g}
    =0.
    $$

    A formal series with zero derivative is constant, and $f(0)e^{-g(0)}=1$. Hence $fe^{-g}=1$, so $f=e^g$ and $g=\log f$.

### Generating Function Identities

!!! example "Example (Fibonacci generating function)"
    <a id="ex-1-5-1"></a>
    Let $a_0=a_1=1$ and $a_n=a_{n-1}+a_{n-2}$ for $n\ge2$. For $A(X)=\sum_{n\ge0}a_nX^n$,

    $$
    A(X)=1+X+X(A(X)-1)+X^2A(X),
    $$

    whence

    $$
    A(X)=\frac1{1-X-X^2}.
    $$

!!! example "Example (A Möbius product)"
    <a id="ex-1-5-2"></a>
    Let $\mu$ be the number-theoretic Möbius function. Since

    $$
    \sum_{d\mid m}\mu(d)
    =
    \begin{cases}
    1,&m=1,\\
    0,&m>1,
    \end{cases}
    $$

    the formal product

    $$
    F(X)=\prod_{n\ge1}(1-X^n)^{-\mu(n)/n}
    $$

    satisfies

    $$
    [X^m]\log F(X)
    =
    \frac1m\sum_{d\mid m}\mu(d).
    $$

    Therefore $\log F(X)=X$ and $F(X)=e^X$.

!!! example "Example (A convolution square root)"
    <a id="ex-1-5-3"></a>
    Suppose $a_0=1$ and

    $$
    \sum_{k=0}^{n}a_ka_{n-k}=1
    $$

    for every $n\ge0$. If $A(X)=\sum_{n\ge0}a_nX^n$, then $A(X)^2=(1-X)^{-1}$. The constant term selects

    $$
    A(X)=(1-X)^{-1/2},
    $$

    so

    $$
    a_n=(-1)^n\binom{-1/2}{n}
    =
    \frac1{4^n}\binom{2n}{n}.
    $$

We now develop several basic counting constructions and then apply generating functions to the cycle structure of permutations. The central objects are compositions, multisets, cycle indices, and the Stirling numbers of the first kind.

## Elementary Counting

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

??? proof "Proof"
    In expanding the product, choose either $1$ or $x_i$ from each factor. The set $T$ of indices from which $x_i$ is chosen contributes the monomial $\prod_{x_i\in T}x_i$, and every subset occurs exactly once.

    Three useful specializations from the board are

    $$
    \sum_{k=0}^{n}\binom{n}{k}=2^n,
    \qquad
    \sum_{k=0}^{n}(-1)^k\binom{n}{k}=0
    \quad(n\ge1),
    $$

    and, after formal differentiation,

    $$
    n(1+x)^{n-1}
    =
    \sum_{k=1}^{n}k\binom{n}{k}x^{k-1}.
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

    Equivalently, write the solution as a row of $k$ stars separated into $n$ boxes by $n-1$ bars. Choosing the positions of the bars among the $n+k-1$ symbols gives $\binom{n+k-1}{k}$ solutions. Thus the generating-function and stars-and-bars arguments give the same identity.

    More generally, if the elements of $S$ carry variables $x_s$, then the weight enumerator for finite multisets on $S$ is

    $$
    \prod_{s\in S}(1+x_s+x_s^2+\cdots)
    =
    \sum_{M}\prod_{s\in S}x_s^{v_M(s)}.
    $$

### Compositions

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

    Allowing all possible values of $k$ identifies every composition of $n$ with an arbitrary subset of $[n-1]$. Hence $n$ has $2^{n-1}$ compositions for $n\ge1$. For example, the eight compositions of $4$ are

    $$
    1111,\ 211,\ 121,\ 112,\ 22,\ 13,\ 31,\ 4.
    $$

!!! definition "Definition (Multinomial coefficient)"
    <a id="def-2-2-5"></a>
    If $a_1+\cdots+a_m=n$, then

    $$
    \binom{n}{a_1,\ldots,a_m}
    =
    \frac{n!}{a_1!\cdots a_m!}.
    $$

    It counts assignments of the elements of $[n]$ to $m$ labeled classes of sizes $a_1,\ldots,a_m$.

    Choosing the classes successively gives the board identity

    $$
    \binom{n}{a_1,\ldots,a_m}
    =
    \binom{n}{a_1}
    \binom{n-a_1}{a_2}
    \cdots
    \binom{n-a_1-\cdots-a_{m-1}}{a_m}.
    $$

## Permutation Cycles

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

??? proof "Proof"
    In standard cycle form, the first entry of each cycle is larger than every later entry in that cycle, and the cycle maxima increase from left to right. After parentheses are erased, these first entries are therefore exactly the left-to-right maxima. Conversely, cutting a word immediately before its left-to-right maxima produces blocks whose first entries are their maxima and increase from block to block. Interpreting the blocks as cycles recovers standard cycle form, so the two operations are inverse.

!!! example "Example (Recovering cycles)"
    <a id="ex-2-3-3"></a>
    The word $2416753$ has left-to-right maxima $2,4,6,7$, so it splits as

    $$
    (2)(41)(6)(753).
    $$

    Each cycle starts with its largest entry and the cycle maxima increase.

    For the permutation $w=4271365$ in one-line notation, the ordinary cycle decomposition is

    $$
    (14)(2)(375)(6).
    $$

    Its standard cycle form and flattened word are

    $$
    (2)(41)(6)(753)
    \longmapsto
    2416753.
    $$

### Cycle Index

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

    Arrange the $n$ labels in a row and cut the row into an ordered list containing $c_i$ blocks of length $i$ for every $i$. Reading each block cyclically gives a permutation of the prescribed type. For each $i$-cycle, its $i$ cyclic rotations give the same cycle, contributing a factor $i^{c_i}$ to every fibre. Moreover, the $c_i$ cycles of length $i$ can be reordered in $c_i!$ ways without changing the permutation. Hence every permutation has exactly

    $$
    \prod_{i=1}^{n}i^{c_i}c_i!
    $$

    preimages among the $n!$ linear arrangements, giving the stated quotient.

    For the board example, take $n=9$ and cycle counts $c_1=1$, $c_2=2$, $c_4=1$. The linear arrangement

    $$
    427619583
    $$

    is cut according to the prescribed lengths as

    $$
    4\mid27\mid61\mid9583
    $$

    and maps to $(4)(27)(61)(9583)$. Rotating the two $2$-cycles and the $4$-cycle, and exchanging the two cycles of length $2$, produces the other words in the same fibre.

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
    By the formal exponential identities of [exponential and logarithmic identities](counting-basics.md#prop-1-4-5),

    $$
    \exp\left(\sum_{i\ge1}t_i\frac{x^i}{i}\right)
    =
    \prod_{i\ge1}\sum_{j\ge0}t_i^j\frac{x^{ij}}{i^j j!}.
    $$

    The coefficient of $t_1^{c_1}\cdots t_n^{c_n}x^n$ is $\prod_i(i^{c_i}c_i!)^{-1}$, which equals the number in [cycle-type enumeration](#prop-2-4-2) divided by $n!$.

### Applications

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

??? proof "Direct counting proof"
    For each $k$-element subset $A\subseteq[n]$, let $I_A(w)$ be $1$ when the elements of $A$ form one cycle of $w$ and $0$ otherwise. Then

    $$
    C_k(w)=\sum_{\substack{A\subseteq[n]\\|A|=k}}I_A(w).
    $$

    A fixed set $A$ supports $(k-1)!$ cycles, and the remaining $n-k$ elements may be permuted arbitrarily, so

    $$
    \mathbb P(I_A=1)
    =
    \frac{(k-1)!(n-k)!}{n!}.
    $$

    Summing over the $\binom nk$ choices of $A$ gives $\mathbb E[C_k]=1/k$.

## Stirling Numbers

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

??? proof "Second proof: coefficient expansion and the board bijection"
    Put

    $$
    R_n(t)=t(t+1)\cdots(t+n-1).
    $$

    To obtain $t^k$, choose the constant term from exactly $n-k$ of the factors $t+a$, where $a\in[n-1]$. Therefore

    $$
    [t^k]R_n(t)
    =
    \sum_{\substack{S\subseteq[n-1]\\|S|=n-k}}
    \prod_{a\in S}a.
    \tag{2.6.1}
    $$

    The right-hand side counts the set

    $$
    \Omega_{n,k}
    =
    \left\{(S,f):
    S\in\binom{[n-1]}{n-k},\quad
    f(a)\in[a]\text{ for every }a\in S
    \right\}.
    $$

    We now construct the bijection from the board

    $$
    \Phi:\Omega_{n,k}
    \longrightarrow
    \{w\in\mathfrak S_n:C(w)=k\}.
    $$

    Given $(S,f)$, define

    $$
    T=\{j\in[n]:n-j\notin S\}.
    $$

    For each value $j\in[n]$, set

    $$
    e_j=
    \begin{cases}
    0,&j\in T,\\
    f(n-j),&j\notin T.
    \end{cases}
    $$

    Since $0\le e_j\le n-j$, insert $j=n,n-1,\ldots,1$ into the unique gap having exactly $e_j$ larger letters to its left. This produces a unique word $\widehat w$. Moreover, $e_j=0$ exactly for $j\in T$, so the left-to-right maxima of $\widehat w$ are precisely the elements of $T$. Insert cycle parentheses before these maxima by the [fundamental bijection](#def-2-3-2). The resulting permutation $w$ has $|T|=k$ cycles.

    Equivalently, if

    $$
    S=\{a_1<\cdots<a_{n-k}\},
    \qquad
    [n]\setminus T=\{b_1>\cdots>b_{n-k}\},
    $$

    then $b_i=n-a_i$, the first entries of the cycles of $w$ are the elements of $T$, and exactly $f(a_i)$ entries larger than $b_i$ precede $b_i$ in the flattened standard form. These conditions recover $S$ and $f$ from $w$, so the construction is bijective. Combining this bijection with (2.6.1) proves that $[t^k]R_n(t)=c(n,k)$ for every $k$.

    In the board example,

    $$
    n=9,
    \quad k=4,
    \quad S=\{1,3,4,6,8\},
    $$

    with

    $$
    f(1)=1,
    \quad f(3)=2,
    \quad f(4)=1,
    \quad f(6)=3,
    \quad f(8)=6.
    $$

    Then $T=\{2,4,7,9\}$ and the bijection gives

    $$
    w=(2)(4)(753)(9168).
    $$

??? proof "Third proof: cycle-index generating function"
    Specialize the cycle-index variables in [generating function for cycle indices](#thm-2-4-5) to $t_i=t$. Since $C(w)=\sum_iC_i(w)$,

    $$
    \sum_{n\ge0}\left(\sum_{w\in\mathfrak S_n}t^{C(w)}\right)\frac{x^n}{n!}
    =
    \exp\left(t\sum_{i\ge1}\frac{x^i}{i}\right).
    $$

    Using $\sum_{i\ge1}x^i/i=-\log(1-x)$ and the generalized binomial series,

    $$
    \exp\left(t\sum_{i\ge1}\frac{x^i}{i}\right)
    =
    (1-x)^{-t}
    =
    \sum_{n\ge0}
    \frac{t(t+1)\cdots(t+n-1)}{n!}x^n.
    $$

    Comparing coefficients of $x^n/n!$ yields the cycle-counting polynomial.
