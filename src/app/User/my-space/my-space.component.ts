import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/user.model';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Adress} from '../../../model/adress.model';


@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})
export class MySpaceComponent implements OnInit {

  user: User;
  addresses: Array<Adress>;
  addressToCreate: Adress;
  deliveryAddress: Adress
  billingAddress: Adress;
  formsUser: FormGroup;
  formsDelivery: FormGroup;
  formsBilling: FormGroup;
  formsAddress: FormGroup;

  constructor(private tokenService: TokenStorageService, private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.initProfil();
    this.initFormsDelivery();
    this.initFormsBilling();
    this.initFormsUser();
    this.initFormAdress();
  }

  isLogined() {
    return this.tokenService.getEmail() != null && this.tokenService.getEmail() != '';
  }

  private initProfil() {
    this.userService.getMyProfil().subscribe(
      data => {
        this.user = data;
        this.userPatchValue(this.user);
        this.addresses = data.adresses;
        if (this.addresses) {
          this.deliveryAddress = this.addresses.find(c => c.delivery === true);
          this.billingAddress = this.addresses.find(a => a.billing === true);
          if (this.deliveryAddress) {
            this.patchAdresseValue(this.formsDelivery,this.deliveryAddress);
          }
          if (this.billingAddress) {
            this.patchAdresseValue(this.formsBilling, this.billingAddress);
          }
        }
      });
  }

  private initFormsDelivery() {
    this.formsDelivery = this.initFormAdress();
    this.formsDelivery.disable();
  }

  private initFormsBilling() {
    this.formsBilling = this.initFormAdress();
    this.formsBilling.disable();
  }

  private initFormsUser(): void {
    this.formsUser = this.formBuilder.group(
      {
        id: [''],
        gender: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        birthday: [new FormControl()],
        email: [new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ]))],
        password: ['', [Validators.min(6), Validators.required]],
        newsletter: [''],
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

  private initFormAdress() {
    return this.formBuilder.group(
      {
        id: [''],
        gender: ['', Validators.required],
        adressName: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ])),
        digicode: [''],
        interphone: ['', Validators.required],
        floor: ['', Validators.required],
        appartNumber: [''],
        building: [''],
        number: ['', Validators.required],
        street: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        information: [''],
        delivery: [false],
        billing: [false],
      }
    );
  }

  updateUserNewsletterProfil() {
    this.formsUser.patchValue({newsletter: !this.user.newsletter});
    this.userService.updateUser(this.formsUser).subscribe(response => {
        this.initProfil();
      },
      err => {
        console.log('Error: ', err);
      });
  }

  private patchAdresseValue(form: FormGroup, address: Adress) {
    this.formsAddress = form;
    this.addressToCreate = address;
    this.formsAddress.patchValue({
      id: this.addressToCreate.id,
      gender: this.addressToCreate.gender,
      adressName: this.addressToCreate.adressName,
      lastName: this.addressToCreate.lastName,
      firstName: this.addressToCreate.firstName,
      phone: this.addressToCreate.phone,
      digicode: this.addressToCreate.digicode,
      interphone: this.addressToCreate.interphone,
      floor: this.addressToCreate.floor,
      appartNumber: this.addressToCreate.appartNumber,
      building: this.addressToCreate.building,
      number: this.addressToCreate.number,
      street: this.addressToCreate.street,
      postalCode: this.addressToCreate.postalCode,
      city: this.addressToCreate.city,
      information: this.addressToCreate.information,
      delivery: this.addressToCreate.delivery,
      billing:this.addressToCreate.billing,
    });
  }
}
