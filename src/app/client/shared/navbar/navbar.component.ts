import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { 
    let jwt = localStorage.getItem('jwt');
    if(jwt){
      this.logged = true;
    }
  }

  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("uid_ust");
    localStorage.removeItem("boletos");
    this.router.navigateByUrl('/auth/login');
  }

  logged : boolean = false;

  ngOnInit(): void {
  }

}
