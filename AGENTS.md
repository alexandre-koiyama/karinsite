# Karinsite — Project Instructions

## Tech Stack

- **Backend**: Python 3.11+ with FastAPI
- **ORM**: SQLAlchemy 2.0 (async)
- **Validation**: Pydantic v2
- **Database**: PostgreSQL
- **Migrations**: Alembic
- **Auth**: JWT / OAuth2
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Testing**: pytest (backend), vitest or jest (frontend)

## Project Structure

```
karinsite/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── core/                # Config, security, dependencies
│   │   ├── config.py
│   │   ├── security.py
│   │   └── deps.py
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── api/                 # API route modules
│   │   └── v1/
│   ├── services/            # Business logic layer
│   ├── crud/                # Database CRUD operations
│   └── utils/               # Utilities
├── static/                  # CSS, JS, images
├── templates/               # HTML templates (Jinja2)
├── tests/
│   ├── conftest.py
│   ├── unit/
│   └── integration/
├── alembic/                 # Database migrations
├── pyproject.toml
├── Dockerfile
└── docker-compose.yml
```

## Code Style

### Python

- Follow PEP 8
- Use `ruff` for linting and formatting
- Use `mypy` for type checking
- Use `async/await` for all database and I/O operations
- Use type hints on all function signatures
- Use f-strings for string formatting
- Use dependency injection via FastAPI's `Depends()`

### JavaScript

- Use `const` and `let`, never `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use `async/await` over `.then()` chains
- Prefer `addEventListener` over inline event handlers

### HTML/CSS

- Use semantic HTML5 elements (`<main>`, `<nav>`, `<section>`, `<article>`)
- Use CSS custom properties for theming
- Mobile-first responsive design
- Use BEM or consistent naming for CSS classes

## Quality Gates

- [ ] All tests passing with >80% coverage
- [ ] Type checking passes (`mypy`)
- [ ] Linting clean (`ruff check .`)
- [ ] No OWASP Top 10 vulnerabilities
- [ ] WCAG AA accessibility compliance
- [ ] API documentation complete (OpenAPI)

## Git Conventions

- Branch naming: `feature/`, `fix/`, `chore/`
- Commit messages: Conventional Commits format
- PRs require at least one review

## Environment

- Use `.env` for local configuration (never committed)
- Use `pyproject.toml` for project metadata and dependencies
- Use `uv` or `pip` for package management
