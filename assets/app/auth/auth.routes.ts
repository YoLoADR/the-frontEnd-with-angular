import { Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

//(!) toutes les toutes indiquées sont des sous-routes de /auth/"route-ci-dessous"
// redirectTo: 'signup' et non pas redirectTo: '/signup' pour ne pas être redirigé vers redirectTo: 'localhost/signup'
export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'logout', component: LogoutComponent},

]; 