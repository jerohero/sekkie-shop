import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../shared/services/item.service';
import {ShopService} from '../../shop.service';
import {Item} from '../../../shared/models/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue = '';

  constructor(private itemService: ItemService, private shopService: ShopService) { }

  ngOnInit(): void {
  }

  search(): void {
    const activeCategory = this.shopService.activeCategory.getValue();

    let items;
    if (activeCategory) {
      items = this.itemService.getItemsByCategory(activeCategory);
    } else {
      items = this.itemService.getItems();
    }

    let results: Item[];
    if (this.searchValue) {
      results = items.filter((item) =>
        item.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      results = items;
    }

    this.shopService.itemsFiltered.next(results);
  }

}
