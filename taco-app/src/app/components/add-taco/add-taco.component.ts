import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import {IngredientService, Category, Ingredient} from "../../services/ingredient.service";
import {ParentData} from "../ingredient-view/ingredient-view.component";
import {TacoService, Taco} from "../../services/taco.service";

@Component({
    selector: 'add-taco',
    templateUrl: 'add-taco.component.html',
    styleUrls: ['add-taco.component.css'],
    providers: []
})

export class AddTacoComponent implements AfterViewInit {

    catMap: {[s: string]: Category};
    categories: string[];
    dynClass: any = {};
    curCat: number;

    selectedIngredients: {[s: string]: ParentData} = {};

    @ViewChild('addtaco') domEl: ElementRef;

    myWidth: number;
    navActive: boolean = false;

    constructor(private ingredientService: IngredientService, private tacoService: TacoService) {
        this.catMap = this.ingredientService.category;
        this.categories = Object.keys(this.ingredientService.category).map((k) => this.ingredientService.category[k].id);
        this.categories.forEach((cat) => {
            this.dynClass[cat] = '';
            this.selectedIngredients[cat] = {
                selectedIngredients: null,
                allIngredients: []
            };
        });
        this.curCat = 0;
        this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
    }

    ngAfterViewInit(): void {
        this.myWidth = this.domEl.nativeElement.getBoundingClientRect().width;
    }

    onResize() {
        this.myWidth = this.domEl.nativeElement.getBoundingClientRect().width;
    }

    toggleNav() {
        this.navActive = !this.navActive;
    }

    rmIngred(cat: string, ingred: Ingredient): void {
        let ings: Ingredient[] = this.selectedIngredients[cat].selectedIngredients;
        let idx = ings.indexOf(ingred);
        if (idx >= 0) {
            ings.splice(idx, 1);
        }
    }

    hasAll(): boolean {
        for(let i = 0; i < this.categories.length; i++) {
            if (this.selectedIngredients[this.categories[i]].selectedIngredients.length == 0) {
                return false;
            }
        }
        return true;
    }

    setCat(cat: string) {
        let nextIdx = this.categories.indexOf(cat);
        if (nextIdx > this.curCat) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-up';
            this.curCat = nextIdx;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
        } else if (nextIdx < this.curCat) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-down';
            this.curCat = nextIdx;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-down';
        }
    }

    prevCat() {
        if (this.curCat > 0) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-down';
            this.curCat--;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-down';
        }
    }

    nextCat() {
        if (this.curCat < this.categories.length - 1) {
            this.dynClass[this.categories[this.curCat]] = 'slide-out-up';
            this.curCat++;
            this.dynClass[this.categories[this.curCat]] = 'slide-in-up';
        } else if (this.curCat == this.categories.length - 1 && this.hasAll()) {
            let newTaco: Taco = {
                ingredients: {},
                name: this.tacoService.getNewTacoName(),
                sentence: null
            };
            for(let i = 0; i < this.categories.length; i++) {
                let cat = this.categories[i];
                newTaco.ingredients[cat] = JSON.parse(JSON.stringify(this.selectedIngredients[cat].selectedIngredients));
            }
            this.tacoService.addTaco(newTaco);
        }
    }

    randomTaco(): void {
        this.tacoService.getRandomTacoIngredients().then(ingreds => {
            for(let i = 0; i < this.categories.length; i++) {
                let cat = this.categories[i];
                let pdata = this.selectedIngredients[cat];

                //Clear selectedIngredients
                pdata.selectedIngredients.splice(0, pdata.selectedIngredients.length);

                Array.prototype.push.apply(pdata.selectedIngredients, ingreds[cat]);
            }
        });
    }
}