import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HeaderComponent extends BasePage {
  readonly accountButton: Locator;
  readonly cartButton: Locator;
  readonly specialsButton: Locator;
  readonly checkoutButton: Locator
  readonly currencyDropdown: Locator
  readonly currencyOptions: Locator
  readonly cartDropdown: Locator
  readonly cartTotal: Locator

  constructor(page: Page) {
    super(page);
    this.accountButton = this.page.locator("#main_menu_top li").filter({ hasText: "Account" });
    this.specialsButton = this.page.locator('#main_menu_top li').filter({ hasText: 'Specials' });
    this.cartButton = this.page.locator('#main_menu_top li').filter({ hasText: 'Cart' });
    this.checkoutButton = this.page.locator('#main_menu_top li').filter({ hasText: 'Checkout' });
    this.currencyDropdown = this.page.locator('.nav.language .dropdown-toggle');
    this.currencyOptions = this.page.locator('.dropdown-menu.currency li a');
    this.cartDropdown = this.page.locator('.nav.topcart .dropdown-toggle');
    this.cartTotal = this.page.locator('.cart_total');
  }

  async openAccountPage() {
    await this.accountButton.click();
  }

  async openSpecialsPage() {
    await this.specialsButton.click();
  }

  async openCartPage() {
    await this.cartButton.click();
  }

  async openCheckoutPage() {
    await this.checkoutButton.click();
  }

  async openCurrencyDropdown() {
    await this.currencyDropdown.click();
  }

  async getCurrencyOptionsCount(): Promise<number> {
    return await this.currencyOptions.count();
  }  

  async selectCurrencyByIndex(idx: number) {
    await this.openCurrencyDropdown();
    await this.currencyOptions.nth(idx).click();
  }

  async getCurrencyTextByIndex(idx: number): Promise<string> {
    return await this.currencyOptions.nth(idx).innerText();
  }

  async getCartTotal(): Promise<string> {
    return await this.cartTotal.innerText();
  }
}
