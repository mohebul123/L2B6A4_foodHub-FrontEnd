/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, ShieldCheck, Loader2, Edit3 } from "lucide-react";
import { getUser } from "@/app/service/auth";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function CustomerProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-2 bg-background">
        <Loader2
          className="animate-spin text-orange-600 dark:text-orange-500"
          size={40}
        />
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-20 bg-background">
        <p className="text-destructive font-medium">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 text-foreground bg-background transition-colors duration-300">
      <Card className="shadow-lg border-border bg-card text-card-foreground overflow-hidden">
        <CardHeader className="bg-muted/40 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-orange-600 dark:bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                My Profile 👤
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your personal information
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          <div className="flex items-start gap-4">
            <User
              className="text-orange-600 dark:text-orange-500 mt-1"
              size={20}
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Full Name
              </span>
              <p className="font-semibold text-lg text-foreground">
                {profile.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail
              className="text-orange-600 dark:text-orange-500 mt-1"
              size={20}
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Email Address
              </span>
              <p className="font-semibold text-lg text-foreground">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck
              className="text-orange-600 dark:text-orange-500 mt-1"
              size={20}
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                Account Type
              </span>
              <p className="font-semibold text-lg mt-1">
                <span className="px-2.5 py-1 bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-md text-sm font-medium">
                  {profile.role}
                </span>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex gap-4">
            <Link href="/customer-dashboard/profile/update-profile">
              <Button
                variant="outline"
                className="flex gap-2 items-center border-orange-500/30 text-orange-600 hover:bg-orange-500/10 hover:text-orange-600 dark:text-orange-400 dark:border-orange-500/20 dark:hover:bg-orange-500/10"
              >
                <Edit3 size={16} />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
