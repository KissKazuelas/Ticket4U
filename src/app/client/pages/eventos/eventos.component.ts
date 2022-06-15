import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/Evento.model';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  constructor(private CleintService : ClientServiceService) { }
  eventos: Evento[] = [];
  ngOnInit(): void {
    this.CleintService.getEvents()
      .subscribe(res =>{
        this.eventos=res.eventosList;
      })
  }

}
