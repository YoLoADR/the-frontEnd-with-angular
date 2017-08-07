import { Component } from '@angular/core';


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styles: [``]
})
export class MessageInputComponent {

    constructor(){}
  onSave(value){
     console.log("Je suis sauvegarder", value);
  }
}