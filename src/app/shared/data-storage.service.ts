import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Observable, Subscription} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable() // use another service for this service (recipe.service - where we manipulate with recipes) - need @Injectable
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

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

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => { // pipe map is an operator which transforms an HTTP request (in this case input)
          return recipes.map(recipe => {
            return {...recipe, ingredient: recipe.ingredients ? recipe.ingredients : []};
            // recipes.map is called on an array - transforms array output
            /* (...recipe) means all variables of that object will be initialized in this array's object.
            Here it is used to add empty ingredients - if ingredients were null*/
          });
        }), tap(recipes => {
          this.recipeService.overwriteRecipes(recipes);
          // overwrite the recipes through tap, which doesn't affect anything, only takes in the object emitted (recipe array)
        })
      );

  }

}
