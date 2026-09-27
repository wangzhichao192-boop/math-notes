# Group Actions and Applications

A group action represents elements of a group as permutations of a set.
Orbits describe what can be reached, stabilizers record what remains fixed,
and equivariant maps compare two actions without forgetting their symmetry.
We develop these ideas first for coset actions and conjugation, then use them
to obtain the class equation and Burnside's counting lemma.

## Actions, Orbits, and Stabilizers

!!! definition "Definition (Group action)"
    <a id="def-group-action"></a>
    A **left action** of a group $G$ on a set $X$ is a homomorphism

    $$
    \rho:G\longrightarrow\operatorname{Sym}(X).
    $$

    For $g\in G, x\in X$, we write $g\cdot x=\rho(g)(x)$ for left action. Equivalently, an action is a function
    $G\times X\to X$ satisfying

    $$
    e\cdot x=x,
    \qquad
    (gh)\cdot x=g\cdot(h\cdot x).
    $$

    A set equipped with a specified $G$-action is called a **$G$-set**.

!!! remark "Remark (Action versus operation)"
    <a id="rem-action-versus-operation"></a>
    An action is not a binary operation on $X$. In $g\cdot x$, the first
    input lies in $G$ and the second in $X$:

    $$
    G\times X\longrightarrow X.
    $$

    By contrast, a group operation on $X$ has type
    $X\times X\to X$. No multiplication on $X$ is required for an action.

