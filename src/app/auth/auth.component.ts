import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginPage = true;
  authForm: FormGroup;
  // signupForm: FormGroup;
  // loginForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchmode(): void {
    this.isLoginPage = !this.isLoginPage;
    this.authForm = null;
    this.initForm();
  }

  onSubmit(): void {
    console.log(this.authForm);
  }

  private initForm(): void {

    const email = '';
    const password = '';
    const username = '';

    if (this.isLoginPage) {

      this.authForm = new FormGroup({
        email: new FormControl(password, Validators.required),
        password: new FormControl(email, Validators.required)
      });

    } else {
      this.authForm = new FormGroup({
        email: new FormControl(email, [Validators.required, Validators.email]), // initialize, validator - rules before submitting
        username: new FormControl(username, Validators.required),
        password: new FormControl(password, Validators.required),
      });
    }


  }

}
