"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import for session access
import Link from "next/link";

export default function BuiltByBitSettings() {
  const { data: session, update } = useSession(); // Get session and update function
  const [apiKey, setApiKey] = useState(
    session?.user?.builtbybit?.privateKey || ""
  ); // Initialize from session

  useEffect(() => {
    if (session?.user?.builtbybit?.privateKey) {
      setApiKey(session.user.builtbybit.privateKey); // Update state if session changes
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApiKey(e.target.value);

  const handleAutosave = async () => {
    if (apiKey) {
      try {
        const response = await fetch("/api/builtbybit/settings", {
          // Assume this API route exists or will be created
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey }),
        });
        if (response.ok) {
          toast.success("API key updated and saved to JWT successfully!");
          await update(); // Refresh the session
        } else {
          toast.error("Failed to save API key.");
        }
      } catch (error) {
        console.error("Error saving API key:", error);
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BuiltByBit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter your private API key to enable BuiltByBit API calls. You can
          find your private key in your{" "}
          <Link
            href="https://builtbybit.com/account/api"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            BuiltByBit settings
          </Link>
          .
        </p>
        <Input
          type="text"
          placeholder="Private API Key"
          value={apiKey}
          onChange={handleInputChange}
          onBlur={handleAutosave}
        />
        <span className="italic text-xs -mt-2">
          This setting is stored locally in your browser.
        </span>
      </CardContent>
    </Card>
  );
}
