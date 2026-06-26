"use client";

import { useEffect, useState } from "react";
import { updateSkillsAction, getSkillsAction } from "@/app/actions";
import type { SkillCategory } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

interface SkillCategoryCardProps {
  cat: SkillCategory;
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, updatedCat: SkillCategory) => void;
}

function SkillCategoryCard({ cat, index, onRemove, onChange }: SkillCategoryCardProps) {
  // Local state for the comma-separated list to prevent formatting loss on keystroke
  const [skillsText, setSkillsText] = useState(cat.skills.join(", "));

  // Keep local state synced with parent updates (e.g. reload or deletions)
  useEffect(() => {
    setSkillsText(cat.skills.join(", "));
  }, [cat.skills]);

  const handleNameChange = (name: string) => {
    onChange(index, { ...cat, category: name });
  };

  const handleSkillsBlur = () => {
    const list = skillsText.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    onChange(index, { ...cat, skills: list });
  };

  return (
    <GlassCard hoverEffect={false} animate={true} delay={index * 0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-4 shadow-md relative group">
      <button
        onClick={() => onRemove(index)}
        className="absolute top-6 right-6 p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300 shadow-sm"
        title="Remove Category"
      >
        <Trash2 size={13} />
      </button>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1.5 sm:w-1/3">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Category Name
          </label>
          <input
            type="text"
            value={cat.category}
            onChange={(e) => handleNameChange(e.target.value)}
            className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground font-bold transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:w-2/3">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Skills (Comma separated list)
          </label>
          <input
            type="text"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            onBlur={handleSkillsBlur}
            placeholder="React, Angular, Next.js"
            className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
          />
        </div>
      </div>
    </GlassCard>
  );
}

export default function AdminSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const skills = await getSkillsAction();
        setCategories(skills);
      } catch (err) {
        toast.error("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCategoryChange = (index: number, updatedCat: SkillCategory) => {
    const newCategories = [...categories];
    newCategories[index] = updatedCat;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { category: "New Skill Category", skills: [] }]);
  };

  const handleRemoveCategory = (index: number) => {
    if (!confirm("Are you sure you want to delete this category and all its skills?")) return;
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateSkillsAction(categories);
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
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Skills Matrix</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Group your programming capabilities and frameworks into interactive categories.
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Category
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {categories.map((cat, index) => (
          <SkillCategoryCard
            key={index}
            cat={cat}
            index={index}
            onRemove={handleRemoveCategory}
            onChange={handleCategoryChange}
          />
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
              Save Skills Matrix
            </>
          )}
        </button>
      </div>
    </div>
  );
}
