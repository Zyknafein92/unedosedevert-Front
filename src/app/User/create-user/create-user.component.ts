import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user.model';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  forms: FormGroup;
  user: User;
  private messageError: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.forms = this.formBuilder.group(
      {
        nom: new FormControl(),
        firstName: new FormControl(),
        birthday: new FormControl(),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ])),
        telephone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])),
        password: new FormControl(),
      });
  }

  saveUser(): void {
    console.log(this.forms.value);
    this.userService.createUser(this.forms)
      .subscribe(
        response => {
          console.log('response: ', response);
        },
        err => {
          console.log('Error: ', err.error.message);
          this.messageError = err.error.message;
        });

    this.router.navigate(['/login']);
  }
}

