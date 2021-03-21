import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* interceptor allows us to change requests before they leave or before they come. In this case
    we need the requests for recipes to each time contain the user token in its query params - which contains proof of authentication
     */

    // FIRST PART REQUEST FOR RECIPES

    return this.authService.user.pipe(
      /* pipe allows us to create imaginary pipes - where the information can be manipulated through different functions -
      without affecting the result (and being able to subscribe from component) */
      take(1), // to be able to take 1 value we want any time (from user subjecet) - token
      exhaustMap( // mapping the request
        user => { // we get the object user to take 1 value from it using take, to edit the request

          if (!user) { // LOGIN OR SIGNUP
            return next.handle(req); // the request continues, without added authenticaiton - not needed
          }


          const modifiedRequest = req.clone({ // create a clone, in order to modify it - with the needed user token
            params: req.params ? req.params.append('auth', user.getToken()) : new HttpParams().set('auth', user.getToken())
          });

          return next.handle(modifiedRequest); // each request for database, but edited to contain user token

        })
    ); // direct clone of the http request (but we will add the query with token for authentication)
  }

}
