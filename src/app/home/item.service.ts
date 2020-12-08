import { EventEmitter, Injectable } from '@angular/core';

import { Item } from './item.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class ItemService {
  itemSelected = new EventEmitter<Item>();

  private items: Item[] = [
    new Item(
      'Loose cropped jeans',
      'Vet mooi',
      'https://i.imgur.com/zSsxvNb.png',
      [
        'https://i.imgur.com/xYE8aaT.png',
        'https://i.imgur.com/w7osQSw.png',
        'https://i.imgur.com/5XHQ2md.png'
      ]),
    new Item(
      'Loose cropped jeans',
      'Vet mooi',
      'https://i.imgur.com/DZXT8r1.png',
      [
        'https://i.imgur.com/aoWATqo.png',
        'https://i.imgur.com/SlCrJzY.png',
        'https://i.imgur.com/VoZr7lb.png'
      ]),
    new Item(
      'Long sleeve',
      'Vet mooi',
      'https://i.imgur.com/hKgdfR1.png',
      [
        'https://i.imgur.com/QxOOevb.png',
        'https://i.imgur.com/retBEOO.png',
        'https://i.imgur.com/FTZEQhm.png'
      ]),
    new Item(
      'Knitted beanie',
      'Vet mooi',
      'https://i.imgur.com/Qzi0nOU.png',
      [
        'https://i.imgur.com/0YLynyp.png',
        'https://i.imgur.com/17FJAQU.png',
        'https://i.imgur.com/Xs5NSrg.png',
        'https://i.imgur.com/dHt8PxN.png'
      ]),
    new Item(
      'Mock turtleneck',
      'Vet mooi',
      'https://i.imgur.com/ebtBcZp.png',
      [
        'https://i.imgur.com/FZiDMQo.png',
        'https://i.imgur.com/MoH8mpy.png',
        'https://i.imgur.com/dYTjPyK.png'
      ]),
  ];

  constructor(private slService: ShoppingListService) {}

  getItems() {
    return this.items.slice();
  }

  getItem(index: number) {
    return this.items[index];
  }

  addItemToShoppingList(item: Item) {
    this.slService.addItem(item);
  }
}
