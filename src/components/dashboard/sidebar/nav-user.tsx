"use client";

import "@/components/ui/sidebar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Cog, InfoIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DiscordProfile } from "next-auth/providers/discord";

/**
 * Renders the login button for unauthenticated users.
 */
function LoginButton() {
  return (
    <Button
      variant="default"
      onClick={() => signIn("discord", { redirectTo: "/dashboard" })}
      className="flex w-full"
    >
      <span>Login</span>
    </Button>
  );
}

/**
 * Displays the user's avatar and basic information.
 * @param {object} props - The component props.
 * @param {any} props.user - The user object from the session.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserAvatar({ user }: { user: any }) {
  const username = user?.username || "User";
  const fallback = username.slice(0, 2).toUpperCase();

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={user?.avatar_url || user?.image_url} alt={username} />
      <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
    </Avatar>
  );
}

/**
 * Renders the dropdown menu for an authenticated user.
 * @param {object} props - The component props.
 * @param {any} props.discordProfile - The user's Discord profile.
 * @param {boolean} props.isMobile - Flag indicating if the view is mobile.
 */
function UserMenu({
  discordProfile,
  isMobile,
}: {
  discordProfile: DiscordProfile;
  isMobile: boolean;
}) {
  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar user={discordProfile} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {discordProfile?.username}
            </span>
            <span className="truncate text-xs">{discordProfile?.id}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 p-2">
          <Link
            href="/settings"
            className="flex items-center gap-2 w-1/2 text-center"
          >
            <Cog />
            <span>Settings</span>
          </Link>
          <Button
            variant="destructive"
            onClick={() => signOut({ redirect: true })}
            className="flex items-center gap-2 w-1/2 text-center"
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </DropdownMenuContent>
  );
}

/**
 * The main component for displaying user navigation in the sidebar.
 * It shows a login button for guests or a user menu for authenticated users.
 */
export function NavUser() {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  if (!session?.user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <LoginButton />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const { builtbybit, discord } = session.user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="bg-sidebar-primary">
              <UserAvatar user={builtbybit?.member} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {builtbybit?.member?.username}
                </span>
                <span className="truncate text-xs">
                  {builtbybit?.member?.member_id}
                </span>
              </div>
              <InfoIcon className="h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <UserMenu discordProfile={discord} isMobile={isMobile} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
