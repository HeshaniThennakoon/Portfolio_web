"use client";

import { useEffect, useState } from "react";
import { updateEducationAction, getEducationAction } from "@/app/actions";
import type { Education } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus } from "lucide-react";

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Education History</h1>
          <p className="text-sm text-slate-400 mt-1">
            Display your academic background, university degrees, and specialization focus areas.
          </p>
        </div>
        <button
          onClick={handleAddSchool}
          className="cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {schools.map((edu, index) => (
          <div key={edu.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-6 shadow-md relative group">
            <button
              type="button"
              onClick={() => handleRemoveSchool(edu.id)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-slate-950 border border-slate-850 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
              title="Remove Entry"
            >
              <Trash2 size={14} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-450">Degree Title</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-450">Institution Name</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, "institution", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-450">Study Period Dates</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => handleChange(index, "period", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-450">Specialization & Focus Areas (Comma separated)</label>
                <input
                  type="text"
                  value={edu.focusAreas.join(", ")}
                  onChange={(e) => handleFocusAreasChange(index, e.target.value)}
                  placeholder="Software Engineering, Computer Vision"
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleSave}
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
              Save Education History
            </>
          )}
        </button>
      </div>
    </div>
  );
}
