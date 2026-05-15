import { NextRequest, NextResponse } from "next/server";
import { emailContent } from "@/lib/email-content";
import {
  escapeHtml,
  getCooldownSeconds,
  getResendClient,
  interpolateTemplate,
  markCooldown,
  renderEmailLayout,
  renderTextParagraphs,
} from "@/lib/email";
import { siteConfig } from "@/lib/site";

// In-memory cooldown store: email → timestamp of last send
// (resets on server restart; acceptable for this use case)
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
  const email: unknown = body?.email;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();
  const templateValues = {
    email: normalized,
    siteName: siteConfig.name,
    siteDomain: siteConfig.domain,
  };

  // 60-second cooldown check
  const secondsLeft = getCooldownSeconds(cooldownMap, normalized);
  if (secondsLeft) {
    return NextResponse.json(
      { error: `Please wait ${secondsLeft}s before submitting again.`, cooldown: secondsLeft },
      { status: 429 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: siteConfig.waitlistEmailFrom,
    to: [normalized],
    replyTo: siteConfig.waitlistReplyTo,
    subject: interpolateTemplate(emailContent.waitlist.subjectTemplate, templateValues),
    html: renderEmailLayout({
      eyebrow: interpolateTemplate(emailContent.waitlist.eyebrow, templateValues),
      headline: interpolateTemplate(emailContent.waitlist.headline, templateValues),
      bodyHtml: [
        renderTextParagraphs(interpolateTemplate(emailContent.waitlist.body, templateValues)),
        `<p style="margin:0 0 8px;font-size:12px;color:#4b5563;">${escapeHtml(interpolateTemplate(emailContent.waitlist.signature, templateValues))}</p>`,
      ].join(""),
      footerNote: interpolateTemplate(emailContent.waitlist.disclaimer, templateValues),
    }),
    tags: [{ name: "category", value: "waitlist" }],
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  markCooldown(cooldownMap, normalized);

  return NextResponse.json({ id: data?.id, message: "You're on the list." }, { status: 200 });
}
