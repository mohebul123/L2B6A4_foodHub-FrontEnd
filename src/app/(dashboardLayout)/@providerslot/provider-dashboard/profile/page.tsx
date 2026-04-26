// import { getOwnProviderProfile } from "@/app/service/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, User, Utensils, Info, Edit3 } from "lucide-react";
import { getOwnProviderProfile } from "@/app/service/providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProviderProfilePage() {
  let response = null;
  let errorMsg = null;

  try {
    response = await getOwnProviderProfile();
  } catch (error) {
    console.error(error);
    errorMsg = "No Provider Found or Unauthorized Access";
  }

  const profile = response?.data;

  if (errorMsg || !profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-medium">
          {errorMsg || "Profile not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Provider Profile</h1>
        <Link href="/provider-dashboard/profile/update-profile">
          <Button
            variant="outline"
            className="flex gap-2 items-center border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
          >
            <Edit3 size={16} />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <Card className="md:col-span-1 shadow-sm border-orange-100">
          <CardContent className="pt-8 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <User size={48} className="text-orange-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{profile.user?.name}</h2>
            <Badge
              variant="secondary"
              className="mt-2 bg-green-50 text-green-700 border-green-200"
            >
              {profile.user?.status || "ACTIVE"}
            </Badge>

            <div className="w-full mt-6 space-y-3 text-sm text-gray-600 border-t pt-4">
              <div className="flex items-center gap-2 text-wrap">
                <Mail size={16} className="text-gray-400 shrink-0" />{" "}
                <span className="truncate">{profile.user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400 shrink-0" />{" "}
                {profile.phone || "No phone added"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Restaurant Details */}
        <Card className="md:col-span-2 shadow-sm border-gray-100">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="text-orange-600" size={20} />
              {profile.restaurantName || "Restaurant Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-1">
                <Info size={12} /> Description
              </label>
              <p className="text-gray-700 mt-1 leading-relaxed text-sm">
                {profile.description || "No description added yet."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-1">
                  <MapPin size={12} /> Address
                </label>
                <p className="text-gray-800 font-medium text-sm">
                  {profile.address || "Not specified"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t text-[10px] text-gray-400">
              Provider since: {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
