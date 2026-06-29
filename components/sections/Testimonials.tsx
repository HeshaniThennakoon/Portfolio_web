"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/SectionHeader";
import type { Testimonial } from "@/lib/data";
import { Star, Mail, Phone, ChevronLeft, ChevronRight, MessageSquare, User } from "lucide-react";
import { GlassCard } from "../shared/GlassCard";
import Image from "next/image";

interface TestimonialsProps {
  data: Testimonial[];
}

export function Testimonials({ data }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter to only display active testimonials
  const activeTestimonials = data.filter((t) => t.isActive);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollability);
      // Run initial check
      checkScrollability();
      // Handle resize check
      window.addEventListener("resize", checkScrollability);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [activeTestimonials]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of view width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (activeTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden grid-bg">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Recommendations"
          subtitle="Kind words and assessments from academic mentors, project leads, and colleagues."
          badge="TESTIMONIALS"
        />

        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none gap-6 pb-6 lg:pb-0 scrollbar-none cursor-grab active:cursor-grabbing lg:cursor-default -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {activeTestimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="snap-start shrink-0 w-full sm:w-[480px] md:w-[500px] lg:w-full"
            >
              <GlassCard className="bg-card backdrop-blur-md p-6 sm:p-8 h-full border border-border/80 flex flex-col justify-between hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg dark:hover:shadow-[0_0_35px_rgba(0,245,255,0.08)] transition-all duration-300 rounded-3xl relative overflow-hidden group">
                {/* Visual quote accent icon */}
                <div className="absolute right-6 top-6 text-muted-foreground/5 dark:text-primary/5 select-none pointer-events-none">
                  <MessageSquare size={120} strokeWidth={0.5} />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Card Header: Rating stars & contacts */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          size={14}
                          className={
                            starIdx < t.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-slate-200 dark:text-slate-800"
                          }
                        />
                      ))}
                    </div>

                    {/* Quick Contacts */}
                    <div className="flex items-center gap-2">
                      {t.email && (
                        <a
                          href={`mailto:${t.email}`}
                          className="p-2 rounded-xl border border-cyan-600/20 dark:border-cyan-400/20 bg-cyan-600/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-600/20 dark:hover:bg-cyan-400/20 hover:border-cyan-600/40 dark:hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all cursor-pointer"
                          title={`Email ${t.name}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail size={13} />
                        </a>
                      )}
                      {t.phone && (
                        <a
                          href={`tel:${t.phone}`}
                          className="p-2 rounded-xl border border-emerald-600/20 dark:border-emerald-400/20 bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600/20 dark:hover:bg-emerald-400/20 hover:border-emerald-600/40 dark:hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all cursor-pointer"
                          title={`Call ${t.name}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Recommendation Text */}
                  <blockquote className="text-foreground text-sm leading-relaxed italic font-sans pl-1.5 border-l-2 border-primary/20 dark:border-primary/40">
                    "{t.content}"
                  </blockquote>
                </div>

                {/* Card Footer: Profile Details */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/60 relative z-10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted border border-border flex items-center justify-center shrink-0">
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <User size={20} className="text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-black uppercase text-foreground tracking-wider block leading-tight">
                      {t.name}
                    </cite>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mt-0.5 leading-tight">
                      {t.role} {t.company && `at ${t.company}`}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Carousel Buttons */}
        {activeTestimonials.length > 1 && (
          <div className="flex lg:hidden items-center justify-center gap-3 mt-8 select-none">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="cursor-pointer p-3 rounded-2xl border border-border/80 bg-card/65 text-muted-foreground hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,245,255,0.05)]"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="cursor-pointer p-3 rounded-2xl border border-border/80 bg-card/65 text-muted-foreground hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,245,255,0.05)]"
              aria-label="Next testimonials"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
