---
version: alpha
name: AHTS-report-data-model
description: "A slide-based, config-driven report architecture for a company portal site (AHTS — Da Nang International Terminal Services) whose reports do not share a fixed topic or schema. The frontend today bakes all content into static JS modules (src/data/report.js, reports.js, slideRegistry.js, blog.js) with zero fetch/API/auth infrastructure. This document is the full backend data model that replaces those static modules: relational tables for identity/metadata, JSONB payloads for per-slide-type content, one documented shape per existing slide component, so 16 heterogeneous slides and future report topics can be served from a database without schema migrations per report."

principles:
  slide-is-the-unit: "The atomic content unit is a slide, not a report. Reports differ; slides within a type do not."
  schema-per-type-not-per-report: "Structure lives in slide_key (cover, highlights, revenue-mix, ...), never in a report-specific table."
  json-for-variance-sql-for-identity: "Anything that varies by topic goes in JSONB. Anything queried/joined/listed/paginated goes in relational columns."
  frontend-shape-is-the-contract: "Backend payload shape must match what each SlideXx.jsx component already destructures as props today — no server-side reshaping layer, no frontend rewrite."
  one-shape-per-slide-key: "Every slide_key that exists in SLIDE_REGISTRY today gets exactly one documented JSONB shape below. No slide_key may vary shape across reports."

entities:
  report:
    table: reports
    columns:
      id: uuid primary key
      slug: text unique
      name: text
      desc: text
      thumbnail_url: text
      status: "enum(draft, published, archived)"
      period_label: text
      created_at: timestamptz
      updated_at: timestamptz
  report_slide:
    table: report_slides
    columns:
      id: uuid primary key
      report_id: uuid references reports(id)
      slide_key: text
      sort_order: int
      data: jsonb
      is_agenda: bool
    indexes:
      - "gin(data) for in-slide search"
      - "unique(report_id, sort_order)"
      - "btree(report_id, sort_order) for ordered fetch"
  report_stat:
    table: report_stats
    columns:
      id: uuid primary key
      report_id: uuid references reports(id)
      label: text
      value: text
      sort_order: int
    note: "Denormalized out of JSONB because gallery cards query stats across all reports at once — the one place a flat SQL column beats JSONB."
  agenda_item:
    table: report_agenda_items
    columns:
      id: uuid primary key
      report_id: uuid references reports(id)
      title: text
      desc: text
      target_slide_id: "uuid references report_slides(id)"
      sort_order: int
    note: "Backs Slide02Agenda's onJump — target_slide_id replaces the index-based agendaSlideIndices array with a direct FK, which survives slide reordering."
  blog_post:
    table: blog_posts
    columns:
      id: uuid primary key
      slug: text unique
      title: text
      excerpt: text
      body: text
      tag: text
      status: "enum(draft, published)"
      published_at: timestamptz
      created_at: timestamptz
      updated_at: timestamptz
  director_profile:
    table: director_profile
    columns:
      id: uuid primary key
      name: text
      title: text
      subtitle: text
      bio: text
      vision: text
      experience_years: int
      joined_year: text
      since_year: text
      photo_url: text
    note: "Singleton table — one row. Kept relational since fields are fixed and never vary per-report. Backs About.jsx, Home.jsx preview, and Slide02Agenda sidebar."
  company_meta:
    table: company_meta
    columns:
      id: uuid primary key
      company: text
      company_short: text
      department: text
      contact_email: text
    note: "Singleton table. Backs footer/contact blocks across every page (currently the meta object in report.js)."
---

## Overview

AHTS's reports are **topic-heterogeneous by design** — a revenue report, a cost-structure report, and a future ESG or headcount report share no common business columns. Forcing them into one wide SQL table would mean a column explosion or a graveyard of nullable fields. But every report **does** share one structural trait: it renders as an ordered sequence of slides, and the frontend already encodes this split in two static JS files — `slideRegistry.js` (16 slide-type entries, each `{ id, Component, title, isAgenda? }`) and `reports.js` (per-report slide selection via `slideIds` + `agendaSlideIndices`).

