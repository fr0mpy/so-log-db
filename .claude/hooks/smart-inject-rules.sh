#!/usr/bin/env bash
# Smart Rule Injector - Plan Mode Enhanced Edition
# - Silent on cache hits (no repeated output) in normal mode
# - In PLAN MODE: injects full file contents of matched rules/skills
# - Always fresh classification in plan mode (no cache)
# - User feedback via stderr

set -euo pipefail

# User feedback helper (writes to stderr so user sees it)
notify() {
  echo "$1" >&2
}

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
PERMISSION_MODE=$(echo "$INPUT" | jq -r '.permission_mode // "default"' 2>/dev/null || echo "default")

IS_PLAN_MODE=false
[[ "$PERMISSION_MODE" == "plan" ]] && IS_PLAN_MODE=true

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

# Context warning - ONCE per session only (skip in plan mode)
if [[ "$IS_PLAN_MODE" == "false" ]] && [[ ! -f "$WARNED_FILE" ]]; then
  CONTEXT_FILE="$CLAUDE_DIR/CONTEXT.md"
  if [[ -f "$CONTEXT_FILE" ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      file_age=$(( $(date +%s) - $(stat -f %m "$CONTEXT_FILE") ))
    else
      file_age=$(( $(date +%s) - $(stat -c %Y "$CONTEXT_FILE") ))
    fi
    if [[ $file_age -gt 3600 ]]; then
      echo "Context: stale ($(( file_age / 3600 ))h). Consider running context-loader."
      notify "⚠️  Context stale ($(( file_age / 3600 ))h) - run context-loader to refresh"
      touch "$WARNED_FILE"
    fi
  fi
fi

# Cache hit? Stay silent (no output = no context bloat)
# PLAN MODE: Always skip cache - run fresh classification
if [[ "$IS_PLAN_MODE" == "false" ]]; then
  if [[ -f "$RULES_FILE" ]] && [[ $(( COUNT % 3 )) -ne 1 ]]; then
    CACHED=$(cat "$RULES_FILE")
    if [[ "$CACHED" != "no-api" ]]; then
      notify "📋 Using cached: $CACHED"
    fi
    exit 0
  fi
fi

# No API key? Output once, then stay silent
if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  if [[ ! -f "$RULES_FILE" ]]; then
    echo "Rules in .claude/rules/. Announce: 🔧/✅/❌."
    notify "⚠️  No ANTHROPIC_API_KEY - smart classification disabled"
    echo "no-api" > "$RULES_FILE"
  fi
  exit 0
fi

if [[ "$IS_PLAN_MODE" == "true" ]]; then
  notify "🎯 Plan mode: analyzing task for relevant context..."
else
  notify "🔍 Classifying prompt..."
fi

# Read map from CLAUDE.md
CLAUDE_MD="$CLAUDE_DIR/CLAUDE.md"
[[ ! -f "$CLAUDE_MD" ]] && exit 0

MAP=$(sed -n '/^## Rules/,/^## Behavior/p' "$CLAUDE_MD" | head -80)
PROMPT_SNIPPET="${USER_PROMPT:0:500}"
PROMPT_ESCAPED=$(printf '%s' "$PROMPT_SNIPPET" | jq -Rs '.' | sed 's/^"//;s/"$//')
MAP_ESCAPED=$(printf '%s' "$MAP" | jq -Rs '.' | sed 's/^"//;s/"$//')

# Different prompts for plan mode vs normal mode
if [[ "$IS_PLAN_MODE" == "true" ]]; then
  # Plan mode: more thorough, structured output for parsing
  CLASSIFICATION_PROMPT="Task: $PROMPT_ESCAPED

Map:
$MAP_ESCAPED

This is PLAN MODE - be thorough. Identify ALL relevant items for implementing this task.

Reply in this EXACT format (one item per line, no explanations):
RULES: rule1, rule2, rule3
SKILLS: skill1, skill2
PRE_AGENTS: agent1, agent2
POST_AGENTS: agent1, agent2

Use 'none' if a category doesn't apply. Use the exact filenames from the map (without .md extension)."
  MAX_TOKENS=150
else
  # Normal mode: concise
  CLASSIFICATION_PROMPT="Task: $PROMPT_ESCAPED

Map:
$MAP_ESCAPED

Reply ONLY: Rules: x,y Agents: a,b (or 'none'). No explanation."
  MAX_TOKENS=50
fi

# Call Haiku
RESPONSE=$(curl -s --max-time 5 https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d "{
  \"model\": \"claude-3-5-haiku-20241022\",
  \"max_tokens\": $MAX_TOKENS,
  \"messages\": [{
    \"role\": \"user\",
    \"content\": $(printf '%s' "$CLASSIFICATION_PROMPT" | jq -Rs '.')
  }]
}" 2>/dev/null || echo "")

