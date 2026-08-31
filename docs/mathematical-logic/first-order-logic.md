# First-order Logic

### Languages and Structures

!!! definition "Definition"
    **Statements** in first-order logic are a sequence of symbols describing properties of structures.

!!! example "Example."
    $\forall x, \exists y, y\cdot y = x$, which is true in $\mathbb C$, but false in $\mathbb R$.

!!! definition "Definition."
    A **first-order language** (may be shortened simply as "language") $\mathscr L$ is a set of symbols composed of the following two parts:

    + Logical symbols (common to all $\mathscr L$) :

      + Auxiliary symbols '$($' , '$)$'

      + A set of variables $\mathcal{V} = \{ v_n \mid n \in \mathbb{N} \}$

      + Equality '$=$'

      + Connectives: '$\neg$' negation and '$\land$' conjunction

      + Existential quantifiers '$\exists$'

    + Signature of $\mathscr L$ written as $\sigma ^{\mathscr L}$ which consists of non-logical symbols:

      + A set of constant symbols $\mathcal C ^ {\mathscr L}$

      + A family of sets $\mathcal F ^{\mathscr L} _ n, n \in \mathbb N ^ \star$ whose elements are called $n$-ary function symbols.

      + A family of sets $\mathcal{R}_n^{\mathcal{L}}, n \in \mathbb N ^ \star$  whose elements are called $n$-ary relation symbols / predicates.

    The sets above are all disjoint.

    Note that a language is always infinite, $\mathscr L$ and $\sigma ^{\mathscr L}$ are used interchangeably.

!!! example "Example."

    + $\mathscr L_\psi = \emptyset$ which is the empty language

    + $\mathscr L_{ord} = \{ < \}$ language of ordering where '$<$' $\in \mathcal R _2 ^ \mathscr L$

    + $\mathscr L _{rings} = \{ \mathbf 0 , \mathbf 1, +, \cdot, -\}$ language of rings where $\mathbf 0,\mathbf 1 \in \mathcal C ^ \mathscr L \quad +,\cdot \in \mathcal F _2 ^ \mathscr L \quad - \in \mathcal F_1 ^ \mathscr L$

    + $\mathscr L _{oring} = \{\mathbf 0, \mathbf 1, + , \cdot, -, < \}$

    + $\mathscr L _{ar} = \{ \mathbf 0, S, +, \cdot, <\}$ language of arithmetic where $\mathbf 0 \in \mathcal C ^\mathscr L \quad S \in \mathcal F _1 ^ \mathscr L \quad  < \in \mathcal R ^\mathscr L _2$

    + $\mathscr L_{set} = \{ \in \}$ language of set theory where '$\in$' $\in \mathcal R ^{\mathscr L} _2$

!!! definition "Definition."
    An **$\mathscr L$-structure** $\bar A$ consists of a non-empty set $A$ with an element $ C ^{\bar A  } \in A$ for any  $C \in \mathcal C ^ {\mathscr L}$, a funciton $f^{\bar A} : A^n \to A$ for any $f \in \mathcal F ^{\mathscr L} _{n}$ and a subset $\mathcal R ^{\bar A}$ for $R \in \mathcal R$. We write $\bar A = \langle A;(Z ^{\bar A})_{Z\in \sigma ^\mathscr L } \rangle$

    $Z^{\bar A}$ is called the interpretation of the symbol $Z \in \sigma ^\mathscr L$ in the structure $\bar A$.

!!! example "Example."

    $\bar {\mathbb N} = \langle \mathbb N, 0, S, + , \cdot, < \rangle$ is an $\mathscr L _{ar}$-structure.  $\mathscr L _{ar} = \{ \mathbf 0, S, +, \cdot, < \}$

    $\bar {\mathbb C} = \langle \mathbb C, +, \cdot,  0, 1 \rangle$  is a $\mathscr L_{ring}$ structure.

    $\bar {\mathbb R} = \langle \mathbb R, +, \cdot , -, 0, 1, < \rangle$ is a $\mathscr L_{oring}$-structure

!!! definition "Definition."
    Let $\mathscr L$ be a language and $\bar M, \bar N$ be $\mathscr L$-structures.

    We say that $\bar M \cong \bar N$ ($\bar M$ is **isomorphic** to $\bar N$) if there is $f: M \to N$ a bijection that commutes with the interpretation of symbols.

    + $f\left ( C^{\bar M} \right )  = C^{\bar N}$

    + $f\left ( g^{\bar M} (a_1, \cdots, a_n)\right) = g ^{\bar N} \left( f(a_1), \cdots, f(a_n) \right ), g \in \mathcal F^\mathscr L _n, a_1, \cdots, a_n \in M$

    + $\left ( a_1, \cdots, a_n\right ) \in  R ^{\bar M } \iff \left ( f(a_1), \cdots, f(a_n) \right) \in  R ^{\bar N}, R \in  \mathcal             R ^\mathscr L _ n $

!!! note "Exercise."
    If $f$ is an isomorphism of commutative rings $A, B$, then viewing $A, B$ as $\mathscr L _{ring}$ -structures, $\bar A \cong \bar B$.

### Terms and Formulas

!!! definition "Definition."
    A **word** is a string of symbols in (a given alphabet) $E$, $w = a_0 \cdots a_n, n \in \mathbb N, a_i \in E$, then $w$ is a word in $E$ and $n + 1$ is the length of $w$.

    We use $E^\star$  to denote the set of words in $E$.

!!! definition "Definition."
    $\mathscr L$ is a language. The set of **$\mathscr L$-terms $\mathcal{T} ^ {\mathscr L}$** is the smallest subset $ D $ of $\mathscr L ^\star$ such that if $f \in \mathcal F ^ \mathscr L _ n, t_1 ,\cdots , t_n \in \mathcal T ^ \mathscr L \implies f\  t_1 \cdots t_n \in D$ and $\mathcal V, \mathcal C ^ \mathscr L \subseteq D$.

!!! definition "Definition (for the unique readability)."
    We define $K:\mathscr L \to \mathbb Z$ which sends any variable and constant symbol to $1$ and sends $f \in \mathcal F_n^{\mathscr L}$ to $1 - n$. Then we extend k to all terms additively.

!!! lemma "Lemma (for the unique readability)"
    $k(t) = 1$ if $t$ is a term.

??? proof "Proof."
    We perform an induction on the length of the string.

    $k(f \ t_1 \cdots t_n) = k(f) + k(t_1) + \cdots + k(t_n) = (1 - n) + n = 1$

!!! definition "Definition."
    We call $s'$ a **terminal segment** of $s$ if there exists $s''$ such that $s = s'' s'$. Similarly, $s'$ is an **initial segment** of $s$ if there exists $s''$ such that $s = s' s''$.

!!! lemma "Lemma (for the unique readability)."
    Any terminal segment of a term is a concatenation of one or more terms.

