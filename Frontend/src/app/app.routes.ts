import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PlayerComponent } from './componentes/player/player.component';
import { EditarPopupComponent } from './componentes/editar-popup/editar-popup.component';
import { SiNoPopupComponent } from './componentes/si-no-popup/si-no-popup.component';
import { AuthGuard } from './keycloak/app.guard';

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component:HomeComponent},
  { path: 'player', component:PlayerComponent},
  { path: 'editarCrear', component:EditarPopupComponent},
  { path: 'siNo', component:SiNoPopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const app_routing = RouterModule.forRoot(routes)