import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/Customer.model';
import { AuthService } from '../../services/auth.service';
import { Businessman } from '../../models/businessman.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  band:boolean = true;
  user : Customer = new Customer;
  businessman : Businessman = new Businessman;
  constructor(private authService : AuthService,private router: Router) { }
  templete(band:boolean){
    this.band=band;
  }
  createUser(){
    const {nombre,username,apellido,password,e_mail}=this.user;
    this.authService.createCustomer(nombre,apellido,e_mail,password,username)
      .subscribe(res => {
        if(res.msg === 'User created succesfully'){
          this.router.navigateByUrl('/auth/login');
        }
      })
  }
  createBusinessman(){
    this.authService.createBusinessman(this.businessman)
      .subscribe(res => {
        if(res.msg === 'User created succesfully'){
          this.router.navigateByUrl('/admin');
        }
      })
  }

}
