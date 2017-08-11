import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { User } from "./user.model";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  signup(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //(!) Sans l'observable la requête ne part pas - elle est juste parametrer
    // .map((response: Response) => response.json()) -> retourne automatiquement un observable
    return this.http.post('http://localhost:3000/user', body, { headers: headers })
      .map((response: Response) =>  response.json() )
      .catch((err: Response) => Observable.throw(err.json()));
  }

  signin(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //(!) Sans l'observable la requête ne part pas - elle est juste parametrer
    // .map((response: Response) => response.json()) -> retourne automatiquement un observable
    return this.http.post('http://localhost:3000/user/sigin', body, { headers: headers })
      .map((response: Response) =>  response.json() )
      .catch((err: Response) => Observable.throw(err.json()));
  }

}