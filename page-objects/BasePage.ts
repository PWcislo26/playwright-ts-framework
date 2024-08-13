import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigateTo(url: string) {
    await this.page.goto(url);
  }

  protected async getUrl(): Promise<string> {
    await this.waitForLoadState();
    return await this.page.url();
  }

  protected async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  protected async click(locator: Locator) {
    await this.waitForLoadState();
    await locator.click();
  }

  protected async getCount(locator: Locator): Promise<number> {
    await this.waitForLoadState();
    return await locator.count();
  }

  protected async getInnerText(locator: Locator): Promise<string> {
    await this.waitForLoadState();
    return await locator.innerText();
  }
}
