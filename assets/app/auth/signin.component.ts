import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html',
})
export class SigninComponent {

  myForm: FormGroup;


    onSubmit(){
        console.log("mon formulaire", this.myForm);
    }

    // Validators.pattern => RegExp - pour une adresse mail valide 
    // Pour ajouter plusieurs controle de validation, il suffit de les ajouter dans un array
    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        }); 
    }
}