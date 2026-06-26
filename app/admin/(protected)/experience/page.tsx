"use client";

import { useEffect, useState } from "react";
import { updateExperienceAction, getExperienceAction } from "@/app/actions";
import type { Experience } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<Experience[]>([]);

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

  useEffect(() => {
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
        await loadData();
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
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Work Experience</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Manage your employment history, responsibilities, and associated tech stacks.
          </p>
        </div>
        <button
          onClick={handleAddRole}
          className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Experience
        </button>
      </div>

      <div className="space-y-8 max-w-4xl">
        {roles.map((exp, index) => (
          <GlassCard key={exp.id} hoverEffect={false} animate={true} delay={index * 0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md relative group">
            {/* Action Row */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveRole(index, "up")}
                disabled={index === 0}
                className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer shadow-sm"
                title="Move Up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                onClick={() => moveRole(index, "down")}
                disabled={index === roles.length - 1}
                className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer shadow-sm"
                title="Move Down"
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveRole(exp.id)}
                className="p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm"
                title="Remove Role"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Job Title / Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Employment Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleChange(index, "period", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Responsibilities (One bullet per line)</label>
              <textarea
                rows={6}
                value={exp.responsibilities.join("\n")}
                onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                placeholder="Developed enterprise web web apps..."
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tech Stack tags (Comma separated)</label>
              <input
                type="text"
                value={exp.techStack.join(", ")}
                onChange={(e) => handleTechChange(index, e.target.value)}
                placeholder="Next.js, Prisma, PostgreSQL"
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
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
              Save Experience timeline
            </>
          )}
        </button>
      </div>
    </div>
  );
}
