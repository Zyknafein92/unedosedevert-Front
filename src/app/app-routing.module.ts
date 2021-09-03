import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminViewProductComponent} from './Admin/admin-view-product/admin-view-product.component';
import {ProductEditComponent} from './Produit/produit-edit/product-edit.component';
import {LoginComponent} from './Auth/login/login.component';
import {CreateUserComponent} from './User/create-user/create-user.component';
import {HomeComponent} from './Accueil/accueil/home.component';
import {TypeEditComponent} from './Type/type-edit/type-edit.component';
import {AdminViewTypesListComponent} from './Admin/admin-view-types-list/admin-view-types-list.component';
import {CategorieEditComponent} from './Categorie/categorie-edit/categorie-edit.component';
import {AdminViewCategorieListComponent} from './Admin/admin-view-categorie-list/admin-view-categorie-list.component';
import {AdminViewTagComponent} from './Admin/admin-view-tag/admin-view-tag.component';
import {TagEditComponent} from './Tags/tag-edit/tag-edit.component';
import {AdminViewLabelComponent} from './Admin/admin-view-label/admin-view-label.component';
import {LabelEditComponent} from './Label/label-edit/label-edit.component';
import {AdminViewSubCategorieListComponent} from './Admin/admin-view-sous-categorie-list/admin-view-sous-categorie-list.component';
import {SubCategorieEditComponent} from './Categorie/sous-categorie-edit/sub-categorie-edit.component';
import {ViewProductComponent} from './Produit/view-product/view-product.component';
import {ViewAllProductsComponent} from './Produit/view-all-product/view-all-products/view-all-products.component';
import {MySpaceComponent} from './User/my-space/my-space.component';
import {MyInfoComponent} from './User/my-info/my-info.component';
import {MyOrderComponent} from './User/my-order/my-order/my-order.component';
import {MyAdressComponent} from './User/my-adress/my-adress.component';
import {CommandeStepperComponent} from './Commande/commande-stepper/commande-stepper.component';
import {DeliveryEditComponent} from './Commande/delivery-edit/delivery-edit.component';
import {PasswordRecoveryComponent} from './Auth/password-recovery/password-recovery.component';
import {PasswordEditComponent} from './Auth/password-edit/password-edit.component';
import {SuccessPaymentComponent} from './Commande/success-payement/success-payment.component';
import {FailurePaymentComponent} from './Commande/failure-payment/failure-payment.component';
import {AdminViewOrderComponent} from './Admin/admin-view-order/admin-view-order.component';
import {AdminOrderEditComponent} from './Admin/admin-order-edit/admin-order-edit.component';
import {AuthGuardService} from '../services/security/auth-guard.service';


const routes: Routes = [
  { path: 'admin/products', component: AdminViewProductComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/edit', component: ProductEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/categories/edit', component: CategorieEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/categories', component: AdminViewCategorieListComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/sous-categories', component: AdminViewSubCategorieListComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/sous-categories/edit', component: SubCategorieEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/types', component: AdminViewTypesListComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/types/edit', component: TypeEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/tags', component: AdminViewTagComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/tags/edit', component: TagEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/labels', component: AdminViewLabelComponent, canActivate: [AuthGuardService]},
  { path: 'admin/products/label/edit', component: LabelEditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/orders', component: AdminViewOrderComponent, canActivate: [AuthGuardService]},
  { path: 'admin/order/edit', component: AdminOrderEditComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'password-recovery', component: PasswordRecoveryComponent},
  { path: 'forgot-password', component: PasswordEditComponent},
  { path: 'user/add', component: CreateUserComponent},
  { path: 'user/mon-espace', component: MySpaceComponent},
  { path: 'user/mon-espace/infos', component: MyInfoComponent},
  { path: 'user/mon-espace/commandes', component: MyOrderComponent},
  { path: 'user/mon-espace/adresses', component: MyAdressComponent},
  { path: 'user/mon-panier', component: CommandeStepperComponent},
  { path: 'user/delivery-edit', component: DeliveryEditComponent},
  { path: 'api/order/payment/success', component: SuccessPaymentComponent},
  { path: 'api/order/payment/failure', component: FailurePaymentComponent},
  { path: 'accueil', component: HomeComponent},
  { path: 'product', component: ViewProductComponent},
  { path: 'products', component: ViewAllProductsComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

