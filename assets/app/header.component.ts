import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-pills">
           <!-- Grace cette méthode nous avons un routing et des liens vraiment flexible -->
          <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
          <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentification </a></li>
        </ul>
      </nav>
    </header>
    `,
  styles: [``]
})
export class HeaderComponent {

}