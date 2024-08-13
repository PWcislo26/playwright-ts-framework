import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HeaderComponent extends BasePage {
  readonly accountButton: Locator;
  readonly cartButton: Locator;
  readonly specialsButton: Locator;
  readonly checkoutButton: Locator;
  readonly currencyDropdown: Locator;
  readonly currencyOptions: Locator;
  readonly cartDropdown: Locator;
  readonly cartTotal: Locator;
  readonly cartNumberOfProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.accountButton = this.page
      .locator("#main_menu_top li")
      .filter({ hasText: "Account" });
    this.specialsButton = this.page
      .locator("#main_menu_top li")
      .filter({ hasText: "Specials" });
    this.cartButton = this.page
      .locator("#main_menu_top li")
      .filter({ hasText: "Cart" });
    this.checkoutButton = this.page
      .locator("#main_menu_top li")
      .filter({ hasText: "Checkout" });
    this.currencyDropdown = this.page.locator(".nav.language .dropdown-toggle");
    this.currencyOptions = this.page.locator(".dropdown-menu.currency li a");
    this.cartDropdown = this.page.locator(".nav.topcart .dropdown-toggle");
    this.cartTotal = this.page.locator(".cart_total");
    this.cartNumberOfProducts = this.cartDropdown.locator(
      ".label.label-orange.font14"
    );
  }

  async openAccountPage() {
    await super.click(this.accountButton);
  }

  async openSpecialsPage() {
    await super.click(this.specialsButton);
  }

  async openCartPage() {
    await super.click(this.cartButton);
  }

  async openCheckoutPage() {
    await super.click(this.checkoutButton);
  }

  async openCurrencyDropdown() {
    await super.click(this.currencyDropdown);
  }

  async getCurrencyOptionsCount(): Promise<number> {
    return await super.getCount(this.currencyOptions);
  }

  async selectCurrencyByIndex(idx: number) {
    await this.openCurrencyDropdown();
    await super.click(this.currencyOptions.nth(idx));
  }

  async getCurrencyTextByIndex(idx: number): Promise<string> {
    return await super.getInnerText(this.currencyOptions.nth(idx));
  }

  async getCartTotal(): Promise<string> {
    return await super.getInnerText(this.cartTotal);
  }

  async getNumberOfProductsInCart(): Promise<number> {
    const x = await super.getInnerText(this.cartNumberOfProducts);
    return parseInt(x);
  }
}
