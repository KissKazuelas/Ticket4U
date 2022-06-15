import { Component, OnInit, TemplateRef } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { AccountService } from '../../../shared/Services/account.service';
import { LugaresList } from '../../interfaces/lugares.interface';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lugar } from '../../models/lugares.models';


@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})


export class LugaresComponent implements OnInit {
 //Properties
 private jwt: string | null = null;
 lugares: LugaresList[] = [];
 $lugares?: Observable<any>;
 $lugarRefresh = new BehaviorSubject('');
 selectLugar: Lugar = new Lugar();


 status : boolean = true;

 //Modal
 modalRef?: BsModalRef;
  $userRefresh: any;
  selectUser: any;

 constructor(private lugarService: LugarService,
   private accountService: AccountService,
   private modalService: BsModalService) {
    console.log("lugarservice");
   localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTM1MjM4MzR9.3JccMEtGixnIQZNaCEXhx9wqs3WQwsidMXZrwiyukLw')
 }

 ngOnInit(): void {
   this.jwt = this.accountService.getToken();
   this.$lugares = this.$lugarRefresh.pipe(
     switchMap(() => this.lugarService.getLugares(this.jwt ? this.jwt : ''))
   )
 }

 /*
 
 toogleLugar(id: string, status: boolean) {
   this.lugarService.toggleLugar(this.jwt ? this.jwt : '', id, !status)
     .subscribe(res => {
       this.$userRefresh.next('');
     })

 }
*/ 
 updateLugar(template: TemplateRef<any>, id: string) {
  this.lugarService.getSingleLugar(this.jwt ? this.jwt : '',id)
  .subscribe(res => {
    this.selectLugar=res.lugar;
    this.selectLugar.lugar_uid=res.lugar._id;
    console.log(this.selectLugar);
    this.modalRef = this.modalService.show(template);
  })
}


 refreshLugares() {
   this.$lugarRefresh.next('');
 }
 /*updateUser(template: TemplateRef<any>, id: string) {
   this.userService.getUser(this.jwt ? this.jwt : '',id)
   .subscribe(res => {
     this.selectUser=res.user;
     this.modalRef = this.modalService.show(template);
   })
 }*/
 /*
 confirmUpdate() {
   this.userService.updateUser(this.jwt?this.jwt:'',this.selectUser,this.selectUser.rol=='CUSTOMER')
   .subscribe(res=>{
     console.log(res);
     this.modalRef?.hide();
   }) 
 }**/ 
 /*
 closeModal(){
   this.selectUser = new User();
 }
*/
createLugar(template: TemplateRef<any>){
  this.selectLugar = new Lugar();
  this.selectLugar.calle="";
  this.selectLugar.ciudad="";
  this.selectLugar.estado="";
  this.selectLugar.nombre="";
  this.selectLugar.status=true;
  this.modalRef = this.modalService.show(template);
}

guardarLugar(){
  //this.modalRef?.hide();
  //console.log(this.selectLugar);
 this.selectLugar.jwt=this.jwt;
  this.lugarService.createLugar(this.selectLugar)
  .subscribe(res=>{
    console.log(res);   
    this.modalRef?.hide();
    this.refreshLugares();
  }) 

}

confirmUpdate() {
  this.lugarService.updateLugar(this.selectLugar)
  .subscribe(res=>{
    console.log(res);
    this.modalRef?.hide();
    this.refreshLugares();    
  }) 
}

}
