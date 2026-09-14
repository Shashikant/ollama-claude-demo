import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    const user = users.standardUser;
    await loginPage.navigate();
    await loginPage.login(user.username, user.password!);
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('should navigate to checkout overview with valid details', async ({ checkoutPage, page }) => {
    const user = users.standardUser;
    await checkoutPage.fillInformation(user.firstName!, user.lastName!, user.zipCode!);
    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test('should show error when details are missing', async ({ checkoutPage, page }) => {
    await checkoutPage.continueToOverview();
    const error = await page.locator('[data-test="error"]').textContent();
    expect(error).toContain('First Name is required');
  });
});
