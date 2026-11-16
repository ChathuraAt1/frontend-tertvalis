# Tertvalis — Financial Forecasting & Scenario Intelligence Website

Official single-page ReactJS marketing and interactive scenario demonstration website for **Tertvalis** (`https://tertvalis.net`).

---

## 1. Company Overview

- **Company Name:** Tertvalis
- **Sri Lankan Legal Name:** Tertvalis (Pvt) Ltd
- **US Legal Name:** Tertvalis Inc.
- **Founder:** Kavinethra Thamilchelvi
- **Founded:** 14 May 2024
- **Sri Lanka Office:** No. 71, New Kandy Road, Malabe, Sri Lanka (`+94 76 940 5569`)
- **US Office:** Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA (`+1 213-555-0142` — *Note: 555 number requires company verification before live publication*)

---

## 2. Official Brand Design System

- **Background:** `#FAFAFA`
- **Primary Blue:** `#050FD8`
- **Secondary Blue:** `#076CF2`
- **Accent Mint:** `#05F2AD`
- **Main Text:** `#0D0D0D`
- **Typography:**
  - **Headings:** `Lora` (Serif)
  - **Body Text:** `Inter` (Sans-serif)
  - **Financial Numerals:** `JetBrains Mono` with `font-variant-numeric: tabular-nums`

---

## 3. Project Folder Structure (Beginner-Friendly Guide)

```text
├── public/
│   └── favicon.svg                 # Official Tertvalis geometric emblem
├── src/
│   ├── components/                 # Reusable UI building blocks
│   │   ├── Button.tsx              # Accessible button & anchor link component
│   │   ├── FeatureCard.tsx         # Card for each of the 8 platform capabilities
│   │   ├── Footer.tsx              # Section 11: Multi-column footer
│   │   ├── Header.tsx              # Section 1: Sticky header + mobile menu drawer
│   │   ├── LegalModal.tsx          # Transparent Privacy & Terms notice modal
│   │   └── SectionHeading.tsx      # Consistent section title + kicker heading
│   ├── data/
│   │   └── tertvalisData.ts        # All verified company info, scenarios, FAQs, and plans
│   ├── sections/                   # Sections 2 to 10 in exact page order
│   │   ├── Hero.tsx                # Section 2: Headline, CTAs & live sample preview
│   │   ├── About.tsx               # Section 3: Problem statement & 3 core principles
│   │   ├── HowItWorks.tsx          # Section 4: 3-step connected workflow
│   │   ├── Features.tsx            # Section 5: 8 filterable platform capabilities
│   │   ├── Demo.tsx                # Section 6: Interactive financial scenario sandbox
│   │   ├── Pricing.tsx             # Section 7: Starter, Professional & Enterprise tiers
│   │   ├── Testimonials.tsx        # Section 8: Labelled testimonial placeholders & carousel
│   │   ├── FAQ.tsx                 # Section 9: 10-question accessible accordion + search
│   │   └── Contact.tsx             # Section 10: Validated frontend demo form & offices
│   ├── App.tsx                     # Combines all 11 sections and manages scroll state
│   ├── index.css                   # Brand CSS variables, fonts, and reduced-motion rules
│   └── main.tsx                    # React entry point that mounts App into index.html
├── index.html                      # HTML shell with SEO tags and Google Fonts
└── package.json                    # Dependencies and npm scripts
```

---

## 4. Installation and Running Locally

Make sure you have **Node.js** (version 18 or newer) installed on your computer.

### Step 1: Install Required Packages
```bash
npm install
```
*(Key packages used: `react`, `react-dom`, `lucide-react` for consistent icons, `motion` for smooth animations, and `tailwindcss` for styling).*

### Step 2: Start the Development Server
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

### Step 3: Build for Production
```bash
npm run build
```

### Step 4: Type-Check / Lint
```bash
npm run lint
```
