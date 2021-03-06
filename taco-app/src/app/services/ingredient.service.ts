import {Injectable, EventEmitter} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Category {
    id: string;
    name: string;
    max: number;
}

export interface Ingredient {
    slug: string;
    name: string;
}

@Injectable()
export class IngredientService {

    private baseUrl: string = 'https://tacos-sayjfycwsy.now.sh';

    category: {[s: string]: Category} = {
        shells: {
            id: 'shells',
            name: 'Shell',
            max: 1
        },
        baseLayers: {
            id: 'baseLayers',
            name: 'Base Layer',
            max: 1
        },
        mixins: {
            id: 'mixins',
            name: 'Mix-ins',
            max: 2
        },
        condiments: {
            id: 'condiments',
            name: 'Condiments',
            max: 3
        },
        seasonings: {
            id: 'seasonings',
            name: 'Seasonings',
            max: 1
        }
    };

    private ingredientCache: {[s: string]: Ingredient[]};
    isReady: boolean = false;

    onReady: EventEmitter<boolean>;

    constructor(private http: HttpClient) {
        this.ingredientCache = {};
        this.onReady = new EventEmitter<boolean>();

        //Pre fetch all ingredients
        let proms = [];
        let cats = Object.keys(this.category);
        for (let i = 0; i < cats.length; i++) {
            proms.push(this.fetchIngredients(this.category[cats[i]]));
        }
        Promise.all(proms).then(() => {
            this.isReady = true;
            this.onReady.emit(true);
        });
    }

    private static removeDuplicates(ingreds: Ingredient[]): Ingredient[] {
        let resp: Ingredient[] = [];
        let usedSlugs: string[] = [];
        for (let i = 0; i < ingreds.length; i++) {
            let ing = ingreds[i];
            if (usedSlugs.indexOf(ing.slug) == -1) {
                resp.push(ing);
                usedSlugs.push(ing.slug);
            }
        }
        return resp;
    }

    getIngredients(category: Category): Ingredient[] {
        if (!this.isReady) {
            return null;
        } else {
            return this.ingredientCache[category.id];
        }
    }

    private fetchIngredients(category: Category): Promise<Ingredient[]> {
        return new Promise((resolve, reject) => {
            if (category.id in this.ingredientCache) {
                resolve(this.ingredientCache[category.id]);
            } else {
                this.http
                    .get(this.baseUrl + '/' + category.id)
                    .subscribe((resp: Ingredient[]) => {
                        resp = IngredientService.removeDuplicates(resp);
                        this.ingredientCache[category.id] = resp;
                        resolve(resp);
                    }, (err) => {
                        console.trace('Http error:',err);
                        reject({err: err});
                    });
            }
        });
    }
}