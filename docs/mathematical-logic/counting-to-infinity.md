# Counting To Infinity

## Naive Set Theory

We use the notions of *set* and *natural number* in the same way. We define *union*, *intersection*, *difference* and *power set*.

We will make constant use of the **extensionality principle** according to which two sets containing the same elements are equal.

We shall also make use of the **comprehension principle** which states that given a set $A$ and a property $P$ of sets, there exists a set whose elements are exactly those elements of $A$ that satisfy property $P$.

!!! definition "Definition"
    <a id="def-1-1-1"></a>
    Let $X$ and $Y$ be sets. One says that $X$ and $Y$ are **equinumerous**, and writes $X \sim Y$, if there exists a bijection between $X$ and $Y$; one says $X$ is **subnumerous** to $Y$, and writes $X \preceq Y$, if there exists an injection $X \to Y$.

!!! theorem "Theorem (Cantor-Bernstein)"
    <a id="thm-1-1-2"></a>
    For sets $X$ and $Y$, if $X \preceq Y$ and $Y \preceq X$, then $X \sim Y$.

## Order

!!! definition "Definition (Partial/Total Order)"
    <a id="def-1-2-1"></a>
    A **partial order** $<$ on a set $X$ is a binary relation (subset of $X \times X$) satisfying:

    1. **Transitive**: If $x < y$ and $y < z$, then $x < z$.

    2. **Antireflexive**: $x \nless x$ for all $x \in X$.

    If for every $x,y \in X$, exactly one of $x < y$, $x=y$, or $y < x$ holds, then $<$ is a **total order**.

!!! definition "Definition"
    <a id="def-1-2-2"></a>
    Let $X,Y$ be sets and $Y \subseteq X$,

    - **Smallest element**: $y \in Y$ with $y \leq y'$ for all $y' \in Y$ (unique, if exists) 
    - **Minimal element**: $y \in Y$ with no $y' \in Y$ satisfying $y' < y$ (not necessarily unique) 
    - (Similarly define *largest/maximal element*) 
    - **Lower bound**: $x \in X$ with $x \leq y$ for all $y \in Y$ 
    - **Infimum**: the *largest* lower bound of $Y$
    - (Similarly define *upper bound, supremum*)

!!! definition "Definition"
    <a id="def-1-2-3"></a>

    + Let $<$ be a partial order on $X$. We say $<$ is **well-founded** if any non-empty subset of $X$ contains a minimal element.

    + A **well-order** is a well-founded total order.

## Operations on Orders

