"use client";

import { useEffect, useState } from "react";
import { updateSkillsAction, getSkillsAction } from "@/app/actions";
import type { SkillCategory } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, Code2 } from "lucide-react";

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

  const handleSkillChange = (index: number, skillsStr: string) => {
    const newCategories = [...categories];
    newCategories[index].skills = skillsStr.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    setCategories(newCategories);
  };

  const handleCategoryNameChange = (index: number, name: string) => {
    const newCategories = [...categories];
    newCategories[index].category = name;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { category: "New Domain Domain", skills: [] }]);
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Skills Matrix</h1>
          <p className="text-sm text-slate-400 mt-1">
            Group your programming capabilities and frameworks into interactive categories.
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {categories.map((cat, index) => (
          <div key={index} className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-4 shadow-md relative group">
            <button
              onClick={() => handleRemoveCategory(index)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-slate-950 border border-slate-850 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
              title="Remove Category"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1.5 sm:w-1/3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Category Name
                </label>
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => handleCategoryNameChange(index, e.target.value)}
                  className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:w-2/3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Skills (Comma separated list)
                </label>
                <input
                  type="text"
                  value={cat.skills.join(", ")}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="React, Angular, Next.js"
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
              Save Skills Matrix
            </>
          )}
        </button>
      </div>
    </div>
  );
}
