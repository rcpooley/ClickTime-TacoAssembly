import {Component} from "@angular/core";
import {IngredientService, Category, Ingredient} from "../../services/ingredient.service";
import {ParentData} from "../ingredient-view/ingredient-view.component";
import {TacoService, Taco} from "../../services/taco.service";

@Component({
    selector: 'add-taco',
    templateUrl: 'add-taco.component.html',
    styleUrls: ['add-taco.component.css'],
    providers: []
})

export class AddTacoComponent {

    catMap: {[s: string]: Category};
    categories: string[];
    dynClass: any = {};
    curCat: number;

    selectedIngredients: {[s: string]: ParentData} = {};

    constructor(private ingredientService: IngredientService, private tacoService: TacoService) {
        this.catMap = this.ingredientService.category;
        this.categories = Object.keys(this.ingredientService.category).map((k) => this.ingredientService.category[k].id);
        this.categories.forEach((cat) => {
            this.dynClass[cat] = '';
            this.selectedIngredients[cat] = {
                selectedIngredients: null
            };
        });
        this.curCat = 0;
        this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
    }

    rmIngred(cat: string, ingred: Ingredient): void {
        let ings: Ingredient[] = this.selectedIngredients[cat].selectedIngredients;
        let idx = ings.indexOf(ingred);
        if (idx >= 0) {
            ings.splice(idx, 1);
        }
    }

    hasAll(): boolean {
        for(let i = 0; i < this.categories.length; i++) {
            if (this.selectedIngredients[this.categories[i]].selectedIngredients.length == 0) {
                return false;
            }
        }
        return true;
    }

    setCat(cat: string) {
        let nextIdx = this.categories.indexOf(cat);
        if (nextIdx > this.curCat) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-up';
            this.curCat = nextIdx;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
        } else if (nextIdx < this.curCat) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-down';
            this.curCat = nextIdx;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-down';
        }
    }

    prevCat() {
        if (this.curCat > 0) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-down';
            this.curCat--;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-down';
        }
    }

    nextCat() {
        if (this.curCat < this.categories.length - 1) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-up';
            this.curCat++;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
        } else if (this.curCat == this.categories.length - 1 && this.hasAll()) {
            let newTaco: Taco = {
                ingredients: {}
            };
            for(let i = 0; i < this.categories.length; i++) {
                let cat = this.categories[i];
                newTaco.ingredients[cat] = JSON.parse(JSON.stringify(this.selectedIngredients[cat].selectedIngredients));
            }
            this.tacoService.addTaco(newTaco);
        }
    }
}