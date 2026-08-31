"""Build hook: inject a "最近更新" (recently updated) list into the homepage.

Replaces the ``<!-- RECENT-UPDATES -->`` placeholder in ``docs/index.md`` with a
markdown list of the most recently touched course pages, sorted by git
last-commit date (falling back to file mtime for untracked/uncommitted files,
so newly added chapters still show up before the first commit).

Requires MkDocs >= 1.5 (``hooks`` config). Wired up in ``mkdocs.yml``:

    hooks:
      - hooks/recent_updates.py
"""

import os
import subprocess
from datetime import datetime

MAX_ITEMS = 8


def _first_heading(path):
    """Return the first `# ` heading of a markdown file, or its basename."""
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                if line.startswith("# "):
                    return line[2:].strip()
                if line.startswith("<!--"):
                    continue
    except OSError:
        pass
    return os.path.splitext(os.path.basename(path))[0]


def _last_commit_date(docs_dir, rel):
    """Git last-commit date (YYYY-MM-DD) for a docs-relative path, or None."""
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", rel],
            capture_output=True,
            text=True,
            cwd=docs_dir,
            timeout=10,
        )
        stamp = out.stdout.strip()
        if stamp:
            return datetime.strptime(stamp, "%Y-%m-%d")
    except Exception:
        pass
    return None


def _mtime(docs_dir, rel):
    try:
        return datetime.fromtimestamp(os.path.getmtime(os.path.join(docs_dir, rel)))
    except OSError:
        return None


def on_page_markdown(markdown, *, page, config, files):
    if "<!-- RECENT-UPDATES -->" not in markdown:
        return markdown

    rows = []
    for f in files.documentation_pages():
        if f.src_path == "index.md" or f.src_path == "recent-updates.md":
            continue
        if not f.src_path.endswith(".md"):
            continue
        date = _last_commit_date(config["docs_dir"], f.src_path) or _mtime(
            config["docs_dir"], f.src_path
        )
        if date is None:
            continue
        rows.append((date, _first_heading(f.abs_src_path), f.url))

    rows.sort(key=lambda r: r[0], reverse=True)

    lines = ["", ""]
    for date, title, url in rows[:MAX_ITEMS]:
        lines.append(f"- **{title}** — {date.strftime('%Y-%m-%d')}（[阅读]({url})）")
    block = "\n".join(lines)

    return markdown.replace("<!-- RECENT-UPDATES -->", block)
