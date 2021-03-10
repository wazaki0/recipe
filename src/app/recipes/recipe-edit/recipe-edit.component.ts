import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params.id; // the id of the website - representing recipe
        this.editMode = params.id != null; // if id existed, edit mode - otherwise create mode
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let name = '';
    let imageUrl = '';
    let youtubeUrl = '';
    let description = '';
    let region = '';
    let typeOfFood = '';
    let methodOfCooking = '';
    let cookingTime = 0;

    if (!this.editMode){ // if the e
      const recipe = this.recipeService.getRecipe(this.recipeId);
      name = recipe.name;
      imageUrl = recipe.imagePath;
      youtubeUrl = recipe.videoPath;
      description = recipe.description;
      region = recipe.region;
      typeOfFood = recipe.typeOfFood;
      methodOfCooking = recipe.methodOfCooking;
      cookingTime = recipe.cookingTime;
    }


    this.recipeForm = new FormGroup ({
      name: new FormControl(name),
      imageUrl: new FormControl(imageUrl),
      youtubeUrl: new FormControl(youtubeUrl),
      description: new FormControl(description),
      region: new FormControl(region),
      typeOfFood: new FormControl(typeOfFood),
      methodOfCooking: new FormControl(methodOfCooking),
      cookingTime: new FormControl(cookingTime)
    });
  }
}
