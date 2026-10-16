# Groups

This chapter develops the algebraic theory of groups, from the bare axioms
through homomorphisms, quotients, and the first isomorphism theorem.

## Composition Laws and Semigroups

!!! definition "Definition (Composition law)"
    <a id="def-5-1-1"></a>
    <a id="def-composition-law"></a>

    A **composition law** on a set $X$ is a mapping
    $\ast : X \times X \to X$, $(x, y) \mapsto x \ast y$.

    + $\ast$ is **commutative** if $x \ast y = y \ast x$ for all $x, y$.
    + $\ast$ is **associative** if $(x \ast y) \ast z = x \ast (y \ast z)$ for all
      $x, y, z$. In this case we write
      $x_1 \ast x_2 \ast \cdots \ast x_n$ without ambiguity.
    + $(X, \ast)$ is a **semigroup** if $\ast$ is associative.

!!! example "Example (Left/right cancellativity)"
    <a id="ex-left-right-cancellativity"></a>

    The set $M_X$ of all mappings $X \to X$, with composition $\circ$, is an
    associative (but generally non-commutative) semigroup.

!!! definition "Definition (Left/right cancellativity)"
    <a id="def-5-1-2"></a>
    <a id="def-left-right-cancellativity"></a>

    In a semigroup, an element $g$ is

    + **left cancellative** if $g \ast x = g \ast y \Rightarrow x = y$;
    + **right cancellative** if $x \ast g = y \ast g \Rightarrow x = y$.

!!! proposition "Proposition (Regrouping parenthesised products)"
    <a id="prop-5-1-3"></a>
    <a id="prop-regrouping-parenthesised-products"></a>

    If $\ast$ is associative and $n \geq 2$, then for any $1 \leq i \leq n - 1$,

    $$
    x_1 \ast \cdots \ast x_n
    = x_1 \ast \cdots \ast (x_i \ast x_{i+1}) \ast \cdots \ast x_n.
    $$

!!! definition "Definition (Closure and the opposite operation)"
    <a id="def-closure-and-the-opposite-operation"></a>

    A subset $Y\subseteq X$ is **closed** under $\ast$ if
    $x\ast y\in Y$ for all $x,y\in Y$. The **opposite operation** is
    $x\widehat\ast y=y\ast x$. It is associative when $\ast$ is, and
    equals $\ast$ precisely when $\ast$ is commutative.

!!! example "Example (Noncommutativity and cancellation)"
    <a id="ex-noncommutativity-and-cancellation"></a>

    For distinct $a,b\in X$, the constant maps satisfy
    $f_a\circ f_b=f_a$ and $f_b\circ f_a=f_b$, exhibiting
    noncommutativity of $M_X$. Every element of $(\mathbb N,+)$ is
    cancellative; in $(\mathbb N,\cdot)$ every positive element is
    cancellative. With a commutative law, left and right cancellation coincide.

??? proof "Proof"
    In the regrouping proposition, the case $i=1$ is the definition of
    the iterated product. For $i\ge2$, associativity gives
    $(x_1\ast\cdots\ast x_{i-1})\ast x_i\ast x_{i+1} =(x_1\ast\cdots\ast x_{i-1})\ast(x_i\ast x_{i+1})$;
    append the remaining factors.

## Monoids and Groups

!!! definition "Definition (Neutral element)"
    <a id="def-5-2-1"></a>
    <a id="def-neutral-element"></a>

    A **neutral element** in $(X, \ast)$ is $e \in X$ with
    $e \ast x = x \ast e = x$ for all $x$. A neutral element is unique
    (when it exists).

!!! definition "Definition (Monoid, group, abelian group)"
    <a id="def-5-2-2"></a>
    <a id="def-monoid-group-abelian-group"></a>

    + A **monoid** is a semigroup with a neutral element, denoted $1$ (or $0$
      in additive notation).
    + A **group** is a monoid in which every element is invertible.
    + A group is **abelian** if its composition law is commutative.

