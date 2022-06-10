import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { EventosComponent } from './pages/eventos/eventos.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventosComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule
  ]
})
export class BusinessModule { }
