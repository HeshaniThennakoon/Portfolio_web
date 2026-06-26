"use client";

import { useEffect, useState, useRef } from "react";
import { updateAboutAction, getAboutAction, uploadFileAction } from "@/app/actions";
import type { AboutInfo } from "@/lib/data";
import { toast } from "sonner";
import { 
  Loader2, 
  Save, 
  UserCheck, 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Sparkles,
  Eye
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<AboutInfo | null>(null);

  // For Highlights pill input
  const [newHighlight, setNewHighlight] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const about = await getAboutAction();
        setData(about);
      } catch (err) {
        toast.error("Failed to load about me details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const res = await updateAboutAction(data);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "about-profile");

    try {
      const res = await uploadFileAction(formData);
      if (res.success && res.url) {
        setData((prev) => prev ? { ...prev, profileImg: res.url } : null);
        toast.success("Profile photo uploaded successfully!");
      } else {
        toast.error(res.message || "Failed to upload image.");
      }
    } catch (err) {
      toast.error("An error occurred during file upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addHighlight = () => {
    if (!newHighlight.trim() || !data) return;
    
    // Prevent duplicates
    if (data.highlights.includes(newHighlight.trim())) {
      toast.warning("This highlight already exists!");
      return;
    }

    setData({
      ...data,
      highlights: [...data.highlights, newHighlight.trim()]
    });
    setNewHighlight("");
  };

  const removeHighlight = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      highlights: data.highlights.filter((_, i) => i !== index)
    });
  };

  const moveHighlight = (index: number, direction: "up" | "down") => {
    if (!data) return;
    const newHighlights = [...data.highlights];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newHighlights.length) return;

    // Swap
    const temp = newHighlights[index];
    newHighlights[index] = newHighlights[targetIndex];
    newHighlights[targetIndex] = temp;

    setData({
      ...data,
      highlights: newHighlights
    });
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Calculate story word/char count
  const storyLength = data.story ? data.story.length : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">About Me Management</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Customize your biography, highlights, CTA, and profile photo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Settings (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Branding & Section Info */}
            <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3 mb-5">
                <UserCheck className="text-primary" size={18} />
                Branding & Section Info
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="section-badge" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Section Badge Label
                  </label>
                  <input
                    id="section-badge"
                    type="text"
                    value={data.sectionBadge || ""}
                    onChange={(e) => setData({ ...data, sectionBadge: e.target.value })}
                    placeholder="ABOUT ME"
                    className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="section-title" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Section Main Title
                  </label>
                  <input
                    id="section-title"
                    type="text"
                    value={data.sectionTitle || ""}
                    onChange={(e) => setData({ ...data, sectionTitle: e.target.value })}
                    placeholder="Who Am I?"
                    className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                  />
                </div>
              </div>
            </GlassCard>

            {/* 2. Biography Story */}
            <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-5">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="text-primary" size={18} />
                  Professional Biography
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {storyLength} characters
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="about-story" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Biography Copy
                </label>
                <textarea
                  id="about-story"
                  rows={8}
                  value={data.story}
                  onChange={(e) => setData({ ...data, story: e.target.value })}
                  placeholder="Share your personal/professional story..."
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none leading-relaxed"
                />
              </div>
            </GlassCard>

            {/* 3. Call to Action */}
            <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3 mb-5">
                <Plus className="text-primary" size={18} />
                Call to Action
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cta-label" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  CTA Button Label (Leave empty to hide)
                </label>
                <input
                  id="cta-label"
                  type="text"
                  value={data.ctaLabel || ""}
                  onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
                  placeholder="Let's Connect (scrolls to Contact section)"
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">
                  This button will automatically trigger smooth scrolling to the #contact section.
                </p>
              </div>
            </GlassCard>

            {/* 4. Highlights Pill Editor */}
            <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3 mb-5">
                <Sparkles className="text-primary" size={18} />
                Strength Highlights & Pills
              </h3>

              <div className="space-y-4">
                {/* Pill List */}
                <div className="flex flex-wrap gap-2.5 min-h-[40px] p-3 rounded-2xl bg-background/50 border border-border/50">
                  {data.highlights.length === 0 ? (
                    <span className="text-xs text-muted-foreground italic uppercase tracking-wider p-1">No highlights added yet.</span>
                  ) : (
                    data.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border/80 rounded-xl group transition-all duration-300"
                      >
                        <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
                          {highlight}
                        </span>
                        
                        {/* Control buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1 border-l border-border/60 pl-2">
                          <button
                            type="button"
                            onClick={() => moveHighlight(index, "up")}
                            disabled={index === 0}
                            className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit"
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveHighlight(index, "down")}
                            disabled={index === data.highlights.length - 1}
                            className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit"
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="p-0.5 text-destructive hover:text-destructive/80"
                            title="Delete"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add new pill input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                    placeholder="Enter highlight (e.g. Full-Stack Developer)"
                    className="flex-1 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-2.5 text-sm text-foreground transition-all"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2.5"
                  >
                    <Plus size={14} />
                    Add Tag
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save About Details
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Profile Image Upload & Preview (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Photo Card */}
          <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3 mb-5">
              <ImageIcon className="text-primary" size={18} />
              Profile Photo
            </h3>

            <div className="space-y-6 flex flex-col items-center">
              {/* Photo Preview Container */}
              <div className="relative w-48 h-56 bg-background rounded-2xl border border-border overflow-hidden group flex items-center justify-center">
                {data.profileImg && data.profileImg !== "/profile.jpg" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.profileImg}
                    alt="Current profile image"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="text-center p-4 flex flex-col items-center">
                    <UserCheck className="text-muted-foreground w-12 h-12 mb-2" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Default Monogram</span>
                  </div>
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary" size={24} />
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5"
                >
                  <Upload size={14} />
                  {data.profileImg ? "Replace Photo" : "Upload Photo"}
                </button>
                <p className="text-[9px] text-muted-foreground text-center uppercase tracking-widest mt-2">
                  Supports PNG, JPG, or WEBP. Max 5MB.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Mini Live Preview Card */}
          <GlassCard hoverEffect={false} className="p-6 border border-border/80 bg-card/35 backdrop-blur-md rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 blur-[30px] pointer-events-none" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3 mb-5">
              <Eye className="text-primary" size={18} />
              Live Preview
            </h3>

            <div className="space-y-4">
              <span className="text-[9px] font-bold tracking-[0.2em] text-primary bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full uppercase">
                {data.sectionBadge || "ABOUT ME"}
              </span>
              
              <h4 className="text-lg font-black text-foreground uppercase tracking-wide">
                {data.sectionTitle || "Who Am I?"}
              </h4>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {data.story || "Provide a story/biography to display here."}
              </p>

              {data.highlights && data.highlights.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {data.highlights.slice(0, 3).map((h, i) => (
                    <span 
                      key={i}
                      className="text-[9px] font-semibold text-foreground border border-border bg-card/50 px-2 py-0.5 rounded-lg uppercase tracking-wide"
                    >
                      {h}
                    </span>
                  ))}
                  {data.highlights.length > 3 && (
                    <span className="text-[9px] font-bold text-primary px-1.5 py-0.5 uppercase tracking-wide">
                      +{data.highlights.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {data.ctaLabel && (
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary border-b border-primary pb-0.5 uppercase tracking-widest cursor-default">
                    {data.ctaLabel} →
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
