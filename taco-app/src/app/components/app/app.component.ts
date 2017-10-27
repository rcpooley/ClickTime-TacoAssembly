import {Component} from '@angular/core';

interface Nav {
    id: string;
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent {

    images = {
        banner: 'assets/images/banner.png'
    };

    navopts: Nav[] = [
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

    activeNav: Nav = this.navopts[0];

    setNav(nav: Nav) {
        this.activeNav = nav;
    }
}
