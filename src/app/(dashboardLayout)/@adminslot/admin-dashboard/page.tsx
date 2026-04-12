/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Backend: GET /users (Admin only)
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">User Controls 🔐</h2>
      <div className="grid gap-4">
        {users.map((user: any) => (
          <div key={user.id} className="flex justify-between p-4 border rounded-lg items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Badge>{user.role}</Badge>
              <button className="text-red-500 text-sm hover:underline">Block</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}