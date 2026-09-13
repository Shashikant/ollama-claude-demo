import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
