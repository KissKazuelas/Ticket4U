import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getToken():string | null{
    return localStorage.getItem('jwt');
  }
}
