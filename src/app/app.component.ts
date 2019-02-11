import {Component, ElementRef, ViewChild} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';

import {User} from './user';
import {UsersService} from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public show:boolean = false;
  public buttonName:any = 'Добавить пользователя';
  public users:User[] = [];
  public user:User;
  public minLength = 5;

  dateNow:Date = new Date();

  @ViewChild('fileInput') fileInput:ElementRef;

  public form = this.fb.group({
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

  constructor(private usersService:UsersService,
              private fb:FormBuilder) {
  }

  get f() {
    return this.form.controls;
  }

  loadUsers() {
    this.usersService
      .getUsers()
      .subscribe((users:User[]) => {
        this.users = users;
      });
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
      .subscribe((user:User) => {
        this.users.push(user);
      });

    this.form.reset({eyeColor: 'brown', genders: 'male'});
    this.show = !this.show;
  }


  deleteUser(user:User) {
    this.usersService.deleteUser(user)
      .subscribe(() => {
        this.users = this.users.filter(u => u._id !== user._id);
      });
  }

  toggle() {
    this.show = !this.show;
  }
}
