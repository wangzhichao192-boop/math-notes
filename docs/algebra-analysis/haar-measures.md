# Haar Measures

The chapter constructs invariant measures from compactly supported continuous functions. We first study quotient spaces, connectedness and topological groups, then prove the local compactness tools needed for Radon measures. Haar measure is constructed by comparison of translates and an ultrafilter limit. The last section derives the real change-of-variables formula from elementary matrices and estimates on small cubes. Throughout the measure sections, spaces are locally compact Hausdorff and second-countable, as in the lectures.

## Quotient Spaces and Connectedness

!!! definition "Definition (Open map and quotient topology)"
    <a id="open-map-quotient-topology"></a>

    A map of topological spaces is open if it sends every open set to an open set. For a surjection $\pi:X\to Y$, the quotient topology consists of the subsets $U\subseteq Y$ with $\pi^{-1}(U)$ open. In this topology $\pi$ is continuous, and a subset $F\subseteq Y$ is closed if and only if $\pi^{-1}(F)$ is closed.

??? proof "Proof"
    Preimages preserve arbitrary unions and finite intersections, so the prescribed sets form a topology. The closed-set criterion follows by taking complements. If a surjective continuous map is also open, then $U=\pi(\pi^{-1}(U))$ proves that its target topology is the quotient topology.

!!! proposition "Proposition (Products of maps and closures)"
    <a id="product-maps-closures"></a>

    For maps $f_i:X_i\to Y_i$, their product is continuous if all $f_i$ are continuous. It is open if all $f_i$ are open and all but finitely many are surjective. Moreover,

    $$
    \overline{\prod_i A_i}=\prod_i\overline{A_i}.
    $$

??? proof "Proof"
    Every coordinate of the product map is $f_i\circ\pi_i$, proving continuity by the initial property of the product topology. A basic open product restricts finitely many coordinates; enlarge that finite set to contain every nonsurjective index. Its image is then a basic open product of the corresponding images. The product of closures is closed, since its complement is the union of coordinate preimages of the complements. Every basic neighbourhood of a point in that product meets $\prod_i A_i$: choose a point in $A_i$ in each restricted coordinate neighbourhood, and choose arbitrary points of $A_i$ in the remaining coordinates. Empty factors cause both sides to be empty.

!!! proposition "Proposition (Hausdorff quotients)"
    <a id="prop-hm-2-4"></a>
    <a id="prop-hausdorff-quotients"></a>

    Let $\pi:X\to Y$ be a quotient map and let $\Gamma=\{(x,x'): \pi(x)=\pi(x')\}$. If $Y$ is Hausdorff, $\Gamma$ is closed. If $\pi$ is open, the converse holds.

??? proof "Proof"
    The relation graph is $(\pi\times\pi)^{-1}(\Delta_Y)$, where $\Delta_Y$ is the diagonal. A closed diagonal therefore gives a closed graph. Conversely $\pi\times\pi$ is an open surjection, so the image of the open saturated set $(X\times X)\setminus\Gamma$ is $(Y\times Y)\setminus\Delta_Y$. Thus the diagonal is closed, which characterises Hausdorff spaces.

!!! definition "Definition (Connectedness and components)"
    <a id="connectedness-components"></a>

    A space is disconnected if it is the union of two disjoint nonempty open subsets; otherwise it is connected. It is path connected if any two points are joined by a continuous path $[0,1]\to X$. A connected component is a nonempty maximal connected subset. The empty space is connected and has no connected components.

!!! proposition "Proposition (Criteria and existence of components)"
    <a id="connected-components-properties"></a>

    A space is connected if and only if its only clopen subsets are $\varnothing$ and the whole space. Path connected spaces are connected. A union of connected subsets, each meeting one fixed member of the family, is connected. Every point has a unique connected component; components are closed.

??? proof "Proof"
    A nontrivial clopen subset and its complement form a separation, and either member of a separation is clopen. A separation pulled back by a path would separate $[0,1]$. To see that this interval is connected, suppose a clopen set contains $0$ but not $1$ and take the supremum of the initial segment it contains. Closedness puts the supremum in that set and openness extends the initial segment, a contradiction.

    If a separation splits a union of the stipulated connected sets, the fixed member lies in one side. Each other member meets it and, by connectedness, lies in that same side. Define $x\sim y$ when some connected subset contains them both. Reflexivity and symmetry are immediate, and transitivity follows by uniting two connected sets meeting at the middle point. The equivalence class of $x$ is the union of all connected sets containing $x$, hence connected by the union result; it contains every such set and is maximal. Finally, a separation of the closure of a connected set into two relatively open pieces would meet the original set in both pieces, contradicting its connectedness. Thus closures are connected, and maximality makes components closed.

## Topological Groups

!!! definition "Definition (Topological group)"
    <a id="def-hm-1-1"></a>
    <a id="def-topological-group"></a>

    A group $G$ with a topology is a topological group if $(x,y)\mapsto xy^{-1}$ is continuous. This is equivalent to continuity of multiplication and inversion. A homomorphism of topological groups is a continuous group homomorphism; an isomorphism must also have a continuous inverse.

??? proof "Proof"
    Restriction to $(e,y)$ gives continuity of inversion, which is its own inverse and is therefore a homeomorphism. Composing $(x,y)\mapsto(x,y^{-1})$ with the defining map gives multiplication. Conversely multiplication composed with inversion in the second coordinate gives the defining map. Interchanging the coordinates also gives the continuous right action $(a,x)\mapsto xa$.

