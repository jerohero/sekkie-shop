import { Injectable } from '@angular/core';

import { Item } from './item.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemService {
  itemsChanged = new Subject<Item[]>();

  // private items: Item[] = [
  //   new Item(
  //     'Loose cropped jeans',
  //     20,
  //     'Vet mooi',
  //     'https://i.imgur.com/zSsxvNb.png',
  //     [
  //       'https://i.imgur.com/xYE8aaT.png',
  //       'https://i.imgur.com/w7osQSw.png',
  //       'https://i.imgur.com/5XHQ2md.png'
  //     ],
  //     ['S', 'M', 'L'],
  //     []),
  //   new Item(
  //     'Jeans',
  //     20,
  //     'Vet mooi',
  //     'https://i.imgur.com/DZXT8r1.png',
  //     [
  //       'https://i.imgur.com/aoWATqo.png',
  //       'https://i.imgur.com/SlCrJzY.png',
  //       'https://i.imgur.com/frDiEDN.png'
  //     ],
  //     ['S', 'M', 'L'],
  //     []),
  //   new Item(
  //     'Long sleeve',
  //     20,
  //     'Vet mooi',
  //     'https://i.imgur.com/hKgdfR1.png',
  //     [
  //       'https://i.imgur.com/QxOOevb.png',
  //       'https://i.imgur.com/retBEOO.png',
  //       'https://i.imgur.com/FTZEQhm.png'
  //     ],
  //     ['S', 'M', 'L'],
  //     []),
  //   new Item(
  //     'Knitted beanie',
  //     20,
  //     'Vet mooi',
  //     'https://i.imgur.com/Qzi0nOU.png',
  //     [
  //       'https://i.imgur.com/0YLynyp.png',
  //       'https://i.imgur.com/17FJAQU.png',
  //       'https://i.imgur.com/Xs5NSrg.png',
  //       'https://i.imgur.com/dHt8PxN.png'
  //     ],
  //     ['S', 'M', 'L'],
  //     []),
  //   new Item(
  //     'Mock turtleneck',
  //     20,
  //     'Vet mooi',
  //     'https://i.imgur.com/ebtBcZp.png',
  //     [
  //       'https://i.imgur.com/FZiDMQo.png',
  //       'https://i.imgur.com/MoH8mpy.png',
  //       'https://i.imgur.com/dYTjPyK.png'
  //     ],
  //     ['S', 'M', 'L'],
  //     ['Caramel', 'Black', 'White', 'Dark gray']),
  // ];

  private items: Item[] = [];

  constructor(private slService: ShoppingListService) { }

  setItems(items: Item[]) {
    this.items = items;
    this.itemsChanged.next(items);
  }

  getItems() {
    return this.items.slice();
  }

  getItem(id: string) {
    console.log(this.items);
    return this.items.find(i => i.id === id);
  }

  addItemToShoppingList(item: Item) {
    this.slService.addItem(item);
  }
}
