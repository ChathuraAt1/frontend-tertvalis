// Official Company Information and Structured Content for Tertvalis
// Note: No offices, certifications, awards, customer names, or prices are fabricated.

export interface CompanyOffice {
  country: string;
  legalEntity: string;
  address: string;
  phone: string;
  phoneVerificationNote?: string;
  mapLinkUrl: string;
  coordinatesLabel: string;
}

export const COMPANY_INFO = {
  brandName: 'Tertvalis',
  sriLankaLegalName: 'Tertvalis (Pvt) Ltd',
  usLegalName: 'Tertvalis Inc.',
  founder: 'Kavinethra Thamilchelvi',
  foundedDate: '14 May 2024',
  websiteUrl: 'https://tertvalis.net',
  domainDisplay: 'tertvalis.net',
  tagline: 'Financial Forecasting & Scenario Intelligence',
  socialProfiles: {
    crunchbase: 'https://www.crunchbase.com/organization/tertvalis',
    f6s: 'https://www.f6s.com/company/tertvalis',
    medium: 'https://medium.com/@tertvalis',
    pinterest: 'https://pinterest.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  offices: {
    sriLanka: {
      country: 'Sri Lanka',
      legalEntity: 'Tertvalis (Pvt) Ltd',
      address: 'No. 71, New Kandy Road, Malabe, Sri Lanka',
      phone: '+94 76 940 5569',
      phoneVerificationNote: 'Supplied Sri Lanka contact number (subject to company verification)',
      mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=No.+71+New+Kandy+Road+Malabe+Sri+Lanka',
      coordinatesLabel: 'Malabe Commercial Corridor · Western Province, Sri Lanka',
    } as CompanyOffice,
    unitedStates: {
      country: 'United States',
      legalEntity: 'Tertvalis Inc.',
      address: 'Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA',
      phone: '+1 213-555-0142',
      phoneVerificationNote:
        'Important Notice: +1 213-555-0142 uses a standard North American 555 placeholder exchange and requires company confirmation before live publication.',
      mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=600+Wilshire+Boulevard+Suite+715+Los+Angeles+CA+90017',
      coordinatesLabel: 'Downtown Financial District · Wilshire Blvd, Los Angeles, CA',
    } as CompanyOffice,
  },
};

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  {
    number: '01',
    title: 'Clear Financial Visibility',
    description:
      'Consolidate historical performance, active budgets, and forward-looking planning assumptions into one structured view.',
    detail: 'Replaces disconnected spreadsheet tabs with consistent period definitions and transparent line-item hierarchy.',
  },
  {
    number: '02',
    title: 'Flexible Scenario Planning',
    description:
      'Model alternative revenue trajectories, hiring plans, and cost structures side by side without overwriting baseline budgets.',
    detail: 'Compare Base Case, Growth Case, and Cost Reduction assumptions across quarterly horizons.',
  },
  {
    number: '03',
    title: 'Informed Business Decisions',
    description:
      'Evaluate how strategic choices affect operating margins, budget variances, and projected cash balances before committing capital.',
    detail: 'Supports structured leadership reviews with clear assumption documentation.',
  },
];

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  keyInputs: string[];
  outputDeliverable: string;
}

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Organize Your Data',
    subtitle: 'Structure periods, actuals, and baseline assumptions',
    description:
      'Align financial records, fiscal planning periods, historical performance, approved budgets, and core operational assumptions into a structured analytical baseline.',
    keyInputs: [
      'Chart of accounts & revenue streams',
      'Historical actuals & approved period budgets',
      'Headcount, pricing, and operating cost drivers',
    ],
    outputDeliverable: 'Structured Financial Baseline Model',
  },
  {
    stepNumber: '02',
    title: 'Build and Compare Scenarios',
    subtitle: 'Test alternative assumptions across key drivers',
    description:
      'Explore alternative assumptions—such as demand shifts, expansion investments, or expense adjustments—and compare possible revenue, expense, profit, and cash flow outcomes.',
    keyInputs: [
      'Base Case, Growth Case & Cost Reduction levers',
      'Sensitivity adjustments on revenue & opex',
      'Working capital & collection timing assumptions',
    ],
    outputDeliverable: 'Multi-Scenario Comparison Matrix',
  },
  {
    stepNumber: '03',
    title: 'Review and Plan Ahead',
    subtitle: 'Examine budget variances and guide decisions',
    description:
      'Examine projected results, understand line-item differences from approved budgets, and use clear comparative analysis to support executive planning decisions.',
    keyInputs: [
      'Forecast-versus-budget variance breakdowns',
      'Quarterly cash reserve & margin trajectories',
      'Documented decision assumptions for stakeholders',
    ],
    outputDeliverable: 'Decision-Ready Financial Review Pack',
  },
];

