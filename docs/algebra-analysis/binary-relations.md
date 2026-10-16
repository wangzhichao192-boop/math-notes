# Binary Relations

A **binary relation** on a set $X$ is a correspondence $X \to X$, i.e. a
subset of $X \times X$. This chapter develops the elementary taxonomy of
binary relations and the partial-order notions that will return throughout
the rest of the course.

## Generalities

!!! definition "Definition (Binary relation)"
    <a id="def-4-1-1"></a>
    <a id="def-binary-relation"></a>

    Let $X$ be a set. A **binary relation** on $X$ is a correspondence from
    $X$ to $X$. If $R$ is such a relation and $(x, y) \in \Gamma_R$, we write
    $x R y$.

!!! example "Example (Identity relation)"
    <a id="ex-identity-relation-on"></a>

    The **identity** relation on $X$ is the correspondence
    $\operatorname{Id}_X = (X, X, \{(x, x) \mid x \in X\})$; we denote it
    by "$=$".

!!! definition "Definition (Complement of a relation)"
    <a id="def-4-1-2"></a>
    <a id="def-complement-of-a-relation"></a>

    The **complement** of a binary relation $R$ on $X$, written $\lnot R$
    or $R^c$, is defined by

    $$
    x \, \lnot R \, y \iff (x, y) \notin \Gamma_R.
    $$

## Equivalence Relations

!!! definition "Definition (Reflexive / symmetric / transitive)"
    <a id="def-4-2-1"></a>
    <a id="def-reflexive-symmetric-transitive"></a>

    Let $R$ be a binary relation on $X$.

    + $R$ is **reflexive** if $\forall x \in X,\ x R x$.
    + $R$ is **symmetric** if $\forall (x, y) \in X^2,\ x R y \Rightarrow y R x$.
    + $R$ is **transitive** if $x R y \wedge y R z \Rightarrow x R z$.
    + $R$ is an **equivalence relation** if it is reflexive, symmetric, and
      transitive.

!!! definition "Definition (Equivalence class and quotient)"
    <a id="def-4-2-2"></a>
    <a id="def-equivalence-class-and-quotient"></a>

    Let $\sim$ be an equivalence relation on $X$. The **equivalence class**
    of $x \in X$ is

    $$
    [x] := \{y \in X \mid y \sim x\}.
    $$

    The quotient $X / \{\sim\} = \{[x] \mid x \in X\}$ is a partition of $X$:
    $X = \bigsqcup_{A \in X / \{\sim\}} A$.

!!! proposition "Proposition (Equivalence classes are disjoint or equal)"
    <a id="prop-4-2-3"></a>
    <a id="prop-equivalence-classes-are-disjoint-or-equal"></a>

    For every $(x, y) \in X^2$, either $[x] = [y]$ or $[x] \cap [y] = \varnothing$.

!!! proposition "Proposition (Quotient map from a function)"
    <a id="prop-4-2-4"></a>
    <a id="prop-quotient-map-from-a-function"></a>

    Let $f : X \to Y$ be a mapping and define $x \sim y \iff f(x) = f(y)$.
    Then there exists a unique $\tilde f : X / \{\sim\} \to Y$ with
    $\tilde f \circ \pi = f$, where $\pi : X \to X / \{\sim\}$ is the projection.

!!! definition "Definition (Projection and factorization of an equivalence relation)"
    <a id="def-projection-and-factorization-of-an-equivalence-relation"></a>

    The projection is $\pi:X\to X/{\sim}$, $x\mapsto[x]$.
    More generally than a relation defined by $f$, any equivalence relation
    on which $f:X\to Y$ is constant admits a unique induced mapping
    $\widetilde f([x])=f(x)$ with $\widetilde f\circ\pi=f$.

??? proof "Proof"
    If $z\in[x]\cap[y]$, symmetry and transitivity give $x\sim y$ and
    then $[x]=[y]$. Thus the classes partition $X$. The induced formula
    is independent of the representative because $f$ is constant on classes.
    Every class has a representative, so the factorization forces this
    formula and uniqueness. The commuting triangle has arrows
    $X\xrightarrow{\pi}X/{\sim}$, $X\xrightarrow f Y$, and
    $X/{\sim}\xrightarrow{\widetilde f}Y$.

