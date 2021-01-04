export class ShoppingCartItem {
  constructor(public id: string,
              public name: string,
              public price: number,
              public totalPrice: number,
              public primaryImagePath: string,
              public selectedSize: string,
              public selectedColor: string,
              public selectedAmount: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.totalPrice = totalPrice;
    this.primaryImagePath = primaryImagePath;
    this.selectedSize = selectedSize;
    this.selectedColor = selectedColor;
    this.selectedAmount = selectedAmount;
  }
}
