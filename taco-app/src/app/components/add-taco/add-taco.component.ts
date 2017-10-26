import {Component} from "@angular/core";
import {IngredientService, Category} from "../../services/ingredient.service";
import {ParentData} from "../ingredient-view/ingredient-view.component";

@Component({
    selector: 'add-taco',
    templateUrl: 'add-taco.component.html',
    styleUrls: ['add-taco.component.css'],
    providers: []
})

export class AddTacoComponent {

    categories: string[];
    dynClass: any = {};
    curCat: number;

    selectedIngredients: {[s: string]: ParentData} = {};

    constructor(private ingredientService: IngredientService) {
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

    prevCat() {
        if (this.curCat > 0) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-down';
            this.curCat--;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-down';
        }
    }

    nextCat() {
        if (this.selectedIngredients[this.categories[this.curCat]].selectedIngredients.length == 0) return;
        if (this.curCat < this.categories.length - 1) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-up';
            this.curCat++;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
        }
    }
}