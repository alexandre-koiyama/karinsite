---
name: python-fastapi-development
description: "Python FastAPI backend development with async patterns, SQLAlchemy, Pydantic, authentication, and production API patterns. Use when: building REST APIs with FastAPI, creating async Python backends, implementing database integration with SQLAlchemy, setting up API authentication, developing microservices, or when user mentions FastAPI, SQLAlchemy, Pydantic, Alembic, or JWT authentication."
---

# Python/FastAPI Development Workflow

## Overview

Specialized workflow for building production-ready Python backends with FastAPI, featuring async patterns, SQLAlchemy 2.0 ORM, Pydantic v2 validation, and comprehensive API patterns.

## When to Use

Use this skill when:

- Building new REST APIs with FastAPI
- Creating async Python backends
- Implementing database integration with SQLAlchemy
- Setting up API authentication (JWT/OAuth2)
- Developing microservices
- Configuring Alembic migrations
- Writing Pydantic schemas for validation
- Implementing CRUD operations

## Workflow Phases

### Phase 1: Project Setup

1. Set up Python environment (uv or pip)
2. Create project structure following project conventions
3. Configure FastAPI app with lifespan events
4. Set up structured logging
5. Configure environment variables with Pydantic Settings

**Project Structure:**

```
app/
├── main.py              # FastAPI app entry point
├── core/                # Config, security, dependencies
│   ├── config.py        # Settings with Pydantic BaseSettings
│   ├── security.py      # JWT, password hashing
│   └── deps.py          # Dependency injection functions
├── models/              # SQLAlchemy models
├── schemas/             # Pydantic schemas (request/response)
├── api/                 # API route modules
│   └── v1/              # Versioned API routes
├── services/            # Business logic layer
├── crud/                # Database CRUD operations
└── utils/               # Utilities
```

### Phase 2: Database Setup

1. Design database schema (entities, relationships, indexes)
2. Set up SQLAlchemy models with proper types and constraints
3. Create async database engine and session factory
4. Configure Alembic migrations
5. Implement session management with dependency injection

**Async Engine Pattern:**

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=5,
    max_overflow=10,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

**SQLAlchemy Model Pattern:**

```python
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

**Alembic Setup:**

```bash
alembic init alembic
# Edit alembic/env.py for async support
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

### Phase 3: API Routes

1. Design RESTful API endpoints
2. Create APIRouter modules organized by domain
3. Implement CRUD operations via service layer
4. Add request validation with Pydantic schemas
5. Configure response models with proper serialization

**Router Pattern:**

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.get("/", response_model=list[UserOut])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = UserService(db)
    return await service.list(skip=skip, limit=limit)

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(
    data: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    service = UserService(db)
    return await service.create(data)
```

**Pydantic Schema Pattern:**

```python
from pydantic import BaseModel, EmailStr, ConfigDict

class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
```

### Phase 4: Authentication

1. Choose auth strategy (JWT, OAuth2)
2. Implement user registration with password hashing (bcrypt/argon2)
3. Set up login endpoint returning JWT tokens
4. Create auth middleware as FastAPI dependencies
5. Implement role-based access control if needed

**JWT Pattern:**

```python
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await UserService(db).get_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user
```

### Phase 5: Error Handling

1. Create custom exception classes per domain
2. Set up FastAPI exception handlers for consistent responses
3. Implement error response schemas
4. Add request ID tracking and structured logging
5. Configure error monitoring integration

**Error Response Pattern:**

```python
from fastapi import Request
from fastapi.responses import JSONResponse

class AppException(Exception):
    def __init__(self, status_code: int, detail: str, error_code: str | None = None):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code

@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "error_code": exc.error_code,
        },
    )
```

### Phase 6: Testing

1. Set up pytest with async support
2. Create shared fixtures (db session, test client, auth headers)
3. Write unit tests for services and CRUD
4. Write integration tests for API endpoints
5. Configure test database with proper isolation

**Test Pattern:**

```python
import pytest
from httpx import AsyncClient, ASGITransport

@pytest.fixture
async def client(app):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

async def test_create_user_returns_201(client: AsyncClient):
    response = await client.post("/api/v1/users/", json={
        "email": "test@example.com",
        "password": "securepassword123",
    })
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"
```

### Phase 7: Documentation

1. Configure OpenAPI schema with proper metadata
2. Add endpoint documentation with examples
3. Document authentication flows
4. Set up API versioning (/api/v1/)
5. Ensure all schemas have descriptions and examples

**OpenAPI Configuration:**

```python
app = FastAPI(
    title="Karinsite API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)
```

### Phase 8: Deployment

1. Create production Dockerfile (multi-stage build)
2. Set up docker-compose with PostgreSQL
3. Configure production settings (CORS, rate limiting)
4. Configure Uvicorn with Gunicorn workers
5. Set up health check endpoint

**Gunicorn Config:**

```python
# gunicorn.conf.py
import multiprocessing

workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
bind = "0.0.0.0:8000"
timeout = 120
keepalive = 5
```

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | FastAPI |
| Language | Python 3.11+ |
| ORM | SQLAlchemy 2.0 (async) |
| Validation | Pydantic v2 |
| Database | PostgreSQL |
| Migrations | Alembic |
| Auth | JWT, OAuth2 |
| Testing | pytest |

## Quality Gates

- [ ] All tests passing (>80% coverage)
- [ ] Type checking passes (`mypy`)
- [ ] Linting clean (`ruff check .`)
- [ ] API documentation complete (OpenAPI)
- [ ] Security scan passed
- [ ] All async operations use `async/await`
- [ ] All functions have type hints
- [ ] No business logic in route handlers

## Rules

- Always use async database sessions and queries
- Always use Pydantic schemas for request/response validation
- Always use FastAPI `Depends()` for dependency injection
- Always use parameterized queries (never raw SQL with string formatting)
- Always hash passwords with bcrypt or argon2
- Always include type hints on all function signatures
- Always use f-strings for Python string formatting
- Never put business logic in route handler functions
- Never commit .env files or secrets
- Never disable CORS in production (`allow_origins=["*"]`)
