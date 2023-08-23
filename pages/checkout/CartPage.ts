import { Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    private readonly itemsContainers = ".cart_item";
    private readonly checkoutBtn = "#checkout";

    constructor(page: Page) {
        this.page = page;
    }

    public get Products() {
        return this.page.locator(this.itemsContainers);
    }

    public get Checkout() {
        return this.page.locator(this.checkoutBtn);
    }

    public RemoveItem(productName: string) {
        return this.Products.locator(`div:has-text("${productName}")`).locator(".btn_secondary");
    }
}