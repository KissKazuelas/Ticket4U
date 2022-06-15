import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Businessman } from '../models/businessman.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl;
  constructor(private http : HttpClient) { }

  login(username: string,password: string) : Observable <any>{
    return  this.http.post<any>(`${this.url}/user/login`,{username,password});
  }

  createCustomer(nombre: string,apellido: string, e_mail: string,password: string,username: string){
    return this.http.post<any>(`${this.url}/user/new_customer`,{nombre,apellido,e_mail,password,username});
  }
  createBusinessman(businessman : Businessman){
    return this.http.post<any>(`${this.url}/user/new_businessman`,{...businessman});
  }
  


}
