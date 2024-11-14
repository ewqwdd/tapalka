import dotenv from "dotenv";
import { webcrypto } from "crypto";
import { TelegramData } from "../types/telegram";
dotenv.config();
const TELEGRAM_BOT_TOKEN = process.env.TOKEN!;

export async function isHashValid(data: TelegramData) {
  const encoder = new TextEncoder();

  const checkString = Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");

  const secretKey = await webcrypto.subtle.importKey(
    "raw",
    encoder.encode("WebAppData"),
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );

  const secret = await webcrypto.subtle.sign("HMAC", secretKey, encoder.encode(TELEGRAM_BOT_TOKEN));

  const signatureKey = await webcrypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );

  const signature = await webcrypto.subtle.sign("HMAC", signatureKey, encoder.encode(checkString));

  const hex = Buffer.from(signature).toString("hex");

  return data.hash === hex;
}
