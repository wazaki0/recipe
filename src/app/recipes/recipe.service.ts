import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<Recipe[]>();

  /*private recipes: Recipe[] = [ // can directly access recipe from outside
    new Recipe('TestRecipe',
      'very juicy - maybe crispy?',
      'https://cleanfoodcrush.com/wp-content/uploads/2019/01/Super-Easy-Chicken-Stir-Fry-Recipe-by-CFC.jpg',
      'https://www.youtube.com/watch?v=MuZGBlYEYMo',
      [
        new Ingredient('Chicken Breast 300g', 1),
        new Ingredient('Chicken wings', 2),
        new Ingredient('Rice in g', 500)
      ], '', 'Snack', 'Frying', 80),
    new Recipe('Beans',
      'very juicy - maybe crispy?',
      'https://cleanfoodcrush.com/wp-content/uploads/2019/01/Super-Easy-Chicken-Stir-Fry-Recipe-by-CFC.jpg',
      'https://www.youtube.com/watch?v=qyYHWkVWQ4o&ab_channel=KillerBean',
      [
        new Ingredient('Chicken Breast 300g', 1),
        new Ingredient('Chicken wings', 2),
        new Ingredient('Rice in g', 500)
      ], '', 'Snack', 'Frying', 80)
  ];*/ // Already saved onto database!
  private recipes: Recipe[] = [];

  getRecipe(index: number): Recipe {
    return this.recipes[index]; // based on id - index of array - gets that recipe
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); // indicates change of recipe array
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  overwriteRecipes(recipes: Recipe[]): void { // sets all recipes wanted visible to our array of recipes visible
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // indicates that there was a change of recipe array
  }
}
