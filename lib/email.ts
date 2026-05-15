import { Resend } from "resend";

export const EMAIL_COOLDOWN_MS = 60_000;

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function pruneExpiredEntries(store: Map<string, number>, cooldownMs: number) {
  const now = Date.now();

  for (const [key, timestamp] of store) {
    if (now - timestamp >= cooldownMs) {
      store.delete(key);
    }
  }
}

export function getCooldownSeconds(
  store: Map<string, number>,
  key: string,
  cooldownMs = EMAIL_COOLDOWN_MS
) {
  pruneExpiredEntries(store, cooldownMs);

  const lastSent = store.get(key);
  if (!lastSent) {
    return null;
  }

  const remainingMs = cooldownMs - (Date.now() - lastSent);
  if (remainingMs <= 0) {
    store.delete(key);
    return null;
  }

  return Math.ceil(remainingMs / 1000);
}

export function markCooldown(store: Map<string, number>, key: string) {
  store.set(key, Date.now());
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function interpolateTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function renderTextParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) =>
      `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#9ca3af;">${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`
    )
    .join("");
}

function renderMetaRows(rows: Array<{ label: string; value: string }>) {
  if (!rows.length) {
    return "";
  }

  const tableRows = rows
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:6px 0;color:#6b7280;width:80px">${escapeHtml(label)}</td><td style="color:#f9fafb">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<table style="width:100%;font-size:13px;border-collapse:collapse;margin-bottom:20px">${tableRows}</table>`;
}

export function renderEmailLayout({
  eyebrow,
  headline,
  metaRows = [],
  bodyHtml,
  footerNote,
}: {
  eyebrow?: string;
  headline?: string;
  metaRows?: Array<{ label: string; value: string }>;
  bodyHtml: string;
  footerNote?: string;
}) {
  const eyebrowHtml = eyebrow
    ? `<p style="margin:0 0 16px;font-size:14px;color:#9ca3af;">${escapeHtml(eyebrow)}</p>`
    : "";
  const headlineHtml = headline
    ? `<h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#f9fafb;">${escapeHtml(headline)}</h1>`
    : "";
  const footerHtml = footerNote
    ? `<hr style="border:none;border-top:1px solid #1f2937;margin:24px 0" /><p style="margin:0;font-size:11px;color:#374151;">${escapeHtml(footerNote).replace(/\n/g, "<br />")}</p>`
    : "";

  return `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;color:#e5e7eb;background:#0a0a0a;padding:32px;border-radius:8px">
      ${eyebrowHtml}
      ${headlineHtml}
      ${renderMetaRows(metaRows)}
      ${bodyHtml}
      ${footerHtml}
    </div>
  `;
}