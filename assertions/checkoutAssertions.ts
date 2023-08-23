import { Page, expect } from '@playwright/test';
import { CartPage } from "../pages/checkout/CartPage";
import { CheckoutCompletePage } from "../pages/checkout/CheckoutCompletePage";
import { CheckoutOverviewPage } from "../pages/checkout/CheckoutOverviewPage";
import { parseTextToPlainFloat } from  "../helpers/helper"

export async function assertCartContainsExpectedProductsInOrder(page: Page, products: Array<string>) {
    let cartPage = new CartPage(page);

    let productsList = await cartPage.Products.all();

    expect(await cartPage.Products.count()).toBe(products.length);
    
    for (let i = 0; i < productsList.length; i++) {
        expect(productsList[i]).toContainText(products[i]);
    }
}

export async function assertOrderOverviewContainsExpectedProductsInOrder(page: Page, products: Array<string>) {
    let overviewPage = new CheckoutOverviewPage(page);

    let productsList = await overviewPage.Products.all();

    expect(await overviewPage.Products.count()).toBe(products.length);

    for (let i = 0; i < productsList.length; i++) {
        expect(productsList[i]).toContainText(products[i]);
    }
}

export async function assertOrderTotalAmountIsEqualToProductsPrices(page: Page) {
    let overviewPage = new CheckoutOverviewPage(page);

    let sum;

    for (let i = 0; i < await overviewPage.Products.count(); i++) {

        let price = await (await overviewPage.ItemsPrices).at(i)?.textContent();

        sum =+ parseTextToPlainFloat(price)
    }

    expect(await overviewPage.GetTotalPriceAmountAsNumber()).toBe(sum);
}

export async function assertOrderIsSuccessful(page: Page) {
    let completePage = new CheckoutCompletePage(page);

    await expect(await completePage.OrderSuccessHeader).toBeVisible();
    await expect(await completePage.OrderSuccessMessage).toBeVisible();
    await expect(await completePage.OrderSuccessHeader).toHaveText("Thank you for your order!");
    await expect(await completePage.OrderSuccessMessage).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
}