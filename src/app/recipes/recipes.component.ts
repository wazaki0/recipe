import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  // recipeItemClicked: Recipe; - not needed thanks to routing

  sourceTable = 'recipes';

  constructor(private router: Router) {
    console.log(router.url);
    if (router.url === '/pending') {
      this.sourceTable = 'pendingrecipes';
    }

    router.events.pipe(
      filter((event => event instanceof NavigationEnd)),
      tap(event => {
        const ev = event as NavigationEnd;

        if (ev.url.includes('/pending')) {
          this.sourceTable = 'pendingrecipes';
        } else {
          this.sourceTable = 'recipes';
        }
      })
    ).subscribe();

  }

}
