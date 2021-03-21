import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Observable, Subscription} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable() // use another service for this service (recipe.service - where we manipulate with recipes) - need @Injectable
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {

  }

  storeRecipes(): Subscription { // overwrites all recipes in database
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
    // put("link to database/subfolder.json")
    // subscribe needs to be written even though not useful - so our http request goes through
  }

  /* createRecipe(): Subscription {
     const recipe: Recipe;
     return this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipe)
       .subscribe(response => {
         console.log(response);
       });

   }*/

  fetchRecipes(): Observable<Recipe[]> {
    /* pipe allows us to create imaginary pipes - where the information can be manipulated through different functions -
    without affecting the result (and being able to subscribe from component) */
    return this.http.get<Recipe[]>('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json',)
      .pipe(
        // SECOND PART REQUEST FOR RECIPES (first part in auth.interceptor)
        map(recipes => { // map is an operator which transforms an HTTP request (in this case response - from application server)
          return recipes.map(recipe => {
            return {...recipe, ingredient: recipe.ingredients ? recipe.ingredients : []};
            // recipes.map is called on an array - transforms array output
            /* (...recipe) means all variables of that object will be initialized in this array's object.
            Here it is used to add an array of empty ingredients - if ingredients were null*/
          });
        }), tap(recipes => {
          this.recipeService.overwriteRecipes(recipes);
          // overwrite the recipes through tap, which doesn't affect anything, only takes in the object emitted (recipe array)
        })
      );
    // take defines how many values to take from subscription at this point of time - without subscribing for more

  }

}
