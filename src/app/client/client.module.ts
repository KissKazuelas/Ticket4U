import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccountComponent } from './pages/account/account.component';
import { EventoComponent } from './pages/evento/evento.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
    NavbarComponent,
       FooterComponent,
       ClientComponent,
       HomeComponent,
       EventosComponent,
       ContactoComponent,
       CheckoutComponent,
       AccountComponent,
       EventoComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClientModule { }
