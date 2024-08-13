import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly checkoutPageUrl: string;
  readonly checkoutPageSuccessUrl: string;
  readonly confirmOrderButton: Locator;
  readonly checkoutSuccessfullMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmOrderButton = this.page.getByRole("button", {
      name: "Confirm Order",
    });
    this.checkoutPageUrl =
      "https://automationteststore.com/index.php?rt=checkout/confirm";
    this.checkoutPageSuccessUrl =
      "https://automationteststore.com/index.php?rt=checkout/success";
    this.checkoutSuccessfullMessage = this.page.getByText(
      " Your Order Has Been Processed!"
    );
  }
  async openCheckoutPage() {
    await super.navigateTo(this.checkoutPageUrl);
  }

  async confirmOrder() {
    super.click(this.confirmOrderButton);
  }
}
