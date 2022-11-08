import { App } from "./App";
import {
  BOT_API_TOKEN,
  BOT_TARGET_ID,
  GITHUB_WEBHOOK_SECRET_TOKEN,
  PORT
} from "./env";

const config = {
  port: +PORT,
  gh_secret_token: GITHUB_WEBHOOK_SECRET_TOKEN,
  bot_api_token: BOT_API_TOKEN,
  bot_target_id: BOT_TARGET_ID
};

const server = new App(config);
server.run();

/**
 * Stop the App just before exit
 * See: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
 */
process.on("SIGINT", () => server.stop());
process.on("SIGTERM", () => server.stop());
