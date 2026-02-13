# Project Map

This file is an index. Rules and context are in separate files, loaded when relevant.

## Context

Run `context-loader` agent if stale → generates `.claude/CONTEXT.md`

## Rules

Load the relevant rule file(s) based on the task:

| Rule | When to Load |
|------|--------------|
| [rules/code-standards.md](rules/code-standards.md) | Writing any code (hardcoding, iteration, config) |
| [rules/routing.md](rules/routing.md) | Adding routes, links, or navigation |
| [rules/bundle.md](rules/bundle.md) | Adding imports or dependencies |
| [rules/accessibility.md](rules/accessibility.md) | Building UI (ARIA, headings, animations) |
| [rules/components.md](rules/components.md) | Building UI components (patterns, styles, refs) |
| [rules/theming.md](rules/theming.md) | Working with design tokens or CSS variables |
| [rules/i18n.md](rules/i18n.md) | Adding user-facing text |

## Resources

| Resource | Purpose |
|----------|---------|
| `agents/` | Task specialists (auto-selected by prompt-analyzer) |
| `skills/` | Reference docs (styling, react-patterns, mermaid) |
| `component-recipes/` | Component implementation templates |
| `commands/` | Slash commands (/review, /test, /commit) |

## Behavior

- **Announce actions:** `🔧 ACTION:` before, `✅ DONE:` after, `❌ FAILED:` on error
- **Announce subagents:** `🤖 SPAWNING: [agent-name]` when delegating to a subagent
- **Agent deduplication:** Each agent runs max ONCE per prompt. Use `⏭️ SKIP: [agent] (cached)` if already ran.
- **Proactive delegation:** Agents with "MUST BE USED" or "Use PROACTIVELY" in descriptions should auto-run when conditions match.
- **Pushback:** Verify accuracy before agreeing. Challenge incorrect assumptions with evidence.
