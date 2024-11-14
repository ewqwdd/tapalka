import WebApp from "@twa-dev/sdk";

export const TGWebApp = typeof window !== 'undefined' ? WebApp : null;
