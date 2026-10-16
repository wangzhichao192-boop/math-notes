# Rings and Modules

This chapter combines the additive and multiplicative structures into
**rings** and then introduces the linear-algebraic notion of **modules**
(generalising vector spaces to scalars in a ring).

## Unitary Rings

!!! definition "Definition (Unitary ring)"
    <a id="def-6-1-1"></a>
    <a id="def-unitary-ring"></a>

    A **unitary ring** $(A, +, \cdot)$ is a set $A$ with two composition
    laws such that

    + $(A, +)$ is an abelian group (with neutral element $0$);
    + $(A, \cdot)$ is a monoid (with neutral element $1$);
    + multiplication distributes over addition:
      $a \cdot (b + c) = a \cdot b + a \cdot c$ and
      $(a + b) \cdot c = a \cdot c + b \cdot c$.

    The ring is **commutative** if $\cdot$ is commutative.

!!! example "Example (Unitary subring)"
    <a id="ex-unitary-subring"></a>

    $(\mathbb{Z}, +, \cdot)$ is a commutative unitary ring. The trivial
    ring $(\{0\}, +, \cdot)$ is the zero ring.

!!! definition "Definition (Unitary subring)"
    <a id="def-6-1-2"></a>
    <a id="def-unitary-subring"></a>

    A **unitary subring** $B \subseteq A$ is a subset that is a subgroup of
    $(A, +)$ and a submonoid of $(A, \cdot)$ — equivalently, a subset closed under $+$, additive inverses and $\cdot$, and containing $1$.

!!! definition "Definition (Ring homomorphism)"
    <a id="def-6-1-3"></a>
    <a id="def-ring-homomorphism"></a>

    A **ring homomorphism** $f : A \to B$ is a group homomorphism on the
    additive groups and a monoid homomorphism on the multiplicative
    monoids (so $f(1_A) = 1_B$).

!!! lemma "Lemma (Multiplication by zero and negatives)"
    <a id="lem-6-1-4"></a>
    <a id="lem-multiplication-by-zero-and-negatives"></a>

    In any unitary ring $A$:

    1. $0 \cdot a = a \cdot 0 = 0$ for every $a \in A$.
    2. $-(a b) = (-a) b = a (-b)$.

!!! proposition "Proposition (Canonical Z → A homomorphism)"
    <a id="prop-6-1-5"></a>
    <a id="prop-canonical-z-a-homomorphism"></a>

    For any unitary ring $A$ there exists a unique ring homomorphism
    $\mathbb{Z} \to A$, given by $n \mapsto n \cdot 1_A$.

!!! definition "Definition (Division ring, field)"
    <a id="def-6-1-6"></a>
    <a id="def-division-ring-field"></a>

    A **division ring** (or **skew field**) is a nonzero unitary ring $K$ in which
    every non-zero element is invertible. A **field** is a commutative
    division ring.

!!! definition "Definition (Opposite ring)"
    <a id="def-opposite-ring"></a>

    Reversing multiplication gives the **opposite ring** $A^{\mathrm{op}}$,
    with the same addition and $a\widehat\cdot b=ba$.
    A unitary subring must be closed under **additive inverses** as well
    as addition and multiplication, and contain the ambient identity.

!!! proposition "Proposition (Zero ring and the canonical integer mapping)"
    <a id="prop-zero-ring-and-the-canonical-integer-mapping"></a>

    Every unitary ring has a unique homomorphism to the zero ring. Its
    canonical integer homomorphism is uniquely $n\mapsto n1_A$.

??? proof "Proof"
    The unique mapping to $\{0\}$ preserves both laws and the identity,
    because $0=1$ in that ring. For the integer mapping, additive
    preservation and $f(1)=1_A$ force the formula. For $n,m\ge0$,
    distributivity gives $(n1_A)(m1_A)=nm1_A$; using
    $(-a)b=a(-b)=-ab$ covers negative integers. The zero and sign
    formulas themselves follow from $0a=(0+0)a=0a+0a$ and
    $ab+(-a)b=(a-a)b=0$; the right-hand versions are analogous.

!!! example "Example (Fields)"
    <a id="ex-fields"></a>

    $\mathbb Q$, $\mathbb R$, and $\mathbb C$ are fields. A division
    ring is nonzero: its units are exactly the complement of $\{0\}$.

## Actions of Monoids

!!! definition "Definition (Action of a monoid)"
    <a id="def-6-2-1"></a>
    <a id="def-action-of-a-monoid"></a>

    A **left action** of a monoid $G$ (with neutral $e$) on a set $X$ is a
    map $\phi : G \times X \to X$ with

    + $\phi(e, x) = x$;
    + $\phi(a \ast b, x) = \phi(a, \phi(b, x))$ for all $a, b \in G$.

    When $G$ is a group and $\phi$ is a left action, the relation
    $x \sim y \iff \exists g \in G,\ \phi(g, x) = y$ is an equivalence
    relation; its classes are the **orbits** of the action.

