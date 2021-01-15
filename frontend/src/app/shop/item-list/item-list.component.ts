import {Component, OnInit} from '@angular/core';
import {Item} from '../../shared/item.model';
import {ItemService} from '../../shared/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemAccessService} from '../../shared/item-access.service';
import {ShopService} from '../shop.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  private itemsFilteredSub: Subscription;

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private dataAccessService: ItemAccessService,
              private shopService: ShopService) {
  }

  ngOnInit() {
    this.dataAccessService.fetchItems();

    this.itemService.itemsChanged
      .subscribe((items) => {
        this.items = items;
      });
    this.items = this.itemService.getItems();

    this.itemsFilteredSub = this.shopService.itemsFiltered
      .subscribe((filteredItems) => {
        this.items = filteredItems;
      });
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
