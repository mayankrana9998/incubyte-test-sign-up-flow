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
  browser = await chromium.launch({ headless: true });
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
});

When("I sign in with the created user", async () => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
  await loginPage.login(user.username, user.password);
});

Then("I should see the Accounts Overview page", async () => {
  await loginPage.assertOverviewVisible();
});

Then("I log the displayed account amount", async () => {
  const amount = await loginPage.readFirstAccountAmount();
  console.log(`Post-login displayed amount: ${amount}`);
});
