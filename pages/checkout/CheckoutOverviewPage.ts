import { Page } from '@playwright/test';
import { parseTextToPlainFloat } from  "../../helpers/helper"

export default class CheckoutOverviewPage {
    private readonly page: Page;

    private readonly itemsContainers = ".cart_item";
    private readonly itemsPricesLabels = ".inventory_item_price";
    private readonly totalPriceLabel = ".summary_subtotal_label";
    
    private readonly finishBtn = "#finish";

    constructor(page: Page) {
        this.page = page;
    }

    public get Finish() {
        return this.page.locator(this.finishBtn);
    }

    public get Products() {
        return this.page.locator(this.itemsContainers);
    }

    public get ItemsPrices() {
        return this.page.locator(this.itemsPricesLabels).all();
    }

    public get TotalPrice() {
        return this.page.locator(this.totalPriceLabel);
    }

    public async GetTotalPriceAmountAsNumber(): Promise<number> {
        const elementText = await this.TotalPrice.textContent();
        
        return parseTextToPlainFloat(elementText)
    }
}