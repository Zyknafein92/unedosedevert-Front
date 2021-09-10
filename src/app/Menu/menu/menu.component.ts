import {Component, OnInit} from '@angular/core';
import {Type} from '../../../model/type.model';
import {TypeService} from '../../../services/type.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dataQuery: string;
  type: Type;
  typeToDisplay: Type;
  types: Array<Type>;
  forms: FormGroup;

  constructor(private typeService: TypeService,  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initTypes();
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe( data => {
      this.types = data;
      console.log('dataType', this.types)
    });
  }

  onSubmit(dataQuery: string): void {
    const typeSearch = 'query';
    this.router.navigate(['/products'], {queryParams: {typeSearch  , value : dataQuery}})
      .then(() => {
     setTimeout(() => this.dataQuery = '', 1000)
   });
   }

  keyPressHandler(event): void {
    if(event.charCode === 13) {
      this.onSubmit(this.dataQuery);
    }
  }

  openMenu(type: Type): void {
    if (type === this.typeToDisplay && this.typeToDisplay != null) {
      this.typeToDisplay = null;
    } else {
      this.typeToDisplay = type;
    }
  }

  closeMenu() {
    this.typeToDisplay = null;
  }
}
