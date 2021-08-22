import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdressService} from '../../../services/adress.service';
import {Adress} from '../../../model/adress.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-my-adress',
  templateUrl: './my-adress.component.html',
  styleUrls: ['./my-adress.component.css']
})
export class MyAdressComponent implements OnInit {

  adresses: Array<Adress>;
  adresseToCreate : Adress;
  deliveryAdress: Adress;
  deliveryAdressEdit = false;
  billingAdress: Adress;
  billingAdressEdit = false;
  formsDelivery: FormGroup;
  formsBilling: FormGroup;
  formsNewAdress: FormGroup;
  formsAdresse: FormGroup;
  addAdress = false;
  checked = false;

  formgroups = {};

  constructor(private formBuilder: FormBuilder, private adresseService: AdressService, private userService: UserService) { }

  ngOnInit(): void {
    this.initListAdresses();
    this.initFormsLivraison();
    this.initFormsFacturation();
    this.initFormsNewAdress();
    this.initFormsAdress();
    this.formsDelivery.disable();
    this.formsBilling.disable();
    console.log(this.formgroups)
  }

  private initListAdresses() {
    this.userService.getMyProfil().subscribe( data => {
      data.adresses.forEach(add => {
        this.formgroups[add.id] = this.initForm();
        this.patchValue(this.formgroups[add.id],add);
        this.formgroups[add.id].disable();
      })

      this.adresses = data.adresses;

      if (this.adresses) {
        this.deliveryAdress = this.adresses.find( c => c.delivery === true);
        this.billingAdress = this.adresses.find( a => a.billing === true);
        if (this.deliveryAdress) this.patchValue(this.formsDelivery,this.deliveryAdress);
        if (this.billingAdress) this.patchValue(this.formsBilling, this.billingAdress);
      }
    });
  }

  private initForm() {
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

  private initFormsLivraison(): void {
    this.formsDelivery = this.initForm();
  }

  private initFormsFacturation(): void {
    this.formsBilling = this.initForm();
  }

  private initFormsNewAdress() {
    this.formsNewAdress = this.initForm();
  }

  private initFormsAdress() {
    this.formsAdresse = this.initForm();
  }

  private patchValue(form: FormGroup, add: Adress) {
    this.formsAdresse = form;
    this.adresseToCreate = add;
    this.formsAdresse.patchValue({
      id: this.adresseToCreate.id,
      gender: this.adresseToCreate.gender,
      adressName: this.adresseToCreate.adressName,
      lastName: this.adresseToCreate.lastName,
      firstName: this.adresseToCreate.firstName,
      phone: this.adresseToCreate.phone,
      digicode: this.adresseToCreate.digicode,
      interphone: this.adresseToCreate.interphone,
      floor: this.adresseToCreate.floor,
      appartNumber: this.adresseToCreate.appartNumber,
      building: this.adresseToCreate.building,
      number: this.adresseToCreate.number,
      street: this.adresseToCreate.street,
      postalCode: this.adresseToCreate.postalCode,
      city: this.adresseToCreate.city,
      information: this.adresseToCreate.information,
      delivery: this.adresseToCreate.delivery,
      billing:this.adresseToCreate.billing,
    });
  }

  enableForm(forms: FormGroup) {
    if (forms == this.formsDelivery) {
      this.formsDelivery.enable();
      this.deliveryAdressEdit = true;
    }
    if ( forms == this.formsBilling) {
      this.formsBilling.enable();
      this.billingAdressEdit = true;
    }
    if ( forms == this.formgroups[forms.getRawValue().id]) {
      this.formgroups[forms.getRawValue().id].enable();
    }
  }

  disableForm(forms: FormGroup) {
    if (forms == this.formsDelivery) {
      this.formsDelivery.disable();
      this.deliveryAdressEdit = false;
    }
    if (forms == this.formsBilling) {
      this.formsBilling.disable();
      this.billingAdressEdit = false;
    }
    if ( forms == this.formgroups[forms.getRawValue().id]) {
      this.formgroups[forms.getRawValue().id].disable();
    }
  }

  cancelFormNewAdress() {
    this.formsNewAdress = this.initForm();
    this.addAdress = false;
  }

  submitNewAdress() {
    this.adresseService.createAdresse(this.formsNewAdress).subscribe(response => {
      this.addAdress = false;
      this.initFormsNewAdress();
      this.initListAdresses();
    })
  }

  deleteAdress(id: number) {
    this.adresseService.deleteAdresse(id).subscribe( reponse => {
      this.initListAdresses();
    });
  }


  updateFormDelivery() {
    this.adresseService.updateAdresse(this.formsDelivery).subscribe(response => {
      this.initListAdresses();
      this.deliveryAdressEdit = false;
      this.formsDelivery.disable();
    });
  }

  updateAdresse(forms: FormGroup) {
    this.adresseService.updateAdresse(this.formgroups[forms.getRawValue().id]).subscribe(response => {
      this.initListAdresses();
      this.formgroups[forms.getRawValue().id].disable();
    });
  }
}
