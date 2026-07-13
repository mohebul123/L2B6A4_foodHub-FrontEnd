import { ShieldCheck, Lock, Eye, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | FoodHub",
  description:
    "Platform legal operations data security management rules and guidelines mapping layout definitions.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4 border-b border-border/60 pb-8">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last Updated: July 2026 • Real-time Platform Operational Matrix
          Compliance
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <blockquote className="border-l-4 border-primary bg-muted/40 p-4 rounded-r-xl italic text-foreground/90">
          Your data privacy matters. This policy outlines how our network layer
          syncs, handles, and tracks customer coordinates and order transactions
          transparently.
        </blockquote>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Lock size={18} className="text-primary" /> 1. Information We
            Collect
          </h2>
          <p>
            When you register an account or checkout meals via home chef
            portals, we store essential workspace details:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 font-medium text-foreground/80">
            <li>Identity parameters (Name, email address, contact numbers).</li>
            <li>
              Location mapping coordinates (Delivery addresses and neighborhood
              geo-tags).
            </li>
            <li>
              Transaction history matrix (Orders, items purchased, and chef
              invoice links).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Eye size={18} className="text-primary" /> 2. How We Use Your Data
          </h2>
          <p>
            Collected database objects are processed dynamically under
            asynchronous platform infrastructure rules to:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 font-medium text-foreground/80">
            <li>
              Provide hot logistic deliveries directly from the matched chef
              origin kitchen coordinates.
            </li>
            <li>
              Optimize recommendation systems tracking trending popular plates
              in your area.
            </li>
            <li>
              Authenticate user authorization states preventing malicious
              network endpoint attacks.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <RefreshCw size={18} className="text-primary" /> 3. Cookies and
            Session State Controls
          </h2>
          <p>
            Our web workspace interfaces utilize localStorage tokens and cookies
            to hold configuration layouts (e.g., keeping items inside your Cart
            state across route shifts) safely. No tracking cookies are
            distributed to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-4 border-t border-border/50 pt-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Contact Operational Legal Desks
          </h2>
          <p>
            For validation clearance or deletion of verified database account
            entries, drop a technical log trace directly at{" "}
            <span className="text-primary font-semibold underline">
              legal@foodhub-platform.com
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
