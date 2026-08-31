# 随机变量与分布

## 随机变量

随机变量是 $(\Omega, \mathcal{F}) \to (\mathbb{R}, \mathcal{B}(\mathbb{R}))$ 的可测映射 $X$。其**分布函数**定义为

$$
F_X(x) = P(X \le x),\qquad x \in \mathbb{R}.
$$

## 期望与方差

!!! definition "定义（期望）"
    若 $X$ 是可积的，则

    $$
    \mathbb{E}[X] = \int_\Omega X\,\mathrm{d}P.
    $$

    方差定义为 $\operatorname{Var}(X) = \mathbb{E}[(X - \mathbb{E}X)^2]$。

对连续型随机变量（密度 $f$）：

$$
\mathbb{E}[X] = \int_{-\infty}^{+\infty} x f(x)\,\mathrm{d}x.
$$

## 常见分布

| 分布 | 记号 | 期望 | 方差 |
| ---- | ---- | ---- | ---- |
| 正态分布 | $N(\mu, \sigma^2)$ | $\mu$ | $\sigma^2$ |
| 指数分布 | $\operatorname{Exp}(\lambda)$ | $\dfrac{1}{\lambda}$ | $\dfrac{1}{\lambda^2}$ |
| Poisson 分布 | $\operatorname{Poisson}(\lambda)$ | $\lambda$ | $\lambda$ |

## 极限定理

!!! theorem "定理（中心极限定理）"
    设 $X_1, X_2, \dots$ 独立同分布，$\mathbb{E}X_i = \mu$，$\operatorname{Var}(X_i) = \sigma^2 < \infty$，则

    $$
    \frac{\sum_{i=1}^{n} X_i - n\mu}{\sigma\sqrt{n}}
    \;\xrightarrow{\;d\;}\; N(0,1).
    $$