!!! remark "Remark (Lagrange formula for finite groups)"
    <a id="rem-if-is-finite-and"></a>

    If $G$ is finite and $H \leq G$, then
    $\operatorname{card}(G) = \operatorname{card}(H) \cdot \operatorname{card}(H \backslash G)$,
    the classical **orbit-counting** identity.

!!! definition "Definition (Right actions and orbit sets)"
    <a id="def-right-actions-and-orbit-sets"></a>

    A **right action** satisfies $xe=x$ and $(xa)b=x(ab)$; it is a left
    action of the opposite monoid. For a group acting on $X$, write
    $G\backslash X$ for the left-action orbit set and $X/G$ for the
    right-action orbit set.

!!! example "Example (Subgroup actions)"
    <a id="ex-subgroup-actions"></a>

    A subgroup $H\le G$ acts on $G$ by left multiplication $(h,g)\mapsto hg$
    and by right multiplication $(g,h)\mapsto gh$.

!!! proposition "Proposition (Reachability and orbit counting)"
    <a id="prop-reachability-and-orbit-counting"></a>

    For any monoid action, $x\sim y$ if $y=gx$ for some $g$ is reflexive
    and transitive. For a group it is symmetric as well. If $X$ is finite,
    $\operatorname{card}X=\sum_{A\in G\backslash X}\operatorname{card}A$.
    In particular $\operatorname{card}G=\operatorname{card}H\, \operatorname{card}(H\backslash G)$ for finite $G$.

??? proof "Proof"
    $x=ex$ proves reflexivity; $y=ax$, $z=by$ imply $z=(ba)x$.
    In a group $y=ax$ implies $x=a^{-1}y$. Orbits therefore partition
    $X$, giving the sum. Multiplication $h\mapsto hg$ is a bijection
    $H\to Hg$, so all these orbits have cardinality $\operatorname{card}H$.

## Modules and Vector Spaces

!!! definition "Definition (Left K-module, vector space)"
    <a id="def-6-3-1"></a>
    <a id="def-left-k-module-vector-space"></a>

    Let $K$ be a unitary ring and $(V, +)$ an abelian group. A
    **left $K$-module structure** on $V$ is a left action
    $\phi : K \times V \to V$ that is bilinear:

    + $\phi(a + b, x) = \phi(a, x) + \phi(b, x)$;
    + $\phi(a, x + y) = \phi(a, x) + \phi(a, y)$.

    A left $K$-module is $V$ together with such a structure. For
    commutative $K$, left and right module structures coincide, and we
    simply call $V$ a **$K$-module**. When $K$ is a field, a
    $K$-module is called a **vector space** over $K$.

!!! example "Example (Canonical module structures)"
    <a id="ex-any-abelian-group-carries-a-canonical"></a>

    + Any abelian group $V$ carries a canonical $\mathbb{Z}$-module
      structure: $n \cdot v$ is the $n$-fold sum $v + \cdots + v$
      (with sign for negative $n$).
    + $K$ itself is a left $K$-module via the multiplication $a \cdot x = ax$.

!!! example "Example (Zero, products, and the scalar module)"
    <a id="ex-zero-products-and-the-scalar-module"></a>

    The one-point group $\{0\}$ with $a0=0$ is the **zero module**.
    $K$ is a left module over itself by multiplication. Products
    $\prod_i V_i$ have coordinatewise addition and scalar multiplication.

## Submodules and Homomorphisms

!!! definition "Definition (Left K-submodule)"
    <a id="def-6-4-1"></a>
    <a id="def-left-k-submodule"></a>

    A **left $K$-submodule** of a left $K$-module $V$ is a subgroup
    $W \leq (V, +)$ that is closed under the action of $K$.

!!! definition "Definition (K-linear map)"
    <a id="def-6-4-2"></a>
    <a id="def-k-linear-map"></a>

    A **$K$-linear map** (or **homomorphism of $K$-modules**)
    $f : E \to F$ is a group homomorphism of the underlying abelian
    groups with $f(a x) = a f(x)$ for $a \in K$ and $x \in E$.
    Bijective $K$-linear maps are $K$-module isomorphisms.

!!! lemma "Lemma (Zero annihilates and is annihilated)"
    <a id="lem-6-4-3"></a>
    <a id="lem-zero-annihilates-and-is-annihilated"></a>

    In a left $K$-module $V$:

    1. $a \cdot 0_V = 0_V$ for all $a \in K$;
    2. $0_K \cdot x = 0_V$ for all $x \in V$.

!!! theorem "Theorem (Kernel and image of a K-linear map)"
    <a id="thm-6-4-4"></a>
    <a id="thm-kernel-and-image-of-a-k-linear-map"></a>

    Let $f : E \to F$ be a $K$-linear map.

    1. $\ker f$ is a left $K$-submodule of $E$.
    2. $\operatorname{Im} f$ is a left $K$-submodule of $F$.

??? proof "Proof"
    (1) $f(ax) = a f(x) = a \cdot 0_F = 0_F$ for $x \in \ker f$.
    (2) For $y = f(x) \in \operatorname{Im} f$ and $a \in K$, $ay = a f(x) = f(ax) \in \operatorname{Im} f$.

