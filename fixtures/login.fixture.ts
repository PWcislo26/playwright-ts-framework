import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

export type LoginFixtures = {
  page: Page;
  login: (login: string, password: string) => Promise<void>;
};

export const test = base.extend<LoginFixtures>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close(); // Ensure context is closed after each test
  },
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const login = async (login: string, password: string) => {
      await loginPage.openLoginPage();
      await loginPage.performLogin(login, password);
    };
    await use(login);
  },
});
