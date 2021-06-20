import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminViewProductComponent} from './Admin/admin-view-product/admin-view-product.component';
import {ProduitEditComponent} from './Produit/produit-edit/produit-edit.component';
import {LoginComponent} from './Auth/login/login.component';
import {CreateUserComponent} from './User/create-user/create-user.component';
import {AccueilComponent} from './Accueil/accueil/accueil.component';
import {TypeEditComponent} from './Type/type-edit/type-edit.component';
import {AdminViewTypesListComponent} from './Admin/admin-view-types-list/admin-view-types-list.component';
import {CategorieEditComponent} from './Categorie/categorie-edit/categorie-edit.component';
import {AdminViewCategorieListComponent} from './Admin/admin-view-categorie-list/admin-view-categorie-list.component';
import {AdresseEditComponent} from './Adresse/adresse-edit/adresse-edit.component';
import {AdminViewTagComponent} from './Admin/admin-view-tag/admin-view-tag.component';
import {TagEditComponent} from './Tags/tag-edit/tag-edit.component';
import {AdminViewLabelComponent} from './Admin/admin-view-label/admin-view-label.component';
import {LabelEditComponent} from './Label/label-edit/label-edit.component';
import {AdminViewSousCategorieListComponent} from './Admin/admin-view-sous-categorie-list/admin-view-sous-categorie-list.component';
import {SousCategorieEditComponent} from './Categorie/sous-categorie-edit/sous-categorie-edit.component';
import {ViewProductComponent} from './Produit/view-product/view-product.component';
import {ViewAllProductsComponent} from './Produit/view-all-product/view-all-products/view-all-products.component';
import {MySpaceComponent} from './User/my-space/my-space.component';
import {MyInfoComponent} from './User/my-info/my-info.component';
import {MyOrderComponent} from './User/my-order/my-order/my-order.component';
import {MyProductReturnComponent} from './User/my-product-return/my-product-return.component';
import {MyAdressComponent} from './User/my-adress/my-adress.component';
import {PanierEditComponent} from './Panier/panier-edit/panier-edit.component';


const routes: Routes = [
  { path: 'admin/products', component: AdminViewProductComponent},
  { path: 'admin/products/edit', component: ProduitEditComponent},
  { path: 'admin/products/categories/edit', component: CategorieEditComponent},
  { path: 'admin/products/categories', component: AdminViewCategorieListComponent},
  { path: 'admin/products/sous-categories', component: AdminViewSousCategorieListComponent},
  { path: 'admin/products/sous-categories/edit', component: SousCategorieEditComponent},
  { path: 'admin/products/types', component: AdminViewTypesListComponent},
  { path: 'admin/products/types/edit', component: TypeEditComponent},
  { path: 'admin/products/tags', component: AdminViewTagComponent},
  { path: 'admin/products/tags/edit', component: TagEditComponent},
  { path: 'admin/products/labels', component: AdminViewLabelComponent},
  { path: 'admin/products/label/edit', component: LabelEditComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user/adress/edit', component: AdresseEditComponent},
  { path: 'user/add', component: CreateUserComponent},
  { path: 'user/mon-espace', component: MySpaceComponent},
  { path: 'user/mon-espace/infos', component: MyInfoComponent},
  { path: 'user/mon-espace/commandes', component: MyOrderComponent},
  { path: 'user/mon-espace/retours', component: MyProductReturnComponent},
  { path: 'user/mon-espace/adresses', component: MyAdressComponent},
  { path: 'user/mon-panier', component: PanierEditComponent},
  { path: 'accueil', component: AccueilComponent},
  { path: 'product', component: ViewProductComponent},
  { path: 'products', component: ViewAllProductsComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

