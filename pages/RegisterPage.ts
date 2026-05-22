import { Page } from "@playwright/test";
import { UserData } from "../utils/testDataFactory";

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
  }

  async openRegistrationForm(): Promise<void> {
    await this.page.locator("a[href*='register.htm']").click();
  }

  async register(user: UserData): Promise<void> {
    await this.page.locator("#customer\.firstName").fill(user.firstName);
    await this.page.locator("#customer\.lastName").fill(user.lastName);
    await this.page.locator("#customer\.address\.street").fill(user.address);
    await this.page.locator("#customer\.address\.city").fill(user.city);
    await this.page.locator("#customer\.address\.state").fill(user.state);
    await this.page.locator("#customer\.address\.zipCode").fill(user.zipCode);
    await this.page.locator("#customer\.phoneNumber").fill(user.phone);
    await this.page.locator("#customer\.ssn").fill(user.ssn);
    await this.page.locator("#customer\.username").fill(user.username);
    await this.page.locator("#customer\.password").fill(user.password);
    await this.page.locator("#repeatedPassword").fill(user.password);
    await this.page.locator("input[value='Register']").click();
  }
}
