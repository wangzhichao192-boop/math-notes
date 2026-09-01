"""Build hook: collect the site's recently updated pages.

The collected pages are exposed to the theme as ``extra.recent_updates``.  The
primary-navigation override renders that list in the homepage sidebar.  The
legacy ``recent-updates.md`` page still uses the same data when opened through
an old direct link.

Requires MkDocs >= 1.5 (``hooks`` config). Wired up in ``mkdocs.yml``:

    hooks:
      - hooks/recent_updates.py
"""

import os
import subprocess
from datetime import datetime

MAX_ITEMS = 6


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


def _collect_updates(files, config):
    rows = []
    for f in files.documentation_pages():
        if f.src_path in {"index.md", "recent-updates.md", "WRITING_GUIDE.md"}:
            continue
        if f.src_path.endswith("/index.md"):
            continue
        if not f.src_path.endswith(".md"):
            continue
        date = _last_commit_date(config["docs_dir"], f.src_path) or _mtime(
            config["docs_dir"], f.src_path
        )
        if date is None:
            continue
        rows.append((date, _first_heading(f.abs_src_path), f.url, f.src_path))

    rows.sort(key=lambda r: r[0], reverse=True)
    return rows[:MAX_ITEMS]


def on_files(files, *, config):
    """Make recent-update data available to the sidebar template."""
    updates = [
        {
            "date": date.strftime("%Y-%m-%d"),
            "title": title,
            "url": url,
            "source": source,
        }
        for date, title, url, source in _collect_updates(files, config)
    ]
    config.setdefault("extra", {})["recent_updates"] = updates
    return files


def on_page_markdown(markdown, *, page, config, files):
    """Render the compact mobile list and keep the old direct URL useful."""
    updates = config.get("extra", {}).get("recent_updates", [])

    if "<!-- RECENT-UPDATES-MOBILE -->" in markdown:
        mobile_lines = []
        for item in updates:
            mobile_lines.append(
                f"- [{item['title']}]({item['source']})\n"
                f"  <time datetime=\"{item['date']}\">{item['date']}</time>"
            )
        markdown = markdown.replace(
            "<!-- RECENT-UPDATES-MOBILE -->", "\n".join(mobile_lines)
        )

    if "<!-- RECENT-UPDATES -->" not in markdown:
        return markdown

    lines = ["", ""]
    for item in updates:
        lines.append(
            f"- **{item['title']}** — {item['date']}（[阅读]({item['source']})）"
        )
    block = "\n".join(lines)

    return markdown.replace("<!-- RECENT-UPDATES -->", block)
