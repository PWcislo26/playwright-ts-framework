import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly homePageUrl: string;

  constructor(page: Page) {
    super(page);
    this.homePageUrl = "https://automationteststore.com/";
  }

  async openHomePage() {
    await super.navigateTo(this.homePageUrl);
  }
}
