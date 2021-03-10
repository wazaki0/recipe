import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service'; // importing class Recipe

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] // allows use in child components
})
export class RecipesComponent implements OnInit {
  // recipeItemClicked: Recipe; - not needed thanks to routing

  constructor() { }

  ngOnInit(): void {
    /*this.recipeService.recipeSelected.
    subscribe(
      (recipe: Recipe) => {this.recipeItemClicked = recipe; }
      // the recipe is gotten from the event - when triggered from component recipe-item
      // recipe-item triggers eventEmitter in recipe.service - which can be caught here using subscribe
      // the recipe is then used to specify information for recipe-specific
    );*/ // This command not needed anymore - as we can load the recipe thanks to routing in recipe-item.html
  }
}
