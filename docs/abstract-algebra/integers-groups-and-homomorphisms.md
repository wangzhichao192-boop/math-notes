# Integers, Groups, and Homomorphisms

The arithmetic of the integers supplies the first examples of algorithms,
quotients, and structure-preserving maps. We pass from Euclidean division and
Bézout identities to congruences, then isolate reversible composition in the
definition of a group and study the maps that preserve it.

## Divisibility and the Euclidean Algorithm

!!! definition "Definition (Divisibility and greatest common divisor)"
    <a id="def-divisibility-gcd"></a>
    For $a,d \in \mathbb{Z}$, write $d \mid a$ if $a=dk$ for some
    $k \in \mathbb{Z}$. If $a,b$ are not both zero, their **greatest common
    divisor** is the unique positive integer $\gcd(a,b)$ such that

    + $\gcd(a,b)$ divides both $a$ and $b$;
    + every common divisor of $a$ and $b$ divides $\gcd(a,b)$.

    The integers $a,b$ are **coprime** if $\gcd(a,b)=1$. For positive
    $a,b$, their **least common multiple** $\operatorname{lcm}(a,b)$ is
    the unique positive integer divisible by both $a,b$ and dividing every
    common multiple of them.

!!! theorem "Theorem (Division algorithm)"
    <a id="thm-division-algorithm"></a>
    For $a \in \mathbb{Z}$ and $b \in \mathbb{Z}_{>0}$, there are unique
    $q,r \in \mathbb{Z}$ such that

    $$
    a=bq+r, \qquad 0 \leq r<b.
    $$

