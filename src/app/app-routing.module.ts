import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"seller",component:SellerAuthComponent},
  {path:"seller-home",component:SellerHomeComponent,canActivate:[authGuard]},
  {path:"selleraddproduct",component:SellerAddProductComponent,canActivate:[authGuard]},
  {path:"seller-update-product/:id",component:SellerUpdateProductComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
