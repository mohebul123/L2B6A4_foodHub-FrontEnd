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
      <div className="flex flex-col items-center justify-center h-[60vh] gap-2">
        <Loader2 className="animate-spin text-orange-600" size={40} />
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card className="shadow-lg border-orange-100">
        <CardHeader className="bg-orange-50/50 border-b pb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                My Profile 👤
              </CardTitle>
              <p className="text-sm text-gray-500">
                Manage your personal information
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          {/* Full Name */}
          <div className="flex items-start gap-4">
            <User className="text-orange-600 mt-1" size={20} />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-gray-400">
                Full Name
              </span>
              <p className="font-semibold text-lg text-gray-700">
                {profile.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-orange-600 mt-1" size={20} />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-gray-400">
                Email Address
              </span>
              <p className="font-semibold text-lg text-gray-700">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="text-orange-600 mt-1" size={20} />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-gray-400">
                Account Type
              </span>
              <p className="font-semibold text-lg">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-sm">
                  {profile.role}
                </span>
              </p>
            </div>
          </div>
          <div className="pt-6 border-t flex gap-4">
            <Link href="/customer-dashboard/profile/update-profile">
              <Button
                variant="outline"
                className="flex gap-2 items-center border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
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