!!! example "Example (Integer and permutation groups)"
    <a id="ex-mathbb-z"></a>

    $(\mathbb{Z}, +)$ is an abelian group. The set $S_n$ of bijections $\{1, \ldots, n\} \to \{1, \ldots, n\}$ with composition is the **symmetric group** (non-abelian for $n \geq 3$).

!!! definition "Definition (Inverse)"
    <a id="def-5-2-3"></a>
    <a id="def-inverse"></a>

    Let $(G, \ast)$ be a monoid with neutral $e$. An element $x$ is **invertible** if there is $y$ with $x \ast y = y \ast x = e$. In that case $y$ is unique and is written $x^{-1}$.

!!! proposition "Proposition (Right-invertible implies right-cancellative)"
    <a id="prop-5-2-4"></a>
    <a id="prop-right-invertible-implies-right-cancellative"></a>

    In a monoid, right-invertible implies right-cancellative, and symmetrically for left.

!!! proposition "Proposition (Inverses compose as a group homomorphism)"
    <a id="prop-5-2-5"></a>
    <a id="prop-inverses-compose-as-a-group-homomorphism"></a>

    Let $G$ be a monoid.

    1. If $x$ is invertible, so is $x^{-1}$, and $(x^{-1})^{-1} = x$.

    2. If $x, y$ are invertible, so is $x \ast y$, and $(x \ast y)^{-1} = y^{-1} \ast x^{-1}$.

!!! notation "Notation (For a monoid $M$)"
    <a id="notation-for-a-monoid"></a>

    For a monoid $M$, $M^\times$ denotes the submonoid of invertible elements. For a group $G$, $G^\times = G$.

!!! definition "Definition (One-sided inverses)"
    <a id="def-one-sided-inverses"></a>

    If $xy=e$, then $x$ is a **left inverse** of $y$ and $y$ a **right inverse** of $x$. Left invertibility for an operation is right invertibility for its opposite.

??? proof "Proof"
    Two neutral elements satisfy $e=ee'=e'$. If $u$ is a left inverse of $g$ and $v$ a right inverse, then $u=u(gv)=(ug)v=v$, proving coincidence and uniqueness of all one-sided inverses when both exist. If $gh=e$ and $xg=yg$, then $x=(xg)h=(yg)h=y$; the left case is dual. Finally $(xy)(y^{-1}x^{-1})=e=(y^{-1}x^{-1})(xy)$, proving the product inverse formula, and $xx^{-1}=x^{-1}x=e$ proves involution.

!!! example "Example (Monoids and permutation groups)"
    <a id="ex-monoids-and-permutation-groups"></a>

    $M_X$ is a monoid with identity $\operatorname{Id}_X$; $(d\mathbb N,+)$ has identity $0$, and $(\mathbb N,\cdot)$ has identity $1$. For any set $X$, the bijections form the group $S_X$. A permutation of $\{1,\ldots,n\}$ can be recorded as


    $$
    \begin{pmatrix}1&2&\cdots&n\\f(1)&f(2)&\cdots&f(n)\end{pmatrix}.
    $$

!!! notation "Notation (Multiplicative and additive conventions)"
    <a id="notation-multiplicative-and-additive-conventions"></a>

    Write a multiplicative identity as $1$ and inverse as $x^{-1}$;
    with an additive law use $0$ and $-x$. Binary operations include
    semigroup laws, monoid laws, and group laws in turn; abelian groups
    are the groups with commutative law.

## Subgroups

!!! definition "Definition (Subgroup)"
    <a id="def-5-3-1"></a>
    <a id="def-subgroup"></a>

    A **subgroup** of a group $G$ is a subset $H \subseteq G$ such that

    + the neutral element $e \in H$;
    + $H$ is closed under $\ast$;
    + $H$ is closed under taking inverses.

    Equivalently, $\varnothing \neq H \subseteq G$ and $\forall x, y \in H,\ x \ast y^{-1} \in H$.

