import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { PRICING_TIERS, PricingTier } from '../data/tertvalisData';
import { Check } from 'lucide-react';

const STRIPE_CHECKOUT_URLS: Record<string, { monthly: string; yearly: string }> = {
  starter: {
    monthly: 'https://buy.stripe.com/test_5kQ28rgVs32Z6IbgeZ3AY00',
    yearly: 'https://buy.stripe.com/test_00w9ATax45b70jNgeZ3AY02',
  },
  professional: {
    monthly: 'https://buy.stripe.com/test_9B6eVd48GeLH7Mf9QB3AY01',
    yearly: 'https://buy.stripe.com/test_eVq28r34C6fbc2v8Mx3AY03',
  },
};

interface PricingProps {
  onSelectPlanInquiry: (inquiryText: string) => void;
}

/**
 * Animated number counter component that counts up to the target price
 * when triggered by clicking Yearly or switching billing frequencies.
 */
interface CountUpNumberProps {
  target: number;
  triggerKey: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ target, triggerKey }) => {
  const [displayValue, setDisplayValue] = useState<number>(target);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    // Keep initial number static on first mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayValue(target);
      return;
    }

    // Run snappy ease-out countup animation starting from 0
    const startVal = 0;
    const endVal = target;
    const duration = 600; // ms
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quartic ease-out: brisk initial count, smooth deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startVal + (endVal - startVal) * ease);

      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(endVal);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, triggerKey]);

  return <span>{displayValue}</span>;
};

/**
 * Section 7: Pricing Section
 * - Clean section background (bg-[#FAFAFA]) perfectly consistent with Features, Demo, and Testimonials
 * - Count-up animation triggered whenever Yearly / Monthly billing is clicked
 * - Redesigned modern features list with sleek squircle badges, subtle interactive rows, and clean hierarchy
 * - $29 Starter Plan, $99 Pro Plan (RECOMMENDED), and Contact Us Enterprise Plan (themed in brand colors)
 */
