# Finite Differences, Inclusion–Exclusion, and Restricted Positions

This chapter develops three mutually reinforcing inversion methods. Set partitions and the two kinds of Stirling numbers describe changes of polynomial basis; finite differences yield Newton expansion and binomial inversion; Möbius inversion on the Boolean lattice yields inclusion–exclusion. The final sections apply these tools to derangements, rook polynomials, restricted permutations, and the ménage problem.

## Set partitions and Stirling numbers of the second kind

!!! definition "Definition (Set partition)"
    <a id="def-6-1-1"></a>
    A **partition** of an $n$-element set $N$ into $k$ blocks is a collection

    $$
    \{B_1,\ldots,B_k\}
    $$

    satisfying

    $$
    B_i\ne\varnothing,
    \qquad
    B_i\cap B_j=\varnothing\quad(i\ne j),
    \qquad
    B_1\cup\cdots\cup B_k=N.
    $$

    The order of the blocks is irrelevant.

!!! definition "Definition (Stirling number of the second kind)"
    <a id="def-6-1-2"></a>
    The **Stirling number of the second kind** is

    $$
    S(n,k)
    =
    \#\{\text{partitions of }[n]\text{ into }k\text{ blocks}\}.
    $$

!!! proposition "Proposition (Surjections and set partitions)"
    <a id="prop-6-1-3"></a>
    Let $|N|=n$ and $|X|=x$. Then

    $$
    \#\{f:N\to X:f\text{ is surjective}\}
    =x!S(n,x).
    $$

??? proof "Proof"
    If $f:N\to X$ is surjective, its nonempty fibers

    $$
    \{f^{-1}(a):a\in X\}
    $$

    partition $N$ into $x$ blocks. Conversely, begin with a partition of $N$ into $x$ blocks and bijectively assign the $x$ elements of $X$ to those blocks. There are $x!$ assignments, and each one produces a unique surjection.

!!! theorem "Theorem (Monomials in the falling-factorial basis)"
    <a id="thm-6-1-4"></a>
    Define

    $$
    (x)_k=x(x-1)\cdots(x-k+1),
    \qquad
    (x)_0=1.
    $$

    Then, as a polynomial identity in $x$,

    $$
    x^n
    =
    \sum_{k=0}^n S(n,k)(x)_k.
    \tag{1}
    $$

??? proof "Proof by counting functions according to their image"
    It is enough to prove equality for every $x\in\mathbb N$, since two polynomials that agree at infinitely many values are equal.

    Let $|N|=n$ and $|X|=x$. The left-hand side counts all functions $f:N\to X$. If the image $Y=f(N)$ has cardinality $k$, then:

    1. choose $Y\subseteq X$ in $\binom{x}{k}$ ways;
    2. choose a surjection $N\to Y$ in $k!S(n,k)$ ways.

    Hence

    $$
    \#X^N
    =
    \sum_{k=0}^n\binom{x}{k}k!S(n,k)
    =
    \sum_{k=0}^nS(n,k)(x)_k.
    $$

!!! remark "Remark (Two polynomial bases)"
    <a id="rem-6-1-5"></a>
    The monomials $\{x^k:k\ge0\}$ form a basis of $\mathbb C[x]$. Equation (1) shows that the falling factorials

    $$
    \{(x)_k:k\ge0\}
    $$

    form another basis, with the Stirling numbers of the second kind as change-of-basis coefficients.

## Stirling inversion and finite differences

!!! definition "Definition (Signed Stirling numbers of the first kind)"
    <a id="def-6-2-1"></a>
    Let

    $$
    c(n,k)
    =
    \#\{w\in\mathfrak S_n:w\text{ has exactly }k\text{ cycles}\}
    $$

    be the unsigned Stirling number of the first kind, and define

    $$
    s(n,k)=(-1)^{n-k}c(n,k).
    $$

!!! proposition "Proposition (Falling factorials in the monomial basis)"
    <a id="prop-6-2-2"></a>
    One has

    $$
    (x)_n
    =
    \sum_{k=0}^n s(n,k)x^k.
    \tag{2}
    $$

