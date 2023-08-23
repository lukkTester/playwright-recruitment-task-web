import { Page, expect } from '@playwright/test';
import { ProductsPage } from "../pages/ProductsPage";
import { Order } from '../model/OrderEnum';
import { parseTextToPlainFloat } from  "../helpers/helper"

export async function assertProductsAreSortedByName(page: Page, order: Order) {
    let productsPage = new ProductsPage(page);

    let productsList = await productsPage.ProductNames.all();
    let productListText = Array<string>();

    for (let i = 0; i < productsList.length; i++) {

        let productName = await productsList[i].textContent();

        if (productName === null) {
            throw new Error('Text not found');
        }
        productListText.push(productName);
    }

    let sortedProductList;

    if (order === Order.Ascending) sortedProductList = [...productListText].sort((a, b) => a.localeCompare(b));
    else if (order === Order.Descending) sortedProductList = [...productListText].sort((a, b) => b.localeCompare(a));
    else throw new Error('Order not defined');

    await expect(productListText).toEqual(sortedProductList);
}

export async function assertProductsAreSortedByPrice(page: Page, order: Order) {
     let productsPage = new ProductsPage(page);

    let productsList = await productsPage.ProductPrices.all();
    let productListNumber: number[] = [];

    for (let i = 0; i < productsList.length; i++) {
        let productPrice = await productsList[i].textContent();
        productListNumber.push(parseTextToPlainFloat(productPrice));
    }

    let sortedProductList;

    if (order === Order.Ascending) sortedProductList = [...productListNumber].sort((a, b) => a - b);
    else if (order === Order.Descending) sortedProductList = [...productListNumber].sort((a, b) => b - a);
    else throw new Error('Order not defined');

    await expect(productListNumber).toEqual(sortedProductList);
}