Today the entire app is a **zero-backend static SPA**: no `.env`, no `src/api/`, no HTTP client, no auth, no async data of any kind. All business numbers live as hardcoded object/array literals in `src/data/report.js` (16 distinct data shapes, one per slide, ~14 top-level exports), and every page/slide component imports directly from these modules. This document is the full relational + JSONB model that replaces that static layer, one-to-one, so the frontend components need zero prop-shape changes when wired to a real API.

**Key Characteristics:**
- No `ALTER TABLE` when adding a new report — only `INSERT INTO reports` + N `INSERT INTO report_slides`.
- No `ALTER TABLE` when adding a new *slide instance* to an existing report — only `INSERT INTO report_slides`.
- A new SQL migration is needed only when a genuinely new **slide type** appears — the same moment the frontend needs a new `SlideXx.jsx` component anyway. Adding a slide type means: 1 new documented JSONB shape here + 1 new `SLIDE_REGISTRY` entry + 1 new component. No table added.
- `report_stats` and `report_agenda_items` are the two deliberate denormalizations — both back cross-report or cross-slide queries that would otherwise mean unpacking JSONB N times per request.
- `SlideHighlights.jsx` currently has **no data import** — all five numbers (53.3%, 43.7%, 158.7 tỷ, 97%, 62.0 tỷ) are hardcoded directly in JSX, unlike all 15 other slides which read from `report.js`. This is a known gap (see **Known Gaps**) that must be closed before the `highlights` slide_key can be data-driven — today its JSONB shape below is *aspirational*, not yet backed by a real export in `report.js`.

## Data Model

### Core Tables

**`reports`** — one row per report deck. Mirrors `REPORTS` entries in `reports.js` today (`id`, `name`, `desc`, `thumbnail`, `stats`), plus `status` and `period_label` (currently the free-floating `meta.period` string, e.g. "5 tháng đầu năm 2026") to make date-range filtering possible later.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| slug | text | URL param, e.g. `2026-q1-5m` — replaces `REPORTS[i].id` |
| name | text | Gallery card title |
| desc | text | Gallery card description |
| thumbnail_url | text | Card image, replaces bundler `import thumbnail from "..."` |
| status | enum | draft / published / archived — lets a report be staged before publishing |
| period_label | text | e.g. "5 tháng đầu năm 2026" — currently `meta.period` |
| created_at / updated_at | timestamptz | |

**`report_slides`** — one row per slide instance inside a report. Mirrors a single entry produced today by `report.slideIds.map(id => SLIDE_REGISTRY.find(s => s.id === id))`.

| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| report_id | uuid | FK → reports |
| slide_key | text | Must match a known key in the slide-type manifest — the 16 keys currently in `slideRegistry.js` (`cover`, `agenda`, `overview`, `highlights`, `yoy`, `revenue-mix`, `revenue-deepdive`, `trend`, `trend-deepdive`, `cost-structure`, `cost-detail`, `bottlenecks-1`, `bottlenecks-2`, `roadmap`, `dashboard`, `thankyou`) |
| sort_order | int | Renders ascending — replaces array position in `slideIds` |
| data | jsonb | Slide-type-specific payload — full shape catalogue below |
| is_agenda | bool | True only for `slide_key = 'agenda'` today — replaces the `isAgenda` registry flag; frontend still special-cases exactly one slide needing an `onJump` callback |

**`report_stats`** — flat rows for gallery-card stat badges (today `REPORTS[i].stats: [{label, value}]`). The gallery page (`Reports.jsx`, `Home.jsx`) queries stats across *every* report at once; a flat table avoids unpacking N different JSONB shapes per row on every gallery render.

**`report_agenda_items`** — flat rows backing `Slide02Agenda`'s clickable agenda list and its `onJump` navigation. Today this is `report.agenda: [{title, desc}]` (content) cross-referenced against `REPORTS[i].agendaSlideIndices: number[]` (an array of raw *array indices* into `slideIds` — fragile, breaks silently if slides are reordered). The relational fix: `target_slide_id` is a direct foreign key to the `report_slides` row it should jump to, so reordering slides never desyncs the agenda.

**`blog_posts`** — mirrors `src/data/blog.js`'s `posts` array (`slug, title, excerpt, date, tag`), adding `body` (today's placeholder post has no full-article field — `BlogPost.jsx` only ever rendered `excerpt`) and `status` so drafts can exist before publish.

