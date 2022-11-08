import * as dotenv from "dotenv";

dotenv.config();

export const WEBHOOK_SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN ?? "";
export const GITHUB_WEBHOOK_SECRET_TOKEN =
  process.env.GITHUB_WEBHOOK_SECRET_TOKEN || WEBHOOK_SECRET_TOKEN;
export const PORT = process.env.PORT ?? 3000;
export const BOT_API_TOKEN = process.env.BOT_API_TOKEN ?? "";
export const BOT_TARGET_ID = process.env.BOT_TARGET_ID ?? "";
