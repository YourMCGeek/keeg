"use server";

import { cookies } from "next/headers";

// --- BuiltByBit API Key ---
const BBB_COOKIE_NAME = "bbb_api_key";

/**
 * Sets the BuiltByBit API key in a secure, httpOnly cookie.
 * @param {string} key - The API key to store.
 */
export async function setApiKey(key: string) {
  const cookieStore = await cookies();
  cookieStore.set(BBB_COOKIE_NAME, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Retrieves the BuiltByBit API key from the cookie.
 * @returns {Promise<string | undefined>} The API key, or undefined if not found.
 */
export async function getApiKey(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(BBB_COOKIE_NAME)?.value;
}

/**
 * Deletes the BuiltByBit API key cookie.
 */
export async function deleteApiKey() {
  const cookieStore = await cookies();
  cookieStore.delete(BBB_COOKIE_NAME);
}

// --- Video Downloader Settings ---
const VD_COOKIE_NAME = "vd_quality_preference";

/**
 * Sets the preferred video quality in a cookie.
 * @param {string} quality - The quality setting to store (e.g., '1080p').
 */
export async function setVideoQuality(quality: string) {
  const cookieStore = await cookies();
  cookieStore.set(VD_COOKIE_NAME, quality, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Retrieves the preferred video quality from the cookie.
 * @returns {Promise<string | undefined>} The quality setting, or undefined if not found.
 */
export async function getVideoQuality(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(VD_COOKIE_NAME)?.value;
}

// --- Resource Checking Settings ---
const RC_COOKIE_NAME = "rc_enabled";

/**
 * Sets the resource checking enabled status in a cookie.
 * @param {boolean} isEnabled - The enabled status to store.
 */
export async function setResourceChecking(isEnabled: boolean) {
  const cookieStore = await cookies();
  cookieStore.set(RC_COOKIE_NAME, isEnabled.toString(), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Retrieves the resource checking enabled status from the cookie.
 * @returns {Promise<boolean>} The enabled status, or false if not found.
 */
export async function getResourceChecking(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(RC_COOKIE_NAME)?.value;
  return value === "true";
}
