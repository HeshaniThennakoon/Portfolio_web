"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Experience } from "@/lib/data";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface ExperienceProps {
  data: Experience[];
}

export function ExperienceSection({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional engineering journey and contributions to enterprise software systems."
          badge="Timeline"
        />

        <div className="max-w-4xl mx-auto space-y-6 mt-12">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 md:p-8 bg-card border border-border border-l-2 border-l-primary rounded-none shadow-sm hover:border-primary/50 transition-all duration-300 relative group"
            >
              {/* Corner Tag details for tech theme */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-border/40 group-hover:border-primary/50 transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-wide font-mono uppercase">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                    <span className="font-bold text-primary font-mono">// {exp.company.toUpperCase()}</span>
                    <span className="text-muted-foreground hidden sm:inline">|</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                      <MapPin size={12} className="text-primary" />
                      {exp.location.toUpperCase()}
                    </span>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-background border border-border px-3 py-1.5 rounded-none w-fit font-mono">
                  <Calendar size={11} className="text-primary" />
                  {exp.period}
                </span>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-2 mb-6">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="text-xs md:text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5">
                    <span className="text-primary font-bold shrink-0 mt-0.5 font-mono">&gt;</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack tags - sharp square chips */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-none font-mono uppercase tracking-wider"
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
