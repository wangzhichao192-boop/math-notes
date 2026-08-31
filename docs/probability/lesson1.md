# Lesson 1 

## Sample Space and Events

!!! definition "Definition (Sample space, outcome, event)"
    <a id="def-p-1"></a>
    A **sample space** $\Omega$ is the set of all possible outcomes of a
    random experiment. An element $\omega \in \Omega$ is called an
    **outcome**. An **event** is a subset $A \subseteq \Omega$ of the
    sample space. We say that the event $A$ *occurs* if the outcome
    $\omega$ belongs to $A$.

!!! example "Example (Tossing two coins)"
    <a id="ex-p-1"></a>
    If we toss two coins, a natural sample space is

    $$\Omega = \{HH, HT, TH, TT\}.$$

    For example, $A = \{HH, HT\}$ is the event that the first coin is
    heads.

## σ-Algebra

!!! definition "Definition (σ-algebra)"
    <a id="def-p-2"></a>
    A collection $\mathcal{F}$ of subsets of $\Omega$ is a **σ-algebra**
    on $\Omega$ if

    1. $\emptyset \in \mathcal{F}$.

    2. (Countable unions) If $A_1, A_2, \ldots \in \mathcal{F}$, then
       $\bigcup_{i=1}^{\infty} A_i \in \mathcal{F}$.

    3. (Complements) If $A \in \mathcal{F}$, then $A^c \in \mathcal{F}$.

!!! example "Example (σ-algebras on a two-point set)"
    <a id="ex-p-2"></a>
    Let $\Omega = \{H, T\}$. The following are all valid σ-algebras on
    $\Omega$:

    1. $\mathcal{F}_1 = \{\emptyset, \Omega\}$.

    2. $\mathcal{F}_2 = \mathcal{P}(\Omega)$.

    3. $\mathcal{F}_3 = \{\emptyset, \Omega, \{H\}, \{T\}\}$.

    4. $\mathcal{F}_4 = \{\emptyset, \Omega, \{H\}, \{H, T\}\} = \mathcal{P}(\Omega)$ — same as $\mathcal{F}_2$.

## Probability Measure

!!! definition "Definition (Probability measure)"
    <a id="def-p-3"></a>
    Given $(\Omega, \mathcal{F})$, a **probability measure** $\mathbb{P}$
    on $(\Omega, \mathcal{F})$ is a function
    $\mathbb{P} : \mathcal{F} \to [0, 1]$ such that

    1. (Normalization) $\mathbb{P}(\Omega) = 1$.

    2. (Countable additivity) If $A_1, A_2, \ldots \in \mathcal{F}$ are
       pairwise disjoint, then
       $\mathbb{P}\!\left(\bigcup_{i=1}^{\infty} A_i\right)
       = \sum_{i=1}^{\infty} \mathbb{P}(A_i)$.

!!! remark "Remark (Basic properties of probability)"
    <a id="rem-p-3"></a>

    - $\mathbb{P}(\Omega) = \mathbb{P}(\emptyset \cup \Omega)
      = \mathbb{P}(\emptyset) + \mathbb{P}(\Omega)$, hence
      $\mathbb{P}(\emptyset) = 0$.

    - $1 = \mathbb{P}(\Omega) = \mathbb{P}(A \cup A^c)
      = \mathbb{P}(A) + \mathbb{P}(A^c)$, so
      $\mathbb{P}(A^c) = 1 - \mathbb{P}(A)$.

    - $\mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B)
      - \mathbb{P}(A \cap B)$ (inclusion–exclusion).

!!! proposition "Proposition (Continuity of probability)"
    <a id="prop-p-3"></a>

    1. (Upward continuity) If $A_1 \subseteq A_2 \subseteq \cdots$ is
       an increasing sequence of events, then
       $\mathbb{P}(A_n) \to \mathbb{P}\!\left(\bigcup_{k=1}^{\infty} A_k\right)$.

    2. (Downward continuity) If $B_1 \supseteq B_2 \supseteq \cdots$ is
       a decreasing sequence of events, then
       $\mathbb{P}(B_n) \to \mathbb{P}\!\left(\bigcap_{k=1}^{\infty} B_k\right)$.

