#!/bin/bash
# Double-click to keep the local editor available in a visible Terminal window.
cd -- "$(dirname -- "$0")" || exit 1
if [[ ! -x ./.venv/bin/python ]]; then
  echo '找不到项目的 Python 环境，请先安装 requirements.txt 中的依赖。' >&2
  exit 1
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
  exec ./.venv/bin/python -m mkdocs serve --config-file "$PWD/mkdocs.yml" --dev-addr "127.0.0.1:$port" --open
done

echo '8765–8784 端口均被占用，无法启动数学笔记。' >&2
exit 1
