import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../shared/models/item.model';
import {ItemService} from '../../shared/services/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemAccessService} from '../../shared/item-access.service';
import {ShopService} from '../shop.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[];
  private itemsFilteredSub: Subscription;

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private dataAccessService: ItemAccessService,
              private shopService: ShopService) { }

  ngOnInit() {
    this.dataAccessService.fetchItems()
      .subscribe((items) => {
        this.items = items;
        this.itemService.setItems(items);
      });

    this.itemsFilteredSub = this.shopService.itemsFiltered
      .subscribe((filteredItems) => {
        this.items = filteredItems;
      });
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.itemsFilteredSub.unsubscribe();
  }
}
