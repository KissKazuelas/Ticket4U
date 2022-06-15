import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LugarService } from '../../services/lugar.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    this.lugarService.reportePDF(this.selectedLugar).subscribe(resp=>{
      const doc = new jsPDF();
      const columns = [['Nombre Evento', 'Fecha', 'Organizador']];
      let data:any = [];
      for(let x of resp.listaEventosComplete){
        const arr:any[]= [x.eventoDetalles.nombreEvento,x.eventoDetalles.fecha,x.organizador[0].nombre]
       data.push(arr); 
      }
      autoTable(doc, {
        head: columns,
        body: data,
        didDrawPage: (dataArg) => {
          doc.text('REPORTE LUGAR', dataArg.settings.margin.left, 10);
        }
      });
      doc.save(`Reporte Lugar.pdf`);
    })
  }

}
