import { Bot } from "grammy"
import { UserFromGetMe } from "grammy/out/types.node";

import { IService } from "../interfaces/service";

type Message = string;

export class Telegram implements IService {
    private readonly _bot: Bot;

    constructor(token: string) {
        this._bot = new Bot(token)
    }

    public async sendMessage(targetID: number, message: Message): Promise<import("@grammyjs/types/message.js").Message.TextMessage> {
        return await this._bot.api.sendMessage( targetID, message, {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            protect_content: true
        });
    }

    public async info(): Promise<UserFromGetMe> {
        return await this._bot.api.getMe();
    }

    public run() {
        this._bot.start();
    }
    public stop () {
        this._bot.stop();
    }
}