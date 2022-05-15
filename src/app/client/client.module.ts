import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';



@NgModule({
  declarations: [
  
    NavbarComponent,
       FooterComponent,
       ClientComponent,
       HomeComponent,
       EventosComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
