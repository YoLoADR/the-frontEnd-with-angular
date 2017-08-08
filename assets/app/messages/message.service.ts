import { Injectable } from '@angular/core';
import { Message } from "./message.model";

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  addMessage(message : Message){
    this.messages.push(message);
    console.log(this.messages);
  }

  getMessage(){
    return this.messages;
  }

  deleteMessage(message: Message){
    // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant des nouveaux éléments - On retire 1 élément situé à l'index du message en cours
    // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
    this.messages.splice(this.messages.indexOf(message), 1);
  }
  
}