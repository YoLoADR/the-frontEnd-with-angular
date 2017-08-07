import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthentificationComponent } from "./auth/authentification.component";
import { HeaderComponent } from "./header.component";

import { MessageService } from "./messages/message.service";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthentificationComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule, 
        FormsModule,
        routing],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {

}