import { test } from "../fixtures/login.fixture";
import { expect } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { HeaderComponent } from "../page-objects/components/headerComponent";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import * as dotenv from "dotenv";
import { CartPage } from "../page-objects/CartPage";

dotenv.config();

test.describe("Home page test suite", () => {
  let homePage: HomePage;
  let headerComponent: HeaderComponent;
  let checkoutPage: CheckoutPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page, login }) => {
    const loginUsername = process.env.LOGIN_USERNAME_CORRECT as string;
    const loginPassword = process.env.LOGIN_PASSWORD_CORRECT as string;
    await login(loginUsername, loginPassword);
    homePage = new HomePage(page);
    await homePage.openHomePage();
    headerComponent = new HeaderComponent(page);
  });

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
    await headerComponent.openCheckoutPage();
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(checkoutPage.checkoutPageSuccessUrl);
    await expect(checkoutPage.checkoutSuccessfullMessage).toBeVisible();
  });
});
