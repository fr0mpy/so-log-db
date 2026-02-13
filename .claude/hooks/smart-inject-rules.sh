#!/usr/bin/env bash
# Smart Context Reminder
# - Checks context freshness
# - Outputs compressed rule reminder
# - Instructs Claude to invoke prompt-analyzer for agent/skill selection

set -euo pipefail

CLAUDE_DIR=""
CURRENT_DIR="$(pwd)"
while [[ "$CURRENT_DIR" != "/" ]]; do
  if [[ -d "$CURRENT_DIR/.claude" ]]; then
    CLAUDE_DIR="$CURRENT_DIR/.claude"
    break
  fi
  CURRENT_DIR="$(dirname "$CURRENT_DIR")"
done

[[ -z "$CLAUDE_DIR" ]] && exit 0

# Check context freshness
CONTEXT_FILE="$CLAUDE_DIR/CONTEXT.md"
if [[ ! -f "$CONTEXT_FILE" ]]; then
  echo "Context: missing. Run context-loader agent to generate."
elif [[ "$OSTYPE" == "darwin"* ]]; then
  file_age=$(( $(date +%s) - $(stat -f %m "$CONTEXT_FILE") ))
  [[ $file_age -gt 3600 ]] && echo "Context: stale ($(( file_age / 3600 ))h). Consider running context-loader."
else
  file_age=$(( $(date +%s) - $(stat -c %Y "$CONTEXT_FILE") ))
  [[ $file_age -gt 3600 ]] && echo "Context: stale ($(( file_age / 3600 ))h). Consider running context-loader."
fi

# Behavior reminder (rules now in .claude/rules/)
cat << 'REMINDER'
Rules in .claude/rules/ — load relevant ones. Announce: 🔧/✅/❌. Agents run once per prompt.
REMINDER
