import {Component} from "@angular/core";
import {TacoService, TacoData, Taco} from "../../services/taco.service";
import {IngredientService} from "../../services/ingredient.service";
import {StateService} from "../../services/state.service";

@Component({
    selector: 'taco-list',
    templateUrl: 'taco-list.component.html',
    styleUrls: ['taco-list.component.css'],
    providers: []
})

export class TacoListComponent {

    tacoData: TacoData;

    private waitingForIngredients: boolean = false;

    constructor(private tacoService: TacoService, private ingredientService: IngredientService, private stateService: StateService) {
        this.tacoData = this.tacoService.data;
    }

    deleteTaco(taco: Taco): void {
        let idx = this.tacoData.tacos.indexOf(taco);
        if (idx >= 0) {
            this.tacoData.tacos.splice(idx, 1);
        }
    }

    addTaco(): void {
        this.stateService.navEvent.emit('add');
    }

    randomTaco(): void {
        if (!this.ingredientService.isReady) {
            if (!this.waitingForIngredients) {
                this.waitingForIngredients = true;
                this.stateService.msgEvent.emit('waiting');
                this.ingredientService.onReady.subscribe(() => {
                    this.stateService.msgEvent.emit('clear');
                    this.randomTaco();
                });
            }
            return;
        }

        let ingreds = this.tacoService.getRandomTacoIngredients();

        let newTaco: Taco = {
            ingredients: ingreds,
            name: this.tacoService.getNewTacoName(),
            sentence: null
        };
        this.tacoService.addTaco(newTaco);
    }
}