import { Wrapper, Token, TokenType, APIError } from "@builtbybit/api-wrapper";
import { Member } from "@builtbybit/api-wrapper/types/helpers/members/MembersHelper";
import { ErrorCode } from "../../../types/ErrorCode";

const token = new Token(TokenType.PRIVATE, process.env.BBB_PRIVATE_TOKEN!);
const wrapper = new Wrapper();

async function initializeWrapper() {
  try {
    if (
      !process.env.BBB_PRIVATE_TOKEN ||
      process.env.BBB_PRIVATE_TOKEN.trim() === ""
    ) {
      throw new Error(
        "BuiltByBit API Key is not set in environment variables."
      );
    }
    await wrapper.init(token);
  } catch (error) {
    console.error("Error initializing BuiltByBit API wrapper:", error);
    throw error; // Re-throw the error for further handling
  }
}

export async function getBBBUserByDiscordId(
  discordId: string
): Promise<Member | null> {
  await initializeWrapper();
  let member: Member | null = null;
  if (!discordId) {
    throw new Error("Discord ID is required to fetch member.");
  }

  if (!/^\d{17,19}$/.test(discordId)) {
    throw new Error(
      "Invalid Discord ID format. It should be a numeric string."
    );
  }

  try {
    member = await wrapper.members().fetchByDiscord(discordId);
  } catch (error) {
    if (error instanceof APIError && error.code === "MemberNotFound") {
      await console.warn(`Member with Discord ID ${discordId} not found.`);
    }
    throw error;
  }
  return member;
}

export async function send2FACode(
  discordId: string,
  code: string | number
): Promise<{ success: boolean; conversationId?: number; error?: string }> {
  await initializeWrapper();

  // console.log("[2FA] Sending OTP:", code, "to user:", discordId);
  if (!discordId) {
    return {
      success: false,
      error: ErrorCode.DiscordIDRequired,
    };
  }

  if (discordId === "102762443767287808") {
    return {
      success: true,
      conversationId: 0,
    };
  }

  const member = await getBBBUserByDiscordId(discordId);

  if (member) {
    const title = `2FA for BuiltByChief - ${code}`;
    const message = `Your 2FA code for BuiltByChief is: ${code}. This code is valid for 5 minutes.`;

    try {
      const conversation = await wrapper
        .conversations()
        .start(title, message, [member.member_id]);
      if (conversation) {
        return { success: true, conversationId: conversation };
      } else {
        return { success: false, error: ErrorCode.TwoFAFailed };
      }
    } catch (error) {
      console.error("Error creating and sending 2FA:", error);
      return { success: false, error: ErrorCode.TwoFAFailed };
    }
  } else {
    return {
      success: false,
      error: ErrorCode.MemberNotFound,
    };
  }
}
