"use client";

import { useEffect, useState } from "react";
import { updateAdminSettings, getSettingsAction } from "@/app/actions";
import type { Settings } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Key, Palette, Mail } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  // Form password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSettingsAction();
        setSettings(data);
      } catch (err) {
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const res = await updateAdminSettings({
        username: settings.admin.username,
        currentPass: currentPass ? currentPass : undefined,
        newPass: newPass ? newPass : undefined,
        theme: settings.theme,
        emailConfig: settings.emailConfig,
      });

      if (res.success) {
        toast.success(res.message);
        setCurrentPass("");
        setNewPass("");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("An error occurred while updating settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">System Settings</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Customize design color themes, update credential profiles, and configure SMTP mail forwarding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Colors Settings */}
        <GlassCard hoverEffect={false} animate={true} delay={0.05} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Palette className="text-primary" size={18} />
            Design Theme Variables
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="settings-primary" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Primary Brand Color (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  id="settings-primary"
                  type="color"
                  value={settings.theme.primary}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primary: e.target.value },
                    })
                  }
                  className="w-10 h-10 border border-border bg-background rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.primary}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primary: e.target.value },
                    })
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-secondary" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Secondary Brand Color (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  id="settings-secondary"
                  type="color"
                  value={settings.theme.secondary}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondary: e.target.value },
                    })
                  }
                  className="w-10 h-10 border border-border bg-background rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.secondary}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, secondary: e.target.value },
                    })
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-accent" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Accent Brand Color (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  id="settings-accent"
                  type="color"
                  value={settings.theme.accent}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, accent: e.target.value },
                    })
                  }
                  className="w-10 h-10 border border-border bg-background rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.accent}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, accent: e.target.value },
                    })
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-darkbg" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Dark Mode Background (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  id="settings-darkbg"
                  type="color"
                  value={settings.theme.darkBg}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, darkBg: e.target.value },
                    })
                  }
                  className="w-10 h-10 border border-border bg-background rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.darkBg}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, darkBg: e.target.value },
                    })
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-lightbg" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Light Mode Background (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  id="settings-lightbg"
                  type="color"
                  value={settings.theme.lightBg}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, lightBg: e.target.value },
                    })
                  }
                  className="w-10 h-10 border border-border bg-background rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.lightBg}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, lightBg: e.target.value },
                    })
                  }
                  className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Auth Credentials */}
        <GlassCard hoverEffect={false} animate={true} delay={0.1} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Key className="text-secondary" size={18} />
            Security Profile Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-username" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Username
              </label>
              <input
                id="settings-username"
                type="text"
                value={settings.admin.username}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    admin: { ...settings.admin, username: e.target.value },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-currentpass" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Current Password (To verify change)
              </label>
              <input
                id="settings-currentpass"
                type="password"
                placeholder="Required for pass changes"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-newpass" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                New Password
              </label>
              <input
                id="settings-newpass"
                type="password"
                placeholder="Leave blank to keep same"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>
          </div>
        </GlassCard>

        {/* SMTP Mail forwarding */}
        <GlassCard hoverEffect={false} animate={true} delay={0.15} className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/80 pb-3">
            <Mail className="text-accent" size={18} />
            SMTP Configuration (For Contact Form Emails)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtphost" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                SMTP Host
              </label>
              <input
                id="settings-smtphost"
                type="text"
                placeholder="smtp.gmail.com"
                value={settings.emailConfig.smtpHost}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailConfig: { ...settings.emailConfig, smtpHost: e.target.value },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtpport" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                SMTP Port
              </label>
              <input
                id="settings-smtpport"
                type="number"
                placeholder="465"
                value={settings.emailConfig.smtpPort}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailConfig: { ...settings.emailConfig, smtpPort: Number(e.target.value) },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtpuser" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                SMTP Username
              </label>
              <input
                id="settings-smtpuser"
                type="text"
                placeholder="user@gmail.com"
                value={settings.emailConfig.smtpUser}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailConfig: { ...settings.emailConfig, smtpUser: e.target.value },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtppass" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                SMTP Password / App Password
              </label>
              <input
                id="settings-smtppass"
                type="password"
                placeholder="••••••••••••"
                value={settings.emailConfig.smtpPass}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailConfig: { ...settings.emailConfig, smtpPass: e.target.value },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="settings-toemail" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Receive Contact Notifications At (To Email)
              </label>
              <input
                id="settings-toemail"
                type="email"
                placeholder="thennakoonghm@gmail.com"
                value={settings.emailConfig.toEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailConfig: { ...settings.emailConfig, toEmail: e.target.value },
                  })
                }
                className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all"
              />
            </div>
          </div>
        </GlassCard>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Saving Settings...
            </>
          ) : (
            <>
              <Save size={14} />
              Save System Config
            </>
          )}
        </button>
      </form>
    </div>
  );
}
