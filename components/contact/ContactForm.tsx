"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2 } from "lucide-react";

const COOLDOWN_S = 60;

interface ContactFormProps {
  labels: Record<string, string>;
}

export function ContactForm({ labels }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setResultMessage(labels.success);
        startCooldown(COOLDOWN_S);
        return;
      }

      if (res.status === 429) {
        const seconds = typeof json.cooldown === "number" ? json.cooldown : COOLDOWN_S;
        setStatus("error");
        setResultMessage(labels.cooldown.replace("{seconds}", String(seconds)));
        startCooldown(seconds);
        return;
      }

      setStatus("error");
      setResultMessage(labels.error);
    } catch {
      setStatus("error");
      setResultMessage(labels.error);
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-2 py-4">
        <div className="flex items-center gap-3 text-green-400 font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          {resultMessage}
        </div>
        {cooldown > 0 && (
          <p className="text-xs text-muted-foreground/60 font-mono pl-8">
            {labels.cooldown.replace("{seconds}", String(cooldown))}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          {labels.name}
        </Label>
        <Input
          id="name"
          name="name"
          placeholder={labels.namePlaceholder}
          value={form.name}
          onChange={handleChange}
          required
          className="bg-muted/30 border-border/60"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm text-muted-foreground">
          {labels.email}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          required
          className="bg-muted/30 border-border/60"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm text-muted-foreground">
          {labels.message}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={labels.messagePlaceholder}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">{resultMessage}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading" || cooldown > 0}
        className="font-medium"
      >
        {status === "loading"
          ? labels.sending
          : cooldown > 0
          ? labels.wait.replace("{seconds}", String(cooldown))
          : labels.send}
        {status !== "loading" && cooldown === 0 && <Send className="ml-2 w-4 h-4" />}
      </Button>
    </form>
  );
}
