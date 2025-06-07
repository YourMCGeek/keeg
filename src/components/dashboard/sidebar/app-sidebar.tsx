"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { SearchForm } from "./search-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { navigationData } from "@/lib/navigation-data";

/**
 * The main application sidebar component.
 * It displays navigation links, a search form, user information, and a theme switcher.
 * The sidebar's collapsible sections are stateful and persist their expanded/collapsed
 * state in localStorage.
 *
 * @param {React.ComponentProps<typeof Sidebar>} props - Props passed to the underlying Sidebar component.
 * @returns {JSX.Element} The rendered sidebar.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const savedExpanded = localStorage.getItem("expandedSidebarItems");
    if (savedExpanded) {
      setExpandedItems(JSON.parse(savedExpanded));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expandedSidebarItems", JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleItem = useCallback((itemTitle: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((title) => title !== itemTitle)
        : [...prev, itemTitle]
    );
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {navigationData.navMain.map((item) => (
              <Collapsible
                key={item.title}
                open={expandedItems.includes(item.title)}
                onOpenChange={() => toggleItem(item.title)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
