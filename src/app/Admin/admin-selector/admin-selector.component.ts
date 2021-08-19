import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-selector',
  templateUrl: './admin-selector.component.html',
  styleUrls: ['./admin-selector.component.css']
})
export class AdminSelectorComponent implements OnInit {
  actives = {
    commandes: '',
    produits: '',
    types: '',
    categories: '',
    subcategories: '',
    labels: '',
    tags: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initActives();
  }

  private initActives() {
    if ( this.router.url.toString() === '/admin/orders' ) {
      this.actives.commandes = 'active';
    }
    else if ( this.router.url.toString() === '/admin/products' ) {
      this.actives.produits = 'active';
    }
    else if ( this.router.url.toString() === '/admin/products/types' ) {
      this.actives.types = 'active';
    }
    else if ( this.router.url.toString() === '/admin/products/categories' ) {
      this.actives.categories = 'active';
    }
    else if ( this.router.url.toString() === '/admin/products/sous-categories' ) {
      this.actives.subcategories = 'active';
    }
    else if ( this.router.url.toString() === '/admin/products/labels' ) {
      this.actives.labels = 'active';
    }  else if ( this.router.url.toString() === '/admin/products/tags' ) {
      this.actives.tags = 'active';
    } else {
      this.actives.produits = '';
      this.actives.types = '';
      this.actives.categories = '';
      this.actives.subcategories = '';
      this.actives.labels = '';
      this.actives.tags = '';
    }
  }

  routeOrders() {
  this.router.navigate(['/admin/orders']);
  }

  routeProducts() {
  this.router.navigate(['/admin/products']);
  }

  routeTypes() {
  this.router.navigate(['/admin/products/types']);
  }

  routeCategories() {
  this.router.navigate(['/admin/products/categories']);
  }

  routeSCCategories() {
  this.router.navigate(['/admin/products/sous-categories']);
  }

  routeLabels() {
  this.router.navigate(['/admin/products/labels']);
  }

  routeTags() {
  this.router.navigate(['/admin/products/tags']);
  }

}
