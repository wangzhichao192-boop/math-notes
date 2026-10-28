# Linear Systems

For a linear system, uniqueness turns evaluation at one point into an identification of the homogeneous solution space with a finite-dimensional vector space. Determinants then detect whether a collection of solutions forms a basis.

## The Solution Space

!!! definition "Definition (Homogeneous and nonhomogeneous systems)"
    <a id="def-linear-system"></a>
    Let $I$ be an interval, $A:I\to\mathbb R^{n\times n}$ and $g:I\to\mathbb R^n$ continuous. The equation

    $$
    Y'=A(x)Y+g(x)
    $$

    is a **linear system**. It is **homogeneous** when $g\equiv0$. For $n=1$, this includes $y'+p(x)y=q(x)$, which is homogeneous when $q=0$.

!!! theorem "Theorem (Existence and uniqueness for linear systems)"
    <a id="thm-linear-system-existence"></a>
    For every $x_0\in I$ and $Y_0\in\mathbb R^n$, the IVP $Y'=A(x)Y+g(x)$, $Y(x_0)=Y_0$, has a unique solution throughout $I$.

??? proof "Proof"
    On each compact subinterval, $\|A(x)Y-A(x)Z\|\le\|A(x)\|\|Y-Z\|$, so Picard's theorem gives local uniqueness. The integral equation and Gronwall bound the solution on every compact interval between $x_0$ and an interior endpoint: for $x\ge x_0$,

    $$
    \|Y(x)\|\le\left(\|Y_0\|+\int_{x_0}^x\|g(s)\|\,ds\right)
    \exp\left(\int_{x_0}^x\|A(s)\|\,ds\right).
    $$

    Reversing time gives the corresponding left-hand bound. The bounded solution has bounded derivative on such compact intervals and thus a finite endpoint limit; local existence there continues it. No finite interior endpoint can be maximal.

!!! theorem "Theorem (Dimension of the homogeneous solution space)"
    <a id="thm-solution-space-dimension"></a>
    The solutions of $Y'=A(x)Y$ on $I$ form an $n$-dimensional real vector space. For fixed $x_0\in I$, evaluation $Y\mapsto Y(x_0)$ is a linear isomorphism onto $\mathbb R^n$.

??? proof "Proof"
    **Vector space.** The zero function is a solution, and $(aY+bZ)'=A(aY+bZ)$ for solutions $Y,Z$ and constants $a,b$.

    **Spanning.** Let $\phi_i$ be the solution with $\phi_i(x_0)=e_i$, the $i$th standard basis vector, for $1\le i\le n$. For any solution $\phi$, write $\phi(x_0)=\sum_i c_i e_i$. Then $\phi-\sum_i c_i\phi_i$ solves the homogeneous equation and vanishes at $x_0$. Uniqueness makes it identically zero, so the $\phi_i$ span.

    **Independence.** If $\sum_i c_i\phi_i\equiv0$, evaluation at $x_0$ gives $\sum_i c_i e_i=0$, hence every $c_i=0$. Thus the $\phi_i$ are a basis, and evaluation is an isomorphism.

## The Wronskian

How can one recognize whether $n$ given solutions are linearly independent? For solutions of one homogeneous linear system, it suffices to test their values at a single point.

!!! definition "Definition (Wronskian)"
    <a id="def-wronskian"></a>
    For differentiable vector-valued functions $Y_1,\ldots,Y_n:I\to\mathbb R^n$, form the matrix $\mathcal Y=(Y_1\ \cdots\ Y_n)$ with these vectors as columns. Their **Wronskian** is

    $$
    W(x)=\det\mathcal Y(x)=
    \det\begin{pmatrix}
    y_{11}(x)&\cdots&y_{1n}(x)\\
    \vdots&&\vdots\\
    y_{n1}(x)&\cdots&y_{nn}(x)
    \end{pmatrix},
    $$

    where $y_{ij}$ is the $i$th component of $Y_j$. The definition does not require independence.

!!! theorem "Theorem (Liouville's formula)"
    <a id="thm-liouville"></a>
    If $Y_1,\ldots,Y_n$ solve $Y'=A(x)Y$, then

    $$
    W(x)=W(x_0)\exp\left(\int_{x_0}^x\operatorname{tr}A(t)\,dt\right),
    \qquad \operatorname{tr}A=\sum_{i=1}^n a_{ii}.
    $$

??? proof "Proof"
    It suffices to show $W'=(\operatorname{tr}A)W$. Denote the rows of $\mathcal Y$ by $R_1,\ldots,R_n$. Differentiating the determinant one row at a time gives

    $$
    W'=\sum_{i=1}^n\det(R_1,\ldots,R_i',\ldots,R_n).
    $$

    Since every column solves the system, $y_{ij}'=\sum_{m=1}^n a_{im}y_{mj}$, hence $R_i'=\sum_m a_{im}R_m$. Multilinearity now yields

    $$
    \begin{aligned}
    W'&=\sum_{i=1}^n\sum_{m=1}^n a_{im}
    \det(R_1,\ldots,\underbrace{R_m}_{i\text{th row}},\ldots,R_n)\\
    &=\sum_{i=1}^n a_{ii}\det(R_1,\ldots,R_n)
    =(\operatorname{tr}A)W.
    \end{aligned}
    $$

    Indeed, when $m\ne i$, the determinant has two equal rows and vanishes. Solving this scalar linear equation proves the formula, including the case $W(x_0)=0$; division by $W$ is unnecessary.

!!! corollary "Corollary (Independence at one point)"
    <a id="cor-wronskian-independence"></a>
    For $n$ solutions of the same homogeneous system, linear independence as functions is equivalent to $W(x_0)\ne0$ at one point, and also to $W(x)\ne0$ at every point of $I$.

??? proof "Proof"
    If $W(x_0)\ne0$, evaluating a constant linear relation at $x_0$ makes all coefficients zero. If $W(x_0)=0$, choose constants $c_j$, not all zero, with $\sum_j c_jY_j(x_0)=0$. The corresponding solution $\sum_j c_jY_j$ is identically zero by uniqueness. Liouville's formula shows that the Wronskian is either everywhere zero or nowhere zero.
