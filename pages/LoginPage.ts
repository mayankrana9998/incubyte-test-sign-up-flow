import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    // Fill in credentials
    await this.page.fill("input[name='username']", username);
    await this.page.fill("input[name='password']", password);
    
    // Click login button
    await this.page.click("input[value='Log In']");
    
    // Wait for page navigation and load
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    
    // Add a small delay to ensure page is ready
    await this.page.waitForTimeout(2000);
  }

  async assertOverviewVisible(): Promise<void> {
    // Wait for the page content to load
    await this.page.waitForLoadState("networkidle");
    
    // Check for the account table which indicates we're on the Accounts Overview page
    await this.page.waitForSelector("table#accountTable", { timeout: 15000 });
    
    // Also check for the "Accounts Overview" text in the page
    const pageContent = await this.page.innerText("body");
    
    if (!pageContent.includes("Accounts Overview")) {
      throw new Error("Accounts Overview text not found on the page");
    }
    
    // If we got here, we're on the right page
    console.log("✓ Successfully navigated to Accounts Overview page");
  }

  async readFirstAccountAmount(): Promise<string> {
    // Wait for the account table to load
    await this.page.waitForSelector("table#accountTable tbody tr", { timeout: 15000 });
    
    // Get the first account balance from the table
    const rows = await this.page.locator("table#accountTable tbody tr");
    const rowCount = await rows.count();
    
    if (rowCount === 0) {
      throw new Error("No account rows found in the account table");
    }
    
    // Get the balance from the first row (typically in the 2nd or 3rd column)
    const firstRow = rows.first();
    const cells = firstRow.locator("td");
    const cellCount = await cells.count();
    
    // Usually balance is in the second or third cell
    if (cellCount >= 2) {
      const amount = await cells.nth(1).innerText();
      return amount.trim();
    }
    
    return "Amount not found";
  }
}