!!! proposition "Proposition (K-linearity criterion)"
    <a id="prop-6-4-5"></a>
    <a id="prop-k-linearity-criterion"></a>

    A map $f : E \to F$ between left $K$-modules is $K$-linear iff
    $f(x + a y) = f(x) + a f(y)$ for all $a \in K$ and $x, y \in E$.

??? proof "Proof"
    Setting $a = 1$ gives additivity; setting $x = 0$ gives scalar
    multiplicativity. Conversely, both properties together imply
    $K$-linearity.

!!! example "Example (Trivial submodules and finite support)"
    <a id="ex-trivial-submodules-and-finite-support"></a>

    $\{0\}$ and $V$ are submodules of $V$. The direct sum is a
    submodule of the product because multiplication by a scalar cannot
    enlarge support. Write $K^{\oplus I}$ for finitely supported families
    of elements of $K$.

!!! proposition "Proposition (Negatives and finite linear combinations)"
    <a id="prop-negatives-and-finite-linear-combinations"></a>

    In a module $-x=(-1)x$. A module homomorphism satisfies
    $f(\sum_{i=1}^n a_ix_i)=\sum_{i=1}^n a_if(x_i)$.
    Composites of module homomorphisms are module homomorphisms, and
    inverses of bijective module homomorphisms are module homomorphisms.

??? proof "Proof"
    $(-1)x+x=(-1+1)x=0$. The zero formulas follow by subtracting
    $a0$ from $a0=a0+a0$, and $0x$ from $0x=0x+0x$.
    Induct on the number of summands for the finite-combination identity.
    For a composite, apply both homomorphisms to $x+ay$. For an inverse,
    write $y=f(x)$ and use $f(ax)=af(x)$ and additivity.

## Universal Property and Direct Sums

!!! proposition "Proposition (A module element determines a linear mapping)"
    <a id="prop-6-5-1"></a>

    Let $V$ be a left $K$-module and $x \in V$. There exists a unique
    $K$-linear map $\phi_x : K \to V$ with $\phi_x(1) = x$, given by
    $\phi_x(a) = a x$.

!!! proposition "Proposition (Universal properties of module products and sums)"
    <a id="prop-6-5-2"></a>

    Let $(V_i)_{i \in I}$ be a family of left $K$-modules.

    1. The **direct product** $\prod_{i \in I} V_i$ is a left $K$-module
       under component-wise action; for any $K$-module $W$ and family
       $(f_i : W \to V_i)_{i \in I}$ of $K$-linear maps, there is a unique
       $K$-linear $f : W \to \prod_i V_i$ with $\pi_i \circ f = f_i$ for
       each $i$.
    2. The **direct sum** $\bigoplus_{i \in I} V_i$ (the sub-$\prod$
       of families with finite support) is a left $K$-submodule of
       $\prod_i V_i$. For any $K$-module $W$ and family
       $(g_i : V_i \to W)_{i \in I}$ of $K$-linear maps, there is a
       unique $K$-linear $g : \bigoplus_i V_i \to W$ with
       $g \circ \lambda_i = g_i$ for each $i$ (where $\lambda_i$ embeds
       $V_i$ as the $i$-th summand).

??? proof "Proof"
    (1) Define $f(z) = (f_i(z))_{i \in I}$. It is $K$-linear because each
    $f_i$ is, and component-wise sums/scalars distribute.
    (2) The formula $g((x_i)_{i \in I}) = \sum_{i \in I} g_i(x_i)$ is
    well defined since the sum is finite; linearity follows term-by-term.


??? proof "Proof"
    For an abelian group $V$, let $\varphi_x:\mathbb Z\to V$ be the
    homomorphism with $\varphi_x(1)=x$. Then
    $(n+m)x=nx+mx$. The mapping $\varphi_x+\varphi_y$ is a group
    homomorphism with value $x+y$ at $1$, so it equals $\varphi_{x+y}$
    and gives $n(x+y)=nx+ny$. Repeated sums and their negatives give
    $(nm)x=n(mx)$; also $1x=x$. This verifies the canonical module structure.

    For the evaluation property on $K$, linearity forces
    $\varphi_x(a)=a\varphi_x(1)=ax$; the module laws verify existence.
    In a product, the uniquely determined mapping has coordinates
    $f_i(z)$, so it commutes with scalars. In a direct sum the uniquely
    determined mapping is the finite sum $g((x_i))=\sum_i g_i(x_i)$;
    distributing a scalar through this finite sum proves linearity.

!!! proposition "Proposition (A family determines a linear mapping)"
    For $(x_i)_{i\in I}\in V^I$, the evaluation mappings $a\mapsto ax_i$
    uniquely induce $\varphi_x:K^{\oplus I}\to V$,
    $(a_i)_i\mapsto\sum_i a_ix_i$.


## Matrices

