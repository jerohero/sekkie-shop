export class Item {
  public name: string;
  public description: string;
  public primaryImagePath: string;
  public secondaryImagePaths: string[];
  public sizes: string[];
  public colors: string[];

  constructor(name: string, desc: string, imagePath: string, secondaryImagePaths: string[], sizes: string[], colors: string[]) {
    this.name = name;
    this.description = desc;
    this.primaryImagePath = imagePath;
    this.secondaryImagePaths = secondaryImagePaths;
    this.sizes = sizes;
    this.colors = colors;
  }
}
