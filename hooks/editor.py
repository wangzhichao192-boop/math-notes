"""In-page Markdown editor support for the math notes site.

Every generated page gets an inert JSON payload containing its Markdown
source.  The browser-side editor reads that payload for live previewing.  When
MkDocs is running locally, this hook also adds a small, same-origin save
endpoint so the editor can write the current page back to ``docs/``.

The production site stays completely static: its editor can still keep drafts
and export Markdown, but it has no write endpoint.
"""

from __future__ import annotations

import base64
import hashlib
import ipaddress
import json
import os
import posixpath
import re
import tempfile
import threading
import time
import yaml
from urllib.parse import urlsplit


MAX_SOURCE_BYTES = 2 * 1024 * 1024
ENDPOINT_NAME = "__math_notes_editor/save"
MANAGE_ENDPOINT_NAME = "__math_notes_editor/manage"
LOCAL_HOSTS = {"localhost", "127.0.0.1", "::1"}
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
RESERVED_COURSE_SLUGS = {"assets", "javascripts", "overrides", "stylesheets"}
WRITE_LOCK = threading.RLock()


def _structure_sources(config_path, docs_dir):
    with open(config_path, encoding="utf-8") as stream:
        config_source = stream.read()
    with open(os.path.join(docs_dir, "index.md"), encoding="utf-8") as stream:
        home_source = stream.read()
    return config_source, home_source


def _navigation_courses(source):
    """Locate course YAML nodes without loading Python-tagged configuration."""
    root = yaml.compose(source)
    nav = next((value for key, value in root.value if key.value == "nav"), None)
    if not isinstance(nav, yaml.SequenceNode):
        raise ValueError("未找到课程导航")
    courses = []
    for index, node in enumerate(nav.value):
        fragment = source[node.start_mark.index:node.end_mark.index]
        item = yaml.safe_load(fragment)
        found = _course_entries({"nav": [item]})
        if not found:
            continue
        start = source.rfind("\n", 0, node.start_mark.index) + 1
        end = (source.rfind("\n", 0, nav.value[index + 1].start_mark.index) + 1
               if index + 1 < len(nav.value) else nav.end_mark.index)
        key_node, value_node = node.value[0]
        page_count = sum(
            1 for path in _nav_paths(yaml.safe_load(fragment))
            if path.endswith(".md") and not path.endswith("/index.md")
        )
        courses.append({
            **found[0], "start": start, "end": end,
            "title_start": key_node.start_mark.index,
            "title_end": key_node.end_mark.index,
            "value_node": value_node,
            "page_count": page_count,
            "outline": _course_outline(next(iter(item.values())), found[0]["slug"]),
        })
    return courses


def _structure_status(config_path, docs_dir):
    config_source, home_source = _structure_sources(config_path, docs_dir)
    return {"ok": True, "courses": [
        {
            "title": item["title"], "slug": item["slug"],
            "pageCount": item["page_count"], "outline": item["outline"],
        }
        for item in _navigation_courses(config_source)
    ], "structureRevision": _revision(config_source + "\0" + home_source)}


def _reorder_courses(payload, *, docs_dir, config_path, mount_path):
    config_source, home_source = _structure_sources(config_path, docs_dir)
    if payload.get("baseRevision") != _revision(config_source + "\0" + home_source):
        raise FileExistsError("课程列表已更新，请关闭排序窗口后重新打开。")
    courses = _navigation_courses(config_source)
    order = payload.get("order")
    slugs = [item["slug"] for item in courses]
    if (not isinstance(order, list) or not all(isinstance(item, str) for item in order)
            or len(order) != len(slugs) or set(order) != set(slugs)):
        raise ValueError("课程顺序必须包含每门课程且不能重复")
    blocks = {item["slug"]: config_source[item["start"]:item["end"]] for item in courses}
    next_config = config_source
    for slot, slug in reversed(list(zip(courses, order))):
        next_config = next_config[:slot["start"]] + blocks[slug] + next_config[slot["end"]:]

    grid = re.search(r'<div\s+class="grid cards"\s+markdown[^>]*>([\s\S]*?)</div>', home_source)
    if not grid:
        raise ValueError("未找到主页课程卡片，尚未改动顺序")
    body = grid.group(1)
    starts = list(re.finditer(r"(?m)^- ", body))
    cards = {}
    for index, match in enumerate(starts):
        end = starts[index + 1].start() if index + 1 < len(starts) else len(body)
        card = body[match.start():end]
        links = re.findall(r"\]\(([a-z0-9-]+)/index\.md\)", card)
        if len(links) != 1 or links[0] in cards:
            raise ValueError("主页课程卡片格式不匹配，尚未改动顺序")
        cards[links[0]] = card.rstrip()
    if set(cards) != set(slugs):
        raise ValueError("主页课程与导航不一致，请先检查课程入口")
    next_home = (home_source[:grid.start(1)] + "\n\n" +
                 "\n\n\n".join(cards[slug] for slug in order) + "\n\n" + home_source[grid.end(1):])
    try:
        _atomic_write(os.path.join(docs_dir, "index.md"), next_home)
        _atomic_write(config_path, next_config)
    except OSError:
        _atomic_write(os.path.join(docs_dir, "index.md"), home_source)
        _atomic_write(config_path, config_source)
        raise
    return {"ok": True, "url": mount_path, "order": order}


def _revision(source: str) -> str:
    return hashlib.sha256(source.encode("utf-8")).hexdigest()


def _mount_path(config) -> str:
    path = urlsplit(config.get("site_url") or "").path or "/"
    return f"/{path.strip('/')}/" if path.strip("/") else "/"


