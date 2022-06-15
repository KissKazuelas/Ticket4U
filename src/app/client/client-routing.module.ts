import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AccountComponent } from './pages/account/account.component';
import { EventoComponent } from './pages/evento/evento.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes : Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'cuenta',
        component: AccountComponent
      },
      {
        path: 'eventos/:id',
        component: EventoComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
