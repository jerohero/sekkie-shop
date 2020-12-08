export class Item {
  public name: string;
  public description: string;
  public primaryImagePath: string;
  public secondaryImagePaths: string[];

  constructor(name: string, desc: string, imagePath: string, secondaryImagePaths: string[]) {
    this.name = name;
    this.description = desc;
    this.primaryImagePath = imagePath;
    this.secondaryImagePaths = secondaryImagePaths;
  }
}
