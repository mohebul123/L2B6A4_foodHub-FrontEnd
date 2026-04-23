/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/app/service/admin";
import { CreateCategoryModal } from "@/components/modules/admin/CreateCategoryModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteCategoryButton } from "@/components/modules/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const res = await getAllCategories();
  const categories = res?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <h1 className="text-xl font-bold">Categories</h1>
        <CreateCategoryModal />
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat: any, index: number) => (
                <TableRow key={cat.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  {/* <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DeleteCategoryButton id={cat.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
