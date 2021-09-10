import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductEditComponent } from './Product/produit-edit/product-edit.component';
import { ShoppingCartEditComponent } from './Shopping-Cart/shopping-cart-edit/shopping-cart-edit.component';
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
import { HomeComponent } from './Home/home.component';
import {httpInterceptorProviders} from '../services/security/auth-interceptor.service';
import {CommonModule} from '@angular/common';
import { CategorieEditComponent } from './Categorie/categorie-edit/categorie-edit.component';
import { TypeEditComponent } from './Type/type-edit/type-edit.component';
import { AdminViewTypesListComponent } from './Admin/admin-view-types-list/admin-view-types-list.component';
import { AdminViewCategorieListComponent } from './Admin/admin-view-categorie-list/admin-view-categorie-list.component';
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
import { AdminViewSubCategorieListComponent } from './Admin/admin-view-sous-categorie-list/admin-view-sous-categorie-list.component';
import { SubCategorieEditComponent } from './Categorie/sub-categorie-edit/sub-categorie-edit.component';
import { AdminViewVariantComponent } from './Admin/admin-view-variant/admin-view-variant.component';
import { VariantEditComponent } from './Variant/variant-edit/variant-edit.component';
import { ReductionEditComponent } from './Reduction/reduction-edit/reduction-edit.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewProductComponent } from './Product/view-product/view-product.component';
import { BoutonComponent } from './Utils/bouton/bouton.component';
import { PetitBoutonComponent } from './Utils/petit-bouton/petit-bouton.component';
import { SubMenuComponent } from './Menu/sub-menu/sub-menu.component';
import { CarteProduitComponent } from './Utils/carteProduit/carte-produit/carte-produit.component';
import { ViewAllProductsComponent } from './Product/view-all-product/view-all-products/view-all-products.component';
import { TagChipsComponent } from './Utils/tag-chips/tag-chips.component';
import { MySpaceComponent } from './User/my-space/my-space.component';
import { MySpaceSelectorComponent } from './User/my-space-selector/my-space-selector.component';
import {MatRadioModule} from '@angular/material/radio';
import {ServicePartage} from '../services/service.partage';
import { MyOrderComponent } from './User/my-order/my-order/my-order.component';
import { MyAdressComponent } from './User/my-adress/my-adress.component';
import { MyInfoComponent } from './User/my-info/my-info.component';
import {GlobalHandlerErrorModule} from '../services/global-hanler-error/global-hanler-error.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommandeStepperComponent } from './Commande/commande-stepper/commande-stepper.component';
import { DeliveryEditComponent } from './Commande/delivery-edit/delivery-edit.component';
import { PasswordRecoveryComponent } from './Auth/password-recovery/password-recovery.component';
import { PasswordEditComponent } from './Auth/password-edit/password-edit.component';
import { AdminSelectorComponent } from './Admin/admin-selector/admin-selector.component';
import { SuccessPaymentComponent } from './Commande/success-payement/success-payment.component';
import { FailurePaymentComponent } from './Commande/failure-payment/failure-payment.component';
import {NgxStripeModule} from 'ngx-stripe';
import { ViewOrderComponent } from './Commande/view-order/view-order.component';
import { AdminViewOrderComponent } from './Admin/admin-view-order/admin-view-order.component';
import { AdminOrderEditComponent } from './Admin/admin-order-edit/admin-order-edit.component';
import {ToastrModule} from 'ngx-toastr';
import {AuthGuardService} from '../services/security/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductEditComponent,
    ShoppingCartEditComponent,
    AdminViewProductComponent,
    MenuComponent,
    LoginComponent,
    CreateUserComponent,
    HomeComponent,
    CategorieEditComponent,
    TypeEditComponent,
    AdminViewTypesListComponent,
    AdminViewCategorieListComponent,
    HeaderComponent,
    TagEditComponent,
    LabelEditComponent,
    AdminViewTagComponent,
    FooterComponent,
    AdminViewLabelComponent,
    AdminViewSubCategorieListComponent,
    SubCategorieEditComponent,
    AdminViewVariantComponent,
    VariantEditComponent,
    ReductionEditComponent,
    ViewProductComponent,
    BoutonComponent,
    PetitBoutonComponent,
    SubMenuComponent,
    CarteProduitComponent,
    ViewAllProductsComponent,
    TagChipsComponent,
    MySpaceComponent,
    MySpaceSelectorComponent,
    MyOrderComponent,
    MyAdressComponent,
    MyInfoComponent,
    CommandeStepperComponent,
    DeliveryEditComponent,
    PasswordRecoveryComponent,
    PasswordEditComponent,
    AdminSelectorComponent,
    SuccessPaymentComponent,
    FailurePaymentComponent,
    ViewOrderComponent,
    AdminViewOrderComponent,
    AdminOrderEditComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-center-center'
    }),
    NgxStripeModule.forRoot("pk_test_51JCoGrIvqpPoFOLavdVV4XNOJP3bFiGytP3KicrQIdbVGTT1OK4ociumnWnYu9ppkY4zp1Q09F9ckJCWQDvzlu7t00xRxLC4fj"),
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
    GlobalHandlerErrorModule,
    FontAwesomeModule
  ],
  providers: [httpInterceptorProviders, CookieService, ServicePartage, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
