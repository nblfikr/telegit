import { default as Server } from "./services/Server"
import { Webhook as ghWebhook } from "./providers/github/Webhook"
import { Throttle } from "./services/Throttle";
import { Telegram } from "./services/Telegram";

type AppConfig = {
  port: number;
  gh_secret_token: string;
  bot_api_token: string;
  bot_target_id: string;
};

export class App {
  private readonly _server: Server;
  private readonly _gh_secret_token: string;
  private readonly _bot_api_token: string;
  private readonly _bot_target_id: string;

  constructor(config: AppConfig) {
    this._server = new Server(config.port)
    this._gh_secret_token = config.gh_secret_token
    this._bot_api_token = config.bot_api_token
    this._bot_target_id = config.bot_target_id
  }

  public run() {

    const telegram = Telegram.config(this._bot_api_token, this._bot_target_id)
    telegram.run()

    // the reason why use a transmitter to control ...
    // see: https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this
    const transmitter = Throttle.config(telegram);
    transmitter.run()

    this._server.run([
      ghWebhook.config(this._server._http, this._gh_secret_token, transmitter)
    ]);
  }

  public stop() {
    this._server.stop();
  }
}
