import {Ingredient} from '../shared/ingredient.module';

import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [ // can directly access recipe from outside
    new Recipe('TestRecipe',
      'very juicy - maybe crispy?',
      'https://cleanfoodcrush.com/wp-content/uploads/2019/01/Super-Easy-Chicken-Stir-Fry-Recipe-by-CFC.jpg',
      'https://www.youtube.com/watch?v=MuZGBlYEYMo',
      [
        new Ingredient('Chicken Breast 300g', 1),
        new Ingredient('Chicken wings', 2),
        new Ingredient('Rice in g', 500)
      ], '', 'Snack', 'Frying', 80)
  ];

  getRecipe(index: number): Recipe {
    return this.recipes[index]; // based on id - index of array - gets that recipe
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
  }
}