def _course_entries(config) -> list[dict[str, str]]:
    courses = []
    for item in config.get("nav") or []:
        if not isinstance(item, dict) or len(item) != 1:
            continue
        title, children = next(iter(item.items()))
        if not isinstance(children, list):
            continue
        index_path = next(
            (child for child in children if isinstance(child, str) and child.endswith("/index.md")),
            None,
        )
        if not index_path:
            continue
        courses.append({"title": str(title), "slug": posixpath.dirname(index_path)})
    return courses


def _nav_paths(value):
    """Yield Markdown paths from a possibly nested MkDocs nav node."""
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for item in value:
            yield from _nav_paths(item)
    elif isinstance(value, dict):
        for item in value.values():
            yield from _nav_paths(item)


def _course_outline(children, course_slug: str) -> list[dict]:
    """Normalize MkDocs navigation into Part/Chapter/Subchapter records."""
    index_path = f"{course_slug}/index.md"

    def page(item, *, allow_children=True):
        if not isinstance(item, dict) or len(item) != 1:
            return None
        title, value = next(iter(item.items()))
        if isinstance(value, str) and value.endswith(".md"):
            return {"type": "chapter", "title": str(title), "path": value, "children": []}
        if not allow_children or not isinstance(value, list) or not value:
            return None
        own_path = value[0] if isinstance(value[0], str) and value[0].endswith(".md") else None
        if isinstance(value[0], dict) and len(value[0]) == 1:
            first_title, first_path = next(iter(value[0].items()))
            if str(first_title) == str(title) and isinstance(first_path, str) and first_path.endswith(".md"):
                own_path = first_path
        if not own_path:
            return None
        subchapters = []
        for child in value[1:]:
            normalized = page(child, allow_children=False)
            if normalized:
                normalized["type"] = "subchapter"
                subchapters.append(normalized)
        return {
            "type": "chapter", "title": str(title), "path": own_path,
            "children": subchapters,
        }

    outline = []
    for item in children if isinstance(children, list) else []:
        if item == index_path:
            continue
        normalized = page(item)
        if normalized:
            outline.append(normalized)
            continue
        if isinstance(item, dict) and len(item) == 1:
            title, value = next(iter(item.items()))
            if isinstance(value, list):
                chapters = [page(child) for child in value]
                outline.append({
                    "type": "part", "title": str(title),
                    "children": [child for child in chapters if child],
                })
    return outline


def _chapter_number(config, source_path: str) -> int | None:
    """Return the page's one-based chapter position inside its course."""
    if "/" not in source_path or source_path.endswith("/index.md"):
        return None
    course_slug = source_path.split("/", 1)[0]
    for item in config.get("nav") or []:
        if not isinstance(item, dict) or len(item) != 1:
            continue
        children = next(iter(item.values()))
        paths = list(_nav_paths(children))
        index_path = f"{course_slug}/index.md"
        if index_path not in paths:
            continue
        chapters = [path for path in paths if path.endswith(".md") and path != index_path]
        try:
            return chapters.index(source_path) + 1
        except ValueError:
            return None
    return None


def _is_local_request(environ) -> bool:
    """Only allow the development writer through a loopback connection."""
    try:
        remote_is_loopback = ipaddress.ip_address(environ.get("REMOTE_ADDR", "")).is_loopback
    except ValueError:
        remote_is_loopback = False
    host = urlsplit("//" + (environ.get("HTTP_HOST") or "")).hostname
    return remote_is_loopback and host in LOCAL_HOSTS


def on_page_content(html, *, page, config, files):
    """Attach source data without putting editable text in the visible DOM."""
    source_path = page.file.src_path
    if not source_path.endswith(".md"):
        return html

    try:
        with open(page.file.abs_src_path, encoding="utf-8") as source_file:
            source = source_file.read()
    except OSError:
        return html

    payload = {
        "sourcePath": source_path,
        "pageTitle": str(page.title or posixpath.basename(source_path).removesuffix(".md")),
        "sourceB64": base64.b64encode(source.encode("utf-8")).decode("ascii"),
        "revision": _revision(source),
        "chapterNumber": _chapter_number(config, source_path),
        "mountPath": _mount_path(config),
        "saveEndpoint": _mount_path(config) + ENDPOINT_NAME,
        "manageEndpoint": _mount_path(config) + MANAGE_ENDPOINT_NAME,
    }
    courses = _course_entries(config)
    payload["courses"] = courses
    source_course = source_path.split("/", 1)[0] if "/" in source_path else ""
    payload["courseSlug"] = source_course if any(
        course["slug"] == source_course for course in courses
    ) else ""
    # Escape angle brackets even though sourceB64 is already restricted to a
    # safe alphabet. This keeps the script payload safe if fields are added.
    data = json.dumps(payload, ensure_ascii=False).replace("<", "\\u003c").replace(
        ">", "\\u003e"
    )
    return f'{html}\n<script id="mn-editor-source" type="application/json">{data}</script>'


def _json_response(start_response, status: str, payload: dict):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    start_response(
        status,
        [
            ("Content-Type", "application/json; charset=utf-8"),
            ("Content-Length", str(len(body))),
            ("Cache-Control", "no-store"),
        ],
    )
    return [body]


def _atomic_write(path: str, content: str) -> None:
    temp_name = None
    try:
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", dir=os.path.dirname(path), delete=False
        ) as temp_file:
            temp_file.write(content)
            temp_name = temp_file.name
        os.replace(temp_name, path)
    except OSError:
        if temp_name:
            try:
                os.unlink(temp_name)
            except OSError:
                pass
        raise


def _clean_text(value, field: str, maximum: int, required: bool = True) -> str:
    if not isinstance(value, str):
        raise ValueError(field)
    cleaned = " ".join(value.split())
    if (required and not cleaned) or len(cleaned) > maximum:
        raise ValueError(field)
    return cleaned


