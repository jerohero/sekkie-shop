import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item.model';
import {DataAccessService} from '../shared/data-access.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  id: string;
  showcasedImg: string;
  selectedSize: string;
  selectedColor: string;
  showNoSizeSelectedError: boolean;
  showNoColorSelectedError: boolean;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.loadItem();
        }
      );
  }

  loadItem() {
    const preloadedItem = this.itemService.getItems().find(i => i.id === this.id);
    if (preloadedItem) {
      this.item = preloadedItem;
    } else {
      this.dataAccessService.fetchItem(this.id).subscribe(item => {
        this.item = item;
        if (this.item === undefined) {
          this.router.navigate(['404']);
        }
      });
    }
    if (this.item) {
      this.showcasedImg = this.item.primaryImagePath;
    }
  }

  showSecondaryImage(secondaryImage: string) {
    this.showcasedImg = secondaryImage;
  }

  showPrimaryImage() {
    this.showcasedImg = this.item.primaryImagePath;
  }

  onColorClicked(color) {
    if (this.selectedColor === color) {
      this.selectedColor = null;
    } else {
      this.selectedColor = color;
    }
  }

  onSizeClicked(size) {
    if (this.selectedSize === size) {
      this.selectedSize = null;
    } else {
      this.selectedSize = size;
    }
  }

  onBuy() {
    this.showNoSizeSelectedError = !this.selectedSize;
    if (this.showNoSizeSelectedError) { return; }
    this.showNoColorSelectedError = !this.selectedColor;
    if (this.showNoColorSelectedError) { return; }

    console.log(this.selectedSize);
    console.log(this.selectedColor);


    // this.itemService.addItemToShoppingList(this.item);
    // this.router.navigate(['shopping-list']);
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
