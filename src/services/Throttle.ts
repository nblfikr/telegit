import { interval, map } from 'rxjs';
import { IService } from '../interfaces/service';
import { Telegram } from './Telegram';

export class Throttle implements IService {
    private static instance: Throttle;

    private _queue: string[] = [];
    private _transmitter: Telegram;

    private constructor(transmitter: Telegram) {
        this._transmitter = transmitter
    }

    public static config(transmitter: Telegram) {
        if (!Throttle.instance) {
            Throttle.instance = new Throttle(transmitter)
        }

        return Throttle.instance
    }

    public push(message: string) {
        this._queue.push(message);
    }

    public run() {
        interval(5000)
        .pipe(
            map(() => {
                if (this._queue.length > 0) {
                    const turn = this._queue[0]
                    this._queue.shift() // remove the first element
                    return turn
                }
            })
        )
        .subscribe( data => {
            if (data !== undefined ) {
                this._transmitter.sendMessage(data)
            }
        })
    }

    public stop() {}
    
}