??? proof "Proof."
    We perform an induction on the length of the term. For a term $f \ t_1 \cdots t_n$, any terminal segment has the form $t_k' \ t_{k+1} \ \cdots \ t_n$ where $t_k'$ is a terminal segment of $t_k$. By induction hypothesis, each $t_i$ is a term, so the terminal segment is a concatenation of terms.

!!! corollary "Corollary (for the unique readability)."
    No proper initial segment of a term is a term.

??? proof "Proof."
    Let $t$ be a term, $t'$ be a proper initial segment of $t$, and $t''$ be the corresponding terminal segment. Then $k(t) = k(t') + k(t'')$. Since $t''$ is a concatenation of terms, $k(t'') \geq 1$. If $t'$ were also a term, we would have $k(t') = 1$, so $k(t) = 1 + k(t'') \geq 2$, contradicting $k(t) = 1$.

!!! proposition "Proposition (Unique readability of terms)."
    Any $t \in \mathcal T ^ \mathscr L$ satisfies exactly one of the following conditions:

    + $t$ is a variable

    + $t$ is a constant symbol

    + There is $n \in \mathbb N _{> 0} $ a unique $n$-ary function symbol $f \in \mathcal F _n ^ \mathscr L, t_1, \cdots t_n \in \mathcal T ^ \mathscr L$ such that $t = f\ t_1 \cdots t_n$.

??? proof "Proof."

    Suppose $f \ t_1 \cdots t_n = f \ t_1' \cdots t_m'$ with the same function symbol $f$. 

    $t_1 \cdots t_n = t_1' \cdots t_m'$

    We find the first $k$ such that $t_k \ne t'_k$, since two strings are the same, so the lengths of $t_k $ and $t'_k$ are different. WLOG assume $t_k$ is longer. Hence $t'_k$ is an initial segment of $t_k$ and its a term, which contradicting to the corollary.

!!! note "Notation."
    We shall often write $f(t_1, \cdots, t_n)$ instead of $f \ t_1 \cdots t_n$. When $f$ is binary we sometimes write $t_1 \ f \ t_2$ instead of $f \ t_1 \ t_2$.

!!! definition "Definition."
    We define the **height** of a term $ht(t)$ is the least $n$ such that $t \in \mathcal T_n ^\mathscr L$, where we define

    $\mathcal T _0 ^\mathscr L : \mathcal C ^ \mathscr L \cup \mathcal V$

    $\mathcal T _{n+1} ^\mathscr L  = \mathcal T _n ^\mathscr L \cup \{ f \ t_1 \cdots t_m : f \in \mathcal F_m ^\mathscr L, t_1 \cdots t_m \in \mathcal T _n ^\mathscr L\}$

!!! definition "Definition (formula)."

    + An atomic **formula** in $\mathscr L$ is

      + a word of the form $t_1 = t_2, \{ t_1, t_2 \} \subseteq \mathcal T^ \mathscr L $ 

      + $ R \ t_1 \cdots t_n, R \in \mathcal R ^ \mathscr L _ n, \{t_1, \cdots, t_n \}\subseteq \mathcal T^ \mathscr L $

    + The set of $\mathscr L$-formulas is the smallest set $D \subseteq \mathscr L ^\star$ such that

      + Any atomic formula is in $D$

      + If $x \in \mathcal V, \varphi, \psi \in D \implies \neg \varphi,(\varphi \land \psi ), \exists x \ \varphi \in D$

    We denote $\text{Fml}_0 ^\mathscr L$ the set of atomic formulas.

    $\text{Fml}_{n+1}^\mathscr L := \text{Fml} _n ^\mathscr L \cup \{ \neg \varphi \ | \ \varphi \in \text{Fml}_n^\mathscr L \} \cup \{ (\varphi \land \psi ) \ | \ \varphi ,\psi \in \text{Fml}_n ^ \mathscr L \} \cup \{\exists x, \varphi\ | \ x \in \mathcal V, \varphi \in \text{Fml}_n^\mathscr L  \}$

!!! proposition "Proposition(Unique readability of formulas)."
    Any $\varphi \in \mathscr{L}$-formula satisfies exactly one of the following conditions:

    1. $\varphi$ is atomic

    2. **$\varphi = \neg \psi$**: for a unique subformula $\psi$, $\varphi$ is the negation of $\psi$

    3. **$\varphi = (\psi \wedge \theta)$**: for a unique pair of subformulas $\psi$ and $\theta$, $\varphi$ is their conjunction

    4. **$\varphi = \exists x \ \psi$**: for a unique variable $x \in \mathcal{V}$ and a unique subformula $\psi$, $\varphi$ is an existential quantification of $\psi$

??? proof "Proof."

    We extend $k$ to all symbols in $\mathscr L$

    Let $k('(') = -1$, $k(')') = 1$, $k(\exists) = -1$, $k(\neg) = 0$, $K(\wedge) = -1$, $k(=) = -1$, $k(R) = 1 - n, R \in \mathcal R _n ^\mathscr L$

    The rest leaves for exercise.

!!! definition "Definition."
    We can also define height $ht(\varphi)$ on formulas which is the least $n$ such that $\varphi \in \text{Fml}_n^\mathscr L$

    Since the unique readability, we have $ht\left ( (\varphi \land \psi) \right ) = 1 + \max (ht(\varphi), ht(\psi))$, $ht(\neg \varphi) = 1 + ht(\varphi)$, $ht(\exists x\ \varphi) = 1 + ht(\varphi)$

!!! note "Notation."
    We will use the following abbreviations:

    + $(\varphi \lor \psi) \quad \text{for} \quad \neg(\neg\varphi \land \neg\psi)$

    + $(\varphi \to \psi) \quad \text{for} \quad \neg(\varphi \land \neg\psi)$

    + $(\varphi \leftrightarrow \psi) \quad \text{for} \quad ((\varphi \to \psi) \land (\psi \to \varphi))$

    + $\forall x\ \varphi \quad \text{for} \quad \neg\exists x \ \neg\varphi$

!!! note "Notation."
    We shall write $\exists x_1,\cdots x_n$ instead of $\exists x_1 \cdots \exists x_n$ (similarly for the universal quantifier), $R (t_1,\cdots, t_n) $ instead of $R \ t_1 \cdots t_n$ and sometimes $t_1 \ R \ t_2$ instead of $R \ t_1 \ t_2$.

    We shall write $(\varphi_0 \land \cdots \land \varphi_n ) $ or sometimes $\bigwedge_{i=0} ^n \varphi _i $ instead of $(\cdots ((\varphi_0 \land \varphi_1) \land \varphi_2 )\land \cdots \land \varphi_n)$, similarly for $\lor$  instead of $\land$.