export type FeatureCategory = 'all' | 'forecasting' | 'variance' | 'governance';

export interface PlatformFeature {
  id: string;
  number: string;
  title: string;
  shortSummary: string;
  mechanismDetail: string;
  category: Exclude<FeatureCategory, 'all'>;
  demoScenarioLink: 'base' | 'growth' | 'cost' | 'custom';
  iconName:
    | 'Database'
    | 'TrendingUp'
    | 'GitCompare'
    | 'Scale'
    | 'Wallet'
    | 'Activity'
    | 'FileSpreadsheet'
    | 'Users';
}

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 'financial-data-management',
    number: '01',
    title: 'Financial Data Management',
    shortSummary: 'Organize financial records and planning inputs.',
    mechanismDetail:
      'Structure revenue categories, cost centers, historical periods, and baseline driver assumptions in a clean, auditable hierarchy.',
    category: 'governance',
    demoScenarioLink: 'base',
    iconName: 'Database',
  },
  {
    id: 'financial-forecasting',
    number: '02',
    title: 'Financial Forecasting',
    shortSummary: 'Explore projected financial performance over selected periods.',
    mechanismDetail:
      'Generate rolling quarterly projections for revenue, operating expenses, and net operating income based on explicit growth drivers.',
    category: 'forecasting',
    demoScenarioLink: 'growth',
    iconName: 'TrendingUp',
  },
  {
    id: 'scenario-planning',
    number: '03',
    title: 'Scenario Planning',
    shortSummary: 'Compare alternative assumptions and business decisions.',
    mechanismDetail:
      'Evaluate Base Case, Growth Case, and Cost Reduction models in parallel to understand upside potential and downside protection.',
    category: 'forecasting',
    demoScenarioLink: 'custom',
    iconName: 'GitCompare',
  },
  {
    id: 'budget-variance-analysis',
    number: '04',
    title: 'Budget Variance Analysis',
    shortSummary: 'Review the differences between budgets, actuals, and projections.',
    mechanismDetail:
      'Pinpoint dollar and percentage variances across every major account line so finance teams can explain deviations early.',
    category: 'variance',
    demoScenarioLink: 'base',
    iconName: 'Scale',
  },
  {
    id: 'cash-flow-planning',
    number: '05',
    title: 'Cash Flow Planning',
    shortSummary: 'Examine expected cash inflows, outflows, and balances.',
    mechanismDetail:
      'Track quarterly cash generation, operating burn adjustments, and ending cash reserve balances across varying collection cycles.',
    category: 'variance',
    demoScenarioLink: 'cost',
    iconName: 'Wallet',
  },
  {
    id: 'kpi-monitoring',
    number: '06',
    title: 'KPI Monitoring',
    shortSummary: 'Present important financial and operational indicators.',
    mechanismDetail:
      'Monitor operating margin, expense-to-revenue ratios, net cash flow conversion, and budget adherence in one view.',
    category: 'variance',
    demoScenarioLink: 'growth',
    iconName: 'Activity',
  },
];

export type ScenarioId = 'base' | 'growth' | 'cost' | 'custom';

export interface QuarterPoint {
  quarter: string;
  budgetRevenue: number;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedProfit: number;
  endingCash: number;
}

export interface LineItemVariance {
  category: string;
  type: 'revenue' | 'expense' | 'summary';
  approvedBudget: number;
  projectedAmount: number;
  notes: string;
}

export interface ScenarioDataset {
  id: ScenarioId;
  name: string;
  tagline: string;
  description: string;
  assumptionsSummary: {
    revenueGrowthRate: string;
    opexAdjustment: string;
    hiringPace: string;
    collectionCycleDays: number;
  };
  quarters: QuarterPoint[];
  lineItems: LineItemVariance[];
}

