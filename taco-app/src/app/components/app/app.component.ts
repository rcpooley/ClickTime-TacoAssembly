import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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

    @ViewChild('tacolist') domTacoList: ElementRef;

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

    private getNavById(id: string): Nav {
        for (let i = 0; i < this.navopts.length; i++) {
            if (this.navopts[i].id == id) {
                return this.navopts[i];
            }
        }
        return null;
    }

    private scrollDown() {
        setTimeout(() => {
            this.domTacoList.nativeElement.scrollTop = this.domTacoList.nativeElement.scrollHeight;
        }, 1);
    }

    ngOnInit(): void {
        this.tacoService.navEvent.subscribe((nav: string) => {
            this.setNav(this.getNavById(nav));
            this.scrollDown();
        });
    }

    setNav(nav: Nav) {
        this.activeNav = nav;
    }
}
