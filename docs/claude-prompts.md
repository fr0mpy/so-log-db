# Claude Prompts

AI tooling configuration in `.claude/` directory.

## Overview

The `.claude/` directory contains configuration that controls Claude's behavior when working on this codebase. `CLAUDE.md` is the central index that maps trigger keywords to relevant files.

## Component Types

| Type | Location | Count | Purpose |
|------|----------|-------|---------|
| Rules | `.claude/rules/*.md` | 13 | Coding standards |
| Skills | `.claude/skills/*.md` | 7 | Domain knowledge |
| Commands | `.claude/commands/*.md` | 6 | Slash commands |
| Agents | `.claude/agents/*.md` | 31 | Specialized subagents |
| Recipes | `.claude/component-recipes/*.md` | 35 | Component templates |

## Rules

Coding standards triggered by keywords in prompts:

| Rule | Triggers |
|------|----------|
| `routing.md` | route, Link, href, navigate |
| `i18n.md` | text, translation, locale |
| `components.md` | component, style, className |
| `theming.md` | theme, token, css var, color |
| `performance.md` | memo, useMemo, lighthouse |
| `accessibility.md` | aria, a11y, focus, keyboard |
| `security.md` | sanitize, xss, validate, auth |
| `testing.md` | test, mock, vitest, playwright |
| `git.md` | commit, branch, merge, pr |
| `data-fetching.md` | fetch, cache, SWR, suspense |
| `error-handling.md` | error, catch, boundary |
| `bundle.md` | import, dependency, tree-shake |
| `code-standards.md` | hardcode, magic number, pattern |

## Agents

### Pre-Work (Run BEFORE)

| Agent | When to Use |
|-------|-------------|
| `pre-code-check` | Before creating component, hook, util |
| `package-checker` | Before npm/yarn/pnpm install |
| `api-contract-guardian` | Before modifying API endpoints |
| `breaking-change-predictor` | Before refactoring shared code |
| `challenge-thinking` | Before architecture decisions |
| `clarify-intent` | When task is ambiguous |
| `migration-planner` | For schema or API migrations |

### Post-Work (Run AFTER)

| Agent | When to Use |
|-------|-------------|
| `component-auditor` | After creating/modifying UI components |
| `accessibility-auditor` | After any UI work |
| `design-token-validator` | After styling changes |
| `server-component-validator` | After creating React components |
| `structure-validator` | After creating files/directories |
| `bundle-size-tracker` | After adding dependencies |
| `security-auditor` | After handling user input |

### On-Demand

| Agent | When to Use |
|-------|-------------|
| `context-loader` | Refresh context, generate CONTEXT.md |
| `harness-scaffolder` | Create component preview harness |
| `skeleton-builder` | Build loading skeletons |
| `playwright-tester` | Test components via Playwright |
| `pr-narrator` | Write PR descriptions |
| `scope-guard` | Check for scope drift |
| `performance-profiler` | Analyze Lighthouse scores |

## Commands (Slash Commands)

| Command | Purpose |
|---------|---------|
| `/audit` | Run comprehensive codebase audit |
| `/commit` | Stage and commit changes |
| `/review` | Review current changes |
| `/test` | Run tests and fix failures |
| `/setup-styling` | Define UI aesthetic |
| `/component-harness` | Launch visual component preview |

## Skills

Domain knowledge for specific tasks:

| Skill | Purpose |
|-------|---------|
| `styling.md` | Tailwind, Text component, cn() |
| `react-patterns.md` | Hooks, state, effects |
| `mermaid.md` | Diagram creation |
| `agent-format.md` | Creating new agents |
| `command-format.md` | Creating slash commands |
| `rule-format.md` | Creating new rules |

## CLAUDE.md Structure

```markdown
# Project Map

## Rules
| Rule | Triggers |
|------|----------|
| `rules/routing.md` | route, Link, href |

## Skills
| Skill | Triggers |
|-------|----------|
| `skills/styling.md` | tailwind, className |

## Agents
### Pre-Work
| Agent | Triggers |
|-------|----------|
| `pre-code-check` | BEFORE creating component |

## Behavior
- Announce: `🔧 ACTION:` before, `✅ DONE:` after
- Pushback: Challenge incorrect assumptions
```

## Adding New Rules/Agents

### Rule Format

```markdown
# Rule Name

## Rule
Brief statement of the rule.

## Examples
| ❌ Bad | ✅ Good |
|--------|---------|
| `example` | `example` |
```

### Agent Format

```markdown
---
name: agent-name
description: When to use this agent
tools: Glob, Grep, Read
model: sonnet
---

You are a [role].

## Your Task
1. Step one
2. Step two

## Output Format
[Expected output structure]
```

## Behavior Patterns

- **Announce actions**: `🔧 ACTION:` before, `✅ DONE:` after, `❌ FAILED:` on error
- **Spawn subagents**: `🤖 SPAWNING: [agent-name]`
- **Dedupe**: Each agent runs max once per prompt
- **Pushback**: Challenge incorrect assumptions with evidence
