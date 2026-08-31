# 测度与可测函数

## $\sigma$-代数与测度

!!! definition "定义（$\sigma$-代数）"
    集合 $X$ 上的子集族 $\mathcal{M}$ 称为 $\sigma$-代数，若：

    1. $\varnothing \in \mathcal{M}$；
    2. $E \in \mathcal{M} \Rightarrow E^c \in \mathcal{M}$；
    3. $\{E_n\} \subseteq \mathcal{M} \Rightarrow \bigcup_{n=1}^{\infty} E_n \in \mathcal{M}$。

!!! definition "定义（测度）"
    测度 $\mu : \mathcal{M} \to [0, +\infty]$ 满足 $\mu(\varnothing) = 0$ 且可列可加：

    $$
    \mu\left(\bigcup_{n=1}^{\infty} E_n\right) = \sum_{n=1}^{\infty} \mu(E_n)
    \qquad(\{E_n\}\ \text{两两不交}).
    $$

$(X, \mathcal{M}, \mu)$ 称为**测度空间**。

## 可测函数

$f : X \to [-\infty, +\infty]$ 称为可测的，若

$$
\forall a \in \mathbb{R},\quad \{x : f(x) > a\} \in \mathcal{M}.
$$

## 积分三步构造

1. **特征函数**：$\displaystyle\int \chi_E\,\mathrm{d}\mu = \mu(E)$；
2. **简单函数**：线性延拓；
3. **一般非负可测函数**：

$$
\int f\,\mathrm{d}\mu = \sup\left\{ \int s\,\mathrm{d}\mu : 0 \le s \le f,\ s\ \text{为简单函数} \right\}.
$$

!!! theorem "定理"
    若 $f$ Riemann 可积，则 $f$ Lebesgue 可积，且两者积分值相等。
