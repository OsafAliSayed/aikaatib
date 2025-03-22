"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Add your registration logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/login");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-purple-800/30">
        <CardHeader className="space-y-2 text-center">
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            <Pen className="w-6 h-6" />
            <span className="text-xl font-bold">AIKaatib</span>
          </div>
          <CardTitle className="text-2xl font-bold text-purple-100">Create an account</CardTitle>
          <CardDescription className="text-purple-300">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                disabled={isLoading}
                required
                className="bg-black/30 text-purple-100 placeholder:text-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="bg-black/30 text-purple-100 placeholder:text-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">Password</Label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                required
                className="bg-black/30 text-purple-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-purple-200">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                disabled={isLoading}
                required
                className="bg-black/30 text-purple-100"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-sm text-center text-purple-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-purple-300"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}