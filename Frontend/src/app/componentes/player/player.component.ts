import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { error } from '@angular/compiler/src/util';
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

      //this.audioCancion = new Audio();
      //this.audioCancion.src = "http://localhost:4000/tracks/"+this.cancionId;
      //this.audioCancion.load();
      this.play("http://localhost:4000/tracks/"+this.cancionId).then((res) => {
        //this.audioCancion = res;
        this.transformarLRC();
        this.reproducirCancion();
      }).catch((err) => {
        console.log(err.message);
      });

    });

  }

  play(url: string) {
    return new Promise((resolve, reject) => { // return a promise
      this.audioCancion = new Audio(); 
      //audio.preload = "auto";                      // intend to play through
      //audio.autoplay = true;                       // autoplay when loaded
      this.audioCancion.onerror = reject;                      // on error, reject
      //audio.onended = resolve;                     // when done, resolve
      this.audioCancion.src = url;
      this.audioCancion.load();
      resolve('');
      //this.audioCancion.load();

    });
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
    console.log(this.letraCancion);
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
    this.audioCancion.currentTime = 0;

    this.tiempoTranscurridoMinutos = new Date(this.tiempoTranscurrido*10).toISOString().substring(14,22);
    
    let anchoBarra = "width:"+ (this.tiempoTranscurrido).toString() + "px";
    document.getElementById('songStatus')?.setAttribute("style",anchoBarra);
    this.letraMostrada = "";
    this.letraSiguiente = "";

    this.pausarCancion();
  }

  volverAlHome(){
    this.reiniciarCancion();
    this.router.navigate(['home']);
  }

}