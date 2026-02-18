Run comprehensive codebase audit against all project rules.

1. Spawn all auditors in parallel for target path:
   - component-auditor, accessibility-auditor, design-token-validator
   - server-component-validator, bundle-size-tracker, performance-profiler
   - code-standards-auditor, routing-auditor, i18n-auditor
   - error-handling-auditor, data-fetching-auditor, security-auditor
   - test-auditor, git-auditor
2. Each auditor checks specific rule categories from .claude/rules/
3. Aggregate findings by severity (🔴 Critical > 🟡 Warning > 🟢 Minor)
4. Output unified report with file:line references and fix recommendations

$ARGUMENTS
