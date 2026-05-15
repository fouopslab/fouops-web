# FouOpsLab Web

English | [简体中文](./README-CN.md)

The public marketing website for FouOpsLab, built with Next.js App Router, React 19, Tailwind CSS 4, and MDX.

It ships a bilingual landing page, product detail pages, a blog powered by local MDX content, and two transactional flows backed by Resend:

- contact form email delivery
- waitlist confirmation email delivery

## What is included

- Locale-aware routing for English and Simplified Chinese: `/en` and `/zh-CN`
- Marketing homepage composed from reusable sections in `components/home`
- Product pages backed by typed content in `lib/products.ts`
- Blog index and post pages backed by MDX files in `content/blog`
- Contact and waitlist API routes with simple in-memory cooldown protection
- SEO metadata, `robots.txt`, and `sitemap.xml` generated from site configuration
- Standalone Next.js output for container or VPS deployment

## Tech stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- MDX
- Resend

## Project structure

```text
app/                 App Router pages, API routes, metadata, locale layouts
components/          UI, layout, contact form, and homepage sections
content/blog/        MDX blog posts
dictionaries/        Locale dictionaries for English and Simplified Chinese
lib/                 Blog loaders, i18n helpers, product data, shared site config
public/              Static assets
types/               Shared TypeScript types
```

## Getting started

### Prerequisites

- Node.js 20+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | yes | Brand name used in metadata and email copy |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL used by metadata, sitemap, and robots |
| `CONTACT_EMAIL` | yes | Inbox shown on the contact page and used for contact form delivery |
| `CONTACT_EMAIL_FROM` | yes | Sender identity for contact form emails |
| `WAITLIST_EMAIL_FROM` | yes | Sender identity for waitlist confirmation emails |
| `WAITLIST_REPLY_TO` | yes | Reply-to address for waitlist emails |
| `RESEND_API_KEY` | yes | API key for the Resend integration |

If `RESEND_API_KEY` is missing, both `/api/contact` and `/api/waitlist` return a configuration error.

### Run the development server

```bash
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Content workflow

### Blog posts

Add new posts under `content/blog/*.mdx` with frontmatter compatible with `types/blog.ts`.

### Product content

Update product detail content in `lib/products.ts`.

### Translations

Update UI copy in:

- `dictionaries/en.json`
- `dictionaries/zh-CN.json`

## Email flows

### Contact form

- client form: `components/contact/ContactForm.tsx`
- API route: `app/api/contact/route.ts`
- behavior: validates input, enforces a 60-second cooldown per email, then forwards the message through Resend

### Waitlist form

- client form: `components/home/WaitlistSection.tsx`
- API route: `app/api/waitlist/route.ts`
- behavior: validates input, enforces a 60-second cooldown per email, then sends a confirmation email through Resend
