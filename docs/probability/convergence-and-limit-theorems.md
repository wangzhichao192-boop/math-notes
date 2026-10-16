# Convergence and Limit Theorems

This chapter organizes the principal notions of convergence for random
variables and records the limit theorems that connect them. We begin with
almost-sure, probabilistic, and norm convergence, then establish their basic
implications and probability bounds. Truncation proves the weak law, while
maximal inequalities and convergence of random series lead to the strong law.
The chapter concludes with the central limit theorem.

## Modes of Convergence

!!! definition "Definition (Almost-sure, probability, and $L^p$ convergence)"
    <a id="def-modes-of-convergence"></a>
    Let $X,X_1,X_2,\ldots$ be random variables on
    $(\Omega,\mathcal{F},\mathbb{P})$.

    1. $X_n$ **converges almost surely** to $X$, written
       $X_n\to X$ a.s., if

        $$
        \mathbb{P}\bigl(\{\omega:X_n(\omega)\to X(\omega)\}\bigr)=1.
        $$

    2. $X_n$ **converges in probability** to $X$, written
       $X_n\xrightarrow{\mathbb{P}}X$, if, for every $\varepsilon>0$,

        $$
        \mathbb{P}(|X_n-X|>\varepsilon)\longrightarrow0.
        $$

    3. For $1\leq p<\infty$ and $X_n,X\in L^p$, $X_n$ **converges in $L^p$** to $X$ if

        $$
        \lVert X_n-X\rVert_p
        =\bigl(\mathbb{E}|X_n-X|^p\bigr)^{1/p}\longrightarrow0.
        $$

    4. For $X_n,X\in L^\infty$, $X_n$ **converges in $L^\infty$** to $X$ if
       $\lVert X_n-X\rVert_\infty\to0$, where
       $\lVert\cdot\rVert_\infty$ is the essential-supremum norm.

    More generally, for measurable $f_n,f:\Omega\to\mathbb{R}$ on a measure
    space $(\Omega,\mathcal{F},\mu)$, the same
    pointwise condition outside a $\mu$-null set is called convergence
    **almost everywhere**, and
    $\mu(|f_n-f|>\varepsilon)\to0$ is called convergence **in measure**.

    On this measure space, the corresponding norm definitions are

    $$
    \lVert f\rVert_{L^p(\mu)}
    :=\left(\int_\Omega |f|^p\,d\mu\right)^{1/p},
    \qquad
    \lVert f\rVert_{L^\infty(\mu)}
    :=\operatorname*{ess\,sup}_{\omega\in\Omega}|f(\omega)|.
    $$

    Thus $f_n\to f$ in $L^p(\mu)$ means that $f_n,f\in L^p(\mu)$ and
    $\lVert f_n-f\rVert_{L^p(\mu)}\to0$, with the same convention for
    $p=\infty$.

!!! definition "Definition (Convergence in distribution)"
    <a id="def-convergence-in-distribution"></a>
    Let $F_n$ and $F$ be the distribution functions of $X_n$ and $X$.
    We say that $X_n$ **converges in distribution**, or **in law**, to $X$,
    written $X_n\Rightarrow X$, if

    $$
    F_n(x)\longrightarrow F(x)
    $$

    at every continuity point $x$ of $F$. This is also called **weak
    convergence** of the distributions.

!!! proposition "Proposition (Relations among modes of convergence)"
    <a id="prop-relations-convergence-modes"></a>
    Let $1\leq p<\infty$.

    1. Almost-sure convergence implies convergence in probability.
    2. Convergence in $L^p$ implies convergence in probability.
    3. If $X_n\xrightarrow{\mathbb{P}}X$, then some subsequence converges to
       $X$ almost surely.

??? proof "Proof"
    Suppose $X_n\to X$ almost surely and fix $\varepsilon>0$. Put

    $$
    B_m:=\bigcup_{n\geq m}\{|X_n-X|>\varepsilon\}.
    $$

    Then $B_m\downarrow B$, where $B$ is contained in the null event on
    which convergence fails. Continuity of probability gives
    $\mathbb{P}(B_m)\downarrow0$, and
    $\{|X_m-X|>\varepsilon\}\subseteq B_m$ proves convergence in probability.

    If $X_n\to X$ in $L^p$, then

    $$
    \mathbb{P}(|X_n-X|>\varepsilon)
    \leq\frac{\mathbb{E}|X_n-X|^p}{\varepsilon^p}
    \longrightarrow0.
    $$

    Finally, suppose $X_n\xrightarrow{\mathbb{P}}X$. Choose inductively
    $n_k>n_{k-1}$ such that

    $$
    \mathbb{P}(|X_{n_k}-X|>2^{-k})\leq2^{-k}.
    $$

    The sum of these probabilities is finite, so the first Borel--Cantelli
    lemma implies that only finitely many of the displayed events occur
    almost surely. Hence $X_{n_k}\to X$ almost surely.

