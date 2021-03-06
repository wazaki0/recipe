import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [ // each object represents a route in my recipe page
  { path: '', component: HomeComponent, pathMatch: 'full'}, // absolute empty path (thanks to pathMatch) - otherwise every path has empty
  { path: 'recipes', component: RecipesComponent} // name of path, to which component
];

@NgModule(
  {
    imports: [RouterModule.forRoot(appRoutes)], // configures all the routes stated above
    exports: [RouterModule] // so it can be imported to our main module - app module (which contains everything)
  }

)
export class AppRoutingModule{

}
