import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { AccountService } from '../../../shared/Services/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  id: string | undefined = '';
  evento : any;
  seccion = {
    nombre : '',
    numAsientos: 0,
    precioUnitario: 0,
    uid_evento: ''
  }
  private jwt: string | null = null;

  constructor(
    private eventosService: EventoService,
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jwt = this.accountService.getToken();
    this.id = this.route.snapshot.paramMap.get('id')?.toString();
    this.eventosService.getEventos(this.jwt?this.jwt:'')
    .subscribe(res=>{
      this.evento = res.eventosList.filter((evento: any) => evento._id = this.id)[0];
      console.log(this.evento);
    })
  }

}
