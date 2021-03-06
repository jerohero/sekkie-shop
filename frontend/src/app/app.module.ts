import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { ItemListItemComponent } from './shop/item-list/item-list-item/item-list-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingCartItemComponent } from './shopping-list/shopping-cart-item/shopping-cart-item.component';
import { ItemDetailsComponent } from './shop/item-list/item-list-item/item-details/item-details.component';
import { ItemListComponent } from './shop/item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shop/sidebar/sidebar.component';
import { SearchComponent } from './shop/sidebar/search/search.component';
import { AccountComponent } from './account/account.component';
import {RolePipe} from './shared/pipes/role.pipe';
import { OrderPageComponent } from './shopping-list/order-page/order-page.component';
import { AccountOrdersComponent } from './account/account-orders/account-orders.component';
import { ShippingPageComponent } from './shopping-list/order-page/shipping-page/shipping-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {StatusPipe} from './shared/pipes/status.pipe';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    ItemListComponent,
    ItemListItemComponent,
    ShoppingListComponent,
    ItemDetailsComponent,
    ShoppingCartItemComponent,
    LoginComponent,
    SidebarComponent,
    SearchComponent,
    AccountComponent,
    RolePipe,
    StatusPipe,
    OrderPageComponent,
    AccountOrdersComponent,
    ShippingPageComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminItemsComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularResizedEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
