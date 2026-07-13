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
import { DeleteCategoryButton } from "@/components/modules/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const res = await getAllCategories();
  const categories = res?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border shadow-sm transition-colors duration-300">
        <h1 className="text-xl font-bold text-foreground">Categories</h1>
        <CreateCategoryModal />
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm transition-colors duration-300">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat: any, index: number) => (
                <TableRow key={cat.id} className="border-b border-border/60">
                  <TableCell className="text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {cat.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteCategoryButton id={cat.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-muted-foreground"
                >
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
