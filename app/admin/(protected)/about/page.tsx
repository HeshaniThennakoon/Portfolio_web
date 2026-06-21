"use client";

import { useEffect, useState } from "react";
import { updateAboutAction, getAboutAction } from "@/app/actions";
import type { AboutInfo } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, UserCheck } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AboutInfo | null>(null);

  // Highlights text state
  const [highlightsText, setHighlightsText] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const about = await getAboutAction();
        setData(about);
        if (about) {
          setHighlightsText(about.highlights.join(", "));
        }
      } catch (err) {
        toast.error("Failed to load about me details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const parsedHighlights = highlightsText
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h.length > 0);
      const updatedData = { ...data, highlights: parsedHighlights };
      const res = await updateAboutAction(updatedData);

      if (res.success) {
        toast.success(res.message);
        setData(updatedData);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">About Me Info</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Update your professional story and highlight tags.
        </p>
      </div>

      <GlassCard hoverEffect={false} animate={true} delay={0.1} className="max-w-4xl p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <UserCheck className="text-primary" size={18} />
            About Section Biography
          </h3>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="about-story" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Professional Story Bio
            </label>
            <textarea
              id="about-story"
              rows={8}
              value={data.story}
              onChange={(e) => setData({ ...data, story: e.target.value })}
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="about-highlights" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Strength Highlights (Comma separated tags)
            </label>
            <input
              id="about-highlights"
              type="text"
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Problem Solver, Clean Code Advocate, Team Collaborator, etc."
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={14} />
                Save About Details
              </>
            )}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
