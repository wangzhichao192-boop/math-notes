# Foundations of Probability

## Probability Spaces and Random Variables

!!! definition "Definition (Sample space and outcome)"
    <a id="def-1-1-1"></a>
    The set of all possible outcomes of a random experiment is the **sample
    space**, denoted by $\Omega$. Each element $\omega \in \Omega$ is an
    **outcome**, or **sample point**.

!!! example "Example (Coin tosses)"
    <a id="ex-1-1-2"></a>
    For one coin toss, a natural sample space is

    $$
    \Omega = \{H,T\}.
    $$

    For two coin tosses, take

    $$
    \Omega = \{HH,HT,TH,TT\}.
    $$

!!! definition "Definition (Sigma-algebra and measurable space)"
    <a id="def-1-1-3"></a>
    A collection $\mathcal{F}$ of subsets of $\Omega$ is a **sigma-algebra**
    on $\Omega$ if

    1. $\varnothing \in \mathcal{F}$;
    2. $A_1,A_2,\ldots \in \mathcal{F}$ implies
       $\bigcup_{n=1}^{\infty} A_n \in \mathcal{F}$;
    3. $A \in \mathcal{F}$ implies $A^c \in \mathcal{F}$.

    A set $A \in \mathcal{F}$ is a **measurable event**, and
    $(\Omega,\mathcal{F})$ is a **measurable space**.

!!! example "Example (Sigma-algebras as information)"
    <a id="ex-1-1-4"></a>
    Let $\Omega=\{HH,HT,TH,TT\}$. Each of the following is a sigma-algebra:

    + $\{\varnothing,\Omega\}$;
    + $2^\Omega$, the power set of $\Omega$;
    + $\{\varnothing,\Omega,\{HH\},\{HT,TH,TT\}\}$;
    + $\{\varnothing,\Omega,\{HH,HT\},\{TH,TT\}\}$.

    The last sigma-algebra records only whether the first toss is heads. In
    general, a sigma-algebra specifies which distinctions between outcomes
    are observable.

!!! proposition "Proposition (Closure under countable intersections)"
    <a id="prop-1-1-5"></a>
    If $\mathcal{F}$ is a sigma-algebra and $A_1,A_2,\ldots\in\mathcal{F}$,
    then $\bigcap_{n=1}^{\infty}A_n\in\mathcal{F}$.

??? proof "Proof"
    By De Morgan's law,

    $$
    \bigcap_{n=1}^{\infty} A_n
    = \left(\bigcup_{n=1}^{\infty} A_n^c\right)^c.
    $$

    Each $A_n^c$ belongs to $\mathcal{F}$, so closure under countable unions
    and complements gives the result.

!!! proposition "Proposition (Cardinality of a finite sigma-algebra)"
    <a id="prop-1-1-6"></a>
    Let $\mathcal{F}$ be a sigma-algebra on a finite sample space $\Omega$.
    Then $|\mathcal{F}|=2^k$ for some integer $1\leq k\leq |\Omega|$.

??? proof "Proof"
    Let $B_1,\ldots,B_k$ be the minimal nonempty elements of $\mathcal{F}$.
    They are pairwise disjoint and form a partition of $\Omega$. Every member
    of $\mathcal{F}$ is a union of some of the $B_i$, and every such union
    belongs to $\mathcal{F}$. Therefore

    $$
    \mathcal{F}
    = \left\{\bigcup_{i\in I}B_i : I\subseteq\{1,\ldots,k\}\right\},
    $$

    and hence $|\mathcal{F}|=2^k$.

!!! definition "Definition (Probability space)"
    <a id="def-1-2-1"></a>
    A **probability measure** on a measurable space
    $(\Omega,\mathcal{F})$ is a function
    $\mathbb{P}:\mathcal{F}\to[0,1]$ such that

    1. $\mathbb{P}(\Omega)=1$;
    2. if $A_1,A_2,\ldots\in\mathcal{F}$ are pairwise disjoint, then
       $\mathbb{P}(\bigcup_{n=1}^{\infty}A_n) =\sum_{n=1}^{\infty}\mathbb{P}(A_n)$.

    The triple $(\Omega,\mathcal{F},\mathbb{P})$ is a **probability space**.

