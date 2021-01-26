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
    let results = this.itemService.getItems();

    results = this.filterByCategory(results);
    results = this.filterByCollection(results);
    results = this.filterBySearchValue(results);

    this.shopService.itemsFiltered.next(results);
  }

  filterByCategory(items: Item[]): Item[] {
    const activeCategory = this.shopService.activeCategory.getValue();
    if (activeCategory) {
      return items.filter((item) =>
        item.category.toLowerCase().includes(activeCategory.toLowerCase()));
    } else {
      return items;
    }
  }

  filterByCollection(items: Item[]): Item[] {
    const activeCollection = this.shopService.activeCollection.getValue();
    if (activeCollection) {
      return items.filter((item) =>
        item.clothingCollection.toLowerCase().includes(activeCollection.toLowerCase()));
    } else {
      return items;
    }
  }

  filterBySearchValue(items: Item[]): Item[] {
    if (this.searchValue) {
       return items.filter((item: Item) =>
        item.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      return items;
    }
  }

}
