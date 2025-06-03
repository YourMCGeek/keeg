import "../ui/sidebar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Cog, InfoIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";

export function NavUser() {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.builtbybit?.member?.avatar_url}
                      alt={session?.user?.builtbybit?.member?.username}
                    />

                    <AvatarFallback className="rounded-lg">
                      {session?.user?.builtbybit?.member?.username
                        ?.slice(0, 2)
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session?.user?.builtbybit?.member?.username}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.builtbybit?.member?.member_id}
                    </span>
                  </div>
                  <InfoIcon className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={session?.user?.discord?.image_url || ""}
                        alt={session?.user?.discord?.username}
                      />

                      <AvatarFallback className="rounded-lg">
                        {session?.user?.discord?.username
                          ?.slice(0, 2)
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {session?.user?.discord?.username}
                      </span>
                      <span className="truncate text-xs">
                        {session?.user?.discord?.id}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>
                <div className="flex flex-col gap-2">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center justify-between gap-2 p-2">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 w-1/2 text-center"
                      >
                        <Cog />
                        <span>Settings</span>
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() => signOut({ redirect: false })}
                        className="flex items-center gap-2 w-1/2 text-center"
                      >
                        <LogOut />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </DropdownMenuLabel>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            variant="default"
            onClick={() => signIn("discord", { redirectTo: "/dashboard" })}
            className="flex w-full"
          >
            <span>Login</span>
          </Button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