def _clean_slug(value, field: str) -> str:
    slug = _clean_text(value, field, 64).lower()
    if not SLUG_PATTERN.fullmatch(slug):
        raise ValueError(field)
    return slug


def _yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def _render_course_navigation(title: str, slug: str, outline: list[dict]) -> str:
    lines = [f"  - {_yaml_string(title)}:", f"      - {slug}/index.md"]

    def render_page(item: dict, indent: int) -> None:
        prefix = " " * indent
        children = item.get("children") or []
        if children:
            lines.append(f"{prefix}- {_yaml_string(item['title'])}:")
            lines.append(
                f"{prefix}    - {_yaml_string(item['title'])}: {item['path']}"
            )
            for child in children:
                lines.append(
                    f"{prefix}    - {_yaml_string(child['title'])}: {child['path']}"
                )
        else:
            lines.append(f"{prefix}- {_yaml_string(item['title'])}: {item['path']}")

    for item in outline:
        if item["type"] == "part":
            lines.append(f"      - {_yaml_string(item['title'])}:")
            for child in item.get("children") or []:
                render_page(child, 10)
        else:
            render_page(item, 6)
    return "\n".join(lines) + "\n"


def _outline_page_map(outline: list[dict]) -> dict[str, dict]:
    pages = {}
    for item in outline:
        chapters = item.get("children", []) if item.get("type") == "part" else [item]
        for chapter in chapters:
            pages[chapter["path"]] = chapter
            for child in chapter.get("children") or []:
                pages[child["path"]] = child
    return pages


def _validated_outline(value, existing: list[dict], course_slug: str) -> list[dict]:
    if not isinstance(value, list) or len(value) > 500:
        raise ValueError("outline")
    existing_pages = _outline_page_map(existing)
    seen = set()

    def clean_page(raw, kind: str, allow_children: bool) -> dict:
        if not isinstance(raw, dict):
            raise ValueError("outline")
        path = raw.get("path")
        if not isinstance(path, str) or path not in existing_pages or path in seen:
            raise ValueError("outline")
        if not path.startswith(f"{course_slug}/") or not path.endswith(".md"):
            raise ValueError("outline")
        seen.add(path)
        children = raw.get("children") or []
        if not allow_children and children:
            raise ValueError("outline")
        cleaned = {
            "type": kind, "title": existing_pages[path]["title"],
            "path": path, "children": [],
        }
        if allow_children:
            if not isinstance(children, list):
                raise ValueError("outline")
            cleaned["children"] = [clean_page(child, "subchapter", False) for child in children]
        return cleaned

    cleaned = []
    for raw in value:
        if not isinstance(raw, dict):
            raise ValueError("outline")
        if raw.get("type") == "part":
            title = _clean_text(raw.get("title"), "partTitle", 80)
            children = raw.get("children")
            if not isinstance(children, list):
                raise ValueError("outline")
            cleaned.append({
                "type": "part", "title": title,
                "children": [clean_page(child, "chapter", True) for child in children],
            })
        elif raw.get("type") == "chapter":
            cleaned.append(clean_page(raw, "chapter", True))
        else:
            raise ValueError("outline")
    if seen != set(existing_pages):
        raise ValueError("outline")
    return cleaned


def _save_course_outline(payload: dict, *, docs_dir: str, config_path: str,
                         mount_path: str) -> dict:
    course_slug = _clean_slug(payload.get("course"), "course")
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    course = _course_by_slug(config_source, course_slug)
    outline = _validated_outline(payload.get("outline"), course["outline"], course_slug)
    block = _render_course_navigation(course["title"], course_slug, outline)
    next_config = config_source[:course["start"]] + block + config_source[course["end"]:]
    _atomic_write(config_path, next_config)
    return {
        "ok": True, "url": f"{mount_path}{course_slug}/", "outline": outline,
        "structureRevision": _revision(next_config + "\0" + home_source),
    }


def _create_part(payload: dict, *, docs_dir: str, config_path: str,
                 mount_path: str) -> dict:
    course_slug = _clean_slug(payload.get("course"), "course")
    title = _clean_text(payload.get("title"), "title", 80)
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    course = _course_by_slug(config_source, course_slug)
    if any(item["type"] == "part" and item["title"] == title for item in course["outline"]):
        raise FileExistsError("这个 Part 已经存在。")
    outline = [*course["outline"], {"type": "part", "title": title, "children": []}]
    block = _render_course_navigation(course["title"], course_slug, outline)
    next_config = config_source[:course["start"]] + block + config_source[course["end"]:]
    _atomic_write(config_path, next_config)
    return {
        "ok": True, "outline": outline,
        "structureRevision": _revision(next_config + "\0" + home_source),
    }


def _markdown_text(value: str) -> str:
    return value.replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]").replace("*", "\\*")


def _check_structure_revision(payload: dict, config_source: str, home_source: str) -> None:
    if payload.get("baseRevision") != _revision(config_source + "\0" + home_source):
        raise FileExistsError("站点结构已更新，请关闭窗口后重新打开。")


def _course_by_slug(config_source: str, slug: str) -> dict:
    course = next((item for item in _navigation_courses(config_source) if item["slug"] == slug), None)
    if not course:
        raise LookupError(slug)
    return course


