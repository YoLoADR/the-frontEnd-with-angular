import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { Message } from "./message.model";

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  constructor(private http: Http){}

  addMessage(message : Message){
    this.messages.push(message);
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    //(!) Sans l'observable la requête ne part pas - elle est juste parametrer
    // .map((response: Response) => response.json()) -> retourne automatiquement un observable
    return this.http.post('http://localhost:3000/message', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  getMessage(){
    return this.http.get('http://localhost:3000/message')
      .map((response: Response) => this.messages = response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  deleteMessage(message: Message){
    // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant des nouveaux éléments - On retire 1 élément situé à l'index du message en cours
    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
    this.messages.splice(this.messages.indexOf(message), 1);
  }
  
}