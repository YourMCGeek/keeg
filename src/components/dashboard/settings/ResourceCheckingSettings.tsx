"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; // Switch from ui/switch
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ResourceCheckingSettings() {
  const [enabled, setEnabled] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const initialEnabled = false; // Initial value for comparison

  useEffect(() => {
    if (enabled !== initialEnabled) {
      setIsDirty(true);
      const timer = setTimeout(() => {
        console.log("Autosaving Resource Checking settings:", enabled); // Replace with actual save logic
        setIsDirty(false); // Reset after save
      }, 1000); // 1-second delay for autosave
      return () => clearTimeout(timer); // Cleanup
    }
  }, [enabled, initialEnabled]);

  const handleToggle = (checked: boolean) => setEnabled(checked);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Checking</CardTitle>
        <CardDescription>Configure resource checking options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Switch checked={enabled} onCheckedChange={handleToggle} />
          <span>Enable Resource Checking</span>
          {isDirty && (
            <Button
              onClick={() =>
                console.log("Manually saved Resource Checking settings")
              }
            >
              Save
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
