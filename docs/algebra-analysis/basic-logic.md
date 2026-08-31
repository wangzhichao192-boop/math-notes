# Basic Logic

The first chapter of FAA I introduces elementary propositional logic — the
operations on statements, the conditional, and the method of proof by
contradiction. The formal content here is light; the chapter is mainly
calibrated through examples and exercises (which we omit).

## Statements and Truth Values

!!! definition "Definition (Statement)"
    <a id="def-1-1-1"></a>
    A **statement** (or **proposition**) is a declarative sentence that has a
    well-defined truth value: it is either **true** or **false**, but not both.

!!! example "+ "$2 + 2 = 4$""
    <a id="ex-1-1-2"></a>

    + "$2 + 2 = 4$" is a true statement.
    + "$2 + 2 = 5$" is a false statement.
    + "$x > 0$" is **not** a statement: its truth value depends on $x$.

!!! remark "Remark"
    <a id="rem-1-1-3"></a>
    When the truth of a sentence depends on a free variable, we speak of a
    **condition** $P(x)$ on a domain $A$, see [§2.2](../algebra-analysis/set-theory.md#).

## Logical Operations

Let $P$ and $Q$ denote statements.

!!! definition "Definition (Negation)"
    <a id="def-1-2-1"></a>
    The **negation** of $P$, denoted $\lnot P$, is the statement that is true
    exactly when $P$ is false.

!!! definition "Definition (Conjunction and disjunction)"
    <a id="def-1-2-2"></a>
    The **conjunction** $P \land Q$ is true exactly when both $P$ and $Q$ are
    true. The **disjunction** $P \lor Q$ is true exactly when at least one of
    $P, Q$ is true.

!!! example ""It rains and I carry an umbrella""
    <a id="ex-1-2-3"></a>
    "It rains and I carry an umbrella" is the conjunction of
    "It rains" and "I carry an umbrella".

## Conditional and Biconditional

!!! definition "Definition (Conditional statement)"
    <a id="def-1-3-1"></a>
    The **conditional** $P \Rightarrow Q$ is the statement that is false only
    when $P$ is true and $Q$ is false. Equivalently,

    $$
    P \Rightarrow Q \quad \text{is logically equivalent to}\quad \lnot P \lor Q.
    $$

    We call $P$ the **hypothesis** and $Q$ the **conclusion**.

!!! definition "Definition (Converse, contrapositive, inverse)"
    <a id="def-1-3-2"></a>
    Three useful variants of the conditional:

    + **Converse** of $P \Rightarrow Q$ is $Q \Rightarrow P$.
    + **Contrapositive** of $P \Rightarrow Q$ is $\lnot Q \Rightarrow \lnot P$.
    + **Inverse** of $P \Rightarrow Q$ is $\lnot P \Rightarrow \lnot Q$.

!!! theorem "Theorem (Conditional and contrapositive are equivalent)"
    <a id="thm-1-3-3"></a>
    A conditional is logically equivalent to its contrapositive:

    $$
    (P \Rightarrow Q) \iff (\lnot Q \Rightarrow \lnot P).
    $$

??? proof "Proof (Biconditional statement)"
    Truth-table check, or use $P \Rightarrow Q \equiv \lnot P \lor Q$ and
    $\lnot Q \Rightarrow \lnot P \equiv Q \lor \lnot P$.

!!! definition "Definition (Biconditional statement)"
    <a id="def-1-3-4"></a>
    The **biconditional** $P \Leftrightarrow Q$ is true exactly when $P$ and
    $Q$ have the same truth value. Equivalently,

    $$
    P \Leftrightarrow Q \equiv (P \Rightarrow Q) \land (Q \Rightarrow P).
    $$

## Proof by Contradiction

!!! theorem "Theorem (Proof by contradiction)"
    <a id="thm-1-4-1"></a>
    Let $P$ be a statement. Then $P$ is true if and only if
    $P \lor \lnot P$ is a tautology. Equivalently, to prove $P$ it suffices
    to assume $\lnot P$ and derive a contradiction.

??? proof "Proof (Irrationality of √2)"
    Suppose $\lnot P$ leads to a contradiction $Q \land \lnot Q$. Then
    $\lnot(\lnot P)$ must hold, i.e. $P$.

!!! example "Example (Irrationality of √2)"
    <a id="ex-1-4-2"></a>
    **Irrationality of $\sqrt{2}$**. Suppose, for contradiction, that
    $\sqrt{2} = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$, in lowest terms.
    Then $2q^2 = p^2$, so $p$ is even, say $p = 2r$. Substituting gives
    $2q^2 = 4r^2$, so $q^2 = 2r^2$ and $q$ is also even, contradicting that
    $p/q$ is in lowest terms.

## Useful Equivalences

The following identities are verified by truth tables.

!!! proposition "Proposition (De Morgan's laws)"
    <a id="prop-1-5-1"></a>
    (De Morgan's laws)

    $$
    \lnot(P \land Q) \iff (\lnot P) \lor (\lnot Q), \qquad
    \lnot(P \lor Q) \iff (\lnot P) \land (\lnot Q).
    $$

!!! proposition "Proposition (Distributivity)"
    <a id="prop-1-5-2"></a>
    (Distributivity)

    $$
    P \land (Q \lor R) \iff (P \land Q) \lor (P \land R), \qquad
    P \lor (Q \land R) \iff (P \lor Q) \land (P \lor R).
    $$

