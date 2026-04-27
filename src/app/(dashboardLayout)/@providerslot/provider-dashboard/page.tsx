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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Menus 🍳</h2>
        <Link href="/provider-dashboard/add-meal">
          <Button className="bg-orange-600 hover:bg-orange-700">
            Add New Meal
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
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
                  <span className="animate-pulse text-slate-500 font-medium">
                    Fetching your meals...
                  </span>
                </TableCell>
              </TableRow>
            ) : meals && meals.length > 0 ? (
              meals.map((meal: any) => (
                <TableRow key={meal.id || meal._id}>
                  <TableCell className="font-medium">
                    {meal.title || meal.name}
                  </TableCell>
                  <TableCell>৳ {meal.price}</TableCell>
                  <TableCell>
                    {meal.isAvailable ? (
                      <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded text-xs">
                        ✅ Available
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium bg-red-50 px-2 py-1 rounded text-xs">
                        ❌ Out of Stock
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
                  className="text-center py-10 text-slate-500"
                >
                  You havent added any meals yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
