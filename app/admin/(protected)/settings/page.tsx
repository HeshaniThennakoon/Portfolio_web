"use client";

import { useEffect, useState } from "react";
import { updateAdminSettings, getSettingsAction } from "@/app/actions";
import type { Settings } from "@/lib/data";
import { toast } from "sonner";
import { Loader2, Save, Key, Palette, Mail } from "lucide-react";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">System Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize design color themes, update credential profiles, and configure SMTP mail forwarding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Colors Settings */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Palette className="text-primary" size={20} />
            Design Theme Variables
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="settings-primary" className="text-xs font-bold text-slate-300">
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
                  className="w-10 h-10 border border-slate-700 bg-slate-800 rounded cursor-pointer"
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
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-secondary" className="text-xs font-bold text-slate-300">
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
                  className="w-10 h-10 border border-slate-700 bg-slate-800 rounded cursor-pointer"
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
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-accent" className="text-xs font-bold text-slate-300">
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
                  className="w-10 h-10 border border-slate-700 bg-slate-800 rounded cursor-pointer"
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
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-darkbg" className="text-xs font-bold text-slate-300">
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
                  className="w-10 h-10 border border-slate-700 bg-slate-800 rounded cursor-pointer"
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
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 text-sm text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="settings-lightbg" className="text-xs font-bold text-slate-300">
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
                  className="w-10 h-10 border border-slate-700 bg-slate-800 rounded cursor-pointer"
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
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-3 text-sm text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Auth Credentials */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="text-secondary" size={20} />
            Security Profile Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-username" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-currentpass" className="text-xs font-bold text-slate-300">
                Current Password (To verify change)
              </label>
              <input
                id="settings-currentpass"
                type="password"
                placeholder="Required for pass changes"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-newpass" className="text-xs font-bold text-slate-300">
                New Password
              </label>
              <input
                id="settings-newpass"
                type="password"
                placeholder="Leave blank to keep same"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* SMTP Mail forwarding */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail className="text-accent" size={20} />
            SMTP Configuration (For Contact Form Emails)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtphost" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtpport" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtpuser" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="settings-smtppass" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="settings-toemail" className="text-xs font-bold text-slate-300">
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
                className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Saving Settings...
            </>
          ) : (
            <>
              <Save size={16} />
              Save System Config
            </>
          )}
        </button>
      </form>
    </div>
  );
}