RESULT=$(echo "$RESPONSE" | jq -r '.content[0].text // empty' 2>/dev/null || echo "")
if [[ -z "$RESULT" ]]; then
  notify "⚠️  Classification failed (API timeout or error)"
  exit 0
fi

# ============================================================================
# PLAN MODE: Inject full file contents
# ============================================================================
if [[ "$IS_PLAN_MODE" == "true" ]]; then
  notify "✅ Classification complete, injecting relevant context..."

  echo "<plan_context>"

  # Parse RULES from classification
  RULES_LINE=$(echo "$RESULT" | grep -i "^RULES:" | head -1 || echo "")
  if [[ -n "$RULES_LINE" ]] && [[ "$RULES_LINE" != *"none"* ]]; then
    RULES=$(echo "$RULES_LINE" | sed 's/^RULES:[[:space:]]*//' | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

    echo ""
    echo "## Relevant Rules"
    echo ""

    while IFS= read -r rule; do
      [[ -z "$rule" ]] && continue
      rule=$(echo "$rule" | tr -d '[:space:]')
      RULE_FILE="$CLAUDE_DIR/rules/${rule}.md"
      if [[ -f "$RULE_FILE" ]]; then
        echo "<rule name=\"$rule\">"
        cat "$RULE_FILE"
        echo "</rule>"
        echo ""
        notify "  📜 Loaded rule: $rule"
      fi
    done <<< "$RULES"
  fi

  # Parse SKILLS from classification
  SKILLS_LINE=$(echo "$RESULT" | grep -i "^SKILLS:" | head -1 || echo "")
  if [[ -n "$SKILLS_LINE" ]] && [[ "$SKILLS_LINE" != *"none"* ]]; then
    SKILLS=$(echo "$SKILLS_LINE" | sed 's/^SKILLS:[[:space:]]*//' | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

    echo ""
    echo "## Relevant Skills"
    echo ""

    while IFS= read -r skill; do
      [[ -z "$skill" ]] && continue
      skill=$(echo "$skill" | tr -d '[:space:]')
      SKILL_FILE="$CLAUDE_DIR/skills/${skill}.md"
      if [[ -f "$SKILL_FILE" ]]; then
        echo "<skill name=\"$skill\">"
        cat "$SKILL_FILE"
        echo "</skill>"
        echo ""
        notify "  🛠️  Loaded skill: $skill"
      fi
    done <<< "$SKILLS"
  fi

  # Parse AGENTS - names only (they get spawned via Task tool)
  PRE_AGENTS_LINE=$(echo "$RESULT" | grep -i "^PRE_AGENTS:" | head -1 || echo "")
  POST_AGENTS_LINE=$(echo "$RESULT" | grep -i "^POST_AGENTS:" | head -1 || echo "")

  if [[ -n "$PRE_AGENTS_LINE" ]] || [[ -n "$POST_AGENTS_LINE" ]]; then
    echo ""
    echo "## Agents to Consider"
    echo ""

    if [[ -n "$PRE_AGENTS_LINE" ]] && [[ "$PRE_AGENTS_LINE" != *"none"* ]]; then
      PRE_AGENTS=$(echo "$PRE_AGENTS_LINE" | sed 's/^PRE_AGENTS:[[:space:]]*//')
      echo "- **PRE (run before coding):** $PRE_AGENTS"
      notify "  🤖 Pre-agents: $PRE_AGENTS"
    fi

    if [[ -n "$POST_AGENTS_LINE" ]] && [[ "$POST_AGENTS_LINE" != *"none"* ]]; then
      POST_AGENTS=$(echo "$POST_AGENTS_LINE" | sed 's/^POST_AGENTS:[[:space:]]*//')
      echo "- **POST (run after coding):** $POST_AGENTS"
      notify "  🤖 Post-agents: $POST_AGENTS"
    fi
  fi

  echo ""
  echo "</plan_context>"

  notify "🎯 Plan context injected successfully"
  exit 0
fi

# ============================================================================
# NORMAL MODE: Just output classification (existing behavior)
# ============================================================================

# Only output if classification CHANGED
PREV=""
[[ -f "$RULES_FILE" ]] && PREV=$(cat "$RULES_FILE")
if [[ "$RESULT" != "$PREV" ]]; then
  echo "$RESULT"
  echo "$RESULT" > "$RULES_FILE"
  # Show user what was matched
  if [[ "$RESULT" == *"none"* ]] && [[ "$RESULT" == *"Rules: none"* ]]; then
    notify "📋 No rules/agents matched"
  else
    notify "✅ Matched: $RESULT"
  fi
else
  notify "📋 Unchanged: $RESULT"
fi
