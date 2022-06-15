import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/Pago.model';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.post<any>(`${this.url}/lugar/get_eventos`,{"statusFilter":"ALL"})
  }
  getDataUser(){
    const jwt = localStorage.getItem('jwt');
    const uid_usr = localStorage.getItem('uid_ust');
    return this.http.post<any>(`${this.url}/user/get_single_user`,{jwt,uid_usr});
  }
  createMetodoPago(metodoPago: MetodoPago){
    return this.http.post<any>(`${this.url}/user/create_metodopago`,metodoPago);
  }
  getMetodosPago(){
    return this.http.post<any>(`${this.url}/user/get_metodospago`,{"uid_owner": localStorage.getItem("uid_ust")});
  }
  
}
