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
import { AdminViewProductComponent } from './Admin/admin-view-product/admin-view-product.component';
import { MenuComponent } from './Menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './Auth/login/login.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import {httpInterceptorProviders} from '../services/security/auth-interceptor.service';
import {CommonModule} from '@angular/common';
import { CategorieEditComponent } from './Categorie/categorie-edit/categorie-edit.component';
import { TypeEditComponent } from './Type/type-edit/type-edit.component';
import { AdminViewTypesListComponent } from './Admin/admin-view-types-list/admin-view-types-list.component';
import { AdminViewCategorieListComponent } from './Admin/admin-view-categorie-list/admin-view-categorie-list.component';
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
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {CookieService} from 'ngx-cookie-service';
import { HeaderComponent } from './Header/header/header.component';
import { TagEditComponent } from './Tags/tag-edit/tag-edit.component';
import { LabelEditComponent } from './Label/label-edit/label-edit.component';
import { AdminViewTagComponent } from './Admin/admin-view-tag/admin-view-tag.component';
import { FooterComponent } from './Footer/footer.component';
import {AdminViewLabelComponent} from './Admin/admin-view-label/admin-view-label.component';
import { AdminViewSousCategorieListComponent } from './Admin/admin-view-sous-categorie-list/admin-view-sous-categorie-list.component';
import { SousCategorieEditComponent } from './Categorie/sous-categorie-edit/sous-categorie-edit.component';
import { AdminViewVariantComponent } from './Admin/admin-view-variant/admin-view-variant.component';
import { AdminViewReductionComponent } from './Admin/admin-view-reduction/admin-view-reduction.component';
import { VariantEditComponent } from './Variant/variant-edit/variant-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProduitEditComponent,
    AdresseEditComponent,
    CommandeEditComponent,
    PanierEditComponent,
    AdminViewProductComponent,
    MenuComponent,
    LoginComponent,
    CreateUserComponent,
    AccueilComponent,
    CategorieEditComponent,
    TypeEditComponent,
    AdminViewTypesListComponent,
    AdminViewCategorieListComponent,
    MyProfilComponent,
    MyCommandComponent,
    ModalConfirmComponent,
    HeaderComponent,
    TagEditComponent,
    LabelEditComponent,
    AdminViewTagComponent,
    FooterComponent,
    AdminViewLabelComponent,
    AdminViewSousCategorieListComponent,
    SousCategorieEditComponent,
    AdminViewVariantComponent,
    AdminViewReductionComponent,
    VariantEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
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
    MatSortModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [httpInterceptorProviders, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
