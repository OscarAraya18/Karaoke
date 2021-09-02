import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  canciones = [{nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"}];

  constructor() { }

  ngOnInit(): void {
  }

  buscarCancion(){
  }

  agregarCancion(){
  }

  cerrarSesion(){
  }

}