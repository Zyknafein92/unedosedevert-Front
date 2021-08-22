import {AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user.model';


@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInfoComponent implements OnInit, AfterViewInit {

  user: User;
  formsUser: FormGroup;
  formsPassword: FormGroup
  hide = true;
  checked = false;
  editMode = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cdRef:ChangeDetectorRef ) { }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    this.initProfil();
    this.initFormsUser();
    this.initFormsPassword();
    this.formsUser.disable();
  }


  private initProfil() {
    this.userService.getMyProfil().subscribe(
      data => {
        this.user = data;
        if(this.user != null) {
          this.userPatchValue(this.user);
        }
      });

  }

  private initFormsUser(): void {
    this.formsUser = this.formBuilder.group(
      {
        id: ['', Validators.required],
        gender: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        birthday: new FormControl(),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ])),
        password: ['', [Validators.min(6), Validators.required]],
      });
  }

  private userPatchValue(user: User) {
    return this.formsUser.patchValue({
      id: user.id,
      gender: user.gender,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      newsletter: user.newsletter,
    });
  }

  updateUserDetails(form: FormGroup) {
    this.userService.updateUser(this.formsUser).subscribe(res => {
      this.initProfil();
      this.formsUser.disable();
      this.editMode = false;
    });
  }

  updateUserPassword(form: FormGroup) {
    let password = this.formsPassword.getRawValue().password;
    console.log('password', this.formsPassword)
    this.formsUser.patchValue({ password: password });
    console.log(this.formsUser)
    this.userService.updateUser(this.formsUser).subscribe(res => {
      console.log(res)
      this.initProfil();
      this.formsPassword.disable();
      this.editMode = false;
    });
  }

  private initFormsPassword(): void {
    this.formsPassword = this.formBuilder.group(
      {
        password: ['', [Validators.minLength(6), Validators.required]],
        password2: ['', [Validators.minLength(6), Validators.required]],
      },
      {validators: passwordMatchValidator}
    );
  }

  enableEdit(form: FormGroup): void {
    this.editMode = !this.editMode;
    if (this.editMode) this.formsUser.enable();
    if (this.editMode) this.formsPassword.enable();
    if (!this.editMode) this.formsUser.disable();
    if (!this.editMode) this.formsPassword.disable();
  }

  /* Password Check */

  get password() { return this.formsPassword.get('password'); }
  get password2() { return this.formsPassword.get('password2'); }

  onPasswordInput() {
    if (this.formsPassword.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return {passwordMismatch: true};
};

