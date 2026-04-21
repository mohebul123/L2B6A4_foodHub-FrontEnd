import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Utensils } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Visual Icon */}
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
        <Utensils className="h-16 w-16 text-primary" />
        <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-sm font-bold text-destructive-foreground">
          404
        </span>
      </div>

      {/* Text Content */}
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Oops! It seems the meal you are looking for has already been served or the page doesnt exist.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/meals">
            Explore Meals
          </Link>
        </Button>
      </div>

      {/* Decorative background element */}
      <div className="fixed bottom-0 left-0 -z-10 h-64 w-64 translate-y-32 bg-primary/5 blur-[100px]" />
      <div className="fixed right-0 top-0 -z-10 h-64 w-64 -translate-y-32 bg-primary/5 blur-[100px]" />
    </div>
  );
}