!!! note "Notation."

    The priority of logic symbols: $\{ \neg , \exists,\forall\}$  >  $\{ \land, \lor \}$  >  $\{\rightarrow , \leftrightarrow \}$.

!!! example "Example."

    $\forall x \ \varphi \land \psi \to \chi \text{ shall mean } ((\forall x \ \varphi \land \psi) \to \chi)  \text{, and so finally } \neg((\neg\exists x \ \neg\varphi \land \psi) \land \neg\chi)$

!!! example "Example."
    Axioms of fields in $\mathscr L _{ring}$:

    + $\forall x \ x + \mathbf 0 = x$

    + $\forall x, y \ x + y = y + x$

    + $\forall x\  x +(-x) = \mathbf 0$

    + $\forall x, y, z \ (x + y) + z = x + (y + z)$

    + $\forall x \ x \cdot \mathbf 1 = x $

    + $\forall x, y \ x \cdot y = y \cdot x$ 

    + $\forall x, y, z \ (x \cdot y) \cdot z = x \cdot (y \cdot z)$ 

    + $\forall x, y, z \ x \cdot (y + z) = (x \cdot y) + (x \cdot z)$

    + $\forall x \ (\neg x = \mathbf 0 \rightarrow \exists y \ x \cdot y = \mathbf 1)$ 

    + $\neg \mathbf 0 = \mathbf 1$

### Semantics

In this part we fix a $\mathscr L$-structure $\bar A $.

!!! definition "Definition."
    Let $v$ be a variable, we define inductively on $ht(\varphi)$ that $v$ **occurs freely** in $\varphi$

    - $\varphi$ atomic: all occurrences of $v$ in $\varphi$ are free

    - $\varphi = \neg \psi$: all free occurrences of $v$ in $\varphi$ are those in $\psi$

    - $\varphi = \exists x \ \psi, \ x \ne v$: the free occurrences of $v$ in $\varphi$ are those in $\psi$

    - $\varphi = \exists v \ \psi$: no occurrence of $v$ in $\varphi$ is free

    Occurrences of $v$ that are not free are called **bounded**.

    Denote $\text{Free}(\varphi) = \{ v : v \text{ has at least one free occurrence in } \varphi \}$.

    A formula $\varphi$ is called a **sentence** if $\text{Free}(\varphi) = \emptyset$.

!!! example "Example."
    $\varphi = \left ( \exists v_0 \ v_0 < v_1 \land v_0 = v_1\right) \implies \text{Free}(\varphi) = \{ v_1 \}$

!!! definition "Definition."
    An **assignment** is a function $\alpha : \mathcal V \to A$, which determines the value of a term $t$ by induction.

    - $v_i^{\bar A}[\alpha] = \alpha(v_i)$ (for $v_i \in \mathcal V$) and $C^{\bar A}[\alpha] = C^{\bar A}$ (for $C \in \mathcal C^{\mathscr L}$)

    - $f(t_1, \cdots, t_n)^{\bar A}[\alpha] = f^{\bar A}\left( t_1^{\bar A}[\alpha], \cdots, t_n^{\bar A}[\alpha] \right)$

!!! lemma "Lemma."
    Let $\alpha, \beta$ be two assignments, $t$ a term. If $\alpha$ and $\beta$ agree on all variables occurring in $t$, then $t^{\bar A}[\alpha] = t^{\bar A}[\beta]$.

??? proof "Proof."
    Induction on terms.

!!! definition "Definition (Satisfaction)."
    Let $\bar A$ be an $\mathscr L$-structure, $\varphi$ a formula, $\alpha$ an assignment. We define $\bar A \models \varphi[\alpha]$ (read "$\varphi$ is satisfied in $\bar A$ by $\alpha$") by induction on $ht(\varphi)$:

    - If $\varphi : t_1 = t_2$, then $\bar A \models \varphi[\alpha]$ if $t_1^{\bar A}[\alpha] = t_2^{\bar A}[\alpha]$.

    - If $\varphi : R \ t_1 \cdots t_n$, then $\bar A \models \varphi[\alpha]$ if $(t_1^{\bar A}[\alpha], \cdots, t_n^{\bar A}[\alpha]) \in R^{\bar A}$.

    - If $\varphi : \neg \psi$, then $\bar A \models \varphi[\alpha]$ iff it is not the case that $\bar A \models \psi[\alpha]$.

    - If $\varphi : (\psi \land \theta)$, then $\bar A \models \varphi[\alpha]$ iff $\bar A \models \psi[\alpha]$ and $\bar A \models \theta[\alpha]$.

    - If $\varphi : \exists x \ \psi$, then $\bar A \models \varphi[\alpha]$ iff there exists $a \in A$ such that $\bar A \models \psi[\alpha_{a/x}]$.

    Here, $\alpha_{a/x}$ denotes the assignment defined by $\alpha_{a/x}(x) = a$ and $\alpha_{a/x}(y) = \alpha(y)$ for $y \ne x$.

!!! example "Example."
    Let $\bar{\mathbb N} = \langle \mathbb N, 0, S, +, \cdot, < \rangle$ be the standard model of arithmetic and $\alpha$ an assignment with $\alpha(v_0) = 2, \alpha(v_1) = 3$. Then $\bar{\mathbb N} \models v_0 < v_1 [\alpha]$ since $2 < 3$. Moreover, $\bar{\mathbb N} \models \exists v_2 \ v_0 + v_2 = v_1 [\alpha]$ since taking $a = 1$ we have $\bar{\mathbb N} \models v_0 + v_2 = v_1 [\alpha_{1/v_2}]$.

!!! proposition "Proposition."
    If two assignments $\alpha, \beta$ agree on $\text{Free}(\varphi)$, then $\bar A \models \varphi [\alpha] \iff \bar A \models \varphi [\beta]$

??? proof "Proof."
    Induction on $ht(\varphi)$.

    Atomic case follows from the analogue statement on terms.

    Inductive case: We consider the possible forms of $\varphi$.

    - $\varphi = \neg \psi$: Then $\text{Free}(\varphi) = \text{Free}(\psi)$. By induction hypothesis, $\bar A \models \psi[\alpha] \iff \bar A \models \psi[\beta]$. Hence $\bar A \models \varphi[\alpha] \iff \bar A \models \varphi[\beta]$.

    - $\varphi = (\psi \land \theta)$: Then $\text{Free}(\varphi) = \text{Free}(\psi) \cup \text{Free}(\theta)$. By induction hypothesis on $\psi$ and $\theta$, we have $\bar A \models \psi[\alpha] \iff \bar A \models \psi[\beta]$ and $\bar A \models \theta[\alpha] \iff \bar A \models \theta[\beta]$. Thus $\bar A \models \varphi[\alpha] \iff \bar A \models \varphi[\beta]$.

    - $\varphi = \exists x \ \psi$: Note that $\text{Free}(\varphi) = \text{Free}(\psi) \setminus \{ x \}$.

