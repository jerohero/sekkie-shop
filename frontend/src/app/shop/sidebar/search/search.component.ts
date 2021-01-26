import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../shared/services/item.service';
import { Item } from '../../../shared/models/item.model';
import {FiltersService} from '../../../shared/services/filters-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue = '';

  constructor(private itemService: ItemService, private filtersService: FiltersService) { }

  ngOnInit(): void {
    this.searchValue = this.filtersService.searchValue;
  }

  search(): void {
    this.filtersService.searchValue = this.searchValue;

    let results = this.itemService.getItems();

    results = this.filterByCategory(results);
    results = this.filterByCollection(results);
    results = this.filterBySearchValue(results);

    this.filtersService.itemsFiltered.next(results);
  }

  filterByCategory(items: Item[]): Item[] {
    const activeCategory = this.filtersService.activeCategory;
    if (activeCategory) {
      return items.filter((item) =>
        item.category.toLowerCase().includes(activeCategory.toLowerCase()));
    } else {
      return items;
    }
  }

  filterByCollection(items: Item[]): Item[] {
    const activeCollection = this.filtersService.activeCollection;
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
