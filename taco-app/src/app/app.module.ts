import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IngredientService} from "./services/ingredient.service";
import {IngredientViewComponent} from "./components/ingredient-view/ingredient-view.component";

@NgModule({
    declarations: [
        AppComponent,
        IngredientViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        IngredientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
