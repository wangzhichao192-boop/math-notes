# $q$-Analogues, Pattern Avoidance, and Partitions

This chapter extends inversion enumeration from ordinary permutations to multiset permutations, introduces Euler numbers through alternating permutations, and connects permutation diagrams with Catalan objects. Gaussian coefficients then appear both as subspace counts and as generating polynomials for partitions in a rectangle.

## 1. Multiset permutations and $q$-multinomials

!!! definition "Definition (Permutation of a multiset)"
    <a id="def-4-1-1"></a>
    Let $M=\{1^{a_1},\ldots,m^{a_m}\}$ be a multiset on a totally ordered alphabet, with $n=a_1+\cdots+a_m$. A permutation of $M$ is a word with precisely these multiplicities. Denote the set of such words by $\mathfrak S_M$ and define inversions by the usual strict comparison of letters.

!!! definition "Definition ($q$-multinomial coefficient)"
    <a id="def-4-1-2"></a>
    For $n=a_1+\cdots+a_m$, define

    $$
    \binom{n}{a_1,\ldots,a_m}_q
    =
    \frac{[n]_q!}{[a_1]_q!\cdots[a_m]_q!}.
    $$

    The Gaussian binomial coefficient is $\binom{n}{k}_q=\binom{n}{k,n-k}_q$.

!!! theorem "Theorem (Multiset inversion enumerator)"
    <a id="thm-4-1-3"></a>
    For $M=\{1^{a_1},\ldots,m^{a_m}\}$,

    $$
    \sum_{w\in\mathfrak S_M}q^{\operatorname{inv}(w)}
    =
    \binom{n}{a_1,\ldots,a_m}_q.
    $$

??? proof "Proof"
    Put $b_i=a_1+\cdots+a_{i-1}$. Given $w\in\mathfrak S_M$ and $\sigma_i\in\mathfrak S_{a_i}$, replace the occurrences of $i$, from left to right, by

    $$
    b_i+\sigma_i(1),\ldots,b_i+\sigma_i(a_i).
    $$

    This standardization is a bijection from $\mathfrak S_M\times\prod_i\mathfrak S_{a_i}$ to $\mathfrak S_n$. Inversions between distinct blocks are those of $w$, while inversions inside block $i$ are those of $\sigma_i$. Therefore

    $$
    [n]_q!
    =
    \left(\sum_{w\in\mathfrak S_M}q^{\operatorname{inv}(w)}\right)
    \prod_{i=1}^{m}[a_i]_q!,
    $$

    and division proves the identity.

## 2. Alternating permutations and Euler numbers

!!! definition "Definition (Alternating permutation)"
    <a id="def-4-2-1"></a>
    A permutation is alternating if $w_1>w_2<w_3>w_4<\cdots$, and reverse alternating if all inequalities are reversed. The complement $w_i\mapsto n+1-w_i$ interchanges the two classes.

!!! definition "Definition (Euler number)"
    <a id="def-4-2-2"></a>
    Let $E_n$ be the common number of alternating and reverse alternating permutations in $\mathfrak S_n$, with $E_0=E_1=1$. The first values are

    $$
    1,1,1,2,5,16,61,\ldots.
    $$

!!! proposition "Proposition (Euler-number convolution)"
    <a id="prop-4-2-3"></a>
    For $n\ge1$,

    $$
    \sum_{k=0}^{n}\binom{n}{k}E_kE_{n-k}
    =
    2E_{n+1}.
    $$

??? proof "Proof"
    Choose the $k$ labels on one side of the largest entry $n+1$, choose the two alternating pieces, and place $n+1$ between them. This constructs each alternating and each reverse alternating permutation of length $n+1$ exactly once.

!!! theorem "Theorem (Euler-number generating function)"
    <a id="thm-4-2-4"></a>
    The exponential generating function is

    $$
    E(x)=\sum_{n\ge0}E_n\frac{x^n}{n!}
    =
    \sec x+\tan x.
    $$

??? proof "Proof"
    The convolution and the initial term give

    $$
    2E'(x)=E(x)^2+1,
    \qquad E(0)=1.
    $$

    The series $\sec x+\tan x$ satisfies this initial-value problem and is therefore its unique formal solution. Its even and odd parts are $\sec x$ and $\tan x$, respectively.

