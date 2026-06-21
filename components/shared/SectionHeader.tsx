"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isRight = align === "right";

  const words = title.split(" ");
  const hasMultipleWords = words.length > 1;
  const lastWord = hasMultipleWords ? words[words.length - 1] : "";
  const firstPart = hasMultipleWords ? words.slice(0, words.length - 1).join(" ") : title;

  return (
    <div
      className={cn(
        "mb-12 md:mb-16 flex flex-col",
        isCenter && "items-center text-center",
        isRight && "items-end text-right",
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary mb-3 inline-block font-sans"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase font-sans"
      >
        {hasMultipleWords ? (
          <>
            <span className="text-foreground/90">{firstPart} </span>
            <span className="text-primary cyber-glow">{lastWord}</span>
          </>
        ) : (
          <span className="text-primary cyber-glow">{title}</span>
        )}
      </motion.h2>

      {/* Decorative glowing line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "h-[3px] rounded-full bg-primary mt-4 mb-5",
          isCenter && "mx-auto",
          isRight && "ml-auto"
        )}
        style={{ 
          boxShadow: '0 0 10px var(--primary)' 
        }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-sm md:text-base text-muted-foreground font-medium leading-relaxed font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
