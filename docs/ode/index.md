# 常微分方程

研究含未知函数及其导数的方程。

!!! abstract "课程主线"
    **一阶方程** $\longrightarrow$ **高阶线性方程** $\longrightarrow$ **线性系统与定性理论**

## 笔记

- [一阶微分方程](first-order.md)：可分离、线性方程、恰当方程

## 基本概念

$n$ 阶常微分方程的一般形式：

$$
F\left(x, y, y', \dots, y^{(n)}\right) = 0.
$$

!!! definition "定义（初值问题）"
    求满足

    $$
    \frac{\mathrm{d}y}{\mathrm{d}x} = f(x, y),\qquad y(x_0) = y_0
    $$

    的解 $y = \varphi(x)$。

!!! theorem "定理（Picard 存在唯一性）"
    若 $f$ 在 $(x_0, y_0)$ 某邻域内连续且关于 $y$ 满足 Lipschitz 条件，则初值问题存在唯一解。
