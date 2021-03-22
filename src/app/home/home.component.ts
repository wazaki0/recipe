import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeVideoURL = 'https://www.youtube.com/watch?v=Fld3FOXrXws&ab_channel=Tasty%26Delicious';

  // video for home component

  constructor() {
  }

  ngOnInit(): void {
  }

}
