import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserPageComponent} from "./user-page/user-page.component";

const appRoutes:Routes = [
  {path: 'users/:_id', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
