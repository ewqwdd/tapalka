export interface TelegramData {
  query_id: string;
  user: string;
  auth_date: number;
  hash: string;
  [key: string]: unknown; // Для того чтобы учитывать любые другие поля
}

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm: boolean;
  is_premium?: boolean;
}
