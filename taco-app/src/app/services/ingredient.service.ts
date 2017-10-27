import {Injectable} from "@angular/core";
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

    constructor(private http: HttpClient) {
        this.ingredientCache = {};
    }

    getIngredients(category: Category): Promise<Ingredient[]> {
        return new Promise((resolve, reject) => {
            if (category.id in this.ingredientCache) {
                resolve(this.ingredientCache[category.id]);
            } else {
                this.http
                    .get(this.baseUrl + '/' + category.id)
                    .subscribe((resp: Ingredient[]) => {
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