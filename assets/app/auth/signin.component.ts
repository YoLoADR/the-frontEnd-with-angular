import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html',
})
export class SigninComponent {

  myForm: FormGroup;

  constructor(private authService: AuthService){}


    onSubmit(){
        console.log("mon formulaire", this.myForm.value);
        const user = new User(
                this.myForm.value.email,
                this.myForm.value.password
                );
                
        this.authService.signin(user)
            .subscribe(
            data => console.log(data) ,
            error => console.error(error)
            ); 
        this.myForm.reset();
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