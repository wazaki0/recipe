import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {HomeComponent} from './home/home.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeSpecificComponent} from './recipes/recipe-specific/recipe-specific.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [ // each object represents a route in my recipe page
  {path: '', component: HomeComponent, pathMatch: 'full'}, // absolute empty path (thanks to pathMatch) - otherwise every path has empty
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard], // requirements to view recipes, and what possible to view
    children: [
      {path: '', component: RecipeStartComponent}, // before user clicks a recipe
      {path: 'new', component: RecipeEditComponent}, // before :id - so recipes/new doesnt load recipe, but creates one
      {
        path: ':id',
        component: RecipeSpecificComponent,
        resolve: [RecipesResolverService] // resolver loads data before showing route (website)
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      } // same component - but edit mode for a recipe
    ]
  }, // ingredient of path, to which component
  {path: 'auth', component: AuthComponent}
];

@NgModule(
  {
    imports: [RouterModule.forRoot(appRoutes)], // configures all the routes stated above
    exports: [RouterModule] // so it can be imported to our main module - app module (which contains everything)
  }
)
export class AppRoutingModule {

}
