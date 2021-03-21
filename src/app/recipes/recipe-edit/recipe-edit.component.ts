import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeKey: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  get controls(): AbstractControl[] { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls; // return
  }

  ngOnInit(): void {
    this.route.params.subscribe( // every time routing changes
      (params: Params) => {
        this.recipeKey = params.id; // the id of the website - representing recipe
        this.editMode = params.id != null; // if id existed, edit mode - otherwise create mode
        this.initForm();
      }
    );
  }

  onSubmit(): void { // when submitting the filled in recipe to recipe-service (to update the recipes array)

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeKey, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredients(): void { // while adding ingredients, adds an ingredient object to ingredients array
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) // only even numbers
        ]))
      })
    );
  }

  onCancelRecipe(): void { // when cancelling the changes for a recipe
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index); // delete recipe at that index
  }

  private initForm(): void { // the initialization of a recipe form
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeYoutubeUrl = '';
    let recipeDescription = '';
    let recipeRegion = '';
    let recipeTypeOfFood = '';
    let recipeMethodOfCooking = '';
    let recipeCookingTime = 0;
    const recipeIngredients = new FormArray([]);

    if (this.editMode) { // if the recipe is in edit mode, load that recipe's details
      const recipeDB = this.recipeService.getRecipe(this.recipeKey);
      const recipe = recipeDB.recipe;
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeYoutubeUrl = recipe.youtubeUrl;
      recipeDescription = recipe.description;
      recipeRegion = recipe.region;
      recipeTypeOfFood = recipe.typeOfFood;
      recipeMethodOfCooking = recipe.methodOfCooking;
      recipeCookingTime = recipe.cookingTime;
      if (recipe.ingredients) { // if empty avoids error of looking through it
        recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(
              ingredient.amount,
              Validators.compose([
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) // only even numbers
              ]))
          }));
        });
      }
    }


    this.recipeForm = new FormGroup({ // assign what values the form will have
      name: new FormControl(recipeName, Validators.required), // recipeName initialized, validator - rules before submitting
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      youtubeUrl: new FormControl(recipeYoutubeUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      region: new FormControl(recipeRegion),
      typeOfFood: new FormControl(recipeTypeOfFood),
      methodOfCooking: new FormControl(recipeMethodOfCooking),
      cookingTime: new FormControl(recipeCookingTime, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      ingredients: recipeIngredients
    });
  }
}
