export default class Category {
  constructor(title, description, isDealsCategory = false) {
    this.title = title;
    this.description = description;
    this.isDealsCategory = isDealsCategory;
  }
  getTitleForProduct() {
    return `${this.title}`;
  }
}