!!! note "Notation."
    A formula $\varphi$ shall sometimes be denoted by $\varphi(x_1,\dots,x_n)$ if the variables $x_i$ are distinct and all free variables in $\varphi$ belong to the $x_i$.

    If a formula $\varphi(x_1,\dots,x_n)$ and elements $a_1,\dots,a_n \in A$ are given, one defines $\bar A \vDash \varphi[a_1,\dots,a_n]$ by $\bar{A} \vDash \varphi[\alpha]$, where $\alpha$ is an assignment with $\alpha(x_i) = a_i$, which is well defined by the previous proposition.

     Thus, $\varphi(x_1,\dots,x_n)$ defines an $n$-ary relation on the structure $\bar {A}$, given by
    $\varphi[\bar{A}] := \{(a_1,\dots,a_n) \in A^n \mid \bar{A} \vDash \varphi[a_1,\dots,a_n]\}.
    $

    In particular, when $\varphi$ is a sentence, the relation $\bar{A} \vDash \varphi$ can be interpreted as "$\varphi$ is satisfied (or true) in $\bar{A}$'' or "$\bar{A}$ is a model of $\varphi$''.

!!! definition "Definition."

    Let $\bar A$ be a structure and $D \subseteq A^n$.

    - The set $D$ is called $\emptyset$-definable in $\bar A$ if $D = \varphi[\bar A]$ for some formula $\varphi(x_1,\dots,x_n)$.

    - Let $B \subseteq A$ be a parameter set. Then $D$ is called $B$-definable in $\bar A$ if there exist a formula $\varphi(x_1,\dots,x_n,y_1,\dots,y_m)$ and $\bar b \in B^m$ such that $D$ is equal to the set

      $$
      \varphi[\bar A,\bar b] := \{\bar a \in A^n \mid \bar A \vDash \varphi[a_1,\dots,a_n,b_1,\dots,b_m]\}.
      $$

!!! example "Example."

    In $(\mathbb C, +,\cdot,0,1,-)$ , which is a $\mathscr L_{ring}$-structure.

    - $\varphi_0: x^3 + y^3=1$ is $\{\emptyset\}$-definable.

    - $\varphi_1:\exists z \ x^3 + y^3 + z^3 = 1$ is $\emptyset $-definable

    - $\varphi_2:e\cdot x^3 + \pi\cdot=0$ is $\{e,\pi\}$-definable

    - $\varphi_3:\mathbb{Z} \subseteq \mathbb C$ is not definable.

### Substitution

The goal of this chapter is to find a way to substitute variables that is compatible with our semantics.

!!! definition "Definition."
    Let $x_0,\cdots,x_r$ be variables that are distinct, $s_0 ,\cdots ,s_r$ be terms in $\mathscr L$. We define **simultaneous substitution** of $x_i$ be $s_i$.

    + Let $t$ be a term. Then $t_{s_0/x_0,\dots,s_r/x_r} = t_{\bar{s}/\bar{x}}$ is the word obtained by "simultaneously replacing all occurrences of $x_i$ in $t$ by $s_i$", that is, one sets

      + $x_{\bar{s}/\bar{x}} =
        \begin{cases}
        x & \text{if } x \neq x_0,\dots,x \neq x_r \\
        s_i & \text{if } x = x_i
        \end{cases}$

      + $c_{\bar{s}/\bar{x}} = c$

      + $[f \ t^1\cdots t^n]_{\bar{s}/\bar{x}} = f \  t^1_{\bar{s}/\bar{x}} \cdots t^n_{\bar{s}/\bar{x}}$, inductively.

    + For formulas. We define inductively, one sets

      + Atomic: 

        + $[R\ t^1 \cdots t^n]_{\bar {s} / \bar {x} }:=R\ t^1_{\bar {s} / \bar {x} } \cdots t^n_{\bar {s} / \bar {x} }$

        + $[t=t']_{\bar {s} / \bar {x} } := t_{\bar s / \bar x } = t'_{\bar s / \bar x }$

      + Inductive case:

        + $[\neg \psi]_{\bar{s}/\bar{x}}$ equal to $\neg [\psi]_{\bar{s}/\bar{x}}$

        + $(\psi \land \chi)_{\bar{s}/\bar{x}}$ equal to $(\psi_{\bar{s}/\bar{x}} \land \chi_{\bar{s}/\bar{x}})$

      + Quantifiers: Let $x_{i_1},\cdots x_{i_k}, i_1 < \cdots < i_k$ be variables in $x_0, \cdots x_r$ that are free in $\exists x \ \varphi$.

        + If $x$ doesn't occur in $s_{i_1}, \cdots,s_{i_k}$

          $[\exists x \ \psi]_{\bar{s}/\bar{x}}$ equal to $\exists \ x [\psi]_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k}}$ (Note that $x$ can't be substituted in $\psi$ )

        + If $x$ has some occurrence in one of $s_{i_1},\dots,s_{i_k}$, one sets

          $$
          [\exists \ x \ \psi]_{\bar{s}/\bar{x}} \text{ equal to } \exists u \  [\psi]_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k},u/x},
          $$

          where $u$ is the first variable appearing in the enumeration $\nu_0,\nu_1,\nu_2,\dots$ which does not occur in any of the words $\exists x  \ \psi, s_{i_1},\dots,s_{i_k}$.

!!! proposition "Proposition."

    If $t$ is a term, then $t_{\bar s / \bar x}$ is a term.

    If $\varphi$ is a formula, then $\varphi_{\bar s / \bar x}$ is a formula.

!!! note "Notation."
    Let $x_0,\dots,x_r$ be distinct variables, $\alpha$ an assignment with values in $\bar{A}$ and $a_0,\dots,a_r$ elements of $A$. One defines the assignment $\alpha_{a_0/x_0,\dots,a_r/x_r} = \alpha_{\bar{a}/\bar{x}}$ by $\alpha_{\bar{a}/\bar{x}}(x_i) = a_i$ and $\alpha_{\bar{a}/\bar{x}}(y) = \alpha(y)$ if $y \neq x_i$ for every $i$.

!!! lemma "Lemma."
    Let $x_0, \dots, x_r$ be distinct variables, $s_0, \dots, s_r$ terms and $\alpha$ an assignment with values in $\bar A$.

    + For every term $t$ one has

      $$
      t_{\bar{s}/\bar{x}}^{\bar A}[\alpha] = t^{\bar A}\left[\alpha_{s_0^{\bar A}[\alpha]/x_0,\dots,s_r^{\bar A}[\alpha]/x_r}\right].
      $$

    + For every formula $\varphi$ one has

    $$
    \bar A \vDash \varphi_{\bar{s}/\bar{x}}[\alpha] \quad \text{if and only if} \quad \bar A \vDash \varphi\left[\alpha_{s_0^{\bar A}[\alpha]/x_0,\dots,s_r^{\bar A}[\alpha]/x_r}\right].
    $$