## 3. Rothe diagrams and 132-avoidance

!!! definition "Definition (Rothe diagram)"
    <a id="def-4-3-1"></a>
    For $w\in\mathfrak S_n$, define

    $$
    D(w)
    =
    \{(i,j)\in[n]^2:j<w_i,\ i<w^{-1}(j)\}.
    $$

    Equivalently, place dots at $(i,w_i)$ and cross out cells weakly to the right and weakly below each dot. The remaining cells form $D(w)$.

!!! proposition "Proposition (Diagram area and inversions)"
    <a id="prop-4-3-2"></a>
    Each cell $(i,j)\in D(w)$ corresponds to the inversion $(i,w^{-1}(j))$. Hence

    $$
    |D(w)|=\operatorname{inv}(w).
    $$

!!! example "Example (A Rothe diagram)"
    <a id="ex-4-3-3"></a>
    For $w=314652$, the inversion table is $(1,4,0,0,1,0)$ and $\operatorname{inv}(w)=6$. Its Rothe diagram is

    $$
    \{(1,1),(1,2),(3,2),(4,2),(4,5),(5,2)\}.
    $$

!!! definition "Definition (132-avoidance)"
    <a id="def-4-3-4"></a>
    A permutation $w$ is 132-avoiding if there are no indices $i<j<k$ such that $w_i<w_k<w_j$.

!!! theorem "Theorem (Dominant permutations)"
    <a id="thm-4-3-5"></a>
    A permutation $w\in\mathfrak S_n$ is 132-avoiding if and only if $D(w)$ is the Ferrers diagram of a partition $\lambda$ contained in the staircase

    $$
    \delta_n=(n-1,n-2,\ldots,1,0).
    $$

??? proof "Proof"
    If $i<j<k$ and $w_i<w_k<w_j$, then $(j,w_k)\in D(w)$ while $(j,w_i)\notin D(w)$. Thus row $j$ contains a cell but omits a cell to its left, so it is not a Ferrers row. Conversely, such a hole in a row recovers a 132 pattern. The bound on row $i$ is $n-i$, since every diagram cell in that row comes from a later position.

!!! corollary "Corollary (132-avoiding permutations are Catalan)"
    <a id="cor-4-3-6"></a>
    Taking the boundary of $\lambda\subseteq\delta_n$ gives a Dyck path of semilength $n$. Therefore

    $$
    \#\{w\in\mathfrak S_n:w\text{ is 132-avoiding}\}
    =
    C_n.
    $$

    The correspondence is weight-preserving:

    $$
    \sum_{\substack{w\in\mathfrak S_n\\w\text{ 132-avoiding}}}
    q^{\operatorname{inv}(w)}
    =
    \sum_{\lambda\subseteq\delta_n}q^{|\lambda|}.
    $$

## 4. Permutations and binary trees

!!! definition "Definition (Max-rooted Cartesian tree)"
    <a id="def-4-4-1"></a>
    For a word $w$ with distinct letters, define $T(w)$ recursively. Let $T(\varnothing)=\varnothing$. If the largest letter is $r$ and $w=urv$, take $r$ as the root, with left subtree $T(u)$ and right subtree $T(v)$.

!!! proposition "Proposition (Cartesian-tree bijection)"
    <a id="prop-4-4-2"></a>
    The map $w\mapsto T(w)$ is a bijection between $\mathfrak S_n$ and max-rooted labeled plane binary trees on $[n]$.

??? proof "Proof"
    Labels decrease away from the root. Conversely, inorder traversal of such a tree reads the left subtree, the root, and the right subtree, recovering the unique word $w$.

!!! remark "Remark (Full binary trees)"
    <a id="rem-4-4-3"></a>
    A binary tree is full if every vertex has either zero or two children. If the maximum splits $w$ as $urv$, then $T(w)$ is full precisely when either both $u,v$ are empty, or both are nonempty and $T(u),T(v)$ are full.

## 5. Gaussian binomial coefficients

