"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/lib/i18n";

interface WaitlistSectionProps {
  dict: Dictionary;
}

const COOLDOWN_S = 60;

export function WaitlistSection({ dict }: WaitlistSectionProps) {
  const t = dict.waitlist;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function startCooldown(seconds: number) {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setCooldown(seconds);
    timerRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || cooldown > 0) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage(t.success);
        startCooldown(COOLDOWN_S);
        return;
      }

      if (res.status === 429) {
        const seconds = typeof json.cooldown === "number" ? json.cooldown : COOLDOWN_S;
        setStatus("error");
        setMessage(t.cooldown.replace("{seconds}", String(seconds)));
        startCooldown(seconds);
        return;
      }

      setStatus("error");
      setMessage(t.error);
    } catch {
      setStatus("error");
      setMessage(t.error);
    }
  };

  return (
    <section id="waitlist" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            {t.headline}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t.subheadline}
          </p>

          {status === "success" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {message}
              </div>
              {cooldown > 0 && (
                <p className="text-xs text-muted-foreground/60 font-mono">
                  {t.cooldown.replace("{seconds}", String(cooldown))}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-muted/30 border-border/60"
                />
                <Button
                  type="submit"
                  disabled={status === "loading" || cooldown > 0}
                  className="font-medium shrink-0"
                >
                  {status === "loading"
                    ? t.loading
                    : cooldown > 0
                    ? t.wait.replace("{seconds}", String(cooldown))
                    : t.cta}
                </Button>
              </form>
              {status === "error" && (
                <p className="text-xs text-red-400">{message}</p>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground/60 font-mono">{t.incentive}</p>
        </div>
      </div>
    </section>
  );
}
