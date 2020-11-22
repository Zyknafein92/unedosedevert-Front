import { Component, OnInit } from '@angular/core';
import {Type} from '../../../model/type.model';
import {Router} from '@angular/router';
import {TypeService} from '../../../services/type.service';

@Component({
  selector: 'app-admin-view-types-list',
  templateUrl: './admin-view-types-list.component.html',
  styleUrls: ['./admin-view-types-list.component.css']
})
export class AdminViewTypesListComponent implements OnInit {

  type: Type;
  types: Array<Type>;

  constructor(private router: Router, private typeService: TypeService) { }

  ngOnInit(): void {
    this.initTypes();
  }

  private initTypes(): void {
    this.typeService.getTypes().subscribe(data => {
        this.types = data;
        console.log('data : ', data);
      },
      err => {
        console.log('error: ', err.error.message);
      });
  }

  creerType(): void {
    this.router.navigate(['admin/products/types/edit']);
  }

  modifierType(id: number): void {
    this.router.navigate(['admin/products/types/edit'], {queryParams: {id}});
  }

  supprimerType(id: number): void {
    this.typeService.deleteType(id).subscribe( next => this.initTypes()); }


}
