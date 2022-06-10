import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { 
    let jwt = localStorage.getItem('jwt');
    if(jwt){
      this.logged = true;
    }
  }

  logged : boolean = false;

  ngOnInit(): void {
  }

}
