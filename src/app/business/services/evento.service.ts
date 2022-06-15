import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private url = environment.apiUrl;
  constructor(private http : HttpClient) { }

  createEvent(body: any){
    return this.http.post<any>(`${this.url}/lugar/create_evento`,{...body});
  }
  getEventos(jwt: string){
    return this.http.post<any>(`${this.url}/lugar/get_eventos`,{uidOrganizador: jwt, statusFilter: 'ALL'});
  }
}
