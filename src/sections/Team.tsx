import React from 'react';
import { motion } from 'motion/react';
import kavinethraImg from '../assets/team/kavinethra.jpg';
import christopherImg from '../assets/team/christopher.jpg';
import elenaImg from '../assets/team/elena.jpg';
import samuelImg from '../assets/team/samuel.jpg';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  isFounder?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'kavinethra',
    name: 'Kavinethra Thamilchelvi',
    role: 'Founder & Chief Executive Officer',
    bio: 'Pioneered Tertvalis to transform corporate financial planning and scenario intelligence through structured analytical models.',
    image: kavinethraImg,
    isFounder: true,
  },
  {
    id: 'christopher',
    name: 'Arthur Bennett ',
    role: 'Chief Technology Officer',
    bio: 'Directs the core mathematical simulation engine, real-time stress test algorithms, and high-integrity financial data pipeline.',
    image: christopherImg,
  },
  {
    id: 'elena',
    name: 'Eleanoa Foster',
    role: 'Head of Financial Modeling',
    bio: 'Oversees analytical variance frameworks, corporate baseline governance, and multi-entity forecasting methodologies.',
    image: elenaImg,
  },
  {
    id: 'marcus',
    name: 'Samuel Brooks',
    role: 'VP of Enterprise Strategy',
    bio: 'Spearheads executive visualization workflows, strategic scenario consultation, and board-ready planning solutions.',
    image: samuelImg,
  },
];

/**
 * Section: Leadership & Teams Section
 * - Placed immediately after FAQ and before Contact
 * - Centered eyebrow kicker badge, centered headline, and centered description
 * - Big, prominent portrait image cards with a clean modern aesthetic
 * - No floating occupation badges on images
 * - No hover animations or zoom effects (clean, stable presentation)
 * - 4 executive members with Kavinethra Thamilchelvi as Founder & CEO in the first position
 * - Brand theme colors (#050FD8, #076CF2, #05F2AD) and typography (font-heading & font-body)
 */
export const Team: React.FC = () => {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Subtle Ambient Decorative Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#050FD8]/4 via-[#076CF2]/4 to-[#05F2AD]/4 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* CENTERED HEADER BLOCK: BADGE, HEADLINE & DESCRIPTION          */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          {/* Eyebrow Kicker matching Testimonials, Demo, About & FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-2 sm:mb-2.5"
          >
            OUR TEAM
          </motion.div>

          {/* Centered Display Headline */}
          <motion.h2
            id="team-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15] mb-3 sm:mb-4"
          >
            The Team Behind Tertvalis
          </motion.h2>

          {/* Centered Lead Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            A dedicated team combining financial engineering, high-performance simulation algorithms, and enterprise strategy to empower confident capital decisions.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* 4-COLUMN TEAM CARDS GRID (CLEAN & STABLE, NO HOVER ANIMATIONS) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className={`rounded-3xl p-3 sm:p-3.5 border flex flex-col ${
                member.isFounder
                  ? 'bg-gradient-to-b from-white via-white to-[#EEF2FF]/40 border-[#050FD8]/30 shadow-[0_4px_24px_rgba(5,15,216,0.06)]'
                  : 'bg-gradient-to-b from-white via-white to-[#F8FAFD] border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
              }`}
            >
              {/* Big, High-Impact Portrait Image Container without Badge Overlay */}
              <div className="relative aspect-[4/4.3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 mb-3.5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Text & Content Block */}
              <div className="px-1.5 pb-1 flex flex-col flex-1">
                {/* Member Name */}
                <h3 className="font-heading font-medium text-slate-900 text-lg leading-snug mb-0.5">
                  {member.name}
                </h3>

                {/* Member Role */}
                <p className="font-heading text-xs font-semibold text-[#050FD8] tracking-wide mb-2">
                  {member.role}
                </p>

                {/* Bio Description */}
                <p className="font-body text-xs text-slate-500 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
