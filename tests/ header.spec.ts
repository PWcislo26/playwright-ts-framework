import { test } from "../fixtures/login.fixture";
import { expect } from "@playwright/test";
import { HeaderComponent } from "../page-objects/components/headerComponent";
import * as dotenv from 'dotenv';

dotenv.config();

test.describe("Header menu test suite", () => {
  let headerComponent: HeaderComponent;

  test.beforeEach(async ({ page, login }) => {
    const loginUsername = process.env.LOGIN_USERNAME_CORRECT as string;
    const loginPassword = process.env.LOGIN_PASSWORD_CORRECT as string;
    await login(loginUsername, loginPassword);
    headerComponent = new HeaderComponent(page);
  });

  test("Navigate to account", async ({ page }) => {
    await headerComponent.openAccountPage();
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/account"
    );
  });

  test("Navigate to specials", async ({ page }) => {
    await headerComponent.openSpecialsPage();
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=product/special"
    );
  });

  test("Navigate to cart", async ({ page }) => {
    await headerComponent.openCartPage();
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/cart"
    );
  });

  test("Navigate to checkout", async ({ page }) => {
    await headerComponent.openCheckoutPage();
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/confirm"
    );
  });

  test("Change currency", async () => {
    const currencyCount = await headerComponent.getCurrencyOptionsCount();
    for (let i = 0; i < currencyCount; i++) {
      const currencyText = await headerComponent.getCurrencyTextByIndex(i);
      const exptectedCurrency = currencyText[0];
      await headerComponent.selectCurrencyByIndex(i);
      const currentCurrency = await headerComponent.getCartTotal();
      await expect(currentCurrency).toContain(exptectedCurrency);
    }
  });
});
