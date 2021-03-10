import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(titleService: Title) { }

  // navigate(text: string): void{
  //   this.menuClicked = text;
  // }


  // public setTitle( newTitle: string) {
  //   this.titleService.setTitle( newTitle );
  // }

}
