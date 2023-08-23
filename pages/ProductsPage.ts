import { Page } from '@playwright/test';

export class ProductsPage {
    private readonly page: Page;

    private readonly pageTitle = ".title";
    private readonly sortingSelect = ".product_sort_container";
    private readonly shoppingCartIcon = ".shopping_cart_link";
    private readonly itemsContainers = ".inventory_item";
    private readonly itemsNamesLabels = ".inventory_item_name";
    private readonly itemsPricesLabels = ".inventory_item_price";

    constructor(page: Page) {
        this.page = page;
    }

    public get PageTitle() {
        return this.page.locator(this.pageTitle);
    }

    public get ShoppingCart() {
        return this.page.locator(this.shoppingCartIcon);
    }

    public get Sorting() {
        return this.page.locator(this.sortingSelect);
    }

    public get Products() {
        return this.page.locator(this.itemsContainers);
    }

    public get ProductPrices() {
        return this.page.locator(this.itemsPricesLabels);
    }

    public get ProductNames() {
        return this.page.locator(this.itemsNamesLabels);
    }

    public AddToCartBtn(productName: string) {
        return this.Products.locator(`div:has-text("${productName}")`).locator("button");
    }
}