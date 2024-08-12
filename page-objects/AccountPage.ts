import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountPage extends BasePage {
    
  constructor(page: Page) {
    super(page);
  }
}
