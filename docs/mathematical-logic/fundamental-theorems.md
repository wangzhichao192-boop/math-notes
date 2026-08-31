# Some Fundamental Theorems

## Elementary Maps

!!! definition "Definition"

    + Let $\bar M, \bar N$ be $\mathscr L$-structures. We say that $\bar M,\bar N$ are **elementarily equivalent** if they satisfy the same $\mathscr L$-sentence. Written as $\bar M \equiv \bar N$. (i.e. $\text{Th}(\bar M)=\text{Th}(\bar N)$, recall that $\text{Th}(\bar M) = \{\varphi \ | \ \varphi \text{ is an } \mathscr L\text{-setence } \bar M \models \varphi \}$).
    + Let $\bar M, \bar N$ be $\mathscr L$-structures. We say $\bar M$ is a **substructure** of $\bar N$ denoted by $\bar M \subseteq \bar N$ if $M\subseteq N$ and for any constant symbol $c , c^{\bar M} = c^{\bar N}$, any relation symbol $R,R^{\bar M} = R ^{\bar N} |_M$, any function symbol $f,f^{\bar M} =f ^{\bar N} |_M$.
    + Let $\bar M, \bar N$ be $\mathscr L$-structures. We say $\bar M$ is an **elementary substructure** of $\bar N$ (and $\bar N$ is an elementary extension of $\bar M$), denoted by $\bar M \preceq \bar N$ if $\bar M \subseteq \bar N $ and for any $\mathscr L$-formula $\varphi(x_1,\cdots,x_n), a_1,\cdots,a_n \in M$, $\bar M \models \varphi[a_1,\cdots,a_n] \text{ iff } \bar N \models \varphi[a_1,\cdots,a_n]$. Note that it implies $\bar M \equiv \bar N$.
    + We say the mapping $f:\bar M \to \bar N$ is an **elementary embedding** if it is an ismorphism between $\bar M$ and an elementary substructure of $\bar N$. i.e. for any $\mathscr L$-formula $\varphi(x_1,\cdots,x_n),a_1,\cdots,a_n \in M$, $\bar M \models \varphi[a_1,\cdots,a_n] \text{ iff } \bar N \models \varphi[f(a_1),\cdots,f(a_n)]$.

!!! remark "Remark"

    + $\bar M\preceq \bar N \implies \bar M \equiv \bar N$

    + $\bar M \cong \bar N \implies \bar M \equiv \bar N$

    + $\bar M \subseteq \bar N$ iff $M \subseteq N$ and for any quantifier-free $\varphi(x_1 \dots x_n)$ and $a_1 \dots a_n \in \bar M$, $\bar M \models \varphi[a_1 \dots a_n] \iff \bar N \models \varphi[a_1 \dots a_n]$

    + If $f : \bar M \to \bar N$ is an isomorphism, it is an elementary embedding.

      In particular, $f : \bar M \xrightarrow{\cong} \bar M$ automorphism, $\varphi(x_1 \dots x_n)$ $\mathscr{L}$-formula, $a_1 \dots a_n \in M$, $\bar M \models \varphi(a_1 \dots a_n)$ iff $\bar M \models \varphi[f(a_1) \dots f(a_n)]$.

      So let $D$ be the definable set for $\bar M$, $f(D)=D$.

    +  $\bar M \equiv \bar N, \bar M \subseteq \bar N \implies \bar M \preceq \bar N$ ? **Not neccessarily**. Check the counterexample: $\bar M = \langle 2\mathbb{Z},<,\rangle, \bar N = \langle \mathbb{Z},<\rangle$, $\varphi(x,y) = \exists z \ x < z < y$. $\bar M \models \neg \varphi[0,2]$, $\bar N \models \varphi[0,2]$

## Tarski–Vaught Test

!!! theorem "Theorem (Tarski-Vaught test)"
    <a id="thm-tarski-vaught-test"></a>
    Let $\bar M, \bar N$ be $\mathscr L$-structures and $\bar M \subseteq \bar N$ if for any $\mathscr L$-formula $\varphi(x_1,\cdots,x_n,y)$, $a_1,\cdots,a_n\in M$ and there is some $b \in N$ such that $\bar N \models \varphi[a_1,\cdots,a_n,b]$ then there is some $b_0 \in M$ such that $\bar N \models \varphi[a_1,\cdots,a_n,b_0]$, then $\bar M \preceq \bar N$.

??? proof "Proof"

    $(\leftarrow)$:

    $\bar N \models \varphi[a_1,\cdots,a_n,b]$, and we can write a new formula $\psi (a_1,\cdots,a_n) = \exists b \ \varphi(a_1,\cdots,a_n,b)$. 

    Since $\bar M \preceq \bar N$ and $\bar N \models \psi(a_1,\cdots,a_n)$, hence. $\bar M \models \psi(a_1,\cdots,a_n)$. That is $\exists b_0\in M ,\varphi(a_1,\cdots,a_n,b_0)$.

    $(\rightarrow)$:

    Induction on $\psi$, we show that $\bar{M} \models \psi[b_1, \dots, b_n]$ iff $\bar{N} \models \psi[b_1, \dots, b_n]$.

    * $\psi$ quantifier free: Clear by remark (3).

    * The inductive case for $\psi_1 \land \psi_2$, $\neg \psi$ are also clear.

    * So, the only non-trivial case is $\psi(x_1, \dots, x_n) = \exists y \, \theta(x_1, \dots, x_n, y)$.

    Let $a_1, \dots, a_n \in M$.

    $\bar{M} \models \psi[a_1, \dots, a_n]$

    $\Rightarrow$ There is $b \in M$ such that $\bar{M} \models \theta[a_1, \dots, a_n, b]$

    $\stackrel{IH}{\Rightarrow} \bar{N} \models \theta[a_1, \dots, a_n, b]$ 

    $\Rightarrow \bar{N} \models \psi[a_1, \dots, a_n]$.

    $\bar{N} \models \psi[a_1, \dots, a_n]$

    $\Rightarrow$ There is $b \in N$ s.t. $\bar{N} \models \theta[a_1, \dots, a_n, b]$.

    Hypothesis $\Rightarrow$ There is $b_0 \in M$ s.t. $\bar{M} \models \theta[a_1, \dots, a_n, b_0]$.

    $\Rightarrow \bar{M} \models \psi[a_1, \dots, a_n]$.

