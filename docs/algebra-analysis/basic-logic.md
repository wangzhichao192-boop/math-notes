# Basic Logic

The first chapter of FAA I introduces elementary propositional logic — the
operations on statements, the conditional, and the method of proof by
contradiction. Truth tables and inference rules make explicit how
formal statements are used to justify mathematical arguments.

## Statements and Truth Values

!!! definition "Definition (Statement)"
    <a id="def-1-1-1"></a>
    <a id="def-statement"></a>

    A **statement** (or **proposition**) is a declarative sentence that has a
    well-defined truth value: it is either **true** or **false**, but not both.

!!! example "Example"
    <a id="ex-1-1-2"></a>

    <a id="ex-example"></a>

    + "$2 + 2 = 4$" is a true statement.
    + "$2 + 2 = 5$" is a false statement.
    + "$x > 0$" is **not** a statement: its truth value depends on $x$.

!!! remark "Remark"
    <a id="rem-1-1-3"></a>
    <a id="rem-remark"></a>

    When the truth of a sentence depends on a free variable, we speak of a
    **condition** $P(x)$ on a domain $A$, see [Definition](set-theory.md#def-condition-on-a-set).

## Logical Operations

Let $P$ and $Q$ denote statements.

!!! definition "Definition (Negation)"
    <a id="def-1-2-1"></a>
    <a id="def-negation"></a>

    The **negation** of $P$, denoted $\lnot P$, is the statement that is true
    exactly when $P$ is false.

!!! definition "Definition (Conjunction and disjunction)"
    <a id="def-1-2-2"></a>
    <a id="def-conjunction-and-disjunction"></a>

    The **conjunction** $P \land Q$ is true exactly when both $P$ and $Q$ are
    true. The **disjunction** $P \lor Q$ is true exactly when at least one of
    $P, Q$ is true.

!!! example "Example"
    <a id="ex-1-2-3"></a>
    <a id="ex-example-2"></a>

    "It rains and I carry an umbrella" is the conjunction of
    "It rains" and "I carry an umbrella".

## Conditional and Biconditional

!!! definition "Definition (Conditional statement)"
    <a id="def-1-3-1"></a>
    <a id="def-conditional-statement"></a>

    The **conditional** $P \Rightarrow Q$ is the statement that is false only
    when $P$ is true and $Q$ is false. Equivalently,

    $$
    P \Rightarrow Q \quad \text{is logically equivalent to}\quad \lnot P \lor Q.
    $$

    We call $P$ the **hypothesis** and $Q$ the **conclusion**.

!!! definition "Definition (Converse, contrapositive, inverse)"
    <a id="def-1-3-2"></a>
    <a id="def-converse-contrapositive-inverse"></a>

    Three useful variants of the conditional:

    + **Converse** of $P \Rightarrow Q$ is $Q \Rightarrow P$.
    + **Contrapositive** of $P \Rightarrow Q$ is $\lnot Q \Rightarrow \lnot P$.
    + **Inverse** of $P \Rightarrow Q$ is $\lnot P \Rightarrow \lnot Q$.

!!! theorem "Theorem (Conditional and contrapositive are equivalent)"
    <a id="thm-1-3-3"></a>
    <a id="thm-conditional-and-contrapositive-are-equivalent"></a>

    A conditional is logically equivalent to its contrapositive:

    $$
    (P \Rightarrow Q) \iff (\lnot Q \Rightarrow \lnot P).
    $$

??? proof "Proof"
    Truth-table check, or use $P \Rightarrow Q \equiv \lnot P \lor Q$ and
    $\lnot Q \Rightarrow \lnot P \equiv Q \lor \lnot P$.

!!! definition "Definition (Biconditional statement)"
    <a id="def-1-3-4"></a>
    <a id="def-biconditional-statement"></a>

    The **biconditional** $P \Leftrightarrow Q$ is true exactly when $P$ and
    $Q$ have the same truth value. Equivalently,

    $$
    P \Leftrightarrow Q \equiv (P \Rightarrow Q) \land (Q \Rightarrow P).
    $$

## Proof by Contradiction

!!! theorem "Theorem (Proof by contradiction)"
    <a id="thm-1-4-1"></a>
    <a id="thm-proof-by-contradiction"></a>

    Let $P$ be a statement. If assuming $\lnot P$ leads to a contradiction,
    then $P$ is true. The law of excluded middle $P \lor \lnot P$ is a
    tautology for every $P$; it does not assert that $P$ itself is true.

??? proof "Proof"
    Suppose $\lnot P$ leads to a contradiction $Q \land \lnot Q$. Then
    $\lnot(\lnot P)$ must hold, i.e. $P$.

!!! example "Example (Irrationality of √2)"
    <a id="ex-1-4-2"></a>
    <a id="ex-irrationality-of-2"></a>

    **Irrationality of $\sqrt{2}$**. Suppose, for contradiction, that
    $\sqrt{2} = p/q$ with $p, q \in \mathbb{Z}$, $q \neq 0$, in lowest terms.
    Then $2q^2 = p^2$, so $p$ is even, say $p = 2r$. Substituting gives
    $2q^2 = 4r^2$, so $q^2 = 2r^2$ and $q$ is also even, contradicting that
    $p/q$ is in lowest terms.

## Useful Equivalences

The following identities are verified by truth tables.

!!! proposition "Proposition (De Morgan's laws)"
    <a id="prop-1-5-1"></a>
    <a id="prop-de-morgan-s-laws"></a>

    (De Morgan's laws)

    $$
    \lnot(P \land Q) \iff (\lnot P) \lor (\lnot Q), \qquad
    \lnot(P \lor Q) \iff (\lnot P) \land (\lnot Q).
    $$

!!! proposition "Proposition (Distributivity)"
    <a id="prop-1-5-2"></a>
    <a id="prop-distributivity"></a>

    (Distributivity)

    $$
    P \land (Q \lor R) \iff (P \land Q) \lor (P \land R), \qquad
    P \lor (Q \land R) \iff (P \lor Q) \land (P \lor R).
    $$

## Truth Tables and Rules of Inference

The logical operations can be checked by exhausting the possible truth values.
An implication expresses a relation between truth values; it need not express
a causal relation between the sentences.

!!! definition "Definition (Axioms and mathematical results)"
    <a id="def-axioms-and-results"></a>

    An **axiom** is a statement accepted without proof within a theory. A
    **theorem** is established from the axioms and previously proved results.
    A **proposition** is a result of more local use; a **corollary** is an
    immediate consequence of another result. These labels do not change the
    logical meaning of the statements.

!!! example "Example (Statements and free variables)"
    <a id="ex-statements-and-free-variables"></a>

    The source examples are $2>1$ (true), $1<0$ (false), and $x>2$, which
    becomes a statement once a value or a quantifier for $x$ is specified.

| $P$ | $Q$ | $\lnot P$ | $P\land Q$ | $P\lor Q$ | $P\Rightarrow Q$ | $P\Leftrightarrow Q$ |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

!!! proposition "Proposition (Double negation and inference)"
    <a id="prop-logical-inference"></a>

    The statements $\lnot\lnot P$ and $P$ have the same truth value.
    If $P$ and $P\Rightarrow Q$ are true, then $Q$ is true (**modus ponens**).
    If $P\Rightarrow Q$ and $Q\Rightarrow R$ are true, then
    $P\Rightarrow R$ is true (**transitivity of implication**).

??? proof "Proof"
    Double negation reverses the truth value twice. For modus ponens, the row
    $P=\mathrm T$, $Q=\mathrm F$ is excluded by the truth of the implication.
    For transitivity, assume $P$; the first implication gives $Q$ and the
    second gives $R$. When $P$ is false the resulting implication is true.

!!! example "Example (Parity and contraposition)"
    <a id="ex-parity-contraposition"></a>

    For an integer $n$, $n^2$ is even if and only if $n$ is even.

??? proof "Proof"
    If $n=2k$, then $n^2=4k^2$ is even. For the reverse implication use the
    contrapositive: if $n$ is odd, write $n=2k+1$; then
    $n^2=4k^2+4k+1$ is odd. Thus an even square cannot have an odd root.

!!! remark "Remark (Proving a biconditional)"
    <a id="rem-proving-a-biconditional"></a>

    Proving $P\Rightarrow Q$ and its inverse
    $\lnot P\Rightarrow\lnot Q$ proves $P\Leftrightarrow Q$, because the
    inverse is equivalent to $Q\Rightarrow P$. Proving only a conditional
    does not prove its converse.
