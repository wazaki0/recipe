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
  isLoading: boolean = false;
  recipeKey: string; // to identify specific recipe from url (recipes/:id)

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeKey = params.id;
        this.isLoading = true;
        this.recipeService.getRecipe(this.recipeKey).then(data => {
          this.recipeDB = data;
          this.recipe = this.recipeDB.recipe;
          this.isLoading = false;
        }); // no need to unsubscribe - angular does this for us
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
    this.recipeService.deleteRecipe(this.recipeKey);
    this.router.navigate(['/recipes']);
  }
}
