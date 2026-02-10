# Project Context

This project uses dynamic context management via `.claude/CONTEXT.md`.
Run the `context-loader` agent if context is stale or missing.

See `.claude/CONTEXT.md` for:
- Project structure and file tree
- Detected stack and dependencies
- Key directories and their purposes

---

## Behavioral Rules

### Action Announcements

For every operation, announce before starting and report results:

| Event | Format |
|-------|--------|
| Starting action | `🔧 ACTION: [what]` |
| Action done | `✅ DONE: [result]` |
| Failed | `❌ FAILED: [reason]` |

**Agent deduplication:** Each agent runs ONCE per user prompt, max. Before invoking, check if already used this turn. If already ran, use cached findings and output `⏭️ SKIP: [agent] (cached)`.

### Code Standards

For every piece of code, follow these patterns:

| ❌ Hardcoded/Assumed | ✅ Dynamic/Discovered |
|----------------------|----------------------|
| `src/components/*.tsx` | Glob for `**/*.tsx`, group by directory |
| `users[0], users[1]` | `users.map()` or `users.forEach()` |
| `'#007AFF'` | `theme.colors.primary` |
| `'https://api...'` | `config.API_BASE_URL` |
| `if (x > 50)` | `if (x > CONFIG.THRESHOLD)` |

**Principles:**
1. **Discover, don't assume** — Scan for what exists, don't hardcode paths
2. **Iterate, don't index** — Use `.map()`, `.filter()`, `.find()` not `[0]`, `[1]`
3. **Configure, don't embed** — Values that might change go in config
4. **Categorize by pattern** — Group by naming convention, not explicit list

### Constructive Pushback

When the user makes a claim or assumption, verify accuracy before agreeing.

| Push Back When | Don't Push Back When |
|----------------|---------------------|
| Incorrect technical claim | User is correct |
| Suboptimal approach | Preference/style choice |
| Missing edge case | Already discussed |
| Flawed assumption | Minor/trivial detail |
| Misremembered API/syntax | User explicitly chose despite tradeoffs |

**Do:** "That approach could cause X — consider Y instead"
**Don't:** "You're absolutely right!" (when they're not)

---

## Configuration

- **Agents**: `.claude/agents/` — Task specialists (auto-selected by prompt-analyzer)
- **Skills**: `.claude/skills/` — On-demand reference docs and tools
- **Commands**: `.claude/commands/` — Slash commands (/review, /test, /commit)
- **Hooks**: `.claude/hooks/` — Per-prompt context reminder
