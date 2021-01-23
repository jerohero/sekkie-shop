import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ItemEditComponent } from './shop/item-edit/item-edit.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { LoginComponent } from './login/login.component';
import {AccountComponent} from './account/account.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {OrderPageComponent} from './shopping-list/order-page/order-page.component';
import {ShippingPageComponent} from './shopping-list/order-page/shipping-page/shipping-page.component';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './shared/guard/admin.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent, children: [
    { path: 'new', component: ItemEditComponent },
    { path: ':id/edit', component: ItemEditComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'order', component: OrderPageComponent },
  { path: 'shipping', component: ShippingPageComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '404', component: UnknownPageComponent },
  { path: ':id', component: ItemDetailsComponent },
  { path: '**', redirectTo: '/shop' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
