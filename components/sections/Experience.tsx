"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Experience } from "@/lib/data";
import { Calendar, Briefcase, MapPin } from "lucide-react";

interface ExperienceProps {
  data: Experience[];
}

export function ExperienceSection({ data }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-[#0D0D0D] relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional engineering journey and contributions to enterprise software systems."
          badge="Timeline"
        />

        <div className="max-w-4xl mx-auto relative mt-12 border-l border-border pl-6 sm:pl-8 space-y-12">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Pin */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1.5 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-sm">
                <Briefcase className="text-primary" size={14} />
              </div>

              {/* Experience Card */}
              <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:border-primary/20 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 font-semibold text-primary">
                      <span>{exp.company}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-full w-fit">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                </div>

                {/* Responsibilities list */}
                <ul className="list-disc pl-4 space-y-2 mb-6">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
