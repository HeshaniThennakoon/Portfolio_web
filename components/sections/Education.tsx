"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Education } from "@/lib/data";
import { GraduationCap, Calendar, Award, School, Trophy, BookOpen } from "lucide-react";

interface EducationProps {
  data: Education[];
}

export function EducationSection({ data }: EducationProps) {
  if (!data || data.length === 0) return null;

  const universityEntry = data.find(edu => 
    edu.degree.toLowerCase().includes("bsc") || 
    edu.degree.toLowerCase().includes("bachelor") || 
    edu.degree.toLowerCase().includes("hons") ||
    edu.institution.toLowerCase().includes("university")
  ) || data[0];

  const schoolEntries = data.filter(edu => edu.id !== universityEntry.id);

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden grid-bg">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <SectionHeader
          title="My Education"
          subtitle="My academic foundation in engineering, computing, and intelligence systems."
          badge="ACADEMIC"
        />

        <div className="mt-16 relative z-10 flex flex-col items-center">
          
          {/* 🎓 University Entry - Featured Hero Card */}
          {universityEntry && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-3xl"
            >
              <div className="relative group border border-border bg-card rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:border-primary/45 hover:shadow-2xl dark:hover:shadow-[0_0_50px_rgba(0,245,255,0.1)] overflow-hidden">
                {/* Glow accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-accent" />
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Glowing Cap Icon */}
                  <div className="p-5 border border-primary/20 bg-primary/5 text-primary flex items-center justify-center shrink-0 rounded-2xl group-hover:border-primary/40 group-hover:bg-primary/10 transition-all shadow-[0_0_20px_rgba(0,245,255,0.05)]">
                    <GraduationCap size={32} className="animate-pulse" />
                  </div>

                  <div className="space-y-6 w-full">
                    {/* Header Details */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/80 pb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary font-mono">HIGHER EDUCATION</span>
                        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-wide font-sans leading-tight">
                          {universityEntry.degree}
                        </h3>
                        {universityEntry.faculty && (
                          <p className="text-xs font-extrabold text-primary uppercase tracking-wider">
                            {universityEntry.faculty}
                          </p>
                        )}
                        <p className="text-sm font-bold text-muted-foreground">
                          {universityEntry.institution}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 items-start sm:items-end shrink-0">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/20 px-3.5 py-1.5 rounded-full w-fit">
                          <Calendar size={11} />
                          {universityEntry.period}
                        </span>
                        {universityEntry.gpa && (
                          <span className="text-[10px] font-extrabold tracking-wider uppercase text-foreground bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-lg w-fit flex items-center gap-1">
                            GPA: {universityEntry.gpa}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Achievements */}
                    {universityEntry.achievement && (
                      <div className="flex gap-2.5 items-start bg-primary/[0.02] border border-border/60 rounded-2xl p-4">
                        <Trophy size={16} className="text-primary shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h5 className="text-[10px] font-black tracking-widest uppercase text-muted-foreground font-sans">Honors & Distinctions</h5>
                          <p className="text-xs text-foreground font-semibold leading-relaxed">
                            {universityEntry.achievement}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Focus Areas */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5 font-sans">
                        <Award size={12} className="text-primary" />
                        Specializations & Coursework
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {universityEntry.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="text-[9px] sm:text-[10px] font-extrabold text-foreground bg-background border border-border hover:border-primary/45 hover:text-primary transition-all uppercase tracking-wider px-3.5 py-1.5 rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🔗 Visual Connector Line */}
          {schoolEntries.length > 0 && (
            <div className="w-0.5 h-16 bg-gradient-to-b from-primary/30 to-transparent" />
          )}

          {/* 🏫 Secondary & Primary Education Entries */}
          {schoolEntries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {schoolEntries.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-6 md:p-8 bg-card border border-border border-t-4 border-t-primary rounded-[28px] hover:border-primary/45 transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-lg dark:hover:shadow-[0_10px_35px_rgba(0,245,255,0.06)] group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div className="p-3 border border-border bg-background text-muted-foreground flex items-center justify-center shrink-0 rounded-xl group-hover:text-primary group-hover:border-primary/30 transition-colors">
                        <School size={20} />
                      </div>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full">
                        <Calendar size={9} />
                        {edu.period}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-foreground tracking-wide group-hover:text-primary transition-colors leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {edu.institution}
                      </p>
                    </div>

                    {/* Results / Stream Pill */}
                    {edu.gpa && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-lg">
                        <BookOpen size={11} />
                        {edu.gpa}
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievement && (
                      <p className="text-[11px] font-medium text-muted-foreground italic leading-relaxed border-l-2 border-primary/20 pl-2.5">
                        {edu.achievement}
                      </p>
                    )}
                  </div>

                  {/* Focus Areas / Subjects */}
                  {edu.focusAreas && edu.focusAreas.length > 0 && (
                    <div className="pt-4 border-t border-border/60">
                      <div className="flex flex-wrap gap-1.5">
                        {edu.focusAreas.map((subj) => (
                          <span
                            key={subj}
                            className="text-[8px] font-black tracking-widest text-muted-foreground uppercase bg-background border border-border px-2 py-0.5 rounded"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
