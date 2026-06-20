"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Education } from "@/lib/data";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface EducationProps {
  data: Education[];
}

export function EducationSection({ data }: EducationProps) {
  return (
    <section id="education" className="py-20 bg-slate-50 dark:bg-slate-900/30 relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Education"
          subtitle="My academic foundation in engineering, computing, and intelligence systems."
          badge="Academic"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {data.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-background border border-border shadow-sm hover:border-primary/20 transition-all flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Cap Icon Box */}
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <GraduationCap size={32} />
              </div>

              {/* Details */}
              <div className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="font-semibold text-primary mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-full w-fit shrink-0">
                    <Calendar size={12} />
                    {edu.period}
                  </span>
                </div>

                {/* Focus Areas */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1">
                    <Award size={14} className="text-secondary" />
                    Focus Specializations & Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-xs font-semibold text-foreground bg-card border border-border rounded-xl px-3 py-1.5 hover:border-primary/30 transition-colors"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
