import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item.model';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  id: number;
  showcasedImg: string;
  selectedSize: string;
  selectedColor: string;
  selectedAmount = 0;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.itemService.itemsChanged
      .subscribe((items) => {
        console.log(items);
      });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.item = this.itemService.getItem(this.id);
          if (this.item === undefined) {
            this.router.navigate(['404']);
          } else {
            this.showcasedImg = this.item.primaryImagePath;
          }
        }
      );
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
    this.itemService.addItemToShoppingList(this.item);
    this.router.navigate(['shopping-list']);
  }

  onMinusAmountClicked() {
    if (this.selectedAmount <= 0) { return; }
    this.selectedAmount--;
  }

  onPlusAmountClicked() {
    this.selectedAmount++;
  }

  onEditItem() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
