import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  canciones = [{nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"}];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  buscarCancion(){
  }

  agregarCancion(){
  }

  cerrarSesion(){
    this.router.navigate(['']);
  }

  reproducirCancion(){
    this.router.navigate(['player']);
  }

  verLetraCancion(){

  }

  editarCancion(){

  }

  eliminarCancion(){

  }

}