!!! definition "Definition (Column matrix)"
    <a id="def-6-6-1"></a>
    <a id="def-column-matrix"></a>

    A **column matrix** with entries in a left $K$-module $V$, written

    $$
    \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}
    \quad (x_i \in V),
    $$

    is the $K$-linear map $K^n \to V$ sending
    $(a_1, \ldots, a_n) \mapsto a_1 x_1 + \cdots + a_n x_n$.

    An $n \times p$ **matrix** with coefficients in $K$ is a $K$-linear
    map $K^n \to K^p$. Composition of matrices corresponds to matrix
    multiplication:

    $$
    (AB)_{i, j} = \sum_{k=1}^{p} a_{i, k}\, b_{k, j}.
    $$

!!! definition "Definition (Row echelon form)"
    <a id="def-6-6-2"></a>
    <a id="def-row-echelon-form"></a>

    A matrix $A$ is in **row echelon form** if the index
    $j(\vec a^{(i)})$ of the first non-zero entry of the $i$-th row is
    weakly increasing in $i$ (strictly as long as $\leq p$); it is in
    **reduced row echelon form** if in addition each pivot entry
    equals $1$ and is the only non-zero entry in its column.

!!! theorem "Theorem (Row reduction)"
    <a id="thm-6-6-3"></a>
    <a id="thm-row-reduction"></a>

    Suppose $A \in M_{n, p}(K)$ is in reduced row echelon form and
    $(b_1, \ldots, b_n) \in V^n$. Let
    $I(A) = \{i \in \{1, \ldots, n\} \mid \vec a^{(i)} \neq 0\}$ and
    $J_0(A) = \{1, \ldots, p\} \setminus \{j(\vec a^{(i)}) \mid i \in I(A)\}$.

    1. If there exists $i \in \{1, \ldots, n\} \setminus I(A)$ with
       $b_i \neq 0$, the system $A\, x = b$ has no solution.
    2. Otherwise, the solution set is parametrised by
       $(z_l)_{l \in J_0(A)} \in V^{J_0(A)}$ via

    $$
    x_k =
    \begin{cases}
    z_k, & k \in J_0(A), \\
    b_i - \displaystyle\sum_{l \in J_0(A)} a_{i, l}\, z_l,
      & k = j(\vec a^{(i)}).
    \end{cases}
    $$

!!! proposition "Proposition (Elementary row operations preserve solutions)"
    <a id="prop-6-6-4"></a>
    <a id="prop-elementary-row-operations-preserve-solutions"></a>

    Let $S \in M_{m, n}(K)$ and $A \in M_{n, p}(K)$. Any solution of
    $A\, x = b$ is also a solution of $(S A)\, x = S\, b$. If $S$ has
    a left inverse (i.e. $T S = I_n$ for some $T \in M_{n, m}(K)$),
    the two systems have identical solution sets.

!!! notation "Notation (The source row-vector convention)"
    <a id="notation-the-source-row-vector-convention"></a>

    A matrix $A\in M_{n,p}(K)$ represents a **left** module mapping
    $K^n\to K^p$ on row vectors by $t\mapsto tA$, whose coordinates
    are $\sum_i t_i a_{ij}$. For a column of vectors $\varphi:K^p\to V$,
    $A\varphi$ means $\varphi\circ A$ and has entries
    $\sum_j a_{ij}x_j$. Thus $AB$ represents $B\circ A$.
    This convention remains valid over noncommutative rings; the order
    of coefficients must be retained.

!!! example "Example (Diagonal and identity matrices)"
    <a id="ex-diagonal-and-identity-matrices"></a>

    $\operatorname{diag}(a_1,\ldots,a_n)$ sends
    $(t_i)_i$ to $(t_ia_i)_i$. Its action on a column $(x_i)_i$ gives
    $(a_ix_i)_i$. Also $I_n=\operatorname{diag}(1,\ldots,1)$ and
    $\operatorname{diag}(a_i)\operatorname{diag}(b_i)=\operatorname{diag}(a_ib_i)$.

??? proof "Proof"
    Composing $t\mapsto(\sum_i t_i a_{ij})_j$ with
    $(s_j)_j\mapsto\sum_j s_jx_j$ gives
    $\sum_i t_i(\sum_j a_{ij}x_j)$. With $x_j$ the rows of $B$, the
    coefficient in position $(i,k)$ is $\sum_j a_{ij}b_{jk}$.
    This answers the matrix-product question in the source.

## Linear Equations

The existing row-echelon definitions belong to the theory of equations.
Elementary matrices express each elimination step and explain its effect
on the solution set.

!!! definition "Definition (First nonzero coordinate)"
    <a id="def-first-nonzero-coordinate"></a>

    For $a\in K^p$, set $j(a)=\min\{i\mid a_i\ne0\}$, with
    $j(0)=p+1$. Nonzero echelon rows have strictly increasing $j$,
    followed by zero rows.

!!! example "Example (Echelon matrices)"
    <a id="ex-echelon-matrices"></a>

    The source examples are $I_2$ and

    $$
    \begin{pmatrix}1&2&3&4&5\\0&0&2&1&0\\0&0&0&0&0\\0&0&0&0&0\end{pmatrix}.
    $$

    The second matrix is echelon but is not reduced echelon over $\mathbb Q$.

