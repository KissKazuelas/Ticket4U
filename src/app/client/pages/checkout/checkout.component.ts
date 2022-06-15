import { Component, OnInit } from '@angular/core';
import { Boletos } from '../../models/Checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  boletosCompra: Boletos[] =[];
  total: number = 0;
  band:boolean = true;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('boletos') != null){
      this.band=true;
      this.boletosCompra=JSON.parse(localStorage.getItem('boletos')!);
      this.total = this.boletosCompra.reduce((a, b) => a + (b["total"] || 0), 0);
    }else{
      this.band=false;
    }
  }
  VaciaCarrito(){
    localStorage.removeItem('boletos');
    this.band=false;
  }
}
