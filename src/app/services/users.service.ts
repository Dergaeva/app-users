import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from '../user';

@Injectable()
export class UsersService {

  url = "http://localhost:3000/users";

  constructor(private http:HttpClient) {
  }

  getUsersWithObservable():Observable<any> {
    return this.http.get(this.url)
      .catch(this.handleErrorObservable);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body;
  }

  private handleErrorObservable(error:Response | any) {
    console.error(error.message || error);
    return throwError(error.message || error);
  }

  addUser(user:User) {
    return this.http.post(this.url, user);
  }

  getUser(userId) {
    return this.http.get(`${this.url}/${userId}`)
  }

  deleteUser(user:User) {
    return this.http.delete(`${this.url}/${user._id}`);
  }

}
