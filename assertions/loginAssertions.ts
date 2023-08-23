import { Page, expect } from '@playwright/test';
import { ProductsPage } from "../pages/ProductsPage";

export async function assertUserIsLoggedIn(page: Page) {
    let productsPage = new ProductsPage(page);

    await expect(await productsPage.PageTitle).toBeVisible();
    await expect(await productsPage.PageTitle).toHaveText("Products");
}