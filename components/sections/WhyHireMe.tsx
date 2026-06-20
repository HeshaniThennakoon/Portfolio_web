"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { GlassCard } from "../shared/GlassCard";
import { Code, Brain, Cloud, Layers, Users, Zap, Check } from "lucide-react";

export function WhyHireMe() {
  const cards = [
    {
      icon: <Code className="text-primary" size={28} />,
      title: "Strong Full-Stack Skills",
      desc: "Proficient in frontend systems (Angular, React, Next.js) and backend environments (ASP.NET Core, Node.js) with structured database flows.",
      gridSpan: "md:col-span-2",
      bgClass: "bg-primary/5 hover:bg-primary/10 border-primary/20",
    },
    {
      icon: <Brain className="text-secondary" size={28} />,
      title: "AI & Computer Vision",
      desc: "Hands-on experience implementing CNN model training, real-time emotion/drowsiness tracking with OpenCV, and AI chatbot flows.",
      gridSpan: "md:col-span-1",
      bgClass: "bg-secondary/5 hover:bg-secondary/10 border-secondary/20",
    },
    {
      icon: <Cloud className="text-accent" size={28} />,
      title: "Cloud & DevOps Knowledge",
      desc: "Familiarity with AWS S3 hosting, Docker containerization, Jenkins automation pipelines, and robust Git workflows (GitLab, GitHub).",
      gridSpan: "md:col-span-1",
      bgClass: "bg-accent/5 hover:bg-accent/10 border-accent/20",
    },
    {
      icon: <Layers className="text-primary" size={28} />,
      title: "Clean Architecture",
      desc: "Committed to OOP design, MVC architectures, SOLID principles, REST API standards, and modular code readability to ease scaling.",
      gridSpan: "md:col-span-2",
      bgClass: "bg-primary/5 hover:bg-primary/10 border-primary/20",
    },
    {
      icon: <Users className="text-secondary" size={28} />,
      title: "Team Leadership",
      desc: "Proven coordinator and editor at IET on Campus. Former Captain of the University Carrom team. Expert collaborator in Agile sprints.",
      gridSpan: "md:col-span-1",
      bgClass: "bg-secondary/5 hover:bg-secondary/10 border-secondary/20",
    },
    {
      icon: <Zap className="text-accent" size={28} />,
      title: "Adaptable & Fast Learner",
      desc: "Graduated in Computer Engineering from Ruhuna. Fast to learn new frameworks, tools, database migrations, and systems.",
      gridSpan: "md:col-span-1",
      bgClass: "bg-accent/5 hover:bg-accent/10 border-accent/20",
    },
  ];

  return (
    <section id="why-hire-me" className="py-20 bg-slate-50 dark:bg-slate-900/30 relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Why Hire Me?"
          subtitle="A combination of technical expertise, continuous learning, and leadership skills that make me a valuable addition to any team."
          badge="Special Section"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${card.gridSpan}`}
            >
              <div className={`h-full rounded-2xl border backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] ${card.bgClass}`}>
                <div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 w-fit border border-border shadow-sm mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground uppercase tracking-widest">
                  <Check size={14} className="text-primary" />
                  Verified skill
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