!!! example "Example (Basic actions)"
    <a id="ex-basic-actions"></a>
    The following actions will be used repeatedly.

    + $S_n$ acts on $\{1,\ldots,n\}$ by $\sigma\cdot i=\sigma(i)$.
    + Every group $G$ acts on itself by left multiplication,
      $g\cdot x=gx$. This is the **left regular action**, and it is
      faithful; it is the action underlying
      [Cayley's theorem](integers-groups-and-homomorphisms.md#thm-cayley).
    + For every $H\leq G$, the rule $g\cdot(xH)=gxH$ defines an action on
      the left coset set $G/H$. Normality of $H$ is not required.
    + The **trivial action** is $g\cdot x=x$. An action of $G$ restricts
      to any subgroup $H\leq G$; more generally, a homomorphism
      $f:K\to G$ induces a $K$-action by $k\cdot x=f(k)\cdot x$.

!!! definition "Definition (Kernel and faithful action)"
    <a id="def-action-kernel-faithful"></a>
    The **kernel** of an action $\rho:G\to\operatorname{Sym}(X)$ is

    $$
    \ker\rho
    =\{g\in G:g\cdot x=x\text{ for every }x\in X\}.
    $$

    The action is **faithful** if $\ker\rho=\{e\}$, equivalently if
    distinct elements of $G$ induce distinct permutations of $X$.

!!! proposition "Proposition (When a quotient acts)"
    <a id="prop-quotient-action"></a>
    Let $N\trianglelefteq G$. The rule

    $$
    (gN)\cdot x=g\cdot x
    $$

    defines an action of $G/N$ on $X$ if and only if
    $N\subseteq\ker\rho$. In particular, $G/\ker\rho$ acts faithfully on
    $X$ and produces exactly the same permutations as $G$.

??? proof "Proof"
    If the quotient action exists, every $n\in N$ represents the identity
    coset, so $n\cdot x=x$ for every $x$. Conversely, suppose
    $N\subseteq\ker\rho$. If $gN=hN$, then $h=gn$ for some $n\in N$, and
    $h\cdot x=g\cdot(n\cdot x)=g\cdot x$; hence the rule is well-defined.
    The action identities descend from those of $G$. Taking
    $N=\ker\rho$ makes the resulting action faithful.

!!! definition "Definition (Orbit and stabilizer)"
    <a id="def-orbit-stabilizer"></a>
    Let $G$ act on $X$. For $x\in X$, its **orbit** and **stabilizer** are

    $$
    G\cdot x=\{g\cdot x:g\in G\},
    \qquad
    G_x=\{g\in G:g\cdot x=x\}.
    $$

    The relation $x\sim y$ when $y=g\cdot x$ for some $g\in G$ is an
    equivalence relation whose classes are the orbits. The set of orbits
    is denoted $G\backslash X$.

    An action is **transitive** if $X$ is nonempty and has one orbit; it
    is **free** if $G_x=\{e\}$ for every $x$; and $x$ is a **fixed point**
    if $G_x=G$.

!!! example "Example (The natural action of $S_3$)"
    <a id="ex-s3-orbit-stabilizer"></a>
    Let $S_3$ act on $X=\{1,2,3\}$ by permutation. Then

    $$
    S_3\cdot1=X,
    \qquad
    (S_3)_1=\{e,(23)\}.
    $$

    Thus the action is transitive but not free: the nonidentity element
    $(23)$ fixes $1$. No point is fixed by all of $S_3$.

!!! proposition "Proposition (Stabilizers and the action kernel)"
    <a id="prop-stabilizers-kernel"></a>
    Each $G_x$ is a subgroup of $G$, and

    $$
    G_{g\cdot x}=gG_xg^{-1},
    \qquad
    \ker\rho=\bigcap_{x\in X}G_x.
    $$

    Thus a nonempty free action is faithful, but a faithful action need
    not be free. For example, the natural action of $S_3$ on three
    letters is faithful, although $(23)$ fixes $1$.

??? proof "Proof"
    The subgroup test gives $G_x\leq G$. Moreover,
    $a\cdot(g\cdot x)=g\cdot x$ exactly when
    $(g^{-1}ag)\cdot x=x$, which gives the conjugacy formula. The kernel
    consists precisely of the elements lying in every stabilizer.

## Equivariant Maps and Coset Actions

!!! definition "Definition ($G$-map)"
    <a id="def-g-map"></a>
    If $X$ and $Y$ are $G$-sets, a function $f:X\to Y$ is a **$G$-map**,
    or **equivariant map**, if

    $$
    f(g\cdot x)=g\cdot f(x)
    \qquad(g\in G,\ x\in X).
    $$

    We write $\operatorname{Hom}_G(X,Y)$ for such $G$-maps. 
    
    A bijective $G$-map identifies two actions after relabeling their
    points. No group structure on $X$ or $Y$ is assumed.

!!! proposition "Proposition (Orbits and stabilizers under a $G$-map)"
    <a id="prop-g-map-orbits-stabilizers"></a>
    A $G$-map $f:X\to Y$ sends $G\cdot x$ onto $G\cdot f(x)$ and satisfies
    $G_x\leq G_{f(x)}$. If $f$ is injective, then
    $G_x=G_{f(x)}$. Every $G$-map between nonempty transitive $G$-sets is
    surjective.

??? proof "Proof"
    Equivariance gives $f(G\cdot x)=G\cdot f(x)$. If $g\in G_x$, then
    $g\cdot f(x)=f(g\cdot x)=f(x)$. If $f$ is injective, the converse
    follows from $f(g\cdot x)=f(x)$. For transitive $X$, the image is the
    entire orbit of $f(x)$, which is $Y$.

!!! definition "Definition (Fixed-point set of a subgroup)"
    <a id="def-subgroup-fixed-points"></a>
    For $H\leq G$ and a $G$-set $Y$, define

    $$
    Y^H
    =\{y\in Y:h\cdot y=y\text{ for every }h\in H\}
    =\{y\in Y:H\leq G_y\}.
    $$

!!! proposition "Proposition (Universal property of the coset action)"
    <a id="prop-coset-action-universal"></a>
    Let $H\leq G$. For every $G$-set $Y$ and every $y\in Y^H$, there is
    a unique $G$-map $f_y:G/H\to Y$ satisfying $f_y(H)=y$, namely

    $$
    f_y(gH)=g\cdot y.
    $$

    Equivalently, evaluation at $H$ is a bijection

    $$
    \operatorname{Map}_G(G/H,Y)\longrightarrow Y^H,
    \qquad
    f\longmapsto f(H).
    $$

??? proof "Proof"
    If $f$ is equivariant, then $h\cdot f(H)=f(hH)=f(H)$ for $h\in H$,
    and equivariance forces $f(gH)=g\cdot f(H)$. Conversely, if
    $y\in Y^H$ and $gH=g'H$, write $g'=gh$ with $h\in H$; then
    $g'\cdot y=g\cdot(h\cdot y)=g\cdot y$. Thus the displayed formula is
    well-defined and visibly equivariant.

!!! example "Example (Maps between coset actions)"
    <a id="ex-maps-between-coset-actions"></a>
    For $H,K\leq G$, a coset $aK$ is fixed by $H$ exactly when
    $a^{-1}Ha\leq K$. Hence every $G$-map $G/H\to G/K$ has the form

    $$
    f_a(gH)=gaK,
    \qquad
    a^{-1}Ha\leq K.
    $$

    Such a map is always surjective and is bijective exactly when
    $a^{-1}Ha=K$. Thus the transitive $G$-sets $G/H$ and $G/K$ are
    equivariantly isomorphic exactly when $H$ and $K$ are conjugate.

!!! theorem "Theorem (Orbit-stabilizer)"
    <a id="thm-orbit-stabilizer"></a>
    For every $x\in X$, the map

    $$
    \theta_x:G/G_x\longrightarrow G\cdot x,
    \qquad
    gG_x\longmapsto g\cdot x,
    $$

    is a bijective $G$-map. Consequently, every nonempty transitive
    $G$-set is equivariantly isomorphic to a coset action. If $G$ is
    finite, then

    $$
    |G\cdot x|=[G:G_x]=\frac{|G|}{|G_x|}.
    $$

??? proof "Proof"
    Since $x\in X^{G_x}$, the universal property produces $\theta_x$.
    It is surjective by definition of the orbit, while

    $$
    g\cdot x=h\cdot x
    \iff h^{-1}g\in G_x
    \iff gG_x=hG_x,
    $$

    so it is injective. The counting formula is
    [Lagrange's theorem](subgroups-and-quotients.md#thm-lagrange).

!!! corollary "Corollary (Free finite actions)"
    <a id="cor-free-finite-action"></a>
    If a finite group $G$ acts freely on a finite set $X$, then every
    orbit has size $|G|$, so $|G|$ divides $|X|$.

!!! example "Example (The action on three letters)"
    <a id="ex-s3-three-letters"></a>
    Continuing the [preceding example](#ex-s3-orbit-stabilizer), put
    $H=(S_3)_1=\langle(23)\rangle$. Orbit-stabilizer gives the bijection

    $$
    S_3/H\longrightarrow\{1,2,3\},
    \qquad
    gH\longmapsto g(1),
    $$

    and $3=6/2$. Here $H$ is not normal: the source is a coset set, not
    a quotient group.

!!! remark "Remark (Kernel of a coset action)"
    <a id="rem-coset-action-kernel"></a>
    In the action on $G/H$, the stabilizer of $gH$ is $gHg^{-1}$.
    Therefore

    $$
    \ker\bigl(G\to\operatorname{Sym}(G/H)\bigr)
    =\bigcap_{g\in G}gHg^{-1}
    =\operatorname{Core}_G(H),
    $$

    the largest normal subgroup of $G$ contained in $H$; see the
    [finite-index core criterion](subgroups-and-quotients.md#prop-finite-index-core).

## Conjugation, Centralizers, and Normalizers

Conjugation, introduced in the
[previous chapter](subgroups-and-quotients.md#def-conjugation), is an action
of $G$ on its underlying set:

$$
g\cdot a=gag^{-1}.
$$

Its orbits and stabilizers measure how far elements are from being central.

!!! definition "Definition (Conjugacy class and centralizer)"
    <a id="def-conjugacy-centralizer"></a>
    The **conjugacy class** of $a\in G$ and its **centralizer** are

    $$
    \operatorname{Cl}_G(a)=\{gag^{-1}:g\in G\},
    \qquad
    C_G(a)=\{g\in G:ga=ag\}.
    $$

    They are respectively the orbit and stabilizer of $a$ under
    conjugation. Hence

    $$
    G/C_G(a)\xrightarrow{\sim}\operatorname{Cl}_G(a),
    \qquad
    gC_G(a)\longmapsto gag^{-1}.
    $$

    In particular, if $G$ is finite, then
    $|\operatorname{Cl}_G(a)|=[G:C_G(a)]$.

!!! remark "Remark (The center as fixed points and kernel)"
    <a id="rem-center-conjugation"></a>
    The points fixed by all of $G$ are precisely

    $$
    Z(G)=\{a\in G:ag=ga\text{ for every }g\in G\}.
    $$

    Thus $\operatorname{Cl}_G(a)=\{a\}$ exactly when $a\in Z(G)$.
    Moreover, $Z(G)$ is the kernel of the conjugation action.

!!! definition "Definition (Inner automorphism)"
    <a id="def-inner-automorphism"></a>
    An automorphism of the form

    $$
    c_g:G\longrightarrow G,
    \qquad
    c_g(h)=ghg^{-1},
    $$

    is an **inner automorphism**. Write
    $\operatorname{Inn}(G)=\{c_g:g\in G\}$.

!!! proposition "Proposition (Distinct conjugations)"
    <a id="prop-inner-automorphisms"></a>
    The map

    $$
    c:G\longrightarrow\operatorname{Aut}(G),
    \qquad
    g\longmapsto c_g,
    $$

    is a homomorphism with kernel $Z(G)$ and image
    $\operatorname{Inn}(G)$. Therefore

    $$
    G/Z(G)\cong\operatorname{Inn}(G).
    $$

??? proof "Proof"
    One has $c_g\circ c_h=c_{gh}$. Moreover, $c_g$ is the identity
    exactly when $g$ commutes with every element of $G$. Apply the
    [first isomorphism theorem](subgroups-and-quotients.md#thm-first-isomorphism).

!!! proposition "Proposition (Normal subgroups and conjugacy classes)"
    <a id="prop-normal-union-classes"></a>
    A subgroup $N\leq G$ is normal if and only if it is a union of
    conjugacy classes of $G$.

??? proof "Proof"
    Normality says precisely that $a\in N$ implies
    $gag^{-1}\in N$ for every $g\in G$.

!!! definition "Definition (Normalizer)"
    <a id="def-normalizer"></a>
    For $H\leq G$, its **normalizer** and **centralizer** in $G$ are

    $$
    N_G(H)=\{g\in G:gHg^{-1}=H\},
    \qquad
    C_G(H)=\{g\in G:gh=hg\text{ for every }h\in H\}.
    $$

    The normalizer is the stabilizer of $H$ for the conjugation action on
    the set of subgroups. Consequently,

    $$
    H\trianglelefteq N_G(H),
    \qquad
    H\trianglelefteq L\leq G\Longrightarrow L\leq N_G(H).
    $$

    Thus $N_G(H)$ is the largest subgroup of $G$ in which $H$ is normal.
    By contrast, $C_G(H)$ fixes every element of $H$, so
    $C_G(H)\leq N_G(H)$.

!!! proposition "Proposition (Conjugate subgroups)"
    <a id="prop-conjugate-subgroups"></a>
    The orbit of $H$ under conjugation is the set of its conjugate
    subgroups. If $G$ is finite, then

    $$
    \#\{gHg^{-1}:g\in G\}=[G:N_G(H)].
    $$

    In particular, $H\trianglelefteq G$ exactly when $N_G(H)=G$.

## Counting with Group Actions

If a finite group $G$ acts on a finite set $X$ and
$x_1,\ldots,x_r$ represent the distinct orbits, then orbit-stabilizer
gives the basic orbit sum

$$
|X|=\sum_{i=1}^r|G\cdot x_i|
=\sum_{i=1}^r[G:G_{x_i}].
$$

!!! theorem "Theorem (Class equation)"
    <a id="thm-class-equation"></a>
    Let $G$ be finite, and choose one representative
    $a_1,\ldots,a_r$ from each conjugacy class outside $Z(G)$. Then

    $$
    |G|=|Z(G)|+\sum_{i=1}^r[G:C_G(a_i)].
    $$

    Every term in the sum is greater than $1$ and divides $|G|$.

??? proof "Proof"
    Conjugacy classes partition $G$. The singleton classes are precisely
    the elements of $Z(G)$; every other class has size
    $[G:C_G(a_i)]$ by orbit-stabilizer.

!!! example "Example (Conjugacy classes of $S_3$)"
    <a id="ex-class-equation-s3"></a>
    Conjugation relabels cycles:

    $$
    g(i_1\,i_2\cdots i_k)g^{-1}
    =(g(i_1)\,g(i_2)\cdots g(i_k)).
    $$

    Hence the conjugacy classes of $S_3$ are

    $$
    \{e\},
    \qquad
    \{(12),(13),(23)\},
    \qquad
    \{(123),(132)\},
    $$

    and the class equation is $6=1+3+2$. A normal subgroup must be a
    union of these classes and have order dividing $6$, so the normal
    subgroups are exactly $\{e\}$, $A_3$, and $S_3$. Being a union of
    conjugacy classes alone does not guarantee closure under products.

!!! notation "Notation (Fixed points of an element)"
    For $g\in G$, write

    $$
    X^g=X^{\langle g\rangle}
    =\{x\in X:g\cdot x=x\}.
    $$

    This differs from $X^G$, whose points are fixed by every element of
    $G$.

!!! theorem "Theorem (Burnside's counting lemma)"
    <a id="thm-burnside"></a>
    If a finite group $G$ acts on a finite set $X$, then

    $$
    |G\backslash X|
    =\frac{1}{|G|}\sum_{g\in G}|X^g|.
    $$

    Thus the number of orbits equals the average number of fixed points.

??? proof "Proof"
    Count

    $$
    E=\{(g,x)\in G\times X:g\cdot x=x\}
    $$

    in two ways:

    $$
    \sum_{g\in G}|X^g|=|E|=\sum_{x\in X}|G_x|.
    $$

    If $O$ is an orbit, then $|G_x|=|G|/|O|$ for every $x\in O$.
    Therefore the points in each orbit contribute
    $|O|\cdot |G|/|O|=|G|$ to the last sum. Dividing by $|G|$ counts
    each orbit once.

!!! example "Example (Necklaces under rotation)"
    <a id="ex-necklaces-rotation"></a>
    Color the positions $\mathbb Z/n\mathbb Z$ with $q$ colors and
    identify colorings that differ by a rotation. Rotation by $k$ has
    $\gcd(n,k)$ cycles, so it fixes $q^{\gcd(n,k)}$ colorings. Burnside's
    lemma gives

    $$
    \frac1n\sum_{k=0}^{n-1}q^{\gcd(n,k)}.
    $$

    For $n=6$, this is

    $$
    \frac{q^6+q^3+2q^2+2q}{6};
    $$

    with two colors there are $14$ rotational necklaces. Simply dividing
    $q^6$ by $6$ fails because colorings with extra rotational symmetry
    have smaller orbits.

!!! corollary "Corollary (Derangements in transitive actions)"
    <a id="cor-derangement"></a>
    If a finite group acts transitively on a finite set $X$ with
    $|X|>1$, then some element of $G$ fixes no point of $X$.

??? proof "Proof"
    Transitivity gives one orbit, so Burnside's lemma gives
    $\sum_{g\in G}|X^g|=|G|$. The identity contributes $|X|>1$. If every
    other element fixed at least one point, the sum would be greater than
    $|G|$.

!!! example "Example (Commuting probability)"
    <a id="ex-commuting-probability"></a>
    Let $k(G)$ be the number of conjugacy classes of a finite group $G$.
    Applying Burnside's lemma to conjugation gives

    $$
    k(G)=\frac1{|G|}\sum_{a\in G}|C_G(a)|.
    $$

    The sum counts ordered commuting pairs $(a,b)\in G^2$, so the
    probability that two uniformly chosen elements commute is
    $k(G)/|G|$. For $S_3$ this probability is $3/6=1/2$.
