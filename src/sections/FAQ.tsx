import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, FAQItem } from '../data/tertvalisData';
import { Plus, Minus } from 'lucide-react';

/**
 * Section 9: Frequently Asked Questions (FAQ) Section
 * - Exactly 8 questions
 * - Evenly aligned 2-column grid rows (cards start on the same horizontal level)
 * - First question opened by default
 * - Headline on left and description on right (replacing the "View all" button)
 * - Brand Theme Colors (#050FD8, #076CF2, #05F2AD) and Typography (font-heading & font-body)
 */
export const FAQ: React.FC = () => {
  // 7 core platform questions (10 reduced by 3)
  const faqList = FAQ_ITEMS.slice(0, 7);

  // Single accordion state: first question open by default, auto-closes others on click
  const [openId, setOpenId] = useState<string | null>(faqList[0].id);

  const toggleItem = (id: string) => {
    // When clicking any question, the previously opened question automatically collapses
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqCard = (item: FAQItem) => {
    const isOpen = openId === item.id;
    const panelId = `faq-panel-${item.id}`;
    const triggerId = `faq-trigger-${item.id}`;

    return (
      <div
        key={item.id}
        className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
          isOpen
            ? 'bg-white border-[#050FD8]/40 shadow-xs'
            : 'bg-white/90 hover:bg-white border-slate-200/80 hover:border-[#050FD8]/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
        }`}
      >
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleItem(item.id)}
          className="w-full text-left p-4 sm:p-5 lg:p-6 flex items-center justify-between gap-4 cursor-pointer group"
        >
          <span className="font-heading font-medium sm:font-semibold text-slate-800 group-hover:text-[#050FD8] text-sm sm:text-base lg:text-[17px] leading-snug transition-colors pr-2">
            {item.question}
          </span>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-colors">
            {isOpen ? (
              <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#050FD8]" aria-hidden="true" />
            ) : (
              <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-hover:text-[#050FD8]" aria-hidden="true" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6 pt-0">
                <div className="pt-3 border-t border-slate-100">
                  <p className="font-body text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-normal">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* HEADER BLOCK: TITLE ON LEFT, DESCRIPTION ON RIGHT             */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-12 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            {/* Eyebrow Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-2"
            >
              FAQS
            </motion.div>

            {/* Display Headline */}
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15]"
            >
              Frequently asked question
            </motion.h2>
          </div>

          {/* Description replacing the View All button on the right */}
          <div className="max-w-md lg:max-w-lg lg:pb-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-normal"
            >
              Here's everything you need to learn to get started, manage your scenario models, and understand our financial intelligence methodology.
            </motion.p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SEQUENTIAL VERTICAL STACK (FULL WIDTH MATCHING HEADER)        */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-3 sm:gap-3.5 w-full">
          {faqList.map(renderFaqCard)}
        </div>
      </div>
    </section>
  );
};