!!! definition "Definition (Actions and stabilizers)"
    <a id="def-hm-1-2"></a>
    <a id="def-actions-and-stabilizers"></a>

    A left action satisfies $ex=x$ and $(ab)x=a(bx)$; a right action satisfies $x(ab)=(xa)b$. It is continuous if its map $G\times X\to X$ is continuous, faithful if only $e$ acts trivially on all of $X$, and transitive if each pair of points is related by a group element. A space with a transitive action is homogeneous. The stabilizer $\operatorname{Stab}(x)=\{g:gx=x\}$ is a subgroup.

!!! proposition "Proposition (Translations and open action images)"
    <a id="translations-open-images"></a>

    Each map $x\mapsto ax$ or $x\mapsto xa$ in a continuous action is a homeomorphism. If $V\subseteq X$ is open and $U\subseteq G$ arbitrary, then $UV$ is open.

??? proof "Proof"
    The inclusion $x\mapsto(a,x)$ is continuous by its two coordinates. Its composite with the action is therefore continuous, with inverse given by $a^{-1}$. Finally $UV=\bigcup_{a\in U}aV$ is a union of open subsets.

!!! example "Example (Common groups and actions)"
    <a id="topological-group-examples"></a>

    The additive and multiplicative groups of a valued field are topological groups. The additive group of a normed space is a topological group, and $(a,x)\mapsto ax$ is a continuous action of $K^\times$. For a Banach space, composition and evaluation of bounded operators are bounded bilinear maps. Invertible bounded operators form $\mathrm{GL}(V)$; the Neumann-series argument makes inversion continuous, so this is a topological group acting continuously on $V$. The real orthogonal group acts continuously and transitively on the unit sphere: extend any two unit vectors to orthonormal bases and send one basis to the other.

!!! proposition "Proposition (Identity neighbourhoods and separation)"
    <a id="prop-hm-1-3"></a>
    <a id="prop-identity-neighbourhoods-and-separation"></a>

    Given an open neighbourhood $U$ of $e$, there is a symmetric open neighbourhood $V$ with $V^2\subseteq U$. For $a\in U$ there is an open neighbourhood $V\subseteq U$ with $aV,Va\subseteq U$; for $b\in U$ there is such a $V$ with $bVb^{-1}\subseteq U$. A topological group is Hausdorff if and only if the intersection of its identity neighbourhoods is $\{e\}$.

??? proof "Proof"
    Continuity at $(e,e)$ gives neighbourhoods $V_1,V_2$ with $V_1V_2^{-1}\subseteq U$. Take $V=V_1\cap V_2\cap V_1^{-1}\cap V_2^{-1}$; since $V=V^{-1}$, its square is contained in $U$. For the next assertions use $a^{-1}U\cap Ua^{-1}\cap U$ and $b^{-1}Ub\cap U$, respectively. Hausdorffness certainly excludes every $g\ne e$ from some identity neighbourhood. Conversely, for $x\ne y$ choose $U$ excluding $x^{-1}y$ and symmetric $V$ with $VV^{-1}\subseteq U$. If $xa=yb$ with $a,b\in V$, then $x^{-1}y=ab^{-1}\in U$, a contradiction. Thus $xV,yV$ are disjoint neighbourhoods.

!!! proposition "Proposition (Subgroups and quotient groups)"
    <a id="topological-subgroups-quotients"></a>

    The closure of a subgroup is a subgroup, and the closure of a normal subgroup is normal. An open subgroup is closed. For every subgroup $H$, the quotient projection $G\to G/H$ is open, the left action on $G/H$ is continuous and transitive, and $G/H$ is Hausdorff if and only if $H$ is closed. If $H$ is normal, $G/H$ is a topological group.

??? proof "Proof"
    The closed set obtained by pulling back $\overline H$ under $(x,y)\mapsto xy^{-1}$ contains $H\times H$, hence its closure $\overline H\times\overline H$. This proves the subgroup assertion. Conjugation is a homeomorphism and preserves $H$ when $H$ is normal, so also preserves its closure. The complement of an open subgroup is a union of its open cosets.

    For open $U\subseteq G$, the saturation $\pi^{-1}\pi(U)=\bigcup_{h\in H}Uh$ is open, so $\pi$ is open. The preimage of an open set under the coset action is the image, under the open map $\mathrm{Id}\times\pi$, of its preimage under multiplication followed by $\pi$; this proves continuity. Transitivity follows by translating cosets. The equivalence graph is the preimage of $H$ under $(a,b)\mapsto a^{-1}b$, so a closed $H$ yields a Hausdorff quotient by the quotient criterion. Conversely $H=\pi^{-1}(\{H\})$ is closed when the quotient is Hausdorff. For normal $H$, descend $(x,y)\mapsto xy^{-1}$ through the open surjection $\pi\times\pi$; the same open-preimage argument proves continuity of the quotient group operation.

!!! proposition "Proposition (Orbit maps and the topological first isomorphism theorem)"
    <a id="orbit-map-isomorphism"></a>

    For a continuous transitive action and $H=\operatorname{Stab}(x_0)$, the orbit map $G/H\to X$, $aH\mapsto ax_0$, is a continuous bijection. If $X$ is Hausdorff, $H$ is closed. A surjective open continuous homomorphism $f:G\to G'$ induces an isomorphism of topological groups $G/\ker f\to G'$.

??? proof "Proof"
    Two elements have the same image precisely when $a^{-1}b\in H$, proving injectivity, and transitivity proves surjectivity. The map $a\mapsto ax_0$ is continuous and factors through the quotient; the definition of quotient topology makes the descended map continuous. The stabilizer is the preimage of the closed singleton $\{x_0\}$. In the homomorphism case the descended group isomorphism is continuous by the same argument and open because the image of a quotient-open set is $f(\pi^{-1}(U))$.

