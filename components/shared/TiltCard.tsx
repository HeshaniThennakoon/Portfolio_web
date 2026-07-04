"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Max degrees of rotation
  perspective?: number; // Perspective value in pixels
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  perspective = 1000,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports touch
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of mouse cursor relative to the card's top-left corner
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    setCoords({ x: normalizedX, y: normalizedY });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Calculate rotation (rotateY is affected by horizontal movement, rotateX by vertical movement)
  const rotateX = isHovered ? -coords.y * maxTilt : 0;
  const rotateY = isHovered ? coords.x * maxTilt : 0;

  // Calculate position of the glow highlight
  const glowX = isHovered ? (coords.x + 0.5) * 100 : 50;
  const glowY = isHovered ? (coords.y + 0.5) * 100 : 50;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl transition-transform duration-500 ease-out will-change-transform overflow-hidden",
        className
      )}
      style={{
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
      }}
      {...props}
    >
      {/* Shine/Glow Effect Overlay */}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle 250px at ${glowX}% ${glowY}%, var(--primary) 0%, transparent 80%)`,
            mixBlendMode: "screen",
            zIndex: 3,
          }}
        />
      )}
      <div className="h-full w-full relative z-10">
        {children}
      </div>
    </div>
  );
}