!!! proposition "Proposition (Subgroup test)"
    <a id="prop-5-3-2"></a>
    <a id="prop-subgroup-test"></a>

    Let $M$ be a monoid, and let $\varnothing \neq H \subseteq M^\times$ be a
    subset such that $\forall x, y \in H,\ x \ast y^{-1} \in H$. Then $H$ is a
    subgroup of $M^\times$.

??? proof "Proof"
    Setting $x = y$ gives $e \in H$. For any $y \in H$,
    $e \ast y^{-1} = y^{-1} \in H$. For any $x, y \in H$,
    $x \ast \bigl((y^{-1})^{-1}\bigr) = x \ast y \in H$. Together these give the
    three subgroup axioms.

!!! proposition "Proposition (Intersection of subgroups)"
    <a id="prop-5-3-3"></a>
    <a id="prop-intersection-of-subgroups"></a>

    The intersection of any non-empty family of subgroups is a subgroup.

!!! definition "Definition (Subsemigroup and submonoid)"
    <a id="def-subsemigroup-and-submonoid"></a>

    A **subsemigroup** is a subset closed under the operation; a
    **submonoid** also contains the ambient identity. For $d\ge1$,
    $d\mathbb N$ is a submonoid of $(\mathbb N,+)$ and a subsemigroup
    of $(\mathbb N,\cdot)$. The units of $M_X$ form $S_X$.

!!! corollary "Corollary (The group of units)"
    <a id="cor-the-group-of-units"></a>

    The invertible elements of a monoid form a submonoid and a group.

??? proof "Proof"
    Products and inverses of units remain units, so the subgroup test
    applies. For intersections, closure holds in each member; identities
    and inverses remain in every member. The same proof establishes
    intersection closure for subsemigroups and submonoids.

## Group Homomorphisms

!!! definition "Definition (Group homomorphism)"
    <a id="def-5-4-1"></a>
    <a id="def-group-homomorphism"></a>

    Let $(G, \ast)$ and $(H, \star)$ be groups. A mapping $f : G \to H$ is a
    **group homomorphism** if

    $$
    f(x \ast y) = f(x) \star f(y)
    \quad\text{for all } x, y \in G.
    $$

    A bijective homomorphism is a **group isomorphism**.

!!! remark "Remark (For a homomorphism $f : G \to H$)"
    <a id="rem-for-a-homomorphism"></a>

    For a homomorphism $f : G \to H$ between groups, the three axioms
    $f(xy) = f(x)f(y)$, $f(e_G) = e_H$, and $f(x^{-1}) = f(x)^{-1}$ are
    not independent: the first alone implies the other two.

!!! proposition "Proposition (Images and preimages of subgroups)"
    <a id="prop-5-4-2"></a>
    <a id="prop-be-a-group"></a>

    Let $f : G \to H$ be a group homomorphism and $K \leq G$ a subgroup. Then
    $f(K)$ is a subgroup of $H$.

!!! proposition "Proposition (Image of a subgroup is a subgroup)"
    <a id="prop-5-4-3"></a>
    <a id="prop-image-of-a-subgroup-is-a-subgroup"></a>

    The composite of group homomorphisms is a group homomorphism. A bijective
    group homomorphism has a group-homomorphism inverse.

!!! definition "Definition (Semigroup and monoid homomorphisms)"
    <a id="def-semigroup-and-monoid-homomorphisms"></a>

    A **semigroup homomorphism** preserves products. A **monoid
    homomorphism** also preserves the identity. An **isomorphism** is
    a homomorphism admitting a homomorphism inverse, equivalently a
    bijective homomorphism of the stated type.

!!! example "Example (Why monoid identities must be preserved)"
    <a id="ex-why-monoid-identities-must-be-preserved"></a>

    The constant map $(\mathbb N,\cdot)\to(\mathbb N,\cdot)$ with
    value $0$ preserves products but sends $1$ to $0$, and its image
    is not a submonoid. Inclusions of substructures are homomorphisms.

