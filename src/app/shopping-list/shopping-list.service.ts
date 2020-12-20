import {Item} from '../home/item.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  // itemsChanged = new EventEmitter<Item[]>();
  itemsChanged = new Subject<Item[]>();

  private items: Item[] = [
    new Item(
      'Long sleeve',
      20,
      'Vet mooi',
      'https://i.imgur.com/hKgdfR1.png',
      [
        'https://i.imgur.com/QxOOevb.png',
        'https://i.imgur.com/retBEOO.png',
        'https://i.imgur.com/FTZEQhm.png'
      ],
      ['S', 'M', 'L'],
      []),
    new Item(
      'Knitted beanie',
      20,
      'Vet mooi',
      'https://i.imgur.com/Qzi0nOU.png',
      [
        'https://i.imgur.com/0YLynyp.png',
        'https://i.imgur.com/17FJAQU.png',
        'https://i.imgur.com/Xs5NSrg.png',
        'https://i.imgur.com/dHt8PxN.png'
      ],
      ['S', 'M', 'L'],
      []),
    new Item(
      'Mock turtleneck',
      20,
      'Vet mooi',
      'https://i.imgur.com/ebtBcZp.png',
      [
        'https://i.imgur.com/FZiDMQo.png',
        'https://i.imgur.com/MoH8mpy.png',
        'https://i.imgur.com/dYTjPyK.png'
      ],
      ['S', 'M', 'L'],
      ['Caramel', 'Black', 'White', 'Dark gray']),
  ];

  getItems() {
    return this.items.slice();
  }

  addItem(item: Item) {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
  }
}
