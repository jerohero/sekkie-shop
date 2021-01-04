import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ItemEditComponent } from './home/item-edit/item-edit.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'new', component: ItemEditComponent },
    { path: ':id/edit', component: ItemEditComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: UnknownPageComponent },
  { path: ':id', component: ItemDetailsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
