import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  DEMO_SCENARIOS,
  ScenarioId,
  QuarterPoint,
  LineItemVariance,
} from '../data/tertvalisData';
import {
  Sliders,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';

interface DemoProps {
  selectedScenario: ScenarioId;
  onSelectScenario: (scenario: ScenarioId) => void;
  onRequestScenarioConsultation: (scenarioSummary: string) => void;
}

/**
 * Section 6: Interactive Financial Scenario Demo
 * - Compact executive dashboard architecture
 * - Centered header (badge, title, description) without clutter
 * - Redesigned modern dual-bar quarterly trajectory chart with interactive quarter inspection
 * - Live scenario switching and sensitivity sliders with real-time recalculations
 * - Fully responsive for mobile, tablet, and desktop viewports
 */
export const Demo: React.FC<DemoProps> = ({
  selectedScenario,
  onSelectScenario,
  onRequestScenarioConsultation,
}) => {
  const [customRevDeltaPct, setCustomRevDeltaPct] = useState<number>(8);
  const [customOpexDeltaPct, setCustomOpexDeltaPct] = useState<number>(-4);
  const [customDsoDays, setCustomDsoDays] = useState<number>(39);
  const [focusedQuarterIndex, setFocusedQuarterIndex] = useState<number>(3);

  const computedDataset = useMemo(() => {
    if (selectedScenario !== 'custom') {
      return DEMO_SCENARIOS[selectedScenario];
    }

    const base = DEMO_SCENARIOS.base;
    const revMultiplier = 1 + customRevDeltaPct / 100;
    const opexMultiplier = 1 + customOpexDeltaPct / 100;
    const dsoCashImpact = (42 - customDsoDays) * 18000;

    let runningCashDelta = dsoCashImpact;
    const customQuarters: QuarterPoint[] = base.quarters.map((q) => {
      const projectedRevenue = Math.round(q.projectedRevenue * revMultiplier);
      const projectedExpenses = Math.round(q.projectedExpenses * opexMultiplier);
      const projectedProfit = projectedRevenue - projectedExpenses;
      const baseProfit = q.projectedProfit;
      runningCashDelta += projectedProfit - baseProfit;
      const endingCash = Math.max(250000, Math.round(q.endingCash + runningCashDelta));

      return {
        quarter: q.quarter,
        budgetRevenue: q.budgetRevenue,
        projectedRevenue,
        projectedExpenses,
        projectedProfit,
        endingCash,
      };
    });

    const customLineItems: LineItemVariance[] = base.lineItems.map((item) => {
      const mult = item.type === 'revenue' ? revMultiplier : opexMultiplier;
      return {
        ...item,
        projectedAmount: Math.round(item.projectedAmount * mult),
        notes:
          item.type === 'revenue'
            ? `Custom sensitivity (${customRevDeltaPct >= 0 ? '+' : ''}${customRevDeltaPct}% vs. Base)`
            : `Custom expense lever (${customOpexDeltaPct >= 0 ? '+' : ''}${customOpexDeltaPct}% vs. Base)`,
      };
    });

    return {
      id: 'custom' as const,
      name: 'Custom Sensitivity Model',
      tagline: 'User-configured revenue, expense, and collection timing assumptions',
      description:
        'Interactive stress-test scenario calculated directly in your browser from your custom growth, expense, and DSO sliders.',
      assumptionsSummary: {
        revenueGrowthRate: `${(14 + customRevDeltaPct).toFixed(1)}% YoY (Illustrative)`,
        opexAdjustment: `${customOpexDeltaPct >= 0 ? '+' : ''}${customOpexDeltaPct.toFixed(1)}% vs. Base`,
        hiringPace:
          customOpexDeltaPct > 5
            ? 'Expanded hiring'
            : customOpexDeltaPct < -5
            ? 'Frozen non-core roles'
            : 'Moderate pacing',
        collectionCycleDays: customDsoDays,
      },
      quarters: customQuarters,
      lineItems: customLineItems,
    };
  }, [selectedScenario, customRevDeltaPct, customOpexDeltaPct, customDsoDays]);

  const formatCurrency = (usdAmount: number, compact = false): string => {
    if (compact) {
      if (Math.abs(usdAmount) >= 1_000_000_000) {
        return `$${(usdAmount / 1_000_000_000).toFixed(2)}B`;
      }
      if (Math.abs(usdAmount) >= 1_000_000) {
        return `$${(usdAmount / 1_000_000).toFixed(2)}M`;
      }
      if (Math.abs(usdAmount) >= 1_000) {
        return `$${Math.round(usdAmount / 1_000)}k`;
      }
      return `$${Math.round(usdAmount).toLocaleString('en-US')}`;
    }
    return `$${Math.round(usdAmount).toLocaleString('en-US')}`;
  };

  const totals = useMemo(() => {
    const budgetRev = computedDataset.quarters.reduce((s, q) => s + q.budgetRevenue, 0);
    const projRev = computedDataset.quarters.reduce((s, q) => s + q.projectedRevenue, 0);
    const projExp = computedDataset.quarters.reduce((s, q) => s + q.projectedExpenses, 0);
    const projProfit = computedDataset.quarters.reduce((s, q) => s + q.projectedProfit, 0);
    const budgetExp = computedDataset.lineItems
      .filter((i) => i.type === 'expense')
      .reduce((s, i) => s + i.approvedBudget, 0);
    const budgetProfit = budgetRev - budgetExp;
    const endingCash = computedDataset.quarters[3].endingCash;

    const revVarDollar = projRev - budgetRev;
    const revVarPct = (revVarDollar / budgetRev) * 100;
    const expVarDollar = projExp - budgetExp;
    const expVarPct = (expVarDollar / budgetExp) * 100;
    const profitVarDollar = projProfit - budgetProfit;
    const operatingMargin = (projProfit / projRev) * 100;

    return {
      budgetRev,
      projRev,
      projExp,
      projProfit,
      budgetExp,
      budgetProfit,
      endingCash,
      revVarDollar,
      revVarPct,
      expVarDollar,
      expVarPct,
      profitVarDollar,
      operatingMargin,
    };
  }, [computedDataset]);

  const focusedQuarter =
    computedDataset.quarters[focusedQuarterIndex] || computedDataset.quarters[3];

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* CENTERED HEADER BLOCK: BADGE, TITLE & CONCISE DESCRIPTION     */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto text-center mb-5 sm:mb-7">
          {/* Centered Eyebrow Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-2"
          >
            INTERACTIVE DEMO
          </motion.div>

          {/* Centered Display Headline */}
          <motion.h2
            id="demo-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15] mb-3 sm:mb-3.5"
          >
            Explore Financial Scenarios in Action
          </motion.h2>

          {/* Centered Lead Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="font-body text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto px-2 sm:px-0"
          >
            Switch scenarios or adjust sensitivity levers to stress-test your revenue, expenses, and cash runway in real time.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* COMPACT WORKSPACE DASHBOARD CANVAS                          */}
        {/* ============================================================ */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm p-3.5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
            {/* ========================================================== */}
            {/* LEFT COLUMN: SCENARIO SELECTOR + SENSITIVITY LEVERS (4 COL) */}
            {/* ========================================================== */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5">
              {/* 1. Scenario Selector Tabs */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-heading font-medium text-slate-400 uppercase tracking-[0.16em]">
                    1. Scenario Model
                  </span>
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#050FD8] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                    {computedDataset.id.toUpperCase()}
                  </span>
                </div>

                <div
                  role="tablist"
                  aria-label="Select financial scenario"
                  className="grid grid-cols-2 gap-1.5 sm:gap-2"
                >
                  {(
                    [
                      { id: 'base', label: 'Base Case' },
                      { id: 'growth', label: 'Growth Case' },
                      { id: 'cost', label: 'Cost Reduction' },
                      { id: 'custom', label: 'Custom Levers' },
                    ] as { id: ScenarioId; label: string }[]
                  ).map((tab) => {
                    const isSelected = selectedScenario === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => onSelectScenario(tab.id)}
                        className={`px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-heading font-medium rounded-xl border transition-all cursor-pointer text-center truncate ${
                          isSelected
                            ? 'bg-gradient-to-tr from-[#050FD8] to-[#076CF2] text-white border-transparent shadow-xs shadow-blue-500/25'
                            : 'bg-slate-50/70 border-slate-200/70 text-slate-600 hover:bg-white hover:border-[#050FD8]/40 hover:text-[#050FD8]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Scenario Description Pill */}
                <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/70">
                  <p className="text-[11px] sm:text-xs text-slate-600 font-body leading-relaxed">
                    <strong className="font-heading font-medium text-[#050FD8] block mb-0.5">
                      {computedDataset.name}
                    </strong>
                    {computedDataset.tagline}
                  </p>
                </div>
              </div>

              {/* 2. Compact Sensitivity Levers */}
              <div className="p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-2xs space-y-3 sm:space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#050FD8]/10 text-[#050FD8] flex items-center justify-center">
                      <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xs font-medium text-[#0D0D0D] uppercase tracking-wider">
                      2. Sensitivity Levers
                    </h3>
                  </div>
                  <span className="text-[10px] font-heading uppercase tracking-wider font-semibold text-[#050FD8] bg-[#050FD8]/10 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>

                {/* Slider 1: Revenue Volume */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-body">
                    <label htmlFor="slider-rev-delta" className="text-slate-700 font-normal">
                      Revenue Volume
                    </label>
                    <span className="font-heading font-medium text-[#050FD8] tabular-nums">
                      {customRevDeltaPct >= 0 ? `+${customRevDeltaPct}%` : `${customRevDeltaPct}%`}
                    </span>
                  </div>
                  <input
                    id="slider-rev-delta"
                    type="range"
                    min={-15}
                    max={30}
                    step={1}
                    value={customRevDeltaPct}
                    onChange={(e) => {
                      setCustomRevDeltaPct(Number(e.target.value));
                      if (selectedScenario !== 'custom') onSelectScenario('custom');
                    }}
                    className="w-full accent-[#050FD8] cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>

                {/* Slider 2: Operating Expense */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-body">
                    <label htmlFor="slider-opex-delta" className="text-slate-700 font-normal">
                      Operating Expense
                    </label>
                    <span className="font-heading font-medium text-[#050FD8] tabular-nums">
                      {customOpexDeltaPct >= 0 ? `+${customOpexDeltaPct}%` : `${customOpexDeltaPct}%`}
                    </span>
                  </div>
                  <input
                    id="slider-opex-delta"
                    type="range"
                    min={-20}
                    max={25}
                    step={1}
                    value={customOpexDeltaPct}
                    onChange={(e) => {
                      setCustomOpexDeltaPct(Number(e.target.value));
                      if (selectedScenario !== 'custom') onSelectScenario('custom');
                    }}
                    className="w-full accent-[#050FD8] cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>

                {/* Slider 3: Receivables DSO */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1 font-body">
                    <label htmlFor="slider-dso-days" className="text-slate-700 font-normal">
                      Receivables DSO Cycle
                    </label>
                    <span className="font-heading font-medium text-[#050FD8] tabular-nums">
                      {customDsoDays} Days
                    </span>
                  </div>
                  <input
                    id="slider-dso-days"
                    type="range"
                    min={25}
                    max={65}
                    step={1}
                    value={customDsoDays}
                    onChange={(e) => {
                      setCustomDsoDays(Number(e.target.value));
                      if (selectedScenario !== 'custom') onSelectScenario('custom');
                    }}
                    className="w-full accent-[#050FD8] cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* RIGHT COLUMN: 4 KPIS + REDESIGNED MODERN BAR CHART (8 COL) */}
            {/* ========================================================== */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-4 sm:gap-5">
              {/* 4 Compact KPI Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {/* Metric 1 */}
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-2xs hover:shadow-sm transition-all">
                  <div className="text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider text-slate-400 truncate">
                    Annual Revenue
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-base sm:text-xl font-heading font-medium text-[#0D0D0D] tabular-nums tracking-tight truncate">
                    {formatCurrency(totals.projRev, true)}
                  </div>
                  <div className="mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-heading font-medium text-[#050FD8]">
                    {totals.revVarDollar >= 0 ? (
                      <ArrowUpRight className="w-3 h-3 text-[#050FD8] shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-amber-600 shrink-0" aria-hidden="true" />
                    )}
                    <span>
                      {totals.revVarPct >= 0 ? `+${totals.revVarPct.toFixed(1)}%` : `${totals.revVarPct.toFixed(1)}%`}
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-2xs hover:shadow-sm transition-all">
                  <div className="text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider text-slate-400 truncate">
                    Operating Expenses
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-base sm:text-xl font-heading font-medium text-[#0D0D0D] tabular-nums tracking-tight truncate">
                    {formatCurrency(totals.projExp, true)}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-heading font-medium text-[#076CF2] truncate">
                    {totals.expVarPct >= 0 ? `+${totals.expVarPct.toFixed(1)}%` : `${totals.expVarPct.toFixed(1)}%`}
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-2xs hover:shadow-sm transition-all">
                  <div className="text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider text-slate-400 truncate">
                    Operating Profit
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-base sm:text-xl font-heading font-medium text-[#0D0D0D] tabular-nums tracking-tight truncate">
                    {formatCurrency(totals.projProfit, true)}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-heading font-medium text-[#050FD8] truncate">
                    {totals.operatingMargin.toFixed(1)}% Margin
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F9FBFF] to-[#EDF4FF] border border-blue-100/80 shadow-2xs hover:shadow-sm transition-all">
                  <div className="text-[10px] sm:text-[11px] font-heading font-medium uppercase tracking-wider text-slate-400 truncate">
                    Q4 Ending Cash
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-base sm:text-xl font-heading font-medium text-[#0D0D0D] tabular-nums tracking-tight truncate">
                    {formatCurrency(totals.endingCash, true)}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-heading font-medium text-slate-500 truncate">
                    {computedDataset.assumptionsSummary.collectionCycleDays}d DSO
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* REDESIGNED MODERN BAR CHART CARD                         */}
              {/* ======================================================== */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white to-[#F8FAFF] border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                {/* Chart Header & Legend */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 sm:mb-4">
                  <div className="flex items-start sm:items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#050FD8]/10 text-[#050FD8] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xs sm:text-sm font-medium text-[#0D0D0D] tracking-tight">
                        Quarterly Revenue &amp; Expense Performance
                      </h3>
                      <p className="font-body text-[10px] sm:text-[11px] text-slate-400">
                        Tap any quarter bar to inspect detailed breakdown
                      </p>
                    </div>
                  </div>

                  {/* Modern Chart Legend */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-body text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#050FD8] to-[#076CF2]" />
                      <span className="text-[11px]">Revenue</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="text-[11px]">Expenses</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#05F2AD] border border-emerald-400/60" />
                      <span className="text-[11px]">Net Profit</span>
                    </span>
                  </div>
                </div>

                {/* Modern Visual Bar Chart Container */}
                <div className="relative w-full bg-white rounded-xl border border-slate-100 p-2.5 sm:p-5">
                  {/* Background Hairline Gridlines */}
                  <div className="absolute inset-x-2.5 sm:inset-x-5 inset-y-4 sm:inset-y-5 flex flex-col justify-between pointer-events-none">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full border-b border-slate-100" />
                    ))}
                  </div>

                  {/* 4 Quarter Bar Groups Grid */}
                  <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-4 lg:gap-6 pt-3 sm:pt-4 pb-1 sm:pb-2 items-end h-48 sm:h-56">
                    {computedDataset.quarters.map((q, idx) => {
                      const isFocused = focusedQuarterIndex === idx;
                      const maxVal = 2100000;
                      const revPct = Math.min(100, Math.max(15, (q.projectedRevenue / maxVal) * 100));
                      const expPct = Math.min(100, Math.max(12, (q.projectedExpenses / maxVal) * 100));

                      return (
                        <div
                          key={q.quarter}
                          onClick={() => setFocusedQuarterIndex(idx)}
                          className={`flex flex-col items-center justify-end h-full p-0.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 cursor-pointer group ${
                            isFocused
                              ? 'bg-[#F1F4FD]/80 ring-1 ring-[#050FD8]/30 shadow-2xs'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          {/* Floating Profit Pill Badge Above Active / Hovered Bar */}
                          <div
                            className={`mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] font-heading font-semibold transition-all px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${
                              isFocused
                                ? 'bg-[#05F2AD] text-[#050FD8] shadow-2xs scale-105'
                                : 'text-slate-400 group-hover:text-[#050FD8] group-hover:bg-[#EEF2FF]'
                            }`}
                          >
                            +${Math.round(q.projectedProfit / 1000)}k
                          </div>

                          {/* Dual Bars: Revenue & Expense */}
                          <div className="w-full flex items-end justify-center gap-1 sm:gap-2.5 h-32 sm:h-36">
                            {/* Revenue Bar */}
                            <div className="w-2.5 xs:w-3 sm:w-5 h-full flex items-end">
                              <div
                                style={{ height: `${revPct}%` }}
                                className={`w-full rounded-t-sm sm:rounded-t-lg transition-[height,background-color,box-shadow] ${
                                  selectedScenario === 'custom' ? 'duration-75 ease-out' : 'duration-200 ease-out'
                                } ${
                                  isFocused
                                    ? 'bg-gradient-to-t from-[#050FD8] to-[#076CF2] shadow-sm shadow-blue-600/30 ring-1 ring-blue-400/40'
                                    : 'bg-gradient-to-t from-[#050FD8] to-[#076CF2] group-hover:brightness-110'
                                }`}
                              />
                            </div>

                            {/* Expense Bar */}
                            <div className="w-2.5 xs:w-3 sm:w-5 h-full flex items-end">
                              <div
                                style={{ height: `${expPct}%` }}
                                className={`w-full rounded-t-sm sm:rounded-t-lg transition-[height,background-color,box-shadow] ${
                                  selectedScenario === 'custom' ? 'duration-75 ease-out' : 'duration-200 ease-out'
                                } ${
                                  isFocused
                                    ? 'bg-slate-400 ring-1 ring-slate-300'
                                    : 'bg-slate-200 group-hover:bg-slate-300'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Quarter Label Button Pill */}
                          <div
                            className={`mt-1.5 sm:mt-2 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-heading transition-all ${
                              isFocused
                                ? 'bg-[#050FD8] text-white font-medium shadow-2xs'
                                : 'text-slate-600 group-hover:text-[#050FD8]'
                            }`}
                          >
                            {q.quarter}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Focused Quarter Inspection Ribbon (Fully Responsive Grid on Mobile, Flex on SM+) */}
                <div className="mt-3 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-body">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-medium text-[#050FD8] bg-[#EEF2FF] px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] shrink-0">
                        {focusedQuarter.quarter} Snapshot
                      </span>
                      <span className="text-[11px] text-slate-400 hidden xs:inline">
                        Quarterly metrics
                      </span>
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-4 sm:flex sm:items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs">
                      <div className="bg-slate-50 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md sm:rounded-none flex items-center justify-between sm:justify-start gap-1">
                        <span className="text-slate-400">Rev:</span>
                        <strong className="font-heading font-medium text-[#0D0D0D]">
                          {formatCurrency(focusedQuarter.projectedRevenue, true)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md sm:rounded-none flex items-center justify-between sm:justify-start gap-1">
                        <span className="text-slate-400">Exp:</span>
                        <strong className="font-heading font-medium text-slate-700">
                          {formatCurrency(focusedQuarter.projectedExpenses, true)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md sm:rounded-none flex items-center justify-between sm:justify-start gap-1">
                        <span className="text-slate-400">Profit:</span>
                        <strong className="font-heading font-medium text-[#050FD8]">
                          +{formatCurrency(focusedQuarter.projectedProfit, true)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 sm:bg-transparent px-2 py-1 sm:p-0 rounded-md sm:rounded-none flex items-center justify-between sm:justify-start gap-1">
                        <span className="text-slate-400">Cash:</span>
                        <strong className="font-heading font-medium text-slate-800">
                          {formatCurrency(focusedQuarter.endingCash, true)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


