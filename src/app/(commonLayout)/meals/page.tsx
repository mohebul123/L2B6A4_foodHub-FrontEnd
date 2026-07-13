/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MealCard } from "@/components/modules/home/MealCard";
import { MealSkeleton } from "@/components/ui/meal-skeleton";
import { getAllmeals } from "@/app/service/meal";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExploreMealsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = 8;

  const [meals, setMeals] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("DEFAULT");

  const fetchMealsData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllmeals({
        search: search || undefined,
        category: category === "ALL" ? undefined : category,
        sort: sort === "DEFAULT" ? undefined : sort,
        page: currentPage,
        limit: currentLimit,
      });

      if (res?.success || res?.data) {
        setMeals(res.data?.data || []);
        setMeta(res.data?.meta || null);
      }
    } catch (error) {
      toast.error("Failed to sync marketplace logs");
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, currentPage]);

  useEffect(() => {
    router.push(`?page=1`);
  }, [search, category, sort, router]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMealsData();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [fetchMealsData]);

  const handlePageChange = (newPage: number) => {
    if (meta && newPage >= 1 && newPage <= meta.totalPages) {
      router.push(`?page=${newPage}`);
    }
  };

  const handleAddToCartLogic = (meal: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (
      cart.length > 0 &&
      String(cart[0].providerId) !== String(meal.providerId)
    ) {
      toast.error(
        "You can only order from one provider at a time! Clear your cart first.",
      );
      return;
    }

    const existing = cart.find((item: any) => item.mealId === meal.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        mealId: meal.id,
        title: meal.title,
        price: meal.price,
        providerId: meal.providerId,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${meal.title} added to cart!`);
  };

  const categoriesList = [
    "ALL",
    "Rice",
    "Biryani",
    "Burgers",
    "Desserts",
    "Healthy Healthy",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-background text-foreground transition-colors duration-200">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Explore Delicious Meals
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Discover curated recipes cooked with clean sanitation pipelines by
          real home kitchen managers.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search meal variants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl bg-card text-sm border-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 px-3 rounded-xl border border-input bg-card text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="DEFAULT">Sort: Default</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => <MealSkeleton key={idx} />)
        ) : meals?.length > 0 ? (
          meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              handleAddToCart={() => handleAddToCartLogic(meal)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed border-border rounded-2xl bg-card">
            <p className="text-muted-foreground font-medium text-lg">
              No authentic meals match your given parameters.
            </p>
          </div>
        )}
      </div>

      {!loading && meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 border-t border-border mt-12 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="text-sm font-medium text-muted-foreground">
            Page{" "}
            <span className="text-foreground font-bold text-base">
              {currentPage}
            </span>{" "}
            of {meta.totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.totalPages}
            className="flex items-center justify-center gap-1.5 px-4 h-10 rounded-xl font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
