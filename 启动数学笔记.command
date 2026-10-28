#!/bin/bash
# Double-click to keep the local editor available in a visible Terminal window.
cd -- "$(dirname -- "$0")" || exit 1
# Keep dependencies outside Documents, where iCloud can evict them between runs.
runtime_dir="${XDG_CACHE_HOME:-$HOME/Library/Caches}/math-notes"
runtime_python="$runtime_dir/bin/python"
if [[ ! -x "$runtime_python" ]] || ! "$runtime_python" -c 'import mkdocs, material, mkdocs_git_revision_date_localized_plugin' >/dev/null 2>&1; then
  base_python='./.venv/bin/python'
  if [[ ! -x "$base_python" ]]; then
    base_python=$(command -v python3) || {
      echo '找不到 Python 3，请先安装 Python 后再启动。' >&2
      exit 1
    }
  fi
  echo '正在准备本机运行环境，首次启动需要安装依赖，请稍候。'
  "$base_python" -m venv "$runtime_dir" &&
    "$runtime_python" -m pip install -r "$PWD/requirements.txt" || {
      echo '运行环境准备失败，请检查网络后重新双击启动。' >&2
      exit 1
    }
fi

for ((port = 8765; port <= 8784; port++)); do
  url="http://127.0.0.1:$port/math-notes/"
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    # Reuse a live math-notes preview, but leave other local sites running.
    page=$(curl --noproxy '*' --silent --fail --max-time 2 "$url")
    if [[ "$page" == *'id="mn-editor-source"'* && "$page" == *'var livereload = function('* ]]; then
      echo "数学笔记已在运行：$url"
      open "$url"
      exit 0
    fi
    echo "端口 $port 已被占用，正在尝试下一个端口。"
    continue
  fi

  echo "正在启动数学笔记：$url"
  echo '请保留这个终端窗口。按 Control+C 停止网站。'
  exec "$runtime_python" -m mkdocs serve --config-file "$PWD/mkdocs.yml" --dev-addr "127.0.0.1:$port" --open
done

echo '8765–8784 端口均被占用，无法启动数学笔记。' >&2
exit 1
