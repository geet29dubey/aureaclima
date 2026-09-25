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

    // IMPORTANT:
    // Replace this with the exact data-location-id supplied
    // by GHL > Sites > Chat Widget > Get Code > Via GTM
    locationId: "LBbKDQqDTzMCfsxZ52XI",
  },
};
 
 
/*  
export type OfficialEmbed = {
  scriptUrl: string;
  attributes: Record<string, string>;
  setup: (container: HTMLElement) => (() => void);
};
export const officialGHL: { tracking: OfficialEmbed | null; chat: OfficialEmbed | null } = {
  tracking: null,
  chat: {
    scriptUrl: "https://widgets.leadconnectorhq.com/loader.js",
    attributes: {
      "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
      "data-widget-id": "6ab00f882251fa79529e1b8c",
    },
    // The official loader mounts its chat-widget inside the script's parent.
    // The embed hook removes that parent content when consent is withdrawn.
    setup: (container) => () => container.replaceChildren(),
  },
};
 */