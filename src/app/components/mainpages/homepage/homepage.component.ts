import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    standalone: false
})
export class HomepageComponent {
  components = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let routerName = event.urlAfterRedirects
        if (routerName !== "/auth/welcome" && routerName !== "/auth/login" && routerName !== "/auth/register" && routerName !== "/auth/registerconfrom"){
          this.components = false
          console.log(routerName)
        }
        else{
          this.components = true
        }
      }
    });
  }

}










