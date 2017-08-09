import { Component, OnInit } from '@angular/core';
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
    selector: 'app-message-list',
    template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message 
        [message]="message" 
        (cliqueEdite)="message.content = $event"
        *ngFor="let message of messages"
      ></app-message>
    </div>
    `,
    styles: [`
     .author {
         display: inline-block;
         font-style: italic;
         font-size: 12px;
         width: 80%;
     }

     .config {
         display: inline-block;
         text-align: right;
         font-size: 12px;
         width: 19%;
     }`]
})
export class MessageListComponent {
    messages : Message[];
    constructor(private messageService: MessageService){}
    ngOnInit(){
        //this.messages = this.messageService.getMessage();
        this.getMessage();
    }

    getMessage(){
        this.messageService.getMessage()
            .subscribe(
                data => console.log(data) ,
                error => console.error(error)
                );
    }


}