!!! proposition "Proposition (Elementary identities)"
    <a id="prop-1-2-2"></a>
    Let $A,B\in\mathcal{F}$. Then

    1. $\mathbb{P}(\varnothing)=0$;
    2. $\mathbb{P}(A^c)=1-\mathbb{P}(A)$;
    3. $\mathbb{P}(A\cup B)=\mathbb{P}(A)+\mathbb{P}(B)
       -\mathbb{P}(A\cap B)$.

??? proof "Proof"
    Since $\varnothing$ and $\Omega$ are disjoint,
    $\mathbb{P}(\varnothing\cup\Omega)
    =\mathbb{P}(\varnothing)+\mathbb{P}(\Omega)$, which gives (1).
    The disjoint decomposition $\Omega=A\sqcup A^c$ gives (2). Finally,
    write $A\cup B=A\sqcup(B\setminus A)$ and
    $B=(B\setminus A)\sqcup(A\cap B)$, then eliminate
    $\mathbb{P}(B\setminus A)$ to obtain (3).

!!! proposition "Proposition (Continuity of probability)"
    <a id="prop-1-2-3"></a>
    Let $(A_n)_{n\geq1}$ and $(B_n)_{n\geq1}$ be sequences of events.

    1. If $A_1\subseteq A_2\subseteq\cdots$, then
       $\mathbb{P}(A_n)\uparrow
       \mathbb{P}(\bigcup_{k=1}^{\infty}A_k)$.
    2. If $B_1\supseteq B_2\supseteq\cdots$, then
       $\mathbb{P}(B_n)\downarrow
       \mathbb{P}(\bigcap_{k=1}^{\infty}B_k)$.

??? proof "Proof"
    For (1), set $A_0=\varnothing$ and
    $C_k=A_k\setminus A_{k-1}$. The events $C_k$ are pairwise disjoint,
    $A_n=\bigsqcup_{k=1}^{n}C_k$, and
    $\bigcup_{k=1}^{\infty}A_k=\bigsqcup_{k=1}^{\infty}C_k$. Hence

    $$
    \mathbb{P}\left(\bigcup_{k=1}^{\infty}A_k\right)
    =\sum_{k=1}^{\infty}\mathbb{P}(C_k)
    =\lim_{n\to\infty}\mathbb{P}(A_n).
    $$

    For (2), apply (1) to the increasing sequence $(B_n^c)$ and use De
    Morgan's law together with
    $\mathbb{P}(B_n)=1-\mathbb{P}(B_n^c)$.

!!! definition "Definition (Limsup and liminf of real sequences)"
    <a id="def-1-3-1"></a>
    For a real sequence $(a_n)_{n\geq1}$, define

    $$
    \limsup_{n\to\infty}a_n
    :=\inf_{n\geq1}\sup_{k\geq n}a_k,
    \qquad
    \liminf_{n\to\infty}a_n
    :=\sup_{n\geq1}\inf_{k\geq n}a_k.
    $$

    Thus the limsup is the limit of the decreasing tail suprema, while the
    liminf is the limit of the increasing tail infima.

!!! definition "Definition (Limsup and liminf of events)"
    <a id="def-1-3-2"></a>
    For a sequence of events $(A_n)_{n\geq1}$, define

    $$
    \limsup_{n\to\infty}A_n
    :=\bigcap_{n=1}^{\infty}\bigcup_{k\geq n}A_k,
    \qquad
    \liminf_{n\to\infty}A_n
    :=\bigcup_{n=1}^{\infty}\bigcap_{k\geq n}A_k.
    $$

    A point lies in $\limsup A_n$ exactly when it belongs to infinitely many
    $A_n$, and it lies in $\liminf A_n$ exactly when it belongs to all but
    finitely many $A_n$. In particular,
    $\liminf A_n\subseteq\limsup A_n$.

!!! definition "Definition (Conditional probability)"
    <a id="def-1-4-1"></a>
    Let $A,B\in\mathcal{F}$ with $\mathbb{P}(B)>0$. The **conditional
    probability of $A$ given $B$** is

    $$
    \mathbb{P}(A\mid B)
    :=\frac{\mathbb{P}(A\cap B)}{\mathbb{P}(B)}.
    $$

!!! proposition "Proposition (Law of total probability)"
    <a id="prop-1-4-2"></a>
    Let $B_1,B_2,\ldots$ be pairwise disjoint events such that
    $\bigcup_k B_k=\Omega$ and $\mathbb{P}(B_k)>0$ for every $k$. Then, for
    every event $A$,

    $$
    \mathbb{P}(A)
    =\sum_k\mathbb{P}(A\mid B_k)\mathbb{P}(B_k).
    $$

