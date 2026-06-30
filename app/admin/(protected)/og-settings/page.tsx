"use client";

import { useEffect, useState } from "react";
import { getOgSettingsAction, updateOgSettingsAction } from "@/app/actions";
import type { OgSettings } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Globe, Eye, Image, User, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function OgSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ogSettings, setOgSettings] = useState<OgSettings | null>(null);

  useEffect(() => {
    async function fetchOgSettings() {
      try {
        const data = await getOgSettingsAction();
        setOgSettings(data);
      } catch (err) {
        toast.error("Failed to load Open Graph settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchOgSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ogSettings) return;

    setSaving(true);
    try {
      const res = await updateOgSettingsAction(ogSettings);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("An error occurred while updating OG settings.");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!ogSettings) return;
    window.open("/api/og", "_blank");
  };

  if (loading || !ogSettings) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Social Share & OG Settings</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Configure how your portfolio website appears when shared on LinkedIn, Twitter, WhatsApp, and Discord.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Open Graph Config Card */}
        <GlassCard hoverEffect={false} animate={true} delay={0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Globe className="text-primary" size={18} />
            Metadata & Branding Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="og-sitename" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Site Name / Brand Title
              </label>
              <input
                id="og-sitename"
                type="text"
                value={ogSettings.siteName}
                onChange={(e) => setOgSettings({ ...ogSettings, siteName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all font-sans"
                placeholder="e.g. Heshani Thennakoon | Portfolio"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="og-siteurl" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Production Website URL
              </label>
              <input
                id="og-siteurl"
                type="url"
                value={ogSettings.siteUrl}
                onChange={(e) => setOgSettings({ ...ogSettings, siteUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all font-sans"
                placeholder="e.g. https://heshani.dev"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="og-tagline" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                OG Image Tagline (Displays on Shared Card Image)
              </label>
              <input
                id="og-tagline"
                type="text"
                value={ogSettings.tagline}
                onChange={(e) => setOgSettings({ ...ogSettings, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all font-sans"
                placeholder="e.g. Building the Future, One Line at a Time"
                maxLength={80}
                required
              />
              <span className="text-[10px] text-muted-foreground self-end font-sans">
                {ogSettings.tagline.length}/80 characters maximum
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="og-twitter" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Twitter/X Handle
              </label>
              <input
                id="og-twitter"
                type="text"
                value={ogSettings.twitterHandle}
                onChange={(e) => setOgSettings({ ...ogSettings, twitterHandle: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all font-sans"
                placeholder="e.g. @HeshaniT"
              />
            </div>
          </div>
        </GlassCard>

        {/* Card Display Controls */}
        <GlassCard hoverEffect={false} animate={true} delay={0.1} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Image className="text-primary" size={18} />
            OG Image Card Customization
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-input/40 border border-border/40 hover:border-border/80 transition-all">
              <div className="mt-1 p-2 rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 size={18} />
              </div>
              <div className="flex-1 space-y-1">
                <label htmlFor="toggle-availability" className="text-xs font-bold text-foreground uppercase tracking-wider cursor-pointer">
                  Show Availability Status
                </label>
                <p className="text-[11px] text-muted-foreground font-sans">
                  Include the animated Availability Badge (🟢 Open to Work) on the generated card image.
                </p>
                <div className="pt-2">
                  <input
                    id="toggle-availability"
                    type="checkbox"
                    checked={ogSettings.showAvailability}
                    onChange={(e) => setOgSettings({ ...ogSettings, showAvailability: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/45 border-border cursor-pointer bg-card/80"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-input/40 border border-border/40 hover:border-border/80 transition-all">
              <div className="mt-1 p-2 rounded-xl bg-primary/10 text-primary">
                <User size={18} />
              </div>
              <div className="flex-1 space-y-1">
                <label htmlFor="toggle-photo" className="text-xs font-bold text-foreground uppercase tracking-wider cursor-pointer">
                  Show Profile Photo
                </label>
                <p className="text-[11px] text-muted-foreground font-sans">
                  Include your circular profile photo on the right side of the generated OG card.
                </p>
                <div className="pt-2">
                  <input
                    id="toggle-photo"
                    type="checkbox"
                    checked={ogSettings.showProfilePhoto}
                    onChange={(e) => setOgSettings({ ...ogSettings, showProfilePhoto: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/45 border-border cursor-pointer bg-card/80"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={16} />
                Save OG Settings
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-card border border-border hover:border-primary/40 text-foreground font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-[0_0_20px_rgba(0,245,255,0.08)] cursor-pointer"
          >
            <Eye size={16} />
            Preview Card Image
          </button>
        </div>
      </form>
    </div>
  );
}
