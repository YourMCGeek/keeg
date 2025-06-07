"use client";

import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { SidebarInset } from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  return (
    <SidebarInset>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <div className="flex flex-col gap-2 w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex flex-col items-center gap-2">
                  <ChefHat className="size-8 from-blue-600 to-purple-600" />
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Keeg
                    </span>
                  </h1>
                </div>
              </CardTitle>
            </CardHeader>
            <CardDescription>
              <Button
                variant="default"
                className="w-7/8 mx-auto flex justify-center"
                type="button"
                onClick={() => signIn("discord", { redirectTo: callbackUrl })}
              >
                Sign in with Discord
              </Button>
            </CardDescription>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
