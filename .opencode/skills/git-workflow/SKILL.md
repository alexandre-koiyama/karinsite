---
name: git-workflow
description: "Git workflow conventions for branching, committing, and pull requests. Use when: creating branches, writing commit messages, creating pull requests, reviewing PRs, managing releases, or when user mentions git, commit, branch, PR, pull request, merge, rebase, or conventional commits."
---

# Git Workflow

## Branch Naming

All branches must follow these patterns:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<short-description>` | `feature/user-auth` |
| Bug Fix | `fix/<short-description>` | `fix/login-redirect` |
| Chore | `chore/<short-description>` | `chore/update-deps` |
| Release | `release/<version>` | `release/1.2.0` |
| Hotfix | `hotfix/<short-description>` | `hotfix/prod-db-timeout` |

### Rules

- Use lowercase kebab-case for descriptions
- Keep branch names under 50 characters
- Include ticket/issue number if applicable: `feature/PROJ-123-user-auth`
- Never work directly on `main` or `master`

## Commit Messages

Use Conventional Commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to Use |
|------|-------------|
| `feat` | New feature for the user |
| `fix` | Bug fix for the user |
| `docs` | Documentation changes |
| `style` | Formatting, missing semicolons (no code change) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, deps, tooling |
| `ci` | CI/CD configuration changes |
| `revert` | Reverting a previous commit |

### Scope

The scope is optional but recommended. Use the module or area affected:

- `api` — API routes and endpoints
- `auth` — Authentication and authorization
- `db` — Database models and migrations
- `ui` — Frontend HTML/CSS/JS
- `config` — Configuration and settings

### Rules

- Subject line: max 72 characters
- Use imperative mood: "add feature" not "added feature"
- Do not end subject line with a period
- Body: explain what and why, not how
- Reference issues: `Closes #123` or `Refs #456`

### Examples

```
feat(auth): add JWT token refresh endpoint

Implement /api/v1/auth/refresh endpoint that accepts a valid
refresh token and returns a new access token. Tokens expire
after 15 minutes (access) and 7 days (refresh).

Closes #42
```

```
fix(api): return 404 instead of 500 for missing user

User lookup was raising an unhandled exception when user_id
did not exist. Now returns proper 404 with descriptive message.
```

```
chore(deps): update sqlalchemy to 2.0.23
```

## Pull Request Workflow

### Creating a PR

1. Create branch from `main`: `git checkout -b feature/user-auth`
2. Make changes with clear, atomic commits
3. Push branch: `git push -u origin feature/user-auth`
4. Open PR against `main` with a clear title and description

### PR Title Format

Follow the same Conventional Commits format:

```
feat(auth): add JWT authentication
fix(api): correct user lookup error handling
```

### PR Description Template

```markdown
## Changes

- [Brief list of changes made]

## Type of Change

- [ ] Feature (new functionality)
- [ ] Fix (bug fix)
- [ ] Refactor (code restructuring)
- [ ] Chore (tooling, deps, config)
- [ ] Breaking change

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No new warnings introduced
- [ ] Documentation updated if needed
```

### PR Rules

- Require at least 1 approval before merging
- All CI checks must pass (lint, typecheck, test)
- Squash merge to keep `main` history clean
- Delete branch after merge
- PR should be reviewable in under 30 minutes (split larger changes)

## Common Git Commands

```bash
# Start new work
git checkout main && git pull
git checkout -b feature/my-feature

# Stage and commit
git add -A
git commit -m "feat(scope): description"

# Keep branch up to date
git fetch origin
git rebase origin/main

# Push and create PR
git push -u origin feature/my-feature

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Amend last commit message
git commit --amend -m "feat(scope): corrected message"
```
