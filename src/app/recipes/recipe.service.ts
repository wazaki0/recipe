import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<Recipe[]>();


   // Already saved onto database!
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index]; // based on id - index of array - gets that recipe
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }

  addRecipe(recipe: Recipe): void {

    this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipe)
      .subscribe(response => {
        console.log('add recipe response: ' + response);
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice()); // indicates change of recipe array
      });
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
