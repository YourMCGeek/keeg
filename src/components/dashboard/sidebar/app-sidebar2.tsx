"use client";
import React, { useState, useEffect } from "react";
import { Home, Download, Search, Cog, Plus, Minus } from "lucide-react";
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
import { ThemeSubMenu } from "@/components/theme-switcher";
import { NavUser } from "./nav-user";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "BuiltByBit",
      url: "#",
      icon: Home,
      isActive: false,
      items: [
        { title: "User Lookup", url: "#", isActive: true },
        { title: "Resource Lookup", url: "#" },
        { title: "Settings", url: "/settings#builtbybit" },
      ],
    },
    {
      title: "Video Downloader",
      url: "#",
      icon: Download,
      isActive: false,
      items: [
        { title: "YouTube", url: "#" },
        { title: "Streamable", url: "#" },
        { title: "Settings", url: "/settings#video-downloader" },
      ],
    },
    {
      title: "Resource Checking",
      url: "#",
      icon: Search,
      isActive: false,
      items: [
        { title: "Minecraft Setup Checker", url: "#" },
        { title: "Roblox Checker", url: "#" },
        { title: "Spigot Search", url: "#" },
        { title: "Polymart Search", url: "#" },
        { title: "Settings", url: "/settings#resource-checking" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Cog,
      isActive: false,
      items: [
        { title: "BuiltByBit", url: "/settings#builtbybit" },
        { title: "Video Downloader", url: "/settings#video-downloader" },
        { title: "Resource Checking", url: "/settings#resource-checking" },
      ],
    },
  ],
};

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

  const toggleItem = (itemTitle: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((title) => title !== itemTitle)
        : [...prev, itemTitle]
    );
  };

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
            {data.navMain.map((item) => (
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
                              <a href={subItem.url}>{subItem.title}</a>
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
        <ThemeSubMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
