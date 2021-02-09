import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminViewProductComponent} from './Admin/admin-view-product/admin-view-product.component';
import {ProduitEditComponent} from './Produit/produit-edit/produit-edit.component';
import {ProductViewComponent} from './Produit/view-product/product-view.component';
import {ViewProductsListComponent} from './Produit/view-products-list/view-products-list.component';
import {ViewProductListTypeComponent} from './Produit/view-products-list-type/view-product-list-type.component';
import {LoginComponent} from './Auth/login/login.component';
import {CreateUserComponent} from './User/create-user/create-user.component';
import {AccueilComponent} from './Accueil/accueil/accueil.component';
import {TypeEditComponent} from './Type/type-edit/type-edit.component';
import {AdminViewTypesListComponent} from './Admin/admin-view-types-list/admin-view-types-list.component';
import {CategorieEditComponent} from './Categorie/categorie-edit/categorie-edit.component';
import {AdminViewCategorieListComponent} from './Admin/admin-view-categorie-list/admin-view-categorie-list.component';
import {MyProfilComponent} from './User/my-profil/my-profil.component';
import {AdresseEditComponent} from './Adresse/adresse-edit/adresse-edit.component';
import {AdminViewTagComponent} from './Admin/admin-view-tag/admin-view-tag.component';
import {TagEditComponent} from './Tags/tag-edit/tag-edit.component';
import {AdminViewTagCategorieComponent} from './Admin/admin-view-tag-categorie/admin-view-tag-categorie.component';
import {TagsCategorieEditComponent} from './Tags/tags-categorie-edit/tags-categorie-edit.component';


const routes: Routes = [
  { path: 'admin/products', component: AdminViewProductComponent},
  { path: 'admin/products/edit', component: ProduitEditComponent},
  { path: 'admin/products/categories/edit', component: CategorieEditComponent},
  { path: 'admin/products/categories', component: AdminViewCategorieListComponent},
  { path: 'admin/products/types', component: AdminViewTypesListComponent},
  { path: 'admin/products/types/edit', component: TypeEditComponent},
  { path: 'admin/products/tags', component: AdminViewTagComponent},
  { path: 'admin/products/tags/edit', component: TagEditComponent},
  { path: 'admin/products/tagCategories', component: AdminViewTagCategorieComponent},
  { path: 'admin/products/tagCategorie/edit', component: TagsCategorieEditComponent},
  { path: 'products', component: ViewProductsListComponent},
  { path: 'products/categorie', component: ViewProductListTypeComponent},
  { path: 'product', component: ProductViewComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user/myprofil', component: MyProfilComponent},
  { path: 'user/adress/edit', component: AdresseEditComponent},
  { path: 'user/add', component: CreateUserComponent},
  { path: 'accueil', component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

