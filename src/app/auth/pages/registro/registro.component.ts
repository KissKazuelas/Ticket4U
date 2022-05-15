import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  band:boolean = true;
  constructor() { }
  templete(band:boolean){
    this.band=band;
  }
  create(e:Event){
    e.preventDefault();
  }

}
