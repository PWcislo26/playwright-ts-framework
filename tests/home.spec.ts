import { test } from "../fixtures/login.fixture";
import { expect } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { HeaderComponent } from "../page-objects/components/HeaderComponent";
import { CartPage } from "../page-objects/CartPage";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import * as dotenv from "dotenv";


dotenv.config({override: false});

test.describe("Home page test suite", () => {
  let homePage: HomePage;
  let headerComponent: HeaderComponent;
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page, login }) => {
    const loginUsername = process.env.LOGIN_USERNAME_CORRECT as string;
    const loginPassword = process.env.LOGIN_PASSWORD_CORRECT as string;

    expect(loginUsername).toBeDefined();
    expect(loginPassword).toBeDefined();
    console.log("Length of LOGIN_USERNAME_CORRECT:", loginUsername.length);
    console.log("Length of LOGIN_PASSWORD_CORRECT:", loginPassword.length);
    await login(loginUsername, loginPassword);
    homePage = new HomePage(page);
    await homePage.openHomePage();
    headerComponent = new HeaderComponent(page);
  });

  test.describe("Product tests", () => {
    test.afterEach(async ({ page }) => {
      await headerComponent.openCartPage();
      cartPage = new CartPage(page);
      await cartPage.removeAllFromCart();
    });

    test("Add 1st available product to cart", async () => {
      const numberOfProductsToAdd = 1;
      await homePage.addFirstNProductsToCart(numberOfProductsToAdd);
      const productsInCart = await headerComponent.getNumberOfProductsInCart();
      await expect(productsInCart).toEqual(numberOfProductsToAdd);
    });

    test("Buy a product", async ({ page }) => {
      const numberOfProductsToAdd = 1;
      await homePage.addFirstNProductsToCart(numberOfProductsToAdd);
      checkoutPage = new CheckoutPage(page);
      await checkoutPage.openCheckoutPage();
      await checkoutPage.confirmOrder();
      await expect(page).toHaveURL(checkoutPage.checkoutPageSuccessUrl);
    });
  });

  test.describe("Header menu test suite", () => {
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
});
