# Quantifier Elimination (QE)

## Definitions and Examples

!!! definition "Definition"
    We say that $T$ is an $\mathscr L$-theory has quantifier elimination if for any formula $\varphi$ there is a quantifier-free formula $\psi$ such that $T\models \varphi \leftrightarrow \psi$.

!!! example "Example"
    In the Theory of Real Closed Fields, the quantifier $\exists x\,(ax^2+bx+c=0)$ is equivalent to a quantifier-free formula $b^2-4ac\ge 0$.

## Expansions by Definition

!!! definition "Definition"
    Let $T$ be an $\mathscr L$-theory, $\mathscr L' \supseteq \mathscr L$, Assume that

    - for any $n$-ary relation symbol $R\in \mathscr L' \setminus \mathscr L$, there is an $\mathscr L$-formula $\varphi_R(x_1,\cdots,x_n)$
    - for any $n$-ary function symbol $f\in \mathscr L' \setminus \mathscr L$, there is an $\mathscr L$-formula $\varphi_f(x_1,\cdots,x_n,x_{n+1})$ such that $T\models \forall x_1,\cdots,x_n,\exists ! x_0\ \varphi_f(x_1,\cdots,x_n,x_0)$.
    - for any constant $c \in \mathscr L' \setminus \mathscr L$ there is an $\mathscr L$-formula $\varphi_c(x)$ such that $T\models \exists ! x\ \varphi_c(x)$.

    Consider the $\mathscr L'$-theory $T'$ which is $T$ with the following:

    - for any $R$, $n$-ary relation in $\mathscr L' \setminus \mathscr L$

    $$
    \forall x_1 \dots x_n \ (\varphi_R(x_1 \dots x_n) \leftrightarrow R(x_1 \dots x_n))

    $$

    - for any $f$ as before

    $$
    \forall x_1 \dots x_n \ \varphi_f(x_1 \dots x_n, f(x_1 \dots x_n))

    $$

    - for any $c$ as before

    $$
    \varphi_c(c)

    $$

    $T'$ is called an **expansion** of $T$ by definition.

    Recall that two $\mathscr{L}$-formulas $\varphi(x_1, \dots, x_n)$, $\psi(x_1, \dots, x_n)$ are called **equivalent** over $T$ if $T \vDash \forall x_1 \dots x_n \ (\varphi(x_1, \dots, x_n) \leftrightarrow \psi(x_1, \dots, x_n))$

    , $\varphi, \psi$ are **logically equivalent** if $T = \emptyset$.

!!! proposition "Proposition"
    Any formula is logically equivalent to a formula whose terms are of height $\le 1$.

    Hint. We do inductions, $R(f(g(x))) \leftrightarrow \exists y \ y=g(x) \land R(f(y))$

!!! definition "Definition"
    $T$ is an $\mathscr L$-theory, $\mathscr L' \supseteq \mathscr L, T' \supseteq T$. $T'$ be an $\mathscr L'$-theory. We say $T'$ is a **conservative expansion** of $T$ if for any $\varphi$ over $\mathscr L$, $T\models \varphi$ iff $T'\models \varphi$.

!!! proposition "Proposition"
    Let $T'$ be an expansion by definition of $T$, then $T'$ is conservative over $T$. Moreover any $\mathscr L'$-formula is equivalent to an $\mathscr L$-formula over $T'$.

!!! example "Example"

    - $\langle \mathbb R + , \cdot, 0,1 \rangle$ be an $\mathscr L_{ring}$-structure. Introduce a new binary relation symbol $\le$, $\varphi_{\le} (x,y): \exists z ,(x + z^2 =y)$. Then we have an expansion by definition. $\langle \mathbb R, +, \cdot, 0, 1, \le \rangle$.
    - Let $T$ be the theory of linear orders without endpoints, $\mathscr L _{ord} = \{ <\}$. Let $T'$ be the theory of ordered fields in $\mathscr L_{oring}: \{+,\cdot, \mathbf 0, \mathbf 1, < \}$. It's not even conservative. Any ordered field id dense, $\forall x,y,(x < t \to \exists z, (x < z< y))$.
    - Let $\mathscr L = \{<\}, T = \text{Th} \langle \aleph_1,<\rangle$. The successor funciton $s$ is definable. $\varphi_s(x,y) := y > x \land \forall z, (z > x \to z \ge y)$. $\text{Range}(s)$ is definable. $Lim(x):x \text{ is a limit ordinal}$ is definable, so $\omega$ as a constant is definable.

    Let $T$ be any theory in $\mathscr L$. There is a way to force QE. Let $\varphi(x_1, \cdots, x_n)$ be an $\mathscr L$-formula. Let $R_\varphi$ be an $n$-ary relation symbol. Consider the expansion by definition $R(x_1,\cdots,x_n) \leftrightarrow \varphi(x_1,\cdots,x_n)$. $T' \supseteq T$ be conservative (Morlegrization).

    What we usually need is a "reasonable" expansion by definition.

## The QE Test

