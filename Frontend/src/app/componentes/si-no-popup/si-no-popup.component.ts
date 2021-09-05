import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-si-no-popup',
  templateUrl: './si-no-popup.component.html',
  styleUrls: ['./si-no-popup.component.css']
})
export class SiNoPopupComponent implements OnInit {
  mensaje = "";
  id = 0;

  constructor(private router:Router, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.mensaje = this.data.mensaje;
    this.id = this.data.id;
  }

  cerrarSesion(){
    this.router.navigate(['']);
  }

  eliminarCancion(){
    
  }

  editarCancion(){
    this.dialog.closeAll();
  }

  crearCancion(){
    this.dialog.closeAll();
  }

}
