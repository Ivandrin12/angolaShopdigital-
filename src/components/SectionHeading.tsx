import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-extrabold text-brand-black tracking-tight">
        {title}
      </h2>
      <div className={`h-1.5 w-20 bg-brand-gold mt-6 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
