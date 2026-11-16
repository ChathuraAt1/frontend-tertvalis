import React, { useEffect } from 'react';
import { FileText, Mail, MapPin, Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface TermsConditionsPageProps {
  onBackToHome: () => void;
  onNavigate: (href: string) => void;
  onOpenLegalModal: (doc: 'privacy' | 'terms') => void;
  onOpenPrivacyPage: () => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({
  onBackToHome,
  onNavigate,
  onOpenLegalModal,
  onOpenPrivacyPage,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0D0D0D] flex flex-col font-body selection:bg-[#050FD8] selection:text-white">
      {/* Header */}
      <Header
        activeSection=""
        onNavigate={(href) => {
          onBackToHome();
          setTimeout(() => {
            onNavigate(href);
          }, 50);
        }}
      />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Content Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12">
            {/* Header Badge & Title */}
            <div className="border-b border-slate-200 pb-8 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#050FD8] text-xs font-heading font-semibold mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Agreement &amp; Governance</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#0D0D0D] tracking-tight mb-3">
                Terms and Conditions
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-mono-tabular">
                Last updated: November 15, 2026
              </p>
            </div>

            {/* Intro text */}
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base mb-10">
              <p>
                Please read these terms and conditions carefully before using Our Service.
              </p>
            </div>

            {/* Interpretation and Definitions */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Interpretation and Definitions
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <h3 className="text-lg font-heading font-semibold text-[#0D0D0D]">
                  Interpretation
                </h3>
                <p>
                  The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="text-lg font-heading font-semibold text-[#0D0D0D] pt-2">
                  Definitions
                </h3>
                <p>For the purposes of these Terms and Conditions:</p>

                <ul className="space-y-3 pl-2 sm:pl-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Country/State</strong> refers to: California, United States.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to Tertvalis, Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Service</strong> refers to the Website.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">Website</strong> refers to tertvalis.net, accessible from{' '}
                      <a
                        href="https://tertvalis.net/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[#050FD8] hover:underline font-medium"
                      >
                        https://tertvalis.net/
                      </a>.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050FD8] mt-2 shrink-0" />
                    <div>
                      <strong className="text-[#0D0D0D]">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Acknowledgment
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p>
                  Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-semibold text-[#0D0D0D]">Age Requirement</p>
                  <p className="text-sm text-slate-600 mt-1">
                    You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                  </p>
                </div>
                <p>
                  Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacyPage}
                    className="text-[#050FD8] hover:underline font-medium cursor-pointer inline"
                  >
                    Privacy Policy
                  </button>{' '}
                  carefully before using Our Service.
                </p>
              </div>
            </section>

            {/* Links to Other Websites */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Links to Other Websites
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                </p>
                <p>
                  The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
                </p>
                <p>
                  We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                </p>

                <div className="pt-2">
                  <h3 className="text-lg font-heading font-semibold text-[#0D0D0D] mb-2">
                    Links from a Third-Party Social Media Service
                  </h3>
                  <p className="mb-3">
                    The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
                  </p>
                  <p>
                    You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Termination
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                <p>
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                </p>
                <p>
                  Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
                </p>
              </div>
            </section>

            {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
                </p>
                <p>
                  Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Governing Law
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  The laws of the Country/State, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                </p>
              </div>
            </section>

            {/* Disputes Resolution */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Disputes Resolution
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                </p>
              </div>
            </section>

            {/* For European Union (EU) Users */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                For European Union (EU) Users
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
                </p>
              </div>
            </section>

            {/* United States Legal Compliance */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                United States Legal Compliance
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
                </p>
              </div>
            </section>

            {/* Severability and Waiver */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Severability and Waiver
              </h2>
              <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[#0D0D0D] mb-2">
                    Severability
                  </h3>
                  <p>
                    If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-[#0D0D0D] mb-2">
                    Waiver
                  </h3>
                  <p>
                    Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                  </p>
                </div>
              </div>
            </section>

            {/* Translation Interpretation */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Translation Interpretation
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  These Terms and Conditions may have been translated if We have made them available to You on our Service.
                  You agree that the original English text shall prevail in the case of a dispute.
                </p>
              </div>
            </section>

            {/* Changes to These Terms and Conditions */}
            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] pb-3 border-b border-slate-100 mb-5">
                Changes to These Terms and Conditions
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
                <p>
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section className="pt-4 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0D0D0D] mb-4">
                Contact Us
              </h2>
              <p className="text-slate-700 text-sm sm:text-base mb-6">
                If you have any questions about these Terms and Conditions, You can contact us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:info@tertvalis.net"
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 flex items-center justify-center text-[#050FD8] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">By Email</div>
                    <div className="text-sm font-semibold text-[#0D0D0D] group-hover:text-[#050FD8] transition-colors">
                      info@tertvalis.net
                    </div>
                  </div>
                </a>

                {/* USA Office Phone & Address */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 flex items-center justify-center text-[#050FD8] shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">USA Office Address</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#0D0D0D]">
                        Suite 715, 7th Floor, 600 Wilshire Boulevard, Los Angeles, CA 90017, USA
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-200/60">
                    <Phone className="w-4 h-4 text-[#050FD8] ml-3 shrink-0" />
                    <span className="text-xs text-slate-600">
                      USA Office Phone:{' '}
                      <a href="tel:+12135550142" className="font-semibold text-[#0D0D0D] hover:text-[#050FD8] transition-colors">
                        +1 213-555-0142
                      </a>
                    </span>
                  </div>
                </div>

                {/* Sri Lanka Office Address & Phone */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100/70 flex items-center justify-center text-[#050FD8] shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">SL Office Address</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#0D0D0D]">
                        No. 71, New Kandy Road, Malabe, Sri Lanka
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-200/60">
                    <Phone className="w-4 h-4 text-[#050FD8] ml-3 shrink-0" />
                    <span className="text-xs text-slate-600">
                      SL Office Phone:{' '}
                      <a href="tel:+94769405569" className="font-semibold text-[#0D0D0D] hover:text-[#050FD8] transition-colors">
                        +94769405569
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(href) => {
          onBackToHome();
          setTimeout(() => {
            onNavigate(href);
          }, 50);
        }}
        onOpenLegalModal={onOpenLegalModal}
        onOpenPrivacyPage={onOpenPrivacyPage}
      />
    </div>
  );
};

