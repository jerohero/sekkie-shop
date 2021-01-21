import {ShoppingCartItem} from '../../shopping-list/shopping-cart-item.model';
import {User, UserAddress, UserName} from './user.model';

export class Order {
  constructor(public id: string,
              public userId: string,
              public items: ShoppingCartItem[],
              public name: UserName,
              public email: string,
              public address: UserAddress,
              public totalPrice: number,
              public date: number,
              public status: string) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.name = name;
    this.email = email;
    this.address = address;
    this.totalPrice = totalPrice;
    this.date = date;
    this.status = status;
  }
}
