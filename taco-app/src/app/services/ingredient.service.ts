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
            name: 'Mixins',
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

    constructor(private http: HttpClient) {
    }

    getIngredients(category: Category): Promise<Ingredient[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get(this.baseUrl + '/' + category.id)
                .subscribe((resp) => {
                    resolve(resp);
                }, (err) => {
                    console.trace('Http error:',err);
                    reject({err: err});
                });
        });
    }
}