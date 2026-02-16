# Project Map

Central index for rules, skills, and agents. Hook reads this every 3 prompts for classification.

## Rules

| Rule | Triggers |
|------|----------|
| `rules/code-standards.md` | hardcode, magic number, config, pattern, iterate, discover, assume |
| `rules/routing.md` | route, Link, href, navigate, url, path, navigation, redirect |
| `rules/bundle.md` | import, dependency, barrel, tree-shake, package, granular, export |
| `rules/accessibility.md` | aria, a11y, label, focus, keyboard, heading, screen reader, wcag |
| `rules/components.md` | component, ui, style, className, ref, compound, pattern, forwardRef |
| `rules/theming.md` | theme, token, css var, color, design, variable, dark mode, light mode |
| `rules/i18n.md` | text, translation, t(), locale, string, getTranslations, language, i18n |

## Skills

| Skill | Triggers |
|-------|----------|
| `skills/styling.md` | tailwind, className, Text component, style pattern, variant, cn() |
| `skills/react-patterns.md` | hook, useState, useEffect, useRef, context, memo, callback, reducer |
| `skills/mermaid.md` | diagram, flowchart, sequence, architecture, graph, chart, visualize |
| `skills/prompt-analyzer.md` | analyze prompt, classify, categorize |
| `skills/agent-format.md` | create agent, new agent, agent template |
| `skills/command-format.md` | create command, slash command, new command |
| `skills/rule-format.md` | create rule, new rule, rule template |

## Agents

### Pre-Work (Run BEFORE)

| Agent | Triggers |
|-------|----------|
| `pre-code-check` | BEFORE creating component, hook, util, service |
| `package-checker` | BEFORE npm install, yarn add, pnpm add, add dependency |
| `dependency-detective` | BEFORE adding new package, evaluate dependency |
| `api-contract-guardian` | BEFORE modifying API, endpoint, response shape, interface |
| `breaking-change-predictor` | BEFORE refactor, modify shared code, rename export |
| `challenge-thinking` | BEFORE architecture decision, complex implementation |
| `clarify-intent` | WHEN task ambiguous, multiple interpretations, unclear requirements |
| `migration-planner` | FOR schema change, API versioning, data migration, database change |

### Post-Work (Run AFTER)

| Agent | Triggers |
|-------|----------|
| `component-auditor` | AFTER creating/modifying UI component |
| `accessibility-auditor` | AFTER any UI work, before completing UI task |
| `design-token-validator` | AFTER generating UI, styling changes |
| `server-component-validator` | AFTER creating React component, RSC, client boundary |
| `structure-validator` | AFTER creating files, directories, reorganizing code |
| `bundle-size-tracker` | AFTER adding dependency, before shipping, build |

### On-Demand

| Agent | Triggers |
|-------|----------|
| `context-loader` | context stale, refresh context, load context, CONTEXT.md |
| `harness-scaffolder` | /component-harness, preview component, visual harness |
| `style-inspector` | extract styles from URL, copy design, reverse engineer |
| `playwright-tester` | test component, verify rendering, e2e test, playwright |
| `pr-narrator` | create PR, pull request, write PR description |
| `scope-guard` | long session, scope drift, rabbit hole, refocus |
| `session-manager` | session end, handoff, summarize progress, context limit |

## Behavior

- **Announce:** `🔧 ACTION:` before, `✅ DONE:` after, `❌ FAILED:` on error
- **Subagents:** `🤖 SPAWNING: [agent-name]`
- **Dedupe:** Each agent max ONCE per prompt. `⏭️ SKIP: [agent] (cached)`
- **Pushback:** Challenge incorrect assumptions with evidence
