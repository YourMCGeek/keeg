// app/components/nav-main.tsx
"use client";

import { useState } from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import Link from "next/link";

interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: LucideIcon;
  items?: { title: string; url: string }[];
}

export function NavMain({
  items,
  collapsed,
}: {
  items: NavItem[];
  collapsed: boolean;
}) {
  if (!collapsed) {
    // ────────────────────────────────── Expanded Sidebar ──────────────────────────────────
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Tools</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {/* icon + label */}
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.items && item.items.length > 0 && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // ────────────────────────────────── Collapsed Sidebar (Rail) ──────────────────────────────────
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="sr-only">Tools</SidebarGroupLabel>
      <SidebarMenu className="flex flex-col items-center space-y-4">
        {items.map((item) => {
          // If there are sub‐items, use a Popover
          if (item.items && item.items.length > 0) {
            return (
              <Popover key={item.title} trigger="hover">
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    tooltip={item.title}
                    className="p-2"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                  </SidebarMenuButton>
                </PopoverTrigger>

                <PopoverContent className="p-2 w-40">
                  <nav className="flex flex-col space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.url}
                        className="
                          flex
                          w-full
                          items-center
                          rounded-md
                          px-2
                          py-1
                          text-sm
                          hover:bg-gray-100
                        "
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </nav>
                </PopoverContent>
              </Popover>
            );
          }

          // If no sub‐items, just render a direct button
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size="lg"
                tooltip={item.title}
                asChild
                className="p-2"
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
