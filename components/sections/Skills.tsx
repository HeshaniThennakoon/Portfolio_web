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
    <section id="skills" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="My Skills"
          subtitle="My technical toolbelt, categorized by engineering domains."
          badge="Expertise"
        />

        {/* Tab Headers: Sharp flat chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {data.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider rounded-none border transition-all cursor-pointer ${
                activeCategory === cat.category
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  layoutId={`skill-${skill}`}
                  className="p-4 rounded-none border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <span className="font-bold text-foreground text-xs md:text-sm font-mono uppercase tracking-wider">
                    {skill}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-none bg-muted-foreground/30 group-hover:bg-primary transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
