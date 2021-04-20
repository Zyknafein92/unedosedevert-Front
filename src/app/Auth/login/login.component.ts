import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../../../services/security/login-info';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms: FormGroup;
  formsUser: FormGroup;
  password: string;
  password2: string;
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
    this.initFormsUser();
    this.initForms();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate(['/']);
    }
  }

  private initForms(): void {
    this.forms = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.min(6), Validators.required]],
    });
  }

  private initFormsUser(): void {
    this.formsUser = this.formBuilder.group(
      {
        genre: ['', Validators.required],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        anniversaire: new FormControl(),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ])),
        telephone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])),
        password: ['', [Validators.min(6), Validators.required]],
      });
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
        this.tokenStorage.saveAuthorities(response.authorities);
        console.log(response.email);
        console.log(response.accessToken + ' ' + response.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        window.location.reload();
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    // this.router.navigate(['/']);
  }

  verifierPassword(): boolean {
    return this.passwordsMatch = this.password === this.password2;
  }

  onSubmitCreerCompte(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    this.userService.createUser(this.forms)
      .subscribe(
        response => {
          console.log('response: ', response);
        },
        err => {
          console.log('Error: ', err.error.message);
        });
  }
}
