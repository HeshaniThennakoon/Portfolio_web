"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import { Check, BrainCircuit, Users, Code, Sparkles } from "lucide-react";
import { AboutInfo } from "@/lib/data";
import { useTheme } from "next-themes";

interface AboutProps {
  data: AboutInfo;
  profileImg?: string;
  name?: string;
}

export function About({ data, profileImg = "/profile.jpg", name = "Heshani" }: AboutProps) {
  const { resolvedTheme } = useTheme();

  const getHighlightIcon = (index: number) => {
    const icons = [
      <BrainCircuit key={0} className="text-primary" size={18} />,
      <Users key={1} className="text-primary" size={18} />,
      <Code key={2} className="text-primary" size={18} />,
      <Sparkles key={3} className="text-primary" size={18} />,
    ];
    return icons[index % icons.length] || <Check className="text-primary" size={18} />;
  };

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Grayscale Image Reveal */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-[350px] md:h-[420px] p-2 bg-card border border-primary/20 hover:border-primary/40 rounded-[2.5rem] transition-all duration-500"
              style={{ 
                boxShadow: resolvedTheme === "dark"
                  ? '0 0 45px rgba(0, 245, 255, 0.15), inset 0 0 20px rgba(0, 245, 255, 0.02)'
                  : '0 10px 30px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-[#f4f4f5] dark:bg-[#151515] flex items-center justify-center rounded-[2.2rem]">
                {profileImg && profileImg !== "/profile.jpg" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImg}
                    alt={name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-102"
                  />
                ) : (
                  <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-card w-full select-none">
                    <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary text-3xl font-black mb-4 bg-primary/5 cyber-glow">
                      HT
                    </div>
                    <span className="text-sm font-bold tracking-widest text-foreground font-sans uppercase">{name}</span>
                  </div>
                )}
              </div>
              
              {/* Tech Corner Details */}
              <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-primary opacity-65" />
              <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-primary opacity-65" />
              <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-primary opacity-65" />
              <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-primary opacity-65" />
            </motion.div>
          </div>

          {/* Right Column: Copy & Highlight Feature Pills */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <SectionHeader
              title="Who Am I?"
              badge="ABOUT ME"
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

            {/* Glowing 2x2 highlight pills grid */}
            {data.highlights && data.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 pt-8 border-t border-border/80"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,245,255,0.08)] transition-all duration-300 group"
                    >
                      <div className="p-2 bg-primary/5 rounded-xl border border-primary/10 text-primary group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                        {getHighlightIcon(index)}
                      </div>
                      <span className="font-semibold text-foreground text-xs md:text-sm tracking-wide uppercase font-sans">
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
