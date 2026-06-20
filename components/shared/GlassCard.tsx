"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  animate?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  animate = true,
  delay = 0,
  ...props
}: GlassCardProps) {
  const cardClasses = cn(
    "relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 bg-white/60 dark:bg-card backdrop-blur-md p-6 shadow-xl shadow-black/5 dark:shadow-black/20",
    hoverEffect && "hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-4px]",
    className
  );

  if (!animate) {
    return (
      <div className={cardClasses} {...(props as any)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={cardClasses}
      {...props}
    >
      {children}
    </motion.div>
  );
}
