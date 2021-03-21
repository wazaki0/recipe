import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    /* the resolve method is invoked when router navigates somewhere - router waits for data to be resolved,
    before route is finally activated */

    return this.recipeService.getRecipes();
  }
}
