import React from 'react';
import { motion } from 'motion/react';

/**
 * Section 3: About Section
 * Layout:
 * - 2-Column Split:
 *   - Left Column:
 *     - Eyebrow: "ABOUT US"
 *     - Large Headline: "Turn Financial Data into Better Decisions" (Enlarged size, clean non-bold font-normal)
 *     - No underline beneath title (clean whitespace)
 *     - Lead narrative paragraph
 *     - Two-column sub-grid: "Vision" and "Mission" with non-bold titles
 *   - Right Column:
 *     - Single prominent tall vertical capsule/pill arch image with rounded borders
 *     - Highlights modern corporate finance team reviewing growth charts
 * - Brand Theme Colors (#050FD8, #076CF2) and Typography (Plus Jakarta Sans & Inter)
 * - Seamless canvas background (bg-[#FAFAFA]) with no divider borders
 */
export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-14 items-center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: ABOUT HEADLINE, PARAGRAPH, VISION & MISSION     */}
          {/* ============================================================ */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Eyebrow Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-3.5"
            >
              ABOUT US
            </motion.div>

            {/* Display Headline in Theme Font (Enlarged Size, Clean Non-Bold Weight) */}
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-normal text-3xl sm:text-4xl md:text-[34px] lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.18] mb-5"
            >
              Turn Financial Data into Better Decisions
            </motion.h2>

            {/* Primary Narrative Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="font-body text-sm sm:text-base md:text-[14px] lg:text-base text-slate-600 leading-relaxed font-normal mb-8 sm:mb-10 max-w-2xl"
            >
              Tertvalis helps businesses forecast financial performance, explore future scenarios and make smarter financial decisions. Founded by Kavinethra Thamilchelvi on 14 May 2024, the company focuses on turning financial data into meaningful business insights. 
            </motion.p>

            {/* Two-Column Vision & Mission Sub-grid (Non-Bold Titles) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 md:gap-5 lg:gap-8 pt-1"
            >
              {/* Vision Column */}
              <div className="flex flex-col">
                <h3 className="font-heading font-normal text-xl sm:text-2xl md:text-xl lg:text-2xl text-[#0D0D0D] mb-2 tracking-tight">
                  Vision
                </h3>
                <p className="font-body text-xs sm:text-sm md:text-xs lg:text-sm text-slate-500 leading-relaxed font-normal">
                  To eliminate rigid spreadsheet silos and provide every growing business with dynamic, multi-scenario financial foresight that turns raw assumptions into proactive strategic clarity.
                </p>
              </div>

              {/* Mission Column */}
              <div className="flex flex-col">
                <h3 className="font-heading font-normal text-xl sm:text-2xl md:text-xl lg:text-2xl text-[#0D0D0D] mb-2 tracking-tight">
                  Mission
                </h3>
                <p className="font-body text-xs sm:text-sm md:text-xs lg:text-sm text-slate-500 leading-relaxed font-normal">
                  To empower executive leadership teams to simulate alternative business drivers, uncover budget variances, and navigate market volatility with total data integrity and governance.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: SINGLE TALL CAPSULE / PILL IMAGE ARCH          */}
          {/* ============================================================ */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-none md:w-full h-[420px] sm:h-[480px] md:h-[480px] lg:h-[560px] xl:h-[580px] rounded-[60px] sm:rounded-[80px] md:rounded-[90px] lg:rounded-[130px] overflow-hidden shadow-2xl shadow-blue-950/15 border-4 border-white bg-slate-100"
            >
              <img
                src="/about.png"
                alt="Corporate executive team reviewing financial growth trends on display in modern boardroom"
                className="w-full h-full object-cover object-[center_35%] scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#050FD8]/25 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
