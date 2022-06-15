import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { EventosComponent } from './pages/eventos/eventos.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EventoComponent } from './pages/evento/evento.component';


@NgModule({
  declarations: [
    EventosComponent,
    HomeComponent,
    EventoComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class BusinessModule { }
