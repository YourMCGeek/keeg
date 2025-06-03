export enum ErrorCode {
  NotAuthorized = "not_authorized",
  TwoFAFailed = "2fa_failed",
  Unknown = "unknown",
  MemberNotFound = "member_not_found",
  DiscordIDRequired = "discord_id_required",
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.NotAuthorized]: "You are not authorized to access this page.",
  [ErrorCode.TwoFAFailed]: "2-Factor Authentication failed. Please try again.",
  [ErrorCode.Unknown]: "An unknown error occurred. Please try again later.",
  [ErrorCode.MemberNotFound]:
    "Member not found. Please ensure the Discord account is linked to a BuiltByBit member.",
  [ErrorCode.DiscordIDRequired]:
    "Discord ID is required to create and send 2FA.",
};
