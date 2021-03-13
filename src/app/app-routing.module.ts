import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {HomeComponent} from './home/home.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeSpecificComponent} from './recipes/recipe-specific/recipe-specific.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [ // each object represents a route in my recipe page
    {path: '', component: HomeComponent, pathMatch: 'full'}, // absolute empty path (thanks to pathMatch) - otherwise every path has empty
    {
        path: 'recipes', component: RecipesComponent,
        children: [
            {path: '', component: RecipeStartComponent}, // before user clicks a recipe
            {path: 'new', component: RecipeEditComponent}, // before :id - so recipes/new doesnt load recipe, but creates one
            {path: ':id', component: RecipeSpecificComponent},
            {path: ':id/edit', component: RecipeEditComponent} // same component - but edit mode for a recipe
        ]
    } // ingredient of path, to which component
];

@NgModule(
    {
        imports: [RouterModule.forRoot(appRoutes)], // configures all the routes stated above
        exports: [RouterModule] // so it can be imported to our main module - app module (which contains everything)
    }
)
export class AppRoutingModule {

}
