import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/Pago.model';
import { DatoFacturacion } from '../models/Facturacion.model';
import { Asiento } from '../models/Asiento.model';

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
  getDatosFacturacion(){
    return this.http.post<any>(`${this.url}/user/get_datFact`,{"uid_usr":localStorage.getItem("uid_ust")});
  }
  creteDatoFacturacion(datofacturacion:DatoFacturacion){
    return this.http.post<any>(`${this.url}/user/create_datoFact`,datofacturacion);
  }
  deleteDatoFac(_id:string){
    return this.http.delete<any>(`${this.url}/user/delete_datoFact`,{ body: {"uid_datoFact":_id}});
  }
  deleteMetodoPago(_id:string){
    return this.http.delete<any>(`${this.url}/user/delete_metodopago`,{ body: {"uid_MetodoPago":_id}});
  }
  createAsiento(asiento:Asiento){
    console.log(asiento);
    return this.http.post<any>(`${this.url}/user/create_asiento`,asiento);
  }
  getAsientos(){
    return this.http.post<any>(`${this.url}/user/get_boletos_usuario`,{"usuario_uid": localStorage.getItem("uid_ust")});
  }
  getPDFReport(id:string){
    return this.http.post<any>(`${this.url}/user/get_boleto_detailed`,{"boleto_uid":id});
  }
}
