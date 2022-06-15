import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { AccountService } from '../../../shared/Services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LugarService } from '../../../admin/services/lugar.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { SeccionesService } from '../../services/secciones.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  id: string | undefined = '';

  evento  = {
    uid_evento: '',
    nombreEvento: '',
    fecha: new Date(),
    lsitaDeSecc: [],
    lugarEvento: '',
    status: ''
  };

  seccion = {
    nombre : ' ',
    numAsientos: 0,
    precioUnitario: 0,
    uid_evento: ''
  }

  $lugares?: Observable<any>;
  $secciones?: Observable<any>;

  $seccionesRefresh = new BehaviorSubject('');

  today: Date = new Date;
  maxDate: Date = new Date;

  private jwt: string | null = null;

  constructor(
    private eventosService: EventoService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private lugarService: LugarService,
    private seccionesServices : SeccionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwt = this.accountService.getToken();
    this.eventosService.getEventos(this.jwt?this.jwt:'')
    .subscribe(res=>{
      this.evento = res.eventosList.filter((evento: any) => evento._id == this.id)[0];
      this.evento.uid_evento = res.eventosList.filter((evento: any) => evento._id = this.id)[0]._id; 
      this.evento.fecha = new Date(this.evento.fecha);
      console.log(this.evento);
      if(this.evento.status =='ACTIVE')
      this.router.navigateByUrl('business');
    })
    this.$lugares=this.lugarService.getLugares('');
    this.today = new Date();
    this.maxDate = new Date(this.today.getFullYear() + 2, this.today.getMonth(), this.today.getDay());
    this.id = this.route.snapshot.paramMap.get('id')?.toString();
    this.$secciones=this.$seccionesRefresh.pipe(
      switchMap(() => this.seccionesServices.getSecciones(this.id ? this.id : '')
    ));
    
  }

  clearSeccion(){
    this.seccion = {
      nombre : ' ',
      numAsientos: 0,
      precioUnitario: 0,
      uid_evento: ''
    }
  }

  createSeccion(){
    this.seccion.uid_evento=this.id ? this.id : '';
      this.seccionesServices.createSeccion(this.seccion)
      .subscribe(res=>{
        this.$seccionesRefresh.next('');
        this.clearSeccion();
      })
  }
  deleteSeccion(_id : string){
    this.seccionesServices.deleteSeccion(_id)
    .subscribe(res=>{
      this.$seccionesRefresh.next('');
    })
  }
  updateEvento(){
    this.eventosService.updateEvento(this.evento)
    .subscribe(res=>{
      this.router.navigateByUrl('business')
    })
  }

}
