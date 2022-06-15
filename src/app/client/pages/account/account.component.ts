import { JSDocTag } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../services/client-service.service';
import { MetodoPago } from '../../models/Pago.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  nombre: string = "";
  apellido:string ="";
  mail:string ="";
  username:string ="";
  display: boolean = false;


  $metodos?: Observable<any>;
  $metodosRefresh = new BehaviorSubject('');

  metodoPago:MetodoPago = new MetodoPago();
  metodosPago:MetodoPago[] = [];

  constructor(private clientService : ClientServiceService,
              private messageService : MessageService) { }



  addSingleSuccess(msg : string) {
    this.messageService.add({severity:'success', summary:'Listo!', detail:msg, life: 3000});
  }


  showDialog() {
      this.display = true;
  }
  ngOnInit(): void {
    this.clientService.getDataUser().subscribe(resp =>{
      const {nombre,apellido,mail,userName}=resp.user;
      this.nombre=nombre;
      this.apellido=apellido;
      this.mail=mail;
      this.username=userName;
    })
    this.GetMetodosPago();
  }

  VistaActualizaNombre(){
    (<HTMLInputElement>document.getElementById(`txtNombre`)).classList.add('d-none');
    (<HTMLInputElement>document.getElementById(`inputNombre`)).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById(`btnEditar`)).classList.add('d-none');
    (<HTMLInputElement>document.getElementById(`btnActualizar`)).classList.remove('d-none');
  }
  GetMetodosPago(){
    this.$metodos = this.$metodosRefresh.pipe(
      switchMap(() => this.clientService.getMetodosPago()
    ));
    // this.clientService.getMetodosPago().subscribe(resp => {
    //   this.metodosPago=resp.metodPago;
    // })
  }
  CrearMetodoPago(){
    // if(Object.entries(this.metodoPago).every(x => x=)){
    //   return;
    // }
    this.metodoPago.owner=localStorage.getItem("uid_ust")!;
    this.clientService.createMetodoPago(this.metodoPago).subscribe(resp =>{
      this.display=false;
      this.$metodosRefresh.next('');
      this.addSingleSuccess('Se ha agregado con exito el metodo de pago');
    })
  }
  DeleteMetodoPago(id:string){

  }

}
