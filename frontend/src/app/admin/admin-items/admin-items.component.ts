import { Component, OnInit } from '@angular/core';
import {Item} from '../../shared/models/item.model';
import {ItemAccessService} from '../../shared/services/data-access/item-access.service';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {skipWhile, take} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {ItemService} from '../../shared/services/item.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss']
})
export class AdminItemsComponent implements OnInit {
  items: Item[];
  selectedItem: Item;
  creatingItem: boolean;
  categories: string[] = this.itemService.categories;
  collections: string[] = this.itemService.collections;

  constructor(private itemAccessService: ItemAccessService, private dataStorageService: DataStorageService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.dataStorageService.user.pipe(skipWhile(item => !item), take(1))
      .subscribe(() => {
        this.itemAccessService.fetchItems()
          .subscribe((items) => {
            this.items = items;
            this.selectedItem = items[0];
          });
      });
  }

  showItem(item: Item): void {
    this.selectedItem = item;
    if (this.creatingItem) { this.creatingItem = false; }
  }

  deleteItem(): void {
    this.itemAccessService.deleteItem(this.selectedItem.id)
      .subscribe(() => {
        const index = this.items.indexOf(this.selectedItem, 0);
        if (index > -1) {
          this.items.splice(index, 1);
        }
        this.selectedItem = null;
      });
  }

  createItem(): void {
    this.creatingItem = true;
    this.selectedItem = new Item(
      null, null, null, null, null, null, null, null , null
    );
  }

  saveItem(form: NgForm): void {
    this.selectedItem.name = form.value.title;
    this.selectedItem.primaryImagePath = form.value.primaryImage;
    this.selectedItem.price = form.value.price;
    this.selectedItem.secondaryImagePaths = this.findSecondaryImages(form.value.secondaryImages);
    this.selectedItem.sizes = this.findSizes(form.value.sizes);
    this.selectedItem.colors = this.findColors(form.value.colors);

    if (this.creatingItem) {
      this.itemAccessService.createItem(this.selectedItem)
        .subscribe((newItem) => {
          this.creatingItem = false;
          this.selectedItem = null;
          this.items.push(newItem);
        });
      return;
    }
    this.itemAccessService.updateItem(this.selectedItem)
      .subscribe(() => {
        alert('Item has been saved.');
      });
  }

  findColors(colors: string | string[]) {
    if (!Array.isArray(colors)) {
      colors = colors
        .replace(/ , | ,|, /g, ',')
        .split(',');
    }
    return colors;
  }

  findSizes(sizes: string | string[]) {
    if (!Array.isArray(sizes)) {
      sizes = sizes
        .replace(/\s/g, '')
        .split(',');
    }
    return sizes;
  }

  findSecondaryImages(secondaryImages: string | string[]) {
    if (!Array.isArray(secondaryImages)) {
      secondaryImages = secondaryImages
        .replace(/\s/g, '')
        .split(',')
        .filter(Boolean);
    }
    return secondaryImages;
  }

  get colors() {
    if (!this.selectedItem.colors) { return null; }
    return this.selectedItem.colors.join(', ');
  }

  get secondaryImages() {
    if (!this.selectedItem.secondaryImagePaths) { return null; }
    return this.selectedItem.secondaryImagePaths.join(',\n');
  }

  get sizes() {
    if (!this.selectedItem.colors) { return null; }
    return this.selectedItem.sizes.join(', ');
  }
}
