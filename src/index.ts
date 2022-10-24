import { App } from "./App";
import {
  GITHUB_WEBHOOK_SECRET_TOKEN,
  PORT
} from "./env";

const server = new App({
  port: +PORT,
  gh_secret_token: GITHUB_WEBHOOK_SECRET_TOKEN
})

server.run();

/**
 * Stop the App just before exit
 * See: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
 */
process.on("SIGINT", () => server.stop());
process.on("SIGTERM", () => server.stop());
process.on("SIGUSR1", () => server.stop());
process.on("SIGUSR2", () => server.stop());