def _page_navigation_entry(config_source: str, course_slug: str, source_path: str) -> dict:
    course = _course_by_slug(config_source, course_slug)

    def find(node):
        if isinstance(node, yaml.SequenceNode):
            for child in node.value:
                found = find(child)
                if found:
                    return found
        elif isinstance(node, yaml.MappingNode):
            for key_node, value_node in node.value:
                if isinstance(value_node, yaml.ScalarNode) and value_node.value == source_path:
                    line_start = config_source.rfind("\n", 0, node.start_mark.index) + 1
                    # A YAML mapping node at the end of a sequence may include
                    # the indentation that begins the next course.  The scalar
                    # path itself always ends on the page's own line.
                    line_end = config_source.find("\n", value_node.end_mark.index)
                    if line_end < 0:
                        line_end = len(config_source)
                    else:
                        line_end += 1
                    return {
                        "title": str(key_node.value),
                        "title_start": key_node.start_mark.index,
                        "title_end": key_node.end_mark.index,
                        "start": line_start,
                        "end": line_end,
                        "has_children": False,
                    }
                if (isinstance(value_node, yaml.SequenceNode) and value_node.value
                        and isinstance(value_node.value[0], yaml.ScalarNode)
                        and value_node.value[0].value == source_path):
                    line_start = config_source.rfind("\n", 0, node.start_mark.index) + 1
                    line_end = config_source.find("\n", value_node.end_mark.index)
                    if line_end < 0:
                        line_end = len(config_source)
                    else:
                        line_end += 1
                    return {
                        "title": str(key_node.value),
                        "title_start": key_node.start_mark.index,
                        "title_end": key_node.end_mark.index,
                        "start": line_start,
                        "end": line_end,
                        "has_children": len(value_node.value) > 1,
                    }
                if isinstance(value_node, yaml.SequenceNode) and value_node.value:
                    first = value_node.value[0]
                    if (isinstance(first, yaml.MappingNode) and first.value
                            and first.value[0][0].value == key_node.value
                            and isinstance(first.value[0][1], yaml.ScalarNode)
                            and first.value[0][1].value == source_path):
                        line_start = config_source.rfind("\n", 0, node.start_mark.index) + 1
                        line_end = config_source.find("\n", value_node.end_mark.index)
                        if line_end < 0:
                            line_end = len(config_source)
                        else:
                            line_end += 1
                        return {
                            "title": str(key_node.value),
                            "title_start": key_node.start_mark.index,
                            "title_end": key_node.end_mark.index,
                            "mirror_title_start": first.value[0][0].start_mark.index,
                            "mirror_title_end": first.value[0][0].end_mark.index,
                            "start": line_start,
                            "end": line_end,
                            "has_children": len(value_node.value) > 1,
                        }
                found = find(value_node)
                if found:
                    return found
        return None

    result = find(course["value_node"])
    if not result:
        raise LookupError(source_path)
    return result


def _replace_first_heading(source: str, title: str) -> str:
    heading = re.search(r"(?m)^#\s+.*$", source)
    replacement = f"# {title}"
    if heading:
        return source[:heading.start()] + replacement + source[heading.end():]
    return replacement + "\n\n" + source.lstrip("\n")


def _home_course_cards(source: str) -> tuple[re.Match, list[dict]]:
    grid = re.search(r'<div\s+class="grid cards"\s+markdown[^>]*>([\s\S]*?)</div>', source)
    if not grid:
        raise ValueError("未找到主页课程卡片")
    body = grid.group(1)
    starts = list(re.finditer(r"(?m)^- ", body))
    cards = []
    for index, match in enumerate(starts):
        end = starts[index + 1].start() if index + 1 < len(starts) else len(body)
        card_source = body[match.start():end]
        links = re.findall(r"\]\(([a-z0-9-]+)/index\.md\)", card_source)
        if len(links) != 1:
            raise ValueError("主页课程卡片格式不匹配")
        cards.append({"slug": links[0], "source": card_source.rstrip()})
    return grid, cards


def _render_home_cards(source: str, grid: re.Match, cards: list[dict]) -> str:
    body = "\n\n" + "\n\n\n".join(card["source"] for card in cards) + "\n\n"
    return source[:grid.start(1)] + body + source[grid.end(1):]


def _rename_home_card(source: str, slug: str, title: str) -> str:
    grid, cards = _home_course_cards(source)
    card = next((item for item in cards if item["slug"] == slug), None)
    if not card:
        raise LookupError(slug)
    updated, count = re.subn(
        r"(?m)^(?P<prefix>- .*?\*\*).*(?P<suffix>\*\*)[ \t]*$",
        lambda match: match.group("prefix") + _markdown_text(title) + match.group("suffix"),
        card["source"], count=1,
    )
    if count != 1:
        raise ValueError("主页课程卡片标题格式不匹配")
    card["source"] = updated
    return _render_home_cards(source, grid, cards)


def _remove_home_card(source: str, slug: str) -> str:
    grid, cards = _home_course_cards(source)
    remaining = [item for item in cards if item["slug"] != slug]
    if len(remaining) == len(cards):
        raise LookupError(slug)
    return _render_home_cards(source, grid, remaining)


def _update_course_page_entry(source: str, page_slug: str, title: str | None = None) -> str:
    pattern = re.compile(
        rf"(?m)^(?P<number>\d+\.\s+)\[(?P<label>(?:\\.|[^\]])*)\]"
        rf"\({re.escape(page_slug)}\.md\)(?P<tail>[^\n]*)(?P<newline>\n?)"
    )
    match = pattern.search(source)
    if not match:
        raise LookupError(page_slug)
    headings = list(re.finditer(r"(?m)^## (?:目录|笔记)[ \t]*$", source[:match.start()]))
    if not headings:
        raise LookupError(page_slug)
    heading = headings[-1]
    intervening_heading = re.search(r"(?m)^## ", source[heading.end():match.start()])
    if intervening_heading:
        raise LookupError(page_slug)
    section_start = heading.end()
    next_heading = re.search(r"(?m)^## ", source[section_start:])
    section_end = len(source) if not next_heading else section_start + next_heading.start()
    section = source[section_start:section_end]
    relative_start = match.start() - section_start
    relative_end = match.end() - section_start
    if title is None:
        section = section[:relative_start] + section[relative_end:]
        counter = 0

        def renumber(item):
            nonlocal counter
            counter += 1
            return f"{counter}. "

        section = re.sub(r"(?m)^\d+\.\s+", renumber, section)
    else:
        replacement = (match.group("number") + f"[{_markdown_text(title)}]({page_slug}.md)" +
                       match.group("tail") + match.group("newline"))
        section = section[:relative_start] + replacement + section[relative_end:]
    return source[:section_start] + section + source[section_end:]


