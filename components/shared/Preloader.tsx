"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if the page has already been loaded in this session
    const hasLoadedBefore = sessionStorage.getItem("site-preloaded");
    
    if (hasLoadedBefore === "true") {
      setShow(false);
      return;
    }

    setShow(true);
    // Lock body scrolling
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const duration = 2000; // 2 seconds total simulation
    const intervalTime = 20; // update every 20ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          sessionStorage.setItem("site-preloaded", "true");
          // Unlock body scrolling
          document.body.style.overflow = "";
          setTimeout(() => {
            setShow(false);
          }, 850); // Match exit animation duration
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background select-none overflow-hidden"
        >
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          {/* Huge Animated Background Watermark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: [0.02, 0.04, 0.02],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute font-sans font-black tracking-tighter text-[35vw] md:text-[25vw] text-foreground pointer-events-none select-none z-0"
            style={{ lineHeight: 0.8 }}
          >
            HT
          </motion.div>

          {/* Foreground Animated Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
            
            {/* Elegant glowing SVG Monogram Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-24 h-24 md:w-32 md:h-32 mb-6 flex items-center justify-center"
            >
              {/* Outer Hexagon border animation */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
              >
                <motion.polygon
                  points="50,5 90,25 90,75 50,95 10,75 10,25"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "300", strokeDashoffset: "300" }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>

              {/* Glowing internal initials text */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold tracking-wide font-sans text-foreground drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.2)]"
              >
                HT
              </motion.span>
            </motion.div>

            {/* Branded Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-sm md:text-base font-bold tracking-[0.35em] text-foreground font-sans uppercase"
            >
              Heshani Thennakoon
            </motion.h2>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-muted-foreground font-sans uppercase mt-1.5"
            >
              Software Engineer Portfolio
            </motion.p>

            {/* Progress Container */}
            <div className="mt-8 flex flex-col items-center">
              {/* Numeric Indicator */}
              <motion.span 
                className="text-xs md:text-sm font-bold font-mono tracking-widest text-primary drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.15)]"
              >
                {progress}%
              </motion.span>

              {/* Progress Bar Container */}
              <div className="w-40 md:w-52 h-[3px] bg-muted/30 relative overflow-hidden rounded-full mt-3.5 border border-border/10">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_12px_var(--primary)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
