# Formal Power Series and Generating Functions

Enumerative combinatorics asks for the cardinalities of finite families and for algebraic structures that encode them. This chapter introduces formal power series, their coefficientwise topology, and the ordinary and exponential generating functions used throughout the subject.

## 1. Forms of enumeration

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

## 2. The ring of formal power series

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

## 3. Valuation and formal convergence

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

!!! remark "Remark (Coefficientwise meaning of convergence)"
    <a id="rem-1-3-3"></a>
    The metric $d(f,g)=|f-g|$ makes $\mathbb C[[X]]$ complete. A sequence $f_N$ converges to $f$ precisely when, for every fixed $k$, the coefficient $[X^k]f_N$ eventually equals $[X^k]f$. In particular, $|f-g|<2^{-N}$ exactly when the coefficients through degree $N$ agree.

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

## 4. Formal substitution and calculus

!!! definition "Definition (Composition)"
    <a id="def-1-4-1"></a>
    If $f(X)=\sum_{n\ge0}a_nX^n$ and $g(X)\in X\mathbb C[[X]]$, define

    $$
    (f\circ g)(X)=f(g(X))=\sum_{n\ge0}a_ng(X)^n.
    $$

    This is well-defined because $\operatorname{val}(g^n)\to+\infty$. The condition $g(0)=0$ is essential when $f$ has infinitely many nonzero coefficients.

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

!!! definition "Definition (Formal derivative)"
    <a id="def-1-4-7"></a>
    For $f(X)=\sum_{n\ge0}a_nX^n$, define

    $$
    f'(X)=\sum_{n\ge0}(n+1)a_{n+1}X^n.
    $$

    Formal differentiation satisfies linearity, the product rule, and the chain rule $(f\circ g)'=g'(f'\circ g)$ whenever the composition is defined.

## 5. Extracting enumerative identities

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
