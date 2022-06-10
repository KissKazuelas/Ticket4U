import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'eventos', pathMatch: 'full'},
      { path: 'eventos', component: EventosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
