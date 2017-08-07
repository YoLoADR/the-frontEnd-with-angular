import { Component } from '@angular/core';
import { MessageService } from "./message.service";
import { Message } from "./message.model";


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styles: [``]
})
export class MessageInputComponent {

    constructor(private messageService: MessageService){}
  onSave(value : string){
    const message = new Message(value, "Yohann");
    this.messageService.addMessage(message);
  }
}