??? proof "Proof"
    In a reduced echelon system each zero row requires $b_i=0$.
    Each nonzero row has one pivot variable with coefficient $1$, no
    other pivot variables, and the remaining free variables. Solving
    that row for its pivot gives the parametrization in the preceding
    theorem; every assignment to the free variables satisfies the system
    by substitution. The parameter set is $V^{J_0(A)}$.
    Multiplying $Ax=b$ by $S$ gives $SAx=Sb$. If $TS=I_n$,
    multiplication by $T$ recovers $Ax=b$ and proves equality of solution sets.

!!! definition "Definition (Elementary matrices)"
    <a id="def-elementary-matrices"></a>

    For a permutation $\sigma$ of $\{1,\ldots,n\}$, let
    $P_\sigma(t)_i=t_{\sigma^{-1}(i)}$; then
    $P_\sigma P_{\sigma^{-1}}=I_n$, and its action on a vector column
    replaces $x_i$ by $x_{\sigma(i)}$.
    For $r=(r_i)$ set $D_r=\operatorname{diag}(r_i)$; if $s_ir_i=1$,
    then $D_sD_r=I_n$.
    For $c_i=0$, define

    $$
    S_{i,c}(t_1,\ldots,t_n)
    =(t_1,\ldots,t_{i-1},t_i+\sum_jt_jc_j,t_{i+1},\ldots,t_n).
    $$

    Then $S_{i,c}^{-1}=S_{i,-c}$. On a column it replaces $x_j$ by
    $x_j+c_jx_i$, retaining $x_i$.

!!! definition "Definition (Gaussian elimination)"
    <a id="def-gaussian-elimination"></a>

    Let $G_n(K)$ consist of finite products of the preceding permutation,
    left-invertible diagonal, and shear matrices, including the empty
    product $I_n$. A matrix $A$ is **reducible by Gaussian elimination**
    if $SA$ is reduced echelon for some $S\in G_n(K)$.

!!! lemma "Lemma (Composing elimination steps)"
    <a id="lem-composing-elimination-steps"></a>

    If $SA$ is reducible for some $S\in G_n(K)$, so is $A$, because
    products of permitted steps remain permitted.

!!! theorem "Theorem (Gaussian elimination over a division ring)"
    <a id="thm-gaussian-elimination"></a>

    Every matrix over a division ring is reducible by Gaussian elimination.

??? proof "Proof"
    Induct on the number of columns $p$, starting at $p=0$. If the first
    column vanishes, reduce the remaining columns inductively. Otherwise
    permute rows to put a nonzero entry first and multiply its row by
    its inverse to make the pivot $1$. Subtract its multiples from the
    other rows to obtain a block with first column $(1,0,\ldots,0)^T$.
    Reduce the lower-right block inductively, extending each operation
    to fix the first row. Finally subtract suitable multiples of each
    lower pivot row from the first row to clear its other pivot entries.
    This gives reduced echelon form and preserves the solution set.

## Quotient Modules and Rings

!!! proposition "Proposition (Quotient module)"
    <a id="prop-quotient-module"></a>

    If $F\le E$ is a submodule, $a[x]=[ax]$ is well defined on $E/F$,
    makes it a module, and makes $\pi:E\to E/F$ linear.

??? proof "Proof"
    If $y-x\in F$, then $ay-ax=a(y-x)\in F$. Thus scalar multiplication
    is well defined. The identities $1[x]=[x]$, $(ab)[x]=a(b[x])$,
    $(a+b)[x]=a[x]+b[x]$, and $a([x]+[y])=a[x]+a[y]$ follow by taking
    classes of the module identities. Also
    $\pi(x+ay)=[x]+a[y]=\pi(x)+a\pi(y)$.

!!! theorem "Theorem (First isomorphism theorem for modules)"
    <a id="thm-first-isomorphism-modules"></a>

    For linear $f:V\to W$, its kernel and image are submodules and
    $[x]\mapsto f(x)$ is an isomorphism $V/\ker f\to\operatorname{Im}f$.

??? proof "Proof"
    Scalar multiplication preserves the kernel and image since
    $f(ax)=af(x)$. The group isomorphism theorem supplies the well-defined
    bijection; it is linear because $\widetilde f(a[x])=f(ax)=af(x)$.

!!! definition "Definition (Ideal and quotient ring)"
    <a id="def-ideal-and-quotient-ring"></a>

    An **ideal** of a unitary ring $A$ is an additive subgroup stable
    under multiplication on both sides by arbitrary elements of $A$.
    For an ideal $I$, the ring laws descend to $A/I$, with identity $[1]$.
    More generally an equivalence relation compatible with both ring
    laws gives a **quotient ring** with a unitary projection.

??? proof "Proof"
    A compatible additive quotient has zero class an additive subgroup
    $I$, with $a\sim b$ exactly when $b-a\in I$.
    Compatibility with multiplication implies $ax,xa\in I$ for $x\in I$.
    Conversely these ideal conditions make multiplication well defined:
    if $a-a',b-b'\in I$, then
    $ab-a'b'=a(b-b')+(a-a')b'\in I$.
    Distributivity descends by
    $[a]([b]+[c])=[a(b+c)]=[ab]+[ac]$, and similarly on the right.