??? proof "Proof."

    + The case of terms follows directly from induction on terms.

    + By induction, the only non-trivial case being when $\psi$ is of the form $\exists x \ \varphi$. Let $x_{i_1},\cdots,x_{i_k}$ be variables free in $\psi$.

      + If $x$ occurs in $s_{i_1},\cdots,s_{i_k}$, let $u$ be the variable chosen in the definition. Then

        $$
        \begin{align*}
    \bar A \vDash [\exists x \ \varphi]_{\bar{s}/\bar{x}}[\alpha]
    &\iff \bar A \vDash \exists u \ [\varphi]_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k},u/x}[\alpha] \\
    &\iff \text{There exists } a \in A \text{ such that } \bar A \vDash \varphi_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k},u/x}[\alpha_{a/u}] \\
    &\iff \ (\text{by the induction hypothesis}) \ \text{There exists } a \in A \text{ such that} \\
    &\quad\quad \bar A \vDash \varphi\left[\alpha_{s_{i_1}^{\bar A}[\alpha_{a/u}]/x_{i_1},\dots,s_{i_k}^{\bar A}[\alpha_{a/u}]/x_{i_k},u^{\bar A}[\alpha_{a/u}]/x}\right] \\
    &\iff \text{There exists } a \in A \text{ such that } \bar A \vDash \varphi\left[\alpha_{s_{i_1}^{\bar A}[\alpha]/x_{i_1},\dots,s_{i_k}^{\bar A}[\alpha]/x_{i_k},a/x}\right] \\
    &\quad\quad \text{(since } u \text{ is fresh)} \\
    &\iff \bar A \vDash \exists x \ \varphi\left[\alpha_{s_{i_1}^{\bar A}[\alpha]/x_{i_1},\dots,s_{i_k}^{\bar A}[\alpha]/x_{i_k}}\right] \\
    &\iff \bar A \vDash \exists x \ \varphi\left[\alpha_{s_0^{\bar A}[\alpha]/x_0,\dots,s_r^{\bar A}[\alpha]/x_r}\right].
    \end{align*}
        $$

      + If $x$ doesn't have any occurrence in any of the terms $s_{i_1},\cdots,s_{i_k}$. Then

        $$
        \begin{align*}
    \bar A \vDash [\exists x \ \varphi]_{\bar{s}/\bar{x}}[\alpha]
    &\iff \bar A \vDash \exists x \ [\varphi]_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k}}[\alpha] \\
    &\iff \text{There exists } a \in A , \bar A \vDash \varphi_{s_{i_1}/x_{i_1},\dots,s_{i_k}/x_{i_k}}[\alpha_{a/x}] \\
    &\iff \ (\text{by the induction hypothesis and since } x \neq x_{i_1},\dots,x \neq x_{i_k}) \\
    &\quad\quad \text{There exists } a \in A \text{ with } \bar A \vDash \varphi\left[\alpha_{s_{i_1}^{\bar A}[\alpha_{a/x}]/x_{i_1},\dots,s_{i_k}^{\bar A}[\alpha_{a/x}]/x_{i_k},a/x}\right] \\
    &\iff \bar A \vDash \exists x \ \varphi\left[\alpha_{s_{i_1}^{\bar A}[\alpha]/x_{i_1},\dots,s_{i_k}^{\bar A}[\alpha]/x_{i_k}}\right] \\
    &\iff \bar A \vDash \exists x \ \varphi\left[\alpha_{s_0^{\bar A}[\alpha]/x_0,\dots,s_r^{\bar A}[\alpha]/x_r}\right].
    \end{align*}
        $$

!!! example "Example."
    Let $\varphi$ be a formula, $x_1, \cdots,x_r$ be distinct variables. $s_1, \cdots ,s_r$ be terms such that  no variables in $s_i$ occurs in $\varphi$. Then $\varphi_{\bar s / \bar x }$ is exactly the formula one gets after replacing free occurences of $x_i$ by $s_i$.

!!! lemma "Lemma."
    If $y$ is a variable with no occurence in $\varphi$. Then

    $$
    \left [ \varphi _ {y / x} \right ]_{x / y}     = \varphi
    $$

??? proof "Proof."
    Induction on formulas.

!!! note "Notation."
    Let $s_1, \cdots ,s_n$ be terms. If $t(x_1, \cdots,x_n)$ is a term, we shall often write $t(s_1, \cdots, s_n)$ for $t_{s_1 / x_1,\cdots, s_n/x_n}$, and $\varphi(s_1,\cdots,s_n)$ for $\varphi_{s_1 / x_1,\cdots, s_n/x_n}$ if $\varphi$ is a formula of the form $\varphi(x_1,\cdots, x_n)$.

### Universally Valid Formulas

In this part, we want to define basic deductive rules.

!!! definition "Definition."
    An $\mathscr L$-formula $\varphi$ is called **universally valid** formula " $\models \varphi$ " if it is satisfied in any $\mathscr L$-structure $\bar A$ with any assignment (The fact that we do not mention the language $\mathscr L$ in the notation $\models$ is justified in the next lemma).

!!! remark "Remark."
    $\varphi(x_1,\cdots,x_n)$ is universally valid iff $\forall x_1, \cdots ,x_n \ \varphi$ is universally valid.

!!! example "Example."

    + $\exists x \ x=x$ is universally valid (Axiom of equality)

    + $\varphi \land \psi \to \psi$ is universally valid.

!!! lemma "Lemma."
    Let $\varphi$ be an $\mathscr{L}$-formula and $\mathscr{L}' \supseteq \mathscr{L}$. Then $\varphi$ is universally valid as an $\mathscr{L}$-formula if and only if it is universally valid as an $\mathscr{L}'$-formula.

??? proof "Proof."
    One may identify assignments with values in $\bar A$ and those with values in $\bar A'$, and one has

    $$
    \bar A' \vDash \varphi[\alpha] \iff \bar A \vDash \varphi[\alpha]
    $$

    for any assignment $\alpha$. Thus it suffices to prove that any $\mathscr{L}$-structure $\bar A$ has an expansion to some $\mathscr{L}'$-structure, which is clear.

!!! definition "Definition."
    We fix a set $\mathcal P =\{p_i \ | \ i\in \mathbb{N} \}$ where $p_i$ are called propositional variables (they will only take only "true" or "false" as values).

!!! proposition "Propositional calculus formulas"
    are defined as words over the alphabet $\mathcal P \cup \{\neg, \land, (,)\}$, formed according to the following rules:

    + Each $p_i$ is a propositional calculus formula.

    + If $F$ and $G$ are formulas, then $\neg F$ and $(F\land G)$ are formulas too.

    We use $\text{PFml}$ to denote the sets of propositional calculus formulas. As before we introduce $\lor, \to,\leftrightarrow$.

