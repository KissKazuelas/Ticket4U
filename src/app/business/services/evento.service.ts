import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  updateEvento(evento : any): Observable <any>{
    return  this.http.put<any>(`${this.url}/lugar/edit_evento`,{...evento});
  }
  getReporteEvento(evento_uid: string){
    return this.http.post<any>(`${this.url}/user/get_reporte_por_evento`,{evento_uid});

  }
}
