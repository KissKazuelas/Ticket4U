import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  user: User = new User;

  constructor(private authService : AuthService,private router: Router,
              private messageService : MessageService) { }
  ngOnInit(): void {
  }
  addToastError(msg : string) {
    this.messageService.add({severity:'error', summary:'Error!', detail:msg, life: 2000});
  }
  addToastSuccess(msg : string) {
    this.messageService.add({severity:'success', summary:'Correcto!', detail:msg, life: 3000});
  }
  login(){
    this.authService.login(this.user.username,this.user.password)
    .subscribe(res=>{
      this.addToastSuccess('Login correcto!');
      localStorage.setItem('jwt',res.jwt);
      localStorage.setItem('uid_ust',res.uid_ust);
      switch(res.role){
        case 'CUSTOMER':
          this.router.navigateByUrl('/')
          break;
        case 'ADMIN':
          this.router.navigateByUrl('/admin')
          break;
        case 'BUSINESS':
          this.router.navigateByUrl('/')
          break; 
      }
    }, err =>{
      this.addToastError('Datos incorrecctos');
    })
  }
}