!!! definition "Definition."
    For any assignment $\delta :\mathcal P \to \{ 0,1 \}$, we extend $\delta $ to $\delta ^\star : \text{PFml}\to \{0,1\}$ defined by:

    + $\delta^\star (p_i) = \delta(p_i),p_i \in \mathcal P$

    + $\delta ^\star(\neg F) = 1 - \delta^\star (F)$

    + $\delta^\star \left ((F\land G)\right ) = \delta^\star (F) \cdot \delta ^\star (G) $

    If $\delta ^\star (F) = 1$, we write $\delta \models F$.

!!! definition "Definition."

    + We say that a formula $F \in \text{PFml}$ is a **tautology** for the propositional calculus if $\delta \models F$ for any assignment $\delta$.
    + We call an $\mathscr L $-formula $\varphi$ is a tautology for the predicate calculus if there exists $F=F(q_1,\cdots,q_n)$ is a tautology for the propositional calculus and $\mathscr L$-formulas $\psi_1,\cdots,\psi_n$ such that $\varphi$ equals to $F_{\psi_1 / q _1,\cdots,\psi_n /q_n}$.

!!! example "Example."

    + $F(q) = q \lor \neg q$ is a tautology.

    + We replace all $q$ to a formula $\forall x\ P(x)$, hence $(\forall x\ P(x)) \lor (\forall x\ P(x))$ is a predicate tautology.

!!! lemma "Lemma."
    All tautologies for the predicate calculus is universally valid.

!!! lemma "Lemma (Equality axioms)."
    The following are universally valid:

    + $\forall v_0\  v_0 = v_0$

    + $\forall v_0,v_1 \ (v_0 = v_1 \to v_1 =v_0)$

    + $\forall v_0, v_1,v_2 \ ((v_0 = v_1 \land v_1 = v_2) \to v_0 = v_2)$

    + $\forall v_1 \dots v_{2n} \ \left( \bigwedge_{i=1}^n v_i = v_{i+n} \rightarrow f \ v_1 \dots v_n = f \  v_{n+1} \dots v_{2n} \right),\ f \in \mathcal{F}_n^\mathcal{L}$

    + $\forall v_1 \dots v_{2n} \  \left( \bigwedge_{i=1}^n v_i = v_{i+n} \land R\  v_1 \dots v_n \rightarrow R\  v_{n+1} \dots v_{2n} \right),\ R \in \mathcal{R}_n^\mathcal{L}$

!!! lemma "Lemma (Quantifiers axioms)."

    + For any non-free variable $x$ in $\varphi$, $\forall x \ (\varphi \rightarrow \psi) \rightarrow (\varphi \rightarrow \forall x \ \psi)$ is universally valid.

    + For any variable $x$ and any term $t$, $\varphi_{t/x} \rightarrow \exists x \ \varphi$ is universally valid.

    + For any variable $x$, the formula $\exists x \ \varphi \leftrightarrow \neg \forall x \ \neg \varphi$ universally valid.

??? proof "Proof."
    We will only show the first lemma.

    Suppose that $x \notin \text{Free}(\varphi)$, and that $\bar A \vDash \forall x \ (\varphi \to \psi)[\alpha]$. That is, $\bar A \vDash (\neg \varphi \lor \psi)[\alpha_{a/x}]$ for any $a \in A$, We have to prove that $\bar A \vDash (\varphi \to \forall x \ \psi)[\alpha]$, and for this we may assume that $\bar A \vDash \varphi[\alpha]$. But then $\bar A \vDash \varphi[\alpha_{a/x}]$ as $x \notin \text{Free}(\varphi)$, and so $\bar A \vDash \psi[\alpha_{a/x}]$. Since $a \in A$ was arbitrary, $\bar A \vDash \forall x \ \psi[\alpha]$ follows.

!!! definition "Definition."
    Let $\mathscr L$ be a language. We call an $\mathscr L$**-theory** a set of $\mathscr L$-sentences (recall that sentences means formulas without free variables).

    Let $T$ be an $\mathscr L $-theory.

    + Let $\bar A$ be a $\mathscr L $-structure, we say $\bar A $ is a model of $T$ which we denote by $\bar A \models T$, if $\bar A \models \varphi$ for any $\varphi \in T$

    + We say a formula $\varphi$ is a logical consequence of $T$ (denoted by $T \models \varphi$), if for any $\mathscr L$-structure $\bar A $ being a model of $T$ we have $\bar A \models \varphi$.

      By the invariance for $\varphi$ of the expansion of languages, we know $T \models \varphi$ is independent with language $\mathscr L$.

### Formal Proofs and Gödel's Completeness Theorem

In this part, we are to prove **Gödel's Completeness Theorem**, which

states that any universally valid $\mathscr L$-formula may be obtained using a

finite deduction (a formal proof). This fundamental result establishes a

perfect correspondence between semantic truth and syntactic provabil-

ity in first-order logic.

We will start by formalizing the notion of proof.

By the *logical axioms* we mean:

+ predicate calculus tautologies,

+ the equality axioms,

+ the quantifier axioms.

There will be two *deduction rules*:

+ (MP) Modus Ponens: From $\varphi$ and $\varphi\to \psi$, one can deduce $\psi$.

+ Generalization: From $\varphi$, one can deduce $\forall x \ \varphi$ ($x$ any variable).

!!! definition "Definition."
    Let $T$ be an $\mathscr L$-theory, $\varphi$ be an $\mathscr L$-formula. A **formal proof** of $\varphi$ in $T$ is a tuple $(\varphi_0,\varphi_1,\cdots,\varphi_n)$ of $\mathscr L$-formulas for some $n\in \mathbb{N}$ such that $\varphi_n$ is $\varphi$ and $\varphi_i$ satisfies one of the following for any $i$ :

    + $\varphi_i \in T$

    + $\varphi_i$ is a tautology, an equality axiom or a quantifier axiom.

    + (Modus Ponens) $\varphi_i$ can be deduced by MP from some $\varphi_j$ and $\varphi_k$ with $j,k < i$.

    + (Generalization) $\varphi_i$ can be obtained by generalization from a formula $\varphi_j$ with $j < i$.

    We say $\varphi$ is **provable** in $T$ (denoted as $T \vdash_{\mathscr L} \varphi$) if there exists a formal proof of $\varphi$ in $T$. In particular, We write $\vdash_\mathscr L \varphi$ if $\varphi$ is provable in the empty theory.