!!! proposition "Proposition (Functorial properties of homomorphisms)"
    <a id="prop-functorial-properties-of-homomorphisms"></a>

    Images of subsemigroups, submonoids, or subgroups under a
    homomorphism of that type are substructures of that type. Composites
    and inverses of bijective homomorphisms preserve that type.
    Inversion is a group isomorphism $G\to G^{\mathrm{op}}$.

??? proof "Proof"
    Products of image elements are images of products. Identities map to
    identities for monoid homomorphisms; inverse images of group elements
    satisfy $f(x^{-1})=f(x)^{-1}$. For groups,
    $f(e)=f(e)^2$ implies $f(e)=e$, and $f(x)f(x^{-1})=e$ gives
    inverse preservation. Composites preserve each defining identity.
    If $f$ is bijective, writing $y_i=f(x_i)$ gives
    $f^{-1}(y_1y_2)=x_1x_2$; the identity and inverse conditions follow
    in the same way. Inversion reverses product order, hence maps to
    the opposite group as a homomorphism.

## Quotients

!!! definition "Definition (Compatible equivalence relation)"
    <a id="def-5-5-1"></a>
    <a id="def-compatible-equivalence-relation"></a>

    Let $(X, \ast)$ be a semigroup and $\sim$ an equivalence relation on $X$
    that is **compatible** with $\ast$ (i.e. $x_1 \sim x_2$ and
    $y_1 \sim y_2$ imply $x_1 \ast y_1 \sim x_2 \ast y_2$). Then
    $\ast$ descends to a well-defined composition law on $X / \{\sim\}$, also
    denoted $\ast$, by

    $$
    [x] \ast [y] := [x \ast y].
    $$

!!! proposition "Proposition (Algebraic structure descends to quotient)"
    <a id="prop-5-5-2"></a>
    <a id="prop-algebraic-structure-descends-to-quotient"></a>

    Compatibility of $\sim$ with $\ast$ transfers all of the following from
    $X$ to $X / \{\sim\}$: associativity, commutativity, existence of a neutral
    element, existence of inverses.

!!! definition "Definition (Kernel of a homomorphism)"
    <a id="def-5-5-3"></a>
    <a id="def-kernel-of-a-homomorphism"></a>

    Let $f : G \to H$ be a group homomorphism. The **kernel** of $f$ is
    $\ker f := \{x \in G \mid f(x) = e_H\}$.

!!! proposition "Proposition (Kernel is a subgroup)"
    <a id="prop-5-5-4"></a>
    <a id="prop-kernel-is-a-subgroup"></a>

    $\ker f$ is a subgroup of $G$. Moreover, for every $(a, x) \in G \times \ker f$ there exists $y \in \ker f$ with $a \ast x = y \ast a$.

!!! definition "Definition (Normal subgroup)"
    <a id="def-5-5-5"></a>
    <a id="def-normal-subgroup"></a>

    A subgroup $H$ of a group $G$ is **normal** (written $H \trianglelefteq G$)
    if $\forall (a, x) \in G \times H,\ a \ast x \ast a^{-1} \in H$.

!!! theorem "Theorem (Quotient group by a normal subgroup)"
    <a id="thm-5-5-6"></a>
    <a id="thm-quotient-group-by-a-normal-subgroup"></a>

    Let $H \trianglelefteq G$. Define $x \sim_H y \iff x \ast y^{-1} \in H$. Then

    1. $\sim_H$ is an equivalence relation, with
       $[x] = \{y \in G \mid y \ast x^{-1} \in H\} = H \ast x$.
    2. $\sim_H$ is compatible with the group operation; the quotient
       $G / H := G / \{\sim_H\}$ is a group.
    3. The projection $\pi : G \to G / H$ has kernel $H$.

