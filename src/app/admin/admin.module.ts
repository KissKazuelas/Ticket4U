import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './users/users.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { LugaresComponent } from './pages/lugares/lugares.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    EventosComponent,
    LugaresComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
