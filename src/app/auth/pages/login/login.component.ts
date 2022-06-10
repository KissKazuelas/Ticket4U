import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User;

  constructor(private authService : AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.user.username,this.user.password)
    .subscribe(res=>{
      localStorage.setItem('jwt',res.jwt);
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
    })
  }
}
