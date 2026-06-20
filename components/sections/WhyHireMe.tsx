"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Code, Brain, Cloud, Layers, Users, Zap, ArrowRight } from "lucide-react";

export function WhyHireMe() {
  const cards = [
    {
      icon: <Code className="text-primary" size={24} />,
      title: "Full-Stack Development",
      desc: "Proficient in frontend systems (Angular, React, Next.js) and backend environments (ASP.NET Core, Node.js) with structured database flows.",
    },
    {
      icon: <Brain className="text-primary" size={24} />,
      title: "AI & Computer Vision",
      desc: "Hands-on experience implementing CNN model training, real-time emotion/drowsiness tracking with OpenCV, and AI chatbot flows.",
    },
    {
      icon: <Cloud className="text-primary" size={24} />,
      title: "Cloud & DevOps",
      desc: "Familiarity with AWS S3 hosting, Docker containerization, Jenkins automation pipelines, and robust Git workflows (GitLab, GitHub).",
    },
    {
      icon: <Layers className="text-primary" size={24} />,
      title: "Clean Architecture",
      desc: "Committed to OOP design, MVC architectures, SOLID principles, REST API standards, and modular code readability to ease scaling.",
    },
    {
      icon: <Users className="text-primary" size={24} />,
      title: "Team Leadership",
      desc: "Proven coordinator and editor at IET on Campus. Former Captain of the University Carrom team. Expert collaborator in Agile sprints.",
    },
    {
      icon: <Zap className="text-primary" size={24} />,
      title: "Adaptable Learner",
      desc: "Graduated in Computer Engineering from Ruhuna. Fast to learn new frameworks, tools, database migrations, and systems.",
    },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="why-hire-me" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SectionHeader
              title="What I Do?"
              badge="Services"
              align="left"
              className="mb-6"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed"
            >
              <p>
                I engineer modern, responsive, and robust web applications, specializing in full-stack engineering, cloud architecture, and intelligent machine vision algorithms.
              </p>
              <p>
                By combining clean code paradigms with performance-focused technologies, I build digital experiences that scale effortlessly and look exceptionally polished.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <button
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center gap-2 cursor-pointer border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase tracking-widest font-bold px-6 py-3.5 transition-all duration-300 rounded-none bg-transparent"
              >
                Let&apos;s Work Together
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 2x3 Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border p-6 rounded-none hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 border border-primary/20 bg-primary/5 w-fit rounded-none mb-4 group-hover:border-primary/50 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-bold text-foreground tracking-wider uppercase font-mono mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/40 text-[10px] font-bold text-primary font-mono tracking-widest uppercase">
                  // {card.title.split(" ")[0]} ACTIVE
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
