# 群论基础

## 群的定义

!!! definition "定义（群）"
    一个**群**是一个集合 $G$ 连同其上满足以下条件的二元运算 $\cdot$：

    1. **结合律**：$\forall a,b,c \in G,\ (a \cdot b) \cdot c = a \cdot (b \cdot c)$；
    2. **单位元**：$\exists e \in G,\ \forall a \in G,\ e \cdot a = a \cdot e = a$；
    3. **逆元**：$\forall a \in G,\ \exists a^{-1} \in G,\ a \cdot a^{-1} = a^{-1} \cdot a = e$。

若运算还满足 $a \cdot b = b \cdot a$，则称 $G$ 为 **Abel 群**（交换群）。

## 子群

!!! theorem "定理（子群判定）"
    非空子集 $H \subseteq G$ 是子群当且仅当

    $$
    \forall a, b \in H,\quad ab^{-1} \in H.
    $$

## Lagrange 定理

!!! theorem "定理（Lagrange）"
    设 $G$ 是有限群，$H \leqslant G$，则

    $$
    |G| = |H| \cdot [G : H],
    $$

    特别地，子群的阶必为群阶的因子。

??? proof "证明思路"
    左陪集 $gH$ 构成 $G$ 的一个划分，且映射 $H \to gH,\ h \mapsto gh$ 是双射，故每个左陪集的基数均为 $|H|$。

## 同态与同构

一个映射 $\varphi : G_1 \to G_2$ 称为同态，若

$$
\varphi(ab) = \varphi(a)\varphi(b),\qquad \forall a,b \in G_1.
$$

!!! theorem "定理（同态基本定理）"
    设 $\varphi : G_1 \to G_2$ 是满同态，则

    $$
    G_1 / \ker\varphi \;\cong\; G_2,
    $$

    其中 $\ker\varphi = \{ g \in G_1 : \varphi(g) = e \}$。
