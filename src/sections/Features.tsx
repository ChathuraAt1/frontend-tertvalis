import React from 'react';
import { motion } from 'motion/react';
import {
  PLATFORM_FEATURES,
  ScenarioId,
} from '../data/tertvalisData';

const FEATURE_ICON_MAP: Record<string, string> = {
  'financial-data-management': '/Financial Data Management.svg',
  'financial-forecasting': '/Financial Forecasting.svg',
  'scenario-planning': '/Scenario Planning.svg',
  'budget-variance-analysis': '/Budget Variance Analysis.svg',
  'cash-flow-planning': '/Cash Flow Planning.svg',
  'kpi-monitoring': '/KPI Monitoring.svg',
};

interface FeaturesProps {
  onInspectScenarioInDemo?: (scenario: ScenarioId) => void;
}

/**
 * Section 5: Features Section
 * - Title and badge matching the About section design (font-normal, uppercase tracking, enlarged scale)
 * - Removed filter tabs and bottom caption note
 * - Removed card hover/click transitions for stable display
 * - Cards redesigned with light-themed gradient background (bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF])
 * - Prominent line-art icons in brand theme colors (#050FD8)
 */
export const Features: React.FC<FeaturesProps> = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block: Left Title & Right Description Split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-6 sm:mb-8">
          {/* Left Column: Eyebrow + Headline */}
          <div className="max-w-2xl">
            {/* Eyebrow Kicker matching About Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-3.5"
            >
              PLATFORM CAPABILITIES
            </motion.div>

            {/* Headline matching About Section Typography & Size */}
            <motion.h2
              id="features-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15]"
            >
              Everything You Need for Smarter Financial Planning
            </motion.h2>
          </div>

          {/* Right Column: Lead Description Paragraph */}
          <div className="max-w-md lg:max-w-lg lg:pb-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="font-body text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              Consolidate historical records, model alternative assumptions, track line-item variances, and generate board-ready clarity in a unified environment.
            </motion.p>
          </div>
        </div>

        {/* 6-Card Features Grid with Light Gradient Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PLATFORM_FEATURES.map((feature, idx) => {
            const iconSrc = FEATURE_ICON_MAP[feature.id] || '/Financial Data Management.svg';

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-9 bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-md shadow-blue-900/5 flex flex-col items-center text-center"
              >
                {/* Top Prominent Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4 sm:mb-5">
                  <img
                    src={iconSrc}
                    alt={feature.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Feature Title (Plus Jakarta Sans, Normal Weight) */}
                <h3 className="font-heading font-normal text-xl sm:text-2xl text-slate-800 tracking-tight leading-snug mb-3">
                  {feature.title}
                </h3>

                {/* Feature Description (Inter, Normal Weight) */}
                <p className="font-body font-normal text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[270px]">
                  {feature.mechanismDetail}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