!!! example "Example."

    - If $\varphi$ and $\psi$ are $\mathscr{L}$-sentences, then $\{\varphi, \psi\} \vdash_{\mathscr{L}} \varphi \land \psi$.

        Now let $\varphi$ be an $\mathscr{L}$-formula, $x, y$ variables and $t$ an $\mathscr{L}$-term. Then we have the following:

    + $\vdash_{\mathscr{L}} \forall x \ \varphi \rightarrow \varphi_{t/x}$.

    + If $y$ does not occur in $\varphi$, then $\vdash_{\mathscr{L}} \forall y \ \varphi_{y/x} \rightarrow \forall x \ \varphi$.

    + $\vdash_{\mathscr{L}} \forall x \ \varphi \rightarrow \varphi$.

??? proof "Proof."

    + Let $\theta$ be the tautology $\varphi \rightarrow (\psi \rightarrow (\varphi \land \psi))$, and $\chi := \psi \to (\varphi \land \psi)$. Hence we get the formal prove $(\theta,\varphi,\psi,\chi,\varphi \land \psi)$, where:

      + $\theta$ is a tautology

      + $\varphi,\psi$ are in the theory

      + We obtain $\chi$ by MP on $\theta$ and $\varphi$

      + We obtain the final consequence by MP on $\chi$ and $\psi$

    + Let $\theta$ be the tautology $(A \to B) \to (\neg B \to \neg A)$ and $\psi$ be $\psi =\neg \varphi \to \exists x \ \neg \varphi$ which is a quantifier axiom. We use MP and get the formal prove $(\theta, \psi, \vdash_{\mathscr{L}} \forall y \ \varphi_{y/x} \rightarrow \forall x \ \varphi)$

    + The formula $\forall y \ \varphi_{y/x} \rightarrow [\varphi_{y/x}]_{x/y}$ is an instance of (2). Since $[\varphi_{y/x}]_{x/y}$ equals $\varphi$ by Lemma, we get $\forall x \ (\forall y \ \varphi_{y/x} \rightarrow \varphi)$ by generalization, from which we conclude by the quantifier axiom and MP.

    + is a special case of (2), since $\varphi$ is equal to $\varphi_{x/x}$.

!!! theorem "Theorem (soundness)."
    Let $T$ be an $\mathscr{L}$-theory and $\varphi$ an $\mathscr{L}$-formula. Then

    $$
    T \vdash_{\mathscr{L}} \varphi \Rightarrow T \vDash \varphi
    $$

??? proof "Proof."
    Let $(\varphi_0, \cdots, \varphi_n)$ be a formal proof where $\varphi_n = \varphi$. We perform a induction on $i$ to show $T\models \varphi_i$.

    + case 1: For $\varphi_i \in T$, $T \models \varphi_i$

    + case 2: For $\varphi_i$ is an axiom (of equality or quantifier) or a tautology, we've proved the lemma $T \models \varphi_i$

    + case 3: For the MP case, we have $k,j < i$ such that $\varphi_k : \varphi_j \to \varphi_i$. By the induction hypothesis $T\models \varphi_k,\varphi_j$, By the definition of $\models$, we know $T\models \varphi_i$

    + case 4: For the generalization case, we have $j < i ,\varphi_i = \forall x \ \varphi_j$.  By IH (induction hypothesis) $T\models \varphi_j$, thus for any $\mathscr L$-structure $\bar A $ is a model of $T$ and any assignment $\alpha$, $\bar A \models \varphi_j [\alpha]$. In particular, For any $a\in A, \bar A \models \varphi_j[\alpha_{a/x}]$. In conclusion, $T\models \forall x \ \varphi_j$.

!!! definition "Definition."
    Let $\mathscr L$ be a language, $T$ be a $\mathscr L$-theory. We say that

    - $T$ is **inconsistent** if there is an $\mathscr L$-sentence $\varphi$ such that $T\vdash_{\mathscr L} \varphi$ and $T \vdash_{\mathscr L} \neg \varphi$. Otherwise $T$ is **consistent**.

    - $T$ is **complete** if $T$ is consistent and for $\varphi$ sentence $T \vdash_{\mathscr L} \varphi$ or $T \vdash_{\mathscr L} \neg \varphi$.

!!! example "Example."

    - For a ${\mathscr L}$-structure $\bar A$. $\text{Th}(\bar A) = \{\varphi:\text{sentence}, \bar A \models \varphi \}$ This is always consistent and complete. For a theory $T$, if there is $\bar A \models T$, $T$ is always consistent.

    - The theory of algebraically closed fields ${\mathscr L}_{ring}$-theory ACF which is composed of the field axioms together with a sentence $\chi_n$ for any $n \ge 1$ expressing that any polynomial of degree $n$ has a root. For instance, the formula $\chi_n$ given by $\forall z_0,\cdots,z_{n-1}\ \exists x\ (x^n + z_{n-1}x^{n-1} + \cdots + z_0 = 0)$

!!! remark "Remark."

    - If $T$ is inconsistent, then for any $\varphi$ in ${\mathscr L}$, $T\vdash_{\mathscr L} \varphi$.

      Proof. $(\theta \land \neg \theta) \to \varphi$ is a tautology for $\theta$ inconsistent.

    - $T \vdash_{\mathscr L} \varphi $ implies that there is $T_0 \subseteq T$ finite such that $T_0 \vdash _{\mathscr L} \varphi$.

!!! corollary "Corollary."

    - $T$ be an ${\mathscr L}$-theory. $T$ is consistent iff for any $T_0 \subseteq T$ finite, $T_0$ is consistent.

    - Let $(T_i)_{i\in I}$ be an indexed family of consistent ${\mathscr L}$-theories. If $\forall i,j \ \ T_j \subseteq T_i \text{ or } T_i \subseteq T_j$, then $\bigcup _{i \in I} T_i$ is consistent.

!!! lemma "Lemma (Deduction Rules)."
    Let $\chi$ be a ${\mathscr L}$-sentence, $T$ be a ${\mathscr L}$-theory, $\varphi$ be a ${\mathscr L}$-formula. $T\cup \{\chi\}\vdash_{\mathscr L} \varphi$ iff $T\vdash_{\mathscr L} \chi \to \varphi$.

