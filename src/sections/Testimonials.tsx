import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarImg?: string;
  isGreenAvatar?: boolean;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'The multi-scenario modeling was truly exceptional. Comparing Base, Growth, and Cost cases side-by-side gave our executive team complete confidence before committing capital.',
    author: 'Emily Carter',
    role: 'VP of Finance, Enterprise Tech',
    initials: 'EC',
    avatarImg: '/Emily Carter.png',
  },
  {
    id: 't-2',
    quote:
      'The team here is amazing! From baseline data structuring to ongoing reviews, Tertvalis gives us clear visibility into cash runway and budget variances in real time.',
    author: 'Daniel Young',
    role: 'Chief Financial Officer, Logistics Corp',
    initials: 'DY',
    avatarImg: '/Daniel Young.png',
  },
  {
    id: 't-3',
    quote:
      'My experience has been wonderful. The scenario intelligence platform is intuitive, well-organized, and keeps our entire leadership aligned during board presentations.',
    author: 'Michelle Sutton',
    role: 'Head of Strategic FP&A, FinTech Growth',
    initials: 'MS',
    avatarImg: '/Michelle Sutton.png',
  },
  {
    id: 't-4',
    quote:
      'Stress-testing revenue projections and DSO cycles within seconds helped us navigate market volatility. We identified cost deviations before they ever impacted quarterly margins.',
    author: 'James Wilson',
    role: 'Financial Controller, Apex Global',
    initials: 'JW',
    avatarImg: '/David Chen.png',
  },
  {
    id: 't-5',
    quote:
      'Scenario planning used to take our analysts over 40 hours. With Tertvalis, we simulate alternative growth trajectories live and make informed strategic decisions immediately.',
    author: 'Olivia Bennett',
    role: 'VP Corporate Development, Horizon Dynamics',
    initials: 'OB',
    avatarImg: '/Sarah Jenkins.png',
  },
  {
    id: 't-6',
    quote:
      'The clarity of side-by-side revenue and expense trajectory charts revolutionized our budget approvals. I highly recommend Tertvalis for board-ready financial intelligence.',
    author: 'Rachel Hayes',
    role: 'Director of Strategic Planning, Vantage Capital',
    initials: 'RH',
    avatarImg: '/Robert Miller.png',
  },
];

/**
 * Section 8: Testimonials Section
 * - Compact carousel layout matching the reference design:
 *   - 3 clean white cards side-by-side on desktop, 2 on tablet, 1 on mobile
 *   - Stylized double-quote glyph in theme electric blue (#076CF2)
 *   - Concise, punchy testimonial text with comfortable line-height and font-body
 *   - Author profile with initials/user avatar in theme colors (#EEF2FF / #05F2AD)
 *   - Left and right circular chevron navigation buttons (< and >)
 *   - Bottom pagination indicators with elongated active pill in theme mint (#05F2AD)
 * - Brand Theme Colors (#050FD8, #076CF2, #05F2AD) and Typography (font-heading & font-body)
 */
export const Testimonials: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS_DATA.length - itemsPerPage);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* CENTERED HEADER BLOCK: BADGE, HEADLINE & DESCRIPTION          */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto text-center mb-5 sm:mb-7">
          {/* Eyebrow Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-2"
          >
            TESTIMONIALS
          </motion.div>

          {/* Display Headline */}
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15] mb-3 sm:mb-3.5"
          >
            Trusted by Finance Leaders Everywhere
          </motion.h2>

          {/* Lead Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            See how CFOs, finance directors, and controllers use Tertvalis to structure financial data, model multi-quarter forecasts, and present board-ready scenarios.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* CAROUSEL WRAPPER WITH CIRCULAR CHEVRON BUTTONS               */}
        {/* ============================================================ */}
        <div className="relative max-w-[1340px] mx-auto px-2 sm:px-8 lg:px-12">
          {/* Left Navigation Chevron Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="absolute -left-1 sm:left-0 lg:-left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-xl flex items-center justify-center text-[#050FD8] hover:bg-[#050FD8] hover:text-white hover:border-[#050FD8] transition-all cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Carousel Viewport Container */}
          <div
            className="overflow-hidden py-2 sm:py-3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {TESTIMONIALS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 px-2 sm:px-3 lg:px-3.5"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="relative overflow-hidden h-full bg-gradient-to-b from-white via-white to-[#F8FAFD] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                    {/* Clean Top-Right Concentric Arcs (matching user sketch) */}
                    <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none select-none overflow-hidden z-0">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Outer Arc Curve */}
                        <circle
                          cx="100"
                          cy="0"
                          r="78"
                          stroke="#050FD8"
                          strokeOpacity="0.12"
                          strokeWidth="1.5"
                        />

                        {/* Inner Arc Curve */}
                        <circle
                          cx="100"
                          cy="0"
                          r="52"
                          stroke="#050FD8"
                          strokeOpacity="0.18"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      {/* Stylized Double Quotation Glyph */}
                      <div className="mb-3 sm:mb-3.5">
                        <svg
                          className="w-8 h-8 sm:w-9 sm:h-9 text-[#076CF2]/75"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                      </div>

                      {/* Quoted Testimonial Content */}
                      <p className="font-body text-slate-700 sm:text-slate-800 text-[13.5px] sm:text-[14.5px] leading-relaxed font-normal">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Author Attribution Area */}
                    <div className="relative z-10 flex items-center gap-3 sm:gap-3.5 mt-5 sm:mt-6 pt-2 border-t border-slate-100">
                      {item.avatarImg ? (
                        <img
                          src={item.avatarImg}
                          alt={item.author}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border border-slate-200/80 shadow-2xs"
                          loading="lazy"
                        />
                      ) : item.isGreenAvatar ? (
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#05F2AD] to-[#00DDA2] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#05F2AD]/30">
                          <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#EEF2FF] to-[#E0E9FF] text-[#050FD8] border border-blue-200/70 flex items-center justify-center shrink-0 font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-2xs">
                          {item.initials}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="font-heading font-semibold text-[#0D0D0D] text-sm sm:text-[15px] leading-tight truncate">
                          {item.author}
                        </h4>
                        <p className="font-body text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5 truncate">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Chevron Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonials"
            className="absolute -right-1 sm:right-0 lg:-right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-xl flex items-center justify-center text-[#050FD8] hover:bg-[#050FD8] hover:text-white hover:border-[#050FD8] transition-all cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM PAGINATION INDICATORS (ELONGATED ACTIVE PILL)          */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-[#05F2AD] shadow-xs'
                    : 'w-3 sm:w-3.5 h-2 sm:h-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

