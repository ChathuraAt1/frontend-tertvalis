import React from 'react';
import {
  Database,
  TrendingUp,
  GitCompare,
  Scale,
  Wallet,
  Activity,
  FileSpreadsheet,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { PlatformFeature, ScenarioId } from '../data/tertvalisData';

interface FeatureCardProps {
  feature: PlatformFeature;
  featuredSpan?: boolean;
  onInspectInDemo: (scenario: ScenarioId) => void;
}

const ICON_MAP = {
  Database,
  TrendingUp,
  GitCompare,
  Scale,
  Wallet,
  Activity,
  FileSpreadsheet,
  Users,
};

const CATEGORY_LABELS: Record<PlatformFeature['category'], string> = {
  forecasting: 'Forecasting & Scenarios',
  variance: 'Variance & Cash Flow',
  governance: 'Reporting & Governance',
};

/**
 * Reusable FeatureCard component supporting asymmetric Bento grid spans
 * and light-theme gradient surfaces (#050FD8, #076CF2, #05F2AD).
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  featuredSpan = false,
  onInspectInDemo,
}) => {
  const IconComponent = ICON_MAP[feature.iconName];

  return (
    <article
      className={`group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden border ${
        featuredSpan
          ? 'lg:col-span-2 bg-gradient-to-br from-white via-[#F5F8FF] to-[#EEFFF9] border-[#076CF2]/30 hover:border-[#050FD8]'
          : 'bg-white border-slate-200/90 hover:border-[#050FD8]'
      }`}
    >
      {/* Top gradient bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#050FD8] via-[#076CF2] to-[#05F2AD] transition-opacity duration-200 ${
          featuredSpan ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        aria-hidden="true"
      />

      <div>
        {/* Top unboxed metadata row */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-4">
          <span className="font-mono-tabular font-bold text-[#050FD8]">
            {feature.number} · {CATEGORY_LABELS[feature.category]}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {featuredSpan ? 'Core Scenario Capability' : 'Platform Capability'}
          </span>
        </div>

        {/* Icon + Heading */}
        <div className="flex items-start gap-4 mb-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
              featuredSpan
                ? 'bg-gradient-to-br from-[#050FD8] to-[#076CF2] text-white shadow-xs'
                : 'bg-gradient-to-br from-[#050FD8]/10 to-[#076CF2]/10 border border-[#050FD8]/15 text-[#050FD8] group-hover:from-[#050FD8] group-hover:to-[#076CF2] group-hover:text-white group-hover:border-transparent'
            }`}
            aria-hidden="true"
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0D0D0D] leading-snug group-hover:text-[#050FD8] transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm font-semibold text-[#0D0D0D] mt-1">
              {feature.shortSummary}
            </p>
          </div>
        </div>

        {/* Mechanism-to-Outcome explanation */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {feature.mechanismDetail}
        </p>
      </div>

      {/* Interactive footer link to test this capability in the Demo section */}
      <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onInspectInDemo(feature.demoScenarioLink)}
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#050FD8] hover:text-[#076CF2] transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>Inspect in Scenario Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <span
          className="w-6 h-1 rounded-full bg-gradient-to-r from-[#050FD8] to-[#05F2AD] opacity-75 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    </article>
  );
};
