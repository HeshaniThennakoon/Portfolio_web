"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Lock,
  BarChart2,
  Layers,
  Code2,
  Zap,
  Palette,
  ArrowRight
} from "lucide-react";
import type { Service } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Lock,
  BarChart: BarChart2,
  Layers,
  Code2,
  Zap,
  Palette,
};

interface WhyHireMeProps {
  data: Service[];
}

export function WhyHireMe({ data }: WhyHireMeProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="why-hire-me" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SectionHeader
              title="What I Do?"
              badge="OUR SERVICES"
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
                className="inline-flex items-center gap-2 cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs uppercase tracking-wider px-8 py-3.5 transition-all duration-300 rounded-2xl shadow-[0_0_10px_rgba(0,245,255,0.05)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] bg-transparent"
              >
                Let&apos;s Work Together
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 2x2 Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 z-10">
            {data.map((card, i) => {
              const IconComponent = iconMap[card.iconName] || Globe;
              return (
                <motion.div
                  key={card.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card border border-border p-8 rounded-3xl hover:border-primary/45 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(0,245,255,0.12)]"
                >
                  <div>
                    <div className="p-4 border border-primary/15 bg-primary/5 w-fit rounded-2xl mb-6 group-hover:border-primary/45 transition-all group-hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]">
                      <IconComponent className="text-primary" size={32} />
                    </div>
                    <h3 className="text-base font-bold text-foreground tracking-wider uppercase font-sans mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 text-[10px] font-bold text-primary font-mono tracking-widest uppercase">
                    // {card.title ? card.title.toUpperCase().split(" ")[0] : "SERVICE"} ACTIVE
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
