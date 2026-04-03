/**
 * Origins allowed for Better Auth CSRF / Origin checks.
 * Include every URL users use to open the app (local, preview, production).
 */
export function buildTrustedOrigins(): string[] {
  const origins = new Set<string>();

  const addUrl = (value: string | undefined) => {
    if (!value?.trim()) return;
    try {
      origins.add(new URL(value.trim()).origin);
    } catch {
      /* ignore invalid */
    }
  };

  addUrl(process.env.BETTER_AUTH_URL);
  addUrl(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
  addUrl(process.env.NEXT_PUBLIC_APP_URL);

  if (process.env.VERCEL_URL) {
    const v = process.env.VERCEL_URL.replace(/^https?:\/\//, "");
    addUrl(`https://${v}`);
  }

  if (process.env.NODE_ENV !== "production") {
    addUrl("http://localhost:3000");
    addUrl("http://127.0.0.1:3000");
    addUrl("http://localhost:3001");
    addUrl("http://127.0.0.1:3001");
  }

  origins.add("https://aluminawellness.com");
  origins.add("https://www.aluminawellness.com");

  const extra = process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const entry of extra ?? []) {
    if (entry.includes("://")) addUrl(entry);
    else addUrl(`https://${entry}`);
  }

  return [...origins];
}
