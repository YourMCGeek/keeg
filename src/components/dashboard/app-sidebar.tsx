"use client";

import { ChefHat, Cog, Download, Home, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

const data = {
  user: {
    name: "Test",
    avatar: "test.png",
  },
  navMain: [
    {
      title: "BuiltByBit",
      url: "#",
      icon: Home,
      isActive: false,
      items: [
        {
          title: "User Lookup",
          url: "#",
        },
        {
          title: "Resource Lookup",
          url: "#",
        },
        {
          title: "Settings",
          url: "/dashboard/settings#builtbybit",
        },
      ],
    },
    {
      title: "Video Downloader",
      url: "#",
      icon: Download,
      isActive: false,
      items: [
        {
          title: "YouTube",
          url: "#",
        },
        {
          title: "Streamable",
          url: "#",
        },
        {
          title: "Settings",
          url: "/dashboard/settings#video-downloader",
        },
      ],
    },
    {
      title: "Resource Checking",
      url: "#",
      icon: Search,
      isActive: false,
      items: [
        {
          title: "Minecraft Setup Checker",
          url: "#",
        },
        {
          title: "Roblox Checker",
          url: "#",
        },
        {
          title: "Spigot Search",
          url: "#",
        },
        {
          title: "Polymart Search",
          url: "#",
        },
        {
          title: "Settings",
          url: "/dashboard/settings#resource-checking",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Cog,
      isActive: false,
      items: [
        {
          title: "BuiltByBit",
          url: "/dashboard/settings#builtbybit",
        },
        {
          title: "Video Downloader",
          url: "/dashboard/settings#video-downloader",
        },
        {
          title: "Resource Checking",
          url: "/dashboard/settings#resource-checking",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="group" {...props}>
      <SidebarHeader>
        <Link href="/dashboard">
          <div className="flex items-center justify-center py-4">
            <ChefHat className="size-8" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-data-[state=collapsed]:hidden">
              BuiltByChef
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
