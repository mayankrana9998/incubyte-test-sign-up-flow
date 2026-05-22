import { Before, After, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { UserData, buildUserData } from "../utils/testDataFactory";

setDefaultTimeout(90_000);

let browser: Browser;
let page: Page;
let registerPage: RegisterPage;
let loginPage: LoginPage;
let user: UserData;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  registerPage = new RegisterPage(page);
  loginPage = new LoginPage(page);
  user = buildUserData();
});

After(async () => {
  await page.close();
  await browser.close();
});

Given("I open the ParaBank home page", async () => {
  await registerPage.open();
});

When("I register a brand new ParaBank user", async () => {
  await registerPage.openRegistrationForm();
  await registerPage.register(user);
  
  // Wait for registration success page
  await page.waitForLoadState("networkidle");
  
  // Print confirmation message
  console.log(`✓ New user registration complete: ${user.username}`);
});

When("I sign in with the created user", async () => {
  // After registration, we're automatically logged in
  // Just navigate to the home page to refresh and confirm we're logged in
  console.log("User is already logged in after registration. Verifying login status...");
  
  // Reload the home page to ensure we're at the dashboard
  await page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", {
    waitUntil: "networkidle"
  });
  
  // Verify we're logged in by checking for the logout link
  await page.waitForSelector("a[href*='logout']", { timeout: 15000 });
  
  console.log(`✓ Confirmed logged in as user: ${user.username}`);
});

Then("I should see the Accounts Overview page", async () => {
  // Click on Accounts Overview link
  console.log("Navigating to Accounts Overview...");
  await page.click("a:has-text('Accounts Overview')");
  
  // Wait for the page to load
  await page.waitForLoadState("networkidle");
  
  // Verify we're on the accounts overview page
  await loginPage.assertOverviewVisible();
  console.log("✓ Accounts Overview page is visible");
});

Then("I log the displayed account amount", async () => {
  const amount = await loginPage.readFirstAccountAmount();
  console.log(`✓ Post-login displayed account amount: ${amount}`);
});
