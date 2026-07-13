/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { getAllUsers, updateUserStatus } from "@/app/service/admin";
import { toast } from "sonner";
import { UserX, UserCheck, Loader2, ShieldAlert, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [fetchUsers]);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      const res = await updateUserStatus(userId, newStatus);
      if (res.success) {
        toast.success(`User status modified to ${newStatus}`);
        fetchUsers();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm">
      {/* Header section with Dynamic System Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2 text-foreground">
            User Controls <ShieldAlert className="text-primary h-6 w-6" />
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage global user access, platform roles, and authentication status
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, email or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-background border-input text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="p-4">User</th>
              <th className="p-4">Role Tag</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/30 transition-colors duration-200 text-sm align-middle"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary border border-primary/20 shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate max-w-[200px]">
                        <p className="font-semibold text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <Badge
                      variant="outline"
                      className="font-semibold uppercase text-[11px] px-2.5 py-0.5 rounded-md"
                    >
                      {user.role}
                    </Badge>
                  </td>

                  <td className="p-4">
                    <Badge
                      className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-md ${
                        user.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/10"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    {user.role !== "ADMIN" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`h-9 rounded-xl px-4 text-xs font-semibold border transition-colors ${
                          user.status === "ACTIVE"
                            ? "border-red-200 text-red-600 dark:border-red-950 dark:text-red-400 hover:bg-red-500/10 hover:text-red-600"
                            : "border-green-200 text-green-600 dark:border-green-950 dark:text-green-400 hover:bg-green-500/10 hover:text-green-600"
                        }`}
                      >
                        {user.status === "ACTIVE" ? (
                          <span className="flex items-center gap-1.5">
                            <UserX size={14} /> Suspended
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <UserCheck size={14} /> Activate
                          </span>
                        )}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground pr-4 font-medium italic">
                        Root Master
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-12 bg-background/50">
                  <p className="text-muted-foreground font-medium">
                    No records found matching criteria.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
