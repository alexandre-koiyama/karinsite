---
name: web-security-testing
description: "Web application security testing workflow for OWASP Top 10 vulnerabilities including injection, XSS, authentication flaws, and access control issues. Use when: testing web application security, performing OWASP Top 10 assessment, conducting penetration tests, validating security controls, auditing FastAPI applications, or when user mentions security testing, OWASP, penetration testing, XSS, SQL injection, or access control."
---

# Web Security Testing Workflow

## Overview

Specialized workflow for testing web applications against OWASP Top 10 vulnerabilities including injection attacks, XSS, broken authentication, and access control issues. Tailored for FastAPI + Python + JavaScript + HTML applications.

## When to Use

Use this skill when:

- Testing web application security
- Performing OWASP Top 10 assessment
- Conducting penetration tests
- Validating security controls
- Auditing FastAPI applications for vulnerabilities
- Reviewing authentication and authorization implementations

## Workflow Phases

### Phase 1: Reconnaissance

1. Map application surface (endpoints, forms, user roles)
2. Identify technologies in use (FastAPI, SQLAlchemy, Jinja2, etc.)
3. Discover all API endpoints from OpenAPI spec and route files
4. Document authentication mechanisms and session management
5. Identify input vectors (forms, API parameters, headers, cookies)

**FastAPI-Specific Recon:**

- Check `/api/docs` and `/api/openapi.json` for endpoint enumeration
- Review `app/api/` route files for all registered endpoints
- Check `app/core/security.py` for auth implementation
- Review CORS configuration in `app/main.py`
- Identify all Pydantic schemas that accept user input

### Phase 2: Injection Testing

1. Test SQL injection in all database queries
2. Test NoSQL injection if applicable
3. Test command injection in subprocess calls
4. Test LDAP injection if applicable
5. Test template injection in Jinja2 templates
6. Document vulnerabilities

**SQL Injection Checks:**

- Look for raw SQL: `text()`, `execute()` with string formatting
- Test with payloads: `' OR 1=1 --`, `"; DROP TABLE --`, `' UNION SELECT --`
- Verify parameterized queries via SQLAlchemy ORM are used
- Check that Pydantic schemas validate input types before database queries

**Template Injection Checks:**

- Look for Jinja2 `|safe` filter on user-controlled content
- Test with payloads: `{{7*7}}`, `${7*7}`, `<%= 7*7 %>`
- Verify autoescaping is enabled (default in Jinja2)

**Command Injection Checks:**

- Search for `os.system()`, `subprocess.run()`, `subprocess.call()`
- Test with payloads: `; ls -la`, `| cat /etc/passwd`, `$(whoami)`
- Verify all subprocess calls use argument lists, not shell strings

### Phase 3: XSS Testing

1. Test reflected XSS in URL parameters and form inputs
2. Test stored XSS in persisted content (comments, names, descriptions)
3. Test DOM-based XSS in JavaScript (`innerHTML`, `document.write()`, `eval()`)
4. Test XSS in Jinja2 templates (unescaped `{{ }}` vs escaped)
5. Document findings

**XSS Payloads for Testing:**

- `<script>alert('XSS')</script>`
- `<img src=x onerror=alert(1)>`
- `"><script>alert('XSS')</script>`
- `<svg/onload=alert(1)>`
- `javascript:alert('XSS')`

**Jinja2-Specific Checks:**

- `{{ user_input }}` — autoescaped (safe by default)
- `{{ user_input|safe }}` — NOT escaped (dangerous with user input)
- `{% autoescape false %}` — disabled escaping (dangerous)
- `Markup()` — marks string as safe HTML (dangerous with user input)

### Phase 4: Authentication Testing

1. Test credential stuffing protection (rate limiting on login)
2. Test brute force protection (account lockout, delays)
3. Test session management (token randomness, expiration, invalidation)
4. Test password policies (minimum length, complexity)
5. Test JWT security (algorithm confusion, secret strength, expiration)
6. Test MFA implementation if applicable
7. Test OAuth2 configuration (redirect URI validation, state parameter)

