import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/tertvalisData';
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface ContactProps {
  preselectedInquiry: string;
}

interface FormValues {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
  turnstile?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedInquiry }) => {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    message: '',
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<FormValues | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);

  // Initialize Cloudflare Turnstile
  useEffect(() => {
    let checkInterval: number | undefined;

    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        try {
          // If already rendered, don't re-render
          if (turnstileWidgetIdRef.current) return;

          turnstileContainerRef.current.innerHTML = '';
          const widgetId = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: '0x4AAAAAAGBckmFurQGPfdLe',
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrors((prev) => ({ ...prev, turnstile: undefined }));
            },
            'expired-callback': () => {
              setTurnstileToken(null);
            },
            'error-callback': () => {
              setTurnstileToken(null);
            },
            theme: 'light',
          });
          turnstileWidgetIdRef.current = widgetId;
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      checkInterval = window.setInterval(() => {
        if (window.turnstile) {
          renderTurnstile();
          window.clearInterval(checkInterval);
        }
      }, 200);
    }

    return () => {
      if (checkInterval) window.clearInterval(checkInterval);
      if (turnstileWidgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [submittedRecord]);

  // If navigated from Pricing or Hero with a preselected inquiry topic
  useEffect(() => {
    if (preselectedInquiry) {
      setValues((prev) => ({
        ...prev,
        message: prev.message || `Hello Tertvalis Team, I would like to inquire about: ${preselectedInquiry}.`,
      }));
      setSubmittedRecord(null);
    }
  }, [preselectedInquiry]);

  const validateForm = (data: FormValues): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!data.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(data.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief message (at least 10 characters).';
    }
    if (!turnstileToken) {
      newErrors.turnstile = 'Please complete the Cloudflare security verification.';
    }
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/moedjgno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          message: values.message,
          'cf-turnstile-response': turnstileToken,
          'g-recaptcha-response': turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmittedRecord({ ...values });
        setValues({
          fullName: '',
          email: '',
          message: '',
        });
        setTurnstileToken(null);
        if (window.turnstile && turnstileWidgetIdRef.current) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
      } else {
        const errorData = await response.json().catch(() => null);
        const errMsg =
          errorData && errorData.errors
            ? errorData.errors.map((err: { message?: string }) => err.message).filter(Boolean).join(', ')
            : 'Failed to send message. Please try again.';
        setSubmitError(errMsg || 'Failed to send message. Please try again.');
        if (window.turnstile && turnstileWidgetIdRef.current) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
          setTurnstileToken(null);
        }
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!submittedRecord) return;
    const summaryText = [
      `Tertvalis Inquiry Summary`,
      `Name: ${submittedRecord.fullName}`,
      `Email: ${submittedRecord.email}`,
      `Message: ${submittedRecord.message}`,
      `Date: ${new Date().toLocaleString()}`,
    ].join('\n');

    navigator.clipboard?.writeText(summaryText);
    setCopiedReceipt(true);
    window.setTimeout(() => setCopiedReceipt(false), 2500);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-8 sm:py-10 lg:py-12 bg-[#FAFAFA] text-[#0D0D0D] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split: Form (Left) & Dark Angled Info Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-10 sm:mb-12">

          {/* Left Column: Heading + Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow Kicker matching About section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="text-xs sm:text-[13px] font-heading font-normal uppercase tracking-[0.22em] text-[#050FD8] mb-3.5"
              >
                CONTACT US
              </motion.div>

              {/* Main Display Headline matching About section size and non-bold font */}
              <motion.h2
                id="contact-heading"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#0D0D0D] tracking-tight leading-[1.15] mb-5"
              >
                Let's Talk &amp; Financial Intelligence
              </motion.h2>

              {/* Lead narrative paragraph matching About section */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="font-body text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8 max-w-xl"
              >
                Have questions about our financial forecasting architecture, scenario modeling, or implementation roadmap? Connect with our team to discuss your planning requirements.
              </motion.p>

              {/* Success Feedback Receipt */}
              {submittedRecord ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#050FD8]/30 space-y-5 animate-in fade-in duration-300"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#050FD8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#0D0D0D]">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        Thank you, <strong>{submittedRecord.fullName}</strong>. Your message has been recorded. Our team will contact you at{' '}
                        <strong>{submittedRecord.email}</strong> shortly.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2 font-body">
                    <div>
                      <span className="text-slate-500">Name:</span>{' '}
                      <strong className="text-[#0D0D0D]">{submittedRecord.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Email:</span>{' '}
                      <strong className="text-[#0D0D0D]">{submittedRecord.email}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block mb-1">Message:</span>
                      <p className="text-slate-700 whitespace-pre-wrap">
                        {submittedRecord.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xs border border-slate-300 bg-white text-xs font-heading font-bold uppercase tracking-widest text-[#0D0D0D] hover:bg-slate-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer text-center"
                    >
                      {copiedReceipt ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#050FD8]" aria-hidden="true" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                          <span>Copy Inquiry Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xs bg-[#050FD8] hover:bg-[#076CF2] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#050FD8]/20 cursor-pointer text-center"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form without Subject field */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row 1: Your Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-xs sm:text-sm font-heading font-semibold text-[#0D0D0D] mb-1.5"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.fullName)}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F4F5F7] text-[#0D0D0D] placeholder:text-slate-400 border transition-all ${errors.fullName
                            ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                            : 'border-transparent focus:border-[#050FD8] focus:bg-white'
                          }`}
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs sm:text-sm font-heading font-semibold text-[#0D0D0D] mb-1.5"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="Your email address"
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F4F5F7] text-[#0D0D0D] placeholder:text-slate-400 border transition-all ${errors.email
                            ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                            : 'border-transparent focus:border-[#050FD8] focus:bg-white'
                          }`}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Your Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs sm:text-sm font-heading font-semibold text-[#0D0D0D] mb-1.5"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="Enter here..."
                      className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F4F5F7] text-[#0D0D0D] placeholder:text-slate-400 border transition-all resize-y ${errors.message
                          ? 'border-red-500 bg-red-50/30 focus:border-red-500'
                          : 'border-transparent focus:border-[#050FD8] focus:bg-white'
                        }`}
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Cloudflare Turnstile Verification */}
                  <div className="pt-1">
                    <div ref={turnstileContainerRef} className="min-h-[65px] flex items-center" />
                    {errors.turnstile && (
                      <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.turnstile}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 font-body leading-relaxed"
                    >
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button matching Hero button design (rectangular rounded-xs, theme blue & font) */}
                  <div className="pt-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#050FD8] hover:bg-[#076CF2] text-white font-heading font-bold text-xs sm:text-[13px] uppercase tracking-widest px-8 py-4 rounded-xs shadow-lg shadow-[#050FD8]/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-center"
                    >
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      {isSubmitting ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Dark Angled Card with Top-Right Chamfer Cut */}
          <div className="lg:col-span-5">
            <div
              className="relative p-7 sm:p-9 text-white bg-gradient-to-br from-[#060D28] via-[#091438] to-[#060D24] rounded-[32px] shadow-2xl border border-slate-800/80"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)',
              }}
            >
              {/* Subtle brand blue background glow */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-25 blur-2xl"
                style={{ background: '#076CF2' }}
                aria-hidden="true"
              />

              <div className="relative space-y-7 sm:space-y-8">
                {/* 1. Address Section */}
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2.5 tracking-tight">
                    Address
                  </h3>
                  <div className="space-y-2.5 font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <div>
                      <span className="text-[#60A5FA] font-heading font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                        SL Office:
                      </span>
                      <span>{COMPANY_INFO.offices.sriLanka.address}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[#60A5FA] font-heading font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                        USA Office:
                      </span>
                      <span>{COMPANY_INFO.offices.unitedStates.address}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Contact Section */}
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2.5 tracking-tight">
                    Contact
                  </h3>
                  <div className="space-y-2 font-body text-xs sm:text-sm text-slate-300">
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">SL Phone :</span>
                      <a
                        href={`tel:${COMPANY_INFO.offices.sriLanka.phone.replace(/\s+/g, '')}`}
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium font-body"
                      >
                        {COMPANY_INFO.offices.sriLanka.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">USA Phone :</span>
                      <a
                        href={`tel:${COMPANY_INFO.offices.unitedStates.phone.replace(/[\s-]/g, '')}`}
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium font-body"
                      >
                        {COMPANY_INFO.offices.unitedStates.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-slate-400">Email :</span>
                      <a
                        href="mailto:info@tertvalis.net"
                        className="text-white hover:text-[#60A5FA] transition-colors font-medium font-body"
                      >
                        info@tertvalis.net
                      </a>
                    </p>
                  </div>
                </div>

                {/* 3. Stay Connected & Ecosystem Profiles */}
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-3.5 tracking-tight">
                    Stay Connected
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* 1. Facebook */}
                    <a
                      href={COMPANY_INFO.socialProfiles.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      title="Tertvalis on Facebook"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>

                    {/* 2. YouTube */}
                    <a
                      href={COMPANY_INFO.socialProfiles.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      title="Tertvalis on YouTube"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>

                    {/* 3. Twitter / X */}
                    <a
                      href={COMPANY_INFO.socialProfiles.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter / X"
                      title="Tertvalis on X (Twitter)"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* 4. Pinterest */}
                    <a
                      href={COMPANY_INFO.socialProfiles.pinterest}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                      title="Tertvalis on Pinterest"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                    </a>

                    {/* 5. LinkedIn */}
                    <a
                      href={COMPANY_INFO.socialProfiles.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="Tertvalis on LinkedIn"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                      </svg>
                    </a>

                    {/* 6. Medium */}
                    <a
                      href={COMPANY_INFO.socialProfiles.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Medium"
                      title="Tertvalis on Medium"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                      </svg>
                    </a>

                    {/* 7. Crunchbase */}
                    <a
                      href={COMPANY_INFO.socialProfiles.crunchbase}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Crunchbase"
                      title="Tertvalis on Crunchbase"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21.6 0H2.4A2.41 2.41 0 0 0 0 2.4v19.2A2.41 2.41 0 0 0 2.4 24h19.2a2.41 2.41 0 0 0 2.4-2.4V2.4A2.41 2.41 0 0 0 21.6 0M7.045 14.465A2.11 2.11 0 0 0 9.84 13.42h1.66a3.69 3.69 0 1 1 0-1.75H9.84a2.11 2.11 0 1 0-2.795 2.795m11.345.845a3.6 3.6 0 0 1-1.06.63a3.68 3.68 0 0 1-3.39-.38v.38h-1.51V5.37h1.5v4.11a3.74 3.74 0 0 1 1.8-.63H16a3.67 3.67 0 0 1 2.39 6.46m-.223-2.766a2.104 2.104 0 1 1-4.207 0a2.104 2.104 0 0 1 4.207 0" />
                      </svg>
                    </a>

                    {/* 8. F6S */}
                    <a
                      href={COMPANY_INFO.socialProfiles.f6s}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="F6S"
                      title="Tertvalis on F6S"
                      className="w-10 h-10 rounded-full bg-[#050FD8] hover:bg-[#076CF2] text-white flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg shadow-[#050FD8]/25"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 64 64" aria-hidden="true">
                        <g transform="scale(0.08)">
                          <polygon points="156.901,180.139 293.734,180.139 293.734,237.909 210.697,237.909 210.697,362.821 260.519,362.821 260.519,420.591 210.697,420.591 210.697,619.879 152.927,619.879 152.927,180.139" />
                          <path d="m 372.428,237.909 v 124.912 h 68.517 c 16.582,0 31.127,14.476 31.127,30.977 v 194.721 c 0,16.705 -14.545,31.359 -31.127,31.359 h -95.027 c -16.59,0 -31.143,-14.289 -31.143,-30.578 V 212.296 c 0,-16.829 14.448,-32.156 30.313,-32.156 h 95.858 c 16.582,0 31.127,14.468 31.127,30.961 v 72.657 3.974 h -57.77 -3.974 v -3.974 -45.849 z m 0.016,182.68 v 141.519 h 41.875 V 420.589 Z" />
                          <path d="m 647.073,283.74 v 3.974 h -57.77 -3.974 v -3.974 -45.849 h -41.875 v 124.913 l 69.116,0.016 c 16.441,0 30.529,19.672 30.529,35.777 v 189.705 c 0,16.812 -14.266,31.558 -30.529,31.558 h -92.918 c -16.254,0 -30.512,-14.367 -30.512,-30.744 v -109.97 l 54.315,-0.09 v 83.037 h 41.875 V 420.574 l -65.706,0.016 c -16.239,0 -30.484,-14.553 -30.484,-31.143 V 211.282 c 0,-16.599 14.258,-31.16 30.512,-31.16 h 92.918 c 16.263,0 30.529,14.561 30.529,31.16 z" />
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Both Google Maps Shown Together Side-by-Side (No Obstructive Tooltip) */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <h3 className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-[#050FD8]">
              OFFICE LOCATIONS &amp; MAPS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Map 1: Sri Lanka Headquarters */}
            <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow h-[360px] sm:h-[400px]">
              <iframe
                title="Sri Lanka Office Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8899097451053!2d79.95374807499627!3d6.903766793095583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2572c4fd81e13%3A0x4d7a05385ed44e33!2s71%20New%20Kandy%20Rd%2C%20Sri%20Jayawardenepura%20Kotte!5e0!3m2!1sen!2slk!4v1793551618750!5m2!1sen!2slk"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map 2: United States Office */}
            <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow h-[360px] sm:h-[400px]">
              <iframe
                title="United States Office Google Map Location - 600 Wilshire Boulevard"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.746077301072!2d-118.25873392348332!3d34.04797171780447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b53805404d%3A0x286395dc7c0303b!2s600%20Wilshire%20Blvd%2C%20Los%20Angeles%2C%20CA%2090017!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
