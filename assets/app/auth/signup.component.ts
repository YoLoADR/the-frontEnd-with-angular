import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lasttName: new FormControl(null, Validators.required),
            // Pour ajouter plusieurs controle de validation, il suffit de les ajouter dans un array
            email: new FormControl(null, [
                Validators.required,
                // RegExp pour une adresse mail valide
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?")
                ]),
            password: new FormControl(null, Validators.required)
        }); 
    }
}