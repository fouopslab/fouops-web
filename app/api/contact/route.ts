import { NextRequest, NextResponse } from "next/server";
import { emailContent } from "@/lib/email-content";
import {
  escapeHtml,
  getCooldownSeconds,
  getResendClient,
  interpolateTemplate,
  markCooldown,
  renderEmailLayout,
} from "@/lib/email";
import { siteConfig } from "@/lib/site";

// In-memory cooldown store: email → timestamp of last send
const cooldownMap = new Map<string, number>();

export async function POST(request: NextRequest) {
  const resend = getResendClient();

  if (!resend) {
    return NextResponse.json(
      {
        error: "Email service is not configured. Set RESEND_API_KEY and restart the server.",
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const name: unknown = body?.name;
  const email: unknown = body?.email;
  const message: unknown = body?.message;

  if (
    !name || typeof name !== "string" || name.trim().length < 1 ||
    !email || typeof email !== "string" || !email.includes("@") ||
    !message || typeof message !== "string" || message.trim().length < 1
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const normalized = email.toLowerCase().trim();
  const templateValues = {
    name: trimmedName,
    email: normalized,
    siteName: siteConfig.name,
    siteDomain: siteConfig.domain,
  };

  // 60-second cooldown check
  const secondsLeft = getCooldownSeconds(cooldownMap, normalized);
  if (secondsLeft) {
    return NextResponse.json(
      { error: `Please wait ${secondsLeft}s before sending again.`, cooldown: secondsLeft },
      { status: 429 }
    );
  }

  // Forward message to inbox
  const { data, error } = await resend.emails.send({
    from: siteConfig.contactEmailFrom,
    to: [siteConfig.contactEmail],
    replyTo: normalized,
    subject: interpolateTemplate(emailContent.contact.subjectTemplate, templateValues),
    html: renderEmailLayout({
      eyebrow: interpolateTemplate(emailContent.contact.eyebrow, templateValues),
      metaRows: [
        { label: "Name", value: trimmedName },
        { label: "Email", value: normalized },
      ],
      bodyHtml: `<div style="background:#111827;border:1px solid #1f2937;border-radius:6px;padding:16px;font-size:13px;line-height:1.7;color:#d1d5db;white-space:pre-wrap">${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</div>`,
      footerNote: interpolateTemplate(emailContent.contact.footerNote, templateValues),
    }),
    tags: [{ name: "category", value: "contact" }],
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  markCooldown(cooldownMap, normalized);

  return NextResponse.json({ id: data?.id, message: "Message sent." }, { status: 200 });
}
