import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../../shared/Services/account.service';
import { UsersList } from '../../interfaces/users.interface';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../models/users.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //Properties
  private jwt: string | null = null;
  users: UsersList[] = [];
  $users?: Observable<any>;
  $userRefresh = new BehaviorSubject('');
  selectUser: User = new User();

  //Modal
  modalRef?: BsModalRef;

  constructor(private userService: UserService,
    private accountService: AccountService,
    private modalService: BsModalService) {
    localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTM1MjM4MzR9.3JccMEtGixnIQZNaCEXhx9wqs3WQwsidMXZrwiyukLw')
  }

  ngOnInit(): void {
    this.jwt = this.accountService.getToken();
    this.$users = this.$userRefresh.pipe(
      switchMap(() => this.userService.getUsers(this.jwt ? this.jwt : ''))
    )
  }
  toogleUSer(id: string, status: boolean) {
    this.userService.toggleUser(this.jwt ? this.jwt : '', id, !status)
      .subscribe(res => {
        this.$userRefresh.next('');
      })

  }
  refreshUsers() {
    this.$userRefresh.next('');
  }
  updateUser(template: TemplateRef<any>, id: string) {
    this.userService.getUser(this.jwt ? this.jwt : '',id)
    .subscribe(res => {
      this.selectUser=res.user;
      this.modalRef = this.modalService.show(template);
    })
  }
  confirmUpdate() {
    this.userService.updateUser(this.jwt?this.jwt:'',this.selectUser,this.selectUser.rol=='CUSTOMER')
    .subscribe(res=>{
      console.log(res);
      this.modalRef?.hide();
    }) 
  }
  closeModal(){
    this.selectUser = new User();
  }

}
