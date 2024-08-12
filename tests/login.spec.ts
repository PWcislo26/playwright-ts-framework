import { test } from "../fixtures/login.fixture";
import { expect } from "@playwright/test";
import { testConfig } from "../config/testConfig";
import { LoginPage } from "../page-objects/LoginPage";
import * as dotenv from 'dotenv';

dotenv.config();

test.describe("Login and logout test suite", () => {
  let loginPage: LoginPage;

  test("Log in with incorrect credentials", async ({ page, login }) => {
    await login(
      testConfig.login.incorrectUsername,
      testConfig.login.incorrectPassword
    );
    loginPage = new LoginPage(page);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("Log in with correct credentials", async ({ page, login }) => {
    const loginUsername = process.env.LOGIN_USERNAME_CORRECT!;
    const loginPassword = process.env.LOGIN_PASSWORD_CORRECT!;
    await login(
      loginUsername,
      loginPassword
    );
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/account"
    );
  });
});
