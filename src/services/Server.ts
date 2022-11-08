import polka, { Polka } from "polka";
import bodyParser from "body-parser";

import { IRouteProvider } from "../interfaces";
import { IService } from "../interfaces/service";

export default class Server implements IService {
  public readonly _http: Polka;
  private readonly _port: number;

  constructor(port: number) {
    this._port = port;
    this._http = polka();
  }

  public run(routes?: IRouteProvider[]) {
    this._http.use(bodyParser.json());

    this._http.get("/", (_, res) => void res.writeHead(200).end("OK"));

    const approutes = routes as IRouteProvider[];
    for (const route of approutes) {
      route.register();
    }

    this._http.listen(this._port, () =>
      console.log("server running on port: " + this._port)
    );
  }

  public stop() {
    this._http.server.close();
  }
}
