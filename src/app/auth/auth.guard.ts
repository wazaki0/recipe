import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      take(1), // take subscribes and then unsubscribes - so there is no ongoing subscription
      map(user => {
        const isAuth = !!user; // if user exists true, if doesn't false (used to block certain pages - like viewing your recipes)
        // CHANGE BASED ON USER's ROLES!!!
        if (isAuth) {
          return isAuth; // boolean if it exists
        }
        return this.router.createUrlTree(['/auth']); // navigates to authentication
      }));

  }

}
