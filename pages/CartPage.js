export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.cartQuantity = page.locator('.cart_quantity');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
    this.cartItems = page.locator('.cart_item');
  }

  async getFirstItemName() {
    return await this.cartItemName.first().textContent();
  }

  async getFirstItemPrice() {
    return await this.cartItemPrice.first().textContent();
  }

  async getFirstItemQuantity() {
    return await this.cartQuantity.first().textContent();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
  async getCartItemsCount() {
  return await this.cartItems.count();
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}