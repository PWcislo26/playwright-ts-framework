import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly homePageUrl: string;
  readonly categoryMenu: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageUrl = "https://automationteststore.com/";
    this.categoryMenu = this.page.locator(".nav-pills categorymenu");
    this.addToCartButton = this.page.locator('a[title="Add to Cart"]');
  }

  async openHomePage() {
    await super.navigateTo(this.homePageUrl);
  }

  async addFirstNProductsToCart(numberOfProducts: number) {
    const buttonCount = await super.getCount(this.addToCartButton);
    if (buttonCount < numberOfProducts) {
      throw new Error(
        `Request ${numberOfProducts} products, but only ${buttonCount} is available`
      );
    }
    for (let i = 0; i < numberOfProducts; i++) {
      await super.click(this.addToCartButton.nth(i));
    }
  }
}
