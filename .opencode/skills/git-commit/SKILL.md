# Skill: git-commit

## Description
Automated Git commit and push workflow. After every file change, stage, commit, and push to GitHub following conventional commits format.

## When to Use
- After creating or editing any project file
- After completing a logical unit of work
- When the user asks to save/push changes

## Workflow

### Step 1: Check Status
Run `git status` and `git diff --stat` to see what changed.

### Step 2: Stage Changes
```bash
git add -A
```

### Step 3: Commit with Conventional Commits
Use the following prefixes based on change type:
- `feat:` New feature or page
- `fix:` Bug fix
- `style:` CSS, formatting, UI changes
- `refactor:` Code restructuring
- `chore:` Config, tooling, dependencies
- `docs:` Documentation

Format:
```bash
git commit -m "<type>: <short description>

<optional body with details>"
```

### Step 4: Push to GitHub
```bash
git push origin HEAD
```

### Rules
- Always commit after each meaningful change
- Never commit `.env` files or secrets
- Never commit `.venv/`, `__pycache__/`, `node_modules/`
- Use English for commit messages
- Push immediately after each commit
- Verify push succeeded before reporting completion

### Remote Configuration
- Remote: `origin`
- Branch: `master`
- Repo: `alexandre-koiyama/karinsite`
