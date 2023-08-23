import { Page } from '@playwright/test';

export class CheckoutDeliveryPage {
    private readonly page: Page;

    private readonly continueBtn = "#continue";

    constructor(page: Page) {
        this.page = page;
    }

    public get FirstName() {
        return this.page.getByPlaceholder("First Name");
    }

    public get LastName() {
        return this.page.getByPlaceholder("Last Name");
    }

    public get ZipCode() {
        return this.page.getByPlaceholder("Zip/Postal Code");
    }

    public get Continue() {
        return this.page.locator(this.continueBtn);
    }
}