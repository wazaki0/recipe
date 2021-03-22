import {ApprovalStatus, Recipe, RecipeDB} from './recipe.model';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {map, tap} from 'rxjs/operators';
import {User} from '../auth/user.module';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class RecipeService {
  /* recipeSelected = new EventEmitter<Recipe>(); replaced by routing and
     subject - same function as eventemitter, but more efficient*/
  recipesChanged = new Subject<RecipeDB[]>();
  currentUser: User;

  adminUsers: string[] = ['9DLNBagz0ehZAgGyK7OXDgmAwsu2', '74UF29bhuqXrQlXvB9HhF42KgqS2'];

  // Already saved onto database!
  private recipes: RecipeDB[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {

    this.authService.user
      .subscribe(user => { // when component initialized, subscribe to userAuthenticated change
        this.currentUser = user;
      });
  }

  isAdmin(): boolean {
    if (this.currentUser) {
      return this.adminUsers.includes(this.currentUser.id);
    }
    return false;
  }

  async getRecipe(key: string, sourceTable: string = 'recipes'): Promise<RecipeDB> {
    const params: HttpParams = new HttpParams();

    if (sourceTable === 'pendingrecipes') {
      params.append('orderBy', '"userId"');
      params.append('equalTo', '"' + this.currentUser.id + '"');
    }

    const recipeDb: RecipeDB = await this.http.get<Recipe>(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}/${key}.json`, {params})
      .pipe(
        map(result => {
          if (result) {
            const recipe2 = {...result, ingredient: result.ingredients ? result.ingredients : []};
            const recipeDB = new RecipeDB();
            recipeDB.id = key;
            recipeDB.recipe = recipe2;
            if (sourceTable === 'recipes' || this.currentUser.id === recipeDB.recipe.userId || this.isAdmin()) {
              return recipeDB;
            }
          }
          return null;
        })
      ).toPromise();
    console.log(recipeDb);
    return recipeDb;
  }

  fetchRecipes(sourceTable: string): Observable<RecipeDB[]> {
    const params: HttpParams = new HttpParams();

    if (sourceTable === 'pendingrecipes' && !this.isAdmin()) {
      params.append('orderBy', '"userId"');
      params.append('equalTo', '"' + this.currentUser.id + '"');
    }
    // {params}

    return this.http.get<RecipeDB[]>(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}.json`, {params}
    )
      .pipe(
        // SECOND PART REQUEST FOR RECIPES (first part in auth.interceptor)
        map(recipes => { // map is an operator which transforms an HTTP request (in this case response - from application server)
          if (!recipes) {
            return [];
          }

          const rowIds: string[] = Object.keys(recipes);
          const resultData: RecipeDB[] = [];

          rowIds.forEach(key => {
            const recipeServer = recipes[key];
            const recipe = {...recipeServer, ingredient: recipeServer.ingredients ? recipeServer.ingredients : []};
            const recipeDB = new RecipeDB();
            recipeDB.id = key;
            recipeDB.recipe = recipe;
            if (sourceTable === 'recipes' || this.currentUser.id === recipeDB.recipe.userId || this.isAdmin()) {
              resultData.push(recipeDB);
            }
          });

          return resultData;
        }), tap(recipes => {
          console.log(recipes);
          this.overwriteRecipes(recipes);
          // overwrite the recipes through tap, which doesn't affect anything, only takes in the object emitted (recipe array)
        })
      );
  }

  getRecipes(): RecipeDB[] {
    return this.recipes.slice(); // slice creates a direct copy - which prevents the access from outside - only view
  }

  addRecipe(recipe: Recipe, sourceTable: string, route: ActivatedRoute): void {
    recipe.userId = this.currentUser.id;
    recipe.status = ApprovalStatus.Pending;

    this.http.post(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}.json`, recipe)
      .pipe(
        tap(response => {
          console.log('add recipe response: ' + response);
          const db = new RecipeDB();
          db.id = response.toString();
          db.recipe = recipe;
          this.fetchRecipes(sourceTable).subscribe();
          this.router.navigate(['../'], {relativeTo: route});
        })
      )
      .subscribe(response => {


      });
  }

  updateRecipe(key: string, recipe: Recipe, sourceTable: string): void {
    let nextRoute = 'recipes';
    if (sourceTable === 'pendingrecipes') {
      nextRoute = 'pending';
    }

    recipe.userId = this.currentUser.id;
    this.http.put(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}/${key}.json`, recipe)
      .pipe(
        tap(response => {
          this.fetchRecipes(sourceTable).subscribe();
          this.router.navigate([`/${nextRoute}`, `${key}`]);
        })
      ).subscribe();
  }

  deleteRecipe(key: string, sourceTable: string = 'pendingrecipes'): void {
    let nextRoute = 'recipes';
    if (sourceTable === 'pendingrecipes') {
      nextRoute = 'pending';
    }
    this.http.delete(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/${sourceTable}/${key}.json`)
      .pipe(
        tap(response => {
          this.fetchRecipes(sourceTable).subscribe();
          this.router.navigate([`/${nextRoute}`]);
        })
      ).subscribe();
  }

  overwriteRecipes(recipes: RecipeDB[]): void { // sets all recipes wanted visible to our array of recipes visible
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // indicates that there was a change of recipe array
  }

  approveRecipe(key: string, recipe: Recipe): void {
    this.http.put(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/recipes/${key}.json`, recipe)
      .subscribe();

    this.http.delete(`https://recipe-tasty-and-delicious-default-rtdb.firebaseio.com/pendingrecipes/${key}.json`)
      .pipe(
        tap(response => {
          this.fetchRecipes('pendingrecipes').subscribe();
          this.router.navigate(['/pending']);
        })
      ).subscribe();
  }

}
