/* eslint-disable react/no-unescaped-entities */
import { ShieldCheck, Lock, Eye, FileText, Bell, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-orange-600" />,
      title: "What Information We Collect",
      content:
        "We collect personal information such as your name, email address, phone number, and delivery address when you create an account or place an order.",
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-600" />,
      title: "How We Use Your Data",
      content:
        "Your data is used to process orders, provide customer support, and improve our services. We do not sell your personal data to third parties.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
      title: "Data Security",
      content:
        "We implement industry-standard encryption and security measures to protect your information from unauthorized access or disclosure.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
            <ShieldCheck className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-2">Last Updated: April 26, 2026</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Welcome Message */}
          <div className="p-8 md:p-12 border-b border-slate-100 bg-orange-50/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At FoodHub, we are committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your personal
              information when you use our platform. By using FoodHub, you agree
              to the terms outlined in this policy.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Grid Sections */}
            <div className="grid md:grid-cols-1 gap-10">
              {sections.map((section, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="mt-1">{section.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-slate-100" />
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" /> Cookies &
                  Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, remember
                  your preferences, and analyze site traffic. You can manage
                  cookie settings in your browser at any time.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" /> Communications
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We may send you service-related notifications and marketing
                  updates. You can opt-out of marketing emails by clicking the
                  unsubscribe link in any message we send.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" /> Changes to
                  This Policy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  FoodHub reserves the right to update this policy as our
                  services evolve. Any changes will be posted on this page with
                  an updated revision date.
                </p>
              </section>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-slate-900 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
            <p className="text-slate-400 mb-6">
              We're here to help you understand your data rights.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
              Contact Privacy Team
            </button>
            <p className="mt-6 text-slate-500 text-sm">support@foodhub.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
