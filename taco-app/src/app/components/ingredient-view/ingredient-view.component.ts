import {Component, Input, OnInit} from "@angular/core";
import {IngredientService, Ingredient, Category} from "../../services/ingredient.service";

export interface ParentData {
    selectedIngredients: Ingredient[];
    allIngredients: Ingredient[];
}

@Component({
    selector: 'ingredient-view',
    templateUrl: 'ingredient-view.component.html',
    styleUrls: ['ingredient-view.component.css'],
    providers: []
})

export class IngredientViewComponent implements OnInit {

    @Input()
    categoryId: string;

    @Input()
    parentData: ParentData;

    category: Category;

    ingredients: Ingredient[];
    selectedIngredients: Ingredient[];
    ingSearch: string = '';

    images = {
        search: 'assets/images/search.png'
    };

    constructor(private ingredientService: IngredientService) {
    }

    ngOnInit(): void {
        this.selectedIngredients = [];
        if (this.parentData) {
            this.parentData.selectedIngredients = this.selectedIngredients;
        }

        let onIngredients = () => {
            this.ingredients = this.ingredientService.getIngredients(this.category);
            this.parentData.allIngredients = this.ingredients;
        };

        this.category = this.ingredientService.category[this.categoryId];
        if (!this.ingredientService.isReady) {
            this.ingredientService.onReady.subscribe(() => {
                onIngredients();
            });
        } else {
            onIngredients();
        }
    }

    toggleIngredient(ing: Ingredient) {
        let idx = this.selectedIngredients.indexOf(ing);
        if (idx >= 0) {
            return this.selectedIngredients.splice(idx, 1);
        }

        if (this.selectedIngredients.length >= this.category.max) {
            this.selectedIngredients.splice(0, 1);
        }

        this.selectedIngredients.push(ing);
    }
}