import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';

@Component({
  selector: 'app-editar-popup',
  templateUrl: './editar-popup.component.html',
  styleUrls: ['./editar-popup.component.css']
})
export class EditarPopupComponent implements OnInit {
  id = 0;
  cancion: any;

  nombreCancion = ""
  audioCancion: any;

  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.id = this.data.id;
    if(this.id==2){
      this.cancion = this.data.cancion;


      //obtener audio de la cancion y su nombre
      this.nombreCancion = "Yonaguni.mp3";
    }else{
      this.nombreCancion = "No se ha cargado ningún audio"
    }
  }

  subidaAudio(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        this.audioCancion=reader.result;
        this.nombreCancion=file.name;
    };
  }

  editarCancion(){
    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'35vw',
      data:{mensaje:"¿Editar la canción " + this.cancion.nombre + "?",id:3}
    });
  }

  crearCancion(){
    let nombreCancion = "Yonaguni";
    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'35vw',
      data:{mensaje:"¿Agregar la canción " + nombreCancion + "?",id:4}
    });
  }
}
