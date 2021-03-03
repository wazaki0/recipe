import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';

import {Recipe} from './recipe.model';

export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [ // can directly access recipe from outside
    new Recipe('TestRecipe',
      'very juicy - maybe crispy?',
      'https://cleanfoodcrush.com/wp-content/uploads/2019/01/Super-Easy-Chicken-Stir-Fry-Recipe-by-CFC.jpg',
      'https://www.youtube.com/watch?v=MuZGBlYEYMo',
      [
        new Ingredient('Chicken Breast 300g', 1),
        new Ingredient('Chicken wings', 2),
        new Ingredient('Rice in g', 500)
      ])
  ];

  getRecipes(): Recipe[]{
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }
  // setRecipes(){
  //
  // }
}
