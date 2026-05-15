const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_CONTACT_EMAIL = "hello@example.com";

function getEnv(name: string) {
  return process.env[name]?.trim();
}

function normalizeUrl(url?: string) {
  if (!url) {
    return DEFAULT_SITE_URL;
  }

  return url.replace(/\/+$/, "");
}

function getDomainFromUrl(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

const siteUrl = normalizeUrl(getEnv("NEXT_PUBLIC_SITE_URL"));
const siteDomain = getDomainFromUrl(siteUrl);
const siteName = getEnv("NEXT_PUBLIC_SITE_NAME") || "FouOpsLab";
const contactEmail = getEnv("CONTACT_EMAIL") || DEFAULT_CONTACT_EMAIL;

export const siteConfig = {
  name: siteName,
  url: siteUrl,
  domain: siteDomain,
  contactEmail,
  contactEmailHref: `mailto:${contactEmail}`,
  contactEmailFrom:
    getEnv("CONTACT_EMAIL_FROM") || `Website Contact <noreply@${siteDomain || "example.com"}>`,
  waitlistEmailFrom:
    getEnv("WAITLIST_EMAIL_FROM") || `Website <noreply@${siteDomain || "example.com"}>`,
  waitlistReplyTo: getEnv("WAITLIST_REPLY_TO") || contactEmail,
};