"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(
        "Message transmitted successfully! Our team will reach back inside 24 hours.",
      );
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-foreground bg-background">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Get In Touch</h1>
        <p className="text-muted-foreground mt-2">
          Have questions about setting up your cloud kitchen or food delivery
          network?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="space-y-6 bg-card border p-6 rounded-xl text-sm">
          <div className="flex items-center gap-3">
            <Mail className="text-primary h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Email Us</p>
              <p className="text-muted-foreground">support@foodhub.app</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-primary h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Hotline Support</p>
              <p className="text-muted-foreground">+880 1700-000000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-primary h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">HQ Office Location</p>
              <p className="text-muted-foreground">
                Banani Model Town, Dhaka, BD
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 space-y-4 bg-card border p-6 rounded-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                Full Name
              </label>
              <Input
                required
                placeholder="John Doe"
                className="rounded-xl h-11 bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                Email Address
              </label>
              <Input
                type="email"
                required
                placeholder="john@example.com"
                className="rounded-xl h-11 bg-background"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground">
              Subject Matter
            </label>
            <Input
              required
              placeholder="Partnership, Order issues, Server queries..."
              className="rounded-xl h-11 bg-background"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground">
              Message Box
            </label>
            <textarea
              required
              rows={4}
              placeholder="Type your full summary notes here..."
              className="w-full text-sm p-3 rounded-xl border border-input bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <Button
            disabled={loading}
            className="w-full h-11 rounded-xl font-bold"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> Routing data...
              </span>
            ) : (
              "Dispatch message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
