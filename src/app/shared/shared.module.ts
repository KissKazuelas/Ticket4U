import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { MatSliderModule } from '@angular/material/slider';
import { AccountService } from './Services/account.service';
import {TableModule} from 'primeng/table';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatFormFieldModule} from '@angular/material/form-field';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    MatSliderModule,
    TableModule,
    ModalModule,
    MatFormFieldModule,InputTextModule
  ],
  providers: [BsModalService]
})
export class SharedModule { }
