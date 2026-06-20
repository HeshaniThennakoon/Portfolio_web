"use client";

import { useEffect, useState } from "react";
import { updateAchievementsAction, getAchievementsAction } from "@/app/actions";
import type { Achievements } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trophy } from "lucide-react";

export default function AdminAchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<Achievements | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const ach = await getAchievementsAction();
        setData(ach);
      } catch (err) {
        toast.error("Failed to load achievements.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleListChange = (category: keyof Achievements, value: string) => {
    if (!data) return;
    const list = value.split("\n").map((item) => item.trim()).filter((item) => item.length > 0);
    setData({
      ...data,
      [category]: list,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const res = await updateAchievementsAction(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save achievements.");
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
        <h1 className="text-3xl font-black text-white">Achievements & Activities</h1>
        <p className="text-sm text-slate-400 mt-1">
          Add items to your leadership, athletics/sports, and professional community activity logs.
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Trophy className="text-primary" size={20} />
          Achievements Log Lists
        </h3>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ach-leadership" className="text-xs font-bold text-slate-350">
            Leadership Roles & Coordinator Responsibilities (One item per line)
          </label>
          <textarea
            id="ach-leadership"
            rows={5}
            value={data.leadership.join("\n")}
            onChange={(e) => handleListChange("leadership", e.target.value)}
            placeholder="Captain - University Carrom Team..."
            className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ach-sports" className="text-xs font-bold text-slate-350">
            Sports & Athletic Honors (One item per line)
          </label>
          <textarea
            id="ach-sports"
            rows={5}
            value={data.sports.join("\n")}
            onChange={(e) => handleListChange("sports", e.target.value)}
            placeholder="Quarter Finalist - SLUG XV..."
            className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ach-prof" className="text-xs font-bold text-slate-350">
            Professional Events & Community Activities (One item per line)
          </label>
          <textarea
            id="ach-prof"
            rows={5}
            value={data.professional.join("\n")}
            onChange={(e) => handleListChange("professional", e.target.value)}
            placeholder="Participant - Eminence 4.0..."
            className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
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
              Save Achievements
            </>
          )}
        </button>
      </form>
    </div>
  );
}
