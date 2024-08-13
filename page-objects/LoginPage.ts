import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly loginUrl: string;

  constructor(page: Page) {
    super(page);
    this.loginInput = this.page.locator("#loginFrm_loginname");
    this.passwordInput = this.page.locator("#loginFrm_password");
    this.submitButton = this.page.getByRole("button", { name: " Login" });
    this.errorMessage = this.page.locator("div.alert.alert-error.alert-danger");
    this.loginUrl =
      "https://automationteststore.com/index.php?rt=account/login";
  }

  async openLoginPage() {
    await super.navigateTo(this.loginUrl);
  }

  async performLogin(login: string, password: string) {
    await super.waitForLoadState();
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await super.click(this.submitButton);
  }
}
