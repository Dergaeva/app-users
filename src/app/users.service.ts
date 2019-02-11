import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/user';

@Injectable()
export class UsersService {

  constructor(private http:HttpClient) {
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  addUser(user:User) {
    return this.http.post('http://localhost:3000/users', user);
  }

  deleteUser(user:User) {
    return this.http.delete(`http://localhost:3000/users/${user._id}`);
  }

}
