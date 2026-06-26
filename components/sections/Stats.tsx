"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FolderKanban, Star, Award, Code2 } from "lucide-react";
import { AnimatedCounter } from "../shared/AnimatedCounter";
import { cn } from "@/lib/utils";

interface StatsProps {
  stats: { label: string; value: string }[];
}

export function Stats({ stats }: StatsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!stats || stats.length === 0) return null;

  const isDark = !mounted || resolvedTheme === "dark";

  const getIcon = (label: string, darkTheme: boolean) => {
    const lowercase = label.toLowerCase();
    const iconClass = darkTheme ? "text-cyan-400" : "text-cyan-600";
    if (lowercase.includes("project")) return <FolderKanban className={iconClass} size={24} />;
    if (lowercase.includes("star") || lowercase.includes("rating")) return <Star className={iconClass} size={24} />;
    if (lowercase.includes("award") || lowercase.includes("cert")) return <Award className={iconClass} size={24} />;
    return <Code2 className={iconClass} size={24} />;
  };

  return (
    <section className="w-full bg-[#e0f7fc] dark:bg-[#061724] border-y border-[#bfeaf3] dark:border-[#0d2d46] py-10 md:py-14 z-10 relative transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-3xl group border border-[#bfeaf3]/40 dark:border-[#0d2d46] bg-white/90 dark:bg-[#0b2133]/50 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_25px_rgba(0,245,255,0.06)] hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:bg-white dark:hover:bg-[#0f2c44]/60 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-3 bg-[#f0fbfe] dark:bg-[#071926] border border-[#bfeaf3]/60 dark:border-[#0d2d46]/80 flex items-center justify-center shrink-0 rounded-2xl group-hover:border-cyan-400 dark:group-hover:border-cyan-400 group-hover:bg-white dark:group-hover:bg-[#0b2133] transition-all duration-300 shadow-sm dark:shadow-[0_0_12px_rgba(0,245,255,0.04)]">
                {getIcon(stat.label, isDark)}
              </div>
              <div className="flex flex-col min-w-0">
                <span 
                  className={cn(
                    "text-3xl md:text-4xl font-extrabold tracking-tight font-sans transition-all duration-300",
                    isDark 
                      ? "text-primary group-hover:cyber-glow" 
                      : "bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent"
                  )}
                >
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-cyan-400/80 uppercase tracking-wider mt-1.5">
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
