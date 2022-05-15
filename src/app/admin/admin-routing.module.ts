import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './users/users.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { LugaresComponent } from './pages/lugares/lugares.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: UsersComponent},
      { path: 'lugares', component: LugaresComponent},
      { path: 'eventos', component: EventosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
