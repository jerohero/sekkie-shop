import { Component, OnInit } from '@angular/core';
import {Item} from '../../shared/models/item.model';
import {ItemAccessService} from '../../shared/item-access.service';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {skipWhile, take} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss']
})
export class AdminItemsComponent implements OnInit {
  items: Item[];
  selectedItem: Item;

  constructor(private itemAccessService: ItemAccessService, private dataStorageService: DataStorageService) { }

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

  updateItem(form: NgForm): void {
    this.selectedItem.name = form.value.title;
    this.selectedItem.primaryImagePath = form.value.primaryImage;
    this.selectedItem.price = form.value.price;
    this.selectedItem.secondaryImagePaths = this.findSecondaryImages(form.value.secondaryImages);
    this.selectedItem.sizes = this.findSizes(form.value.sizes);
    this.selectedItem.colors = this.findColors(form.value.colors);

    this.itemAccessService.updateItem(this.selectedItem)
      .subscribe();
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
    return this.selectedItem.colors.join(', ');
  }

  get secondaryImages() {
    return this.selectedItem.secondaryImagePaths.join(',\n');
  }

  get sizes() {
    return this.selectedItem.sizes.join(', ');
  }
}
