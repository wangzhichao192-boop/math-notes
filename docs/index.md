# 数学笔记

欢迎来到我的数学笔记站，采用 **MkDocs + Material for Mkdocs + KaTeX** 搭建（OI-wiki 同款模版）。

## 课程

<div class="grid cards" markdown>


- :material-book-open-page-variant: **代数与分析基础**

    FAA I/II 教材合辑：逻辑、集合、群环模、拓扑、微积分、范畴论、多重线性代数、Haar 测度、微分几何与 Fourier 分析

    [:octicons-arrow-right-24: 进入](algebra-analysis/index.md)


- :material-shape-outline: **几何与拓扑**

    复数的平方根与缠绕数、一般拓扑、同伦与基本群、射影几何、正则曲面的微分几何与双曲几何

    [:octicons-arrow-right-24: 进入](geometry-topology/index.md)


- :material-dice-multiple: **概率论**

    概率空间、随机变量与极限定理

    [:octicons-arrow-right-24: 进入](probability/index.md)

</div>

## 公式示例

行内公式：$\displaystyle \int_0^{+\infty} e^{-x^2}\,\mathrm{d}x = \dfrac{\sqrt{\pi}}{2}$

块级公式：

\[
\mathbb{E}[X] = \int_\Omega X(\omega)\,\mathrm{d}P(\omega)
\]

## 提示框

!!! note "定理（Cauchy 积分公式）"
    若 $f$ 在区域 $D$ 内解析，则对任意 $a \in D$，
    \[
    f(a) = \frac{1}{2\pi i}\oint_{\gamma}\frac{f(z)}{z-a}\,\mathrm{d}z.
    \]

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

## 写作与自检

新增章节前先看 [写作指南](WRITING_GUIDE.md)（覆盖了 admonition 里
数学公式的转义、`\[...\]` vs `\\[` 的使用条件、anchor 命名约定等踩过的坑）。
写完跑一下 `node scripts/check_math.js`，有渲染问题会直接列出来。
