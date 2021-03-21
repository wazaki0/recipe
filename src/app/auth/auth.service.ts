import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.module';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

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

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private logoutTimer: any;

  // BehaviourSubject similar to Subject, but allows getting values even when BehaviourSubject not emitted - useful for getting token status

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    // Observable will receive the object from firebase with different data - object described using AuthResponseData interface
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
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

  logout(): void {
    this.user.next(null); // user subject now is null - also emits this for other components to react (who subscribed to user)
    this.router.navigate(['/auth']); // back to authentication page
    localStorage.removeItem('userData'); // clear saved login data (onto browser)
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer); // once logged out - no need for a timer to auto-logout user after that token expires
    }
    this.logoutTimer = null;
  }

  autoLogin(): void {
    const tmpData = JSON.parse(localStorage.getItem('userData'));
    if (!tmpData) { // if empty - no auto-login feature possible
      return;
    }
    const userData: User = new User(tmpData.email, tmpData.id, tmpData.token, tmpData.tokenExpiryDate); // if saved onto browser

    if (userData.getToken()) { // null if invalid token (expired or not right token)
      this.user.next(userData); // if true - forward the loaded user
      this.autoLogout((userData.getTokenExpiryDate().getTime() - new Date().getTime()));
      // logout after expiry date amount of seconds passed
    }

  }

  autoLogout(expirationDuration: number): void {
    console.log(`**** lougoutTime: ${expirationDuration / 1000} seconds, ${(expirationDuration / 1000) / 60} minutes`);
    this.logoutTimer = setTimeout(() => {
      this.logout(); // after token expires
    }, expirationDuration);
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
    this.autoLogout(expiresIn * 1000); // in seconds when token expires
    // emits and saves the user using subject (similar to eventemitter) - using tap - so we can still subscribe in auth.component
    localStorage.setItem('userData', JSON.stringify(user));
    /* store user information (nicknamed userData) to browser - so when user reloads browser - doesn't have to login again
    (also uses auto-login). JSON.stringify converts java object into string version of it */
  }
}
