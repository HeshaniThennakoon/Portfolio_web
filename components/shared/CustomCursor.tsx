"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text" | "hidden">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth position for the ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (!target) return;

      const isClickable = target.closest("a, button, [role='button'], [data-cursor='pointer']");
      const isText = target.closest("input, textarea, [contenteditable='true']");
      
      // Let's make it expand on any 'group' or clickable element
      if (isText) {
        setCursorState("text");
      } else if (isClickable || target.closest(".group")) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    const onMouseLeave = () => {
      setCursorState("hidden");
    };

    const onMouseEnter = () => {
      setCursorState("default");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  // Variants for the dot
  const dotVariants = {
    default: { opacity: 1, scale: 1 },
    hover: { opacity: 0, scale: 0 }, 
    text: { opacity: 0, scale: 0 },
    hidden: { opacity: 0, scale: 0 },
  };

  // Variants for the ring
  const ringVariants = {
    default: { 
      opacity: 1, 
      width: 32, 
      height: 32, 
      x: "-50%", 
      y: "-50%",
      backgroundColor: "transparent",
      borderColor: "var(--primary)",
      borderWidth: "1.5px",
    },
    hover: { 
      opacity: 0.15, 
      width: 60, 
      height: 60, 
      x: "-50%", 
      y: "-50%",
      backgroundColor: "var(--primary)",
      borderWidth: "0px",
    },
    text: { 
      opacity: 0.5, 
      width: 4, 
      height: 24, 
      x: "-50%", 
      y: "-50%",
      backgroundColor: "var(--primary)",
      borderWidth: "0px",
      borderRadius: "2px"
    },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trailing Ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full pointer-events-none border-solid"
        style={{
          x: ringX,
          y: ringY,
        }}
        variants={ringVariants}
        animate={isClicking && cursorState !== "text" ? { scale: 0.8, opacity: 0.5 } : cursorState}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      
      {/* Center Dot */}
      <motion.div
        className="absolute left-0 top-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          marginLeft: "-3px",
          marginTop: "-3px"
        }}
        variants={dotVariants}
        animate={isClicking ? { scale: 0.5 } : cursorState}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </div>
  );
}