!!! proposition "Proposition (Connected groups and their identity component)"
    <a id="connected-group-component"></a>

    In a connected group every identity neighbourhood generates the group. If $H$ and $G/H$ are connected, $G$ is connected. The identity component $G^\circ$ is a closed normal subgroup, and the component of $x$ is $xG^\circ$.

??? proof "Proof"
    Replace a neighbourhood by a symmetric open one inside it. The union of its finite powers is an open subgroup, hence also closed, and connectedness makes it the whole group. If a separation $G=U_1\sqcup U_2$ existed, openness of the quotient projection and connectedness of $G/H$ would force $\pi(U_1)\cap\pi(U_2)\ne\varnothing$. The corresponding coset, homeomorphic to $H$, would then be separated by its intersections with $U_1,U_2$.

    The identity component is closed by the component theorem. For $a\in G^\circ$, the connected set $a^{-1}G^\circ$ contains $e$, hence is contained in $G^\circ$; this is the subgroup criterion. Conjugation preserves connectedness and fixes $e$, giving normality. Translating components proves the last assertion in both directions.

!!! proposition "Proposition (Continuous real group homomorphisms)"
    <a id="real-group-homomorphisms"></a>

    A continuous additive map $f:\mathbb R\to\mathbb R$ is $f(x)=xf(1)$. A continuous homomorphism $g:\mathbb R^\times\to\mathbb R_{>0}$ is $g(y)=|y|^t$ for some $t\in\mathbb R$.

??? proof "Proof"
    Additivity gives the formula on integers and, by $mf(n/m)=nf(1)$, on rationals. Rational approximation and continuity extend it to all reals. Apply this result to $x\mapsto\log g(e^x)$ to obtain the power formula on positive numbers. Since $g(-1)^2=1$ and $g(-1)>0$, its value is one, so the formula extends to negative numbers.

## Locally Compact Hausdorff Spaces

!!! definition "Definition (Local compactness and compact support)"
    <a id="def-hm-2-1"></a>
    <a id="def-local-compactness-and-compact-support"></a>

    A space is locally compact if every point has a compact neighbourhood; it is $\sigma$-compact if it is a countable union of compact sets. The support of $f:X\to\mathbb R$ is $\overline{\{f\ne0\}}$. Write $C_c(X)$ for the real vector space of continuous functions with compact support. The real line is locally compact Hausdorff. A Hausdorff topological group is locally compact precisely when $e$ has a compact neighbourhood, by translations.

!!! proposition "Proposition (Shrinking neighbourhoods around compact sets)"
    <a id="shrinking-compact-neighbourhoods"></a>

    In a locally compact Hausdorff space, a point outside a closed set has a compact neighbourhood disjoint from that set. For $x\in U$ open, there is an open $W$ with $x\in W\subseteq\overline W\subseteq U$ and $\overline W$ compact. If $K\subseteq U$ is compact, the same conclusion holds with $K\subseteq W$.

??? proof "Proof"
    Start with a compact neighbourhood $N$ of $x$. The compact set $N\cap F$ can be separated from $x$ by disjoint open sets, choosing the neighbourhood of $x$ inside $N^\circ$. Its closure is contained in $N$ and avoids $F$, giving the first assertion. Apply it to $F=X\setminus U$ and take an interior to obtain the second. Cover a compact $K$ by such $W_x$ and take a finite union; its closure is the finite union of compact closures and remains in $U$.

!!! theorem "Theorem (Urysohn's lemma)"
    <a id="thm-hm-2-2"></a>
    <a id="thm-urysohn-s-lemma"></a>

    If $K\subseteq U$ with $K$ compact and $U$ open in a locally compact Hausdorff space, there is $f\in C_c(X)$ with $0\le f\le1$, $f|_K=1$, and $\operatorname{Supp}(f)\subseteq U$.

??? proof "Proof"
    First shrink to $K\subseteq W\subseteq\overline W\subseteq U$ with $\overline W$ compact. Enumerate $\mathbb Q\cap(0,1]$ starting with $1$. Construct open sets $U_r$ recursively, all contained in $W$, with compact closures, $K\subseteq U_1$, and $\overline{U_s}\subseteq U_r$ whenever $r<s$. At each finite stage insert the new rational by shrinking an open neighbourhood of the compact closure of its upper neighbour inside its lower neighbour; if there is no lower neighbour use $W$.

    Set $f(x)=\sup\{r:x\in U_r\}$, with empty supremum zero. This equals one on $K$ and vanishes outside $W$, so its support is compact and lies in $U$. For $0\le t<1$, $\{f>t\}=\bigcup_{r>t}U_r$ is open. For $0<t\le1$, nesting gives

    $$
    \{f\ge t\}=\bigcap_{r<t}U_r=\bigcap_{r<t}\overline{U_r}.
    $$

    Indeed a closure at an index between $r$ and $t$ is contained in $U_r$. Thus $\{f\ge t\}$ is closed and $\{f<t\}$ open. The endpoint cases are empty or whole sets; these ray preimages prove continuity.

!!! corollary "Corollary (Continuous test functions determine the topology)"
    <a id="compact-test-functions-topology"></a>

    The topology of a locally compact Hausdorff space is the coarsest topology making every member of $C_c(X)$ continuous.

??? proof "Proof"
    For every $x\in U$ open, choose a compact neighbourhood $K_x\subseteq U$ and an Urysohn function $f_x$ equal to one on $K_x$ and supported in $U$. Then $U=\bigcup_{x\in U}\{f_x>0\}$, which is open in any topology making all these functions continuous.

