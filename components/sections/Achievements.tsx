"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Achievements } from "@/lib/data";
import { Trophy, Users, Award, ShieldCheck } from "lucide-react";

interface AchievementsProps {
  data: Achievements;
}

export function AchievementsSection({ data }: AchievementsProps) {
  const categories = [
    {
      title: "Leadership Roles",
      items: data.leadership,
      icon: <Users className="text-primary" size={24} />,
      gradient: "from-primary/10 to-transparent",
    },
    {
      title: "Sports & Athletics",
      items: data.sports,
      icon: <Trophy className="text-secondary" size={24} />,
      gradient: "from-secondary/10 to-transparent",
    },
    {
      title: "Professional Activities",
      items: data.professional,
      icon: <Award className="text-accent" size={24} />,
      gradient: "from-accent/10 to-transparent",
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 left-1/10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Achievements & Leadership"
          subtitle="Beyond coding — my contributions to university teams, student societies, and conferences."
          badge="Highlights"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl border border-border bg-card/40 overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Card Header with Category Gradient */}
              <div className={`p-6 border-b border-border bg-gradient-to-b ${cat.gradient} flex items-center gap-4`}>
                <div className="p-3 rounded-2xl bg-background border border-border shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {cat.title}
                </h3>
              </div>

              {/* Achievements list */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <ul className="space-y-4">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                      <span className="text-sm font-semibold text-foreground leading-relaxed">
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
