import { Home, Download, Search, Cog } from "lucide-react";

export const navigationData = {
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
