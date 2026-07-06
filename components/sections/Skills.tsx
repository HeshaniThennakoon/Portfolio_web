"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { SkillCategory } from "@/lib/data";
import { Code2, Monitor, Server, Database, Cloud, BrainCircuit, ShieldAlert } from "lucide-react";

interface SkillsProps {
  data: SkillCategory[];
}

export function Skills({ data }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(data[0]?.category || "");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming Languages":
        return <Code2 size={14} />;
      case "Frontend Development":
        return <Monitor size={14} />;
      case "Backend Development":
        return <Server size={14} />;
      case "Databases":
        return <Database size={14} />;
      case "Cloud & DevOps":
        return <Cloud size={14} />;
      case "AI & Machine Learning":
        return <BrainCircuit size={14} />;
      default:
        return <ShieldAlert size={14} />;
    }
  };

  const selectedSkills = data.find((cat) => cat.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="My Skills"
          subtitle="My technical toolbelt, categorized by engineering domains."
          badge="EXPERTISE"
        />

        {/* Tab Headers: Neon Outline Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-4xl mx-auto z-10 relative">
          {data.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-sans uppercase tracking-wider rounded-2xl border transition-all cursor-pointer ${
                activeCategory === cat.category
                  ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_20px_rgba(0,245,255,0.45)]"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {getCategoryIcon(cat.category)}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Skills Grid */}
        <div className="max-w-4xl mx-auto min-h-[180px] z-10 relative">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {selectedSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  layoutId={`skill-${skill.name}`}
                  className="p-4 rounded-2xl border border-border bg-card hover:border-primary/45 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(0,245,255,0.12)] transition-all flex items-center gap-3.5 group"
                >
                  {skill.logoUrl && (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-background/30 flex items-center justify-center p-0.5 border border-border/40 group-hover:border-primary/20 transition-all flex-shrink-0">
                      <img
                        src={skill.logoUrl}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <span className="font-semibold text-foreground text-xs md:text-sm tracking-wide uppercase font-sans">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
