import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-si-no-popup',
  templateUrl: './si-no-popup.component.html',
  styleUrls: ['./si-no-popup.component.css']
})
export class SiNoPopupComponent implements OnInit {
  mensaje = "";
  id = 0;

  constructor(private router:Router, public dialog: MatDialogRef<SiNoPopupComponent>, @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.mensaje = this.data.mensaje;
    this.id = this.data.id;
  }

  cerrarSesion(){
    this.router.navigate(['']);
  }

  aceptar(): void{
    this.dialog.close(true);
  }

  cerrar(): void{
    this.dialog.close(false);
  }

}
