"use client";

import { useEffect, useState } from "react";
import { updateAchievementsAction, getAchievementsAction } from "@/app/actions";
import type { Achievements } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trophy } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminAchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [leadershipText, setLeadershipText] = useState("");
  const [sportsText, setSportsText] = useState("");
  const [professionalText, setProfessionalText] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const ach = await getAchievementsAction();
        if (ach) {
          setLeadershipText(ach.leadership ? ach.leadership.join("\n") : "");
          setSportsText(ach.sports ? ach.sports.join("\n") : "");
          setProfessionalText(ach.professional ? ach.professional.join("\n") : "");
        }
      } catch (err) {
        toast.error("Failed to load achievements.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseList = (text: string) =>
      text
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

    const updatedData: Achievements = {
      leadership: parseList(leadershipText),
      sports: parseList(sportsText),
      professional: parseList(professionalText),
    };

    setSaving(true);
    try {
      const res = await updateAchievementsAction(updatedData);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Achievements & Activities</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Add items to your leadership, athletics/sports, and professional community activity logs.
        </p>
      </div>

      <GlassCard hoverEffect={false} animate={true} delay={0.1} className="max-w-4xl p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Trophy className="text-primary" size={18} />
            Achievements Log Lists
          </h3>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="ach-leadership" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Leadership Roles & Coordinator Responsibilities (One item per line)
            </label>
            <textarea
              id="ach-leadership"
              rows={5}
              value={leadershipText}
              onChange={(e) => setLeadershipText(e.target.value)}
              placeholder="Captain - University Carrom Team..."
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="ach-sports" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Sports & Athletic Honors (One item per line)
            </label>
            <textarea
              id="ach-sports"
              rows={5}
              value={sportsText}
              onChange={(e) => setSportsText(e.target.value)}
              placeholder="Quarter Finalist - SLUG XV..."
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="ach-prof" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Professional Events & Community Activities (One item per line)
            </label>
            <textarea
              id="ach-prof"
              rows={5}
              value={professionalText}
              onChange={(e) => setProfessionalText(e.target.value)}
              placeholder="Participant - Eminence 4.0..."
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={14} />
                Save Achievements
              </>
            )}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
