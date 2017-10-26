import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Category {
    id: string;
}

export interface Ingredient {
    slug: string;
    name: string;
}

@Injectable()
export class IngredientService {

    private baseUrl: string = 'https://tacos-sayjfycwsy.now.sh';

    category: {[s: string]: Category};

    constructor(private http: HttpClient) {
        //Initialize categories
        this.category = {};
        let categories = ['baseLayers', 'mixins', 'seasonings', 'condiments', 'shells'];
        categories.forEach((cat) => {
            this.category[cat] = {
                id: cat
            };
        });
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