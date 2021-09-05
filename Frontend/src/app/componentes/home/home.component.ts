import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatDialog} from '@angular/material/dialog';
import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';
import { EditarPopupComponent } from '../editar-popup/editar-popup.component';
//import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  canciones = [{nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny",
letra: `
[00:01.52]Yeah-Yeah-Yeah-Yeah
[00:03.68]Yeah-Yeah-Yeah-Yeah-Yeah-Yeah
[00:06.86]Yeah-Yeah-Yeah-Eh, Yeah
[00:10.59]Una Noche Más Y Copas De Más
[00:15.41]Tú No Me Dejas En Paz, De Mi Mente No Te Vas
[00:20.35]Aunque Sé Que No Debo, Ey
[00:23.55]Pensar En Ti, Bebé, Pero Cuando Bebo
[00:28.36]Me Viene Tu Nombre, Tu Cara, Tu Risa Y Tu Pelo, Ey
[00:33.66]Dime Dónde Tú Está', Que Yo Por Ti Cojo Un Vuelo
[00:38.34]Y A Yonaguni Le Llego, Oh
[00:41.76]Aunque Sé Que No Debo, Ey
[00:44.80]Pensar En Ti, Bebé, Pero Cuando Bebo
[00:49.60]Me Viene Tu Nombre, Tu Cara, Tu Risa Y Tu Pelo, Ey
[00:54.77]Dime Dónde Tú Está', Que Yo Por Ti Cojo Un Vuelo
[00:59.53]Y A Yonaguni Le Llego, Ey
[01:02.38]No Me Busque' En Instagram, Mami, Búscame En Casa
[01:06.88]Pa' Que Vea' Lo Que Pasa, Ey
[01:09.46]Si Tú Me Prueba', Te Casa', Ey
[01:12.15]Ese Cabrón Ni Te Abraza
[01:13.98]Y Yo Loco Por Tocarte
[01:16.65]Pero Ni Me Atrevo A Textearte
[01:19.32]Tú Con Cualquier Outfit La Parte'
[01:22.26]Mami, Tú Ere' Aparte
[01:24.69]Shorty, Tiene' Un Culo Bien Grande, Eh
[01:28.23]De-Demasia'o Grande
[01:30.14]Y Yo Lo Tengo Estudia'o, Ya Mismo Me Gradúo
[01:33.33]Y En La Cara Me Lo Tatúo
[01:35.66]Vi Que Viste Mi Story Y Subiste Una Pa' Mí
[01:39.39]Yo Que Me Iba A Dormir, Ey
[01:41.56]En La Disco Habían Mil
[01:43.34]Y Yo Bailando Contigo En Mi Mente
[01:45.65]Aunque Sé Que No Debo
[01:48.85]Pensar En Ti, Bebé, Pero Cuando Bebo
[01:53.63]Me Viene Tu Nombre, Tu Cara, Tu Risa Y Tu Pelo, Ey
[01:58.83]Dime Dónde Tú Está', Que Yo Por Ti Cojo Un Vuelo
[02:03.66]Y A Yonaguni Le Llego
[02:06.78]Si Me Da' Tu Dirección, Yo Te Mando Mil Carta'
[02:09.91]Si Me Da' Tu Cuenta De Banco, Un Millón De Peso'
[02:12.82]To'a La Noche Arrodillado A Dio' Le Rezo
[02:14.99]Pa' Que Ante' Que Se Acabe El Año Tú Me De' Un Beso
[02:18.32]Y Empezar El 2023 Bien Cabrón
[02:21.66]Contigo Y Un Blunt
[02:23.60]Tú Te Ve' Asesina Con Ese Mahón (¡Wuh!)
[02:26.38]Me Matas Sin Un Pistolón
[02:28.80]Y Yo Te Compro Un Banshee
[02:31.34]Gucci, Givenchy
[02:33.02]Un Poodle, Un Frenchie
[02:34.59]El Pasto, Lo' Munchie'
[02:36.40]Te Canto Un Mariachi
[02:38.34]Me Convierto En Itachi, Eh
[02:41.66]Yeah-Yeah-Yeah-Yeah
[02:43.60]Bad Bunny, Baby, Bebé
[02:46.27]Bad Bunny, Baby, Bebé
[02:50.34]Kyo Wa Sekkusushitai
[02:53.15]Demo Anata To Dake
[02:56.07]Doko Ni Imasu Ka?
[02:58.51]Doko Ni Imasu Ka?
[03:00.96]Kyo Wa Sekkusushitai
[03:03.78]Demo Anata To Dake
[03:06.59]Doko Ni Imasu Ka?
[03:09.17]Doko Ni Imasu Ka? Eh`},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"},
  {nombre:"Yonaguni",album:"El Ultimo Tour del Mundo",artista:"Bad Bunny"}];

  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  buscarCancion(){
  }

  crearCancion(){
    this.dialog.open(EditarPopupComponent,{
      height:'94vh',
      width:'50vw',
      data:{id:1}
    })
  }

  cerrarSesion(){
    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'25vw',
      data:{mensaje:"¿Cerrar la sesión?",id:1}
    });
  }

  reproducirCancion(indiceCancion:number){
    this.router.navigate(['player']);
  }


  editarCancion(indiceCancion:number){
    this.dialog.open(EditarPopupComponent,{
      height:'94vh',
      width:'50vw',
      data:{id:2,cancion:this.canciones[indiceCancion]}
    })
  }

  eliminarCancion(indiceCancion:number){
    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'35vw',
      data:{mensaje:"¿Eliminar la canción "+ this.canciones[indiceCancion].nombre + "?" ,id:2}
    });
  }

}