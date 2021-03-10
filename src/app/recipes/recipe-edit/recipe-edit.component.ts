import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  get controls(): AbstractControl[] { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls; // return
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params.id; // the id of the website - representing recipe
        this.editMode = params.id != null; // if id existed, edit mode - otherwise create mode
        this.initForm();
      }
    );
  }

  onSubmit(): void {

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredients(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredient: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) // only even numbers
        ]))
      })
    );
  }

  private initForm(): void {
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
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imagePath;
      recipeYoutubeUrl = recipe.videoPath;
      recipeDescription = recipe.description;
      recipeRegion = recipe.region;
      recipeTypeOfFood = recipe.typeOfFood;
      recipeMethodOfCooking = recipe.methodOfCooking;
      recipeCookingTime = recipe.cookingTime;
      recipe.ingredients.forEach(ingredient => {
        recipeIngredients.push(new FormGroup({
          ingredient: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(
            ingredient.amount,
            Validators.compose([
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/) // only even numbers
            ]))
        }));
      });

      /* for (let ingredient of recipe.ingredients){ // for each ingredient in loaded recipe
         recipeIngredients.push(new FormGroup({
           ingredient: new FormControl(ingredient.name),
           amount: new FormControl(ingredient.amount)
           })
         );
       }*/
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