??? proof "Proof"
    (1) Reflexive: $e \in H$. Symmetric: $x \ast y^{-1} \in H \Rightarrow y \ast x^{-1} = (x \ast y^{-1})^{-1} \in H$. Transitive: if
    $x \ast y^{-1}, y \ast z^{-1} \in H$ then
    $x \ast z^{-1} = (x \ast y^{-1})(y \ast z^{-1}) \in H$.
    (2) Normality gives $x \ast H = H \ast x$ for all $x$, so the compatibility
    follows from the calculation in the proof of
    [Proposition](#prop-algebraic-structure-descends-to-quotient).
    (3) $\ker \pi = [e_G] = H \ast e_G = H$.

!!! theorem "Theorem (First isomorphism theorem)"
    <a id="thm-5-5-7"></a>
    <a id="thm-first-isomorphism-theorem"></a>

    Let $f : G \to H$ be a group homomorphism and $K = \ker f$. Then

    1. $K$ is a normal subgroup of $G$.
    2. There is a unique injective homomorphism
       $\tilde f : G / K \to H$ with $\tilde f \circ \pi = f$, and
       $\tilde f(G / K) = f(G)$.

    In particular, $G / K \cong f(G)$.

??? proof "Proof"
    (1) The kernel is a subgroup (Proposition above); normality follows from
    the standard identity $a x a^{-1} \in K$ for $x \in K$.
    (2) $f$ is constant on cosets of $K$ because $x \sim_K y \iff f(x) = f(y)$ (since $f(x \ast y^{-1}) = f(x) f(y)^{-1}$). Hence
    $\tilde f$ descends to the quotient; the same calculation as for
    [Proposition](#prop-algebraic-structure-descends-to-quotient) shows it is a homomorphism; it is
    injective by construction.

!!! proposition "Proposition (Products of equivalence relations)"
    <a id="prop-products-of-equivalence-relations"></a>

    For equivalence relations $\sim_i$ on $X_i$, coordinatewise
    equivalence on $X=\prod_i X_i$ is an equivalence relation and

    $$
    X/{\sim}\longrightarrow\prod_i(X_i/{\sim_i}),\qquad
    [(x_i)_i]\longmapsto([x_i])_i
    $$

    is a bijection.

??? proof "Proof"
    Reflexivity, symmetry, and transitivity hold coordinatewise. The
    formula is well defined, and equality of its values gives equivalent
    coordinates, hence equivalent tuples and injectivity. Choice of one
    representative in each specified coordinate class gives surjectivity.

!!! definition "Definition (Compatibility with a mapping)"
    <a id="def-compatibility-with-a-mapping"></a>

    A relation $\sim$ is **compatible** with $f:X\to Y$ if
    $x\sim y\Rightarrow f(x)=f(y)$. The unique
    $\widetilde f:X/{\sim}\to Y$ with $\widetilde f\circ\pi=f$ is
    the mapping **induced by passage to the quotient**. Existence is the
    well-definedness of $[x]\mapsto f(x)$; uniqueness follows by evaluating
    at $\pi(x)$.

!!! example "Example (Congruence modulo an integer)"
    <a id="ex-congruence-modulo-an-integer"></a>

    On $\mathbb Z$, $x\sim_n y$ means $n\mid x-y$. Addition and
    multiplication descend to classes: if $x_1\sim_n x_2$ and
    $y_1\sim_n y_2$, use the sum of differences and
    $x_1y_1-x_2y_2=x_1(y_1-y_2)+(x_1-x_2)y_2$.

??? proof "Proof"
    Quotient associativity follows by
    $[x]([y][z])=[x(yz)]=[(xy)z]=([x][y])[z]$;
    quotient commutativity follows by $[xy]=[yx]$. The identity is
    $[e]$, the projection preserves products and identities, and the
    inverse of $[x]$ for a unit $x$ is $[x^{-1}]$.

!!! proposition "Proposition (Automatic preservation of identities)"
    <a id="prop-automatic-preservation-of-identities"></a>

    A surjective semigroup homomorphism from a monoid makes its target
    semigroup a monoid with identity $f(e)$. A semigroup homomorphism
    from a monoid into a group always preserves the identity.

??? proof "Proof"
    If $y=f(x)$, then $f(e)y=f(ex)=y$ and $yf(e)=f(xe)=y$.
    In a group, the idempotent $f(e)=f(e)^2$ must be the identity.

??? proof "Proof"
    For the kernel assertion, $f(xy^{-1})=e$ whenever $x,y\in\ker f$;
    for conjugation set $y=axa^{-1}$ and compute
    $f(y)=f(a)ef(a)^{-1}=e$, so $ax=ya$.
    For a subgroup $H$, $xy^{-1}\in H$ defines an equivalence relation
    even before assuming normality, and $[x]=Hx$ because
    $yx^{-1}\in H$ exactly when $y=hx$. Normality gives
    $xH\subseteq Hx$ by $xh=(xhx^{-1})x$; conjugating with $x^{-1}$
    gives the reverse inclusion. Compatibility is the explicit identity

    $$
    (x_1y_1)(x_2y_2)^{-1}
    =\bigl(x_1(y_1y_2^{-1})x_1^{-1}\bigr)(x_1x_2^{-1})\in H.
    $$

    Thus the quotient map has kernel $[e]=H$. The first isomorphism
    theorem uses $x\sim_{\ker f}y\Longleftrightarrow f(x)=f(y)$;
    this equivalence proves injectivity, and
    $\widetilde f([x][y])=f(xy)=f(x)f(y)$ proves the homomorphism property.
    Its image is $f(G)$ since every class has a representative.

!!! notation "Notation (Left and right coset sets)"
    <a id="notation-left-and-right-coset-sets"></a>

    For any subgroup, $G/H=\{xH\mid x\in G\}$ and
    $H\backslash G=\{Hx\mid x\in G\}$. They coincide as coset sets
    when $H$ is normal, and then carry the quotient group law.

## Universal Homomorphisms

!!! proposition "Proposition (Universal homomorphism into a monoid)"
    <a id="prop-5-6-1"></a>
    <a id="prop-universal-homomorphism-into-a-monoid"></a>

    Let $(M, \ast)$ be a monoid and $x \in M$. There exists a unique monoid
    homomorphism $f : (\mathbb{N}, +) \to (M, \ast)$ with $f(1) = x$, given by
    $f(0) = e_M$ and $f(n+1) = f(n) \ast x$.

??? proof "Proof"
    Induction on $m$ shows $f(n + m) = f(n) \ast f(m)$. Uniqueness follows by
    the same induction: $g(1) = x$ forces $g(n+1) = g(n) \ast g(1) = g(n) \ast x$.

!!! notation "Notation (Under the universal homomorphism of the proposition)"
    <a id="notation-under-the-universal-homomorphism-of-the-proposition"></a>

    Under the universal homomorphism of the proposition, write
    $x^{\ast n} := f(n)$, with $x^{\ast 0} = e_M$ and
    $x^{\ast(n+m)} = x^{\ast n} \ast x^{\ast m}$. In additive notation this
    becomes $n \cdot x$.

!!! proposition "Proposition (Universal homomorphism from the integers)"
    <a id="prop-5-6-2"></a>
    <a id="prop-m"></a>

    Let $(M, \ast)$ be a monoid and $x \in M^\times$. There exists a unique homomorphism $(\mathbb{Z}, +) \to (M, \ast)$ with $1 \mapsto x$, hence a homomorphism $(\mathbb{Z}, +) \to (M^\times, \ast)$.

??? proof "Proof"
    For $n\ge0$ use $f(n)=x^n$ and for $n<0$ use $f(n)=(x^{-n})^{-1}$. Nonnegative exponents obey the previously proved law; negative exponents obey it by reversing products of powers of the same element. For mixed signs cancel the smaller nonnegative power against its inverse. This proves $f(n+m)=f(n)f(m)$. Uniqueness follows for positive exponents from recursion and for negative exponents from inverse preservation. Necessity of invertibility follows from $f(1)f(-1)=e$; the source statement without this hypothesis is false.

!!! proposition "Proposition (Laws of powers)"
    <a id="prop-laws-of-powers"></a>

    If $xy=yx$, then $x^ny^m=y^mx^n$ and $(xy)^n=x^ny^n$ for $n,m\ge0$. For a unit $x$, $(x^n)^{-1}=(x^{-1})^n$ and, for $n\ge m$, $x^{n-m}=x^n(x^{-1})^m$ and $(x^{n-m})^{-1}=(x^{-1})^nx^m$.

??? proof "Proof"
    First induct on $n$ to commute $x^n$ past $y$, then induct on $m$ to commute it past $y^m$. The product formula follows by induction, moving $x$ past $y^n$. Applying it to $x,x^{-1}$ gives inverse powers, and writing $x^n=x^{n-m}x^m$ gives the cancellation formulas.

!!! definition "Definition (Product of algebraic structures)"
    <a id="def-product-of-algebraic-structures"></a>

    On $M=\prod_i M_i$ define $(x_i)_i\ast(y_i)_i=(x_i\ast_i y_i)_i$. Commutativity and associativity pass coordinatewise. Identities form $(e_i)_i$, each projection is a homomorphism, and $M^\times=\prod_i M_i^\times$ with coordinatewise inversion.

??? proof "Proof"
    A product inverse projects to a two-sided inverse in every coordinate. Conversely the tuple of coordinate inverses is an inverse in $M$. All other axioms are equalities that can be tested at each coordinate.

!!! theorem "Theorem (Universal property of the product)"
    <a id="thm-universal-property-of-the-product"></a>

    Given homomorphisms $f_i:N\to M_i$ of semigroups, monoids, or groups of the respective type, there is a unique homomorphism $f:N\to\prod_i M_i$ with $\pi_i\circ f=f_i$.

??? proof "Proof"
    The mapping is $f(y)=(f_i(y))_i$. Multiplication, and the identity when required, are preserved coordinatewise. The set-theoretic product property gives uniqueness. The arrow is from $N$ into the product; the opposite direction printed in the source is a typo.

!!! notation "Notation (Finitely supported sums and products)"
    <a id="notation-finitely-supported-sums-and-products"></a>

    In a commutative monoid, $\sum_i x_i$ or $\prod_i x_i$ is defined when only finitely many $x_i$ differ from the identity. Enumerate that finite support and combine its elements; commutativity makes the result independent of enumeration. Empty sums and products are the corresponding identities.

!!! definition "Definition (Direct sum of commutative monoids)"
    <a id="def-direct-sum-of-commutative-monoids"></a>

    For commutative monoids $M_i$, their **direct sum** is


    $$
    \bigoplus_i M_i=\{(x_i)_i\in\prod_i M_i\mid
    \{i\mid x_i\ne e_i\}\text{ is finite}\}.
    $$

    The inclusion $\lambda_j:M_j\to\bigoplus_i M_i$ places its argument
    in coordinate $j$ and identities in the others. This is a submonoid:
    the support of a product lies in the union of the two supports.

!!! theorem "Theorem (Universal property of the direct sum)"
    <a id="thm-universal-property-of-the-direct-sum"></a>

    For homomorphisms $\psi_i:M_i\to N$ into a commutative monoid,
    there is a unique homomorphism $\psi:\bigoplus_i M_i\to N$ with
    $\psi\circ\lambda_i=\psi_i$.

??? proof "Proof"
    In additive notation define $\psi((x_i)_i)=\sum_i\psi_i(x_i)$.
    The sum is finite; commutativity permits rearrangement to prove
    additivity, and identities are preserved. Every tuple is the finite
    sum of its $\lambda_i(x_i)$, proving uniqueness. The source triangle
    has arrows $M_j\xrightarrow{\lambda_j}\bigoplus_i M_i$,
    $\bigoplus_i M_i\xrightarrow\psi N$, and $M_j\xrightarrow{\psi_j}N$.
