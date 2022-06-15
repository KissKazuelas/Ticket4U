import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seccion } from '../../models/Evento.model';
import { WebsocketService } from 'src/app/shared/Services/websocket.service';
import { Boletos } from '../../models/Checkout.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [MessageService]
})
export class EventoComponent implements OnInit {
  _id: string = "";
  nombreEvento: string = "";
  fecha: Date = new Date();
  listaSecciones:Seccion[] = [];
  boletosCompra: Boletos[]=[];
  constructor(private route:ActivatedRoute,private router: Router,private webSocket:WebsocketService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this._id= params["id"];
      this.nombreEvento= params["nombre"];
      this.fecha= params["fecha"];
      this.listaSecciones=JSON.parse(JSON.parse(params["listaDeSecc"]))
    })
    this.webSocket.lsiten('messages').subscribe((data)=>{
      this.showConfirm(data);
    })
  }

  Checkout(){
    this.boletosCompra=[];
    for(let i=0;i<this.listaSecciones.length;i++){
      const qty = Number((<HTMLInputElement>document.getElementById(`qtySecc${i}`)).value);
      if(qty>0){
        this.boletosCompra.push(new Boletos(this.listaSecciones[i]._id,this.listaSecciones[i].precioUnitario,qty,this.listaSecciones[i].nombre,this.nombreEvento))
      }
    }
    localStorage.setItem('boletos',JSON.stringify(this.boletosCompra));
    this.router.navigateByUrl('/checkout')
  }
  showConfirm(message: any) {
    this.messageService.clear();
    this.messageService.add({sticky: true, severity:'success', summary:'Atencion!', detail:message,life: 2000});
  }

}