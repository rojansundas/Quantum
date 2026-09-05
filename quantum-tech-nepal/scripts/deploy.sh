#!/usr/bin/env bash
# ── Quantum Tech Nepal — Production Deploy Script ─────────────────────────
set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; BOLD='\033[1m'; NC='\033[0m'
log()  { echo -e "${GREEN}[✔]${NC} $*"; }
warn() { echo -e "${YELLOW}[!]${NC} $*"; }
die()  { echo -e "${RED}[✘] $*${NC}"; exit 1; }

echo -e "${BOLD}🚀  Quantum Tech Nepal — Deployment${NC}"
echo "────────────────────────────────────────"

[ -f .env ] || die ".env not found. Copy .env.example and fill values."
command -v docker >/dev/null 2>&1 || die "Docker not installed."

log "Pulling latest code..."
git pull origin main

log "Building images..."
docker compose build --no-cache

log "Creating DB backup..."
mkdir -p backups
docker compose exec -T db pg_dump -U "${POSTGRES_USER:-postgres}" "${POSTGRES_DB:-quantumtech}" \
  > "backups/db_$(date +%Y%m%d_%H%M%S).sql" 2>/dev/null || warn "Backup skipped (first deploy?)"

log "Starting db + redis..."
docker compose up -d db redis
sleep 6

log "Running migrations..."
docker compose run --rm backend python manage.py migrate --noinput

log "Collecting static..."
docker compose run --rm backend python manage.py collectstatic --noinput

log "Starting all services..."
docker compose up -d

sleep 8
HTTP=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/v1/services/ || echo "000")
[ "$HTTP" = "200" ] && log "Health check passed (HTTP $HTTP)" || warn "Health check: HTTP $HTTP"

echo ""
echo -e "${BOLD}${GREEN}✅  Deploy complete!${NC}"
echo "  Site:   https://quantumtechnepal.com"
echo "  API:    https://quantumtechnepal.com/api/v1/"
echo "  Docs:   https://quantumtechnepal.com/api/docs/"
echo "  Admin:  https://quantumtechnepal.com/admin/"
