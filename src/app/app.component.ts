import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.autoLogin(); // right when website created

  }

  // navigate(text: string): void{
  //   this.menuClicked = text;
  // }


  // public setTitle( newTitle: string) {
  //   this.titleService.setTitle( newTitle );
  // }

}
