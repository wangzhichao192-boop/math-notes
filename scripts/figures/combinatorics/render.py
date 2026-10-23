"""Render the course's editable SVG diagrams with embedded, typeset vector labels.

Run from any directory: python3 scripts/figures/combinatorics/render.py
Requirements: matplotlib, lxml. Formula syntax is MathText (STIX glyphs).
Geometry is preserved from source/*.svg; LABELS supplies actual mathematics.
"""
import os
os.environ.setdefault('MPLCONFIGDIR', '/private/tmp/math-notes-mpl')
from pathlib import Path
import re, json, warnings
from lxml import etree as E
import matplotlib
matplotlib.use('Agg')
matplotlib.rcParams.update({'mathtext.fontset': 'stix', 'svg.fonttype': 'path'})
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from matplotlib.path import Path as MPath

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
OUT=ROOT/'docs/assets/combinatorics'
OUT.mkdir(parents=True,exist_ok=True)
NS='http://www.w3.org/2000/svg'
def tag(s):return '{'+NS+'}'+s
LABELS={
 'Before: |M| = 2':r'Before: $|M|=2$',
 'After toggling: |M △ E(P)| = 3':r'After toggling: $|M\,\triangle\,E(P)|=3$',
 'blue = M':r'blue: $M$',
 'red dashed = E(P) \\\\ M':r'red dashed: $E(P)\setminus M$',
 'A bipartite C₆':r'A bipartite $C_6$',
 'vⱼvₚ':r'$v_jv_p$', 'vⱼ₊₁v₁':r'$v_{j+1}v_1$',
 'central cycle C':r'central cycle $C$',
 'detour around each Cᵢ, then resume C':r'detour around each $C_i$, then resume $C$',
 'S ⊆ X':r'$S\subseteq X$', 'N(S) ⊆ Y':r'$N(S)\subseteq Y$', 'N(S)':r'$N(S)$',
 '|N(S)| = 4 ≥ 3 = |S|':r'$|N(S)|=4\geq 3=|S|$',
 '|N(S)| = 2 < 3 = |S|':r'$|N(S)|=2<3=|S|$',
 'Incidence matrix B':r'Incidence matrix $B$',
 'Total weight 1 + 2 + 2 + 3 + 4 = 12':r'Total weight: $1+2+2+3+4=12$',
 'v = 5, e = 10':r'$v=5,\ e=10$', '10 > 3·5 − 6':r'$10>3\cdot5-6$',
 'v = 6, e = 9; triangle-free':r'$v=6,\ e=9$; triangle-free', '9 > 2·6 − 4':r'$9>2\cdot6-4$',
 'two edges f₀–f₁':r'two edges $f_0$–$f_1$', 'two edges f₀–f₂':r'two edges $f_0$–$f_2$',
 'A plane embedding of K₄':r'A plane embedding of $K_4$',
 'v = 4, e = 6, f = 4':r'$v=4,\ e=6,\ f=4$', 'a,b,c,a,d,a':r'$a,b,c,a,d,a$',
 'ℓ(F) = 5':r'$\ell(F)=5$',
 'level ℓ has ≤ kℓ nodes':r'level $\ell$ has $\leq k^{\ell}$ nodes',
 'Blue: fix the first member t₀; witnesses have eₙ ≤ t₀':r'Blue: fix $t_0$; witnesses satisfy $e_n\leq t_0$',
 'first halt of e₁':r'first halt of $e_1$', 'first halt of e₂':r'first halt of $e_2$',
 'first halt of e₃':r'first halt of $e_3$', 'first halt of e₄':r'first halt of $e_4$',
 'Disjoint intervals need distinct witnesses from {0, …, t₀}.':r'Disjoint intervals need distinct witnesses from $\{0,\ldots,t_0\}$.',
 'Red: choose tₑ ≥ e':r'Red: choose $t_e\geq e$',
 'Pₑ(e) halts eventually  ⇔  Pₑ(e) halts by tₑ₊₁':r'$P_e(e)$ halts eventually $\Longleftrightarrow$ $P_e(e)$ halts by $t_{e+1}$',
 'A computable T would provide a computable bound and decide H.':r'A computable $T$ would provide a computable bound and decide $H$.',
 'Cup: every Δ > 0':r'Cup: every $\Delta>0$', 'Cap: every Δ < 0':r'Cap: every $\Delta<0$',
 'V₀ infinite':r'$V_0$ infinite', 'V₁ infinite':r'$V_1$ infinite', 'V₂ infinite':r'$V_2$ infinite',
 'V₀ ⊃ V₁ ⊃ V₂ ⊃ ⋯':r'$V_0\supset V_1\supset V_2\supset\cdots$',
 'For i < j:  wⱼ ∈ Vᵢ  ⇒  c(wᵢwⱼ) = dᵢ':r'For $i<j$: $w_j\in V_i\ \Rightarrow\ c(w_iw_j)=d_i$',
 'Infinitely many dᵢ coincide; their wᵢ form an infinite monochromatic clique.':r'Infinitely many $d_i$ coincide; their $w_i$ form an infinite monochromatic clique.',
 'K₅: no monochromatic triangle':r'$K_5$: no monochromatic triangle',
 'K₆: inspect three same-colour neighbours':r'$K_6$: inspect three same-colour neighbours',
 'red C₅; blue complement is another C₅':r'red $C_5$; blue complement is another $C_5$',
 'all three dashed edges blue ⇒ blue triangle':r'all three dashed edges blue $\Rightarrow$ blue triangle',
 'any one red ⇒ a red triangle with u':r'any one red $\Rightarrow$ a red triangle with $u$',
 'A monochromatic triangle encodes x + y = z':r'A monochromatic triangle encodes $x+y=z$',
 'x = b − a':r'$x=b-a$', 'y = d − b':r'$y=d-b$', 'z = d − a':r'$z=d-a$',
 'a < b < d; all three differences lie in [M − 1]':r'$a<b<d$; all three differences lie in $[M-1]$',
 'Fix one element, then colour the remaining k-subsets':r'Fix one element, then colour the remaining $k$-subsets',
 'Sᵢ₊₁: infinite and homogeneous for fᵢ':r'$S_{i+1}$: infinite and homogeneous for $f_i$',
 'xᵢ₁':r'$x_{i_1}$', 'xᵢ₂':r'$x_{i_2}$', 'xᵢₖ':r'$x_{i_k}$',
 'i < i₁ < ⋯ < iₖ':r'$i<i_1<\cdots<i_k$',
 'fᵢ(A) = f(A ∪ {xᵢ})':r'$f_i(A)=f(A\cup\{x_i\})$',
 'f({xᵢ, xᵢ₁, …, xᵢₖ}) = yᵢ':r'$f(\{x_i,x_{i_1},\ldots,x_{i_k}\})=y_i$',
 'Choose infinitely many indices with the same yᵢ.':r'Choose infinitely many indices with the same $y_i$.',
 'Lower bound: m = 4, n = 3':r'Lower bound: $m=4,\ n=3$', 'red K₃':r'red $K_3$',
 'No red 4-vertex tree; no blue K₃':r'No red 4-vertex tree; no blue $K_3$',
 'A blue clique takes ≤ 1 vertex from each part':r'A blue clique takes $\leq 1$ vertex from each part',
 'v represents y':r'$v$ represents $y$', 'deg(v) ≥ m − 1':r'$\deg(v)\geq m-1$',
 'at most m − 2 neighbours already used':r'at most $m-2$ neighbours already used',
 'the unused vertex represents the new leaf z':r'the unused vertex represents the new leaf $z$',
 'P₂ below P₁P₃; Δ > 0':r'$P_2$ below $P_1P_3$; $\Delta>0$',
 'P₂ above P₁P₃; Δ < 0':r'$P_2$ above $P_1P_3$; $\Delta<0$',
 'a and b have no elements.':r'$a$ and $b$ have no elements.',
 'Distinct vertices, equal El.':r'Distinct vertices, equal $\mathrm{El}$.',
 'No vertex has elements {a,c}.':r'No vertex has elements $\{a,c\}$.',
 'Two steps reach all a,b,c.':r'Two steps reach all $a,b,c$.',
 'Predecessors: ∅':r'Predecessors: $\varnothing$', 'Predecessors: {p}':r'Predecessors: $\{p\}$',
 'Predecessors: {p,q}':r'Predecessors: $\{p,q\}$', 'Ordinal 0':r'Ordinal $0$',
 'Ordinal 1':r'Ordinal $1$', 'Ordinal 2':r'Ordinal $2$', 'Elements: ∅':r'Elements: $\varnothing$',
 'Elements: {0}':r'Elements: $\{0\}$', 'Elements: {0,1}':r'Elements: $\{0,1\}$',
 'Order: p < q < r. Numeral bars are omitted in this figure.':r'Order: $p<q<r$. Numeral bars are omitted in this figure.',
 'P(c)':r'$\mathcal{P}(c)$', 'El(c) = {a,b}meta':r'$\mathrm{El}(c)=\{a,b\}_{\mathrm{meta}}$',
 'Other elements of a,b are not shown.':r'Other elements of $a,b$ are not shown.',
 '∅meta    {a}meta    {b}meta':r'$\varnothing_{\mathrm{meta}}\quad\{a\}_{\mathrm{meta}}\quad\{b\}_{\mathrm{meta}}$',
 'Conditional case: if c is the only internal subset of c, then El(P(c)) = {c}meta.':r'If $c$ is the only internal subset of $c$, then $\mathrm{El}(\mathcal{P}(c))=\{c\}_{\mathrm{meta}}$.',
 'b → a means a ∈ b':r'$b\to a$ means $a\in b$', 'c → a means a ∈ c':r'$c\to a$ means $a\in c$',
 'El(b) = El(c) = {a}meta':r'$\mathrm{El}(b)=\mathrm{El}(c)=\{a\}_{\mathrm{meta}}$',
 'q ∈ q':r'$q\in q$', 'M has one vertex: q':r'$M$ has one vertex: $q$',
 '⋃q = q       P(q) = q':r'$\bigcup q=q\qquad\mathcal{P}(q)=q$',
 'Separate by the impossible condition x ≠ x':r'Separate by the impossible condition $x\neq x$',
 'A two-element source D':r'A two-element source $D$',
 'P(∅) = {∅};   D = P({∅}) = {∅, {∅}}':r'$\mathcal{P}(\varnothing)=\{\varnothing\};\quad D=\mathcal{P}(\{\varnothing\})=\{\varnothing,\{\varnothing\}\}$',
 'Pairing: {a,b}':r'Pairing: $\{a,b\}$',
 'Replacement sends ∅ ↦ a and {∅} ↦ b':r'Replacement sends $\varnothing\mapsto a$ and $\{\varnothing\}\mapsto b$',
 'The two inputs are distinct: only {∅} has an element.':r'The two inputs are distinct: only $\{\varnothing\}$ has an element.',
 'μ + 1':r'$\mu+1$', '(μ + 1) + 1':r'$(\mu+1)+1$',
 'f on β  →  f ∪ {(β, H(f))} on β + 1':r'$f$ on $\beta\ \longrightarrow\ f\cup\{(\beta,H(f))\}$ on $\beta+1$',
 'H reads the entire earlier function f.':r'$H$ reads the entire earlier function $f$.',
 'fδ  ⊆  fε       (δ < ε < λ)':r'$f_{\delta}\subseteq f_{\varepsilon}\qquad(\delta<\varepsilon<\lambda)$',
 'fλ = ⋃δ<λ fδ':r'$f_{\lambda}=\bigcup_{\delta<\lambda}f_{\delta}$',
 'word aba⁻¹b⁻¹; χ = 0':r'word $aba^{-1}b^{-1}$; $\chi=0$',
 'one pair reverses; χ = 0':r'one pair reverses; $\chi=0$',
 'e = ac':r'$e=ac$', 'f = ad':r'$f=ad$',
 'C_e △ C_f = acd':r'$C_e\,\triangle\,C_f=acd$', '△':r'$\triangle$',
 'C_e = abc':r'$C_e=abc$', 'C_f = abcd':r'$C_f=abcd$',
 'acd':r'$acd$',
 'root r':r'root $r$', 'n(S₂)':r'$n(S_2)$', 'n(S₁)':r'$n(S_1)$',
 'n(S₀) = v*':r'$n(S_0)=v^{*}$', 'branch in S₂':r'branch in $S_2$',
 'S₀ (red): v*':r'$S_0$ (red): $v^{*}$',
 'S₁ (blue): n(S₁)':r'$S_1$ (blue): $n(S_1)$',
 'S₂ (green): n(S₂)':r'$S_2$ (green): $n(S_2)$',
 'depth(n(S₂)) < depth(n(S₁))':r'$\mathrm{depth}(n(S_2))<\mathrm{depth}(n(S_1))$',
 '< depth(v*)':r'$<\mathrm{depth}(v^{*})$',
 'S₀ ∩ S₁ ∩ S₂ = {v*}':r'$S_0\cap S_1\cap S_2=\{v^{*}\}$',
 '∅':r'$\varnothing$', '…':r'$\ldots$', '⋯':r'$\cdots$', 'μ':r'$\mu$', '−1':r'$-1$',
}
SUB=str.maketrans('₀₁₂₃₄₅₆₇₈₉ᵢⱼₖₙₑₚ₊₋','0123456789ijknep+-')
def typeset(s):
 if s.startswith('red dashed = E(P)'):return r'red dashed: $E(P)\setminus M$'
 if s in LABELS:return LABELS[s]
 if re.fullmatch(r'[A-Za-z][₀₁₂₃₄₅₆₇₈₉ᵢⱼₖₙₑₚ₊₋]+(?:,[₀₁₂₃₄₅₆₇₈₉]+)?',s):
  return '$'+s[0]+'_{'+s[1:].translate(SUB)+'}$'
 if re.fullmatch(r'[A-Za-z0-9=]',s):return '$'+s+'$'
 return s

