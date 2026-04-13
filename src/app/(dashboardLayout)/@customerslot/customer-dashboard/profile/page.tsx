"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CustomerProfile() {
  // Eikhane tumi backend theke user data fetch korte paro
  // Filto amra ekta static UI dekhachhi
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Profile 👤</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Full Name</span>
            <p className="font-medium text-lg">User Name</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Email Address</span>
            <p className="font-medium text-lg">user@example.com</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Role</span>
            <p className="font-medium text-lg text-orange-600">CUSTOMER</p>
          </div>
          
          <Button className="mt-6 w-full md:w-auto">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}