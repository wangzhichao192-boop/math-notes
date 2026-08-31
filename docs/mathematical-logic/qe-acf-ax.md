# QE for ACF and Ax's Theorem

## Algebraically Closed Fields

In this section we treat an important and particularly nice example of a theory from algebra, namely the $\mathscr L_{ring}$-theory ACF of algebraically closed fields (see Example (Algebraically closed fields)).

Let $A$ be a subring of a field $K$. An element of $K$ is said to be *algebraic over* $A$ if it is the root of a non-zero polynomial with coefficients in $A$. If $A$ is an integral domain, an *algebraic closure of* $A$ is an algebraically closed field $K$ containing $A$ such that any element of $K$ is algebraic over $A$.

In the following fact we list some results from field theory which we will need in this and the next section.

!!! note "Fact (Properties of Algebraic Closures)"
    <a id="not-properties-of-algebraic-closures"></a>
    Let $A$ be an integral domain.

    1. There exists an algebraic closure of $A$.

    2. If $K$ and $K'$ are algebraic closures of $A$, then there exists an isomorphism $f : K \cong K'$ such that $f \upharpoonright_A = \text{id}_A$.

    3. Assume $A$ is a subring of an algebraically closed field $L$. Then the subfield $A_L^{alg} = \{b \in L \mid b \text{ is algebraic over } A\}$ is an algebraic closure of $A$.

    4. Let $\mathbb{F}_p^{alg}$ be an algebraic closure of the field with $p$ elements $\mathbb{F}_p$. Then $\mathbb{F}_p^{alg}$ is an increasing union of finite subfields $F_N, N \in \mathbb{N}$. More precisely, for any integer $k \ge 1$, the set of roots of the polynomial $X^{p^k} - X$ in $\mathbb{F}_p^{alg}$ is a subfield $\mathbb{F}_{p^k}$ (with $p^k$ elements), and $\bigcup_{k \in \mathbb{N}} \mathbb{F}_{p^k} = \mathbb{F}_p^{alg}$. Since furthermore $\mathbb{F}_{p^k} \subseteq \mathbb{F}_{p^l}$ when $k \mid l$, it is enough to take $F_N := \mathbb{F}_{p^{N!}}$.

    5. Any algebraically closed field is infinite.

    6. Let $K \subseteq L$ be a field extension with $K$ an algebraically closed field, and let $b \in L \setminus K$. Then $b$ is not algebraic over $K$.

!!! theorem "Theorem (Chevalley-Tarski)"
    <a id="thm-chevalley-tarski"></a>
    *The theory ACF admits quantifier elimination.*

