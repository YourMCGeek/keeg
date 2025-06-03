import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import clsx from "clsx";
import { useRef, useEffect, ReactNode } from "react";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
];

function CustomRadioItem({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const indicator = ref.current.querySelector(
        "[data-radix-menu-item-indicator]"
      );
      if (indicator instanceof HTMLElement) indicator.style.display = "none";
    }
  }, []);
  return (
    <DropdownMenuItem
      ref={ref}
      onClick={onSelect}
      role="menuitemradio"
      aria-checked={selected}
      tabIndex={0}
      className={clsx(
        "flex items-center cursor-pointer",
        selected ? "text-primary font-semibold" : "text-muted-foreground"
      )}
    >
      {children}
    </DropdownMenuItem>
  );
}

export function ThemeSubMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {theme === "light" && <Sun className="mr-2 h-4 w-4" />}
        {theme === "dark" && <Moon className="mr-2 h-4 w-4" />}
        {theme === "system" && <Laptop className="mr-2 h-4 w-4" />}
        Change Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;
            return (
              <CustomRadioItem
                key={option.value}
                selected={isActive}
                onSelect={() => setTheme(option.value)}
              >
                <Icon
                  className={clsx(
                    "mr-2 h-4 w-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={clsx(
                    isActive
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {option.label}
                </span>
              </CustomRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
