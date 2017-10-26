import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {IngredientService} from "./services/ingredient.service";
import {IngredientViewComponent} from "./components/ingredient-view/ingredient-view.component";
import {SearchPipe} from "./pipes/searchpipe.pipe";
import {AddTacoComponent} from "./components/add-taco/add-taco.component";

@NgModule({
    declarations: [
        AppComponent,
        IngredientViewComponent,
        AddTacoComponent,
        SearchPipe
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
