import { Page } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";

export async function addProductToCart(page: Page, productName: string) {
    let productsPage = new ProductsPage(page);

    await productsPage.AddToCartBtn(productName).click();
}

export async function sortProducts(page: Page, option: string) {
    let productsPage = new ProductsPage(page);

    await productsPage.Sorting.selectOption(option);
}

export async function openCart(page: Page) {
    let productsPage = new ProductsPage(page);

    await productsPage.ShoppingCart.click();
}