import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    /* the resolve method is invoked when router navigates somewhere - router waits for data to be resolved,
    before route is finally activated */

    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
//      return this.dataStorageService.fetchRecipes(); // if recipe[] empty, we can overwrite all recipes using database
        this.recipeService.fetchRecipes().subscribe();
    } else {
      return recipes;
      /* if recipe[] loaded already, we don't want to delete any information that could have been edited
      and not yet saved onto database*/
    }
  }
}
