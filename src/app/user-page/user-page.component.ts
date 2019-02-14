import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  _id:string;
  name:string;
  balance:string;
  phone:string;
  age:number;
  email:string;
  address:string;
  about:string;
  registered:any;
  tags:[];
  picture:string;
  user:any;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private userService:UsersService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userService.getUser(params.get('_id'))
        .subscribe(u => {
          this.user = u;
        })
    });
  }

}