export const DEMO_SCENARIOS: Record<Exclude<ScenarioId, 'custom'>, ScenarioDataset> = {
  base: {
    id: 'base',
    name: 'Base Case',
    tagline: 'Balanced operating trajectory aligned with historical run-rate',
    description:
      'Illustrative baseline forecast assuming steady customer retention, planned engineering hires, and standard 42-day receivables collection.',
    assumptionsSummary: {
      revenueGrowthRate: '+14.0% YoY',
      opexAdjustment: '+2.1% vs. Budget',
      hiringPace: 'Planned baseline (+6 roles)',
      collectionCycleDays: 42,
    },
    quarters: [
      {
        quarter: 'Q1',
        budgetRevenue: 1150000,
        projectedRevenue: 1180000,
        projectedExpenses: 910000,
        projectedProfit: 270000,
        endingCash: 2420000,
      },
      {
        quarter: 'Q2',
        budgetRevenue: 1240000,
        projectedRevenue: 1275000,
        projectedExpenses: 955000,
        projectedProfit: 320000,
        endingCash: 2710000,
      },
      {
        quarter: 'Q3',
        budgetRevenue: 1320000,
        projectedRevenue: 1365000,
        projectedExpenses: 995000,
        projectedProfit: 370000,
        endingCash: 3050000,
      },
      {
        quarter: 'Q4',
        budgetRevenue: 1440000,
        projectedRevenue: 1490000,
        projectedExpenses: 1040000,
        projectedProfit: 450000,
        endingCash: 3470000,
      },
    ],
    lineItems: [
      {
        category: 'Subscription & Recurring Revenue',
        type: 'revenue',
        approvedBudget: 4120000,
        projectedAmount: 4260000,
        notes: 'Steady renewal rates across core commercial accounts',
      },
      {
        category: 'Implementation & Advisory Services',
        type: 'revenue',
        approvedBudget: 1030000,
        projectedAmount: 1050000,
        notes: 'On-schedule onboarding milestones',
      },
      {
        category: 'Cost of Revenue & Cloud Hosting',
        type: 'expense',
        approvedBudget: 890000,
        projectedAmount: 915000,
        notes: 'Compute scaling aligned with active tenant volume',
      },
      {
        category: 'Research & Product Engineering',
        type: 'expense',
        approvedBudget: 1420000,
        projectedAmount: 1445000,
        notes: 'Includes Q2 analytics engineering additions',
      },
      {
        category: 'Sales & Marketing Operations',
        type: 'expense',
        approvedBudget: 960000,
        projectedAmount: 980000,
        notes: 'Baseline demand generation & partner events',
      },
      {
        category: 'General & Administrative (G&A)',
        type: 'expense',
        approvedBudget: 550000,
        projectedAmount: 560000,
        notes: 'Standard legal, audit, and multi-office overhead',
      },
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth Case',
    tagline: 'Accelerated market expansion with front-loaded commercial investment',
    description:
      'Illustrative expansion model testing higher go-to-market spend in Q1–Q2 to capture enterprise demand, lifting second-half recurring revenue.',
    assumptionsSummary: {
      revenueGrowthRate: '+26.5% YoY',
      opexAdjustment: '+11.8% vs. Budget',
      hiringPace: 'Accelerated (+14 roles)',
      collectionCycleDays: 38,
    },
    quarters: [
      {
        quarter: 'Q1',
        budgetRevenue: 1150000,
        projectedRevenue: 1230000,
        projectedExpenses: 1015000,
        projectedProfit: 215000,
        endingCash: 2350000,
      },
      {
        quarter: 'Q2',
        budgetRevenue: 1240000,
        projectedRevenue: 1390000,
        projectedExpenses: 1075000,
        projectedProfit: 315000,
        endingCash: 2645000,
      },
      {
        quarter: 'Q3',
        budgetRevenue: 1320000,
        projectedRevenue: 1580000,
        projectedExpenses: 1110000,
        projectedProfit: 470000,
        endingCash: 3095000,
      },
      {
        quarter: 'Q4',
        budgetRevenue: 1440000,
        projectedRevenue: 1790000,
        projectedExpenses: 1150000,
        projectedProfit: 640000,
        endingCash: 3715000,
      },
    ],
    lineItems: [
      {
        category: 'Subscription & Recurring Revenue',
        type: 'revenue',
        approvedBudget: 4120000,
        projectedAmount: 4780000,
        notes: 'Higher mid-market deal velocity in Q2–Q4',
      },
      {
        category: 'Implementation & Advisory Services',
        type: 'revenue',
        approvedBudget: 1030000,
        projectedAmount: 1210000,
        notes: 'Expanded enterprise onboarding packages',
      },
      {
        category: 'Cost of Revenue & Cloud Hosting',
        type: 'expense',
        approvedBudget: 890000,
        projectedAmount: 1010000,
        notes: 'Higher infrastructure & support capacity',
      },
      {
        category: 'Research & Product Engineering',
        type: 'expense',
        approvedBudget: 1420000,
        projectedAmount: 1540000,
        notes: 'Accelerated product release schedule',
      },
      {
        category: 'Sales & Marketing Operations',
        type: 'expense',
        approvedBudget: 960000,
        projectedAmount: 1220000,
        notes: 'Expanded regional sales coverage & campaigns',
      },
      {
        category: 'General & Administrative (G&A)',
        type: 'expense',
        approvedBudget: 550000,
        projectedAmount: 580000,
        notes: 'Incremental recruitment & compliance support',
      },
    ],
  },
  cost: {
    id: 'cost',
    name: 'Cost Reduction',
    tagline: 'Disciplined expense optimization focused on cash preservation',
    description:
      'Illustrative efficiency scenario modeling conservative top-line growth paired with vendor consolidation, paced hiring, and tighter working capital.',
    assumptionsSummary: {
      revenueGrowthRate: '+9.2% YoY',
      opexAdjustment: '-9.4% vs. Budget',
      hiringPace: 'Selective replacement (+2 roles)',
      collectionCycleDays: 35,
    },
    quarters: [
      {
        quarter: 'Q1',
        budgetRevenue: 1150000,
        projectedRevenue: 1140000,
        projectedExpenses: 830000,
        projectedProfit: 310000,
        endingCash: 2480000,
      },
      {
        quarter: 'Q2',
        budgetRevenue: 1240000,
        projectedRevenue: 1215000,
        projectedExpenses: 855000,
        projectedProfit: 360000,
        endingCash: 2830000,
      },
      {
        quarter: 'Q3',
        budgetRevenue: 1320000,
        projectedRevenue: 1285000,
        projectedExpenses: 875000,
        projectedProfit: 410000,
        endingCash: 3230000,
      },
      {
        quarter: 'Q4',
        budgetRevenue: 1440000,
        projectedRevenue: 1370000,
        projectedExpenses: 900000,
        projectedProfit: 470000,
        endingCash: 3690000,
      },
    ],
    lineItems: [
      {
        category: 'Subscription & Recurring Revenue',
        type: 'revenue',
        approvedBudget: 4120000,
        projectedAmount: 4050000,
        notes: 'Focus on high-margin core renewals',
      },
      {
        category: 'Implementation & Advisory Services',
        type: 'revenue',
        approvedBudget: 1030000,
        projectedAmount: 960000,
        notes: 'Standardized self-guided implementation packages',
      },
      {
        category: 'Cost of Revenue & Cloud Hosting',
        type: 'expense',
        approvedBudget: 890000,
        projectedAmount: 810000,
        notes: 'Reserved instance optimization & storage tiering',
      },
      {
        category: 'Research & Product Engineering',
        type: 'expense',
        approvedBudget: 1420000,
        projectedAmount: 1340000,
        notes: 'Prioritized core roadmap without contractor spend',
      },
      {
        category: 'Sales & Marketing Operations',
        type: 'expense',
        approvedBudget: 960000,
        projectedAmount: 805000,
        notes: 'Focus on organic inbound & high-ROI channels',
      },
      {
        category: 'General & Administrative (G&A)',
        type: 'expense',
        approvedBudget: 550000,
        projectedAmount: 505000,
        notes: 'Software license audit & travel consolidation',
      },
    ],
  },
};

export interface PricingTier {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  period: string;
  audience: string;
  recommendedTeamSize: 'small' | 'mid' | 'enterprise';
  priceDisplay?: string;
  priceSubtext?: string;
  featured: boolean;
  proposedInclusions: string[];
  ctaLabel: string;
  inquiryPreselect: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    monthlyPrice: 29,
    yearlyPrice: 23,
    period: '/ Month',
    audience: 'Essential forecasting and scenario tools for individuals & startups',
    recommendedTeamSize: 'small',
    priceDisplay: '$29 / Month',
    priceSubtext: 'Billed monthly or $23/mo billed annually',
    featured: false,
    proposedInclusions: [
      'Basic financial forecasting tools',
      'Up to 3 team user accounts',
      'Real-time exchange rate monitoring',
      'Monthly financial variance reports',
      'Standard email & community support',
    ],
    ctaLabel: 'Select Plan',
    inquiryPreselect: 'Pricing: Starter Plan ($29/mo)',
  },
  {
    id: 'professional',
    name: 'Pro Plan',
    badge: 'RECOMMENDED',
    monthlyPrice: 99,
    yearlyPrice: 79,
    period: '/ Month',
    audience: 'Full scenario intelligence with AI advisor for growing teams',
    recommendedTeamSize: 'mid',
    priceDisplay: '$99 / Month',
    priceSubtext: 'Billed monthly or $79/mo billed annually',
    featured: true,
    proposedInclusions: [
      'Advanced scenario modeling (Base, Growth, Cost)',
      'Up to 15 team user accounts',
      'AI Financial Advisor & variance insights',
      'Real-time FX & cash flow planning',
      'Weekly automated executive reports',
      'Priority 24/7 email & chat support',
    ],
    ctaLabel: 'Select Plan',
    inquiryPreselect: 'Pricing: Pro Plan ($99/mo - Recommended)',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: '',
    audience: 'Dedicated infrastructure, custom governance & SLA for organizations',
    recommendedTeamSize: 'enterprise',
    priceDisplay: 'Contact Us',
    priceSubtext: 'Tailored pricing & dedicated financial engineering',
    featured: false,
    proposedInclusions: [
      'Custom financial modeling & consolidation',
      'Unlimited team accounts & entities',
      'Global multi-currency hedging & FX risk',
      'Real-time custom financial dashboards',
      'Dedicated financial advisor & custom SLA',
      'Enterprise SSO & custom ERP integrations',
    ],
    ctaLabel: 'Contact Us',
    inquiryPreselect: 'Pricing: Enterprise (Custom Consultation)',
  },
];

