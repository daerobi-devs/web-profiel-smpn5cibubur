"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import React from "react";

// Fluid cubic-bezier easing curve
export const appleEase = [0.16, 1, 0.3, 1] as const;

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: appleEase } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: appleEase } },
};

export function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div initial="initial" animate="animate" variants={pageVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollFadeUp — Gentle rise and fade-in with reduced-motion support
 */
export function ScrollFadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 20,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: appleEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollFadeScale — Soft scale and fade-in with reduced-motion support
 */
export function ScrollFadeScale({
  children,
  className,
  delay = 0,
  duration = 0.65,
  initialScale = 0.97,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: appleEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container & Items for Grids
 */
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay?: number; stagger?: number } = {}) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delay ?? 0.04,
      staggerChildren: custom.stagger ?? 0.08,
    },
  }),
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: appleEase,
    },
  },
};

export function ScrollStaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0.04,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={{ delay, stagger }}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
