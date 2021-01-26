import {AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../shared/services/item.service';
import {SearchComponent} from './search/search.component';
import {FiltersService} from '../../shared/services/filters-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search: SearchComponent;
  categories: string[] = this.itemService.categories;
  collections: string[] = this.itemService.collections;
  activeCategory;
  activeCollection;

  constructor(private itemService: ItemService, private filtersService: FiltersService) { }

  ngOnInit(): void {
    this.activeCategory = this.filtersService.activeCategory;
    this.activeCollection = this.filtersService.activeCollection;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.search.search();
    });
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.filtersService.activeCategory = category;
    this.search.search();
  }

  setActiveCollection(collection: string): void {
    this.activeCollection = collection;
    this.filtersService.activeCollection = collection;
    this.search.search();
  }
}
