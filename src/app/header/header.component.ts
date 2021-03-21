import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated: boolean; // authentication of user (will always be initialized because of ngOnInit)
  private userSub: Subscription; // in order to store subscription

  // @Output() menuClicked = new EventEmitter<string>(); // old method of routing using event emitter
  // onSelect(text: string): void{
  //   this.menuClicked.emit(text);
  // }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => { // when component initialized, subscribe to userAuthenticated change
        // if (user) {
        //   this.userAuthenticated = true;
        // } else {
        //   this.userAuthenticated = false;
        // }
        this.userAuthenticated = !!user; // does the same thing as above. also( = !user ? false:true;)
      });
  }

  onLogout(): void {
    this.authService.logout(); // logout after click - change route - this can however be done elsewhere where user subscribed present
    // (redirect route done in auth.service)
  }


  ngOnDestroy(): void { // when component destroyed - not present
    this.userSub.unsubscribe(); // unsubscribe - as next time initialized will subscribe again anyway
  }

}