!!! proposition "Proposition (Countable compact exhaustion and Baire property)"
    <a id="compact-exhaustion-baire"></a>

    A second-countable locally compact Hausdorff space has open sets $U_n$ with compact closures, $\overline{U_n}\subseteq U_{n+1}$ and $\bigcup_nU_n=X$. Every open cover of a second-countable space has a countable subcover. A nonempty locally compact Hausdorff space cannot be a countable union of closed sets with empty interiors.

??? proof "Proof"
    Retain from a countable basis the members with compact closures. They remain a basis by shrinking neighbourhoods. Enumerate them as $V_n$ and recursively choose a relatively compact open $U_{n+1}$ containing $\overline{U_n}\cup\overline{V_{n+1}}$, starting with $V_0$. This exhausts $X$. For an arbitrary cover, for each basis member contained in a cover member choose one such member; countably many choices cover $X$.

    For Baire's assertion, if each $F_n$ has empty interior, choose nonempty relatively compact open sets recursively with $\overline{W_0}\cap F_0=\varnothing$ and $\overline{W_{n+1}}\subseteq W_n\setminus F_{n+1}$. The nested nonempty compact closures have nonempty intersection. Every point in it avoids all $F_n$, contradicting that they cover $X$.

!!! theorem "Theorem (Homogeneous space homeomorphism)"
    <a id="homogeneous-space-homeomorphism"></a>

    If a second-countable locally compact Hausdorff group acts continuously and transitively on a second-countable locally compact Hausdorff space $X$, then $G/\operatorname{Stab}(x_0)\to X$ is a homeomorphism.

??? proof "Proof"
    The orbit map $q:G\to X$ already descends to a continuous bijection. To prove openness, let $s\in V$ open and choose an identity neighbourhood $U_0$ with $sU_0^{-1}U_0\subseteq V$. Shrink to relatively compact open $U$ with $\overline U\subseteq U_0$. Countably many translates $a_nU$ cover $G$, so the compact sets $a_nq(\overline U)$ cover $X$. Baire's theorem implies that one has nonempty interior; translations give a nonempty open $W\subseteq q(\overline U)$. Choose $b\in\overline U$ with $q(b)\in W$. Then $sb^{-1}W$ is an open neighbourhood of $q(s)$ lying in $q(s\overline U^{-1}\overline U)\subseteq q(V)$. Thus every point of $q(V)$ is interior, proving openness.

## Radon Measure

!!! definition "Definition (Positive functional and Radon measure)"
    <a id="def-hm-3-1"></a>
    <a id="def-positive-functional-and-radon-measure"></a>

    A positive functional is a real linear map $I:C_c(X)\to\mathbb R$ with $I(f)\ge0$ whenever $f\ge0$. Its associated Borel measure, constructed below, is called a Radon measure. Positivity refers to nonnegative inputs: the functional's codomain is $\mathbb R$.

!!! theorem "Theorem (Representation of a positive functional)"
    <a id="thm-hm-3-2"></a>
    <a id="thm-representation-of-a-positive-functional"></a>

    On a second-countable locally compact Hausdorff space, every positive functional is an integral operator and determines a unique $\sigma$-finite Borel measure $\mu_I$ with $\int f\,d\mu_I=I(f)$ for $f\in C_c(X)$.

??? proof "Proof"
    The minimum of two compactly supported continuous functions is again such a function, so $C_c(X)$ is a Riesz space. If $f_n\downarrow0$, each $f_n\ge0$ is supported in $K=\operatorname{Supp}(f_0)$. Choose an Urysohn function $h$ equal to one on $K$. Then $0\le I(f_n)\le\|f_n\|_\infty I(h)$. If these norms did not tend to zero, the sets $\{x\in K:f_n(x)\ge\epsilon\}$ would be nested nonempty compact sets for some $\epsilon>0$, giving a point where the sequence does not tend to zero. Hence $I(f_n)\to0$, the Daniell integral axiom.

    Compact exhaustion and Urysohn functions supply countably many nonnegative test functions whose positivity sets cover $X$. The topology is generated by these continuous test functions, so their measurable structure is the Borel structure. The Daniell measure construction and its uniqueness theorem therefore give the asserted measure. Each compact set has finite measure by the bound in the next proposition, and compact exhaustion proves $\sigma$-finiteness. Conversely a Borel measure finite on compact sets gives a positive functional by integration, and the regularity below determines it uniquely.

!!! proposition "Proposition (Regularity on all Borel sets)"
    <a id="radon-regularity"></a>

    Compact sets have finite $\mu_I$-measure. For open $U$,

    $$
    \mu_I(U)=\sup_{K\subseteq U,\ K\text{ compact}}\mu_I(K)
    =\sup_{0\le f\le1,\ f\in C_c(X),\ \operatorname{Supp}(f)\subseteq U}I(f).
    $$

    For every Borel set $A$,

    $$
    \mu_I(A)=\inf_{U\supseteq A,\ U\text{ open}}\mu_I(U)
    =\sup_{K\subseteq A,\ K\text{ compact}}\mu_I(K).
    $$

