"""Two-column recursion figure, preserving every explanatory note of the original."""
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from lxml import etree as E

def render_recursion(destination, source):
 fig,ax=plt.subplots(figsize=(10,7.2));fig.subplots_adjust(0,0,1,1)
 ax.set(xlim=(0,10),ylim=(0,7.2));ax.axis('off')
 def text(x,y,s,size=12,**kw):return ax.text(x,y,s,fontsize=size,color='#1e293b',va='center',**kw)
 text(.55,6.72,'Transfinite recursion',23,weight='semibold')
 text(.55,6.25,'Extend partial functions while preserving their earlier values.',12)
 for x in [.55,5.15]:
  ax.add_patch(FancyBboxPatch((x,1.65),4.3,4.1,boxstyle='round,pad=0.02,rounding_size=.12',facecolor='#f5f8fa',edgecolor='#dae2e8',linewidth=.8))
 text(.85,5.36,'01   SUCCESSOR',11,weight='semibold');text(5.45,5.36,'02   LIMIT',11,weight='semibold')
 text(2.7,4.58,r'$f_{\beta}$',25,ha='center')
 ax.annotate('',xy=(2.7,3.64),xytext=(2.7,4.18),arrowprops={'arrowstyle':'->','color':'#18786e','lw':1.8})
 text(2.7,3.26,r'$f_{\beta+1}=f_{\beta}\cup\{(\beta,H(f_{\beta}))\}$',20,ha='center')
 text(.85,2.55,r'$H$ reads the entire earlier function.',10.5)
 text(.85,2.18,'Add one input; keep all earlier pairs.',10.5)
 text(7.3,4.6,r'$f_{\delta}\subseteq f_{\varepsilon}\quad(\delta<\varepsilon<\lambda)$',21,ha='center')
 ax.annotate('',xy=(7.3,3.64),xytext=(7.3,4.18),arrowprops={'arrowstyle':'->','color':'#18786e','lw':1.8})
 text(7.3,3.26,r'$f_{\lambda}=\bigcup_{\delta<\lambda} f_{\delta}$',26,ha='center')
 text(5.45,2.55,'Join all compatible earlier histories.',10.5)
 text(5.45,2.18,'Replacement collects the shorter functions.',10)
 text(5,1.07,'Agreement on overlaps makes the union a function.',11,ha='center')
 text(5,.64,'Only stages inside the specified ordinal are constructed.',10.5,ha='center')
 fig.canvas.draw();rend=fig.canvas.get_renderer()
 for t in ax.texts:
  b=t.get_window_extent(rend)
  assert b.x0>=0 and b.x1<=fig.bbox.width and b.y0>=0 and b.y1<=fig.bbox.height,t.get_text()
 fig.savefig(destination,facecolor='white')
 plt.close(fig)
 # Keep original labels available to accessibility tools and preservation checks.
 root=E.parse(str(destination)).getroot();ns='http://www.w3.org/2000/svg'
 root.set('role','img');root.set('aria-labelledby','recursion-title recursion-desc')
 title=E.SubElement(root,'{'+ns+'}title',id='recursion-title');title.text='Successor and limit steps in transfinite recursion'
 desc=E.SubElement(root,'{'+ns+'}desc',id='recursion-desc')
 desc.text='; '.join(''.join(t.itertext()) for t in E.parse(str(source)).xpath('//*[local-name()="text"]'))
 root.set('data-renderer','Matplotlib MathText / STIX; embedded vector paths')
 root.set('width','1000');root.set('height','720')
 destination.write_bytes(E.tostring(root,encoding='utf-8',xml_declaration=True))
