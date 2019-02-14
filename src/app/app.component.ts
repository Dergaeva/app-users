import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


import {User} from './user';
import {UsersService} from './services/users.service';
import {FormModalComponent} from "./form-modal/form-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public user:User;
  public buttonName:any = 'Добавить пользователя';


  observableUsers:Observable<User[]>;
  errorMessage:String;

  constructor(private usersService:UsersService,
              private modalService:NgbModal) {

  }

  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);

    modalRef.result.then((result) => {
      if (result) {
        this.reload();
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit():void {
    this.reload();
  }

  reload() {
    this.observableUsers = this.usersService.getUsersWithObservable();
    this.observableUsers.subscribe();
  }

  deleteUser(user:User) {
    this.usersService.deleteUser(user)
      .subscribe(() => {
        this.observableUsers = this.observableUsers.filter((u:any) => u._id !== user._id);
      });
  }

}