??? proof "Proof from the cycle enumerator"
    Recall the cycle-counting identity

    $$
    \sum_{k=0}^n c(n,k)t^k
    =
    t(t+1)\cdots(t+n-1).
    $$

    Replace $t$ by $-x$ and multiply by $(-1)^n$. The right-hand side becomes

    $$
    (-1)^n(-x)(-x+1)\cdots(-x+n-1)
    =
    x(x-1)\cdots(x-n+1),
    $$

    while the coefficient of $x^k$ on the left becomes $(-1)^{n-k}c(n,k)=s(n,k)$.

!!! theorem "Theorem (Stirling inversion)"
    <a id="thm-6-2-3"></a>
    The lower-triangular matrices

    $$
    \mathbf S=(S(n,k))_{n,k\ge0},
    \qquad
    \mathbf s=(s(n,k))_{n,k\ge0}
    $$

    are inverses:

    $$
    \mathbf S\mathbf s
    =
    \mathbf s\mathbf S
    =I.
    $$

??? proof "Proof"
    Equation (1) changes from the falling-factorial basis to the monomial basis, while equation (2) changes back. Composing the two basis changes is the identity. Coefficient comparison therefore gives

    $$
    \sum_{j=k}^n S(n,j)s(j,k)=\delta_{nk},
    \qquad
    \sum_{j=k}^n s(n,j)S(j,k)=\delta_{nk}.
    $$

### Finite differences and Newton expansion

!!! definition "Definition (Difference and shift operators)"
    <a id="def-6-3-1"></a>
    Let $K$ be a field of characteristic $0$ and let $f:\mathbb Z\to K$ (or $f:\mathbb N\to K$). Define the forward-difference operator by

    $$
    \Delta f(n)=f(n+1)-f(n).
    $$

    Iteratively,

    $$
    \Delta^k f=\Delta(\Delta^{k-1}f),
    $$

    and $\Delta^k f(0)$ is the $k$th forward difference of $f$ at $0$.

    The shift operator $E$ is

    $$
    Ef(n)=f(n+1).
    $$

    Thus

    $$
    \Delta=E-I.
    $$

!!! proposition "Proposition (Explicit formula for a finite difference)"
    <a id="prop-6-3-2"></a>
    For $k\ge0$,

    $$
    \Delta^k f(n)
    =
    \sum_{i=0}^k(-1)^{k-i}\binom{k}{i}f(n+i).
    $$

    In particular,

    $$
    \Delta^k f(0)
    =
    \sum_{i=0}^k(-1)^{k-i}\binom{k}{i}f(i).
    $$

??? proof "Proof"
    Since $E$ commutes with the identity operator,

    $$
    \begin{aligned}
    \Delta^k f(n)
    &=(E-I)^kf(n)\\
    &=\sum_{i=0}^k(-1)^{k-i}\binom{k}{i}E^if(n)\\
    &=\sum_{i=0}^k(-1)^{k-i}\binom{k}{i}f(n+i).
    \end{aligned}
    $$

!!! theorem "Theorem (Newton's forward-difference expansion)"
    <a id="thm-6-3-3"></a>
    For every $n\in\mathbb N$,

    $$
    f(n)
    =
    \sum_{k=0}^n\binom{n}{k}\Delta^k f(0)
    =
    \sum_{k=0}^n\frac{\Delta^k f(0)}{k!}(n)_k.
    $$

??? proof "Proof"
    Because $E=I+\Delta$,

    $$
    f(n)=E^nf(0)=(I+\Delta)^nf(0)
    =\sum_{k=0}^n\binom{n}{k}\Delta^kf(0).
    $$

    The second expression follows from $\binom{n}{k}=(n)_k/k!$.

!!! remark "Remark (Continuous and discrete analogues)"
    <a id="rem-6-3-4"></a>
    The board records the following dictionary:

    | Differential calculus | Finite-difference calculus |
    |---|---|
    | $D=\dfrac{d}{dx}$ | $\Delta$ |
    | $De^x=e^x$ | $\Delta 2^n=2^n$ |
    | $Dx^n=nx^{n-1}$ | $\Delta(x)_n=n(x)_{n-1}$ |
    | $f(x)=\displaystyle\sum_{k\ge0}\dfrac{D^kf(0)}{k!}x^k$ | $f(n)=\displaystyle\sum_{k=0}^n\dfrac{\Delta^kf(0)}{k!}(n)_k$ |

    Thus Newton expansion is the discrete analogue of the Taylor expansion.

