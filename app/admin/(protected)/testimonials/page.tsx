"use client";

import { useEffect, useState, useRef } from "react";
import {
  getTestimonialsAction,
  createTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  reorderTestimonialsAction,
  uploadFileAction,
} from "@/app/actions";
import type { Testimonial } from "@/lib/data";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Star,
  Mail,
  Phone,
  Upload,
  User,
  X,
  AlertCircle
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import Image from "next/image";

export default function AdminTestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); // 'new' or testimonial.id
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [form, setForm] = useState<{
    id?: string;
    name: string;
    role: string;
    company: string;
    email: string;
    phone: string;
    image: string;
    content: string;
    rating: number;
    isActive: boolean;
  }>({
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    image: "",
    content: "",
    rating: 5,
    isActive: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getTestimonialsAction();
        setTestimonials(res);
      } catch (err) {
        toast.error("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setForm({
      name: "",
      role: "",
      company: "",
      email: "",
      phone: "",
      image: "",
      content: "",
      rating: 5,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setModalMode("edit");
    setForm({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company || "",
      email: t.email || "",
      phone: t.phone || "",
      image: t.image || "",
      content: t.content,
      rating: t.rating,
      isActive: t.isActive,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, testId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = testId ? testId : "new";
    setUploading(fileType);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "testimonial");

    try {
      const res = await uploadFileAction(formData);
      if (res.success && res.url) {
        if (testId) {
          // Inline edit uploader for list view
          const updated = testimonials.map(t => 
            t.id === testId ? { ...t, image: res.url } : t
          );
          setTestimonials(updated);
          await updateTestimonialAction(testId, { image: res.url });
          toast.success("Avatar updated successfully!");
        } else {
          // Modal state uploader
          setForm(prev => ({ ...prev, image: res.url || "" }));
          toast.success("Avatar uploaded! Remember to save the testimonial.");
        }
      } else {
        toast.error(res.message || "Failed to upload avatar.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await deleteTestimonialAction(id);
      if (res.success) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        toast.success("Testimonial deleted.");
      } else {
        toast.error(res.message || "Failed to delete.");
      }
    } catch (err) {
      toast.error("Failed to delete testimonial.");
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setTestimonials(updated);
    
    // Save reordered array to DB
    const ids = updated.map(t => t.id as string);
    await reorderTestimonialsAction(ids);
  };

  const moveDown = async (index: number) => {
    if (index === testimonials.length - 1) return;
    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setTestimonials(updated);

    // Save reordered array to DB
    const ids = updated.map(t => t.id as string);
    await reorderTestimonialsAction(ids);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.content.trim()) {
      toast.error("Name, role/title, and testimonial message are required.");
      return;
    }

    setSaving(true);
    try {
      if (modalMode === "create") {
        const res = await createTestimonialAction({
          name: form.name,
          role: form.role,
          company: form.company || null,
          email: form.email || null,
          phone: form.phone || null,
          image: form.image || null,
          content: form.content,
          rating: form.rating,
          isActive: form.isActive,
        });
        if (res.success && res.testimonial) {
          setTestimonials([...testimonials, res.testimonial]);
          toast.success("Testimonial created successfully!");
          setIsModalOpen(false);
        } else {
          toast.error(res.message || "Failed to create.");
        }
      } else if (modalMode === "edit" && form.id) {
        const res = await updateTestimonialAction(form.id, {
          name: form.name,
          role: form.role,
          company: form.company || null,
          email: form.email || null,
          phone: form.phone || null,
          image: form.image || null,
          content: form.content,
          rating: form.rating,
          isActive: form.isActive,
        });
        if (res.success && res.testimonial) {
          setTestimonials(testimonials.map(t => t.id === form.id ? res.testimonial! : t));
          toast.success("Testimonial updated successfully!");
          setIsModalOpen(false);
        } else {
          toast.error(res.message || "Failed to update.");
        }
      }
    } catch (err) {
      toast.error("Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActiveStatus = async (t: Testimonial) => {
    try {
      const updatedStatus = !t.isActive;
      setTestimonials(testimonials.map(item => 
        item.id === t.id ? { ...item, isActive: updatedStatus } : item
      ));
      await updateTestimonialAction(t.id as string, { isActive: updatedStatus });
      toast.success(`${t.name}'s testimonial is now ${updatedStatus ? "Active" : "Inactive"}`);
    } catch (err) {
      toast.error("Failed to toggle status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Testimonials Manager</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Manage quotes, ratings, and avatars from lecturers, internship managers, or teammates.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <Plus size={14} />
          Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <GlassCard className="bg-card backdrop-blur-md p-12 text-center border-dashed">
          <AlertCircle className="mx-auto text-muted-foreground mb-4" size={40} />
          <h3 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wider">No Testimonials Yet</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Create testimonial cards to show on your public landing page.
          </p>
          <button
            onClick={openCreateModal}
            className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl inline-flex items-center gap-2 text-xs uppercase tracking-wider transition-all"
          >
            <Plus size={14} />
            Create First Testimonial
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {testimonials.map((t, index) => (
            <GlassCard
              key={t.id}
              className={`bg-card backdrop-blur-md p-6 border transition-all duration-300 ${
                t.isActive 
                  ? "border-border/80" 
                  : "border-dashed border-muted-foreground/30 opacity-60 bg-muted/5"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Visual Avatar block */}
                <div className="flex flex-col items-center gap-3 shrink-0 mx-auto lg:mx-0">
                  <div className="relative w-20 h-20 rounded-full border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User size={32} className="text-muted-foreground" />
                    )}

                    {uploading === t.id && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={16} />
                      </div>
                    )}
                  </div>
                  
                  <label className="cursor-pointer text-[9px] font-bold uppercase tracking-wider text-primary hover:text-cyan-400 flex items-center gap-1">
                    <Upload size={10} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, t.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Info Text Area */}
                <div className="flex-1 space-y-4 text-center lg:text-left w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <h3 className="text-lg font-black tracking-wide text-foreground uppercase">{t.name}</h3>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          t.isActive 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                            : "bg-muted text-muted-foreground border border-border"
                        }`}>
                          {t.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                        {t.role} {t.company && `at ${t.company}`}
                      </p>
                    </div>

                    {/* Quick sorting controls */}
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary disabled:opacity-30 cursor-pointer transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === testimonials.length - 1}
                        className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary disabled:opacity-30 cursor-pointer transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button
                        onClick={() => openEditModal(t)}
                        className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-cyan-500 cursor-pointer transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id as string)}
                        className="p-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Rating Stars & Contacts */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold font-mono tracking-wider text-muted-foreground">
                    <div className="flex items-center gap-0.5 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/10">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={idx < t.rating ? "fill-amber-500" : "text-slate-300 dark:text-slate-700"}
                        />
                      ))}
                      <span className="text-[10px] ml-1">{t.rating}/5</span>
                    </div>

                    {t.email && (
                      <span className="flex items-center gap-1 bg-cyan-500/5 px-2 py-0.5 rounded-lg border border-cyan-500/10">
                        <Mail size={11} className="text-cyan-500" />
                        {t.email}
                      </span>
                    )}
                    {t.phone && (
                      <span className="flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                        <Phone size={11} className="text-emerald-500" />
                        {t.phone}
                      </span>
                    )}
                  </div>

                  {/* Quote block */}
                  <blockquote className="text-sm font-sans italic text-foreground bg-muted/30 dark:bg-muted/10 p-3.5 rounded-xl border border-border/50 text-left relative pl-8">
                    <span className="absolute left-2.5 top-1 text-2xl font-serif text-primary/40 leading-none">“</span>
                    {t.content}
                  </blockquote>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => toggleActiveStatus(t)}
                      className="cursor-pointer text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t.isActive ? "Hide Testimonial from landing page" : "Publish Testimonial to landing page"}
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Testimonial Creation/Editing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <GlassCard className="bg-card backdrop-blur-md w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div>
              <h2 className="text-2xl font-black text-foreground uppercase tracking-wider">
                {modalMode === "create" ? "Add Recommendation" : "Edit Recommendation"}
              </h2>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                Fill in the details to represent the reference card beautifully.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Image Uploader */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
                <div className="relative w-16 h-16 rounded-full border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
                  {form.image ? (
                    <Image
                      src={form.image}
                      alt="Recommender avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User size={24} className="text-muted-foreground" />
                  )}

                  {uploading === "new" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="animate-spin text-primary" size={14} />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block">
                    Profile Avatar
                  </span>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-border bg-card text-muted-foreground hover:text-primary transition-colors">
                    <Upload size={11} />
                    Upload Image File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="hidden"
                    />
                  </label>
                  {form.image && (
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, image: "" }))}
                      className="text-[9px] font-bold uppercase tracking-wider text-rose-500 ml-3 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Text Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. John Doe"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Lecturer"
                    value={form.role}
                    onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Institution / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. University of Ruhuna"
                    value={form.company}
                    onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Rating (1-5 Stars)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm(p => ({ ...p, rating: Number(e.target.value) }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                    <option value={2}>2 Stars (Fair)</option>
                    <option value={1}>1 Star (Poor)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. professor@domain.lk"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +94 71 234 5678"
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl px-3 py-2.5 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Testimonial message */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Testimonial / Recommendation Text *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Paste the recommendation message here..."
                  value={form.content}
                  onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))}
                  className="w-full bg-card/60 border border-border focus:border-primary/50 outline-none rounded-xl p-3 text-sm transition-all resize-y"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 py-1 select-none">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm(p => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded text-primary focus:ring-primary/40 focus:ring-2 border-border bg-card cursor-pointer"
                />
                <label
                  htmlFor="isActive"
                  className="text-xs font-bold text-foreground cursor-pointer uppercase tracking-wider"
                >
                  Publish this testimonial on the live website immediately
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  {saving && <Loader2 className="animate-spin" size={13} />}
                  Save Testimonial
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
