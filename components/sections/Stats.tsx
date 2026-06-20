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
    if (lowercase.includes("project")) return <FolderKanban className="text-primary" size={22} />;
    if (lowercase.includes("star") || lowercase.includes("rating")) return <Star className="text-primary" size={22} />;
    if (lowercase.includes("award") || lowercase.includes("cert")) return <Award className="text-primary" size={22} />;
    return <Code2 className="text-primary" size={22} />;
  };

  return (
    <section className="w-full bg-card border-y border-border py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-all rounded-none"
            >
              <div className="p-3 bg-background border border-border flex items-center justify-center shrink-0">
                {getIcon(stat.label)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-2xl md:text-3xl font-black tracking-tight text-primary font-mono">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">
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