!!! theorem "Theorem (First isomorphism theorem for rings)"
    <a id="thm-first-isomorphism-theorem-for-rings"></a>

    For a unitary ring homomorphism $f:A\to B$, $\ker f$ is an ideal,
    $f(A)$ is a unitary subring, and $A/\ker f\cong f(A)$ as unitary rings.

??? proof "Proof"
    For $x\in\ker f$, $f(ax)=f(a)0=0=f(xa)$. The image preserves
    addition, negatives, products, and the identity. The group-induced
    bijection also preserves multiplication and $[1]$, hence is a ring
    isomorphism.

!!! example "Example (Ideals of the integers)"
    <a id="ex-ideals-of-the-integers"></a>

    Every ideal of $\mathbb Z$ is $d\mathbb Z$ for a unique $d\ge0$.
    For a nonzero ideal take its least positive member $d$. Division
    $n=dm+r$, $0\le r<d$, gives $r\in I$, forcing $r=0$.

!!! definition "Definition (Principal ideals and characteristic)"
    <a id="def-principal-ideals-and-characteristic"></a>

    In a commutative ring, an ideal $Ax$ is **principal**; if every
    ideal is principal the ring is a **principal ideal ring**.
    The kernel of $\mathbb Z\to A$ is uniquely $d\mathbb Z$; define
    the **characteristic** by $\operatorname{char}A=d$.

!!! definition "Definition (Zero divisors and integral domains)"
    <a id="def-zero-divisors-and-integral-domains"></a>

    An element $a$ is a **zero divisor**, in the source convention,
    if $ab=0$ for some $b\ne0$. A commutative ring is an **integral
    domain** if $0\ne1$ and products of nonzero elements are nonzero.
    Equivalently its only zero divisor in this convention is $0$.

!!! example "Example (Domains and a quotient with zero divisors)"
    <a id="ex-domains-and-a-quotient-with-zero-divisors"></a>

    $\mathbb Z$ and every field are domains.
    $\mathbb Z/6\mathbb Z$ is not: $[2][3]=[0]$ although both factors
    are nonzero. Every unitary subring of a domain is a domain, since
    it has the same $1\ne0$ and inherits the nonvanishing product property.

!!! proposition "Proposition (Scalars through an annihilating quotient)"
    <a id="prop-scalars-through-an-annihilating-quotient"></a>

    If an ideal $I\subseteq A$ annihilates a left $A$-module $E$, then
    $[a]x=ax$ makes $E$ a left **$A/I$-module**.

??? proof "Proof"
    Changing $a$ by $i\in I$ changes $ax$ by $ix=0$. The four module
    identities follow from those of the original action by choosing
    representatives. The resulting scalar ring is $A/I$.

## Free Modules and Dimension

!!! definition "Definition (Span, independence, basis, and finite type)"
    <a id="def-free-module-basis"></a>

    For a family $x=(x_i)_{i\in I}$ let
    $\varphi_x:K^{\oplus I}\to V$ send $(a_i)$ to $\sum_i a_ix_i$.
    Its image is the **span**. The family **generates** if $\varphi_x$
    is surjective, is **linearly independent** if it is injective, and
    is a **basis** if it is an isomorphism. A module with a basis is
    **free**; one with a finite generating family is **of finite type**.
    Elements of the span are finite **linear combinations**.

!!! example "Example (Free presentations)"
    <a id="ex-free-presentations"></a>

    $K^{\oplus I}$ has its coordinate basis. Every module is a quotient
    of a free module: index a free family by the elements of $V$ and
    send its basis vector at $v$ to $v$.

!!! theorem "Theorem (Extracting a basis)"
    <a id="thm-extracting-a-basis"></a>

    Over a division ring, every finite generating family contains a basis.

??? proof "Proof"
    Induct on its size. The empty family generates only the zero module.
    If dependent, choose a nonzero relation $\sum_i b_ix_i=0$ and permute
    to make $b_n\ne0$. Then
    $x_n=-b_n^{-1}\sum_{i<n}b_ix_i$, so removing $x_n$ preserves the
    span. Induction applies to the smaller generating family.

!!! theorem "Theorem (Lifting independence and generators from a quotient)"
    <a id="thm-lifting-independence-and-generators-from-a-quotient"></a>

    If $(x_i)_{i=1}^n$ is a family in $W\le V$ and $(\alpha_j)_{j=1}^l$
    a family in $V/W$, choose lifts $x_{n+j}$. Independence of both
    families implies independence of their concatenation; generation
    of both spaces implies generation of $V$ by the concatenation.

??? proof "Proof"
    A relation among the lifted family projects to a relation among the
    $\alpha_j$, so all lift coefficients vanish; independence in $W$
    then kills the remaining coefficients. For generation, express $[y]$
    in the $\alpha_j$, subtract the corresponding lifts from $y$, and
    express the remainder in the $x_i$.

