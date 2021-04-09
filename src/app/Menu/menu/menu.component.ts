import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Type} from '../../../model/type.model';
import {TypeService} from '../../../services/type.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  authorities: string;
  tokenEmail: string;

  type: Type;
  typeToDisplay: Type;
  types: Array<Type>;
  forms: FormGroup;

  constructor(private typeService: TypeService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initTypes();
    this.initForms();
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe( data => {
      this.types = data;
    });
  }

  private initForms(): void {
   this.forms = this.formBuilder.group({
      search: '',
    });
  }

  onSubmit(forms: FormGroup): void {
    console.log(this.forms);
  }

  openMenu(type: Type): void {
    this.typeToDisplay = type;
    console.log(this.typeToDisplay);
  }
}