??? proof "Proof"
    The set $S=\{a-bk \mid k \in \mathbb{Z},\ a-bk \geq 0\}$ is nonempty.
    Let $r=a-bq$ be its least element. If $r \geq b$, then
    $r-b=a-b(q+1)$ is a smaller element of $S$, so $r<b$.

    If $a=bq+r=bq'+r'$ with both remainders in $[0,b)$, then
    $b(q-q')=r'-r$. Since $|r'-r|<b$, both sides vanish; hence
    $q=q'$ and $r=r'$.

!!! theorem "Theorem (Euclidean algorithm)"
    <a id="thm-euclidean-algorithm"></a>
    Let $a,b \in \mathbb{Z}$ be not both zero. Starting with
    $r_0=|a|$ and $r_1=|b|$, repeatedly divide

    $$
    r_{i-1}=q_i r_i+r_{i+1}, \qquad 0 \leq r_{i+1}<r_i.
    $$

    The process terminates, and the last nonzero remainder is
    $\gcd(a,b)$.

??? proof "Proof"
    The nonzero remainders form a strictly decreasing sequence of positive
    integers, so the process terminates. Moreover,
    $r_{i+1}=r_{i-1}-q_i r_i$ shows that $(r_{i-1},r_i)$ and
    $(r_i,r_{i+1})$ have the same common divisors. The last pair is
    $(r_s,0)$, whose common divisors are precisely the divisors of $r_s$.

!!! example "Example (Extended Euclidean algorithm)"
    <a id="ex-extended-euclidean-algorithm"></a>
    The divisions

    $$
    527=341+186, \quad 341=186+155, \quad
    186=155+31, \quad 155=5\cdot31
    $$

    give $\gcd(527,341)=31$. Back-substitution gives the certificate

    $$
    31=186-155=2\cdot527-3\cdot341.
    $$

    In general, carrying coefficients
    $r_i=s_i|a|+t_i|b|$ through the recurrence computes such a certificate
    together with the gcd.

## Bézout Identities and Prime Factorization

!!! theorem "Theorem (Bézout's identity)"
    <a id="thm-bezout-identity"></a>
    If $a,b \in \mathbb{Z}$ are not both zero and $d=\gcd(a,b)$, then
    there exist $u,v \in \mathbb{Z}$ such that

    $$
    d=ua+vb.
    $$

    More precisely,
    $\{ua+vb \mid u,v \in \mathbb{Z}\}=d\mathbb{Z}$.

??? proof "Proof"
    Let $I=\{ua+vb \mid u,v \in \mathbb{Z}\}$ and let $c$ be its least
    positive element. Divide any $x \in I$ by $c$. The remainder is again
    in $I$, so minimality forces it to be zero. Thus $c$ divides every
    element of $I$, in particular $a$ and $b$. Conversely, every common
    divisor of $a,b$ divides $c$. Hence $c=d$, and the equality of sets
    follows.

!!! corollary "Corollary (Linear Diophantine equations)"
    <a id="cor-linear-diophantine"></a>
    The equation $ax+by=c$ has an integer solution if and only if
    $\gcd(a,b) \mid c$. In particular, $a,b$ are coprime if and only if
    $ua+vb=1$ for some $u,v \in \mathbb{Z}$.

!!! lemma "Lemma (Coprime cancellation)"
    <a id="lem-coprime-cancellation"></a>
    If $\gcd(c,a)=1$ and $c \mid ab$, then $c \mid b$.

??? proof "Proof"
    Choose $u,v \in \mathbb{Z}$ with $uc+va=1$. Multiplying by $b$ gives
    $b=ucb+vab$, and both terms on the right are divisible by $c$.

!!! lemma "Lemma (Euclid's lemma)"
    <a id="lem-euclid"></a>
    If $p$ is prime and $p \mid ab$, then $p \mid a$ or $p \mid b$.

??? proof "Proof"
    If $p \nmid a$, then $\gcd(p,a)=1$ because $p$ is prime. Apply
    [coprime cancellation](#lem-coprime-cancellation).

!!! theorem "Theorem (Fundamental theorem of arithmetic)"
    <a id="thm-fundamental-arithmetic"></a>
    Every nonzero integer has a factorization

    $$
    n=\varepsilon p_1\cdots p_r,
    \qquad
    \varepsilon \in \{-1,1\}, \quad p_1\leq\cdots\leq p_r,
    $$

    where the $p_i$ are prime. The sign and ordered list of primes are
    unique; for $n=\pm1$ the list is empty.

??? proof "Proof"
    If some $m\geq2$ were not a product of primes, take the least such
    $m$. It is composite, say $m=ab$ with $1<a,b<m$; minimality factors
    both $a$ and $b$, a contradiction.

    For uniqueness, if $p_1\cdots p_r=q_1\cdots q_s$, Euclid's lemma makes
    $p_1$ divide some $q_j$. Since both are prime, they are equal. Cancel
    this factor and continue.

!!! corollary "Corollary (Infinitely many primes)"
    <a id="cor-infinitely-many-primes"></a>
    There are infinitely many prime numbers.

??? proof "Proof"
    If $p_1,\ldots,p_r$ were all primes, a prime divisor of
    $p_1\cdots p_r+1$ would divide both that number and $p_1\cdots p_r$,
    hence also $1$.

## Congruences and the Chinese Remainder Theorem

!!! definition "Definition (Congruence and residue classes)"
    <a id="def-congruence"></a>
    For $n \in \mathbb{Z}_{>0}$, define

    $$
    a\equiv b \pmod n
    \quad\Longleftrightarrow\quad
    n\mid(a-b).
    $$

    This is an equivalence relation. Its quotient is
    $\mathbb{Z}/n\mathbb{Z}=\{[a]_n \mid a\in\mathbb{Z}\}$, and every
    class has a unique representative in $\{0,\ldots,n-1\}$.

!!! proposition "Proposition (Arithmetic of residue classes)"
    <a id="prop-residue-arithmetic"></a>
    The formulas

    $$
    [a]_n+[b]_n=[a+b]_n,
    \qquad
    [a]_n[b]_n=[ab]_n
    $$

    define operations on $\mathbb{Z}/n\mathbb{Z}$.

??? proof "Proof"
    If $a\equiv a'$ and $b\equiv b'$ modulo $n$, then
    $(a+b)-(a'+b')=(a-a')+(b-b')$ and
    $ab-a'b'=a(b-b')+b'(a-a')$ are divisible by $n$. Hence both formulas
    are independent of representatives, by the
    [operation-descent criterion](lesson1.md#prop-1-8-2).

!!! theorem "Theorem (Linear congruence criterion)"
    <a id="thm-linear-congruence"></a>
    Let $d=\gcd(a,n)$. The congruence

    $$
    ax\equiv b\pmod n
    $$

    has a solution if and only if $d\mid b$. When solvable, it has exactly
    $d$ solutions modulo $n$.

??? proof "Proof"
    Solvability is equivalent to $ax-ny=b$ for some $x,y\in\mathbb Z$,
    hence to $d\mid b$ by the
    [linear Diophantine criterion](#cor-linear-diophantine). Write
    $a=da'$, $n=dn'$, and $b=db'$. Since $\gcd(a',n')=1$, the reduced
    congruence has one solution modulo $n'$. It gives the $d$ distinct
    classes $x_0,x_0+n',\ldots,x_0+(d-1)n'$ modulo $n$.

!!! corollary "Corollary (Modular inverses)"
    <a id="cor-modular-inverse"></a>
    The class $[a]_n$ is invertible under multiplication if and only if
    $\gcd(a,n)=1$. If $ua+vn=1$, then $[u]_n=[a]_n^{-1}$.

!!! example "Example (Computing a modular inverse)"
    <a id="ex-modular-inverse"></a>
    Since $1=11\cdot101-30\cdot37$, the inverse of $[37]_{101}$ is
    $[-30]_{101}=[71]_{101}$. Therefore
    $37x\equiv12\pmod{101}$ has solution $x\equiv44\pmod{101}$.

!!! theorem "Theorem (Chinese remainder theorem)"
    <a id="thm-chinese-remainder"></a>
    If $m,n\geq2$ are coprime, then

    $$
    \Phi:\mathbb{Z}/(mn)\mathbb{Z}
    \longrightarrow
    \mathbb{Z}/m\mathbb{Z}\times\mathbb{Z}/n\mathbb{Z},
    \qquad
    [x]_{mn}\longmapsto([x]_m,[x]_n)
    $$

    is a bijection preserving addition and multiplication. If
    $rm+sn=1$, its inverse is

    $$
    ([a]_m,[b]_n)
    \longmapsto
    [asn+brm]_{mn}.
    $$

??? proof "Proof"
    The coefficients $sn$ and $rm$ have residues $(1,0)$ and $(0,1)$
    modulo $(m,n)$, so the inverse formula has the prescribed residues and
    is independent of representatives. If $x$ and $y$ have equal residues
    modulo both $m$ and $n$, coprimality implies $mn\mid(x-y)$; hence
    $[x]_{mn}=[y]_{mn}$.

!!! example "Example (CRT reconstruction)"
    <a id="ex-crt-reconstruction"></a>
    To solve $x\equiv4\pmod7$ and $x\equiv3\pmod5$, use
    $-2\cdot7+3\cdot5=1$. Then

    $$
    x\equiv4\cdot15+3(-14)=18\pmod{35}.
    $$

## Groups and Element Orders

!!! definition "Definition (Group)"
    <a id="def-group"></a>
    A **group** is a set $G$ with a binary operation
    $(x,y)\mapsto xy$ such that

    + $(xy)z=x(yz)$ for all $x,y,z\in G$;
    + there is an identity $e\in G$ with $ex=xe=x$ for every $x\in G$;
    + every $x\in G$ has an inverse $x^{-1}\in G$ satisfying
      $xx^{-1}=x^{-1}x=e$.

    The group is **abelian** if $xy=yx$ for all $x,y\in G$.

!!! proposition "Proposition (Basic group identities)"
    <a id="prop-basic-group-identities"></a>
    In a group, the identity and every inverse are unique. Moreover,

    $$
    (xy)^{-1}=y^{-1}x^{-1},
    $$

    and both cancellation laws hold. Hence $ax=b$ and $ya=b$ have the
    unique solutions $x=a^{-1}b$ and $y=ba^{-1}$.

??? proof "Proof"
    If $e,e'$ are identities, then $e=ee'=e'$. If $y,z$ are both inverses
    of $x$, then $y=y(xz)=(yx)z=z$. Direct multiplication shows that
    $y^{-1}x^{-1}$ is the inverse of $xy$. Multiplying an equality by an
    inverse gives cancellation and the two solution formulas.

!!! definition "Definition (Powers and element order)"
    <a id="def-powers-order"></a>
    For $g\in G$, put $g^0=e$, define $g^n$ by repeated multiplication for
    $n>0$, and set $g^{-n}=(g^{-1})^n$. Then

    $$
    g^m g^n=g^{m+n},
    \qquad
    (g^m)^n=g^{mn},
    \qquad
    (g^n)^{-1}=g^{-n}.
    $$

    The **order** $\operatorname{ord}(g)$ is the least positive $r$ with
    $g^r=e$, if such an $r$ exists; otherwise $g$ has infinite order. The
    order of $G$ is its cardinality $|G|$.

!!! proposition "Proposition (Order criterion)"
    <a id="prop-order-criterion"></a>
    If $\operatorname{ord}(g)=r<\infty$, then

    $$
    g^m=e \iff r\mid m,
    \qquad
    g^m=g^n \iff m\equiv n\pmod r.
    $$

??? proof "Proof"
    Divide $m=qr+s$ with $0\leq s<r$. Then $g^m=g^s$, which equals $e$
    exactly when $s=0$ by minimality of $r$. Apply this to $m-n$ for the
    second equivalence.

!!! remark "Remark (Order matters)"
    <a id="rem-order-matters"></a>
    In a nonabelian group, solving $axb=c$ gives
    $x=a^{-1}cb^{-1}$; symbols cannot be moved as if they commuted.
    Likewise, $(xy)^{-1}=y^{-1}x^{-1}$, and generally
    $(xy)^n\neq x^ny^n$.

## Arithmetic and Permutation Groups

!!! example "Example (Additive residue groups)"
    <a id="ex-additive-residue-groups"></a>
    The integers form an abelian group under addition. For $n\geq1$,
    $\mathbb{Z}/n\mathbb{Z}$ is an abelian group under addition, and

    $$
    \operatorname{ord}([a]_n)=\frac{n}{\gcd(a,n)}.
    $$

!!! definition "Definition (Group of units)"
    <a id="def-group-of-units"></a>
    The **group of units modulo $n$** is

    $$
    U(n)=\{[a]_n\in\mathbb{Z}/n\mathbb{Z}
    \mid \gcd(a,n)=1\},
    $$

    with multiplication modulo $n$.

!!! proposition "Proposition (Units form a group)"
    <a id="prop-units-group"></a>
    The set $U(n)$ is an abelian group under multiplication.

??? proof "Proof"
    Euclid's lemma shows that the product of two classes coprime to $n$
    remains coprime to $n$. Associativity and commutativity descend from
    integer multiplication, and $[1]_n$ is the identity. Bézout's identity
    supplies an inverse for every element.

!!! definition "Definition (Permutation group)"
    <a id="def-permutation-group"></a>
    A **permutation** of a set $X$ is a bijection $X\to X$. The set of all
    permutations is the group $\operatorname{Sym}(X)$ under composition.
    If $X=\{1,\ldots,n\}$, write $S_n$.
!!! remark "Remark"
    A permutation $\sigma\in S_n$ can be written in **two-line notation**:

    $$
    \sigma=\begin{pmatrix} 1&2&\cdots&n \\ \sigma(1)&\sigma(2)&\cdots&\sigma(n) \end{pmatrix}.
    $$

    It is often more convenient to use **cycle notation**: a cycle $(a_1a_2\cdots a_k)$ means

    $$
    a_1\mapsto a_2,\quad a_2\mapsto a_3,\quad a_2\mapsto a_3,\quad a_k\mapsto a_1,
    $$

    while all other elements are fixed. Disjoint cycles may be written next to each other, and fixed points are usually omitted.
    For example, $\sigma=\left(\begin{smallmatrix}1&2&3&4&5\\2&3&1&5&4\end{smallmatrix}\right)$ can be wrote as $\sigma=(123)(45)$.  



!!! example "Example (Noncommutativity of $S_3$)"
    <a id="ex-s3-noncommutative"></a>
    With the rightmost permutation acting first,

    $$
    (12)(23)=(123),
    \qquad
    (23)(12)=(132).
    $$

    Hence $S_3$ is nonabelian.

!!! proposition "Proposition (Disjoint-cycle decomposition)"
    <a id="prop-disjoint-cycles"></a>
    Every permutation in $S_n$ is a product of pairwise disjoint cycles.
    The cycles are unique up to their order and cyclic rotation of their
    entries. If their lengths are $\ell_1,\ldots,\ell_r$, then

    $$
    \operatorname{ord}(\sigma)=\operatorname{lcm}(\ell_1,\ldots,\ell_r).
    $$

??? proof "Proof"
    For each point $a$, follow the finite orbit
    $a,\sigma(a),\sigma^2(a),\ldots$. Injectivity makes the first repeated
    point equal to $a$, producing one cycle. Repeating on unused points
    yields disjoint cycles covering the set. The power $\sigma^k$ fixes
    every point exactly when every cycle length divides $k$.

## Homomorphisms and Cayley's Theorem

!!! definition "Definition (Homomorphism and isomorphism)"
    <a id="def-homomorphism"></a>
    A map $f:G\to H$ is a **group homomorphism** if
    $f(xy)=f(x)f(y)$ for all $x,y\in G$. A bijective homomorphism is an
    **isomorphism**; in this case write $G\cong H$. An isomorphism
    $G\to G$ is an **automorphism**.
    
    We write $\operatorname{Hom}(G,H)$ for the set of group homomorphisms $G\to H$, and $\operatorname{Aut}(G)$ for the group of automorphisms $G\to G$, with composition as the group operation.

!!! proposition "Proposition (Preservation laws)"
    <a id="prop-homomorphism-preservation"></a>
    If $f:G\to H$ is a homomorphism, then

    $$
    f(e_G)=e_H,
    \qquad
    f(x^{-1})=f(x)^{-1},
    \qquad
    f(x^n)=f(x)^n
    $$

    for every $x\in G$ and $n\in\mathbb{Z}$.

??? proof "Proof"
    From $f(e_G)=f(e_G)^2$, cancellation gives $f(e_G)=e_H$.
    Applying $f$ to $xx^{-1}=e_G$ gives the inverse formula, and the power
    formula follows by induction and inverses.

!!! definition "Definition (Kernel and image)"
    <a id="def-kernel-image"></a>
    For a homomorphism $f:G\to H$, define

    $$
    \ker f=\{g\in G\mid f(g)=e_H\},
    \qquad
    \operatorname{im}f=\{f(g)\mid g\in G\}.
    $$

!!! proposition "Proposition (Kernel test for injectivity)"
    <a id="prop-kernel-injectivity"></a>
    A homomorphism $f:G\to H$ is injective if and only if
    $\ker f=\{e_G\}$. More generally,

    $$
    f(x)=f(y) \iff x^{-1}y\in\ker f.
    $$

??? proof "Proof"
    If $f$ is injective, $f(g)=e_H=f(e_G)$ implies $g=e_G$. Conversely,
    if the kernel is trivial and $f(x)=f(y)$, then
    $f(x^{-1}y)=e_H$, so $x^{-1}y=e_G$ and $x=y$.

!!! proposition "Proposition (Orders under homomorphisms)"
    <a id="prop-orders-under-homomorphisms"></a>
    If $g$ has finite order, then
    $\operatorname{ord}(f(g))$ divides $\operatorname{ord}(g)$. Equality
    holds when $f$ is injective.

!!! theorem "Theorem (Universal role of the integers)"
    <a id="thm-hom-from-integers"></a>
    Evaluation at $1$ gives a bijection

    $$
    \operatorname{Hom}(\mathbb{Z},G)\longrightarrow G,
    \qquad f\longmapsto f(1).
    $$

    For $n>0$, evaluation at $[1]_n$ gives a bijection

    $$
    \operatorname{Hom}(\mathbb{Z}/n\mathbb{Z},G)
    \longrightarrow
    \{g\in G\mid g^n=e\}.
    $$

??? proof "Proof"
    A homomorphism $\mathbb{Z}\to G$ is uniquely determined by
    $g=f(1)$ and has the form $f(k)=g^k$. For
    $\mathbb{Z}/n\mathbb{Z}$, the same formula is well-defined exactly
    when $g^n=e$.

!!! example "Example (Reduction and conjugation)"
    <a id="ex-reduction-conjugation"></a>
    The reduction map $\mathbb{Z}\to\mathbb{Z}/n\mathbb{Z}$ is a
    surjective homomorphism with kernel $n\mathbb{Z}$. For $g\in G$,
    conjugation $c_g(x)=gxg^{-1}$ is an automorphism; the homomorphism
    $g\mapsto c_g$ from $G$ to $\operatorname{Aut}(G)$ has kernel

    $$
    Z(G)=\{g\in G\mid gx=xg\text{ for every }x\in G\},
    $$

    the **center** of $G$.

!!! theorem "Theorem (Cayley)"
    <a id="thm-cayley"></a>
    Every group $G$ admits an injective homomorphism

    $$
    L:G\longrightarrow\operatorname{Sym}(G),
    \qquad
    g\longmapsto L_g,
    \qquad
    L_g(x)=gx.
    $$

    Hence every group is isomorphic to a group of permutations.

??? proof "Proof"
    Each $L_g$ is bijective with inverse $L_{g^{-1}}$, and
    $L_g\circ L_h=L_{gh}$, so $L$ is a homomorphism. If $L_g=L_h$,
    evaluating at $e$ gives $g=h$; hence $L$ is injective.
