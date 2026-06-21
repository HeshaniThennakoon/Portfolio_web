"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Experience } from "@/lib/data";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceProps {
  data: Experience[];
}

export function ExperienceSection({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional engineering journey and contributions to enterprise software systems."
          badge="TIMELINE"
        />

        <div className="max-w-4xl mx-auto space-y-6 mt-12 z-10 relative">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 md:p-8 bg-card border border-border border-l-4 border-l-primary rounded-3xl hover:border-primary/45 transition-all duration-300 relative group hover:shadow-lg dark:hover:shadow-[-5px_5px_30px_rgba(0,245,255,0.12)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-wide font-sans">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                    <span className="font-semibold text-primary">{exp.company}</span>
                    <span className="text-muted-foreground hidden sm:inline">|</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={12} className="text-primary" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary bg-[#f4f4f5] dark:bg-[#0d0d0d] border border-primary/20 px-3.5 py-1.5 rounded-full w-fit">
                  <Calendar size={11} className="text-primary" />
                  {exp.period}
                </span>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-3 mb-6">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="text-xs md:text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5">
                    <span className="text-primary font-bold shrink-0 mt-0.5">&gt;</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/60">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
