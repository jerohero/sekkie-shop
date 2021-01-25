export class Item {
  constructor(public id: string,
              public name: string,
              public price: number,
              public category: string,
              public collection: string,
              public primaryImagePath: string,
              public secondaryImagePaths: string[],
              public sizes: string[],
              public colors: string[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.collection = collection;
    this.primaryImagePath = primaryImagePath;
    this.secondaryImagePaths = secondaryImagePaths;
    this.sizes = sizes;
    this.colors = colors;
  }
}