def _write_transaction(changes: list[tuple[str, str, str]]) -> None:
    """Write (path, old, new) entries and restore every original on failure."""
    try:
        for path, _old, new in changes:
            _atomic_write(path, new)
    except OSError:
        for path, old, _new in changes:
            try:
                _atomic_write(path, old)
            except OSError:
                pass
        raise


def _source_url(mount_path: str, source_path: str) -> str:
    stem = source_path[:-3]
    if stem.endswith("/index"):
        stem = stem[:-6]
    return f"{mount_path}{stem.strip('/')}/" if stem.strip("/") else mount_path


def _recovery_target(docs_dir: str, name: str) -> str:
    trash_dir = os.path.join(os.path.dirname(docs_dir), ".math-notes-trash")
    os.makedirs(trash_dir, exist_ok=True)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    base = f"{stamp}-{name}"
    target = os.path.join(trash_dir, base)
    suffix = 2
    while os.path.exists(target):
        target = os.path.join(trash_dir, f"{base}-{suffix}")
        suffix += 1
    return target


def _insert_course_navigation(source: str, title: str, slug: str) -> str:
    if f"      - {slug}/index.md" in source:
        raise FileExistsError(slug)
    marker = re.search(r"(?m)^  - 参考:\s*$", source)
    block = f"  - {_yaml_string(title)}:\n      - {slug}/index.md\n"
    if marker:
        return source[: marker.start()] + block + source[marker.start() :]
    return source.rstrip() + "\n" + block


def _insert_page_navigation(source: str, course_slug: str, title: str, page_slug: str) -> str:
    page_path = f"{course_slug}/{page_slug}.md"
    if page_path in source:
        raise FileExistsError(page_path)
    index_line = f"      - {course_slug}/index.md"
    index_position = source.find(index_line)
    if index_position < 0:
        raise LookupError(course_slug)
    next_course = re.search(r"(?m)^  - ", source[index_position + len(index_line) :])
    insertion = len(source) if not next_course else index_position + len(index_line) + next_course.start()
    prefix = "" if source[:insertion].endswith("\n") else "\n"
    item = f"      - {_yaml_string(title)}: {page_path}\n"
    return source[:insertion] + prefix + item + source[insertion:]


def _insert_home_card(source: str, title: str, slug: str, description: str) -> str:
    link = f"]({slug}/index.md)"
    if link in source:
        raise FileExistsError(slug)
    closing = source.rfind("</div>")
    if closing < 0:
        raise LookupError("home-grid")
    card = (
        f"\n\n- :material-book-open-page-variant: **{_markdown_text(title)}**\n\n"
        f"    {_markdown_text(description)}\n\n"
        f"    [:octicons-arrow-right-24: 进入]({slug}/index.md)\n\n"
    )
    return source[:closing].rstrip() + card + "\n" + source[closing:]


def _insert_course_page(source: str, title: str, page_slug: str, description: str) -> str:
    link = f"]({page_slug}.md)"
    if link in source:
        raise FileExistsError(page_slug)
    heading = re.search(r"(?m)^## (?:目录|笔记)[ \t]*$", source)
    entry_description = f" — {_markdown_text(description)}" if description else ""
    if not heading:
        return source.rstrip() + f"\n\n## 目录\n\n1. [{_markdown_text(title)}]({page_slug}.md){entry_description}\n"
    section_start = heading.end()
    next_heading = re.search(r"(?m)^## ", source[section_start:])
    section_end = len(source) if not next_heading else section_start + next_heading.start()
    section = source[section_start:section_end]
    number = len(re.findall(r"(?m)^\d+\. ", section)) + 1
    entry = f"{number}. [{_markdown_text(title)}]({page_slug}.md){entry_description}\n"
    separation = "\n" if section.strip() else "\n\n"
    return source[:section_end].rstrip() + separation + entry + "\n" + source[section_end:].lstrip("\n")


