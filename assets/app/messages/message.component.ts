import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
    selector: 'app-message',
    templateUrl: 'message.component.html',
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
     }
    `]
})
export class MessageComponent {
    constructor(private messageService: MessageService){}
    @Input() message : Message; 
    // @Ouput() permet de transmettre des données en sortie du component 
    // eventEmitter (méthode Angular) permet de créer, émettre ou écouter un évènement
    @Output() cliqueEdite = new EventEmitter<string>();
    
    editer(){
        this.cliqueEdite.emit('A new value');
    }
    supprimer(){
        this.messageService.deleteMessage(this.message); //L'input renvoi qu'un message, donc on peut simplement se baser sur lui
    }

}