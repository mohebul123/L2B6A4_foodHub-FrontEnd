"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  ShoppingCart,
  X,
  UtensilsCrossed,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, UserLogOut } from "@/app/service/auth";
import { useRouter } from "next/navigation";

interface User {
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  name?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/meals", label: "Browse Meals" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    getCurrentUser();
  }, [loading]);

  const handleLogout = () => {
    UserLogOut();
    setUser(null);
    setLoading(true);
    router.push("/");
    router.refresh();
  };

  // Dashboard link logic
  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN") return "/admin-dashboard";
    if (user.role === "PROVIDER") return "/provider-dashboard";
    return "/customer-dashboard";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            FoodHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          {user ? (
            <>
              <Button variant="outline" asChild className="gap-2">
                <Link href={getDashboardLink()}>
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-6 pt-2 md:hidden shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start h-12" asChild>
              <Link href="/cart" onClick={() => setMobileOpen(false)}>
                <ShoppingCart className="mr-3 h-5 w-5" />
                Cart
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="outline"
                  className="justify-start h-12"
                  asChild
                >
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    My Dashboard
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  className="justify-start h-12"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="h-12" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button className="h-12" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