## Partial Orders

!!! definition "Definition (Partial order / total order)"
    <a id="def-4-3-1"></a>
    <a id="def-partial-order-total-order"></a>

    A binary relation $\leq$ on $X$ is a **partial order** if it is reflexive,
    antisymmetric ($x \leq y \wedge y \leq x \Rightarrow x = y$), and
    transitive. The pair $(X, \leq)$ is a **partially ordered set** (poset).
    It is a **total order** if in addition $\forall (x, y) \in X^2,\ x \leq y$
    or $y \leq x$.

!!! example "Example (Strict partial order)"
    <a id="ex-strict-partial-order"></a>

    $(\mathbb{R}, \leq)$ is totally ordered. $(\mathbb{N}, \mid)$ (divisibility)
    is partially ordered.

!!! definition "Definition (Strict partial order)"
    <a id="def-4-3-2"></a>
    <a id="def-strict-partial-order"></a>

    The **strict partial order** associated with a partial order $\leq$ is

    $$
    x < y \iff x \leq y \wedge x \neq y.
    $$

!!! proposition "Proposition (Characterization of strict orders)"
    <a id="prop-characterization-of-strict-orders"></a>

    A strict order is irreflexive, asymmetric, and transitive:
    $x\not<x$, $x<y\Rightarrow y\not<x$, and $x<y<z\Rightarrow x<z$.
    Conversely, such a relation defines a partial order by
    $x\le y\Longleftrightarrow(x<y\text{ or }x=y)$.

??? proof "Proof"
    The properties of a strict order follow from antisymmetry and
    transitivity of its nonstrict order. Conversely the displayed
    relation is reflexive, asymmetry gives antisymmetry, and transitivity
    follows by treating separately the cases of equality. Irreflexivity
    identifies its strict part with the original relation.

!!! example "Example (Strict orders)"
    <a id="ex-strict-orders"></a>

    Usual $<$ on $\mathbb R$ and proper inclusion on $\mathscr P(X)$
    are strict orders.

## Monotonic Functions

!!! definition "Definition (Increasing / decreasing function)"
    <a id="def-4-4-1"></a>
    <a id="def-increasing-decreasing-function"></a>

    Let $f : I \to X$ be a function between posets.

    + $f$ is **increasing** (resp. **strictly increasing**) if
      $x < y \Rightarrow f(x) \leq f(y)$ (resp. $f(x) < f(y)$).
    + $f$ is **decreasing** (resp. **strictly decreasing**) if
      $x < y \Rightarrow f(x) \geq f(y)$ (resp. $f(x) > f(y)$).

    A **monotonic** function is either increasing or decreasing.

!!! proposition "Proposition (Composite of monotonic functions)"
    <a id="prop-4-4-2"></a>
    <a id="prop-composite-of-monotonic-functions"></a>

    Let $f, g$ be functions between posets. If $f$ and $g$ are both
    increasing or both decreasing, then $g \circ f$ is increasing. If one
    is increasing and the other is decreasing, $g \circ f$ is decreasing.

!!! proposition "Proposition (Injective + monotonic = strictly monotonic)"
    <a id="prop-4-4-3"></a>
    <a id="prop-injective-monotonic-strictly-monotonic"></a>

    An injective monotonic function between posets is strictly monotonic.

!!! proposition "Proposition (Monotonicity and inverses)"
    <a id="prop-monotonicity-and-inverses"></a>

    A strictly monotonic function from a totally ordered set is injective.
    An injective monotonic function from a totally ordered set has a
    monotonic inverse on its image, with the same direction.

??? proof "Proof"
    Distinct arguments are comparable and strict monotonicity gives
    distinct values. If increasing $f$ is injective, $a<b$ in its image
    cannot satisfy $f^{-1}(a)>f^{-1}(b)$, since this would imply $a>b$.
    Reverse the inequalities in the decreasing case.

## Bounds and Suprema

