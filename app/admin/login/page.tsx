"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions";
import { toast } from "sonner";
import { Lock, User, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(username, password);
      if (res.success) {
        toast.success(res.message);
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Login failed. An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background grid-bg px-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <GlassCard hoverEffect={true} className="w-full max-w-md p-8 border border-border/80 relative z-10 bg-card/40 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto text-primary-foreground text-xl font-black mb-4 shadow-lg shadow-primary/20 select-none">
            HT
          </div>
          <h1 className="text-xl font-bold text-foreground uppercase tracking-wider">Admin Portal</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Sign in to manage your workspace
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-username" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={16} />
              </span>
              <input
                id="login-username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={16} />
              </span>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </GlassCard>
    </main>
  );
}
