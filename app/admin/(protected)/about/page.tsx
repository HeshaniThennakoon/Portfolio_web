"use client";

import { useEffect, useState } from "react";
import { updateAboutAction, getAboutAction } from "@/app/actions";
import type { AboutInfo } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, UserCheck } from "lucide-react";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">About Me Info</h1>
        <p className="text-sm text-slate-400 mt-1">
          Update your professional story and highlight tags.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <UserCheck className="text-primary" size={20} />
          About Section Biography
        </h3>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="about-story" className="text-xs font-bold text-slate-350">
            Professional Story Bio
          </label>
          <textarea
            id="about-story"
            rows={8}
            value={data.story}
            onChange={(e) => setData({ ...data, story: e.target.value })}
            className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="about-highlights" className="text-xs font-bold text-slate-350">
            Strength Highlights (Comma separated tags)
          </label>
          <input
            id="about-highlights"
            type="text"
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            placeholder="Problem Solver, Clean Code Advocate, Team Collaborator, etc."
            className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Saving Changes...
            </>
          ) : (
            <>
              <Save size={16} />
              Save About Details
            </>
          )}
        </button>
      </form>
    </div>
  );
}
