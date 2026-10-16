# Correspondence

A **correspondence** is the most general notion of a relation between two
sets, given by a triple (departure, arrival, graph). This chapter develops inversion, image / preimage, composition,
and the all-important notions of injectivity and surjectivity that will
return throughout the course.

## Correspondences and Inverses

!!! definition "Definition (Correspondence)"
    <a id="def-3-1-1"></a>
    <a id="def-correspondence"></a>

    A **correspondence** is a triple $f = (D_f, A_f, \Gamma_f)$ where
    $D_f, A_f$ are sets (called the **departure set** and **arrival set**)
    and $\Gamma_f \subseteq D_f \times A_f$ is the **graph** of $f$.

    When $X, Y$ are sets and $f$ is a correspondence of the form
    $(X, Y, \Gamma_f)$, we say that $f$ is a correspondence **from $X$ to $Y$**.

!!! definition "Definition (Inverse correspondence)"
    <a id="def-3-1-2"></a>
    <a id="def-inverse-correspondence"></a>

    The **inverse** $f^{-1}$ of a correspondence $f$ is the correspondence
    defined by

    $$
    D_{f^{-1}} := A_f, \qquad A_{f^{-1}} := D_f, \qquad
    \Gamma_{f^{-1}} := \{(y, x) \in A_f \times D_f \mid (x, y) \in \Gamma_f\}.
    $$

    Clearly $(f^{-1})^{-1} = f$.

## Image and Preimage

!!! definition "Definition (Image and preimage)"
    <a id="def-3-3-1"></a>
    <a id="def-image-and-preimage"></a>

    Let $f$ be a correspondence from $X$ to $Y$. If $(x, y) \in \Gamma_f$,
    then $x$ is a **preimage** of $y$ and $y$ an **image** of $x$ under $f$.

!!! definition "Definition (Range and domain of definition)"
    <a id="def-3-3-2"></a>
    <a id="def-range-and-domain-of-definition"></a>

    For a set $A$ and a correspondence $f$,

    $$
    f(A) := \{y \in A_f \mid \exists x \in A,\ (x, y) \in \Gamma_f\}
    $$

    is the **image** of $A$ under $f$, and
    $f^{-1}(B)$ is the **preimage** of $B$, defined analogously.

!!! definition "Definition (Range and domain)"
    <a id="def-3-3-3"></a>
    <a id="def-range-and-domain"></a>

    The **range** of $f$ is $\operatorname{Im}(f) := f(D_f)$. The **domain of
    definition** is $\operatorname{Dom}(f) := f^{-1}(A_f)$, i.e. the
    projection of $\Gamma_f$ onto $D_f$.

!!! proposition "Proposition (Monotonicity of images and preimages)"
    <a id="prop-3-3-4"></a>
    <a id="prop-monotonicity-of-images-and-preimages"></a>

    Let $f$ be a correspondence.

    + If $A' \subseteq A$ then $f(A') \subseteq f(A)$.
    + If $B' \subseteq B$ then $f^{-1}(B') \subseteq f^{-1}(B)$.

??? proof "Proof"
    For the first,

    $$
    f(A') = \{y \in A_f \mid \exists x \in A',\, (x, y) \in \Gamma_f\}
    \subseteq \{y \in A_f \mid \exists x \in A,\, (x, y) \in \Gamma_f\}
    = f(A),
    $$

    since any witness $x$ for $A'$ is also a witness for $A$. The second
    statement is the first applied to $f^{-1}$.

!!! proposition "Proposition (Image of a union)"
    <a id="prop-3-3-5"></a>
    <a id="prop-image-of-a-union"></a>

    Let $f$ be a correspondence, $(A_i)_{i \in I}$ a family of sets. Then

    $$
    f\!\Big(\bigcup_{i \in I} A_i\Big) = \bigcup_{i \in I} f(A_i).
    $$

    Moreover, if $I \neq \varnothing$,
    $\displaystyle f\!\Big(\bigcap_{i \in I} A_i\Big) \subseteq \bigcap_{i \in I} f(A_i).$

