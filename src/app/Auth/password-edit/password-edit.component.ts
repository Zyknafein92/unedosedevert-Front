import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {passwordMatchValidator} from '../login/login.component';
import {User} from '../../../model/user.model';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  formsUser: FormGroup;
  user: User;
  token: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.token = param['token'];
      console.log('toke: ', this.token)
      this.initFormsUser();
      this.initUser(this.token);
    });
  }

  private initFormsUser() {

    // appel api pour valider token
    // si OK => show formulaire
    // sinon => show erreur token non valid

    this.formsUser = this.formBuilder.group(
      {
        password: ['', [Validators.minLength(6), Validators.required]],
        password2: (['', [Validators.minLength(6), Validators.required]])
      },
      {validators: [passwordMatchValidator]});
  }

  private initUser(token: string) {
    this.userService.getUserByToken(this.token).subscribe( data => {
      console.log(data);
     this.user = data;
   });
  }

  onSubmitPassword() {
    this.userService.updateUserPassword(this.user.id, this.formsUser.get('password').value).subscribe( next => {
      this.router.navigate(['/login']);
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  /* Password Check */

  get password() { return this.formsUser.get('password'); }
  get password2() { return this.formsUser.get('password2'); }

  onPasswordInput() {
    if (this.formsUser.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }
}
