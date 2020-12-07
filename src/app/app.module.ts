import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProduitEditComponent } from './Produit/produit-edit/produit-edit.component';
import { AdresseEditComponent } from './Adresse/adresse-edit/adresse-edit.component';
import { CommandeEditComponent } from './Commande/commande-edit/commande-edit.component';
import { PanierEditComponent } from './Panier/panier-edit/panier-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminViewProductComponent } from './Produit/admin-view-product/admin-view-product.component';
import { MenuComponent } from './Menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProductViewComponent } from './Produit/view-product/product-view.component';
import { ViewProductsListComponent } from './Produit/view-products-list/view-products-list.component';
import { LoginComponent } from './Auth/login/login.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import {httpInterceptorProviders} from '../services/security/auth-interceptor.service';
import { CategorieViewProduitComponent } from './Produit/categorie-view-produit/categorie-view-produit.component';
import {CommonModule} from '@angular/common';
import {ViewProductListTypeComponent} from './Produit/view-products-list-type/view-product-list-type.component';
import { CategorieEditComponent } from './Categorie/categorie-edit/categorie-edit.component';
import { TypeEditComponent } from './Type/type-edit/type-edit.component';
import { AdminViewTypesListComponent } from './Type/admin-view-types-list/admin-view-types-list.component';
import { AdminViewCategorieListComponent } from './Categorie/admin-view-categorie-list/admin-view-categorie-list.component';
import { MyProfilComponent } from './User/my-profil/my-profil.component';
import { MyCommandComponent } from './User/my-command/my-command.component';
import { ModalConfirmComponent } from './Modal/modal-confirm/modal-confirm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    ProduitEditComponent,
    AdresseEditComponent,
    CommandeEditComponent,
    PanierEditComponent,
    AdminViewProductComponent,
    MenuComponent,
    ProductViewComponent,
    ViewProductsListComponent,
    ViewProductListTypeComponent,
    LoginComponent,
    CreateUserComponent,
    AccueilComponent,
    CategorieViewProduitComponent,
    CategorieEditComponent,
    TypeEditComponent,
    AdminViewTypesListComponent,
    AdminViewCategorieListComponent,
    MyProfilComponent,
    MyCommandComponent,
    ModalConfirmComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
