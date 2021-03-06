import {Ingredient} from '../shared/ingredient.module';

export class Recipe{ // this class will be template for each recipe

  public name: string; // assigning type for variable of class recipe
  public description: string;
  public imagePath: string;
  public videoPath: string;
  public ingredients: Ingredient[];
  public region: string;
  public typeOfFood: string;
  public methodOfCooking: string;
  public cookingTime: number;

  constructor(name: string, description: string, imagePath: string, videoPath: string, ingredients: Ingredient[],
              region: string, typeOfFood: string, methodOfCooking: string, cookingTime: number){
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.videoPath = videoPath;
    this.ingredients = ingredients;
    this.region = region;
    this.typeOfFood = typeOfFood;
    this.methodOfCooking = methodOfCooking;
    this.cookingTime = cookingTime;
  }

}