??? proof "Proof"
    First observe that a substructure of a field in $\mathscr L_{ring}$ is nothing but a subring. By Theorem (Substructure QE Criterion) it is thus enough to prove that if $K$ and $L$ are algebraically closed fields, $A$ is a common subring, and $\varphi(x_0, \dots, x_n)$ is a quantifier-free formula, then for any $\bar a \in A^n$, if there exists $b \in L$ such that $L \models \varphi[b, \bar a]$ then there exists $c \in K$ such that $K \models \varphi[c, \bar a]$.

    By [Fact (Properties of Algebraic Closures)](#not-properties-of-algebraic-closures), $K$ and $L$ contain algebraic closures $F_K$ and $F_L$ of $A$ that are isomorphic via an isomorphism inducing the identity on $A$. Enlarging $A$ if necessary, we may thus assume that $A$ is an algebraically closed field and even that $A = K \subseteq L$.

    The formula $\varphi$ is logically equivalent to a formula of the form $\bigvee_i \bigwedge_j \chi_{i,j}$, with each $\chi_{i,j}(x_0, \dots, x_n)$ either atomic or the negation of an atomic formula. If $L \models \varphi[b, \bar a]$, there exists $i$ such that $L \models \bigwedge_j \chi_{i,j}[b, \bar a]$. It is thus enough to consider the case where $\varphi$ is a conjunction of atomic formulas and negations of atomic formulas. In the theory of fields, any atomic formula is equivalent to $P(\bar x) = 0$ for some polynomial $P(\bar x)$ with integer coefficients. We may therefore assume that $\varphi(\bar x)$ is of the form

    $$
    \bigwedge_{i=1}^n P_i(\bar x) = 0 \land \bigwedge_{i=1}^m \neg Q_i(\bar x) = 0.
    $$

    If one of the $P_i(x_0, a_1, \dots, a_n) \in K[x_0]$ is a non-zero polynomial, then $b$ is algebraic over $K$, which implies that $b \in K$ and we are done.

    Thus we may assume that $\varphi$ equals $\bigwedge_{i=1}^m \neg Q_i(\bar x) = 0$. By the existence of $b$, each polynomial $Q_i(x_0, \bar a) \in K[x_0]$ is non-zero, and hence has only a finite number of roots. The field $K$ is infinite, since it is algebraically closed, so there exists $c \in K$ such that $K \models \varphi[c, \bar a]$.

!!! corollary "Corollary (Definable sets in ACF)"
    <a id="cor-definable-sets-in-acf"></a>
    *In $K \models \text{ACF}$, the definable sets (with parameters) are precisely the constructible sets, that is, sets given by boolean combinations of polynomial equations with coefficients from $K$.*

    Let $p$ be a prime number or $p = 0$. We denote by $\text{ACF}_p$ the theory of algebraically closed fields of characteristic $p$.

!!! theorem "Theorem (Completeness of $\text{ACF}_p$)"
    <a id="thm-completeness-of-text-acf-p"></a>
    *Let $p$ be a prime number or $p = 0$. The theory $\text{ACF}_p$ is complete.*

??? proof "Proof"
    Any field of characteristic $p > 0$ contains $\mathbb{F}_p$ as a subfield. If $K$ and $L$ are algebraically closed fields of characteristic $p$, then $K \equiv L$ by [Theorem (Chevalley-Tarski)](#thm-chevalley-tarski) and Proposition (Consequences of QE)(1), which proves that $\text{ACF}_p$ is complete.

    For $\text{ACF}_0$, the argument is the same, replacing $\mathbb{F}_p$ by $\mathbb{Q}$.

!!! theorem "Theorem (Lefschetz Principle)"
    <a id="thm-lefschetz-principle"></a>
    *Let $\varphi$ be an $\mathscr L_{ring}$-sentence. The following conditions are equivalent:*

    1. $\mathbb{C} \models \varphi$.

    2. There exists an algebraically closed field of characteristic $0$ in which $\varphi$ is satisfied.

    3. Any algebraically closed field of characteristic $0$ satisfies $\varphi$.

    4. There exists $N \in \mathbb{N}$ such that $\varphi$ is satisfied in any algebraically closed field of characteristic $p > N$.

    5. There exists an infinite set of prime numbers $\mathcal{P}$ such that for any $p \in \mathcal{P}$ there exists an algebraically closed field of characteristic $p$ in which $\varphi$ is satisfied.

??? proof "Proof"
    (1)$\iff$(2)$\iff$(3) follows from [Theorem (Completeness of $\text{ACF}_p$)](#thm-completeness-of-text-acf-p).

    (3)$\Rightarrow$(4). Note that $\text{ACF}_0$ is equal to $\text{ACF} \cup \{\chi_p \mid p \text{ prime}\}$, where $\chi_p$ expresses that $p = 1 + \dots + 1$ is different from $0$. If $\text{ACF}_0 \models \varphi$, by compactness there exists a finite subset $\Delta$ of $\text{ACF}_0$ such that $\Delta \models \varphi$. But $\Delta$ contains only a finite set of sentences $\chi_p$. Thus, there exists $N \in \mathbb{N}$ such that $K \models \Delta$ for any algebraically closed field $K$ of characteristic $p > N$. For such a field $K$, one has $K \models \varphi$.

    (4)$\Rightarrow$(5) is clear.

    (5)$\Rightarrow$(3). For $p \in \mathcal{P}$, let $K_p \models \text{ACF}_p$ such that $K_p \models \varphi$. If $\text{ACF}_0 \not\models \varphi$, then $\text{ACF}_0 \models \neg\varphi$ by completeness. By the implication (3)$\Rightarrow$(4), there exists $N \in \mathbb{N}$ such that $\neg\varphi$ is satisfied in any algebraically closed field of characteristic $p > N$. This forces $\mathcal{P}$ to be finite, a contradiction.

!!! theorem "Theorem (Hilbert's Nullstellensatz)"
    <a id="thm-hilbert-s-nullstellensatz"></a>
    *Let $K$ be an algebraically closed field and $P_1(\bar x), \dots, P_m(\bar x) \in K[x_1, \dots, x_n]$. If the system of polynomial equations $P_1(\bar x) = P_2(\bar x) = \dots = P_m(\bar x) = 0$ has a solution in some field $L \supseteq K$, then it already has a solution in $K$.*

??? proof "Proof"
    Let $L \supseteq K$ and $\bar a \in L^n$ be such that $P_1(\bar a) = \dots = P_m(\bar a) = 0$. Up to enlarging $L$ if necessary, we may assume that $L$ is algebraically closed. Since ACF admits quantifier elimination, we have $K \preccurlyeq L$ by Proposition (Consequences of QE).

    We now choose $\mathscr L_{ring}$-terms $F_i(\bar x, \bar z_i)$ and tuples $\bar b_i$ in $K$ such that $P_i(\bar x) = F_i(\bar x, \bar b_i)$. Then $L \models \exists \bar x \ \bigwedge F_i(\bar x, \bar b_i) = 0$, and therefore $K \models \exists \bar x \ \bigwedge F_i(\bar x, \bar b_i) = 0$, since $K \preccurlyeq L$.

---


## Ax's Theorem

A chain of $\mathscr L$-structures is a sequence $(\bar M_i)_{i \in \mathbb{N}}$ of $\mathscr L$-structures such that $\bar M_i \subseteq \bar M_{i+1}$ for any $i$.

If $(\bar M_i)_{i \in \mathbb{N}}$ is such a chain, there exists a unique $\mathscr L$-structure $\bar M$ with base set $M = \bigcup_{i \in \mathbb{N}} M_i$ such that $\bar M_i \subseteq \bar M$ for any $i$. Indeed, the only way to interpret the language symbols is to set $c^{\bar M} = c^{\bar M_0}$, $f^{\bar M} = \bigcup_{i \in \mathbb{N}} f^{\bar M_i}$ and $R^{\bar M} = \bigcup_{i \in \mathbb{N}} R^{\bar M_i}$, which is clearly well defined. The $\mathscr L$-structure $\bar M$ obtained that way is denoted by $\bigcup_{i \in \mathbb{N}} \bar M_i$.

!!! definition "Definition"
    A formula of the form $\forall x_1, \dots, x_n \exists y_1, \dots, y_m \ \varphi$, with $\varphi$ quantifier-free and $m, n \ge 0$, is called a *$\forall\exists$-formula*.

!!! lemma "Lemma (Preservation of $\forall\exists$-sentences under unions of chains)"
    <a id="lem-preservation-of-forall-exists-sentences-under-unions-of-chains"></a>
    *Let $\psi$ be a $\forall\exists$-sentence in $\mathscr L$ and $(\bar M_i)_{i \in \mathbb{N}}$ a chain of $\mathscr L$-structures such that $\bar M_i \models \psi$ for any $i$. Then $\bar M = \bigcup_{i \in \mathbb{N}} \bar M_i \models \psi$.*

??? proof "Proof"
    Let $\psi$ be the sentence $\forall x_1, \dots, x_n \exists y_1, \dots, y_m \ \varphi(\bar x, \bar y)$ with $\varphi$ quantifier-free. We have to prove that $\bar M \models \exists y_1, \dots, y_m \ \varphi[\bar a, \bar y]$ for any $\bar a \in M^n$. Since the sequence of base sets $(M_i)_{i \in \mathbb{N}}$ is increasing, there exists $k \in \mathbb{N}$ such that $\bar a \in M_k^n$. Hence there exist $b_1, \dots, b_m \in M_k$ such that $\bar M_k \models \varphi[\bar a, \bar b]$, as $\bar M_k \models \psi$. One deduces that $\bar M \models \varphi[\bar a, \bar b]$, since $\varphi$ is quantifier-free and $\bar M_k$ is a substructure of $\bar M$.

!!! remark "Remark"
    It will be proved in Exercise (Logical equivalence to $\forall\exists$-sentence) that a sentence is preserved under unions of chains if and only if it is logically equivalent to a $\forall\exists$-sentence.

!!! proposition "Proposition (Satisfaction in characteristic 0 from finite fields)"
    <a id="prop-satisfaction-in-characteristic-0-from-finite-fields"></a>
    *Let $\varphi$ be a $\forall\exists$-sentence in the language $\mathscr L_{ring}$ which is satisfied in every finite field. Then $\text{ACF} \models \varphi$. In particular $\varphi$ is satisfied in $\mathbb{C}$.*

??? proof "Proof"
    As recalled in [Fact (Properties of Algebraic Closures)](#not-properties-of-algebraic-closures)(4), $\mathbb{F}_p^{alg}$ is the union of a chain of finite fields. So it follows from [Lemma (Preservation of $\forall\exists$-sentences under unions of chains)](#lem-preservation-of-forall-exists-sentences-under-unions-of-chains) that one has $\mathbb{F}_p^{alg} \models \varphi$ for every prime $p$. The statement is now a consequence of the Lefschetz Principle.

!!! theorem "Theorem (Ax's Theorem)"
    <a id="thm-ax-s-theorem"></a>
    *Let $f : \mathbb{C}^n \to \mathbb{C}^n$ be a polynomial mapping, that is, of the form $f = (f_1, \dots, f_n)$ with $f_i \in \mathbb{C}[x_1, \dots, x_n]$ polynomials. If $f$ is injective, then $f$ is surjective.*

??? proof "Proof"
    There exist $\mathscr L_{ring}$-terms — which can be interpreted as polynomials with integer coefficients — $P_{n,d}(\bar z, \bar x)$ such that, for any field $K$, any polynomial $g(\bar x) \in K[x_1, \dots, x_n]$ of degree $\le d$ may be written as $P_{n,d}(\bar a, \bar x)$ for some tuple $\bar a$ of elements of $K$. The following sentence $\psi_{n,d}$ is $\forall\exists$ and expresses that any injective polynomial function $f : K^n \to K^n$, with all polynomials $f_i$ of degree at most $d$, is surjective:

    $$
    \forall \bar z_1, \dots, \bar z_n, \bar u \ \exists \bar x, \bar x' \left[ \left( \bigwedge_{i=1}^n P_{n,d}(\bar z_i, \bar x) = u_i \right) \lor \left( \bigwedge_{i=1}^n P_{n,d}(\bar z_i, \bar x) = P_{n,d}(\bar z_i, \bar x') \land \neg \bigwedge_{i=1}^n x_i = x'_i \right) \right].
    $$

    Since $\psi_{n,d}$ is satisfied in every finite field, it follows from [Proposition (Satisfaction in characteristic 0 from finite fields)](#prop-satisfaction-in-characteristic-0-from-finite-fields) that $\text{ACF} \models \psi_{n,d}$, so in particular $\mathbb{C} \models \psi_{n,d}$.
