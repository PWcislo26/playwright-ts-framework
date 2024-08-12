import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";

export type LoginFixtures = {
  page: Page;
  login: (login: string, password: string) => Promise<void>;
};

export const test = base.extend<LoginFixtures>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const login = async (login: string, password: string) => {
      await loginPage.openLoginPage()
      await loginPage.performLogin(login, password);
    };
    await use(login);
  }
});