??? proof "Proof"
    The events $A\cap B_k$ are pairwise disjoint and their union is $A$.
    Countable additivity and the definition of conditional probability give

    $$
    \mathbb{P}(A)
    =\sum_k\mathbb{P}(A\cap B_k)
    =\sum_k\mathbb{P}(A\mid B_k)\mathbb{P}(B_k).
    $$

!!! definition "Definition (Independent events)"
    <a id="def-1-5-1"></a>
    Two events $A$ and $B$ are **independent** if
    $\mathbb{P}(A\cap B)=\mathbb{P}(A)\mathbb{P}(B)$. A sequence
    $(A_k)_{k\geq1}$ is **independent** if every finite collection of distinct
    indices $k_1,\ldots,k_m$ satisfies

    $$
    \mathbb{P}\left(\bigcap_{j=1}^{m}A_{k_j}\right)
    =\prod_{j=1}^{m}\mathbb{P}(A_{k_j}).
    $$

!!! remark "Remark (Pairwise versus mutual independence)"
    <a id="rem-1-5-2"></a>
    Pairwise independence does not imply mutual independence. For two fair
    coin tosses, let $A$ be the event that the first toss is heads, $B$ the
    event that the second toss is heads, and $C$ the event that the two tosses
    agree. These events are pairwise independent, but
    $\mathbb{P}(A\cap B\cap C)=1/4\neq1/8$.

!!! remark "Remark (Infinitely often)"
    <a id="rem-1-5-3"></a>
    The event $\limsup_{k\to\infty}A_k$ is the event that infinitely many of
    the $A_k$ occur. It is often denoted by $\{A_k\ \mathrm{i.o.}\}$.

!!! theorem "Theorem (Borel-Cantelli lemmas)"
    <a id="thm-1-5-4"></a>
    Let $(A_k)_{k\geq1}$ be a sequence of events.

    1. If $\sum_{k=1}^{\infty}\mathbb{P}(A_k)<\infty$, then
       $\mathbb{P}(\limsup_{k\to\infty}A_k)=0$.
    2. If $\sum_{k=1}^{\infty}\mathbb{P}(A_k)=\infty$ and the events are
       independent, then
       $\mathbb{P}(\limsup_{k\to\infty}A_k)=1$.

??? proof "Proof"
    For every $n$,
    $\limsup_{k\to\infty}A_k\subseteq\bigcup_{k\geq n}A_k$. Therefore

    $$
    0\leq
    \mathbb{P}\left(\limsup_{k\to\infty}A_k\right)
    \leq\sum_{k=n}^{\infty}\mathbb{P}(A_k).
    $$

    Under the hypothesis of (1), the tail sum tends to zero.

    For (2), independence and $1-x\leq e^{-x}$ give, for $m\geq n$,

    $$
    \mathbb{P}\left(\bigcap_{k=n}^{m}A_k^c\right)
    =\prod_{k=n}^{m}\bigl(1-\mathbb{P}(A_k)\bigr)
    \leq\exp\left(-\sum_{k=n}^{m}\mathbb{P}(A_k)\right).
    $$

    Letting $m\to\infty$ shows that
    $\mathbb{P}(\bigcap_{k=n}^{\infty}A_k^c)=0$ for every $n$. Since the
    complement of $\limsup A_k$ is
    $\bigcup_{n=1}^{\infty}\bigcap_{k=n}^{\infty}A_k^c$, it has probability
    zero.

!!! example "Example (Gambler's ruin)"
    <a id="ex-1-6-1"></a>
    Consider a random walk on $\{0,1,\ldots,N\}$. From an interior state $k$,
    it moves to $k+1$ with probability $p$ and to $k-1$ with probability
    $q=1-p$. Let
    $\rho_k:=\mathbb{P}(\text{hit }N\text{ before }0\mid\text{start at }k)$.
    Then $\rho_0=0$, $\rho_N=1$, and conditioning on the first step gives

    $$
    \rho_k=p\rho_{k+1}+q\rho_{k-1},
    \qquad 1\leq k\leq N-1.
    $$

    Hence
    $\rho_{k+1}-\rho_k=(q/p)(\rho_k-\rho_{k-1})$. Summing the resulting
    geometric progression and using the boundary values yields

    $$
    \rho_k=
    \begin{cases}
    \dfrac{k}{N}, & p=q=\dfrac12,\\[1.2ex]
    \dfrac{1-(q/p)^k}{1-(q/p)^N}, & p\neq q.
    \end{cases}
    $$

