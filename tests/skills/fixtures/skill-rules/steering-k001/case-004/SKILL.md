### Step 3: Execute Scaffolding (ONCE)

Run the appropriate scaffold scripts:

```bash
# Main orchestrator
bash ${CLAUDE_PLUGIN_ROOT}/scripts/scaffold/scaffold-project.sh \
  --name "project-name" \
  --type "monorepo-both" \
  --author "Name" \
  --email "email@example.com"
```

The script handles:
- Creating directory structure (apps/, packages/, services/ for monorepos)
- Copying linter configs (.oxlintrc.json, .oxfmtrc.json, ruff.toml, pyrightconfig.json)
- Setting up cursor rules (.cursor/rules/*.md with .mdc symlinks)
- Creating cursor hooks (.cursor/hooks/)
- Setting up Claude hooks (.claude/hooks/)
- Creating package.json/pyproject.toml with dependencies
- Setting up vitest/pytest configurations
- Creating CLAUDE.md and AGENTS.md (symlink to CLAUDE.md)
- Setting up .gitignore
- Creating worktrunk config (.config/wt.toml)