!!! proposition "Proposition (Changing a family by a linear mapping)"
    <a id="prop-changing-a-family-by-a-linear-mapping"></a>

    If $\varphi_y=\varphi_x\circ A$ with
    $A:K^{\oplus J}\to K^{\oplus I}$, injectivity of $A$ and independence
    of $x$ imply independence of $y$; surjectivity of $A$ gives equal
    spans; bijectivity of $A$ takes bases to bases. Invertible finite
    matrices therefore preserve independence, generation, and being a basis.

??? proof "Proof"
    These are the injectivity, image, and bijectivity properties of the
    composite. For an invertible matrix apply the assertions also to
    its inverse.

!!! theorem "Theorem (Reading independence and span from reduced echelon form)"
    <a id="thm-reading-independence-and-span-from-reduced-echelon-form"></a>

    For a reduced-echelon $n\times p$ matrix over a nonzero ring, its
    full family of rows is independent precisely when none is zero.
    It generates $K^p$ precisely when it has $p$ nonzero rows.

??? proof "Proof"
    In a relation, the coordinate at the pivot of row $i$ equals its
    coefficient, so nonzero rows are independent. With $p$ pivots all
    coordinates are pivots and the nonzero rows form $I_p$. With fewer
    pivots, a nonzero vector supported in a free column cannot lie in
    their span: its pivot coordinates would force all coefficients to zero.

!!! definition "Definition (Rank and dimension)"
    <a id="def-rank-and-dimension"></a>

    Over a division ring a finite-type module has **rank** equal to the
    least cardinality of a basis. Over a field this is its **dimension**.
    The rank of a linear mapping is the rank of its image.

!!! theorem "Theorem (Dimension invariance and rank-nullity)"
    <a id="thm-rank-nullity"></a>

    For a finite-type module $V$ over a division ring and a submodule $W$,
    both $W$ and $V/W$ are of finite type and
    $\operatorname{rk}W+\operatorname{rk}(V/W)=\operatorname{rk}V$.
    Every basis of $V$ has this same cardinality. In particular
    $\operatorname{rk}\ker f+\operatorname{rk}\operatorname{Im}f =\operatorname{rk}V$ for $f:V\to U$.

??? proof "Proof"
    Take a basis $(x_1,\ldots,x_n)$ of least size and extract a quotient
    basis $([x_1],\ldots,[x_l])$ after permuting. For $j>l$ write
    $[x_j]=\sum_{i\le l}b_{ji}[x_i]$ and set
    $y_j=x_j-\sum_{i\le l}b_{ji}x_i\in W$.
    Expanding any $x\in W$ in the $x_i$ and taking classes shows that
    $x$ is a combination of the $y_j$. Thus
    $\operatorname{rk}W+\operatorname{rk}(V/W)\le n$.
    Lifting bases of $W$ and $V/W$ gives a basis of $V$ by the preceding
    theorem, proving the reverse inequality. For arbitrary basis
    $(e_1,\ldots,e_m)$, quotient by $Ke_1$; the remaining classes form
    a basis (check a relation by lifting it and using independence).
    Induction on rank gives $m-1=n-1$. An infinite basis in a finite-type
    module is impossible because finitely many generators have support
    in a finite union of basis supports. Finally use the module
    isomorphism theorem for $W=\ker f$.

## Algebras, Formal Series, and Polynomials

Throughout this section $K$ is commutative. Algebra multiplication adds a
bilinear operation to the module structure and leads to polynomial rings
and formal power series without imposing analytic convergence.

!!! definition "Definition (Algebra, unitary algebra, and subalgebra)"
    <a id="def-algebra-unitary-algebra-and-subalgebra"></a>

    A **$K$-algebra** is a $K$-module with an associative $K$-bilinear
    multiplication. It is **unitary** if multiplication has an identity.
    A **subalgebra** of a unitary algebra is a submodule and unitary
    subring. The source works with unitary algebras below.

!!! proposition "Proposition (Scalar mapping of a unitary algebra)"
    <a id="prop-scalar-mapping-of-a-unitary-algebra"></a>

    A unitary algebra has a ring structure and a unitary homomorphism
    $K\to A$, $\lambda\mapsto\lambda1_A$, with central image.
    Conversely, a unitary ring homomorphism $f:K\to A$ with central
    image defines its algebra structure by $\lambda a=f(\lambda)a$.

??? proof "Proof"
    Bilinearity gives $(\lambda1_A)a=\lambda a=a(\lambda1_A)$ and
    $(\lambda1_A)(\mu1_A)=(\lambda\mu)1_A$. Conversely the ring and
    homomorphism laws verify the module identities, while centrality gives
    $f(\lambda)(ab)=(f(\lambda)a)b=a(f(\lambda)b)$.

!!! example "Example (Zero algebra and the scalar algebra)"
    <a id="ex-zero-algebra-and-the-scalar-algebra"></a>

    The zero algebra and $K$ itself are unitary $K$-algebras.

!!! definition "Definition (Formal monoid series)"
    <a id="def-formal-monoid-series"></a>

    For a monoid $S$ whose multiplication has finite fibres, let
    $K[[S]]=K^S$, writing a family as $\sum_s a_ss$. Define

    $$
    \left(\sum_s a_ss\right)\left(\sum_s b_ss\right)
    =\sum_s\left(\sum_{uv=s}a_ub_v\right)s.
    $$

    Each coefficient is a finite sum. For $S=(\mathbb N,+)$, write
    its monoid symbol as $T^n$ and obtain **formal power series** $K[[T]]$.

