import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {UsersService} from './services/users.service';
import {UserPageComponent} from "./user-page/user-page.component";
import {FormModalComponent} from './form-modal/form-modal.component';

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    UserPageComponent,
    FormModalComponent
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule {
}
