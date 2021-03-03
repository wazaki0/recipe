import {Ingredient} from '../shared/ingredient.module';

export class Recipe{ // this class will be template for each recipe

  public name: string; // assigning type for variable of class recipe
  public description: string;
  public imagePath: string;
  public videoPath: string;
  public ingredients: Ingredient[];
  // cookingMethod
  // cooking time

  constructor(name: string, description: string, imagePath: string, videoPath: string, ingredients: Ingredient[]){
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.videoPath = videoPath;
    this.ingredients = ingredients;
  }

}
