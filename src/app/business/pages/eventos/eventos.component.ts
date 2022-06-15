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
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

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
    private filerSaver : FileSaverService 
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
      this.showConfirm('Se ha creado con exito');
      this.$eventosRefresh.next('');
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

  exportExcel(uid: string){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    let data: any = [];
    // data.push({
    //   nombre: 'abc',
    //   number:123,
    //   test:'12as'
    // })
    // data.push({
    //   nombre: 'abc',
    //   number:123,
    //   test:'12as'
    // })
    // data.push({
    //   nombre: 'abc',
    //   number:123,
    //   test:'12as'
    // })
    this.eventosService.getReporteEvento(uid)
    .subscribe(res=>{
      for (let i of res.listaBoletos) {
        data.push({
          num_asiento: i.datosBoleto.num_asiento,
          nombre: i.datosFacturacion.nombre,
          regimenFiscal: i.datosFacturacion.regimenFiscal,
          calle: i.datosFacturacion.calle,
          codigoPostal: i.datosFacturacion.codigoPostal,
          colonia: i.datosFacturacion.colonia,
          ciudad: i.datosFacturacion.ciudad,
          estado: i.datosFacturacion.estado,
          RFC: i.datosFacturacion.RFC,
          razonSocial: i.datosFacturacion.razonSocial,
          banco:  i.datosMetodoPago.banco
        })
      }
      const worksheet = XLSX.utils.json_to_sheet(data);
    const worbook = {
      Sheets:{
        'testingSheet':worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(worbook,{bookType:'xlsx',type:'array'});
    const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE});
    this.filerSaver.save(blobData,'Reporte.xlsx')
    });
    
  }


}
