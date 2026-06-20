"use client";

import { useEffect, useState } from "react";
import { updateExperienceAction, getExperienceAction } from "@/app/actions";
import type { Experience } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<Experience[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const exp = await getExperienceAction();
        setRoles(exp);
      } catch (err) {
        toast.error("Failed to load experience.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    const updated = [...roles];
    updated[index] = { ...updated[index], [field]: value };
    setRoles(updated);
  };

  const handleResponsibilitiesChange = (index: number, val: string) => {
    const updated = [...roles];
    updated[index].responsibilities = val.split("\n").map((r) => r.trim()).filter((r) => r.length > 0);
    setRoles(updated);
  };

  const handleTechChange = (index: number, val: string) => {
    const updated = [...roles];
    updated[index].techStack = val.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    setRoles(updated);
  };

  const handleAddRole = () => {
    const newRole: Experience = {
      id: `exp-${Date.now()}`,
      role: "New Role",
      company: "Company Name",
      location: "Sri Lanka",
      period: "Month Year - Present",
      responsibilities: ["Job responsibility detail"],
      techStack: ["Next.js"]
    };
    setRoles([newRole, ...roles]);
  };

  const handleRemoveRole = (id: string) => {
    if (!confirm("Are you sure you want to remove this role from timeline?")) return;
    setRoles(roles.filter((r) => r.id !== id));
  };

  const moveRole = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === roles.length - 1) return;

    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...roles];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setRoles(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateExperienceAction(roles);
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
          <h1 className="text-3xl font-black text-white">Work Experience</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your employment history, responsibilities, and associated tech stacks.
          </p>
        </div>
        <button
          onClick={handleAddRole}
          className="cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      <div className="space-y-8 max-w-4xl">
        {roles.map((exp, index) => (
          <div key={exp.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-6 shadow-md relative group">
            {/* Action Row */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveRole(index, "up")}
                disabled={index === 0}
                className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => moveRole(index, "down")}
                disabled={index === roles.length - 1}
                className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveRole(exp.id)}
                className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                title="Remove Role"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Job Title / Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Employment Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleChange(index, "period", e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Responsibilities (One bullet per line)</label>
              <textarea
                rows={6}
                value={exp.responsibilities.join("\n")}
                onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                placeholder="Developed enterprise web web apps..."
                className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Tech Stack tags (Comma separated)</label>
              <input
                type="text"
                value={exp.techStack.join(", ")}
                onChange={(e) => handleTechChange(index, e.target.value)}
                placeholder="Next.js, Prisma, PostgreSQL"
                className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
              />
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
              Save Experience timeline
            </>
          )}
        </button>
      </div>
    </div>
  );
}
