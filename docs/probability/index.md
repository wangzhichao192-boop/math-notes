# 概率论

研究随机现象的数学规律。

!!! abstract "课程主线"
    **概率空间** $\longrightarrow$ **随机变量与分布** $\longrightarrow$ **极限定理**

## 笔记

- [随机变量与分布](random-variables.md)：分布函数、期望、方差、常见分布

## 概率空间公理

!!! definition "定义（Kolmogorov 公理）"
    概率空间 $(\Omega, \mathcal{F}, P)$ 中，概率测度 $P : \mathcal{F} \to [0,1]$ 满足：

    1. $P(\Omega) = 1$；
    2. 对两两不交的 $\{A_n\} \subseteq \mathcal{F}$，

    $$
    P\left(\bigcup_{n=1}^{\infty} A_n\right) = \sum_{n=1}^{\infty} P(A_n).
    $$