??? proof "Proof"
    An Urysohn function equal to one on $K$ gives $\mu_I(K)\le I(f)<\infty$. Exhaust the open subspace $U$ by compact subsets to obtain its inner regularity. Urysohn functions between these compacts and $U$ show that the two suprema agree.

    For outer regularity, the Daniell upper-integral construction gives $\mu_I(A)=\inf\{I(g):g\in C_c(X)^\uparrow,\ g\ge\mathbf1_A\}$. We may take $g\ge0$ by replacing its approximating sequence by its positive parts. Such a $g$ is a limit of an increasing sequence of continuous functions, so $\{g>t\}$ is open. For $0<\epsilon<1$, $U=\{g>1-\epsilon\}$ contains $A$ and $(1-\epsilon)\mu_I(U)\le I(g)$. Take the infimum and then $\epsilon\downarrow0$ to prove outer regularity when $\mu_I(A)<\infty$; the infinite case follows from monotonicity.

    If $A$ has finite measure, choose open $U\supseteq A$ with $\mu_I(U\setminus A)<\epsilon$, compact $F\subseteq U$ with $\mu_I(U\setminus F)<\epsilon$, and open $V\supseteq U\setminus A$ with $\mu_I(V)<2\epsilon$. Then $K=F\setminus V$ is compact, lies in $A$, and $\mu_I(A\setminus K)<3\epsilon$. For infinite measure, intersect $A$ with a compact exhaustion to get finite-measure subsets increasing to $A$, and apply the finite case. These arguments also show that equal positive functionals give equal measures by open-set regularity and then outer regularity.

## Haar Measure

!!! notation "Translations of test functions"
    <a id="notation-translations-of-test-functions"></a>

    Fix a second-countable locally compact Hausdorff group. Let $C_c^+(G)$ consist of the nonzero nonnegative functions in $C_c(G)$. Set $L_af(x)=f(ax)$, $R_af(x)=f(xa)$ and $\iota f(x)=f(x^{-1})$. These are order-preserving linear isomorphisms. With this convention $L_bL_a=L_{ab}$. Every function of $C_c(G)$ is a difference of two members of $C_c^+(G)$, after adding a common nonzero nonnegative function if needed.

!!! definition "Definition (Haar measure and comparison of translates)"
    <a id="def-hm-3-3"></a>
    <a id="def-haar-measure-and-comparison-of-translates"></a>

    A nonzero positive functional $I$ is left invariant if $I(L_af)=I(f)$; its Radon measure is a left Haar measure. Right invariance uses $R_a$. For $f,g\in C_c^+(G)$ put

    $$
    (f:g)=\inf\left\{\sum_{i=1}^nc_i:\ c_i\ge0,\ a_i\in G,\ f\le\sum_{i=1}^nc_iL_{a_i}g\right\}.
    $$

!!! proposition "Proposition (Comparison inequalities)"
    <a id="haar-comparison-inequalities"></a>

    The comparison number is finite and at least $\|f\|_\infty/\|g\|_\infty>0$. It is invariant under translating $f$, positively homogeneous in $f$, monotone in $f$, subadditive in $f$, and satisfies $(f:h)\le(f:g)(g:h)$.

??? proof "Proof"
    A majorizing sum gives $\|f\|_\infty\le\|g\|_\infty\sum c_i$, proving the lower bound. The positive set $\{g>\|g\|_\infty/2\}$ has translates covering the compact support of $f$. A finite subcover gives a majorant by finitely many translates multiplied by $2\|f\|_\infty/\|g\|_\infty$, proving finiteness. Translation changes only the translating parameters; applying the inverse translation gives equality. Rescaling the coefficients and rescaling back proves homogeneity. A majorant of a larger function majorizes a smaller one, proving monotonicity. Combining majorants proves subadditivity after taking infima. Substituting a majorant of $g$ by translates of $h$ into one of $f$ by translates of $g$ produces coefficients $c_id_j$, whose total is $(\sum c_i)(\sum d_j)$; infima prove the last inequality.

!!! lemma "Lemma (Uniform continuity of translations)"
    <a id="uniform-continuity-translations"></a>

    For $f\in C_c(G)$ and $\epsilon>0$, some symmetric identity neighbourhood $V$ satisfies $\|L_af-f\|_\infty,\|R_af-f\|_\infty\le\epsilon$ for all $a\in V$.

??? proof "Proof"
    For each $x$ in the compact support choose an identity neighbourhood $U_x$ with both $|f(ax)-f(x)|$ and $|f(xa)-f(x)|$ at most $\epsilon/2$ on $U_x$. Choose symmetric $V_x$ with $V_x^2\subseteq U_x$. Extract finite covers of the support by the sets $V_xx$ and by $xV_x$, and intersect all the corresponding $V_x$ to obtain $V$. If $z=bx$ with $b\in V_x$ and $a\in V$, then both $az$ and $z$ are translates of $x$ by elements of $U_x$, giving $|f(az)-f(z)|\le\epsilon$. The right-handed cover gives the other estimate. If only the translated point belongs to the support, apply the same estimate using $a^{-1}\in V$. If neither point belongs to the support both values vanish.

!!! lemma "Lemma (Almost additivity for small supports)"
    <a id="haar-almost-additivity"></a>

    Fix $g\in C_c^+(G)$ and put $I_h(f)=(f:h)/(g:h)$. Then $(g:f)^{-1}\le I_h(f)\le(f:g)$. For $f_1,f_2\in C_c^+(G)$ and $\epsilon>0$, there is an identity neighbourhood $V$ such that

    $$
    I_h(f_1)+I_h(f_2)-\epsilon\le I_h(f_1+f_2)\le I_h(f_1)+I_h(f_2)
    $$

    whenever $\operatorname{Supp}(h)\subseteq V$.