!!! definition "Definition (Random variable)"
    <a id="def-1-7-1"></a>
    A **random variable** on $(\Omega,\mathcal{F},\mathbb{P})$ is a function
    $X:\Omega\to\mathbb{R}$ such that $X^{-1}(A)\in\mathcal{F}$ for every open
    set $A\subseteq\mathbb{R}$. Equivalently, $X$ is
    $\mathcal{F}$-measurable.

!!! example "Example (Information generated by coin-toss variables)"
    <a id="ex-1-7-2"></a>
    Let $\Omega=\{HH,HT,TH,TT\}$. Define $X_1,X_2:\Omega\to\mathbb{R}$ by
    assigning $1$ to heads and $-1$ to tails on the first and second toss,
    respectively, and let $X=X_1+X_2$. The smallest sigma-algebras making
    these variables measurable are

    $$
    \begin{aligned}
    \sigma(X_1)&=\sigma\bigl(\{HH,HT\},\{TH,TT\}\bigr),\\
    \sigma(X_2)&=\sigma\bigl(\{HH,TH\},\{HT,TT\}\bigr),\\
    \sigma(X)&=\sigma\bigl(\{HH\},\{HT,TH\},\{TT\}\bigr).
    \end{aligned}
    $$

!!! example "Example (A measurable and a non-measurable function)"
    <a id="ex-1-7-3"></a>
    Let $\Omega=\{1,2,3,4,5,6\}$ and let $\mathcal{F}$ be generated by the
    partition into odd and even integers. The function $X_1(k)=-k$ is not
    $\mathcal{F}$-measurable, whereas

    $$
    X_2(k)=
    \begin{cases}
    1, & k\text{ is odd},\\
    2, & k\text{ is even}
    \end{cases}
    $$

    is $\mathcal{F}$-measurable.

## Distributions