!!! definition "Definition (Upper / lower bound)"
    <a id="def-4-5-1"></a>
    <a id="def-upper-lower-bound"></a>

    Let $(X, \leq)$ be a poset and $A \subseteq X$.

    + An **upper bound** of $A$ is $M \in X$ with $\forall a \in A,\ a \leq M$.
    + A **lower bound** of $A$ is $m \in X$ with $\forall a \in A,\ m \leq a$.

    Write $A^u$ for the set of upper bounds of $A$ in $X$, and $A^l$ for
    the lower bounds.

!!! definition "Definition (Greatest / least / supremum / infimum)"
    <a id="def-4-5-2"></a>
    <a id="def-greatest-least-supremum-infimum"></a>

    + $M \in A$ is the **greatest element** of $A$ if $M$ is an upper bound
      of $A$; denote it $\max_{\leq} A$ (or $\max A$).
    + $m \in A$ is the **least element** of $A$ if $m$ is a lower bound of
      $A$; denote it $\min_{\leq} A$.
    + A **supremum** of $A$ in $X$ is the least element of $A^u$; write
      $\sup_{(X, \leq)} A$. An **infimum** is the greatest element of $A^l$;
      write $\inf_{(X, \leq)} A$.

!!! proposition "Proposition (sup and max coincide under inclusion)"
    <a id="prop-4-5-3"></a>
    <a id="prop-sup-and-max-coincide-under-inclusion"></a>

    Let $(X, \leq)$ be a poset and $A \subseteq Z \subseteq Y \subseteq X$.

    1. If $\max A$ exists, it is also the supremum of $A$ in $Y$.
    2. If $\sup_{(Y, \leq)} A$ exists and belongs to $Z$, it is also the
       supremum of $A$ in $Z$.

??? proof "Proof"
    (1) $\max A$ is an upper bound of $A$ in $X$, hence in $Y$. If
    $M \in A^u_Y$, then $\max A \leq M$ since $\max A \in A$. So
    $\max A = \min A^u_Y$.
    (2) Any upper bound of $A$ in $Z$ is an upper bound of $A$ in $Y$, so
    $\sup_Y A \leq M$. Since $\sup_Y A \in Z$, it is the least such.

!!! example "Example (Bounds in a power set)"
    <a id="ex-bounds-in-a-power-set"></a>

    For $\Omega=\{1,2,3\}$ and $A=\{\{1\},\{2\},\{1,2\}\}$ in
    $(\mathscr P(\Omega),\subseteq)$,
    $A^u=\{\{1,2\},\{1,2,3\}\}$ and $A^l=\{\varnothing\}$.

!!! notation "Notation (Ambient bounds and bounds of a family)"
    <a id="notation-ambient-bounds-and-bounds-of-a-family"></a>

    Write $A_Y^u=\{y\in Y\mid\forall a\in A,\ a\le y\}$ for
    $A\subseteq Y\subseteq X$, and similarly $A_Y^l$. The ambient
    ordered set matters when taking bounds. Write $\sup f=\sup f(I)$,
    $\sup_i x_i=\sup\{x_i\mid i\in I\}$, and similarly for $\inf$,
    $\max$, and $\min$.

!!! proposition "Proposition (Monotonicity and iterated bounds)"
    <a id="prop-monotonicity-and-iterated-bounds"></a>

    Whenever the bounds in question exist in the given ambient set:

    + The duals of the preceding maximum and ambient-supremum assertions
      hold for minima and infima.
    + $A\subseteq B$ implies $\sup A\le\sup B$ and $\inf B\le\inf A$.
    + $f(i)\le g(i)$ for every $i$ implies $\sup f\le\sup g$ and
      $\inf f\le\inf g$.
    + If $I$ is totally ordered, $J\subseteq I$ has no upper bound in $I$,
      and $f$ is increasing, then $f(I)^u=f(J)^u$; for decreasing $f$,
      $f(I)^l=f(J)^l$.
    + If $y_i=\sup_Y A_i$ and $\sup_Y\{y_i\mid i\in I\}$ exists, then
      $\sup_Y\bigcup_i A_i=\sup_Y\{y_i\mid i\in I\}$; dually for infima.
    + $\varnothing_Y^u=\varnothing_Y^l=Y$.

