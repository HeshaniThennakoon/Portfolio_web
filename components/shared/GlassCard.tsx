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
    "relative overflow-hidden rounded-md border border-border bg-card p-6 shadow-sm",
    hoverEffect && "hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
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
