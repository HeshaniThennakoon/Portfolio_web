"use client";

import { useEffect, useState } from "react";
import { updateServicesAction, getServicesAction } from "@/app/actions";
import type { Service } from "@/lib/data";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Lock,
  BarChart2,
  Layers,
  Code2,
  Zap,
  Palette
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

// Map available icons to their components
const iconOptions = [
  { name: "Globe", component: Globe, label: "Web" },
  { name: "Smartphone", component: Smartphone, label: "Mobile" },
  { name: "BrainCircuit", component: BrainCircuit, label: "AI/ML" },
  { name: "Cloud", component: Cloud, label: "Cloud" },
  { name: "Cpu", component: Cpu, label: "System" },
  { name: "Database", component: Database, label: "Data" },
  { name: "Lock", component: Lock, label: "Security" },
  { name: "BarChart", component: BarChart2, label: "Analytics" },
  { name: "Layers", component: Layers, label: "Arch" },
  { name: "Code2", component: Code2, label: "Backend" },
  { name: "Zap", component: Zap, label: "Speed" },
  { name: "Palette", component: Palette, label: "Design" }
];

export default function AdminServicesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getServicesAction();
        setServices(res);
      } catch (err) {
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFieldChange = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        iconName: "Globe",
        title: "New Service",
        description: "Describe what you offer in this service card."
      }
    ]);
  };

  const handleRemoveService = (index: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setServices(services.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...services];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setServices(updated);
  };

  const moveDown = (index: number) => {
    if (index === services.length - 1) return;
    const updated = [...services];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setServices(updated);
  };

  const handleSave = async () => {
    // Validate inputs
    const invalid = services.some((s) => !s.title.trim() || !s.description.trim());
    if (invalid) {
      toast.error("Please fill out all service titles and descriptions.");
      return;
    }

    setSaving(true);
    try {
      const res = await updateServicesAction(services);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to save services.");
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
          <h1 className="text-3xl font-black text-foreground uppercase tracking-wider">Services Manager</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Configure the service cards that showcase what you do on your landing page.
          </p>
        </div>
        <button
          onClick={handleAddService}
          className="cursor-pointer bg-card hover:bg-muted border border-border text-foreground hover:text-primary font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus size={14} />
          Add Service
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {services.length === 0 ? (
          <GlassCard className="p-8 text-center border border-border bg-card/20 rounded-3xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">No services defined. Click "Add Service" to start.</p>
          </GlassCard>
        ) : (
          services.map((service, index) => (
            <GlassCard
              key={service.id || index}
              hoverEffect={false}
              animate={true}
              delay={index * 0.05}
              className="p-6 border border-border/80 bg-card/30 backdrop-blur-md rounded-3xl space-y-6 shadow-md relative group"
            >
              {/* Action buttons top-right */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-2 rounded-xl bg-background border border-border text-foreground hover:text-primary transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === services.length - 1}
                  className="p-2 rounded-xl bg-background border border-border text-foreground hover:text-primary transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => handleRemoveService(index)}
                  className="p-2 rounded-xl bg-background border border-border text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm"
                  title="Remove Service"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 md:pt-0">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                      placeholder="e.g. Web Development"
                      className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground font-bold transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                      placeholder="Engineering premium applications..."
                      rows={3}
                      className="bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl px-4 py-3 text-sm text-foreground transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Premium Icon Picker Grid */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Select Display Icon
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {iconOptions.map((opt) => {
                      const Icon = opt.component;
                      const isSelected = service.iconName === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => handleFieldChange(index, "iconName", opt.name)}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(0,245,255,0.1)] font-bold"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                          title={opt.label}
                        >
                          <Icon size={18} className={isSelected ? "animate-pulse" : ""} />
                          <span className="text-[8px] uppercase tracking-wider mt-1 select-none font-mono">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Saving Services...
            </>
          ) : (
            <>
              <Save size={14} />
              Save Services
            </>
          )}
        </button>
      </div>
    </div>
  );
}
