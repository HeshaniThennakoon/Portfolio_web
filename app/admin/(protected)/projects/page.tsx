"use client";

import { useEffect, useState } from "react";
import { updateProjectsAction, uploadFileAction, getProjectsAction } from "@/app/actions";
import type { Project } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, ArrowUp, ArrowDown, Upload, Image as ImageIcon, CheckSquare, Square, ExternalLink } from "lucide-react";

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // File upload state per project ID
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProjectsAction();
        setProjects(data);
      } catch (err) {
        toast.error("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (id: string, field: keyof Project, value: any) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleTechChange = (id: string, value: string) => {
    const list = value.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    handleChange(id, "technologies", list);
  };

  const handleFeaturesChange = (id: string, value: string) => {
    const list = value.split("\n").map((f) => f.trim()).filter((f) => f.length > 0);
    handleChange(id, "features", list);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "New Project Title",
      description: "Enter a brief project description here.",
      technologies: ["React", "TypeScript"],
      features: ["Core feature description"],
      githubUrl: "https://github.com/HeshaniThennakoon",
      demoUrl: "",
      imageUrl: "/uploads/placeholder.jpg",
      featured: false,
    };
    setProjects([newProj, ...projects]);
    setEditingId(newProj.id);
  };

  const handleRemoveProject = (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    setProjects(projects.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(projectId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "screenshot");
      formData.append("projectId", projectId);

      const res = await uploadFileAction(formData);
      if (res.success) {
        toast.success("Project screenshot uploaded!");
        handleChange(projectId, "imageUrl", res.url || "/uploads/placeholder.jpg");
      } else {
        toast.error(res.message || "Upload failed.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadingId(null);
    }
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;

    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setProjects(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProjectsAction(projects);
      if (res.success) {
        toast.success(res.message);
        setEditingId(null);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save projects.");
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
          <h1 className="text-3xl font-black text-white">Project Showcase</h1>
          <p className="text-sm text-slate-400 mt-1">
            Display your software achievements with custom descriptions, screenshot assets, and link anchors.
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="space-y-6 max-w-5xl">
        {projects.map((proj, index) => {
          const isEditing = editingId === proj.id;
          return (
            <div
              key={proj.id}
              className={`p-6 rounded-2xl border bg-slate-900 space-y-6 shadow-md transition-all relative group ${
                isEditing ? "border-primary" : "border-slate-800"
              }`}
            >
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveProject(index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(index, "down")}
                  disabled={index === projects.length - 1}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(proj.id)}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                  title="Remove Project"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Collapsed Display vs Expand Editing Form */}
              {!isEditing ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditingId(proj.id)}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-32 h-20 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                      {proj.imageUrl && proj.imageUrl.startsWith("/uploads/") && !proj.imageUrl.includes("placeholder") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-slate-700" size={24} />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-lg">{proj.title}</h3>
                        {proj.featured && (
                          <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t) => (
                          <span key={t} className="text-[10px] font-bold text-slate-500 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                    {/* Visual Asset Upload */}
                    <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl border border-slate-850 bg-slate-950 shrink-0">
                      <span className="text-xs font-bold text-slate-450 mb-3 block w-full text-left">Screenshot Thumbnail</span>
                      
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {proj.imageUrl && proj.imageUrl.startsWith("/uploads/") && !proj.imageUrl.includes("placeholder") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={proj.imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-850" size={32} />
                        )}
                      </div>

                      <label className="w-full mt-4 cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                        {uploadingId === proj.id ? (
                          <>
                            <Loader2 className="animate-spin" size={12} />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={12} />
                            Upload Asset
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, proj.id)}
                          disabled={uploadingId === proj.id}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Copy details */}
                    <div className="sm:col-span-2 space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-450">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleChange(proj.id, "title", e.target.value)}
                          className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-450">Short Description</label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => handleChange(proj.id, "description", e.target.value)}
                          className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450">GitHub URL</label>
                      <input
                        type="url"
                        value={proj.githubUrl}
                        onChange={(e) => handleChange(proj.id, "githubUrl", e.target.value)}
                        className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-450">Live Demo URL (Leave blank if local)</label>
                      <input
                        type="url"
                        value={proj.demoUrl}
                        onChange={(e) => handleChange(proj.id, "demoUrl", e.target.value)}
                        className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-450">Key Features (One feature per line)</label>
                    <textarea
                      rows={4}
                      value={proj.features.join("\n")}
                      onChange={(e) => handleFeaturesChange(proj.id, e.target.value)}
                      placeholder="Face Recognition Login..."
                      className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-450">Technologies used (Comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(", ")}
                      onChange={(e) => handleTechChange(proj.id, e.target.value)}
                      placeholder="React, Express, MongoDB"
                      className="bg-slate-950 border border-slate-850 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>

                  <div className="flex items-center gap-6 border-t border-slate-850 pt-4">
                    <button
                      type="button"
                      onClick={() => handleChange(proj.id, "featured", !proj.featured)}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white cursor-pointer select-none"
                    >
                      {proj.featured ? (
                        <CheckSquare className="text-primary" size={20} />
                      ) : (
                        <Square className="text-slate-650" size={20} />
                      )}
                      Mark as Featured Project
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-xs font-bold text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Collapse Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

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
              Save Project Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