**`director_profile`** — singleton table mirroring the `director` object in `report.js` (`name, title, subtitle, since, joined, experienceYears, bio, vision`). Backs `About.jsx`, the "Về tôi" preview card on `Home.jsx`, and the sidebar photo caption on `Slide02Agenda.jsx`.

**`company_meta`** — singleton table mirroring the `meta` object in `report.js` (`company, companyShort, period, department`). Backs footer/contact blocks on every page and the `Slide01Cover.jsx` / `Slide15ThankYou.jsx` slides.

### JSONB Payload Shapes — one per slide_key

Every shape below is derived directly from the actual fields each slide component currently destructures out of `report.js`, so wiring a future API means literally no frontend prop changes.

```json
// slide_key: "cover"  (Slide01Cover.jsx — reads meta)
{ "company": "Công ty CP Dịch vụ Nhà ga Quốc tế Đà Nẵng", "companyShort": "AHTS", "period": "5 tháng đầu năm 2026" }
```

```json
// slide_key: "agenda"  (Slide02Agenda.jsx — reads agenda array; onJump wired via report_agenda_items, not this blob)
{ "items": [{ "title": "Tổng quan kết quả kinh doanh", "desc": "..." }] }
```

```json
// slide_key: "overview"  (Slide03Overview.jsx — reads overview object)
{
  "revenue": { "value": "158.7 tỷ", "planPct": "40.5%", "plan2026": "392 tỷ" },
  "cost": { "value": "78.4 tỷ", "planPct": "...", "plan2026": "..." },
  "profitBeforeTax": { "value": "...", "planPct": "...", "plan2026": "..." },
  "profitAfterTax": { "value": "62.0 tỷ", "margin": "39.1%", "plan2026": "..." },
  "revenue2025": "...",
  "growthPlan2026Pct": "16.6%"
}
```

```json
// slide_key: "highlights"  (SlideHighlights.jsx — currently ALL hardcoded, no report.js source; see Known Gaps)
{
  "segments": [
    { "name": "Mặt bằng kinh doanh", "pct": 53.3, "image": "hall.webp", "caption": "53.3% tổng doanh thu 5 tháng — mảng chủ lực số một" },
    { "name": "Dịch vụ phòng CIP", "pct": 43.7, "image": "lounge.webp", "caption": "43.7% tổng doanh thu" }
  ],
  "stats": [
    { "icon": "TrendingUp", "value": "158.7 tỷ", "desc": "Tổng doanh thu 5 tháng, đạt 40.5% kế hoạch năm 2026" },
    { "icon": "BarChart3", "value": "97%", "desc": "Doanh thu tập trung ở 2 mảng CIP và mặt bằng kinh doanh" },
    { "icon": "Building2", "value": "62.0 tỷ", "desc": "Lợi nhuận sau thuế, biên lợi nhuận 39.1%" }
  ]
}
```

```json
// slide_key: "yoy"  (Slide04YoY.jsx — reads yoyComparison array)
{ "rows": [{ "label": "Doanh thu", "y2025": "...", "plan2026": "...", "th2026": "..." }] }
```

```json
// slide_key: "revenue-mix"  (Slide05RevenueMix.jsx — reads revenueBySegment array)
{ "segments": [{ "name": "Mặt bằng kinh doanh", "value": 84.6, "pct": 53.3, "color": "#..." }] }
```

```json
// slide_key: "revenue-deepdive"  (Slide06RevenueDeepDive.jsx — reads revenueDetail.cip / revenueDetail.mb)
{
  "cip": { "name": "CIP", "value": "...", "pct": 43.7, "planPct": "...", "plan2026": "...", "y2025": "...", "note": "...", "monthly": [10, 12, 11, 9, 13] },
  "mb": { "name": "Mặt bằng kinh doanh", "value": "...", "pct": 53.3, "planPct": "...", "plan2026": "...", "y2025": "...", "note": "...", "monthly": [16, 17, 15, 14, 18] }
}
```

```json
// slide_key: "trend"  (Slide07Trend.jsx — reads monthlyTrend array)
{ "months": [{ "month": "T1", "revenue": 30.2, "cost": 15.1, "profit": 12.0 }] }
```

