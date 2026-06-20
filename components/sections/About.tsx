"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Check, Cpu, Layout, Sparkles } from "lucide-react";
import { AboutInfo } from "@/lib/data";

interface AboutProps {
  data: AboutInfo;
  profileImg?: string;
  name?: string;
}

export function About({ data, profileImg = "/profile.jpg", name = "Heshani" }: AboutProps) {
  const getHighlightIcon = (index: number) => {
    const icons = [
      <Cpu key={0} className="text-primary" size={16} />,
      <Layout key={1} className="text-primary" size={16} />,
      <Sparkles key={2} className="text-primary" size={16} />,
    ];
    return icons[index % icons.length] || <Check className="text-primary" size={16} />;
  };

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Teal Duotone */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[350px] md:h-[420px] overflow-hidden group border border-primary/30 p-2 bg-card shadow-[0_0_50px_rgba(0,212,180,0.05)] rounded-none"
            >
              <div className="relative w-full h-full overflow-hidden bg-muted flex items-center justify-center rounded-none">
                {profileImg && profileImg !== "/profile.jpg" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImg}
                    alt={name}
                    className="w-full h-full object-cover teal-duotone"
                  />
                ) : (
                  <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-card select-none">
                    <div className="w-20 h-20 border border-primary/45 flex items-center justify-center text-primary text-3xl font-black mb-4">
                      HT
                    </div>
                    <span className="text-sm font-bold tracking-widest text-foreground font-mono uppercase">{name}</span>
                  </div>
                )}
              </div>
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
            </motion.div>
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <SectionHeader
              title="Who Am I?"
              badge="About Me"
              align="left"
              className="mb-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
                {data.story}
              </p>
            </motion.div>

            {/* Flat Card Core Strengths */}
            {data.highlights && data.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block font-mono">
                  // CORE STRENGTHS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-none hover:border-primary/40 transition-colors"
                    >
                      <div className="p-1.5 bg-background border border-border">
                        {getHighlightIcon(index)}
                      </div>
                      <span className="font-semibold text-foreground text-xs md:text-sm font-mono uppercase tracking-wider">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
