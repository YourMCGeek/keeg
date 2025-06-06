"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming Input is from ui/input
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function VideoDownloaderSettings() {
  const [quality, setQuality] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const initialQuality = ""; // Initial value for comparison

  useEffect(() => {
    if (quality !== initialQuality) {
      setIsDirty(true);
      const timer = setTimeout(() => {
        console.log("Autosaving Video Downloader settings:", quality); // Replace with actual save logic
        setIsDirty(false); // Reset after save
      }, 1000); // 1-second delay for autosave
      return () => clearTimeout(timer); // Cleanup
    }
  }, [quality, initialQuality]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuality(e.target.value);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Downloader</CardTitle>
        <CardDescription>Options for video downloading</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter preferred quality (e.g., 1080p)"
            value={quality}
            onChange={handleInputChange}
          />
          {isDirty && (
            <Button
              onClick={() =>
                console.log("Manually saved Video Downloader settings")
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
