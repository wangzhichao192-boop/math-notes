# 环与域

## 环与理想

!!! definition "定义（环）"
    集合 $R$ 连同加法 $+$ 与乘法 $\cdot$ 称为**环**，若 $(R,+)$ 构成 Abel 群，乘法满足结合律，且分配律成立：

    $$
    a(b+c) = ab + ac,\qquad (a+b)c = ac + bc.
    $$

子集 $I \subseteq R$ 称为**理想**，若 $I$ 是加法子群且

$$
\forall r \in R,\ a \in I \;\Longrightarrow\; ra,\ ar \in I.
$$

## 商环

商环 $R/I$ 由加法陪集构成，乘法定义为

$$
(a+I)(b+I) = ab + I.
$$

!!! theorem "定理（第一同构定理）"
    设 $\varphi : R \to S$ 是环的满同态，则

    $$
    R/\ker\varphi \;\cong\; S.
    $$

## 整环与域

- **整环**：无零因子的交换环（$ab = 0 \Rightarrow a = 0$ 或 $b = 0$）。
- **域**：每个非零元都可逆的交换环。

!!! note "命题"
    有限整环必为域。
