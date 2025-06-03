"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

// function CustomRadioItem({
//   selected,
//   onSelect,
//   children,
// }: {
//   selected: boolean;
//   onSelect: () => void;
//   children: ReactNode;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (ref.current) {
//       const indicator = ref.current.querySelector(
//         "[data-radix-menu-item-indicator]"
//       );
//       if (indicator instanceof HTMLElement) indicator.style.display = "none";
//     }
//   }, []);
//   return (
//     <DropdownMenuItem
//       ref={ref}
//       onClick={onSelect}
//       role="menuitemradio"
//       aria-checked={selected}
//       tabIndex={0}
//       className={clsx(
//         "flex items-center cursor-pointer",
//         selected ? "text-primary font-semibold" : "text-muted-foreground"
//       )}
//     >
//       {children}
//     </DropdownMenuItem>
//   );
// }

export function ThemeSubMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      suppressHydrationWarning
      type="single"
      value={theme}
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
      <ToggleGroupItem value="system" title="System" suppressHydrationWarning>
        <Laptop className="h-4 w-4" />
        <span className="sr-only">System</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