??? proof "Proof (Continuity of probability)"

    1. Define disjoint sets

       $$C_1 = A_1, \qquad C_k = A_k \setminus A_{k-1} \;\; (k \geq 2).$$

       Then $\bigcup_{k=1}^{\infty} A_k = \bigcup_{k=1}^{\infty} C_k$ and
       $A_n = \bigcup_{k=1}^{n} C_k$. By countable additivity,

       $$
       \begin{aligned}
       \mathbb{P}\!\left(\bigcup_{k=1}^{\infty} A_k\right)
       &= \mathbb{P}\!\left(\bigcup_{k=1}^{\infty} C_k\right)
       = \sum_{k=1}^{\infty} \mathbb{P}(C_k) \\
       &= \lim_{n \to \infty} \sum_{k=1}^{n} \mathbb{P}(C_k)
       = \lim_{n \to \infty} \mathbb{P}\!\left(\bigcup_{k=1}^{n} C_k\right)
       = \lim_{n \to \infty} \mathbb{P}(A_n).
       \end{aligned}
       $$

       Since $A_n$ is increasing and $A_n \subseteq \bigcup_k A_k$, the
       sequence $\mathbb{P}(A_n)$ is non-decreasing and bounded above by
       $\mathbb{P}\!\left(\bigcup_k A_k\right)$, so it converges upwards
       to that value.

    2. Apply part (1) to the complements
       $A_k := B_k^c$. The condition $B_1 \supseteq B_2 \supseteq
       \cdots$ is equivalent to $A_1 \subseteq A_2 \subseteq \cdots$.
       By (1),
       $\mathbb{P}(A_n) \to \mathbb{P}\!\left(\bigcup_{k=1}^{\infty} A_k\right)
       = \mathbb{P}\!\left(\left(\bigcap_{k=1}^{\infty} B_k\right)^c\right)
       = 1 - \mathbb{P}\!\left(\bigcap_{k=1}^{\infty} B_k\right)$.
       Since $\mathbb{P}(A_n) = 1 - \mathbb{P}(B_n)$, taking $n \to
       \infty$ gives
       $1 - \mathbb{P}(B_n) \to 1 - \mathbb{P}\!\left(\bigcap_k B_k\right)$,
       i.e. $\mathbb{P}(B_n) \to \mathbb{P}\!\left(\bigcap_k B_k\right)$.

## Independence

!!! definition "Definition (Independence)"
    <a id="def-p-4"></a>

    - Two events $A$ and $B$ are **independent** if
      $\mathbb{P}(A \cap B) = \mathbb{P}(A) \cdot \mathbb{P}(B)$.

    - Events $A_1, \ldots, A_n$ are **(mutually) independent** if for
      every sub-collection $I \subseteq \{1, \ldots, n\}$,

      $$\mathbb{P}\!\left(\bigcap_{i \in I} A_i\right)
      = \prod_{i \in I} \mathbb{P}(A_i).$$

      The defining case is the full intersection:
      $\mathbb{P}\!\left(\bigcap_{i=1}^{n} A_i\right)
      = \prod_{i=1}^{n} \mathbb{P}(A_i)$.

!!! example "Example (Pairwise but not mutual independence)"
    <a id="ex-p-4"></a>
    We toss two fair coins. Encode heads as $+1$ and tails as $-1$, and
    define the events

    $$
    \begin{aligned}
    A &= \{\text{the first coin is } +1\}, \\
    B &= \{\text{the second coin is } +1\}, \\
    C &= \{\text{the product of the two coin outcomes is } +1\}.
    \end{aligned}
    $$

    Then
    $\mathbb{P}(A) = \mathbb{P}(B) = \mathbb{P}(C) = \tfrac{1}{2}$
    and $\mathbb{P}(A \cap B) = \mathbb{P}(A \cap C)
    = \mathbb{P}(B \cap C) = \tfrac{1}{4}$, so $A, B, C$ are pairwise
    independent. However
    $\mathbb{P}(A \cap B \cap C) = \tfrac{1}{4}
    \neq \tfrac{1}{8} = \mathbb{P}(A)\,\mathbb{P}(B)\,\mathbb{P}(C)$,
    so $A, B, C$ are *not* mutually independent.

## Random Walk

!!! example "Example (Gambler's ruin)"
    <a id="ex-p-5"></a>
    A particle moves on the integers $\{0, 1, \ldots, n\}$. It starts
    at some $k$ with $0 < k < n$. At each step it moves one to the
    left with probability $p$ or one to the right with probability
    $q = 1 - p$. We want the probability that the particle reaches $n$
    before it reaches $0$.

    Let
    $u_k = \mathbb{P}(\text{hit } n \text{ before } 0 \mid X_0 = k)$.
    The boundary conditions are $u_0 = 0$ and $u_n = 1$.

    Conditioning on the first step gives the recurrence

    $$u_k = p\, u_{k-1} + q\, u_{k+1}, \qquad 1 \leq k \leq n-1.$$

    Rearrange: $q\,(u_{k+1} - u_k) = p\,(u_k - u_{k-1})$, so the
    successive differences $d_k := u_{k+1} - u_k$ satisfy
    $d_k = (p/q)\, d_{k-1}$. Iterating, $d_k = (p/q)^{k-1} d_1$ for
    $k = 1, \ldots, n-1$.

    **Case $p \neq q$.** Telescoping from $0$ to $k-1$,
    $u_k = u_0 + \sum_{j=1}^{k-1} d_j
    = d_1 \sum_{j=0}^{k-1} (p/q)^j
    = d_1 \,\dfrac{1 - (p/q)^k}{1 - p/q}$.
    The boundary condition $u_n = 1$ gives
    $d_1 = \dfrac{1 - p/q}{1 - (p/q)^n}$, hence

    $$u_k = \frac{1 - (p/q)^k}{1 - (p/q)^n}.$$

    **Case $p = q = 1/2$.** Then $d_k = d_1$ is constant, and
    $u_k = k\, d_1$. The condition $u_n = 1$ gives $d_1 = 1/n$, so

    $$u_k = \frac{k}{n}.$$

    Combining both cases,

    $$\mathbb{P}_k(\tau_n < \tau_0) =
    \begin{cases}
    \dfrac{1 - (p/q)^k}{1 - (p/q)^n}, & p \neq q, \\[1.2ex]
    \dfrac{k}{n}, & p = q = \dfrac{1}{2}.
    \end{cases}$$
