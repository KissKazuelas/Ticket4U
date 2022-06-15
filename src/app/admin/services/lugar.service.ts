import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResultLugares, LugaresList } from '../interfaces/lugares.interface';
import { Lugar } from '../models/lugares.models';
import { ResultUsers, UsersList } from '../interfaces/users.interface';
import { User } from '../models/users.models';


@Injectable({
    providedIn: 'root'
  })
  export class LugarService {
    private url = environment.apiUrl;
    constructor(private http : HttpClient) { }
  
    getLugares(jwt: string) : Observable <ResultLugares>{
      return  this.http.get<any>(`${this.url}/lugar/get_lugares`);
    //  return  this.http.post<any>(`${this.url}/user/get_Users`,{jwt});
    }
    
    createLugar(model : Lugar){
      return this.http.post<any>(`${this.url}/lugar/create_lugar`,model);
    }

    
    toggleLugar(jwt: string,uid_user: string,status: boolean) : Observable <any>{
      return  this.http.delete<any>(`${this.url}/user/delete_user`,{ body: {jwt,status}});
    }
    /*
    
    getLugar(jwt: string,uid_: string) : Observable <any>{
      return  this.http.post<any>(`${this.url}/user/get_single_user`,{jwt,uid_usr});
    }
    
    updateUser(jwt: string, user: Lugar,isCustomer : boolean): Observable <any>{
      return  this.http.put<any>(`${this.url}/user/edit_user`,{jwt,...user,isCustomer});
    }
  
    getLugares(jwt: string) : Observable <ResultUsers>{
      return  this.http.post<any>(`${this.url}/lugar/get_lugares`,{jwt});
    }
    */
  }
  
  