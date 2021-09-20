import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PlayerComponent } from './componentes/player/player.component';
import { SiNoPopupComponent } from './componentes/si-no-popup/si-no-popup.component';
import { EditarPopupComponent } from './componentes/editar-popup/editar-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak/app.init';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PlayerComponent,
    SiNoPopupComponent,
    EditarPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
