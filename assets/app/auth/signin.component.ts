import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html',
})
export class SigninComponent {

  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}


    onSubmit(){
        console.log("mon formulaire", this.myForm.value);
        const user = new User(
                this.myForm.value.email,
                this.myForm.value.password
                );
                
        this.authService.signin(user)
            .subscribe(
                data => {
                    // On a le choix entre utiliser les cookies ou le localStorage
                    // Dans notre cas on vas utiliser le localStorage - il y a une fonction native au Javascript .localStorage() permet de stocker dans le navigateur qui se detruit quand on ferme le navigateur
                    // .localStorage() prend deux paramètre - #1 on défini un nom pour la key de l'objet  - #2 le token qu'on reçoit du server "res.statut(200)""
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    // on nous redirige vers la home page (page de messages)
                    this.router.navigateByUrl('/');
                    
                } ,
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