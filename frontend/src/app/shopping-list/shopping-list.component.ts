import {Component, OnDestroy, OnInit} from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import {Item} from '../shared/item.model';
import {Subscription} from 'rxjs';
import {DataAccessService} from '../shared/data-access.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: Item[];
  private itemsChangedSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.slService.getItems();
    this.itemsChangedSub = this.slService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      );
  }

  ngOnDestroy(): void {
    this.itemsChangedSub.unsubscribe();
  }
}
