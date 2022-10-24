import { NextHandler as Next, Polka, Request, Response } from "polka";
import { createHmac, timingSafeEqual } from "crypto";

import { Event } from "./Event";
import { IRouteProvider } from "../../interfaces";
import { Telegram } from "../../services/Telegram";

export class Webhook implements IRouteProvider {
  private readonly _http: Polka;
  private readonly _route: string = "github";
  private readonly _secret_token: string;
  private readonly _headers = { "Content-Type": "application/json" }

  constructor(http: Polka, secret: string) {
    this._http = http;
    this._secret_token = secret;
  }
  
  /**
   * Github uses an HMAC hex digest to compute the hash
   *
   * See: https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks
   * See: https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options
   */
  private signature(payload: string): string {
      if (payload.length === 0) return "payload is expected";
    
      return `sha256=${createHmac("sha256", this._secret_token)
        .update(payload)
        .digest("hex")}`;
  }  

  /**
   * Need better documentation
   * Compare between the requested payload and secret key
   */
  private verify(payload: string, key: string): boolean {
    if (payload.length === 0 || key.length === 0) return false;

    return timingSafeEqual(Buffer.from(payload), Buffer.from(key));
  }

  /**
   * Validate the request to ensure only receiving
   * the expected Github requests
   */
  private async authorize(req: Request, res: Response, next: Next) {
    const requestSignature = req.headers["x-hub-signature-256"] as string | undefined;

    if (requestSignature === undefined) {
      res
        .writeHead(401, this._headers)
        .end(JSON.stringify({ message: "Unauthorized" }));
      return;
    }
    
    const signature = this.signature(JSON.stringify(req.body))
    const valid = this.verify(signature, requestSignature)

    if (!valid) {
      res.writeHead(401, this._headers).end(JSON.stringify({ message: "Unauthorized" }));
      return;
    }

    next();
  }

  private webhook(req: Request, res: Response): void {
    const ghEvent = req.headers["x-github-event"] as string | undefined;

    if (ghEvent === undefined) {
      res.writeHead(401, this._headers).end(JSON.stringify({ message: "Unauthorized" }));
      return;
    }

    // const event = new Event(ghEvent, req.body)
    // const presenter = new Telegram();

    res.writeHead(200).end("ok");
  }

  public register() {
    this._http.post(this._route, this.authorize.bind(this), this.webhook.bind(this));
  }
  
}
