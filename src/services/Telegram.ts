import { Bot } from "grammy";
import { UserFromGetMe } from "grammy/out/types.node";

import { IService } from "../interfaces/service";

type Target = string | number;

/**
 * The Singleton class defines the `config` method that lets clients access
 * the unique singleton instance.
 */
export class Telegram implements IService {
  private static instance: Telegram;

  private readonly _bot: Bot;
  private readonly _target: Target;

  private constructor(token: string, target: Target) {
    this._bot = new Bot(token);
    this._target = target;
  }

  public static config(token: string, target: Target): Telegram {
    if (!Telegram.instance) {
      Telegram.instance = new Telegram(token, target);
    }

    return Telegram.instance;
  }

  public async sendMessage(message: string): Promise<boolean> {
    try {
      await this._bot.api.sendMessage(this._target, message, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        protect_content: true
      });
      return Promise.resolve(true);
    } catch (err) {
      console.log(err);
      return Promise.resolve(false);
    }
  }

  public async info(): Promise<UserFromGetMe> {
    return await this._bot.api.getMe();
  }

  public run() {
    this._bot.start();
  }
  public stop() {
    this._bot.stop();
  }
}
