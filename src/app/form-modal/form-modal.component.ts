import {Component, Input, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {UsersService} from "../services/users.service";
import {User} from "../user";

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent {

  user:User;

  public minLength = 5;
  dateNow:Date = new Date();
  form:FormGroup;

  constructor(public activeModal:NgbActiveModal,
              private fb:FormBuilder,
              private usersService:UsersService) {
    this.createForm();
  }

  @ViewChild('fileInput') fileInput:ElementRef;


  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
      pass: ['', [Validators.required, Validators.minLength(this.minLength)]],
      name: ['', [Validators.required, Validators.pattern(/[A-Za-zА-Яа-яЁё ]/)]],
      company: [''],
      eyeColor: ['brown'],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)]],
      address: [''],
      genders: ['male'],
      about: [''],
      balance: ['', [Validators.required, Validators.pattern(/[/\d+\-\/*%^()]/)]],
      tags: [''],
      picture: [''],
      registered: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  getPasswordError() {
    if (this.form.get('pass').hasError('required')) {
      return 'Пароль не должен быть пустым!';
    }

    if (this.form.get('pass').hasError('minlength')) {
      return 'Пароль не должен быть меньше ' + this.minLength + ' символов';
    }
  }

  getEmailError() {
    if (this.form.get('email').hasError('required')) {
      return 'Email не должен быть пустым!';
    }
    return 'Введите корректный email';
  }

  getAgeError() {
    if (this.form.get('age').hasError('required')) {
      return 'Возраст не должен быть пустым!';
    }
    return 'Введите корректный возраст';
  }

  getNameError() {
    if (this.form.get('name').hasError('required')) {
      return 'Имя не должно быть пустым!';
    }
    return 'Имя не может содержать цифры';
  }

  getPhoneError() {
    if (this.form.get('phone').hasError('required')) {
      return 'Поле не должно быть пустым!';
    }
    return 'Введите только цифры. Номер не должен быть меньше 10 цифр';
  }

  getBalanceError() {
    if (this.form.get('balance').hasError('required')) {
      return 'Поле не должно быть пустым!';
    }
    return 'Поля не может содержать буквы';
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('picture').setValue(reader.result)
      };
    }
  }

  clearFile() {
    this.form.get('picture').setValue(null);
    this.fileInput.nativeElement.value = '';
  }


  addUser() {
    this.user = {
      name: this.form.get('name').value,
      company: this.form.get('company').value,
      email: this.form.get('email').value,
      pass: this.form.get('pass').value,
      eyeColor: this.form.get('eyeColor').value,
      age: this.form.get('age').value,
      phone: this.form.get('phone').value,
      address: this.form.get('address').value,
      genders: this.form.get('genders').value,
      about: this.form.get('about').value,
      balance: this.form.get('balance').value,
      tags: this.form.get('tags').value,
      picture: this.form.get('picture').value,
      registered: this.dateNow
    };

    this.usersService
      .addUser(this.user)
      .subscribe();

    this.activeModal.close(this.user);
  }

}
