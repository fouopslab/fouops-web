import { siteConfig } from "@/lib/site";

function getEnv(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

function getMultilineEnv(name: string, fallback: string) {
  const value = process.env[name];

  if (!value) {
    return fallback;
  }

  return value.replace(/\\n/g, "\n").trim();
}

export const emailContent = {
  contact: {
    subjectTemplate: getEnv("CONTACT_EMAIL_SUBJECT_TEMPLATE", "Contact: {name}"),
    eyebrow: getEnv("CONTACT_EMAIL_EYEBROW", "New contact form submission"),
    footerNote: getEnv(
      "CONTACT_EMAIL_FOOTER_NOTE",
      "Reply directly to this email to respond to {name}."
    ),
  },
  waitlist: {
    subjectTemplate: getEnv(
      "WAITLIST_EMAIL_SUBJECT_TEMPLATE",
      "You're on the early access list — {siteName}"
    ),
    eyebrow: getEnv("WAITLIST_EMAIL_EYEBROW", siteConfig.name),
    headline: getEnv("WAITLIST_EMAIL_HEADLINE", "You're on the list."),
    body: getMultilineEnv(
      "WAITLIST_EMAIL_BODY",
      "You'll be among the first to get access when we launch.\\n\\nWe'll email you with updates and early access details."
    ),
    signature: getEnv("WAITLIST_EMAIL_SIGNATURE", `— ${siteConfig.name} team`),
    disclaimer: getMultilineEnv(
      "WAITLIST_EMAIL_DISCLAIMER",
      "You're receiving this because you signed up at {siteDomain}.\\nIf this wasn't you, you can safely ignore this email."
    ),
  },
};