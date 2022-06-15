import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  
  socket: any;
  uri : string = 'ws://localhost:3000';
  constructor(
  ) {
    this.socket = io(this.uri);
   }
  lsiten(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data:string)=>{
        subscriber.next(data);
      })
    });
  }


}
