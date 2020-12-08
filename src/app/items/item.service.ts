import { EventEmitter, Injectable } from '@angular/core';

import { Item } from './item.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class ItemService {
  itemSelected = new EventEmitter<Item>();

  private items: Item[] = [
    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),
    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),
    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
      ]),
    new Item(
      'Turtleneck',
      'Vet mooi',
      'https://gd4.alicdn.com/imgextra/i4/0/O1CN01yJZ4rs1nK6gQjQfz5_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01QqiotT1nK6gGHuAwQ_!!2106485070.jpg',
        'https://gd2.alicdn.com/imgextra/i2/2106485070/O1CN01rOoawj1nK6gE3G4dJ_!!2106485070.jpg',
        'https://gd1.alicdn.com/imgextra/i1/2106485070/O1CN01tbD2ig1nK6gJfPbmQ_!!2106485070.jpg'
      ]),
    new Item('Pants',
      'Zieke pant',
      'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
      [
        'https://gd3.alicdn.com/imgextra/i3/0/O1CN01M0qMGU1nK6feBsDXl_!!0-item_pic.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01oGB7yw1nK6fXpXorb_!!2106485070-0-lubanu-s.jpg',
        'https://gd3.alicdn.com/imgextra/i3/2106485070/O1CN01CoTBID1nK6fTlad51_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01QSY3361nK6fWJIEFh_!!2106485070-0-lubanu-s.jpg',
        'https://gd4.alicdn.com/imgextra/i4/2106485070/O1CN01ckL75t1nK6hAVL5yw_!!0-item_pic.jpg'
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
