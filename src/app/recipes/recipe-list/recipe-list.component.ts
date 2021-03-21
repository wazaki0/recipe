import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe, RecipeDB} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @Input() sourceTable = 'recipes';

  @Output() recipeItemClicked = new EventEmitter<Recipe>();
  recipes: RecipeDB[]; // will be copied from the recipes from recipe.service
  subscription: Subscription;
  subscription2: Subscription;

  userAuthenticated: boolean; // authentication of user (will always be initialized because of ngOnInit)

  constructor(private recipeService: RecipeService,
              private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.recipeService.fetchRecipes(this.sourceTable).subscribe();

    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipesDB: RecipeDB[]) => {
        this.recipes = recipesDB;
      }
    );

    this.subscription2 = this.authService.user
      .subscribe(user => { // when component initialized, subscribe to userAuthenticated change
        // if (user) {
        //   this.userAuthenticated = true;
        // } else {
        //   this.userAuthenticated = false;
        // }
        this.userAuthenticated = !!user; // does the same thing as above. also( = !user ? false:true;)
      });

    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.route}); // goes to recipe/new - where we have recipe-edit component
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  // onRecipeItemClicked(recipe: Recipe): void{
  //   this.recipeItemClicked.emit(recipe);
  // }

}
