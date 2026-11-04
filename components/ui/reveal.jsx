"use client"
import { motion } from 'framer-motion';

// Scroll-triggered entrances. Each one plays once, just before the element is
// fully on screen, and stays short so nothing sits blank while scrolling.
const EASE = [0.23, 1, 0.32, 1];

export const revealViewport = { once: true, margin: '0px 0px -8% 0px' };

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Reveal({ as = 'div', x = 0, y = 24, delay = 0, children, ...props }) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  );
}

// Plays its RevealItem children one after another when the group scrolls into view.
export function RevealGroup({ as = 'div', stagger = 0.08, children, ...props }) {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ as = 'div', children, ...props }) {
  const Component = motion[as];
  return (
    <Component variants={revealItem} {...props}>
      {children}
    </Component>
  );
}
