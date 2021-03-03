import { Component, OnInit, Input } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-specific',
  templateUrl: './recipe-specific.component.html',
  styleUrls: ['./recipe-specific.component.css']
})
export class RecipeSpecificComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
