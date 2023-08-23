import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { User } from '../model/Users';

export async function loginAs(page: Page, user: User | undefined) {
    let loginPage = new LoginPage(page);

    if (!user) {
        console.log('User not found.');
        return;
    }
    await loginPage.Username.fill(user.username);
    await loginPage.Password.fill(user.password);
    await loginPage.Login.click();
}