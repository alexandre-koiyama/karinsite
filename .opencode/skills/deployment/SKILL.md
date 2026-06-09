---
name: deployment
description: "Deployment workflow for FastAPI applications with Docker, docker-compose, Uvicorn/Gunicorn, PostgreSQL, Alembic migrations, and environment management. Use when: deploying, containerizing, configuring production settings, setting up CI/CD, managing environments, or when user mentions Docker, deploy, production, staging, Uvicorn, Gunicorn, Alembic migration, or environment variables."
---

# Deployment Workflow

## Overview

Deployment workflow for FastAPI + Python + JavaScript + HTML applications using Docker, Gunicorn + Uvicorn, PostgreSQL, and Alembic migrations.

## Architecture

```
Internet → Nginx (reverse proxy, SSL) → Gunicorn + Uvicorn workers → FastAPI app
                                           ↓
                                      PostgreSQL
```

## Phase 1: Docker Configuration

### Multi-Stage Dockerfile

```dockerfile
# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

COPY pyproject.toml .
RUN pip install --no-cache-dir .

# Production stage
FROM python:3.11-slim AS production

WORKDIR /app

RUN addgroup --system app && adduser --system --group app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .

USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD python -c "import httpx; httpx.get('http://localhost:8000/health')"

CMD ["gunicorn", "app.main:app", "-c", "gunicorn.conf.py"]
```

### docker-compose.yml

```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "python", "-c", "import httpx; httpx.get('http://localhost:8000/health')"]
      interval: 30s
      timeout: 5s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./static:/app/static:ro
    depends_on:
      app:
        condition: service_healthy

volumes:
  postgres_data:
```

### .dockerignore

```
.git
.env
.env.*
__pycache__
*.pyc
.pytest_cache
.mypy_cache
.ruff_cache
node_modules
*.egg-info
dist
build
.venv
```

## Phase 2: Gunicorn Configuration

```python
# gunicorn.conf.py
import multiprocessing

# Worker count: 2 * CPU cores + 1
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
bind = "0.0.0.0:8000"
timeout = 120
keepalive = 5
graceful_timeout = 30
max_requests = 1000
max_requests_jitter = 50
```

## Phase 3: Environment Configuration

### Pydantic Settings

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Karinsite"
    DEBUG: bool = False
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    CORS_ORIGINS: list[str] = []

    model_config = {"env_file": ".env", "extra": "ignore"}

settings = Settings()
```

### Environment Files

| File | Purpose | Committed |
|------|---------|-----------|
| `.env.example` | Template with all required vars (no secrets) | Yes |
| `.env` | Local development values | No |
| `.env.staging` | Staging environment values | No |
| `.env.production` | Production values (secrets via vault) | No |

### .env.example

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/karinsite
SECRET_KEY=change-me-to-a-strong-secret
DEBUG=false
CORS_ORIGINS=["http://localhost:3000"]
```

## Phase 4: Database Migrations in Deployment

Migrations must run automatically as part of deployment:

```bash
# In deployment script or entrypoint
alembic upgrade head
```

**Entrypoint Pattern:**

```bash
#!/bin/bash
set -e

echo "Running database migrations..."
alembic upgrade head

echo "Starting application..."
exec gunicorn app.main:app -c gunicorn.conf.py
```

## Phase 5: Health Check Endpoint

```python
from fastapi import APIRouter
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_db

router = APIRouter()

@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "database": "disconnected", "error": str(e)},
        )
```

## Phase 6: Nginx Configuration

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://app:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /app/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /health {
        proxy_pass http://app:8000/health;
    }
}
```

## Phase 7: CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -e ".[dev]"
      - run: ruff check .
      - run: mypy app/
      - run: pytest --cov=app --cov-report=term-missing -v

  build-and-deploy:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker compose build
      - run: docker compose up -d
      - run: |
          sleep 10
          curl -f http://localhost:8000/health || exit 1
```

## Production Checklist

- [ ] Multi-stage Docker build with non-root user
- [ ] Gunicorn + Uvicorn workers configured
- [ ] Environment variables injected, not hardcoded
- [ ] Database migrations run automatically on deploy
- [ ] Health check endpoint (`/health`) configured
- [ ] SSL/TLS termination configured
- [ ] Logging to stdout/stderr (Docker-friendly)
- [ ] Resource limits set in docker-compose
- [ ] Backup strategy for PostgreSQL
- [ ] CI pipeline: lint → typecheck → test → build → deploy
- [ ] CORS configured with explicit origins
- [ ] Debug mode disabled
- [ ] API docs disabled in production (`docs_url=None`)
- [ ] Static files served by Nginx, not FastAPI
