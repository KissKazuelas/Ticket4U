import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seccion } from '../../models/Evento.model';
import { Boletos } from '../../models/Checkout.model';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  _id: string = "";
  nombreEvento: string = "";
  fecha: Date = new Date();
  listaSecciones:Seccion[] = [];
  boletosCompra: Boletos[]=[];
  constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this._id= params["id"];
      this.nombreEvento= params["nombre"];
      this.fecha= params["fecha"];
      this.listaSecciones=JSON.parse(JSON.parse(params["listaDeSecc"]))
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

}