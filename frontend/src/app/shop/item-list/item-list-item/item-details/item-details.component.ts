import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ItemService } from '../../../../shared/services/item.service';
import { Item } from '../../../../shared/models/item.model';
import {ItemAccessService} from '../../../../shared/services/data-access/item-access.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  @ViewChild('showcased') showcasedEl: ElementRef;
  item: Item;
  id: string;
  showcasedImg: string;
  fadeImg: string;
  playFadeAnimation: boolean;
  selectedSize: string;
  selectedColor: string;
  showNoSizeSelectedError: boolean;
  showNoColorSelectedError: boolean;
  fadeAnimationInterval: number;
  imageHeight: number;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private dataAccessService: ItemAccessService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.loadItem();
        }
      );
  }

  loadItem(): void {
    const preloadedItem = this.itemService.getItems().find(i => i.id === this.id);
    if (preloadedItem) {
      this.item = preloadedItem;
      this.showcaseImage(this.item.primaryImagePath);
    } else {
      this.dataAccessService.fetchItem(this.id).subscribe(item => {
        this.item = item;
        if (this.item === undefined) {
          this.router.navigate(['/']);
        } else {
          this.showcaseImage(this.item.primaryImagePath);
        }
      });
    }
  }

  showcaseImage(secondaryImage: string): void {
    this.fadeInShowcasedImage(secondaryImage);
  }

  fadeInShowcasedImage(newImage): void {
    if (this.playFadeAnimation) {
      this.fadeImg = newImage;
      this.showcasedImg = newImage;
      clearInterval(this.fadeAnimationInterval);
      this.playFadeAnimation = false;
    } else {
      this.playFadeAnimation = true;
      this.fadeImg = newImage;
      this.fadeAnimationInterval = setInterval(() => {
        this.playFadeAnimation = false;
        this.showcasedImg = newImage;
        clearInterval(this.fadeAnimationInterval);
      }, 200);
    }
  }

  onColorClicked(color): void {
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

    this.itemService.addItemToShoppingList(this.item, {selectedSize: this.selectedSize, selectedColor: this.selectedColor});
    this.router.navigate(['shopping-list']);
  }

  onResized() {
    this.imageHeight = this.showcasedEl.nativeElement.height;
  }
}
