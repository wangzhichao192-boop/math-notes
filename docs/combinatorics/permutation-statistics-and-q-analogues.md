# Permutation Statistics, Catalan Structures, and $q$-Analogues

This chapter studies statistics on permutations and the generating polynomials that record them. Inversion tables produce the $q$-factorial, Foata's transformation relates inversions to the major index, and a first-return decomposition leads to the Catalan recurrence and generating function.

## Inversions and inversion tables

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

## The $q$-factorial

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
    By [inversion-table bijection](#thm-3-1-3),

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

## Descents

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

## The major index

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

## Dyck paths and Catalan numbers

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
    The recurrence gives $(C(X)-1)/X=C(X)^2$. Of the two quadratic roots, only the displayed one has constant term $1$. Expanding $(1-4X)^{1/2}$ by [generalized powers](formal-generating-and-enumeration.md#def-1-4-6) yields the coefficient formula.

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

## Permutation plots and pattern avoidance

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

<!-- Source audit: all mathematical content visible in the supplied lecture photographs is retained above. -->

This chapter extends inversion enumeration from ordinary permutations to multiset permutations, introduces Euler numbers through alternating permutations, and connects permutation diagrams with Catalan objects. Gaussian coefficients then appear both as subspace counts and as generating polynomials for partitions in a rectangle.

## Multiset permutations and $q$-multinomials

!!! definition "Definition (Permutation of a multiset)"
    <a id="def-4-1-1"></a>
    Let $M=\{1^{a_1},\ldots,m^{a_m}\}$ be a multiset on a totally ordered alphabet, with $n=a_1+\cdots+a_m$. A permutation of $M$ is a word with precisely these multiplicities. Denote the set of such words by $\mathfrak S_M$ and define inversions by the usual strict comparison of letters.

    At $q=1$, the number of such words is

    $$
    |\mathfrak S_M|
    =
    \binom{n}{a_1,\ldots,a_m}
    =
    \frac{n!}{a_1!\cdots a_m!}.
    $$

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

    In particular, although the defining quotient for the $q$-multinomial coefficient initially looks rational, this inversion enumerator proves that it is a polynomial in $q$ with nonnegative integer coefficients.

## Alternating permutations and Euler numbers

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

    Indeed,

    $$
    \frac{d}{dx}(\sec x+\tan x)
    =
    \sec x\tan x+\sec^2x
    =
    \frac{(\sec x+\tan x)^2+1}{2}.
    $$

    The differential equation recursively determines the coefficient of $x^{n+1}$ from the coefficients through degree $n$, so the formal solution with constant term $1$ is unique. Separating even and odd powers gives

    $$
    \sum_{n\ge0}E_{2n}\frac{x^{2n}}{(2n)!}=\sec x,
    \qquad
    \sum_{n\ge0}E_{2n+1}\frac{x^{2n+1}}{(2n+1)!}=\tan x.
    $$

## Rothe diagrams and 132-avoidance

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

    For the converse in detail, suppose row $j$ contains $(j,b)$ but omits $(j,a)$ with $a<b$. The present cell gives $j<w^{-1}(b)$ and $w_j>b$. If the omitted cell is not excluded by $a\ge w_j$, which is impossible because $a<b<w_j$, it must be excluded by $w^{-1}(a)<j$. Thus

    $$
    w^{-1}(a)<j<w^{-1}(b),
    \qquad
    a<b<w_j,
    $$

    and the entries in these three positions form a 132 pattern.

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

## Permutations and binary trees

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

    The board also posed two further structural questions: which letters of $w$ become leaves of $T(w)$, and which letters become vertices with exactly one child? They can be answered recursively from the same decomposition $w=urv$: the root is a leaf exactly when $u=v=\varnothing$, and it has exactly one child exactly when precisely one of $u,v$ is empty; the question then repeats independently inside the nonempty subwords.

## Gaussian binomial coefficients

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

## Integer partitions

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

    The initial values recorded on the board include

    $$
    p_0(0)=1,
    \qquad
    p_0(n)=0\quad(n\ge1),
    $$

    $$
    p_1(n)=1\quad(n\ge1),
    \qquad
    p_2(n)=\left\lfloor\frac n2\right\rfloor.
    $$

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

    For example, $\lambda=(4,3,3,1)$ has diagram

    ```text
    ■ ■ ■ ■
    ■ ■ ■
    ■ ■ ■
    ■
    ```

    and therefore $|\lambda|=11$.

## Partitions in a rectangle

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

    This is a partition inside a $k\times j$ rectangle, and every such partition arises uniquely. Each pair consisting of a $2$ followed by a $1$ is both an inversion and one cell of the diagram, so $\operatorname{inv}(w)=|\lambda|$. The result now follows from [multiset inversion enumerator](#thm-4-1-3).
