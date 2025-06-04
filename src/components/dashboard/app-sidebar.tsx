// // app/components/app-sidebar.tsx
// "use client";

// import { useState } from "react";
// import { ChefHat, Cog, Download, Home, Search, Menu, X } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "../ui/sidebar";
// import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
// import Link from "next/link";
// import { ThemeSubMenu } from "../theme-switcher";

// const data = {
//   navMain: [
//     {
//       title: "BuiltByBit",
//       url: "#",
//       icon: Home,
//       isActive: false,
//       items: [
//         { title: "User Lookup", url: "#" },
//         { title: "Resource Lookup", url: "#" },
//         { title: "Settings", url: "/settings#builtbybit" },
//       ],
//     },
//     {
//       title: "Video Downloader",
//       url: "#",
//       icon: Download,
//       isActive: false,
//       items: [
//         { title: "YouTube", url: "#" },
//         { title: "Streamable", url: "#" },
//         { title: "Settings", url: "/settings#video-downloader" },
//       ],
//     },
//     {
//       title: "Resource Checking",
//       url: "#",
//       icon: Search,
//       isActive: false,
//       items: [
//         { title: "Minecraft Setup Checker", url: "#" },
//         { title: "Roblox Checker", url: "#" },
//         { title: "Spigot Search", url: "#" },
//         { title: "Polymart Search", url: "#" },
//         { title: "Settings", url: "/settings#resource-checking" },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "/settings",
//       icon: Cog,
//       isActive: false,
//       items: [
//         { title: "BuiltByBit", url: "/settings#builtbybit" },
//         { title: "Video Downloader", url: "/settings#video-downloader" },
//         { title: "Resource Checking", url: "/settings#resource-checking" },
//       ],
//     },
//   ],
// };

// export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Sidebar
//       {...props}
//       // If your <Sidebar> component supports a width override, you could do something like:
//       // className={collapsed ? "w-20" : "w-60"}
//       className={`flex flex-col h-screen ${
//         collapsed ? "w-20" : "w-60"
//       } transition-all duration-200`}
//     >
//       {/* ─────── SidebarHeader ─────── */}
//       <SidebarHeader className="flex flex-col items-center space-y-2 px-2 py-4">
//         <Link href="/">
//           <a className="flex items-center justify-center space-x-2">
//             <ChefHat className="h-6 w-6" />
//             {!collapsed && <span className="text-xl font-bold">Keeg</span>}
//           </a>
//         </Link>

//         {/* only show search input when expanded */}
//         {!collapsed && (
//           <div className="w-full px-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="
//                   w-full
//                   rounded-md
//                   border
//                   border-gray-300
//                   bg-white
//                   py-2
//                   pl-10 pr-3
//                   text-sm
//                   placeholder-gray-400
//                   focus:border-indigo-500
//                   focus:outline-none
//                   focus:ring-1
//                   focus:ring-indigo-500
//                 "
//               />
//             </div>
//           </div>
//         )}
//       </SidebarHeader>

//       {/* ─────── SidebarContent or SidebarRail ─────── */}
//       {!collapsed ? (
//         <SidebarContent className="flex-1 overflow-y-auto px-2">
//           <NavMain items={data.navMain} collapsed={false} />
//         </SidebarContent>
//       ) : (
//         <SidebarRail className="flex flex-col items-center space-y-4 py-6">
//           <NavMain items={data.navMain} collapsed={true} />
//         </SidebarRail>
//       )}

//       {/* ─────── SidebarFooter ─────── */}
//       <SidebarFooter className="mt-auto flex w-full flex-col items-center space-y-4 px-2 py-4">
//         {!collapsed && (
//           <div className="flex w-full justify-between">
//             <NavUser />
//             <ThemeSubMenu />
//           </div>
//         )}

//         {/* collapse/expand toggle */}
//         <button
//           onClick={() => setCollapsed((prev) => !prev)}
//           className="
//             flex
//             h-8 w-8
//             items-center
//             justify-center
//             rounded-md
//             bg-gray-100
//             text-gray-600
//             hover:bg-gray-200
//             focus:outline-none
//           "
//         >
//           {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
//         </button>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
