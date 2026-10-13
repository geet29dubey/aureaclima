/**
 * PASTE-IN BOUNDARY FOR VERIFIED OFFICIAL GHL CODE.
 * No invented script URL, account identifier or browser API is supplied.
 * Populate only after obtaining the official embed from the correct GHL account.
 * setup must return cleanup; the tracking setup must registerAnalyticsAdapter()
 * with the official custom-event API and unregister it on cleanup.
 * Never place a private API key or access token here.
 */
 
 
 /**
 * Verified official GHL integration configuration.
 *
 * Never store private API keys or access tokens here.
 */

export type OfficialEmbed = {
  scriptUrl: string;
  attributes: Record<string, string>;
  setup: (container: HTMLElement) => (() => void);
};

export type OfficialChatEmbed = {
  scriptUrl: string;
  resourcesUrl: string;
  widgetId: string;
  locationId: string;
};

export const officialGHL: {
  tracking: OfficialEmbed | null;
  chat: OfficialChatEmbed | null;
} = {
  tracking: null,

  chat: {
    scriptUrl: "https://widgets.leadconnectorhq.com/loader.js",

    resourcesUrl:
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",

    widgetId: "6ab00f882251fa79529e1b8c",

    // Exact data-location-id supplied with the official GHL embed.
    locationId: "LBbKDQqDTzMCfsxZ52XI",
  },
};
