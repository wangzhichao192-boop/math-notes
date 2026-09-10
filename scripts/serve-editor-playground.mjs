// Isolated UI test server. Never writes the user's notes or their browser drafts.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
let source = "# 写作试验\n\nA **binary relation** on a set.\n\n连续中文输入与 English typing。\n\n- 第一项\n- 第二项\n\n$$\nx^2 + y^2\n$$\n\n```text\n**literal** $not_math$\n```\n";
const revision = () => createHash("sha256").update(source).digest("hex");
const assets = new Map([
  ["/editor.js", ["docs/javascripts/editor.js", "text/javascript"]],
  ["/codemirror.bundle.js", ["docs/javascripts/codemirror.bundle.js", "text/javascript"]],
  ["/editor.css", ["docs/stylesheets/editor.css", "text/css"]],
  ["/katex.js", ["scripts/node_modules/katex/dist/katex.min.js", "text/javascript"]],
  ["/katex.css", ["scripts/node_modules/katex/dist/katex.min.css", "text/css"]]
]);
const server = http.createServer(async (req, res) => {
  try {
    const path = new URL(req.url, "http://127.0.0.1").pathname;
    res.setHeader("Cache-Control", "no-store");
    if (path === "/save" && req.method === "POST") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const data = JSON.parse(body);
      await new Promise(resolve => setTimeout(resolve, 600));
      res.setHeader("Content-Type", "application/json");
      if (data.baseRevision !== revision()) { res.statusCode = 409; return res.end(JSON.stringify({ message: "测试版本冲突" })); }
      source = data.source;
      return res.end(JSON.stringify({ ok: true, revision: revision() }));
    }
    if (assets.has(path) || /^\/fonts\/[\w.-]+$/.test(path)) {
      const [file, mime] = assets.get(path) || ["scripts/node_modules/katex/dist" + path, "font/woff2"];
      res.setHeader("Content-Type", mime);
      return res.end(await readFile(root + file));
    }
    if (path !== "/") { res.statusCode = 404; return res.end(); }
    const payload = { sourcePath: "__writing-test.md", sourceB64: Buffer.from(source).toString("base64"), revision: revision(), saveEndpoint: "/save", courses: [] };
    let html = await readFile(root + "scripts/editor-playground.html", "utf8");
    html = html.replace("__PAYLOAD__", JSON.stringify(payload));
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.end(html);
  } catch (error) { res.statusCode = 500; res.end(String(error)); }
});
server.listen(8766, "127.0.0.1", () => console.log("Isolated editor playground: http://127.0.0.1:8766/"));
