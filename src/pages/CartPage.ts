import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async productItem(productName: string): Promise<Locator> {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async getProductPrice(productName: string): Promise<string | null> {
    const item = await this.productItem(productName);
    return await item.locator('.inventory_item_price').textContent();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
