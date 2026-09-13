import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = '') {
    await this.page.goto(`${process.env.BASE_URL || 'https://www.saucedemo.com/'}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
