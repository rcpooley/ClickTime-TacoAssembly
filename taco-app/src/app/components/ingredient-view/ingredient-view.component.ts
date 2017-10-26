import {Component, Input, OnInit, Pipe, PipeTransform} from "@angular/core";
import {IngredientService, Ingredient, Category} from "../../services/ingredient.service";

@Component({
    selector: 'ingredient-view',
    templateUrl: 'ingredient-view.component.html',
    styleUrls: ['ingredient-view.component.css'],
    providers: []
})



export class IngredientViewComponent implements OnInit {

    @Input()
    categoryId: string;

    category: Category;

    ingredients: Ingredient[];
    selectedIngredients: Ingredient[] = [];
    ingSearch: string = '';

    constructor(private ingredientService: IngredientService) {
    }

    ngOnInit(): void {
        this.category = this.ingredientService.category[this.categoryId];
        this.ingredientService.getIngredients(this.category)
            .then(ingredients => this.ingredients = ingredients);
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