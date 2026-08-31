// Renders every $...$ / $$...$$ formula in the docs with KaTeX and
// reports parse errors. Exit 0 = clean, 1 = errors.
// Usage: node scripts/check_math.js [file-or-dir ...]
const fs = require('fs');
const path = require('path');

let katex;
try { katex = require('katex'); }
catch { console.error('katex not installed. Run: cd scripts && npm install'); process.exit(1); }

function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const root = path.resolve(__dirname, '..');
let targets = process.argv.slice(2);
if (targets.length === 0) targets = [path.join(root, 'docs')];
if (targets.length === 1 && targets[0].startsWith('docs')) targets = [path.join(root, targets[0])];

const files = [];
for (const t of targets) {
  const p = path.resolve(root, t);
  if (!fs.existsSync(p)) { console.error('not found:', t); process.exit(1); }
  if (fs.statSync(p).isDirectory()) files.push(...walk(p));
  else files.push(p);
}

let errors = 0, tested = 0;

for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  // mask code (never rendered as math on the site) so its `$` chars
  // don't create false positives; masks keep line offsets intact.
  src = src.replace(/```[\s\S]*?```/g, (x) => ' '.repeat(x.length));
  src = src.replace(/~~~[\s\S]*?~~~/g, (x) => ' '.repeat(x.length));
  src = src.replace(/`[^`\n]+`/g, (x) => ' '.repeat(x.length));
  const starts = []; { let o = 0; for (const l of src.split('\n')) { starts.push(o); o += l.length + 1; } }
  const lineno = (i) => { let lo = 0, hi = starts.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (starts[m] <= i) lo = m; else hi = m - 1; } return lo + 1; };
  const blocks = [];
  let m; const reD = /\$\$([\s\S]*?)\$\$/g;
  while ((m = reD.exec(src)) !== null) blocks.push({ tex: m[1], line: lineno(m.index), disp: true });
  const without = src.replace(/\$\$[\s\S]*?\$\$/g, (x) => ' '.repeat(x.length));
  let r; const reI = /\$([^$\n]+)\$/g;
  while ((r = reI.exec(without)) !== null) blocks.push({ tex: r[1], line: lineno(r.index), disp: false });
  for (const b of blocks) {
    if (!b.tex.trim()) continue;
    tested++;
    try { katex.renderToString(b.tex, { throwOnError: true, displayMode: b.disp, strict: false }); }
    catch (e) {
      errors++;
      console.log(`${path.relative(root, f)}:${b.line}: ${String(e.message).split('\n')[0]}`);
      console.log('   ' + b.tex.slice(0, 140).replace(/\s+/g, ' '));
    }
  }
}

console.log(`Checked ${files.length} file(s), ${tested} formula(s), ${errors} error(s).`);
process.exit(errors ? 1 : 0);
