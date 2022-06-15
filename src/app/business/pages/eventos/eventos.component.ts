import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/shared/Services/account.service';
import { EventoService } from '../../services/evento.service';
import { MessageService } from 'primeng/api';
import {Message} from 'primeng//api';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { WebsocketService } from '../../../shared/Services/websocket.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [MessageService]
})
export class EventosComponent implements OnInit {
  
  //Modal
  modalRef?: BsModalRef;

  //properties
  private jwt: string | null = null;
  today: Date = new Date;
  maxDate: Date = new Date;
  newEvent = {
    nombreEvento: '',
    organizador_jwt: '',
    fecha: ''
  }


  $eventos?: Observable<any>;
  $eventosRefresh = new BehaviorSubject('');

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    private eventosService: EventoService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private webSocket : WebsocketService
  ) {

  }

  ngOnInit(): void {
    this.jwt = this.accountService.getToken();
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear() + 2, this.today.getMonth(), this.today.getDay());
    this.primengConfig.ripple = true;
    this.$eventos = this.$eventosRefresh.pipe(
      switchMap(() => this.eventosService.getEventos(this.jwt ? this.jwt : ''))
    )
    this.webSocket.lsiten('messages').subscribe((data)=>{
      this.showConfirm(data);
    })
  } 

  showConfirm(message: any) {
    this.messageService.clear();
    this.messageService.add({sticky: true, severity:'success', summary:'Atencion!', detail:message});
  }
  createEventModal(template: TemplateRef<any>) {
    this.resetNewEvent();
    this.modalRef = this.modalService.show(template);
  }
  createEvent() {
    this.newEvent.organizador_jwt = this.jwt ? this.jwt : '';
    this.eventosService.createEvent(this.newEvent)
      .subscribe(res => {
        console.log(res);
        this.modalRef?.hide();
      });
  }
  resetNewEvent() {
    this.newEvent = {
      nombreEvento: '',
      organizador_jwt: '',
      fecha: ''
    }
  }


}
