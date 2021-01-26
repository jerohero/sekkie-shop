import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../shared/models/item.model';
import {ItemService} from '../../shared/services/item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemAccessService} from '../../shared/services/data-access/item-access.service';
import {Subscription} from 'rxjs';
import {FiltersService} from '../../shared/services/filters-service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[];
  searchValue = '';
  private itemsFilteredSub: Subscription;

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private dataAccessService: ItemAccessService,
              private filtersService: FiltersService) { }

  ngOnInit() {
    // Only fetch if there hasn't been fetched yet
    if (this.itemService.getItems().length < 1) {
      this.dataAccessService.fetchItems()
        .subscribe((items) => {
          this.items = items;
          this.itemService.setItems(items);
        });
    }

    // Filters have been added
    this.itemsFilteredSub = this.filtersService.itemsFiltered
      .subscribe((filteredItems) => {
        this.items = filteredItems;
        this.searchValue = this.filtersService.searchValue.getValue();
      });
  }

  onNewItem() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.itemsFilteredSub.unsubscribe();
  }
}
