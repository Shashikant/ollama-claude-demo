// Jira Story: BUG-7
import { test, expect } from '../../src/fixtures/testFixtures';
import users from '../../test-data/users.json';

test.describe('User Login and Session Management', () => {
  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should show error message with invalid username', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('invalid_user', users.standardUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  test('should show error message with invalid password', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(users.standardUser.username, 'wrong_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  test('should show error message with empty fields', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username is required');
  });
});
