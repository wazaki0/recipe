import {Ingredient} from '../shared/ingredient.module';

export enum ApprovalStatus {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Pending = 'PENDING'
}

export class Recipe { // this class will be template for each recipe
  public name: string; // assigning type for variable of class recipe
  public description: string;
  public imageUrl: string;
  public youtubeUrl: string;
  public ingredients: Ingredient[];
  public region: string;
  public typeOfFood: string;
  public methodOfCooking: string;
  public cookingTime: number;
  public status: ApprovalStatus;
  public userId: string;

  constructor(name: string, description: string, imagePath: string, youtubeUrl: string, ingredients: Ingredient[],
              region: string, typeOfFood: string, methodOfCooking: string, cookingTime: number, status: ApprovalStatus, userId: string) {
    this.name = name;
    this.description = description;
    this.imageUrl = imagePath;
    this.youtubeUrl = youtubeUrl;
    this.ingredients = ingredients;
    this.region = region;
    this.typeOfFood = typeOfFood;
    this.methodOfCooking = methodOfCooking;
    this.cookingTime = cookingTime;
    this.status = status;
    this.userId = userId;
  }

}


export class RecipeDB {
  public id: string;
  public recipe: Recipe;
}
