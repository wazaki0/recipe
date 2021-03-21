// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {RecipeService} from '../recipes/recipe.service';
// import {Observable, Subscription} from 'rxjs';
// import {Recipe, RecipeDB} from '../recipes/recipe.model';
// import {map, tap} from 'rxjs/operators';
// import {AuthService} from '../auth/auth.service';
//
// @Injectable() // use another service for this service (recipe.service - where we manipulate with recipes) - need @Injectable
// export class DataStorageService {
//   constructor(private http: HttpClient,
//               private recipeService: RecipeService,
//               private authService: AuthService) {
//
//   }
//
//   storeRecipes(): Subscription { // overwrites all recipes in database
//     const recipes = this.recipeService.getRecipes();
//     return this.http.put('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipes)
//       .subscribe(response => {
//         console.log(response);
//       });
//     // put("link to database/subfolder.json")
//     // subscribe needs to be written even though not useful - so our http request goes through
//   }
//
//   addRecipe(recipe: Recipe): Subscription {
//
//     return this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes/'
//       + recipe.id + '.json', recipe)
//       .subscribe(response => {
//         console.log(response);
//       });
//   }
//
//   /* createRecipe(): Subscription {
//      const recipe: Recipe;
//      return this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json', recipe)
//        .subscribe(response => {
//          console.log(response);
//        });
//
//    }*/
//
//   fetchRecipes(): Observable<RecipeDB[]> {
//     return this.http.get<RecipeDB[]>('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes.json')
//       .pipe(
//         // SECOND PART REQUEST FOR RECIPES (first part in auth.interceptor)
//         map(recipes => { // map is an operator which transforms an HTTP request (in this case response - from application server)
//           const rowIds: string[] = Object.keys(recipes);
//           const resultData: RecipeDB[] = [];
//
//           rowIds.forEach(key => {
//             const recipeServer = recipes[key];
//             const recipe = {...recipeServer, ingredient: recipeServer.ingredients ? recipeServer.ingredients : []};
//             const recipeDB = new RecipeDB();
//             recipeDB.id = key;
//             recipeDB.recipe = recipe;
//             resultData.push(recipeDB);
//           });
//
//           return resultData;
//         }), tap(recipes => {
//           this.recipeService.overwriteRecipes(recipes);
//           // overwrite the recipes through tap, which doesn't affect anything, only takes in the object emitted (recipe array)
//         })
//       );
//   }
//
// }
