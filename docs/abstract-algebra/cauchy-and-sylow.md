# Cauchy's Theorem and Sylow Theory

[Lagrange's theorem](subgroups-and-quotients.md#thm-lagrange) restricts
subgroup orders to divisors of the group order. Cauchy's theorem gives
subgroups of prime order, and Sylow's theorems give subgroups of the largest
possible prime power order, compare them, and constrain their number. The
proofs use group actions to turn fixed points into subgroup information.

!!! notation "Notation (Finite groups and cyclic groups)"
    Throughout this chapter all groups are finite, $p$ is a prime, and
    actions are left actions. Write $C_n$ for a
    [cyclic group](subgroups-and-quotients.md#def-cyclic-group) of order $n$.
    For $H\leq G$, the set $G/H$ consists of left cosets and
    $[G:H]=|G/H|$ is its index; it is a quotient group only when
    $H\trianglelefteq G$.

## Cauchy's Theorem

The basic counting fact is that a prime power group has orbit sizes that
are either one or divisible by the prime. A suitable action then detects
elements of prime order.

!!! definition "Definition (Finite p-group)"
    <a id="def-p-group"></a>
    A **$p$-group** is a finite group of order $p^a$ for an integer
    $a\geq0$. A **$p$-subgroup** of $G$ is a subgroup that is a
    $p$-group. The trivial group is a $p$-group for every prime $p$.

!!! example "Example (Products, subgroups, and quotients)"
    <a id="ex-p-group-constructions"></a>
    The cyclic group $C_{p^a}$ is a $p$-group, and $r$ copies have direct
    product of order $p^{ar}$. More generally, if $|P_i|=p^{a_i}$, then

    $$
    |P_1\times\cdots\times P_r|=p^{a_1+\cdots+a_r}.
    $$

    Thus finite direct products of $p$-groups are $p$-groups. Every
    subgroup of a $p$-group is a $p$-group by Lagrange's theorem, as is
    every quotient by a normal subgroup, since its order divides the
    original group order.

!!! lemma "Lemma (Fixed-point congruence)"
    <a id="lem-p-group-fixed-points"></a>
    Let a $p$-group $P$ act on a finite set $X$, and write

    $$
    X^P=\{x\in X:g\cdot x=x\text{ for every }g\in P\}.
    $$

    Then

    $$
    |X|\equiv|X^P|\pmod p.
    $$

    In particular, $p\nmid|X|$ implies $X^P\neq\varnothing$.

??? proof "Proof"
    By [orbit–stabilizer](group-actions-and-applications.md#thm-orbit-stabilizer),
    every orbit has size $[P:P_x]$, a power of $p$. The singleton orbits
    are precisely the points of $X^P$. If the other orbit sizes are
    $p^{b_1},\ldots,p^{b_s}$, with each $b_j\geq1$, then

    $$
    |X|=|X^P|+\sum_{j=1}^s p^{b_j}
    =|X^P|+p\sum_{j=1}^s p^{b_j-1}.
    $$

    The last sum is an integer, including when it is empty. If $X^P$
    were empty, the same equality would give $p\mid|X|$.

!!! example "Example (An action of a group of order 25)"
    <a id="ex-order-25-fixed-points"></a>
    Suppose a group $P$ of order $25$ acts on a set $X$ of size $12$.
    Orbit sizes are $1$, $5$, or $25$; the last is impossible. Hence
    $|X^P|$ is $2$, $7$, or $12$. In particular,
    at least two points are fixed by the whole group, whether or not
    the action is faithful.

!!! theorem "Theorem (Cauchy)"
    <a id="thm-cauchy"></a>
    If $p\mid|G|$, then $G$ contains an element of order $p$, and hence
    a subgroup of order $p$.

??? proof "Proof"
    Consider

    $$
    X=\{(g_1,\ldots,g_p)\in G^p:g_1g_2\cdots g_p=e\}.
    $$

    Deleting the last entry gives a bijection $X\to G^{p-1}$, whose
    inverse appends $(g_1\cdots g_{p-1})^{-1}$. Thus $|X|=|G|^{p-1}$.
    Writing $|G|=pu$ gives

    $$
    |X|=(pu)^{p-1}=p\bigl(p^{p-2}u^{p-1}\bigr),
    $$

    so $p\mid|X|$; the factor in parentheses is an integer even for
    $p=2$.

    Let $C_p=\langle r\rangle$ act by cyclic rotation:

    $$
    r\cdot(g_1,g_2,\ldots,g_p)=(g_2,\ldots,g_p,g_1).
    $$

    Rotation preserves $X$, since

    $$
    g_2\cdots g_pg_1=g_1^{-1}(g_1\cdots g_p)g_1=e,
    $$

    and rotating $p$ times is the identity. A tuple is fixed by the
    generator, hence by $C_p$, exactly when it is constant, say
    $(g,\ldots,g)$, with $g^p=e$. The
    [fixed-point congruence](#lem-p-group-fixed-points) gives

    $$
    \#\{g\in G:g^p=e\}=|X^{C_p}|\equiv|X|\equiv0\pmod p.
    $$

    The identity is one solution, so the positive number of solutions
    is at least $p$. Choose another solution $g\neq e$. Its order
    divides $p$ and is not one, so it is $p$.

!!! remark "Remark (The prime-order converse to Lagrange)"
    <a id="rem-cauchy-interpretation"></a>
    An element of order $p$ generates a subgroup of order $p$, and every
    [group of prime order is cyclic](subgroups-and-quotients.md#cor-prime-order-cyclic).
    Thus Cauchy's theorem is the prime-order converse to Lagrange's theorem.
    Its proof applies to nonabelian groups: the conjugation identity in
    the rotation check accounts for the order of multiplication.

!!! corollary "Corollary (Element orders in p-groups)"
    <a id="cor-p-group-element-orders"></a>
    A finite group $G$ is a $p$-group if and only if every element has
    order a power of $p$, allowing $1=p^0$.

??? proof "Proof"
    The forward implication follows from Lagrange's theorem. Conversely,
    any prime $q$ dividing $|G|$ is the order of an element by
    [Cauchy's theorem](#thm-cauchy), so $q=p$. Therefore $|G|$ is a power
    of $p$, including the case $|G|=1$.

## Finite p-Groups

Conjugation identifies the center as a fixed-point set. The resulting
nontrivial central subgroup is a starting point for induction and for the
classification of groups of order $p^2$.

!!! theorem "Theorem (Center of a p-group)"
    <a id="thm-p-group-center"></a>
    If $|P|=p^a$ with $a\geq1$, then $p\mid|Z(P)|$. In particular,
    $Z(P)\neq\{e\}$, and $P$ has a central subgroup of order $p$.

??? proof "Proof"
    Recall that the [center](group-actions-and-applications.md#rem-center-conjugation)
    is the normal subgroup

    $$
    Z(P)=\{z\in P:zg=gz\text{ for every }g\in P\}.
    $$

    It is a subgroup fixed pointwise by conjugation, so it is normal.
    For the conjugation action of $P$ on itself, the fixed points are
    exactly $Z(P)$. Thus

    $$
    |Z(P)|\equiv|P|\equiv0\pmod p.
    $$

    Since $e\in Z(P)$, its order is positive and at least $p$.
    [Cauchy's theorem](#thm-cauchy) applied to $Z(P)$ supplies a subgroup
    of order $p$. Every subgroup of the center is normal in $P$.

!!! remark "Remark (Class equation and induction)"
    <a id="rem-p-group-class-equation"></a>
    The center congruence is the
    [class equation](group-actions-and-applications.md#thm-class-equation)
    modulo $p$: each conjugacy class outside $Z(P)$ has size
    $[P:C_P(x)]>1$, a positive power of $p$. Quotienting by a central
    subgroup of order $p$ reduces the group order by a factor of $p$.

!!! theorem "Theorem (Groups of order $p^2$)"
    <a id="thm-order-p-squared"></a>
    Every group of order $p^2$ is isomorphic to exactly one of

    $$
    C_{p^2}\qquad\text{or}\qquad C_p\times C_p.
    $$

    In particular, every group of order $p^2$ is abelian.

??? proof "Proof"
    If $G$ has an element of order $p^2$, that element generates $G$.
    Otherwise, Lagrange's theorem implies that every nonidentity
    element has order $p$.

    Choose $z\neq e$ in $Z(G)$, using the
    [center theorem](#thm-p-group-center), and choose
    $x\in G\setminus\langle z\rangle$, possible since
    $|\langle z\rangle|=p<p^2$. The distinct order-$p$ subgroups
    $\langle z\rangle$ and $\langle x\rangle$ have trivial intersection,
    and $z$ commutes with $x$. Identify $C_p$ with $\mathbb Z/p\mathbb Z$.
    The map

    $$
    \varphi:C_p\times C_p\longrightarrow G,
    \qquad (\bar i,\bar j)\longmapsto z^ix^j,
    $$

    is well-defined because $z^p=x^p=e$, and is a homomorphism because
    $zx=xz$. If $z^ix^j=e$, then
    $z^i=x^{-j}\in\langle z\rangle\cap\langle x\rangle=\{e\}$.
    Hence $\bar i=\bar j=\bar0$, proving injectivity. Both groups have
    order $p^2$, so $\varphi$ is an isomorphism.

    Finally, $C_{p^2}$ has an element of order $p^2$, whereas every
    element of $C_p\times C_p$ has order dividing $p$. The two groups
    are therefore not isomorphic.

!!! example "Example (Groups of order 9)"
    <a id="ex-order-nine"></a>
    The groups of order $9$ are precisely $C_9$ and $C_3\times C_3$ up
    to isomorphism. The preceding proof uses one central element and
    one further element; no classification of finite abelian groups is
    needed.

## Sylow Theorems

Fix $|G|=p^am$ with $a\geq0$ and $p\nmid m$. Lagrange's theorem bounds
the order of a $p$-subgroup by $p^a$. Cauchy's theorem gives order $p$
when $a\geq1$; Sylow's first theorem reaches the full $p$-power part.

!!! definition "Definition (Sylow subgroup)"
    <a id="def-sylow-subgroup"></a>
    A **Sylow $p$-subgroup** of $G$ is a subgroup of order $p^a$, where
    $|G|=p^am$ and $p\nmid m$. Write

    $$
    \operatorname{Syl}_p(G)=\{P\leq G:|P|=p^a\},
    \qquad n_p(G)=|\operatorname{Syl}_p(G)|.
    $$

    The abbreviation $n_p$ is used when $G$ is clear. If $p\nmid|G|$,
    the trivial subgroup is the unique Sylow $p$-subgroup.

!!! example "Example (Sylow orders)"
    <a id="ex-sylow-orders"></a>
    In a group of order $20=2^2\cdot5$, a Sylow $2$-subgroup has order
    $4$ and a Sylow $5$-subgroup has order $5$. A subgroup of order $2$
    is a $2$-subgroup but is not Sylow. Every $p$-group is its own unique
    Sylow $p$-subgroup.

!!! lemma "Lemma (Fixed cosets)"
    <a id="lem-fixed-cosets"></a>
    Let $H,Q\leq G$, and let $Q$ act on $G/H$ by left multiplication.
    Then

    $$
    gH\in(G/H)^Q
    \quad\Longleftrightarrow\quad g^{-1}Qg\leq H
    \quad\Longleftrightarrow\quad Q\leq gHg^{-1}.
    $$

    In particular,

    $$
    (G/H)^H=N_G(H)/H,
    $$

    with these cosets viewed as a subset of $G/H$.

??? proof "Proof"
    The coset $gH$ is fixed by $Q$ exactly when $qgH=gH$ for every
    $q\in Q$, equivalently $g^{-1}qg\in H$ for every $q$. If $Q=H$,
    the inclusion $g^{-1}Hg\leq H$ is an equality because the finite
    subgroups have the same order. This says $g\in N_G(H)$.

!!! remark "Remark (Two different quotients)"
    <a id="rem-normalizer-quotient"></a>
    The coset set $G/H$ exists without normality. In contrast,
    $H\trianglelefteq N_G(H)$ by the
    [normalizer definition](group-actions-and-applications.md#def-normalizer),
    so $N_G(H)/H$ is a group. Cauchy's theorem can be applied to this
    normalizer quotient.

!!! theorem "Theorem (Sylow I: existence)"
    <a id="thm-sylow-existence"></a>
    If $|G|=p^am$ and $p\nmid m$, then $G$ has a subgroup of order $p^a$.

??? proof "Proof"
    Choose a $p$-subgroup $P\leq G$ maximal with respect to inclusion.
    Such a subgroup exists because $\{e\}$ is a $p$-subgroup and $G$
    has finitely many subgroups. Suppose $p\mid[G:P]$. Let $P$ act on
    $G/P$ by left multiplication. The
    [fixed-point congruence](#lem-p-group-fixed-points) and
    [fixed-coset lemma](#lem-fixed-cosets) give

    $$
    |N_G(P)/P|=|(G/P)^P|\equiv[G:P]\equiv0\pmod p.
    $$

    By Cauchy's theorem, $N_G(P)/P$ has a subgroup $\bar Q$ of order
    $p$. For the quotient map $\pi:N_G(P)\to N_G(P)/P$, set
    $Q=\pi^{-1}(\bar Q)$. The preimage of a subgroup is a subgroup,
    $P\leq Q$, and $Q/P\cong\bar Q$. Consequently,

    $$
    |Q|=|P|\,|Q/P|=p|P|.
    $$

    This is a $p$-subgroup strictly containing $P$, a contradiction.
    Hence $p\nmid[G:P]$. Writing $|P|=p^b$ with $b\leq a$ gives
    $[G:P]=p^{a-b}m$, so $b=a$.

!!! remark "Remark (Maximal p-subgroups)"
    <a id="rem-maximal-p-subgroups"></a>
    The proof shows that every $p$-subgroup maximal among $p$-subgroups
    is Sylow: if its index were divisible by $p$, the normalizer
    quotient would supply a larger $p$-subgroup. Conversely, a Sylow
    $p$-subgroup cannot lie in a larger $p$-subgroup by Lagrange's
    theorem. This maximality is among $p$-subgroups, not among all
    proper subgroups of $G$.

!!! theorem "Theorem (Sylow II: containment and conjugacy)"
    <a id="thm-sylow-conjugacy"></a>
    Let $P\in\operatorname{Syl}_p(G)$ and let $Q\leq G$ be a
    $p$-subgroup. There exists $g\in G$ such that

    $$
    Q\leq gPg^{-1}.
    $$

    Thus every $p$-subgroup is contained in a Sylow $p$-subgroup, and
    all Sylow $p$-subgroups are conjugate.

??? proof "Proof"
    Let $Q$ act on $G/P$ by left multiplication. Since $p\nmid[G:P]$,
    the [fixed-point congruence](#lem-p-group-fixed-points) gives a
    fixed coset $gP$. The [fixed-coset lemma](#lem-fixed-cosets) gives
    $Q\leq gPg^{-1}$. If $Q$ is Sylow, equality follows from the equal
    orders.

!!! remark "Remark (Containment versus isomorphism)"
    <a id="rem-sylow-containment"></a>
    Every $p$-subgroup can be placed inside a conjugate of any chosen
    Sylow subgroup. This is stronger than saying that Sylow subgroups
    are isomorphic, and does not assert uniqueness of a containing
    Sylow subgroup.

!!! lemma "Lemma (A unique fixed Sylow subgroup)"
    <a id="lem-fixed-sylow-subgroup"></a>
    For the conjugation action of a Sylow $p$-subgroup $P$ on
    $\operatorname{Syl}_p(G)$, the only fixed point is $P$ itself.

??? proof "Proof"
    The subgroup $P$ fixes itself. If $Q\in\operatorname{Syl}_p(G)$ is
    fixed, then $P\leq N_G(Q)$. Since $Q\trianglelefteq N_G(Q)$, the
    product $PQ$ is a subgroup of $N_G(Q)$. The
    [second isomorphism theorem](subgroups-and-quotients.md#thm-second-isomorphism)
    gives

    $$
    PQ/Q\cong P/(P\cap Q),
    \qquad |PQ|=\frac{|P|\,|Q|}{|P\cap Q|}.
    $$

    This order is a power of $p$, so $PQ$ is a $p$-subgroup containing
    the Sylow subgroup $Q$. Lagrange's theorem forces $PQ=Q$, hence
    $P\leq Q$. Their equal orders give $P=Q$.

!!! theorem "Theorem (Sylow III: counting)"
    <a id="thm-sylow-counting"></a>
    If $|G|=p^am$ and $p\nmid m$, then for every
    $P\in\operatorname{Syl}_p(G)$,

    $$
    n_p(G)=[G:N_G(P)],
    \qquad n_p(G)\mid m,
    \qquad n_p(G)\equiv1\pmod p.
    $$

??? proof "Proof"
    Conjugation defines an action of $G$ on $\operatorname{Syl}_p(G)$:
    $g\cdot Q=gQg^{-1}$. It preserves subgroup orders and is transitive
    by [Sylow II](#thm-sylow-conjugacy). The stabilizer of $P$ is
    $N_G(P)$, so orbit–stabilizer gives $n_p(G)=[G:N_G(P)]$. Since
    $P\leq N_G(P)$, the
    [index-tower formula](subgroups-and-quotients.md#prop-index-tower) gives

    $$
    m=[G:P]=[G:N_G(P)]\,[N_G(P):P],
    $$

    proving $n_p(G)\mid m$. Restrict this conjugation action to $P$.
    By the [preceding lemma](#lem-fixed-sylow-subgroup), its fixed-point
    set is $\{P\}$. The fixed-point congruence therefore gives

    $$
    n_p(G)=|\operatorname{Syl}_p(G)|
    \equiv|\operatorname{Syl}_p(G)^P|=1\pmod p.
    $$

!!! remark "Remark (Fixed subgroups and the actions used)"
    <a id="rem-sylow-proof-actions"></a>
    A subgroup $Q$ fixed under conjugation by $P$ is preserved as a
    set: $P\leq N_G(Q)$. This does not imply that $P$ centralizes $Q$;
    normalization is enough to make $PQ$ a subgroup in the lemma.

    The actions in the proofs have the following fixed-point interpretations.

    | Acting group | Set acted on | Fixed points |
    |---|---|---|
    | $C_p$ | $p$-tuples with product $e$ | Constant tuples with $g^p=e$ |
    | $P$ | $P$, by conjugation | $Z(P)$ |
    | $P\leq G$ | $G/P$, by multiplication | $N_G(P)/P$ |
    | $Q\leq G$, with $P$ Sylow | $G/P$, by multiplication | $gP$ with $Q\leq gPg^{-1}$ |
    | $P$ Sylow | $\operatorname{Syl}_p(G)$, by conjugation | The subgroup $P$ alone |

    Here $P$ and $Q$ are $p$-groups, with the additional Sylow
    hypotheses indicated in the table.

## Applications

The conditions $n_p\mid m$ and $n_p\equiv1\pmod p$ first restrict the
possible numbers of Sylow subgroups. Uniqueness detects normality; counting
elements or combining normal subgroups can settle the remaining cases.

!!! corollary "Corollary (Normal Sylow subgroups)"
    <a id="cor-normal-sylow"></a>
    A Sylow $p$-subgroup $P$ is normal in $G$ if and only if $n_p(G)=1$.

??? proof "Proof"
    If $P$ is unique, every conjugate $gPg^{-1}$ is a Sylow
    $p$-subgroup and hence equals $P$. Conversely, if $P$ is normal,
    all its conjugates equal $P$, and [Sylow II](#thm-sylow-conjugacy)
    says these are all Sylow $p$-subgroups.

!!! example "Example (Sylow subgroups of $S_3$)"
    <a id="ex-sylow-s3"></a>
    The unique Sylow $3$-subgroup of $S_3$ is
    $A_3=\langle(123)\rangle$. Its three Sylow $2$-subgroups are

    $$
    \langle(12)\rangle,\qquad\langle(13)\rangle,\qquad\langle(23)\rangle.
    $$

    They are conjugate and none is normal. Thus $n_3(S_3)=1$ and
    $n_2(S_3)=3$. The subgroup $A_3$ is normal but not central:
    conjugation by $(12)$ interchanges $(123)$ and $(132)$.

!!! remark "Remark (Direct-product criterion)"
    <a id="rem-sylow-direct-product"></a>
    Recall the [internal direct-product criterion](subgroups-and-quotients.md#cor-internal-direct-product).
    If $A,B\trianglelefteq G$, $A\cap B=\{e\}$, and $AB=G$, then

    $$
    A\times B\xrightarrow{\sim}G,
    \qquad(a,b)\longmapsto ab.
    $$

    Normality puts $aba^{-1}b^{-1}$ in both $A$ and $B$, so the
    factors commute. The displayed map is therefore a homomorphism;
    the intersection and product conditions make it bijective.
    If $\gcd(|A|,|B|)=1$, Lagrange's theorem already forces
    $A\cap B=\{e\}$.

!!! example "Example (Groups of order 15)"
    <a id="ex-order-15-cyclic"></a>
    Every group of order $15$ is cyclic.

??? proof "Proof"
    Sylow III gives

    $$
    n_5\mid3,\quad n_5\equiv1\pmod5,
    \qquad n_3\mid5,\quad n_3\equiv1\pmod3.
    $$

    In each case only $1$ remains. Let $P$ and $Q$ be the Sylow
    subgroups of orders $3$ and $5$. Both are normal,
    $P\cap Q=\{e\}$, and $|PQ|=|P|\,|Q|=15$, so $PQ=G$.
    The direct-product criterion gives

    $$
    G\cong P\times Q\cong C_3\times C_5\cong C_{15}.
    $$

    For the last isomorphism, take generators $a$ of $C_3$ and $b$ of
    $C_5$. Then $(a,b)^k=e$ exactly when $3\mid k$ and $5\mid k$,
    equivalently $15\mid k$. Thus $(a,b)$ has order $15$.

!!! remark "Remark (Both normality hypotheses matter)"
    <a id="rem-direct-product-normality"></a>
    In $S_3$, a Sylow $3$-subgroup and a Sylow $2$-subgroup have
    trivial intersection and product $S_3$, but they do not commute.
    The direct-product criterion therefore does not apply.

!!! proposition "Proposition (A normal cyclic subgroup of order 15)"
    <a id="prop-order-30-normal-subgroup"></a>
    Every group of order $30$ has a normal cyclic subgroup of order $15$.
    In particular, it is not simple.

??? proof "Proof"
    Sylow III gives $n_5\in\{1,6\}$ and $n_3\in\{1,10\}$.
    Suppose $n_5=6$ and $n_3=10$. Distinct subgroups of the same prime
    order intersect only in the identity. The six order-$5$ subgroups
    therefore contribute $6(5-1)=24$ distinct elements of order $5$,
    while the ten order-$3$ subgroups contribute $10(3-1)=20$ distinct
    elements of order $3$. These collections are disjoint and exclude
    the identity, giving

    $$
    |G|\geq1+24+20=45,
    $$

    a contradiction. Hence $n_5=1$ or $n_3=1$.

    Choose $P\in\operatorname{Syl}_3(G)$ and
    $Q\in\operatorname{Syl}_5(G)$. At least one is normal, so $H=PQ$
    is a subgroup by the
    [subgroup-product result](subgroups-and-quotients.md#thm-second-isomorphism).
    Since $P\cap Q=\{e\}$ by Lagrange's theorem,

    $$
    |H|=\frac{|P|\,|Q|}{|P\cap Q|}=15.
    $$

    Thus $[G:H]=2$, so $H$ is normal: if $g\notin H$, both $gH$ and
    $Hg$ equal $G\setminus H$; if $g\in H$, both equal $H$. Finally,
    the [order-$15$ example](#ex-order-15-cyclic) shows that $H$ is cyclic.

!!! remark "Remark (Limits of the element count)"
    <a id="rem-sylow-element-count"></a>
    Recall that a nontrivial group is
    [simple](subgroups-and-quotients.md#def-simple-group) if its only
    normal subgroups are $\{e\}$ and the whole group. The subgroup of
    order $15$ above is nontrivial and proper.

    The counting argument uses the fact that distinct subgroups of
    prime order have trivial intersection. Distinct Sylow subgroups
    of order $p^a$ with $a>1$ may have nontrivial intersection; their
    nonidentity elements cannot automatically be counted as disjoint.
