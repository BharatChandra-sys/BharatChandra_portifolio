"use client"
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin bar along the top of the page that fills as the visitor scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-0.5 origin-left bg-white/60"
      style={{ scaleX }}
    />
  );
}