export interface TestimonialPlaceholderItem {
  id: string;
  statusTag: string;
  intendedRole: string;
  focusArea: string;
  placeholderQuote: string;
  intendedBenefit: string;
  verificationNote: string;
}

export const TESTIMONIAL_PLACEHOLDERS: TestimonialPlaceholderItem[] = [
  {
    id: 'fp-a-director',
    statusTag: 'Testimonial Placeholder · Awaiting Client Authorization',
    intendedRole: 'Finance Lead / FP&A Function (Illustrative Evaluation Profile)',
    focusArea: 'Scenario Comparison & Sensitivity Review',
    placeholderQuote:
      '“[Reserved for authorized customer quote regarding how comparing Base Case, Growth Case, and Cost Reduction scenarios in one structured view reduces manual spreadsheet reconciliation during quarterly planning.]”',
    intendedBenefit: 'Intended Benefit: Clearer side-by-side visibility into revenue and expense trade-offs before approving budgets.',
    verificationNote: 'No customer endorsement is claimed. This layout slot is reserved for verified client feedback upon formal authorization.',
  },
  {
    id: 'operations-controller',
    statusTag: 'Testimonial Placeholder · Awaiting Client Authorization',
    intendedRole: 'Financial Controller / Budget Owner (Illustrative Evaluation Profile)',
    focusArea: 'Budget Variance & Cash Flow Visibility',
    placeholderQuote:
      '“[Reserved for authorized customer quote describing how structured budget-versus-forecast variance tracking helps department leads identify cost deviations early in the fiscal quarter.]”',
    intendedBenefit: 'Intended Benefit: Faster variance investigation across revenue streams, R&D, Sales & Marketing, and G&A.',
    verificationNote: 'No customer endorsement is claimed. This layout slot is reserved for verified client feedback upon formal authorization.',
  },
  {
    id: 'executive-planning',
    statusTag: 'Testimonial Placeholder · Awaiting Client Authorization',
    intendedRole: 'Executive Leadership / Strategy Team (Illustrative Evaluation Profile)',
    focusArea: 'Informed Strategic Decision-Making',
    placeholderQuote:
      '“[Reserved for authorized customer quote highlighting how transparent planning assumptions and cash reserve projections support confident hiring and capital allocation decisions.]”',
    intendedBenefit: 'Intended Benefit: Shared executive alignment around documented financial assumptions rather than isolated estimates.',
    verificationNote: 'No customer endorsement is claimed. This layout slot is reserved for verified client feedback upon formal authorization.',
  },
];

