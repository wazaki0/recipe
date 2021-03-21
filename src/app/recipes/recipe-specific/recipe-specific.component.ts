import {Component, OnInit} from '@angular/core';
import {Recipe, RecipeDB} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.module';

@Component({
  selector: 'app-recipe-specific',
  templateUrl: './recipe-specific.component.html',
  styleUrls: ['./recipe-specific.component.css']
})
export class RecipeSpecificComponent implements OnInit {
  recipeDB: RecipeDB;
  recipe: Recipe;
  currentUser: User;
  isLoading: boolean = false;
  recipeKey: string; // to identify specific recipe from url (recipes/:id)

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
              private authService: AuthService) {

    this.authService.user
      .subscribe(user => { // when component initialized, subscribe to userAuthenticated change
        this.currentUser = user;
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeKey = params.id;
        this.isLoading = true;
        this.recipeService.getRecipe(this.recipeKey).then(data => {
          this.recipeDB = data;
          if (data) {
            this.recipe = this.recipeDB.recipe;
          } else {
            this.router.navigate(['/recipes']);
          }
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
