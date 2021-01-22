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
import { ItemEditComponent } from './shop/item-edit/item-edit.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    ItemListComponent,
    ItemListItemComponent,
    ShoppingListComponent,
    DropdownDirective,
    ItemEditComponent,
    ItemDetailsComponent,
    UnknownPageComponent,
    ShoppingCartItemComponent,
    LoginComponent,
    SidebarComponent,
    SearchComponent,
    AccountComponent,
    RolePipe,
    OrderPageComponent,
    OrdersBoxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
