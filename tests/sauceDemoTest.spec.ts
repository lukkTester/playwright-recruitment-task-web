import { test } from '@playwright/test';
import { getUser } from '../model/Users';
import { loginAs } from '../steps/loginSteps';
import { addProductToCart, openCart, sortProducts } from '../steps/productsSteps';
import { removeProductFromCart, confirmCart, continueToOverview, fillOutAddressForm, finishPurchase } from '../steps/checkoutSteps';
import { assertUserIsLoggedIn } from '../assertions/loginAssertions';
import { assertOrderOverviewContainsExpectedProductsInOrder, assertCartContainsExpectedProductsInOrder, assertOrderTotalAmountIsEqualToProductsPrices, 
    assertOrderIsSuccessful } from '../assertions/checkoutAssertions';
import { assertProductsAreSortedByName, assertProductsAreSortedByPrice } from '../assertions/productsAssertions';
import { Order } from '../model/OrderEnum';


test.describe('Sauce demo validation', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    let user = getUser('Standard User');

    test('Should order process be successful', async ({ page }) => {

        let firstName = "lukk";
        let lastName = "the tester";
        let zipCode = "12345";
        let products: Array<string> = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];

        await loginAs(page, user);

        await assertUserIsLoggedIn(page);

        await addProductToCart(page, products[0]);
        await addProductToCart(page, products[1]);
        await openCart(page);

        await assertCartContainsExpectedProductsInOrder(page, products);

        await removeProductFromCart(page, products[1]);

        await assertCartContainsExpectedProductsInOrder(page, new Array<string>(products[0]));

        await confirmCart(page);
        await fillOutAddressForm(page, firstName, lastName, zipCode);
        await continueToOverview(page);

        await assertOrderOverviewContainsExpectedProductsInOrder(page, new Array<string>(products[0]));
        await assertOrderTotalAmountIsEqualToProductsPrices(page);

        await finishPurchase(page);

        await assertOrderIsSuccessful(page);
    });

    test('Should products be sorted by name', async ({ page }) => {

        let sortNameAsc = "Name (A to Z)";
        let sortNameDesc = "Name (Z to A)";

        await loginAs(page, user);

        await assertUserIsLoggedIn(page);

        await sortProducts(page, sortNameAsc);

        await assertProductsAreSortedByName(page, Order.Ascending);

        await sortProducts(page, sortNameDesc);

        await assertProductsAreSortedByName(page, Order.Descending);
    });

    test('Should products be sorted by price', async ({ page }) => {

        let sortPriceAsc = "Price (low to high)";
        let sortPriceDesc = "Price (high to low)";

        await loginAs(page, user);

        await assertUserIsLoggedIn(page);

        await sortProducts(page, sortPriceAsc);

        await assertProductsAreSortedByPrice(page, Order.Ascending);

        await sortProducts(page, sortPriceDesc);

        await assertProductsAreSortedByPrice(page, Order.Descending);
    });

    test('Should login in as a locked user', async ({ page }) => {

        let userLocked = getUser('Locked User');

        await loginAs(page, userLocked);

        await assertUserIsLoggedIn(page);
    });
});