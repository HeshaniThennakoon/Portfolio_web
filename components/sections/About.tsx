"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { GlassCard } from "../shared/GlassCard";
import { CheckCircle2, MapPin, Mail, Award, GraduationCap, Laptop } from "lucide-react";
import { AboutInfo } from "@/lib/data";

interface AboutProps {
  data: AboutInfo;
}

export function About({ data }: AboutProps) {
  const cardItems = [
    {
      icon: <GraduationCap className="text-primary" size={24} />,
      title: "Education",
      desc: "BSc (Hons) in Computer Engineering",
    },
    {
      icon: <Laptop className="text-secondary" size={24} />,
      title: "Focus Areas",
      desc: "Full-Stack, Cloud, AI & Vision",
    },
    {
      icon: <MapPin className="text-accent" size={24} />,
      title: "Location",
      desc: "Sri Lanka",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-2/3 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="About Me"
          subtitle="My professional journey, academic background, and what drives me as a software engineer."
          badge="Profile"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Left Column: Story text and Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Engineering Custom, Scalable Software Solutions
              </h3>
              <p className="text-muted-foreground font-medium text-base md:text-lg leading-relaxed">
                {data.story}
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6 border-t border-border"
            >
              <h4 className="text-base font-bold uppercase tracking-wider text-primary mb-4">
                Core Strengths
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-secondary shrink-0" size={20} />
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Key Details cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {cardItems.map((item, index) => (
              <GlassCard
                key={index}
                delay={index * 0.15}
                hoverEffect
                className="flex items-start gap-4 p-5 hover:translate-x-[4px] duration-300 transition-all border border-border"
              >
                <div className="p-3 rounded-2xl bg-card border border-border shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm font-semibold text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mt-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-9xl font-serif font-black text-primary/10 select-none pointer-events-none">
                “
              </div>
              <p className="text-sm font-semibold text-primary leading-relaxed relative z-10 italic">
                &quot;The only way to write great software is to love what you build, practice clean code, and embrace a lifelong learning attitude.&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