!!! definition "Definition"
    <a id="def-1-3-1"></a>
    Let $X$ and $Y$ be partially ordered sets.

    + The **ordered sum** of $X$ and $Y$, denoted by $X + Y$, is the partially ordered set consisting of pairs $(x, 0)$ with $x \in X$ and $(y, 1)$ with $y \in Y$, the order being defined as follows: $(a, i) < (b, j)$ if $i < j$ or if $i = j$ and $a < b$.

    + The **reverse lexicographic product** of $X$ and $Y$ is defined by endowing the cartesian product $X \times Y$ with the order: $(x, y) < (x', y')$ if $y < y'$ or if $y = y'$ and $x < x'$. It is still denoted by $X \times Y$.

    By an **isomorphism** between two partially ordered sets $X$ and $Y$ we mean a bijection $f$ between $X$ and $Y$ such that for any $x, x' \in X$ one has $x < x'$ if and only if $f(x) < f(x')$.

!!! lemma "Lemma"
    <a id="lem-1-3-2"></a>

    + The ordered sum of total orders (resp. well-founded partial orders) is a total order (resp. well-founded).

    + The reverse lexicographic product of two total orders (resp. well-founded partial orders) is a total order (resp. well-founded).

    + Let $X, Y, Z$ be partially ordered sets. We have the following canonical isomorphisms of partially ordered sets:

      + $(X + Y) + Z \cong X + (Y + Z)$.

      + $(X \times Y) \times Z \cong X \times (Y \times Z)$

      + $X \times (Y + Z) \cong (X \times Y) + (X \times Z)$.

??? proof "Proof"
    The only non-trivial point to check is that the reverse lexicographic product of two well-founded partially ordered sets is well-founded.
    Let $X$ and $Y$ be two well-founded partially ordered sets. Let $Z$ be a non-empty subset of $X \times Y$. We denote by $\pi: X \times Y \to Y$ the projection on the second factor. The order on $Y$ being well-founded, there exists a minimal element $y_0$ in $\pi(Z) \subseteq Y$. Since the order on $X$ is well-founded, there is a minimal element $x_0$ in the (non-empty) set $Z_{y_0} = \{x \in X \mid (x, y_0) \in Z\}$. It is clear that $(x_0, y_0)$ is minimal in $Z$.

!!! definition "Definition"
    <a id="def-1-3-3"></a>
    Let $X$ and $Y$ be totally ordered sets. We assume that $X$ admits a smallest element $0$. One defines the partially ordered set $X^{(Y)}$ as follows. As a set, it is the set of functions from $Y$ to $X$ with finite support, that is, the subset of the set $X^Y$ of all functions $Y \to X$ consisting of functions $f: Y \to X$ such that

    $$
    \text{supp}(f) := \{y \in Y \mid f(y) \neq 0\}
    $$

    is finite. One sets $f < g$ if there exists $y \in Y$ such that $f(y) < g(y)$ and $f(y') = g(y')$ for every $y' > y$.

!!! proposition "Proposition"
    <a id="prop-1-3-4"></a>
    Let $X, Y$ and $Z$ be totally ordered sets, and assume that $X$ admits a smallest element $0$.

    + The relation $<$ defines a **total order** on $X^{(Y)}$ which is well-founded when the orders on $X$ and $Y$ are both well-founded.

    + There are canonical isomorphisms of totally ordered sets

      $$
      X^{(Y+Z)} \cong X^{(Y)} \times X^{(Z)} \quad \text{and} \quad X^{(Y \times Z)} \cong (X^{(Y)})^{(Z)}
      $$

??? proof "Proof"
    The only non-trivial point to check is that if $X$ and $Y$ are well-ordered, then $X^{(Y)}$ is well-founded. Let $Z$ be a non-empty subset of $X^{(Y)}$. Let us prove that $Z$ contains a smallest element. If the constant function with value $0$ belongs to $Z$, there is nothing to prove. Hence, we may assume $\text{supp}(f) \neq \emptyset$ for every $f \in Z$. Let

    $$
    Y_1 = \{s_1(f) \mid f \in Z\},
    $$

    where $s_1(f) = \max(\text{supp}(f))$. Let $y_1$ be the smallest element of $Y_1$, and set $Z_1' = \{f \in Z \mid s_1(f) = y_1\}$. The set $Z_1'$ is an initial segment of $Z$, in other words $f < g$ for every $f \in Z_1'$ and $g \in Z \setminus Z_1'$. Let $x_1$ be the smallest element of $\{f(y_1) \mid f \in Z_1'\}$. We set

    $$
    Z_1 = \{f \in Z_1' \mid f(y_1) = x_1\}.
    $$

    The set $Z_1$ is an initial segment of $Z_1'$. If $Z_1$ contains the function with constant value $0$ outside $\{y_1\}$, we are done. Otherwise, we have $\text{supp}(f) \setminus \{y_1\} \neq \emptyset$ for every $f \in Z_1$. Let $Y_2 = \{s_2(f) \mid f \in Z_1\}$, where $s_2(f) = \max(\text{supp}(f) \setminus \{y_1\})$. Let $y_2$ be the smallest element of $Y_2$, and $x_2$ the smallest element of $\{f(y_2) \mid f \in Z_1 \text{ and } y_2 = s_2(f)\}$. We set $Z_2 = \{f \in Z_1 \mid s_2(f) = y_2 \text{ and } f(y_2) = x_2\}$. It is an initial segment of $Z_1$. If $Z_2$ contains the function with constant value $0$ outside $\{y_1, y_2\}$, we are done, otherwise one continues in the same way, constructing $Y_3, y_3, Z_3', x_3, Z_3$ and so on. Since the sequence $(y_i)$ is strictly decreasing in $Y$, this process stops after a finite number of steps.

## Ordinal Numbers

!!! definition "Definition"
    <a id="def-1-4-1"></a>
    A set $X$ is said to be **transitive** if for all $x \in X$ and $y \in x$ one has $y \in X$.
    This is equivalent to $x \in X \Rightarrow x \subseteq X$.

!!! definition "Definition"
    <a id="def-1-4-2"></a>
    A set $X$ is an **ordinal** if it is transitive and if the relation $\{(x,y) \in X \times X \mid x \in y\}$ on $X$ defines a well-order on $X$.

!!! proposition "Proposition"
    <a id="prop-1-4-3"></a>
    Let $\alpha$ and $\beta$ be ordinals.

    1. $\emptyset$ is an ordinal.

    2. If $\alpha \neq \emptyset$, then $\emptyset\in \alpha$.

    3. $\alpha \notin \alpha$.

    4. If $x \in \alpha$, then $x = S_{<x} := \{y \in \alpha \mid y < x\}$.

    5. If $x \in \alpha$, then $x$ is an ordinal.

    6. $\beta \subseteq \alpha$ if and only if $\beta \in \alpha$ or $\beta = \alpha$.

    7. $x := \alpha \cup \{\alpha\}$ is an ordinal, denoted by $\alpha^+$

??? proof "Proof"
    (1) is clear. For (2), one considers $x \in \alpha$ minimal. If $y \in x$, then $y \in \alpha$ by transitivity of $\alpha$, and $x$ would not be minimal. In (3), by antireflexivity, we have $x \notin x$ for every $x \in \alpha$. Thus $\alpha \in \alpha$ implies $\alpha \notin \alpha$. (4) follows from the fact that $<$ is given by $\in$. To prove (5), note that $\in$ restricts to a well-order on $x$, since $x \subseteq \alpha$. Furthermore, $x = S_{<x}$ is transitive, since $z \in y \in x \Rightarrow z \in x \Rightarrow z \in S_{<x}$.
    To prove the 'only if' part in (6), let us assume that $\beta \subset \alpha$. Let $x$ be minimal in $\alpha \setminus \beta$. Clearly $\beta \supseteq S_{<x}$ by minimality. Furthermore, if $y \in \beta$, then $y \in x$ since otherwise $x \in y$ and $x \in \beta$. Hence $\beta = S_{<x} = x \in \alpha$. The other implication in (6) is clear, and the verification of (7) is immediate.

!!! proposition "Proposition"
    <a id="prop-1-4-4"></a>
    Let $X$ be a non-empty set of ordinals. Then $\bigcap _{\alpha \in X} \alpha$ is a smallest element of $X$.

??? proof "Proof"
    The intersection of a family of transitive sets is transitive, and the restriction of a well-order to a subset is a well-order. Hence $\beta = \bigcap_{\alpha \in X} \alpha$ is an ordinal. We have $\beta \subseteq \alpha$ for every $\alpha \in X$. If $\beta \notin X$, then $\beta \in \alpha$ for every $\alpha \in X$, by [Proposition 1.4.3.(6)](#prop-1-4-3) It follows that $\beta \in \beta$, which is absurd.

!!! theorem "Theorem"
    <a id="thm-1-4-5"></a>
    Let $\alpha$ and $\beta$ be ordinals. Exactly one of the following properties holds:
    (1) $\alpha \in \beta$, $\quad$ (2) $\alpha = \beta$, $\quad$ (3) $\beta \in \alpha$. 

??? proof "Proof"
    One sets $X = \{\alpha, \beta\}$, and one applies [Proposition 1.4.4](#prop-1-4-4). If $\alpha \cap \beta = \alpha$, then $\alpha \subseteq \beta$, hence $\alpha = \beta$ or $\alpha \in \beta$. Similarly, if $\alpha \cap \beta = \beta$, then $\alpha = \beta$ or $\beta \in \alpha$. The fact that these properties are mutually exclusive follows from the axioms of a partial order.

!!! note "Notation"
    <a id="not-1-4-6"></a>
    From now on, we shall write $\alpha < \beta$ for $\alpha \in \beta$, and $\alpha \leq \beta$ for $\alpha \subseteq \beta$, when $\alpha$ and $\beta$ are ordinals.

!!! proposition "Proposition"
    <a id="prop-1-4-7"></a>
    Let $X$ be a set of ordinals. Then $b = \bigcup_{\alpha \in X} \alpha$ is an ordinal. Furthermore, if $\gamma$ is an ordinal with $\gamma < b$, there exists $\alpha \in X$ such that $\gamma \in \alpha$. We shall also write $b = \sup_{\alpha \in X} \alpha$.

??? proof "Proof"
    The set $b$ being the union of transitive sets, it is transitive. Furthermore, $b$ contains only ordinals. By [Theorem 1.4.5](#thm-1-4-5), $\in$ induces a total order on $b$. If $\emptyset \neq Z \subseteq b$, then $\bigcap_{\alpha \in Z} \alpha$ is a smallest element of $Z$ by [Proposition 1.4.4](#prop-1-4-4). This shows that the order given by $\in$ on $b$ is well-founded.

!!! definition "Definition"
    <a id="def-1-4-8"></a>

    + An ordinal of the form $\alpha^+$ is called a **successor ordinal**. It is clear that $\alpha^+$ is the smallest ordinal $> \alpha$.

    + A **limit ordinal** is a non-empty ordinal which is not a successor.

!!! proposition "Proposition"
    <a id="prop-1-4-9"></a>
    For an ordinal $\lambda \neq \emptyset$, the following conditions are equivalent:

    1. $\lambda$ is a limit ordinal;

    2. $\lambda = \bigcup_{\alpha < \lambda} \alpha$.

??? proof "Proof"
    $(1) \Rightarrow (2)$. Let $\beta = \bigcup_{\alpha < \lambda} \alpha$ and $\lambda$ a limit. It is clear that $\beta \subseteq \lambda$. Conversely, assume $\alpha < \lambda$. Then $\alpha^+ \leq \lambda$ and it follows that $\alpha^+ < \lambda$ since $\lambda$ is a limit ordinal. The statement follows, since $\alpha \in \alpha^+ \subseteq \beta$.
    $(2) \Rightarrow (1)$. If $\lambda = \gamma^+$, then $\bigcup_{\alpha < \lambda} \alpha = \bigcup_{\alpha \leq \gamma} \alpha = \gamma < \lambda$.

!!! example "Example"
    <a id="ex-1-4-10"></a>
    (1) One can recover the natural numbers as ordinals as follows.
    One sets $\underline{0} := \emptyset$, and inductively $\underline{n+1} := \underline{n}^+$ for $n \in \mathbb{N}$.
    For instance $\underline{1} = \{\emptyset\}$, $\underline{2} = \{0,1\} = \{\emptyset, \{\emptyset\}\}$, $\underline{3} = \{0,1,2\} = \{\emptyset, \{\emptyset\}, \{\emptyset, \{\emptyset\}\}\}$.
    One proves by induction that $\underline{n}$ is an ordinal for every natural number $n$. We shall often identify $\underline{n}$ and $n$.
    (2) One sets $\omega := \bigcup_{n \in \mathbb{N}} \underline{n}$. It is an ordinal by [Proposition 1.4.9](#prop-1-4-9).

!!! definition "Definition"
    <a id="def-1-4-11"></a>
    One says that an ordinal is **finite** if it is not a limit and none of its elements is a limit.

!!! proposition "Proposition"
    <a id="prop-1-4-12"></a>

    1. $\omega$ is the set of finite ordinals.

    2. $\omega$ is the smallest limit ordinal.

??? proof "Proof"
    One proves first, by induction on $n \in \mathbb{N}$, that all elements of $\omega$ are finite ordinals. Furthermore, $\alpha < \omega$ implies $\alpha^+ < \omega$. This proves (2). If $\alpha \notin \omega$, then $\omega \leq \alpha$, so either $\alpha = \omega$ or $\omega \in \alpha$. In both cases, $\alpha$ is not finite. This proves (1).

!!! lemma "Lemma"
    <a id="lem-1-4-13"></a>
    Let $f : \alpha \to \alpha'$ be a strictly increasing map between two ordinals. Then $f(\beta) \geq \beta$ for every $\beta \in \alpha$. In particular, $\alpha \leq \alpha'$, and if $f$ is an isomorphism of ordered sets, then $\alpha = \alpha'$ and $f$ is equal to the identity.

??? proof "Proof"
    If there exists $\beta \in \alpha$ with $f(\beta) < \beta$, we consider $\beta_0$ minimal with that property. Since $f$ is strictly increasing, we have $f(f(\beta_0)) < f(\beta_0)$, which contradicts minimality.
    The statement about an isomorphism $f$ follows by applying the result to $f$ as well as to $f^{-1}$.

!!! theorem "Theorem (Classification of well-orders by ordinals)"
    <a id="thm-1-4-14"></a>
    Every well-ordered set $X$ is isomorphic, as an ordered set, to some ordinal. Furthermore, the ordinal and the isomorphism are both unique.

??? proof "Proof"
    Uniqueness follows from Lemma 1.5.8. To prove existence, let us first note that for every $x \in X$, any isomorphism between $S_{<x}$ and an ordinal $\alpha$ can be extended to an isomorphism between $S_{\leq x} = S_{<x} \cup \{x\}$ and $\alpha^+$. Let

    $$
    Y = \{ y \in X \mid \text{there exists } f : S_{\leq y} \cong \alpha \text{ for some ordinal } \alpha \}.
    $$

    By uniqueness, for $y \in Y$, the ordinal $\alpha = \alpha(y)$ and the isomorphism $f = f_y$ are unique. Let us prove $Y = X$. Otherwise, there would exist $x \in X$ minimal in $X \setminus Y$. For $y < x$ we have an isomorphism $f_y : S_{\leq y} \cong \alpha(y)$. Furthermore, these isomorphisms form a coherent family in the sense that for every $y' < y < x$ we have $f_y \upharpoonright S_{\leq y'} = f_{y'}$. (To see this, note that an initial segment of an ordinal is an ordinal.) We set

    $$
    \alpha = \sup_{y < x} \alpha(y) \text{ and } f : S_{<x} \to \alpha,\ f(y) := f_y(y).
    $$

    It is clear that $f$ is well defined and induces an isomorphism of ordered sets between $S_{<x}$ and $\alpha$. By the observation made at the beginning, $f$ may be extended to an isomorphism between $S_{\leq x}$ and $\alpha^+$, which leads to a contradiction. So we have $Y = X$. To conclude, one uses the same kind of argument, setting $\alpha(X) := \sup_{x \in X} \alpha(x)$ and $f : X \cong \alpha(X)$.

!!! remark "Remark (Transfinite induction)"
    <a id="rem-1-4-15"></a>
    Let $P$ be a property of ordinals. One assumes:

    - $\emptyset$ satisfies $P$; 

    - for every ordinal $\alpha$: if $\alpha$ satisfies $P$, then $\alpha^+$ satisfies $P$; 

    - for every limit ordinal $\lambda$: if every $\alpha < \lambda$ satisfies $P$, then $\lambda$ satisfies $P$.

    Then every ordinal satisfies $P$.

## Ordinal Arithmetic

If $\alpha$ and $\beta$ are ordinals, by Theorem 1.4.15 there is a unique ordinal isomorphic to the ordered sum of $\alpha$ and $\beta$, which one denotes by $\alpha+\beta$. One similarly defines $\alpha\beta$ as the unique ordinal isomorphic to the reverse lexicographic product $\alpha \times \beta$ and $\alpha^\beta$ as the unique ordinal isomorphic to the ordered set $\alpha^{(\beta)}$. Note that $0^\beta$ has still to be defined: one sets $0^0 := 1$ and $0^\beta := 0$ for every $\beta > 0$.

!!! proposition "Proposition (Ordinal addition)"
    <a id="prop-1-5-1"></a>
    Let $\alpha, \beta$ and $\gamma$ be ordinals.

    1. $\alpha + 0 = 0 + \alpha = \alpha$. 

    2. $\alpha + 1 = \alpha^+$. 

    3. $\alpha + (\beta + \gamma) = (\alpha + \beta) + \gamma$, in particular $\alpha + \beta^+ = (\alpha + \beta)^+$.

    4. $\alpha < \beta$ if and only if there exists an ordinal $\delta > 0$ such that $\beta = \alpha + \delta$.

    5. If $\beta < \gamma$, then $\alpha + \beta < \alpha + \gamma$ for every $\alpha$. In particular, one may simplify on the left: $\alpha + \beta = \alpha + \gamma \Rightarrow \beta = \gamma$.

    6. If $\lambda$ is a limit, then $\alpha + \lambda = \sup_{\beta < \lambda} (\alpha + \beta)$ (**continuity**).

    7. $1 + \alpha = \alpha + 1$ when $\alpha$ is finite, otherwise $1 + \alpha = \alpha$.

??? proof "Proof"
    (1) and (2) are clear, and (3) follows from Lemma 1.4.1. For the non-trivial implication in (4), one easily checks that the ordinal $\delta$ isomorphic to the well-ordered set $\beta \setminus \alpha$ does the job.
    (5) If $\beta < \gamma$, by (2) and (4) one has $\gamma = \beta + \delta$, hence $\alpha + \gamma = (\alpha + \beta) + \delta$, for some $\delta > 0$.
    (6) $\alpha + \lambda \ge \sup_{\beta < \lambda} (\alpha + \beta)$ follows from (5). Conversely, suppose $\alpha \le \mu < \alpha + \lambda$. Then $\mu = \alpha + \delta$ for some $\delta$ with $0 \le \delta < \lambda$. Since $\lambda$ is a limit, one has $\delta^+ < \lambda$, hence $\mu < \alpha + \delta^+ \le \sup_{\beta < \lambda} (\alpha + \beta)$.
    (7) One proves by induction on $n \in \mathbb{N}$ that $1 + n = n + 1$. By (6) we have $1 + \omega = \omega$. Finally, $\alpha \ge \omega$ can be written as $\alpha = \omega + \beta$, hence $1 + \alpha = 1 + \omega + \beta = \omega + \beta = \alpha$.

    &nbsp;

    From now on, we shall allow the omission of parentheses, using the convention that exponentiation ties are stronger than multiplication and that multiplication ties are stronger than addition. For instance, one should read $\alpha\beta + \gamma$ as $(\alpha\beta) + \gamma$, and $\gamma\alpha^\beta$ as $\gamma(\alpha^\beta)$.

!!! proposition "Proposition (Ordinal multiplication)"
    <a id="prop-1-5-2"></a>
    Let $\alpha, \beta, \gamma$ be ordinals.

    1. $\alpha 0 = 0\alpha = 0$. 

    2. $\alpha 1 = 1\alpha = \alpha$.

    3. $\alpha(\beta\gamma) = (\alpha\beta)\gamma$.

    4. $\alpha(\beta + \gamma) = \alpha\beta + \alpha\gamma$, in particular $\alpha\beta^+ = \alpha\beta + \alpha$. 

    5. $2\omega = \omega < \omega 2 = \omega + \omega$. 

    6. Assume $\alpha \neq 0$. If $\beta < \gamma$, then $\alpha\beta < \alpha\gamma$. In particular, one may simplify on the left: $\alpha\beta = \alpha\gamma \Rightarrow \beta = \gamma$. 

    7. If $\lambda$ is a limit ordinal, then $\alpha\lambda = \sup_{\beta < \lambda} \alpha\beta$ (**continuity**).

??? proof "Proof"
    (1) and (2) are clear, (3) and (4) follow from Lemma 1.4.1. For (6), it suffices to note that if $\beta < \gamma$ then $\gamma = \beta + \delta$ for some $\delta > 0$, hence $\alpha\gamma = \alpha\beta + \alpha\delta$ by (4) from which it follows that $\alpha\gamma > \alpha\beta$.
    (7) One may assume $\alpha \neq 0$. Let $\lambda$ be a limit ordinal. The inequality $\alpha\lambda \ge \sup_{\beta < \lambda} \alpha\beta =: \delta$ follows from (6). Conversely, let $\gamma < \alpha\lambda$. Euclidean division, proved in the next lemma, provides a pair of ordinals $(\rho, \mu)$ such that $\gamma = \alpha\mu + \rho$, with $\rho < \alpha$. Since $\mu < \lambda$ by (6), we have $\mu^+ < \lambda$ because $\lambda$ is a limit ordinal, hence $\gamma = \alpha\mu + \rho < \alpha\mu + \alpha = \alpha\mu^+ \le \delta$. In (5), $2\omega = \omega$ follows from (7), the other statements being clear.

!!! lemma "Lemma (Euclidean division)"
    <a id="lem-1-5-3"></a>
    Let $\alpha$ and $\beta$ be ordinals, with $\alpha \neq 0$. Then there exists a unique pair of ordinals $(\rho, \mu)$ such that $\rho < \alpha$ and $\beta = \alpha\mu + \rho$.

??? proof "Proof"

    *Uniqueness:* Assume $\alpha\mu + \rho = \alpha\mu' + \rho'$ with $\rho, \rho' < \alpha$. If $\mu < \mu'$, then $\alpha\mu + \rho < \alpha\mu^+ \le \alpha\mu' \le \alpha\mu' + \rho'$, which is absurd. Hence $\mu = \mu'$ by symmetry, and one obtains $\rho = \rho'$ after simplifying.

    *Existence:* When $\beta = 0$ there is nothing to prove. Assume $\beta \neq 0$. The mapping $f_0 : \beta \to \alpha \times \beta$, $x \mapsto (0, x)$ is strictly increasing, hence $\beta \le \alpha\beta$ by [Lemma 1.4.13](#lem-1-4-13). If $\beta = \alpha\beta$, one sets $\mu = \beta$ and $\rho = 0$. Otherwise, we have $\beta \in \alpha\beta$. Let $f$ be the unique isomorphism of ordered sets between $\alpha\beta$ and $\alpha \times \beta$. One sets $(\rho, \mu) = f(\beta)$. Since $S_{<(\rho, \mu)} \cong (\alpha \times \mu) + \rho$ it follows that $\beta = \alpha\mu + \rho$.

    Note that we have only used properties (1)–(4) and (6) from [Proposition 1.5.2](#prop-1-5-2) in our proof of Euclidean division, thus avoiding circularity.

!!! proposition "Proposition (Ordinal exponentiation)"
    <a id="prop-1-5-4"></a>
    Let $\alpha, \beta, \gamma$ be ordinals.

    1. For every $\alpha$, we have $\alpha^0 = 1$, $\alpha^1 = \alpha$ and $1^\alpha = 1$. If $\alpha \neq 0$, then $0^\alpha = 0$. 

    2. $\alpha^{\beta+\gamma} = \alpha^\beta \alpha^\gamma$, in particular $\alpha^{\beta^+} = \alpha^\beta \alpha$. 

    3. $(\alpha^\beta)^\gamma = \alpha^{\beta\gamma}$. 

    4. If $\alpha > 1$ and $\beta < \gamma$, then $\alpha^\beta < \alpha^\gamma$. 

    5. If $\lambda$ is a limit ordinal and $\alpha \neq 0$, then $\alpha^\lambda = \sup_{\beta < \lambda} \alpha^\beta$ (continuity).

??? proof "Proof"
    (1) is checked directly, and statements (2) and (3) follow from [Proposition 1.3.4](#prop-1-3-4).
    (4) $\beta < \gamma \Rightarrow \gamma = \beta + \delta$ for some $\delta > 0$. Hence $\alpha^\gamma = \alpha^{\beta+\delta} = \alpha^\beta \alpha^\delta$. But $\alpha^\delta > 1$ since as a set $\alpha^{(\delta)}$ contains at least two elements. It follows that $\alpha^\gamma > \alpha^\beta$ by [Proposition 1.5.2](#prop-1-5-2)(6).
    Let us prove the non-trivial inequality in (5). Let $f \in \alpha^{(\lambda)}$. One may assume $f$ is not the constant function with value $0$. Then $s_1(f) < \lambda$, and hence $\beta = s_1(f)^+ < \lambda$, which proves there exists a strictly increasing function $S_{\leq f} \to \alpha^{(\beta)}$. One concludes by [Lemma 1.4.13](#lem-1-4-13).

!!! remark "Remark"
    <a id="rem-1-6-5"></a>
    The following formulas would allow us to define ordinal addition, multiplication and exponentiation by transfinite induction:

    + $\alpha + 0 = \alpha$, $\alpha + \beta^+ = (\alpha + \beta)^+$, and $\alpha + \lambda = \sup_{\beta < \lambda} (\alpha + \beta)$ for $\lambda$ a limit ordinal.

    + $\alpha 0 = 0$, $\alpha \beta^+ = \alpha \beta + \alpha$, and $\alpha \lambda = \sup_{\beta < \lambda} (\alpha \beta)$ for $\lambda$ a limit ordinal. 

    + Assume $\alpha \neq 0$. Then one has $\alpha^0 = 1$, $\alpha^{\beta^+} = \alpha^\beta \alpha$, and $\alpha^\lambda = \sup_{\beta < \lambda} \left( \alpha^\beta \right)$ for $\lambda$ a limit ordinal.

## The Axiom of Choice

Given a family of sets $(X_i)_{i \in I}$, one defines their product as

$$
\prod_{i \in I} X_i = \left\{ f : I \to \bigcup_{i \in I} X_i \,\bigg|\, f(i) \in X_i \text{ for all } i \in I \right\}.
$$

!!! definition "Definition"
    <a id="def-1-6-1"></a>
    The **Axiom of Choice** (AC) states that the product of a family of non-empty sets is non-empty: if $X_i \neq \emptyset$ for all $i \in I$, then $\prod_{i \in I} X_i \neq \emptyset$.
    In the Zermelo-Fraenkel system of axioms ZF, (AC) is equivalent to Zorn's Lemma and also to Zermelo's Theorem. We shall prove these equivalences in the last chapter of this book, and accept them for the moment.

!!! definition "Definition"
    <a id="def-1-6-2"></a>
    A partially ordered set $X$ is **inductive** if any totally ordered subset $Y \subseteq X$ admits an upper bound in $X$. (In particular, such an $X$ is non-empty).

!!! lemma "Zorn's Lemma"
    <a id="lem-1-6-3"></a>
    Every inductive partially ordered set admits a maximal element.

!!! theorem "Zermelo's Theorem (Wohlordnungssatz)"
    <a id="thm-1-6-4"></a>
    Every set can be well-ordered.

## Cardinal Numbers

We now assume, until the end of the penultimate chapter, that the Axiom of Choice holds.

!!! definition "Definition"
    <a id="def-1-7-1"></a>
    An ordinal is a **cardinal** if it is not equinumerous to a smaller ordinal.

!!! example "Example"
    <a id="ex-1-7-2"></a>

    1. Any finite ordinal is a cardinal.

    2. The ordinal $\omega$ is a cardinal. When considered as a cardinal it will be denoted by $\aleph_0$. 

    3. If $\alpha$ is an infinite ordinal, then $\alpha^+$ is not a cardinal. (Indeed, $\alpha^+$ and $\alpha$ are equinumerous.)

!!! proposition "Proposition"
    <a id="prop-1-7-3"></a>
    Any set $X$ is equinumerous to a unique cardinal, denoted by $\operatorname{card}(X)$.

??? proof "Proof"
    By Zermelo's Theorem and [Theorem 1.4.14](#thm-1-4-14), $X$ is equinumerous to an ordinal $\alpha$. Let $\beta \leq \alpha$ be minimal such that $\beta$ is equinumerous to $\alpha$. Then $\beta$ is a cardinal and is in bijection with $X$. Uniqueness is clear.

!!! proposition "Proposition"
    <a id="prop-1-7-4"></a>
    Let $X$ and $Y$ be sets and assume that $X$ is non-empty. The following statements are equivalent:

    1. $\operatorname{card}(X) \leq \operatorname{card}(Y)$.

    2. There exists an injective map $X \to Y$.

    3. There exists a surjective map $Y \to X$.

??? proof "Proof"
    (1)$\Rightarrow$(2) is easy.
    (2)$\Rightarrow$(3): Let $f : X \to Y$ be an injective map. As $X$ is non-empty, one may fix $x_0 \in X$. One defines a surjective map $g : Y \to X$ by setting $g(y) := x_0$ if $y \notin \operatorname{im}(f) = \{f(x) \mid x \in X\}$, and $g(y) := f^{-1}(y)$ otherwise.
    (3)$\Rightarrow$(1): If there exists a surjective map $Y \to X$, then there exists a surjection $g : \lambda = \operatorname{card}(Y) \to \kappa = \operatorname{card}(X)$. The map $f$ sending $\alpha \in \kappa$ to the minimal $\beta \in \lambda$ such that $g(\beta) = \alpha$ provides an injection $\kappa \to \lambda$. In particular, $\kappa$ is in bijection with some ordinal $\gamma \leq \lambda$. (One takes $\gamma$ as the unique ordinal which is isomorphic to the well-order induced on $\operatorname{im}(f)$.)

!!! definition "Definition"
    <a id="def-1-7-5"></a>
    A set $X$ is said to be **countable** if $\operatorname{card}(X) \leq \aleph_0$, and **finite** if $\operatorname{card}(X) < \aleph_0$.

!!! proposition "Proposition"
    <a id="prop-1-7-6"></a>
    Let $X$ be a set of cardinals. Then $\lambda = \sup_{\kappa \in X} \kappa$ is a cardinal.

??? proof "Proof"
    If $\alpha < \lambda$, then $\alpha < \kappa$ for some $\kappa \in X$. Since $\kappa$ is a cardinal, we have $\kappa = \operatorname{card}(\kappa) \leq \operatorname{card}(\lambda)$, and hence $\alpha < \operatorname{card}(\lambda)$. This proves that $\lambda$ is not equinumerous to some smaller ordinal.

!!! note "Notation"
    From now on, $\kappa, \lambda$, etc. will denote cardinals.

    There is no largest cardinal. Indeed, if $\kappa$ is a cardinal, then $\lambda := \operatorname{card}(\mathcal{P}(\kappa)) > \kappa$ by Cantor's Theorem. In particular, the set of all cardinals $\leq \lambda$ that are $> \kappa$ is non-empty. We denote by $\kappa^+$ its smallest element, called the **cardinal successor** of $\kappa$. To avoid confusion, from now on the ordinal successor of $\alpha$ will be denoted by $\alpha + 1$.

!!! definition "Definition"
    The $\aleph$-hierarchy assigns to any ordinal a cardinal as follows:

    + $\aleph_0 := \omega$. 

    + $\aleph_{\alpha+1} := \aleph_\alpha^+$.

    + $\aleph_\alpha := \sup_{\beta < \alpha} \aleph_\beta$, if $\alpha$ is a limit ordinal.

    By transfinite induction, one proves that $\alpha < \beta \Rightarrow \aleph_\alpha < \aleph_\beta$. In combination with the next result, it follows that the $\aleph$-hierarchy provides a strictly increasing enumeration of the infinite cardinals by the ordinals.

!!! proposition "Proposition"
    <a id="prop-1-7-7"></a>
    Every infinite cardinal is of the form $\aleph_\alpha$ for some $\alpha$.

??? proof "Proof"
    Let $\kappa$ be an infinite cardinal. The function $\beta \mapsto \aleph_\beta$ is strictly increasing on $\kappa + 1$, and hence it takes its values in $\aleph_{\kappa+1}$. Thus $\aleph_\kappa \geq \kappa$ by Lemma 1.5.8, and it takes $\aleph_{\kappa+1} > \kappa$. Let $\alpha \leq \kappa + 1$ be minimal with $\aleph_\alpha > \kappa$. Since $\kappa \geq \aleph_0$, we have $\alpha > 0$. If $\alpha$ were a limit ordinal, by definition we would have $\kappa \in \bigcup_{\beta < \alpha} \aleph_\beta$, and hence $\kappa \in \aleph_\beta$ for some $\beta < \alpha$, which would contradict the minimality of $\alpha$. Thus $\alpha = \beta + 1$ and also $\aleph_\beta \leq \kappa < \aleph_{\beta+1} = \aleph_\beta^+$. Since $\aleph_\beta^+$ is the cardinal successor of $\aleph_\beta$, necessarily $\aleph_\beta = \kappa$.

## Operations on Cardinals

If $X$ and $Y$ are sets, one denotes by $X + Y$ their disjoint union, by $X \times Y$ their cartesian product and by $X^Y$ the set of maps from $Y$ to $X$. If $\kappa$ and $\lambda$ are cardinals, one denotes by $\kappa + \lambda$ the cardinal of their disjoint union, by $\kappa\lambda$ the cardinal of their cartesian product and by $\kappa^\lambda$ the cardinal of the set of maps from $\lambda$ to $\kappa$. These operations are respectively called **cardinal addition**, **cardinal multiplication** and **cardinal exponentiation**.

They should not be confused with the corresponding ordinal operations. For instance $2^\omega = \omega = \aleph_0 < 2^{\aleph_0}$; also $\aleph_0 2 = \aleph_0$, but $\omega < \omega 2$. It is clear that on finite cardinals all of these operations correspond to the usual arithmetic operations. Note that $\operatorname{card}(X + Y) = \operatorname{card}(X) + \operatorname{card}(Y)$, $\operatorname{card}(X \times Y) = \operatorname{card}(X)\operatorname{card}(Y)$ and $\operatorname{card}(X^Y) = \operatorname{card}(X)^{\operatorname{card}(Y)}$.

The proof of the following statements is immediate, using [Proposition 1.7.4](#prop-1-7-4).

!!! proposition "Proposition"
    <a id="prop-1-8-1"></a>
    Let $\kappa, \lambda$ and $\mu$ be cardinals.

    1. Cardinal addition and multiplication are commutative and associative, multiplication is distributive with respect to addition,

       $$
       \kappa^{\lambda+\mu} = \kappa^\lambda \kappa^\mu,\ (\kappa^\lambda)^\mu = \kappa^{\lambda\mu}\ \text{and}\ (\kappa\lambda)^\mu = \kappa^\mu\lambda^\mu.
       $$

    2. If $\kappa \leq \lambda$, then $\kappa + \mu \leq \lambda + \mu$, $\kappa\mu \leq \lambda\mu$ and $\kappa^\mu \leq \lambda^\mu$ (when $\kappa > 0$) and $\mu^\kappa \leq \mu^\lambda$ (when $\mu > 0$).

!!! proposition "Proposition"
    <a id="prop-1-8-2"></a>
    One has $\operatorname{card}(\mathbb{R}) = 2^{\aleph_0}$.

??? proof "Proof"
    There is an injection $h : 2^{\aleph_0} \to \mathbb{R}$ sending a sequence $(a_i)_{i \in \mathbb{N}}$ to the sum $\sum_i a_i 2^{-i}$ if the support of the sequence is infinite, and to $2 + \sum_i a_i 2^{-i}$ otherwise. This proves that $2^{\aleph_0} \leq \operatorname{card}(\mathbb{R})$. On the other hand, the image of $h$ contains the interval $(0,1)$ which is equinumerous to $\mathbb{R}$ (for instance via $x \mapsto 1/\pi \arctan(x) + 1/2$); hence $\operatorname{card}(\mathbb{R}) \leq 2^{\aleph_0}$.

!!! theorem "Proposition (Hessenberg's Theorem)"
    <a id="thm-1-8-3"></a>
    For every infinite cardinal $\kappa$, one has $\kappa\kappa = \kappa$.

??? proof "Proof"
    By induction on $\alpha$, we will prove that $\aleph_\alpha \aleph_\alpha = \aleph_\alpha$.
    For $\alpha = 0$ this is clear. Indeed, the mapping $\alpha_2 : \mathbb{N}^2 \to \mathbb{N}$ defined by $\alpha_2(m, n) := 1/2(m + n + 1)(m + n) + n$ is bijective.
    Let us now assume $\aleph_\beta \aleph_\beta = \aleph_\beta$ for every $\beta < \alpha$. One endows $\aleph_\alpha \times \aleph_\alpha$ with the following order:

    $$
    (\beta, \gamma) < (\beta', \gamma')
    $$

    if $\max(\beta, \gamma) < \max(\beta', \gamma')$, or 
    if $\max(\beta, \gamma) = \max(\beta', \gamma')$ and $\beta < \beta'$, or 
    if $\max(\beta, \gamma) = \max(\beta', \gamma')$, $\beta = \beta'$ and $\gamma < \gamma'$.
    One checks easily that this is a well-order. Furthermore, for every $\delta < \aleph_\alpha$, the set $\delta \times \delta$ is an initial segment for $<$. By Theorem 1.5.9, there is a unique isomorphism of ordered sets $f : \varepsilon \to \aleph_\alpha \times \aleph_\alpha$ with $\varepsilon$ an ordinal.
    Assume $\varepsilon > \aleph_\alpha$. Then $\aleph_\alpha \in \varepsilon$ and $f(\aleph_\alpha) = (\beta_0, \gamma_0) \in \aleph_\alpha \times \aleph_\alpha$. Set $\delta_0 := \max(\beta_0, \gamma_0) + 1$. Since no infinite successor ordinal is a cardinal (by Example 1.8.1), we have $\delta_0 < \aleph_\alpha$ and the restriction of $f$ to $\aleph_\alpha$ is an injective map from $\aleph_\alpha$ to $\delta_0 \times \delta_0$, a set of cardinality

    $$
    \operatorname{card}(\delta_0 \times \delta_0) = \operatorname{card}(\delta_0) \delta_0 < \aleph_\alpha
    $$

    by the induction hypothesis. This is a contradiction, and thus one has $\aleph_\alpha \aleph_\alpha \leq \aleph_\alpha$.
    The inequality in the other direction is clear.

!!! example "Example"
    <a id="ex-1-8-4"></a>
    Let $\mathcal{T}$ be the set of all open subsets of $\mathbb{R}$. Then $\operatorname{card}(\mathcal{T}) = 2^{\aleph_0}$.

??? proof "Proof"
    The mapping assigning to a real number $r \in \mathbb{R}$ the open interval $(r, +\infty)$ defines an injection from $\mathbb{R}$ to $\mathcal{T}$, which proves that $\operatorname{card}(\mathcal{T}) \geq 2^{\aleph_0}$.
    Conversely, note that every open subset of $\mathbb{R}$ is a union of intervals of the form $(q, q + q')$, with $q \in \mathbb{Q}$ and $q' \in \mathbb{Q}_{>0}$. The mapping sending $Y \subseteq \mathbb{Q} \times \mathbb{Q}_{>0}$ to $\bigcup_{(q,q') \in Y} (q, q + q')$ provides a surjection of $\mathcal{P}(\mathbb{Q} \times \mathbb{Q}_{>0})$ to $\mathcal{T}$. Since $\mathbb{Q} \times \mathbb{Q}_{>0}$ is countable, one deduces that $2^{\aleph_0} \geq \operatorname{card}(\mathcal{T})$.

!!! proposition "Proposition"
    <a id="prop-1-8-5"></a>

    1. Let $X$ and $Y$ be non-empty sets and assume that at least one of them is infinite. Then

       $$
       \operatorname{card}(X \cup Y) = \operatorname{card}(X \times Y) = \max(\operatorname{card}(X), \operatorname{card}(Y))
       $$

    2. Let $\kappa \geq \aleph_0$ and $\lambda > 0$ be cardinals. Then $\kappa + \lambda = \kappa\lambda = \max(\kappa, \lambda)$.

    3. Let $(X_i)_{i \in I}$ be a family of sets with at least one $X_i$ infinite. Then

       $$
       \operatorname{card}\left( \bigcup_{i \in I} X_i \right) \leq \sup\left( \{\operatorname{card}(X_i) \mid i \in I\} \cup \{\operatorname{card}(I)\} \right).
    \tag{*}
       $$

        (In particular, a countable union of countable sets is countable.) 

       If furthermore the sets $X_i$ are all non-empty and mutually disjoint, then equality holds in ($*$).

??? proof "Proof"
    (1) Let $\kappa = \max(\operatorname{card}(X), \operatorname{card}(Y))$. We have

    $$
    \kappa \leq \operatorname{card}(X \cup Y) \leq \kappa + \kappa = 2\kappa \leq \kappa\kappa

    $$

    and $\kappa \leq \operatorname{card}(X \times Y) \leq \kappa\kappa$. One concludes by Hessenberg's Theorem.

    (2) is a special case of (1).

    (3) Let $X = \{(x_i, i) \mid x_i \in X_i \text{ for some } i \in I\}$ be the disjoint union of the sets $X_i$. There is a canonical surjection $X \to \bigcup_{i \in I} X_i$, hence it suffices to prove that

    $$
    \operatorname{card}(X) \leq \sup\left( \{\operatorname{card}(X_i) \mid i \in I\} \cup \{\operatorname{card}(I)\} \right).

    $$

    Let $\kappa = \sup\{\operatorname{card}(X_i) \mid i \in I\}$, and let $Y_i$ be the set of injective maps $X_i \to \kappa$. Since the sets $Y_i$ are all non-empty, by the Axiom of Choice there exists some $f = (f_i)_{i \in I} \in \prod_{i \in I} Y_i$. Consider $g : X \to \kappa \times I$, defined by $g((x_i, i)) := (f_i(x_i), i)$. The function $g$ is injective, hence $\operatorname{card}(X) \leq \kappa \operatorname{card}(I) = \max(\kappa, \operatorname{card}(I))$. The equality statement is clear.

    &nbsp;

    It follows from the preceding proposition that cardinal addition and multiplication is quite trivial for infinite cardinals. The situation for cardinal exponentiation is very different. In fact, the ZFC axioms are far from completely determining the values of cardinal exponentiation. For instance they do not allow to settle the continuum hypothesis:

!!! definition "Definition"
    <a id="def-1-8-6"></a>

    + The **Continuum Hypothesis (CH)** is the statement $2^{\aleph_0} = \aleph_1$.

    + The **Generalized Continuum Hypothesis (GCH)** is the statement $2^\kappa = \kappa^+$ for every infinite cardinal $\kappa$.

    If $(\kappa_i)_{i \in I}$ is a family of cardinals, we shall denote by $\sum_{i \in I} \kappa_i$ the cardinal of the disjoint union of the $\kappa_i$, and by $\prod_{i \in I} \kappa_i$ the cardinal of the product of the family.

!!! theorem "Theorem (König's Theorem)"
    <a id="thm-1-8-7"></a>
    Let $(\kappa_i)_{i \in I}$ and $(\lambda_i)_{i \in I}$ be families of cardinals with $\kappa_i < \lambda_i$ for every $i$. Then $\sum_{i \in I} \kappa_i < \prod_{i \in I} \lambda_i$.

??? proof "Proof"
    Let $f : \sum_{i \in I} \kappa_i \to \prod_{i \in I} \lambda_i$. For every $i$, $f$ induces a mapping $f_i : \kappa_i \to \lambda_i$ given by the $i$-th component of the restriction of $f$ to $\kappa_i$. Since $\kappa_i < \lambda_i$, the set $B_i := \lambda_i \setminus \operatorname{im}(f_i)$ is non-empty for every $i$. By (AC) there exists some $b \in \prod_{i \in I} B_i \subseteq \prod_{i \in I} \lambda_i$. Clearly $b \notin \operatorname{im}(f)$.

## Cofinality

In this section we shall use the notion of cofinality to prove for instance that $2^{\aleph_0} \neq \aleph_\omega$.

!!! definition "Definition"
    <a id="def-1-9-1"></a>

    - Let $X$ be a totally ordered set. We say that a subset $Y \subseteq X$ is **cofinal** in $X$ if $Y$ is not bounded in $X$, that is, if for any $x \in X$ there exists $y \in Y$ such that $x \leq y$. We say that a function $f : Z \to X$ is cofinal if $\operatorname{im}(f)$ is cofinal in $X$.
    - The **cofinality** of an ordinal $\alpha$, denoted by $\operatorname{cof}(\alpha)$, is the smallest ordinal $\beta$ such that there exists a cofinal function $\beta \to \alpha$.

!!! example "Example"
    <a id="ex-1-9-2"></a>

    1. $\operatorname{cof}(0) = 0$.

    2. $\operatorname{cof}(\alpha + 1) = 1$ for any ordinal $\alpha$.

    3. $\operatorname{cof}(\omega) = \omega$.

!!! proposition "Proposition"
    <a id="prop-1-9-3"></a>
    Let $\alpha$ be an ordinal.

    1. $\operatorname{cof}(\alpha) \leq \alpha$.

    2. $\operatorname{cof}(\alpha)$ is a cardinal.

    3. $\operatorname{cof}(\alpha)$ is the smallest ordinal $\beta$ such that there exists a cofinal and strictly increasing map $\beta \to \alpha$.

    4. $\operatorname{cof}(\operatorname{cof}(\alpha)) = \operatorname{cof}(\alpha)$.

??? proof "Proof"
    (1) is clear, and (2) follows from the fact that any ordinal $\beta$ is in bijection with $\text{card}(\beta) \le \beta$.

    (3) It is enough to provide some $\beta \le \text{cof}(\alpha)$ and a cofinal and strictly increasing map $\beta \to \alpha$. By hypothesis, there exists a cofinal map $h : \text{cof}(\alpha) \to \alpha$. Let us define

    $$
    X = \{x \in \text{cof}(\alpha) \mid h(y) < h(x) \text{ for every } y < x\}.

    $$

    The set $h(X) = \{h(x) \mid x \in X\}$ is cofinal in $\alpha$. Indeed, let $\gamma < \alpha$. By the cofinality of $h$, there exists $y \in \text{cof}(\alpha)$ such that $h(y) \ge \gamma$. When $y$ is minimal with this property, we have $y \in X$.

    Since $(X, <) \cong (\beta, \in)$ for some $\beta \le \text{cof}(\alpha)$, we are done, because the restriction of $h$ to $X$ is cofinal and strictly increasing.

    (4) $\text{cof}(\text{cof}(\alpha)) \le \text{cof}(\alpha)$ follows from part (1). For the inequality in the other direction, let us consider the cofinal and strictly increasing functions $f : \text{cof}(\text{cof}(\alpha)) \to \text{cof}(\alpha)$ and $g : \text{cof}(\alpha) \to \alpha$, which are possible by (3). Then the function $g \circ f : \text{cof}(\text{cof}(\alpha)) \to \alpha$ is cofinal, and hence $\text{cof}(\alpha) \le \text{cof}(\text{cof}(\alpha))$.

    &nbsp;

    We shall say that an infinite cardinal $\kappa$ is **regular** if $\text{cof}(\kappa) = \kappa$, and **singular** if $\text{cof}(\kappa) < \kappa$.

!!! proposition "Proposition"
    <a id="prop-1-9-4"></a>
    Any infinite cardinal which is a successor is regular. In particular $\aleph_1$ is regular.

??? proof "Proof"
    Let $\kappa = \aleph_{\beta+1} = \aleph_\beta^+$. Note that for a limit ordinal $\alpha$, a subset $X \subseteq \alpha$ is cofinal if and only if $\alpha = \bigcup_{\gamma \in X} \gamma$. (This follows from [Proposition 1.4.9](#prop-1-4-9).) Consider a function $f : \lambda \to \kappa$ for some $\lambda < \kappa$. Then $\lambda \le \aleph_\beta$ and it follows from [Proposition 1.8.5](#prop-1-8-5)(3) that $\text{card}\left(\bigcup_{\beta < \lambda} f(\beta)\right) \le \sup(\{\text{card}(f(\beta)) \mid \beta < \lambda\} \cup \{\lambda\}) \le \aleph_\beta$. Hence $f$ is not cofinal.

!!! proposition "Proposition"
    <a id="prop-1-9-5"></a>
    If $\lambda$ is a limit ordinal, then $\text{cof}(\aleph_\lambda) = \text{cof}(\lambda)$.

??? proof "Proof"
    If $f : \alpha \to \lambda$ is cofinal, then $\tilde{f} : \alpha \to \aleph_\lambda, \beta \mapsto \aleph_{f(\beta)}$ is cofinal too, since $\aleph_\lambda = \bigcup_{\gamma < \lambda} \aleph_\gamma$ by definition. This proves $\text{cof}(\aleph_\lambda) \le \text{cof}(\lambda)$. Conversely, let $g : \alpha \to \aleph_\lambda$ be cofinal. The map $\tilde{g} : \alpha \to \lambda$, defined by $\tilde{g}(\beta) = 0$ if $g(\beta)$ is finite, and $\tilde{g}(\beta) = \gamma$ if $\text{card}(g(\beta)) = \aleph_\gamma$, is cofinal.

!!! proposition "Proposition"
    <a id="prop-1-9-6"></a>
    Let $\kappa \ge 2$ and $\lambda \ge \aleph_0$ be cardinals. Then $\text{cof}(\kappa^\lambda) > \lambda$.

??? proof "Proof"
    Consider a map $f : \alpha \to \kappa^\lambda$, with $\alpha$ some ordinal $\le \lambda$. Since $f(\beta) < \kappa^\lambda$ for every $\beta < \alpha$, it follows from König’s Theorem that

    $$
    \text{card}\left(\bigcup_{\beta < \alpha} f(\beta)\right) \le \sum_{\beta < \alpha} \text{card}(f(\beta)) < \prod_{\beta < \alpha} (\kappa^\lambda) = \kappa^{\lambda \cdot \text{card}(\alpha)} \le \kappa^\lambda.

    $$

    Hence $f$ is not cofinal. $\square$

!!! corollary "Corollary"
    <a id="cor-1-9-7"></a>
    $2^{\aleph_0} \ne \aleph_\omega$.

??? proof "Proof"
    We have $\text{cof}(\aleph_\omega) = \text{cof}(\omega) = \omega = \aleph_0 < \text{cof}(2^{\aleph_0})$.
