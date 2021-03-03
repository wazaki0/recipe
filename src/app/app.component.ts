import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuClicked: string;

  navigate(text: string): void{
    this.menuClicked = text;
  }
}
