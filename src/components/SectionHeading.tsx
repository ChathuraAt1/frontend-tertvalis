import React from 'react';
import { motion } from 'motion/react';

export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  id?: string;
}

/**
 * Reusable SectionHeading component with Plus Jakarta Sans display heading,
 * unboxed metadata kicker, and brand accent bar (#050FD8 -> #05F2AD).
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'left',
  id,
}) => {
  const alignmentClasses =
    align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-10 sm:mb-12 ${alignmentClasses}`}
    >
      {kicker && (
        <div
          className={`flex items-center gap-2.5 text-xs font-semibold text-[#050FD8] tracking-wide mb-3 ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          <span
            className="w-6 h-1 rounded-full bg-gradient-to-r from-[#050FD8] via-[#076CF2] to-[#05F2AD] shrink-0"
            aria-hidden="true"
          />
          <span>{kicker}</span>
        </div>
      )}
      <h2
        id={id}
        className="font-heading text-xl sm:text-2xl lg:text-[2.05rem] font-bold text-[#0D0D0D] leading-[1.16] tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
