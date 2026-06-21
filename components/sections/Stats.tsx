"use client";

import { motion } from "framer-motion";
import { FolderKanban, Star, Award, Code2 } from "lucide-react";
import { AnimatedCounter } from "../shared/AnimatedCounter";

interface StatsProps {
  stats: { label: string; value: string }[];
}

export function Stats({ stats }: StatsProps) {
  if (!stats || stats.length === 0) return null;

  const getIcon = (label: string) => {
    const lowercase = label.toLowerCase();
    if (lowercase.includes("project")) return <FolderKanban className="text-primary" size={24} />;
    if (lowercase.includes("star") || lowercase.includes("rating")) return <Star className="text-primary" size={24} />;
    if (lowercase.includes("award") || lowercase.includes("cert")) return <Award className="text-primary" size={24} />;
    return <Code2 className="text-primary" size={24} />;
  };

  return (
    <section className="w-full bg-card border-y border-border/80 py-10 md:py-14 z-10 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-4 p-5 hover:bg-muted transition-all duration-300 rounded-3xl group border border-transparent hover:border-primary/10"
            >
              <div className="p-3 bg-background border border-border/60 flex items-center justify-center shrink-0 rounded-2xl group-hover:border-primary/30 transition-colors">
                {getIcon(stat.label)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary font-sans group-hover:cyber-glow transition-all duration-300">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
