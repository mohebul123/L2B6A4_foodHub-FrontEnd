/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/app/service/admin";
import { UserStatusButton } from "@/components/modules/admin/UserStatusButton";

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = result?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <Badge variant="outline">Total Users: {users.length}</Badge>
      </div>

      <div className="rounded-md border border-border bg-card shadow-sm transition-colors duration-300">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id} className="border-b border-border/60">
                <TableCell className="font-medium text-foreground">
                  {user.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "ACTIVE"
                        ? "bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/20 border-green-500/30"
                        : "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/20 border-red-500/30"
                    }
                    variant="outline"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <UserStatusButton userId={user.id} status={user.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
