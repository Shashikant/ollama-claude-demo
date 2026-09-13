import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    const user = users.standardUser;
    await loginPage.navigate();
    await loginPage.login(user.username, user.password!);
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
  });

  test('should validate product and price in cart', async ({ cartPage }) => {
    const item = await cartPage.productItem('Sauce Labs Backpack');
    await expect(item).toBeVisible();

    const price = await cartPage.getProductPrice('Sauce Labs Backpack');
    expect(price).toBe('$29.99');
  });
});
