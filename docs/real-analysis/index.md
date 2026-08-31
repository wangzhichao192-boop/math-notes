# 实分析与测度论

以测度为基础的现代积分理论。

!!! abstract "课程主线"
    **测度空间** $\longrightarrow$ **可测函数** $\longrightarrow$ **Lebesgue 积分** $\longrightarrow$ $L^p$ 空间

## 笔记

- [测度与可测函数](measure.md)：$\sigma$-代数、测度、可测函数

## 为什么需要 Lebesgue 积分

Riemann 积分的局限性：可积函数类太小，积分与极限交换条件苛刻。Lebesgue 积分通过「分割值域」克服这一困难，使

$$
\lim_{n \to \infty}\int f_n \,\mathrm{d}\mu = \int \lim_{n\to\infty} f_n \,\mathrm{d}\mu
$$

在较弱的条件下成立（单调收敛定理 / 控制收敛定理）。
