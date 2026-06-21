"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Achievements } from "@/lib/data";
import { Trophy, Users, Award } from "lucide-react";

interface AchievementsProps {
  data: Achievements;
}

export function AchievementsSection({ data }: AchievementsProps) {
  const categories = [
    {
      title: "Leadership Roles",
      items: data.leadership,
      icon: <Users className="text-primary" size={22} />,
    },
    {
      title: "Sports & Athletics",
      items: data.sports,
      icon: <Trophy className="text-primary" size={22} />,
    },
    {
      title: "Professional",
      items: data.professional,
      icon: <Award className="text-primary" size={22} />,
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Achievements & Leadership"
          subtitle="Beyond coding — my contributions to university teams, student societies, and conferences."
          badge="HIGHLIGHTS"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 z-10 relative">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border border-border bg-card overflow-hidden flex flex-col hover:border-primary/45 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(0,245,255,0.12)] rounded-3xl group"
            >
              {/* Card Header with Category Icon */}
              <div className="p-6 border-b border-border/80 flex items-center gap-4">
                <div className="p-3 border border-primary/15 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:shadow-[0_0_10px_rgba(0,245,255,0.15)] transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-foreground tracking-wide font-sans">
                  {cat.title}
                </h3>
              </div>

              {/* Achievements list */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <ul className="space-y-4">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0 mt-0.5">&gt;</span>
                      <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
