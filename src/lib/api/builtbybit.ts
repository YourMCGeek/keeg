"use server";

import { Wrapper, Token, TokenType, APIError } from "@builtbybit/api-wrapper";
import { Member } from "@builtbybit/api-wrapper/types/helpers/members/MembersHelper";

const wrapper = new Wrapper();

async function initializeWrapper(privateKey: string) {
  try {
    if (!privateKey || privateKey.trim() === "") {
      throw new Error("BuiltByBit API Key not provided.");
    }
    await wrapper.init(new Token(TokenType.PRIVATE, privateKey));
  } catch (error) {
    console.error("Error initializing BuiltByBit API wrapper:", error);
    throw error; // Re-throw the error for further handling
  }
}

export async function signInCheck(discordId: string): Promise<Member | null> {
  const member = await getBBBUserByDiscordId(
    process.env.BBB_PRIVATE_TOKEN!,
    discordId
  );
  return member;
}

export async function getBBBUserByDiscordId(
  privateKey: string,
  discordId: string
): Promise<Member | null> {
  await initializeWrapper(privateKey);
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

export async function checkValidToken(
  privateKey: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    await initializeWrapper(privateKey);
    return { valid: true };
  } catch (error) {
    if (error instanceof APIError && error.code === "HeaderMalformdError") {
      return { valid: false, error: error.message.split(" - ").pop() };
    }
    if (error instanceof APIError && error.code === "TokenNotFoundError") {
      return { valid: false, error: error.message.split(" - ").pop() };
    }
    console.error("Error checking health:", error);
    return { valid: false, error: "An unknown error occurred" };
  }
}
