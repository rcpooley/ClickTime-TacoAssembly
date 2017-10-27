import {Component} from "@angular/core";
import {TacoService, TacoData, Taco} from "../../services/taco.service";

@Component({
    selector: 'taco-list',
    templateUrl: 'taco-list.component.html',
    styleUrls: ['taco-list.component.css'],
    providers: []
})

export class TacoListComponent {

    tacoData: TacoData;

    constructor(private tacoService: TacoService) {
        this.tacoData = this.tacoService.data;
    }

    deleteTaco(taco: Taco): void {
        let idx = this.tacoData.tacos.indexOf(taco);
        if (idx >= 0) {
            this.tacoData.tacos.splice(idx, 1);
        }
    }

    addTaco(): void {
        this.tacoService.navEvent.emit('add');
    }
}