**JWT-Specific Checks:**

- Algorithm: Must be explicitly set (not `none`)
- Secret key: Must be strong, not hardcoded, loaded from env
- Expiration: Must be set (check `exp` claim)
- Token refresh: Must have separate refresh token with longer expiry
- Key ID: Check for algorithm confusion attacks

**FastAPI Auth Checks:**

- `Depends(get_current_user)` applied to all protected endpoints
- No endpoints accidentally left without auth
- Password hashing uses bcrypt/argon2 (not MD5, SHA, or plaintext)
- OAuth2 scheme properly configured
- Token blacklisting/revocation for logout

### Phase 5: Access Control Testing

1. Test vertical privilege escalation (regular user accessing admin endpoints)
2. Test horizontal privilege escalation (user A accessing user B's resources)
3. Test IDOR vulnerabilities (predictable resource IDs: `/api/users/1`, `/api/users/2`)
4. Test directory traversal (`../`, `..%2f`, `..%5c`)
5. Test unauthorized access to endpoints without auth headers
6. Verify resource ownership checks in service layer

**IDOR Testing Pattern:**

- Authenticate as User A
- Access `/api/v1/users/1` — should return User A's data only
- Change to `/api/v1/users/2` — should return 403 Forbidden (not User B's data)
- Repeat for all resource endpoints with IDs

### Phase 6: Security Headers & Configuration

1. Check Content-Security-Policy (CSP) header presence and strictness
2. Verify Strict-Transport-Security (HSTS) configuration
3. Test X-Frame-Options (clickjacking protection)
4. Check X-Content-Type-Options (`nosniff`)
5. Verify Referrer-Policy
6. Check CORS configuration (not `*` in production)
7. Verify `DEBUG=False` in production settings
8. Check if stack traces leak in error responses
9. Verify `docs_url=None` in production FastAPI config

**Required Security Headers:**

```python
# In FastAPI middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "0"  # Deprecated, use CSP
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response
```

### Phase 7: Reporting

Document each finding with:

1. Vulnerability name and OWASP classification
2. Severity (Critical / High / Medium / Low)
3. Affected endpoint or component
4. Proof of concept (reproduction steps)
5. Remediation recommendation

## OWASP Top 10 Checklist (2021)

- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable and Outdated Components
- [ ] A07: Identification and Authentication Failures
- [ ] A08: Software and Data Integrity Failures
- [ ] A09: Security Logging and Monitoring Failures
- [ ] A10: Server-Side Request Forgery (SSRF)

## FastAPI-Specific Security Checklist

- [ ] CORS middleware configured with explicit origins (not `*`)
- [ ] Input validation via Pydantic schemas (no raw dict access)
- [ ] SQL queries use parameterized statements (SQLAlchemy ORM)
- [ ] Passwords hashed with bcrypt/argon2 (never plaintext)
- [ ] JWT tokens have expiration and proper algorithm
- [ ] Rate limiting configured on auth endpoints
- [ ] File upload endpoints validate type, size, and content
- [ ] Static file serving does not expose directory listings
- [ ] Debug routes and docs disabled in production
- [ ] Trusted host middleware configured
- [ ] No secrets hardcoded in source code
- [ ] Environment variables used for all sensitive config
- [ ] Error responses don't leak stack traces or internal details
- [ ] Request size limits configured
- [ ] HTTPS enforcement via HSTS

## Quality Gates

- [ ] All OWASP Top 10 tested
- [ ] Vulnerabilities documented with severity
- [ ] Proof of concepts captured
- [ ] Remediation provided for each finding
- [ ] Report generated

## Rules

- Never exploit vulnerabilities beyond proof-of-concept
- Never access or expose real user data during testing
- Always report findings before attempting any fixes
- Use test accounts and test data only
- Document every test case and its result
- If uncertain about a finding, flag it as "Potential" rather than confirmed
