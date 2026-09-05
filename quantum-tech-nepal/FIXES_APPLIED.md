# Fixes Applied — Summary

Every item below was reproduced against your actual code first, then fixed, then verified against a real running Postgres database and a real Next.js production build. Nothing here is a guess.

## 1. Database: SQLite → PostgreSQL

- `backend/config/settings.py` now reads DB credentials from `backend/.env` via `django-environ` and connects with `ENGINE: django.db.backends.postgresql`. There is no SQLite fallback — if `.env` is missing, it still defaults to Postgres connection params, never to `db.sqlite3`.
- `backend/.env.example` — copy to `.env` and adjust for your machine.
- Your existing data was migrated and verified row-for-row (services, jobs, contact messages, users) between the old SQLite file and Postgres.

**Your action:** update `backend/.env` with your own Postgres credentials if they differ from the defaults (`quantum_tech_nepal` / `postgres` / `postgres` / `127.0.0.1:5432`), then run:
```
pip install -r requirements.txt
python manage.py migrate
```

## 2. Team member images not showing

**Root cause:** `apps.team` was fully coded (model, serializer, admin, image preview) but was never added to `INSTALLED_APPS` or `config/urls.py`. Its database table didn't exist at all.

**Fix:** registered `apps.team` and `apps.serviceinquiry` (same problem) in both `settings.py` and `urls.py`, then generated and applied their migrations. Verified end-to-end: uploaded a real test image, confirmed the API returns a working absolute URL, confirmed the image bytes are actually servable, then removed the test record.

`pages/about.js` now renders `<img src={member.photo}>` from the live API, with a colored-initials fallback only for members who haven't uploaded a photo yet.

## 3. New Admin data not appearing on the site

**Root cause:** every page (`services.js`, `portfolio.js`, `blog.js`, `about.js`, `careers.js`, `index.js`) imported hardcoded arrays from `lib/data.js`. The real API fetch functions in `lib/api.js` existed but were never called by any page.

**Fix:** every content page now uses `getStaticProps` with `revalidate: 60`, so a change made in Django Admin appears on the live site within 60 seconds — no rebuild or redeploy needed. Confirmed via a full production build that pulls real data from Postgres through the API.

Also fixed along the way:
- `submitServiceInquiry` was called from two pages but never defined in `lib/api.js` — added, and wired to the (previously unregistered) `apps.serviceinquiry` backend.
- `fetchJobs()` was calling a URL that doesn't exist (`/careers/jobs/` instead of `/careers/`) — fixed.

Content with no backend model yet (`PRICING_PLANS`, homepage `STATS`, About page `TIMELINE`/`VALUES`) intentionally still comes from `lib/data.js` — building those out wasn't part of what was reported broken.

## 4. New feature: Service Inquiry & Job Apply now show details first

- **Services:** the card button now says "View Details →" and links to `/services/[slug]`, a new page showing the full description, feature list, and tech stack pulled live from the API. A "Request a Quote" button there opens the inquiry form — so visitors see what they're inquiring about before being asked to fill in a form.
- **Careers:** "Apply" now links to `/careers/[id]`, a new page with the full job description, requirements, deadline, and an inline application form (name, email, phone, cover letter, resume upload, portfolio link) that posts directly to your existing `apps.careers` `ApplyView` endpoint. Tested with a real submission through the API.

## Known, intentionally out-of-scope items

A few other backend apps in your codebase (`about`, `hero`, `clients`, `faq`, `newsletter`, `partners`, `sitesettings`) are built but similarly unregistered — same pattern as `team`/`serviceinquiry`. They weren't part of what you reported broken, so I left them alone rather than expand scope unasked. Worth registering the same way if/when you want those sections live.

There's also an unused duplicate settings module at `backend/quantum_tech/` (dead code, not referenced by `manage.py`) — harmless as-is, but worth deleting eventually to avoid future confusion.
