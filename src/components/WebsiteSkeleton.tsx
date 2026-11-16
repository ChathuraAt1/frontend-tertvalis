import React from 'react';
import { motion } from 'motion/react';

/**
 * Premium Website Skeleton Screen
 * 1. Single Viewport without scrollbar (overflow-hidden) to eliminate duplicate scrollbar
 * 2. Simple, clean, unnested button skeletons
 * 3. Logo shimmer skeleton placeholder matching the tertvalis. wordmark
 * 4. 1:1 match with Header and full-bleed Hero layout
 */
export const WebsiteSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      className="fixed inset-0 z-[9999] bg-[#060B18] overflow-hidden select-none pointer-events-none h-screen h-[100dvh] flex flex-col justify-between"
      aria-label="Loading Tertvalis Financial Intelligence"
      role="status"
      aria-busy="true"
    >
      {/* ============================================================ */}
      {/* 1. TOP INDETERMINATE BRAND GRADIENT PROGRESS BAR            */}
      {/* ============================================================ */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900/40 z-50 overflow-hidden pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#050FD8] via-[#076CF2] to-[#05F2AD] animate-top-loader shadow-[0_0_10px_#076CF2]" />
      </div>

      {/* ============================================================ */}
      {/* 2. FROSTED NAVIGATION HEADER SKELETON                        */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-xs pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-17 flex items-center justify-between">
          {/* Left Zone: Logo Skeleton + Navigation Skeletons */}
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-12">
            {/* Logo Skeleton */}
            <div className="flex items-center">
              <div className="h-10 w-28 sm:w-32 rounded-lg skeleton-shimmer" />
            </div>

            {/* Desktop Navigation Links Skeletons */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <div className="h-4 w-12 rounded-full skeleton-shimmer" />
              <div className="h-4 w-14 rounded-full skeleton-shimmer" />
              <div className="h-4 w-16 rounded-full skeleton-shimmer" />
              <div className="h-4 w-14 rounded-full skeleton-shimmer" />
              <div className="h-4 w-16 rounded-full skeleton-shimmer" />
            </nav>
          </div>

          {/* Right Zone: Simple Button Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-32 sm:w-36 rounded-xs skeleton-shimmer" />
            {/* Mobile hamburger placeholder on small screens */}
            <div className="lg:hidden h-9 w-9 rounded-md skeleton-shimmer" />
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 3. FULL-BLEED HERO SECTION SKELETON                          */}
      {/* ============================================================ */}
      <section className="relative w-full h-full flex-1 flex flex-col justify-end pb-10 sm:pb-12 lg:pb-14 pt-24 sm:pt-28 isolate overflow-hidden">
        {/* Soft Ambient Glows & Grid Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Hardware-accelerated ambient radial glows */}
          <div className="absolute -top-20 -right-20 w-[450px] h-[450px] bg-[#076CF2]/20 rounded-full blur-[80px] transform-gpu pointer-events-none" />
          <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#050FD8]/25 rounded-full blur-[90px] transform-gpu pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-[#05F2AD]/12 rounded-full blur-[70px] transform-gpu pointer-events-none" />

          {/* Dark bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Bottom-Aligned Content Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Column (8 cols): Eyebrow + Large Display Headline */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              {/* Eyebrow Kicker Skeleton */}
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#05F2AD]/80 skeleton-shimmer-dark" />
                <div className="h-3.5 w-48 sm:w-60 rounded bg-white/30 skeleton-shimmer-dark" />
              </div>

              {/* Large Display Headline Silhouette */}
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-full sm:w-11/12 rounded-lg bg-white/35 skeleton-shimmer-dark mb-3 sm:mb-4" />
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 w-3/4 sm:w-2/3 rounded-lg bg-white/25 skeleton-shimmer-dark" />
            </div>

            {/* Right Column (4 cols): Proposition Text + Simple White Button */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:pb-1">
              {/* Executive Proposition Lines */}
              <div className="h-3.5 w-full rounded bg-white/25 skeleton-shimmer-dark mb-2.5" />
              <div className="h-3.5 w-11/12 rounded bg-white/25 skeleton-shimmer-dark mb-2.5" />
              <div className="h-3.5 w-4/5 rounded bg-white/20 skeleton-shimmer-dark mb-6 sm:mb-7" />

              {/* Simple CTA Action Button Skeleton */}
              <div className="w-full sm:w-auto">
                <div className="h-12 w-full sm:w-48 rounded-xs skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
