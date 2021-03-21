import {ApprovalStatus, Recipe, RecipeDB} from './recipe.model';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {map, tap} from 'rxjs/operators';
import {User} from '../auth/user.module';

@Injectable({providedIn: 'root'})
export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<RecipeDB[]>();
  currentUser: User;

  // Already saved onto database!
  private recipes: RecipeDB[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {

    this.authService.user
      .subscribe(user => { // when component initialized, subscribe to userAuthenticated change
        this.currentUser = user;
      });
  }

  async getRecipe(key: string, sourceTable: string = 'recipes'): Promise<RecipeDB> {
    const recipe = this.recipes.find(recipeDB => recipeDB.id === key); // based on key

    if (!recipe) {
      const recipeDb: RecipeDB = await this.http.get<Recipe>(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}/${key}.json`)
        .pipe(
          map(result => {
            if (result) {
              const recipe2 = {...result, ingredient: result.ingredients ? result.ingredients : []};
              const recipeDB = new RecipeDB();
              recipeDB.id = key;
              recipeDB.recipe = recipe2;
              return recipeDB;
            }
            return null;
          })
        ).toPromise();
      console.log(recipeDb);
      return recipeDb;
    }
    return recipe;
  }

  fetchRecipes(sourceTable: string): Observable<RecipeDB[]> {
    /* const params: HttpParams = new HttpParams()
       .set('orderBy', '"status"')
       .set('status', '"APPROVED"');*/
    // {params}

    return this.http.get<RecipeDB[]>(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}.json`
    )
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
    recipe.userId = this.currentUser.id;
    recipe.status = ApprovalStatus.Pending;

    this.http.post('https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/pendingrecipes.json', recipe)
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

  updateRecipe(key: string, recipe: Recipe): void {
    recipe.userId = this.currentUser.id;
    this.http.put(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/pendingrecipes/${key}.json`, recipe)
      .pipe(
        tap(response => {
          this.fetchRecipes('pendingrecipes').subscribe();
        })
      ).subscribe();
  }

  deleteRecipe(key: string): void {
    this.http.delete(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/pendingrecipes/${key}.json`)
      .pipe(
        tap(response => {
          this.fetchRecipes('recipes').subscribe();
        })
      ).subscribe();
  }

  overwriteRecipes(recipes: RecipeDB[]): void { // sets all recipes wanted visible to our array of recipes visible
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // indicates that there was a change of recipe array
  }
}
