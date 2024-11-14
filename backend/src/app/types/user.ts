export interface User {
  id: number;
  balance?: number;
  telegramId: number;
  username: string;
  name: string;
  isPremium?: boolean;
  metadata: {
    country: string;
    lang: string;
    userAgent: string;
    ipAddress: string;
  };
  referralId?: string;
  sourceId?: string;
}