??? proof "Proof"
    A bound of a larger set bounds a smaller set, and $\sup g$ bounds
    $f$ when $f\le g$. For cofinality, choose $j\in J$ above any given
    $i\in I$; then $f(i)\le f(j)$. For the union, every element is below
    some $y_i$ and hence their supremum. Conversely a bound of the union
    bounds each $A_i$ and then each $y_i$. Empty-set bounds are vacuous.
    Reversing the order proves all dual assertions.

## Intervals

!!! definition "Definition (Interval)"
    <a id="def-4-6-1"></a>
    <a id="def-interval"></a>

    Let $(X, \leq)$ be a poset. For $(a, b) \in X^2$, define

    $$
    [a, b] := \{x \in X \mid a \leq x \leq b\}.
    $$

    Similarly $[a, b[$, $]a, b]$, $]a, b[$.

!!! definition "Definition (Dense order)"
    <a id="def-4-6-2"></a>
    <a id="def-dense-order"></a>

    A poset $(X, \leq)$ is **dense** if for all $x < z$ in $X$, the open
    interval $]x, z[$ is non-empty.

!!! definition "Definition (Order-convex intervals and endpoints)"
    <a id="def-order-convex-intervals-and-endpoints"></a>

    A subset $I\subseteq X$ is an **interval** if $[a,b]\subseteq I$
    for all $a,b\in I$. For a nonempty interval, its infimum and
    supremum, when they exist, are its **left** and **right endpoints**.

!!! proposition "Proposition (Operations and endpoint types for intervals)"
    <a id="prop-operations-and-endpoint-types-for-intervals"></a>

    Intersections of nonempty families of intervals are intervals. In a
    **total order**, a family of intervals with a common point has an
    interval as its union. If $b=\sup I$ then $[x,b[\subseteq I$ for
    $x\in I$; dually, $a=\inf I$ implies $]a,x]\subseteq I$.
    A nonempty interval with endpoints $a,b$ is one of
    $[a,b]$, $[a,b[$, $]a,b]$, $]a,b[$. In a dense total order these
    four intervals, for $a<b$, all have infimum $a$ and supremum $b$.

??? proof "Proof"
    Intersection preserves order-convexity directly. For the union, choose
    a common point $c$ and $a\in I_\alpha$, $b\in I_\beta$ with $a\le b$.
    If $b\le c$, use $[a,b]\subseteq[a,c]\subseteq I_\alpha$; if $c\le a$,
    use $[a,b]\subseteq[c,b]\subseteq I_\beta$; otherwise split at $c$.
    If $x\le t<b=\sup I$, there is $y\in I$ above $t$, so
    $t\in[x,y]\subseteq I$. The dual argument treats the left endpoint.
    Each interior point is between two points of $I$; endpoint membership
    gives the four types. Density excludes an upper bound strictly below
    $b$ or a lower bound strictly above $a$.

!!! remark "Remark (The total-order hypothesis)"
    <a id="rem-the-total-order-hypothesis"></a>

    The source union proof uses total comparability, although its
    statement says partial order. In the diamond $0<u<1$, $0<v<1$ with
    $u,v$ incomparable, $\{0,u\}$ and $\{u,1\}$ are intersecting intervals
    whose union omits $v\in[0,1]$. The total-order version above is correct.

## Well-ordered Sets

!!! definition "Definition (Well-ordered set)"
    <a id="def-4-7-1"></a>
    <a id="def-well-ordered-set"></a>

    A poset $(X, \leq)$ is **well-ordered** if every non-empty subset of
    $X$ has a least element.

!!! axiom "Axiom: N is well-ordered"
    <a id="ax-4-7-2"></a>
    <a id="axiom-axiom-n-is-well-ordered"></a>

    $(\mathbb{N}, \leq)$ is a well-ordered set.

!!! theorem "Theorem (Transfinite induction)"
    <a id="thm-4-7-3"></a>
    <a id="thm-transfinite-induction"></a>

    Let $(X, \leq)$ be a well-ordered set and $P(\cdot)$ a condition on
    $X$. If

    $$
    \forall x \in X,\ \bigl(\forall y \in X_{<x},\ P(y)\bigr) \Rightarrow P(x),
    $$

    then $\forall x \in X,\ P(x)$.

??? proof "Proof"
    Let $A = \{x \in X \mid \lnot P(x)\}$. If $A \neq \varnothing$, let $x \in A$
    be its least element. Then $\forall y \in X_{<x},\ P(y)$ is true, which
    contradicts the assumption.

!!! proposition "Proposition (Properties of well-orders)"
    <a id="prop-properties-of-well-orders"></a>

    A well-order is total, since the least member of $\{x,y\}$ compares
    $x,y$. Every subset inherits a well-order. At the least point $m$,
    the transfinite-induction premise is vacuous and the step requires
    $P(m)$. The set $\mathbb N\cup\{+\infty\}$ is well-ordered: induction
    on it requires the finite steps and also
    $(\forall n\in\mathbb N,\ P(n))\Rightarrow P(+\infty)$.

## Order-completeness

!!! definition "Definition (Order-complete poset)"
    <a id="def-4-8-1"></a>
    <a id="def-order-complete-poset"></a>

    A poset $(X, \leq)$ is **order-complete** if every subset of $X$ has a
    supremum in $X$.

!!! axiom "Axiom: extended R is order-complete"
    <a id="ax-4-8-2"></a>
    <a id="axiom-axiom-extended-r-is-order-complete"></a>

    The extended real line $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$
    with the order extending that of $\mathbb{R}$ is order-complete.

!!! theorem "Theorem (Knaster–Tarski fixed point)"
    <a id="thm-4-8-3"></a>
    <a id="thm-knastertarski-fixed-point"></a>

    Let $(X, \leq)$ be order-complete and $f : X \to X$ increasing. Then
    the set $F = \{x \in X \mid f(x) = x\}$ of fixed points of $f$ is
    itself order-complete. In particular $F \neq \varnothing$.

??? proof "Proof"
    Let $A \subseteq F$. Set $m := \inf \{y \in A^u \mid f(y) \leq y\}$.
    The set being infimized is nonempty because it contains the greatest element of $X$. Every $a\in A$ is a lower bound, so $a\le m$. Monotonicity gives $f(m)\le f(y)\le y$ for each member $y$, hence $f(m)\le m$. Also $a=f(a)\le f(m)$, so $f(m)$ bounds $A$, and $f(f(m))\le f(m)$. Thus $f(m)$ belongs to the set being infimized, giving $m\le f(m)$. Equality proves $m\in F$. Every fixed upper bound of $A$ belongs to that set and therefore lies above $m$, proving that $m$ is the supremum in $F$. Applying this to the empty set supplies a least fixed point, and reversing the order supplies all infima.

!!! theorem "Theorem (Cantor–Bernstein)"
    <a id="thm-4-8-4"></a>
    <a id="thm-cantorbernstein"></a>

    Let $X, Y$ be sets. If there exist injective mappings
    $f : X \to Y$ and $g : Y \to X$, then $X$ and $Y$ are equipotent
    (i.e. there is a bijection between them).

??? proof "Proof"
    Define $\Phi : \mathscr{P}(X) \to \mathscr{P}(X)$ by
    $\Phi(A) = X \setminus g(Y \setminus f(A))$. Then $\Phi$ is
    increasing. By Knaster–Tarski there is $C$ with $\Phi(C) = C$. The
    map

    $$
    h(x) = \begin{cases} f(x) & x \in C \\ g^{-1}(x) & x \in X \setminus C \end{cases}
    $$

    is the required bijection.

!!! example "Example (The complete power-set order)"
    <a id="ex-the-complete-power-set-order"></a>

    $\mathscr P(\Omega)$ is order-complete under inclusion, with
    $\sup\mathcal A=\bigcup_{A\in\mathcal A}A$. A set bounds the union
    precisely when it contains each member of $\mathcal A$.

!!! proposition "Proposition (Infima in a complete order)"
    <a id="prop-infima-in-a-complete-order"></a>

    In an order-complete poset, $\inf A=\sup A^l$: every $x\in A$
    bounds $A^l$, so $\sup A^l\le x$, and this lower bound dominates
    every other lower bound. The least and greatest elements are
    $\sup\varnothing$ and $\sup X$ respectively.

!!! definition "Definition (Fixed points and equipotence)"
    <a id="def-fixed-points-and-equipotence"></a>

    A **fixed point** satisfies $f(x)=x$. Sets are **equipotent** if
    a bijection between them exists.

??? proof "Proof"
    Complete the Knaster–Tarski proof as follows. For $A\subseteq F$,
    $S_A=\{y\in A^u\mid f(y)\le y\}$ contains the greatest point of $X$.
    The previously established inequalities give $m=\inf S_A\in S_A$.
    Since $a=f(a)\le f(m)$ for $a\in A$, and
    $f(f(m))\le f(m)$, also $f(m)\in S_A$. Hence $m\le f(m)$ and
    $m=f(m)$. Every fixed upper bound of $A$ lies in $S_A$ and dominates
    $m$, making it the supremum in $F$.

    In the Cantor–Bernstein construction, the fixed-point identity gives
    $X\setminus C=g(Y\setminus f(C))$. Thus $g^{-1}$ is defined on the
    second piece: $f$ maps $C$ bijectively to $f(C)$, while $g^{-1}$ maps
    $X\setminus C$ bijectively to $Y\setminus f(C)$. These disjoint
    images cover $Y$. This is also the decomposition shown in the source
    diagram, and verifies both injectivity and surjectivity of $h$.

!!! lemma "Lemma (Upper and lower bound operators)"
    <a id="lem-upper-and-lower-bound-operators"></a>

    $A\subseteq B$ implies $B^u\subseteq A^u$ and $B^l\subseteq A^l$.
    Also $A\subseteq(A^u)^l\cap(A^l)^u$.

!!! theorem "Theorem (Dedekind–MacNeille completion)"
    <a id="thm-dedekind-macneille"></a>

    Define $\widehat X=\{A\subseteq X\mid(A^u)^l=A\}$ and
    $\widehat x=\{x\}^l$. Then $(\widehat X,\subseteq)$ is complete,
    $A^l\in\widehat X$ for every $A\subseteq X$, and
    $x\mapsto\widehat x$ is an order embedding. For $A\in\widehat X$,

    $$
    A=\bigcup_{x\in A}\widehat x
    =\sup_{\widehat X}\{\widehat x\mid x\in A\}.
    $$

    If $A^u=\varnothing$, then $A=X$; otherwise

    $$
    A=\bigcap_{x\in A^u}\widehat x
    =\inf_{\widehat X}\{\widehat x\mid x\in A^u\}.
    $$

    This is the **Dedekind–MacNeille completion**.

??? proof "Proof"
    The bound lemma makes $A\mapsto(A^u)^l$ increasing on $\mathscr P(X)$;
    its fixed points form a complete order by Knaster–Tarski. The inclusion
    $A\subseteq(A^l)^u$ gives $((A^l)^u)^l\subseteq A^l$, and the reverse
    inclusion is the bound lemma applied to $A^l$. The embedding assertion
    follows from transitivity and $x\in\widehat x$. A fixed point $A$ is
    downward closed: if $z\le x\in A$, then $z$ lies below every upper
    bound of $A$ and belongs to $(A^u)^l=A$. Thus its union of principal
    lower sets is $A$ itself. The intersection formula is the defining
    equation; with no upper bounds it reads $A=X$.

!!! remark "Remark (Interpreting a completed element)"
    <a id="rem-interpreting-a-completed-element"></a>

    $A=\{x\in X\mid\widehat x\subseteq A\}$ and
    $A^u=\{x\in X\mid A\subseteq\widehat x\}$ for $A\in\widehat X$.
    Completion gives a complete order containing an isomorphic copy of $X$.

## Recursive Construction

!!! definition "Definition (Initial segment)"
    <a id="def-4-9-1"></a>
    <a id="def-initial-segment"></a>

    Let $(X, \leq)$ be a poset and $I \subseteq X$. Say $I$ is an
    **initial segment** if $\forall a \in I,\ X_{<a} \subseteq I$.

!!! theorem "Theorem (Recursive construction)"
    <a id="thm-4-9-2"></a>
    <a id="thm-recursive-construction"></a>

    Let $(X, \leq)$ be a well-ordered set and $Y$ a set. Suppose that for
    every $x \in X$ and every mapping $h : X_{<x} \to Y$ we have fixed an
    element $\Phi(h) \in Y$. Then there exists a unique mapping
    $f : X \to Y$ with

    $$
    \forall x \in X,\quad f(x) = \Phi(f|_{X_{<x}}).
    $$

??? proof "Proof"
    Uniqueness follows from transfinite induction. For existence, let
    $\mathcal{S}$ be the family of initial segments $S$ admitting a map
    $f_S : S \to Y$ satisfying the recursion; one shows that
    $S_0 = \bigcup_{S \in \mathcal{S}} S$ is in $\mathcal{S}$, and that the
    only obstruction to $S_0 = X$ would be a maximal element $a$ with
    $S_0 = X_{<a}$, which can be extended by setting
    $f(a) = \Phi(f)$.

!!! proposition "Proposition (Initial segments)"
    <a id="prop-initial-segments"></a>

    Initial segments in a total order are comparable by inclusion.
    Every proper initial segment of a well-order is uniquely $X_{<a}$.
    Unions and nonempty intersections preserve initial segments.

??? proof "Proof"
    If $x\in I\setminus J$, every $y\in J$ lies below $x$, or initiality
    would force $x\in J$; hence $J\subseteq I$. For a proper segment
    take $a=\min(X\setminus I)$. Minimality puts every point below $a$
    in $I$; initiality puts every point of $I$ below $a$. Its complement
    has least point $a$, proving uniqueness. Union and intersection
    preserve the defining predecessor condition.

??? proof "Proof"
    In the recursive-construction proof, two partial solutions agree on
    their common initial segment by induction. Define $f(x)=f_S(x)$
    using any segment containing $x$; this is well defined and satisfies
    the recursion on their union. If that union is proper, it is
    $X_{<a}$ for the **least omitted point** $a$, and setting $f(a)=\Phi(f)$
    gives the forbidden extension. The point $a$ need not be maximal in $X$.

!!! example "Example (Arithmetic recursion)"
    <a id="ex-arithmetic-recursion"></a>

    With $f(0)=0$ and $f(n+1)=f(n)+\varepsilon$, recursion gives the
    unique $f(n)=n\varepsilon$.

## Cardinality Basics

!!! definition "Definition (Countable / finite set)"
    <a id="def-4-9-3"></a>
    <a id="def-countable-finite-set"></a>

    A set $A$ is **countable** if there is an injective mapping $A \to \mathbb{N}$.
    It is **finite** if such an injection has bounded image.

!!! theorem "Theorem (N × N equipotent to N)"
    <a id="thm-4-9-4"></a>
    <a id="thm-n-n-equipotent-to-n"></a>

    $\mathbb{N} \times \mathbb{N}$ is equipotent to $\mathbb{N}$.

??? proof "Proof"
    The map $(a, b) \mapsto 2^a(2b + 1)$ is an injection
    $\mathbb{N} \times \mathbb{N} \to \mathbb{N}$.

    Equality of two values forces equality of the exponents of $2$ and
    then of the odd factors. The reverse injection is $n\mapsto(0,n)$;
    [Theorem](#thm-cantorbernstein) supplies the bijection.

!!! lemma "Lemma (Increasing natural numbers)"
    <a id="lem-increasing-natural-numbers"></a>

    If $x_0<\cdots<x_n$ are natural numbers, then $x_i\ge i$; the same
    holds for an infinite strictly increasing sequence.

??? proof "Proof"
    Induct from $x_0\ge0$, using $x_i\ge x_{i-1}+1\ge i$.

!!! proposition "Proposition (Mappings and finite or countable sets)"
    <a id="prop-mappings-and-finite-or-countable-sets"></a>

    Injections into finite or countable sets have departure sets of the
    same respective type. Surjective images preserve each type. Unions
    of two finite or two countable sets preserve the type. Removing a
    finite set from an infinite set leaves an infinite set, and removing
    a countable set from an uncountable set leaves an uncountable set.

??? proof "Proof"
    Compose injections with the defining injection into $\mathbb N$;
    for surjections use an injective section, supplied by choice.
    Given $f:X\to\mathbb N$, $g:Y\to\mathbb N$ injective, put
    $h(x)=2f(x)$ on $X$ and $h(y)=2g(y)+1$ on $Y\setminus X$.
    Parity separates the pieces; bounded images stay bounded. If the
    difference had the smaller property, writing
    $X=(X\setminus Y)\cup(X\cap Y)$ would contradict the type of $X$.

!!! corollary "Corollary (Finite powers of the natural numbers)"
    <a id="cor-finite-powers-of-the-natural-numbers"></a>

    For $n\ge1$, $\mathbb N^n$ and $\mathbb N$ are equipotent.

??? proof "Proof"
    Given a bijection $f:\mathbb N^n\to\mathbb N$, the mapping
    $(x_1,\ldots,x_{n+1})\mapsto(f(x_1,\ldots,x_n),x_{n+1})$ is a
    bijection to $\mathbb N^2$. Compose with its bijection to $\mathbb N$
    and induct from $n=1$.

!!! definition "Definition (Sequences and iterates)"
    <a id="def-sequences-and-iterates"></a>

    A **sequence** in $X$ is a family indexed by an infinite subset of
    $\mathbb N$; examples are $(a+bn)_{n\in\mathbb N}$ and $(1/n)_{n\ge1}$.
    For $f:X\to X$, set $f^0=\operatorname{Id}_X$ and $f^{n+1}=f\circ f^n$.

!!! proposition "Proposition (Increasing natural-number self-maps)"
    <a id="prop-increasing-natural-number-self-maps"></a>

    An increasing bijection $I\to I$, $I\subseteq\mathbb N$, is the
    identity. For bounded $I$, any strictly increasing self-map is the
    identity; thus no strictly increasing $I\to J$ exists for proper
    $J\subset I$.

??? proof "Proof"
    Choose the least moved point $n_0$. If $f(n_0)<n_0$, this smaller
    point is fixed, and strict monotonicity gives
    $f(f(n_0))<f(n_0)$, a contradiction. Hence $f(n_0)>n_0$.
    Points below $n_0$ are fixed and points at least $n_0$ map above it,
    contradicting surjectivity. In the bounded strictly increasing case,
    the iterates $f^k(n_0)$ strictly increase and are at least $k$, also
    a contradiction. Compose a proposed map to $J$ with inclusion to
    obtain the identity, whose image cannot lie in proper $J$.

!!! proposition "Proposition (Increasing enumeration and cardinality)"
    <a id="prop-increasing-enumeration-and-cardinality"></a>

    A nonempty bounded $I\subseteq\mathbb N$ has a unique increasing
    bijection $\{0,\ldots,N\}\to I$ for a unique $N$. An unbounded
    $I\subseteq\mathbb N$ has a unique increasing bijection $\mathbb N\to I$.
    A nonempty set is finite precisely when it is
    $\{x_0,\ldots,x_N\}$ for distinct points; its cardinality is $N+1$.

??? proof "Proof"
    Select $x_0=\min I$ and recursively the least unused point.
    Boundedness forces termination. In the unbounded case $x_n\ge n$,
    so no $m\in I$ can remain unused: eventually $x_n>m$, contradicting
    minimality. Two infinite enumerations differ by an increasing bijection
    of $\mathbb N$, hence coincide. In the finite case increasing
    injections in both directions force equal lengths by the preceding
    proposition, and then force agreement. Apply the construction to a
    bounded image of an injection from any finite set.

!!! theorem "Theorem (Characterizations of infinitude)"
    <a id="thm-characterizations-of-infinitude"></a>

    Under choice, these are equivalent: $X$ is infinite; an injection
    $\mathbb N\to X$ exists; an injective self-map $X\to X$ with proper
    image exists.

??? proof "Proof"
    In an infinite set recursively choose $x_{n+1}$ outside the finite
    set already chosen. Given $f:\mathbb N\to X$ injective, shift
    $f(n)$ to $f(n+1)$ and fix other points; the map is injective and
    omits $f(0)$. Conversely, for $g$ injective with proper image take
    $x_0\notin g(X)$; its iterates are distinct, since equality at
    $n<m$ would imply $x_0=g^{m-n}(x_0)\in g(X)$ by cancellation.
    Finally an injection from $\mathbb N$ into a finite set would imply
    an injection into a bounded subset of $\mathbb N$, contrary to the
    finite-cardinality characterization.
