/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/app/service/auth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"), // Fixed schema type string validation mapping
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res.message || "Login successful!");
        router.push("/");
      } else {
        toast.error(res.message || "Failed to authenticate");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDemoLogin = (role: "CUSTOMER" | "PROVIDER" | "ADMIN") => {
    const credentials = {
      CUSTOMER: { email: "customermoheb@gmail.com", password: "customer1234" },
      PROVIDER: { email: "maria@provider.com", password: "pass1234" },
      ADMIN: { email: "adminmoheb@gmail.com", password: "admin1234" },
    };

    setValue("email", credentials[role].email, { shouldValidate: true });
    setValue("password", credentials[role].password, { shouldValidate: true });

    toast.success(`${role} credentials loaded! Ready to submit.`);
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12 bg-background text-foreground transition-colors duration-200">
      <Card className="w-full max-w-md border border-border bg-card shadow-sm rounded-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Sign in to your FoodHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground uppercase"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-xl h-11 bg-background text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-semibold text-destructive mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-muted-foreground uppercase"
                >
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-xl h-11 bg-background text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-semibold text-destructive mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full h-11 rounded-xl font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Authenticating...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="mt-2 pt-4 border-t border-dashed border-border">
              <p className="text-[11px] font-bold text-muted-foreground mb-2.5 text-center uppercase tracking-wider">
                Quick Demo Accounts Bypass
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl h-9 font-semibold border-muted-foreground/20 hover:bg-muted/50"
                  onClick={() => handleDemoLogin("CUSTOMER")}
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl h-9 font-semibold border-muted-foreground/20 hover:bg-muted/50"
                  onClick={() => handleDemoLogin("PROVIDER")}
                >
                  Provider
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl h-9 font-semibold border-muted-foreground/20 hover:bg-muted/50"
                  onClick={() => handleDemoLogin("ADMIN")}
                >
                  Admin
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-bold text-primary hover:underline transition-all"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
