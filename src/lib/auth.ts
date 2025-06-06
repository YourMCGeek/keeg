import NextAuth from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import Discord, { DiscordProfile } from "next-auth/providers/discord";
// import "./envConfig";
import { getBBBUserByDiscordId } from "./api/builtbybit";
import { Member } from "@builtbybit/api-wrapper/types/helpers/members/MembersHelper";

const STAFF_DISCORD_IDS: string[] =
  process.env.STAFF_DISCORD_IDS?.split(",") || [];

declare module "next-auth" {
  interface Session {
    user: {
      discord: DiscordProfile;
      builtbybit: {
        member: Member;
        staff: boolean;
        privateKey?: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discord?: DiscordProfile;
    builtbybit?: {
      member: Member;
      staff: boolean;
      privateKey?: string;
    };
    bbbLastFetch?: number;
    lastFetch?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        params: {
          scope: "identify",
        },
      },
    }),
  ],
  callbacks: {
    // authorized({ auth }) {
    //   return !!(
    //     auth?.user &&
    //     STAFF_DISCORD_IDS.includes(
    //       auth.user.builtbybit?.member.discord_id?.toString() || ""
    //     )
    //   );
    // },
    async jwt({ token, account, profile }) {
      // Store Discord ID on first sign-in
      if (account && profile && profile.id) {
        // Only set the discord object if it hasn't been set yet
        if (!token.discord) {
          token.discord = profile as DiscordProfile;
        }
      }

      // Check if we should refresh BBB data (every 24 hours)
      const now = Date.now();
      const lastFetch = (token.bbbLastFetch as number) || 0;
      const shouldRefresh = account || now - lastFetch > 24 * 60 * 60 * 1000; // 24 hours

      if (token.discord?.id && shouldRefresh) {
        try {
          const bbbUser = await getBBBUserByDiscordId(token.discord.id);
          if (bbbUser) {
            token.builtbybit = {
              member: bbbUser,
              staff: STAFF_DISCORD_IDS.includes(token.discord.id),
              privateKey:
                (token.builtbybit as { privateKey?: string })?.privateKey ?? "",
            };
            token.lastFetch = now;
            token.bbbLastFetch = now;
          }
        } catch (error) {
          console.error("Error fetching BBB user:", error);
        }
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          discord: token.discord,
          builtbybit: token.builtbybit,
        },
      };
    },
    async signIn({ profile }) {
      if (!profile?.id) {
        return false;
      }

      // // Check if user is staff
      // if (!STAFF_DISCORD_IDS.includes(profile.id)) {
      //   return false;
      // }

      // Check if user exists in BBB
      try {
        const bbbUser = await getBBBUserByDiscordId(profile.id);
        return !!bbbUser;
      } catch (error) {
        console.error("Error checking BBB user:", error);
        return false;
      }
    },
  },
});
