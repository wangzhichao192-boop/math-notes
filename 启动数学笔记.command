#!/bin/bash
# Double-click to keep the local editor available in a visible Terminal window.
cd -- "$(dirname -- "$0")" || exit 1
if curl --silent --fail --max-time 2 http://127.0.0.1:8765/math-notes/ >/dev/null; then
  open http://127.0.0.1:8765/math-notes/
  exit 0
fi
echo '正在启动数学笔记，请保留这个终端窗口。按 Control+C 停止网站。'
exec ./.venv/bin/mkdocs serve -a 127.0.0.1:8765 --open
