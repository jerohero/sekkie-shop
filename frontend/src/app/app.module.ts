import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ItemListItemComponent } from './home/item-list/item-list-item/item-list-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ItemEditComponent } from './home/item-edit/item-edit.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { ShoppingCartItemComponent } from './shopping-list/shopping-cart-item/shopping-cart-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './home/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemListComponent,
    ItemListItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    ItemEditComponent,
    ItemDetailsComponent,
    UnknownPageComponent,
    ShoppingCartItemComponent,
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