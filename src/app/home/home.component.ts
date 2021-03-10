import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeVideoURL = 'https://www.youtube.com/watch?v=BGKIaF6MTJg&ab_channel=Sara-ZakoAfricanGreyParrot';
  // video for home component

  constructor() { }

  ngOnInit(): void {
  }

}
