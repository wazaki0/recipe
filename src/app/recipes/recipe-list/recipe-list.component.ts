import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeItemClicked = new EventEmitter<Recipe>();
  recipes: Recipe[]; // will be copied from the recipes from recipe.service
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.route}); // goes to recipe/new - where we have recipe-edit component
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onRecipeItemClicked(recipe: Recipe): void{
  //   this.recipeItemClicked.emit(recipe);
  // }

}
