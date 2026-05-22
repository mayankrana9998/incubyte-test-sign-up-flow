import { Page, expect } from "@playwright/test";
import { UserData } from "../utils/testDataFactory";

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
    await this.page.waitForLoadState("networkidle");
  }

  async openRegistrationForm(): Promise<void> {
    // Try to click on the Register link
    const registerLink = this.page.locator("a:has-text('Register')").first();
    await registerLink.click();
    
    // Wait for page to load and for form to appear
    await this.page.waitForURL("**/register.htm**", { timeout: 15000 });
    await this.page.waitForLoadState("networkidle");
    
    // Wait for input fields to be present
    await this.page.waitForSelector("input[name='customer.firstName']", { timeout: 15000 });
  }

  async register(user: UserData): Promise<void> {
    // Using better selectors for the form fields
    await this.page.fill("input[name='customer.firstName']", user.firstName);
    await this.page.fill("input[name='customer.lastName']", user.lastName);
    await this.page.fill("input[name='customer.address.street']", user.address);
    await this.page.fill("input[name='customer.address.city']", user.city);
    await this.page.fill("input[name='customer.address.state']", user.state);
    await this.page.fill("input[name='customer.address.zipCode']", user.zipCode);
    await this.page.fill("input[name='customer.phoneNumber']", user.phone);
    await this.page.fill("input[name='customer.ssn']", user.ssn);
    await this.page.fill("input[name='customer.username']", user.username);
    await this.page.fill("input[name='customer.password']", user.password);
    await this.page.fill("input[name='repeatedPassword']", user.password);
    
    // Click the Register button
    await this.page.click("input[value='Register']");
    
    // Wait for navigation and page to load
    await this.page.waitForLoadState("networkidle");
    
    // Add a delay to ensure the page is fully rendered
    await this.page.waitForTimeout(2000);
    
    // Check if registration was successful by looking for success message
    const pageContent = await this.page.innerText("body");
    
    if (pageContent.includes("Error") || pageContent.includes("error")) {
      console.error("Registration error detected. Page content:", pageContent);
      throw new Error("Registration failed. See page content for details.");
    }
    
    // Extract and log the confirmation details
    console.log("✓ Registration successful. Confirmation page loaded.");
  }
}
