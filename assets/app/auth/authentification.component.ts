import { Component } from '@angular/core';

@Component({
    selector: 'app-authentification',
    template: `
      <header class="row spacing">
        <nav class="col-md-8 col-md-offset-2">
          <ul class="nav nav-tabs">
          <!-- (!) [routerLink]="['signup']" et non pas [routerLink]="['/signup']"-->
            <li routerLinkActive="active"><a [routerLink]="['signup']">SignUp</a></li>
            <li routerLinkActive="active"><a [routerLink]="['signin']">SignIn</a></li>
            <li routerLinkActive="active"><a [routerLink]="['logout']">Logout</a></li>
          </ul>
        </nav>
      </header>

      <div class="row spacing">
        <router-outlet></router-outlet>
      </div>
    `,
    styles: [``]
})
export class AuthentificationComponent {

}