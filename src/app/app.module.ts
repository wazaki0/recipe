import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeSpecificComponent } from './recipes/recipe-specific/recipe-specific.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {VideoModule} from './video/video.module';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, // declare components so angular sees them
    HeaderComponent,
    ShoppingListComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeSpecificComponent,
    ShoppingEditComponent,
    DropdownDirective,
    HomeComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule, // declare modules
    YouTubePlayerModule,
    VideoModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [Title], // title
  bootstrap: [AppComponent] // what starts application
})
export class AppModule { }
