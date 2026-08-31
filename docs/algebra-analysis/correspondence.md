# Correspondence

A **correspondence** is the most general notion of a relation between two
sets, given by a triple (departure, arrival, graph). Sections 3.1–3.5 below
record the basic constructions: inversion, image / preimage, composition,
and the all-important notions of injectivity and surjectivity that will
return throughout the course.

## Correspondences and Inverses

!!! definition "Definition (Correspondence)"
    <a id="def-3-1-1"></a>
    A **correspondence** is a triple $f = (D_f, A_f, \Gamma_f)$ where
    $D_f, A_f$ are sets (called the **departure set** and **arrival set**)
    and $\Gamma_f \subseteq D_f \times A_f$ is the **graph** of $f$.

    When $X, Y$ are sets and $f$ is a correspondence of the form
    $(X, Y, \Gamma_f)$, we say that $f$ is a correspondence **from $X$ to $Y$**.

!!! definition "Definition (Inverse correspondence)"
    <a id="def-3-1-2"></a>
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
    Let $f$ be a correspondence from $X$ to $Y$. If $(x, y) \in \Gamma_f$,
    then $x$ is a **preimage** of $y$ and $y$ an **image** of $x$ under $f$.

!!! definition "Definition (Range and domain of definition)"
    <a id="def-3-3-2"></a>
    For a set $A$ and a correspondence $f$,

    $$
    f(A) := \{y \in A_f \mid \exists x \in A,\ (x, y) \in \Gamma_f\}
    $$
    is the **image** of $A$ under $f$, and
    $f^{-1}(B)$ is the **preimage** of $B$, defined analogously.

!!! definition "Definition (range** of $f$)"
    <a id="def-3-3-3"></a>
    The **range** of $f$ is $\operatorname{Im}(f) := f(D_f)$. The **domain of
    definition** is $\operatorname{Dom}(f) := f^{-1}(A_f)$, i.e. the
    projection of $\Gamma_f$ onto $D_f$.

!!! proposition "Proposition (Image of domain equals range)"
    <a id="prop-3-3-4"></a>
    Let $f$ be a correspondence.

    + If $A' \subseteq A$ then $f(A') \subseteq f(A)$.
    + If $B' \subseteq B$ then $f^{-1}(B') \subseteq f^{-1}(B)$.

??? proof "Proof (For the first)"
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
    Let $f$ be a correspondence, $(A_i)_{i \in I}$ a family of sets. Then

    $$
    f\!\Big(\bigcup_{i \in I} A_i\Big) = \bigcup_{i \in I} f(A_i).
    $$
    Moreover, if $I \neq \varnothing$,
    $\displaystyle f\!\Big(\bigcap_{i \in I} A_i\Big) \subseteq \bigcap_{i \in I} f(A_i).$

??? proof "Proof (Using [Proposition 3.3.4](#prop-3-3-4) and)"
    Using [Proposition 3.3.4](#prop-3-3-4) and
    [Corollary 2.6.3 / 2.7.4](set-theory.md#cor-2-6-3),

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
    Given correspondences $f$ and $g$, the **composition** $g \circ f$ is
    the correspondence from $D_f$ to $A_g$ with graph

    $$
    \Gamma_{g \circ f} = \{(x, z) \in D_f \times A_g \mid
        \exists y \in A_f \cap D_g,\, (x, y) \in \Gamma_f \text{ and } (y, z) \in \Gamma_g\}.
    $$

!!! proposition "Proposition (Inverse of a composite)"
    <a id="prop-3-4-2"></a>
    For correspondences $f, g$,

    $$
    (g \circ f)^{-1} = f^{-1} \circ g^{-1}.
    $$

??? proof "Proof (Associativity of composition)"
    Direct unfolding from the definitions of inversion and composition.

!!! proposition "Proposition (Associativity of composition)"
    <a id="prop-3-4-3"></a>
    For correspondences $f, g, h$,

    $$
    h \circ (g \circ f) = (h \circ g) \circ f.
    $$

!!! proposition "Proposition (Identity composition)"
    <a id="prop-3-4-4"></a>
    For correspondences $f, g$ and any set $A$,

    $$
    (g \circ f)(A) = g(f(A)).
    $$
    In particular, $\operatorname{Im}(g \circ f) = g(\operatorname{Im}(f)) \subseteq
    \operatorname{Im}(g)$, with equality when $\operatorname{Dom}(g) \subseteq
    \operatorname{Im}(f)$.

??? proof "Proof (By definition)"
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
    A correspondence $f$ is **surjective** if $\operatorname{Im}(f) = A_f$.
    It is a **multivalued mapping** if $\operatorname{Dom}(f) = D_f$, i.e.
    $f^{-1}$ is surjective.

!!! proposition "Proposition (Image of the image under surjection)"
    <a id="prop-3-5-2"></a>
    If $f$ is surjective, then for every $B \subseteq A_f$,
    $B \subseteq f(f^{-1}(B))$.

??? proof "Proof (Surjective + composite is surjective)"
    For $y \in B$, surjectivity gives $x \in D_f$ with $(x, y) \in \Gamma_f$,
    hence $x \in f^{-1}(B)$ and $y \in f(f^{-1}(B))$.

!!! proposition "Proposition (Surjective + composite is surjective)"
    <a id="prop-3-5-3"></a>
    For any set $X$, the **identity correspondence** $\operatorname{Id}_X$ is
    defined by $D_{\operatorname{Id}_X} = A_{\operatorname{Id}_X} = X$ and
    $\Gamma_{\operatorname{Id}_X} = \{(x, x) \mid x \in X\}$. It satisfies

    $$
    f \circ \operatorname{Id}_{D_f} = f = \operatorname{Id}_{A_f} \circ f
    $$
    for any correspondence $f$.

