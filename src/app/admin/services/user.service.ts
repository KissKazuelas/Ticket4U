import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResultUsers, UsersList } from '../interfaces/users.interface';
import { User } from '../models/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getUsers(jwt: string) : Observable <ResultUsers>{
    return  this.http.post<any>(`${this.url}/user/get_Users`,{jwt});
  }
  toggleUser(jwt: string,uid_user: string,status: boolean) : Observable <any>{
    return  this.http.delete<any>(`${this.url}/user/delete_user`,{ body: {jwt,uid_user,status}});
  }
  
  getUser(jwt: string,uid_usr: string) : Observable <any>{
    return  this.http.post<any>(`${this.url}/user/get_single_user`,{jwt,uid_usr});
  }
  
  updateUser(jwt: string, user: User,isCustomer : boolean): Observable <any>{
    return  this.http.put<any>(`${this.url}/user/edit_user`,{jwt,...user,isCustomer});
  }
  

}