!!! theorem "Theorem (QE test)"
    <a id="thm-qe-test"></a>
    Let $T$ be an $\mathscr L$-theory, $n\ge 1$ be an natural number, $\varphi(x_1,\cdots,x_n)$ be $\mathscr L$-formula. The following conditions are equivalent:

    1. There is quantifier-free $\psi(x_1,\cdots,x_n)$ such that $T\models \forall x_1,\cdots,x_n, (\varphi(x_1,\cdots,x_n) \leftrightarrow\psi(x_1,\cdots,x_n))$
    2. Let $\bar M,\bar N \models T$ with $\bar A$ a common substructure. Let $a_1,\cdots,a_n\in A$ then $\bar M \models \varphi[\bar a]$ iff $\bar N \models \varphi[\bar a ]$.

!!! remark "Remark"
    When $n=0$ and $\varphi$ is a sentence, one may consider $\varphi$ as $\varphi(x)$ and apply the theorem to $\varphi(x)$ to find a quantifier-free formula $\psi(x)$ which is equivalent to $\varphi(x)$ in $T$. For instance, the theorem $\exists y \ y=y$ of $T$ is equivalent in $T$ to the formula $x=x$.

    Note that if the language $\mathscr L$ does not contain a constant symbol, there is no quantifier-free $\mathscr L$-sentence. In this case, when we assert the existence of a quantifier-free *formula* $\psi$ equivalent to a *sentence* $\varphi$ in what follows, we will allow that $\psi$ has one free variable.

