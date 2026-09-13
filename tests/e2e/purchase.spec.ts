import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('US-001: Complete Product Purchase E2E', () => {
  const user = users.standardUser;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(user.username);
    await page.locator('[data-test="password"]').fill(user.password!);
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL(/inventory.html/);
  });

  test('should successfully complete the full purchase flow', async ({
    productsPage,
    cartPage,
    checkoutPage
  }) => {
    // AC-02 & AC-03: Product Selection & Add to Cart
    await productsPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(1);
    await productsPage.goToCart();

    // AC-04: Cart Validation
    const item = await cartPage.productItem('Sauce Labs Backpack');
    await expect(item).toBeVisible();
    const price = await cartPage.getProductPrice('Sauce Labs Backpack');
    expect(price).toBe('$29.99');
    await cartPage.proceedToCheckout();

    // AC-05: Checkout
    await checkoutPage.fillInformation(user.firstName!, user.lastName!, user.zipCode!);
    await checkoutPage.continueToOverview();
    await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);

    // AC-06: Order Completion
    await checkoutPage.finishPurchase();
    const confirmationText = await checkoutPage.getCompleteHeaderText();
    expect(confirmationText).toBe('Thank you for your order!');
  });
});
