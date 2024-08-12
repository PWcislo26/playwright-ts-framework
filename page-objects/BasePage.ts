import { Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigateTo(url: string) {
    await this.page.goto(url);
  }

  protected async getUrl(): Promise<string> {
    return await this.page.url()
  }

  

  // protected async fill(locator: Locator){
  //     await this.page.locator()
  // }
  // protected async assertErrorMessage(errorMessage: string){
  //     await expect()
  // }
}
