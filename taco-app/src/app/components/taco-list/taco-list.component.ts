import {Component} from "@angular/core";
import {TacoService, TacoData} from "../../services/taco.service";

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

}