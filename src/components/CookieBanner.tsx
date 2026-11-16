import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

export type CookieConsentStatus = 'accepted' | 'denied' | 'closed' | null;

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
  /**
   * Optional externally controlled open state (e.g. triggered via footer "Cookie Settings").
   * If provided and set to true, the banner will open regardless of previous storage.
   */
  forceOpen?: boolean;
  onCloseBanner?: () => void;
}

const STORAGE_KEY = 'tertvalis_cookie_consent';

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenPrivacy,
  forceOpen = false,
  onCloseBanner,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // If externally forced open (e.g. user clicked "Cookie Preferences" in footer)
    if (forceOpen) {
      setIsVisible(true);
      return;
    }

    // Check if user has already made a selection or closed the banner in this session
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const sessionDismissed = sessionStorage.getItem(`${STORAGE_KEY}_dismissed`);
      
      if (!stored && !sessionDismissed) {
        // Delay appearance slightly (850ms) to let the initial skeleton and hero finish entering smoothly
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 850);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked/unavailable
      setIsVisible(true);
    }
  }, [forceOpen]);

  const handleAccept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
    onCloseBanner?.();
  }, [onCloseBanner]);

  const handleDeny = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'denied');
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
    onCloseBanner?.();
  }, [onCloseBanner]);

  const handleClose = useCallback(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_dismissed`, 'true');
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
    onCloseBanner?.();
  }, [onCloseBanner]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="region"
          aria-label="Cookie consent banner"
          aria-live="polite"
          initial={{ opacity: 0, y: 36, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95, transition: { duration: 0.22, ease: 'easeOut' } }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="fixed bottom-3 left-3 right-3 sm:right-auto sm:left-6 sm:bottom-6 z-50 sm:max-w-[420px] w-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-4 sm:p-5 ring-1 ring-slate-900/5">
            {/* Top row: Cookie Icon badge + Title + Close Button */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#050FD8]/10 to-[#076CF2]/15 text-[#050FD8] flex items-center justify-center shrink-0 border border-[#050FD8]/15">
                  <Cookie className="w-4 h-4 text-[#050FD8]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm sm:text-base text-[#0D0D0D] tracking-tight leading-snug">
                    Cookie Preferences
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500">
                    Tertvalis Privacy Choice
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close cookies banner"
                className="p-1.5 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-[#0D0D0D] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#050FD8]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Compact Description Body */}
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
              We use cookies and client-side storage to optimize financial scenario simulations, enhance performance, and secure your session.
              {onOpenPrivacy && (
                <>
                  {' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="inline font-medium text-[#050FD8] hover:text-[#076CF2] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </>
              )}
            </p>

            {/* Action Buttons: Responsive row */}
            <div className="flex items-center justify-end gap-2 sm:gap-2.5 pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDeny}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-heading font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 hover:text-[#0D0D0D] border border-slate-200 transition-all cursor-pointer text-center active:scale-[0.98]"
              >
                Deny
              </button>

              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-heading font-semibold text-white bg-gradient-to-r from-[#050FD8] to-[#076CF2] hover:from-[#040CB0] hover:to-[#050FD8] shadow-xs shadow-[#050FD8]/25 border border-[#050FD8]/20 transition-all cursor-pointer text-center active:scale-[0.98]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