??? proof "Proof"
    The bounds follow from the multiplicative comparison inequality, and the upper estimate is subadditivity. Choose $f_0\in C_c^+(G)$ equal to one on the supports of $f_1,f_2$. For $\delta>0$ put $u_i=f_i/(f_1+f_2+\delta f_0)$ where $f_0>0$, and zero elsewhere. These are continuous: near the supports the denominator is positive; away from the supports the numerator is zero. They have compact support, take values in $[0,1]$, and satisfy $u_1+u_2\le1$.

    Uniform continuity of right translations gives $V$ such that $|u_i(x)-u_i(y)|\le\delta$ when $y^{-1}x\in V$. If $f_1+f_2+\delta f_0\le\sum_j c_jh(x_j^{-1}x)$ and $h$ is supported in $V$, multiply by $u_i(x)$ and replace it by $u_i(x_j)+\delta$ in every nonzero summand. Summing the two comparison bounds and taking infima gives

    $$
    I_h(f_1)+I_h(f_2)\le(1+2\delta)\bigl(I_h(f_1+f_2)+\delta I_h(f_0)\bigr).
    $$

    The upper bounds $I_h(f)\le(f:g)$ are independent of $h$. Choose $\delta$ small enough that $\delta[2(f_1+f_2:g)+(f_0:g)+2\delta(f_0:g)]<\epsilon$. This proves the lower estimate uniformly for all such $h$.

!!! theorem "Theorem (Existence of Haar measure)"
    <a id="haar-existence"></a>

    A second-countable locally compact Hausdorff group has a left Haar measure and a right Haar measure.

??? proof "Proof"
    For each identity neighbourhood $V$ let $\Theta(V)=\{h\in C_c^+(G):\operatorname{Supp}(h)\subseteq V\}$. Urysohn's lemma makes these sets nonempty, and $\Theta(V_1)\cap\Theta(V_2)=\Theta(V_1\cap V_2)$, so they form a filter base. Extend its filter to an ultrafilter $\mathcal U$. For every $f$, the numbers $I_h(f)$ lie in the compact interval $[(g:f)^{-1},(f:g)]$, hence have a unique limit $I(f)$ along $\mathcal U$. Positive homogeneity and translation invariance pass to the limit. Almost additivity and subadditivity squeeze the limit to $I(f_1+f_2)=I(f_1)+I(f_2)$; also $I(g)=1$.

    Extend by differences: $I(p-q)=I(p)-I(q)$. If $p-q=p'-q'$, then $p+q'=p'+q$, and additivity proves independence of representation. It gives real linearity, positivity and left invariance on $C_c(G)$. Radon representation supplies the measure. Apply the same construction to the opposite group for a right Haar measure.

!!! proposition "Proposition (Borel invariance and strict positivity)"
    <a id="haar-borel-invariance"></a>

    A Haar functional is strictly positive on $C_c^+(G)$, every nonempty open set has positive measure, and translation invariance holds for all nonnegative Borel functions and all Borel sets.

??? proof "Proof"
    Choose $g$ with $I(g)>0$. A finite translated majorant $g\le\sum c_iL_{a_i}f$ gives $I(g)\le(\sum c_i)I(f)$, so $I(f)>0$. An Urysohn function supported in a nonempty open set proves positivity of that set. For each fixed translation, the translated measure and the original measure agree on $C_c(G)$ and therefore on Borel sets by Radon uniqueness. Equivalently the functional monotone-class theorem extends invariance from compactly supported test functions to bounded nonnegative Borel functions, and monotone convergence extends it to arbitrary nonnegative Borel functions.

!!! theorem "Theorem (Uniqueness up to scale)"
    <a id="haar-uniqueness"></a>

    Two left Haar functionals differ by a positive scalar; the same is true of two right Haar functionals.

??? proof "Proof"
    Let $I_1,I_2$ have measures $\mu_1,\mu_2$. Fix a symmetric compact identity neighbourhood $C$. Given $f,g\in C_c^+(G)$ and $\epsilon>0$, choose symmetric open $V\subseteq C$ so that $|f(xy)-f(yx)|,|g(xy)-g(yx)|\le\epsilon$ for $y\in V$, using the translation lemma. Choose a nonzero $h\ge0$ supported in $V$ and replace it by $h+h\circ\iota$ so $h(y^{-1})=h(y)$. Left invariance and Fubini give

    $$
    I_1(h)I_2(f)=\int_G\!\int_G h(y)f(yx)\,d\mu_1(y)d\mu_2(x),
    \qquad
    I_1(f)I_2(h)=\int_G\!\int_G h(y)f(xy)\,d\mu_1(y)d\mu_2(x).
    $$

    For the first identity, integrating $f(yx)$ in $x$ gives $I_2(f)$. For the second, start with $\int f(y)h(x)\,d\mu_1(y)d\mu_2(x)$. For fixed $y$ translate $x$ to replace $h(x)$ by $h(y^{-1}x)$; symmetry changes this to $h(x^{-1}y)$. Fubini exchanges the integrals, and translation of $y$ by $x$ gives $h(y)f(xy)$ as asserted. All these uses of Fubini are justified by compact support and local finiteness.

    The difference is bounded by $\epsilon\mu_2(A)I_1(h)$, where $A=(\operatorname{Supp}(f)C)\cup(C\operatorname{Supp}(f))$. This compact set contains every $x$ for which either integrand is nonzero. Thus

    $$
    \left|\frac{I_2(f)}{I_1(f)}-\frac{I_2(h)}{I_1(h)}\right|
    \le\frac{\epsilon\mu_2(A)}{I_1(f)}.
    $$

    The analogous estimate for $g$, with its fixed compact set, implies that the ratios $I_2(f)/I_1(f)$ and $I_2(g)/I_1(g)$ differ by at most a constant times $\epsilon$. Letting $\epsilon\downarrow0$ makes them equal. Strict positivity justifies all divisions. Extension by differences proves proportionality on $C_c(G)$ and hence on Borel measures. The opposite group gives the right-handed result.

!!! theorem "Theorem (Sigma-finiteness)"
    <a id="thm-hm-4-2"></a>
    <a id="thm-sigma-finiteness"></a>

    Haar measures under the chapter's second-countability assumption are $\sigma$-finite.

