import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
 
import { Message } from "./message.model";

@Injectable()
export class MessageService {
  private messages: Message[] = [];
  // Status en cours de modification - on met/ se branche sur un écouteur d'évènement ~= NgChange
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http: Http) { }

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //(!) Sans l'observable la requête ne part pas - elle est juste parametrer
    // .map((response: Response) => response.json()) -> retourne automatiquement un observable
    return this.http.post('http://localhost:3000/message', body, { headers: headers })
      .map((response: Response) => {
        // Modifier pour faire la différence entre un ajout d'un nouveau message et une modification
        const result = response.json();
        const message = new Message(result.obj.content, "Yolo", result.obj._id, null);
        this.messages.push(message);
        return message;
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  getMessage() {
    return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        // Comme mongo renvoie des données brute avec des (__), on va recrée un tableau avec une version clean grace a une fonction
        const messages = response.json().obj;
        let tranformedMessages: Message[] = [];

        for (let message of messages) {
          tranformedMessages.push(new Message(message.content, 'Yolo', message._id, null));
        }
        this.messages = tranformedMessages;
        return tranformedMessages;
      })
      .catch((err: Response) => Observable.throw(err.json()));
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message){
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/message/'+ message.messageId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
    
  }

  deleteMessage(message: Message) {
    // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant des nouveaux éléments - On retire 1 élément situé à l'index du message en cours
    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete('http://localhost:3000/message/'+ message.messageId)
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

}