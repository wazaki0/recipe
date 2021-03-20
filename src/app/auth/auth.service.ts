import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.module';

export interface AuthResponseData { // exported so I can use in auth.component.ts
                                    // the data provided here are listed from firebase signup email restAPI
                                    // restAPI = https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    // Observable will receive the object from firebase with different data - object described using AuthResponseData interface
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEy-9TD7e-_QRh3cozSKN8kAdu66Rnbt8',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(errorRes => {
        return this.handleError(errorRes);
      }), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEy-9TD7e-_QRh3cozSKN8kAdu66Rnbt8',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(errorRes => {
        return this.handleError(errorRes);
      }), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        // tap lets us collect the value without affecting it, so we can subscribe somewhere else
      }));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<AuthResponseData> {
    console.log(errorRes);
    let errorMessage = 'An Error Occurred'; // when the error isn't common

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage); // throws a popup message of error without error message
    }
    errorMessage = errorRes.error.error.message;
    switch (errorRes.error.error.message) {
      // common error messages are displayed at: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The provided email is not registered';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This E-mail already exists!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Email does not Exist!';
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        errorMessage = 'Password should be at least 6 characters';
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    // the current time + the expiry date in seconds (use +resData - to transform to num)
    const user = new User(
      email,
      userId,
      idToken,
      expirationDate);
    this.user.next(user);
    // emits the user using subject (similar to eventemitter) - using tap - so we can still subscribe in auth.component
  }
}
