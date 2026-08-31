# 一阶微分方程

## 可分离变量方程

形如

$$
\frac{\mathrm{d}y}{\mathrm{d}x} = g(x)h(y)
$$

的方程，分离变量并积分：

$$
\int \frac{\mathrm{d}y}{h(y)} = \int g(x)\,\mathrm{d}x.
$$

!!! example "例"
    求解 $\dfrac{\mathrm{d}y}{\mathrm{d}x} = xy$：

    $$
    \int \frac{\mathrm{d}y}{y} = \int x\,\mathrm{d}x
    \;\Longrightarrow\;
    \ln|y| = \frac{x^2}{2} + C
    \;\Longrightarrow\;
    y = C e^{x^2/2}.
    $$

## 一阶线性方程

$$
y' + p(x)\,y = q(x)
$$

通解公式（常数变易法）：

$$
y = e^{-\int p\,\mathrm{d}x}\left( \int q(x)\, e^{\int p\,\mathrm{d}x}\,\mathrm{d}x + C \right).
$$

## 恰当方程

若 $M(x,y)\,\mathrm{d}x + N(x,y)\,\mathrm{d}y = 0$ 满足

$$
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x},
$$

则存在势函数 $u(x,y)$，使 $\mathrm{d}u = 0$，通解为 $u(x,y) = C$。
