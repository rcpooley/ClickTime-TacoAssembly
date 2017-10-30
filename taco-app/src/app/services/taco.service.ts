import {Injectable} from "@angular/core";
import {Ingredient, IngredientService} from "./ingredient.service";
import {StateService} from "./state.service";

export interface Taco {
    ingredients: {[s: string]: Ingredient[]};
    name: string;
    sentence: string;
}

export interface TacoData {
    tacos: Taco[];
}

interface SentenceTemplate {
    base: string;
    opts: {[s: string]: string};
    max: number;
}

@Injectable()
export class TacoService {

    data: TacoData;

    sentenceTemplates: SentenceTemplate[];

    nextTacoId: number;

    constructor(private ingredientService: IngredientService, private stateService: StateService) {
        this.data = {
            tacos: []
        };
        this.nextTacoId = 1;

        this.sentenceTemplates = [
            {
                base: 'Your taco is served in a %shells%, ' +
                'formed on the base layer of %baseLayers%, ' +
                'with a dash of %mixins%%mixins1%, ' +
                'complimented with a delicious choice of condiments featuring %allcondiments%, ' +
                'and to top it all off is seasoned with %seasonings%',
                opts: {
                    mixins1: ' and a pinch of %mixins%'
                },
                max: 3
            }
        ];
    }

    private setTacoSentence(taco: Taco): void {
        let getOnlyIng = function (cat: string) {
            return taco.ingredients[cat][0].name;
        };

        let temp: SentenceTemplate = this.sentenceTemplates[Math.floor(Math.random() * this.sentenceTemplates.length)];

        let bld: string = temp.base;

        let repl = ['shells', 'baseLayers', 'mixins', 'condiments', 'seasonings'];
        for (let i = 0; i < repl.length; i++) {
            bld = bld.replace(new RegExp('%' + repl[i] + '%',"g"), getOnlyIng(repl[i]));

            let ings = taco.ingredients[repl[i]];
            for (let j = 1; j < temp.max; j++) {
                let key = repl[i] + j;
                let val = '';
                if (key in temp.opts && j < ings.length) {
                    val = temp.opts[key].replace(new RegExp('%' + repl[i] + '%',"g"), ings[j].name);
                }
                bld = bld.replace(new RegExp('%' + key + '%',"g"), val);
            }
        }

        let condiments = taco.ingredients['condiments'];
        let conStr = condiments[0].name;
        for (let i = 1; i < condiments.length; i++) {
            if (i == condiments.length - 1) {
                if (i > 1) {
                    conStr += ',';
                }
                conStr += ' and ' + condiments[i].name;
            } else {
                conStr += ', ' + condiments[i].name;
            }
        }
        bld = bld.replace(/%allcondiments%/g, conStr);

        taco.sentence = bld;
    }

    getRandomTacoIngredients(): {[s: string]: Ingredient[]} {
        if (!this.ingredientService.isReady) {
            return null;
        }

        let categories = Object.keys(this.ingredientService.category).map((k) => this.ingredientService.category[k].id);
        let ingreds: {[s: string]: Ingredient[]} = {};

        for(let i = 0; i < categories.length; i++) {
            let cat = categories[i];
            ingreds[cat] = [];

            //Get number of ingredients we will add
            let num = Math.floor(Math.random() * this.ingredientService.category[cat].max) + 1;

            let ings: Ingredient[] = this.ingredientService.getIngredients(this.ingredientService.category[cat]);

            for (let j = 0; j < num; j++) {
                //Get random ingredient that hasn't been added
                let ing;
                do {
                    ing = ings[Math.floor(Math.random() * ings.length)];
                } while (ingreds[cat].indexOf(ing) >= 0);

                //Add the ingredient
                ingreds[cat].push(ing);
            }
        }

        return ingreds;
    }

    getNewTacoName(): string {
        return "Taco " + (this.nextTacoId++);
    }

    addTaco(taco: Taco): void {
        this.setTacoSentence(taco);
        this.data.tacos.push(taco);
        this.stateService.navEvent.emit('tacos');
    }
}