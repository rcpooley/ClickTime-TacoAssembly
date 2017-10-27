import {Injectable, EventEmitter} from "@angular/core";
import {Ingredient} from "./ingredient.service";

export interface Taco {
    ingredients: {[s: string]: Ingredient[]};
    name: string;
    sentence: string;
}

export interface TacoData {
    tacos: Taco[];
}

@Injectable()
export class TacoService {

    data: TacoData;

    newTaco: EventEmitter<boolean>;
    nextTacoId: number;

    constructor() {
        this.data = {
            tacos: []
        };
        this.newTaco = new EventEmitter<boolean>();
        this.nextTacoId = 1;
    }

    private static setTacoSentence(taco: Taco): void {
        taco.sentence = "lol";
    }

    getNewTacoName(): string {
        return "Taco " + (this.nextTacoId++);
    }

    addTaco(taco: Taco): void {
        TacoService.setTacoSentence(taco);
        this.data.tacos.push(taco);
        this.newTaco.emit(true);
    }
}