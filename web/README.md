# MILLION Real Estate — Web (Next.js App Router)

## Run

```bash
npm install
npm run dev
```

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.million-realestate.com/v1
NEXT_PUBLIC_MAX_GALLERY_IMAGES=12
BLOB_READ_WRITE_TOKEN=REPLACE_ME
```

## Features
- App Router, TS strict, Tailwind bound to semantic CSS variables from tokens
- React Query data layer with ProblemDetails normalization and x-correlation-id
- Pages: Home listings, Property detail, Create (upload via Vercel Blob)
- A11y: focus-visible, labels/aria, aria-live, reduced motion
- SEO: Metadata API, sitemap, robots, JSON-LD (detail TODO)
- Web Vitals logger in `lib/web-vitals.ts`
- Tests: Vitest + Testing Library + axe; Playwright e2e

## Scripts
- dev, build, start, lint, test, test:e2e, format, analyze

## Troubleshooting
- Ensure `BLOB_READ_WRITE_TOKEN` is set in env for uploads
- API must support ProblemDetails (application/problem+json) for best error UX

# MILLION Real Estate — Web (Next.js App Router)

## Run

```bash
npm install
npm run dev
```

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.million-realestate.com/v1
NEXT_PUBLIC_MAX_GALLERY_IMAGES=12
BLOB_READ_WRITE_TOKEN=REPLACE_ME
```

## Features
- App Router, TS strict, Tailwind bound to semantic CSS variables from tokens
- React Query data layer with ProblemDetails normalization and x-correlation-id
- Pages: Home listings, Property detail, Create (upload via Vercel Blob)
- A11y: focus-visible, labels/aria, aria-live, reduced motion
- SEO: Metadata API, sitemap, robots, JSON-LD (detail TODO)
- Web Vitals logger in `lib/web-vitals.ts`
- Tests: Vitest + Testing Library + axe; Playwright e2e

## Scripts
- dev, build, start, lint, test, test:e2e, format, analyze

## Troubleshooting
- Ensure `BLOB_READ_WRITE_TOKEN` is set in env for uploads
- API must support ProblemDetails (application/problem+json) for best error UX

