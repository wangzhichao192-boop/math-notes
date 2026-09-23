"""Exercise management through a real MkDocs server in an isolated directory."""
import json
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]


class ManagementFlow(unittest.TestCase):
    def test_create_reorder_and_reject_stale_requests(self):
        with tempfile.TemporaryDirectory(prefix="math-notes-test-") as directory:
            root = Path(directory)
            docs = root / "docs"
            (docs / "first").mkdir(parents=True)
            (docs / "first/index.md").write_text("# First\n\n## 目录\n", encoding="utf-8")
            (docs / "reference.md").write_text("# Reference\n", encoding="utf-8")
            (docs / "index.md").write_text(
                '<div class="grid cards" markdown>\n\n'
                '- **First**\n\n    [进入](first/index.md)\n\n</div>\n', encoding="utf-8")
            config = root / "mkdocs.yml"
            config.write_text(
                'site_name: Test\nsite_url: http://localhost/math-notes/\n'
                'markdown_extensions: [md_in_html, admonition]\n'
                f'hooks:\n  - {json.dumps(str(ROOT / "hooks/editor.py"))}\n'
                'nav:\n  - 首页: index.md\n  - First:\n      - first/index.md\n'
                '  - 参考:\n      - Reference: reference.md\n', encoding="utf-8")
            with socket.socket() as sock:
                sock.bind(("127.0.0.1", 0))
                port = sock.getsockname()[1]
            self.base = f"http://127.0.0.1:{port}/math-notes/"
            with (root / "server.log").open("w+") as log:
                process = subprocess.Popen(
                    [sys.executable, "-m", "mkdocs", "serve", "-f", str(config),
                     "-a", f"127.0.0.1:{port}"], stdout=log, stderr=log,
                    stdin=subprocess.DEVNULL)
                try:
                    initial_page = self.wait_page("")
                    self.assertIn("MathNotesDeferReload", initial_page)
                    _, before = self.post({"action": "status"})
                    self.assertEqual([c["slug"] for c in before["courses"]], ["first"])
                    status, result = self.post({"action": "createCourse", "title": "抽象代数",
                                               "slug": "abstract-algebra", "description": "待补充"})
                    self.assertEqual(status, 201)
                    self.assertEqual(result["path"], "abstract-algebra/index.md")
                    self.wait_page("abstract-algebra/", "抽象代数")
                    course_index_path = docs / "abstract-algebra/index.md"
                    course_index_path.write_text(
                        course_index_path.read_text(encoding="utf-8").replace("## 目录", "## 笔记"),
                        encoding="utf-8",
                    )
                    home = self.wait_page("", "abstract-algebra/")
                    self.assertIn("抽象代数", home)
                    status, result = self.post({"action": "createPage", "course": "abstract-algebra",
                                               "title": "Groups", "slug": "groups"})
                    self.assertEqual(status, 201)
                    self.wait_page("abstract-algebra/groups/", "Groups")
                    index = (docs / "abstract-algebra/index.md").read_text(encoding="utf-8")
                    self.assertIn("[Groups](groups.md)", index)
                    self.assertIn("\n\n1. [Groups]", index)
                    _, outline_status = self.post({"action": "status"})
                    status, part_result = self.post({
                        "action": "createPart", "course": "abstract-algebra", "title": "Part I",
                        "baseRevision": outline_status["structureRevision"],
                    })
                    self.assertEqual(status, 201)
                    moved_outline = part_result["outline"]
                    groups = next(item for item in moved_outline if item.get("path", "").endswith("groups.md"))
                    moved_outline.remove(groups)
                    moved_outline[-1]["children"].append(groups)
                    status, outline_result = self.post({
                        "action": "saveCourseOutline", "course": "abstract-algebra",
                        "outline": moved_outline, "baseRevision": part_result["structureRevision"],
                    })
                    self.assertEqual(status, 200, outline_result)
                    status, rings = self.post({
                        "action": "createPage", "course": "abstract-algebra", "kind": "chapter",
                        "partTitle": "Part I", "title": "Rings", "slug": "rings",
                        "baseRevision": outline_result["structureRevision"],
                    })
                    self.assertEqual(status, 201)
                    status, ideals = self.post({
                        "action": "createPage", "course": "abstract-algebra", "kind": "subchapter",
                        "parentPath": "abstract-algebra/rings.md", "title": "Ideals", "slug": "ideals",
                        "baseRevision": rings["structureRevision"],
                    })
                    self.assertEqual(status, 201)
                    nested_source = config.read_text(encoding="utf-8")
                    self.assertIn('      - "Part I":', nested_source)
                    self.assertIn('          - "Rings":', nested_source)
                    self.assertIn('              - "Rings": abstract-algebra/rings.md', nested_source)
                    self.assertIn('              - "Ideals": abstract-algebra/ideals.md', nested_source)
                    _, fresh = self.post({"action": "status"})
                    status, _ = self.post({"action": "reorderCourses", "order": ["abstract-algebra", "first"],
                                          "baseRevision": fresh["structureRevision"]})
                    self.assertEqual(status, 200)
                    source = config.read_text(encoding="utf-8")
                    self.assertLess(source.index("abstract-algebra/index.md"), source.index("first/index.md"))
                    home_source = (docs / "index.md").read_text(encoding="utf-8")
                    self.assertLess(home_source.index("abstract-algebra/index.md"), home_source.index("first/index.md"))
                    self.wait_page("", "抽象代数")
                    _, current = self.post({"action": "status"})
                    self.assertEqual([c["slug"] for c in current["courses"]], ["abstract-algebra", "first"])
                    snapshot = config.read_bytes(), (docs / "index.md").read_bytes()
                    status, _ = self.post({"action": "reorderCourses", "order": ["first", "abstract-algebra"],
                                          "baseRevision": fresh["structureRevision"]})
                    self.assertEqual(status, 409)
                    status, _ = self.post({"action": "reorderCourses", "order": ["first", "first"],
                                          "baseRevision": current["structureRevision"]})
                    self.assertEqual(status, 400)
                    status, _ = self.post({"action": "createCourse", "title": "重复", "slug": "abstract-algebra"})
                    self.assertEqual(status, 409)
                    status, _ = self.post({"action": "createCourse", "title": "越界", "slug": "../escape"})
                    self.assertEqual(status, 400)
                    status, _ = self.post({"action": "status"}, origin="https://other.example")
                    self.assertEqual(status, 403)
                    self.assertEqual(snapshot, (config.read_bytes(), (docs / "index.md").read_bytes()))

                    _, rename_status = self.post({"action": "status"})
                    abstract = next(course for course in rename_status["courses"]
                                    if course["slug"] == "abstract-algebra")
                    self.assertEqual(abstract["pageCount"], 3)
                    status, result = self.post({
                        "action": "renamePage", "course": "abstract-algebra",
                        "path": "abstract-algebra/groups.md", "title": "Group Theory",
                        "baseRevision": rename_status["structureRevision"],
                    })
                    self.assertEqual(status, 200)
                    self.assertEqual(result["url"], "/math-notes/abstract-algebra/groups/")
                    self.assertIn('"Group Theory": abstract-algebra/groups.md',
                                  config.read_text(encoding="utf-8"))
                    self.assertTrue((docs / "abstract-algebra/groups.md").read_text(
                        encoding="utf-8").startswith("# Group Theory\n"))
                    self.assertIn("[Group Theory](groups.md)", (docs / "abstract-algebra/index.md").read_text(
                        encoding="utf-8"))
                    self.wait_page("abstract-algebra/groups/", "Group Theory")

                    _, rename_status = self.post({"action": "status"})
                    status, result = self.post({
                        "action": "renameCourse", "course": "abstract-algebra",
                        "path": "abstract-algebra/groups.md", "title": "现代代数",
                        "baseRevision": rename_status["structureRevision"],
                    })
                    self.assertEqual(status, 200)
                    self.assertEqual(result["url"], "/math-notes/abstract-algebra/groups/")
                    self.assertIn('"现代代数":', config.read_text(encoding="utf-8"))
                    self.assertIn("**现代代数**", (docs / "index.md").read_text(encoding="utf-8"))
                    self.assertTrue((docs / "abstract-algebra/index.md").read_text(
                        encoding="utf-8").startswith("# 现代代数\n"))
                    self.wait_page("abstract-algebra/", "现代代数")

                    _, delete_status = self.post({"action": "status"})
                    status, _ = self.post({
                        "action": "deletePage", "course": "abstract-algebra",
                        "path": "abstract-algebra/groups.md", "confirmation": "Groups",
                        "baseRevision": delete_status["structureRevision"],
                    })
                    self.assertEqual(status, 400)
                    self.assertTrue((docs / "abstract-algebra/groups.md").is_file())
                    status, result = self.post({
                        "action": "deletePage", "course": "abstract-algebra",
                        "path": "abstract-algebra/groups.md", "confirmation": "Group Theory",
                        "baseRevision": delete_status["structureRevision"],
                    })
                    self.assertEqual(status, 200, result)
                    self.assertEqual(result["url"], "/math-notes/abstract-algebra/")
                    self.assertFalse((docs / "abstract-algebra/groups.md").exists())
                    self.assertNotIn("abstract-algebra/groups.md", config.read_text(encoding="utf-8"))
                    self.assertNotIn("groups.md", (docs / "abstract-algebra/index.md").read_text(
                        encoding="utf-8"))
                    self.assertTrue((root / result["recovery"]).is_file())
                    config_after_page_delete = config.read_text(encoding="utf-8")
                    self.assertIn("  - First:\n      - first/index.md\n", config_after_page_delete)
                    _, after_page_delete = self.post({"action": "status"})
                    self.assertEqual([course["slug"] for course in after_page_delete["courses"]],
                                     ["abstract-algebra", "first"])

                    _, delete_status = self.post({"action": "status"})
                    status, _ = self.post({
                        "action": "deleteCourse", "course": "abstract-algebra",
                        "confirmation": "抽象代数",
                        "baseRevision": delete_status["structureRevision"],
                    })
                    self.assertEqual(status, 400)
                    self.assertTrue((docs / "abstract-algebra").is_dir())
                    status, result = self.post({
                        "action": "deleteCourse", "course": "abstract-algebra",
                        "confirmation": "现代代数",
                        "baseRevision": delete_status["structureRevision"],
                    })
                    self.assertEqual(status, 200)
                    self.assertEqual(result["url"], "/math-notes/")
                    self.assertFalse((docs / "abstract-algebra").exists())
                    self.assertNotIn("abstract-algebra/index.md", config.read_text(encoding="utf-8"))
                    self.assertNotIn("abstract-algebra/index.md", (docs / "index.md").read_text(
                        encoding="utf-8"))
                    self.assertTrue((root / result["recovery"]).is_dir())
                    self.assertIn("  - First:\n      - first/index.md\n", config.read_text(encoding="utf-8"))
                    self.wait_page("", "First")
                except Exception:
                    log.flush()
                    log.seek(0)
                    print(log.read(), file=sys.stderr)
                    raise
                finally:
                    process.terminate()
                    try:
                        process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        process.kill()
                        process.wait()

    def post(self, payload, origin=None):
        request = Request(self.base + "__math_notes_editor/manage",
                          data=json.dumps(payload).encode(), headers={
                              "Content-Type": "application/json", "X-Math-Notes-Editor": "1",
                              "Origin": origin or self.base.split("/math-notes/")[0]})
        try:
            with urlopen(request, timeout=10) as response:
                return response.status, json.load(response)
        except HTTPError as error:
            return error.code, json.load(error)

    def wait_page(self, path, contains=None):
        deadline = time.monotonic() + 35
        while time.monotonic() < deadline:
            try:
                with urlopen(self.base + path, timeout=3) as response:
                    html = response.read().decode()
                    if contains is None or contains in html:
                        return html
            except (URLError, TimeoutError):
                pass
            time.sleep(0.25)
        self.fail(f"Page did not rebuild: {path}")


if __name__ == "__main__":
    unittest.main()
