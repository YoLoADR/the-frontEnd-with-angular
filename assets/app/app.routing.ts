import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthentificationComponent } from "./auth/authentification.component";

import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES: Routes = [
  // pathMatch: 'full' - > égalité absolu (===)
  { path: "" , redirectTo: "/messages", pathMatch: 'full' }, // (!) important ici de mettre le slash (/) avant
  { path: "messages" , component: MessagesComponent },
  { path: "auth" , component: AuthentificationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES); 