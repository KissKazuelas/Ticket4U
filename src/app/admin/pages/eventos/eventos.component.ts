import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LugarService } from '../../services/lugar.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  $lugares?: Observable<any>;
  selectedLugar : string = '';

  constructor(private lugarService : LugarService) { }

  ngOnInit(): void {
    this.$lugares=this.lugarService.getLugares('');
  }
  generarReporte(){
    
  }

}
