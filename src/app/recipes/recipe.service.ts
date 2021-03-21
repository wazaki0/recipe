import {Recipe, RecipeDB} from './recipe.model';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<RecipeDB[]>();

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

  private recipes: RecipeDB[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getRecipe(index: number): RecipeDB {
    return this.recipes[index]; // based on id - index of array - gets that recipe
  }

  fetchRecipes(): Observable<RecipeDB[]> {
    return this.http.get<RecipeDB[]>('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        // SECOND PART REQUEST FOR RECIPES (first part in auth.interceptor)
        map(recipes => { // map is an operator which transforms an HTTP request (in this case response - from application server)
          const rowIds: string[] = Object.keys(recipes);
          const resultData: RecipeDB[] = [];

          rowIds.forEach(key => {
            const recipeServer = recipes[key];
            const recipe = {...recipeServer, ingredient: recipeServer.ingredients ? recipeServer.ingredients : []};
            const recipeDB = new RecipeDB();
            recipeDB.id = key;
            recipeDB.recipe = recipe;
            resultData.push(recipeDB);
          });

          return resultData;
        }), tap(recipes => {
          this.overwriteRecipes(recipes);
          // overwrite the recipes through tap, which doesn't affect anything, only takes in the object emitted (recipe array)
        })
      );
  }

  getRecipes(): RecipeDB[] {
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }

  addRecipe(recipe: Recipe): void {

    this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipe)
      .pipe(
        tap(response => {
          console.log('add recipe response: ' + response);
          const db = new RecipeDB();
          db.id = response.toString();
          db.recipe = recipe;
          this.recipes.push(db);
          this.recipesChanged.next(this.recipes.slice()); // indicates change of recipe array
        })
      )
      .subscribe(response => {


      });
  }

  updateRecipe(index: number, newRecipe: RecipeDB): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  overwriteRecipes(recipes: RecipeDB[]): void { // sets all recipes wanted visible to our array of recipes visible
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // indicates that there was a change of recipe array
  }
}
