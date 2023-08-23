import { Page } from "@playwright/test";
import { CartPage } from "../pages/checkout/CartPage";
import { CheckoutDeliveryPage } from "../pages/checkout/CheckoutDeliveryPage";
import  CheckoutOverviewPage  from "../pages/checkout/CheckoutOverviewPage";

export async function removeProductFromCart(page: Page, productName: string) {
    let cartPage = new CartPage(page);

    await cartPage.RemoveItem(productName).click();
}

export async function confirmCart(page: Page) {
    let cartPage = new CartPage(page);

    await cartPage.Checkout.click();
}

export async function fillOutAddressForm(page: Page, firstName: string, lastName: string, zipCode: string) {
    let deliveryPage = new CheckoutDeliveryPage(page);

    await deliveryPage.FirstName.fill(firstName);
    await deliveryPage.LastName.fill(lastName);
    await deliveryPage.ZipCode.fill(zipCode);
}

export async function continueToOverview(page: Page) {
    let deliveryPage = new CheckoutDeliveryPage(page);

    await deliveryPage.Continue.click();
}

export async function finishPurchase(page: Page) {
    let overviewPage = new CheckoutOverviewPage(page);

    await overviewPage.Finish.click();
}