!!! theorem "Theorem (Dominated convergence)"
    <a id="thm-dominated-convergence"></a>
    Suppose $Z_n\to Z$ almost surely and $|Z_n|\leq W$ almost surely for
    every $n$, where $W\geq0$ and $\mathbb{E}W<\infty$. Then $Z_n,Z$ are
    integrable and

    $$
    \mathbb{E}|Z_n-Z|\longrightarrow0,
    \qquad
    \mathbb{E}Z_n\longrightarrow\mathbb{E}Z.
    $$

??? proof "Proof"
    Outside a common null set, $|Z|\leq W$ and
    $H_m:=\sup_{n\geq m}|Z_n-Z|$ decreases to zero with $0\leq H_m\leq2W$.
    Monotone convergence applied to $2W-H_m\uparrow2W$ gives
    $\mathbb{E}H_m\downarrow0$. Consequently,

    $$
    |\mathbb{E}Z_n-\mathbb{E}Z|
    \leq\mathbb{E}|Z_n-Z|
    \leq\mathbb{E}H_n\longrightarrow0.
    $$

## Probability Bounds

!!! proposition "Proposition (Markov's inequality)"
    <a id="prop-markov-inequality"></a>
    If $p\geq1$, $\delta>0$, and $\mathbb{E}|X|^p<\infty$, then

    $$
    \mathbb{P}(|X|>\delta)
    \leq\frac{\mathbb{E}|X|^p}{\delta^p}.
    $$

??? proof "Proof"
    On the event $\{|X|>\delta\}$ one has $|X|^p\geq\delta^p$. Therefore

    $$
    \mathbb{E}|X|^p
    \geq\mathbb{E}\bigl[|X|^p
      \mathbf{1}_{\{|X|>\delta\}}\bigr]
    \geq\delta^p\mathbb{P}(|X|>\delta),
    $$

    and division by $\delta^p$ proves the claim.

!!! remark "Remark (Nonnegative form of Markov's inequality)"
    <a id="rem-markov-nonnegative"></a>
    For a nonnegative random variable $Z$ and $\delta>0$,

    $$
    \mathbb{P}(Z>\delta)\leq\frac{\mathbb{E}Z}{\delta}.
    $$

    Indeed, $Z\geq\delta\mathbf{1}_{\{Z>\delta\}}$, and taking expectations
    proves the estimate. Thus a small expectation controls the probability
    of exceeding any fixed positive threshold.

!!! corollary "Corollary (Chebyshev's inequality)"
    <a id="cor-chebyshev-inequality"></a>
    If $X$ is square-integrable and $\delta>0$, then

    $$
    \mathbb{P}(|X-\mathbb{E}X|>\delta)
    \leq\frac{\operatorname{Var}(X)}{\delta^2}.
    $$