??? proof "Proof"
    Using [Proposition](#prop-monotonicity-of-images-and-preimages) and
    [Corollary](set-theory.md#cor-union-of-solutions-is-the-solution-set),

    $$
    f\!\Big(\bigcup_i A_i\Big)
    = \Big\{y \in A_f \;\Big|\; \Big(\bigcup_i A_i\Big) \cap f^{-1}(\{y\}) \neq \varnothing\Big\}
    = \Big\{y \in A_f \;\Big|\; \bigcup_i \big(A_i \cap f^{-1}(\{y\})\big) \neq \varnothing\Big\}
    = \bigcup_i f(A_i).
    $$

    The intersection inclusion follows from $A_i \supseteq \bigcap_j A_j$
    for every $i$.

## Composition

!!! definition "Definition (Composition of correspondences)"
    <a id="def-3-4-1"></a>
    <a id="def-composition-of-correspondences"></a>

    Given correspondences $f$ and $g$, the **composition** $g \circ f$ is
    the correspondence from $D_f$ to $A_g$ with graph

    $$
    \Gamma_{g \circ f} = \{(x, z) \in D_f \times A_g \mid
    \exists y \in A_f \cap D_g,\, (x, y) \in \Gamma_f \text{ and } (y, z) \in \Gamma_g\}.
    $$

!!! proposition "Proposition (Inverse of a composite)"
    <a id="prop-3-4-2"></a>
    <a id="prop-inverse-of-a-composite"></a>

    For correspondences $f, g$,

    $$
    (g \circ f)^{-1} = f^{-1} \circ g^{-1}.
    $$

??? proof "Proof"
    Direct unfolding from the definitions of inversion and composition.

!!! proposition "Proposition (Associativity of composition)"
    <a id="prop-3-4-3"></a>
    <a id="prop-associativity-of-composition"></a>

    For correspondences $f, g, h$,

    $$
    h \circ (g \circ f) = (h \circ g) \circ f.
    $$

!!! proposition "Proposition (Identity composition)"
    <a id="prop-3-4-4"></a>
    <a id="prop-identity-composition"></a>

    For correspondences $f, g$ and any set $A$,

    $$
    (g \circ f)(A) = g(f(A)).
    $$

    In particular, $\operatorname{Im}(g \circ f) = g(\operatorname{Im}(f)) \subseteq \operatorname{Im}(g)$, with equality when $\operatorname{Dom}(g) \subseteq \operatorname{Im}(f)$.

??? proof "Proof"
    By definition,

    $$
    (g \circ f)(A) = \{z \in A_g \mid \exists x \in A,\, (x, z) \in \Gamma_{g \circ f}\}
    = \{z \in A_g \mid \exists y \in f(A),\, (y, z) \in \Gamma_g\} = g(f(A)).
    $$

    Apply with $A = D_f$ to get $\operatorname{Im}(g \circ f) = g(\operatorname{Im}(f))$.
    If $\operatorname{Dom}(g) \subseteq \operatorname{Im}(f)$, then
    $\operatorname{Im}(g) = g(\operatorname{Dom}(g)) \subseteq g(\operatorname{Im}(f)) = \operatorname{Im}(g \circ f)$.

## Surjectivity and the Identity Correspondences

!!! definition "Definition (Surjective / multivalued mapping)"
    <a id="def-3-5-1"></a>
    <a id="def-surjective-multivalued-mapping"></a>

    A correspondence $f$ is **surjective** if $\operatorname{Im}(f) = A_f$.
    It is a **multivalued mapping** if $\operatorname{Dom}(f) = D_f$, i.e.
    $f^{-1}$ is surjective.

!!! proposition "Proposition (Image of the image under surjection)"
    <a id="prop-3-5-2"></a>
    <a id="prop-image-of-the-image-under-surjection"></a>

    If $f$ is surjective, then for every $B \subseteq A_f$,
    $B \subseteq f(f^{-1}(B))$.

??? proof "Proof"
    For $y \in B$, surjectivity gives $x \in D_f$ with $(x, y) \in \Gamma_f$,
    hence $x \in f^{-1}(B)$ and $y \in f(f^{-1}(B))$.

!!! proposition "Proposition (Identity correspondences)"
    <a id="prop-3-5-3"></a>
    <a id="prop-surjective-composite-is-surjective"></a>

    For any set $X$, the **identity correspondence** $\operatorname{Id}_X$ is
    defined by $D_{\operatorname{Id}_X} = A_{\operatorname{Id}_X} = X$ and
    $\Gamma_{\operatorname{Id}_X} = \{(x, x) \mid x \in X\}$. It satisfies

    $$
    f \circ \operatorname{Id}_{D_f} = f = \operatorname{Id}_{A_f} \circ f
    $$

    for any correspondence $f$.

## Functions, Mappings, and Cancellation

Single-valuedness and being defined everywhere are separate conditions in
the terminology of the source. Keeping them separate makes the statements
about arbitrary correspondences precise.

!!! proposition "Proposition (Domain, range, and fibres)"
    <a id="prop-correspondence-fibres"></a>

    For every correspondence $f$ and arbitrary sets $A,B$,
    $f(A)\subseteq\operatorname{Im}f$ and
    $f^{-1}(B)\subseteq\operatorname{Dom}f$. Moreover,

    $$
    \begin{gathered}
    \operatorname{Dom}f=\operatorname{Im}(f^{-1}),\qquad
    \operatorname{Im}f=\operatorname{Dom}(f^{-1}),\\
    f(\operatorname{Dom}f)=\operatorname{Im}f,\qquad
    f^{-1}(\operatorname{Im}f)=\operatorname{Dom}f,\\
    y\in f(A)\quad\Longleftrightarrow\quad
    A\cap f^{-1}(\{y\})\ne\varnothing.
    \end{gathered}
    $$

??? proof "Proof"
    The inclusions follow since every witness belongs to the graph.
    Reversing the graph exchanges domain and range. If $y\in\operatorname{Im}f$,
    choose $(x,y)\in\Gamma_f$; then $x\in\operatorname{Dom}f$, proving
    the nontrivial inclusion in the first equality. Apply it to $f^{-1}$
    for the second. The fibre criterion is precisely the existence of such
    a witness $x\in A$.

!!! definition "Definition (Function, injective correspondence, and mapping)"
    <a id="def-function-and-mapping"></a>

    A correspondence is a **function** if each departure element has at
    most one image, and is **injective** if its inverse is a function.
    For $x\in\operatorname{Dom}f$ the unique image is denoted $f(x)$.
    A **mapping** is a function with $\operatorname{Dom}f=D_f$.
    Equivalently, $f$ is a mapping precisely when $f^{-1}$ is both
    injective and surjective. A multivalued mapping need not be a function.

!!! proposition "Proposition (Composition and coverage of the middle set)"
    <a id="prop-composition-coverage"></a>

    For correspondences $f,g$:

    + If $g\circ f$ is surjective, then $g$ is surjective.
    + If $g\circ f$ is a multivalued mapping, then $f$ is one.
    + If $g$ is surjective and $\operatorname{Dom}g\subseteq\operatorname{Im}f$,
      then $g\circ f$ is surjective.
    + If $f$ is a multivalued mapping and
      $\operatorname{Im}f\subseteq\operatorname{Dom}g$, then $g\circ f$ is one.

??? proof "Proof"
    Use $\operatorname{Im}(g\circ f)=g(\operatorname{Im}f) \subseteq\operatorname{Im}g$. With the coverage hypothesis this image
    also contains $g(\operatorname{Dom}g)=\operatorname{Im}g$.
    Apply these two statements to the inverse correspondences, in reversed
    order, to obtain the two assertions about multivalued mappings.

!!! proposition "Proposition (Single-valuedness, injectivity, and composition)"
    <a id="prop-functions-composition"></a>

    Composites of functions are functions, with
    $(g\circ f)(x)=g(f(x))$ wherever defined. Composites of injective
    correspondences are injective. Furthermore:

    + If $g\circ f$ is injective and
      $\operatorname{Im}f\subseteq\operatorname{Dom}g$, then $f$ is injective.
    + If $g\circ f$ is a function and
      $\operatorname{Dom}g\subseteq\operatorname{Im}f$, then $g$ is a function.

??? proof "Proof"
    If $x$ has images $z,z'$ under the composite, take intermediate
    witnesses $y,y'$. Single-valuedness of $f$ gives $y=y'$, and that of
    $g$ gives $z=z'$. Inversion proves the injectivity assertion.
    For cancellation, two preimages $x,x'$ of $y$ under $f$ have a common
    image $z$ under the composite, because the coverage condition supplies
    an image of $y$ under $g$. Injectivity of the composite gives $x=x'$.
    Invert this argument for the last assertion.

!!! proposition "Proposition (Images, inverse images, and intersections)"
    <a id="prop-functions-intersections"></a>

    If $f$ is injective, $f^{-1}(f(A))\subseteq A$. If $f$ is a function,
    $f(f^{-1}(B))\subseteq B$. For a nonempty index set $I$,

    $$
    \begin{aligned}
    f^{-1}\left(\bigcap_i B_i\right)&=\bigcap_i f^{-1}(B_i)
      &&\text{if }f\text{ is a function},\\
    f\left(\bigcap_i A_i\right)&=\bigcap_i f(A_i)
      &&\text{if }f\text{ is injective}.
    \end{aligned}
    $$

??? proof "Proof"
    If $x\in f^{-1}(f(A))$, there are $x'\in A$ and $y$ with
    $(x,y),(x',y)\in\Gamma_f$. Injectivity forces $x=x'$. Inversion gives
    the other inclusion. For the first intersection equality, membership
    in all preimages means that the same unique $f(x)$ belongs to every
    $B_i$. The reverse inclusion holds for all correspondences. Invert
    the statement to obtain the image equality.

!!! notation "Notation (Families and mapping sets)"
    <a id="notation-families-and-mapping-sets"></a>

    $Y^X$ denotes all mappings $X\to Y$. Write a member as
    $(u(x))_{x\in X}$. When $X=\{1,\ldots,n\}$, write $Y^n$ and
    $(u(1),\ldots,u(n))$.

!!! example "Example (Identity, constant, and indicator mappings)"
    <a id="ex-identity-constant-and-indicator-mappings"></a>

    The identity $\operatorname{Id}_X$ and the constant mapping $x\mapsto y$
    are mappings. For $A\subseteq X$, its **indicator** is

    $$
    \mathbf1_A(x)=\begin{cases}1,&x\in A,\\0,&x\notin A.\end{cases}
    $$

!!! remark "Remark (The exact image-preimage identities for mappings)"
    <a id="rem-the-exact-image-preimage-identities-for-mappings"></a>

    For a mapping $f:X\to Y$, inverse images preserve unions and all
    intersections (including the empty intersection in the fixed arrival
    set), while images preserve unions. The exact identities are
    $f(f^{-1}(B))=B\cap\operatorname{Im}f$ and
    $A\subseteq f^{-1}(f(A))$ for $A\subseteq X$.
    Equality in the latter holds for every $A$ precisely when $f$ is injective.
    The assertion $f^{-1}(f(A))=A$ for arbitrary mappings in the source
    requires this extra hypothesis; a constant map gives a counterexample.

!!! proposition "Proposition (Composition of mappings)"
    <a id="prop-composition-of-mappings"></a>

    If $f,g$ are mappings and $\operatorname{Im}f\subseteq D_g$, their
    composite is a mapping. For $f:X\to Y$, $g:Y\to Z$, surjectivity of
    both implies surjectivity of the composite, and surjectivity of the
    composite implies that of $g$. Injectivity of both implies injectivity
    of the composite, and injectivity of the composite implies that of $f$.

## Bijections, Products, and Choice

!!! definition "Definition (Bijection)"
    <a id="def-bijection"></a>

    A **bijection** is an injective surjective mapping. A correspondence
    is a bijection if and only if its inverse is a bijection.

!!! proposition "Proposition (Two-sided inverse)"
    <a id="prop-two-sided-inverse"></a>

    A bijection $f:X\to Y$ satisfies $f^{-1}\circ f=\operatorname{Id}_X$
    and $f\circ f^{-1}=\operatorname{Id}_Y$. Conversely, if a correspondence
    $g:Y\to X$ satisfies these identities with $g$ in place of $f^{-1}$,
    then $f$ is a bijection and $g=f^{-1}$. Composites of bijections are
    bijections.

??? proof "Proof"
    For a bijection each $x$ has one image and each $y$ has one preimage,
    giving both identities. Conversely, the identity composites imply that
    $f$ and $g$ are surjective and everywhere defined. The cancellation
    assertions above then imply that both are single-valued and injective.
    For $y=f(x)$, the first identity gives $g(y)=x$, so $g=f^{-1}$.

!!! definition "Definition (Direct product and coordinate projections)"
    <a id="def-direct-product-sets"></a>

    For a family $(A_i)_{i\in I}$,

    $$
    \prod_{i\in I}A_i
    =\left\{a:I\to\bigcup_i A_i\ \middle|\ \forall i\in I,\ a(i)\in A_i\right\}.
    $$

    Its elements are families $(a_i)_{i\in I}$; the projection
    $\operatorname{pr}_j$ sends such a family to $a_j$.
    The product over $I=\varnothing$ has one element, the empty mapping.
    Finite products are denoted $A_1\times\cdots\times A_n$.

!!! axiom "Axiom (Choice)"
    <a id="axiom-choice"></a>

    A product of a family of nonempty sets is nonempty.

!!! proposition "Proposition (Universal property of a product)"
    <a id="prop-product-universal-sets"></a>

    For any set $X$, the mapping

    $$
    \left(\prod_i A_i\right)^X\longrightarrow\prod_i A_i^X,
    \qquad f\longmapsto(\operatorname{pr}_i\circ f)_i
    $$

    is a bijection. Thus any family $f_i:X\to A_i$ has a unique joint
    mapping $f:X\to\prod_i A_i$ satisfying $\operatorname{pr}_i\circ f=f_i$.

??? proof "Proof"
    Define $f(x)=(f_i(x))_i$. This proves surjectivity. If $f,g$ have the
    same coordinate mappings, then $\operatorname{pr}_i(f(x))= \operatorname{pr}_i(g(x))$ for every $i,x$, so $f(x)=g(x)$ and $f=g$.

The commuting triangle has arrows $X\xrightarrow{f}\prod_i A_i$,
$\prod_i A_i\xrightarrow{\operatorname{pr}_j}A_j$, and
$X\xrightarrow{f_j}A_j$; its equality is $\operatorname{pr}_j\circ f=f_j$.
For $g_i:B_i\to A_i$, the **product mapping** $\prod_i g_i$ sends
$(b_i)_i$ to $(g_i(b_i))_i$; for finite families it is written
$g_1\times\cdots\times g_n$.

!!! proposition "Proposition (Sections and retractions)"
    <a id="prop-sections-retractions"></a>

    If $f:X\to Y$ is surjective, choice gives an injective mapping
    $g:Y\to X$ with $f\circ g=\operatorname{Id}_Y$.
    If $f$ is injective and $X\ne\varnothing$, there is a surjective
    $h:Y\to X$ with $h\circ f=\operatorname{Id}_X$.

??? proof "Proof"
    For the first statement choose $g(y)\in f^{-1}(\{y\})$ in each
    nonempty fibre. If $Y=\varnothing$, surjectivity implies
    $X=\varnothing$ and use the empty mapping. The identity makes $g$
    injective. For the second choose $x_0\in X$ and set $h(y)=f^{-1}(y)$
    on $\operatorname{Im}f$, and $h(y)=x_0$ elsewhere. The identity
    $h\circ f=\operatorname{Id}_X$ makes $h$ surjective.

## Restriction and Extension

!!! definition "Definition (Restriction and extension)"
    <a id="def-restriction-extension"></a>

    A correspondence $f$ is a **restriction** of $g$, and $g$ an
    **extension** of $f$, if $\Gamma_f\subseteq\Gamma_g$.
    For $h:X\to Y$ and $A\subseteq X$, its restriction $h|_A$ has
    departure $A$, arrival $Y$, and graph $\Gamma_h\cap(A\times Y)$.
