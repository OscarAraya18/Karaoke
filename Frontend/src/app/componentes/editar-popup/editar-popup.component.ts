import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiNoPopupComponent } from '../si-no-popup/si-no-popup.component';
import { TrackServiceService } from '../../services/track-service.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-editar-popup',
  templateUrl: './editar-popup.component.html',
  styleUrls: ['./editar-popup.component.css']
})
export class EditarPopupComponent implements OnInit {
  id = 0;
  cancion: any;

  letraToEdit: any = '';

  nombreCancion = ""
  audioCancion: any;
  

  constructor(private router:Router, private trackService: TrackServiceService, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.id = this.data.id;
    if(this.id==2){
      this.cancion = this.data.cancion;

      this.trackService.obtenerLetra(this.cancion.cancionId).subscribe((data:any) =>{
        console.log(data);
        this.letraToEdit = data.letra;
        
      });
      //obtener audio de la cancion y su nombre
      this.nombreCancion = this.cancion.nombre+'.mp3';
    }else{
      this.nombreCancion = "No se ha cargado ningún audio"
    }
  }

  subidaAudio(event:any){
    const file = event.target.files[0];
    this.audioCancion=file;
    console.log(typeof(file));
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        //this.audioCancion=reader.result;
        this.nombreCancion=file.name;
    };
  }

  editarCancion(idToEdit: string){

    console.log('Editando canción...');

    let nombreCancionEdit = (document.getElementById("nombreCancionEdit") as HTMLInputElement).value;
    let nombreAlbumEdit = (document.getElementById("nombreAlbumEdit") as HTMLInputElement).value;
    let nombreArtistaEdit = (document.getElementById("nombreArtistaEdit") as HTMLInputElement).value;
    let inputLetraEdit = (document.getElementById("letraCancionEdit") as HTMLInputElement).value;
    

    const datosPorEditar = {
      letra: inputLetraEdit,
      album: nombreAlbumEdit,
      nombre: nombreCancionEdit,
      artista: nombreArtistaEdit
    };

    console.log(datosPorEditar);

    this.trackService.actualizarCancion(idToEdit, datosPorEditar).subscribe(data =>{
      window.location.reload();
      console.log(data);
    });

    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'35vw',
      data:{mensaje:"¿Editar la canción " + this.cancion.nombre + "?",id:3}
    });
    
  }


  crearCancion(){

    console.log('Agregando canción...');
    
    let nombreCancion = (document.getElementById("nombreCancionPopUp") as HTMLInputElement).value;
    let nombreAlbum = (document.getElementById("nombreAlbumPopUp") as HTMLInputElement).value;
    let nombreArtista = (document.getElementById("nombreArtistaPopUp") as HTMLInputElement).value;
    let inputLetra = (document.getElementById("letraCancion") as HTMLInputElement).value;


    var form: any = new FormData();
    
    //var form = new FormData();
    form.append('letra', inputLetra);
    form.append('album', nombreAlbum);
    form.append('name', nombreCancion);
    form.append('track', this.audioCancion);
    form.append('artista', nombreArtista);
    
    this.trackService.agregarCancion(form).subscribe(data =>{
      window.location.reload();
      console.log(data);
    });

    this.dialog.open(SiNoPopupComponent,{
      height:'25vh',
      width:'35vw',
      data:{mensaje:"¿Agregar la canción " + this.nombreCancion + "?",id:4}
    });
  }
}
