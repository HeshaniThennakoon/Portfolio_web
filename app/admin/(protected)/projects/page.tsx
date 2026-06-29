"use client";

import { useEffect, useState } from "react";
import { updateProjectsAction, uploadFileAction, getProjectsAction } from "@/app/actions";
import type { Project } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Trash2, Plus, ArrowUp, ArrowDown, Upload, Image as ImageIcon, CheckSquare, Square } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  proj: Project;
  index: number;
  isEditing: boolean;
  onEditClick: (id: string) => void;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: "up" | "down") => void;
  onChange: (id: string, updatedProj: Project) => void;
  isFirst: boolean;
  isLast: boolean;
  uploadingId: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => void;
  onCollapse: () => void;
}

function ProjectCard({
  proj,
  index,
  isEditing,
  onEditClick,
  onRemove,
  onMove,
  onChange,
  isFirst,
  isLast,
  uploadingId,
  onImageUpload,
  onCollapse,
}: ProjectCardProps) {
  // Local state for split/parsed fields to avoid format stripping on typing
  const [techText, setTechText] = useState(proj.technologies.join(", "));
  const [featuresText, setFeaturesText] = useState(proj.features.join("\n"));
  const [screenshotsText, setScreenshotsText] = useState((proj.screenshots || []).join("\n"));

  useEffect(() => {
    setTechText(proj.technologies.join(", "));
    setFeaturesText(proj.features.join("\n"));
    setScreenshotsText((proj.screenshots || []).join("\n"));
  }, [proj.technologies, proj.features, proj.screenshots]);

  const handleFieldChange = (field: keyof Project, value: any) => {
    onChange(proj.id, { ...proj, [field]: value });
  };

  const handleTechBlur = () => {
    const list = techText.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    onChange(proj.id, { ...proj, technologies: list });
  };

  const handleFeaturesBlur = () => {
    const list = featuresText.split("\n").map((f) => f.trim()).filter((f) => f.length > 0);
    onChange(proj.id, { ...proj, features: list });
  };

  const handleScreenshotsBlur = () => {
    const list = screenshotsText.split("\n").map((s) => s.trim()).filter((s) => s.length > 0);
    onChange(proj.id, { ...proj, screenshots: list });
  };

  const [uploadingGallery, setUploadingGallery] = useState(false);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGallery(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "gallery");
      formData.append("projectId", proj.id);

      const res = await uploadFileAction(formData);
      if (res.success && res.url) {
        toast.success("Gallery screenshot uploaded!");
        const currentScreenshots = proj.screenshots || [];
        const updatedScreenshots = [...currentScreenshots, res.url];
        onChange(proj.id, { ...proj, screenshots: updatedScreenshots });
        setScreenshotsText(updatedScreenshots.join("\n"));
      } else {
        toast.error(res.message || "Upload failed.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadingGallery(false);
    }
  };

  return (
    <GlassCard
      hoverEffect={!isEditing}
      animate={true}
      delay={index * 0.05}
      className={cn(
        "p-6 border bg-card/30 backdrop-blur-md space-y-6 shadow-md transition-all relative group rounded-3xl",
        isEditing ? "border-primary/50" : "border-border/80"
      )}
    >
      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onMove(index, "up")}
          disabled={isFirst}
          className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer shadow-sm transition-all duration-300"
          title="Move Up"
        >
          <ArrowUp size={13} />
        </button>
        <button
          type="button"
          onClick={() => onMove(index, "down")}
          disabled={isLast}
          className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer shadow-sm transition-all duration-300"
          title="Move Down"
        >
          <ArrowDown size={13} />
        </button>
        <button
          type="button"
          onClick={() => onRemove(proj.id)}
          className="p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Remove Project"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {!isEditing ? (
        <div className="cursor-pointer" onClick={() => onEditClick(proj.id)}>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-20 bg-background border border-border/80 rounded-xl overflow-hidden flex items-center justify-center shrink-0 p-1">
              {proj.imageUrl && proj.imageUrl !== "/uploads/placeholder.jpg" && proj.imageUrl !== "" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <ImageIcon className="text-muted-foreground/50" size={24} />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground text-lg">{proj.title}</h3>
                {proj.featured && (
                  <span className="text-[9px] font-bold uppercase text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.technologies.map((t) => (
                  <span key={t} className="text-[9px] font-bold text-muted-foreground/80 bg-background border border-border/80 px-2 py-0.5 rounded-lg">
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
            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-border/80 bg-background shrink-0 shadow-inner">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 block w-full text-left">Screenshot Thumbnail</span>
              
              <div className="relative w-full h-32 rounded-xl overflow-hidden bg-muted border border-border/80 flex items-center justify-center p-1">
                {proj.imageUrl && proj.imageUrl !== "/uploads/placeholder.jpg" && proj.imageUrl !== "" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={proj.imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <ImageIcon className="text-muted-foreground/40" size={32} />
                )}
              </div>

              <label className="w-full mt-4 cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider shadow-sm">
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
                  onChange={(e) => onImageUpload(e, proj.id)}
                  disabled={uploadingId === proj.id}
                  className="hidden"
                />
              </label>
            </div>

            {/* Copy details */}
            <div className="sm:col-span-2 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Project Title</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Short Description</label>
                <textarea
                  rows={3}
                  value={proj.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">GitHub URL</label>
              <input
                type="url"
                value={proj.githubUrl}
                onChange={(e) => handleFieldChange("githubUrl", e.target.value)}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Live Demo URL (Leave blank if local)</label>
              <input
                type="url"
                value={proj.demoUrl}
                onChange={(e) => handleFieldChange("demoUrl", e.target.value)}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Key Features (One feature per line)</label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              onBlur={handleFeaturesBlur}
              placeholder="Face Recognition Login..."
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Technologies used (Comma separated)</label>
            <input
              type="text"
              value={techText}
              onChange={(e) => setTechText(e.target.value)}
              onBlur={handleTechBlur}
              placeholder="React, Express, MongoDB"
              className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
            />
          </div>

          {/* Detailed Case Study Fields */}
          <div className="border-t border-border/80 pt-6 space-y-4">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">// CASE STUDY DETAILS (recruiting portfolio upgrade)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">My Role in Project</label>
                <input
                  type="text"
                  value={proj.role || ""}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  placeholder="e.g. Full-Stack Engineer / Lead Architect"
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Project Duration</label>
                <input
                  type="text"
                  value={proj.duration || ""}
                  onChange={(e) => handleFieldChange("duration", e.target.value)}
                  placeholder="e.g. 3 Months / 1 Year"
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Team Size</label>
                <input
                  type="text"
                  value={proj.teamSize || ""}
                  onChange={(e) => handleFieldChange("teamSize", e.target.value)}
                  placeholder="e.g. Solo / 4 Developers"
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">The Challenge / Problem Statement</label>
              <textarea
                rows={3}
                value={proj.challenge || ""}
                onChange={(e) => handleFieldChange("challenge", e.target.value)}
                placeholder="Describe the problem your project solves..."
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">The Solution & Engineering Approach</label>
              <textarea
                rows={4}
                value={proj.solution || ""}
                onChange={(e) => handleFieldChange("solution", e.target.value)}
                placeholder="Describe the technologies, logic flow, and implementation approach..."
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Outcomes & Project Impact</label>
              <textarea
                rows={3}
                value={proj.outcome || ""}
                onChange={(e) => handleFieldChange("outcome", e.target.value)}
                placeholder="Describe performance gains, metrics, or successful results..."
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Case Study Screenshots / Gallery</label>
              
              {/* Image previews */}
              {proj.screenshots && proj.screenshots.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-background p-3 rounded-2xl border border-border/80">
                  {proj.screenshots.map((url, sIdx) => (
                    <div key={sIdx} className="relative group/img aspect-video rounded-xl overflow-hidden border border-border/60 bg-muted flex items-center justify-center p-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Screenshot ${sIdx + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = proj.screenshots!.filter((_, idx) => idx !== sIdx);
                          onChange(proj.id, { ...proj, screenshots: updated });
                          setScreenshotsText(updated.join("\n"));
                        }}
                        className="absolute inset-0 bg-rose-600/80 hover:bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] uppercase tracking-wider shadow-sm">
                  {uploadingGallery ? (
                    <>
                      <Loader2 className="animate-spin" size={12} />
                      Uploading Screenshot...
                    </>
                  ) : (
                    <>
                      <Upload size={12} />
                      Upload Case Study Image
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={uploadingGallery}
                    className="hidden"
                  />
                </label>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">
                  // JPG, PNG, OR WEBP ACCEPTED
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Manual Screenshot Image URLs (One link per line)</label>
              <textarea
                rows={3}
                value={screenshotsText}
                onChange={(e) => setScreenshotsText(e.target.value)}
                onBlur={handleScreenshotsBlur}
                placeholder="https://example.com/screenshot1.png"
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 border-t border-border/80 pt-4">
            <button
              type="button"
              onClick={() => handleFieldChange("featured", !proj.featured)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer select-none"
            >
              {proj.featured ? (
                <CheckSquare className="text-primary" size={18} />
              ) : (
                <Square className="text-muted-foreground/30" size={18} />
              )}
              Mark as Featured Project
            </button>
            
            <button
              type="button"
              onClick={onCollapse}
              className="text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary transition-all cursor-pointer underline"
            >
              Collapse Card
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // File upload state per project ID
  const [uploadingId, setUploadingId] = useState<string | null>(null);

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

  useEffect(() => {
    loadData();
  }, []);

  const handleProjectChange = (id: string, updatedProj: Project) => {
    setProjects(projects.map((p) => (p.id === id ? updatedProj : p)));
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
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          handleProjectChange(projectId, { ...project, imageUrl: res.url || "/uploads/placeholder.jpg" });
        }
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
        await loadData();
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
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Project Showcase</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Display your software achievements with custom descriptions, screenshot assets, and link anchors.
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Project
        </button>
      </div>

      <div className="space-y-6 max-w-5xl">
        {projects.map((proj, index) => {
          const isEditing = editingId === proj.id;
          return (
            <ProjectCard
              key={proj.id}
              proj={proj}
              index={index}
              isEditing={isEditing}
              onEditClick={(id) => setEditingId(id)}
              onRemove={handleRemoveProject}
              onMove={moveProject}
              onChange={handleProjectChange}
              isFirst={index === 0}
              isLast={index === projects.length - 1}
              uploadingId={uploadingId}
              onImageUpload={handleImageUpload}
              onCollapse={() => setEditingId(null)}
            />
          );
        })}

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
              Save Project Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
