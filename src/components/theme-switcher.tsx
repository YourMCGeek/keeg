"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState, useEffect } from "react";

/**
 * A client-side component that allows the user to switch between light and dark themes.
 * It uses the `next-themes` package to manage theme state and persists the selection.
 * The component ensures it is only rendered on the client to avoid hydration mismatch errors.
 */
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleGroup
      suppressHydrationWarning
      type="single"
      value={resolvedTheme}
      onValueChange={setTheme}
      size="sm"
      className="w-full"
    >
      <ToggleGroupItem value="light" title="Light" suppressHydrationWarning>
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" title="Dark" suppressHydrationWarning>
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
