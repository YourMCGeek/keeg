import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
// import "./envConfig";
import { getBBBUserByDiscordId } from "./api/builtbybit";
import { Member } from "@builtbybit/api-wrapper/types/helpers/members/MembersHelper";

const STAFF_DISCORD_IDS: string[] =
  process.env.STAFF_DISCORD_IDS?.split(",") || [];

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
    authorized({ auth }) {
      return !!(
        auth?.user &&
        STAFF_DISCORD_IDS.includes(
          auth.user.builtbybit?.member.discord_id?.toString() || ""
        )
      );
    },
    async jwt({ token, account, profile }) {
      // Store Discord ID on first sign-in
      if (account && profile && profile.id) {
        token.discordId = profile.id;
      }

      // Check if we should refresh BBB data (every 24 hours)
      const now = Date.now();
      const lastFetch = (token.bbbLastFetch as number) || 0;
      const shouldRefresh = account || now - lastFetch > 24 * 60 * 60 * 1000; // 24 hours

      if (token.discordId && shouldRefresh) {
        try {
          const bbbUser = await getBBBUserByDiscordId(
            token.discordId as string
          );
          if (bbbUser) {
            token.builtbybit = {
              member: bbbUser,
              privateToken:
                (token.builtbybit as { privateToken?: string })?.privateToken ??
                "",
            };
            token.lastFetch = now;
            token.bbbLastFetch = now;
          }
        } catch (error) {
          console.error("Error fetching BBB user:", error);
        }
      }
      console.log(token);
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          builtbybit: token.builtbybit,
        },
      };
    },
    async signIn({ profile }) {
      if (!profile?.id) {
        return false;
      }

      // Check if user is staff
      if (!STAFF_DISCORD_IDS.includes(profile.id)) {
        return false;
      }

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

declare module "next-auth" {
  interface Session {
    user: {
      builtbybit: {
        member: Member;
        privateToken?: string;
      };
    };
  }

  interface JWT {
    discordId?: string;
    builtbybit?: {
      member: Member;
      privateToken?: string;
    };
    bbbLastFetch?: number;
    lastFetch?: number;
  }
}
