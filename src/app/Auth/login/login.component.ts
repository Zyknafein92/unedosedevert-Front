import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../../../services/security/login-info';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators,} from '@angular/forms';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms: FormGroup;
  formsUser: FormGroup;
  passwordsMatch = false;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles = '[]';
  private loginInfo: AuthLoginInfo;



  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initToken();
    this.initFormsUser();
    this.initForms();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate(['/']);
    }
  }

  private initToken() {
   this.tokenStorage.getToken();
  }

  private initForms(): void {
    this.forms = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private initFormsUser(): void {
    this.formsUser = this.formBuilder.group(
      {
        gender: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        birthday: new FormControl(),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ])),
        email2: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ])),
        password: ['', [Validators.minLength(6), Validators.required]],
        password2: (['', [Validators.minLength(6), Validators.required]])
      },
      {validators: [emailMatchValidator , passwordMatchValidator]});
  }

  onSubmitLogin(): void {
    console.log(this.forms);

    this.loginInfo = new AuthLoginInfo(
      this.forms.getRawValue().email,
      this.forms.getRawValue().password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      response => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveEmail(response.email);
        this.tokenStorage.saveAuthorities(response.authorities || []);
        console.log(response.email);
        console.log(response.accessToken + ' ' + response.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/user/mon-espace']);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  onSubmitCreerCompte(): void {
    if (this.formsUser.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    if (this.formsUser.valid) {
      delete this.formsUser.getRawValue().email2;
      delete this.formsUser.getRawValue().password2;
      this.userService.createUser(this.formsUser)
        .subscribe(
          response => {

            this.loginInfo = new AuthLoginInfo(
              this.formsUser.getRawValue().email,
              this.formsUser.getRawValue().password
            );

           this.authService.attemptAuth(this.loginInfo).subscribe(
             response => {
               this.tokenStorage.saveToken(response.accessToken);
               this.tokenStorage.saveEmail(response.email);
               this.tokenStorage.saveAuthorities(response.authorities || []);
               this.isLoginFailed = false;
               this.isLoggedIn = true;
               this.roles = this.tokenStorage.getAuthorities();
               this.router.navigate(['/user/mon-espace']);
             }
           )
          },
          err => {
            console.log('Error: ', err.error.message);
            this.isLoginFailed = true;
          });
    }
  }

  /* Email Check */

  get email() { return this.formsUser.get('email'); }
  get email2() { return this.formsUser.get('email2'); }

  onEmailInput() {
    if (this.formsUser.hasError('emailMismatch'))
      this.email2.setErrors([{'emailMismatch': true}]);
    else
      this.email2.setErrors(null);
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

  forgetPassword() {
    this.router.navigate(['/password-recovery']);
  }
}

export const emailMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('email') && formGroup.get('email').value === formGroup.get('email2').value)
    return null;
  else
    return {emailMismatch: true};
};

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return {passwordMismatch: true};
};
