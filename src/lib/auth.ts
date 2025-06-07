import NextAuth from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import Discord, { DiscordProfile } from "next-auth/providers/discord";
// import "./envConfig";
import { signInCheck } from "./api/builtbybit";
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
    async jwt({ token, account, profile }) {
      // On the first sign-in, create the token foundation
      if (account && profile && !token.discord) {
        token.discord = profile as DiscordProfile;
      }

      // Refresh BBB data if it's stale (older than 24 hours) or on a new login
      const now = Date.now();
      const lastFetch = (token.bbbLastFetch as number) || 0;
      const shouldRefresh = account || now - lastFetch > 24 * 60 * 60 * 1000;

      if (token.discord?.id && shouldRefresh) {
        try {
          const bbbUser = await signInCheck(token.discord.id);
          if (bbbUser) {
            token.builtbybit = {
              member: bbbUser,
              staff: STAFF_DISCORD_IDS.includes(token.discord.id),
            };
            token.bbbLastFetch = now;
          }
        } catch (error) {
          console.error("Error fetching BuiltByBit user data:", error);
          // Decide how to handle this - maybe return the old token or clear bbb data
        }
      }

      return token;
    },
    session({ session, token }) {
      // Ensure the user object and its properties are correctly typed and assigned
      if (session.user && token.discord && token.builtbybit) {
        session.user.discord = token.discord;
        session.user.builtbybit = {
          member: token.builtbybit.member,
          staff: token.builtbybit.staff,
        };
      }
      return session;
    },
    async signIn({ profile }) {
      if (!profile?.id) {
        return false;
      }

      try {
        const bbbUser = await signInCheck(profile.id);
        return !!bbbUser;
      } catch (error) {
        console.error("Error during sign-in check for BuiltByBit user:", error);
        return false;
      }
    },
  },
});
