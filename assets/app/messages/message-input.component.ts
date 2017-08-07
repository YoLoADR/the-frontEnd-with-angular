import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styles: [``]
})
export class MessageInputComponent {

    constructor(private messageService: MessageService){}

  onSubmit(form : NgForm){
    const message = new Message(form.value.content, "Yohann");
    this.messageService.addMessage(message);
    // Vide le champs input
    form.resetForm();
  }
}