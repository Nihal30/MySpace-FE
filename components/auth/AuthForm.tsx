"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth";

type Mode = "login" | "register";

const inputCls =
  "w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-text text-sm outline-none focus:border-moss placeholder:text-text-faint";
const labelCls = "block font-mono text-[11px] text-text-faint mb-1.5";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && !name.trim()) return setError("Tell us your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      if (isLogin) await login(email, password);
      else await register(name.trim(), email, password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[380px]">
        {/* mobile brand (showcase panel is hidden on small screens) */}
        <div className="md:hidden flex items-baseline gap-2.5 mb-8">
          <span className="inline-block w-[9px] h-[9px] rounded-full bg-moss" />
          <span className="text-xl font-semibold">Daybook</span>
        </div>

        <div className="text-[28px] font-semibold leading-tight">
          {isLogin ? "Welcome back" : "Start your Daybook"}
        </div>
        <div className="font-mono text-[12px] text-text-faint mt-1.5 mb-7">
          {isLogin ? "SIGN IN TO CONTINUE YOUR STREAK" : "CREATE AN ACCOUNT — TAKES A MINUTE"}
        </div>

        <div className="flex gap-0.5 border border-border rounded-lg p-[3px] mb-6">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 font-mono text-[11.5px] py-2 rounded-md ${
                mode === m ? "bg-surface-2 text-text" : "text-text-dim"
              }`}
            >
              {m === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          {!isLogin && (
            <div>
              <label htmlFor="name" className={labelCls}>NAME</label>
              <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
            </div>
          )}

          <div>
            <label htmlFor="email" className={labelCls}>EMAIL</label>
            <input id="email" type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="password" className={labelCls}>PASSWORD</label>
              {isLogin && (
                <a className="font-mono text-[10.5px] text-text-faint hover:text-text-dim cursor-pointer mb-1.5">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                className={`${inputCls} pr-14`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10.5px] text-text-faint hover:text-text-dim"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div role="alert" className="font-mono text-[11.5px] text-rust bg-rust-dim rounded-lg px-3.5 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-mono text-[13px] font-semibold text-bg bg-moss rounded-lg py-3 mt-1 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="font-mono text-[11px] text-text-faint mt-6 text-center">
          {isLogin ? "New here? " : "Already have an account? "}
          <button type="button" onClick={() => switchMode(isLogin ? "register" : "login")} className="text-moss hover:underline">
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
