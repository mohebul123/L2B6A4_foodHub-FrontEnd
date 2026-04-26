/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react"; // useCallback add kora hoyeche
import { Badge } from "@/components/ui/badge";
import { getAllUsers, updateUserStatus } from "@/app/service/admin";
import { toast } from "sonner";
import { UserX, UserCheck, Loader2, ShieldAlert } from "lucide-react"; // UserSlash bad diye UserX
import { Button } from "@/components/ui/button";

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // function-tike useCallback diye wrap kora hoyeche jate cascading render na hoy
  const fetchUsers = useCallback(async () => {
    try {
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // dependency te fetchUsers deya holo

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      const res = await updateUserStatus(userId, newStatus);
      if (res.success) {
        toast.success(`User is now ${newStatus}`);
        fetchUsers();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="animate-spin text-orange-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            User Controls <ShieldAlert className="text-orange-500" />
          </h2>
          <p className="text-sm text-gray-500">
            Manage user access and account status
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {users?.length > 0 ? (
          users.map((user: any) => (
            <div
              key={user.id}
              className="flex flex-wrap justify-between p-4 border border-slate-100 rounded-xl items-center hover:bg-orange-50/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700 border border-orange-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <Badge variant="outline" className="font-medium">
                  {user.role}
                </Badge>

                <Badge
                  className={
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {user.status}
                </Badge>

                {user.role !== "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    className={
                      user.status === "ACTIVE"
                        ? "border-red-200 text-red-600 hover:bg-red-50"
                        : "border-green-200 text-green-600 hover:bg-green-50"
                    }
                  >
                    {user.status === "ACTIVE" ? (
                      <span className="flex items-center gap-2 font-medium">
                        <UserX size={16} /> Block
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 font-medium">
                        <UserCheck size={16} /> Unblock
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-xl">
            <p className="text-gray-400 font-medium">
              No users found in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
