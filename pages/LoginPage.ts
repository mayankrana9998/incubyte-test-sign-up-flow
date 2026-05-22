import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.locator("input[name='username']").fill(username);
    await this.page.locator("input[name='password']").fill(password);
    await this.page.locator("input[value='Log In']").click();
  }

  async assertOverviewVisible(): Promise<void> {
    await expect(this.page.locator("h1.title")).toHaveText(/Accounts Overview/i);
  }

  async readFirstAccountAmount(): Promise<string> {
    const amount = await this.page.locator("table#accountTable tbody tr td").nth(1).innerText();
    return amount.trim();
  }
}
