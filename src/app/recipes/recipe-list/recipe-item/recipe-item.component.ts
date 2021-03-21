import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],

})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipeKey: string;

  constructor() { }

  ngOnInit(): void {
  }

  // onImageClicked(): void{
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
