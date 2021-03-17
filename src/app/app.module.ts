import {NgModule} from '@angular/core'; // imported from angular first
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeSpecificComponent} from './recipes/recipe-specific/recipe-specific.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {VideoModule} from './video/video.module';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeService} from './recipes/recipe.service';
import {DataStorageService} from './shared/data-storage.service';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent, // declare components so angular sees them
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeSpecificComponent,
    DropdownDirective,
    HomeComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule, // declare modules - angular modules first for visual stimulation
    ReactiveFormsModule,
    YouTubePlayerModule,
    HttpClientModule,
    VideoModule,
    AppRoutingModule,
  ],
  providers: [RecipeService, DataStorageService, RecipesResolverService], // allows use in child components - meaning all components
  bootstrap: [AppComponent] // what starts application
})
export class AppModule {
}
