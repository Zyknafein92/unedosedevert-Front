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
import { MenuComponent } from './Menu/menu/menu.component';
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
import { ModalConfirmComponent } from './Modal/modal-confirm/modal-confirm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
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
import { VariantEditComponent } from './Variant/variant-edit/variant-edit.component';
import { ReductionEditComponent } from './Reduction/reduction-edit/reduction-edit.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewProductComponent } from './Produit/view-product/view-product.component';
import { BoutonComponent } from './Utils/bouton/bouton.component';
import { PetitBoutonComponent } from './Utils/petit-bouton/petit-bouton.component';
import { SousMenuComponent } from './Menu/sous-menu/sous-menu.component';
import { CarteProduitComponent } from './Utils/carteProduit/carte-produit/carte-produit.component';
import { ViewAllProductsComponent } from './Produit/view-all-product/view-all-products/view-all-products.component';
import { TagChipsComponent } from './Utils/tag-chips/tag-chips.component';
import { MySpaceComponent } from './User/my-space/my-space.component';
import { MySpaceSelectorComponent } from './User/my-space-selector/my-space-selector.component';
import {MatRadioModule} from '@angular/material/radio';
import {SousCategorieService} from '../services/sous-categorie.service';
import {ServicePartage} from '../services/service.partage';





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
    VariantEditComponent,
    ReductionEditComponent,
    ViewProductComponent,
    BoutonComponent,
    PetitBoutonComponent,
    SousMenuComponent,
    CarteProduitComponent,
    ViewAllProductsComponent,
    TagChipsComponent,
    MySpaceComponent,
    MySpaceSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  providers: [httpInterceptorProviders, CookieService, ServicePartage],
  bootstrap: [AppComponent]
})
export class AppModule { }
