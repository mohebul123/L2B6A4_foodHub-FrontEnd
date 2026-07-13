"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  Menu,
  ShoppingCart,
  X,
  UtensilsCrossed,
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getUser, UserLogOut } from "@/app/service/auth";
import { useRouter } from "next/navigation";

interface User {
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
  name?: string;
  email?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/meals", label: "Browse Meals" },
  { href: "/about-us", label: "About Us" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };
    getCurrentUser();
  }, [loading]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    UserLogOut();
    setUser(null);
    setLoading(true);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

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

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          {user ? (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-xl text-sm font-medium hover:bg-muted/70 transition focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center shadow-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-card p-1.5 shadow-lg z-50 text-foreground animate-in fade-in-50 slide-in-from-top-1 duration-150">
                  <div className="px-2.5 py-2 border-b border-border/60 mb-1 text-left">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {user.email || "Profile Active"}
                    </p>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard size={14} />
                    <span>Dashboard</span>
                  </Link>
                  <hr className="border-border/60 my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
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
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
              <span className="text-sm font-medium text-muted-foreground">
                Appearance
              </span>
              <ThemeToggle />
            </div>

            <Button variant="ghost" className="justify-start h-12" asChild>
              <Link href="/cart" onClick={() => setMobileOpen(false)}>
                <ShoppingCart className="mr-3 h-5 w-5" />
                Cart
              </Link>
            </Button>

            {user ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b border-border/40">
                  Logged in as:{" "}
                  <span className="text-foreground font-bold">
                    {user.name || "User"}
                  </span>
                </div>
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
