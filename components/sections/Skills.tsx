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
        return <Code2 size={16} />;
      case "Frontend Development":
        return <Monitor size={16} />;
      case "Backend Development":
        return <Server size={16} />;
      case "Databases":
        return <Database size={16} />;
      case "Cloud & DevOps":
        return <Cloud size={16} />;
      case "AI & Machine Learning":
        return <BrainCircuit size={16} />;
      default:
        return <ShieldAlert size={16} />;
    }
  };

  const selectedSkills = data.find((cat) => cat.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="My technical toolbelt, categorized by engineering domains."
          badge="Expertise"
        />

        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {data.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.category
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-border"
              }`}
            >
              {getCategoryIcon(cat.category)}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Skills Grid */}
        <div className="max-w-4xl mx-auto min-h-[180px]">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {selectedSkills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  layoutId={`skill-${skill}`}
                  className="p-4 rounded-2xl border border-border bg-card/60 hover:border-primary/40 hover:bg-card hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-foreground text-sm sm:text-base">
                    {skill}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted group-hover:bg-primary transition-colors" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