## Löwenheim–Skolem Theorems

!!! theorem "Theorem (Downward Löwenheim-Skolem)"
    <a id="thm-downward-lowenheim-skolem"></a>
    Let $\bar M$ be an $\mathscr L$-structure with $|M| \ge |\text{Fml}^\mathscr L|$. Let $A$ be any subset of $M$, there is $\bar N \preceq \bar M$, $A \subseteq N$ and $|N| \le \max(|A|,|\text{Fml}^\mathscr L|)$.

    In particular, if $\mathscr L$ is countable, then $\bar M$ has a countable elementary substructure.

??? proof "Proof"

    *Goal*: Find an elementary substructure $\bar{N} \preceq \bar{M}$ such that $A \subseteq N$ and $|N| \le \max(|A|, |\text{Fml}^\mathscr{L}|)$.

    *1. Initial Step*

    Let $A_0 = \tilde{A}$ (the substructure generated by $A$, ensuring closure under constants and functions).

    Ensure $|A_0| = \max(|A|, |\text{Fml}^\mathscr{L}|)$ by enlarging $A$ if necessary.

    *2. Inductive Construction*

    For each stage $A_n$, construct $A_{n+1}$:

    * *Witnesses*: For every formula $\exists y \phi(\bar{x}, y)$ and parameters $\bar{a} \in A_n$, if $\bar{M} \models \exists y \phi(\bar{a}, y)$, pick a witness $b_{\phi, \bar{a}} \in M$.

    * *Closure*: Let $B_n = \{ b_{\phi, \bar{a}} \mid \text{all possible } \phi, \bar{a} \}$. Define $A_{n+1} = \widetilde{A_n \cup B_n}$.

    * *Cardinality*: By cardinal arithmetic, $|A_{n+1}| = |A_n| = |A_0|$.

    *3. Limit & Verification*

    Let $N = \bigcup_{n < \omega} A_n$.

    * *Substructure*: $N$ is a union of a chain of substructures, so $\bar{N}$ is a valid $\mathscr{L}$-structure, and $|N| = |A_0|$.

    * *Elementary*: For any $\exists y \phi(\bar{x}, y)$ with parameters $\bar{a} \in N$, since $\bar{a}$ is finite, $\bar{a} \in A_n$ for some $n$. By construction, a witness $b \in A_{n+1} \subseteq N$ exists.

    * *Conclusion*: By the Tarski-Vaught Test, $\bar{N} \preceq \bar{M}$. 

## Diagrams

!!! remark "Remark"
    Let $\bar M \preceq \bar N, D\subseteq M ^n$ be definable with parameters in $M$, $D$ admits a canonical extension to $D'\subseteq N^n$ with $D' \cap M^n= D$.

!!! note "Notation"
    Let $\bar M$ be an $\mathscr L$-structure. We use $\mathscr L_M$ to denote the language of $\mathscr L$ adjoining new constant symbols $c_m$ for $m\in M$. $\bar M$ is naturally a $\mathscr L_M$-structure with $c_m$ interpreted as $m\in M$, $\bar M ^*$ denotes this $\mathscr L_M$-structure.

!!! definition "Definition"

    + The **complete diagram** of $\bar M$ (an $\mathscr L$-structure), $D(\bar M)$ is $\text{Th}(\bar M^*)$. As a set, it is just the set of formulas of the form $\varphi(c_{m_1},\cdots,c_{m_n})$ where $\varphi(x_1,\cdots,x_n)$ is an $\mathscr L$-formula, $c_{m_1},\cdots,c_{m_n}\in \mathscr L_M$ such that $\bar M \models \varphi[m_2,\cdots,m_n]$.
    + The **diagram / simple diagram** of $\bar M$ is the set of quantifier-free sentences in $D(\bar M)$, denoted by $\Delta(\bar M)$.

!!! proposition "Proposition"
    Let $\bar M$ be an $\mathscr L$-structure and $\bar N ^ * \models D(\bar M)$, then the reduction of $\bar N ^*$ to $\mathscr L$ (denoted by $\bar N$) is an elementary extension of $\bar M$.

!!! proposition "Proposition"
    Models of $\Delta(\bar M)$ up to $\mathscr L$-isomorphisms are extensions of $\bar M$ when taking the reduction to $\mathscr L$.

## Upward Löwenheim–Skolem Theorem

!!! theorem "Theorem (Upwards Löwenheim-Skolem)"
    <a id="thm-upwards-lowenheim-skolem"></a>
    Let $\bar M$ be an $\mathscr L$-structure and $\kappa\ge max\{|M|, |\text{Fml}^\mathscr L|\}$ and $M$ is infinite. Then there is an elementary extension $\bar N \succeq \bar M$ such that $|N|=\kappa$.
