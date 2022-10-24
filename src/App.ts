import { default as Server } from "./services/Server"
import { Webhook as ghWebhook } from "./providers/github/Webhook"

type AppConfig = {
  port: number;
  gh_secret_token: string;
};

export class App {
  private readonly _server: Server;
  private readonly _gh_secret_token: string;

  constructor(config: AppConfig) {
    this._server = new Server(config.port)
    this._gh_secret_token = config.gh_secret_token
  }

  public run() {
    this._server.run([
      new ghWebhook(this._server._http, this._gh_secret_token)
    ])
  }

  public stop() {
    this._server.stop();
  }
}
