export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortContainer = page.locator('.product_sort_container');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productImages = page.locator('.inventory_item_img');
    this.productDescriptions = page.locator('.inventory_item_desc');
  }

  async isInventoryLoaded() {
    return await this.pageTitle.isVisible() && (await this.pageTitle.textContent() === 'Products');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async sortProducts(option) {
    await this.sortContainer.selectOption(option);
  }

  async getFirstProductName() {
    return await this.productNames.first().textContent();
  }

  async getFirstProductPrice() {
    return await this.productPrices.first().textContent();
  }

  async addProductToCart(itemSlug) {
    await this.page.click(`[data-test="add-to-cart-${itemSlug}"]`);
  }

  async removeProductFromCart(itemSlug) {
    await this.page.click(`[data-test="remove-${itemSlug}"]`);
  }

  async getCartBadgeCount() {
    if (!(await this.cartBadge.isVisible())) {
      return '0';
    }
    return await this.cartBadge.textContent();
  }

  async isCartBadgeVisible() {
    return await this.cartBadge.isVisible();
  }

  async clickCart() {
    await this.cartLink.click();
  }
  async isCartVisible() {
  return await this.cartLink.isVisible();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isRemoveButtonVisible(itemSlug) {
    return await this.page
      .locator(`[data-test="remove-${itemSlug}"]`)
      .isVisible();
  }

  async isFirstProductImageVisible() {
    return await this.productImages.first().isVisible();
  }

  async isFirstProductDescriptionVisible() {
    return await this.productDescriptions.first().isVisible();
  }

  async isFirstProductPriceVisible() {
    return await this.productPrices.first().isVisible();
  }

  async isFirstProductNameVisible() {
    return await this.productNames.first().isVisible();
  }

  async getPageHeader() {
    return await this.pageTitle.textContent();
  }
}