??? proof "Proof"
    Apply [Proposition](#prop-markov-inequality) with $p=2$ to
    $X-\mathbb{E}X$.

## Laws of Large Numbers

### Weak Law

!!! theorem "Theorem (Weak law of large numbers)"
    <a id="thm-weak-law-large-numbers"></a>
    Let $X_1,X_2,\ldots$ be independent and identically distributed with
    $\mathbb{E}|X_1|<\infty$, and put $\mu=\mathbb{E}X_1$. Then

    $$
    \frac1n\sum_{i=1}^nX_i\xrightarrow{\mathbb{P}}\mu.
    $$

??? proof "Proof"
    Write $\overline{X}_n=n^{-1}\sum_{i=1}^nX_i$. For $M>0$, set

    $$
    Y_i=X_i\mathbf{1}_{\{|X_i|\leq M\}},
    \qquad
    \overline{Y}_n=\frac1n\sum_{i=1}^nY_i,
    \qquad
    a_M=\mathbb{E}\bigl[|X_1|\mathbf{1}_{\{|X_1|>M\}}\bigr].
    $$

    By [Theorem](#thm-dominated-convergence), $a_M\to0$ as $M\to\infty$.
    The triangle inequality and identical distribution give

    $$
    \mathbb{E}|\overline{X}_n-\overline{Y}_n|\leq a_M,
    \qquad
    |\mathbb{E}Y_1-\mu|\leq a_M.
    $$

    The $Y_i$ are independent and identically distributed with $|Y_i|\leq M$.
    Cauchy--Schwarz and the variance formula in
    [Proposition](random-vectors-and-lp-estimates.md#prop-variance-sum-independent)
    therefore yield

    $$
    \mathbb{E}|\overline{Y}_n-\mathbb{E}Y_1|
    \leq\sqrt{\operatorname{Var}(\overline{Y}_n)}
    =\sqrt{\frac{\operatorname{Var}(Y_1)}n}
    \leq\frac{M}{\sqrt n}.
    $$

    Combining the three bounds,

    $$
    \mathbb{E}|\overline{X}_n-\mu|
    \leq2a_M+\frac{M}{\sqrt n}.
    $$

    For fixed $M$, the second term tends to zero. Hence
    $\limsup_n\mathbb{E}|\overline{X}_n-\mu|\leq2a_M$; letting $M\to\infty$
    proves convergence in $L^1$. Finally, Markov's inequality gives

    $$
    \mathbb{P}(|\overline{X}_n-\mu|>\varepsilon)
    \leq\frac{\mathbb{E}|\overline{X}_n-\mu|}{\varepsilon}
    \longrightarrow0.
    $$

??? proof "Proof (Weak law from the strong law)"
    The strong law proved below also gives a second proof of the weak law:
    almost-sure convergence implies convergence in probability by
    [Proposition](#prop-relations-convergence-modes).

!!! remark "Remark (Finite-variance proof of the weak law)"
    <a id="rem-weak-law-finite-variance"></a>
    If additionally $\operatorname{Var}(X_1)=\sigma^2<\infty$, then

    $$
    \mathbb{E}\overline{X}_n=\mu,
    \qquad
    \operatorname{Var}(\overline{X}_n)
    =\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)
    =\frac{\sigma^2}{n}.
    $$

    Independence and Markov's inequality with $p=2$, equivalently
    [Corollary](#cor-chebyshev-inequality), give

    $$
    \mathbb{P}\left(
      \left|\frac1n\sum_{i=1}^nX_i-\mu\right|>\varepsilon
    \right)
    \leq\frac{\sigma^2}{n\varepsilon^2}
    \longrightarrow0.
    $$

### Strong Law

!!! lemma "Lemma (Cesàro)"
    <a id="lem-cesaro"></a>
    If a real sequence $a_n$ converges to $a$, then

    $$
    \frac1n\sum_{k=1}^na_k\longrightarrow a.
    $$

??? proof "Proof"
    Given $\varepsilon>0$, choose $N$ such that $|a_k-a|<\varepsilon$ for
    $k\geq N$. For $n\geq N$,

    $$
    \left|\frac1n\sum_{k=1}^na_k-a\right|
    \leq\frac1n\sum_{k=1}^{N-1}|a_k-a|+\varepsilon.
    $$

    The finite sum divided by $n$ tends to zero. Taking a limsup and then
    letting $\varepsilon\downarrow0$ proves the assertion.

!!! proposition "Proposition (Kolmogorov's maximal inequality)"
    <a id="prop-kolmogorov-maximal"></a>
    Let $Y_1,\ldots,Y_n$ be independent with $\mathbb{E}Y_i=0$ and
    $\operatorname{Var}(Y_i)<\infty$. Put $S_k=\sum_{i=1}^kY_i$. For
    $\lambda>0$,

    $$
    \mathbb{P}\left(\max_{1\leq k\leq n}|S_k|\geq\lambda\right)
    \leq\frac{\operatorname{Var}(S_n)}{\lambda^2}.
    $$

??? proof "Proof"
    Let

    $$
    A_k=\{|S_j|<\lambda\text{ for }j<k,\ |S_k|\geq\lambda\},
    \qquad 1\leq k\leq n.
    $$

    These events are disjoint and their union is
    $\{\max_{1\leq k\leq n}|S_k|\geq\lambda\}$. The event $A_k$ and $S_k$
    are measurable with respect to $\mathcal{F}_k=\sigma(Y_1,\ldots,Y_k)$.
    The increment $S_n-S_k$ is independent of $\mathcal{F}_k$ and has mean
    zero, so the cross term vanishes in the following expansion:

    $$
    \begin{aligned}
    \mathbb{E}[S_n^2\mathbf{1}_{A_k}]
    &=\mathbb{E}[S_k^2\mathbf{1}_{A_k}]
      +\mathbb{E}[(S_n-S_k)^2\mathbf{1}_{A_k}]\\
    &\geq\lambda^2\mathbb{P}(A_k).
    \end{aligned}
    $$

    Summing over $k$ and using disjointness,

    $$
    \operatorname{Var}(S_n)=\mathbb{E}S_n^2
    \geq\sum_{k=1}^n\mathbb{E}[S_n^2\mathbf{1}_{A_k}]
    \geq\lambda^2
      \mathbb{P}\left(\max_{1\leq k\leq n}|S_k|\geq\lambda\right).
    $$

!!! proposition "Proposition (Kolmogorov's convergence criterion)"
    <a id="prop-kolmogorov-convergence"></a>
    Let $Z_1,Z_2,\ldots$ be independent with $\mathbb{E}Z_n=0$ and
    $\sum_{n=1}^\infty\operatorname{Var}(Z_n)<\infty$. Then
    $\sum_{n=1}^\infty Z_n$ converges almost surely.

??? proof "Proof"
    For $m\leq n$, [Proposition](#prop-kolmogorov-maximal) applied to
    $Z_m,\ldots,Z_n$ gives

    $$
    \mathbb{P}\left(
      \max_{m\leq k\leq n}
      \left|\sum_{j=m}^k Z_j\right|>\varepsilon
    \right)
    \leq\frac1{\varepsilon^2}\sum_{j=m}^n\operatorname{Var}(Z_j).
    $$

    Letting $n\to\infty$ and using continuity of probability,

    $$
    \mathbb{P}\left(
      \sup_{k\geq m}\left|\sum_{j=m}^k Z_j\right|>\varepsilon
    \right)
    \leq\frac1{\varepsilon^2}\sum_{j=m}^\infty\operatorname{Var}(Z_j).
    $$

    Choose increasing integers $n_r$ with
    $\sum_{j=n_r}^\infty\operatorname{Var}(Z_j)\leq2^{-r}$. For each fixed
    $\varepsilon>0$, the probabilities in the last display with $m=n_r$
    are summable. By the first Borel--Cantelli lemma in
    [Theorem](lesson1.md#thm-1-5-4), almost surely, for all sufficiently
    large $r$,

    $$
    \sup_{k\geq n_r}\left|\sum_{j=n_r}^k Z_j\right|\leq\varepsilon.
    $$

    Intersect these probability-one events for
    $\varepsilon=1,1/2,1/3,\ldots$. For $n_r\leq u<v$, the difference
    between the $u$-th and $v$-th partial sums is then bounded by
    $2\varepsilon$, since both are within $\varepsilon$ of the
    $(n_r-1)$-st partial sum. Thus the partial sums are almost surely
    Cauchy, and hence converge.

!!! lemma "Lemma (Kronecker)"
    <a id="lem-kronecker"></a>
    If $\sum_{n=1}^\infty a_n/n$ converges for a real sequence $(a_n)$, then

    $$
    \frac1n\sum_{k=1}^na_k\longrightarrow0.
    $$

??? proof "Proof"
    Put $b_0=0$ and $b_n=\sum_{k=1}^n a_k/k$. Since
    $a_k=k(b_k-b_{k-1})$, summation by parts gives

    $$
    \frac1n\sum_{k=1}^na_k
    =b_n-\frac1n\sum_{k=1}^{n-1}b_k\longrightarrow0
    $$

    by [Lemma](#lem-cesaro), because $b_n$ converges.

!!! theorem "Theorem (Strong law of large numbers)"
    <a id="thm-strong-law-large-numbers"></a>
    Let $X_1,X_2,\ldots$ be independent and identically distributed with
    $\mathbb{E}|X_1|<\infty$, and put $\mu=\mathbb{E}X_1$. Then

    $$
    \frac1n\sum_{i=1}^nX_i\longrightarrow\mu
    \qquad\text{almost surely}.
    $$

??? idea "Idea"
    A proof under the optimal assumption $\mathbb{E}|X_1|<\infty$ first
    truncates the variables at a level of order $n$. Borel--Cantelli controls
    the discarded tails, while a maximal inequality controls the centered
    truncated sums. Summation by parts then removes the truncation and yields
    the almost-sure limit.

??? proof "Proof"
    Replacing $X_i$ by $X_i-\mu$, it suffices to prove the centered case
    $\mu=0$. Set $Y_i=X_i\mathbf{1}_{\{|X_i|\leq i\}}$. By identical
    distribution and Tonelli's theorem,

    $$
    \sum_{i=1}^\infty\mathbb{P}(X_i\neq Y_i)
    =\sum_{i=1}^\infty\mathbb{P}(|X_1|>i)
    =\mathbb{E}\sum_{i=1}^\infty\mathbf{1}_{\{|X_1|>i\}}
    \leq\mathbb{E}|X_1|<\infty.
    $$

    The first Borel--Cantelli lemma therefore gives $X_i=Y_i$ eventually
    almost surely.

    Put $Z_i=Y_i-\mathbb{E}Y_i$. These variables are independent and centered.
    Again by identical distribution and Tonelli,

    $$
    \begin{aligned}
    \sum_{i=1}^\infty\frac{\operatorname{Var}(Z_i)}{i^2}
    &\leq\sum_{i=1}^\infty
      \frac{\mathbb{E}[X_1^2\mathbf{1}_{\{|X_1|\leq i\}}]}{i^2}\\
    &=\mathbb{E}\left[
      X_1^2\sum_{\substack{i\geq1\\i\geq|X_1|}}\frac1{i^2}
      \right]<\infty.
    \end{aligned}
    $$

    Indeed, for $t\geq1$,
    $\sum_{i\geq1,\ i\geq t}i^{-2}\leq2/t$. For $0\leq t<1$,
    $t^2\sum_{i=1}^\infty i^{-2}\leq2t$. Thus the random variable inside
    the expectation is bounded by $2|X_1|$.

    Apply [Proposition](#prop-kolmogorov-convergence) to $Z_i/i$, and then
    [Lemma](#lem-kronecker), to obtain

    $$
    \sum_{i=1}^\infty\frac{Z_i}{i}
    \text{ converges almost surely},
    \qquad
    \frac1n\sum_{i=1}^n(Y_i-\mathbb{E}Y_i)\longrightarrow0
    \quad\text{almost surely}.
    $$

    Moreover, [Theorem](#thm-dominated-convergence) gives
    $\mathbb{E}Y_i=\mathbb{E}[X_1\mathbf{1}_{\{|X_1|\leq i\}}]\to0$.
    By [Lemma](#lem-cesaro), $n^{-1}\sum_{i=1}^n\mathbb{E}Y_i\to0$.
    Since $X_i=Y_i$ eventually almost surely,

    $$
    \frac1n\sum_{i=1}^nX_i
    =\frac1n\sum_{i=1}^n(Y_i-\mathbb{E}Y_i)
      +\frac1n\sum_{i=1}^n\mathbb{E}Y_i+o(1)
    \longrightarrow0
    \quad\text{almost surely}.
    $$

## Central Limit Theorem

!!! theorem "Theorem (Central limit theorem)"
    <a id="thm-central-limit-theorem"></a>
    Let $X_1,X_2,\ldots$ be independent and identically distributed with
    mean $\mu$ and variance $\sigma^2<\infty$. Then

    $$
    \frac1{\sqrt{n}}\sum_{i=1}^n(X_i-\mu)
    \Rightarrow\mathcal{N}(0,\sigma^2).
    $$

    If $\sigma>0$, equivalently,

    $$
    \frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt{n}}
    \Rightarrow\mathcal{N}(0,1).
    $$

??? idea "Idea"
    After centering and scaling, the characteristic function of the sum is
    the $n$-th power of the characteristic function of one summand. The
    finite-variance expansion at the origin gives
    $\varphi(t)=1-t^2/2+o(t^2)$ in the standardized case, and hence
    $\varphi(t/\sqrt{n})^n\to e^{-t^2/2}$. The continuity theorem for
    characteristic functions identifies the limit as $\mathcal{N}(0,1)$.
