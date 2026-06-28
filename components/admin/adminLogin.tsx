"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleLogin = async () => {
    if (!password) {
      setError("Enter admin secret");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 border-b border-zinc-300 dark:border-zinc-900">
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl rounded-[10px] border border-border bg-card p-6 text-card-foreground shadow-sm backdrop-blur"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Club CMS
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-card-foreground">
            Admin access
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Enter the admin secret to manage posts.
          </p>

          <div className="mt-8 space-y-3">
            <label className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Admin Secret
            </label>

            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/20"
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key={error}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="mt-4 text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.01 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="mt-6 h-12 w-full rounded-2xl bg-white hover:bg-[#FF0000] dark:hover:bg-[#FF0000] duration-200 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Continue"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}