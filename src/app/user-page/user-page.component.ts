import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';


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
  registered:string;
  tags:[];
  picture:string;


  constructor(private route:ActivatedRoute, private router:Router) {
  }

  ngOnInit() {
    this._id = this.route.snapshot.params['_id'];
    this.name = this.route.snapshot.params['name'];

    this.age = this.route.snapshot.queryParams['age'];
    this.email = this.route.snapshot.queryParams['email'];
    this.balance = this.route.snapshot.queryParams['balance'];
    this.phone = this.route.snapshot.queryParams['phone'];
    this.address = this.route.snapshot.queryParams['address'];
    this.about = this.route.snapshot.queryParams['about'];
    this.registered = this.route.snapshot.queryParams['registered'];
    this.tags = this.route.snapshot.queryParams['tags'];

    this.picture = this.route.snapshot.queryParams['picture'];

    this.route.params.subscribe((params:Params) => {
      this._id = params['_id'];
      this.name = params['name'];

    });

    this.route.queryParams.subscribe((params:Params) => {
      this.age = +params['age'];
      this.email = params['email'];
      this.balance = params['balance'];
      this.phone = params['phone'];
      this.address = params['address'];
      this.about = params['about'];
      this.registered = params['registered'];
      this.tags = params['tags'];
      this.picture = params['picture'];
    })
  }

}
