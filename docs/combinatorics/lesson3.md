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

## 2. The $q$-factorial

!!! definition "Definition ($q$-integer and $q$-factorial)"
    <a id="def-3-2-1"></a>
    Define

    $$
    [m]_q=1+q+\cdots+q^{m-1}=\frac{1-q^m}{1-q},
    \qquad
    [n]_q!=\prod_{m=1}^{n}[m]_q.
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

    The construction is reversible. The last letter of $\gamma_{k+1}$ is $x$, and the first remaining letter determines which comparison case occurred; reversing the block rotations recovers $\gamma_k$. Thus $\Phi(w)=\gamma_n$ is a bijection satisfying $\operatorname{inv}(\Phi(w))=\operatorname{maj}(w)$.

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

??? proof "Proof"
    The recurrence gives $(C(X)-1)/X=C(X)^2$. Of the two quadratic roots, only the displayed one has constant term $1$. Expanding $(1-4X)^{1/2}$ by [Definition 1.4.6](lesson1.md#def-1-4-6) yields the coefficient formula.

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

