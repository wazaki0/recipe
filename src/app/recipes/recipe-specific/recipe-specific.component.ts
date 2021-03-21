import {Component, OnInit} from '@angular/core';
import {Recipe, RecipeDB} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-specific',
  templateUrl: './recipe-specific.component.html',
  styleUrls: ['./recipe-specific.component.css']
})
export class RecipeSpecificComponent implements OnInit {
  recipeDB: RecipeDB;
  recipe: Recipe;
  recipeIndex: number; // to identify specific recipe from url (recipes/:id)

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params.id;
        this.recipeDB = this.recipeService.getRecipe(this.recipeIndex); // no need to unsubscribe - angular does this for us
        this.recipe = this.recipeDB.recipe;
      }
    );
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onEmptyString(detail: string): boolean {
    if (detail === '') {
      return true;
    }
    return false;
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }
}
