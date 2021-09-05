import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  tiempoTranscurrido: number = 0;
  tiempoTranscurridoGrafico: number = 0;
  tiempoTranscurridoMinutos: String = "00:00.00";
  tiempoTotalMinutos: String = "06:41.70";

  interval : any;
  intervaloGrafico : any;

  reproduciendo: boolean = false;

  nombreCancion = "Delincuente"
  segundosCancion = 402;
  audioCancion: any;

  letraCancionLRC = `
  [00:22.10]Dicen que soy un delincuente por ahí la gente es lo que habla
  [00:27.90]Por mí que hablen que comenten porque a nadie le debo nada
  [00:33.40]Gracias a Dios le doy porque él me trajo hasta aquí Wassup uah
  [00:39.10]No me dejó **** y me di cuenta quién está pa mí Pa mí pa mí
  [00:44.60]Dicen que soy un delincuente Blup blup por ahí la gente es lo que habla Blep oeh
  [00:50.90]Por mí que hablen que comenten porque a nadie le debo nada Pum-pum-pum Ya-yah
  [00:55.80]Gracias a Dios le doy porque él me trajo hasta aquí Bless bless
  [01:01.20]No me dejó **** y me di cuenta quién está pa mí Anuel brrr
  [01:08.30]Diablo que cherreo ¿Ah
  [01:09.40]Cogí dinero y me bajaron el de'o Jaja
  [01:12.30]Ya no era el rey del trapeo
  [01:13.60]Ahora soy un diablo y la prensa me quiere ver preso
  [01:16.80]Y hablan ****** 'e mí pero no hablan del congreso Jaja
  [01:19.70]Dicen que soy un delincuente el rifle siempre en mi casa Uah
  [01:24.90]Tantos *******s que me odian y que siempre me amenazan No
  [01:30.60]Y no me vo a dejar matar y voy a ver a mi hijo crecer -er
  [01:35.10]Y también me necesita mi mujer -jer
  [01:37.70]Mi mai no para de llorar sé que fallé Uah
  [01:40.40]Porque yo era su ángel y me convertí en Lucifer
  [01:44.00]Y me superé
  [01:45.00]Me cancelaron el Choli en la prisión me quieren ver
  [01:47.70]Me juzgaron por mi letra y me metieron el pie
  [01:50.50]Pero cincuenta millone' gira mundial ya coroné uah
  [01:55.10]¿Y qué me van a hacer uah
  [01:57.80]'Toy borracho de poder uah
  [02:00.60]Dicen "¿Quién este se cree" uah
  [02:03.40]Hijue**** soy Anuel uah
  [02:07.70]Dicen que soy un delincuente Eh-eh por ahí la gente es lo que habla Eh-eh eh
  [02:13.70]Por mí que hablen que comenten porque a nadie le debo nada Pum-pum-pum
  [02:19.20]Gracias a Dios le doy porque él me trajo hasta aquí Wassup
  [02:24.10]No me dejó **** y me di cuenta quién está pa mí Pa mí; ¡Farru Yah-yah-yah
  [02:31.00]Llegó un chárter privado a la pista 'e aterrizaje
  [02:33.60]Desembarca individuo conocido personaje
  [02:36.30]Un can del TSA se sienta y marca el equipaje
  [02:39.20]Y oficiale de aduana preguntan que cuánto en efectivo traje Pu-pu-pu-pum
  [02:42.70]Disculpe oficial no recuerdo cantida exacta
  [02:44.90]Vengo cansa'o del viaje un mal rato no me hace falta
  [02:47.80]Si e má de lo debido pues se reporta y se informa
  [02:50.70]Llené mal el papel disculpa no leí las norma Pu-pu-pu-pum
  [02:53.60]No hay nada que esconder yo ando totalmente legal
  [02:56.30]Jefe yo soy cantante yo vengo de trabajar
  [02:59.10]Confísquenlo si quieren con él se pueden quedar
  [03:02.00]Pero no venga a arrestarme porque se quieren pautar
  [03:05.50]Se lucraron curaron de mí ****** hablaron y yo calla'o me quedé Shh
  [03:11.20]Difamaron juzgaron hasta me trancaron pero allá arriba hay un jue Allá arriba hay uno
  [03:16.60]Que todo lo ve y yo confío en él En nombre del padre del hijo
  [03:22.10]Tratan de meterme el pie pero no van a poder Del espíritu santo
  [03:27.50]Y aunque digan que soy Bum
  [03:29.70]Un bandolero donde voy Pu-pu-pu-pum uah
  [03:32.70]Le doy gracia a Dio Ooh a Dio'
  [03:35.90]Por hoy estar donde estoy Eh-eh
  [03:38.70]Y vo a seguir con mi tumbao Aah oh-oh
  [03:41.20]Y mis ojo colora'o Colora'o
  [03:44.60]Con los mío activa'o Activa'o uah
  [03:47.60]Ustede to me lo han da'o Uah pu-pu-pu-pum
  [03:53.40]Dicen que soy un delincuente por ahí la gente es lo que habla
  [03:59.30]Por mí que hablen que comenten porque a nadie le debo nada
  [04:04.90]Gracias a Dios le doy porque él me trajo hasta aquí Wassup
  [04:10.40]No me dejó **** y me di cuenta quién está pa mí Pa mí pa mí
  [04:16.30]Dicen que soy un delincuente Blup blup; eh-eh por ahí la gente es lo que habla Blep oeh
  [04:22.20]Por mí que hablen que comenten porque a nadie le debo nada Pum-pum-pum Ya-yah
  [04:27.70]Gracias a Dios le doy porque él me trajo hasta aquí Bless bless
  [04:32.60]No me dejó **** y me di cuenta quién está pa mí Pa mí pa mí
  [04:41.70]Una ve alguien dijo que la clave del éxito e la calma
  [04:44.40]Y que vendría sin aviso sin bandera y sin alarma
  [04:47.20]Que no me desespere
  [04:48.50]Eme dijo algo del "Ojo por ojo"
  [04:50.50]Y "Del que al hierro muere"
  [04:51.70]¿Pero sabe cuánto inocente mataron que nunca dispararon
  [04:54.80]¿Y cuánto hemo hecho má de lo que escribo y seguimo vivo'
  [04:57.80]Y e que los refrane generalista son para soldado'
  [05:01.00]Que no nacieron para ser generales en fin
  [05:03.00]Si intentamo no ser otro más todo se define en resistir
  [05:06.60]En soportar sin medir
  [05:08.00]Cambiando tanta cosa que a veces siente que dejas de existir
  [05:11.20]Fracaso no; rendirse no; matarlo' no; vengarlo' no; odiarlo' no
  [05:14.00]Yo sé que existe un Dios ¿pero y si no
  [05:17.40]No e lo mismo dudar que no creer
  [05:19.10]Por eso no permito que nadie subestime mi fe
  [05:21.80]Tengo muerto que dieron má problema estando vivo'
  [05:24.30]Pero tengo vivo sueltos que darían más problema estando muerto'
  [05:27.80]Y eso e sin hablar de su amigo'
  [05:29.60]¿Qué saben ustede de brincarle los sueño por las regresione'
  [05:33.00]¿De levantarse a contar las ******* día de tu sentencia para volver a aplastar a estos *******'
  [05:37.90]Jamás entenderán de lo que hablo
  [05:39.80]Pero si sigo vivo e porque Dio ha luchado por mi vida
  [05:42.80]Mucho má de lo que ha luchado el Diablo amén
  [06:11.60]El único que me puede juzgar e Dio'
  [06:14.20]Aunque un ejercito acampe contra mí no temerá mi corazón
  [06:17.80]Aunque contra mí se levante guerra yo estaré confiado
  [06:24.50]El sistema a nosotro no no corrompe papi nosotro nunca vamo a chotear jejeje
  [06:28.70]Real hasta la muerte ******`;

  letraCancion = [{tiempo:"",letra:""}];

  letraMostrada = "";
  letraSiguiente = "";

  indiceMostrado = 0;

  anchoPantalla: number = 0;


  constructor() { 
    this.obtenerAnchoPantalla();
  }

  ngOnInit(): void {
    //Obtener informacion de la cancion del servidor

    this.audioCancion = new Audio();
    this.audioCancion.src = 'https://res.cloudinary.com/dfionqbqe/video/upload/v1630819789/CE5508/Farruko_Anuel_AA_Kendo_Kaponi_-_Delincuente_Official_Video.mp3';
    this.audioCancion.load();
    this.transformarLRC();

  }

  transformarLRC(){
    let linea = "";
    this.letraCancion = [];
    for(var caracter of this.letraCancionLRC){
      if(caracter!="\n"){
        linea += caracter
      }else{
        this.letraCancion.push({tiempo:linea.substring(3,11),letra:linea.substring(12)});
        linea = ""
      }
    }
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

  }

}
