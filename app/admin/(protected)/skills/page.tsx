"use client";

import { useEffect, useState } from "react";
import { updateSkillsAction, getSkillsAction, uploadFileAction } from "@/app/actions";
import type { SkillCategory } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, Upload, Code2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

interface SkillCategoryCardProps {
  cat: SkillCategory;
  index: number;
  onRemove: (index: number) => void;
  onChange: (index: number, updatedCat: SkillCategory) => void;
}

function SkillCategoryCard({ cat, index, onRemove, onChange }: SkillCategoryCardProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleNameChange = (name: string) => {
    onChange(index, { ...cat, category: name });
  };

  const handleSkillNameChange = (sIdx: number, value: string) => {
    const updatedSkills = [...cat.skills];
    updatedSkills[sIdx] = { ...updatedSkills[sIdx], name: value };
    onChange(index, { ...cat, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    const updatedSkills = [...cat.skills, { name: "", logoUrl: "" }];
    onChange(index, { ...cat, skills: updatedSkills });
  };

  const handleRemoveSkill = (sIdx: number) => {
    const updatedSkills = cat.skills.filter((_, i) => i !== sIdx);
    onChange(index, { ...cat, skills: updatedSkills });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, sIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(sIdx);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "skill-logo");

    try {
      const res = await uploadFileAction(formData);
      if (res.success && res.url) {
        const updatedSkills = [...cat.skills];
        updatedSkills[sIdx] = { ...updatedSkills[sIdx], logoUrl: res.url };
        onChange(index, { ...cat, skills: updatedSkills });
        toast.success("Logo uploaded successfully!");
      } else {
        toast.error(res.message || "Failed to upload logo.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <GlassCard hoverEffect={false} animate={true} delay={index * 0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md relative group">
      <button
        onClick={() => onRemove(index)}
        className="absolute top-6 right-6 p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300 shadow-sm z-10"
        title="Remove Category"
      >
        <Trash2 size={13} />
      </button>

      <div className="flex flex-col gap-1.5 max-w-sm">
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

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Skills in this category
        </label>
        
        <div className="grid gap-3">
          {cat.skills.map((skill, sIdx) => (
            <div key={sIdx} className="flex items-center gap-3 bg-background/40 p-2.5 rounded-2xl border border-border/60">
              {/* Logo Upload / Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center border border-border group/logo flex-shrink-0">
                {skill.logoUrl ? (
                  <img src={skill.logoUrl} alt={skill.name} className="w-full h-full object-contain p-1.5" />
                ) : (
                  <Code2 size={18} className="text-muted-foreground" />
                )}
                
                {uploadingIndex === sIdx ? (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={14} />
                  </div>
                ) : (
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                    <Upload size={14} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(e, sIdx)}
                    />
                  </label>
                )}
              </div>

              {/* Skill Name */}
              <input
                type="text"
                value={skill.name}
                placeholder="Skill name (e.g. React)"
                onChange={(e) => handleSkillNameChange(sIdx, e.target.value)}
                className="flex-1 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-2.5 text-sm text-foreground transition-all"
              />

              {/* Remove skill */}
              <button
                type="button"
                onClick={() => handleRemoveSkill(sIdx)}
                className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer flex-shrink-0"
                title="Remove Skill"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddSkill}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary-foreground hover:bg-primary rounded-xl transition-all border border-primary/30"
        >
          <Plus size={13} />
          Add Skill
        </button>
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
