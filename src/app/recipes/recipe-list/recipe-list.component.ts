import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeItemClicked = new EventEmitter<Recipe>();
  recipes: Recipe[]; // will be copied from the recipes from recipe.service

  constructor(private recipeService: RecipeService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeCreate(): void{
    this.router.navigate(['new'], {relativeTo: this.route}); // goes to recipe/new - where we have recipe-edit component
  }

  // onRecipeItemClicked(recipe: Recipe): void{
  //   this.recipeItemClicked.emit(recipe);
  // }

}