```json
// slide_key: "trend-deepdive"  (Slide08TrendDeepDive.jsx — reads monthlyTrend + costDetail merged client-side, plus 3 static stat cards)
{
  "months": [{ "month": "T1", "revenue": 30.2, "cost": 15.1, "profit": 12.0, "rent": 8.0, "salary": 5.0, "food": 1.5 }],
  "callouts": [{ "label": "Chi phí lương T4", "value": "...", "desc": "..." }]
}
```

```json
// slide_key: "cost-structure"  (Slide09CostStructure.jsx — reads costStructure array)
{ "items": [{ "name": "Thuê mặt bằng", "value": 47.0, "pct": 60.0 }] }
```

```json
// slide_key: "cost-detail"  (Slide10CostDetail.jsx — reads costDetail array)
{ "months": [{ "month": "T1", "rent": 8.0, "salary": 5.0, "food": 1.5 }] }
```

```json
// slide_key: "bottlenecks-1"  (Slide11BottlenecksA.jsx — reads bottlenecks.slice(0,3))
{ "items": [{ "title": "...", "detail": "...", "evidence": ["...", "..."] }] }
```

```json
// slide_key: "bottlenecks-2"  (Slide12RiskMatrix.jsx — reads bottlenecks.slice(3) + riskMatrix)
{
  "items": [{ "title": "...", "detail": "...", "evidence": ["..."] }],
  "riskMatrix": [{ "name": "...", "impact": 8, "likelihood": 6 }]
}
```

```json
// slide_key: "roadmap"  (Slide13Roadmap.jsx — reads roadmap array)
{ "quarters": [{ "quarter": "Q3 2026", "title": "...", "detail": "...", "steps": ["..."], "outcome": "...", "sources": ["..."], "color": "#..." }] }
```

```json
// slide_key: "dashboard"  (Slide14Dashboard.jsx — reads kpiDashboard + kpiDetailTable + kpiAlerts + monthlyTrend)
{
  "gauges": [{ "label": "Doanh thu", "value": 158.7, "target": 392, "unit": "tỷ" }],
  "detailTable": [{ "label": "Doanh thu", "th5T": "158.7 tỷ", "unit": "tỷ", "khPct": "40.5%", "target": "392", "status": "on-track", "excelCell": "B12" }],
  "alerts": [{ "label": "...", "detail": "...", "action": "...", "phase": "...", "status": "watch" }]
}
```

```json
// slide_key: "thankyou"  (Slide15ThankYou.jsx — reads meta.department, meta.company)
{ "company": "...", "department": "Phòng Tài chính - Kế toán" }
```

## Query Patterns

### Fetch a full report for `/presentation?report=<slug>`
```sql
SELECT s.id, s.slide_key, s.sort_order, s.data, s.is_agenda
FROM report_slides s
JOIN reports r ON r.id = s.report_id
WHERE r.slug = $1 AND r.status = 'published'
ORDER BY s.sort_order;
```
Frontend maps this array directly onto `SLIDE_REGISTRY` by `slide_key`, same as today's `slideIds.map(...)`.

### Fetch agenda for `Slide02Agenda`'s onJump
```sql
SELECT a.title, a.desc, a.target_slide_id
FROM report_agenda_items a
JOIN reports r ON r.id = a.report_id
WHERE r.slug = $1
ORDER BY a.sort_order;
```
`onJump(targetSlideId)` scrolls to the slide whose `id` matches — no index arithmetic, unlike today's `agendaSlideIndices`.

### Fetch gallery cards for `/reports` and `/` (Home)
```sql
SELECT r.slug, r.name, r.desc, r.thumbnail_url,
       json_agg(json_build_object('label', st.label, 'value', st.value) ORDER BY st.sort_order) AS stats
FROM reports r
LEFT JOIN report_stats st ON st.report_id = r.id
WHERE r.status = 'published'
GROUP BY r.id;
```

### Fetch blog list / single post
```sql
SELECT slug, title, excerpt, tag, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC;
SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published';
```

### Fetch director profile + company meta (singletons)
```sql
SELECT * FROM director_profile LIMIT 1;
SELECT * FROM company_meta LIMIT 1;
```

