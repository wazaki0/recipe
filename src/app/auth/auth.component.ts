import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'; // the redirecting of page done in component - where we know what page we are on

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginPage = true; // to use restAPI from firebase for signup details, or login details
  isLoading = false; // to display loading spinner (if true)
  authForm: FormGroup; // the form for user to input - always email and username for authentication
  error: string = null; // to get the error string - and display to user

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchmode(): void {
    this.isLoginPage = !this.isLoginPage;
    this.authForm.reset();
  }

  onSubmit(): void { // submitting input values from login/signup screen
    if (!this.authForm.valid) { // if not valid - don't send a request
      return;
    }

    this.isLoading = true; // loading
    let authObservable: Observable<AuthResponseData>; // the login observable's information will be stored

    if (!this.isLoginPage) { // signup
      authObservable = this.authService.signup(this.authForm.value.email, this.authForm.value.password); // store
    }

    if (this.isLoginPage) {// login
      authObservable = this.authService.login(this.authForm.value.email, this.authForm.value.password);
      // store authObservable observable
    }

    authObservable.subscribe( // get the data from the stored observable
      resData => { // successful
        console.log(resData);
        this.router.navigate(['/recipes']);
      }, errorMessage => { // error
        // we won't get the error here, but only the message we throw from auth.service.ts login()
        this.error = errorMessage;
      });

    this.isLoading = false;
    this.authForm.reset();
  }

  private initForm(): void {

    const email = '';
    const password = '';

    this.authForm = new FormGroup({
      email: new FormControl(password, [Validators.required, Validators.email]),
      password: new FormControl(email, Validators.required)
    });


  }
}
