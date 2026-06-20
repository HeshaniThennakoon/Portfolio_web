"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: string; // e.g. "10+", "4+ Years", "1", "Multiple"
  duration?: number; // in ms
}

export function AnimatedCounter({ value, duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Extract digits and suffix
  const match = value.match(/^(\d+)(.*)$/);
  const hasNumber = !!match;
  const targetNumber = hasNumber ? parseInt(match[1], 10) : 0;
  const suffix = hasNumber ? match[2] : value;

  useEffect(() => {
    if (!inView || !hasNumber) return;

    let start = 0;
    const end = targetNumber;
    if (start === end) {
      setCount(end);
      return;
    }

    const stepTime = Math.max(Math.floor(duration / end), 15);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, targetNumber, duration, hasNumber]);

  return (
    <span ref={ref} className="tabular-nums">
      {hasNumber ? `${count}${suffix}` : suffix}
    </span>
  );
}
