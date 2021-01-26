import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { ItemListItemComponent } from './shop/item-list/item-list-item/item-list-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { ShoppingCartItemComponent } from './shopping-list/shopping-cart-item/shopping-cart-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './shop/item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shop/sidebar/sidebar.component';
import { SearchComponent } from './shop/sidebar/search/search.component';
import { AccountComponent } from './account/account.component';
import {RolePipe} from './shared/pipes/role.pipe';
import { OrderPageComponent } from './shopping-list/order-page/order-page.component';
import { OrdersBoxComponent } from './account/orders-box/orders-box.component';
import { ShippingPageComponent } from './shopping-list/order-page/shipping-page/shipping-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import {StatusPipe} from './shared/pipes/status.pipe';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    ItemListComponent,
    ItemListItemComponent,
    ShoppingListComponent,
    DropdownDirective,
    ItemDetailsComponent,
    UnknownPageComponent,
    ShoppingCartItemComponent,
    LoginComponent,
    SidebarComponent,
    SearchComponent,
    AccountComponent,
    RolePipe,
    StatusPipe,
    OrderPageComponent,
    OrdersBoxComponent,
    ShippingPageComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminItemsComponent,
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
