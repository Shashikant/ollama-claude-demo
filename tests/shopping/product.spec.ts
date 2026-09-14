import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('Product Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    const user = users.standardUser;
    await loginPage.navigate();
    await loginPage.login(user.username, user.password!);
  });

  test('should display product details correctly', async ({ productDetailsPage, page }) => {
    // Navigate to product details by clicking product name
    await page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }).click();

    const name = await productDetailsPage.getProductName();
    const price = await productDetailsPage.getProductPrice();

    expect(name).toBe('Sauce Labs Backpack');
    expect(price).toBe('$29.99');
  });

  test('should add product to cart and increase count', async ({ productsPage }) => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.addItemToCart('Sauce Labs Backpack');
    const newCount = await productsPage.getCartCount();

    expect(newCount).toBe(initialCount + 1);
  });
});
