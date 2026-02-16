#!/usr/bin/env bash
# Smart Rule Injector - Minimal Context Edition
# - Silent on cache hits (no repeated output)
# - Context warning only once per session
# - Only outputs when classification changes

set -euo pipefail

# Load .env file if exists (project root or .claude/)
for envfile in ".env" ".claude/.env"; do
  if [[ -f "$envfile" ]]; then
    set -a
    source "$envfile"
    set +a
    break
  fi
done

INPUT=$(cat)
USER_PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty' 2>/dev/null || echo "")
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "default"' 2>/dev/null || echo "default")

# Find .claude directory
CLAUDE_DIR=""
CURRENT_DIR="$(pwd)"
while [[ "$CURRENT_DIR" != "/" ]]; do
  [[ -d "$CURRENT_DIR/.claude" ]] && { CLAUDE_DIR="$CURRENT_DIR/.claude"; break; }
  CURRENT_DIR="$(dirname "$CURRENT_DIR")"
done
[[ -z "$CLAUDE_DIR" ]] && exit 0

# Cache files
CACHE_DIR="$CLAUDE_DIR/.cache"
mkdir -p "$CACHE_DIR" 2>/dev/null || true
COUNT_FILE="$CACHE_DIR/${SESSION_ID}.count"
RULES_FILE="$CACHE_DIR/${SESSION_ID}.rules"
WARNED_FILE="$CACHE_DIR/${SESSION_ID}.warned"

# Increment count
COUNT=1
[[ -f "$COUNT_FILE" ]] && COUNT=$(( $(cat "$COUNT_FILE") + 1 ))
echo "$COUNT" > "$COUNT_FILE"

# Context warning - ONCE per session only
if [[ ! -f "$WARNED_FILE" ]]; then
  CONTEXT_FILE="$CLAUDE_DIR/CONTEXT.md"
  if [[ -f "$CONTEXT_FILE" ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      file_age=$(( $(date +%s) - $(stat -f %m "$CONTEXT_FILE") ))
    else
      file_age=$(( $(date +%s) - $(stat -c %Y "$CONTEXT_FILE") ))
    fi
    if [[ $file_age -gt 3600 ]]; then
      echo "Context: stale ($(( file_age / 3600 ))h). Consider running context-loader."
      touch "$WARNED_FILE"
    fi
  fi
fi

# Cache hit? Stay silent (no output = no context bloat)
if [[ -f "$RULES_FILE" ]] && [[ $(( COUNT % 3 )) -ne 1 ]]; then
  exit 0
fi

# No API key? Output once, then stay silent
if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  if [[ ! -f "$RULES_FILE" ]]; then
    echo "Rules in .claude/rules/. Announce: 🔧/✅/❌."
    echo "no-api" > "$RULES_FILE"
  fi
  exit 0
fi

# Read map from CLAUDE.md
CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"
[[ ! -f "$CLAUDE_MD" ]] && exit 0

MAP=$(sed -n '/^## Rules/,/^## Behavior/p' "$CLAUDE_MD" | head -50)
PROMPT_SNIPPET="${USER_PROMPT:0:300}"
PROMPT_ESCAPED=$(printf '%s' "$PROMPT_SNIPPET" | jq -Rs '.' | sed 's/^"//;s/"$//')
MAP_ESCAPED=$(printf '%s' "$MAP" | jq -Rs '.' | sed 's/^"//;s/"$//')

# Call Haiku
RESPONSE=$(curl -s --max-time 3 https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d "{
  \"model\": \"claude-3-5-haiku-20241022\",
  \"max_tokens\": 50,
  \"messages\": [{
    \"role\": \"user\",
    \"content\": \"Task: $PROMPT_ESCAPED\\n\\nMap:\\n$MAP_ESCAPED\\n\\nReply ONLY: Rules: x,y Agents: a,b (or 'none'). No explanation.\"
  }]
}" 2>/dev/null || echo "")

RESULT=$(echo "$RESPONSE" | jq -r '.content[0].text // empty' 2>/dev/null || echo "")
[[ -z "$RESULT" ]] && exit 0

# Only output if classification CHANGED
PREV=""
[[ -f "$RULES_FILE" ]] && PREV=$(cat "$RULES_FILE")
if [[ "$RESULT" != "$PREV" ]]; then
  echo "$RESULT"
  echo "$RESULT" > "$RULES_FILE"
fi
