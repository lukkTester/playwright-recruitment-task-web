import { Page } from '@playwright/test';

export class CheckoutCompletePage {
    private readonly page: Page;

    private readonly header = ".complete-header";
    private readonly text = ".complete-text";

    constructor(page: Page) {
        this.page = page;
        page.waitForLoadState('load');
    }

    public get OrderSuccessHeader() {
        return this.page.locator(this.header);
    }

    public get OrderSuccessMessage() {
        return this.page.locator(this.text);
    }
}
