"use client";

import { useEffect, useState } from "react";
import { updateEducationAction, getEducationAction } from "@/app/actions";
import type { Education } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminEducationPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [schools, setSchools] = useState<Education[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const edu = await getEducationAction();
        setSchools(edu);
      } catch (err) {
        toast.error("Failed to load education details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (index: number, field: keyof Education, value: any) => {
    const updated = [...schools];
    updated[index] = { ...updated[index], [field]: value };
    setSchools(updated);
  };

  const handleFocusAreasChange = (index: number, val: string) => {
    const updated = [...schools];
    updated[index].focusAreas = val.split(",").map((f) => f.trim()).filter((f) => f.length > 0);
    setSchools(updated);
  };

  const handleAddSchool = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "BSc (Hons) in Computer Engineering",
      institution: "University of Ruhuna",
      period: "2021 – 2026",
      focusAreas: ["Software Engineering"]
    };
    setSchools([...schools, newEdu]);
  };

  const handleRemoveSchool = (id: string) => {
    if (!confirm("Are you sure you want to remove this academic entry?")) return;
    setSchools(schools.filter((edu) => edu.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateEducationAction(schools);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save changes.");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Education History</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Display your academic background, university degrees, and specialization focus areas.
          </p>
        </div>
        <button
          onClick={handleAddSchool}
          className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Education
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {schools.map((edu, index) => (
          <GlassCard key={edu.id} hoverEffect={false} animate={true} delay={index * 0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md relative group animate-in slide-in-from-bottom-2 duration-300">
            <button
              type="button"
              onClick={() => handleRemoveSchool(edu.id)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300 shadow-sm"
              title="Remove Entry"
            >
              <Trash2 size={13} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Degree Title</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Institution Name</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, "institution", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Study Period Dates</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => handleChange(index, "period", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Specialization & Focus Areas (Comma separated)</label>
                <input
                  type="text"
                  value={edu.focusAreas.join(", ")}
                  onChange={(e) => handleFocusAreasChange(index, e.target.value)}
                  placeholder="Software Engineering, Computer Vision"
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
            </div>
          </GlassCard>
        ))}

        <button
          onClick={handleSave}
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
              Save Education History
            </>
          )}
        </button>
      </div>
    </div>
  );
}
