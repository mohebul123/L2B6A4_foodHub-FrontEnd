/* eslint-disable react/no-unescaped-entities */
import { Scale, FileText, AlertTriangle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | FoodHub",
  description:
    "Platform user-chef service boundaries mapping legal agreement conditions matrix.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4 border-b border-border/60 pb-8">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
          <Scale size={28} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground text-sm">
          Effective Operating Date: July 2026 • Verified Platform Security Rules
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <p>
          Welcome to the platform marketplace system. By compiling account
          entries or browsing meals via home servers, you validate compliance
          boundaries according to standard marketplace processing acts.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileText size={18} className="text-primary" /> 1. User Account
            Registration Boundaries
          </h2>
          <p>
            Users registering as food customers or platform kitchen vendors must
            match verified credentials. You remain strictly liable for
            transactions initialized through your active session state
            parameters token.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle size={18} className="text-primary" /> 2. Kitchen
            Safety & Provider Liability Disclaimer
          </h2>
          <p>
            FoodHub operates an architectural routing engine marketplace. While
            quality control structures perform background verification audits
            during onboarding setup parameters, individual food preparation
            safety standards are managed strictly under each local home chef's
            direct store jurisdiction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle size={18} className="text-primary" /> 3. Checkout
            Invoice Settlement and Orders Management
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Single Origin Restriction:</strong> As evaluated during
              core layouts, checking out items requires grouping single vendor
              sources to prevent cold overlapping transits.
            </li>
            <li>
              <strong>Cancellation Pipeline:</strong> Once order pipeline
              validation registers a status of " Preparing " on a chef dashboard
              matrix, dynamic modifications are restricted.
            </li>
          </ul>
        </section>

        <section className="space-y-4 border-t border-border/50 pt-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            4. System Terminations
          </h2>
          <p>
            Platform operators preserve full structural control rights to block
            network parameters access to any authentication ID found
            distributing dummy files, scraped code, or processing invalid
            payment mock payloads.
          </p>
        </section>
      </div>
    </div>
  );
}