def pathdata(p):
 parts=[]
 for verts,code in p.iter_segments(simplify=False):
  nums=' '.join(f'{v:.4f}' for v in verts)
  parts.append({MPath.MOVETO:'M',MPath.LINETO:'L',MPath.CURVE3:'Q',MPath.CURVE4:'C',MPath.CLOSEPOLY:'Z'}[code]+('' if code==MPath.CLOSEPOLY else nums))
 return ' '.join(parts)

def decl(s):return dict(re.findall(r'([\w-]+)\s*:\s*([^;]+)',s))
def render(file):
 root=E.parse(str(file)).getroot()
 css=''.join(root.xpath('//*[local-name()="style"]/text()'))
 rules={k:decl(v) for k,v in re.findall(r'\.([\w-]+)\s*\{([^}]+)\}',css)}
 width,height=map(float,root.get('viewBox').split()[2:]); records=[]
 root.set('width',f'{width:g}');root.set('height',f'{height:g}')
 # Slightly lighter panels and consistent ink; coloured edges retain mathematical meaning.
 for style in root.xpath('//*[local-name()="style"]'):
  style.text=style.text.replace('fill:#f8fafc;stroke:#cbd5e1;stroke-width:2','fill:#f8fafb;stroke:#dce4e9;stroke-width:1.2')
 for i,t in enumerate(root.xpath('//*[local-name()="text"]')):
  original=''.join(t.itertext()); label=typeset(original)
  if not original: t.getparent().remove(t);continue
  props={}
  for cls in t.get('class','').split():props.update(rules.get(cls,{}))
  props.update(t.attrib);props.update(decl(t.get('style','')))
  font=props.get('font','20px sans-serif');size=float(re.search(r'([\d.]+)px',font).group(1))
  weight='semibold' if re.search(r'\b[6-9]00\b',font) else 'normal'
  if label.startswith('$') and label.endswith('$') and label.count('$')==2 and size<23:
   size=min(24,size*1.16)
  fp=FontProperties(family='DejaVu Sans',weight=weight,size=size)
  with warnings.catch_warnings():
   warnings.simplefilter('error')
   path=TextPath((0,0),label,size=size,prop=fp,usetex=False)
  b=path.get_extents();x=float(t.get('x'));y=float(t.get('y'))
  # Source coordinates can be local to translated groups.
  tx=ty=0.
  for parent in t.iterancestors():
   if parent.get('transform'):
    tr=re.fullmatch(r'translate\(\s*([-\d.]+)[ ,]+([-\d.]+)\s*\)',parent.get('transform'))
    assert tr,parent.get('transform')
    tx+=float(tr[1]);ty+=float(tr[2])
  gx,gy=x+tx,y+ty
  anchor=props.get('text-anchor','start'); scale=1.
  # Keep labels within their figure and containing panel; compact panel titles have extra inset.
  limit=width-40
  for r in root.xpath('//*[local-name()="rect"]'):
   if r.get('class') not in ('panel','box','soft'):continue
   rx,ry,rw,rh=[float(r.get(a,0)) for a in ['x','y','width','height']]
   if rx<gx<rx+rw and ry<gy<ry+rh:
    avail=2*min(gx-rx,rx+rw-gx)-24 if anchor=='middle' else rx+rw-gx-20
    if avail>80:limit=min(limit,avail)
  if anchor=='middle':limit=min(limit,2*min(gx-12,width-12-gx))
  if b.width>limit:scale=limit/b.width
  shiftx=-(b.x0+b.x1)/2 if anchor=='middle' else (-b.x1 if anchor=='end' else 0)
  shifty=(b.y0+b.y1)/2 if props.get('dominant-baseline') in ('middle','central') else 0
  group=E.Element(tag('g'),{'role':'img','aria-label':original,'data-typeset':label})
  group.set('transform',f'translate({x:g} {y:g}) scale({scale:.6f} {-scale:.6f}) translate({shiftx:.5f} {-shifty:.5f})')
  title=E.SubElement(group,tag('title'));title.text=label
  attrs={'d':pathdata(path),'fill':props.get('fill','#334155')}
  for k in ['paint-order','stroke','stroke-width']:
   if k in props:attrs[k]=props[k]
  E.SubElement(group,tag('path'),attrs)
  t.getparent().replace(t,group)
  box=[gx+scale*(b.x0+shiftx),gy-scale*(b.y1-shifty),gx+scale*(b.x1+shiftx),gy-scale*(b.y0-shifty)]
  records.append({'label':original,'typeset':label,'scale':round(scale,3),'box':box})
 # Overall description retains all information even when text is outlined.
 desc=E.SubElement(root,tag('desc'));desc.text='Figure labels: '+'; '.join(r['label'] for r in records)
 root.set('data-renderer','Matplotlib MathText / STIX; embedded vector paths')
 (OUT/file.name).write_bytes(E.tostring(root,encoding='utf-8',xml_declaration=True))
 return records
if __name__=='__main__':
 audit={}
 for p in sorted((HERE/'source').glob('*.svg')):
  audit[p.name]=render(p)
  print(p.name,len(audit[p.name]),'labels')
 from recursion import render_recursion
 render_recursion(OUT/'sets-transfinite-recursion.svg',HERE/'source/sets-transfinite-recursion.svg')
 (HERE/'render-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
 print('Rendered',len(audit),'figures with',sum(map(len,audit.values())),'labels.')