!!! definition "Definition (Bernoulli and binomial distributions)"
    <a id="def-1-8-1"></a>
    Let $p\in[0,1]$.

    + $X$ has the **Bernoulli distribution** with parameter $p$, written
      $X\sim\operatorname{Ber}(p)$, if
      $\mathbb{P}(X=1)=p$ and $\mathbb{P}(X=0)=1-p$.
    + For $n\in\mathbb{N}_{>0}$, $X$ has the **binomial distribution** with
      parameters $(n,p)$, written $X\sim\operatorname{Bin}(n,p)$, if
      $\mathbb{P}(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ for
      $k=0,\ldots,n$.

!!! remark "Remark (Poisson approximation)"
    <a id="rem-1-8-2"></a>
    If $p=\lambda/n$ with $\lambda>0$, then for each fixed $k$,

    $$
    \binom{n}{k}\left(\frac{\lambda}{n}\right)^k
    \left(1-\frac{\lambda}{n}\right)^{n-k}
    \longrightarrow e^{-\lambda}\frac{\lambda^k}{k!}.
    $$

    Thus a binomial distribution with many trials and small success
    probability is approximated by a Poisson distribution when $np$ remains
    fixed.

!!! definition "Definition (Poisson and geometric distributions)"
    <a id="def-1-8-3"></a>
    Let $\lambda>0$ and $p\in(0,1]$.

    + $X$ has the **Poisson distribution** with parameter $\lambda$, written
      $X\sim\operatorname{Pois}(\lambda)$, if
      $\mathbb{P}(X=k)=e^{-\lambda}\lambda^k/k!$ for
      $k=0,1,2,\ldots$.
    + $X$ has the **geometric distribution** with parameter $p$, written
      $X\sim\operatorname{Geo}(p)$, if
      $\mathbb{P}(X=k)=(1-p)^{k-1}p$ for $k\geq1$.

!!! proposition "Proposition (Tail of a geometric distribution)"
    <a id="prop-1-8-4"></a>
    If $X\sim\operatorname{Geo}(p)$, then
    $\mathbb{P}(X>n)=(1-p)^n$ for every $n\geq0$.

??? proof "Proof"
    Summing the geometric series gives

    $$
    \mathbb{P}(X>n)
    =\sum_{k=n+1}^{\infty}p(1-p)^{k-1}
    =(1-p)^n.
    $$

!!! proposition "Proposition (Memorylessness of the geometric distribution)"
    <a id="prop-1-8-5"></a>
    If $X\sim\operatorname{Geo}(p)$ with $0<p<1$, then for all $m,n\geq0$,

    $$
    \mathbb{P}(X>m+n\mid X>m)=\mathbb{P}(X>n).
    $$

??? proof "Proof"
    Since $\{X>m+n\}\subseteq\{X>m\}$, the geometric tail formula gives

    $$
    \mathbb{P}(X>m+n\mid X>m)
    =\frac{(1-p)^{m+n}}{(1-p)^m}
    =(1-p)^n.
    $$

!!! note "Exercise (Characterization of the geometric distribution)"
    Let $X$ be a positive integer-valued random variable such that
    $\mathbb{P}(X>m)>0$ and
    $\mathbb{P}(X>m+n\mid X>m)=\mathbb{P}(X>n)$ for all $m,n\geq0$.
    Show that $X\sim\operatorname{Geo}(p)$ for some $p\in(0,1)$.

!!! remark "Remark (Stirling's formula)"
    <a id="rem-1-8-6"></a>
    As $n\to\infty$,

    $$
    n!\sim\sqrt{2\pi n}\left(\frac{n}{e}\right)^n.
    $$

    Equivalently,
    $\log(n!)=n(\log n-1)+\tfrac12\log(2\pi n)+o(1)$, and in particular
    $\log(n!)/(n\log n)\to1$.

!!! definition "Definition (Distribution function)"
    <a id="def-1-9-1"></a>
    The **distribution function** of a random variable $X$ is
    $F:\mathbb{R}\to[0,1]$ defined by

    $$
    F(x):=\mathbb{P}(X\leq x).
    $$

    If $F$ is differentiable, its derivative $f=F'$ is the **probability
    density function** of $X$.

!!! proposition "Proposition (Right continuity of distribution functions)"
    <a id="prop-1-9-2"></a>
    Every distribution function is right-continuous.

??? proof "Proof"
    If $x_n\downarrow x$, then the events $\{X\leq x_n\}$ decrease to
    $\{X\leq x\}$. By continuity of probability from above,

    $$
    \lim_{n\to\infty}F(x_n)
    =\mathbb{P}\left(\bigcap_{n=1}^{\infty}\{X\leq x_n\}\right)
    =\mathbb{P}(X\leq x)=F(x).
    $$

!!! example "Example (Bernoulli distribution function)"
    <a id="ex-1-9-3"></a>
    If $X\sim\operatorname{Ber}(p)$, then

    $$
    F(x)=
    \begin{cases}
    0, & x<0,\\
    1-p, & 0\leq x<1,\\
    1, & x\geq1.
    \end{cases}
    $$

!!! remark "Remark (Probabilities from a density)"
    <a id="rem-1-9-4"></a>
    If $X$ has density $f$, then
    $\mathbb{P}(a<X<b)=F(b)-F(a)=\int_a^b f(x)\,dx$.

!!! definition "Definition (Uniform distribution)"
    <a id="def-1-9-5"></a>
    A random variable is **uniformly distributed** on $[a,b]$, written
    $X\sim\operatorname{Unif}[a,b]$, if it has density

    $$
    f(x)=
    \begin{cases}
    \dfrac{1}{b-a}, & x\in[a,b],\\[1ex]
    0, & \text{otherwise}.
    \end{cases}
    $$

!!! definition "Definition (Exponential distribution)"
    <a id="def-1-9-6"></a>
    Let $\lambda>0$. A random variable has the **exponential distribution**
    with parameter $\lambda$, written $X\sim\operatorname{Exp}(\lambda)$, if
    it has density

    $$
    f(x)=
    \begin{cases}
    \lambda e^{-\lambda x}, & x\geq0,\\
    0, & x<0.
    \end{cases}
    $$

!!! proposition "Proposition (Exponential tail)"
    <a id="prop-1-9-7"></a>
    If $X\sim\operatorname{Exp}(\lambda)$, then
    $\mathbb{P}(X>t)=e^{-\lambda t}$ for every $t\geq0$.

??? proof "Proof"
    Direct integration gives

    $$
    \mathbb{P}(X>t)
    =\int_t^{\infty}\lambda e^{-\lambda x}\,dx
    =e^{-\lambda t}.
    $$

!!! proposition "Proposition (Memorylessness of the exponential distribution)"
    <a id="prop-1-9-8"></a>
    If $X\sim\operatorname{Exp}(\lambda)$, then for $s,t\geq0$,

    $$
    \mathbb{P}(X>s+t\mid X>s)=\mathbb{P}(X>t).
    $$

??? proof "Proof"
    By the exponential tail formula,

    $$
    \mathbb{P}(X>s+t\mid X>s)
    =\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}
    =e^{-\lambda t}.
    $$

