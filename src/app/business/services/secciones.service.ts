import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  private url = environment.apiUrl;
  constructor(private http : HttpClient) { }

  createSeccion(body: any){
    return this.http.post<any>(`${this.url}/lugar/create_seccion`,{...body});
  }
  getSecciones(uid_evento: string){
    return this.http.post<any>(`${this.url}/lugar/get_secciones`,{uid_evento});
  }
  deleteSeccion(uid_seccion: string){
    return  this.http.delete<any>(`${this.url}/lugar/delete_seccion`,{ body: {uid_seccion}});
  }
}