export interface FAQItem {
  id: string;
  number: string;
  category: 'platform' | 'methodology' | 'commercial';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'what-is-tertvalis',
    number: '01',
    category: 'platform',
    question: 'What is Tertvalis?',
    answer:
      'Tertvalis is a financial forecasting and scenario intelligence company founded on 14 May 2024 by Kavinethra Thamilchelvi, operating as Tertvalis (Pvt) Ltd in Sri Lanka and Tertvalis Inc. in the United States. We focus on helping organizations structure financial planning data, forecast business performance, compare alternative scenarios, and analyze budget variances to support better-informed business decisions.',
  },
  {
    id: 'how-forecasting-works',
    number: '02',
    category: 'methodology',
    question: 'How does financial forecasting work?',
    answer:
      'Financial forecasting in Tertvalis starts by organizing historical actuals, approved period budgets, and explicit operational drivers (such as revenue growth rates, headcount plans, and expense ratios). Teams then project expected revenue, operating costs, net profit, and cash balances across future quarters so leadership can see where current trends lead.',
  },
  {
    id: 'what-is-scenario-planning',
    number: '03',
    category: 'methodology',
    question: 'What is scenario planning?',
    answer:
      'Scenario planning is a structured method for testing "what-if" business questions before committing resources. Instead of relying on a single static forecast, finance teams build distinct assumption sets—such as a Base Case, a Growth Case, or a Cost Reduction case—to evaluate how changes in demand, hiring, or spending affect profitability and cash reserves.',
  },
  {
    id: 'compare-multiple-scenarios',
    number: '04',
    category: 'platform',
    question: 'Can I compare multiple financial scenarios?',
    answer:
      'Yes. Comparing multiple financial scenarios side by side is a core focus of Tertvalis. As demonstrated in the interactive Demo section on this page, planners can switch between Base Case, Growth Case, Cost Reduction, and custom sensitivity sliders to inspect how each set of assumptions alters quarterly revenue, operating expenses, and ending cash.',
  },
  {
    id: 'review-budget-variances',
    number: '05',
    category: 'platform',
    question: 'Can Tertvalis help review budget variances?',
    answer:
      'Yes. Budget variance analysis compares approved baseline budgets against actual or projected performance across individual line items (such as Subscription Revenue, Cloud Hosting, R&D, Sales & Marketing, and G&A). Showing both dollar and percentage differences helps teams identify where plans are outperforming or require corrective action.',
  },
  {
    id: 'connected-to-live-data',
    number: '06',
    category: 'platform',
    question: 'Is the dashboard connected to live financial data?',
    answer:
      'No. The interactive dashboard preview on this marketing website runs entirely in your browser using illustrative sample data to demonstrate scenario modeling concepts. It is not connected to live bank feeds, accounting ERPs, an external database, or an automated AI engine.',
  },
  {
    id: 'replace-financial-advice',
    number: '07',
    category: 'methodology',
    question: 'Does Tertvalis replace professional financial advice?',
    answer:
      'No. Analytical projections, variance tables, and scenario models are decision-support tools designed to help teams organize assumptions and explore potential outcomes. They are not guarantees of future financial performance and do not replace qualified accounting, tax, audit, legal, or regulated investment advice.',
  },
  {
    id: 'how-to-request-demo',
    number: '08',
    category: 'commercial',
    question: 'How can I request a demo?',
    answer:
      'You can explore the interactive scenario sandbox directly in the Demo section of this website, or select "Request a Demo" in the navigation header to scroll to the Contact section and prepare a structured demo inquiry for our team.',
  },
  {
    id: 'how-to-learn-pricing',
    number: '09',
    category: 'commercial',
    question: 'How can I learn about pricing?',
    answer:
      'Because financial planning needs vary by team size, entity structure, and reporting complexity, Tertvalis provides tailored quotes across our Starter, Professional, and Enterprise tiers. Select any plan in the Pricing section to pre-fill an inquiry in the Contact section.',
  },
  {
    id: 'how-to-contact-team',
    number: '10',
    category: 'commercial',
    question: 'How can I contact the team?',
    answer:
      'You can reach Tertvalis via the Contact section on this page or through our offices: Tertvalis (Pvt) Ltd at No. 71, New Kandy Road, Malabe, Sri Lanka (+94 76 940 5569) and Tertvalis Inc. at Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA (note: the supplied US telephone +1 213-555-0142 is pending company verification).',
  },
];