!!! note "Exercise (Characterization of the exponential distribution)"
    Let $X$ be a nonnegative random variable with a continuous distribution
    and $\mathbb{P}(X>s)>0$ for every $s\geq0$. Show that the memoryless
    identity
    $\mathbb{P}(X>s+t\mid X>s)=\mathbb{P}(X>t)$ for all $s,t\geq0$ forces
    $X\sim\operatorname{Exp}(\lambda)$ for some $\lambda>0$.

!!! definition "Definition (Normal distribution)"
    <a id="def-1-9-9"></a>
    A random variable has the **normal distribution** with parameters
    $\mu\in\mathbb{R}$ and $\sigma>0$, written
    $X\sim\mathcal{N}(\mu,\sigma^2)$, if it has density

    $$
    f(x)=\frac{1}{\sqrt{2\pi}\,\sigma}
    \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),
    \qquad x\in\mathbb{R}.
    $$

!!! proposition "Proposition (Gaussian integral)"
    <a id="prop-1-9-10"></a>
    The standard Gaussian density is normalized because

    $$
    \int_{\mathbb{R}}e^{-x^2/2}\,dx=\sqrt{2\pi}.
    $$

??? proof "Proof"
    Let $I=\int_{\mathbb{R}}e^{-x^2/2}\,dx$. By Tonelli's theorem and polar
    coordinates,

    $$
    I^2
    =\int_{\mathbb{R}^2}e^{-(x^2+y^2)/2}\,dx\,dy
    =\int_0^{2\pi}\int_0^{\infty}e^{-r^2/2}r\,dr\,d\theta
    =2\pi.
    $$

    Since $I>0$, it follows that $I=\sqrt{2\pi}$.

## Expectation, Variance, and Convexity Inequalities

!!! definition "Definition (Expectation)"
    <a id="def-1-10-1"></a>
    If $X$ is discrete with
    $\mathbb{P}(X=x_k)=p_k$ and $\sum_k p_k|x_k|<\infty$, define

    $$
    \mathbb{E}X:=\sum_k p_kx_k.
    $$

    If $X$ has density $f$ and
    $\int_{\mathbb{R}}|x|f(x)\,dx<\infty$, define

    $$
    \mathbb{E}X:=\int_{\mathbb{R}}xf(x)\,dx.
    $$

    More generally, for an integrable random variable on
    $(\Omega,\mathcal{F},\mathbb{P})$,
    $\mathbb{E}X=\int_\Omega X\,d\mathbb{P}$.

!!! definition "Definition (Variance)"
    <a id="def-1-10-2"></a>
    If $X$ is square-integrable, its **variance** is

    $$
    \operatorname{Var}(X)
    :=\mathbb{E}\bigl[(X-\mathbb{E}X)^2\bigr]
    =\mathbb{E}[X^2]-(\mathbb{E}X)^2.
    $$

!!! theorem "Theorem (Jensen's inequality)"
    <a id="thm-1-10-3"></a>
    Let $J:\mathbb{R}\to\mathbb{R}$ be convex. Whenever the expectations are
    finite,

    $$
    J(\mathbb{E}X)\leq\mathbb{E}[J(X)].
    $$

!!! example "Example (Power moments)"
    <a id="ex-1-10-4"></a>
    For $p\geq1$, the function $J(x)=|x|^p$ is convex. Jensen's inequality
    therefore gives

    $$
    |\mathbb{E}X|^p\leq\mathbb{E}|X|^p.
    $$

!!! theorem "Theorem (Hölder's inequality)"
    <a id="thm-1-10-5"></a>
    Let $p,q\in(1,\infty)$ satisfy $1/p+1/q=1$. If
    $\mathbb{E}|X|^p<\infty$ and $\mathbb{E}|Y|^q<\infty$, then

    $$
    |\mathbb{E}[XY]|
    \leq(\mathbb{E}|X|^p)^{1/p}(\mathbb{E}|Y|^q)^{1/q}.
    $$
