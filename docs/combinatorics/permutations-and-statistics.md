# Permutations, Cycles, and Statistics

This chapter studies permutations through their cycle structure, inversion statistics, descent statistics, and alternating patterns. The two polynomial bases arising from cycles lead to Stirling numbers of the first kind, while inversion enumeration produces $q$-factorials and $q$-multinomial coefficients; Foata's transformation and Euler numbers supply the principal equidistribution and alternating-permutation results.

## Cycles and Stirling numbers of the first kind

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

### Stirling numbers of the first kind

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
    Specialize the cycle-index variables in [the cycle-index generating function](#thm-2-4-5) to $t_i=t$. Since $C(w)=\sum_iC_i(w)$,

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

## Cycle type and the cycle index

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
    By the formal exponential identities of [the formal exponential identities](enumerative-foundations.md#prop-1-4-5),

    $$
    \exp\left(\sum_{i\ge1}t_i\frac{x^i}{i}\right)
    =
    \prod_{i\ge1}\sum_{j\ge0}t_i^j\frac{x^{ij}}{i^j j!}.
    $$

    The coefficient of $t_1^{c_1}\cdots t_n^{c_n}x^n$ is $\prod_i(i^{c_i}c_i!)^{-1}$, which equals the number in [the cycle-type counting formula](#prop-2-4-2) divided by $n!$.

### Applications of the cycle index

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

## Inversions and the $q$-factorial

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

### The $q$-factorial

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
    By [the inversion-table bijection](#thm-3-1-3),

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

## Descents and the major index

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

### The major index

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

## Multiset and alternating permutations

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

### Alternating permutations and Euler numbers

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

<!-- Structural audit: this chapter preserves all mathematical content from Sections 3–6 of Lecture 2, Sections 1–4 of Lecture 3, and Sections 1–2 of Lecture 4. -->