## Boolean-lattice inversion and inclusion–exclusion

!!! theorem "Theorem (Inclusion–exclusion as an inverse linear map)"
    <a id="thm-6-4-1"></a>
    Let $S$ be an $n$-element set, let $K$ be a field, and let

    $$
    V=\{f:2^S\to K\}.
    $$

    This is a $2^n$-dimensional vector space. Define $\phi:V\to V$ by

    $$
    (\phi f)(T)=\sum_{Y\supseteq T}f(Y),
    \qquad T\subseteq S.
    $$

    Then $\phi$ is invertible, and

    $$
    (\phi^{-1}f)(T)
    =
    \sum_{Y\supseteq T}(-1)^{|Y\setminus T|}f(Y).
    $$

??? proof "Proof"
    Define $\psi:V\to V$ by

    $$
    (\psi f)(T)
    =
    \sum_{Y\supseteq T}(-1)^{|Y\setminus T|}f(Y).
    $$

    Then

    $$
    \begin{aligned}
    (\psi\phi f)(T)
    &=\sum_{Y\supseteq T}(-1)^{|Y\setminus T|}(\phi f)(Y)\\
    &=\sum_{Y\supseteq T}(-1)^{|Y\setminus T|}
      \sum_{Z\supseteq Y}f(Z)\\
    &=\sum_{Z\supseteq T}
      \left(
      \sum_{Z\supseteq Y\supseteq T}(-1)^{|Y\setminus T|}
      \right)f(Z).
    \end{aligned}
    $$

    Put $m=|Z\setminus T|$. The inner sum is

    $$
    \sum_{i=0}^m(-1)^i\binom mi
    =(1-1)^m
    =\delta_{0m}.
    $$

    Only $Z=T$ remains, so $(\psi\phi f)(T)=f(T)$.

    Since $V$ is finite-dimensional and $\psi\phi=I$, both maps are invertible and $\phi\psi=I$ as well. Therefore $\psi=\phi^{-1}$.

!!! remark "Remark (One-sided inverses in finite dimension)"
    <a id="rem-6-4-2"></a>
    If $V$ is finite-dimensional and $\phi,\psi:V\to V$ are linear, then

    $$
    \psi\phi=I
    \quad\Longleftrightarrow\quad
    \phi\psi=I.
    $$

    This is why checking one composition in the preceding proof suffices.

### Exact, inclusive, and weighted property counts

Let $S$ be a set of properties that an element of a finite set $A$ may or may not satisfy. For $a\in A$, write

$$
S_a=\{s\in S:a\text{ satisfies }s\}.
$$

!!! definition "Definition (Exact and inclusive property counts)"
    <a id="def-6-5-1"></a>
    For $T\subseteq S$, define

    $$
    f_{=}(T)
    =
    \#\{a\in A:S_a=T\},
    $$

    the number of elements satisfying **exactly** the properties in $T$, and

    $$
    f_{\ge}(T)
    =
    \#\{a\in A:T\subseteq S_a\},
    $$

    the number satisfying **at least** the properties in $T$.

!!! corollary "Corollary (Inclusion–exclusion for prescribed properties)"
    <a id="cor-6-5-2"></a>
    For every $T\subseteq S$,

    $$
    f_{\ge}(T)
    =
    \sum_{Y\supseteq T}f_{=}(Y),
    $$

    and hence

    $$
    f_{=}(T)
    =
    \sum_{Y\supseteq T}(-1)^{|Y\setminus T|}f_{\ge}(Y).
    $$

    In particular,

    $$
    f_{=}(\varnothing)
    =
    \sum_{Y\subseteq S}(-1)^{|Y|}f_{\ge}(Y).
    \tag{3}
    $$