??? proof "Proof"
    Compact exhaustion covers the group by countably many compact sets, each of finite measure. This proves the assertion. Haar measure on a noncompact group need not be finite; for example Lebesgue measure of $\mathbb R$ is infinite.

!!! definition "Definition (Modular function)"
    <a id="def-hm-4-3"></a>
    <a id="def-modular-function"></a>

    With the convention $\mu(Eg)=\Delta(g)\mu(E)$, the modular function is a continuous homomorphism $G\to\mathbb R_{>0}$. The measure is also right invariant precisely when $\Delta\equiv1$.

??? proof "Proof"
    Right translation of a left Haar measure remains left invariant, so uniqueness supplies its positive factor. Successive translations give multiplicativity. Fix $f\in C_c^+(G)$; the formula $I(R_gf)=\Delta(g)^{-1}I(f)$ determines the factor. Near any fixed $g$, the translated supports lie in one compact set, and uniform continuity of translations makes the integrals continuous, proving continuity of $\Delta$.

## Change of Variables

!!! definition "Definition (Commutators and special linear group)"
    <a id="commutator-special-linear-group"></a>

    Put $[a,b]=aba^{-1}b^{-1}$ and let $[G,G]$ be the subgroup generated by all commutators. Conjugation $C_g(x)=gxg^{-1}$ is an automorphism. For a finite-dimensional vector space, $\mathrm{GL}(V)$ is its automorphism group and $\mathrm{SL}(V)=\ker(\det)$.

!!! proposition "Proposition (Abelianization)"
    <a id="abelianization-universal-property"></a>

    The commutator subgroup is normal, and $G/[G,G]$ represents homomorphisms from $G$ to abelian groups.

??? proof "Proof"
    Direct multiplication gives $[a,b]^{-1}=[b,a]$ and $C_g([a,b])=[C_g(a),C_g(b)]$, proving normality. In the quotient all commutators vanish, so all elements commute. Any map into an abelian group kills every commutator and hence the generated subgroup, so it factors uniquely through the quotient. This factorization commutes with maps between target groups, proving representability.

!!! lemma "Lemma (Generation by elementary transvections)"
    <a id="elementary-transvections"></a>

    With a basis $(e_i)_{i=1}^n$, let $S_{ij}(\lambda)$ send $x$ to $x+\lambda x_je_i$ for $i\ne j$. These maps generate $\mathrm{SL}(V)$. Every $f\in\mathrm{GL}(V)$ is a product of transvections followed by $D_{\det f}$, where $D_b$ multiplies $e_1$ by $b$ and fixes the other basis vectors.

??? proof "Proof"
    Each transvection has determinant one and inverse $S_{ij}(-\lambda)$. Induct on $n$, with dimensions zero and one immediate. For $n\ge2$, the vector $f(e_n)$ is nonzero. If its first $n-1$ coordinates all vanish, apply $S_{1n}(1)$ to make the first coordinate nonzero. A transvection adding a suitable multiple of a nonzero coordinate to the last makes its last coordinate one. Further $S_{in}$ operations kill its other coordinates, so $f(e_n)=e_n$. The induced invertible map on $V/Ke_n$ can by induction be reduced, using transvections in the first $n-1$ coordinates, to the diagonal map multiplying $e_1$ by a nonzero $b$. Thus $f(e_1)=be_1+c_1e_n$ and $f(e_i)=e_i+c_ie_n$ for $2\le i<n$. The wedge formula gives $b=\det f$. Finally $S_{n1}(-c_1/b)$ and $S_{ni}(-c_i)$ remove these last coordinates. Reversing the operations proves the decomposition. If the determinant is one the final diagonal map is the identity, proving generation.

!!! theorem "Theorem (Commutator subgroup of the general linear group)"
    <a id="general-linear-commutator"></a>

    Over a field $K$, if $\dim V\ne2$ or $K\ne\mathbb F_2$, then $[\mathrm{GL}(V),\mathrm{GL}(V)]=\mathrm{SL}(V)$. Every homomorphism $\mathrm{GL}(V)\to K^\times$ consequently factors through the determinant.

??? proof "Proof"
    The determinant kills commutators, giving one inclusion. Dimensions zero and one are immediate. In dimension two choose $b\notin\{0,1\}$; direct evaluation on coordinates gives $[S_{12}(1),D_b]=S_{12}(1-b)$. In dimension at least three direct evaluation gives $[S_{13}(1),S_{32}(1)]=S_{12}(1)$. In either case the commutator subgroup contains $S_{12}(t)$ for some $t\ne0$. Conjugating by $D_{\lambda/t}$ gives $S_{12}(\lambda)$; conjugating by permutation matrices gives every $S_{ij}(\lambda)$. The generation lemma proves the other inclusion. A homomorphism to $K^\times$ kills this subgroup; defining $\psi(b)=\phi(D_b)$ gives a group homomorphism and $\phi(f)=\psi(\det f)$ by the decomposition. In dimension zero choose the trivial $\psi$.

!!! lemma "Lemma (One-dimensional scaling)"
    <a id="real-one-dimensional-scaling"></a>

    For nonnegative Borel $h$ and $b\ne0$, $\int_\mathbb R h(bt)\,dt=|b|^{-1}\int_\mathbb R h(t)\,dt$.

??? proof "Proof"
    The image of Lebesgue measure under multiplication by $b$ is a Haar measure, so has a positive factor $\lambda(b)$. These factors form a homomorphism. Fix a nonzero compactly supported continuous $h$; dominated convergence, with one compact support bound for $b$ near a nonzero value, proves continuity of $\lambda$. Thus $\lambda(b)=|b|^t$ by the real homomorphism result. Taking $b=2$ and $h=\mathbf1_{[0,2)}$ gives $\lambda(2)=1/2$, hence $t=-1$. Equality for all nonnegative Borel functions follows from measure equality.

