import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  //Modal
  modalRef?: BsModalRef;

  //properties

  today :Date = new Date;
  maxDate :Date = new Date;
  

  constructor(
    private modalService: BsModalService
    ) { }
    
    ngOnInit(): void {
      this.today  = new Date();
      this.maxDate = new Date(this.today.getFullYear()+2 ,this.today.getMonth(),this.today.getDay());
  }

  createEvent(template: TemplateRef<any>,){
    this.modalRef = this.modalService.show(template);
  }
  
}
