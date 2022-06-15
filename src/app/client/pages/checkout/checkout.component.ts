import { Component, OnInit } from '@angular/core';
import { Asiento } from '../../models/Asiento.model';
import { Boletos } from '../../models/Checkout.model';
import { DatoFacturacion } from '../../models/Facturacion.model';
import { MetodoPago } from '../../models/Pago.model';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  boletosCompra: Boletos[] =[];
  total: number = 0;
  band:boolean = true;
  metodosPago:MetodoPago[]=[]; 
  datosFacturacion:DatoFacturacion[]= [];
  idMP:string="";
  idDF:string="";
  asiento:Asiento = new Asiento();
  constructor(private clientService:ClientServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('boletos') != null){
      this.band=true;
      this.boletosCompra=JSON.parse(localStorage.getItem('boletos')!);
      this.total = this.boletosCompra.reduce((a, b) => a + (b["total"] || 0), 0);
    }else{
      this.band=false;
    }
    this.GetMetodosPago();
    this.GetDatosFac();
  }
  GetMetodosPago(){
    this.clientService.getMetodosPago().subscribe(resp=>{
      this.metodosPago=resp.metodPago;
    })
  }
  GetDatosFac(){
    this.clientService.getDatosFacturacion().subscribe(resp=>{
      this.datosFacturacion=resp.datos_fact;
    })
  }
  CreateBoletos(){
    this.boletosCompra.forEach(boletoCategoria =>{
      for(let i=0;i<boletoCategoria.cantidad;i++){
        this.asiento =new Asiento(boletoCategoria._id,localStorage.getItem("uid_ust")!,this.idMP,this.idDF)
        this.clientService.createAsiento(this.asiento).subscribe(resp =>{

        })
      }
    })
    localStorage.removeItem("boletos");
    this.band=false;
  }
  VaciaCarrito(){
    localStorage.removeItem('boletos');
    this.band=false;
  }
}
