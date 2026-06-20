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
    <section id="education" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="My Education"
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
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 bg-card border border-border border-l-2 border-l-primary rounded-none shadow-sm hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Cap Icon Box - Sharp Square */}
              <div className="p-4 border border-primary/20 bg-primary/5 text-primary flex items-center justify-center shrink-0 rounded-none">
                <GraduationCap size={24} />
              </div>

              {/* Details */}
              <div className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-mono uppercase tracking-wider">
                      {edu.degree}
                    </h3>
                    <p className="font-bold text-primary mt-1.5 font-mono text-xs uppercase">
                      // {edu.institution.toUpperCase()}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-background border border-border px-3 py-1.5 rounded-none w-fit shrink-0 font-mono">
                    <Calendar size={11} className="text-primary" />
                    {edu.period}
                  </span>
                </div>

                {/* Focus Areas */}
                <div>
                  <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Award size={12} className="text-primary" />
                    Specializations & Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[10px] font-bold text-foreground bg-background border border-border px-2.5 py-1.5 rounded-none hover:border-primary/45 transition-colors font-mono uppercase tracking-wider"
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