!!! proposition "Proposition (The series algebra and the monoid algebra)"
    <a id="prop-the-series-algebra-and-the-monoid-algebra"></a>

    $K[[S]]$ is a unitary algebra with identity concentrated at $e_S$.
    The finitely supported families $K[S]=K^{\oplus S}$ form the
    **monoid algebra**, whether or not $S$ has finite multiplication
    fibres. When $K[[S]]$ is defined, $K[S]$ is its subalgebra.
    The polynomial algebra is $K[T]=K[\mathbb N]$.

??? proof "Proof"
    At coordinate $s$, both parenthesizations of a triple product give
    $\sum_{uvw=s}a_ub_vc_w$; the fibre hypothesis makes this finite.
    Distributivity, scalar bilinearity, and the identity follow
    coefficientwise. Products of finitely supported families have support
    in the finite product of their supports, proving the monoid-algebra assertion.

!!! proposition "Proposition (Domains and units in formal series)"
    <a id="prop-domains-and-units-in-formal-series"></a>

    If $K$ is a domain, so is $K[[T]]$. A series
    $F=\sum_{n\ge0}a_nT^n$ is invertible precisely when $a_0$ is a unit.

??? proof "Proof"
    For nonzero $F,G$, take their least nonzero coefficient indices $k,l$.
    The coefficient of degree $k+l$ in $FG$ is $a_kb_l\ne0$.
    An inverse requires $a_0b_0=1$. Conversely set $b_0=a_0^{-1}$ and
    recursively

    $$
    b_n=-a_0^{-1}\sum_{i=1}^n a_i b_{n-i}\quad(n\ge1).
    $$

    Then $G=\sum_n b_nT^n$ satisfies $FG=1$, coefficient by coefficient.
    Commutativity also gives $GF=1$.

!!! example "Example (Formal geometric series)"
    <a id="ex-formal-geometric-series"></a>

    For $a\in K$, $(1+aT)^{-1}=\sum_{n\ge0}(-a)^nT^n$.

!!! definition "Definition (Formal exponential)"
    <a id="def-formal-exponential"></a>

    If every positive integer is a unit in $K$, define
    $\exp(aT)=\sum_{n\ge0}a^nT^n/n!$.

!!! proposition "Proposition (Exponential addition law)"
    <a id="prop-exponential-addition-law"></a>

    $\exp(aT)\exp(bT)=\exp((a+b)T)$; hence
    $a\mapsto\exp(aT)$ is a homomorphism $(K,+)\to K[[T]]^\times$.

??? proof "Proof"
    The degree-$n$ coefficient of the product is
    $\sum_{i=0}^n a^ib^{n-i}/(i!(n-i)!)=(a+b)^n/n!$ by the binomial
    theorem. The constant coefficient is $1$, so the series is a unit.

!!! definition "Definition (Degree, leading coefficient, and monic polynomial)"
    <a id="def-degree-leading-coefficient-and-monic-polynomial"></a>

    For nonzero $P=\sum_n a_nT^n\in K[T]$, its **degree** is the
    largest $n$ with $a_n\ne0$ and its **leading coefficient** is
    $a_{\deg P}$. Set $\deg0=-\infty$. A polynomial is **monic** if
    its leading coefficient is $1$.

!!! proposition "Proposition (Degree inequalities)"
    <a id="prop-degree-inequalities"></a>

    $\deg(P+Q)\le\max(\deg P,\deg Q)$ and
    $\deg(PQ)\le\deg P+\deg Q$. The product equality holds over a
    domain, or when one nonzero factor has a unit leading coefficient.

!!! theorem "Theorem (Euclidean division by a polynomial)"
    <a id="thm-euclidean-division-by-a-polynomial"></a>

    If $P\ne0$ has unit leading coefficient and degree $d$, every $F$
    has a unique decomposition $F=PQ+R$ with $\deg R<d$.

??? proof "Proof"
    If $\deg F<d$, take $Q=0,R=F$. Otherwise, with $a_n$ the leading
    coefficient of $F$ and $c$ that of $P$, subtract
    $c^{-1}a_nPT^{n-d}$ to decrease the degree and induct.
    Two decompositions imply $P(Q_1-Q_2)=R_2-R_1$. A nonzero left side
    has degree at least $d$ because $c$ is a unit, while the right side
    has degree below $d$, forcing both differences to vanish.

!!! theorem "Theorem (Polynomial rings over fields are principal)"
    <a id="thm-polynomial-rings-over-fields-are-principal"></a>

    For a field $K$, $K[T]$ is a principal ideal domain.

??? proof "Proof"
    It is a domain as a subring of $K[[T]]$. In a nonzero ideal choose
    a monic polynomial $P$ of least degree. Divide any $F$ in the ideal
    by $P$; the remainder is again in the ideal and has smaller degree,
    so it is zero. Thus the ideal is $(P)$. The zero ideal is $(0)$.
