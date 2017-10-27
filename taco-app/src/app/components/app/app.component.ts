import {Component, OnInit} from '@angular/core';
import {TacoService} from "../../services/taco.service";

interface Nav {
    id: string;
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{

    images = {
        banner: 'assets/images/banner.png'
    };

    navopts: Nav[];
    activeNav: Nav;

    constructor(private tacoService: TacoService) {
        this.navopts = [
            {
                id: 'tacos',
                name: 'My Tacos'
            },
            {
                id: 'stats',
                name: 'Taco Stats'
            },
            {
                id: 'add',
                name: 'Add a Taco'
            }
        ];
        this.activeNav = this.navopts[0];
    }

    ngOnInit(): void {
        this.tacoService.newTaco.subscribe(() => {
            this.setNav(this.navopts[0]);
        });
    }

    setNav(nav: Nav) {
        this.activeNav = nav;
    }
}
