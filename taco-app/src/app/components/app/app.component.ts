import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {StateService} from "../../services/state.service";

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

    activeMsg: string = 'clear';

    constructor(private stateService: StateService) {
        this.navopts = [
            {
                id: 'tacos',
                name: 'My Tacos'
            },
            {
                id: 'add',
                name: 'Add a Taco'
            },
            {
                id: 'about',
                name: 'About'
            }
        ];
        this.activeNav = this.navopts[0];
    }

    ngOnInit(): void {
        this.stateService.navEvent.subscribe((nav: string) => {
            this.setNav(this.getNavById(nav));
            this.scrollDown();
        });

        this.stateService.msgEvent.subscribe((msg: string) => this.activeMsg = msg);
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

    setNav(nav: Nav) {
        this.activeNav = nav;
    }
}