def _create_course(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    docs_dir = os.path.realpath(docs_dir)
    config_path = os.path.realpath(config_path)
    title = _clean_text(payload.get("title"), "title", 80)
    slug = _clean_slug(payload.get("slug"), "slug")
    description = _clean_text(payload.get("description", ""), "description", 240, required=False)
    if not description:
        description = "课程简介待补充。"
    if slug in RESERVED_COURSE_SLUGS:
        raise ValueError("slug")

    course_dir = os.path.realpath(os.path.join(docs_dir, slug))
    if os.path.commonpath([docs_dir, course_dir]) != docs_dir or os.path.exists(course_dir):
        raise FileExistsError(slug)
    home_path = os.path.join(docs_dir, "index.md")
    with open(config_path, encoding="utf-8") as config_file:
        config_source = config_file.read()
    with open(home_path, encoding="utf-8") as home_file:
        home_source = home_file.read()
    next_config = _insert_course_navigation(config_source, title, slug)
    next_home = _insert_home_card(home_source, title, slug, description)
    course_source = (
        f"# {title}\n\n> {description}\n\n"
        "## 课程主线\n\n"
        "!!! abstract \"课程主线\"\n"
        "    请在这里概述课程内容与学习路径。\n\n"
        "## 目录\n"
    )

    os.makedirs(course_dir)
    try:
        _atomic_write(os.path.join(course_dir, "index.md"), course_source)
        _atomic_write(config_path, next_config)
        _atomic_write(home_path, next_home)
    except OSError:
        try:
            _atomic_write(config_path, config_source)
            _atomic_write(home_path, home_source)
        except OSError:
            pass
        try:
            index_path = os.path.join(course_dir, "index.md")
            if os.path.isfile(index_path):
                os.unlink(index_path)
            os.rmdir(course_dir)
        except OSError:
            pass
        raise
    return {"ok": True, "url": f"{mount_path}{slug}/", "path": f"{slug}/index.md"}


def _create_page(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    docs_dir = os.path.realpath(docs_dir)
    config_path = os.path.realpath(config_path)
    course_slug = _clean_slug(payload.get("course"), "course")
    title = _clean_text(payload.get("title"), "title", 100)
    page_slug = _clean_slug(payload.get("slug"), "slug")
    description = _clean_text(payload.get("description", ""), "description", 240, required=False)
    course_dir = os.path.realpath(os.path.join(docs_dir, course_slug))
    course_index = os.path.join(course_dir, "index.md")
    target = os.path.realpath(os.path.join(course_dir, f"{page_slug}.md"))
    if (
        os.path.commonpath([docs_dir, target]) != docs_dir
        or not os.path.isfile(course_index)
        or os.path.exists(target)
        or page_slug == "index"
    ):
        raise FileExistsError(f"{course_slug}/{page_slug}.md")
    config_source, home_source = _structure_sources(config_path, docs_dir)
    if payload.get("baseRevision") is not None:
        _check_structure_revision(payload, config_source, home_source)
    with open(course_index, encoding="utf-8") as index_file:
        index_source = index_file.read()
    course = _course_by_slug(config_source, course_slug)
    outline = json.loads(json.dumps(course["outline"], ensure_ascii=False))
    new_page = {
        "type": "chapter", "title": title,
        "path": f"{course_slug}/{page_slug}.md", "children": [],
    }
    kind = payload.get("kind") or "chapter"
    if kind == "subchapter":
        parent_path = payload.get("parentPath")
        parent = None
        for item in outline:
            chapters = item.get("children", []) if item.get("type") == "part" else [item]
            parent = next(
                (chapter for chapter in chapters if chapter.get("path") == parent_path),
                parent,
            )
        if not parent:
            raise LookupError(parent_path)
        new_page["type"] = "subchapter"
        parent.setdefault("children", []).append(new_page)
    elif kind == "chapter":
        part_title = payload.get("partTitle")
        if part_title:
            part = next((item for item in outline
                         if item.get("type") == "part" and item.get("title") == part_title), None)
            if not part:
                raise LookupError(part_title)
            part.setdefault("children", []).append(new_page)
        else:
            outline.append(new_page)
    else:
        raise ValueError("kind")
    next_config = (config_source[:course["start"]] +
                   _render_course_navigation(course["title"], course_slug, outline) +
                   config_source[course["end"]:])
    next_index = _insert_course_page(index_source, title, page_slug, description)
    page_source = f"# {title}\n"
    if description:
        page_source += f"\n> {description}\n"
    page_source += "\n在这里开始写课程内容。\n"
    created_target = False
    try:
        with open(target, "x", encoding="utf-8") as target_file:
            target_file.write(page_source)
        created_target = True
        _atomic_write(config_path, next_config)
        _atomic_write(course_index, next_index)
    except OSError:
        try:
            _atomic_write(config_path, config_source)
            _atomic_write(course_index, index_source)
        except OSError:
            pass
        try:
            if created_target and os.path.isfile(target):
                os.unlink(target)
        except OSError:
            pass
        raise
    return {
        "ok": True,
        "url": f"{mount_path}{course_slug}/{page_slug}/",
        "path": f"{course_slug}/{page_slug}.md",
        "outline": outline,
        "structureRevision": _revision(next_config + "\0" + home_source),
    }


def _rename_course(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    course_slug = _clean_slug(payload.get("course"), "course")
    title = _clean_text(payload.get("title"), "title", 80)
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    course = _course_by_slug(config_source, course_slug)
    course_index = os.path.join(docs_dir, course_slug, "index.md")
    if not os.path.isfile(course_index):
        raise LookupError(course_slug)
    with open(course_index, encoding="utf-8") as stream:
        index_source = stream.read()
    next_config = (config_source[:course["title_start"]] + _yaml_string(title) +
                   config_source[course["title_end"]:])
    next_home = _rename_home_card(home_source, course_slug, title)
    next_index = _replace_first_heading(index_source, title)
    _write_transaction([
        (config_path, config_source, next_config),
        (os.path.join(docs_dir, "index.md"), home_source, next_home),
        (course_index, index_source, next_index),
    ])
    current_path = payload.get("path")
    if not isinstance(current_path, str) or not current_path.startswith(f"{course_slug}/"):
        current_path = f"{course_slug}/index.md"
    return {"ok": True, "url": _source_url(mount_path, current_path), "title": title}


def _rename_page(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    source_path = payload.get("path")
    if not isinstance(source_path, str):
        raise ValueError("path")
    normalized = posixpath.normpath("/" + source_path).lstrip("/")
    if normalized != source_path or "/" not in source_path or source_path.endswith("/index.md"):
        raise ValueError("path")
    course_slug, filename = source_path.split("/", 1)
    course_slug = _clean_slug(course_slug, "course")
    page_slug = filename[:-3]
    if not SLUG_PATTERN.fullmatch(page_slug):
        raise ValueError("path")
    title = _clean_text(payload.get("title"), "title", 100)
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    entry = _page_navigation_entry(config_source, course_slug, source_path)
    target = os.path.realpath(os.path.join(docs_dir, source_path))
    course_index = os.path.join(docs_dir, course_slug, "index.md")
    if (os.path.commonpath([os.path.realpath(docs_dir), target]) != os.path.realpath(docs_dir)
            or not os.path.isfile(target) or not os.path.isfile(course_index)):
        raise LookupError(source_path)
    with open(target, encoding="utf-8") as stream:
        page_source = stream.read()
    with open(course_index, encoding="utf-8") as stream:
        index_source = stream.read()
    next_config = config_source
    title_spans = [(entry["title_start"], entry["title_end"])]
    if "mirror_title_start" in entry:
        title_spans.append((entry["mirror_title_start"], entry["mirror_title_end"]))
    for start, end in sorted(title_spans, reverse=True):
        next_config = next_config[:start] + _yaml_string(title) + next_config[end:]
    next_page = _replace_first_heading(page_source, title)
    next_index = _update_course_page_entry(index_source, page_slug, title)
    _write_transaction([
        (config_path, config_source, next_config),
        (course_index, index_source, next_index),
        (target, page_source, next_page),
    ])
    return {"ok": True, "url": _source_url(mount_path, source_path), "title": title}


def _delete_page(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    source_path = payload.get("path")
    if not isinstance(source_path, str):
        raise ValueError("path")
    normalized = posixpath.normpath("/" + source_path).lstrip("/")
    if normalized != source_path or "/" not in source_path or source_path.endswith("/index.md"):
        raise ValueError("path")
    course_slug, filename = source_path.split("/", 1)
    course_slug = _clean_slug(course_slug, "course")
    page_slug = filename[:-3]
    if not SLUG_PATTERN.fullmatch(page_slug):
        raise ValueError("path")
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    entry = _page_navigation_entry(config_source, course_slug, source_path)
    if entry.get("has_children"):
        raise ValueError("请先移动或删除这个 Chapter 下的 Subchapter")
    confirmation = _clean_text(payload.get("confirmation"), "confirmation", 100)
    if confirmation != entry["title"]:
        raise ValueError("confirmation")
    target = os.path.realpath(os.path.join(docs_dir, source_path))
    course_index = os.path.join(docs_dir, course_slug, "index.md")
    if (os.path.commonpath([os.path.realpath(docs_dir), target]) != os.path.realpath(docs_dir)
            or not os.path.isfile(target) or not os.path.isfile(course_index)):
        raise LookupError(source_path)
    with open(course_index, encoding="utf-8") as stream:
        index_source = stream.read()
    next_config = config_source[:entry["start"]] + config_source[entry["end"]:]
    next_index = _update_course_page_entry(index_source, page_slug)
    recovery = _recovery_target(docs_dir, f"{course_slug}-{filename}")
    os.replace(target, recovery)
    try:
        _write_transaction([
            (config_path, config_source, next_config),
            (course_index, index_source, next_index),
        ])
    except OSError:
        try:
            os.replace(recovery, target)
        except OSError:
            pass
        raise
    return {
        "ok": True, "url": f"{mount_path}{course_slug}/",
        "recovery": os.path.relpath(recovery, os.path.dirname(docs_dir)),
    }


def _delete_course(payload: dict, *, docs_dir: str, config_path: str, mount_path: str) -> dict:
    course_slug = _clean_slug(payload.get("course"), "course")
    config_source, home_source = _structure_sources(config_path, docs_dir)
    _check_structure_revision(payload, config_source, home_source)
    course = _course_by_slug(config_source, course_slug)
    confirmation = _clean_text(payload.get("confirmation"), "confirmation", 80)
    if confirmation != course["title"]:
        raise ValueError("confirmation")
    course_dir = os.path.realpath(os.path.join(docs_dir, course_slug))
    if (os.path.commonpath([os.path.realpath(docs_dir), course_dir]) != os.path.realpath(docs_dir)
            or not os.path.isdir(course_dir)):
        raise LookupError(course_slug)
    next_config = config_source[:course["start"]] + config_source[course["end"]:]
    next_home = _remove_home_card(home_source, course_slug)
    recovery = _recovery_target(docs_dir, course_slug)
    os.replace(course_dir, recovery)
    try:
        _write_transaction([
            (config_path, config_source, next_config),
            (os.path.join(docs_dir, "index.md"), home_source, next_home),
        ])
    except OSError:
        try:
            os.replace(recovery, course_dir)
        except OSError:
            pass
        raise
    return {
        "ok": True, "url": mount_path,
        "recovery": os.path.relpath(recovery, os.path.dirname(docs_dir)),
    }


def on_serve(server, *, config, builder):
    """Add narrowly scoped source and site-structure routes to ``mkdocs serve``."""
    original_app = server.get_app()
    mount_path = server.mount_path.rstrip("/") + "/"
    endpoint = mount_path + ENDPOINT_NAME
    manage_endpoint = mount_path + MANAGE_ENDPOINT_NAME
    docs_dir = os.path.realpath(config["docs_dir"])
    config_path = os.path.realpath(config.config_file_path)

    def serve_page(environ, start_response):
        # MkDocs' own reload also fires after saving a note. Defer that reload
        # while the editor is open so typing, undo history and IME stay intact.
        captured = {}

        def capture(status, headers, exc_info=None):
            captured.update(status=status, headers=headers, exc_info=exc_info)

        response = original_app(environ, capture)
        if not any(name.lower() == "content-type" and "text/html" in value
                   for name, value in captured.get("headers", [])):
            start_response(captured["status"], captured["headers"], captured["exc_info"])
            return response
        try:
            body = b"".join(response)
        finally:
            if hasattr(response, "close"):
                response.close()
        if b"var livereload = function(epoch, requestId)" in body:
            body = body.replace(
                b"if (parseFloat(this.responseText) > epoch) {\n                location.reload();",
                b"if (parseFloat(this.responseText) > epoch) {\n                if (!window.MathNotesDeferReload || !window.MathNotesDeferReload()) location.reload();",
                1,
            )
        headers = [(name, value) for name, value in captured["headers"]
                   if name.lower() != "content-length"]
        headers.append(("Content-Length", str(len(body))))
        start_response(captured["status"], headers, captured["exc_info"])
        return [body]

    def handle(environ, start_response):
        request_path = environ.get("PATH_INFO")
        if request_path not in {endpoint, manage_endpoint}:
            return serve_page(environ, start_response)

        if environ.get("REQUEST_METHOD") != "POST":
            return _json_response(start_response, "405 Method Not Allowed", {"error": "method"})

        if not _is_local_request(environ):
            return _json_response(start_response, "403 Forbidden", {"error": "local_only"})

        # JSON plus a custom header makes cross-origin form posts impossible;
        # checking Origin/Host adds another guard for the localhost writer.
        if environ.get("HTTP_X_MATH_NOTES_EDITOR") != "1":
            return _json_response(start_response, "403 Forbidden", {"error": "editor_header"})
        origin = environ.get("HTTP_ORIGIN")
        host = environ.get("HTTP_HOST")
        if origin and urlsplit(origin).netloc != host:
            return _json_response(start_response, "403 Forbidden", {"error": "origin"})

        try:
            length = int(environ.get("CONTENT_LENGTH") or "0")
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_SOURCE_BYTES:
            return _json_response(start_response, "413 Payload Too Large", {"error": "size"})

        try:
            payload = json.loads(environ["wsgi.input"].read(length).decode("utf-8"))
        except (TypeError, ValueError, UnicodeDecodeError, json.JSONDecodeError):
            return _json_response(start_response, "400 Bad Request", {"error": "payload"})
        if not isinstance(payload, dict):
            return _json_response(start_response, "400 Bad Request", {"error": "payload"})

        if request_path == manage_endpoint:
            try:
                action = payload.get("action")
                if action == "status":
                    result = _structure_status(config_path, docs_dir)
                elif action == "reorderCourses":
                    result = _reorder_courses(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "createCourse":
                    result = _create_course(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "createPage":
                    result = _create_page(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "createPart":
                    result = _create_part(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "saveCourseOutline":
                    result = _save_course_outline(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "renameCourse":
                    result = _rename_course(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "renamePage":
                    result = _rename_page(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "deletePage":
                    result = _delete_page(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                elif action == "deleteCourse":
                    result = _delete_course(
                        payload, docs_dir=docs_dir, config_path=config_path, mount_path=mount_path
                    )
                else:
                    raise ValueError("action")
            except ValueError as error:
                return _json_response(
                    start_response,
                    "400 Bad Request",
                    {"error": "invalid", "message": f"请检查字段：{error}"},
                )
            except FileExistsError as error:
                return _json_response(
                    start_response,
                    "409 Conflict",
                    {"error": "exists", "message": str(error) if action in {
                        "reorderCourses", "createPart", "saveCourseOutline",
                        "renameCourse", "renamePage", "deletePage", "deleteCourse"
                    } else "这个课程或页面已经存在，请刷新检查；已有内容不会覆盖。"},
                )
            except LookupError:
                return _json_response(
                    start_response,
                    "404 Not Found",
                    {"error": "course", "message": "没有找到对应课程，请刷新页面后重试。"},
                )
            except OSError:
                return _json_response(
                    start_response,
                    "500 Internal Server Error",
                    {"error": "write", "message": "写入站点结构失败，原文件已尽量保留。"},
                )
            return _json_response(
                start_response,
                "201 Created" if action in {"createCourse", "createPage", "createPart"} else "200 OK",
                result,
            )

        try:
            rel_path = payload["path"]
            source = payload["source"]
            base_revision = payload["baseRevision"]
        except KeyError:
            return _json_response(start_response, "400 Bad Request", {"error": "payload"})

        if not isinstance(rel_path, str) or not isinstance(source, str):
            return _json_response(start_response, "400 Bad Request", {"error": "payload"})
        normalized = posixpath.normpath("/" + rel_path).lstrip("/")
        if normalized != rel_path or not normalized.endswith(".md"):
            return _json_response(start_response, "400 Bad Request", {"error": "path"})

        target = os.path.realpath(os.path.join(docs_dir, normalized))
        if os.path.commonpath([docs_dir, target]) != docs_dir or not os.path.isfile(target):
            return _json_response(start_response, "404 Not Found", {"error": "file"})

        try:
            with open(target, encoding="utf-8") as source_file:
                current = source_file.read()
        except OSError:
            return _json_response(start_response, "500 Internal Server Error", {"error": "read"})

        if _revision(current) != base_revision:
            return _json_response(
                start_response,
                "409 Conflict",
                {"error": "conflict", "message": "源文件已在别处改变，请刷新页面后再试。"},
            )

        try:
            _atomic_write(target, source)
        except OSError:
            return _json_response(start_response, "500 Internal Server Error", {"error": "write"})

        return _json_response(
            start_response,
            "200 OK",
            {"ok": True, "revision": _revision(source), "path": normalized},
        )

    def app(environ, start_response):
        if environ.get("PATH_INFO") in {endpoint, manage_endpoint}:
            with WRITE_LOCK:
                return handle(environ, start_response)
        return serve_page(environ, start_response)

    server.set_app(app)
    return server
