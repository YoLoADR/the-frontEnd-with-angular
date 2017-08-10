import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styles: [``]
})
export class MessageInputComponent implements OnInit {
    //le message qui a été cliqué pour être modifier
    message : Message;

    constructor(private messageService: MessageService){}
  
  ngOnInit(){
    // Comme pour streamin video ~ et le ngOnChange -> le message qui à été cliquer pour passer en mode édite deviens le message qui passe dans notre champas Input pour la modification
    this.messageService.messageIsEdit.subscribe((message: Message)=> this.message = message);
  }

  onSubmit(form : NgForm){
    // Si le this.message est null ou undefined ((!) this.message = message du messageService.messageIsEdit) alors ça veut qu'on crée un nouveau message 
    if(this.message){
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message).subscribe(
          data => {
            console.log(data)

            //Pour reseter le formulaire
            this.message = null;
          } ,
          error => console.error(error)
        )
    }else{
    const message = new Message(form.value.content, "Yohann");
    this.messageService.addMessage(message)
      .subscribe(
          data => console.log(data) ,
          error => console.error(error)
        );

    }
        
    // Vide le champs input
    form.resetForm();
  }

  onClear(form : NgForm){
    // Vide le champs input
    this.message = null;
    form.resetForm();
  }
}