import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    let nombreUsuario = (document.getElementById("nombreUsuario") as HTMLInputElement).value;
    let claveAcceso = (document.getElementById("claveAcceso") as HTMLInputElement).value;

    //conectar al servidor
    

    this.router.navigate(['home']);
  }

}
