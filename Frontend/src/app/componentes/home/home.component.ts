import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatDialog} from '@angular/material/dialog';
import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';
//import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';

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

  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  buscarCancion(){
  }

  agregarCancion(){
  }

  cerrarSesion(){
    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'40vw'
    });
  }

  reproducirCancion(){
    this.router.navigate(['player']);
  }


  editarCancion(){

  }

  eliminarCancion(){

  }

}