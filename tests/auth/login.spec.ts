import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    const user = users.standardUser;
    await loginPage.navigate();
    await loginPage.login(user.username, user.password!);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('invalid_user', 'invalid_pass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show locked out message for locked_out_user', async ({ loginPage }) => {
    const user = users.lockedOutUser;
    await loginPage.navigate();
    await loginPage.login(user.username, user.password!);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
