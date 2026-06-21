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
    <section id="education" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="My Education"
          subtitle="My academic foundation in engineering, computing, and intelligence systems."
          badge="ACADEMIC"
        />

        <div className="max-w-3xl mx-auto space-y-6 mt-12 z-10 relative">
          {data.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 bg-card border border-border border-l-4 border-l-primary rounded-3xl hover:border-primary/45 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg dark:hover:shadow-[-5px_5px_30px_rgba(0,245,255,0.12)]"
            >
              {/* Cap Icon Box - Glowing Round/Hex shape */}
              <div className="p-4 border border-primary/15 bg-primary/5 text-primary flex items-center justify-center shrink-0 rounded-2xl group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all">
                <GraduationCap size={26} />
              </div>

              {/* Details */}
              <div className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border/80 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-wide font-sans">
                      {edu.degree}
                    </h3>
                    <p className="font-semibold text-primary mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary bg-[#f4f4f5] dark:bg-[#0d0d0d] border border-primary/20 px-3.5 py-1.5 rounded-full w-fit shrink-0">
                    <Calendar size={11} className="text-primary" />
                    {edu.period}
                  </span>
                </div>

                {/* Focus Areas */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5 font-sans">
                    <Award size={12} className="text-primary" />
                    Specializations & Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[10px] font-bold text-foreground bg-card border border-border px-3 py-1.5 rounded-full hover:border-primary/45 hover:text-primary transition-all uppercase tracking-wider"
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
