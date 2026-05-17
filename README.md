# FouOpsLab Web

The public website and docs for **FouOpsLab**, an open-source infrastructure project for founders and solo developers.

🌐 Live site: https://fouopslab.com  
📦 Infrastructure repo: _coming soon_

---

## What is FouOpsLab?

FouOpsLab is a production-ready Docker Compose stack for running real workloads on a single VPS — without Kubernetes complexity.

It focuses on the boring but critical parts:
- Traefik + Let’s Encrypt (SSL)
- Container health checks & restart policies
- Monitoring (Prometheus / Grafana)
- Automated backups (DB + volumes)
- Deployment & downtime alerts (Telegram)

The goal is simple:
> Spend less time configuring infrastructure, more time shipping products.

---

## Open Core Philosophy

The **core stack will always be free and open-source (MIT)**.

Early on, I explored whether this could support a paid business model.  
That experiment is visible in the repository history — and I’m keeping it public on purpose.

Today, the direction is clear:

- ✅ Core: Free, open, self-hostable forever
- 🔒 Optional extras: Hardened configs, advanced dashboards, or convenience tooling  
  (never paywalled for survival)

This project is built in public. Feedback shapes it more than roadmaps do.

---

## About this repo

This repository contains **only the marketing site and documentation**.

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages |
| `components/` | UI and layout |
| `content/blog/` | MDX blog posts |
| `lib/` | Product data, i18n, blog loaders |
| `dictionaries/` | EN / ZH translations |

Tech stack:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- MDX
- Resend (email forms)

---

## Status

- ✅ Website: live
- 🚧 Infrastructure repo: in progress
- 🧠 Feedback stage: active

If you run side projects or production services on a single VPS, I’d love to hear:
- What configs do you rewrite every time?
- What would make a “base stack” actually useful to you?

---

## Contributing

This repo is currently focused on content and wording improvements.  
Infrastructure contributions will open once the main stack is published.

Feedback, issues, and discussions are very welcome.

---


## License

MIT