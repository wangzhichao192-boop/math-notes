#!/bin/bash

# Double-click this file to validate and publish the maths notes website.
set -u

cd -- "$(dirname -- "$0")" || exit 1

pause_before_exit() {
  printf '\n按回车关闭窗口…'
  read -r _
}

fail() {
  printf '\n上传未完成：%s\n' "$1" >&2
  pause_before_exit
  exit 1
}

command -v git >/dev/null 2>&1 || fail "没有找到 Git。"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "当前文件夹不是 Git 仓库。"

remote="origin"
branch="$(git branch --show-current)"
remote_url="$(git remote get-url "$remote" 2>/dev/null || true)"

[ -n "$branch" ] || fail "当前没有选中的 Git 分支。"
[ -n "$remote_url" ] || fail "没有找到 GitHub 远程仓库 origin。"

printf '准备上传数学笔记\n'
printf '仓库：%s\n' "$remote_url"
printf '分支：%s\n\n' "$branch"

git status --short

printf '\n将上传网站源码和配置；tmp、output、.note-previews 等本地文件不会加入。\n'
printf '继续吗？输入 y 确认：'
read -r answer
case "$answer" in
  y|Y|yes|YES|Yes) ;;
  *)
    printf '\n已取消，没有提交或上传。\n'
    pause_before_exit
    exit 0
    ;;
esac

if [ -x "./.venv/bin/mkdocs" ]; then
  printf '\n正在检查网站…\n'
  ./.venv/bin/mkdocs build --strict || fail "网站检查失败，请先修正上面的错误。"
else
  printf '\n未找到本地 MkDocs 环境，跳过网站检查。\n'
fi

# Include modifications to already tracked files, then add new website files.
git add -u -- . || fail "无法暂存已有文件的改动。"

publish_paths=(
  ".github/workflows/ci.yml"
  ".gitignore"
  ".vscode"
  "docs"
  "hooks"
  "mkdocs.yml"
  "requirements.txt"
  "scripts"
  "启动数学笔记.command"
  "上传到GitHub.command"
)

for path in "${publish_paths[@]}"; do
  if [ -e "$path" ]; then
    git add -- "$path" || fail "无法暂存 $path。"
  fi
done

if ! git diff --cached --quiet; then
  printf '\n请输入这次更新的说明（直接回车使用默认说明）：\n> '
  read -r message
  if [ -z "$message" ]; then
    message="更新数学笔记 $(date '+%Y-%m-%d %H:%M')"
  fi
  git commit -m "$message" || fail "无法创建 Git 提交。"
else
  printf '\n没有需要创建提交的网站改动，将检查是否有尚未上传的提交。\n'
fi

printf '\n正在上传到 GitHub…\n'
if git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' >/dev/null 2>&1; then
  git push || fail "GitHub 推送失败，请检查网络或登录状态。"
else
  git push -u "$remote" "$branch" || fail "GitHub 推送失败，请检查网络或登录状态。"
fi

printf '\n上传成功。GitHub Pages 正在自动更新网站，通常需要一两分钟。\n'
pause_before_exit
