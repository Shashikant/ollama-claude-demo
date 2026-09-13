import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart(productName: string) {
    // Ensure the products are actually loaded on the page
    await this.page.waitForSelector('.inventory_item');

    // Find the product container that contains the product name
    const productContainer = this.page.locator('.inventory_item').filter({ hasText: productName });

    // Find the button that STARTS with 'add-to-cart' within that container
    // SauceDemo uses dynamic data-test IDs like 'add-to-cart-sauce-labs-backpack'
    const addButton = productContainer.locator('[data-test^="add-to-cart"]');
    await addButton.click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getCartCount() {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    const count = await this.cartBadge.textContent();
    return count ? parseInt(count) : 0;
  }
}