## Do's and Don'ts

### Do
- Add a new report as one `INSERT INTO reports` + N `INSERT INTO report_slides` + N `INSERT INTO report_agenda_items`.
- Add a new stat badge as one `INSERT INTO report_stats`.
- Keep every `data` JSONB shape versioned by `slide_key`, documented in this file, matching the corresponding `SlideXx.jsx` component's destructured props exactly.
- Use `report_stats` and `report_agenda_items` (flat tables) specifically for cross-report/cross-slide queries — the two sanctioned denormalizations.
- Validate `data` JSONB shape at the API layer (e.g. zod/joi schema keyed by `slide_key`) before insert, so a malformed slide can't reach the frontend.
- Backfill `highlights`' JSONB shape as a real field group in a future `report.js`-equivalent seed before wiring `SlideHighlights.jsx` to props — right now that slide has nothing to migrate from.

### Don't
- Don't create a new SQL table per report topic (`revenue_reports`, `esg_reports`, ...) — that reintroduces the schema-explosion problem this model exists to avoid.
- Don't put per-report business columns (revenue, cost, headcount) directly on `reports` — they belong inside the relevant slide's `data` JSONB.
- Don't let two different reports reuse the same `slide_key` with two different JSONB shapes — a slide type's shape is fixed across all reports that use it.
- Don't skip `report_stats`/`report_agenda_items` and try to aggregate across reports by unpacking JSONB at request time — works but doesn't scale past a handful of reports.
- Don't add a `slide_key` to `report_slides` that has no matching entry in the frontend `SLIDE_REGISTRY` — the two must stay in lockstep.
- Don't reuse raw array-index agenda mapping (`agendaSlideIndices`) once `report_agenda_items.target_slide_id` exists — index-based mapping silently breaks on reorder.

## Migration Path (static JS → backend)

1. **Phase 1 — read-only API, zero frontend changes.** Stand up `GET /api/reports`, `GET /api/reports/:slug`, `GET /api/blog`, `GET /api/blog/:slug`, `GET /api/director`, `GET /api/meta`, shaped exactly like today's static exports. Swap five imports for `fetch()` calls (`reports.js`, `blog.js`, the `director`/`meta` exports of `report.js`) — no `SlideXx.jsx` or page component changes since payload shapes match 1:1.
2. **Phase 2 — admin write path.** Authenticated CRUD (custom admin UI or a headless CMS like Strapi/Directus) for inserting reports/slides/blog posts — publishing no longer needs a code deploy.
3. **Phase 3 — retire static configs.** `slideRegistry.js` stays permanently as the frontend's *component* catalogue (components can't live in a database), but `reports.js` and `report.js`'s data exports are deleted entirely, replaced by API responses cached client-side.
4. **Prerequisite before Phase 1 for `highlights`:** decide where the 5 hardcoded numbers in `SlideHighlights.jsx` should live — either fold them into a new `highlights` field group inside `report.js` first (so there's something to seed the table from), or accept `highlights` ships as the one slide type whose JSONB shape has no legacy data to migrate.

## Known Gaps

- **`SlideHighlights.jsx` has no data source today.** All 15 other slides import from `report.js`; this one has every number (53.3%, 43.7%, 158.7 tỷ, 97%, 62.0 tỷ) hardcoded in JSX. Its JSONB shape above is the *target* shape, not a migration of existing data — flagged so it isn't silently skipped when building the seed script.
- **No versioning/history on `report_slides.data`** — no audit trail for edits. Add a `report_slide_revisions` table if editorial history matters later.
- **No multi-language support modeled** — `data` JSONB currently assumes Vietnamese-only strings; i18n would need either parallel keys (`title_vi`, `title_en`) or a separate translations table.
- **Access control out of scope** — assumed single-admin (the user) for now; no roles/permissions table modeled.
- **No auth/session infrastructure exists in the codebase today** (confirmed: no `.env`, no `src/api/`, no http client, no auth context) — Phase 2's admin write path is a fully greenfield addition, not a retrofit.
- **`report_agenda_items.target_slide_id`** requires slides to be inserted before agenda items (or a nullable FK resolved in a second pass) — insert order matters in the seed script.
