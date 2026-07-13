/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import EditMealModal from "@/components/modules/home/EditMealModal";
import { getMyMeals } from "@/app/service/providers";

export default function ProviderMeals() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getMyMeals();
      setMeals(result?.data || []);
    } catch (error) {
      console.error("Failed to load meals:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">My Menus 🍳</h2>
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-600 dark:hover:bg-orange-700">
            Add New Meal
          </Button>
        </Link>
      </div>

      <div className="border border-border rounded-lg shadow-sm bg-card transition-colors duration-300 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
              <TableHead>Meal Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <span className="animate-pulse text-muted-foreground font-medium">
                    Fetching your meals...
                  </span>
                </TableCell>
              </TableRow>
            ) : meals && meals.length > 0 ? (
              meals.map((meal: any) => (
                <TableRow
                  key={meal.id || meal._id}
                  className="border-b border-border/60 text-foreground"
                >
                  <TableCell className="font-medium text-foreground">
                    {meal.title || meal.name}
                  </TableCell>
                  <TableCell className="text-foreground">
                    ৳ {meal.price}
                  </TableCell>
                  <TableCell>
                    {meal.isAvailable ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium bg-green-500/15 border border-green-500/20 px-2 py-0.5 rounded text-xs">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded text-xs">
                        Out of Stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <EditMealModal
                      meal={meal}
                      onUpdate={() => {
                        fetchMeals();
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  You haven&apos;t added any meals yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
