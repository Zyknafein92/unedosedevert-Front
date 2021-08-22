import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  formsUser: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initForms();
  }

  onSubmit() {
    this.userService.forgetPassword(this.formsUser).subscribe();
    this.router.navigate(['/']);
  }

  private initForms() {
    this.formsUser = this.formBuilder.group({email: ['', [Validators.email, Validators.required]]});
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