!!! theorem "Theorem (Linear change of variables)"
    <a id="linear-change-of-variables"></a>

    For a Haar measure $\nu$ on a finite-dimensional real vector space and $f\in\mathrm{GL}(V)$,

    $$
    f_*\nu=|\det f|^{-1}\nu,\qquad \nu(f(A))=|\det f|\nu(A).
    $$

??? proof "Proof"
    A basis identifies $V$ with $\mathbb R^n$, and Haar uniqueness makes $\nu$ a positive multiple of product Lebesgue measure. Its image under $f$ is Haar since $f(x)+y=f(x+f^{-1}(y))$, so $f_*\nu=\phi(f)\nu$, with $\phi$ a homomorphism. The commutator theorem implies that $\phi$ factors through the determinant. Fubini and one-dimensional scaling give $\phi(D_b)=|b|^{-1}$, and the transvection decomposition gives the result for every $f$. The image-set identity follows by applying the pushforward formula to $f(A)$.

!!! theorem "Theorem (Differentiable change of variables)"
    <a id="thm-hm-5-1"></a>
    <a id="thm-differentiable-change-of-variables"></a>

    Let $U,V$ be open in a finite-dimensional real vector space, $\nu$ a Haar measure, and $\varphi:U\to V$ a $C^1$ diffeomorphism. For every nonnegative Borel $f$,

    $$
    \int_V f(y)\,d\nu(y)=\int_U f(\varphi(x))|\det D\varphi(x)|\,d\nu(x).
    $$

    For signed or complex functions the same formula holds whenever the absolute value is integrable.

??? proof "Proof"
    Choose coordinates and the sup norm on $\mathbb R^n$. The zero-dimensional case is immediate. For a half-open cube $Q$ with compact closure in $U$ and side length $\ell$, the mean-value inequality bounds the range of each coordinate of $\varphi$ by $M\ell$, where $M=\sup_Q\|D\varphi\|$. Thus its image lies in a closed cube of that side length and

    $$
    \nu(\varphi(Q))\le M^n\nu(Q).
    $$

    Closed and half-open cubes have the same volume since their boundaries are Lebesgue-null. For a rational half-open rectangle $A$ with closure in $U$, subdivide into finitely many equal small cubes $Q_i$ so that $\|D\varphi(y)^{-1}D\varphi(x)\|^n\le1+\epsilon$ on each closure. This follows from uniform continuity of the derivative and boundedness of its inverses on the compact closure. Choose $x_i$ in each closure with $|\det D\varphi(x_i)|\le\nu(Q_i)^{-1}\int_{Q_i}|\det D\varphi|\,d\nu$; a minimum on that closure suffices. Apply the cube estimate to $D\varphi(x_i)^{-1}\varphi$ and then linear change of variables to obtain

    $$
    \nu(\varphi(Q_i))\le(1+\epsilon)\int_{Q_i}|\det D\varphi|\,d\nu.
    $$

    Sum over the disjoint cubes and let $\epsilon\downarrow0$. The rational rectangles form a countable semiring generating the topology of $U$. Every open subset is a countable disjoint union of such rectangles, obtained by taking their successive differences and splitting each difference into finitely many rectangles. Countable additivity gives the same bound on open subsets. The measures $A\mapsto\nu(\varphi(A))$ and $A\mapsto\int_A|\det D\varphi|\,d\nu$ are Radon measures on $U$: the former is transported by a homeomorphism, and the latter has a continuous locally bounded density. Outer regularity therefore extends the bound to all Borel sets.

    First applying the bound to indicators, then simple functions, and then their increasing approximations gives the inequality in the displayed theorem. Apply it also to $\varphi^{-1}$ and the function $x\mapsto f(\varphi(x))|\det D\varphi(x)|$. Since $D\varphi^{-1}(y)=D\varphi(\varphi^{-1}(y))^{-1}$, the determinant factors cancel, yielding the reverse inequality. This proves equality. Decomposition into positive and negative real and imaginary parts gives the integrable version.

!!! example "Example (Haar densities)"
    <a id="haar-density-examples"></a>

    On $\mathbb R^n$ the Haar measures are positive multiples of Lebesgue measure. On $\mathbb R^\times$ one may use $dx/|x|$. On $\mathrm{GL}_n(\mathbb R)$ one may use $dX/|\det X|^n$.

??? proof "Proof"
    Multiplication by $a\ne0$ scales $dx$ by $|a|$ and $|x|$ by the same factor, proving the second assertion. The map $X\mapsto AX$ on the real space of matrices acts independently on $n$ columns and has Jacobian $|\det A|^n$. Its density denominator is multiplied by that same factor. The differentiable change-of-variables formula proves invariance. The densities are positive and locally integrable on their respective open groups, so these are Radon Haar measures.

!!! proposition "Proposition (Automorphisms and Haar measure)"
    <a id="haar-automorphism-scaling"></a>

    A topological group automorphism $\alpha$ scales Haar measure by a positive constant: $\alpha_*\mu=J(\alpha)\mu$. Left translations preserve it. For general diffeomorphisms of real vector spaces the appropriate factor is the pointwise determinant in the change-of-variables theorem.

??? proof "Proof"
    The homomorphism identity $\alpha^{-1}(gE)=\alpha^{-1}(g)\alpha^{-1}(E)$ makes $\alpha_*\mu$ left invariant, so uniqueness gives the factor. The homomorphism hypothesis is essential: arbitrary homeomorphisms need not scale Haar measure by a constant.