export const Pricing: React.FC<PricingProps> = ({ onSelectPlanInquiry }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [toggleCounter, setToggleCounter] = useState<number>(0);

  const handleToggleBilling = (cycle: 'monthly' | 'yearly') => {
    setBillingCycle(cycle);
    setToggleCounter((prev) => prev + 1);
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* HEADER BLOCK: TITLE & BADGE MATCHING FEATURES SECTION        */}
        {/* Centered for md and sm devices only, split left/right on lg */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between items-center lg:items-end gap-5 lg:gap-10 mb-6 sm:mb-8">
          {/* Left Column: Eyebrow Kicker + Display Headline (centered on sm & md, left on lg) */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-2.5 text-center lg:text-left"
            >
              PRICING &amp; PLANS
            </motion.div>

            <motion.h2
              id="pricing-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] text-[#0D0D0D] tracking-tight leading-[1.15] text-center lg:text-left"
            >
              Choose a Plan That Fits Your Growth
            </motion.h2>
          </div>

          {/* Right Column: Lead Description + Billing Toggle (centered on sm & md, right on lg) */}
          <div className="w-full lg:w-auto lg:max-w-md xl:max-w-lg flex flex-col items-center lg:items-end gap-3.5 mx-auto lg:mx-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-normal text-center lg:text-right max-w-md lg:max-w-none"
            >
              Transparent, flexible pricing for individuals, growing finance teams, and multi-entity organizations.
            </motion.p>

            {/* Billing Toggle: Centered on sm and md devices, Right-aligned on lg */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              role="group"
              aria-label="Billing frequency selection"
              className="inline-flex items-center p-1 bg-[#F1F4FD] rounded-full border border-slate-200/60 shadow-2xs w-full sm:w-auto max-w-xs sm:max-w-none justify-center self-center lg:self-end lg:ml-auto"
            >
              <button
                type="button"
                onClick={() => handleToggleBilling('monthly')}
                className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-200 cursor-pointer select-none text-center ${
                  billingCycle === 'monthly'
                    ? 'bg-[#050FD8] text-white shadow-2xs'
                    : 'text-slate-500 hover:text-[#050FD8]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => handleToggleBilling('yearly')}
                className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-200 cursor-pointer select-none flex items-center justify-center gap-1.5 text-center ${
                  billingCycle === 'yearly'
                    ? 'bg-[#050FD8] text-white shadow-2xs'
                    : 'text-slate-500 hover:text-[#050FD8]'
                }`}
              >
                <span>Yearly</span>
                <span
                  className={`text-[9px] font-heading font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-200 ${
                    billingCycle === 'yearly'
                      ? 'bg-[#05F2AD] text-[#050FD8]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* WIDENED & COMPACT PRICING CARDS ($29, $99 RECOMMENDED, CONTACT US) */}
        {/* Centered for sm & md devices with max-w constraint, full width 3-col on lg */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-none mx-auto">
          {PRICING_TIERS.map((tier: PricingTier, index: number) => {
            const isRecommended = tier.featured || tier.badge === 'RECOMMENDED';
            const isContact = tier.id === 'enterprise';
            const currentPrice =
              billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
            const animKey = `${tier.id}-${billingCycle}-${toggleCounter}`;

            return (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden ${
                  isRecommended
                    ? 'bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border-2 border-[#050FD8] shadow-lg shadow-[#050FD8]/10 z-10'
                    : isContact
                    ? 'bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-[#050FD8]/30 shadow-xs'
                    : 'bg-white border border-slate-200/90 shadow-2xs'
                }`}
              >
                {/* Diagonal Highlighted Corner Ribbon for RECOMMENDED Plan */}
                {isRecommended && (
                  <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden pointer-events-none z-20">
                    <div className="absolute top-7 -right-10 w-48 py-1.5 bg-gradient-to-r from-[#050FD8] via-[#076CF2] to-[#050FD8] text-white text-center font-heading font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase shadow-md rotate-45 select-none border-y border-white/25">
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <div>
                  {/* Top Row: Plan Name */}
                  <div className={`flex items-center justify-between gap-3 mb-2 ${isRecommended ? 'pr-14' : ''}`}>
                    <h3
                      className={`font-heading text-lg sm:text-xl font-normal tracking-tight ${
                        isRecommended ? 'text-[#0D0D0D]' : 'text-[#050FD8]'
                      }`}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  {/* Price Row (With CountUp Animation on Toggle) */}
                  <div className="mb-2.5">
                    {isContact ? (
                      <div className="flex items-baseline">
                        <span className="font-heading font-normal text-4xl sm:text-5xl lg:text-[54px] text-[#0D0D0D] tracking-tight leading-none">
                          Contact Us
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline" aria-label={`$${currentPrice} ${tier.period}`}>
                        <span className="font-heading font-light text-2xl sm:text-3xl text-slate-400 mr-1 select-none">
                          $
                        </span>
                        <motion.span
                          key={animKey}
                          initial={{ scale: 0.94, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`font-heading font-normal text-5xl sm:text-6xl lg:text-[62px] tracking-tight leading-none tabular-nums inline-block ${
                            isRecommended ? 'text-[#050FD8]' : 'text-[#0D0D0D]'
                          }`}
                        >
                          <CountUpNumber
                            target={currentPrice}
                            triggerKey={animKey}
                          />
                        </motion.span>
                        <span className="font-body font-normal text-slate-400 text-xs sm:text-sm ml-2">
                          {tier.period}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Audience Subtitle (Concise & Clean) */}
                  <p className="font-body font-normal text-xs text-slate-500 leading-relaxed mb-3.5">
                    {tier.audience}
                  </p>

                  {/* Hairline Divider */}
                  <div className="h-px w-full bg-slate-200/60 mb-3.5" aria-hidden="true" />

                  {/* Redesigned Features Header Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-heading font-medium tracking-[0.14em] uppercase text-slate-400">
                      {isRecommended
                        ? 'Everything in Starter, plus:'
                        : isContact
                        ? 'Everything in Pro, plus:'
                        : 'Features included:'}
                    </span>
                    <span className="text-[10px] font-heading text-slate-400 font-medium">
                      {tier.proposedInclusions.length} included
                    </span>
                  </div>

                  {/* Features List (Clean & Stable, No Hover Animations) */}
                  <ul className="space-y-1.5 mb-6" aria-label={`${tier.name} features`}>
                    {tier.proposedInclusions.map((feature) => {
                      const isAiFeature = feature.toLowerCase().includes('ai financial advisor');
                      const isSlaFeature = feature.toLowerCase().includes('custom sla');

                      return (
                        <li
                          key={feature}
                          className={`flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl ${
                            isRecommended || isContact
                              ? 'bg-white/80 border border-blue-100/60 shadow-[0_1px_2px_rgba(5,15,216,0.04)]'
                              : 'border border-transparent'
                          }`}
                        >
                          {/* Modern Feature Icon Badge with Theme Colors Only */}
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                              isRecommended || isContact
                                ? 'bg-gradient-to-tr from-[#050FD8] to-[#076CF2] text-white shadow-2xs shadow-blue-500/25'
                                : 'bg-[#050FD8]/10 text-[#050FD8] border border-[#050FD8]/20'
                            }`}
                            aria-hidden="true"
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>

                          {/* Feature Description Text */}
                          <span className="font-body text-xs sm:text-[13px] text-slate-700 font-medium leading-snug">
                            {feature}
                          </span>

                          {/* Mini Highlight Pill Badges with Brand Theme Colors */}
                          {isAiFeature && (
                            <span className="ml-auto text-[9px] font-heading font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#05F2AD]/20 text-[#050FD8] border border-[#05F2AD]/50 shrink-0 select-none">
                              AI
                            </span>
                          )}
                          {isSlaFeature && (
                            <span className="ml-auto text-[9px] font-heading font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#EEF2FF] text-[#050FD8] border border-[#050FD8]/30 shrink-0 select-none">
                              SLA
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Bottom Full-Width CTA Action Button (Theme Colors Only) */}
                <div className="pt-1">
                  {isContact ? (
                    <button
                      type="button"
                      onClick={() => onSelectPlanInquiry(tier.inquiryPreselect)}
                      className="w-full py-3.5 px-6 rounded-xs font-heading font-bold text-xs sm:text-[13px] uppercase tracking-widest transition-all duration-200 cursor-pointer select-none text-center hover:scale-[1.02] active:scale-[0.98] bg-[#0D0D0D] hover:bg-[#050FD8] text-white shadow-md shadow-black/20 hover:shadow-lg"
                    >
                      {tier.ctaLabel}
                    </button>
                  ) : (
                    <a
                      href={STRIPE_CHECKOUT_URLS[tier.id]?.[billingCycle]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3.5 px-6 rounded-xs font-heading font-bold text-xs sm:text-[13px] uppercase tracking-widest transition-all duration-200 cursor-pointer select-none text-center hover:scale-[1.02] active:scale-[0.98] ${
                        isRecommended
                          ? 'bg-[#050FD8] hover:bg-[#076CF2] text-white shadow-lg shadow-[#050FD8]/30 hover:shadow-xl hover:shadow-blue-600/35'
                          : 'bg-[#EEF2FF] hover:bg-[#050FD8] text-[#050FD8] hover:text-white border border-[#050FD8]/25 hover:border-[#050FD8] shadow-2xs hover:shadow-md'
                      }`}
                    >
                      {tier.ctaLabel}
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

