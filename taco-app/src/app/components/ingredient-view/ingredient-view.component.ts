import {Component, Input, OnInit} from "@angular/core";
import {IngredientService, Ingredient} from "../../services/ingredient.service";

@Component({
    selector: 'ingredient-view',
    templateUrl: 'ingredient-view.component.html',
    styleUrls: ['ingredient-view.component.css'],
    providers: []
})

export class IngredientViewComponent implements OnInit {

    @Input()
    categoryId: string;

    ingredients: Ingredient[];

    constructor(private ingredientService: IngredientService) {
    }

    ngOnInit(): void {
        this.ingredientService.getIngredients(this.ingredientService.category[this.categoryId])
            .then(ingredients => this.ingredients = ingredients);
    }
}