??? proof "Proof."
    $T\vdash_{\mathscr L} \chi \to \varphi \implies T \cup \{\chi\} \vdash_{\mathscr L} \varphi$ is trivial by MP.

    Conversely: Let $(\varphi_0,\cdots,\varphi_n)$ be a formal proof of $\varphi$ from $T \cup \{\chi\}$.

    By induction, we will prove $T\vdash_{\mathscr L} \chi \to \varphi_i$ for each $i$.

    - If $\varphi_i$ is $\chi$, $T \vdash_{\mathscr L} \chi \to \chi$ trivially.

    - If $T\vdash_{\mathscr L} \varphi_i$, $(\varphi_i \to ( \chi \to \varphi_i))$ is a tautology. By MP, $T\vdash_{\mathscr L} \chi \to \varphi_i$.

    - In particular, $T \vdash_{\mathscr L} \chi \to \varphi_i$ if $\varphi_i \in T$ or $\varphi_i$ is a logical axiom.

    *Case MP:* $\varphi_i$ deduced by MP from $\varphi_j$ and $\varphi_k$ for $j,k < i$.

    $\varphi_k: \varphi_j \to \varphi_i$

    By IH: $T \vdash_{\mathscr L} \chi \to \varphi_j$ and $T \vdash_{\mathscr L} \chi \to (\varphi_j \to \varphi_i)$.

    The tautology $(\chi \to \varphi_j) \land (\chi \to (\varphi_j \to \varphi_i)) \to (\chi \to \varphi_i)$ together with MP yields $T \vdash_{\mathscr L} \chi \to \varphi_i$.

    *Case Generalization:* $\varphi_i: \forall x \varphi_j$ for some $j < i$.

    By IH: $T \vdash_{\mathscr L} \chi \to \varphi_j$.

    By generalization: $T \vdash_{\mathscr L} \forall x (\chi \to \varphi_j)$.

    Since $\chi$ is a sentence, $x$ has no free occurrence in $\chi$.

    $\forall x(\chi \to \varphi_j) \to (\chi \to \forall x \varphi_j)$ is a quantifier axiom.

    Apply MP: $T \vdash_{\mathscr L} \chi \to \forall x \varphi_j = \chi \to \varphi_i$.

!!! corollary "Corollary."
    Let $T$ be a ${\mathscr L}$-theory and $\varphi$ a ${\mathscr L}$-sentence. Then $T \vdash_{\mathscr L} \varphi$ iff $T \cup \{\neg \varphi\}$ is inconsistent.

??? proof "Proof."
    ($\Rightarrow$) Clear.

    ($\Leftarrow$) If $T \cup \{\neg \varphi\}$ is inconsistent, then $T \cup \{\neg \varphi\} \vdash_{\mathscr L} \varphi$ by Remark (1). By Deduction Lemma, $T \vdash_{\mathscr L} \neg \varphi \to \varphi$. Since $(\neg \varphi \to \varphi) \to \varphi$ is a tautology, we conclude by MP.

!!! lemma "Lemma (Simulation of constants by variables)."
    Let $\psi$ be a ${\mathscr L}$-formula, $T$ a ${\mathscr L}$-theory, and let $C$ be a set of constant symbols such that $C \cap {\mathscr L} = \emptyset$.

    Let $x$ be a variable, $c \in C$. Then the following statements are equivalent:

    1. $T \vdash_{\mathscr L} \psi$

    2. $T \vdash_{\mathscr L \cup {c}} \psi_{c/x}$

    3. $T \vdash_{\mathscr L \cup {c}} \psi$

    In particular, $T \vdash_{\mathscr L} \psi \iff T \vdash_{\mathscr L \cup C} \psi$.

### Henkin Construction

In this part, we want to expand $\mathscr L$ by a fresh set of constant symbols to build a model for any consistent theory.

!!! definition "Definition."
    Let $\mathscr L$ be a language, $C$ a set of constant symbols with $C \cap \mathscr L = \emptyset$. An $\mathscr L \cup C$-theory $T^+$ admits **Henkin witnesses** in $C$ if for any $\mathscr L \cup C$-formula $\varphi(x)$ there exists $c \in C$ such that

    $\exists x \ \varphi \to \varphi_{c/x} \in T^+$.

    If $\bar A$ is an $\mathscr{L}$-structure and $A = \{a_c \mid c \in C\}$ is an enumeration (possibly non-injective) of its base set by $C$, one denotes by $\bar A^+$ the $\mathscr{L} \cup C$-structure obtained from $\bar A$ by interpreting $c$ by $a_c$. Then $\text{Th}(\bar A^+)$ is a complete theory which admits Henkin witnesses in $C$. In fact, any complete theory which admits Henkin witnesses in $C$ is of this form:

!!! proposition "Proposition."
    Any complete $\mathscr{L} \cup C$-theory $T^+$ which admits Henkin witnesses in $C$ has a model $\bar A^+$ consisting of constants of $C$, that is, with a base set of the form $A^+ = \{c^{\bar A^+} \mid c \in C\}$.

!!! lemma "Lemma."
    Let $T$ be an $\mathscr L$-theory, $\varphi(x)$ an $\mathscr L$-formula and $c \in \mathscr L$ a constant symbol not occurring in $T \cup \{\varphi(x)\}$. Assume that $T$ is consistent. Then $T \cup \{\exists x \ \varphi \to \varphi_{c/x}\}$ is a consistent $\mathscr L$-theory.

??? proof "Proof."
    If not, $T \vdash_{\mathscr L} \exists x \ \varphi \land \neg \varphi_{c/x}$ by Corollary. In particular, $T \vdash_{\mathscr L} \exists x \ \varphi$, and by Lemma 2.6.8, $T \vdash_{\mathscr L} \neg \varphi$, so $T \vdash_{\mathscr L} \forall x\ \neg \varphi$ by generalization. This implies $T$ is inconsistent.

!!! theorem "Theorem (Gödel's Completeness Theorem)."
    A theory has a model if and only if it is consistent.

??? proof "Proof."

    ($\Rightarrow$) If $\bar A \models T$, then $T$ is consistent by Soundness Theorem.

    ($\Leftarrow$) Let $T$ be consistent. We will construct a model for $T$.

    *Step 1: Expanding the language*

    Let $C_1$ be a set of new constant symbols $\{c_\varphi \mid \varphi(x) \in \text{Fml}^{\mathscr L}\}$. Set $\mathscr L_1 = \mathscr L \cup C_1$ and

    $T_1 := \widetilde{T} := T \cup \{\exists x \varphi \to \varphi_{c_\varphi/x} \mid \varphi(x) \in \text{Fml}^{\mathscr L}\}$.

    By Lemma 2.6.9, $T_1$ is consistent.

    *Step 2: Iteration*

    We iterate: given $T_n$ consistent, we obtain $C_{n+1}$ new constants and $\mathscr L_{n+1} = \mathscr L_n \cup C_{n+1}$, with $T_{n+1} = \widetilde{T_n}$. By induction, $T_{n+1}$ is consistent.

    Set $C = \bigcup_{n \in \mathbb N} C_n$ and $\mathscr L^+ = \mathscr L \cup C$. The $\mathscr L^+$-theory $T' = \bigcup_{n \in \mathbb N} T_n$ is consistent by Corollary. By construction, $T'$ admits Henkin witnesses in $C$.

    *Step 3: Maximization*

    Consider $\mathcal S = \{ S' \supseteq T' \mid S' \text{ is a consistent } \mathscr L^+ \text{-theory} \}$. By Zorn's Lemma, there exists a maximal consistent $\mathscr L^+$-theory $T^+$ containing $T'$. By maximality, $T^+$ is complete.

    Thus $T^+$ is a complete $\mathscr L^+$-theory that admits Henkin witnesses in $C$.
