# 数学笔记

欢迎来到我的数学笔记站，采用 **MkDocs + Material for Mkdocs + KaTeX** 搭建（OI-wiki 同款模版）。

## 课程

<div class="grid cards" markdown>

- :material-function-variant: **抽象代数**

    群、环、域与 Galois 理论

    [:octicons-arrow-right-24: 进入](abstract-algebra/index.md)

- :material-dice-multiple: **概率论**

    概率空间、随机变量与极限定理

    [:octicons-arrow-right-24: 进入](probability/index.md)

- :material-chart-line: **常微分方程**

    一阶方程、线性系统与定性理论

    [:octicons-arrow-right-24: 进入](ode/index.md)

- :material-sigma: **实分析与测度论**

    测度、Lebesgue 积分与 $L^p$ 空间

    [:octicons-arrow-right-24: 进入](real-analysis/index.md)

</div>

## 公式示例

行内公式：$\displaystyle \int_0^{+\infty} e^{-x^2}\,\mathrm{d}x = \dfrac{\sqrt{\pi}}{2}$

块级公式：

$$
\mathbb{E}[X] = \int_\Omega X(\omega)\,\mathrm{d}P(\omega)
$$

## 提示框

!!! note "定理（Cauchy 积分公式）"
    若 $f$ 在区域 $D$ 内解析，则对任意 $a \in D$，
    $$
    f(a) = \frac{1}{2\pi i}\oint_{\gamma}\frac{f(z)}{z-a}\,\mathrm{d}z.
    $$

??? proof "证明"
    留作练习。

## 本地使用

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

浏览器打开 <http://127.0.0.1:8000> 即可实时预览。
