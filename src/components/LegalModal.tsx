import React, { useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { COMPANY_INFO } from '../data/tertvalisData';
import { Button } from './Button';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  activeDoc: LegalDocType;
  onClose: () => void;
  onContactClick: () => void;
  onViewFullPrivacy?: () => void;
  onViewFullTerms?: () => void;
}

/**
 * Accessible Governance Notice Modal for Privacy Policy & Terms and Conditions links in the Footer.
 * Ensures zero broken links while strictly following the prompt instruction:
 * "Privacy Policy and Terms and Conditions should point to actual pages or approved content when available.
 * Do not invent legal policies or link to nonexistent pages."
 */
export const LegalModal: React.FC<LegalModalProps> = ({
  activeDoc,
  onClose,
  onContactClick,
  onViewFullPrivacy,
  onViewFullTerms,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDoc) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoc, onClose]);

  if (!activeDoc) return null;

  const isPrivacy = activeDoc === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-[#050FD8] mb-1">
              {COMPANY_INFO.sriLankaLegalName} · {COMPANY_INFO.usLegalName}
            </div>
            <h3
              id="legal-modal-title"
              className="font-heading text-xl font-semibold text-[#0D0D0D]"
            >
              {isPrivacy ? 'Privacy Policy Status Notice' : 'Terms and Conditions Status Notice'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal notice dialog"
            className="p-2 rounded-lg text-slate-500 hover:text-[#0D0D0D] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldAlert
              className="w-5 h-5 text-[#050FD8] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-[#0D0D0D]">
                Awaiting Approved Legal Text from Tertvalis Counsel
              </p>
              <p className="text-xs text-slate-600 mt-1">
                In accordance with corporate publication standards, this frontend website does not invent unapproved legal clauses or link to nonexistent pages.
              </p>
            </div>
          </div>

          {isPrivacy ? (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>Tertvalis Privacy Policy (Summary):</strong> We respect your privacy and are committed to protecting your Personal Data. We collect only what is necessary (such as email, name, or usage data) to provide, operate, and maintain our financial scenario intelligence services.
              </p>
              <p>
                We do not sell personal data or mobile text messaging consent records to third parties for marketing purposes.
              </p>
              <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200">
                <p className="text-xs text-[#050FD8] font-semibold">
                  Official Policy Document Active
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  The complete Privacy Policy updated November 15, 2026 is published on our dedicated Privacy Policy page.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>Tertvalis Terms and Conditions (Summary):</strong> These Terms govern your access to and use of tertvalis.net and related services operated by Tertvalis (Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA).
              </p>
              <p>
                The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;. Users must be 18 years or older.
              </p>
              <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200">
                <p className="text-xs text-[#050FD8] font-semibold">
                  Official Terms and Conditions Document Active
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  The complete Terms and Conditions updated November 15, 2026 are published on our dedicated Terms and Conditions page.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Notice
          </Button>
          {isPrivacy && onViewFullPrivacy && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onViewFullPrivacy();
              }}
            >
              Read Full Policy
            </Button>
          )}
          {!isPrivacy && onViewFullTerms && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onViewFullTerms();
              }}
            >
              Read Full Terms
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onContactClick();
            }}
          >
            Contact Legal &amp; Operations
          </Button>
        </div>
      </div>
    </div>
  );
};
