# Quantum Tech Nepal — Full Stack Deployment Guide

## Project Structure

```
quantum-tech-nepal/
├── frontend/                  # Next.js 14 app
│   ├── Dockerfile
│   └── (your Next.js source)
├── backend/                   # Django 5 REST API
│   ├── apps/
│   │   ├── users/             # Auth, JWT, Google OAuth
│   │   ├── services/          # Service listings
│   │   ├── portfolio/         # Projects & categories
│   │   ├── blog/              # Posts, tags, comments
│   │   ├── careers/           # Jobs & applications
│   │   ├── contact/           # Contact form + email
│   │   └── testimonials/      # Client testimonials
│   ├── config/                # Django settings, URLs, Celery
│   ├── utils/                 # Middleware, helpers, pagination
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
├── nginx/
│   ├── nginx.conf             # Main Nginx config
│   └── sites/
│       └── quantumtech.conf   # Site-specific config + SSL
├── scripts/
│   ├── deploy.sh              # One-command deploy
│   └── setup_server.sh        # Fresh server setup
├── docker-compose.yml         # Full stack orchestration
├── .env.example               # All env vars documented
└── DEPLOYMENT.md              # This file
```

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | Next.js 14, Tailwind CSS, Framer Motion |
| Backend      | Django 5, Django REST Framework     |
| Auth         | JWT (SimpleJWT) + Google OAuth2     |
| Database     | PostgreSQL 16                       |
| Cache/Queue  | Redis 7 + Celery                    |
| Reverse Proxy| Nginx 1.25 + SSL/TLS               |
| Containers   | Docker + Docker Compose             |
| Monitoring   | Sentry (errors) + Nginx logs        |

---

## API Endpoints

### Authentication
```
POST  /api/v1/auth/register/          Register new user
POST  /api/v1/auth/login/             Login (returns JWT)
POST  /api/v1/auth/logout/            Blacklist refresh token
POST  /api/v1/auth/token/refresh/     Refresh access token
GET   /api/v1/auth/me/                Current user profile
PATCH /api/v1/auth/me/                Update profile
GET   /social-auth/login/google-oauth2/ Google login
```

### Services
```
GET   /api/v1/services/               List all services
GET   /api/v1/services/{slug}/        Service detail
```

### Portfolio
```
GET   /api/v1/portfolio/projects/             All projects
GET   /api/v1/portfolio/projects/{slug}/      Project detail
GET   /api/v1/portfolio/projects/?category__slug=ecommerce
GET   /api/v1/portfolio/categories/           All categories
```

### Blog
```
GET   /api/v1/blog/posts/             All published posts
GET   /api/v1/blog/posts/{slug}/      Post detail (increments views)
GET   /api/v1/blog/posts/?search=ai   Search posts
GET   /api/v1/blog/tags/              All tags
```

### Careers
```
GET   /api/v1/careers/                Active job listings
GET   /api/v1/careers/{id}/           Job detail
POST  /api/v1/careers/apply/          Submit application (multipart, resume upload)
```

### Contact
```
POST  /api/v1/contact/                Send contact message (triggers email)
```

### Testimonials
```
GET   /api/v1/testimonials/           All testimonials
```

### API Docs
```
GET   /api/docs/                      Swagger UI
GET   /api/schema/                    OpenAPI schema
```

---

## Local Development Setup

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 20+ (for frontend local dev)
- Python 3.12+ (for backend local dev)

### Step 1 — Clone and configure
```bash
git clone https://github.com/your-org/quantum-tech-nepal.git
cd quantum-tech-nepal
cp .env.example .env
# Edit .env with your values
```

### Step 2 — Start with Docker Compose
```bash
docker compose up -d
```
This starts: PostgreSQL → Redis → Django → Celery → Next.js → Nginx

### Step 3 — Create superuser
```bash
docker compose exec backend python manage.py createsuperuser
```

### Step 4 — Access
- Frontend:     http://localhost
- API:          http://localhost/api/v1/
- API Docs:     http://localhost/api/docs/
- Django Admin: http://localhost/admin/

---

## Production Deployment (VPS / Ubuntu 22.04)

### Step 1 — Provision your server
Recommended: DigitalOcean, AWS EC2, Linode, or any Ubuntu 22.04 VPS.
Minimum specs: 2 vCPU, 4 GB RAM, 50 GB SSD.

### Step 2 — Point your domain
Add DNS A records:
```
quantumtechnepal.com     →  YOUR_SERVER_IP
www.quantumtechnepal.com →  YOUR_SERVER_IP
```

### Step 3 — Server setup (first time only)
```bash
ssh root@YOUR_SERVER_IP
curl -fsSL https://raw.githubusercontent.com/your-org/quantum-tech-nepal/main/scripts/setup_server.sh | bash
```

