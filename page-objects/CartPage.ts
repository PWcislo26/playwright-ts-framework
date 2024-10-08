import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutPageUrl: string;
  readonly removeFromCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.removeFromCartButton = this.page.locator("a i.fa-trash-o");
    this.checkoutPageUrl =
      "https://automationteststore.com/index.php?rt=checkout/cart";
  }

  async removeAllFromCart() {
    const itemsInCart = await super.getCount(this.removeFromCartButton);
    if (itemsInCart > 0) {
      for (let i = 0; i < itemsInCart; i++) {
        await super.click(this.removeFromCartButton.nth(i));
      }
    }
  }
}
