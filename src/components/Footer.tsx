import React from 'react';
import { COMPANY_INFO } from '../data/tertvalisData';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenLegalModal: (doc: Exclude<LegalDocType, null>) => void;
  onOpenPrivacyPage?: () => void;
  onOpenTermsPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegalModal,
  onOpenPrivacyPage,
  onOpenTermsPage,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAFAFA] text-[#0D0D0D]">
      {/* Main Top Area: Brand & 3 Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Brand Column (Left) */}
          <div className="md:col-span-5 lg:col-span-4 pr-0 md:pr-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#home');
              }}
              className="inline-flex items-center hover:opacity-90 transition-opacity"
              aria-label="Tertvalis Home"
            >
              <img
                src="/logo3.svg"
                alt={COMPANY_INFO.brandName}
                className="h-14 sm:h-16 md:h-16 lg:h-18 w-auto max-w-[240px] sm:max-w-[280px] object-contain"
              />
            </a>

            <p className="mt-3.5 text-sm text-slate-600 leading-relaxed max-w-sm">
              Tertvalis provides financial planning, forecasting, scenario intelligence, and variance analysis to help modern organizations make better-informed decisions.
            </p>
          </div>

          {/* 3 Link Columns (Right) */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-6 md:gap-6 lg:gap-8">
            {/* Column 1: Navigation */}
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#0D0D0D] mb-4">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#home');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#about');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#features');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#how-it-works');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#0D0D0D] mb-4">
                Company
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <a
                    href="#team"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#team');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Leadership Team
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#testimonials');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Client Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#faq');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#demo');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Interactive Demo
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Trust */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#0D0D0D] mb-4">
                Legal &amp; Trust
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <a
                    href="#pricing"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#pricing');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  {onOpenPrivacyPage ? (
                    <a
                      href="#privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenPrivacyPage();
                      }}
                      className="hover:text-[#050FD8] transition-colors font-medium text-left cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenLegalModal('privacy')}
                      className="hover:text-[#050FD8] transition-colors font-medium text-left cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  )}
                </li>
                <li>
                  {onOpenTermsPage ? (
                    <a
                      href="#terms-conditions"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenTermsPage();
                      }}
                      className="hover:text-[#050FD8] transition-colors font-medium text-left cursor-pointer"
                    >
                      Terms and Conditions
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenLegalModal('terms')}
                      className="hover:text-[#050FD8] transition-colors font-medium text-left cursor-pointer"
                    >
                      Terms and Conditions
                    </button>
                  )}
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#contact');
                    }}
                    className="hover:text-[#050FD8] transition-colors font-medium"
                  >
                    Contact Team
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Solid Dark Bar matching reference layout */}
      <div className="bg-[#0D0D0D] py-4 px-4 sm:px-6 lg:px-8 text-center border-t border-black">
        <p className="font-heading text-xs sm:text-sm text-white/90 tracking-wide font-normal">
          {COMPANY_INFO.brandName} &copy; {currentYear} &ndash; All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
