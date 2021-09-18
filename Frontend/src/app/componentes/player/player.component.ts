import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { TrackServiceService } from 'src/app/services/track-service.service';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  tiempoTranscurrido: number = 0;
  tiempoTranscurridoGrafico: number = 0;
  tiempoTranscurridoMinutos: String = "00:00.00";
  tiempoTotalMinutos: String = "02:51.50";

  interval : any;
  intervaloGrafico : any;

  reproduciendo: boolean = false;

  nombreCancion = "";
  cancionId: string = '';

  segundosCancion = 171;
  audioCancion: any;

  letraCancionLRC = '';

  letraCancion = [{tiempo:"",letra:""}];

  letraMostrada = "";
  letraSiguiente = "";

  indiceMostrado = 0;

  anchoPantalla: number = 0;


  constructor(private router:Router, private trackService: TrackServiceService) { 
    this.obtenerAnchoPantalla();
  }

  ngOnInit(): void {
    //Obtener informacion de la cancion del servidor
    
    this.cancionId = this.trackService.songIdToPlay;
    
    this.trackService.obtenerLetra(this.cancionId).subscribe((data: any) =>{
      
      this.letraCancionLRC = data.letra;
      this.nombreCancion = data.nombre;

      this.audioCancion = new Audio();
      this.audioCancion.src = "http://localhost:4000/tracks/"+this.cancionId;
      this.audioCancion.load();

      this.transformarLRC();

    });

    //console.log(this.letraCancionLRC, 'u');


    /*this.audioCancion.addEventListener('loadedmetadata', function(this: any){
      // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
      var duration = this.audioCancion.duration;
  
      // example 12.3234 seconds
      console.log("The duration of the song is of: " + duration + " seconds");
      // Alternatively, just display the integer value with
      // parseInt(duration)
      // 12 seconds
    },false);*/
    //this.audioCancion.load();

  }

  transformarLRC(){
    let linea = "";
    this.letraCancion = [];
    for(var caracter of this.letraCancionLRC){
      if(caracter!="\n"){
        
        linea += caracter
      }else{
        
        this.letraCancion.push({tiempo:linea.substring(1,9),letra:linea.substring(10)});
        linea = ""
      }
    }
    //console.log(this.letraCancion);
  }


  @HostListener('window:resize',['$event'])
  obtenerAnchoPantalla(event?: undefined){
    this.anchoPantalla = window.innerWidth;
  }
    

  reproducirCancion() {
    this.reproduciendo = true;
    this.audioCancion.play();

    this.interval = setInterval(() => {
      if(this.tiempoTranscurrido<this.segundosCancion){
        this.tiempoTranscurrido++;
      }else{
        this.reiniciarCancion();
      }
    },1000)
    
    this.intervaloGrafico = setInterval(() => {
      if(this.tiempoTranscurrido<this.segundosCancion){

        this.tiempoTranscurridoGrafico++;

        let anchoBarra = "width:"+ (this.tiempoTranscurridoGrafico/100*this.anchoPantalla/this.segundosCancion).toString() + "px";
        document.getElementById('songStatus')?.setAttribute("style",anchoBarra);
        this.tiempoTranscurridoMinutos = new Date(this.tiempoTranscurridoGrafico*10).toISOString().substring(14,22);
        
        this.actualizarLetra();

      }
    },10)
  }

  actualizarLetra(){
    console.log(this.letraCancion)
    let i = 0;
    for(var fragmentoLetra of this.letraCancion){
      if(fragmentoLetra.tiempo == this.tiempoTranscurridoMinutos){
        this.letraMostrada = fragmentoLetra.letra;
        this.letraSiguiente = this.letraCancion[i+1].letra;
      }
      i++;
    }
  }


  pausarCancion() {
    this.reproduciendo = false;
    this.audioCancion.pause();
    clearInterval(this.interval);
    clearInterval(this.intervaloGrafico);
  }


  reiniciarCancion(){
    this.tiempoTranscurrido = 0;
    this.tiempoTranscurridoGrafico = 0;
    
    this.audioCancion.pause();
    this.audioCancion.load();

    this.tiempoTranscurridoMinutos = new Date(this.tiempoTranscurrido*10).toISOString().substring(14,22);
    this.pausarCancion();
    let anchoBarra = "width:"+ (this.tiempoTranscurrido).toString() + "px";
    document.getElementById('songStatus')?.setAttribute("style",anchoBarra);
    this.letraMostrada = "";
    this.letraSiguiente = "";
  }

  volverAlHome(){
    this.reiniciarCancion();
    this.router.navigate(['home']);
  }

}