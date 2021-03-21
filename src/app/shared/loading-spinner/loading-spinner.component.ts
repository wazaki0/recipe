import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: 'loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'] // using https://loading.io/css/ - online loading spinner while fetching data
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