??? proof "Proof"
    An element counted by $f_{=}(Y)$ is counted by $f_{\ge}(T)$ exactly when $Y\supseteq T$. Thus $f_{\ge}=\phi f_{=}$, and [Boolean-lattice inversion](#thm-6-4-1) gives the inverse formula.

!!! example "Example (Three properties)"
    <a id="ex-6-5-3"></a>
    For $S=[3]$ and $T=\{1\}$, $f_{=}(\{1\})$ counts the region lying inside property $1$ but outside properties $2$ and $3$. Meanwhile $f_{\ge}(\{1\})$ counts the entire property-$1$ set, including all overlaps. The formula reads

    $$
    f_{=}(\{1\})
    =
    f_{\ge}(\{1\})
    -f_{\ge}(\{1,2\})
    -f_{\ge}(\{1,3\})
    +f_{\ge}(\{1,2,3\}).
    $$

!!! theorem "Theorem (Weighted inclusion–exclusion identity)"
    <a id="thm-6-5-4"></a>
    One has the polynomial identity

    $$
    \sum_{X\subseteq S}f_{=}(X)x^{|X|}
    =
    \sum_{Y\subseteq S}f_{\ge}(Y)(x-1)^{|Y|}.
    \tag{4}
    $$

    Setting $x=0$ recovers equation (3).

??? proof "Proof 1: algebraic rearrangement"
    Since $f_{\ge}(Y)=\sum_{X\supseteq Y}f_{=}(X)$,

    $$
    \begin{aligned}
    \sum_{Y\subseteq S}f_{\ge}(Y)(x-1)^{|Y|}
    &=\sum_{Y\subseteq S}\sum_{X\supseteq Y}
      f_{=}(X)(x-1)^{|Y|}\\
    &=\sum_{X\subseteq S}f_{=}(X)
      \sum_{Y\subseteq X}(x-1)^{|Y|}\\
    &=\sum_{X\subseteq S}f_{=}(X)x^{|X|}.
    \end{aligned}
    $$

??? proof "Proof 2: the board's explicit bijection"
    First fix $x\in\mathbb N$. Define

    $$
    L=\bigsqcup_{X\subseteq S}
    \{(X,a,g):S_a=X, g:X\to[x]\}.
    $$

    Then

    $$
    |L|=\sum_{X\subseteq S}f_{=}(X)x^{|X|}.
    $$

    Also define

    $$
    R=\bigsqcup_{Y\subseteq S}
    \{(Y,a,g):Y\subseteq S_a, g:Y\to[x-1]\}.
    $$

    Thus

    $$
    |R|=\sum_{Y\subseteq S}f_{\ge}(Y)(x-1)^{|Y|}.
    $$

    Define $\Phi:L\to R$ by

    $$
    \Phi(X,a,g)
    =
    \bigl(X\setminus g^{-1}(\{x\}),,a,,g|_{X\setminus g^{-1}(\{x\})}\bigr).
    $$

    In words, remove from $X$ every property colored $x$ and retain the other colors. Conversely, for $(Y,a,g)\in R$, define $h:S_a\to[x]$ by

    $$
    h(s)=
    \begin{cases}
    g(s),&s\in Y,\\
    x,&s\in S_a\setminus Y,
    \end{cases}
    $$

    and set

    $$
    \Psi(Y,a,g)=(S_a,a,h).
    $$

    The constructions $\Phi$ and $\Psi$ are inverse bijections, so (4) holds for every $x\in\mathbb N$. Both sides are polynomials in $x$, hence the identity holds identically.

## Binomial inversion and derangements

!!! theorem "Theorem (Dual Boolean-lattice inversion)"
    <a id="thm-6-6-1"></a>
    Define $\widetilde\phi:V\to V$ by

    $$
    (\widetilde\phi f)(T)
    =
    \sum_{Y\subseteq T}f(Y).
    $$

    Then

    $$
    (\widetilde\phi^{-1}f)(T)
    =
    \sum_{Y\subseteq T}(-1)^{|T\setminus Y|}f(Y).
    $$

??? proof "Proof"
    The proof is the order-dual of [Boolean-lattice inversion](#thm-6-4-1). Alternatively, replace every subset by its complement, which reverses containment.

!!! corollary "Corollary (Binomial inversion)"
    <a id="cor-6-6-2"></a>
    Suppose the exact and inclusive counts depend only on cardinality. For $|T|=i$, write

    $$
    a(n-i)=f_{=}(T),
    \qquad
    b(n-i)=f_{\ge}(T).
    $$

    Then, for $m\in[n]$,

    $$
    b(m)=\sum_{i=0}^m\binom mi a(i)
    $$

    if and only if

    $$
    a(m)=\sum_{i=0}^m(-1)^{m-i}\binom mi b(i).
    $$

    Equivalently,

    $$
    a(m)=\Delta^m b(0).
    $$

??? proof "Proof"
    Fix $T$ with $|S\setminus T|=m$. A superset $Y\supseteq T$ with $|S\setminus Y|=i$ is obtained by choosing the $i$ elements of $S\setminus T$ that remain outside $Y$, so there are $\binom mi$ such $Y$. The exact-to-inclusive relation and its inverse therefore collapse to the two displayed binomial transforms. The last equality is [the finite-difference formula](#prop-6-3-2).

### Derangements

!!! definition "Definition (Derangement number)"
    <a id="def-6-7-1"></a>
    A **derangement** is a permutation with no fixed point. Write

    $$
    D(n)
    =
    \#\{w\in\mathfrak S_n:w(i)\ne i\text{ for every }i\in[n]\}.
    $$

    The initial values recorded on the board are

    $$
    D(0)=1,
    \qquad
    D(1)=0,
    \qquad
    D(2)=1,
    \qquad
    D(3)=2.
    $$

!!! theorem "Theorem (Inclusion–exclusion formula for derangements)"
    <a id="thm-6-7-2"></a>
    For $n\ge0$,

    $$
    D(n)
    =
    \sum_{i=0}^n(-1)^{n-i}\binom ni i!
    =
    n!\sum_{j=0}^n\frac{(-1)^j}{j!}.
    $$

??? proof "Proof"
    Regard “$w(i)=i$” as property $i$ of $w\in\mathfrak S_n$. If $T\subseteq[n]$ and $|T|=i$, then

    $$
    f_{\ge}(T)
    =
    \#\{w\in\mathfrak S_n:i\in T\Rightarrow w(i)=i\}
    =(n-i)!.
    $$

    The exact count is

    $$
    f_{=}(T)
    =
    \#\{w\in\mathfrak S_n:i\in T\Longleftrightarrow w(i)=i\}
    =D(n-i).
    $$

    Thus in [binomial inversion](#cor-6-6-2), $b(m)=m!$ and $a(m)=D(m)$. Binomial inversion gives

    $$
    D(n)=\sum_{i=0}^n(-1)^{n-i}\binom ni i!.
    $$

    Replacing $i$ by $n-j$ yields the second form. In finite-difference notation,

    $$
    D(n)=\Delta^n(m!)\big|_{m=0}.
    $$

!!! corollary "Corollary (Asymptotics and exponential generating function)"
    <a id="cor-6-7-3"></a>
    One has

    $$
    \frac{D(n)}{n!}
    =
    \sum_{j=0}^n\frac{(-1)^j}{j!}
    \longrightarrow e^{-1}.
    $$

    Moreover,

    $$
    \sum_{n\ge0}D(n)\frac{x^n}{n!}
    =
    \frac{e^{-x}}{1-x}.
    $$

??? proof "Proof"
    The limit is the Taylor series for $e^{-1}$. For the exponential generating function, compare coefficients in

    $$
    \frac{e^{-x}}{1-x}
    =
    \left(\sum_{j\ge0}\frac{(-1)^jx^j}{j!}\right)
      \left(\sum_{r\ge0}x^r\right).
    $$

    The coefficient of $x^n$ is $\sum_{j=0}^n(-1)^j/j!=D(n)/n!$.

## Restricted positions and rook polynomials

!!! definition "Definition (Forbidden board and graph of a permutation)"
    <a id="def-6-8-1"></a>
    Let

    $$
    B\subseteq[n]\times[n]
    $$

    be a board of forbidden positions. For $w\in\mathfrak S_n$, define its graph by

    $$
    G(w)=\{(i,w(i)):i\in[n]\}.
    $$

    For $0\le j\le n$, let

    $$
    N_j
    =
    \#\{w\in\mathfrak S_n:|B\cap G(w)|=j\}.
    $$

    Thus $N_0$ counts the permutations that avoid every forbidden position.

!!! definition "Definition (Rook numbers and rook polynomial)"
    <a id="def-6-8-2"></a>
    Let $r_k$ be the number of $k$-element subsets of $B$ in which no two elements have a common first or second coordinate. Equivalently, $r_k$ counts placements of $k$ nonattacking rooks on $B$.

    The **rook polynomial** of $B$ is

    $$
    r_B(x)=\sum_{k\ge0}r_kx^k.
    $$

    Also define

    $$
    N_B(x)=\sum_{j=0}^nN_jx^j.
    $$

!!! theorem "Theorem (Rook-polynomial formula for restricted permutations)"
    <a id="thm-6-8-3"></a>
    One has

    $$
    N_B(x)
    =
    \sum_{k=0}^n r_k(n-k)!(x-1)^k.
    $$

    In particular,

    $$
    N_0
    =
    \sum_{k=0}^n(-1)^kr_k(n-k)!.
    $$

??? proof "Proof by double counting"
    Let

    $$
    C_k
    =
    \#\{(w,C):w\in\mathfrak S_n, C\text{ is a }k\text{-subset of }B\cap G(w)\}.
    $$

    First choose $w$. If $|B\cap G(w)|=j$, then $C$ can be chosen in $\binom jk$ ways. Hence

    $$
    C_k=\sum_{j=0}^n\binom jkN_j.
    $$

    Alternatively, first choose $C$. It must be a placement of $k$ nonattacking rooks, so there are $r_k$ choices. After prescribing those $k$ values of $w$, the permutation can be completed in $(n-k)!$ ways. Therefore

    $$
    C_k=r_k(n-k)!.
    $$

    Thus

    $$
    \sum_{j=0}^n\binom jkN_j=r_k(n-k)!.
    $$

    Multiply by $y^k$ and sum over $k$:

    $$
    \begin{aligned}
    \sum_{k=0}^ny^k\sum_{j=0}^n\binom jkN_j
    &=\sum_{j=0}^nN_j\sum_{k=0}^j\binom jky^k\\
    &=\sum_{j=0}^nN_j(1+y)^j\\
    &=\sum_{k=0}^nr_k(n-k)!y^k.
    \end{aligned}
    $$

    Substituting $y=x-1$ proves the polynomial identity; substituting $x=0$ gives the avoidance formula.

### The ménage problem

!!! example "Problem (Problème de ménages)"
    <a id="ex-6-9-1"></a>
    Define

    $$
    M(n)
    =
    \#\left\{
    w\in\mathfrak S_n:
    w(i)\ne i,
    \quad
    w(i)\ne i+1\pmod n
    \text{ for every }i\in[n]
    \right\}.
    $$

    Take the forbidden board

    $$
    B
    =
    \{(i,i):i\in[n]\}
    \cup
    \{(i,i+1\!\!\pmod n):i\in[n]\}.
    $$

    Then $M(n)=N_0$. The $2n$ cells of $B$ can be arranged cyclically so that two forbidden cells attack one another exactly when the corresponding cyclic positions are adjacent. Consequently,

    $$
    r_k
    =
    \#\{\text{$k$-subsets of a $2n$-cycle containing no adjacent positions}\}.
    $$

    The rook formula reduces the problem to determining these $r_k$ and substituting them into

    $$
    M(n)=\sum_{k=0}^n(-1)^kr_k(n-k)!.
    $$

!!! remark "Remark (Closed form for the cyclic rook numbers)"
    <a id="rem-6-9-2"></a>
    Counting independent $k$-subsets of a cycle gives

    $$
    r_k
    =
    \frac{2n}{2n-k}\binom{2n-k}{k}.
    $$

    Therefore

    $$
    M(n)
    =
    \sum_{k=0}^n
    (-1)^k
    \frac{2n}{2n-k}
    \binom{2n-k}{k}
    (n-k)!.
    $$

<!-- Source audit: all mathematical content visible in IMG_0101–IMG_0105 is retained above. -->