!!! theorem "Theorem (Counting subspaces)"
    <a id="thm-4-5-1"></a>
    If $q$ is a prime power, then the number of $k$-dimensional subspaces of $\mathbb F_q^n$ is

    $$
    \binom{n}{k}_q.
    $$

??? proof "Proof"
    Count ordered linearly independent $k$-tuples in $\mathbb F_q^n$. Choosing vectors successively gives

    $$
    N(n,k)=\prod_{i=0}^{k-1}(q^n-q^i).
    $$

    Alternatively, first choose a $k$-dimensional subspace and then an ordered basis inside it. If $G(n,k)$ is the number of such subspaces, then

    $$
    N(n,k)=G(n,k)\prod_{i=0}^{k-1}(q^k-q^i).
    $$

    Consequently,

    $$
    G(n,k)
    =
    \prod_{i=0}^{k-1}\frac{q^n-q^i}{q^k-q^i}
    =
    \frac{[n]_q!}{[k]_q![n-k]_q!}
    =
    \binom{n}{k}_q.
    $$

## 6. Integer partitions

!!! definition "Definition (Partition)"
    <a id="def-4-6-1"></a>
    A partition of $n$ is a weakly decreasing sequence $\lambda=(\lambda_1,\lambda_2,\ldots)$ of nonnegative integers with finite sum $|\lambda|=n$. Its positive terms are its parts, and $\ell(\lambda)$ is the number of positive parts.

    If $m_i$ parts equal $i$, one may write $\lambda=(1^{m_1},2^{m_2},\ldots)$. For example,

    $$
    (4,4,2,2,2,1)=(1,2^3,4^2).
    $$

!!! definition "Definition (Partition-counting functions)"
    <a id="def-4-6-2"></a>
    Write

    $$
    p(n)=\#\{\lambda:|\lambda|=n\},
    \qquad
    p_k(n)=\#\{\lambda:|\lambda|=n,\ \ell(\lambda)=k\}.
    $$

    Let $p(j,k,n)$ count partitions of $n$ with at most $k$ parts and largest part at most $j$.

!!! example "Example (Partitions of five)"
    <a id="ex-4-6-3"></a>
    The seven partitions of $5$ are

    $$
    5,\ 4+1,\ 3+2,\ 3+1+1,\ 2+2+1,\ 2+1+1+1,\ 1+1+1+1+1.
    $$

!!! proposition "Proposition (Recurrence by the smallest part)"
    <a id="prop-4-6-4"></a>
    For $n,k\ge1$,

    $$
    p_k(n)=p_{k-1}(n-1)+p_k(n-k).
    $$

??? proof "Proof"
    If a partition into exactly $k$ parts has a part equal to $1$, delete one such part. Otherwise subtract $1$ from every part. These operations give partitions counted by $p_{k-1}(n-1)$ and $p_k(n-k)$, respectively, and both are reversible.

!!! definition "Definition (Ferrers diagram)"
    <a id="def-4-6-5"></a>
    The Ferrers diagram of $\lambda=(\lambda_1,\ldots,\lambda_r)$ has $r$ left-justified rows, with $\lambda_i$ cells in row $i$. It fits in a $k\times j$ rectangle exactly when $\ell(\lambda)\le k$ and $\lambda_1\le j$.

## 7. Partitions in a rectangle

!!! theorem "Theorem (Gaussian polynomial as an area enumerator)"
    <a id="thm-4-7-1"></a>
    For positive integers $j,k$,

    $$
    \sum_{n\ge0}p(j,k,n)q^n
    =
    \binom{j+k}{j}_q
    =
    \binom{j+k}{k}_q.
    $$

??? proof "Proof"
    Consider words in the multiset $\{1^j,2^k\}$. For each occurrence of $2$, record the number of $1$'s to its right. Reading the $2$'s from left to right produces a weakly decreasing sequence

    $$
    j\ge\lambda_1\ge\cdots\ge\lambda_k\ge0.
    $$

    This is a partition inside a $k\times j$ rectangle, and every such partition arises uniquely. Each pair consisting of a $2$ followed by a $1$ is both an inversion and one cell of the diagram, so $\operatorname{inv}(w)=|\lambda|$. The result now follows from [Theorem 4.1.3](#thm-4-1-3).
