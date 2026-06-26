"use client";

import { useEffect, useState } from "react";
import { getHeroAction, updateHeroAction, uploadFileAction } from "@/app/actions";
import { HeroInfo } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Upload, FileText, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [data, setData] = useState<HeroInfo | null>(null);
  const [profileImageTimestamp, setProfileImageTimestamp] = useState(Date.now());

  // Comma separated roles text
  const [rolesText, setRolesText] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const hero = await getHeroAction();
        setData(hero);
        if (hero) {
          setRolesText(hero.roles.join(", "));
        }
      } catch (err) {
        toast.error("Failed to load hero details.");
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
      const parsedRoles = rolesText.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
      const updatedData = { ...data, roles: parsedRoles };
      const res = await updateHeroAction(updatedData);

      if (res.success) {
        toast.success(res.message);
        setData(updatedData);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save hero changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "resume");

      const res = await uploadFileAction(formData);
      if (res.success) {
        toast.success("Resume updated successfully!");
        if (data) {
          setData({ ...data, resumeUrl: res.url || "/resume.pdf" });
        }
      } else {
        toast.error(res.message || "Failed to upload resume.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "profile");

      const res = await uploadFileAction(formData);
      if (res.success) {
        toast.success("Profile image updated successfully!");
        setProfileImageTimestamp(Date.now());
        if (data) {
          setData({ ...data, profileImg: res.url || "/profile.jpg" });
        }
      } else {
        toast.error(res.message || "Failed to upload profile image.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadingProfile(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Hero & Landing Info</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Manage landing text, dynamic counters, resume documents, and profile photos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Copy form */}
        <GlassCard hoverEffect={false} animate={true} delay={0.1} className="lg:col-span-8 p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hero-name" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  id="hero-name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hero-roles" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Typewriter Roles (Comma separated)
                </label>
                <input
                  id="hero-roles"
                  type="text"
                  value={rolesText}
                  onChange={(e) => setRolesText(e.target.value)}
                  placeholder="Software Engineer, Full-Stack Developer, etc."
                  className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hero-headline" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Main Headline
              </label>
              <input
                id="hero-headline"
                type="text"
                value={data.headline}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hero-subheadline" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Subheadline Description
              </label>
              <textarea
                id="hero-subheadline"
                rows={4}
                value={data.subheadline}
                onChange={(e) => setData({ ...data, subheadline: e.target.value })}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none"
              />
            </div>

            {/* Stats Editors */}
            <div className="border-t border-border/80 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Hero Stat Counters</h3>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      stats: [...(data.stats || []), { label: "New Stat", value: "0" }]
                    });
                  }}
                  className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider"
                >
                  <Plus size={12} />
                  Add Stat
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.stats || []).map((stat, i) => (
                  <div key={i} className="flex gap-2 items-center bg-background p-3 rounded-xl border border-border/80">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Stat Label</span>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...data.stats];
                          newStats[i].label = e.target.value;
                          setData({ ...data, stats: newStats });
                        }}
                        className="bg-transparent border-0 p-0 text-sm font-semibold text-foreground focus:outline-none focus:ring-0"
                      />
                    </div>
                    <div className="w-24 flex flex-col gap-1 border-l border-border/80 pl-3">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Count Value</span>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...data.stats];
                          newStats[i].value = e.target.value;
                          setData({ ...data, stats: newStats });
                        }}
                        className="bg-transparent border-0 p-0 text-sm font-black text-primary focus:outline-none focus:ring-0"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setData({
                          ...data,
                          stats: data.stats.filter((_, idx) => idx !== i)
                        });
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-700 transition-colors p-1 border-l border-border/80 pl-2 self-center"
                      title="Remove Stat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Hero Details
                </>
              )}
            </button>
          </form>
        </GlassCard>

        {/* Media / Asset Uploads */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Photo upload */}
          <GlassCard hoverEffect={false} animate={true} delay={0.2} className="border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4 w-full text-left pb-2 border-b border-border/80">
              Profile Photo Asset
            </h3>

            <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-background border border-border/80 flex items-center justify-center p-1">
              <div className="absolute inset-1 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                {data.profileImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${data.profileImg}?t=${profileImageTimestamp}`}
                    alt="Current Profile"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground/60" size={32} />
                )}
              </div>
            </div>

            <label className="w-full mt-6 cursor-pointer bg-background hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm">
              {uploadingProfile ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Upload Photo
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                disabled={uploadingProfile}
                className="hidden"
              />
            </label>
          </GlassCard>

          {/* Resume PDF upload */}
          <GlassCard hoverEffect={false} animate={true} delay={0.3} className="border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4 w-full text-left pb-2 border-b border-border/80">
              Curriculum Vitae (PDF)
            </h3>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-2 shadow-inner">
              <FileText size={36} />
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground/80 mt-2 truncate w-full text-center">
              Current: <a href={data.resumeUrl} download className="text-primary underline font-bold">{data.resumeUrl.split("/").pop()}</a>
            </span>

            <label className="w-full mt-6 cursor-pointer bg-background hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm">
              {uploadingResume ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Upload New Resume PDF
                </>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                disabled={uploadingResume}
                className="hidden"
              />
            </label>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
