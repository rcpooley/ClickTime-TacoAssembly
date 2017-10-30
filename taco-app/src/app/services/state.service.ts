import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class StateService {

    navEvent: EventEmitter<string>;
    msgEvent: EventEmitter<string>;

    constructor() {
        this.navEvent = new EventEmitter<string>();
        this.msgEvent = new EventEmitter<string>();
    }
}