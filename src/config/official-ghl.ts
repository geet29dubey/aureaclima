/**
 * PASTE-IN BOUNDARY FOR VERIFIED OFFICIAL GHL CODE.
 * No invented script URL, account identifier or browser API is supplied.
 * Populate only after obtaining the official embed from the correct GHL account.
 * setup must return cleanup; the tracking setup must registerAnalyticsAdapter()
 * with the official custom-event API and unregister it on cleanup.
 * Never place a private API key or access token here.
 */
export type OfficialEmbed = {
  scriptUrl: string;
  attributes: Record<string, string>;
  setup: (container: HTMLElement) => (() => void);
};
export const officialGHL: { tracking: OfficialEmbed | null; chat: OfficialEmbed | null } = {
  tracking: null,
  chat: null,
};
