import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { EventoComponent } from './pages/evento/evento.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'eventos', pathMatch: 'full'},
      { path: 'eventos', component: EventosComponent},
      { path: 'eventos/:id', component: EventoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
