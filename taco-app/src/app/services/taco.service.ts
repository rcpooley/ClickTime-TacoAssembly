import {Injectable, EventEmitter} from "@angular/core";
import {Ingredient} from "./ingredient.service";

export interface Taco {
    ingredients: {[s: string]: Ingredient[]};
}

export interface TacoData {
    tacos: Taco[];
}

@Injectable()
export class TacoService {

    data: TacoData;

    newTaco: EventEmitter<boolean>;

    constructor() {
        this.data = {
            tacos: []
        };
        this.newTaco = new EventEmitter<boolean>();
    }

    addTaco(taco: Taco): void {
        this.data.tacos.push(taco);
        this.newTaco.emit(true);
    }
}