This installs Docker, configures UFW firewall (ports 22/80/443 only), and sets up log rotation + daily DB backups.

### Step 4 — Deploy
```bash
cd /opt/quantumtech
git clone https://github.com/your-org/quantum-tech-nepal.git .
cp .env.example .env
nano .env   # Fill in all production values
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

The deploy script:
1. Pulls latest code
2. Builds Docker images
3. Takes database backup
4. Runs Django migrations
5. Collects static files
6. Starts all services
7. Obtains SSL certificate via Let's Encrypt (first deploy)
8. Runs health check

### Step 5 — Create admin user
```bash
docker compose exec backend python manage.py createsuperuser
```

---

## Security Checklist

### Before Going Live
- [ ] Change `SECRET_KEY` to a long random string
- [ ] Set `DEBUG=False`
- [ ] Set strong `POSTGRES_PASSWORD` (20+ chars, mixed case + symbols)
- [ ] Set strong `REDIS_PASSWORD`
- [ ] Set real `EMAIL_HOST_PASSWORD` (Gmail App Password)
- [ ] Configure `ALLOWED_HOSTS` with your domain only
- [ ] Configure `CORS_ALLOWED_ORIGINS` with your domain only
- [ ] Set `SENTRY_DSN` for error monitoring
- [ ] Add your office IP to Nginx admin route restriction
- [ ] Enable 2FA on your VPS provider account
- [ ] Set up GitHub repository with branch protection

### Security Features Already Implemented
- JWT access tokens (60 min) + refresh tokens (7 days) with rotation & blacklisting
- Google OAuth2 login
- Rate limiting: 100 req/hour (anonymous), 1000/hour (authenticated)
- Login endpoint: 5 req/minute per IP (via Nginx + Django)
- Contact form: 5 submissions/hour per IP
- CSRF protection (Django built-in)
- XSS protection headers
- SQL injection prevention (Django ORM parameterized queries)
- File upload validation: type, size (5MB max), MIME type check
- Resume uploads: extension whitelist + libmagic MIME verification
- Security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy
- HTTPS enforced in production (HTTP → HTTPS redirect)
- TLS 1.2/1.3 only, strong cipher suite
- Admin route (can be restricted to office IP)
- IP logging on all logins
- Request logging middleware
- Secure session cookies
- Environment variable protection (no secrets in code)

---

## Maintenance

### View logs
```bash
docker compose logs -f backend          # Django logs
docker compose logs -f nginx            # Nginx access/error logs
docker compose logs -f celery           # Background task logs
```

### Update and redeploy
```bash
./scripts/deploy.sh
```

### Manual database backup
```bash
docker compose exec db pg_dump -U postgres quantumtech > backup.sql
```

### Restore database
```bash
cat backup.sql | docker compose exec -T db psql -U postgres quantumtech
```

### Django shell
```bash
docker compose exec backend python manage.py shell
```

### Scale backend workers (high traffic)
```bash
docker compose up -d --scale backend=3
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | ✅ | Django secret key (50+ random chars) |
| `DEBUG` | ✅ | `False` in production |
| `ALLOWED_HOSTS` | ✅ | Comma-separated domains |
| `POSTGRES_PASSWORD` | ✅ | PostgreSQL password |
| `REDIS_PASSWORD` | ✅ | Redis password |
| `EMAIL_HOST_USER` | ✅ | SMTP email address |
| `EMAIL_HOST_PASSWORD` | ✅ | SMTP password / app password |
| `GOOGLE_CLIENT_ID` | ⚡ | Google OAuth (for Google login) |
| `GOOGLE_CLIENT_SECRET` | ⚡ | Google OAuth secret |
| `SENTRY_DSN` | ⚡ | Error monitoring |
| `AWS_ACCESS_KEY_ID` | 🔵 | S3 media storage (optional) |

✅ Required  ⚡ Required for that feature  🔵 Optional

---

## Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create a new project "Quantum Tech Nepal"
3. Enable "Google+ API" and "Google Identity"
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI:
   `https://quantumtechnepal.com/social-auth/complete/google-oauth2/`
6. Copy Client ID and Secret to `.env`

---

## Next.js Frontend Integration

In your Next.js app, set these environment variables:
```env
NEXT_PUBLIC_API_URL=https://quantumtechnepal.com/api/v1
```

Example API call:
```javascript
// Fetch services
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/`)
const services = await res.json()

// Login
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
const { access, refresh, user } = await res.json()

// Authenticated request
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/`, {
  headers: { 'Authorization': `Bearer ${accessToken}` }
})
```

---

## Support

For deployment help, contact: hello@quantumtechnepal.com
