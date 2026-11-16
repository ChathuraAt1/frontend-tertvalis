import React from 'react';
import { motion } from 'motion/react';
import heroBgImg from '../assets/hero-bg.jpg';

interface HowItWorksProps {
  onNavigate?: (href: string) => void;
}

interface StepCardItem {
  id: string;
  stepNumber: string;
  stepLabel: string;
  title: string;
  subtitle: string;
  description: string;
  iconSrc: string;
}

const STEP_CARDS: StepCardItem[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    stepLabel: 'STEP 01',
    title: 'Connect & Organize Financial Records',
    subtitle: 'Unified Analytical Baseline',
    description:
      'Consolidate fiscal planning periods, historical actuals, and approved department budgets into a single unified analytical baseline with line-item transparency.',
    iconSrc: '/Connect & Organize Financial Records.svg',
  },
  {
    id: 'step-2',
    stepNumber: '02',
    stepLabel: 'STEP 02',
    title: 'Model & Compare Dynamic Scenarios',
    subtitle: 'Multi-Driver Simulation',
    description:
      'Simulate alternative business drivers from hiring schedules to capital allocation and compare projected revenue and margin outcomes side-by-side in real time.',
    iconSrc: '/Model & Compare Dynamic Scenarios.svg',
  },
  {
    id: 'step-3',
    stepNumber: '03',
    stepLabel: 'STEP 03',
    title: 'Evaluate Variances & Plan Ahead',
    subtitle: 'Board-Ready Clarity',
    description:
      'Track line-item variance against active targets, forecast cash runway trajectories, and generate decision-ready reviews that guide executive commitments.',
    iconSrc: '/Evaluate Variances & Plan Ahead.svg',
  },
];

/**
 * Section 4: How It Works Section
 * - Compact top banner with subtle photo background and brand gradient
 * - Step cards with delicate light-themed gradients (from white to soft sky tint)
 * - Redesigned Step badge (STEP 01 / STEP 02 / STEP 03 with subtle glowing indicator)
 * - Redesigned icons (Layers, GitBranch, TrendingUp) in top-right rounded circular containers
 * - Bigger step title with clean normal font weight (no aggressive bold text)
 * - Clean card design without any bottom footers or progress dots
 */
export const HowItWorks: React.FC<HowItWorksProps> = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative bg-[#FAFAFA] overflow-hidden"
    >
      {/* ============================================================ */}
      {/* 1. COMPACT UPPER BRAND GRADIENT BANNER                       */}
      {/* ============================================================ */}
      <div className="relative w-full pt-8 sm:pt-10 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden isolate">
        {/* Background Photograph with Low Opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={heroBgImg}
            alt="Financial analyst working in a modern studio"
            className="w-full h-full object-cover object-[center_35%] opacity-15 pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Multi-stop Brand Theme Gradient Overlay */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050FD8] via-[#076CF2] to-[#05F2AD] opacity-95"
          aria-hidden="true"
        />

        {/* Subtle Radial Ambient Glows matching theme palette */}
        <div
          className="absolute -top-16 left-1/4 w-80 h-80 bg-[#050FD8]/30 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 right-1/4 w-80 h-80 bg-[#05F2AD]/20 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Banner Content Container */}
        <div className="relative max-w-3xl mx-auto text-center z-10">
          {/* Eyebrow Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] sm:text-xs font-heading font-normal uppercase tracking-[0.2em] mb-3 shadow-xs"
          >
            <span>3-STEP WORKFLOW</span>
          </motion.div>

          {/* Main Display Headline (Normal Weight) */}
          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-heading font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-white tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            From Data to Insight
          </motion.h2>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="font-body font-normal text-sm sm:text-base text-white/85 max-w-xl mx-auto mt-3 leading-relaxed"
          >
            A repeatable three-stage process for consolidating historical records, modeling alternative assumptions, and guiding executive commitments.
          </motion.p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. OVERLAPPING LIGHT-GRADIENT CARDS                          */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {STEP_CARDS.map((card, idx) => {
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative rounded-2xl sm:rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-md shadow-blue-900/5 flex flex-col"
              >
                {/* Top Header: Step Indicator on Left + Larger Icon on Right */}
                <div className="flex items-center justify-between w-full mb-6">
                  {/* Step Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-100 shadow-2xs">
                    <span className="text-[11px] font-heading font-medium tracking-[0.16em] uppercase text-[#050FD8]">
                      {card.stepLabel}
                    </span>
                  </div>

                  {/* Top-Right Icon in Square Badge with Brand Gradient Background */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#050FD8] to-[#076CF2] shadow-md shadow-blue-600/20 flex items-center justify-center p-1.5 sm:p-2 text-white overflow-hidden">
                    <img
                      src={card.iconSrc}
                      alt={card.title}
                      className="w-full h-full object-contain scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="font-heading font-normal text-xl sm:text-2xl text-slate-800 tracking-tight leading-snug mb-2 text-left">
                  {card.title}
                </h3>

                {/* Subtitle / Focus Area */}
                <p className="text-xs font-heading font-normal text-[#076CF2] tracking-wide mb-3 text-left">
                  {card.subtitle}
                </p>

                {/* Card Description (Inter font, Normal Weight, Clean End - No Bottom Clutter) */}
                <p className="font-body font-normal text-xs sm:text-sm text-slate-500 leading-relaxed text-left">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
