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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20 mb-3 inline-block"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
      >
        {title}
      </motion.h2>

      {/* Decorative gradient line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "h-[4px] rounded-full bg-gradient-to-r from-primary to-secondary mt-4 mb-5",
          isCenter && "mx-auto",
          isRight && "ml-auto"
        )}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