??? proof "Proof of the Theorem"
    (1)$\Rightarrow$(2). We first observe that if $\bar A \subseteq \bar B$, $\psi(x_1,\cdots,x_n)$ is a quantifier-free formula and $\bar a \in A^n$, then one has $\bar A \models \psi[\bar a] \iff \bar B \models \psi[\bar a]$. Thus, if $\bar M$ and $\bar N$ are models of $T$ having $\bar A$ as a common substructure and if $\varphi(x_1,\cdots,x_n)$ is equivalent in $T$ to the quantifier-free formula $\psi(x_1,\cdots,x_n)$, then for $\bar a \in A^n$ one has

    $$
    \bar M \models \varphi[\bar a] \iff \bar M \models \psi[\bar a] \iff \bar A \models \psi[\bar a] \iff \bar N \models \psi[\bar a] \iff \bar N \models \varphi[\bar a].
    $$

    (2)$\Rightarrow$(1). We consider the set of formulas

    $$
    \Gamma(\bar x) := \{\chi(x_1,\cdots,x_n) \text{ quantifier-free} \mid T \models \forall x_1,\cdots,x_n \ (\varphi \to \chi)\}.
    $$

    We choose new pairwise distinct constants $c_1,\cdots,c_n$, and we consider the theory $\Gamma(\bar c) := \{\chi(c_1,\cdots,c_n) \mid \chi \in \Gamma(\bar x)\}$ in the augmented language $\mathscr L' = \mathscr L \cup \{c_1,\cdots,c_n\}$. We now prove that

    $$
    (*) \qquad \qquad T \cup \Gamma(\bar c) \models \varphi(\bar c).
    $$

    If $(*)$ did not hold, one could find $\bar M' \models T \cup \Gamma(\bar c) \cup \{\neg\varphi(\bar c)\}$. Let $\bar A' := \langle c_1^{\bar M'},\cdots,c_n^{\bar M'} \rangle_{\bar M'} = \langle A;\cdots \rangle$ be the substructure generated by the elements $c_i^{\bar M'}$ in $\bar M'$. Observe that $\Gamma(\bar c) \subseteq \Delta(\bar A')$. Let us prove that

    $$
    \Sigma := T \cup \Delta(\bar A') \cup \{\varphi(\bar c)\}
    $$

    has a model.

    Otherwise, $T \cup \Delta(\bar A') \models \neg\varphi(\bar c)$. Since any element of $A$ can be written as an $\mathscr L'$-term, if one denotes by $\Delta_{\bar c}(\bar A')$ the set of quantifier-free $\mathscr L'$-sentences in $\Delta(\bar A')$, then $T \cup \Delta(\bar A')$ is a conservative expansion of $T \cup \Delta_{\bar c}(\bar A')$ by Proposition. In particular,

    $$
    T \cup \Delta_{\bar c}(\bar A') \models \neg\varphi(\bar c).
    $$

    Hence there exist quantifier-free $\mathscr L$-formulas $\xi_1(\bar x),\cdots,\xi_k(\bar x)$ such that

    $$
    T \models \bigwedge_{i=1}^k \xi_i(\bar c) \to \neg\varphi(\bar c) \qquad \text{and} \qquad \Delta(\bar A') \models \bigwedge_{i=1}^k \xi_i(\bar c) =: \xi(\bar c).
    $$

    Since the constant symbols $c_i$ do not appear in $T$, or in $\varphi(\bar x)$ or $\xi(\bar x)$, one deduces (for instance by Lemma 2.6.8) that

    $$
    T \models \forall \bar x \ (\xi(\bar x) \to \neg\varphi(\bar x))
    $$

    and then $T \models \forall \bar x \ (\varphi(\bar x) \to \neg\xi(\bar x))$. By definition it follows that $\neg\xi(\bar x) \in \Gamma(\bar x)$ and $\neg\xi(\bar c) \in \Gamma(\bar c)$, hence $\neg\xi(\bar c) \in \Delta(\bar A')$, which provides a contradiction.

    Hence $\Sigma$ has a model $\bar N^*$, and the $\mathscr L$-reduct $\bar N$ of $\bar N^*$ contains an isomorphic copy $\bar B'$ of $\bar A'$ as a substructure by Proposition. Up to identifying $\bar B'$ and $\bar A'$, we have constructed two models $\bar M = \bar M' \upharpoonright_{\mathscr L}$ and $\bar N$ of $T$ containing a common substructure $\bar A = \bar A' \upharpoonright_{\mathscr L}$ such that, if one sets $a_i = c_i^{\bar M'}$, then $\bar N \models \varphi[\bar a]$ and $\bar M \models \neg\varphi[\bar a]$, which contradicts (2). We have thus proved $(*)$.

    By compactness there exist $\zeta_1(\bar c),\cdots,\zeta_m(\bar c) \in \Gamma(\bar c)$ such that

    $$
    T \models \bigwedge_{i=1}^m \zeta_i(\bar c) \to \varphi(\bar c).
    $$

    As above, this implies that $T \models \forall \bar x \ (\bigwedge_{i=1}^m \zeta_i(\bar x) \to \varphi(\bar x))$. Since for all $i$ we have $T \models \forall \bar x \ (\varphi \to \zeta_i)$, we infer that $T \models \forall \bar x \ (\bigwedge_{i=1}^m \zeta_i(\bar x) \leftrightarrow \varphi(\bar x))$, with $\bigwedge_{i=1}^m \zeta_i(\bar x)$ a quantifier-free $\mathscr L$-formula.

!!! lemma "Lemma"
    Assume that for every quantifier-free formula $\varphi$ and any variable $x$ there exists a quantifier-free formula $\psi$ such that $\exists x \ \varphi$ and $\psi$ are equivalent in $T$. Then $T$ admits quantifier elimination.

??? proof "Proof"
    Let $\psi$ and $\psi'$ be two formulas which are equivalent in $T$, which we denote by $\psi \sim_T \psi'$. Since $\neg\psi \sim_T \neg\psi'$, $\exists x \ \psi \sim_T \exists x \ \psi'$ and $\chi \land \psi \sim_T \chi \land \psi'$ for any formula $\chi$, we can argue by induction on the height of the formula, and the statement follows, by considering only formulas in prenex form and eliminating one quantifier at the time.

!!! theorem "Theorem"
    Let $T$ be an $\mathscr L$-theory. One assumes that for any pair of models $\bar M$ and $\bar N$ of $T$, for any common substructure $\bar A$ of $\bar M$ and $\bar N$ and for any quantifier-free formula $\varphi(x_0,\cdots,x_n)$ and  $\bar a \in A^n$, there exists $b_0 \in M$ such that $\bar M \models \varphi[b_0, \bar a]$, then there exists $c_0 \in N$ such that $\bar N \models \varphi[c_0, \bar a]$.
    Then $T$ admits quantifier elimination.

!!! remark "Remark"
    The converse of this statement is clear: any theory which admits quantifier elimination satisfies the hypothesis of the theorem.

??? proof "Proof of the Theorem"
    Let $\bar A \subseteq \bar M, \bar N$ be given, with $\bar M, \bar N \models T$. Let $\varphi$ be a quantifier-free formula and let $\chi$ be $\exists x_0 \ \varphi$. By hypothesis, we have $\bar M \models \chi[\bar a] \iff \bar N \models \chi[\bar a]$ for every $\bar a \in A^n$. It follows from [Theorem (QE test)](#thm-qe-test)  that $\chi$ is equivalent in $T$ to a quantifier-free formula, which is enough to conclude by Lemma.

## Consequences

!!! proposition "Proposition"
    Let $T$ be a theory which admits quantifier elimination.

    1. Let $\bar M$ and $\bar N$ be models of $T$ with a common substructure. Then $\bar M \equiv \bar N$.

    2. Let $\bar M$ and $\bar N$ be models of $T$. If $\bar M \subseteq \bar N$, then $\bar M \preccurlyeq \bar N$.

??? proof "Proof"
    (1) This is a special case of the easy implication in [Theorem (QE test)](#thm-qe-test). Indeed, any sentence $\varphi$ is equivalent in $T$ to a quantifier-free formula $\psi(x)$. Let $\bar A$ be a common substructure of $\bar M$ and $\bar N$. For any $a \in A$, one then has

    $$
    \bar M \models \varphi \iff \bar M \models \psi[a] \iff \bar A \models \psi[a] \iff \bar N \models \psi[a] \iff \bar N \models \varphi.
    $$

    (2) This is a direct consequence of [Theorem (QE test)](#thm-qe-test).
